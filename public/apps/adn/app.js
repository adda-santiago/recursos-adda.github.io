/* ==========================================================
   Aula Visual — El ADN (three.js r128)
   Unidad de la escena: 1 = 1 nm. Eje de la hélice: +y.
   ADN en forma B: 10,5 pares por vuelta, 0,34 nm entre pares,
   giro a la derecha. El contenido está en data.js.
   ========================================================== */
(() => {
  'use strict';

  const { STATIONS, PROCESSES } = window.ADN_DATA;
  const BY_ID = Object.fromEntries(STATIONS.map((s, i) => [s.id, i]));
  const PROC_BY_ID = Object.fromEntries(PROCESSES.map(p => [p.id, p]));

  /* ---------------- Geometría de la hélice ---------------- */
  const N = 24;                          // pares de bases del tramo
  const RISE = 0.34;                     // nm entre pares
  const TWIST = (2 * Math.PI) / 10.5;    // giro por par (dextrógiro)
  const PHI = 2.45;                      // separación angular entre las dos hebras (surco menor)
  const RS = 0.82;                       // radio de los azúcares
  const SUGAR_OFF = 0.12;                // la base empieza a esta distancia del azúcar
  const GAP = 0.1;                       // espacio de los puentes de hidrógeno
  const CHORD = 2 * RS * Math.sin(PHI / 2);
  const SPAN = CHORD - 2 * SUGAR_OFF - GAP;
  const LEN = { A: SPAN * 0.575, G: SPAN * 0.575, T: SPAN * 0.425, C: SPAN * 0.425 };
  const PAIR = { A: 'T', T: 'A', G: 'C', C: 'G' };
  const HBONDS = { A: 2, T: 2, G: 3, C: 3 };
  const SEQ = 'ATGCGTACCTAGGATCCGTAACGT';
  const yOf = i => (i - (N - 1) / 2) * RISE;

  /* ---------------- Arranque ---------------- */
  const stage = document.getElementById('stage');
  const canvas = document.getElementById('scene');
  if (!window.THREE || !THREE.OrbitControls) {
    document.getElementById('fallback').hidden = false;
    return;
  }
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.05, 200);
  camera.position.set(0, 1.5, 15);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 1.5;
  controls.maxDistance = 45;
  controls.autoRotateSpeed = 1.6;

  /* ---------------- Colores y materiales ---------------- */
  const COL = {
    A: 0xe05a47, T: 0xf2b134, G: 0x3b7dd8, C: 0x47a463,
    fosfato: 0x8a63c9, azucar: 0xc9b48c, puente: 0x9aa0ad,
    orig: 0x7c8aa8, nueva: 0x23a59a, cebador: 0xd1495b,
    enzima1: 0x9b7fd4, enzima2: 0x3fa7d6, enzima3: 0xe08a3c
  };
  const LEGEND = {
    ruta: [['A', 'Adenina'], ['T', 'Timina'], ['G', 'Guanina'], ['C', 'Citosina'], ['fosfato', 'Fosfato'], ['azucar', 'Desoxirribosa']],
    proc: [['orig', 'Hebra original'], ['nueva', 'Hebra nueva'], ['cebador', 'Cebador de ARN']]
  };
  function hex(c) { return '#' + c.toString(16).padStart(6, '0'); }

  /* Categorías que se pueden resaltar o atenuar */
  const CATS = { fosfato: [], azucar: [], esqueleto: [], base: [], puente: [] };
  function catMat(cat, color, extra) {
    const m = new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.45, metalness: 0.05, transparent: true, opacity: 1 }, extra || {}));
    m.userData.cat = cat;
    m.userData.target = 1;
    CATS[cat].push(m);
    return m;
  }
  const M = {
    A: catMat('base', COL.A), T: catMat('base', COL.T), G: catMat('base', COL.G), C: catMat('base', COL.C),
    fosfato: catMat('fosfato', COL.fosfato),
    azucar: catMat('azucar', COL.azucar),
    puente: catMat('puente', COL.puente, { roughness: 0.8 }),
    orig: catMat('esqueleto', COL.orig, { roughness: 0.55 }),
    nueva: catMat('esqueleto', COL.nueva, { roughness: 0.55 }),
    cebador: catMat('esqueleto', COL.cebador, { roughness: 0.55 }),
    neutro: catMat('esqueleto', 0x8e9ab4, { roughness: 0.55 }),
    neutro2: catMat('esqueleto', 0xbcc2cf, { roughness: 0.55 })
  };
  /* En la replicación, los fosfatos toman el color de su hebra para distinguir original y nueva */
  const PHOS_ROLE = {
    orig: catMat('esqueleto', COL.orig), nueva: catMat('esqueleto', COL.nueva), cebador: catMat('esqueleto', COL.cebador)
  };
  /* Piezas sueltas (nucleótido y bases separadas): materiales propios, nunca se atenúan */
  const plain = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.45, metalness: 0.05 });
  const MD = { A: plain(COL.A), T: plain(COL.T), G: plain(COL.G), C: plain(COL.C), fosfato: plain(COL.fosfato), azucar: plain(COL.azucar) };
  const enzMat = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5, transparent: true, opacity: 0.42, depthWrite: false });

  function setFocus(list) {
    Object.entries(CATS).forEach(([cat, mats]) => {
      const on = !list || list.includes(cat);
      mats.forEach(m => { m.userData.target = on ? 1 : 0.1; });
    });
  }
  function updateFocus(dt) {
    Object.values(CATS).forEach(mats => mats.forEach(m => {
      const t = m.userData.target;
      m.opacity += (t - m.opacity) * Math.min(1, dt * 6);
      if (Math.abs(t - m.opacity) < 0.002) m.opacity = t;
      m.depthWrite = m.opacity > 0.6;
    }));
  }

  /* ---------------- Geometrías compartidas ---------------- */
  const G = {
    slab: new THREE.BoxGeometry(1, 0.11, 0.3),
    sugar: new THREE.CylinderGeometry(0.15, 0.15, 0.09, 5),
    phos: new THREE.SphereGeometry(0.115, 16, 12),
    bond: new THREE.CylinderGeometry(0.018, 0.018, 1, 6)
  };
  const X_AXIS = V3(1, 0, 0), Y_AXIS = V3(0, 1, 0);

  const pickables = [];
  function tag(mesh, station) { mesh.userData.station = station; pickables.push(mesh); return mesh; }

  /* ---------------- Constructor de moléculas ----------------
     Una hebra es una lista de nucleótidos { p, dir, base }:
     p = posición del azúcar, dir = dirección hacia la pareja (horizontal).
     role: color del esqueleto ('neutro' | 'orig' | 'nueva' | 'cebador').
     Los pares [nucA, nucB] dibujan los puentes de hidrógeno.            */
  function drawStrand(group, nucs, role, lettersOut) {
    if (!nucs.length) return;
    const pts = [];
    nucs.forEach((n, k) => {
      pts.push(n.p.clone());
      tag(mesh(G.sugar, M.azucar, n.p, group), 'azucar');
      // base: losa desde el azúcar hacia la pareja
      const len = LEN[n.base];
      const b = mesh(G.slab, M[n.base], n.p.clone().addScaledVector(n.dir, SUGAR_OFF + len / 2), group);
      b.scale.x = len;
      b.quaternion.setFromUnitVectors(X_AXIS, n.dir);
      tag(b, 'bases');
      if (lettersOut) lettersOut.push({ base: n.base, at: n.p.clone().addScaledVector(n.dir, SUGAR_OFF + len * 0.55).add(V3(0, 0.13, 0)) });
      // fosfato entre este azúcar y el siguiente, desplazado hacia afuera
      const m = nucs[k + 1];
      if (m) {
        const out = n.dir.clone().add(m.dir).normalize().multiplyScalar(-0.24);
        const ph = n.p.clone().add(m.p).multiplyScalar(0.5).add(out);
        pts.push(ph);
        tag(mesh(G.phos, PHOS_ROLE[role] || M.fosfato, ph, group), 'fosfato');
      }
    });
    if (pts.length >= 2) {
      const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, pts.length * 6, 0.065, 8, false), M[role]);
      tube.userData.dispose = true;
      group.add(tube);
      tag(tube, 'fosfato');
    }
  }
  function drawBonds(group, pairs) {
    pairs.forEach(([a, b]) => {
      const n = HBONDS[a.base];
      const from = a.p.clone().addScaledVector(a.dir, SUGAR_OFF + LEN[a.base]);
      const to = b.p.clone().addScaledVector(b.dir, SUGAR_OFF + LEN[b.base]);
      const mid = from.clone().add(to).multiplyScalar(0.5);
      const d = to.clone().sub(from);
      const len = d.length() + 0.03;
      const side = d.clone().normalize().cross(Y_AXIS).normalize();
      for (let j = 0; j < n; j++) {
        const off = (j - (n - 1) / 2) * 0.09;
        const c = mesh(G.bond, M.puente, mid.clone().addScaledVector(side, off), group);
        c.scale.y = len;
        c.quaternion.setFromUnitVectors(Y_AXIS, d.clone().normalize());
        tag(c, 'pares');
      }
    });
  }
  function mesh(geo, mat, pos, parent) {
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(pos);
    parent.add(m);
    return m;
  }

  /* Hélice cerrada: devuelve las dos hebras y los pares */
  function helixNucs(cx, rot0, seq, from, to) {
    const A = [], B = [], pairs = [];
    for (let i = from; i <= to; i++) {
      const th = rot0 + i * TWIST, y = yOf(i);
      const pA = V3(cx + RS * Math.cos(th), y, RS * Math.sin(th));
      const pB = V3(cx + RS * Math.cos(th + PHI), y, RS * Math.sin(th + PHI));
      const dA = pB.clone().sub(pA).normalize();
      const a = { p: pA, dir: dA, base: seq[i], i };
      const b = { p: pB, dir: dA.clone().negate(), base: PAIR[seq[i]], i };
      A.push(a); B.push(b); pairs.push([a, b]);
    }
    return { A, B, pairs };
  }

  function disposeGroup(g) {
    g.traverse(o => { if (o.userData.dispose && o.geometry) o.geometry.dispose(); });
    for (let i = pickables.length - 1; i >= 0; i--) {
      let o = pickables[i], inside = false;
      while (o) { if (o === g) { inside = true; break; } o = o.parent; }
      if (inside) pickables.splice(i, 1);
    }
    scene.remove(g);
  }

  /* ---------------- Etiquetas (sprites de texto) ---------------- */
  const labels = [];
  function cssVar(name, fb) { return getComputedStyle(root).getPropertyValue(name).trim() || fb; }
  function drawLabel(L) {
    const ink = cssVar('--ink', '#1f2430'), bg = cssVar('--bg', '#fafaf8'), line = cssVar('--line', '#e4e4df'), muted = cssVar('--muted', '#6b7080');
    const c = L.canvas, g = c.getContext('2d');
    const fs = 44, fs2 = 32, pad = L.bare ? 6 : 22, gap = 8, dot = L.dot ? 34 : 0;
    const font1 = `600 ${fs}px Inter, system-ui, sans-serif`, font2 = `500 ${fs2}px Inter, system-ui, sans-serif`;
    g.font = font1; const w1 = g.measureText(L.text).width;
    g.font = font2; const w2 = L.sub ? g.measureText(L.sub).width : 0;
    const W = Math.ceil(Math.max(w1 + dot, w2) + pad * 2), H = Math.ceil(L.sub ? fs + fs2 + gap + pad * 2 : fs + pad * 2);
    c.width = W; c.height = H;
    if (!L.bare) {
      const r = 16;
      g.beginPath();
      g.moveTo(r, 1); g.lineTo(W - r, 1); g.quadraticCurveTo(W - 1, 1, W - 1, r);
      g.lineTo(W - 1, H - r); g.quadraticCurveTo(W - 1, H - 1, W - r, H - 1);
      g.lineTo(r, H - 1); g.quadraticCurveTo(1, H - 1, 1, H - r);
      g.lineTo(1, r); g.quadraticCurveTo(1, 1, r, 1); g.closePath();
      g.globalAlpha = 0.93; g.fillStyle = bg; g.fill();
      g.globalAlpha = 1; g.lineWidth = 2; g.strokeStyle = line; g.stroke();
    }
    if (L.dot) { g.fillStyle = L.dot; g.beginPath(); g.arc(pad + 11, pad + fs * 0.55, 11, 0, Math.PI * 2); g.fill(); }
    g.textBaseline = 'top';
    g.font = font1; g.fillStyle = L.color || ink;
    if (L.bare && L.stroke !== false) { g.lineWidth = 8; g.strokeStyle = bg; g.strokeText(L.text, pad, pad + 2); }
    g.fillText(L.text, pad + dot, pad + 2);
    if (L.sub) { g.font = font2; g.fillStyle = muted; g.fillText(L.sub, pad, pad + fs + gap); }
    L.tex.needsUpdate = true;
    L.sprite.scale.set(L.h * W / H, L.h, 1);
  }
  function label(text, sub, h, pos, parent, opts) {
    const o = opts || {};
    const canvas = document.createElement('canvas');
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: !!o.depth, depthWrite: false, transparent: true }));
    sprite.renderOrder = 20;
    sprite.center.set(o.cx ?? 0.5, o.cy ?? 0);
    sprite.position.copy(pos);
    parent.add(sprite);
    const L = { canvas, tex, sprite, text, sub, h, dot: o.dot, bare: o.bare, color: o.color, stroke: o.stroke };
    labels.push(L); drawLabel(L);
    return L;
  }
  function dropLabels(g) {
    for (let i = labels.length - 1; i >= 0; i--) {
      let o = labels[i].sprite, inside = false;
      while (o) { if (o === g) { inside = true; break; } o = o.parent; }
      if (inside) { labels[i].tex.dispose(); labels.splice(i, 1); }
    }
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => labels.forEach(drawLabel));

  /* ---------------- Hélice principal (ruta de aprendizaje) ---------------- */
  const helix = new THREE.Group();
  scene.add(helix);
  const H = helixNucs(0, 0, SEQ, 0, N - 1);
  const letterSpots = [];
  drawStrand(helix, H.A, 'neutro', letterSpots);
  drawStrand(helix, H.B.slice().reverse(), 'neutro2', letterSpots);
  drawBonds(helix, H.pairs);

  const letters = new THREE.Group();
  letters.visible = false;
  helix.add(letters);
  letterSpots.forEach(s => label(s.base, null, 0.17, s.at, letters, { bare: true, cy: 0.5, color: '#ffffff', stroke: false, depth: true }));

  /* Extremos 5′ y 3′ */
  const ends = new THREE.Group();
  ends.visible = false;
  helix.add(ends);
  const endOff = V3(0, 0.35, 0);
  [[H.A[0].p, '5′', -1, 'Hebra 1'], [H.A[N - 1].p, '3′', 1, 'Hebra 1'],
   [H.B[N - 1].p, '5′', 1, 'Hebra 2'], [H.B[0].p, '3′', -1, 'Hebra 2']].forEach(([p, t, s, sub]) => {
    label(t, sub, 0.55, p.clone().addScaledVector(endOff, s * 1.3).add(V3(0, s < 0 ? -0.45 : 0, 0)), ends);
  });
  // flechas de dirección (5′→3′) a media altura de cada hebra
  const arrowGeo = new THREE.ConeGeometry(0.12, 0.34, 12);
  [[H.A, 1], [H.B, -1]].forEach(([arr, sense]) => {
    [6, 17].forEach(k => {
      const a = arr[k].p, b = arr[k + sense] ? arr[k + sense].p : arr[k].p;
      const d = b.clone().sub(a).normalize();
      const out = arr[k].dir.clone().multiplyScalar(-0.38);
      const c = mesh(arrowGeo, new THREE.MeshBasicMaterial({ color: COL.cebador }), a.clone().add(out), ends);
      c.quaternion.setFromUnitVectors(Y_AXIS, d);
    });
  });

  /* Surcos: se ubica cada etiqueta donde el surco mira hacia la cámara inicial (+z) */
  const grooves = new THREE.Group();
  grooves.visible = false;
  helix.add(grooves);
  function grooveAt(offset, text, sub, from, to) {
    let best = from, bestD = 9;
    for (let i = from; i <= to; i++) {
      const ang = (i * TWIST + offset) % (2 * Math.PI);
      const d = Math.abs(Math.atan2(Math.sin(ang - Math.PI / 2), Math.cos(ang - Math.PI / 2)));
      if (d < bestD) { bestD = d; best = i; }
    }
    const ang = best * TWIST + offset;
    const pos = V3(1.05 * Math.cos(ang) + 0.6, yOf(best), 1.05 * Math.sin(ang) + 0.3);
    label(text, sub, 0.5, pos, grooves, { cx: 0, cy: 0.5 });
    const ringM = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.03, 8, 40), new THREE.MeshBasicMaterial({ color: COL.cebador }));
    ringM.position.set(1.05 * Math.cos(ang), yOf(best), 1.05 * Math.sin(ang));
    ringM.lookAt(V3(0, yOf(best), 0));
    grooves.add(ringM);
  }
  grooveAt(PHI / 2, 'Surco menor', 'más estrecho', 2, 11);
  grooveAt(PHI / 2 + Math.PI, 'Surco mayor', 'más ancho y profundo', 12, 21);

  /* Medidas */
  const dims = new THREE.Group();
  dims.visible = false;
  scene.add(dims);
  const dimMat = new THREE.LineBasicMaterial({ color: COL.cebador });
  function dimLine(a, b, tick, text, sub, at, h, opts) {
    const k = 0.12, pts = [...a, ...b];
    [a, b].forEach(p => pts.push(p[0] - tick[0] * k, p[1] - tick[1] * k, p[2] - tick[2] * k, p[0] + tick[0] * k, p[1] + tick[1] * k, p[2] + tick[2] * k));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    dims.add(new THREE.LineSegments(g, dimMat));
    label(text, sub, h || 0.55, V3(...at), dims, opts);
  }
  const top = yOf(N - 1) + 0.5, turn = 10.5 * RISE;
  dimLine([-1, top, 0], [1, top, 0], [0, 1, 0], '≈ 2 nm', 'diámetro', [0, top + 0.12, 0]);
  dimLine([1.75, yOf(4), 0], [1.75, yOf(4) + turn, 0], [1, 0, 0], '1 vuelta', '≈ 10,5 pares · ≈ 3,6 nm', [1.95, yOf(4) + turn / 2, 0], 0.55, { cx: 0, cy: 0.5 });
  dimLine([-1.75, yOf(14), 0], [-1.75, yOf(15), 0], [1, 0, 0], '0,34 nm', 'entre pares', [-1.95, yOf(14) + RISE / 2, 0], 0.5, { cx: 1, cy: 0.5 });

  /* ---------------- Nucleótido separado ---------------- */
  const nucleo = new THREE.Group();
  nucleo.position.set(3.9, 0, 0);
  nucleo.visible = false;
  scene.add(nucleo);
  (function buildNucleotide() {
    // azúcar: pentágono (4 carbonos y 1 oxígeno en el anillo)
    const R5 = 0.42, ring = [];
    for (let k = 0; k < 5; k++) { const a = Math.PI / 2 + k * 2 * Math.PI / 5; ring.push(new THREE.Vector2(R5 * Math.cos(a), R5 * Math.sin(a))); }
    const sugar = new THREE.Mesh(new THREE.ExtrudeGeometry(new THREE.Shape(ring), { depth: 0.12, bevelEnabled: false }), MD.azucar);
    sugar.position.z = -0.06;
    nucleo.add(tag(sugar, 'azucar'));
    // anillo: vértice 0 = O (arriba); en sentido antihorario: C4′, C3′, C2′, C1′ ... se rotulan
    const names = ['O', '4′', '3′', '2′', '1′'];
    names.forEach((t, k) => label(t, null, 0.16, V3(ring[k].x * 1.42, ring[k].y * 1.42, 0.1), nucleo, { bare: true, cy: 0.5 }));
    // C5′ fuera del anillo, unido a C4′, y el fosfato unido a C5′
    const c4 = ring[1], c5 = V3(c4.x - 0.3, c4.y + 0.32, 0);
    label('5′', null, 0.16, V3(c5.x - 0.12, c5.y + 0.05, 0.1), nucleo, { bare: true, cy: 0.5 });
    const link = (a, b) => {
      const d = b.clone().sub(a), m = new THREE.Mesh(G.bond, MD.azucar);
      m.scale.set(2.2, d.length(), 2.2);
      m.position.copy(a).add(b).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(Y_AXIS, d.normalize());
      nucleo.add(m);
    };
    link(V3(c4.x, c4.y, 0), c5);
    const phos = mesh(new THREE.SphereGeometry(0.26, 24, 16), MD.fosfato, V3(c5.x - 0.15, c5.y + 0.45, 0), nucleo);
    tag(phos, 'fosfato');
    link(c5, phos.position.clone());
    label('Fosfato', 'se une al carbono 5′', 0.26, phos.position.clone().add(V3(0, 0.33, 0)), nucleo);
    label('Desoxirribosa', 'azúcar de 5 carbonos', 0.26, V3(0, -0.85, 0), nucleo, { cy: 1 });
    // base: purina (adenina) unida al carbono 1′
    const c1 = ring[4];
    const baseShape = purineShape(0.24);
    const base = new THREE.Mesh(new THREE.ExtrudeGeometry(baseShape, { depth: 0.12, bevelEnabled: false }), MD.A);
    base.position.set(c1.x + 0.42, c1.y - 0.05, -0.06);
    nucleo.add(tag(base, 'bases'));
    link(V3(c1.x, c1.y, 0), V3(c1.x + 0.2, c1.y - 0.05, 0));
    label('Base nitrogenada', 'aquí, adenina (A)', 0.26, V3(c1.x + 0.75, c1.y + 0.42, 0), nucleo);
  })();

  /* Formas de las bases: hexágono (pirimidina) y hexágono + pentágono (purina) */
  function hexPts(r, cx, cy) { const p = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; p.push(new THREE.Vector2(cx + r * Math.cos(a), cy + r * Math.sin(a))); } return p; }
  function pyrimidineShape(r) { return new THREE.Shape(hexPts(r, 0, 0)); }
  function purineShape(r) {
    // pentágono que comparte el lado vertical derecho del hexágono
    const rp = r / (2 * Math.sin(Math.PI / 5));
    const d = r * Math.cos(Math.PI / 6) + rp * Math.cos(Math.PI / 5);
    const hx = hexPts(r, 0, 0);
    const pent = [];
    for (let k = 0; k < 5; k++) { const a = (144 + k * 72) * Math.PI / 180; pent.push(new THREE.Vector2(d + rp * Math.cos(a), rp * Math.sin(a))); }
    // contorno: hexágono sin el lado derecho + pentágono sin su lado izquierdo
    // hexágono: vértices 0 (30°) y 5 (330°) forman el lado derecho
    const outline = [hx[0], hx[1], hx[2], hx[3], hx[4], hx[5], pent[2], pent[3], pent[4]];
    return new THREE.Shape(outline);
  }

  const basesBox = new THREE.Group();
  basesBox.position.set(3.9, 0, 0);
  basesBox.visible = false;
  scene.add(basesBox);
  (function buildBases() {
    const R = 0.3;
    const items = [
      ['A', 'Adenina', 'purina · 2 anillos', true, -0.95, 0.75],
      ['G', 'Guanina', 'purina · 2 anillos', true, 0.95, 0.75],
      ['T', 'Timina', 'pirimidina · 1 anillo', false, -0.95, -0.85],
      ['C', 'Citosina', 'pirimidina · 1 anillo', false, 0.95, -0.85]
    ];
    items.forEach(([b, name, sub, pur, x, y]) => {
      const shape = pur ? purineShape(R) : pyrimidineShape(R);
      const m = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: false }), MD[b]);
      m.position.set(x - (pur ? 0.25 : 0), y, -0.06);
      basesBox.add(tag(m, 'bases'));
      label(b, null, 0.26, V3(x - (pur ? 0.25 : 0), y, 0.12), basesBox, { bare: true, cy: 0.5, color: '#ffffff', stroke: false });
      label(name, sub, 0.24, V3(x, y - 0.42, 0), basesBox, { cy: 1 });
    });
    label('A se aparea con T', 'G se aparea con C', 0.24, V3(0, 1.55, 0), basesBox);
  })();

  /* ---------------- Replicación ---------------- */
  let repGroup = null;
  const FORK = 9;                                      // los pares por encima de este índice se abren
  const spread = k => Math.min(2.25, 0.4 * k);
  const smooth01 = x => { const t = Math.max(0, Math.min(1, x)); return t * t * (3 - 2 * t); };

  /* Nucleótido de una hebra molde en la zona abierta (k = pares desde la horquilla) */
  function openNuc(strand, i) {
    const k = i - FORK;
    const th = i * TWIST;
    const s = smooth01(k / 3.5);
    const side = strand === 'A' ? -1 : 1;
    const helixP = strand === 'A' ? V3(RS * Math.cos(th), yOf(i), RS * Math.sin(th)) : V3(RS * Math.cos(th + PHI), yOf(i), RS * Math.sin(th + PHI));
    const flatP = V3(side * (CHORD / 2 + spread(k)), yOf(i), 0);
    const other = strand === 'A' ? V3(RS * Math.cos(th + PHI), 0, RS * Math.sin(th + PHI)) : V3(RS * Math.cos(th), 0, RS * Math.sin(th));
    const helixDir = other.sub(V3(helixP.x, 0, helixP.z)).normalize();
    const flatDir = V3(-side, 0, 0);
    const dir = helixDir.lerp(flatDir, s).normalize();
    const p = helixP.clone().lerp(flatP, s);
    const base = strand === 'A' ? SEQ[i] : PAIR[SEQ[i]];
    return { p, dir, base, i };
  }
  /* Nucleótido nuevo, complementario a un nucleótido molde ya separado */
  function newNuc(t) { return { p: t.p.clone().addScaledVector(t.dir, CHORD), dir: t.dir.clone().negate(), base: PAIR[t.base], i: t.i }; }

  function buildReplication(stageN) {
    if (repGroup) { dropLabels(repGroup); disposeGroup(repGroup); }
    repGroup = new THREE.Group();
    scene.add(repGroup);
    const g = repGroup;
    const L = (t, s, p, o) => label(t, s, 0.5, p, g, o);

    if (stageN === 0) {
      const h = helixNucs(0, 0, SEQ, 0, N - 1);
      drawStrand(g, h.A, 'orig');
      drawStrand(g, h.B.slice().reverse(), 'orig');
      drawBonds(g, h.pairs);
      const r = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.04, 8, 64), new THREE.MeshBasicMaterial({ color: COL.cebador }));
      r.rotation.x = Math.PI / 2; r.position.y = yOf(FORK);
      r.userData.dispose = true;
      g.add(r);
      L('Origen de replicación', 'aquí comienza la copia', V3(1.7, yOf(FORK), 0), { cx: 0, cy: 0.5 });
      return;
    }

    if (stageN === 4) {
      // Dos moléculas hijas: cada una con una hebra original y una nueva
      [[-2.3, 'A'], [2.3, 'B']].forEach(([cx, keep], idx) => {
        const h = helixNucs(cx, idx * 0.6, SEQ, 0, N - 1);
        drawStrand(g, h.A, keep === 'A' ? 'orig' : 'nueva');
        drawStrand(g, h.B.slice().reverse(), keep === 'B' ? 'orig' : 'nueva');
        drawBonds(g, h.pairs);
        L(`Molécula hija ${idx + 1}`, 'una hebra original + una nueva', V3(cx, yOf(N - 1) + 0.55, 0));
      });
      return;
    }

    // Etapas 1 a 3: horquilla abierta por encima de FORK
    const closed = helixNucs(0, 0, SEQ, 0, FORK);
    const tA = [], tB = [];
    for (let i = FORK + 1; i < N; i++) { tA.push(openNuc('A', i)); tB.push(openNuc('B', i)); }
    drawStrand(g, closed.A.concat(tA), 'orig');
    drawStrand(g, closed.B.concat(tB).reverse(), 'orig');
    drawBonds(g, closed.pairs);

    const yF = yOf(FORK) + 0.45;
    const heli = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.24, 14, 40), enzMat(COL.enzima1));
    heli.userData.dispose = true;
    heli.rotation.x = Math.PI / 2; heli.position.set(0, yF, 0);
    g.add(heli);
    L('Helicasa', 'separa las hebras', V3(1.15, yF - 0.05, 0), { cx: 0, cy: 0.5 });
    L('Horquilla de replicación', null, V3(-1.2, yOf(FORK) + 0.2, 0), { cx: 1, cy: 0.5 });
    const armX = CHORD / 2 + spread(N - 1 - FORK);
    L('3′', 'molde', V3(-armX - 0.2, yOf(N - 1) + 0.3, 0));    // la hebra 1 corre 5′→3′ hacia arriba
    L('5′', 'molde', V3(armX + 0.2, yOf(N - 1) + 0.3, 0));     // la hebra 2 corre 5′→3′ hacia abajo

    if (stageN === 1) return;

    // Hebra continua sobre el molde A: avanza hacia la horquilla (de arriba hacia abajo)
    const lead = tA.filter(t => t.i - FORK >= 4);
    const leadNow = stageN === 2 ? lead.filter(t => t.i >= N - 6) : lead;
    const leadNew = leadNow.map(newNuc);
    const primerN = 2;
    drawStrand(g, leadNew.slice(-primerN).reverse(), 'cebador');                // cebador en el extremo 5′ (arriba)
    drawStrand(g, leadNew.slice(0, leadNew.length - primerN + 1).reverse(), 'nueva');
    drawBonds(g, leadNow.map((t, k) => [t, leadNew[k]]));
    const tip = leadNew[0];
    const pol1 = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 18), enzMat(COL.enzima2));
    pol1.userData.dispose = true;
    pol1.position.copy(tip.p).add(V3(-0.75, -0.2, 0));
    g.add(pol1);
    L('ADN polimerasa', 'avanza 5′→3′', pol1.position.clone().add(V3(-0.7, 0, 0)), { cx: 1, cy: 0.5 });
    L('Cebador de ARN', null, leadNew[leadNew.length - 1].p.clone().add(V3(0, 0.35, 0)), { cy: 0 });

    // Hebra discontinua sobre el molde B: tramos que se alejan de la horquilla
    const lag = tB.filter(t => t.i - FORK >= 4);
    // etapa 2: solo un cebador recién puesto cerca de la horquilla; etapa 3: fragmentos de Okazaki
    const frags = stageN === 2 ? [[FORK + 4, FORK + 5]] : [[FORK + 4, FORK + 7], [FORK + 9, FORK + 11], [FORK + 13, N - 1]];
    frags.forEach(([a, b], fi) => {
      const tem = lag.filter(t => t.i >= a && t.i <= b);
      if (!tem.length) return;
      const nn = tem.map(newNuc);
      const prim = stageN === 2 ? nn.length : 1;
      drawStrand(g, nn.slice(0, Math.min(nn.length, prim + 1)), 'cebador');    // cebador en el extremo 5′ (abajo)
      if (nn.length > prim) drawStrand(g, nn.slice(prim), 'nueva');
      drawBonds(g, tem.map((t, k) => [t, nn[k]]));
      if (stageN === 3 && fi === 1) {
        const lig = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 14), enzMat(COL.enzima3));
        lig.userData.dispose = true;
        lig.position.copy(nn[0].p).add(V3(0.45, -0.17, 0));
        g.add(lig);
        L('Ligasa', 'une los fragmentos', lig.position.clone().add(V3(0.4, 0, 0)), { cx: 0, cy: 0.5 });
      }
    });
    if (stageN === 3) {
      L('Hebra continua', 'conductora', V3(-armX - 0.4, yOf(FORK + 9), 0), { cx: 1, cy: 0.5 });
      L('Hebra discontinua', 'rezagada · fragmentos de Okazaki', V3(armX + 0.4, yOf(FORK + 9), 0), { cx: 0, cy: 0.5 });
    }
  }

  /* ---------------- Luces y tema ---------------- */
  const hemi = new THREE.HemisphereLight(0xffffff, 0x9aa0ad, 0.75);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 0.75);
  key.position.set(6, 10, 12);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.3);
  rim.position.set(-8, -4, -10);
  scene.add(rim);

  const themeBtn = document.getElementById('t-theme');
  const mq = matchMedia('(prefers-color-scheme: dark)');
  let dark = root.dataset.theme ? root.dataset.theme === 'dark' : mq.matches;
  let userChoseTheme = false;
  function applyTheme(isDark) {
    dark = isDark;
    root.dataset.theme = dark ? 'dark' : 'light';
    const bg = cssVar('--bg', dark ? '#15171c' : '#fafaf8');
    scene.background = new THREE.Color(bg);
    hemi.intensity = dark ? 0.6 : 0.75;
    key.intensity = dark ? 0.9 : 0.75;
    M.puente.color.set(dark ? 0xc9ccd4 : COL.puente);
    labels.forEach(drawLabel);
    themeBtn.textContent = dark ? 'Fondo claro' : 'Fondo oscuro';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', bg);
  }
  themeBtn.addEventListener('click', () => { userChoseTheme = true; applyTheme(!dark); });
  const onScheme = e => { if (!userChoseTheme) applyTheme(e.matches); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);

  /* ---------------- Botones de la escena ---------------- */
  const lettersBtn = document.getElementById('t-letters');
  const dimsBtn = document.getElementById('t-dims');
  const spinBtn = document.getElementById('t-spin');
  let lettersUser = false, dimsUser = false;
  lettersBtn.addEventListener('click', () => { lettersUser = !lettersUser; refreshAux(); });
  dimsBtn.addEventListener('click', () => { dimsUser = !dimsUser; refreshAux(); });
  spinBtn.addEventListener('click', () => {
    controls.autoRotate = !controls.autoRotate;
    spinBtn.setAttribute('aria-pressed', String(controls.autoRotate));
  });

  /* ---------------- Leyenda ---------------- */
  const legend = document.getElementById('legend');
  function renderLegend(which) {
    legend.innerHTML = LEGEND[which].map(([k, t]) => `<span><i style="background:${hex(COL[k])}"></i>${t}</span>`).join('');
  }

  /* ---------------- UI: pestañas, listas y ficha ---------------- */
  const list = document.getElementById('stations');
  const procBox = document.getElementById('processes');
  const tabRuta = document.getElementById('tab-ruta');
  const tabProc = document.getElementById('tab-proc');
  const stBtn = (tourId, i, num, name, ref) => `<button class="st" type="button" data-tour="${tourId}" data-i="${i}">
      <span class="st-num">${num ?? ''}</span>
      <span class="st-name">${name}</span>
      <span class="st-ref">${ref}</span>
    </button>`;
  list.innerHTML = STATIONS.map((s, i) => `<li>${stBtn('ruta', i, s.num, s.short || s.n, s.ref)}</li>`).join('');
  procBox.innerHTML = PROCESSES.map(c => `<section class="cer">
      <button class="cer-head" type="button" data-proc="${c.id}" aria-expanded="false">
        <span class="cer-name">${c.n}</span>
        <span class="st-ref">${c.ref}</span>
      </button>
      <ol class="cer-steps" hidden>${c.steps.map((s, i) => `<li>${stBtn(c.id, i, i + 1, s.n, s.ref)}</li>`).join('')}</ol>
    </section>`).join('');

  function showTab(which) {
    const proc = which === 'proc';
    tabRuta.setAttribute('aria-selected', String(!proc));
    tabProc.setAttribute('aria-selected', String(proc));
    list.hidden = proc;
    procBox.hidden = !proc;
  }
  tabRuta.addEventListener('click', () => { if (tour !== 'ruta') select('ruta', 0); else showTab('ruta'); });
  tabProc.addEventListener('click', () => { if (tour === 'ruta') select(PROCESSES[0].id, 0); else showTab('proc'); });
  document.querySelector('.tb-panel').addEventListener('click', e => {
    const b = e.target.closest('.st');
    if (b) return select(b.dataset.tour, +b.dataset.i);
    const h = e.target.closest('.cer-head');
    if (h) select(h.dataset.proc, 0);
  });

  const dKicker = document.getElementById('d-kicker');
  const dTitle = document.getElementById('d-title');
  const dRef = document.getElementById('d-ref');
  const dRows = document.getElementById('d-rows');
  const dDesc = document.getElementById('d-desc');
  const dThink = document.getElementById('d-think');
  const dPos = document.getElementById('d-pos');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let tour = 'ruta', idx = 0;
  const items = t => (t === 'ruta' ? STATIONS : PROC_BY_ID[t].steps);

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  document.getElementById('t-home').addEventListener('click', () => select('ruta', 0));
  function step(d) {
    const n = items(tour).length;
    const i = Math.max(0, Math.min(n - 1, idx + d));
    if (i !== idx) select(tour, i);
  }
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  function renderDetail() {
    const arr = items(tour), it = arr[idx];
    const proc = tour === 'ruta' ? null : PROC_BY_ID[tour];
    dKicker.textContent = proc ? proc.n : 'Ruta de aprendizaje';
    dKicker.hidden = false;
    dTitle.textContent = it.n;
    dRef.textContent = it.ref;
    dRows.innerHTML = it.rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    dDesc.textContent = it.desc;
    dThink.hidden = !it.think;
    dThink.querySelector('span').textContent = it.think || '';
    dPos.textContent = proc ? `Paso ${idx + 1} de ${arr.length}` : (it.num ? `${it.num} de ${STATIONS.length - 1}` : '');
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === arr.length - 1;
  }

  /* Grupos auxiliares según la estación y los botones */
  let current = STATIONS[0];
  function refreshAux() {
    const ruta = tour === 'ruta';
    const show = (ruta && current.show) || [];
    nucleo.visible = ruta && show.includes('nucleotido');
    basesBox.visible = ruta && show.includes('bases');
    ends.visible = ruta && show.includes('extremos');
    grooves.visible = ruta && show.includes('surcos');
    const dimsOn = ruta && (dimsUser || show.includes('medidas'));
    dims.visible = dimsOn;
    const lettersOn = ruta && (lettersUser || !!current.letters);
    letters.visible = lettersOn;
    lettersBtn.setAttribute('aria-pressed', String(lettersOn));
    dimsBtn.setAttribute('aria-pressed', String(dimsOn));
    lettersBtn.disabled = dimsBtn.disabled = !ruta;
  }

  function select(t, i, instant) {
    if (i === undefined || !items(t)[i]) return;
    tour = t; idx = i;
    const it = items(t)[i];
    current = it;
    const ruta = t === 'ruta';
    showTab(ruta ? 'ruta' : 'proc');
    document.querySelectorAll('.tb-panel .st').forEach(b => b.setAttribute('aria-current', String(b.dataset.tour === t && +b.dataset.i === i)));
    procBox.querySelectorAll('.cer-head').forEach(h => {
      const open = h.dataset.proc === t;
      h.setAttribute('aria-expanded', String(open));
      h.nextElementSibling.hidden = !open;
    });
    renderDetail();
    renderLegend(ruta ? 'ruta' : 'proc');
    helix.visible = ruta;
    if (ruta) {
      if (repGroup) { dropLabels(repGroup); disposeGroup(repGroup); repGroup = null; }
      setFocus(it.focus || null);
    } else {
      setFocus(null);
      buildReplication(it.stage);
    }
    refreshAux();
    flyTo(it.view, instant);
  }

  /* ---------------- Cámara ---------------- */
  let flight = null;
  const ease = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  function flyTo(v, instant) {
    const p1 = V3(...v.p), t1 = V3(...v.t);
    if (instant || reduceMotion) { camera.position.copy(p1); controls.target.copy(t1); flight = null; return; }
    flight = { p0: camera.position.clone(), t0: controls.target.clone(), p1, t1, start: performance.now(), dur: 1300 };
  }
  controls.addEventListener('start', () => { flight = null; });

  /* ---------------- Selección con el puntero ---------------- */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function shown(o) { while (o) { if (!o.visible) return false; o = o.parent; } return true; }
  function pickAt(e) {
    if (tour !== 'ruta') return null;
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(pickables, false);
    for (const h of hits) {
      if (!shown(h.object) || (h.object.material.opacity !== undefined && h.object.material.opacity < 0.5)) continue;
      return h.object.userData.station;
    }
    return null;
  }
  let down = null;
  canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY }; });
  canvas.addEventListener('pointerup', e => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved < 6) { const id = pickAt(e); if (id && BY_ID[id] !== undefined) select('ruta', BY_ID[id]); }
  });
  let hoverQueued = false, lastMove = null;
  canvas.addEventListener('pointermove', e => {
    if (e.buttons || e.pointerType === 'touch') return;
    lastMove = e;
    if (hoverQueued) return;
    hoverQueued = true;
    requestAnimationFrame(() => { hoverQueued = false; canvas.style.cursor = pickAt(lastMove) ? 'pointer' : ''; });
  });

  /* ---------------- Tamaño ---------------- */
  const detailEl = document.getElementById('detail');
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // En escritorio la ficha tapa la esquina inferior izquierda: se corre el centro de la vista
    if (getComputedStyle(detailEl).position === 'absolute') {
      const dx = Math.min(w * 0.22, (detailEl.offsetWidth + 20) / 2);
      camera.setViewOffset(w, h, -dx, 0, w, h);
    } else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  new ResizeObserver(resize).observe(detailEl);
  resize();

  /* ---------------- Animación ---------------- */
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (flight) {
      const k = Math.min(1, (now - flight.start) / flight.dur);
      const e = ease(k);
      camera.position.lerpVectors(flight.p0, flight.p1, e);
      controls.target.lerpVectors(flight.t0, flight.t1, e);
      if (k >= 1) flight = null;
    }
    updateFocus(reduceMotion ? 1 : dt);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  applyTheme(dark);
  select('ruta', 0, true);
  window.fypReset = () => select('ruta', 0);
  requestAnimationFrame(frame);
})();
