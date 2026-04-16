/* ============================================================
   PORTFOLIO — script.js
   Features:
     - Smooth scroll for nav links
     - Scroll-reveal (fade-in) for .reveal elements
     - Active nav link highlight on scroll
     - Navbar background on scroll
   ============================================================ */

/* ── 1. DOM ready ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSmoothScroll();
  initActiveNav();
  initNavbarShrink();
  initProjectCardHover();
});

/* ── 2. Scroll-reveal (fade-in on scroll) ─────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, stop watching (saves performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.10,  // trigger when 10% in view
      rootMargin: '0px 0px -40px 0px'
    }
  );

  targets.forEach(el => observer.observe(el));
}

/* ── 3. Smooth scroll for nav & scroll-cue ───────────────── */
function initSmoothScroll() {
  // All anchor links
  document.querySelectorAll('a[href^="#"], button[data-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      const href  = el.getAttribute('href') || el.getAttribute('data-target');
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── 4. Active nav link on scroll ────────────────────────── */
function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

/* ── 5. Navbar shrink / background on scroll ─────────────── */
function initNavbarShrink() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(237,224,212,0.96)';
      nav.style.boxShadow  = '0 2px 16px rgba(118,78,66,.14)';
    } else {
      nav.style.background = 'rgba(237,224,212,0.88)';
      nav.style.boxShadow  = 'none';
    }
  }, { passive: true });
}

/* ── 6. Project card hover lift (touch devices fallback) ──── */
function initProjectCardHover() {
  // CSS already handles desktop hover. This adds subtle focus for
  // keyboard / screen-reader users.
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('focusin',  () => card.classList.add('focused'));
    card.addEventListener('focusout', () => card.classList.remove('focused'));
  });
}
