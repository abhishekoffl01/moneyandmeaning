/* ============================================================
   MONEY AND MEANING — script.js
   ============================================================ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('out');
    document.body.style.overflow = '';
  }, 1600);
});
document.body.style.overflow = 'hidden';

/* ── CUSTOM CURSOR ── */
(function () {
  const dot   = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!dot || !trail || window.matchMedia('(pointer:coarse)').matches) return;

  let tx = 0, ty = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left   = tx + 'px';
    dot.style.top    = ty + 'px';
  });

  (function lerp() {
    rx += (tx - rx) * .12;
    ry += (ty - ry) * .12;
    trail.style.left = rx + 'px';
    trail.style.top  = ry + 'px';
    requestAnimationFrame(lerp);
  })();
})();

/* ── HERO CANVAS — floating particles ── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - .5) * .3;
      this.vy = -(Math.random() * .4 + .15);
      this.r  = Math.random() * 1.5 + .5;
      this.o  = Math.random() * .5 + .1;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 150;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset(false);
    }
    draw() {
      const progress = this.life / this.maxLife;
      const alpha = progress < .1
        ? (progress / .1) * this.o
        : progress > .8
          ? ((1 - progress) / .2) * this.o
          : this.o;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(191,160,90,${alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();
})();

/* ── NAVBAR STICKY ── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 60);
  }, { passive: true });
})();

/* ── MOBILE MENU ── */
(function () {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (!burger || !drawer) return;

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ── COUNTER ANIMATION ── */
(function () {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;

  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const suffix   = target >= 1000 ? 'K+' : target >= 10 ? '+' : '';
    const display  = target >= 1000 ? Math.round(target / 1000) : target;
    const start    = performance.now();

    function tick(now) {
      const p   = Math.min((now - start) / duration, 1);
      const val = Math.round(ease(p) * display);
      el.textContent = p < 1 ? val.toLocaleString() : display.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => obs.observe(el));
})();

/* ── SMOOTH ANCHOR SCROLL ── */
(function () {
  const nav = document.getElementById('nav');
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const offset = (nav ? nav.offsetHeight : 0) + 16;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
})();

/* ── NEWSLETTER FORM ── */
(function () {
  const form    = document.getElementById('nlForm');
  const success = document.getElementById('nlSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.nl-btn');
    if (btn) { btn.disabled = true; btn.querySelector('.nl-btn-text').textContent = 'Subscribing…'; }
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
    }, 900);
  });
})();

/* ── FOOTER MINI FORM ── */
(function () {
  const btn = document.querySelector('.footer-nl button');
  const inp = document.querySelector('.footer-nl input');
  if (!btn || !inp) return;

  btn.addEventListener('click', () => {
    if (!inp.value.trim()) { inp.focus(); return; }
    btn.textContent = '✓'; btn.style.background = '#4a9e5c';
    inp.value = ''; inp.placeholder = 'You\'re subscribed!';
    inp.disabled = true; btn.disabled = true;
  });
})();

/* ── CARD TILT (desktop only) ── */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.art-card, .cat-tile, .hero-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 5;
      const y = ((e.clientY - r.top)  / r.height - .5) * -5;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg) perspective(800px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ── MARQUEE PAUSE ON HOVER ── */
(function () {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const bar = track.closest('.marquee-bar');
  if (!bar) return;
  bar.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  bar.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();

/* ── PARALLAX HERO BG (subtle, perf-safe) ── */
(function () {
  const hero = document.querySelector('.hero');
  const mesh = document.querySelector('.hero-mesh');
  if (!hero || !mesh || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        mesh.style.transform = `translateY(${y * .15}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

/* dev badge */
console.log('%c ◆ Money & Meaning ', 'background:#BFA05A;color:#07070A;font-weight:800;padding:6px 14px;font-size:14px;border-radius:4px;font-family:serif');
