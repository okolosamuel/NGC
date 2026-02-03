// Theme toggle persistence
const body = document.body;
const modeBtn = document.getElementById('toggleMode');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.className = savedTheme;
modeBtn.textContent = body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
modeBtn.addEventListener('click', () => {
  const next = body.classList.contains('dark') ? 'light' : 'dark';
  body.className = next;
  localStorage.setItem('theme', next);
  modeBtn.textContent = next === 'dark' ? 'Light Mode' : 'Dark Mode';
});

// Heart animation on load
const heart = document.querySelector('.heart');
heart.classList.add('break');
setTimeout(() => heart.classList.remove('break'), 600);

// Hero imaginary gift
const claimBtn = document.getElementById('claimImaginary');
const imaginaryOutput = document.getElementById('imaginaryOutput');
const imaginaryGifts = [
  'You received Unlimited Peace.',
  'Gift: No Drama for 365 Days.',
  'Delivered by: Self-Respect Express.',
  'Bonus: Battery life +3 hours (no long calls).',
  'Perk: Boundaries upgraded to Premium.',
  'Voucher: “No Forced Couple Photo” (valid all year).',
];
claimBtn.addEventListener('click', () => {
  const pick = imaginaryGifts[Math.floor(Math.random() * imaginaryGifts.length)];
  imaginaryOutput.textContent = pick;
});

// Fake Gift Generator
const genBtn = document.getElementById('generateGift');
const giftResult = document.getElementById('giftResult');
const gifts = [
  { title: 'Unlimited Peace', by: 'Self-Respect Express', note: 'No wahala mode activated.' },
  { title: 'No Drama for 365 Days', by: 'Boundaries Inc.', note: 'Side effects: joy, better skin.' },
  { title: 'Battery Life +3 Hours', by: 'Airplane Mode LLC', note: 'Avoid long gist calls, prosper.' },
  { title: 'Premium “No Forced Captions”', by: 'Caption-Free Co.', note: 'Freedom from “my person” posts.' },
];
genBtn.addEventListener('click', () => {
  const g = gifts[Math.floor(Math.random() * gifts.length)];
  giftResult.innerHTML = `<strong>Gift:</strong> ${g.title}<br/><strong>Delivered by:</strong> ${g.by}<br/><em>${g.note}</em>`;
});

// Roast Wall with simple kindness filter
const roastForm = document.getElementById('roastForm');
const roastInput = document.getElementById('roastInput');
const roastList = document.getElementById('roastList');
const ROASTS_KEY = 'noGiftClubRoasts';

function loadRoasts() {
  const data = JSON.parse(localStorage.getItem(ROASTS_KEY) || '[]');
  roastList.innerHTML = '';
  data.slice().reverse().forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    roastList.appendChild(li);
  });
}
loadRoasts();

function isKindSelfRoast(text) {
  const lower = text.toLowerCase();
  // Block direct targeting or slurs (very simple heuristic)
  const banned = ['you ', 'your ', '@', 'he ', 'she '];
  return !banned.some((b) => lower.includes(b));
}

roastForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = roastInput.value.trim();
  if (!text) return;
  if (!isKindSelfRoast(text)) {
    alert('Self-roast only. Be kind. Avoid targeting others.');
    return;
  }
  const data = JSON.parse(localStorage.getItem(ROASTS_KEY) || '[]');
  data.push(text);
  localStorage.setItem(ROASTS_KEY, JSON.stringify(data));
  roastInput.value = '';
  loadRoasts();
});

// AI Fake Love Letters (templated)
const letterBtn = document.getElementById('generateLetter');
const letterOut = document.getElementById('letterOutput');
const copyBtn = document.getElementById('copyLetter');
const letters = [
  'Dear You, I would’ve bought you flowers, but self-love needed them more.',
  'My dearest me, thank you for choosing peace over bare-minimum energy.',
  'Roses are red, violets are blue, boundaries are healthy, and so are you.',
  'To the soft-life version of me: you’re the upgrade.',
];
letterBtn.addEventListener('click', () => {
  const line = letters[Math.floor(Math.random() * letters.length)];
  letterOut.textContent = line;
});
copyBtn.addEventListener('click', async () => {
  const text = letterOut.textContent.trim();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
  } catch (e) {
    alert('Could not copy. You can select and copy manually.');
  }
});

// Moment of Silence (WebAudio 7 seconds)
const playBtn = document.getElementById('playMoment');
playBtn.addEventListener('click', async () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 261.63; // middle C for soothing
    gain.gain.value = 0.02; // very subtle
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    playBtn.textContent = 'Playing…';
    setTimeout(() => {
      osc.stop();
      ctx.close();
      playBtn.textContent = 'Play 7 Seconds';
    }, 7000);
  } catch (e) {
    alert('Audio not supported here, but your peace is.');
  }
});

// Screenshot Zone: draw badge and enable download
const canvas = document.getElementById('badgeCanvas');
const ctx = canvas.getContext('2d');
function drawBadge() {
  const dark = body.classList.contains('dark');
  const bg = dark ? '#121212' : '#ffffff';
  const fg = dark ? '#eaeaea' : '#1b1b1b';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Heart
  ctx.save();
  ctx.translate(80, 90);
  ctx.rotate(-Math.PI / 4);
  ctx.fillStyle = '#ff8fa3';
  ctx.fillRect(0, 0, 60, 60);
  ctx.beginPath();
  ctx.arc(0, -30, 30, 0, Math.PI * 2);
  ctx.arc(30, 0, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // Text
  ctx.fillStyle = fg;
  ctx.font = '700 36px Inter, Arial';
  ctx.fillText('Officially Unbothered', 160, 140);
  ctx.font = '600 20px Inter, Arial';
  const d = new Date();
  const date = `${String(d.getDate()).padStart(2, '0')} ${d.toLocaleString('en', { month: 'short' })}`;
  ctx.fillText(`– 14 Feb (or ${date}) –`, 160, 180);
  ctx.font = '400 16px Inter, Arial';
  ctx.fillText('#NoGiftClub', 160, 220);
}
drawBadge();

// Redraw badge on theme change
modeBtn.addEventListener('click', () => {
  setTimeout(drawBadge, 0);
});

document.getElementById('downloadBadge').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'officially-unbothered.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// ===== Quest Mode =====
const questBtn = document.getElementById('startQuest');
const overlay = document.getElementById('questOverlay');
const closeQuest = document.getElementById('closeQuest');
const crackOverlay = document.getElementById('crackOverlay');
const screens = {
  intro: document.getElementById('screenIntro'),
  l1: document.getElementById('screenL1'),
  l2: document.getElementById('screenL2'),
  l3: document.getElementById('screenL3'),
  end: document.getElementById('screenEnd'),
};
const beginLevel1 = document.getElementById('beginLevel1');
const l1Feedback = document.getElementById('l1Feedback');
const toLevel2 = document.getElementById('toLevel2');
const huntArea = document.getElementById('huntArea');
const huntFeedback = document.getElementById('huntFeedback');
const toLevel3 = document.getElementById('toLevel3');
const fallArea = document.getElementById('fallArea');
const startFall = document.getElementById('startFall');
const finishQuest = document.getElementById('finishQuest');
const fallFeedback = document.getElementById('fallFeedback');
const endingTitle = document.getElementById('endingTitle');
const endingText = document.getElementById('endingText');
const certCanvas = document.getElementById('certCanvas');
const certCtx = certCanvas.getContext('2d');
const downloadCert = document.getElementById('downloadCert');
const restartQuest = document.getElementById('restartQuest');
const voiceBtn = document.getElementById('voiceBtn');

let questState = { answers: { expectedGift: null }, clicks: 0, caughtAny: false, wrongTaps: 0 };

function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.remove('active'));
  screens[name].classList.add('active');
}
function openQuest() { overlay.classList.add('show'); showScreen('intro'); overlay.setAttribute('aria-hidden', 'false'); }
function closeQuestModal() { overlay.classList.remove('show'); overlay.setAttribute('aria-hidden', 'true'); }
questBtn?.addEventListener('click', openQuest);
closeQuest?.addEventListener('click', closeQuestModal);

beginLevel1.addEventListener('click', () => showScreen('l1'));

screens.l1.querySelectorAll('.choices .btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const choice = btn.dataset.choice;
    questState.answers.expectedGift = choice;
    if (choice === 'yes') {
      screens.l1.classList.add('shake');
      l1Feedback.textContent = 'Denial detected.';
      try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const osc = ctx.createOscillator(); osc.type='square'; osc.frequency.value = 110; const gain=ctx.createGain(); gain.gain.value=0.03; osc.connect(gain).connect(ctx.destination); osc.start(); setTimeout(()=>{osc.stop(); ctx.close();}, 500); } catch {}
      setTimeout(() => screens.l1.classList.remove('shake'), 500);
    } else if (choice === 'no') {
      l1Feedback.textContent = 'Honesty unlocked. Proceed.';
    } else {
      l1Feedback.textContent = 'Soft heart detected. Proceed gently.';
    }
    toLevel2.disabled = false;
  });
});
toLevel2.addEventListener('click', () => showScreen('l2'));

// Level 2: message hunt
questState.clicks = 0;
huntArea.addEventListener('click', () => {
  questState.clicks++;
  const ghost = document.createElement('div');
  ghost.className = 'gift';
  ghost.style.left = Math.random()* (huntArea.clientWidth-80) + 'px';
  ghost.style.top = Math.random()* (huntArea.clientHeight-30) + 'px';
  ghost.textContent = '❤️';
  huntArea.appendChild(ghost);
  setTimeout(()=>ghost.remove(),700);
  if (questState.clicks >= 10) {
    huntFeedback.textContent = 'No message found. You’re free.';
    toLevel3.disabled = false;
  }
});
toLevel3.addEventListener('click', () => showScreen('l3'));

// Level 3: falling gifts
let fallTimer = null; questState.caughtAny = false; questState.wrongTaps = 0;
function spawnGift() {
  const el = document.createElement('div');
  el.className = 'gift';
  el.style.left = Math.random() * (fallArea.clientWidth - 120) + 'px';
  el.style.animation = 'fall 2200ms linear forwards';
  const labels = ['Chocolate', 'Flowers', 'Bracelet', 'Card', 'Peace'];
  const label = labels[Math.floor(Math.random()*labels.length)];
  el.textContent = label;
  el.addEventListener('click', () => {
    if (label === 'Peace') {
      questState.caughtAny = true;
      fallFeedback.textContent = 'Plot twist: Every gift is fake. The real gift was peace.';
    } else {
      questState.wrongTaps++;
    }
    finishQuest.disabled = false;
  });
  fallArea.appendChild(el);
  setTimeout(()=>el.remove(), 2300);
}
startFall.addEventListener('click', () => {
  fallFeedback.textContent = '';
  finishQuest.disabled = true;
  if (fallTimer) clearInterval(fallTimer);
  fallTimer = setInterval(spawnGift, 380);
  setTimeout(()=>{ clearInterval(fallTimer); }, 6000);
});

finishQuest.addEventListener('click', () => {
  if (fallTimer) clearInterval(fallTimer);
  let ending = 'unbothered';
  if (questState.answers.expectedGift === 'yes' || questState.wrongTaps >= 3) ending = 'villain';
  else if (questState.answers.expectedGift === 'maybe') ending = 'soft';
  showScreen('end');
  if (ending === 'villain') { endingTitle.textContent = 'Villain Arc Ending 😈'; endingText.textContent = 'Next Valentine, they’ll regret ignoring you.'; }
  else if (ending === 'soft') { endingTitle.textContent = 'Soft Heart Ending 🫶'; endingText.textContent = 'Love will come. Today is just rest.'; }
  else { endingTitle.textContent = 'Unbothered Ending 😎'; endingText.textContent = 'You enjoyed your day. No stress. No tears.'; }
  drawCertificate(ending);
});

function drawCertificate(ending) {
  const dark = body.classList.contains('dark');
  const bg = dark ? '#121212' : '#ffffff';
  const fg = dark ? '#eaeaea' : '#1b1b1b';
  certCtx.fillStyle = bg; certCtx.fillRect(0,0,certCanvas.width, certCanvas.height);
  certCtx.fillStyle = fg; certCtx.font = '800 28px Inter, Arial';
  certCtx.fillText('Official Valentine Survivor', 40, 70);
  certCtx.font = '600 18px Inter, Arial';
  certCtx.fillText(`Date: 14 Feb`, 40, 110);
  certCtx.fillText(`Gifts Received: 0`, 40, 140);
  certCtx.fillText(`Peace Level: 100%`, 40, 170);
  certCtx.font = '700 20px Inter, Arial';
  certCtx.fillText('Ending:', 40, 220);
  certCtx.font = '600 20px Inter, Arial';
  certCtx.fillText(ending === 'villain' ? 'Villain Arc' : ending === 'soft' ? 'Soft Heart' : 'Unbothered', 120, 220);
  certCtx.fillStyle = '#ff8fa3';
  certCtx.fillRect(40, 260, certCanvas.width-80, 110);
  certCtx.fillStyle = '#1b1b1b'; certCtx.font = '600 24px Inter, Arial';
  certCtx.fillText('Single ≠ lonely. Single = peaceful today.', 60, 300);
  certCtx.fillStyle = fg; certCtx.font = '400 16px Inter, Arial';
  certCtx.fillText('#NoGiftClub', 60, 340);
}
downloadCert.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'valentine-survivor.png';
  link.href = certCanvas.toDataURL('image/png');
  link.click();
});
restartQuest.addEventListener('click', () => { questState = { answers: { expectedGift: null }, clicks: 0, caughtAny: false, wrongTaps: 0 }; showScreen('intro'); });

// Voice button: static and message
voiceBtn.addEventListener('click', async () => {
  try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const bufSize = 2*ctx.sampleRate; const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate); const data = buffer.getChannelData(0); for (let i=0;i<bufSize;i++) data[i] = (Math.random()*2-1)*0.02; const src = ctx.createBufferSource(); src.buffer = buffer; src.connect(ctx.destination); src.start(); setTimeout(()=>{ctx.close();}, 900); } catch {}
  const msg = new SpeechSynthesisUtterance('Singel Bastard with no Val.'); msg.rate = 0.95; try { window.speechSynthesis.speak(msg); } catch {}
});

// Secret code: LOVE => crack overlay + confetti
let typed = '';
document.addEventListener('keydown', (e) => {
  if (overlay.classList.contains('show')) { typed += (e.key || '').toUpperCase(); typed = typed.slice(-4); if (typed === 'LOVE') { crackOverlay.classList.add('show'); fireConfetti(); setTimeout(()=>crackOverlay.classList.remove('show'), 900); } }
});

function fireConfetti() {
  const count = 30;
  const colors = ['#ff8fa3', '#ff3b3b', '#eaeaea'];
  for (let i=0;i<count;i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed'; p.style.top = '-10px'; p.style.left = Math.random()*100 + 'vw';
    p.style.width = '8px'; p.style.height = '12px'; p.style.borderRadius = '2px'; p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    p.style.zIndex = 1200;
    document.body.appendChild(p);
    const duration = 1200 + Math.random()*800;
    p.animate([{ transform: p.style.transform, opacity: 1 }, { transform: `translateY(${window.innerHeight}px) rotate(${Math.random()*360}deg)`, opacity: 0.1 }], { duration, easing: 'ease-out' });
    setTimeout(()=>p.remove(), duration+50);
  }
}

// ===== Rehab Center =====
const startRehab = document.getElementById('startRehab');
const rehabOverlay = document.getElementById('rehabOverlay');
const closeRehab = document.getElementById('closeRehab');
const rehabGate = document.getElementById('rehabGate');
const rehabCheckin = document.getElementById('rehabCheckin');
const rehabDash = document.getElementById('rehabDash');
const btnGotNothing = document.getElementById('btnGotNothing');
const btnHereToLaugh = document.getElementById('btnHereToLaugh');
const rehabName = document.getElementById('rehabName');
const rehabSign = document.getElementById('rehabSign');
const rehabWelcome = document.getElementById('rehabWelcome');
const rehabOnline = document.getElementById('rehabOnline');
const goDashboard = document.getElementById('goDashboard');

function showRehabScreen(screen) {
  [rehabGate, rehabCheckin, rehabDash].forEach(el => el.classList.remove('active'));
  screen.classList.add('active');
}
startRehab?.addEventListener('click', () => { rehabOverlay.classList.add('show'); showRehabScreen(rehabGate); rehabOverlay.setAttribute('aria-hidden','false'); });
closeRehab?.addEventListener('click', () => { rehabOverlay.classList.remove('show'); rehabOverlay.setAttribute('aria-hidden','true'); });
btnGotNothing.addEventListener('click', () => showRehabScreen(rehabCheckin));
btnHereToLaugh.addEventListener('click', () => showRehabScreen(rehabCheckin));

const REHAB_NAMES_KEY = 'rehabNames';
function getNames() { return JSON.parse(localStorage.getItem(REHAB_NAMES_KEY) || '[]'); }
function setNames(arr) { localStorage.setItem(REHAB_NAMES_KEY, JSON.stringify(arr)); }
function updateOnlineCount() {
  const base = 7; // playful baseline
  rehabOnline.textContent = `Total singles online: ${base + getNames().length} (and counting)`;
}
updateOnlineCount();

rehabSign.addEventListener('click', () => {
  const name = (rehabName.value || '').trim();
  if (!name) return;
  const names = getNames();
  if (!names.includes(name)) { names.push(name); setNames(names); }
  rehabWelcome.textContent = `Welcome, ${name}. Another year, another zero.`;
  updateOnlineCount();
  goDashboard.disabled = false;
});
goDashboard.addEventListener('click', () => showRehabScreen(rehabDash));

// Spin game
const rehabWheel = document.getElementById('rehabWheel');
const spinWheel = document.getElementById('spinWheel');
const spinResult = document.getElementById('spinResult');
const spinItems = [
  'No texts at all',
  'Ex texted at 11:59pm',
  'Saw couples everywhere',
  'Pretended not to care'
];
rehabWheel.textContent = 'Spin to reveal your fate';
spinWheel.addEventListener('click', () => {
  rehabWheel.style.transition = 'transform 600ms ease';
  rehabWheel.style.transform = `rotate(${Math.floor(Math.random()*360)}deg)`;
  const pick = spinItems[Math.floor(Math.random() * spinItems.length)];
  setTimeout(() => { spinResult.textContent = pick; }, 620);
});

// Group chat simulator
const chatList = document.getElementById('chatList');
const playChat = document.getElementById('playChat');
const resetChat = document.getElementById('resetChat');
const chatMsgs = [
  'Anyone get anything?',
  'My phone slept all day',
  'Abeg who still dey single here?',
  'System: All members are still single.'
];
let chatTimer = null;
function addChat(text) { const div = document.createElement('div'); div.className = 'chat-item'; div.textContent = text; chatList.appendChild(div); chatList.scrollTop = chatList.scrollHeight; }
playChat.addEventListener('click', () => {
  chatList.innerHTML = '';
  let i = 0;
  chatTimer = setInterval(() => {
    addChat(chatMsgs[i++]);
    if (i >= chatMsgs.length) { clearInterval(chatTimer); }
  }, 900);
});
resetChat.addEventListener('click', () => { chatList.innerHTML = ''; if (chatTimer) clearInterval(chatTimer); });

// Collective gift opening
const openCollectiveGift = document.getElementById('openCollectiveGift');
const collectiveGiftOut = document.getElementById('collectiveGiftOut');
openCollectiveGift.addEventListener('click', () => {
  collectiveGiftOut.textContent = '';
  fireConfetti();
  setTimeout(() => {
    collectiveGiftOut.textContent = '🎁 AIR — Sharing is caring. There was nothing to share.';
  }, 800);
});

// Personality tags
const getPersonality = document.getElementById('getPersonality');
const personalityOut = document.getElementById('personalityOut');
const tags = [
  'Emotionally Stable but Unavailable',
  'Fine but Fearful',
  'Main Character Waiting for Season 2',
  'Soft Life Advocate, Selectively Social',
];
getPersonality.addEventListener('click', () => {
  const tag = tags[Math.floor(Math.random() * tags.length)];
  personalityOut.textContent = tag;
});

// Emergency group button
const callLoverBtn = document.getElementById('callLoverBtn');
const callLoverOut = document.getElementById('callLoverOut');
callLoverBtn.addEventListener('click', () => {
  callLoverOut.textContent = 'Connecting…';
  try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type='sawtooth'; osc.frequency.value = 440; gain.gain.value = 0.02; osc.connect(gain).connect(ctx.destination); osc.start(); setTimeout(()=>{osc.stop(); ctx.close();}, 600); } catch {}
  setTimeout(() => { callLoverOut.textContent = 'Network busy. Try next year.'; }, 700);
});

// Group certificate
const groupCertCanvas = document.getElementById('groupCertCanvas');
const groupCertCtx = groupCertCanvas.getContext('2d');
function drawGroupCert() {
  const dark = body.classList.contains('dark'); const bg = dark ? '#121212' : '#ffffff'; const fg = dark ? '#eaeaea' : '#1b1b1b';
  groupCertCtx.fillStyle = bg; groupCertCtx.fillRect(0,0,groupCertCanvas.width, groupCertCanvas.height);
  groupCertCtx.fillStyle = fg; groupCertCtx.font = '800 26px Inter, Arial'; groupCertCtx.fillText('🏅 CERTIFIED SINGLE SQUAD', 40, 70);
  const year = new Date().getFullYear();
  groupCertCtx.font = '600 18px Inter, Arial'; groupCertCtx.fillText(`Valentine ${year}`, 40, 110);
  const names = getNames();
  groupCertCtx.fillText(`Members: ${names.length ? names.join(', ') : '—'}`, 40, 140);
  groupCertCtx.fillText('Gifts: 0', 40, 170);
  groupCertCtx.fillText('Vibes: Unbothered', 40, 200);
  groupCertCtx.fillText('Wallets: Safe', 40, 230);
  groupCertCtx.fillStyle = '#ff8fa3'; groupCertCtx.fillRect(40, 270, groupCertCanvas.width-80, 100);
  groupCertCtx.fillStyle = '#1b1b1b'; groupCertCtx.font = '600 22px Inter, Arial'; groupCertCtx.fillText('Single ≠ lonely. Single = peaceful today.', 60, 320);
}
drawGroupCert();
document.getElementById('refreshGroupCert').addEventListener('click', drawGroupCert);
document.getElementById('downloadGroupCert').addEventListener('click', () => { const link = document.createElement('a'); link.download = 'single-squad-certificate.png'; link.href = groupCertCanvas.toDataURL('image/png'); link.click(); });