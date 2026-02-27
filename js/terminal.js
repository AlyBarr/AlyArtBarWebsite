/* ═══════════════════════════════════════════
   js/terminal.js — Phase 1 Terminal Boot
═══════════════════════════════════════════ */
(async function initTerminal() {
  const screen = document.getElementById('term-screen');
  const overlay = document.getElementById('terminal');
  const skipBtn = document.getElementById('term-skip');
  if (!screen || !overlay) return;

  let done = false;

  function dismiss() {
    if (done) return;
    done = true;
    overlay.classList.add('hidden');
  }

  document.addEventListener('keydown', dismiss);
  skipBtn?.addEventListener('click', dismiss);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function typeInto(el, text, speed = 46) {
    for (const ch of text) {
      if (done) return;
      const caret = el.querySelector('.term-caret');
      if (caret) caret.insertAdjacentText('beforebegin', ch);
      else el.insertAdjacentText('beforeend', ch);
      await sleep(speed + Math.random() * 22);
    }
  }

  function addLine(cls = '', withCaret = false) {
    const el = document.createElement('span');
    el.className = 'tl' + (cls ? ' ' + cls : '');
    if (withCaret) el.innerHTML = '<span class="term-caret"></span>';
    screen.appendChild(el);
    return el;
  }

  await sleep(300);
  if (done) return;

  // Line 1: typing the command
  const cmdLine = addLine('tl-dim', true);
  await typeInto(cmdLine, 'alyartbar@universe:~$ ', 28);
  await typeInto(cmdLine, 'boot --world-engine --verbose', 48);
  cmdLine.querySelector('.term-caret')?.remove();
  await sleep(200); if (done) return;

  addLine('').textContent = '';

  // System boot lines
  const bootLines = [
    ['tl-dim', 'Initializing AlyArtBar System v2.0...'],
    ['tl-sys', 'Loading Procedural Module...          [OK]'],
    ['tl-sys', 'Mounting USD Pipeline...              [OK]'],
    ['tl-sys', 'Calibrating World Engine...           [OK]'],
    ['tl-sys', 'Linking Tool Registry...              [OK]'],
    ['tl-sys', 'Seeding Particle Systems...           [OK]'],
    ['tl-dim', 'All systems nominal.'],
  ];
  for (const [cls, txt] of bootLines) {
    if (done) return;
    addLine(cls).textContent = txt;
    await sleep(cls === 'tl-sys' ? 230 : 160);
  }

  await sleep(160); if (done) return;
  addLine('').textContent = '';

  // Name reveal
  const nameLine = addLine();
  nameLine.innerHTML = '  <span style="color:var(--c-ghost)">NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span class="tl-name"></span>';
  await typeInto(nameLine.querySelector('.tl-name'), 'Alyssa Barrientos', 40);
  await sleep(120); if (done) return;

  // Role reveal
  const roleLine = addLine();
  roleLine.innerHTML = '  <span style="color:var(--c-ghost)">ROLE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span class="tl-role"></span>';
  await typeInto(roleLine.querySelector('.tl-role'), 'Technical Artist · Procedural Systems · Pipelines', 32);
  await sleep(120); if (done) return;

  addLine().innerHTML = '  <span style="color:var(--c-ghost)">STATUS&nbsp;&nbsp;&nbsp;</span> <span class="tl-dim">● Early career — building in public</span>';
  await sleep(600); if (done) return;

  addLine('').textContent = '';
  addLine('tl-ok').textContent = '✦  Welcome. The universe is loading.';

  await sleep(1300);
  dismiss();
})();
