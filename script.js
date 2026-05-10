/* ============================================================
   MONEY AND MEANING — Main JavaScript
   
   TABLE OF CONTENTS:
   1. Navbar: scroll effect + hamburger
   2. Scroll Reveal Animations
   3. Stats Counter Animation
   4. Newsletter Form Handling
   5. Smooth Scroll for Anchor Links
   6. Active Nav Link Highlighting
============================================================ */


/* ─────────────────────────────────────────
   1. NAVBAR — scroll effect + hamburger
───────────────────────────────────────── */

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Add .scrolled class when page scrolls down 60px
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Toggle mobile menu open/closed
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link inside it is clicked
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
});


/* ─────────────────────────────────────────
   2. SCROLL REVEAL ANIMATIONS
   Elements with class "reveal" fade up when
   they enter the viewport
───────────────────────────────────────── */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop watching once revealed (saves performance)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,      // Trigger when 10% of element is visible
    rootMargin: '0px 0px -48px 0px' // Slightly before bottom of viewport
  }
);

// Observe all elements with class "reveal"
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


/* ─────────────────────────────────────────
   3. STATS COUNTER ANIMATION
   Counts up numbers when the stats bar
   scrolls into view
───────────────────────────────────────── */

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'), 10);
  const duration = 1800; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic — slows down at the end
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    // Format number with commas for large numbers
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

// Only animate each counter once when it comes into view
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target); // Only once
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});


/* ─────────────────────────────────────────
   4. NEWSLETTER FORM HANDLING
   Handles both the main newsletter form
   and the footer mini form
───────────────────────────────────────── */

// Main newsletter form
const nlForm    = document.getElementById('nlForm');
const nlSuccess = document.getElementById('nlSuccess');

if (nlForm) {
  nlForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page refresh

    const nameInput  = document.getElementById('nlName');
    const emailInput = document.getElementById('nlEmail');

    // Basic validation
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      showFormError(nameInput.value.trim() ? emailInput : nameInput, 'This field is required.');
      return;
    }

    // In production: send to your email service (Mailchimp, ConvertKit, etc.)
    // For now: simulate success after short delay
    const submitBtn = nlForm.querySelector('.btn-nl-submit');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Subscribing...';

    setTimeout(() => {
      nlForm.style.display = 'none';
      nlSuccess.style.display = 'block';
    }, 800);
  });
}

// Footer newsletter form
const footerNlForm = document.getElementById('footerNlForm');
if (footerNlForm) {
  footerNlForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input[type="email"]');
    const btn   = this.querySelector('button');

    if (!input.value.trim()) return;

    btn.textContent = '✓';
    btn.style.background = '#4CAF50';
    input.value = '';
    input.placeholder = 'Thanks! Check your inbox.';
    input.disabled = true;
    btn.disabled = true;
  });
}

// Simple inline error display
function showFormError(inputEl, message) {
  inputEl.style.borderColor = '#e05252';
  inputEl.focus();

  // Remove error highlight after 3s
  setTimeout(() => {
    inputEl.style.borderColor = '';
  }, 3000);
}


/* ─────────────────────────────────────────
   5. SMOOTH SCROLL FOR ANCHOR LINKS
   Handles #section links with offset for
   the fixed navbar
───────────────────────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const navbarHeight = navbar.offsetHeight;
    const targetTop    = targetEl.getBoundingClientRect().top + window.scrollY;
    const scrollTo     = targetTop - navbarHeight - 16;

    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });
  });
});


/* ─────────────────────────────────────────
   6. ACTIVE NAV LINK HIGHLIGHTING
   Highlights the correct nav link based on
   which section is currently in view
───────────────────────────────────────── */

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active to matching link
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  {
    threshold: 0.4 // Section must be 40% visible to trigger
  }
);

sections.forEach(section => sectionObserver.observe(section));


/* ─────────────────────────────────────────
   BONUS: Console message for devs
───────────────────────────────────────── */
console.log('%c Money & Meaning ', 'background:#D4AF37;color:#0A0A0B;font-weight:bold;padding:6px 12px;font-size:14px;');
console.log('%c Built with purpose. ', 'color:#D4AF37;font-size:12px;');
