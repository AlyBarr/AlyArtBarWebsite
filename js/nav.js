/* ═══════════════════════════════
   js/nav.js — Navigation
═══════════════════════════════ */
(function initNav() {
  const nav    = document.getElementById('site-nav');
  const burger = document.getElementById('nav-burger');
  const links  = document.getElementById('nav-links');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('#nav-links a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
    })
  );
})();
