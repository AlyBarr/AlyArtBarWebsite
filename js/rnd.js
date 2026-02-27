/* ═══════════════════════════════════════════
   js/rnd.js — Render R&D Entries + Nebula FX
═══════════════════════════════════════════ */
(function renderRnD() {
  if (typeof RND_ENTRIES === 'undefined') return;
  const wrap = document.getElementById('rnd-list');
  if (!wrap) return;

  const statusConfig = {
    live:      { dotClass: 'dot-live',      badgeClass: 'status-live',      label: 'LIVE'      },
    wip:       { dotClass: 'dot-wip',       badgeClass: 'status-wip',       label: 'WIP'       },
    exploring: { dotClass: 'dot-exploring', badgeClass: 'status-exploring', label: 'EXPLORING' },
    archived:  { dotClass: 'dot-archived',  badgeClass: 'status-archived',  label: 'ARCHIVED'  },
  };

  RND_ENTRIES.forEach(entry => {
    const cfg = statusConfig[entry.status] || statusConfig.wip;
    const row = document.createElement('div');
    row.className = 'rnd-entry reveal';

    row.innerHTML = `
      <div class="rnd-badge ${cfg.badgeClass}">
        <span class="rnd-dot ${cfg.dotClass}"></span>
        ${cfg.label}
      </div>
      <div class="rnd-body">
        <h3 class="rnd-title">${entry.title}</h3>
        <p class="rnd-hypothesis">${entry.hypothesis}</p>
        <p class="rnd-finding">${entry.finding}</p>
        ${entry.links.length
          ? `<div class="rnd-artifacts">
               ${entry.links.map(l =>
                 `<a href="${l.url}" class="rnd-artifact-link" target="_blank" rel="noopener">↗ ${l.label}</a>`
               ).join('')}
             </div>`
          : ''}
      </div>
    `;
    wrap.appendChild(row);
  });

  // Nebula atmosphere reveal when R&D comes into view
  const section = document.getElementById('rnd');
  if (section) {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('nebula-lit');
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(section);
  }
})();
