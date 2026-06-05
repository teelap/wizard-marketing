/* =====================================================================
   THE WIZARD'S WORKSHOP — engine for the layered scene
   Vanilla JS. Actors are transparent sprite layers; each is clickable.
   ===================================================================== */
(function () {
  "use strict";
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FORMSPREE = 'https://formspree.io/f/xzdjjjlo';

  var CARDS = {
    jake: {
      title: "Jake — the Wizard of Marketing", role: "Consultant · Author · $100M+ generated",
      portrait: "dev_assets/jake-headshot.png",
      body: "That's me at the arcane laptop — 20 years, two exits, $100M+ generated. Two ways in: book me for 1-on-1 consulting, or grab my upcoming book, Eight Dominoes.",
      cta: { label: "Work with Jake → Consulting", href: "/consulting" },
      cta2: { label: "Get the book →", href: "/book" }
    },
    brewer: {
      title: "The Messaging Cauldron", role: "Private consulting",
      body: "Where your message gets fixed. Consulting is 1-on-1: we find where your funnel leaks and re-order the eight 'dominoes' so each one topples the next. Hourly or retainer.",
      cta: { label: "Book a session → Consulting", href: "/consulting" },
      cta2: { label: "Peek at the eight →", action: "dominoes" }
    },
    podcast: {
      title: "Send the Raven", role: "Podcasts & speaking",
      body: "Booking Jake for your show or stage — raw marketing truths, no fluff, and an audience that leaves with something they can actually use.",
      cta: { label: "Invite Jake on → Podcast", href: "/podcast-guest" }
    }
  };
  var DOMINOES = ["Core Attraction","Attention Catalyst","Value Proposition","Impact Chain","Mechanism","Barrier Breakdown","Embracing Limitations","New Opportunity"];
  var WHISPERS = {
    "cu-domino1":["A domino. The first one always looks harmless.","You pocket the domino. It hums faintly."],
    "cu-domino2":["A second domino. They want to be together.","Two down. One to go."],
    "cu-domino3":["The third domino hums in your satchel. Bring them to the cauldron."]
  };

  function $(s,r){return (r||document).querySelector(s);}
  function $all(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}

  /* ---------- audio (silent-capable) ---------- */
  var Audio_ = {
    muted: localStorage.getItem('wiz-muted') !== 'false', unlocked:false, cache:{},
    map:{hover:'hover',pick:'pickup',card:'card',orb:'orb',door:'door',reward:'reward'},
    play:function(k){ if(this.muted||!this.unlocked) return; var n=this.map[k]; if(!n) return;
      try{var a=this.cache[n]; if(!a){a=new Audio('dev_assets/audio/'+n+'.mp3');a.volume=.5;this.cache[n]=a;} a.currentTime=0; var p=a.play(); if(p&&p.catch)p.catch(function(){});}catch(e){} },
    amb:null,
    startAmbient:function(){ if(this.muted) return; try{ if(!this.amb){this.amb=new Audio('dev_assets/audio/ambient.mp3');this.amb.loop=true;this.amb.volume=.32;} var p=this.amb.play(); if(p&&p.catch)p.catch(function(){});}catch(e){} },
    setMuted:function(m){ this.muted=m; localStorage.setItem('wiz-muted',m?'true':'false'); if(m){if(this.amb)try{this.amb.pause();}catch(e){}} else {this.unlocked=true;this.startAmbient();} updateSoundBtn(); }
  };

  /* ---------- modal / dialogue ---------- */
  var modal=$('#modal'), modalBody=$('#modalBody'), lastFocus=null;
  function trapFocus(e){ if(e.key!=='Tab')return; var f=$all('a[href],button,input',modal).filter(function(el){return !el.disabled&&el.offsetParent!==null;});
    if(!f.length)return; var first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();} }
  function ctaHTML(c){ if(!c) return '';
    if(c.href) return '<a class="card-cta" href="'+c.href+'">'+c.label+' <i class="fas fa-arrow-right"></i></a>';
    return '<button class="card-cta" data-card-action="'+c.action+'">'+c.label+'</button>'; }
  function cta2HTML(c){ if(!c) return '';
    if(c.href) return '<a class="cta2" href="'+c.href+'">'+c.label+'</a>';
    return '<button class="cta2" data-card-action="'+c.action+'">'+c.label+'</button>'; }
  function openCard(key){ var c=CARDS[key]; if(!c)return; Audio_.play('card');
    var h='<h3 id="modalTitle">'+c.title+'</h3><div class="role">'+c.role+'</div>';
    if(c.portrait) h+='<img class="portrait" src="'+c.portrait+'" alt="">';
    h+='<p>'+c.body+'</p>'+ctaHTML(c.cta)+cta2HTML(c.cta2);
    showModal(h); }
  function showModal(html,cls){ lastFocus=document.activeElement; modalBody.parentElement.className='card'+(cls?' '+cls:'');
    modalBody.innerHTML=html; modal.classList.add('open'); var f=$('.card-cta,.cta2,button,a,input',modal); if(f)f.focus(); }
  function closeCard(){ modal.classList.remove('open'); if(lastFocus&&lastFocus.focus)lastFocus.focus(); }
  $('#modalClose').addEventListener('click',closeCard);
  modal.addEventListener('click',function(e){if(e.target===modal)closeCard();});
  addEventListener('keydown',function(e){ if(e.key==='Escape')closeCard(); if(modal.classList.contains('open'))trapFocus(e); });
  modalBody.addEventListener('click',function(e){ var b=e.target.closest('[data-card-action]'); if(!b)return;
    if(b.dataset.cardAction==='dominoes'){ var list=DOMINOES.map(function(d,i){return '<p style="margin:.2em 0"><strong>'+(i+1)+'.</strong> '+d+'</p>';}).join('');
      showModal('<h3>The Eight Dominoes</h3><div class="role">the framework, straight from the tome</div>'+list+'<a class="card-cta" href="/book">Get first access <i class="fas fa-arrow-right"></i></a>'); } });

  /* ---------- toast / whisper ---------- */
  var toast=$('#toast'), toastT;
  function say(m){ toast.textContent=m; toast.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){toast.classList.remove('show');},2600); }
  function whisper(k){ var a=WHISPERS[k]||["Nothing happens."]; say(a[Math.floor(Math.random()*a.length)]); }

  /* ---------- social fan (Seer's orb) ---------- */
  var fan=$('#fan'), fanOpen=false, links=fan?$all('a',fan):[], N=links.length;
  function layoutFan(open){ var R=Math.max(86,Math.min(150,innerWidth*0.1));
    links.forEach(function(a,i){ if(open){ var ang=(-Math.PI*0.98)+(i/(N-1))*(Math.PI*0.94);
        a.style.transform='translate('+(Math.cos(ang)*R)+'px,'+(Math.sin(ang)*R)+'px) scale(1)'; a.style.transitionDelay=(i*55)+'ms'; }
      else { a.style.transform='translate(0,0) scale(.3)'; a.style.transitionDelay='0ms'; } }); }
  function toggleFan(){ fanOpen=!fanOpen; fan.classList.toggle('open',fanOpen); layoutFan(fanOpen); }
  addEventListener('resize',function(){ if(fanOpen)layoutFan(true); });

  /* ---------- actor / hotspot wiring ---------- */
  var jakeClicks=0;
  $all('[data-action]').forEach(function(el){
    el.addEventListener('mouseenter',function(){Audio_.play('hover');});
    el.addEventListener('click',function(){
      var a=el.dataset.action;
      if(a==='nav'){ Audio_.play('door'); location.href=el.dataset.href; }
      else if(a==='card'){
        if(el.dataset.key==='jake'){ jakeClicks++; if(jakeClicks===7) setTimeout(function(){say("Most people just fill out the form. Jake respects the curious — go on.");},400); }
        openCard(el.dataset.key);
      }
      else if(a==='orb'){ toggleFan(); Audio_.play('orb'); }
    });
  });

  /* ---------- interactive props ("toys") ---------- */
  var JAR_LINES=["You poke the jar. A dozen bubbles race up — and something inside blinks back.",
    "The jar fizzes happily. Eyeball? Newt? Best not to look too closely.",
    "Bubbles. The good kind. Probably.",
    "The brew burps. A tiny voice says \"oops.\""];
  function jarLine(){ return JAR_LINES[Math.floor(Math.random()*JAR_LINES.length)]; }
  function spawnBubbles(host){
    if(reduced){ say("The jar gurgles. Best not to ask."); return; }
    var n=10+Math.floor(Math.random()*6);
    for(var i=0;i<n;i++){ (function(i){
      var b=document.createElement('span'); b.className='bubble';
      var sz=6+Math.random()*12; b.style.width=b.style.height=sz.toFixed(0)+'px';
      b.style.left=(18+Math.random()*60)+'%';
      b.style.setProperty('--dx',((Math.random()*2-1)*34).toFixed(0)+'px');
      b.style.setProperty('--dur',(1.6+Math.random()*1.5).toFixed(2)+'s');
      b.style.animationDelay=(i*55)+'ms';
      host.appendChild(b);
      setTimeout(function(){ if(b.parentNode)b.parentNode.removeChild(b); },2700+i*55);
    })(i); }
  }
  var passageT;
  function togglePassage(){
    var open=document.body.classList.toggle('passage-open'); Audio_.play('door');
    var s=$('#p-sconce'); if(s){ s.setAttribute('aria-pressed',open); var tg=$('.tag',s); if(tg)tg.textContent=open?'Slide it back':'Pull the sconce…'; }
    clearTimeout(passageT);
    if(open){ say("The bookcase groans aside. Cold air, and a stair going down…");
      passageT=setTimeout(function(){ if(document.body.classList.contains('passage-open')){ document.body.classList.remove('passage-open'); Audio_.play('door'); var s2=$('#p-sconce'); if(s2){s2.setAttribute('aria-pressed',false); var t2=$('.tag',s2); if(t2)t2.textContent='Pull the sconce…';} } },5400); }
  }
  $all('[data-toy]').forEach(function(el){
    el.addEventListener('mouseenter',function(){Audio_.play('hover');});
    el.addEventListener('click',function(){
      var t=el.dataset.toy;
      if(t==='bubbles'){ Audio_.play('orb'); spawnBubbles(el); say(jarLine()); }
      else if(t==='bookcase'){ togglePassage(); }
      else if(t==='peel'){ el.classList.toggle('peeled'); }  /* touch/click sticks the curl open */
    });
  });

  /* ---------- satchel / curios / reward ---------- */
  var KEY='wiz-satchel-v3';
  var bag=[]; try{bag=JSON.parse(localStorage.getItem(KEY))||[];}catch(e){bag=[];}
  var slots=$all('#satchel .slot'), TOTAL=3, rewardClaimed=localStorage.getItem('wiz-reward')==='1';
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(bag));}catch(e){}}
  function complete(){ return bag.indexOf('domino1')>-1&&bag.indexOf('domino2')>-1&&bag.indexOf('domino3')>-1; }
  function renderBag(){ var items=bag.slice(0,slots.length);
    slots.forEach(function(s,i){ if(items[i]){s.classList.add('filled');s.textContent='\u{1F0B0}';} else {s.classList.remove('filled');s.textContent='';} });
    var c=$('#counter-n'); if(c)c.textContent=bag.length+'/'+TOTAL;
    if(complete()&&!rewardClaimed){var b=$('#a-brewer'); if(b)b.classList.add('ready');} }
  $all('.curio').forEach(function(el){ var id=el.dataset.item; if(bag.indexOf(id)>-1)el.classList.add('taken');
    el.addEventListener('click',function(){ if(bag.indexOf(id)>-1)return; bag.push(id); persist(); el.classList.add('taken'); Audio_.play('pick'); renderBag(); whisper(id);
      if(complete()&&!rewardClaimed) setTimeout(function(){say("Three dominoes hum. Bring them to the Brewers' cauldron.");},1400); }); });
  function openReward(){ rewardClaimed=true; localStorage.setItem('wiz-reward','1'); var b=$('#a-brewer'); if(b)b.classList.remove('ready'); Audio_.play('reward');
    showModal('<div class="seal"><i class="fas fa-scroll"></i></div><h3>The Eighth Domino Falls</h3><div class="role">you found all three — a reward stirs</div>'+
      '<p>For your curiosity: the first chapter of <em>Eight Dominoes</em>, before anyone else. Leave a sigil (your email) and it\'s yours.</p>'+
      '<form id="rewardForm"><input type="email" name="email" placeholder="Your best email" required><button type="submit" class="card-cta">Claim it</button></form>','scroll');
    var form=$('#rewardForm'); form.addEventListener('submit',function(ev){ev.preventDefault(); var fd=new FormData(form); fd.append('_form_type','secret_scroll'); fd.append('_subject','Secret Scroll claimed (Workshop)');
      fetch(FORMSPREE,{method:'POST',body:fd,headers:{Accept:'application/json'}}).then(function(r){return r.ok;}).catch(function(){return false;}).then(function(ok){closeCard();say(ok?"The scroll is sealed and on its way to your inbox.":"The owl got lost — try again in a moment.");}); }); }

  /* ---------- day / night ---------- */
  var timePref=localStorage.getItem('wiz-time')||'auto';
  function effectiveTime(){ if(timePref==='day')return'day'; if(timePref==='night')return'night';
    var h=new Date().getHours(); if(h>=7&&h<17)return'day'; if(h>=17&&h<20)return'dusk'; if(h>=5&&h<7)return'dawn'; return'night'; }
  function applyTime(){ document.body.setAttribute('data-time',effectiveTime()); updateTimeBtn(); }
  function updateTimeBtn(){ var b=$('#timeBtn'); if(!b)return; var ic=timePref==='day'?'fa-sun':timePref==='night'?'fa-moon':'fa-clock';
    b.innerHTML='<i class="fas '+ic+'"></i>'; b.setAttribute('aria-label','Time: '+timePref+' (click to change)'); }
  function greeting(){ var h=new Date().getHours();
    if(h===0)return"The witching hour. The wizards work late — so do you.";
    if(h<5)return"Burning the midnight oil? So is the Wizard.";
    if(h<12)return"Good morning, traveler. The potions are fresh.";
    if(h<17)return"Good afternoon. Mind the cauldron.";
    if(h<21)return"Good evening. The lanterns are lit.";
    return"A late visitor. The workshop never truly sleeps."; }

  /* ---------- ambient life: drifting motes + rising steam + floor embers ---------- */
  function ambientLife(){ if(reduced)return;
    var motes=$('#motes');
    if(motes) for(var i=0;i<20;i++){ var m=document.createElement('span'); m.className='mote';
      m.style.left=(Math.random()*100)+'%'; m.style.top=(38+Math.random()*60)+'%';
      var sz=(2+Math.random()*3).toFixed(1); m.style.width=m.style.height=sz+'px';
      m.style.setProperty('--dur',(12+Math.random()*12).toFixed(1)+'s');
      m.style.setProperty('--dx',((Math.random()*2-1)*60).toFixed(0)+'px');
      m.style.setProperty('--dy',(-(30+Math.random()*45)).toFixed(0)+'vh');
      m.style.setProperty('--d',(-Math.random()*16).toFixed(1)+'s'); motes.appendChild(m); }
    var cs=$('#steam-cauldron');
    if(cs) for(var j=0;j<5;j++){ var p=document.createElement('span'); p.className='puff';
      p.style.setProperty('--dur',(3.5+Math.random()*2.5).toFixed(1)+'s');
      p.style.setProperty('--d',(-(j*0.9)-Math.random()).toFixed(1)+'s');
      p.style.setProperty('--dx',((Math.random()*2-1)*16).toFixed(0)+'px'); cs.appendChild(p); }
    var s=$('#stage'),n=(new Date().getHours()===0)?14:9;
    for(var k=0;k<n;k++){var e=document.createElement('div');e.className='ember';e.style.left=(8+Math.random()*84)+'%';e.style.animationDuration=(6+Math.random()*7)+'s';e.style.animationDelay=(-Math.random()*10)+'s';s.appendChild(e);} }

  /* ---------- konami ---------- */
  var seq=[38,38,40,40,37,39,37,39,66,65],pos=0;
  addEventListener('keydown',function(e){ pos=(e.keyCode===seq[pos])?pos+1:0; if(pos===seq.length){pos=0;document.body.classList.add('konami');say("\u{1F3A9} The hats fly off! Order restored… mostly.");setTimeout(function(){document.body.classList.remove('konami');},4000);} });

  /* ---------- UI buttons ---------- */
  $('#revealBtn').addEventListener('click',function(){var on=document.body.classList.toggle('reveal');this.setAttribute('aria-pressed',on);});
  window.updateSoundBtn=function(){var b=$('#soundBtn');if(!b)return;b.innerHTML='<i class="fas '+(Audio_.muted?'fa-volume-xmark':'fa-volume-high')+'"></i>';b.setAttribute('aria-pressed',!Audio_.muted);b.setAttribute('aria-label',Audio_.muted?'Sound off':'Sound on');};
  $('#soundBtn').addEventListener('click',function(){Audio_.setMuted(!Audio_.muted);});
  $('#timeBtn').addEventListener('click',function(){timePref=timePref==='auto'?'day':timePref==='day'?'night':'auto';localStorage.setItem('wiz-time',timePref);applyTime();});

  /* idle auto-reveal removed — nothing glows unless hovered or 'Reveal clues' is pressed */

  /* ---------- reward trigger on the Brewer when puzzle complete ---------- */
  var brewer=$('#a-brewer');
  if(brewer) brewer.addEventListener('click',function(e){ if(complete()&&!rewardClaimed){ e.stopImmediatePropagation(); openReward(); } }, true);

  /* ---------- intro / enter ---------- */
  function enter(){ var intro=$('#intro'); intro.classList.add('gone'); setTimeout(function(){intro.style.display='none';},650);
    Audio_.unlocked=true; if(!Audio_.muted)Audio_.startAmbient(); say(greeting()); }
  $('#enterBtn').addEventListener('click',enter);

  /* ---------- mobile gate ---------- */
  if(matchMedia('(max-width:760px)').matches||/Mobi|Android/i.test(navigator.userAgent)) document.body.classList.add('is-mobile');
  var mE=$('#mEnterBtn'); if(mE)mE.addEventListener('click',function(){document.body.classList.remove('is-mobile');var g=$('#mgate');if(g)g.style.display='none';});

  /* ---------- boot ---------- */
  applyTime(); renderBag(); updateSoundBtn(); ambientLife();
})();
