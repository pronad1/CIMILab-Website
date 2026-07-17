/* ─── Navbar: scroll glass + mobile drawer + active link ─── */
(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeIcon = menuBtn ? menuBtn.querySelector('.icon-close') : null;
  const openIcon  = menuBtn ? menuBtn.querySelector('.icon-menu')  : null;

  // ── Scroll glass effect ──────────────────────────────────
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Mobile menu toggle ───────────────────────────────────
  let menuOpen = false;

  function toggleMenu(force) {
    menuOpen = typeof force === 'boolean' ? force : !menuOpen;
    if (!mobileMenu || !menuBtn) return;

    if (menuOpen) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (openIcon)  openIcon.style.display  = 'none';
      if (closeIcon) closeIcon.style.display = 'block';
    } else {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (openIcon)  openIcon.style.display  = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', function () { toggleMenu(); });

  // Close on mobile nav link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () { toggleMenu(false); });
  });

  // ── Active link highlighting ─────────────────────────────
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(function (link) {
    const href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });
})();
