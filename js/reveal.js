/* ═══════════════════════════════
   js/reveal.js — Scroll Reveal (dynamic-safe)
═══════════════════════════════ */
(function initReveal() {
  const observed = new WeakSet();

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);

      setTimeout(() => el.classList.add("in"), delay);

      obs.unobserve(el);
    });
  }, { threshold: 0.1 });

  function applyStaggerAndObserve(root = document) {
    const nodes = root.querySelectorAll ? root.querySelectorAll(".reveal") : [];
    nodes.forEach((el) => {
      if (observed.has(el)) return;
      observed.add(el);

      // Auto-stagger siblings in same parent
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll(".reveal"));
        const idx = siblings.indexOf(el);
        if (!el.dataset.delay) el.dataset.delay = String(idx * 80);
      }

      obs.observe(el);
    });
  }

  // 1) Observe anything already in DOM
  applyStaggerAndObserve(document);

  // 2) Observe anything injected later (projects.js etc.)
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof Element)) continue;

        // If the added node itself is reveal, or contains reveal children
        if (node.classList && node.classList.contains("reveal")) {
          applyStaggerAndObserve(node.parentElement || document);
        } else {
          applyStaggerAndObserve(node);
        }
      }
    }
  });

  mo.observe(document.body, { childList: true, subtree: true });
})();
