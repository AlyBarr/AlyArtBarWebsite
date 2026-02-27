/* ═══════════════════════════════
   js/reveal.js — Scroll Reveal
═══════════════════════════════ */
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('in'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Auto-stagger siblings in same parent
    const siblings = [...el.parentElement.querySelectorAll('.reveal')];
    const idx = siblings.indexOf(el);
    if (!el.dataset.delay) el.dataset.delay = idx * 80;
    obs.observe(el);
  });
})();
