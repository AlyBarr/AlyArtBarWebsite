/* ═══════════════════════════════════════════
   js/constellation.js — Phase 3 Skill Canvas
   Interactive node graph — hover to explore
═══════════════════════════════════════════ */
(function initConstellation() {
  const canvas = document.getElementById('skill-canvas');
  if (!canvas || typeof SKILLS === 'undefined') return;

  const ctx = canvas.getContext('2d');
  let W, H, hoveredId = null;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = 420;
  }

  // Hydrate nodes with animation state
  const nodes = SKILLS.map(s => ({
    ...s,
    cx: s.x, cy: s.y,    // current (animated) position
    phase: Math.random() * Math.PI * 2,
    floatAmp: 0.012 + Math.random() * 0.008,
    floatSpd: 0.4  + Math.random() * 0.3,
  }));

  // Build edge list from links
  const edges = [];
  nodes.forEach(n => {
    (n.links || []).forEach(targetId => {
      const target = nodes.find(x => x.id === targetId);
      if (target) edges.push({ a: n, b: target });
    });
  });

  // Mouse tracking
  let mouseX = -999, mouseY = -999;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    hoveredId = null;
    for (const n of nodes) {
      const dx = mouseX - n.cx * W;
      const dy = mouseY - n.cy * H;
      if (Math.sqrt(dx*dx + dy*dy) < n.r + 14) {
        hoveredId = n.id;
        break;
      }
    }
  });

  canvas.addEventListener('mouseleave', () => {
    hoveredId = null;
    mouseX = -999;
    mouseY = -999;
  });

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.012;

    // Animate node float
    nodes.forEach(n => {
      n.cx = n.x + Math.sin(t * n.floatSpd + n.phase) * n.floatAmp;
      n.cy = n.y + Math.cos(t * n.floatSpd * 0.7 + n.phase) * n.floatAmp * 0.6;
    });

    // Draw edges
    edges.forEach(({ a, b }) => {
      const ax = a.cx * W, ay = a.cy * H;
      const bx = b.cx * W, by = b.cy * H;
      const isActive = hoveredId === a.id || hoveredId === b.id;
      const alpha = isActive ? 0.35 : 0.08;

      const grad = ctx.createLinearGradient(ax, ay, bx, by);
      grad.addColorStop(0, `rgba(61,255,208,${alpha})`);
      grad.addColorStop(1, `rgba(126,232,216,${alpha * 0.6})`);

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = isActive ? 1.5 : 0.75;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(n => {
      const x = n.cx * W, y = n.cy * H;
      const isHovered = hoveredId === n.id;
      const r = n.r + (isHovered ? 8 : 0);
      const pulse = isHovered ? 1 : (0.85 + 0.15 * Math.sin(t * 1.5 + n.phase));

      // Glow halo
      if (n.glow || isHovered) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        g.addColorStop(0, `rgba(61,255,208,${isHovered ? 0.18 : 0.07})`);
        g.addColorStop(1, 'rgba(61,255,208,0)');
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Node body
      const bg = ctx.createRadialGradient(x - r*0.3, y - r*0.3, 0, x, y, r);
      bg.addColorStop(0, `rgba(61,255,208,${0.25 * pulse})`);
      bg.addColorStop(0.6, `rgba(26,96,112,${0.5 * pulse})`);
      bg.addColorStop(1,   `rgba(9,24,40,${0.8 * pulse})`);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();

      // Border ring
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered
        ? 'rgba(61,255,208,0.9)'
        : `rgba(61,255,208,${0.35 * pulse})`;
      ctx.lineWidth = isHovered ? 1.5 : 0.75;
      ctx.stroke();

      // Label
      const fontSize = isHovered ? 12 : 10;
      ctx.font = `${isHovered ? 500 : 400} ${fontSize}px 'Fira Code', monospace`;
      ctx.fillStyle = isHovered ? 'rgba(230,243,248,0.95)' : 'rgba(135,176,196,0.7)';
      ctx.textAlign     = 'center';
      ctx.textBaseline  = 'middle';
      ctx.fillText(n.label, x, y + r + (isHovered ? 14 : 12));
    });

    requestAnimationFrame(draw);
  }

  // Only start when visible
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      resize();
      draw();
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(canvas);

  window.addEventListener('resize', resize);
})();
