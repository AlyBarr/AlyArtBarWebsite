/* ═══════════════════════════════════════════
   js/projects.js — Render Projects from Data
═══════════════════════════════════════════ */
(function renderProjects() {
  if (typeof PROJECTS === 'undefined') return;

  const featuredWrap = document.getElementById('featured-projects');
  const gridWrap     = document.getElementById('project-grid');
  if (!featuredWrap || !gridWrap) return;

  const featuredProjects = PROJECTS.filter(p => p.featured);
  const gridProjects     = PROJECTS.filter(p => !p.featured);

  // ── Featured rows ──
  const featContainer = document.createElement('div');
  featContainer.className = 'featured-wrap';

  featuredProjects.forEach((p, i) => {
    const isReversed = i % 2 !== 0;
    const hasImage   = p.image && p.image.trim() !== '';

    const row = document.createElement('div');
    row.className = `featured-row${isReversed ? ' reversed' : ''} reveal`;

    row.innerHTML = `
      <div class="featured-image">
        ${hasImage
          ? `<img src="${p.image}" alt="${p.title}" loading="lazy" />
             <div class="featured-image-overlay"></div>`
          : `<div class="featured-placeholder">
               <span class="placeholder-icon">⬡</span>
               <span class="placeholder-text">image placeholder</span>
             </div>`
        }
      </div>
      <div class="featured-copy">
        <p class="project-category">${p.category}</p>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-oneliner">${p.oneliner}</p>
        <ul class="project-bullets">
          ${p.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div class="project-tools">
          ${p.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.links.map(l => `<a href="${l.url}" class="project-link" target="_blank" rel="noopener">↗ ${l.label}</a>`).join('')}
        </div>
      </div>
    `;
    featContainer.appendChild(row);
  });

  featuredWrap.appendChild(featContainer);

  // ── Card surface lighting ──
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.project-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--card-x', x + '%');
      card.style.setProperty('--card-y', y + '%');
    });
  });

  // ── Grid cards ──
  gridProjects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';

    card.innerHTML = `
      <span class="card-number">${String(featuredProjects.length + i + 1).padStart(2, '0')}</span>
      <p class="project-category">${p.category}</p>
      <h3 class="project-title" style="font-size:var(--t-lg)">${p.title}</h3>
      <p class="project-oneliner" style="margin-bottom:1rem">${p.oneliner}</p>
      <ul class="project-bullets">
        ${p.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
      <div class="project-tools">
        ${p.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
      </div>
      <div class="project-links" style="margin-top:1rem">
        ${p.links.map(l => `<a href="${l.url}" class="project-link" target="_blank" rel="noopener">↗ ${l.label}</a>`).join('')}
      </div>
    `;
    gridWrap.appendChild(card);
  });
})();
