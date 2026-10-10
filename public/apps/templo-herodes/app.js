/* ==========================================================
   APP.JS — Escena 3D e interacción del templo de Herodes (three.js r128).
   Lee contenido y medidas desde data.js; edita este archivo solo para
   cambios de modelo, cámara o comportamiento.
   Recursos Bíblicos — El templo de Herodes
   Unidad: 1 = 1 codo (≈ 45 cm). Ejes: +x oriente, −z norte, +y arriba.
   ========================================================== */
(() => {
  'use strict';

  /* ---------------- Datos ---------------- */
  const D = window.HERODES_DATA || {};
  const LY = D.LAYOUT;
  const ROUTES = D.ROUTES || [];
  const ROUTE_BY_ID = Object.fromEntries(ROUTES.map(r => [r.id, r]));
  const LV = LY.niveles;

  /* ---------------- Arranque ---------------- */
  const stage = document.getElementById('stage');
  const canvas = document.getElementById('scene');
  if (!window.THREE || !THREE.OrbitControls) { document.getElementById('fallback').hidden = false; return; }
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 9000);
  camera.position.set(900, 650, 1100);
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.485;
  controls.minDistance = 4;
  controls.maxDistance = 2600;
  controls.target.set(80, 0, 100);

  (function buildEnv() {
    const env = new THREE.Scene();
    const geo = new THREE.SphereGeometry(50, 32, 16);
    const pos = geo.attributes.position;
    const top = new THREE.Color(0xf4efe4), mid = new THREE.Color(0xd9ccb2), bot = new THREE.Color(0x6a5a46);
    const cols = [];
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 50;
      const c = y > 0 ? mid.clone().lerp(top, y) : mid.clone().lerp(bot, -y);
      cols.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    env.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
    const sunBall = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 8), new THREE.MeshBasicMaterial({ color: 0xfff6e6 }));
    sunBall.position.set(22, 34, 16);
    env.add(sunBall);
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(env, 0.04).texture;
    pm.dispose();
  })();

  /* ---------------- Utilidades ---------------- */
  function mulberry(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rnd = mulberry(7);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  function canvasTexture(w, h, draw, seed) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const r = mulberry(seed || 3);
    draw(c.getContext('2d'), w, h, r);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = maxAniso;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }

  /* ---------------- Texturas ---------------- */
  // Sillería herodiana: borde rebajado y centro en relieve. Un tile = 16 × 4 codos (dos hileras de 2 codos)
  const stoneTex = canvasTexture(512, 128, (g, w, h, r) => {
    g.fillStyle = '#d9cdb4'; g.fillRect(0, 0, w, h);
    const px = w / 16;
    for (let row = 0; row < 2; row++) {
      const y0 = row * 64;
      let x = 0;
      const lens = [];
      while (x < 16) { const L = Math.min(16 - x, 3 + Math.floor(r() * 4)); lens.push(L); x += L; }
      if (lens[lens.length - 1] < 2 && lens.length > 1) { const l = lens.pop(); lens[lens.length - 1] += l; }
      let cx = row ? 1.5 : 0;
      lens.forEach(L => {
        const sx = cx * px, sw = L * px;
        const tone = 200 + r() * 30;
        const draw = (ox) => {
          g.fillStyle = `rgb(${tone},${tone - 14},${tone - 38})`; g.fillRect(ox + 1, y0 + 1, sw - 2, 62);
          g.fillStyle = 'rgba(255,250,235,0.22)'; g.fillRect(ox + 7, y0 + 7, sw - 14, 50);   // centro en relieve
          g.strokeStyle = 'rgba(95,78,55,0.35)'; g.lineWidth = 1.5; g.strokeRect(ox + 7, y0 + 7, sw - 14, 50);
          g.strokeStyle = 'rgba(80,65,45,0.6)'; g.lineWidth = 2; g.strokeRect(ox + 1, y0 + 1, sw - 2, 62);
        };
        draw(sx); if (sx + sw > w) draw(sx - w);
        cx += L;
      });
    }
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = r() > 0.5 ? 'rgba(255,255,255,0.10)' : 'rgba(80,60,40,0.09)';
      g.fillRect(r() * w, r() * h, 1.5, 1.5);
    }
  }, 11);
  const pavingTex = canvasTexture(256, 256, (g, w, h, r) => {
    g.fillStyle = '#cdbf9f'; g.fillRect(0, 0, w, h);
    const n = 4, s = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      g.fillStyle = `rgba(${150 + r() * 50},${130 + r() * 40},${95 + r() * 30},0.18)`;
      g.fillRect(i * s + 2, j * s + 2, s - 4, s - 4);
      g.strokeStyle = 'rgba(90,75,55,0.28)'; g.lineWidth = 2; g.strokeRect(i * s + 1, j * s + 1, s - 2, s - 2);
    }
  }, 5);
  const groundTex = canvasTexture(256, 256, (g, w, h, r) => {
    g.fillStyle = '#c4b38f'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = r() > 0.5 ? `rgba(255,250,235,${r() * 0.2})` : `rgba(80,65,40,${r() * 0.2})`;
      g.fillRect(r() * w, r() * h, 1 + r() * 3, 1 + r() * 3);
    }
  }, 9);
  groundTex.repeat.set(200, 200);
  // Velo: tejido de azul, carmesí, lino y púrpura (Josefo, Guerra 5). Sin figuras: no se conoce su dibujo
  const veilTex = canvasTexture(256, 512, (g, w, h, r) => {
    const C = ['#2c4a8a', '#a4282b', '#efe9dc', '#6a2c6c'];
    for (let y = 0; y < h; y += 8) { g.fillStyle = C[(y / 8) % 4]; g.fillRect(0, y, w, 8); }
    g.globalAlpha = 0.55;
    for (let x = 0; x < w; x += 16) { g.fillStyle = C[(x / 16 + 1) % 4]; g.fillRect(x, 0, 8, h); }
    g.globalAlpha = 1;
    for (let y = 0; y < h; y += 2) { g.fillStyle = `rgba(0,0,0,${r() * 0.08})`; g.fillRect(0, y, w, 1); }
  }, 13);
  // Baranda calada del soreg
  const latticeTex = canvasTexture(128, 64, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = '#e8dfcc'; g.fillRect(0, 0, w, 8); g.fillRect(0, h - 8, w, 8);
    g.strokeStyle = '#e8dfcc'; g.lineWidth = 7;
    for (let x = -64; x < w + 64; x += 32) {
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 64, h); g.stroke();
      g.beginPath(); g.moveTo(x + 64, 0); g.lineTo(x, h); g.stroke();
    }
  });
  const puffTex = canvasTexture(128, 128, (g) => {
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.45, 'rgba(255,255,255,0.5)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  });
  puffTex.wrapS = puffTex.wrapT = THREE.ClampToEdgeWrapping;

  /* ---------------- Materiales ---------------- */
  const stdMats = [];
  function std(o) { const m = new THREE.MeshStandardMaterial(o); stdMats.push(m); return m; }
  const tileCache = new Map();
  function tiled(tex, rx, ry, extra) {
    const key = tex.uuid + ':' + rx.toFixed(1) + ':' + ry.toFixed(1) + ':' + JSON.stringify(extra || {});
    if (tileCache.has(key)) return tileCache.get(key);
    const t = tex.clone(); t.needsUpdate = true; t.repeat.set(Math.max(0.05, rx), Math.max(0.05, ry));
    const m = std(Object.assign({ map: t, metalness: 0, roughness: 0.95 }, extra || {}));
    tileCache.set(key, m);
    return m;
  }
  const M = {
    gold: std({ color: 0xd6ad4b, metalness: 0.9, roughness: 0.34 }),
    goldPlate: std({ color: 0xc9a24e, metalness: 0.55, roughness: 0.7 }),
    goldWall: std({ color: 0xc9a24e, metalness: 0.7, roughness: 0.5 }),
    bronze: std({ color: 0xa2683a, metalness: 0.85, roughness: 0.42 }),
    corinth: std({ color: 0xc48a52, metalness: 0.9, roughness: 0.3 }),
    stone: std({ color: 0xd8ccb5, metalness: 0, roughness: 0.95 }),
    marble: std({ color: 0xf1ede4, metalness: 0, roughness: 0.6 }),
    whiteStone: std({ color: 0xf3efe6, metalness: 0, roughness: 0.85 }),
    cedar: std({ color: 0x8a5a34, metalness: 0, roughness: 0.8 }),
    roof: std({ color: 0xb59c78, metalness: 0, roughness: 0.95 }),
    altar: std({ color: 0xe9e2d2, metalness: 0, roughness: 1, flatShading: true }),
    rock: std({ color: 0xb6a588, metalness: 0, roughness: 1, flatShading: true }),
    dark: std({ color: 0x2a2420, metalness: 0, roughness: 1 }),
    bread: std({ color: 0xd9ab6c, metalness: 0, roughness: 0.9 }),
    hill: std({ color: 0xb9a780, metalness: 0, roughness: 1, flatShading: true }),
    olive: std({ color: 0x7d8256, metalness: 0, roughness: 1, flatShading: true }),
    house: std({ color: 0xd4c6a8, metalness: 0, roughness: 1 }),
    ground: std({ map: groundTex, color: 0xcbc4b8, metalness: 0, roughness: 1 }),
    veil: std({ map: veilTex, side: THREE.DoubleSide, metalness: 0, roughness: 0.9 }),
    lattice: std({ map: latticeTex, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, metalness: 0, roughness: 0.9 }),
    water: std({ color: 0x9fb8c4, metalness: 0.3, roughness: 0.05 })
  };
  const stoneMat = (along, h) => tiled(stoneTex, along / 16, h / 4);
  const pavingMat = (a, b) => tiled(pavingTex, a / 12, b / 12);

  /* ---------------- Ayudas de geometría ---------------- */
  function add(obj, parent) { (parent || scene).add(obj); return obj; }
  function mesh(geo, mat, x, y, z, parent) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    m.castShadow = true; m.receiveShadow = true;
    return add(m, parent);
  }
  const box = (w, h, d, mat, x, y, z, p) => mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, p);
  const cyl = (rt, rb, h, mat, x, y, z, p, seg) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 20), mat, x, y, z, p);
  function slab(x0, x1, y0, y1, z0, z1, mat, p) {
    return box(x1 - x0, y1 - y0, z1 - z0, mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, p);
  }
  /* Muro de sillería; inner = índice de cara (+x,−x,+y,−y,+z,−z) que lleva otro material */
  function wall(x0, x1, y0, y1, z0, z1, p, inner, innerMat) {
    const st = stoneMat(Math.max(x1 - x0, z1 - z0), y1 - y0);
    const mats = [st, st, st, st, st, st];
    if (inner !== undefined && inner !== null) mats[inner] = innerMat || M.goldWall;
    return slab(x0, x1, y0, y1, z0, z1, mats, p);
  }
  /* Podio: lados de sillería y piso enlosado */
  function podium(x0, x1, y0, y1, z0, z1, p) {
    const st = stoneMat(Math.max(x1 - x0, z1 - z0), Math.max(1, y1 - y0));
    const top = pavingMat(x1 - x0, z1 - z0);
    return slab(x0, x1, y0, y1, z0, z1, [st, st, top, st, st, st], p);
  }
  /* Muro con vanos de puerta. axis 'x': corre de a0 a a1 en x, grosor b0..b1 en z (y al revés con 'z') */
  function gatedWall(axis, a0, a1, b0, b1, y0, y1, gates, p, inner) {
    const seg = (s0, s1, yy0, yy1) => axis === 'x' ? wall(s0, s1, yy0, yy1, b0, b1, p, inner) : wall(b0, b1, yy0, yy1, s0, s1, p, inner);
    let cur = a0;
    gates.slice().sort((u, v) => u.c - v.c).forEach(gt => {
      const g0 = gt.c - gt.w / 2, g1 = gt.c + gt.w / 2;
      if (g0 > cur) seg(cur, g0, y0, y1);
      if (gt.y0 + gt.h < y1 - 0.01) seg(g0, g1, gt.y0 + gt.h, y1);   // dintel
      cur = g1;
    });
    if (cur < a1) seg(cur, a1, y0, y1);
  }
  const pickables = [];
  function group(id, parent) {
    const g = new THREE.Group();
    g.userData.station = id;
    pickables.push(g);
    return add(g, parent);
  }
  function stairs(x0, x1, z0, z1, yLow, yHigh, n, dir, mat, p) {
    // dir: hacia dónde SUBE la escalera: '+x', '-x', '+z', '-z'
    const dy = (yHigh - yLow) / n;
    for (let i = 0; i < n; i++) {
      const t0 = i / n, top = yLow + dy * (i + 1);
      if (dir === '-x') slab(x0, x1 - (x1 - x0) * t0, yLow, top, z0, z1, mat, p);
      if (dir === '+x') slab(x0 + (x1 - x0) * t0, x1, yLow, top, z0, z1, mat, p);
      if (dir === '-z') slab(x0, x1, yLow, top, z0, z1 - (z1 - z0) * t0, mat, p);
      if (dir === '+z') slab(x0, x1, yLow, top, z0 + (z1 - z0) * t0, z1, mat, p);
    }
  }

  /* ---------------- Terreno ---------------- */
  const BASE = LV.calleSur;   // nivel de la calle al pie de los muros
  const groundMesh = mesh(new THREE.PlaneGeometry(9000, 9000), M.ground, 0, BASE, 0);
  groundMesh.rotation.x = -Math.PI / 2; groundMesh.castShadow = false;

  const P = LY.plataforma;
  const platPts = [P.nO, P.nE, P.sE, P.sO];
  const platShape = new THREE.Shape(platPts.map(([x, z]) => new THREE.Vector2(x, -z)));
  const plataforma = group('plataforma');
  {
    const geo = new THREE.ExtrudeGeometry(platShape, { depth: -BASE - 0.05, bevelEnabled: false });
    const st = stoneTex.clone(); st.needsUpdate = true; st.repeat.set(1 / 16, 1 / 4);
    const side = std({ map: st, metalness: 0, roughness: 0.95 });
    const m = mesh(geo, [M.stone, side], 0, BASE, 0, plataforma);
    m.rotation.x = -Math.PI / 2;
  }
  const gentiles = group('gentiles');
  {
    const t = pavingTex.clone(); t.needsUpdate = true; t.repeat.set(1 / 14, 1 / 14);
    const m = mesh(new THREE.ShapeGeometry(platShape), std({ map: t, metalness: 0, roughness: 0.95 }), 0, 0, 0, gentiles);
    m.rotation.x = -Math.PI / 2; m.castShadow = false;
  }
  const edgeX = (a, b, z) => a[0] + (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]);   // x de un muro inclinado a la altura z

  (function hills() {
    const r = mulberry(21);
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + r() * 0.15;
      const d = 2700 + r() * 900;
      const olives = Math.abs(a) < 0.4 || Math.abs(a - Math.PI * 2) < 0.4;   // al oriente: monte de los Olivos
      const h = olives ? 220 + r() * 40 : 70 + r() * 110;
      const rad = olives ? 900 : 420 + r() * 300;
      const m = mesh(new THREE.SphereGeometry(rad, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), olives ? M.olive : M.hill, 100 + Math.cos(a) * d, BASE - 2, 100 + Math.sin(a) * d);
      m.scale.set(1, h / rad, 0.7 + r() * 0.5);
      m.rotation.y = r() * Math.PI; m.castShadow = false;
    }
  })();
  // Ciudad: casas bajas al occidente y al sur (solo contexto, sin datos)
  (function city() {
    const r = mulberry(33), N = 520;
    const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), M.house, N);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    let k = 0;
    while (k < N) {
      const x = -1500 + r() * 2200, z = -1100 + r() * 2900;
      const inPlat = x > -560 && x < 470 && z > -680 && z < 980;   // deja despejado el entorno del monte
      const east = x > 420;                 // valle del Cedrón, sin casas
      if (inPlat || east) continue;
      const w = 14 + r() * 16, d = 14 + r() * 16, h = 9 + r() * 12;
      p.set(x, BASE + h / 2, z); s.set(w, h, d);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (r() - 0.5) * 0.2);
      inst.setMatrixAt(k++, m4.compose(p, q, s));
    }
    inst.receiveShadow = true; add(inst);
  })();
  const stars = (function () {
    const r = mulberry(11), pts = [];
    for (let i = 0; i < 1200; i++) {
      const th = r() * Math.PI * 2, ph = Math.acos(0.08 + r() * 0.92);
      pts.push(Math.sin(ph) * Math.cos(th) * 5000, Math.cos(ph) * 5000, Math.sin(ph) * Math.sin(th) * 5000);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.8 })));
  })();

  /* ---------------- Pórticos ---------------- */
  // Un pórtico corre a lo largo de un muro, de A a B, con el interior hacia el centro de la explanada
  function portico(id, A, B, opts) {
    const g = group(id);
    const dx = B[0] - A[0], dz = B[1] - A[1], len = Math.hypot(dx, dz);
    g.position.set(A[0], 0, A[1]);
    g.rotation.y = Math.atan2(-dz / len, dx / len);
    const s0 = opts.from || 0, s1 = len - (opts.to || 0), L = s1 - s0;
    // muro exterior (parapeto que prolonga el muro de contención)
    wall(s0, s1, 0, opts.wallH, 0, 3, g);
    // columnas
    const geo = new THREE.CylinderGeometry(opts.r, opts.r * 1.08, 1, 14);
    opts.rows.forEach(([z, h]) => {
      const n = Math.floor(L / opts.step);
      const inst = new THREE.InstancedMesh(geo, M.marble, n);
      const m4 = new THREE.Matrix4();
      for (let i = 0; i < n; i++) {
        m4.makeScale(1, h, 1); m4.setPosition(s0 + opts.step * (i + 0.5), h / 2, z);
        inst.setMatrixAt(i, m4);
      }
      inst.castShadow = true; inst.receiveShadow = true;
      g.add(inst);
    });
    // techos de cedro
    opts.roofs.forEach(([z0, z1, y]) => slab(s0, s1, y, y + 1.4, z0, z1, M.cedar, g));
    (opts.clerestory || []).forEach(([z, y0, y1]) => wall(s0, s1, y0, y1, z - 0.6, z + 0.6, g));
    return g;
  }
  const STD_ROWS = { r: 1.1, step: 10, wallH: 27, rows: [[13, 25], [25, 25]], roofs: [[0, 30, 25]] };
  // Norte: deja libre el tramo de la fortaleza Antonia
  portico('gentiles', P.nO, P.nE, Object.assign({}, STD_ROWS, { from: LY.antonia.x[1] - P.nO[0], to: 30, roofs: [[0, 30, 25.2]] }));
  const porticoSalomon = portico('porticoSalomon', P.nE, P.sE, Object.assign({}, STD_ROWS, { to: 40 }));
  portico('gentiles', P.sO, P.nO, Object.assign({}, STD_ROWS, { from: 40, to: 30, roofs: [[0, 30, 25.4]] }));
  // Pórtico real: cuatro hileras (Josefo), nave central más alta
  const porticoReal = portico('porticoReal', P.sE, P.sO, {
    r: 1.5, step: 10, wallH: 33,
    rows: [[10, 30], [18, 50], [29, 50], [37, 30]],
    roofs: [[0, 18, 30], [18, 29, 50], [29, 40, 30]],
    clerestory: [[18, 30, 50], [29, 30, 50]]
  });

  /* ---------------- Muro sur: escalinata y puertas de Hulda ---------------- */
  const escalinata = group('escalinata');
  const ZS = P.sO[1];   // muro sur
  const GATE_Y = BASE + 6;
  slab(-100, 170, BASE, GATE_Y, ZS, ZS + 16, pavingMat(270, 16), escalinata);                 // explanada al pie del muro
  stairs(-100, 50, ZS + 16, ZS + 46, BASE, GATE_Y, 30, '-z', stoneMat(16, 2), escalinata);  // escalinata frente a la puerta doble
  stairs(80, 170, ZS + 16, ZS + 32, BASE, GATE_Y, 16, '-z', stoneMat(16, 2), escalinata);
  const doorMat = M.dark;
  const hulda = LY.puertasHulda;
  [-1, 1].forEach(k => slab(hulda.doble[0] + k * 7 - 3.5, hulda.doble[0] + k * 7 + 3.5, GATE_Y, GATE_Y + 12, ZS - 0.2, ZS + 0.6, doorMat, escalinata));
  [-1, 0, 1].forEach(k => slab(hulda.triple[0] + k * 12 - 3.5, hulda.triple[0] + k * 12 + 3.5, GATE_Y, GATE_Y + 12, ZS - 0.2, ZS + 0.6, doorMat, escalinata));
  // baños rituales (mikvaot), al pie de la escalinata
  for (let i = 0; i < 6; i++) slab(-90 + i * 26, -80 + i * 26, BASE + 0.05, BASE + 0.4, ZS + 52, ZS + 60, M.dark, escalinata);

  /* ---------------- Arco de Robinson y calle herodiana ---------------- */
  const robinson = group('robinson');
  {
    const [rz] = [LY.arcoRobinson[1]];
    const wx = edgeX(P.nO, P.sO, rz);           // cara del muro occidental
    const px0 = wx - 30, px1 = wx - 22;          // pilar del arco
    // calle pavimentada y tiendas
    slab(wx - 60, wx - 1, BASE, BASE + 0.4, 380, ZS + 90, pavingMat(60, 300), robinson);
    for (let z = 400; z < ZS + 80; z += 14) slab(wx - 75, wx - 62, BASE, BASE + 8, z, z + 12, M.house, robinson);
    // pilar y arco que salva la calle
    wall(px0, px1, BASE, -24, rz - 18, rz + 18, robinson);
    const R = (wx - px1) / 2, cx = (px1 + wx) / 2;
    const arch = new THREE.Shape();
    arch.moveTo(px1, -24); arch.lineTo(px1, 0); arch.lineTo(wx, 0); arch.lineTo(wx, -24);
    arch.absarc(cx, -24, R, 0, Math.PI, false);
    mesh(new THREE.ExtrudeGeometry(arch, { depth: 36, bevelEnabled: false }), stoneMat(16, 8), 0, 0, rz - 18, robinson);
    // escalera que baja hacia el sur sobre arcos menores
    const n = 22;
    for (let i = 0; i < n; i++) {
      const y = -1 - (i / n) * (-BASE - 2);
      slab(px0, px1 + 1, BASE, y, rz + 18 + i * 3.4, rz + 18 + (i + 1) * 3.4, stoneMat(8, 4), robinson);
    }
    slab(px0, wx, -1.2, 0, rz - 18, rz + 18, pavingMat(30, 36), robinson);   // descanso sobre el arco
  }

  /* ---------------- Fortaleza Antonia ---------------- */
  const antonia = group('antonia');
  {
    const A = LY.antonia, [x0, x1] = A.x, [z0, z1] = A.z;
    wall(x0, x1, BASE, 0, z0, z1, antonia);                          // roca de la fortaleza
    const t = 10, H = 35;
    wall(x0, x1, 0, H, z0, z0 + t, antonia);
    wall(x0, x1, 0, H, z1 - t, z1, antonia);
    wall(x0, x0 + t, 0, H, z0 + t, z1 - t, antonia);
    wall(x1 - t, x1, 0, H, z0 + t, z1 - t, antonia);
    slab(x0 + t, x1 - t, 0, 12, z0 + t, z1 - t, M.house, antonia);   // patio interior y cuarteles (estimado)
    [[x0, z0, 50], [x1 - 16, z0, 50], [x0, z1 - 16, 50], [x1 - 16, z1 - 16, 70]].forEach(([x, z, h]) => wall(x, x + 16, 0, h, z, z + 16, antonia));
    // gradas hacia los pórticos (Hch 21:35)
    stairs(x1 - 60, x1 - 48, z1, z1 + 12, 26, H, 10, '-z', stoneMat(8, 2), antonia);
    stairs(x1 - 30, x1 - 18, z1, z1 + 12, 26, H, 10, '-z', stoneMat(8, 2), antonia);
  }

  /* ---------------- Recinto sagrado ---------------- */
  const S = LY.soreg, MU = LY.mujeres, AI = LY.atrioInterior, F = LY.franjas;
  const HEL = 3;   // terraza (jel), sobre el atrio de los gentiles
  const soreg = group('soreg');
  {
    const h = S.alto;
    const fence = (x0, x1, z0, z1) => {
      const along = Math.max(x1 - x0, z1 - z0);
      const t = latticeTex.clone(); t.needsUpdate = true; t.repeat.set(along / 3.4, 1);
      const mat = std({ map: t, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, metalness: 0, roughness: 0.9 });
      const pl = mesh(new THREE.PlaneGeometry(along, h), mat, (x0 + x1) / 2, h / 2, (z0 + z1) / 2, soreg);
      if (x1 - x0 < z1 - z0) pl.rotation.y = Math.PI / 2;
      pl.castShadow = false;
    };
    const [sx0, sx1] = S.x, [sz0, sz1] = S.z;
    fence(sx0, sx1 / 2 - 10, sz0, sz0); fence(sx1 / 2 + 10, sx1, sz0, sz0);
    fence(sx0, sx1 / 2 - 10, sz1, sz1); fence(sx1 / 2 + 10, sx1, sz1, sz1);
    fence(sx0, sx0, sz0, sz1);
    fence(sx1, sx1, sz0, -12); fence(sx1, sx1, 12, sz1);
    // placas de advertencia, a trechos (Josefo, Guerra 5)
    for (let x = sx0 + 30; x < sx1; x += 60) [sz0, sz1].forEach(z => slab(x - 1, x + 1, 0, h + 0.9, z - 0.25, z + 0.25, M.marble, soreg));
    [-40, 40].forEach(z => slab(sx1 - 0.25, sx1 + 0.25, 0, h + 0.9, z - 1, z + 1, M.marble, soreg));
    // jel: terraza de diez codos alrededor de los muros
    podium(AI.x[0] - 15, MU.x[1] + 15, 0, HEL, AI.z[0] - 15, AI.z[1] + 15, soreg);
    stairs(MU.x[1] + 15, MU.x[1] + 21, -12, 12, 0, HEL, 6, '-x', stoneMat(8, 2), soreg);
  }

  // Atrio de las mujeres
  const WT = 5;   // grosor de los muros de los atrios (estimado)
  const mujeres = group('mujeres');
  {
    const [x0, x1] = MU.x, [z0, z1] = MU.z, y = LV.mujeres, top = y + 24;
    podium(x0, x1 + WT, HEL, y, z0 - WT, z1 + WT, mujeres);
    gatedWall('x', x0, x1 + WT, z0 - WT, z0, HEL, top, [{ c: (x0 + x1) / 2, w: 10, h: 20, y0: y }], mujeres);
    gatedWall('x', x0, x1 + WT, z1, z1 + WT, HEL, top, [{ c: (x0 + x1) / 2, w: 10, h: 20, y0: y }], mujeres);
    // cámaras de las esquinas, sin techo (Middot 2:5)
    const C = 40, ch = 14;
    [[x0, z0], [x1 - C, z0], [x0, z1 - C], [x1 - C, z1 - C]].forEach(([cx, cz]) => {
      wall(cx, cx + C, y, y + ch, cz, cz + 1.5, mujeres); wall(cx, cx + C, y, y + ch, cz + C - 1.5, cz + C, mujeres);
      wall(cx, cx + 1.5, y, y + ch, cz, cz + C, mujeres); wall(cx + C - 1.5, cx + C, y, y + ch, cz, cz + C, mujeres);
    });
    // candeleros de la fiesta de los tabernáculos (Mishná, Sukkah 5)
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => {
      const cx = (x0 + x1) / 2 + a * 14, cz = b * 14;
      cyl(0.5, 0.7, 36, M.gold, cx, y + 18, cz, mujeres, 10);
      cyl(2.2, 1.2, 1.4, M.gold, cx, y + 36.5, cz, mujeres, 16);
    });
  }
  // Puerta oriental del atrio de las mujeres (la Hermosa, según la identificación más común)
  const hermosa = group('mujeres');
  {
    const x0 = MU.x[1], y = LV.mujeres;
    gatedWall('z', MU.z[0] - WT, MU.z[1] + WT, x0, x0 + WT, HEL, y + 24, [{ c: 0, w: 14, h: 24, y0: y }], hermosa);
    wall(x0 - 1, x0 + WT + 1, HEL, y + 34, -16, -7, hermosa); wall(x0 - 1, x0 + WT + 1, HEL, y + 34, 7, 16, hermosa);
    slab(x0 - 1, x0 + WT + 1, y + 24, y + 34, -7, 7, M.corinth, hermosa);
    stairs(x0 + WT, x0 + WT + 6, -9, 9, HEL, y, 6, '-x', stoneMat(8, 2), hermosa);
  }

  // Atrio interior
  const israel = group('israel');
  const yI = LV.israel, yS = LV.sacerdotes;
  {
    const [x0, x1] = AI.x, [z0, z1] = AI.z, top = yI + 30;
    podium(x0 - WT, x1, HEL, yI, z0 - WT, z1 + WT, israel);
    podium(x0, F.sacerdotes[1], yI, yS, z0, z1, israel);                         // atrio de los sacerdotes, más alto
    slab(F.sacerdotes[1] - 1.5, F.sacerdotes[1] + 0.5, yS, yS + 1.5, z0 + 6, z1 - 6, M.marble, israel);   // estrado de los levitas
    const gates = [30, 75, 115].map(c => ({ c, w: 10, h: 20, y0: yS }));
    gatedWall('x', x0 - WT, x1, z0 - WT, z0, HEL, top, gates, israel);
    gatedWall('x', x0 - WT, x1, z1, z1 + WT, HEL, top, gates, israel);
    wall(x0 - WT, x0, HEL, top, z0, z1, israel);
  }
  // Quince escalones y puerta de Nicanor
  const nicanor = group('nicanor');
  {
    const xg = AI.x[1], y0 = LV.mujeres;
    gatedWall('z', AI.z[0] - WT, AI.z[1] + WT, xg - 2, xg + 3, HEL, yI + 30, [{ c: 0, w: 16, h: 24, y0: yI }], nicanor);
    wall(xg - 3, xg + 4, yI, yI + 40, -17, -8, nicanor); wall(xg - 3, xg + 4, yI, yI + 40, 8, 17, nicanor);
    slab(xg - 3, xg + 4, yI + 24, yI + 40, -8, 8, M.corinth, nicanor);
    [-1, 1].forEach(s => {   // hojas de bronce corintio, abiertas
      const leaf = box(0.4, 24, 8, M.corinth, 0, 0, 0, nicanor);
      leaf.position.set(xg + 3 + 4 * Math.sin(1.2), yI + 12, s * (8 - 4 * Math.cos(1.2)));
      leaf.rotation.y = -s * 1.2;
    });
    for (let i = 0; i < 15; i++) {   // semicírculo hacia el atrio de las mujeres (Middot 2:5)
      const r = 16 - i * 0.55, top = y0 + 0.5 * (i + 1);
      const st = mesh(new THREE.CylinderGeometry(r, r, top - y0, 40, 1, false, 0, Math.PI), M.stone, xg + 3, (top + y0) / 2, 0, nicanor);
      st.castShadow = false;
    }
  }

  // Altar del holocausto (Middot 3:1-4)
  const altar = group('altar');
  {
    const A = LY.altar, cx = (A.x[0] + A.x[1]) / 2;
    box(32, 1, 32, M.altar, cx, yS + 0.5, 0, altar);
    box(30, 5, 30, M.altar, cx, yS + 3.5, 0, altar);
    box(28, 3, 28, M.altar, cx, yS + 7.5, 0, altar);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => box(1.2, 1.2, 1.2, M.altar, cx + a * 13.2, yS + 9.6, b * 13.2, altar));
    box(18, 0.4, 18, M.dark, cx, yS + 9.1, 0, altar);   // lugar del fuego
    // franja roja a media altura
    const red = std({ color: 0x8e2a22, roughness: 1 });
    slab(A.x[0] + 0.98, A.x[1] - 0.98, yS + 3.3, yS + 3.6, -15.02, 15.02, red, altar);
    // rampa al sur (32 × 16, Middot 3:3)
    const prof = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(32, 0), new THREE.Vector2(0, A.alto)]);
    const ramp = mesh(new THREE.ExtrudeGeometry(prof, { depth: 16, bevelEnabled: false }), M.altar, cx + 8, yS, A.z[1], altar);
    ramp.rotation.y = -Math.PI / 2;
  }
  // Lavatorio y lugar del sacrificio
  const lavatorio = group('lavatorio');
  {
    const [lx, , lz] = LY.lavatorio;
    cyl(1.2, 1.6, 3, M.bronze, lx, yS + 1.5, lz, lavatorio, 16);
    cyl(3.4, 2.2, 2.2, M.bronze, lx, yS + 4, lz, lavatorio, 24);
    cyl(3.0, 3.0, 0.2, M.water, lx, yS + 5.0, lz, lavatorio, 24);
    for (let i = 0; i < 12; i++) {   // doce caños
      const a = (i / 12) * Math.PI * 2;
      const c = cyl(0.12, 0.12, 1, M.bronze, lx + Math.cos(a) * 3.4, yS + 3.4, lz + Math.sin(a) * 3.4, lavatorio, 6);
      c.rotation.z = Math.PI / 2; c.rotation.y = -a;
    }
    const Mx = LY.matadero;
    const ringGeo = new THREE.TorusGeometry(0.6, 0.12, 6, 14);
    for (let i = 0; i < 24; i++) {
      const rr = mesh(ringGeo, M.bronze, Mx.x[0] + 4 + (i % 6) * 4.8, yS + 0.1, Mx.z[0] + 6 + Math.floor(i / 6) * 4, lavatorio);
      rr.rotation.x = Math.PI / 2;
    }
    for (let i = 0; i < 4; i++) {   // postes con travesaños y garfios
      const x = Mx.x[0] + 4 + i * 8;
      cyl(0.4, 0.4, 7, M.stone, x, yS + 3.5, Mx.z[0] + 24, lavatorio, 8);
      box(6, 0.5, 0.5, M.cedar, x, yS + 7, Mx.z[0] + 24, lavatorio);
    }
    for (let i = 0; i < 8; i++) box(2.5, 2, 4, M.marble, Mx.x[0] + 3 + i * 3.8, yS + 1, Mx.z[0] + 29, lavatorio);
  }

  /* ---------------- Santuario ---------------- */
  const SA = LY.santuario, yF = LV.santuario, yR = yF + SA.santoAlto, yTop = yF + SA.alto;
  const half = SA.cuerpo / 2, halfP = SA.portico / 2, [px0, px1] = SA.porticoX;
  const santuario = group('santuario');
  const roof = new THREE.Group(); santuario.add(roof);   // todo lo que está sobre las salas (Techo)
  {
    // basamento y doce escalones
    podium(SA.x[0], px1, yS, yF, -half, half, santuario);
    podium(px0, px1, yS, yF, -halfP, halfP, santuario);
    stairs(px1, px1 + 6, -20, 20, yS, yF, 12, '-x', stoneMat(8, 2), santuario);
    const wh = M.whiteStone;
    const side = (x0, x1, y0, y1, z0, z1, inner, p) => {
      const mats = [wh, wh, wh, wh, wh, wh];
      if (inner !== undefined) mats[inner] = M.goldWall;
      return slab(x0, x1, y0, y1, z0, z1, mats, p || santuario);
    };
    // cuerpo, hasta la altura de las salas
    side(SA.x[0], px0, yF, yR, -half, -10, 4);
    side(SA.x[0], px0, yF, yR, 10, half, 5);
    side(SA.x[0], SA.santisimoX[0], yF, yR, -10, 10, 0);
    side(SA.santoX[1], px0, yF, yR, -10, -5, 1); side(SA.santoX[1], px0, yF, yR, 5, 10, 1);
    side(SA.santoX[1], px0, yF + 20, yR, -5, 5, 1);
    // pórtico: alas macizas y fachada con vano de 40 × 20, sin puertas (Josefo)
    const fx = px1 - 5;
    side(px0, fx, yF, yR, -halfP, -25); side(px0, fx, yF, yR, 25, halfP);
    const gold = [M.goldPlate, wh, wh, wh, wh, wh];
    slab(fx, px1, yF, yR, -halfP, -10, gold, santuario); slab(fx, px1, yF, yR, 10, halfP, gold, santuario);
    // pisos interiores
    slab(SA.santisimoX[0], SA.santoX[1], yF, yF + 0.05, -10, 10, M.marble, santuario).castShadow = false;
    // lo alto: cámaras superiores y techo (se quita con «Techo»)
    slab(SA.x[0], px0, yR, yTop, -half, half, [wh, wh, wh, M.goldWall, wh, wh], roof);
    slab(px0, fx, yR, yTop, -halfP, halfP, wh, roof);
    slab(fx, px1, yR, yTop, -halfP, halfP, gold, roof);
    slab(fx, px1, yR, yR + 1, -10, 10, M.gold, roof);
    // púas de oro en el techo, contra las aves (Josefo)
    const spikeGeo = new THREE.ConeGeometry(0.35, 2.4, 6);
    const spikes = new THREE.InstancedMesh(spikeGeo, M.gold, 60);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < 60; i++) {
      const edge = i < 30 ? -halfP + 1 : halfP - 1;
      m4.makeTranslation(px0 + 1 + ((i % 30) / 29) * (px1 - px0 - 2), yTop + 1.2, edge);
      spikes.setMatrixAt(i, m4);
    }
    roof.add(spikes);
    // vid de oro sobre la entrada (Josefo, Guerra 5; Middot 3:8)
    const vine = new THREE.CatmullRomCurve3([-14, -9, -4, 0, 4, 9, 14].map((z, i) => new THREE.Vector3(px1 + 0.6, yR - 3 + (i % 2) * 1.6, z)));
    mesh(new THREE.TubeGeometry(vine, 40, 0.3, 6), M.gold, 0, 0, 0, santuario);
    for (let i = 0; i < 9; i++) {
      const z = -12 + i * 3;
      for (let k = 0; k < 5; k++) mesh(new THREE.SphereGeometry(0.45, 8, 6), M.gold, px1 + 0.8 + (k % 2) * 0.3, yR - 4.3 - Math.floor(k / 2) * 0.7, z + (k % 2 ? 0.4 : -0.3), santuario);
    }
  }
  // Lugar Santo: candelero, mesa y altar del incienso
  const menorahPts = [];
  const santo = group('santo');
  {
    const cxp = (SA.santoX[0] + SA.santoX[1]) / 2;
    // candelero, al sur
    const mx = cxp, mz = 6, my = yF;
    cyl(0.8, 1.0, 0.5, M.gold, mx, my + 0.25, mz, santo, 16);
    cyl(0.12, 0.12, 4, M.gold, mx, my + 2.5, mz, santo, 10);
    [1, 2, 3].forEach(k => {
      const arc = mesh(new THREE.TorusGeometry(k * 0.55, 0.08, 6, 24, Math.PI), M.gold, mx, my + 4.5, mz, santo);
      arc.rotation.z = Math.PI;
    });
    [-3, -2, -1, 0, 1, 2, 3].forEach(k => {
      cyl(0.14, 0.1, 0.25, M.gold, mx + k * 0.55, my + 4.6, mz, santo, 8);
      menorahPts.push(new THREE.Vector3(mx + k * 0.55, my + 4.9, mz));
    });
    // mesa de los panes, al norte, con dos hileras de seis
    box(2, 0.12, 1, M.gold, cxp, my + 1.5, -6, santo);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => cyl(0.06, 0.06, 1.5, M.gold, cxp + a * 0.9, my + 0.75, -6 + b * 0.42, santo, 6));
    [-0.5, 0.5].forEach(o => { for (let i = 0; i < 6; i++) box(0.8, 0.12, 0.42, M.bread, cxp + o, my + 1.62 + i * 0.13, -6, santo); });
    // altar del incienso, frente al velo
    box(1, 2, 1, M.gold, SA.santoX[0] + 5, my + 1, 0, santo);
    box(1.15, 0.12, 1.15, M.gold, SA.santoX[0] + 5, my + 2.05, 0, santo);
  }
  // Dos velos con un codo de separación (Mishná, Yoma 5:1)
  const velo = group('velo');
  {
    const [vx0, vx1] = SA.veloX, h = SA.santoAlto;
    [vx0 + 0.12, vx1 - 0.12].forEach(x => {
      const v = mesh(new THREE.PlaneGeometry(20, h), M.veil, x, yF + h / 2, 0, velo);
      v.rotation.y = Math.PI / 2;
    });
  }
  // Lugar Santísimo vacío, con la piedra de la fundación
  const santisimo = group('santisimo');
  {
    const g = new THREE.DodecahedronGeometry(3, 1);
    const rock = mesh(g, M.rock, 0, yF - 1.4, 0, santisimo);
    rock.scale.set(1.5, 0.5, 1.2);
  }

  /* ---------------- Etiquetas (tamaño fijo en pantalla) ---------------- */
  const labels = [];
  function cssVar(name, fb) { return getComputedStyle(root).getPropertyValue(name).trim() || fb; }
  let pxScale = 0.002;
  function sizeLabel(L) { L.sprite.scale.set(L.px * L.aspect * pxScale, L.px * pxScale, 1); }
  function drawLabel(L) {
    const ink = cssVar('--ink', '#1f2430'), bg = cssVar('--bg', '#fafaf8'), line = L.ghost ? cssVar('--accent', '#9e2b25') : cssVar('--line', '#e4e4df'), muted = cssVar('--muted', '#6b7080');
    const c = L.canvas, g = c.getContext('2d');
    const fs = 44, fs2 = 32, pad = 22, gap = 8;
    const f1 = `500 ${fs}px Inter, system-ui, sans-serif`, f2 = `500 ${fs2}px Inter, system-ui, sans-serif`;
    g.font = f1; const w1 = g.measureText(L.text).width;
    g.font = f2; const w2 = L.sub ? g.measureText(L.sub).width : 0;
    const W = Math.ceil(Math.max(w1, w2) + pad * 2), H = Math.ceil(L.sub ? fs + fs2 + gap + pad * 2 : fs + pad * 2);
    c.width = W; c.height = H;
    const r = 16;
    g.beginPath();
    g.moveTo(r, 1); g.lineTo(W - r, 1); g.quadraticCurveTo(W - 1, 1, W - 1, r);
    g.lineTo(W - 1, H - r); g.quadraticCurveTo(W - 1, H - 1, W - r, H - 1);
    g.lineTo(r, H - 1); g.quadraticCurveTo(1, H - 1, 1, H - r);
    g.lineTo(1, r); g.quadraticCurveTo(1, 1, r, 1); g.closePath();
    g.globalAlpha = 0.93; g.fillStyle = bg; g.fill();
    g.globalAlpha = 1; g.lineWidth = L.ghost ? 4 : 2; g.strokeStyle = line; g.stroke();
    g.textBaseline = 'top';
    g.font = f1; g.fillStyle = L.ghost ? cssVar('--accent', '#9e2b25') : ink; g.fillText(L.text, pad, pad + 2);
    if (L.sub) { g.font = f2; g.fillStyle = muted; g.fillText(L.sub, pad, pad + fs + gap); }
    L.tex.needsUpdate = true;
    L.aspect = W / H;
    L.px = L.sub ? 38 : 24;
    sizeLabel(L);
  }
  function label(text, sub, x, y, z, parent, near, ghost) {
    const cv = document.createElement('canvas');
    const tex = new THREE.CanvasTexture(cv);
    tex.minFilter = THREE.LinearFilter;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false, transparent: true, fog: false, sizeAttenuation: false }));
    sprite.renderOrder = 20; sprite.center.set(0.5, 0); sprite.position.set(x, y, z);
    parent.add(sprite);
    const L = { canvas: cv, tex, sprite, text, sub, near: near || Infinity, ghost: !!ghost, pos: sprite.position };
    labels.push(L); drawLabel(L);
    return L;
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => labels.forEach(drawLabel));

  const names = new THREE.Group(); names.visible = false; add(names);
  [
    ['Pórtico real', null, 60, 55, 645],
    ['Pórtico de Salomón', null, 395, 32, 0],
    ['Atrio de los gentiles', null, 120, 4, 330],
    ['Fortaleza Antonia', null, -170, 75, -435],
    ['Santuario', null, 23, yTop + 4, 0],
    ['Arco de Robinson', null, -285, 4, 630],
    ['Puertas de Hulda', 'escalinata del sur', 45, -30, 690],
    ['Atrio de las mujeres', null, 218, 33, 0, 900],
    ['Soreg', 'baranda de advertencia', 300, 4, 90, 700],
    ['Puerta la Hermosa', 'identificación probable', MU.x[1] + 3, 42, 0, 500],
    ['Puerta de Nicanor', 'y los quince escalones', AI.x[1], yI + 42, 0, 500],
    ['Atrio de Israel', null, 143.5, yI + 2, -50, 320],
    ['Atrio de los sacerdotes', null, 120, yS + 2, 52, 320],
    ['Altar', null, 111, yS + 12, 0, 400],
    ['Lavatorio', null, LY.lavatorio[0], yS + 6.5, LY.lavatorio[2], 220],
    ['Lugar del sacrificio', null, 111, yS + 8, -35, 260],
    ['Lugar Santo', null, 31, yR + 2, 0, 220],
    ['Lugar Santísimo', null, 0, yR + 2, 0, 220],
    ['Candelero', null, 31, yF + 6, 6, 80],
    ['Mesa de los panes', null, 31, yF + 3, -6, 80],
    ['Altar del incienso', null, 16, yF + 3, 0, 80],
    ['El velo', 'dos cortinas', 10.5, yF + 30, 0, 140],
    ['Piedra de la fundación', null, 0, yF + 1.5, 0, 90],
    ['Calle herodiana', null, -290, BASE + 2, 520, 600],
    ['Muro Occidental', 'tramo que hoy se conserva', -268, -20, -60, 700]
  ].forEach(([t, s, x, y, z, near]) => label(t, s, x, y, z, names, near));

  /* ---------------- Medidas ---------------- */
  const dims = new THREE.Group(); dims.visible = false; add(dims);
  const dimMat = new THREE.LineBasicMaterial({ color: 0x9e2b25, depthTest: false, transparent: true });
  function dimLine(a, b, tick, text, sub, at, near) {
    const k = 3, pts = [...a, ...b];
    [a, b].forEach(p => pts.push(p[0] - tick[0] * k, p[1] - tick[1] * k, p[2] - tick[2] * k, p[0] + tick[0] * k, p[1] + tick[1] * k, p[2] + tick[2] * k));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const ls = new THREE.LineSegments(g, dimMat); ls.renderOrder = 18; dims.add(ls);
    label(text, sub, at[0], at[1], at[2], dims, near);
  }
  dimLine([P.sO[0], BASE + 1, ZS + 70], [P.sE[0], BASE + 1, ZS + 70], [0, 0, 1], '≈ 280 m', 'muro sur', [60, BASE + 2, ZS + 70]);
  dimLine([P.sO[0] - 90, BASE + 1, P.nO[1]], [P.sO[0] - 90, BASE + 1, ZS], [1, 0, 0], '≈ 488 m', 'muro occidental', [P.sO[0] - 90, BASE + 2, 120]);
  dimLine([px1 + 8, yF, -halfP - 2], [px1 + 8, yTop, -halfP - 2], [1, 0, 0], '100 codos', '≈ 45 m', [px1 + 8, yTop * 0.6, -halfP - 2], 700);
  dimLine([px1 + 2, yTop + 2, -halfP], [px1 + 2, yTop + 2, halfP], [1, 0, 0], '100 codos', '≈ 45 m', [px1 + 2, yTop + 3, 0], 700);
  dimLine([MU.x[0], LV.mujeres + 1, MU.z[0] - 12], [MU.x[1], LV.mujeres + 1, MU.z[0] - 12], [0, 0, 1], '135 codos', '≈ 61 m', [218, LV.mujeres + 2, MU.z[0] - 12], 700);
  dimLine([AI.x[0], yS + 1, AI.z[1] + 12], [AI.x[1], yS + 1, AI.z[1] + 12], [0, 0, 1], '187 codos', '≈ 84 m', [55, yS + 2, AI.z[1] + 12], 700);
  dimLine([95, yS + 11, -18], [127, yS + 11, -18], [0, 1, 0], '32 codos', '≈ 14,4 m', [111, yS + 12, -18], 350);
  dimLine([SA.santoX[0], yR + 1, -11], [SA.santoX[1], yR + 1, -11], [0, 1, 0], '40 codos', '≈ 18 m', [31, yR + 2, -11], 250);
  dimLine([SA.santisimoX[0], yR + 1, -11], [SA.santisimoX[1], yR + 1, -11], [0, 1, 0], '20 codos', '≈ 9 m', [0, yR + 2, -11], 250);
  dimLine([SA.santoX[1] + 1, yF, -11], [SA.santoX[1] + 1, yR, -11], [1, 0, 0], '40 codos', '≈ 18 m', [SA.santoX[1] + 1, yF + 22, -11], 250);

  /* ---------------- Escala ---------------- */
  const scaleGroup = new THREE.Group(); scaleGroup.visible = false; add(scaleGroup);
  const skinMat = std({ color: 0xb98a64, metalness: 0, roughness: 0.8 });
  const robeMat = std({ color: 0x6f6658, metalness: 0, roughness: 0.9 });
  function person(x, y, z, text) {
    const g = new THREE.Group(); g.position.set(x, y, z);
    mesh(new THREE.CylinderGeometry(0.3, 0.5, 3.0, 12), robeMat, 0, 1.5, 0, g);
    mesh(new THREE.SphereGeometry(0.3, 12, 10), skinMat, 0, 3.4, 0, g);
    scaleGroup.add(g);
    if (text) label(text, '≈ 3,8 codos', x, y + 4.2, z, scaleGroup, 160);
  }
  person(200, LV.mujeres, 20, 'Persona de 1,70 m');
  person(143, yI, 8); person(111, yS, 44, 'Persona de 1,70 m'); person(px1 + 4, yS + 3, 4); person(31, yF, 2, 'Persona de 1,70 m');
  person(edgeX(P.nO, P.sO, 560) - 30, BASE, 560, 'Persona de 1,70 m'); person(-20, BASE + 6, ZS + 8);
  person(280, 0, 96, 'Persona de 1,70 m'); person(390, 0, 10); person(-160, 0, -380);

  /* ---------------- Cuadrado de 500 codos (Middot 2:1) ---------------- */
  const middot = new THREE.Group(); middot.visible = false; add(middot);
  const cmpEdge = new THREE.LineBasicMaterial({ color: 0x9e2b25, depthTest: false, transparent: true });
  function loop(pts, y, mat, parent) {
    const arr = []; pts.forEach(([x, z]) => arr.push(x, y, z));
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    const l = new THREE.LineLoop(g, mat); l.renderOrder = 17; parent.add(l); return l;
  }
  {
    const { x, z } = LY.middot;
    loop([[x[0], z[0]], [x[1], z[0]], [x[1], z[1]], [x[0], z[1]]], 0.6, cmpEdge, middot);
    label('Monte de 500 × 500 codos', 'Mishná, Middot 2:1 (propuesta)', (x[0] + x[1]) / 2, 2, z[1], middot);
  }

  /* ---------------- Templo de Salomón superpuesto ---------------- */
  const salomon = new THREE.Group(); salomon.visible = false; add(salomon);
  const cmpFill = new THREE.MeshBasicMaterial({ color: 0x9e2b25, transparent: true, opacity: 0.14, depthTest: false, depthWrite: false });
  function ghostGeo(geo, x, y, z) {
    const m = new THREE.Mesh(geo, cmpFill); m.position.set(x, y, z); m.renderOrder = 15;
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), cmpEdge); e.position.copy(m.position); e.renderOrder = 16;
    salomon.add(m, e);
  }
  const ghost = (x0, x1, y0, y1, z0, z1) => ghostGeo(new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  {
    const SL = LY.salomon;
    // la casa se apoya en el piso del santuario; el atrio y sus objetos, en el atrio de los sacerdotes
    ghost(SL.santisimo.x[0], SL.santisimo.x[1], yF, yF + SL.santisimo.alto, -10, 10);
    ghost(SL.santo.x[0], SL.santo.x[1], yF, yF + SL.santo.alto, -10, 10);
    ghost(SL.casa.x[0], SL.casa.x[1], yF, yF + SL.casa.alto, SL.casa.z[0], SL.casa.z[1]);
    ghost(SL.portico.x[0], SL.portico.x[1], yF, yF + SL.portico.alto, SL.portico.z[0], SL.portico.z[1]);
    ghost(SL.camaras.x[0], SL.camaras.x[1], yF, yF + SL.camaras.alto, SL.camaras.z[0], SL.camaras.z[0] + 7);
    ghost(SL.camaras.x[0], SL.camaras.x[1], yF, yF + SL.camaras.alto, SL.camaras.z[1] - 7, SL.camaras.z[1]);
    ghost(SL.camaras.x[0], SL.casa.x[0], yF, yF + SL.camaras.alto, SL.camaras.z[0] + 7, SL.camaras.z[1] - 7);
    const PR = 12 / (2 * Math.PI);
    [-1, 1].forEach(s => ghostGeo(new THREE.CylinderGeometry(PR, PR, SL.columnas.alto, 20), SL.columnas.x, yS + SL.columnas.alto / 2, s * SL.columnas.z));
    ghost(SL.altar.x[0], SL.altar.x[1], yS, yS + SL.altar.alto, SL.altar.z[0], SL.altar.z[1]);
    ghostGeo(new THREE.CylinderGeometry(SL.mar.diametro / 2, SL.mar.diametro / 2 * 0.8, SL.mar.alto, 28), SL.mar.pos[0], yS + 3 + SL.mar.alto / 2, SL.mar.pos[1]);
    loop([[SL.atrio.x[0], SL.atrio.z[0]], [SL.atrio.x[1], SL.atrio.z[0]], [SL.atrio.x[1], SL.atrio.z[1]], [SL.atrio.x[0], SL.atrio.z[1]]], yS + 0.4, cmpEdge, salomon);
    // arca y querubines, solo contorno (1 R 6:23-28)
    ghost(-1.25, 1.25, yF, yF + 1.5, -0.75, 0.75);
    ghost(-2, 2, yF, yF + 10, -10, -0.5); ghost(-2, 2, yF, yF + 10, 0.5, 10);
    label('Casa de Salomón', '60 × 20 codos, 30 de alto', 20, yF + SL.casa.alto + 1, -14, salomon, Infinity, true);
    label('Jaquín y Boaz', null, SL.columnas.x, yS + SL.columnas.alto + 1, SL.columnas.z, salomon, 500, true);
    label('Altar de bronce', '20 × 20 codos', 92, yS + SL.altar.alto + 1, -10, salomon, 500, true);
    label('Mar de bronce', null, SL.mar.pos[0], yS + 9, SL.mar.pos[1], salomon, 500, true);
    label('Atrio (estimado)', null, SL.atrio.x[1], yS + 1, SL.atrio.z[1], salomon, 700, true);
    label('Arca y querubines', null, 0, yF + 11, 6, salomon, 120, true);
  }

  /* ---------------- Resaltado de la parte activa ---------------- */
  const hiMat = new THREE.LineBasicMaterial({ color: 0x9e2b25, depthTest: false, transparent: true });
  const highlight = new THREE.Group(); add(highlight);
  const rect = (x0, x1, z0, z1, y) => ({ loop: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], y });
  const bx = (x0, x1, y0, y1, z0, z1) => ({ box: [x0, x1, y0, y1, z0, z1] });
  const ZONES = {
    plataforma: [{ loop: platPts, y: BASE + 0.5 }, { loop: platPts, y: 0.4 }],
    escalinata: [rect(-100, 170, ZS, ZS + 46, BASE + 6.5)],
    robinson: [bx(edgeX(P.nO, P.sO, 630) - 31, edgeX(P.nO, P.sO, 630), BASE, 0, 612, 648)],
    porticoReal: [{ loop: [P.sO, P.sE, [edgeX(P.nE, P.sE, ZS - 40), ZS - 40], [edgeX(P.nO, P.sO, ZS - 40), ZS - 40]], y: 51 }],
    porticoSalomon: [{ loop: [P.nE, P.sE, [P.sE[0] - 30, P.sE[1]], [P.nE[0] - 30, P.nE[1]]], y: 26.5 }],
    gentiles: [{ loop: platPts, y: 0.4 }],
    soreg: [rect(S.x[0], S.x[1], S.z[0], S.z[1], S.alto + 0.4)],
    mujeres: [rect(MU.x[0], MU.x[1] + WT, MU.z[0] - WT, MU.z[1] + WT, LV.mujeres + 0.4)],
    nicanor: [bx(AI.x[1] - 3, AI.x[1] + 19, LV.mujeres, yI + 40, -17, 17)],
    israel: [rect(F.sacerdotes[0], F.israel[1], AI.z[0], AI.z[1], yI + 0.6)],
    altar: [rect(95, 127, -16, 48, yS + 0.5)],
    lavatorio: [rect(80, 90, 14, 26, yS + 0.4), rect(LY.matadero.x[0], LY.matadero.x[1], LY.matadero.z[0], LY.matadero.z[1], yS + 0.4)],
    santuario: [bx(SA.x[0], px1, yF, yTop, -halfP, halfP)],
    santo: [bx(SA.santoX[0], SA.santoX[1], yF, yR, -10, 10)],
    velo: [bx(SA.veloX[0], SA.veloX[1], yF, yR, -10, 10)],
    santisimo: [bx(SA.santisimoX[0], SA.santisimoX[1], yF, yR, -10, 10)],
    antonia: [bx(LY.antonia.x[0], LY.antonia.x[1], BASE, 70, LY.antonia.z[0], LY.antonia.z[1])]
  };
  function showZone(id) {
    while (highlight.children.length) { const c = highlight.children.pop(); c.geometry.dispose(); }
    (ZONES[id] || []).forEach(z => {
      if (z.loop) loop(z.loop, z.y, hiMat, highlight);
      if (z.box) {
        const [x0, x1, y0, y1, z0, z1] = z.box;
        const e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0)), hiMat);
        e.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); e.renderOrder = 17; highlight.add(e);
      }
    });
  }

  /* ---------------- Fuego y lámparas ---------------- */
  const FIRE = [new THREE.Color(0xffd27a), new THREE.Color(0xff6a2a)];
  const altarFire = [];
  for (let i = 0; i < 50; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffb04a }));
    s.userData = { a: rnd() * Math.PI * 2, r: rnd(), y: rnd(), spd: 0.6 + rnd() };
    altarFire.push(add(s));
  }
  const flames = menorahPts.map(p => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffcf70 }));
    s.position.copy(p); s.scale.setScalar(0.35); s.userData.ph = rnd() * 10;
    return add(s);
  });

  /* ---------------- Luces ---------------- */
  const hemi = add(new THREE.HemisphereLight(0xfffaf0, 0x8a7658, 0.42));
  const sun = new THREE.DirectionalLight(0xfff0d4, 0.8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0005;
  add(sun); add(sun.target);
  const SUN_DIR = new THREE.Vector3(0.5, 0.85, 0.35).normalize();
  const altarLight = add(new THREE.PointLight(0xff9a4a, 0.6, 120)); altarLight.position.set(111, yS + 16, 0);
  const holyLight = add(new THREE.PointLight(0xffc877, 0, 60)); holyLight.position.set(31, yF + 12, 0);
  const courtLight = add(new THREE.PointLight(0xffc877, 0, 260)); courtLight.position.set(218, LV.mujeres + 40, 0);
  let shadowHalf = 0;
  function updateShadow() {
    const d = camera.position.distanceTo(controls.target);
    const h = Math.max(60, Math.min(900, d * 0.8));
    const t = controls.target;
    sun.target.position.copy(t);
    sun.position.copy(t).addScaledVector(SUN_DIR, h * 2.5);
    if (Math.abs(h - shadowHalf) / (shadowHalf || 1) > 0.08) {
      shadowHalf = h;
      Object.assign(sun.shadow.camera, { left: -h, right: h, top: h, bottom: -h, near: 1, far: h * 5 });
      sun.shadow.camera.updateProjectionMatrix();
    }
  }

  /* ---------------- Tema día / noche ---------------- */
  const themeBtn = document.getElementById('t-theme');
  const mq = matchMedia('(prefers-color-scheme: dark)');
  let night = root.dataset.theme ? root.dataset.theme === 'dark' : mq.matches;
  let userChoseTheme = false;
  function applyTheme(isNight) {
    night = isNight;
    root.dataset.theme = night ? 'dark' : 'light';
    const bg = cssVar('--bg', night ? '#15171c' : '#fafaf8');
    const accent = cssVar('--accent', '#9e2b25');
    scene.background = new THREE.Color(bg);
    scene.fog = new THREE.Fog(bg, night ? 1400 : 2200, night ? 4200 : 5600);
    [dimMat, cmpEdge, cmpFill, hiMat].forEach(m => m.color.set(accent));
    if (night) {
      hemi.color.set(0x34425f); hemi.groundColor.set(0x16130f); hemi.intensity = 0.55;
      sun.color.set(0xa3b6dc); sun.intensity = 0.3; SUN_DIR.set(-0.35, 0.8, -0.45).normalize();
    } else {
      hemi.color.set(0xfffaf0); hemi.groundColor.set(0x8a7658); hemi.intensity = 0.42;
      sun.color.set(0xfff0d4); sun.intensity = 0.8; SUN_DIR.set(0.5, 0.85, 0.35).normalize();
    }
    holyLight.intensity = night ? 0.9 : 0;
    courtLight.intensity = night ? 1.4 : 0;
    stars.visible = night;
    stdMats.forEach(m => { const base = m.metalness > 0.5 ? 1 : 0.25; m.envMapIntensity = base * (night ? 0.3 : 1); });
    labels.forEach(drawLabel);
    themeBtn.textContent = night ? 'Ver de día' : 'Ver de noche';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', bg);
  }
  themeBtn.addEventListener('click', () => { userChoseTheme = true; applyTheme(!night); });
  const onScheme = e => { if (!userChoseTheme) applyTheme(e.matches); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);

  /* ---------------- Interruptores ---------------- */
  const LAYERS = { nombres: names, medidas: dims, escala: scaleGroup, salomon, middot };
  const BTN = { nombres: 't-names', medidas: 't-dims', escala: 't-scale', salomon: 't-salomon', middot: 't-middot' };
  function setLayer(k, on) {
    LAYERS[k].visible = on;
    document.getElementById(BTN[k]).setAttribute('aria-pressed', String(on));
  }
  Object.keys(BTN).forEach(k => document.getElementById(BTN[k]).addEventListener('click', () => setLayer(k, !LAYERS[k].visible)));
  const roofBtn = document.getElementById('t-roof');
  function setRoof(on) { roof.visible = on; roofBtn.setAttribute('aria-pressed', String(on)); }
  roofBtn.addEventListener('click', () => setRoof(!roof.visible));

  /* ---------------- UI: selector de ruta, lista y ficha ----------------
     Patrón común: una ruta a la vez; la lista lleva solo sus pasos. */
  const list = document.getElementById('stations');
  const routeSel = document.getElementById('ruta');
  const routeInfo = document.getElementById('ruta-info');
  routeSel.innerHTML = [...new Set(ROUTES.map(r => r.grupo))].map(g => `<optgroup label="${g}">${
    ROUTES.filter(r => r.grupo === g).map(r => `<option value="${r.id}">${r.n}</option>`).join('')
  }</optgroup>`).join('');
  routeSel.addEventListener('change', () => select(routeSel.value, 0));
  if (ROUTES.length < 2) document.querySelector('.ruta-sel').hidden = true;
  let shownRoute = null;
  function renderRoute(t) {
    const r = ROUTE_BY_ID[t];
    shownRoute = t;
    routeSel.value = t;
    routeInfo.textContent = r.info || '';
    list.innerHTML = r.steps.map((s, i) => `<li><button class="st" type="button" data-i="${i}">
      <span class="st-num">${s.num ?? ''}</span>
      <span class="st-name">${s.short || s.n}</span>
      <span class="st-ref">${s.ref}</span>
    </button></li>`).join('');
  }
  list.addEventListener('click', e => { const b = e.target.closest('.st'); if (b) select(tour, +b.dataset.i); });

  const dKicker = document.getElementById('d-kicker'), dTitle = document.getElementById('d-title');
  const dRef = document.getElementById('d-ref'), dRows = document.getElementById('d-rows');
  const dDesc = document.getElementById('d-desc'), dThink = document.getElementById('d-think');
  const dPos = document.getElementById('d-pos');
  const prevBtn = document.getElementById('prev'), nextBtn = document.getElementById('next');
  const detailEl = document.getElementById('detail');
  let tour = ROUTES[0].id, idx = 0;
  const items = t => ROUTE_BY_ID[t].steps;
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  document.getElementById('t-home').addEventListener('click', () => select(tour, 0));
  function step(d) {
    const n = items(tour).length, i = Math.max(0, Math.min(n - 1, idx + d));
    if (i !== idx) select(tour, i);
  }
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  function renderDetail() {
    const arr = items(tour), it = arr[idx];
    dKicker.textContent = ROUTE_BY_ID[tour].n; dKicker.hidden = false;
    dTitle.textContent = it.n;
    dRef.textContent = it.ref;
    dRows.innerHTML = it.rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    const paras = Array.isArray(it.desc) ? it.desc : [it.desc];
    dDesc.innerHTML = paras.map(p => `<p>${p}</p>`).join('');
    dThink.hidden = !it.think;
    dThink.querySelector('span').textContent = it.think || '';
    const total = arr.filter(s => s.num).length;
    dPos.textContent = it.num ? `${it.num} de ${total}` : '';
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === arr.length - 1;
    detailEl.scrollTop = 0;
  }
  function select(t, i, instant) {
    if (!ROUTE_BY_ID[t] || !items(t)[i]) return;
    tour = t; idx = i;
    const it = items(t)[i];
    if (shownRoute !== t) renderRoute(t);
    list.querySelectorAll('.st').forEach(b => b.setAttribute('aria-current', String(+b.dataset.i === i)));
    renderDetail();
    const show = it.show || [];
    Object.keys(LAYERS).forEach(k => setLayer(k, show.includes(k)));
    setRoof(it.roof !== false);
    showZone(it.zona);
    flyTo(it.view, instant);
  }
  // Tocar una parte del modelo abre su estación (en la ruta actual si la tiene; si no, en el recorrido)
  function selectZone(id) {
    let i = items(tour).findIndex(s => s.zona === id);
    if (i >= 0) return select(tour, i);
    const r = ROUTES.find(rt => rt.steps.some(s => s.zona === id));
    if (r) select(r.id, r.steps.findIndex(s => s.zona === id));
  }

  /* ---------------- Cámara ---------------- */
  let flight = null;
  const ease = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  function flyTo(v, instant) {
    const p1 = new THREE.Vector3(...v.p), t1 = new THREE.Vector3(...v.t);
    if (instant || reduceMotion) { camera.position.copy(p1); controls.target.copy(t1); flight = null; return; }
    const dist = camera.position.distanceTo(p1) + controls.target.distanceTo(t1);
    flight = { p0: camera.position.clone(), t0: controls.target.clone(), p1, t1, start: performance.now(), dur: Math.min(2600, 900 + dist * 1.6) };
  }
  controls.addEventListener('start', () => { flight = null; });

  /* ---------------- Selección con el puntero ---------------- */
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function shown(o) { while (o) { if (!o.visible) return false; o = o.parent; } return true; }
  function pickAt(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    for (const h of ray.intersectObjects(pickables, true)) {
      if (h.object.isSprite || h.object.isLine || !shown(h.object)) continue;
      let o = h.object;
      while (o) { if (o.userData && o.userData.station) return o.userData.station; o = o.parent; }
    }
    return null;
  }
  let down = null;
  canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY }; });
  canvas.addEventListener('pointerup', e => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved < 6) { const id = pickAt(e); if (id) selectZone(id); }
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
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    if (getComputedStyle(detailEl).position === 'absolute') {
      const dx = Math.min(w * 0.22, (detailEl.offsetWidth + 20) / 2);
      camera.setViewOffset(w, h, -dx, Math.min(60, h * 0.07), w, h);
    } else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    pxScale = 2 / (camera.projectionMatrix.elements[5] * h);
    labels.forEach(sizeLabel);
  }
  new ResizeObserver(resize).observe(stage);
  new ResizeObserver(resize).observe(detailEl);
  resize();

  /* ---------------- Animación ---------------- */
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const altarTop = new THREE.Vector3(111, yS + 9.3, 0);
  function updateEffects(dt, t) {
    for (const s of altarFire) {
      const u = s.userData;
      u.y += dt * (0.5 + 0.4 * u.spd);
      if (u.y > 1) { u.y -= 1; u.a = rnd() * Math.PI * 2; u.r = rnd(); }
      const rad = 6 * Math.sqrt(u.r) * (1 - u.y * 0.5);
      s.position.set(altarTop.x + Math.cos(u.a) * rad, altarTop.y + u.y * 5, Math.sin(u.a) * rad);
      s.material.color.copy(FIRE[0]).lerp(FIRE[1], Math.min(1, u.y * 1.4));
      s.material.opacity = (night ? 0.9 : 0.75) * (1 - u.y) * smooth(0, 0.08, u.y);
      s.scale.setScalar((2.2 + u.spd) * (1 - u.y * 0.5));
    }
    flames.forEach(s => s.scale.setScalar(0.32 + 0.06 * Math.sin(t * 11 + s.userData.ph)));
    altarLight.intensity = (night ? 2.2 : 0.6) * (0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3));
  }
  const camPos = new THREE.Vector3();
  function updateLabels() {
    camPos.copy(camera.position);
    for (const L of labels) {
      if (L.near === Infinity) { L.sprite.visible = true; continue; }
      L.sprite.visible = camPos.distanceTo(L.pos) < L.near;
    }
  }

  const needle = document.getElementById('needle');
  let last = performance.now(), lastAz = null;
  function frame(now) {
    const realDt = Math.min(0.05, (now - last) / 1000);
    const dt = reduceMotion ? 0 : realDt;
    last = now;
    const t = reduceMotion ? 0 : now / 1000;
    if (flight) {
      const k = Math.min(1, (now - flight.start) / flight.dur), e = ease(k);
      camera.position.lerpVectors(flight.p0, flight.p1, e);
      controls.target.lerpVectors(flight.t0, flight.t1, e);
      if (k >= 1) flight = null;
    }
    updateEffects(dt, t);
    hiMat.opacity = reduceMotion ? 0.95 : 0.6 + 0.35 * Math.sin(now / 350);
    controls.update();
    updateShadow();
    updateLabels();
    const az = controls.getAzimuthalAngle();
    if (az !== lastAz) { needle.setAttribute('transform', `rotate(${(az * 180 / Math.PI).toFixed(1)} 22 22)`); lastAz = az; }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  applyTheme(night);
  select(tour, 0, true);
  window.fypReset = () => select(tour, 0);
  requestAnimationFrame(frame);
})();
