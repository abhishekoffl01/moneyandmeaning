/* ============================================================
   MONEY AND MEANING — script.js
   All interactivity: loader, navbar, reveals, counters, forms
   ============================================================ */

/* ── 1. LOADING SCREEN ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hidden'), 1800);
});

/* ── 2. NAVBAR ── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

// Scroll → add .scrolled class
window.addEventListener('scroll', () => {
  navbar && navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Hamburger toggle
hamburger && hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileNav  && mobileNav.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile nav on link click
mobileNav && mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar) return;
  if (!navbar.contains(e.target) && mobileNav && mobileNav.classList.contains('open')) {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── 3. ACTIVE NAV LINK ── */
(function highlightNav() {
  const page   = location.pathname.split('/').pop() || 'index.html';
  const links  = document.querySelectorAll('.nav-link, .mobile-nav a');
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html') ||
        href.includes(page.replace('.html','')) && href !== '#') {
      link.classList.add('active');
    }
  });
})();

/* ── 4. SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── 5. STATS COUNTER ── */
function countUp(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const start    = performance.now();
  const tick = now => {
    const p   = Math.min((now - start) / duration, 1);
    const val = Math.round(easeOutCubic(p) * target);
    el.textContent = val.toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(tick);
}
function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { countUp(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

/* ── 6. SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = (navbar ? navbar.offsetHeight : 0) + 16;
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
  });
});

/* ── 7. NEWSLETTER FORM ── */
function setupNlForm(formId, successId) {
  const form    = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"],.nl-submit,.cf-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 900);
  });
}
setupNlForm('nlForm',  'nlSuccess');
setupNlForm('cfForm',  'cfSuccess');

// Footer mini forms
document.querySelectorAll('.f-nl-row').forEach(row => {
  const form = row.closest('form') || row.parentElement;
  const btn  = row.querySelector('.f-nl-btn');
  const inp  = row.querySelector('.f-nl-input');
  if (!btn || !inp) return;
  btn.addEventListener('click', () => {
    if (!inp.value.trim()) { inp.focus(); return; }
    btn.textContent = '✓'; btn.style.background = '#4a9e5c';
    inp.value = ''; inp.placeholder = 'You\'re subscribed!'; inp.disabled = true; btn.disabled = true;
  });
});

/* ── 8. FILTER BUTTONS (articles page) ── */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const cards  = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
      const cat = card.dataset.cat || '';
      const show = filter === 'all' || cat === filter;
      card.style.transition = 'opacity .3s, transform .3s';
      card.style.opacity    = show ? '1' : '0.25';
      card.style.pointerEvents = show ? '' : 'none';
    });
  });
});

/* ── 9. CARD HOVER TILT (subtle, desktop only) ── */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.blog-card, .cat-card, .feat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = ((e.clientX - r.left) / r.width  - 0.5) * 6;
      const y   = ((e.clientY - r.top)  / r.height - 0.5) * -6;
      card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ── 10. READING PROGRESS (articles page) ── */
const progress = document.getElementById('readProgress');
if (progress) {
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - innerHeight;
    progress.style.width = (scrollY / max * 100) + '%';
  }, { passive: true });
}

/* dev console badge */
console.log('%c Money & Meaning ','background:#C9A84C;color:#080808;font-weight:700;padding:6px 14px;font-size:13px;border-radius:4px');
