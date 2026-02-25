// =============================================================
// main.js — AlyArtBar Portfolio
// Alyssa Barrientos | Technical Artist
// =============================================================

'use strict';

// ── Utils ──────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Footer year ───────────────────────────────────────────────
$('#footer-year').textContent = new Date().getFullYear();

// =============================================================
// TERMINAL INTRO
// =============================================================
(async function initTerminal() {
  const screen  = $('#terminal-intro');
  const body_el = $('#term-body');
  const skip_btn = $('#term-skip');
  if (!screen) return;

  document.body.classList.add('intro-active');
  let skipped = false;

  function dismiss() {
    if (skipped) return;
    skipped = true;
    screen.classList.add('hidden');
    document.body.classList.remove('intro-active');
  }

  document.addEventListener('keydown', dismiss);
  skip_btn?.addEventListener('click', dismiss);
  screen.addEventListener('click', dismiss);

  async function type(el, text, speed = 50) {
    for (const ch of text) {
      if (skipped) return;
      el.innerHTML = el.innerHTML.replace('<span class="term-caret"></span>', '') + ch + '<span class="term-caret"></span>';
      await sleep(speed + Math.random() * 25);
    }
  }

  function addLine(html) {
    const el = document.createElement('div');
    el.className = 'term-line';
    el.innerHTML = html;
    body_el.appendChild(el);
    return el;
  }

  await sleep(300);
  if (skipped) return;

  // Line 1: prompt
  const promptLine = addLine('<span class="term-prompt">alyartbar@portfolio:~$</span> <span id="cmd"></span><span class="term-caret"></span>');
  const cmdSpan = promptLine.querySelector('#cmd');
  await type(cmdSpan, 'init --verbose', 42);
  if (skipped) return;
  promptLine.querySelector('.term-caret')?.remove();

  await sleep(280);
  if (skipped) return;
  addLine('<span class="term-output-dim">→ Loading profile...</span>');
  await sleep(350);

  const nameEl = addLine('');
  await type(nameEl, '  NAME         ', 30);
  nameEl.innerHTML = nameEl.innerHTML.replace('<span class="term-caret"></span>', '') + '<span class="term-output-name">Alyssa Barrientos</span>';
  await sleep(200);
  if (skipped) return;

  const roleEl = addLine('');
  await type(roleEl, '  ROLE         ', 30);
  roleEl.innerHTML = roleEl.innerHTML.replace('<span class="term-caret"></span>', '') + '<span class="term-output-role">Technical Artist · Procedural Systems · Pipelines</span>';
  await sleep(200);
  if (skipped) return;

  addLine('  STATUS       <span class="term-output-dim">● Early career — building in public</span>');
  await sleep(800);
  if (skipped) return;

  addLine('');
  addLine('<span style="color:var(--c-biolume)">✦ Portfolio initialized. Welcome.</span>');

  await sleep(1500);
  dismiss();
})();

// =============================================================
// STARFIELD CANVAS
// =============================================================
(function initStarfield() {
  const canvas = $('#starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];
  const NUM_STARS = 140;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.15 + 0.03,
      drift: (Math.random() - 0.5) * 0.03,
      phase: Math.random() * Math.PI * 2
    };
  }

  function init() { resize(); stars = Array.from({ length: NUM_STARS }, mkStar); }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;
    for (const s of stars) {
      s.y -= s.speed;
      s.x += s.drift;
      if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
      if (s.x < -2) s.x = W + 2;
      if (s.x > W + 2) s.x = -2;
      const twinkle = s.a * (0.7 + 0.3 * Math.sin(t * 1.5 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,244,248,${twinkle})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();

// =============================================================
// CUSTOM CURSOR
// =============================================================
(function initCursor() {
  if (window.innerWidth < 600) return; // disable on mobile
  const cursor = $('#cursor');
  const trail  = $('#cursor-trail');
  if (!cursor || !trail) return;

  let mx = -100, my = -100;
  let tx = -100, ty = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function tick() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    // Trail lags behind
    tx += (mx - tx) * 0.15;
    ty += (my - ty) * 0.15;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  // Hover state on interactive elements
  const hoverEls = 'a, button, .project-card, .contact-link, .rnd-entry, .btn, .term-skip';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) {
      cursor.classList.add('hover');
      trail.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) {
      cursor.classList.remove('hover');
      trail.classList.remove('hover');
    }
  });
})();

// =============================================================
// NAV — scroll state + mobile toggle
// =============================================================
(function initNav() {
  const nav    = $('#site-nav');
  const toggle = $('#nav-toggle');
  const links  = $('#nav-links');
  if (!nav) return;

  // Scroll blur
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on link click (mobile)
  $$('a', links).forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
})();

// =============================================================
// SCROLL REVEAL — IntersectionObserver
// =============================================================
(function initReveal() {
  const els = $$('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children if there are multiple in a parent
        setTimeout(() => entry.target.classList.add('visible'),
          entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
})();

// =============================================================
// CARD SURFACE LIGHTING EFFECT
// =============================================================
(function initCardLighting() {
  document.addEventListener('mousemove', e => {
    $$('.project-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--card-x', `${x}%`);
      card.style.setProperty('--card-y', `${y}%`);
    });
  });
})();

// =============================================================
// RENDER PROJECTS FROM DATA
// =============================================================
(function renderProjects() {
  if (typeof PROJECTS === 'undefined') return;

  const featuredContainer = $('#featured-projects');
  const gridContainer     = $('#project-grid');

  const featured = PROJECTS.filter(p => p.featured);
  const grid     = PROJECTS.filter(p => !p.featured);

  // ── Featured rows ──
  featured.forEach((p, i) => {
    const isReversed = i % 2 !== 0;
    const hasImage = p.image && p.image !== '';

    const el = document.createElement('div');
    el.className = `featured-card${isReversed ? ' reversed' : ''} reveal`;
    el.setAttribute('data-delay', i * 100);

    el.innerHTML = `
      <div class="featured-img">
        ${hasImage
          ? `<img src="${p.image}" alt="${p.imageAlt}" loading="lazy" /><div class="featured-img-overlay"></div>`
          : `<div class="featured-img-placeholder"><span class="placeholder-icon">⬡</span><span style="font-family:var(--font-mono);font-size:var(--text-micro);color:var(--c-ghost)">image placeholder</span></div>`
        }
      </div>
      <div class="featured-text">
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
    featuredContainer.appendChild(el);
  });

  // ── Grid cards ──
  grid.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'project-card reveal';
    el.setAttribute('data-delay', i * 80);

    el.innerHTML = `
      <span class="card-number">${String(i + featured.length + 1).padStart(2, '0')}</span>
      <p class="project-category">${p.category}</p>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-oneliner">${p.oneliner}</p>
      <ul class="project-bullets">
        ${p.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
      <div class="project-tools">
        ${p.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
      </div>
      <div class="project-links" style="margin-top:0.8rem">
        ${p.links.map(l => `<a href="${l.url}" class="project-link" target="_blank" rel="noopener">↗ ${l.label}</a>`).join('')}
      </div>
    `;
    gridContainer.appendChild(el);
  });
})();

// =============================================================
// RENDER R&D ENTRIES FROM DATA
// =============================================================
(function renderRnD() {
  if (typeof RND_ENTRIES === 'undefined') return;
  const container = $('#rnd-list');
  if (!container) return;

  const statusConfig = {
    live:     { label: 'LIVE',      dotClass: 'live',     badgeClass: 'badge-live'     },
    wip:      { label: 'WIP',       dotClass: 'wip',      badgeClass: 'badge-wip'      },
    exploring:{ label: 'EXPLORING', dotClass: 'explore',  badgeClass: 'badge-explore'  },
    archived: { label: 'ARCHIVED',  dotClass: 'archived', badgeClass: 'badge-archived' }
  };

  RND_ENTRIES.forEach((entry, i) => {
    const cfg = statusConfig[entry.status] || statusConfig.wip;
    const el = document.createElement('div');
    el.className = 'rnd-entry reveal';
    el.setAttribute('data-delay', i * 70);

    el.innerHTML = `
      <div class="rnd-status-col">
        <div class="rnd-badge ${cfg.badgeClass}">
          <span class="rnd-dot ${cfg.dotClass}"></span>
          ${cfg.label}
        </div>
      </div>
      <div class="rnd-content">
        <h3 class="rnd-title">${entry.title}</h3>
        <p class="rnd-hypothesis">${entry.hypothesis}</p>
        <p class="rnd-finding">${entry.finding}</p>
        ${entry.artifacts.length ? `
          <div class="rnd-artifacts">
            ${entry.artifacts.map(a => `<a href="${a.url}" class="rnd-link" target="_blank" rel="noopener">↗ ${a.label}</a>`).join('')}
          </div>` : ''}
      </div>
    `;
    container.appendChild(el);
  });
})();

// =============================================================
// CONTACT FORM (Formspree)
// =============================================================
(function initForm() {
  const form   = $('#contact-form');
  const status = $('#form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = 'Sending...';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.textContent = '✓ Message sent — I\'ll be in touch!';
        form.reset();
      } else {
        status.textContent = '→ Something went wrong. Try emailing directly.';
      }
    } catch {
      status.textContent = '→ Could not send. Try emailing directly.';
    }
  });
})();

// =============================================================
// MARQUEE — stagger double for seamless loop
// =============================================================
(function initMarquee() {
  const inner = $('.marquee-inner');
  if (!inner) return;
  // Double the content for seamless loop
  inner.innerHTML = inner.innerHTML + inner.innerHTML;
})();
