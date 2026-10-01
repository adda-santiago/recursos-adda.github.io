/* ==========================================================
   APP.JS — Escena 3D e interacción del templo (three.js r128).
   Lee el contenido desde data.js; edita este archivo solo para
   cambios de modelo, cámara o comportamiento.
   Fuego y Palabra — El templo de Salomón
   Unidad de la escena: 1 = 1 codo (≈ 45 cm).
   Ejes: +x oriente, −x occidente, −z norte, +z sur, +y arriba.
   ========================================================== */
(() => {
  'use strict';

  /* ---------------- Datos ---------------- */
  const STATIONS = (window.TEMPLO && window.TEMPLO.STATIONS) || [];
  const BY_ID = Object.fromEntries(STATIONS.map((s, i) => [s.id, i]));

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
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 3000);
  camera.position.set(260, 180, 280);
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.485;
  controls.minDistance = 3;
  controls.maxDistance = 500;
  controls.target.set(8, 6, 0);

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
  const rnd = mulberry(5);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  function canvasTexture(w, h, draw) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = maxAniso;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }
  function weave(g, w, h, a) {
    for (let y = 0; y < h; y += 2) { g.fillStyle = `rgba(0,0,0,${Math.random() * a})`; g.fillRect(0, y, w, 1); }
    for (let x = 0; x < w; x += 2) { g.fillStyle = `rgba(255,255,255,${Math.random() * a})`; g.fillRect(x, 0, 1, h); }
  }

  /* ---------------- Texturas ---------------- */
  // Sillería: un tile = 12 × 4 codos (dos hileras de sillares grandes, 1 R 7:10)
  const stoneTex = canvasTexture(256, 128, (g, w, h) => {
    g.fillStyle = '#ddd2bd'; g.fillRect(0, 0, w, h);
    const rows = 2, rh = h / rows;
    for (let r = 0; r < rows; r++) {
      const off = r % 2 ? w / 4 : 0;
      for (let x = -w / 2; x < w; x += w / 2) {
        const x0 = x + off;
        g.fillStyle = `rgba(${150 + Math.random() * 40},${130 + Math.random() * 30},${100 + Math.random() * 25},0.18)`;
        g.fillRect(x0 + 2, r * rh + 2, w / 2 - 4, rh - 4);
        g.strokeStyle = 'rgba(90,75,55,0.45)'; g.lineWidth = 2;
        g.strokeRect(x0 + 1, r * rh + 1, w / 2 - 2, rh - 2);
      }
    }
    for (let i = 0; i < 900; i++) {
      g.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.12)' : 'rgba(80,60,40,0.1)';
      g.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }
  });
  // Oro tallado: palmeras, querubines y flores abiertas (1 R 6:29). Un tile = 5 × 5 codos
  const carvedTex = canvasTexture(256, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, w, h);
    gr.addColorStop(0, '#d9b45a'); gr.addColorStop(0.5, '#c79d42'); gr.addColorStop(1, '#dcb961');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(110,75,20,0.55)'; g.lineWidth = 3; g.lineCap = 'round';
    // palmera al centro
    g.beginPath(); g.moveTo(128, 236); g.lineTo(128, 70); g.stroke();
    for (let k = 0; k < 5; k++) {
      g.beginPath(); g.moveTo(128, 72);
      g.quadraticCurveTo(128 + 30 + k * 6, 40 + k * 8, 128 + 52 + k * 4, 70 + k * 14); g.stroke();
      g.beginPath(); g.moveTo(128, 72);
      g.quadraticCurveTo(128 - 30 - k * 6, 40 + k * 8, 128 - 52 - k * 4, 70 + k * 14); g.stroke();
    }
    // flores abiertas en las esquinas
    [[28, 28], [228, 28], [28, 228], [228, 228]].forEach(([x, y]) => {
      g.beginPath(); g.arc(x, y, 14, 0, Math.PI * 2); g.stroke();
      for (let p = 0; p < 8; p++) {
        const a = p * Math.PI / 4;
        g.beginPath(); g.moveTo(x + Math.cos(a) * 14, y + Math.sin(a) * 14); g.lineTo(x + Math.cos(a) * 22, y + Math.sin(a) * 22); g.stroke();
      }
    });
    // querubines estilizados a los lados de la palmera
    const cher = (cx, flip) => {
      g.save(); g.translate(cx, 150); g.scale(flip ? -1 : 1, 1);
      g.beginPath(); g.arc(0, -30, 7, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.moveTo(0, -22); g.lineTo(0, 30); g.stroke();
      for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(0, -16 + k * 5); g.quadraticCurveTo(20, -52 + k * 6, 34, -24 + k * 10); g.stroke(); }
      g.restore();
    };
    cher(62, true); cher(194, false);
    for (let i = 0; i < 1200; i++) {
      g.fillStyle = Math.random() > 0.5 ? 'rgba(255,245,210,0.12)' : 'rgba(90,60,10,0.08)';
      g.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
  });
  const veilTex = canvasTexture(256, 512, (g, w, h) => {
    const C = ['#2c4a8a', '#6a2c6c', '#a4282b', '#efe9dc'];
    g.fillStyle = '#26407a'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 4; i++) { g.fillStyle = C[i]; g.fillRect(0, i * 10, w, 10); g.fillRect(0, h - 40 + i * 10, w, 10); }
    g.strokeStyle = '#d1aa52'; g.fillStyle = '#d1aa52'; g.lineWidth = 3; g.lineCap = 'round';
    [140, 330].forEach(cy => {
      [w / 2 - 22, w / 2 + 22].forEach((cx, j) => {
        g.save(); g.translate(cx, cy); g.scale(j ? -1.3 : 1.3, 1.3);
        g.beginPath(); g.arc(0, -46, 8, 0, Math.PI * 2); g.fill();
        g.beginPath(); g.moveTo(0, -36); g.lineTo(0, 30); g.stroke();
        for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(0, -28 + k * 6); g.quadraticCurveTo(28 + k * 6, -70 + k * 8, 58 - k * 4, -40 + k * 14); g.stroke(); }
        g.restore();
      });
    });
    weave(g, w, h, 0.08);
  });
  const groundTex = canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = '#c9b996'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = Math.random() > 0.5 ? `rgba(255,250,235,${Math.random() * 0.22})` : `rgba(80,65,40,${Math.random() * 0.2})`;
      g.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 3, 1 + Math.random() * 3);
    }
  });
  groundTex.repeat.set(120, 120);
  const pavingTex = canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = '#b8a888'; g.fillRect(0, 0, w, h);
    const n = 4, s = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      g.fillStyle = `rgba(${140 + Math.random() * 50},${120 + Math.random() * 40},${90 + Math.random() * 30},0.16)`;
      g.fillRect(i * s + 2, j * s + 2, s - 4, s - 4);
      g.strokeStyle = 'rgba(90,75,55,0.3)'; g.lineWidth = 2; g.strokeRect(i * s + 1, j * s + 1, s - 2, s - 2);
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
  function tiled(tex, rx, ry, extra) {
    const t = tex.clone(); t.needsUpdate = true; t.repeat.set(Math.max(1, rx), Math.max(1, ry));
    return std(Object.assign({ map: t, metalness: 0, roughness: 0.95 }, extra || {}));
  }
  const M = {
    gold: std({ color: 0xd6ad4b, metalness: 0.9, roughness: 0.36 }),
    bronze: std({ color: 0xa2683a, metalness: 0.85, roughness: 0.42 }),
    bronzeDS: std({ color: 0xa2683a, metalness: 0.85, roughness: 0.42, side: THREE.DoubleSide }),
    bronzeDark: std({ color: 0x5e3b20, metalness: 0.7, roughness: 0.6 }),
    stone: std({ color: 0xd8ccb5, metalness: 0, roughness: 0.95 }),
    cedar: std({ color: 0x7a4f2e, metalness: 0, roughness: 0.8 }),
    ash: std({ color: 0x2b2522, metalness: 0, roughness: 1 }),
    water: std({ color: 0x9fb8c4, metalness: 0.3, roughness: 0.05, transparent: true, opacity: 0.85 }),
    bread: std({ color: 0xd9ab6c, metalness: 0, roughness: 0.9 }),
    ox: std({ color: 0x8c5a30, metalness: 0.75, roughness: 0.45 }),
    dark: std({ color: 0x2a2420, metalness: 0, roughness: 1 }),
    hill: std({ color: 0xbca985, metalness: 0, roughness: 1, flatShading: true }),
    ground: std({ map: groundTex, color: 0xcbc4b8, metalness: 0, roughness: 1 }),
    carved: tiled(carvedTex, 1, 1, { metalness: 0.75, roughness: 0.4 })
  };

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
  /* Caja por límites; mat puede ser un material o un arreglo de 6 (+x,−x,+y,−y,+z,−z) */
  function slab(x0, x1, y0, y1, z0, z1, mat, p) {
    return box(x1 - x0, y1 - y0, z1 - z0, mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, p);
  }
  /* Muro de sillería con una cara interior de oro tallado */
  function wall(x0, x1, y0, y1, z0, z1, innerFace, p) {
    const w = x1 - x0, h = y1 - y0, d = z1 - z0;
    const along = Math.max(w, d);
    const st = tiled(stoneTex, along / 12, h / 4);
    const mats = [st, st, st, st, st, st];
    if (innerFace !== null && innerFace !== undefined) {
      mats[innerFace] = tiled(carvedTex, along / 5, h / 5, { metalness: 0.75, roughness: 0.4 });
    }
    return slab(x0, x1, y0, y1, z0, z1, mats, p);
  }
  const pickables = [];
  function group(id, x, y, z) {
    const g = new THREE.Group();
    g.position.set(x || 0, y || 0, z || 0);
    g.userData.station = id;
    pickables.push(g);
    return add(g);
  }

  /* ---------------- Terreno: monte Moriah ---------------- */
  const PLAT = { x0: -84, x1: 112, z0: -66, z1: 66, depth: 8 };
  const groundMesh = mesh(new THREE.PlaneGeometry(2400, 2400), M.ground, 0, -PLAT.depth, 0);
  groundMesh.rotation.x = -Math.PI / 2; groundMesh.castShadow = false;
  {
    const w = PLAT.x1 - PLAT.x0, d = PLAT.z1 - PLAT.z0;
    const side = tiled(stoneTex, w / 12, PLAT.depth / 4);
    const top = tiled(pavingTex, w / 12, d / 12);
    slab(PLAT.x0, PLAT.x1, -PLAT.depth, 0, PLAT.z0, PLAT.z1, [side, side, top, side, side, side]);
  }
  (function hills() {
    const r = mulberry(9);
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2 + r() * 0.2;
      const d = 360 + r() * 260;
      const olives = Math.abs(a) < 0.35 || Math.abs(a - Math.PI * 2) < 0.35;   // al oriente: monte de los Olivos
      const h = olives ? 70 + r() * 20 : 25 + r() * 45;
      const rad = olives ? 170 : 80 + r() * 90;
      const m = mesh(new THREE.SphereGeometry(rad, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.hill, Math.cos(a) * d, -PLAT.depth - 2, Math.sin(a) * d);
      m.scale.set(1, h / rad, 0.7 + r() * 0.5);
      m.rotation.y = r() * Math.PI; m.castShadow = false;
    }
  })();
  const stars = (function () {
    const r = mulberry(11), pts = [];
    for (let i = 0; i < 900; i++) {
      const th = r() * Math.PI * 2, ph = Math.acos(0.08 + r() * 0.92);
      pts.push(Math.sin(ph) * Math.cos(th) * 1400, Math.cos(ph) * 1400, Math.sin(ph) * Math.sin(th) * 1400);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.8 })));
  })();

  /* ---------------- Atrio interior ---------------- */
  const COURT = { x0: -64, x1: 94, z0: -48, z1: 48 };
  const court = group('atrio');
  (function courtWall() {
    const t = 1.6, hs = 3, hc = 0.8;   // tres hileras de piedra + una de cedro
    const seg = (x0, x1, z0, z1) => {
      wall(x0, x1, 0, hs, z0, z1, null, court);
      slab(x0, x1, hs, hs + hc, z0, z1, M.cedar, court);
    };
    seg(COURT.x0, COURT.x1, COURT.z0 - t, COURT.z0);
    seg(COURT.x0, COURT.x1, COURT.z1, COURT.z1 + t);
    seg(COURT.x0 - t, COURT.x0, COURT.z0 - t, COURT.z1 + t);
    seg(COURT.x1, COURT.x1 + t, COURT.z0 - t, -8);
    seg(COURT.x1, COURT.x1 + t, 8, COURT.z1 + t);
  })();

  /* ---------------- La casa ---------------- */
  // Interior: debir x −40..−20, hekal x −20..20, z −10..10, muros de 3 codos (estimado)
  const WALL = 3;
  const house = group('general');
  // muros largos (norte y sur), con ventanas estrechas por encima de las cámaras
  wall(-40 - WALL, 20 + WALL, 0, 30, -10 - WALL, -10, 4, house);   // norte: cara interior +z → índice 4
  wall(-40 - WALL, 20 + WALL, 0, 30, 10, 10 + WALL, 5, house);     // sur: cara interior −z → índice 5
  wall(-40 - WALL, -40, 0, 30, -10, 10, 0, house);                 // occidente: cara interior +x
  // fachada oriental con la puerta del Lugar Santo (ancho y alto estimados)
  const DOOR = { z: 5, h: 16 };
  wall(20, 20 + WALL, 0, 30, -10, -DOOR.z, 1, house);
  wall(20, 20 + WALL, 0, 30, DOOR.z, 10, 1, house);
  wall(20, 20 + WALL, DOOR.h, 30, -DOOR.z, DOOR.z, 1, house);
  [-1, 1].forEach(s => {                                            // puertas de ciprés de dos hojas, abiertas hacia adentro
    const hinge = new THREE.Group();
    hinge.position.set(20, 0, s * DOOR.z);
    hinge.rotation.y = s * 1.2;
    house.add(hinge);
    box(0.3, DOOR.h, DOOR.z, M.gold, 0, DOOR.h / 2, -s * DOOR.z / 2, hinge);
  });
  for (let x = -36; x <= 16; x += 6) {                              // ventanas (1 R 6:4)
    [-1, 1].forEach(s => slab(x - 0.35, x + 0.35, 21, 27, s * (10 + WALL) - 0.05, s * (10 + WALL) + 0.05, M.dark, house));
  }
  // suelo de ciprés cubierto de oro (1 R 6:15, 30)
  slab(-40, 20, 0, 0.12, -10, 10, tiled(carvedTex, 12, 4, { metalness: 0.8, roughness: 0.35 }), house);

  // Techo de la casa y techo del Lugar Santísimo (20 codos)
  const roof = new THREE.Group();
  house.add(roof);
  wall(-40 - WALL - 0.5, 33.5, 30, 31.4, -10 - WALL - 0.5, 10 + WALL + 0.5, 3, roof);
  slab(-40, -20, 20, 20.5, -10, 10, M.carved, roof);

  // Tabique del Lugar Santísimo con puertas de olivo y velo
  const holiest = group('santisimo');
  wall(-20 - 1, -20, 0, 30, -10, -2.5, 0, holiest);
  wall(-20 - 1, -20, 0, 30, 2.5, 10, 0, holiest);
  wall(-20 - 1, -20, 10, 30, -2.5, 2.5, 0, holiest);
  const veil = mesh(new THREE.PlaneGeometry(5, 10), std({ map: veilTex, metalness: 0, roughness: 0.95, side: THREE.DoubleSide }), -19.8, 5, 0, holiest);
  veil.rotation.y = Math.PI / 2;
  // cadenas de oro delante del Lugar Santísimo (1 R 6:21)
  {
    const pts = [];
    for (let i = 0; i <= 24; i++) { const z = -2.5 + (5 * i) / 24; pts.push(new THREE.Vector3(-19.5, 10.2 - Math.sin((i / 24) * Math.PI) * 0.8, z)); }
    const chain = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.06, 6), M.gold);
    holiest.add(chain);
  }

  /* ---------------- Pórtico ---------------- */
  const portico = group('portico');
  wall(20 + WALL, 33, 0, 30, -10 - WALL, -10, 4, portico);
  wall(20 + WALL, 33, 0, 30, 10, 10 + WALL, 5, portico);
  slab(20 + WALL, 33, 0, 0.12, -10, 10, M.carved, portico);
  slab(20 + WALL, 33, 27, 30, -10, 10, tiled(stoneTex, 2, 1), portico);   // dintel del pórtico

  /* ---------------- Cámaras laterales ---------------- */
  const rooms = group('camaras');
  const ROOM_H = 16.5;
  function roomBlock(x0, x1, z0, z1, alongX) {
    wall(x0, x1, 0, ROOM_H, z0, z1, null, rooms);
    [5.5, 11].forEach(y => slab(x0 - 0.15, x1 + 0.15, y - 0.3, y, z0 - 0.15, z1 + 0.15, M.cedar, rooms));
    // pequeñas aberturas en la cara exterior
    const outerZ = z0 < 0 ? z0 - 0.05 : z1 + 0.05;
    const outerX = x0 - 0.05;
    for (let k = 0; k < 3; k++) {
      const y = 2.5 + k * 5.5;
      if (alongX) for (let x = x0 + 4; x < x1 - 2; x += 7) slab(x - 0.4, x + 0.4, y, y + 1.4, outerZ - 0.05, outerZ + 0.05, M.dark, rooms);
      else for (let z = z0 + 4; z < z1 - 2; z += 7) slab(outerX - 0.05, outerX + 0.05, y, y + 1.4, z - 0.4, z + 0.4, M.dark, rooms);
    }
  }
  roomBlock(-40 - WALL, 20 + WALL, -10 - WALL - 7, -10 - WALL, true);
  roomBlock(-40 - WALL, 20 + WALL, 10 + WALL, 10 + WALL + 7, true);
  roomBlock(-40 - WALL - 7, -40 - WALL, -10 - WALL - 7, 10 + WALL + 7, false);
  wall(-40 - WALL - 7, 20 + WALL, ROOM_H, ROOM_H + 0.6, -10 - WALL - 7.2, -10 - WALL, null, rooms);
  wall(-40 - WALL - 7, 20 + WALL, ROOM_H, ROOM_H + 0.6, 10 + WALL, 10 + WALL + 7.2, null, rooms);

  /* ---------------- Jaquín y Boaz ---------------- */
  const pillars = group('columnas');
  const PR = 12 / (2 * Math.PI);   // radio por circunferencia de 12 codos
  [-1, 1].forEach(s => {
    const z = s * 6.8, x = 37;
    cyl(PR * 1.15, PR * 1.25, 0.8, M.bronze, x, 0.4, z, pillars, 32);
    cyl(PR, PR, 18, M.bronze, x, 9, z, pillars, 32);
    // capitel de 5 codos: cuerpo, red y lirios
    cyl(PR * 1.25, PR * 1.02, 4, M.bronze, x, 20, z, pillars, 32);
    cyl(PR * 0.9, PR * 1.28, 1, M.bronze, x, 22.5, z, pillars, 32);
    [19.2, 20.8].forEach(y => {
      mesh(new THREE.TorusGeometry(PR * 1.2, 0.12, 8, 40), M.bronzeDark, x, y, z, pillars).rotation.x = Math.PI / 2;
      for (let k = 0; k < 28; k++) {                                  // granadas (representativas)
        const a = (k / 28) * Math.PI * 2;
        mesh(new THREE.SphereGeometry(0.22, 8, 6), M.bronze, x + Math.cos(a) * PR * 1.27, y, z + Math.sin(a) * PR * 1.27, pillars);
      }
    });
    for (let k = 0; k < 10; k++) {                                   // obra de lirios
      const a = (k / 10) * Math.PI * 2;
      const petal = mesh(new THREE.ConeGeometry(0.35, 1.2, 6), M.bronze, x + Math.cos(a) * PR * 1.05, 23.3, z + Math.sin(a) * PR * 1.05, pillars);
      petal.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
    }
  });

  /* ---------------- Altar de bronce ---------------- */
  const altar = group('altar', 62, 0, 0);
  box(20, 10, 20, M.bronze, 0, 5, 0, altar);
  box(20.3, 0.9, 20.3, M.bronzeDark, 0, 5, 0, altar);
  box(18, 0.2, 18, M.ash, 0, 10.02, 0, altar);
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => mesh(new THREE.ConeGeometry(0.9, 1.6, 8), M.bronze, a * 9.1, 10.8, b * 9.1, altar));

  /* ---------------- Mar de bronce ---------------- */
  const sea = group('mar', 42, 0, 28);
  function ox(parent, x, z, rotY) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rotY; parent.add(g);
    box(2.6, 1.5, 1.1, M.ox, 0, 2.6, 0, g);
    box(0.9, 0.9, 0.7, M.ox, 1.55, 3.1, 0, g);
    [-1, 1].forEach(b => mesh(new THREE.ConeGeometry(0.08, 0.5, 6), M.ox, 1.7, 3.7, b * 0.3, g).rotation.x = b * 0.6);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => cyl(0.14, 0.12, 1.9, M.ox, a * 1.0, 0.95, b * 0.38, g, 8));
  }
  for (let q = 0; q < 4; q++) {
    const base = q * Math.PI / 2;
    [-0.42, 0, 0.42].forEach(off => {
      const a = base + off;
      ox(sea, Math.cos(a) * 2.6, -Math.sin(a) * 2.6, a);          // mirando hacia afuera
    });
  }
  mesh(new THREE.CylinderGeometry(5, 3.6, 5, 48, 1, true), M.bronzeDS, 0, 6.3, 0, sea);
  cyl(3.6, 3.6, 0.3, M.bronze, 0, 3.95, 0, sea, 48);
  mesh(new THREE.TorusGeometry(5.1, 0.25, 8, 48), M.bronze, 0, 8.8, 0, sea).rotation.x = Math.PI / 2;
  mesh(new THREE.CircleGeometry(4.9, 48), M.water, 0, 8.2, 0, sea).rotation.x = -Math.PI / 2;

  /* ---------------- Diez basas ---------------- */
  const stands = group('basas');
  function basa(x, z) {
    const g = new THREE.Group(); g.position.set(x, 0, z); stands.add(g);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => {
      mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.2, 18), M.bronzeDark, a * 1.5, 0.75, b * 2.1, g).rotation.x = Math.PI / 2;
    });
    box(4, 2.1, 4, M.bronze, 0, 2.0, 0, g);
    box(4.1, 0.2, 4.1, M.bronzeDark, 0, 1.6, 0, g);
    box(4.1, 0.2, 4.1, M.bronzeDark, 0, 2.6, 0, g);
    cyl(0.9, 1.2, 0.5, M.bronze, 0, 3.3, 0, g, 20);
    mesh(new THREE.CylinderGeometry(2, 1.2, 1.3, 32, 1, true), M.bronzeDS, 0, 4.2, 0, g);
    mesh(new THREE.CircleGeometry(1.9, 32), M.water, 0, 4.6, 0, g).rotation.x = -Math.PI / 2;
  }
  [-18, -8, 2, 12, 22].forEach(x => { basa(x, 25); basa(x, -25); });

  /* ---------------- Mobiliario del Lugar Santo ---------------- */
  const holy = group('santo');
  function lampstand(x, z) {
    const g = new THREE.Group(); g.position.set(x, 0, z); holy.add(g);
    cyl(0.35, 0.5, 0.2, M.gold, 0, 0.2, 0, g, 24);
    cyl(0.06, 0.07, 2.45, M.gold, 0, 1.45, 0, g, 12);
    const xs = [0];
    [0.35, 0.7, 1.05].forEach(r => { mesh(new THREE.TorusGeometry(r, 0.045, 8, 36, Math.PI), M.gold, 0, 2.67, 0, g).rotation.z = Math.PI; xs.push(-r, r); });
    xs.forEach(lx => cyl(0.09, 0.05, 0.12, M.gold, lx, 2.73, 0, g, 12));
    return xs.map(lx => new THREE.Vector3(x + lx, 2.9, z));
  }
  function goldTable(x, z) {
    const g = new THREE.Group(); g.position.set(x, 0, z); holy.add(g);
    box(2, 0.08, 1, M.gold, 0, 1.5, 0, g);
    box(1.86, 0.12, 0.86, M.gold, 0, 1.33, 0, g);
    [[-0.9, -0.4], [-0.9, 0.4], [0.9, -0.4], [0.9, 0.4]].forEach(([a, b]) => cyl(0.05, 0.05, 1.42, M.gold, a, 0.8, b, g, 10));
    const loaf = new THREE.CylinderGeometry(0.32, 0.34, 0.1, 18);
    [-0.5, 0.5].forEach(lx => { for (let k = 0; k < 6; k++) mesh(loaf, M.bread, lx, 1.6 + k * 0.105, 0, g).scale.set(1, 1, 0.8); });
  }
  const flamePts = [];
  [-14, -7, 0, 7, 14].forEach(x => { flamePts.push(...lampstand(x, 8), ...lampstand(x, -8)); });
  [-10.5, -3.5, 3.5, 10.5, 17].forEach(x => { goldTable(x, 4.8); goldTable(x, -4.8); });
  // altar de oro, delante del Lugar Santísimo
  box(1, 2, 1, M.gold, -17, 1.1, 0, holy);
  box(1.08, 0.08, 1.08, M.gold, -17, 2.06, 0, holy);
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => mesh(new THREE.ConeGeometry(0.08, 0.22, 6), M.gold, -17 + a * 0.42, 2.21, b * 0.42, holy));

  /* ---------------- Querubines y arca ---------------- */
  const cherubs = group('querubines');
  function bigCherub(zc) {
    const g = new THREE.Group(); g.position.set(-30, 0.12, zc); cherubs.add(g);
    cyl(0.55, 1.5, 6.4, M.gold, 0, 3.2, 0, g, 24);                 // cuerpo como túnica
    cyl(0.75, 0.6, 1.4, M.gold, 0, 7.0, 0, g, 20);                 // torso
    mesh(new THREE.SphereGeometry(0.8, 20, 14), M.gold, 0.2, 8.4, 0, g);   // cabeza, rostro hacia la casa (oriente)
    // alas de 5 codos, extendidas a lo largo del eje norte–sur, algo alzadas hacia la punta
    [-1, 1].forEach(s => {
      const pivot = new THREE.Group();
      pivot.position.set(-0.1, 7.6, s * 0.6);
      pivot.rotation.x = -s * 0.12;
      g.add(pivot);
      box(1.7, 0.18, 4.5, M.gold, 0, 0, s * 2.25, pivot);
      box(1.3, 0.14, 3.6, M.gold, -0.15, -0.45, s * 1.95, pivot);
      box(0.9, 0.12, 2.6, M.gold, -0.3, -0.85, s * 1.5, pivot);
    });
  }
  bigCherub(-5); bigCherub(5);
  const ark = new THREE.Group(); ark.position.set(-30, 0.12, 0); cherubs.add(ark);
  box(2.5, 1.5, 1.5, M.gold, 0, 0.8, 0, ark);
  box(2.56, 0.12, 1.56, M.gold, 0, 1.5, 0, ark);
  box(2.5, 0.1, 1.5, M.gold, 0, 1.6, 0, ark);
  [-1, 1].forEach(s => { cyl(0.07, 0.07, 9, M.gold, 2.4, 0.35, s * 0.86, ark, 10).rotation.z = Math.PI / 2; });

  /* ---------------- Etiquetas ---------------- */
  const labels = [];
  function cssVar(name, fb) { return getComputedStyle(root).getPropertyValue(name).trim() || fb; }
  function drawLabel(L) {
    const ink = cssVar('--ink', '#1f2430'), bg = cssVar('--bg', '#fafaf8'), line = cssVar('--line', '#e4e4df'), muted = cssVar('--muted', '#6b7080');
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
    g.globalAlpha = 1; g.lineWidth = 2; g.strokeStyle = line; g.stroke();
    g.textBaseline = 'top';
    g.font = f1; g.fillStyle = ink; g.fillText(L.text, pad, pad + 2);
    if (L.sub) { g.font = f2; g.fillStyle = muted; g.fillText(L.sub, pad, pad + fs + gap); }
    L.tex.needsUpdate = true;
    L.sprite.scale.set(L.h * W / H, L.h, 1);
  }
  function label(text, sub, h, x, y, z, parent) {
    const cv = document.createElement('canvas');
    const tex = new THREE.CanvasTexture(cv);
    tex.minFilter = THREE.LinearFilter;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false, transparent: true, fog: false }));
    sprite.renderOrder = 20; sprite.center.set(0.5, 0); sprite.position.set(x, y, z);
    (parent || scene).add(sprite);
    const L = { canvas: cv, tex, sprite, text, sub, h };
    labels.push(L); drawLabel(L);
    return L;
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => labels.forEach(drawLabel));

  /* ---------------- Escala ---------------- */
  const skinMat = std({ color: 0xb98a64, metalness: 0, roughness: 0.8 });
  function person(parent, x, z) {
    const g = new THREE.Group(); g.position.set(x, 0, z);
    const robe = std({ color: 0x7d7466, metalness: 0, roughness: 0.9 });
    mesh(new THREE.CylinderGeometry(0.3, 0.5, 3.0, 16), robe, 0, 1.5, 0, g);
    mesh(new THREE.SphereGeometry(0.34, 16, 10), robe, 0, 3.0, 0, g).scale.set(1, 0.5, 1);
    mesh(new THREE.SphereGeometry(0.3, 16, 12), skinMat, 0, 3.42, 0, g);
    return add(g, parent);
  }
  const scaleGroup = new THREE.Group(); scaleGroup.visible = false; add(scaleGroup);
  const dimMat = new THREE.LineBasicMaterial({ color: 0x9e2b25 });
  function dimLine(a, b, tick, text, sub, at, h) {
    const k = 1.4, pts = [...a, ...b];
    [a, b].forEach(p => pts.push(p[0] - tick[0] * k, p[1] - tick[1] * k, p[2] - tick[2] * k, p[0] + tick[0] * k, p[1] + tick[1] * k, p[2] + tick[2] * k));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    scaleGroup.add(new THREE.LineSegments(g, dimMat));
    label(text, sub, h || 3, at[0], at[1], at[2], scaleGroup);
  }
  dimLine([-40, 0.3, -22], [20, 0.3, -22], [0, 0, 1], '60 codos (interior)', '≈ 27 m', [-10, 0.6, -22], 3.6);
  dimLine([33.5, 31.8, -10], [33.5, 31.8, 10], [1, 0, 0], '20 codos', '≈ 9 m', [33.5, 32.4, 0]);
  dimLine([34, 0, -14], [34, 30, -14], [1, 0, 0], '30 codos', '≈ 13,5 m', [34, 31, -14]);
  dimLine([40.5, 0, -10.5], [40.5, 23, -10.5], [1, 0, 0], '18 + 5 codos', '≈ 10,4 m', [40.5, 24, -10.5]);
  dimLine([52, 10.4, -11], [72, 10.4, -11], [0, 1, 0], '20 codos', '≈ 9 m', [62, 11.4, -11]);
  dimLine([37, 9.4, 28], [47, 9.4, 28], [0, 1, 0], '10 codos', '≈ 4,5 m', [42, 10.4, 28], 2.4);
  [[40, -2, 'Persona de 1,70 m'], [49.5, 12], [28, -6], [4, 0], [-26, -8.5]].forEach(([x, z, t]) => {
    person(scaleGroup, x, z);
    if (t) label(t, '≈ 3,8 codos', 1.6, x, 4.3, z, scaleGroup);
  });

  /* ---------------- Comparación con el tabernáculo ---------------- */
  const tabGroup = new THREE.Group(); tabGroup.visible = false; add(tabGroup);
  const cmpEdge = new THREE.LineBasicMaterial({ color: 0x9e2b25, depthTest: false, transparent: true });
  const cmpFill = new THREE.MeshBasicMaterial({ color: 0x9e2b25, transparent: true, opacity: 0.12, depthTest: false, depthWrite: false });
  function ghost(x0, x1, y0, y1, z0, z1) {
    const geo = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
    const m = new THREE.Mesh(geo, cmpFill); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); m.renderOrder = 15;
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), cmpEdge); e.position.copy(m.position); e.renderOrder = 16;
    tabGroup.add(m, e);
  }
  // Lugar Santísimo de ambos alineados: tienda de 30 × 10 × 10, con su cubo de 10 al occidente
  ghost(-35, -5, 0.2, 10.2, -5, 5);
  ghost(-35, -25, 0.2, 10.2, -5, 5);
  {
    const g = new THREE.BufferGeometry();
    const y = 0.35, x0 = -50, x1 = 50, z0 = -25, z1 = 25;
    g.setAttribute('position', new THREE.Float32BufferAttribute([x0, y, z0, x1, y, z0, x1, y, z1, x0, y, z1], 3));
    const loop = new THREE.LineLoop(g, cmpEdge); loop.renderOrder = 16; tabGroup.add(loop);
  }
  label('Tienda del tabernáculo', '30 × 10 × 10 codos', 4, -20, 11, 0, tabGroup);
  label('Atrio del tabernáculo', '100 × 50 codos', 4.5, -30, 0.8, 25, tabGroup);

  /* ---------------- Fuego, lámparas y nube ---------------- */
  const FIRE = [new THREE.Color(0xffd27a), new THREE.Color(0xff6a2a), new THREE.Color(0xa8261a)];
  const altarFire = [];
  for (let i = 0; i < 60; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffb04a }));
    s.userData = { a: rnd() * Math.PI * 2, r: rnd(), y: rnd(), spd: 0.6 + rnd() };
    altarFire.push(add(s, altar));
  }
  const flames = flamePts.map(p => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffcf70 }));
    s.position.copy(p); s.scale.setScalar(0.3); s.userData.ph = rnd() * 10;
    return add(s);
  });
  const glory = [];
  for (let i = 0; i < 170; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, opacity: 0 }));
    s.visible = false;
    s.userData = { x: -48 + rnd() * 84, z: (rnd() - 0.5) * 34, y: rnd(), spd: 0.4 + rnd(), size: rnd(), ph: rnd() * 6 };
    glory.push(add(s));
  }
  let gloryOn = false, gloryAmt = 0, burnBoost = 1, burnTarget = 1;

  /* ---------------- Luces ---------------- */
  const hemi = add(new THREE.HemisphereLight(0xfffaf0, 0x8a7658, 0.42));
  const sun = new THREE.DirectionalLight(0xfff0d4, 0.8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -130, right: 130, top: 100, bottom: -100, near: 1, far: 420 });
  sun.shadow.bias = -0.0004;
  add(sun); add(sun.target);
  const altarLight = add(new THREE.PointLight(0xff9a4a, 0.6, 60)); altarLight.position.set(62, 14, 0);
  const holyLight = add(new THREE.PointLight(0xffc877, 0, 60)); holyLight.position.set(0, 22, 0);

  /* ---------------- Anillo de selección ---------------- */
  const ringMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide });
  const ring = add(new THREE.Mesh(new THREE.RingGeometry(0.95, 1, 96), ringMat));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.2; ring.visible = false;

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
    scene.fog = new THREE.Fog(bg, night ? 220 : 320, night ? 900 : 1100);
    [ringMat, dimMat, cmpEdge, cmpFill].forEach(m => m.color.set(accent));
    if (night) {
      hemi.color.set(0x34425f); hemi.groundColor.set(0x16130f); hemi.intensity = 0.55;
      sun.color.set(0xa3b6dc); sun.intensity = 0.3; sun.position.set(-60, 120, -80);
    } else {
      hemi.color.set(0xfffaf0); hemi.groundColor.set(0x8a7658); hemi.intensity = 0.42;
      sun.color.set(0xfff0d4); sun.intensity = 0.8; sun.position.set(80, 140, 60);
    }
    holyLight.intensity = night ? 0.9 : 0;
    stars.visible = night;
    stdMats.forEach(m => { const base = m.metalness > 0.5 ? 1 : 0.25; m.envMapIntensity = base * (night ? 0.3 : 1); });
    glory.forEach(s => { s.material.blending = night ? THREE.AdditiveBlending : THREE.NormalBlending; s.material.needsUpdate = true; });
    labels.forEach(drawLabel);
    themeBtn.textContent = night ? 'Ver de día' : 'Ver de noche';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', bg);
  }
  themeBtn.addEventListener('click', () => { userChoseTheme = true; applyTheme(!night); });
  const onScheme = e => { if (!userChoseTheme) applyTheme(e.matches); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);

  /* ---------------- Interruptores ---------------- */
  const roofBtn = document.getElementById('t-roof');
  function setRoof(on) { roof.visible = on; roofBtn.setAttribute('aria-pressed', String(on)); }
  roofBtn.addEventListener('click', () => setRoof(!roof.visible));
  const scaleBtn = document.getElementById('t-scale');
  scaleBtn.addEventListener('click', () => { scaleGroup.visible = !scaleGroup.visible; scaleBtn.setAttribute('aria-pressed', String(scaleGroup.visible)); });
  const tabBtn = document.getElementById('t-tab');
  tabBtn.addEventListener('click', () => {
    tabGroup.visible = !tabGroup.visible;
    tabBtn.setAttribute('aria-pressed', String(tabGroup.visible));
    if (tabGroup.visible) { setRoof(false); flyTo({ t: [-10, 4, 0], p: [25, 135, 85] }); }
  });

  /* ---------------- UI: lista y ficha ---------------- */
  const list = document.getElementById('stations');
  list.innerHTML = STATIONS.map(s => `<li><button class="st" type="button" data-id="${s.id}">
      <span class="st-num">${s.num ?? ''}</span>
      <span class="st-name">${s.short || s.n}</span>
      <span class="st-ref">${s.ref}</span>
    </button></li>`).join('');
  list.addEventListener('click', e => { const b = e.target.closest('.st'); if (b) select(b.dataset.id); });
  const dTitle = document.getElementById('d-title'), dRef = document.getElementById('d-ref'), dRows = document.getElementById('d-rows');
  const dDesc = document.getElementById('d-desc'), dPos = document.getElementById('d-pos');
  const prevBtn = document.getElementById('prev'), nextBtn = document.getElementById('next');
  const NUMBERED = STATIONS.filter(s => s.num).length;
  let current = 0;
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  document.getElementById('t-home').addEventListener('click', () => select('general'));
  function step(d) { const i = Math.max(0, Math.min(STATIONS.length - 1, current + d)); if (i !== current) select(STATIONS[i].id); }
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, canvas')) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  function select(id, instant) {
    const i = BY_ID[id];
    if (i === undefined) return;
    current = i;
    const s = STATIONS[i];
    list.querySelectorAll('.st').forEach(b => b.setAttribute('aria-current', String(b.dataset.id === id)));
    dTitle.textContent = s.n;
    dRef.textContent = s.ref;
    dRows.innerHTML = s.rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    dDesc.textContent = s.desc;
    dPos.textContent = s.num ? `${s.num} de ${NUMBERED}` : '';
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === STATIONS.length - 1;
    if (s.roof === true) setRoof(true);
    if (s.roof === false) setRoof(false);
    if (s.ring) { ring.visible = true; ring.position.set(s.ring[0], 0.2, s.ring[1]); ring.scale.setScalar(s.ring[2]); }
    else ring.visible = false;
    gloryOn = id === 'dedicacion';
    burnTarget = gloryOn ? 2.4 : 1;
    flyTo(s.view, instant);
  }

  /* ---------------- Cámara ---------------- */
  let flight = null;
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function flyTo(v, instant) {
    const p1 = new THREE.Vector3(...v.p), t1 = new THREE.Vector3(...v.t);
    if (instant || reduceMotion) { camera.position.copy(p1); controls.target.copy(t1); flight = null; return; }
    const dist = camera.position.distanceTo(p1);
    flight = { p0: camera.position.clone(), t0: controls.target.clone(), p1, t1, start: performance.now(), dur: Math.min(2400, 900 + dist * 6) };
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
    if (moved < 6) { const id = pickAt(e); if (id) select(id); }
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
    if (getComputedStyle(detailEl).position === 'absolute') {
      const dx = Math.min(w * 0.22, (detailEl.offsetWidth + 20) / 2);
      camera.setViewOffset(w, h, -dx, Math.min(60, h * 0.07), w, h);
    } else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  new ResizeObserver(resize).observe(detailEl);
  resize();

  /* ---------------- Animación ---------------- */
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const GLORY_DAY = new THREE.Color(0xd6dae0), GLORY_NIGHT = new THREE.Color(0xffe2a6);
  function updateEffects(dt, fxDt, t) {
    burnBoost += (burnTarget - burnBoost) * Math.min(1, fxDt * 2);
    for (const s of altarFire) {
      const u = s.userData;
      u.y += dt * (0.5 + 0.4 * u.spd);
      if (u.y > 1) { u.y -= 1; u.a = rnd() * Math.PI * 2; u.r = rnd(); }
      const rad = 7.5 * Math.sqrt(u.r) * (1 - u.y * 0.5);
      s.position.set(Math.cos(u.a) * rad, 10.2 + u.y * 4.5 * burnBoost, Math.sin(u.a) * rad);
      s.material.color.copy(FIRE[0]).lerp(FIRE[1], Math.min(1, u.y * 1.4));
      s.material.opacity = (night ? 0.9 : 0.75) * (1 - u.y) * smooth(0, 0.08, u.y);
      s.scale.setScalar((2.4 + u.spd) * (1 - u.y * 0.5) * (0.6 + 0.4 * burnBoost));
    }
    flames.forEach(s => s.scale.setScalar(0.28 + 0.05 * Math.sin(t * 11 + s.userData.ph)));
    altarLight.intensity = (night ? 2.2 : 0.6) * burnBoost * (0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3));

    gloryAmt += ((gloryOn ? 1 : 0) - gloryAmt) * Math.min(1, fxDt * 1.2);
    const showGlory = gloryAmt > 0.01;
    for (const s of glory) {
      s.visible = showGlory;
      if (!showGlory) continue;
      const u = s.userData;
      u.y += dt * 0.015 * u.spd;
      if (u.y > 1) u.y -= 1;
      s.position.set(u.x + Math.sin(t * 0.2 + u.ph) * 2, 2 + u.y * 40, u.z + Math.cos(t * 0.17 + u.ph) * 2);
      s.material.color.copy(night ? GLORY_NIGHT : GLORY_DAY);
      s.material.opacity = gloryAmt * (night ? 0.35 : 0.7) * smooth(0, 0.1, u.y) * (1 - smooth(0.8, 1, u.y));
      s.scale.setScalar(10 + u.size * 12);
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
    updateEffects(dt, realDt, t);
    if (ring.visible) ringMat.opacity = reduceMotion ? 0.9 : 0.65 + 0.3 * Math.sin(now / 350);
    controls.update();
    const az = controls.getAzimuthalAngle();
    if (az !== lastAz) { needle.setAttribute('transform', `rotate(${(az * 180 / Math.PI).toFixed(1)} 22 22)`); lastAz = az; }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  applyTheme(night);
  select('general');
  window.fypReset = () => select('general');
  requestAnimationFrame(frame);
})();
