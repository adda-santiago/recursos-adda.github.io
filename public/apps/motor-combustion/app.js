/* ==========================================================
   Aula Visual — Motor de combustión interna (three.js r128)
   Unidad de la escena: 1 = 1 cm. Ejes: +y arriba (eje del cilindro),
   +x hacia el escape, z = eje del cigüeñal (+z hacia el observador).
   Motor de cuatro cilindros en línea, cuatro tiempos, dos árboles de levas.
   Los cilindros se alinean a lo largo de z: el 1 adelante (z = 0), el 4 atrás.
   Corte escalonado: el cilindro 1 se corta por el plano z = 0 (vista de frente)
   y los cilindros 2 a 4 por el plano x = 0 (vista de costado).
   Diámetro 8, carrera 8, biela 14, compresión ≈ 10:1.
   Ángulo del ciclo θ: 0° = PMS al inicio de la admisión; 720° por ciclo.
   El contenido está en data.js.
   ========================================================== */
(() => {
  'use strict';

  const { STATIONS, PROCESSES } = window.MOTOR_DATA;
  const BY_ID = Object.fromEntries(STATIONS.map((s, i) => [s.id, i]));
  const PROC_BY_ID = Object.fromEntries(PROCESSES.map(p => [p.id, p]));

  /* ---------------- Geometría (cm) ---------------- */
  const R = 4;                          // radio del codo (carrera = 8)
  const LROD = 14;                      // largo de la biela entre centros
  const CH = 3;                         // del pasador a la cabeza del pistón
  const BORE = 4;                       // radio del cilindro (diámetro 8)
  const CLEAR = 0.4;                    // pistón en el PMS → plano de la culata
  const D = R + LROD + CH + CLEAR;      // 21,4: plano de unión bloque-culata
  const ALPHA = 12 * Math.PI / 180;     // inclinación de las válvulas y del techo
  const ROOF = BORE * Math.tan(ALPHA);  // altura del techo de la cámara
  const HEAD_TOP = D + 7;
  const LIFT = 0.9, RB = 1.1;           // alzada máxima y radio base de la leva
  const W = 5.6;                        // media anchura del bloque de un cilindro
  const PITCH = 2 * W;                  // distancia entre ejes de cilindros
  const ZC = [0, -PITCH, -2 * PITCH, -3 * PITCH];   // eje de cada cilindro (1 → 4)
  /* Orden de encendido 1-3-4-2: desfase del ciclo de cada cilindro respecto del 1.
     Cilindro i: θi = θ − PHASE[i]. Los muñones 1 y 4 coinciden; 2 y 3 están a 180°. */
  const PHASE = [0, 540, 180, 360];
  const Z_END = ZC[3] - W;              // cara trasera del bloque
  const Z_BELT = Z_END - 2.2, Z_FLY = Z_END - 4.8;
  const roofY = x => D + ROOF * (1 - Math.min(1, Math.abs(x) / BORE));
  const rad = d => d * Math.PI / 180;
  const mod = (a, n) => ((a % n) + n) % n;

  /* Tiempos de válvula (grados del ciclo): representativos, no de un motor específico */
  const VALVES = {
    adm: { x: -1.8, r: 1.5, side: -1, open: 710, dur: 230 },
    esc: { x: 1.8, r: 1.3, side: 1, open: 500, dur: 230 }
  };
  function liftFrac(th, v) {
    const d = mod(th - v.open, 720);
    return d < v.dur ? Math.pow(Math.sin(Math.PI * d / v.dur), 2) : 0;
  }
  function pinY(th) { const t = rad(th); return R * Math.cos(t) + Math.sqrt(LROD * LROD - R * R * Math.sin(t) ** 2); }

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
  const DS = THREE.DoubleSide;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.5, 800);
  camera.position.set(27, 22, 54);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 8;
  controls.maxDistance = 190;
  controls.target.set(0, 14, -1);

  /* ---------------- Colores y materiales ---------------- */
  const COL = {
    seccion: 0xc4574a, bloque: 0xb3b9c3, culata: 0xa4adba, camisa: 0xd6d9df,
    piston: 0xc9ccd3, aros: 0x4a4e57, biela: 0x8d96a6, ciguenal: 0x6f7888,
    valvula: 0xd9c9a3, resorte: 0x5f8fc2, leva: 0x7a6aa8, correa: 0x2f3138,
    polea: 0x9aa2b0, bujia: 0xf2f0ea, bujiaMetal: 0x9da3ad, inyector: 0x3c414b,
    volante: 0x7d8594, corona: 0x5b6270, adm: 0x8fa9c4, esc: 0x7a6f68
  };
  /* Gas del cilindro: [θ, color, opacidad, brillo] — se interpola a lo largo del ciclo */
  const GAS = {
    otto: [
      [0, 0x8d919b, 0.32, 0], [30, 0x5aa0e0, 0.3, 0], [220, 0x5aa0e0, 0.36, 0], [344, 0x3f7fd6, 0.55, 0],
      [350, 0x3f7fd6, 0.55, 0], [356, 0xfff1b0, 0.88, 1], [372, 0xff9a2e, 0.78, 0.85], [450, 0xe2662b, 0.56, 0.4],
      [500, 0xc0573a, 0.46, 0.18], [545, 0x8d919b, 0.5, 0], [700, 0x8d919b, 0.3, 0], [720, 0x8d919b, 0.32, 0]
    ],
    diesel: [
      [0, 0x7c7f88, 0.3, 0], [30, 0xa9d8ef, 0.2, 0], [220, 0xa9d8ef, 0.22, 0], [342, 0xf2c3a0, 0.42, 0.1],
      [350, 0xf2c3a0, 0.42, 0.1], [360, 0xffd27a, 0.8, 0.9], [378, 0xff8a2a, 0.76, 0.75], [450, 0xd65a2a, 0.56, 0.35],
      [500, 0xa4523e, 0.46, 0.15], [545, 0x7c7f88, 0.5, 0], [700, 0x7c7f88, 0.3, 0], [720, 0x7c7f88, 0.3, 0]
    ]
  };
  const PHASES = [
    { n: 'Admisión', c: '--t-adm' }, { n: 'Compresión', c: '--t-comp' },
    { n: 'Explosión', c: '--t-exp' }, { n: 'Escape', c: '--t-esc' }
  ];
  function hex(c) { return '#' + c.toString(16).padStart(6, '0'); }

  /* Categorías que se pueden resaltar o atenuar */
  const CATS = {};
  const catF = {}, catT = {};
  function catMat(cat, params, base) {
    const b = base === undefined ? 1 : base;
    const m = new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.5, metalness: 0.2, transparent: true, opacity: b }, params));
    m.userData.cat = cat;
    m.userData.base = b;
    (CATS[cat] = CATS[cat] || []).push(m);
    catF[cat] = catT[cat] = 1;
    return m;
  }
  const M = {
    blk: catMat('bloque', { color: COL.bloque, roughness: 0.65 }),
    blkSec: catMat('bloque', { color: COL.seccion, roughness: 0.8, metalness: 0 }),
    blkGlass: catMat('bloque', { color: 0x9fb4c9, roughness: 0.2, metalness: 0, side: DS, depthWrite: false }, 0.12),
    camisa: catMat('bloque', { color: COL.camisa, roughness: 0.3, metalness: 0.45, side: DS }),
    head: catMat('culata', { color: COL.culata, roughness: 0.6 }),
    headSec: catMat('culata', { color: COL.seccion, roughness: 0.8, metalness: 0 }),
    headGlass: catMat('culata', { color: 0x9fb4c9, roughness: 0.2, metalness: 0, side: DS, depthWrite: false }, 0.12),
    conducto: catMat('culata', { color: COL.adm, roughness: 0.5, side: DS }, 0.35),
    escape: catMat('culata', { color: COL.esc, roughness: 0.5, side: DS }, 0.35),
    piston: catMat('piston', { color: COL.piston, metalness: 0.45, roughness: 0.35, side: DS }),
    pistonSec: catMat('piston', { color: COL.seccion, roughness: 0.8, metalness: 0 }),
    aros: catMat('piston', { color: COL.aros, metalness: 0.6, roughness: 0.35 }),
    pasador: catMat('piston', { color: 0x8a909c, metalness: 0.6, roughness: 0.3 }),
    biela: catMat('biela', { color: COL.biela, metalness: 0.55, roughness: 0.35 }),
    ciguenal: catMat('ciguenal', { color: COL.ciguenal, metalness: 0.55, roughness: 0.4 }),
    valvula: catMat('valvulas', { color: COL.valvula, metalness: 0.5, roughness: 0.35 }),
    resorte: catMat('valvulas', { color: COL.resorte, metalness: 0.4, roughness: 0.4 }),
    leva: catMat('levas', { color: COL.leva, metalness: 0.45, roughness: 0.35 }),
    correa: catMat('distribucion', { color: COL.correa, roughness: 0.9, metalness: 0 }),
    polea: catMat('distribucion', { color: COL.polea, metalness: 0.4, roughness: 0.4 }),
    poleaMarca: catMat('distribucion', { color: COL.seccion, roughness: 0.6, metalness: 0 }),
    bujia: catMat('bujia', { color: COL.bujia, roughness: 0.4, metalness: 0 }),
    bujiaMetal: catMat('bujia', { color: COL.bujiaMetal, metalness: 0.6, roughness: 0.3 }),
    inyector: catMat('bujia', { color: COL.inyector, metalness: 0.5, roughness: 0.35 }),
    volante: catMat('volante', { color: COL.volante, metalness: 0.5, roughness: 0.45 }),
    corona: catMat('volante', { color: COL.corona, metalness: 0.55, roughness: 0.4 }),
    marca: catMat('volante', { color: COL.seccion, roughness: 0.6, metalness: 0 }),
    gas: gasMat()
  };
  function gasMat() {
    const m = catMat('gas', { color: 0x5aa0e0, roughness: 0.9, metalness: 0, side: DS, depthWrite: false, emissive: 0x000000 }, 0.35);
    m.userData.gas = true;
    return m;
  }
  const GAS_M = [M.gas, gasMat(), gasMat(), gasMat()];   // un material por cilindro: cada uno va en otro tiempo

  function setFocus(list) {
    Object.keys(CATS).forEach(cat => { catT[cat] = !list || list.includes(cat) ? 1 : 0.1; });
  }
  function updateFocus(dt) {
    Object.keys(CATS).forEach(cat => {
      const t = catT[cat];
      catF[cat] += (t - catF[cat]) * Math.min(1, dt * 6);
      if (Math.abs(t - catF[cat]) < 0.002) catF[cat] = t;
      CATS[cat].forEach(m => {
        if (m.userData.gas) return;                      // el gas fija su opacidad en pose()
        m.opacity = m.userData.base * catF[cat];
        m.depthWrite = m.opacity > 0.6;
      });
    });
  }

  const pickables = [];
  function tag(obj, station) {
    obj.traverse(o => { if (o.isMesh) { o.userData.station = station; pickables.push(o); } });
    return obj;
  }
  function mesh(geo, mat, pos, parent) {
    const m = new THREE.Mesh(geo, mat);
    if (pos) m.position.copy(pos);
    parent.add(m);
    return m;
  }
  /* Cilindro con eje en z (CylinderGeometry tiene su eje en y) */
  function cylZ(r, len, seg, mat, x, y, z, parent) {
    const m = mesh(new THREE.CylinderGeometry(r, r, len, seg || 32), mat, V3(x, y, z), parent);
    m.rotation.x = Math.PI / 2;
    return m;
  }

  /* ---------------- Bloque y culata (dos mitades) ----------------
     Mitad trasera (z < 0): opaca, con la cara cortada en rojo cuando hay corte;
     traslúcida cuando no lo hay. Mitad delantera: solo traslúcida y solo sin corte. */
  const engine = new THREE.Group();
  scene.add(engine);
  const back = new THREE.Group(), front = new THREE.Group();
  engine.add(back, front);
  const swap = [];                                     // mallas traseras que cambian de material
  function swapMesh(m, cutMat, glassMat) { m.userData.cutMat = cutMat; m.userData.glassMat = glassMat; swap.push(m); return m; }

  function box(x0, x1, y0, y1, z0, z1, cat) {
    const metal = cat === 'culata' ? M.head : M.blk;
    const sec = cat === 'culata' ? M.headSec : M.blkSec;
    const glass = cat === 'culata' ? M.headGlass : M.blkGlass;
    const geo = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
    const pos = V3((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    // mitad trasera: la cara +z (índice 4) que queda en z = 0 es la de corte
    const mats = [metal, metal, metal, metal, z1 === 0 ? sec : metal, metal];
    const b = mesh(geo, mats, pos, back);
    swapMesh(b, mats, glass);
    tag(b, 'cilindro');
    const f = mesh(geo, glass, V3(pos.x, pos.y, -pos.z), front);
    tag(f, 'cilindro');
  }
  /* Mitad izquierda (x < 0) de los cilindros 2 a 4: la cara +x (índice 0) en x = 0 es la de corte.
     Sin corte, la mitad derecha se dibuja traslúcida en el grupo delantero. */
  function boxSide(x0, x1, y0, y1, z0, z1, cat) {
    const metal = cat === 'culata' ? M.head : M.blk;
    const sec = cat === 'culata' ? M.headSec : M.blkSec;
    const glass = cat === 'culata' ? M.headGlass : M.blkGlass;
    const geo = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
    const pos = V3((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    const mats = [x1 === 0 ? sec : metal, metal, metal, metal, metal, metal];
    const b = mesh(geo, mats, pos, back);
    swapMesh(b, mats, glass);
    tag(b, 'cilindro');
    tag(mesh(geo, glass, V3(-pos.x, pos.y, pos.z), front), 'cilindro');
  }
  // Cilindro 1: bloque (y 7,5 → D), cortado por z = 0
  box(-W, W, 7.5, D, -W, -BORE, 'bloque');
  box(-W, -BORE, 7.5, D, -BORE, 0, 'bloque');
  box(BORE, W, 7.5, D, -BORE, 0, 'bloque');
  // Cárter bajo el cilindro 1 (y −7 → 7,5)
  box(-8, -7, -7, 7.5, -W, 0, 'bloque');
  box(7, 8, -7, 7.5, -W, 0, 'bloque');
  box(-7, 7, -7, -6, -W, 0, 'bloque');
  box(-7, -BORE, 6.5, 7.5, -W, 0, 'bloque');
  box(BORE, 7, 6.5, 7.5, -W, 0, 'bloque');
  box(-BORE, BORE, 6.5, 7.5, -W, -BORE, 'bloque');
  // Cilindros 2 a 4: bloque cortado por x = 0
  ZC.slice(1).forEach(zc => {
    boxSide(-W, -BORE, 7.5, D, zc - W, zc + W, 'bloque');
    boxSide(-BORE, 0, 6.5, D, zc - W, zc - BORE, 'bloque');
    boxSide(-BORE, 0, 6.5, D, zc + BORE, zc + W, 'bloque');
    // relleno del techo de la cámara entre cilindros
    boxSide(-BORE, 0, D, D + ROOF, zc - W, zc - BORE, 'culata');
    boxSide(-BORE, 0, D, D + ROOF, zc + BORE, zc + W, 'culata');
  });
  // Cárter de los cilindros 2 a 4 y tapa trasera
  boxSide(-8, -7, -7, 7.5, Z_END, -W, 'bloque');
  boxSide(-7, 0, -7, -6, Z_END, -W, 'bloque');
  boxSide(-7, -BORE, 6.5, 7.5, Z_END, -W, 'bloque');
  boxSide(-8, 0, -7, 7.5, Z_END - 0.8, Z_END, 'bloque');
  // Camisa del cilindro (superficie interior)
  {
    const h = D - 6.5, y = 6.5 + h / 2;
    const bk = mesh(new THREE.CylinderGeometry(BORE, BORE, h, 48, 1, true, Math.PI / 2, Math.PI), M.camisa, V3(0, y, 0), back);
    swapMesh(bk, M.camisa, M.blkGlass);
    tag(bk, 'cilindro');
    tag(mesh(new THREE.CylinderGeometry(BORE, BORE, h, 48, 1, true, -Math.PI / 2, Math.PI), M.blkGlass, V3(0, y, 0), front), 'cilindro');
    ZC.slice(1).forEach(zc => {
      const b = mesh(new THREE.CylinderGeometry(BORE, BORE, h, 48, 1, true, Math.PI, Math.PI), M.camisa, V3(0, y, zc), back);
      swapMesh(b, M.camisa, M.blkGlass);
      tag(b, 'cilindro');
      tag(mesh(new THREE.CylinderGeometry(BORE, BORE, h, 48, 1, true, 0, Math.PI), M.blkGlass, V3(0, y, zc), front), 'cilindro');
    });
  }

  /* Culata: perfil en el plano xy extruido en z, con la cámara de techo inclinado
     y los conductos de admisión (izquierda) y escape (derecha). */
  const seat = {};
  Object.entries(VALVES).forEach(([k, v]) => {
    const S = new THREE.Vector2(v.x, roofY(v.x));
    const u = new THREE.Vector2(v.side * Math.sin(ALPHA), Math.cos(ALPHA));       // eje de la válvula
    const t = new THREE.Vector2(Math.cos(ALPHA), -v.side * Math.sin(ALPHA));      // a lo largo del techo, hacia +x
    seat[k] = { S, u, A: S.clone().addScaledVector(t, -v.r), B: S.clone().addScaledVector(t, v.r) };
  });
  const quad = (p0, c, p1, n) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const s = i / n, a = (1 - s) * (1 - s), b = 2 * s * (1 - s), d = s * s;
      out.push(new THREE.Vector2(a * p0.x + b * c.x + d * p1.x, a * p0.y + b * c.y + d * p1.y));
    }
    return out;
  };
  const P2 = (x, y) => new THREE.Vector2(x, y);
  const HW = 6.5;
  const sa = seat.adm, se = seat.esc;
  const admLow = quad(sa.A, P2(-4.8, D + 0.5), P2(-HW, D + 1.6), 14);
  const admTop = quad(sa.B, P2(-1.6, D + 4.0), P2(-HW, D + 4.0), 18);
  const escLow = quad(se.B, P2(4.8, D + 0.5), P2(HW, D + 1.6), 14);
  const escTop = quad(se.A, P2(1.6, D + 4.0), P2(HW, D + 4.0), 18);
  const headShapes = [
    [P2(-HW, D), P2(-BORE, D), ...admLow],
    [P2(HW, D), ...escLow.slice().reverse().slice(0, -1), se.B, P2(BORE, D)],
    [P2(-HW, HEAD_TOP), ...admTop.slice().reverse(), P2(0, D + ROOF), ...escTop, P2(HW, HEAD_TOP)]
  ].map(pts => new THREE.Shape(pts));
  headShapes.forEach(shape => {
    const geo = new THREE.ExtrudeGeometry(shape, { depth: W, bevelEnabled: false, curveSegments: 4 });
    // separar las dos tapas: la de z local = W queda en z = 0 (corte)
    const caps = geo.groups.find(g => g.materialIndex === 0), sides = geo.groups.find(g => g.materialIndex === 1);
    geo.clearGroups();
    geo.addGroup(caps.start, caps.count / 2, 1);
    geo.addGroup(caps.start + caps.count / 2, caps.count / 2, 2);
    geo.addGroup(sides.start, sides.count, 1);
    const mats = [M.head, M.head, M.headSec];
    const b = mesh(geo, mats, V3(0, 0, -W), back);
    swapMesh(b, mats, M.headGlass);
    tag(b, 'cilindro');
    tag(mesh(geo, M.headGlass, V3(0, 0, 0), front), 'cilindro');
  });
  // Culata de los cilindros 2 a 4: mitad izquierda opaca; mitad derecha solo traslúcida y sin corte
  const cutOnly = [];
  {
    const depth = -W - Z_END;
    const leftTop = new THREE.Shape([P2(-HW, HEAD_TOP), ...admTop.slice().reverse(), P2(0, D + ROOF), P2(0, HEAD_TOP)]);
    const rightTop = new THREE.Shape([P2(0, HEAD_TOP), P2(0, D + ROOF), ...escTop, P2(HW, HEAD_TOP)]);
    const ext = sh => new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: false, curveSegments: 4 });
    [headShapes[0], leftTop].forEach(sh => {
      const b = mesh(ext(sh), M.head, V3(0, 0, Z_END), back);
      swapMesh(b, M.head, M.headGlass);
      tag(b, 'cilindro');
    });
    [headShapes[1], rightTop].forEach(sh => tag(mesh(ext(sh), M.headGlass, V3(0, 0, Z_END), front), 'cilindro'));
    // cara de corte de la culata en x = 0
    const plate = mesh(new THREE.PlaneGeometry(depth, HEAD_TOP - D - ROOF), M.headSec, V3(0.01, (HEAD_TOP + D + ROOF) / 2, Z_END + depth / 2), back);
    plate.rotation.y = Math.PI / 2;
    cutOnly.push(plate);
    tag(plate, 'cilindro');
  }
  // Conductos exteriores: múltiple de admisión y tubos de escape, uno por cilindro
  ZC.forEach(zc => [[-1, M.conducto], [1, M.escape]].forEach(([s, mat]) => {
    const p = mesh(new THREE.CylinderGeometry(1.15, 1.15, 4, 24, 1, true), mat, V3(s * (HW + 2), D + 2.8, zc), engine);
    p.rotation.z = Math.PI / 2;
    tag(p, 'valvulas');
  }));
  // colector de admisión y de escape que unen los cuatro conductos
  [[-1, M.conducto], [1, M.escape]].forEach(([s, mat]) => {
    const len = -ZC[3] + 2.4;
    tag(cylZ(1.35, len, 24, mat, s * (HW + 4.3), D + 2.8, ZC[3] / 2, engine), 'valvulas');
  });

  /* ---------------- Pistón ---------------- */
  const pistonG = new THREE.Group();
  engine.add(pistonG);
  const PR = BORE - 0.05;
  function buildPiston(cut) {
    const g = new THREE.Group();
    const t0 = cut ? Math.PI / 2 : 0, tl = cut ? Math.PI : Math.PI * 2;
    mesh(new THREE.CylinderGeometry(PR, PR, 4.8, 48, 1, true, t0, tl), M.piston, V3(0, -0.6, 0), g);       // falda
    mesh(new THREE.CylinderGeometry(PR, PR, 1.2, 48, 1, false, t0, tl), M.piston, V3(0, CH - 0.6, 0), g);   // cabeza
    if (cut) mesh(new THREE.BoxGeometry(PR * 2, 1.2, 0.02), M.pistonSec, V3(0, CH - 0.6, -0.01), g);
    [2.75, 2.4, 2.05].forEach(y => {
      const r = mesh(new THREE.TorusGeometry(PR + 0.02, 0.08, 6, 48, cut ? Math.PI : Math.PI * 2), M.aros, V3(0, y, 0), g);
      r.rotation.x = -Math.PI / 2;
    });
    // apoyos del pasador
    [-1, 1].forEach(s => { if (!cut || s < 0) cylZ(1.05, 1.2, 24, M.piston, 0, 0, s * 2.2, g); });
    return tag(g, 'piston');
  }
  const pistonCut = buildPiston(true), pistonFull = buildPiston(false);
  pistonG.add(pistonCut, pistonFull);
  tag(cylZ(0.65, 7.4, 20, M.pasador, 0, 0, 0, pistonG), 'piston');
  const pistons = [pistonG];
  ZC.slice(1).forEach(zc => {
    const g = new THREE.Group();
    g.position.z = zc;
    engine.add(g);
    g.add(buildPiston(false));
    tag(cylZ(0.65, 7.4, 20, M.pasador, 0, 0, 0, g), 'piston');
    pistons.push(g);
  });

  /* ---------------- Biela ---------------- */
  const rods = ZC.map(zc => {
    const rodG = new THREE.Group();
    rodG.userData.z = zc;
    engine.add(rodG);
    cylZ(1.75, 1.2, 32, M.biela, 0, 0, 0, rodG);
    const shank = new THREE.Shape([P2(-0.7, 1.2), P2(0.7, 1.2), P2(0.42, LROD - 0.6), P2(-0.42, LROD - 0.6)]);
    const sg = new THREE.ExtrudeGeometry(shank, { depth: 0.8, bevelEnabled: false });
    sg.translate(0, 0, -0.4);
    mesh(sg, M.biela, null, rodG);
    cylZ(1.0, 1.0, 24, M.biela, 0, LROD, 0, rodG);
    return tag(rodG, 'biela');
  });

  /* ---------------- Cigüeñal, polea y volante ---------------- */
  const crankG = new THREE.Group();
  engine.add(crankG);
  {
    const zA = 4, zB = Z_FLY - 0.6;
    cylZ(1.2, zA - zB, 28, M.ciguenal, 0, 0, (zA + zB) / 2, crankG);          // eje de punta a punta
    const web = new THREE.Shape();
    web.moveTo(-1.7, R);
    web.absarc(0, R, 1.7, Math.PI, 0, true);
    web.lineTo(2.4, 0.6);
    web.lineTo(4.6 * Math.cos(rad(-20)), 4.6 * Math.sin(rad(-20)));
    web.absarc(0, 0, 4.6, rad(-20), rad(-160), true);
    web.lineTo(-2.4, 0.6);
    web.closePath();
    const wg = new THREE.ExtrudeGeometry(web, { depth: 0.8, bevelEnabled: false, curveSegments: 16 });
    // un codo por cilindro: brazos, contrapesos y muñequilla, girados según el desfase
    ZC.forEach((zc, i) => {
      const th = new THREE.Group();
      th.position.z = zc;
      th.rotation.z = rad(PHASE[i] % 360);
      crankG.add(th);
      [-1.5, 0.7].forEach(z => mesh(wg, M.ciguenal, V3(0, 0, z), th));
      cylZ(1.0, 3.0, 24, M.ciguenal, 0, R, 0, th);                            // muñequilla
    });
    tag(crankG, 'biela');
  }
  const crankPulley = new THREE.Group();
  crankG.add(crankPulley);
  cylZ(1.6, 1.0, 36, M.polea, 0, 0, Z_BELT, crankPulley);
  mesh(new THREE.BoxGeometry(0.35, 0.9, 1.05), M.poleaMarca, V3(0, 1.2, Z_BELT), crankPulley);
  tag(crankPulley, 'distribucion');

  const flyG = new THREE.Group();
  crankG.add(flyG);
  {
    cylZ(6.0, 1.1, 64, M.volante, 0, 0, Z_FLY, flyG);
    for (let k = 0; k < 72; k++) {
      const a = k * Math.PI * 2 / 72;
      const tooth = mesh(new THREE.BoxGeometry(0.32, 0.4, 1.1), M.corona, V3(6.15 * Math.cos(a), 6.15 * Math.sin(a), Z_FLY), flyG);
      tooth.rotation.z = a - Math.PI / 2;
    }
    for (let k = 0; k < 4; k++) {
      const a = k * Math.PI / 2 + Math.PI / 4;
      cylZ(0.7, 1.16, 20, M.corona, 3.6 * Math.cos(a), 3.6 * Math.sin(a), Z_FLY, flyG);
    }
    mesh(new THREE.BoxGeometry(0.5, 1.6, 1.16), M.marca, V3(0, 4.9, Z_FLY), flyG);
    tag(flyG, 'volante');
  }

  /* ---------------- Válvulas, resortes y levas ---------------- */
  const springGeo = (() => {
    const pts = [];
    const turns = 5.5, n = 220;
    for (let i = 0; i <= n; i++) { const s = i / n, a = s * turns * Math.PI * 2; pts.push(V3(0.75 * Math.cos(a), s, 0.75 * Math.sin(a))); }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n, 0.09, 6, false);
  })();
  const SPRING_Y0 = (HEAD_TOP - (D + ROOF * (1 - 1.8 / BORE))) / Math.cos(ALPHA);   // apoyo del resorte en la culata
  const RETAINER = 8.6, STEM_TOP = 9.6;

  const cams = {};
  const valves = [];
  Object.entries(VALVES).forEach(([k, v]) => {
    const st = seat[k];
    // Una válvula por cilindro (motor de dos válvulas por cilindro)
    ZC.forEach((zc, i) => {
      const g = new THREE.Group();
      g.position.set(st.S.x, st.S.y, zc);
      g.rotation.z = -v.side * ALPHA;
      engine.add(g);
      const moving = new THREE.Group();
      g.add(moving);
      mesh(new THREE.CylinderGeometry(v.r, v.r, 0.2, 40), M.valvula, V3(0, 0.1, 0), moving);
      mesh(new THREE.CylinderGeometry(0.32, v.r - 0.05, 0.6, 40), M.valvula, V3(0, 0.5, 0), moving);
      mesh(new THREE.CylinderGeometry(0.3, 0.3, STEM_TOP - 0.8, 16), M.valvula, V3(0, 0.8 + (STEM_TOP - 0.8) / 2 - 0.4, 0), moving);
      mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.25, 28), M.resorte, V3(0, RETAINER + 0.125, 0), moving);
      mesh(new THREE.CylinderGeometry(0.98, 0.98, 0.6, 28), M.valvula, V3(0, STEM_TOP - 0.3, 0), moving);  // taqué
      const spring = mesh(springGeo, M.resorte, V3(0, SPRING_Y0, 0), g);
      tag(g, 'valvulas');
      valves.push({ k, v, i, moving, spring });
    });

    // Árbol de levas: una leva por cilindro. El perfil se genera con la misma función de alzada
    // que mueve la válvula, y cada leva se gira la mitad del desfase de su cilindro.
    const C = st.S.clone().addScaledVector(st.u, STEM_TOP + RB);
    const gamma = Math.atan2(-st.u.y, -st.u.x);
    const camG = new THREE.Group();
    camG.position.set(C.x, C.y, 0);
    engine.add(camG);
    const prof = [];
    for (let j = 0; j < 180; j++) {
      const psi = j * Math.PI * 2 / 180;
      const r = RB + LIFT * liftFrac(2 * psi * 180 / Math.PI, v);
      prof.push(P2(r * Math.cos(psi), r * Math.sin(psi)));
    }
    const lg = new THREE.ExtrudeGeometry(new THREE.Shape(prof), { depth: 1.4, bevelEnabled: false });
    lg.translate(0, 0, -0.7);
    ZC.forEach((zc, i) => {
      const lobe = mesh(lg, M.leva, V3(0, 0, zc), camG);
      lobe.rotation.z = rad(PHASE[i] / 2);
    });
    const zA = 2.6, zB = Z_BELT;
    cylZ(0.6, zA - zB, 20, M.leva, 0, 0, (zA + zB) / 2, camG);                // eje de punta a punta
    tag(camG, 'distribucion');
    const pul = new THREE.Group();
    camG.add(pul);
    cylZ(3.2, 1.0, 56, M.polea, 0, 0, Z_BELT, pul);
    mesh(new THREE.BoxGeometry(0.4, 1.4, 1.08), M.poleaMarca, V3(0, 2.5, Z_BELT), pul);
    tag(pul, 'distribucion');
    // soportes del árbol sobre la culata, entre cilindros (solo atrás)
    ZC.forEach(zc => {
      const tower = mesh(new THREE.BoxGeometry(2.2, C.y - HEAD_TOP, 0.9), M.head, V3(C.x, (C.y + HEAD_TOP) / 2, zc - 3.2), back);
      swapMesh(tower, M.head, M.headGlass);
      tag(tower, 'distribucion');
    });

    cams[k] = { v, camG, gamma, C };
  });

  /* Correa de distribución: envolvente de las tres poleas */
  const beltPts = (() => {
    const circles = [[0, 0, 1.6], [cams.adm.C.x, cams.adm.C.y, 3.2], [cams.esc.C.x, cams.esc.C.y, 3.2]];
    const pts = [];
    circles.forEach(([x, y, r]) => { for (let i = 0; i < 120; i++) { const a = i * Math.PI * 2 / 120; pts.push([x + (r + 0.12) * Math.cos(a), y + (r + 0.12) * Math.sin(a)]); } });
    pts.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    pts.forEach(p => { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); });
    pts.slice().reverse().forEach(p => { while (hi.length >= 2 && cross(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); });
    return lo.slice(0, -1).concat(hi.slice(0, -1)).map(([x, y]) => V3(x, y, Z_BELT));   // sentido antihorario
  })();
  const beltLen = [];
  let beltTotal = 0;
  beltPts.forEach((p, i) => { beltLen.push(beltTotal); beltTotal += p.distanceTo(beltPts[(i + 1) % beltPts.length]); });
  function beltAt(s) {
    s = mod(s, beltTotal);
    let lo = 0, hi = beltLen.length - 1;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (beltLen[m] <= s) lo = m; else hi = m - 1; }
    const a = beltPts[lo], b = beltPts[(lo + 1) % beltPts.length];
    const seg = a.distanceTo(b) || 1;
    return a.clone().lerp(b, (s - beltLen[lo]) / seg);
  }
  const beltG = new THREE.Group();
  engine.add(beltG);
  {
    const curve = new THREE.CatmullRomCurve3(beltPts, true, 'catmullrom', 0);
    mesh(new THREE.TubeGeometry(curve, beltPts.length, 0.14, 6, true), M.correa, null, beltG);
  }
  const teeth = [];
  for (let k = 0; k < 40; k++) teeth.push(mesh(new THREE.BoxGeometry(0.3, 0.3, 0.95), M.poleaMarca, null, beltG));
  tag(beltG, 'distribucion');

  /* ---------------- Bujías e inyectores (uno por cilindro) ---------------- */
  const plugs = [], injectors = [], sprays = [], sparks = [];
  const sprayMat = new THREE.MeshBasicMaterial({ color: 0xe0b04a, transparent: true, opacity: 0.6, depthWrite: false });
  ZC.forEach(zc => {
    const yb = D + ROOF;
    const plugG = new THREE.Group();
    plugG.position.z = zc;
    engine.add(plugG);
    mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 8), M.bujiaMetal, V3(0, yb - 0.2, 0), plugG);       // electrodo central
    mesh(new THREE.BoxGeometry(0.12, 0.12, 0.5), M.bujiaMetal, V3(0.18, yb - 0.38, 0), plugG).rotation.y = Math.PI / 2;
    mesh(new THREE.CylinderGeometry(0.6, 0.6, HEAD_TOP - 0.7 - yb, 20), M.bujiaMetal, V3(0, (yb + HEAD_TOP - 0.7) / 2, 0), plugG); // cuerpo roscado
    mesh(new THREE.CylinderGeometry(0.95, 0.95, 1.0, 6), M.bujiaMetal, V3(0, HEAD_TOP - 0.2, 0), plugG); // hexágono
    mesh(new THREE.CylinderGeometry(0.45, 0.55, 2.6, 20), M.bujia, V3(0, HEAD_TOP + 1.6, 0), plugG);    // aislante
    mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.5, 12), M.bujiaMetal, V3(0, HEAD_TOP + 3.1, 0), plugG);
    plugs.push(tag(plugG, 'bujia'));

    const injG = new THREE.Group();
    injG.position.z = zc;
    engine.add(injG);
    mesh(new THREE.CylinderGeometry(0.18, 0.35, 0.5, 16), M.inyector, V3(0, yb - 0.1, 0), injG);
    mesh(new THREE.CylinderGeometry(0.55, 0.55, HEAD_TOP - yb + 3, 20), M.inyector, V3(0, (yb + HEAD_TOP + 3) / 2 + 0.15, 0), injG);
    mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.0, 12), M.bujiaMetal, V3(-0.55, HEAD_TOP + 2.4, 0), injG).rotation.z = Math.PI / 2;
    injectors.push(tag(injG, 'bujia'));
    const sprayG = new THREE.Group();
    injG.add(sprayG);
    [-50, -18, 18, 50].forEach(an => {
      const c = mesh(new THREE.ConeGeometry(0.35, 3.2, 12, 1, true), sprayMat, null, sprayG);
      c.geometry.translate(0, -1.6, 0);
      c.position.set(0, D + ROOF - 0.35, 0);
      c.rotation.z = rad(an);
      c.rotation.x = rad(an > 0 ? 8 : -8);
    });
    sprays.push(sprayG);
  });

  /* ---------------- Gas en el cilindro ---------------- */
  function roofGeo(t0, tl) {
    const g = new THREE.CylinderGeometry(BORE - 0.06, BORE - 0.06, 1, 48, 1, false, t0, tl);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i), x = p.getX(i);
      p.setY(i, y > 0 ? roofY(x) - D - 0.02 : 0);
    }
    p.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }
  const gasG = { cut: new THREE.Group(), full: new THREE.Group() };
  const gasCyl = [];
  [['cut', Math.PI / 2, Math.PI], ['full', 0, Math.PI * 2]].forEach(([k, t0, tl]) => {
    const c = mesh(new THREE.CylinderGeometry(BORE - 0.06, BORE - 0.06, 1, 48, 1, true, t0, tl), M.gas, null, gasG[k]);
    c.renderOrder = 2;
    gasCyl.push(c);
    const r = mesh(roofGeo(t0, tl), M.gas, V3(0, D, 0), gasG[k]);
    r.renderOrder = 2;
    engine.add(gasG[k]);
  });
  // cilindros 2 a 4: gas completo (el corte de costado deja verlo entero)
  const gasCylN = [null];
  ZC.slice(1).forEach((zc, j) => {
    const mat = GAS_M[j + 1];
    const c = mesh(new THREE.CylinderGeometry(BORE - 0.06, BORE - 0.06, 1, 48, 1, true), mat, V3(0, 0, zc), engine);
    c.renderOrder = 2;
    const r = mesh(roofGeo(0, Math.PI * 2), mat, V3(0, D, zc), engine);
    r.renderOrder = 2;
    gasCylN.push(c);
  });

  /* Chispa y luz de la combustión */
  function glowTexture(inner, outer) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, inner); gr.addColorStop(0.35, outer); gr.addColorStop(1, 'rgba(255,200,80,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    return t;
  }
  const sparkMat = new THREE.SpriteMaterial({ map: glowTexture('#ffffff', 'rgba(150,200,255,.9)'), transparent: true, depthWrite: false, depthTest: false });
  const sparkMatDepth = sparkMat.clone();
  sparkMatDepth.depthTest = true;                    // las chispas de 2 a 4 no se ven a través del bloque
  ZC.forEach((zc, i) => {
    const sp = new THREE.Sprite(i ? sparkMatDepth : sparkMat);
    sp.position.set(0.1, D + ROOF - 0.38, zc + 0.3);
    sp.scale.set(1.8, 1.8, 1);
    sp.renderOrder = 30;
    engine.add(sp);
    sparks.push(sp);
  });
  const fireLight = new THREE.PointLight(0xffa040, 0, 18, 2);
  fireLight.position.set(0, D - 1, 1.5);
  engine.add(fireLight);

  /* Partículas en los conductos */
  const dotTex = glowTexture('rgba(255,255,255,1)', 'rgba(255,255,255,.75)');
  function stream(points, color) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => V3(p[0], p[1], 0)));
    const n = 34;
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(n * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.PointsMaterial({ color, size: 0.6, map: dotTex, transparent: true, depthWrite: false, opacity: 0 });
    const pts = new THREE.Points(geo, mat);
    pts.renderOrder = 5;
    pts.frustumCulled = false;
    engine.add(pts);
    const seeds = Array.from({ length: n }, (_, i) => ({ u: i / n, dx: (Math.random() - 0.5) * 0.6, dy: (Math.random() - 0.5) * 0.6, dz: (Math.random() - 0.5) * 1.8 }));
    return { curve, pts, arr, seeds, mat };
  }
  const streams = {
    adm: stream([[-10.5, D + 2.8], [-6.5, D + 2.8], [-3.6, D + 2.3], [-2.0, D + 1.2], [-1.6, D - 1.2], [-1.0, D - 3.8]], 0x4a90d9),
    esc: stream([[1.0, D - 3.8], [1.6, D - 1.2], [2.0, D + 1.2], [3.6, D + 2.3], [6.5, D + 2.8], [10.5, D + 2.8]], 0x8d919b)
  };

  /* ---------------- Etiquetas (sprites de texto) ---------------- */
  const labels = [];
  function cssVar(name, fb) { return getComputedStyle(root).getPropertyValue(name).trim() || fb; }
  function drawLabel(L) {
    const ink = cssVar('--ink', '#1f2430'), bg = cssVar('--bg', '#fafaf8'), line = cssVar('--line', '#e4e4df'), muted = cssVar('--muted', '#6b7080');
    const c = L.canvas, g = c.getContext('2d');
    const fs = 44, fs2 = 32, pad = 22, gap = 8;
    const font1 = `600 ${fs}px Inter, system-ui, sans-serif`, font2 = `500 ${fs2}px Inter, system-ui, sans-serif`;
    g.font = font1; const w1 = g.measureText(L.text).width;
    g.font = font2; const w2 = L.sub ? g.measureText(L.sub).width : 0;
    const Wd = Math.ceil(Math.max(w1, w2) + pad * 2), H = Math.ceil(L.sub ? fs + fs2 + gap + pad * 2 : fs + pad * 2);
    c.width = Wd; c.height = H;
    const r = 16;
    g.beginPath();
    g.moveTo(r, 1); g.lineTo(Wd - r, 1); g.quadraticCurveTo(Wd - 1, 1, Wd - 1, r);
    g.lineTo(Wd - 1, H - r); g.quadraticCurveTo(Wd - 1, H - 1, Wd - r, H - 1);
    g.lineTo(r, H - 1); g.quadraticCurveTo(1, H - 1, 1, H - r);
    g.lineTo(1, r); g.quadraticCurveTo(1, 1, r, 1); g.closePath();
    g.globalAlpha = 0.93; g.fillStyle = bg; g.fill();
    g.globalAlpha = 1; g.lineWidth = 2; g.strokeStyle = line; g.stroke();
    g.textBaseline = 'top';
    g.font = font1; g.fillStyle = L.color || ink;
    g.fillText(L.text, pad, pad + 2);
    if (L.sub) { g.font = font2; g.fillStyle = muted; g.fillText(L.sub, pad, pad + fs + gap); }
    L.tex.needsUpdate = true;
    L.sprite.scale.set(L.h * Wd / H, L.h, 1);
  }
  function label(text, sub, h, pos, parent, opts) {
    const o = opts || {};
    const cv = document.createElement('canvas');
    const tex = new THREE.CanvasTexture(cv);
    tex.minFilter = THREE.LinearFilter;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false, transparent: true }));
    sprite.renderOrder = 20;
    sprite.center.set(o.cx ?? 0.5, o.cy ?? 0.5);
    sprite.position.copy(pos);
    parent.add(sprite);
    const L = { canvas: cv, tex, sprite, text, sub, h, color: o.color };
    labels.push(L); drawLabel(L);
    return L;
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => labels.forEach(drawLabel));

  /* Nombres de las piezas */
  const names = new THREE.Group();
  names.visible = false;
  scene.add(names);
  {
    const h = 1.15, ca = cams.adm.C, ce = cams.esc.C;
    label('Bujía', null, h, V3(0, HEAD_TOP + 4.6, 0), names, { cy: 0 });
    label('Leva de admisión', null, h, V3(ca.x - 1, ca.y + 2.9, 0), names, { cx: 0.85, cy: 0 });
    label('Leva de escape', null, h, V3(ce.x + 1, ce.y + 2.9, 0), names, { cx: 0.15, cy: 0 });
    label('Válvula de admisión', null, h, V3(-HW - 0.6, D + 5.3, 0), names, { cx: 1 });
    label('Válvula de escape', null, h, V3(HW + 0.6, D + 5.3, 0), names, { cx: 0 });
    label('Admisión', 'entra la mezcla', 1.7, V3(-HW - 4.4, D + 2.8, 0), names, { cx: 1 });
    label('Escape', 'salen los gases', 1.7, V3(HW + 4.4, D + 2.8, 0), names, { cx: 0 });
    label('Pistón', null, h, V3(-W - 0.6, 17.5, 0), names, { cx: 1 });
    label('Cilindro', null, h, V3(-W - 0.6, 10.5, 0), names, { cx: 1 });
    label('Biela', null, h, V3(W + 0.6, 4.5, 0), names, { cx: 0 });
    label('Cigüeñal', null, h, V3(8.6, 0, 0), names, { cx: 0 });
    label('Volante de inercia', null, h, V3(0, -6.9, Z_FLY), names, { cy: 1 });
    label('Correa de distribución', null, h, V3(-8.4, 3, Z_BELT), names, { cx: 1 });
  }
  /* Número de cada cilindro, sobre la culata */
  const numbers = new THREE.Group();
  numbers.visible = false;
  scene.add(numbers);
  ZC.forEach((zc, i) => label(`Cilindro ${i + 1}`, null, 1.3, V3(-HW - 0.4, HEAD_TOP + 1.2, zc), numbers, { cx: 1, cy: 0 }));

  /* PMS / PMI y medidas */
  const lineMat = new THREE.LineBasicMaterial({ color: COL.seccion });
  const dashMat = new THREE.LineDashedMaterial({ color: COL.seccion, dashSize: 0.45, gapSize: 0.3 });
  function line(group, pts, mat) {
    const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => V3(...p)));
    const l = mat === dashMat ? new THREE.Line(g, mat) : new THREE.LineSegments(g, mat);
    if (mat === dashMat) l.computeLineDistances();
    group.add(l);
    return l;
  }
  const pms = new THREE.Group();
  pms.visible = false;
  scene.add(pms);
  const yTDC = R + LROD + CH, yBDC = -R + LROD + CH;
  [[yTDC, 'PMS', 'punto muerto superior'], [yBDC, 'PMI', 'punto muerto inferior']].forEach(([y, t, s]) => {
    line(pms, [[-BORE - 0.6, y, 0.05], [W + 1.4, y, 0.05]], dashMat);
    label(t, s, 1.15, V3(W + 1.6, y, 0), pms, { cx: 0 });
  });
  const dims = new THREE.Group();
  dims.visible = false;
  scene.add(dims);
  {
    const zf = 4.6, yd = yTDC - 0.35, k = 0.35;
    line(dims, [[-BORE, yd, zf], [BORE, yd, zf], [-BORE, yd - k, zf], [-BORE, yd + k, zf], [BORE, yd - k, zf], [BORE, yd + k, zf]], lineMat);
    label('Diámetro 8 cm', null, 1.0, V3(0, yd + 0.6, zf), dims, { cy: 0 });
    const xc = W + 0.8;
    line(dims, [[xc, yBDC, 0.3], [xc, yTDC, 0.3], [xc - k, yBDC, 0.3], [xc + k, yBDC, 0.3], [xc - k, yTDC, 0.3], [xc + k, yTDC, 0.3]], lineMat);
    label('Carrera 8 cm', null, 1.0, V3(xc + 0.8, (yBDC + yTDC) / 2, 0.3), dims, { cx: 0 });
    label('Cilindrada ≈ 402 cm³', 'por cilindro · 4 cilindros ≈ 1,6 L', 1.6, V3(xc + 0.8, yBDC - 2.4, 0), dims, { cx: 0 });
    label('Compresión ≈ 10:1', 'cámara ≈ 45 cm³', 1.6, V3(xc + 0.8, yBDC - 5.0, 0), dims, { cx: 0 });
  }

  /* ---------------- Luces y tema ---------------- */
  const hemi = new THREE.HemisphereLight(0xffffff, 0x9aa0ad, 0.7);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 0.75);
  key.position.set(20, 40, 35);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.35);
  rim.position.set(-25, 10, -30);
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
    hemi.intensity = dark ? 0.6 : 0.7;
    key.intensity = dark ? 0.9 : 0.75;
    M.correa.color.set(dark ? 0x55585f : COL.correa);
    labels.forEach(drawLabel);
    themeBtn.textContent = dark ? 'Fondo claro' : 'Fondo oscuro';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', bg);
  }
  themeBtn.addEventListener('click', () => { userChoseTheme = true; applyTheme(!dark); });
  const onScheme = e => { if (!userChoseTheme) applyTheme(e.matches); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);

  /* ---------------- Estado del ciclo ---------------- */
  let theta = 0;              // 0–720
  let total = 0;              // grados acumulados (para la correa)
  let playing = !reduceMotion;
  let hold = 0;
  let run = { a: 0, b: 720, speed: 90, loop: true };
  let mode = 'otto';
  let cut = true;

  function setRun(cfg) {
    run = cfg;
    if (!cfg.loop && (theta < cfg.a || theta > cfg.b)) { total += mod(cfg.a - theta, 720); theta = cfg.a; }
    hold = 0;
  }
  function advance(dt) {
    if (!playing) return;
    if (hold > 0) {
      hold -= dt;
      if (hold <= 0) { total -= run.b - run.a; theta = run.a; }
      return;
    }
    const d = run.speed * dt;
    if (run.loop) { theta = mod(theta + d, 720); total += d; return; }
    if (theta + d >= run.b) { total += run.b - theta; theta = run.b; hold = 1.1; }
    else { theta += d; total += d; }
  }

  function gasAt(th) {
    const K = GAS[mode];
    let i = 0;
    while (i < K.length - 2 && K[i + 1][0] <= th) i++;
    const [a0, c0, o0, e0] = K[i], [a1, c1, o1, e1] = K[i + 1];
    const s = Math.max(0, Math.min(1, (th - a0) / (a1 - a0 || 1)));
    const col = new THREE.Color(c0).lerp(new THREE.Color(c1), s);
    return { col, op: o0 + (o1 - o0) * s, em: e0 + (e1 - e0) * s };
  }
  function gasText(th) {
    if (mode === 'diesel') {
      if (th < 212) return 'Entra solo aire';
      if (th < 348) return 'Aire comprimido y caliente';
      if (th < 380) return 'Se inyecta gasóleo y se enciende solo';
      if (th < 500) return 'Los gases calientes empujan el pistón';
      return 'Salen los gases quemados';
    }
    if (th < 212) return 'Entra mezcla de aire y gasolina';
    if (th < 345) return 'Mezcla comprimida';
    if (th < 360) return 'Salta la chispa';
    if (th < 500) return 'Los gases calientes empujan el pistón';
    return 'Salen los gases quemados';
  }

  /* ---------------- Pose del motor para un ángulo θ ---------------- */
  const hud = {
    num: document.getElementById('h-num'), name: document.getElementById('h-name'),
    turn: document.getElementById('h-turn'), valves: document.getElementById('h-valves'),
    dot: document.getElementById('h-dot'), gas: document.getElementById('h-gas'),
    needle: document.getElementById('h-needle'), arcs: [...document.querySelectorAll('.hud-dial .arc')]
  };
  hud.cyls = [...document.querySelectorAll('#h-cyls span')];
  let hudKey = '', hudCyl = '';
  const cylTheta = (th, i) => mod(th - PHASE[i], 720);
  function pose(th, dt) {
    crankG.rotation.z = -rad(th);
    ZC.forEach((zc, i) => {
      const tk = cylTheta(th, i), t = rad(tk);
      const px = R * Math.sin(t), py = R * Math.cos(t);
      const yp = pinY(tk);
      pistons[i].position.y = yp;
      rods[i].position.set(px, py, zc);
      rods[i].rotation.z = Math.atan2(px, yp - py);
      const crown = yp + CH, h = Math.max(0.01, D - crown);
      (i === 0 ? gasCyl : [gasCylN[i]]).forEach(c => { c.scale.y = h; c.position.y = crown + h / 2; });
    });

    const lifts = {};
    valves.forEach(o => {
      const lf = liftFrac(cylTheta(th, o.i), o.v);
      if (o.i === 0) lifts[o.k] = lf;
      o.moving.position.y = -LIFT * lf;
      o.spring.scale.y = (RETAINER - LIFT * lf) - SPRING_Y0;
    });
    Object.values(cams).forEach(o => { o.camG.rotation.z = o.gamma - rad(th / 2); });

    teeth.forEach((m, k) => m.position.copy(beltAt(k * beltTotal / teeth.length - 1.6 * rad(total))));

    // gas, chispa e inyección en cada cilindro, según su propio tiempo
    let g = null;
    ZC.forEach((zc, i) => {
      const tk = cylTheta(th, i);
      const gi = gasAt(tk);
      if (i === 0) g = gi;
      const m = GAS_M[i];
      m.color.copy(gi.col);
      m.emissive.copy(gi.col).multiplyScalar(gi.em);
      m.opacity = gi.op * catF.gas;
      const sparkOn = mode === 'otto' && tk >= 346 && tk <= 355;
      sparks[i].visible = sparkOn;
      if (sparkOn) { const s = 1.3 + Math.random() * 1.1; sparks[i].scale.set(s, s, 1); }
      const sprayOn = mode === 'diesel' && tk >= 346 && tk <= 376;
      sprays[i].visible = sprayOn;
      if (sprayOn) sprayMat.opacity = 0.35 + 0.35 * Math.sin(Math.PI * (tk - 346) / 30);
    });
    fireLight.intensity = g.em * 1.1;
    fireLight.color.copy(g.col);

    // partículas: avanzan según cuánto está abierta cada válvula
    Object.entries(streams).forEach(([k, s]) => {
      const lf = lifts[k];
      s.mat.opacity = Math.min(0.9, lf * 3) * catF.gas;
      s.mat.color.set(k === 'adm' ? (mode === 'diesel' ? 0x8fc9e6 : 0x4a90d9) : 0x8d919b);
      s.seeds.forEach((sd, i) => {
        sd.u = mod(sd.u + dt * (0.15 + 0.9 * lf) * (playing ? 1 : 0), 1);
        const p = s.curve.getPointAt(sd.u);
        s.arr[i * 3] = p.x + sd.dx; s.arr[i * 3 + 1] = p.y + sd.dy; s.arr[i * 3 + 2] = sd.dz;
      });
      s.pts.geometry.attributes.position.needsUpdate = true;
    });

    // indicador del ciclo
    const ph = Math.min(3, Math.floor(th / 180));
    hud.needle.style.transform = `rotate(${th / 2}deg)`;
    const key2 = [ph, th < 360 ? 1 : 2, lifts.adm > 0.02, lifts.esc > 0.02, gasText(th), mode].join('|');
    if (key2 !== hudKey) {
      hudKey = key2;
      hud.num.textContent = ph + 1;
      hud.num.style.background = `var(${PHASES[ph].c})`;
      hud.name.textContent = PHASES[ph].n;
      hud.turn.textContent = `Cilindro 1 · cigüeñal, vuelta ${th < 360 ? 1 : 2} de 2`;
      hud.valves.textContent = `Admisión ${lifts.adm > 0.02 ? 'abierta' : 'cerrada'} · escape ${lifts.esc > 0.02 ? 'abierta' : 'cerrada'}`;
      hud.gas.textContent = gasText(th);
      hud.arcs.forEach((a, i) => a.classList.toggle('off', i !== ph));
    }
    hud.dot.style.background = '#' + g.col.getHexString();
    const cylKey = ZC.map((_, i) => Math.min(3, Math.floor(cylTheta(th, i) / 180))).join('');
    if (cylKey !== hudCyl) {
      hudCyl = cylKey;
      hud.cyls.forEach((el, i) => {
        const p = +cylKey[i];
        el.style.background = `var(${PHASES[p].c})`;
        el.title = `Cilindro ${i + 1}: ${PHASES[p].n.toLowerCase()}`;
        el.querySelector('b').textContent = PHASES[p].n.slice(0, 3);
      });
    }
  }

  /* ---------------- Botones de la escena ---------------- */
  const playBtn = document.getElementById('t-play');
  const cutBtn = document.getElementById('t-cut');
  const namesBtn = document.getElementById('t-names');
  const dimsBtn = document.getElementById('t-dims');
  let namesUser = false, dimsUser = false;
  function setPlaying(on) { playing = on; playBtn.setAttribute('aria-pressed', String(on)); }
  playBtn.addEventListener('click', () => setPlaying(!playing));
  namesBtn.addEventListener('click', () => { namesUser = !namesUser; refreshAux(); });
  dimsBtn.addEventListener('click', () => { dimsUser = !dimsUser; refreshAux(); });
  function setCut(on) {
    cut = on;
    swap.forEach(m => { m.material = on ? m.userData.cutMat : m.userData.glassMat; });
    front.visible = !on;
    pistonCut.visible = on; pistonFull.visible = !on;
    gasG.cut.visible = on; gasG.full.visible = !on;
    cutOnly.forEach(m => { m.visible = on; });
    cutBtn.setAttribute('aria-pressed', String(on));
  }
  cutBtn.addEventListener('click', () => setCut(!cut));
  function setMode(m) {
    mode = m;
    plugs.forEach(o => { o.visible = m === 'otto'; });
    injectors.forEach(o => { o.visible = m === 'diesel'; });
    hudKey = '';
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
    if (e.key === ' ' && !(e.target.closest && e.target.closest('button'))) { e.preventDefault(); setPlaying(!playing); }
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

  let current = STATIONS[0];
  function refreshAux() {
    const show = (tour === 'ruta' && current.show) || [];
    const namesOn = namesUser || show.includes('nombres');
    const dimsOn = dimsUser || show.includes('medidas');
    names.visible = namesOn;
    numbers.visible = namesOn || show.includes('numeros');
    dims.visible = dimsOn;
    pms.visible = dimsOn || show.includes('pms');
    namesBtn.setAttribute('aria-pressed', String(namesOn));
    dimsBtn.setAttribute('aria-pressed', String(dimsOn));
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
    if (ruta) {
      setMode('otto');
      setFocus(it.focus || null);
      setRun(it.range ? { a: it.range[0], b: it.range[1], speed: it.speed || 60, loop: false } : { a: 0, b: 720, speed: 90, loop: true });
    } else {
      setMode(PROC_BY_ID[t].mode);
      setFocus(null);
      setRun(it.loop ? { a: 0, b: 720, speed: 90, loop: true } : { a: it.range[0], b: it.range[1], speed: 55, loop: false });
      if (!it.loop) { total += mod(it.range[0] - theta, 720); theta = it.range[0]; }
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
  function opaqueEnough(o) {
    const m = Array.isArray(o.material) ? o.material[0] : o.material;
    return m.opacity === undefined || m.opacity >= 0.5;
  }
  function pickAt(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(pickables, false);
    for (const h of hits) {
      if (!shown(h.object) || !opaqueEnough(h.object)) continue;
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
    // En pantallas verticales (celular) se abre el campo visual para que quepa el motor completo
    camera.fov = camera.aspect < 1 ? Math.min(62, 40 / Math.pow(camera.aspect, 0.75)) : 40;
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
    advance(dt);
    updateFocus(reduceMotion ? 1 : dt);
    pose(theta, dt);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  applyTheme(dark);
  setCut(true);
  setPlaying(playing);
  select('ruta', 0, true);
  window.fypReset = () => select('ruta', 0);
  requestAnimationFrame(frame);
})();
