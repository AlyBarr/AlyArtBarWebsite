/* ═══════════════════════════════════════════
   js/parallax.js — Phase 3 Mouse Parallax
   Elements with [data-parallax] shift subtly
   opposite to cursor for depth-of-field feel.
═══════════════════════════════════════════ */
(function initParallax() {
  const els = document.querySelectorAll('[data-parallax]');
  if (!els.length) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth  - 0.5);
    targetY = (e.clientY / window.innerHeight - 0.5);
  });

  (function tick() {
    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;
    els.forEach(el => {
      const speed = parseFloat(el.dataset.speed || 0.008);
      const dx = currentX * speed * window.innerWidth  * -1;
      const dy = currentY * speed * window.innerHeight * -1;
      el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
    });
    requestAnimationFrame(tick);
  })();
})();
