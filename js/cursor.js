/* ═══════════════════════════════
   js/cursor.js — Custom Cursor
═══════════════════════════════ */
(function initCursor() {
  if (window.innerWidth < 600) return;
  const ring = document.getElementById('cursor-ring');
  const dot  = document.getElementById('cursor-dot');
  if (!ring || !dot) return;

  let mx = -200, my = -200;
  let rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function tick() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  })();

  const hoverSel = 'a, button, .project-card, .contact-link, .rnd-entry, .chip, .tool-tag, .depth-pip';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverSel)) ring.classList.add('hov');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverSel)) ring.classList.remove('hov');
  });
})();
