/* ============================================================
   APP.JS — firefly.dev | Muhammad Riski Akbar
============================================================ */

/* ═══════════════════════════════════
   1. BOOT SEQUENCE
═══════════════════════════════════ */
const BOOT_LINES = [
  { t:"✦ FIREFLY.DEV OS v1.3.6.8 — TJKT Cyber Security Unit", c:"info" },
  { t:"[ OK ] Loading ethical hacker profile...", c:"ok" },
  { t:"[ OK ] Kali Linux kernel modules loaded", c:"ok" },
  { t:"[ OK ] Wireshark · Metasploit · Burp Suite — ready", c:"ok" },
  { t:"[ OK ] Python 3.x · Bash · JavaScript — loaded", c:"ok" },
  { t:"[ OK ] honeypot.service — active (running)", c:"ok" },
  { t:"[ OK ] toolkit-grafana — Grafana :3000 / Prometheus :9090", c:"ok" },
  { t:"[ OK ] SecurePipeline — SAST/DAST engine online", c:"ok" },
  { t:"[ OK ] Docker daemon started", c:"ok" },
  { t:"[ WARN ] Otaku level: OVER 9000 — system may hang", c:"warn" },
  { t:"[ OK ] Manga library indexed: Chainsaw Man, Berserk, One Piece...", c:"ok" },
  { t:"[ OK ] Anime queue loaded: AoT, Steins;Gate, Death Note...", c:"ok" },
  { t:"[ OK ] Waifu.service: Firefly (Honkai: Star Rail) ✦ — connected", c:"ok" },
  { t:"[ OK ] GitHub: github.com/firefly1368-code — 4 repos", c:"ok" },
  { t:"[ OK ] CTF arena — ready to pwn", c:"ok" },
  { t:"[ OK ] All systems nominal — 「 Stay curious. 」 🦋✨", c:"ok" },
];

let bootDone = false;

function runBoot() {
  const log    = document.getElementById('bootLog');
  const fill   = document.getElementById('bootFill');
  const status = document.getElementById('bootStatus');
  const pct    = document.getElementById('bootPct');
  const enter  = document.getElementById('bootEnter');
  let i = 0;

  function step() {
    if (i >= BOOT_LINES.length) {
      fill.style.width='100%'; pct.textContent='100%';
      status.textContent='System ready. 🦋';
      setTimeout(() => { enter.style.display='block'; }, 350);
      return;
    }
    const m = BOOT_LINES[i];
    const s = document.createElement('span');
    s.className = 'bl ' + m.c; s.textContent = m.t;
    log.appendChild(s); log.scrollTop = log.scrollHeight;
    const p = Math.round((i / BOOT_LINES.length) * 99);
    fill.style.width = p+'%'; pct.textContent = p+'%';
    status.textContent = m.t.replace(/\[.*?\]\s*/,'');
    i++;
    setTimeout(step, 100 + Math.random()*80);
  }
  setTimeout(step, 400);
}

function enterSystem() {
  if (bootDone) return;
  bootDone = true;
  document.getElementById('bootScreen').classList.add('out');
  setTimeout(() => {
    document.getElementById('bootScreen').style.display = 'none';
    startApp();
  }, 650);
}

/* ═══════════════════════════════════
   2. YOUTUBE IFrame API — AUTOPLAY
   Musik otomatis mulai setelah klik
   "ENTER SYSTEM" — no tab baru!
═══════════════════════════════════ */
const PLAYLIST = [
  // ── Lagu Utama ──────────────────────────
  "vJ-DapY3piY",   // 01 ← LAGU UTAMA (main song)
  "gUPGLYYT4bc",   // 02 ← tambahan baru
  // ── Playlist lama (dipilih yang bisa putar) ──
  "TGJ9-1LWFtE",   // 03
  "7T4OEZcnOJE",   // 04
  "l-wC90eBYxo",   // 05
  "DWJh0Dny5Ug",   // 06
  "V8fYAAh5uuA",   // 07
  "TQZ9DzaO23Y",   // 08
  "JWR26Lfl3Uw",   // 09
  "ViFHruS6oO8",   // 10
  "wjNln9mXuTI",   // 11
  "Z9XoZSifPNA",   // 12
  "AqI97zHMoQw",   // 13
];
let ytPlayer = null, ytReady = false;
let curTrack = 0, playing = false;
let skipTimer = null;

window.onYouTubeIframeAPIReady = function() {
  ytReady = true;
  ytPlayer = new YT.Player('yt-player', {
    height:'1', width:'1',
    videoId: PLAYLIST[0],
    playerVars: {
      autoplay:1, controls:0, disablekb:1, fs:0,
      iv_load_policy:3, modestbranding:1, rel:0,
      showinfo:0, playsinline:1, enablejsapi:1
    },
    events: {
      onReady: (e) => { e.target.setVolume(60); e.target.playVideo(); },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) {
          playing = true; mpUpdateUI(); mpGetTitle();
          document.getElementById('mpViz')?.classList.add('active');
        }
        if (e.data === YT.PlayerState.PAUSED) {
          playing = false; mpUpdateUI();
          document.getElementById('mpViz')?.classList.remove('active');
        }
        if (e.data === YT.PlayerState.ENDED) mpNext();
        // Auto-skip jika video tidak bisa diputar (blocked/unavailable)
        if (e.data === YT.PlayerState.UNSTARTED) {
          skipTimer = setTimeout(() => {
            if (!playing) mpNext();
          }, 3000);
        }
        if (e.data === YT.PlayerState.PLAYING && skipTimer) {
          clearTimeout(skipTimer); skipTimer = null;
        }
      }
    }
  });
};

function loadYTAPI() {
  if (document.getElementById('_ytapi')) return;
  const s = document.createElement('script');
  s.id = '_ytapi'; s.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(s);
}

async function mpGetTitle() {
  const id = PLAYLIST[curTrack];
  try {
    const r = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`);
    const d = await r.json();
    const t = document.getElementById('mpTitle');
    if (t && d.title) t.textContent = d.title;
    const sub = document.getElementById('mpSub');
    if (sub) sub.innerHTML = (d.author_name||'firefly playlist') + ' · <span id="mpNum">'+(curTrack+1)+'/'+PLAYLIST.length+'</span>';
  } catch(_) {
    const t = document.getElementById('mpTitle');
    if (t) t.textContent = 'Track '+(curTrack+1);
    const n = document.getElementById('mpNum');
    if (n) n.textContent = (curTrack+1)+'/'+PLAYLIST.length;
  }
}

function mpToggle() {
  if (!ytPlayer||!ytReady) return;
  playing ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
}
function mpNext() {
  curTrack = (curTrack+1)%PLAYLIST.length;
  if (ytPlayer&&ytReady) ytPlayer.loadVideoById(PLAYLIST[curTrack]);
  mpGetTitle();
}
function mpPrev() {
  curTrack = (curTrack-1+PLAYLIST.length)%PLAYLIST.length;
  if (ytPlayer&&ytReady) ytPlayer.loadVideoById(PLAYLIST[curTrack]);
  mpGetTitle();
}
function mpVol(v) { if (ytPlayer&&ytReady) ytPlayer.setVolume(parseInt(v)); }
function mpUpdateUI() {
  const i = document.getElementById('mpIcon');
  if (i) i.className = playing ? 'fas fa-pause' : 'fas fa-play';
}
function mpMinimize() {
  document.getElementById('musicPlayer').style.display='none';
  document.getElementById('mpBubble').style.display='flex';
}
function mpExpand() {
  document.getElementById('musicPlayer').style.display='flex';
  document.getElementById('mpBubble').style.display='none';
}

/* ═══════════════════════════════════
   3. FULL-PAGE NAVIGATION
═══════════════════════════════════ */
let curPage=0, scrollLock=false;
const PAGES=4;

function goPage(n) {
  if (n<0||n>=PAGES) return;
  curPage=n;
  document.getElementById('fpWrapper').style.transform=`translateY(-${n*100}vh)`;
  updateDots(); updateNavLinks();
  if (n===1) animateSkills();
}
function updateDots() {
  document.querySelectorAll('.pd').forEach((d,i)=>d.classList.toggle('active',i===curPage));
}
function updateNavLinks() {
  document.querySelectorAll('.nl').forEach(l=>l.classList.toggle('active',parseInt(l.dataset.pg)===curPage));
}

let touchStartY=0;
window.addEventListener('wheel',(e)=>{
  if (scrollLock) return;
  const pc = document.getElementById('page'+curPage)?.querySelector('.page-content');
  if (pc) {
    const atBottom = pc.scrollTop+pc.clientHeight >= pc.scrollHeight-10;
    const atTop    = pc.scrollTop <= 0;
    if (e.deltaY>0&&!atBottom) return;
    if (e.deltaY<0&&!atTop) return;
  }
  scrollLock=true;
  if (e.deltaY>0) goPage(curPage+1); else goPage(curPage-1);
  setTimeout(()=>scrollLock=false, 900);
},{passive:true});

window.addEventListener('touchstart',(e)=>{touchStartY=e.touches[0].clientY;},{passive:true});
window.addEventListener('touchend',(e)=>{
  if (scrollLock) return;
  const dy=touchStartY-e.changedTouches[0].clientY;
  if (Math.abs(dy)<40) return;
  scrollLock=true;
  if (dy>0) goPage(curPage+1); else goPage(curPage-1);
  setTimeout(()=>scrollLock=false, 900);
});

window.addEventListener('keydown',(e)=>{
  if (e.key==='ArrowDown'||e.key==='PageDown') goPage(curPage+1);
  if (e.key==='ArrowUp'||e.key==='PageUp')     goPage(curPage-1);
  if (e.key==='Escape') { closeModal('videoModal'); closeModal('certModal'); }
});

/* ═══════════════════════════════════
   4. TYPED ANIMATION
═══════════════════════════════════ */
const ROLES = [
  "Ethical Hacker 🔐",
  "Cyber Security Student",
  "Tool Builder 🛠️",
  "CTF Player 🚩",
  "Linux Enthusiast 🐧",
  "Penetration Tester",
  "SOC Learner",
  "Otaku & Hacker 🌸",
  "firefly1368-code 🦋",
  "「 Stay Curious 」"
];
let rIdx=0, cIdx=0, deleting=false;

function typeLoop() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const role=ROLES[rIdx];
  if (!deleting) {
    el.textContent=role.slice(0,++cIdx);
    if (cIdx===role.length){deleting=true; setTimeout(typeLoop,2200); return;}
    setTimeout(typeLoop,70);
  } else {
    el.textContent=role.slice(0,--cIdx);
    if (cIdx===0){deleting=false; rIdx=(rIdx+1)%ROLES.length; setTimeout(typeLoop,350); return;}
    setTimeout(typeLoop,38);
  }
}

/* ═══════════════════════════════════
   5. PARTICLES
═══════════════════════════════════ */
function initParticles() {
  const cv=document.getElementById('particles');
  if (!cv) return;
  const ctx=cv.getContext('2d');
  let W,H,pts;
  function resize(){
    W=cv.width=cv.offsetWidth; H=cv.height=cv.offsetHeight;
    pts=Array.from({length:Math.min(70,Math.floor(W*H/12000))},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
      r:Math.random()*2+.5, a:Math.random()*.5+.1,
      col:Math.random()>.7?'#7b2fff':'#00d4ff'
    }));
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    for (let i=0;i<pts.length;i++) for (let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(0,212,255,${.12*(1-d/120)})`;ctx.lineWidth=.5;ctx.stroke();}
    }
    pts.forEach(p=>{
      ctx.globalAlpha=p.a;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.col;ctx.fill();ctx.globalAlpha=1;
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',resize);
  resize();draw();
}

/* ═══════════════════════════════════
   6. SKILL BARS
═══════════════════════════════════ */
let skillsAnimated=false;
function animateSkills(){
  if(skillsAnimated) return;
  skillsAnimated=true;
  document.querySelectorAll('.skb-fill').forEach(el=>{
    const pct=el.style.getPropertyValue('--p');
    el.style.setProperty('--p','0%');
    setTimeout(()=>{ el.style.width=pct; },120);
  });
  document.querySelectorAll('.reveal-left,.reveal-right').forEach(el=>setTimeout(()=>el.classList.add('on'),100));
}

/* ═══════════════════════════════════
   7. TABS
═══════════════════════════════════ */
function switchTab(name,btn){
  document.querySelectorAll('.wtab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-'+name)?.classList.add('active');
}

/* ═══════════════════════════════════
   8. MODALS
═══════════════════════════════════ */
function openVideo(ytId){
  const b=document.getElementById('videoModalBody');
  if(b) b.innerHTML=`<iframe src="https://www.youtube.com/embed/${escH(ytId)}?autoplay=1&rel=0" allow="autoplay;encrypted-media;picture-in-picture" allowfullscreen style="width:100%;aspect-ratio:16/9;display:block;border:none;"></iframe>`;
  document.getElementById('videoModal').style.display='flex';
  document.body.style.overflow='hidden';
}

function openCert(card){
  const img   = card.querySelector('.cert-thumb img');
  const title = card.querySelector('.cert-title')?.textContent || '';
  const org   = card.querySelector('.cert-org')?.textContent   || '';
  const year  = card.querySelector('.cert-year')?.textContent  || '';
  const cat   = card.querySelector('.cert-cat')?.textContent   || '';
  const c = document.getElementById('certModalContent');
  if (!c) return;

  if (img && img.src) {
    c.innerHTML = `
      <img src="${escH(img.src)}" alt="${escH(title)}" />
      <div class="cmc-info">
        <div class="cmc-title">${escH(title)}</div>
        <div class="cmc-meta" style="margin-top:6px">
          ${escH(org)} &nbsp;·&nbsp; ${escH(year)}
          &nbsp;&nbsp;<span style="color:var(--neon2);letter-spacing:1px;font-size:.65rem">[${escH(cat)}]</span>
        </div>
      </div>
    `;
  } else {
    c.innerHTML = `
      <div style="padding:48px;text-align:center">
        <i class="fas fa-image" style="font-size:4rem;color:var(--dim);opacity:.3;display:block;margin-bottom:16px"></i>
        <div class="cmc-title">${escH(title)}</div>
        <div class="cmc-meta" style="margin-top:8px">${escH(org)} · ${escH(year)}</div>
      </div>
    `;
  }
  document.getElementById('certModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal(id){
  const m=document.getElementById(id);
  if(!m) return;
  m.style.display='none';
  document.body.style.overflow='';
  if(id==='videoModal'){const b=document.getElementById('videoModalBody');if(b)b.innerHTML='';}
}

/* ═══════════════════════════════════
   9. CONTACT FORM
═══════════════════════════════════ */
function sendContact(){
  const name=(document.getElementById('cfName')?.value||'').trim();
  const email=(document.getElementById('cfEmail')?.value||'').trim();
  const sub=(document.getElementById('cfSubject')?.value||'').trim();
  const msg=(document.getElementById('cfMsg')?.value||'').trim();
  const fb=document.getElementById('cfFeedback');
  if(!name||!email||!msg){if(fb){fb.textContent='Isi nama, email, dan pesan ya!';fb.className='err';}return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){if(fb){fb.textContent='Format email tidak valid.';fb.className='err';}return;}
  const mailto=`mailto:firefly1368@gmail.com?subject=${encodeURIComponent(sub||'Portfolio Contact')}&body=${encodeURIComponent('Dari: '+name+'\n\n'+msg)}`;
  window.location.href=mailto;
  if(fb){fb.textContent='Email client dibuka! Pesan siap dikirim 🦋';fb.className='ok';}
  ['cfName','cfEmail','cfSubject','cfMsg'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}

/* ═══════════════════════════════════
   10. HELPERS
═══════════════════════════════════ */
function toggleMobileNav(){document.getElementById('mobileNav')?.classList.toggle('open');}
function updateClock(){const el=document.getElementById('footerTime');if(el)el.textContent=new Date().toLocaleTimeString('id-ID',{hour12:false});}
function escH(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

/* ═══════════════════════════════════
   11. START APP — dipanggil setelah boot
       Musik autoplay via YT IFrame API
═══════════════════════════════════ */
function startApp(){
  document.getElementById('musicPlayer').style.display='flex';
  loadYTAPI(); // ← Ini yang bikin musik otomatis mulai di background
  initParticles();
  typeLoop();
  goPage(0);
  setInterval(updateClock,1000);
  updateClock();
}

/* ═══════════════════════════════════
   12. INIT
═══════════════════════════════════ */
window.addEventListener('DOMContentLoaded',()=>{
  runBoot();
  document.addEventListener('click',(e)=>{
    const nav=document.getElementById('mobileNav');
    const btn=document.getElementById('navBurger');
    if(nav&&!nav.contains(e.target)&&!btn?.contains(e.target)) nav.classList.remove('open');
  });
});
