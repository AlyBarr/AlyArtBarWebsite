/* ═══════════════════════════════
   js/stars.js — Starfield Canvas
═══════════════════════════════ */
(function initStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];
  const N = 160;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  function makeStar() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.2 + 0.2,
      a:  Math.random() * 0.4 + 0.08,
      vy: Math.random() * 0.10 + 0.02,
      vx: (Math.random() - 0.5) * 0.018,
      ph: Math.random() * Math.PI * 2
    };
  }

  window.addEventListener('resize', resize);
  resize();
  stars = Array.from({ length: N }, makeStar);

  let t = 0;
  (function frame() {
    ctx.clearRect(0, 0, W, H);
    t += 0.005;
    for (const s of stars) {
      s.y -= s.vy;
      s.x += s.vx;
      if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
      if (s.x < -2)  s.x = W + 2;
      if (s.x > W+2) s.x = -2;
      const alpha = s.a * (0.65 + 0.35 * Math.sin(t * 1.3 + s.ph));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,230,240,${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  })();
})();
