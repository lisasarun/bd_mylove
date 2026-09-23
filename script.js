/**
 * Romantic Birthday Experience - JavaScript Logic
 * For My Love / Besdong
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initEnvelope();
  initCakeCandle();
  initAudioPlayer();
  initLoveTimer();
  initPolaroidUploader();
});

/* =========================================================
   1. AMBIENT BACKGROUND (Floating Hearts & Stars)
   ========================================================= */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  class FloatingParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 12 + 6;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.isHeart = Math.random() > 0.4; // 60% hearts, 40% twinkling stars
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.005) * 0.5 + this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      if (this.isHeart) {
        // Draw Heart Shape
        ctx.fillStyle = '#ff758f';
        ctx.beginPath();
        const s = this.size * 0.6;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s, -s, -s * 1.5, s * 0.5, 0, s * 1.4);
        ctx.bezierCurveTo(s * 1.5, s * 0.5, s, -s, 0, 0);
        ctx.fill();
      } else {
        // Draw Twinkling Stardust
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
        ctx.shadowColor = '#ffd166';
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new FloatingParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* =========================================================
   2. ENVELOPE OPENING INTERACTION
   ========================================================= */
function initEnvelope() {
  const envelope = document.getElementById('love-envelope');
  const openBtn = document.getElementById('open-envelope-btn');
  const envelopeSection = document.getElementById('envelope-section');
  const mainContent = document.getElementById('main-content');
  let opened = false;

  function openSurprise() {
    if (opened) return;
    opened = true;

    envelope.classList.add('opened');

    // Sweet Chime SFX & Start Music
    playChime();
    startMusic();

    // Heart Confetti Cannon Burst
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffd166', '#ffffff']
      });
    }

    // Transition to main content smoothly
    setTimeout(() => {
      envelopeSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      envelopeSection.style.opacity = '0';
      envelopeSection.style.transform = 'scale(0.95)';

      setTimeout(() => {
        envelopeSection.style.display = 'none';
        mainContent.classList.remove('hidden-scene');
        mainContent.classList.add('show-scene');

        // Second celebratory burst
        celebrateAgain();
      }, 700);
    }, 1400);
  }

  envelope.addEventListener('click', openSurprise);
  openBtn.addEventListener('click', openSurprise);
}

/* =========================================================
   3. CAKE & CANDLE BLOWOUT
   ========================================================= */
function initCakeCandle() {
  const candle = document.getElementById('birthday-candle');
  const blowBtn = document.getElementById('blow-candles-btn');
  const wishStatus = document.getElementById('wish-status');
  let blownOut = false;

  function blowCandle() {
    if (blownOut) return;
    blownOut = true;

    candle.classList.add('blown-out');
    blowBtn.style.display = 'none';
    wishStatus.classList.remove('hidden');

    // Blow SFX (synthesized wind whoosh)
    playWhoosh();

    // Big Romantic Confetti Explosion
    celebrateMassive();
  }

  candle.addEventListener('click', blowCandle);
  blowBtn.addEventListener('click', blowCandle);
}

function celebrateMassive() {
  if (typeof confetti !== 'function') return;

  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 60 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ['#ff4d6d', '#ff758f', '#ffd166', '#c9184a']
    }));
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ['#ff4d6d', '#ffb3c1', '#f4e8c1', '#ffffff']
    }));
  }, 250);
}

function celebrateAgain() {
  if (typeof confetti !== 'function') return;
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.7 },
    colors: ['#ff4d6d', '#ffd166', '#ff758f', '#fff']
  });
}

/* =========================================================
   4. ROMANTIC MUSIC (WEB AUDIO API SYNTHESIZER & MP3 UPLOAD)
   ========================================================= */
let audioCtx = null;
let isPlaying = false;
let synthTimer = null;

function initAudioPlayer() {
  const toggleBtn = document.getElementById('music-toggle-btn');
  const customAudioInput = document.getElementById('custom-audio-input');
  const bgAudio = document.getElementById('bg-audio');

  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });

  // Custom Audio File Upload Handler
  customAudioInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      bgAudio.src = fileUrl;
      bgAudio.play().then(() => {
        stopSynth();
        isPlaying = true;
        updateMusicUI(true, 'Playing: ' + file.name.substring(0, 15) + '...');
      }).catch(err => {
        console.warn('Audio play error:', err);
      });
    }
  });
}

function startMusic() {
  const bgAudio = document.getElementById('bg-audio');
  if (bgAudio.src && bgAudio.src !== window.location.href) {
    bgAudio.play().then(() => {
      isPlaying = true;
      updateMusicUI(true, 'Playing Custom Song');
    }).catch(() => {});
    return;
  }

  // Play synthesized acoustic music box chords
  startRomanticSynth();
  isPlaying = true;
  updateMusicUI(true, 'Romantic Melody Playing 🎶');
}

function stopMusic() {
  const bgAudio = document.getElementById('bg-audio');
  if (bgAudio.src) {
    bgAudio.pause();
  }
  stopSynth();
  isPlaying = false;
  updateMusicUI(false, 'Play Romantic Melody');
}

function updateMusicUI(active, text) {
  const btn = document.getElementById('music-toggle-btn');
  const textSpan = document.getElementById('music-text');
  const iconSpan = document.getElementById('music-icon');
  if (!btn) return;

  if (active) {
    btn.classList.add('playing');
    iconSpan.textContent = '⏸';
  } else {
    btn.classList.remove('playing');
    iconSpan.textContent = '🎵';
  }
  textSpan.textContent = text;
}

// Romantic Music Box Synthesizer (Cmaj7 -> Am9 -> Fmaj7 -> Gsus4)
function startRomanticSynth() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  stopSynth();

  // Romantic chord progression notes (frequencies in Hz)
  // C major 7, A minor 7, F major 7, G suspended / G6
  const progression = [
    // Cmaj7 (C4, E4, G4, B4, E5)
    [261.63, 329.63, 392.00, 493.88, 659.25],
    // Am7 (A3, C4, E4, G4, C5)
    [220.00, 261.63, 329.63, 392.00, 523.25],
    // Fmaj7 (F3, A3, C4, E4, A4)
    [174.61, 220.00, 261.63, 329.63, 440.00],
    // G6/Gsus4 (G3, B3, D4, G4, B4)
    [196.00, 246.94, 293.66, 392.00, 493.88]
  ];

  let chordIndex = 0;
  let noteIndex = 0;

  function playNextArpeggioNote() {
    if (!isPlaying && chordIndex > 0) return;

    const currentChord = progression[chordIndex];
    const freq = currentChord[noteIndex];

    playTone(freq, 0.8, 'sine');

    noteIndex++;
    if (noteIndex >= currentChord.length) {
      noteIndex = 0;
      chordIndex = (chordIndex + 1) % progression.length;
      synthTimer = setTimeout(playNextArpeggioNote, 600); // Breathe between chords
    } else {
      synthTimer = setTimeout(playNextArpeggioNote, 340); // Gentle arpeggio timing
    }
  }

  playNextArpeggioNote();
}

function stopSynth() {
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
}

function playTone(frequency, duration, type = 'sine') {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;

    // Smooth music-box / harp envelope
    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    console.warn(e);
  }
}

function playChime() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playTone(523.25, 1.2, 'triangle'); // C5
  setTimeout(() => playTone(659.25, 1.2, 'triangle'), 150); // E5
  setTimeout(() => playTone(783.99, 1.5, 'triangle'), 300); // G5
  setTimeout(() => playTone(1046.50, 2.0, 'sine'), 450); // C6
}

function playWhoosh() {
  if (!audioCtx) return;
  try {
    const bufferSize = audioCtx.sampleRate * 0.6;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, audioCtx.currentTime);
    filter.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.6);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start();
  } catch (e) {}
}

/* =========================================================
   5. POLAROID IMAGE UPLOAD CUSTOMIZER (WITH PERSISTENCE)
   ========================================================= */

function handleDirectUpload(event, index) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Data = e.target.result;
    const img = document.getElementById(`photo-${index}`);
    if (img) {
      img.src = base64Data;
    }

    // Save to localStorage so it stays permanently!
    try {
      localStorage.setItem(`besdong_photo_${index}`, base64Data);
    } catch (err) {
      console.warn('Storage quota exceeded or error:', err);
    }

    // Celebratory sparkle
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#ff4d6d', '#ff758f', '#ffd166']
      });
    }
  };
  reader.readAsDataURL(file);
}

function restoreSavedPhotos() {
  for (let i = 0; i < 4; i++) {
    try {
      const saved = localStorage.getItem(`besdong_photo_${i}`);
      if (saved) {
        const img = document.getElementById(`photo-${i}`);
        if (img) img.src = saved;
      }
    } catch (e) {}
  }
}

function initPolaroidUploader() {
  restoreSavedPhotos();
}

/* =========================================================
   6. LOVE COUNTER / TIME SINCE WE MET
   ========================================================= */
function initLoveTimer() {
  // Default start date (1 year ago today, customizable)
  const now = new Date();
  const defaultStartDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), 0, 0, 0);

  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-minutes');
  const secsEl = document.getElementById('timer-seconds');

  function updateTimer() {
    const currentTime = new Date();
    const diff = currentTime - defaultStartDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
