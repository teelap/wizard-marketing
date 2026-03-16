const fs = require('fs');
const axios = require('axios');
const xml2js = require('xml2js');

// Configuration
const YOUTUBE_CHANNEL_ID = 'UC26G_o-cTFCcPo-CyGf_3YA'; 
const TIKTOK_USERNAME = 'thewizardmarketing';
const INDEX_PATH = './index.html';

async function getLatestYouTubeVideoId() {
    try {
        console.log('Fetching YouTube RSS feed...');
        const response = await axios.get(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`);
        
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(response.data);
        
        // Grab the first video entry
        const latestVideo = result.feed.entry[0];
        const videoId = latestVideo['yt:videoId'][0];
        
        console.log(`Found YouTube Video ID: ${videoId}`);
        return videoId;
    } catch (error) {
        console.error('Error fetching YouTube video:', error.message);
        // Fallback video ID if fetch fails
        return 'jfKfPfyJRdk'; 
    }
}

async function getLatestTikTokEmbed() {
    // Note: True dynamic scraping of TikTok is highly complex due to their anti-bot measures.
    // For Vercel/GitHub Actions, we will generate the standard creator embed block.
    // This block automatically pulls the creator's latest videos directly on the client side,
    // which avoids server-side blocking and keeps the static site perfectly up to date.
    
    console.log(`Generating TikTok Creator Embed for @${TIKTOK_USERNAME}...`);
    
    return `
        <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${TIKTOK_USERNAME}" data-unique-id="${TIKTOK_USERNAME}" data-embed-type="creator" style="max-width: 780px; min-width: 288px;" > 
            <section> <a target="_blank" href="https://www.tiktok.com/@${TIKTOK_USERNAME}?refer=creator_embed">@${TIKTOK_USERNAME}</a> </section> 
        </blockquote> 
        <script async src="https://www.tiktok.com/embed.js"></script>
    `;
}

async function updateIndexHtml() {
    try {
        console.log('Starting build process...');
        
        // 1. Fetch Latest Data
        const ytVideoId = await getLatestYouTubeVideoId();
        const tiktokEmbedHtml = await getLatestTikTokEmbed();

        // 2. Read the current index.html
        let html = fs.readFileSync(INDEX_PATH, 'utf8');

        // 3. Inject YouTube (Replacing the contents of the wrapper)
        const ytRegex = /<div class="video-wrapper" id="youtube-feed-container">[\s\S]*?<\/div>/;
        const ytReplacement = `
            <div class="video-wrapper" id="youtube-feed-container">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${ytVideoId}" title="Jake Tlapek YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `.trim();
        html = html.replace(ytRegex, ytReplacement);

        // 4. Inject TikTok
        const ttRegex = /<div class="video-wrapper tiktok-wrapper" id="tiktok-feed-container">[\s\S]*?<\/div>/;
        const ttReplacement = `
            <div class="video-wrapper tiktok-wrapper" id="tiktok-feed-container">
                ${tiktokEmbedHtml}
            </div>
        `.trim();
        html = html.replace(ttRegex, ttReplacement);

        // 5. Save the updated file
        fs.writeFileSync(INDEX_PATH, html);
        console.log('Successfully updated index.html with the latest video feeds!');
        
    } catch (error) {
        console.error('Build process failed:', error);
        process.exit(1);
    }
}

// Execute the build
updateIndexHtml();
