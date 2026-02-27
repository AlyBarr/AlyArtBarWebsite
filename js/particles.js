/* ═══════════════════════════════════════════
   js/particles.js — Phase 3 Hero Particles
   Floating bioluminescent dots in hero section
═══════════════════════════════════════════ */
(function initParticles() {
  const wrap = document.getElementById('hero-particles');
  if (!wrap) return;

  const count = 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size  = Math.random() * 3 + 1;
    const x     = Math.random() * 100;
    const y     = Math.random() * 100;
    const dur   = Math.random() * 8 + 5;
    const del   = -(Math.random() * 12);
    const px    = (Math.random() - 0.5) * 30;
    const py    = -(Math.random() * 25 + 8);
    const py2   = -(Math.random() * 14 + 4);
    const op    = Math.random() * 0.3 + 0.07;

    p.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${x}%;
      top:    ${y}%;
      --p-dur: ${dur}s;
      --p-del: ${del}s;
      --p-x:   ${px}px;
      --p-y:   ${py}px;
      --p-y2:  ${py2}px;
      --p-op:  ${op};
    `;
    wrap.appendChild(p);
  }
})();
