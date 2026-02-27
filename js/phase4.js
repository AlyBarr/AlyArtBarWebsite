/* ═══════════════════════════════════════════════════════════
   js/phase4.js — Phase 4: Full Immersive Universe

   1. Three.js WebGL — animated ocean + 10k cosmic particles
      - Real vertex-displaced ocean mesh
      - Scroll-driven ocean → nebula/cosmos transition
      - Bioluminescent light movement
      - Animated portal rings in 3D space
   2. SVG portal flash on section transitions
   3. Depth navigation (pips + labels + depth in meters)
   4. Section atmosphere halos + warp-in entrances
═══════════════════════════════════════════════════════════ */
(function initPhase4() {
  'use strict';

  /* ── Inject all Phase 4 CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    #webgl-canvas {
      position:fixed;inset:0;z-index:0;
      pointer-events:none;opacity:0;
      transition:opacity 2s ease;
    }
    #webgl-canvas.active{opacity:1}

    .depth-indicator{
      position:fixed;right:1.8rem;top:50%;
      transform:translateY(-50%);
      z-index:50;
      display:flex;flex-direction:column;gap:.9rem;
      opacity:0;transition:opacity .8s ease;
      background:none;border:none;padding:0;
    }
    .depth-indicator.visible{opacity:1}
    .depth-pip{
      display:flex;align-items:center;gap:0;
      background:none;border:none;cursor:none;
      padding:0;position:relative;
      transition:gap .25s ease;flex-direction:row-reverse;
    }
    .depth-pip:hover{gap:.7rem}
    .depth-pip:hover .pip-label{opacity:1;transform:translateX(0)}
    .pip-dot{
      width:7px;height:7px;border-radius:50%;
      background:var(--c-ghost);flex-shrink:0;
      transition:background .25s,box-shadow .25s,transform .25s;
    }
    .depth-pip.active .pip-dot{
      background:var(--c-biolume);
      box-shadow:0 0 10px var(--c-biolume);
      transform:scale(1.5);
    }
    .pip-label{
      display:flex;flex-direction:column;align-items:flex-end;
      opacity:0;transform:translateX(8px);
      transition:opacity .2s,transform .2s;
      pointer-events:none;white-space:nowrap;
    }
    .pip-name{
      font-family:var(--font-mono);font-size:.6rem;
      letter-spacing:.15em;text-transform:uppercase;
      color:var(--c-mist);line-height:1.2;
    }
    .pip-depth{
      font-family:var(--font-mono);font-size:.52rem;
      letter-spacing:.1em;color:var(--c-ghost);
    }
    .depth-pip.active .pip-name{color:var(--c-biolume)}
    .depth-pip.active .pip-depth{color:var(--c-biolume-soft)}

    #portal-svg{
      position:fixed;inset:0;width:100%;height:100%;
      pointer-events:none;z-index:399;opacity:0;
      transition:opacity .1s;
    }

    @keyframes warp-ripple{
      0%  {opacity:0;transform:scale(.97)}
      50% {opacity:1}
      100%{opacity:1;transform:scale(1)}
    }
    .warp-in{animation:warp-ripple .9s cubic-bezier(.16,1,.3,1) forwards}

    @media(max-width:900px){.depth-indicator{display:none}}
  `;
  document.head.appendChild(style);

  /* ── Utility: wait for terminal to dismiss ── */
  function onTerminalDone(cb) {
    const el = document.getElementById('terminal');
    if (!el || el.classList.contains('hidden')) { setTimeout(cb, 200); return; }
    const obs = new MutationObserver(() => {
      if (el.classList.contains('hidden')) { obs.disconnect(); setTimeout(cb, 400); }
    });
    obs.observe(el, { attributes: true });
  }

  /* ═══════════════════════════════════════════════════
     1. THREE.JS — LOAD THEN INIT
  ═══════════════════════════════════════════════════ */
  function loadThree(cb) {
    if (typeof THREE !== 'undefined') { cb(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = cb;
    s.onerror = () => console.warn('[AlyArtBar] Three.js unavailable — WebGL background disabled');
    document.head.appendChild(s);
  }

  loadThree(function() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x020810, 1);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 2000
    );
    camera.position.set(0, 8, 22);

    /* ── Ocean ── */
    const oceanGeo  = new THREE.PlaneGeometry(120, 120, 80, 80);
    oceanGeo.rotateX(-Math.PI / 2);
    const baseY = Float32Array.from(oceanGeo.attributes.position.array);

    const oceanMat = new THREE.MeshPhongMaterial({
      color: 0x0a2a44, emissive: 0x051828,
      specular: 0x3dffd0, shininess: 55,
      transparent: true, opacity: 1,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.position.y = -4;
    scene.add(ocean);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x051828, 0.8));
    const bl1 = new THREE.PointLight(0x3dffd0, 1.2, 80);
    bl1.position.set(-20, 12, 10);
    scene.add(bl1);
    const bl2 = new THREE.PointLight(0x1a6070, 0.8, 60);
    bl2.position.set(25, 8, -15);
    scene.add(bl2);
    const nebLight = new THREE.PointLight(0x9d78f5, 0, 120);
    nebLight.position.set(0, 50, -40);
    scene.add(nebLight);

    /* ── Cosmic particles ── */
    const N = 10000;
    const pPos = new Float32Array(N * 3);
    const pCol = new Float32Array(N * 3);
    const palette = [
      [0.24, 1.00, 0.82], [0.49, 0.91, 0.85],
      [0.78, 0.90, 0.94], [0.62, 0.47, 0.96],
      [0.10, 0.38, 0.44],
    ];
    for (let i = 0; i < N; i++) {
      const r     = 200 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pPos[i*3+1] = r * Math.cos(phi) * 0.5 + 40;
      pPos[i*3+2] = r * Math.sin(phi) * Math.sin(theta);
      const c     = palette[i % palette.length];
      pCol[i*3]   = c[0]; pCol[i*3+1] = c[1]; pCol[i*3+2] = c[2];
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.7, vertexColors: true, transparent: true, opacity: 0,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    /* ── Bioluminescent plankton ── */
    const plankN   = 800;
    const plankPos = new Float32Array(plankN * 3);
    for (let i = 0; i < plankN; i++) {
      plankPos[i*3]   = (Math.random()-0.5)*80;
      plankPos[i*3+1] = (Math.random()-0.5)*12 - 2;
      plankPos[i*3+2] = (Math.random()-0.5)*60;
    }
    const plankGeo = new THREE.BufferGeometry();
    plankGeo.setAttribute('position', new THREE.BufferAttribute(plankPos, 3));
    const plankMat = new THREE.PointsMaterial({
      color: 0x3dffd0, size: 0.28, transparent: true, opacity: 0.55,
    });
    const plankton = new THREE.Points(plankGeo, plankMat);
    scene.add(plankton);

    /* ── Portal rings ── */
    const portalDefs = [
      { x:  0, y: -1, z:  0,   color: 0x3dffd0 },
      { x: -8, y: 10, z: -10,  color: 0x1d8870 },
      { x:  6, y: 21, z: -22,  color: 0x9d78f5 },
      { x: -4, y: 33, z: -36,  color: 0x3dffd0 },
      { x:  3, y: 45, z: -52,  color: 0x7ee8d8 },
    ];
    const portals = portalDefs.map(pp => {
      const g = new THREE.Group();
      // Outer ring
      g.add(new THREE.Mesh(
        new THREE.TorusGeometry(5, 0.08, 8, 64),
        new THREE.MeshBasicMaterial({ color: pp.color, transparent: true, opacity: 0.5 })
      ));
      // Inner ring
      g.add(new THREE.Mesh(
        new THREE.TorusGeometry(4.3, 0.04, 8, 64),
        new THREE.MeshBasicMaterial({ color: pp.color, transparent: true, opacity: 0.25 })
      ));
      // Energy disc
      g.add(new THREE.Mesh(
        new THREE.CircleGeometry(4.7, 64),
        new THREE.MeshBasicMaterial({ color: pp.color, transparent: true, opacity: 0.03, side: THREE.DoubleSide })
      ));
      g.position.set(pp.x, pp.y, pp.z);
      g.rotation.y = (Math.random()-0.5)*0.5;
      g.userData.spin = (Math.random()-0.5)*0.008;
      scene.add(g);
      return g;
    });

    /* ── Scroll state ── */
    let scrollT = 0, scrollTarget = 0;
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? window.scrollY / max : 0;
    }, { passive: true });

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    /* ── Activate after terminal ── */
    onTerminalDone(() => canvas.classList.add('active'));

    /* ── Animate ── */
    let t = 0;
    (function loop() {
      requestAnimationFrame(loop);
      t += 0.008;
      scrollT += (scrollTarget - scrollT) * 0.035;
      const s = Math.pow(scrollT, 0.7); // scroll curve

      /* Ocean waves */
      const pos = oceanGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = baseY[i*3], oz = baseY[i*3+2];
        pos.setY(i, baseY[i*3+1]
          + Math.sin(ox*0.15 + t*1.1)*0.9
          + Math.sin(oz*0.12 + t*0.8)*0.7
          + Math.sin((ox+oz)*0.09 + t*1.4)*0.5
          + Math.sin(ox*0.22 - t*0.6)*0.3
        );
      }
      pos.needsUpdate = true;
      oceanGeo.computeVertexNormals();

      /* Transition */
      oceanMat.opacity  = Math.max(0, 1 - s * 0.9);
      plankMat.opacity  = 0.55 * (1 - s);
      pMat.opacity      = s * 0.85;
      nebLight.intensity = s * 2.2;

      /* Camera dives deeper */
      camera.position.y = 8 + scrollT * 55;
      camera.position.z = 22 - scrollT * 18;
      camera.position.x = Math.sin(t * 0.08) * 1.5;
      camera.lookAt(
        Math.sin(t*0.05)*2,
        camera.position.y - 8,
        -scrollT * 20
      );

      /* Portal pulse */
      portals.forEach((p, i) => {
        p.rotation.z += p.userData.spin;
        p.rotation.x = Math.sin(t*0.3 + i)*0.08;
        const pulse = 0.5 + 0.5*Math.sin(t*1.2 + i*1.3);
        p.children[0].material.opacity = 0.28 + pulse*0.38;
        p.children[1].material.opacity = 0.10 + pulse*0.22;
        p.children[2].material.opacity = 0.02 + pulse*0.05;
      });

      /* Lights drift */
      bl1.position.x = Math.sin(t*0.4)*22;
      bl1.position.z = Math.cos(t*0.3)*14;
      bl2.position.x = Math.cos(t*0.35)*18;
      bl2.position.z = Math.sin(t*0.45)*18;

      /* Plankton drift */
      const pa = plankGeo.attributes.position.array;
      for (let i = 0; i < plankN; i++)
        pa[i*3+1] += Math.sin(t*0.8 + i*0.7)*0.003;
      plankGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    })();
  });


  /* ═══════════════════════════════════════════════════
     2. SVG PORTAL FLASH
  ═══════════════════════════════════════════════════ */
  (function initPortalFX() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.id = 'portal-svg';
    svg.innerHTML = `
      <defs>
        <radialGradient id="pg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stop-color="#3dffd0" stop-opacity=".15"/>
          <stop offset="60%"  stop-color="#1a6070" stop-opacity=".06"/>
          <stop offset="100%" stop-color="#020810" stop-opacity="0"/>
        </radialGradient>
        <filter id="pb"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <ellipse id="pe" cx="50%" cy="50%" rx="0" ry="0"
        fill="url(#pg)" filter="url(#pb)"/>
      <ellipse id="pr" cx="50%" cy="50%" rx="0" ry="0"
        fill="none" stroke="#3dffd0" stroke-width="1.5" opacity=".4"/>
    `;
    document.body.appendChild(svg);

    const pe = document.getElementById('pe');
    const pr = document.getElementById('pr');

    const sectionColors = {
      hero:'#3dffd0', about:'#7ee8d8', projects:'#3dffd0',
      skills:'#1d8870', rnd:'#9d78f5', contact:'#3dffd0',
    };

    function flash(color) {
      svg.style.opacity = '1';
      pr.setAttribute('stroke', color);
      let f = 0;
      (function expand() {
        f++;
        const p = f / 38;
        const e = 1 - Math.pow(1-p, 3);
        const rx = window.innerWidth  / 2 * e * 1.35;
        const ry = window.innerHeight / 2 * e * 1.35;
        pe.setAttribute('rx', rx); pe.setAttribute('ry', ry);
        pr.setAttribute('rx', rx*.9); pr.setAttribute('ry', ry*.9);
        pr.setAttribute('opacity', (0.45*(1-e)).toFixed(3));
        if (f < 38) requestAnimationFrame(expand);
        else {
          svg.style.opacity = '0';
          setTimeout(() => { pe.setAttribute('rx',0); pe.setAttribute('ry',0); }, 200);
        }
      })();
    }

    let last = null;
    const ids = ['hero','about','projects','skills','rnd','contact'];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        if (last && last !== id) flash(sectionColors[id] || '#3dffd0');
        last = id;
      });
    }, { threshold: 0.5 });

    onTerminalDone(() => {
      ids.map(id => document.getElementById(id)).filter(Boolean).forEach(el => obs.observe(el));
    });

    // Also flash on nav link clicks
    document.querySelectorAll('#nav-links a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        const id = a.getAttribute('href').slice(1);
        flash(sectionColors[id] || '#3dffd0');
      });
    });
  })();


  /* ═══════════════════════════════════════════════════
     3. DEPTH NAV PIPS
  ═══════════════════════════════════════════════════ */
  (function initDepthNav() {
    const defs = [
      { id:'hero',     name:'Surface',     depth:'0m'    },
      { id:'about',    name:'Mid Water',   depth:'200m'  },
      { id:'projects', name:'Thermocline', depth:'500m'  },
      { id:'skills',   name:'Deep Zone',   depth:'1000m' },
      { id:'rnd',      name:'Abyss',       depth:'4000m' },
      { id:'contact',  name:'Core',        depth:'∞'     },
    ];
    const nav = document.createElement('nav');
    nav.className = 'depth-indicator';
    nav.setAttribute('aria-label', 'Section depth navigation');

    defs.forEach(d => {
      const btn = document.createElement('button');
      btn.className = 'depth-pip';
      btn.setAttribute('aria-label', `Go to ${d.name}`);
      btn.innerHTML = `
        <span class="pip-dot"></span>
        <span class="pip-label">
          <span class="pip-name">${d.name}</span>
          <span class="pip-depth">${d.depth}</span>
        </span>`;
      btn.addEventListener('click', () =>
        document.getElementById(d.id)?.scrollIntoView({ behavior:'smooth' })
      );
      nav.appendChild(btn);
    });
    document.body.appendChild(nav);

    onTerminalDone(() => setTimeout(() => nav.classList.add('visible'), 700));

    const sEls = defs.map(d => document.getElementById(d.id)).filter(Boolean);
    const pips = nav.querySelectorAll('.depth-pip');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const i = sEls.indexOf(e.target);
        if (e.isIntersecting && i !== -1) {
          pips.forEach(p => p.classList.remove('active'));
          pips[i]?.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    sEls.forEach(el => obs.observe(el));
  })();


  /* ═══════════════════════════════════════════════════
     4. WARP-IN + ATMOSPHERE HALOS
  ═══════════════════════════════════════════════════ */
  (function initSectionFX() {
    /* Warp-in */
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('warp-in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.section, .constellation-section')
      .forEach(s => obs.observe(s));

    /* Halos */
    [
      { id:'about',    c:'rgba(61,255,208,.04)',  sz:'70vw', x:'80%', y:'50%' },
      { id:'projects', c:'rgba(29,136,112,.05)',  sz:'60vw', x:'10%', y:'50%' },
      { id:'skills',   c:'rgba(61,255,208,.04)',  sz:'80vw', x:'50%', y:'60%' },
      { id:'rnd',      c:'rgba(157,120,245,.05)', sz:'65vw', x:'50%', y:'40%' },
      { id:'contact',  c:'rgba(61,255,208,.04)',  sz:'55vw', x:'70%', y:'50%' },
    ].forEach(h => {
      const sec = document.getElementById(h.id);
      if (!sec) return;
      const halo = document.createElement('div');
      halo.style.cssText = `
        position:absolute;border-radius:50%;pointer-events:none;z-index:0;
        width:${h.sz};height:${h.sz};
        left:${h.x};top:${h.y};
        transform:translate(-50%,-50%);
        background:radial-gradient(circle,${h.c} 0%,transparent 70%);
        filter:blur(60px);
      `;
      sec.style.position = 'relative';
      sec.insertBefore(halo, sec.firstChild);
    });
  })();

})();
