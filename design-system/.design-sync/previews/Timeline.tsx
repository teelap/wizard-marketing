import { Timeline } from 'jtw-schoolhouse';

export const JakesRoad = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}>
    <Timeline stops={[
      { year: '2024', color: 'teal', title: 'Started the room', text: 'Began building the peer group for founders and marketers who are done with theory.' },
      { year: '2023', color: 'pink', title: 'Chief Evangelist at Finch', text: 'Built campaigns that moved revenue. Called out the industry’s worst habits in public.' },
      { year: '2021', color: 'red', yearColor: 'cream', title: 'The TikTok leap', text: 'One video hit and 10,000 arrived overnight. 110K+ stayed.' },
    ]} />
  </div>
);
