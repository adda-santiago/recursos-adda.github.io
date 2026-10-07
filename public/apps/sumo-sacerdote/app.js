/* ==========================================================
   Recursos Bíblicos — El sumo sacerdote (three.js r128)
   Unidad de la escena: 1 = 1 codo (≈ 45 cm).
   Ejes: +y arriba; la figura mira hacia +z.
   Figura de Aarón: anciano y con barba (Éx 7:7; Sal 133:2); el rostro es una representación.
   El contenido está en data.js.
   ========================================================== */
(() => {
  'use strict';

  const { STATIONS } = window.SACERDOTE_DATA;
  const BY_ID = Object.fromEntries(STATIONS.map((s, i) => [s.id, i]));

  /* Orden de vestido (Lv 8:7-9, con los calzoncillos primero por ser la capa interior) */
  const ORDER = ['panetes', 'tunica', 'cinto', 'manto', 'efod', 'oniquinas', 'racional', 'mitra', 'plancha'];
  const LINO_SET = ['panetes', 'tunica', 'cintoLino', 'mitra'];
  /* Prendas tapadas por otra: su nombre no se muestra si la otra está puesta */
  const COVERED_BY = { panetes: 'tunica', cinto: 'manto' };
  const NAMES = {
    panetes: 'Calzoncillos', tunica: 'Túnica', cinto: 'Cinto', cintoLino: 'Cinto de lino', manto: 'Manto',
    efod: 'Efod', oniquinas: 'Piedras memoriales', racional: 'Pectoral', mitra: 'Mitra', plancha: 'Lámina de oro'
  };
  const STATION_OF = { cintoLino: 'lino' };

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
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 200);
  camera.position.set(3.4, 2.7, 7.6);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.8;
  controls.maxDistance = 16;
  controls.maxPolarAngle = Math.PI * 0.62;
  controls.autoRotateSpeed = 1.4;
  controls.target.set(0, 1.95, 0);

  /* ---------------- Colores (codifican materiales: Éx 28:5) ---------------- */
  const COL = {
    lino: 0xece6d6, azul: 0x2f5597, purpura: 0x6e2a6e, carmesi: 0xb02232, oro: 0xd2a93c,
    cuerpo: 0xb3b0aa, onice: 0x2f3330
  };
  const LEGEND = [['lino', 'Lino'], ['azul', 'Azul'], ['purpura', 'Púrpura'], ['carmesi', 'Carmesí'], ['oro', 'Oro']];
  const hex = c => '#' + c.toString(16).padStart(6, '0');

  /* ---------------- Texturas generadas ---------------- */
  function canvasTex(w, h, draw, rx, ry) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rx || 1, ry || 1);
    t.anisotropy = 4;
    return t;
  }
  function threads(g, w, h, a) {
    for (let y = 0; y < h; y += 2) { g.fillStyle = `rgba(0,0,0,${a * (0.5 + Math.random() * 0.5)})`; g.fillRect(0, y, w, 1); }
    for (let x = 0; x < w; x += 2) { g.fillStyle = `rgba(255,255,255,${a * Math.random()})`; g.fillRect(x, 0, 1, h); }
  }
  const TEX = {
    lino: canvasTex(128, 128, (g, w, h) => { g.fillStyle = hex(COL.lino); g.fillRect(0, 0, w, h); threads(g, w, h, 0.05); }, 6, 6),
    labrada: canvasTex(128, 128, (g, w, h) => {
      g.fillStyle = hex(COL.lino); g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(120,105,80,0.16)'; g.lineWidth = 2;
      for (let i = -h; i < w; i += 16) {
        g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke();
        g.beginPath(); g.moveTo(i + h, 0); g.lineTo(i, h); g.stroke();
      }
      threads(g, w, h, 0.04);
    }, 10, 8),
    manto: canvasTex(128, 128, (g, w, h) => { g.fillStyle = hex(COL.azul); g.fillRect(0, 0, w, h); threads(g, w, h, 0.07); }, 8, 6),
    /* Tejido del efod: hilos de oro entre jacinto, púrpura, carmesí y lino (Éx 39:3) */
    tejido: canvasTex(96, 96, (g, w, h) => {
      const warp = [COL.azul, COL.oro, COL.purpura, COL.oro, COL.carmesi, COL.oro, COL.lino, COL.oro];
      const tw = w / warp.length;
      warp.forEach((c, i) => { g.fillStyle = hex(c); g.fillRect(i * tw, 0, tw, h); });
      for (let y = 0; y < h; y += 6) { g.fillStyle = hex(COL.oro); g.fillRect(0, y, w, 3); }
      g.fillStyle = 'rgba(255,240,190,0.18)';
      for (let y = 0; y < h; y += 6) g.fillRect(0, y, w, 1);
    }, 7, 5),
    recamado: canvasTex(128, 64, (g, w, h) => {
      const seq = [COL.azul, COL.lino, COL.purpura, COL.lino, COL.carmesi, COL.lino];
      const bh = h / seq.length;
      seq.forEach((c, i) => { g.fillStyle = hex(c); g.fillRect(0, i * bh, w, bh + 1); });
      g.strokeStyle = 'rgba(255,255,255,0.25)'; g.lineWidth = 2;
      for (let x = 0; x < w; x += 12) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 6, h / 2); g.lineTo(x, h); g.stroke(); }
      threads(g, w, h, 0.05);
    }, 10, 1)
  };

  /* ---------------- Materiales por prenda (para resaltar o atenuar) ---------------- */
  const GROUPS = {};            // id → THREE.Group
  const MATS = { cuerpo: [] };  // id → materiales
  function mat(owner, opts) {
    const m = new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.85, metalness: 0, side: THREE.DoubleSide }, opts));
    m.userData.base = m.color.clone();
    m.userData.f = 1; m.userData.target = 1;
    (MATS[owner] = MATS[owner] || []).push(m);
    return m;
  }
  const goldOpts = { color: COL.oro, roughness: 0.32, metalness: 0.55, emissive: 0x3a2a00, emissiveIntensity: 0.35 };

  /* ---------------- Geometrías auxiliares ---------------- */
  const pickables = [];
  function tag(m, station) { m.userData.station = station; pickables.push(m); return m; }
  function add(geo, material, parent, pos) {
    const m = new THREE.Mesh(geo, material);
    if (pos) m.position.copy(pos);
    parent.add(m);
    return m;
  }
  /* Superficie de revolución con sección elíptica: pts [[radio, y]], depth = escala en z */
  function shell(pts, depth, opts) {
    const o = opts || {};
    const geo = new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), o.seg || 56, o.phi0 || 0, o.phiLen || Math.PI * 2);
    geo.scale(1, 1, depth);
    geo.computeVertexNormals();
    return geo;
  }
  /* Cilindro entre dos puntos */
  function limb(a, b, r1, r2, material, parent, seg) {
    const len = a.distanceTo(b);
    const geo = new THREE.CylinderGeometry(r2, r1, len, seg || 18, 1, true);
    const m = new THREE.Mesh(geo, material);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(V3(0, 1, 0), b.clone().sub(a).normalize());
    parent.add(m);
    return m;
  }
  function tube(points, r, material, parent) {
    const curve = new THREE.CatmullRomCurve3(points);
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, r, 8, false), material);
    parent.add(m);
    return m;
  }
  function group(id) {
    const g = new THREE.Group();
    g.userData.id = id;
    fig.add(g);
    GROUPS[id] = g;
    return g;
  }

  const fig = new THREE.Group();
  scene.add(fig);

  /* ---------------- Figura: Aarón (≈ 3,8 codos) ----------------
     El texto no describe su rostro. Se representa con lo que sí dice:
     un hombre de edad avanzada (Éx 7:7) con barba (Sal 133:2).
     Coordenadas: +z al frente; las manos y pies se modelan para el lado
     izquierdo y se reflejan para el derecho. */
  const SH_L = V3(-0.43, 3.04, 0), SH_R = V3(0.43, 3.04, 0);
  const EL_L = V3(-0.56, 2.42, -0.02), EL_R = V3(0.56, 2.42, -0.02);
  const WR_L = V3(-0.62, 1.86, 0.06), WR_R = V3(0.62, 1.86, 0.06);
  const HEAD = V3(0, 3.55, 0.01), HEAD_S = V3(0.175, 0.25, 0.215);
  const TORSO = [[0.001, 1.86], [0.27, 1.9], [0.34, 2.02], [0.355, 2.16], [0.345, 2.3], [0.35, 2.45], [0.37, 2.65], [0.395, 2.85], [0.41, 2.98], [0.40, 3.06], [0.33, 3.14], [0.18, 3.2], [0.1, 3.24], [0.001, 3.25]];
  const SKIN = 0xa97e5c, HAIR = 0xd8d3cb;
  const mSkin = mat('cuerpo', { color: SKIN, roughness: 0.62, side: THREE.FrontSide });
  const mSkinV = mat('cuerpo', { color: 0xffffff, roughness: 0.62, vertexColors: true, side: THREE.FrontSide });
  const mHair = mat('cuerpo', { color: HAIR, roughness: 0.9 });
  const mHairV = mat('cuerpo', { color: 0xffffff, roughness: 0.9 });
  const mEye = mat('cuerpo', { color: 0xcfc4b4, roughness: 0.25, side: THREE.FrontSide });
  const mIris = mat('cuerpo', { color: 0x3a2618, roughness: 0.2, side: THREE.FrontSide });
  const mNail = mat('cuerpo', { color: 0xc9a58c, roughness: 0.35, side: THREE.FrontSide });
  const gauss = (d2, s2) => Math.exp(-d2 / s2);

  /* Superficie de revolución orientada entre dos puntos: prof = [[t 0..1, radio]] */
  function organic(a, b, prof, material, parent, depth) {
    const len = a.distanceTo(b);
    const pts = prof.map(([t, r]) => new THREE.Vector2(r, t * len));
    const geo = new THREE.LatheGeometry(pts, 28);
    if (depth) geo.scale(1, 1, depth);
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, material);
    m.position.copy(a);
    m.quaternion.setFromUnitVectors(V3(0, 1, 0), b.clone().sub(a).normalize());
    parent.add(m);
    return m;
  }
  /* Esfera deformada por una función (x, y, z) unitarios → [x, y, z] */
  function sculpt(fn, ws, hs) {
    const geo = new THREE.SphereGeometry(1, ws || 64, hs || 48);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const r = fn(p.getX(i), p.getY(i), p.getZ(i));
      p.setXYZ(i, r[0], r[1], r[2]);
    }
    geo.computeVertexNormals();
    return geo;
  }
  /* Hebras (barba y cabello) como conos instanciados: raíz, dirección y largo */
  const strandGeo = new THREE.ConeGeometry(1, 1, 5, 1, true);
  strandGeo.rotateX(Math.PI);           // punta hacia -y
  strandGeo.translate(0, -0.5, 0);      // la base queda en el origen
  function strands(list, width, parent) {
    const im = new THREE.InstancedMesh(strandGeo, mHairV, list.length);
    const q = new THREE.Quaternion(), sc = new THREE.Vector3(), mx = new THREE.Matrix4(), c = new THREE.Color();
    list.forEach((s, i) => {
      q.setFromUnitVectors(V3(0, -1, 0), s.dir.clone().normalize());
      sc.set(width * (0.7 + Math.random() * 0.6), s.len, width * (0.7 + Math.random() * 0.6));
      mx.compose(s.root, q, sc);
      im.setMatrixAt(i, mx);
      c.setHex(HAIR).multiplyScalar(0.72 + Math.random() * 0.34);
      im.setColorAt(i, c);
    });
    parent.add(im);
    return im;
  }
  /* Forma de la cabeza (esfera unitaria; z al frente) */
  function headShape(x, y, z) {
    const f = Math.max(0, z), f3 = f * f * f;
    if (y < 0) x *= 1 - 0.22 * Math.pow(-y, 1.5);                         // mandíbula más angosta
    z += 0.12 * gauss((y + 0.72) ** 2, 0.03) * f * f;                      // mentón
    z += 0.07 * gauss((y - 0.18) ** 2, 0.006) * f3 * (Math.abs(x) < 0.7 ? 1 : 0); // arco superciliar
    z -= 0.05 * gauss((y - 0.1) ** 2, 0.09) * Math.max(0, -z);             // nuca
    [-1, 1].forEach(s => {
      z -= 0.09 * gauss((x - s * 0.36) ** 2 + (y - 0.02) ** 2, 0.02) * f;   // cuencas de los ojos
      const k = 0.05 * gauss((x - s * 0.55) ** 2 + (y + 0.15) ** 2, 0.03) * f; // pómulos
      x += s * k; z += k * 0.5;
    });
    z += 0.04 * gauss(x * x, 0.015) * gauss((y + 0.1) ** 2, 0.06) * f;    // dorso de la nariz
    return [x, y, z];
  }
  const toWorld = (u) => V3(u[0] * HEAD_S.x + HEAD.x, u[1] * HEAD_S.y + HEAD.y, u[2] * HEAD_S.z + HEAD.z);
  /* Punto de la superficie del rostro (x, y unitarios) desplazado d codos hacia afuera */
  const face = (x, y, d) => { const u = headShape(x, y, Math.sqrt(Math.max(0, 1 - x * x - y * y))); return toWorld(u).add(V3(0, 0, d || 0)); };
  const beardLine = (z) => -0.3 - 0.16 * Math.max(0, z) ** 2;
  const body = new THREE.Group();
  fig.add(body);
  {
    /* Torso de un hombre mayor, con leve abdomen */
    const torso = shell(TORSO, 0.6);
    const tp = torso.attributes.position;
    for (let i = 0; i < tp.count; i++) {
      const y = tp.getY(i), z = tp.getZ(i);
      if (z > 0) tp.setZ(i, z + 0.035 * gauss((y - 2.2) ** 2, 0.02) * (z / 0.21));
    }
    torso.computeVertexNormals();
    add(torso, mSkin, body);
    organic(V3(0, 3.16, -0.01), V3(0, 3.42, 0.0), [[0, 0.115], [0.5, 0.1], [1, 0.1]], mSkin, body);

    /* Cabeza con color de piel y zona de barba */
    const hg = sculpt(headShape);
    const hp = hg.attributes.position, cols = [];
    const skin = new THREE.Color(SKIN), hair = new THREE.Color(HAIR), tmp = new THREE.Color();
    for (let i = 0; i < hp.count; i++) {
      const x = hp.getX(i), y = hp.getY(i), z = hp.getZ(i);
      const bl = beardLine(z);
      const beard = Math.max(y < bl && z > -0.35 ? Math.min(1, (bl - y) / 0.08) : 0, y > 0.3 || (z < -0.2 && y > -0.35) ? 1 : 0);
      const shade = 1 - 0.18 * gauss((y - 0.05) ** 2, 0.02) * Math.max(0, z);
      tmp.copy(skin).multiplyScalar(shade).lerp(hair, beard);
      cols.push(tmp.r, tmp.g, tmp.b);
    }
    hg.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    const head = add(hg, mSkinV, body, HEAD);
    head.scale.copy(HEAD_S);

    /* Ojos con párpado superior caído, cejas y nariz */
    [-1, 1].forEach(s => {
      const c = face(s * 0.36, 0.02, -0.012);
      add(new THREE.SphereGeometry(0.024, 20, 14), mEye, body, c);
      const iris = add(new THREE.SphereGeometry(0.0125, 14, 10), mIris, body, c.clone().add(V3(0, 0, 0.018)));
      iris.scale.set(1, 1, 0.5);
      const lid = add(new THREE.SphereGeometry(0.0262, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.4), mSkin, body, c);
      lid.rotation.x = 0.16;
      add(new THREE.SphereGeometry(0.0055, 10, 8), mIris, body, c.clone().add(V3(0, 0, 0.0245)));
      const lid2 = add(new THREE.SphereGeometry(0.0258, 20, 8, 0, Math.PI * 2, Math.PI * 0.74, Math.PI * 0.26), mSkin, body, c);
      lid2.rotation.x = -0.1;
      const brow = [];
      for (let i = 0; i < 40; i++) { const t = Math.random(); brow.push({ root: face(s * (0.12 + t * 0.48), 0.16 + 0.05 * Math.sin(t * Math.PI), 0.004), dir: V3(s * 1, 0.25 - Math.random() * 0.6, 0.5), len: 0.02 + Math.random() * 0.015 }); }
      strands(brow, 0.0045, body);
      const ear = add(new THREE.SphereGeometry(1, 18, 14), mSkin, body, V3(s * 0.172, 3.545, -0.015));
      ear.scale.set(0.014, 0.05, 0.032);
      ear.rotation.y = s * 0.35;
    });
    const nose = add(new THREE.SphereGeometry(1, 20, 16), mSkin, body, face(0, -0.14, 0.006));
    nose.scale.set(0.02, 0.06, 0.026);
    nose.rotation.x = -0.4;
    add(new THREE.SphereGeometry(0.02, 16, 12), mSkin, body, face(0, -0.33, 0.026));
    [-1, 1].forEach(s => { const w = add(new THREE.SphereGeometry(1, 14, 10), mSkin, body, face(s * 0.1, -0.35, 0.012)); w.scale.set(0.011, 0.012, 0.015); });

    /* Bigote y barba larga (Sal 133:2) */
    const lip = add(new THREE.SphereGeometry(1, 20, 12), mHair, body, face(0, -0.47, 0.0));
    lip.scale.set(0.07, 0.022, 0.018);
    const mList = [];
    for (let i = 0; i < 180; i++) {
      const s = Math.random() < 0.5 ? -1 : 1, t = Math.random();
      mList.push({ root: face(s * t * 0.42, -0.4 - t * 0.1, 0.008), dir: V3(s * (0.3 + t * 0.8), -1, 0.3), len: 0.035 + 0.06 * t });
    }
    strands(mList, 0.006, body);
    const beardMass = add(sculpt((x, y, z) => [x * (0.55 + 0.45 * (y + 1) / 2), y, z]), mHair, body, V3(0, 3.16, 0.25));
    beardMass.scale.set(0.12, 0.2, 0.075);
    beardMass.rotation.x = -0.5;
    const bList = [], hList = [];
    for (let i = 0; i < 520; i++) {
      const th = (Math.random() - 0.5) * 2.4, cz = Math.cos(th), bl = beardLine(cz), y = bl - Math.random() * (0.92 + bl);
      const rr = Math.sqrt(Math.max(0, 1 - y * y));
      const u = headShape(Math.sin(th) * rr, y, Math.cos(th) * rr);
      const root = toWorld(u);
      const chin = Math.cos(th) ** 2 * (0.4 + (-y));
      const len = 0.06 + 0.3 * chin + Math.random() * 0.05;
      bList.push({ root, dir: V3(Math.sin(th) * 0.25 + (Math.random() - 0.5) * 0.15, -1, 0.5 + Math.random() * 0.15), len });
    }
    strands(bList, 0.011, body);
    /* Cabello cano bajo la mitra, hacia la nuca */
    for (let i = 0; i < 300; i++) {
      const th = Math.PI * 0.45 + Math.random() * Math.PI * 1.1, y = -0.1 + Math.random() * 0.4;
      const rr = Math.sqrt(Math.max(0, 1 - y * y));
      const root = toWorld(headShape(Math.sin(th) * rr * 1.02, y, Math.cos(th) * rr * 1.02));
      hList.push({ root, dir: V3(Math.sin(th) * 0.2, -1, Math.cos(th) * 0.35), len: 0.12 + Math.random() * 0.12 });
    }
    strands(hList, 0.012, body);

    /* Brazos con codo */
    [-1, 1].forEach(s => {
      const sh = s < 0 ? SH_L : SH_R, el = s < 0 ? EL_L : EL_R, wr = s < 0 ? WR_L : WR_R;
      const delt = add(new THREE.SphereGeometry(0.095, 20, 14), mSkin, body, sh.clone().add(V3(s * 0.01, -0.02, 0)));
      delt.scale.set(1, 1.15, 1);
      organic(sh, el, [[0, 0.085], [0.35, 0.088], [0.75, 0.07], [1, 0.062]], mSkin, body);
      add(new THREE.SphereGeometry(0.062, 16, 12), mSkin, body, el);
      organic(el, wr, [[0, 0.062], [0.25, 0.066], [0.8, 0.05], [1, 0.044]], mSkin, body, 0.8);
    });

    /* Piernas: muslo, rodilla, pantorrilla y tobillo */
    [-1, 1].forEach(s => {
      const leg = add(new THREE.LatheGeometry([[0.001, 0.07], [0.048, 0.08], [0.052, 0.13], [0.058, 0.2], [0.068, 0.35], [0.098, 0.68], [0.104, 0.78], [0.09, 0.95], [0.093, 1.06], [0.1, 1.15], [0.135, 1.5], [0.16, 1.85], [0.15, 1.96]].map(([r, y]) => new THREE.Vector2(r, y)), 28), mSkin, body, V3(s * 0.165, 0, 0));
      leg.geometry.scale(1, 1, 0.92);
      leg.geometry.computeVertexNormals();
    });
  }

  /* Mano: palma, cuatro dedos de tres falanges, pulgar y uñas.
     Construida para la mano izquierda (palma hacia +x, pulgar al frente). */
  function hand(parent, wrist, mirror) {
    const g = new THREE.Group();
    g.position.copy(wrist);
    if (mirror) g.scale.x = -1;
    g.rotation.x = 0.12;
    parent.add(g);
    const palm = add(sculpt((x, y, z) => {
      const e = 0.6, sgn = v => Math.sign(v) * Math.pow(Math.abs(v), e);
      return [sgn(x) * (1 - 0.15 * (y + 1) / 2), sgn(y), sgn(z) * (0.8 + 0.2 * (1 - y) / 2)];
    }, 32, 24), mSkin, g, V3(0.005, -0.115, 0));
    palm.scale.set(0.034, 0.105, 0.085);
    const FINGERS = [[0.06, 0.165, 0.0205], [0.02, 0.185, 0.021], [-0.02, 0.172, 0.02], [-0.058, 0.138, 0.0175]];
    FINGERS.forEach(([zz, L, r], k) => {
      let p = V3(0.004, -0.205 + Math.abs(zz) * 0.25, zz * 0.95);
      let ang = 0.12 + k * 0.02;
      [0.45, 0.31, 0.24].forEach((frac, j) => {
        ang += [0.15, 0.3, 0.22][j];
        const d = V3(Math.sin(ang), -Math.cos(ang), -zz * 0.25).normalize();
        const q = p.clone().addScaledVector(d, L * frac);
        const rr = r * (1 - j * 0.1);
        organic(p, q, [[0, rr * 1.05], [0.5, rr * 0.95], [1, rr * 0.92]], mSkin, g);
        add(new THREE.SphereGeometry(rr * 1.02, 12, 10), mSkin, g, p);
        if (j === 2) {
          add(new THREE.SphereGeometry(rr * 0.92, 12, 10), mSkin, g, q);
          const nail = add(new THREE.SphereGeometry(1, 10, 8), mNail, g, p.clone().lerp(q, 0.62).add(V3(-rr * 0.75, 0, 0)));
          nail.scale.set(rr * 0.25, rr * 1.1, rr * 0.75);
        }
        p = q;
      });
    });
    /* Pulgar: eminencia tenar y dos falanges, hacia el frente */
    const th = add(new THREE.SphereGeometry(1, 16, 12), mSkin, g, V3(0.018, -0.07, 0.055));
    th.scale.set(0.03, 0.06, 0.035);
    let p = V3(0.02, -0.09, 0.075);
    [[0.09, 0.024], [0.068, 0.021]].forEach(([L, r], j) => {
      const d = V3(0.3 + j * 0.15, -0.75, 0.55 - j * 0.2).normalize();
      const q = p.clone().addScaledVector(d, L);
      organic(p, q, [[0, r], [0.6, r * 0.95], [1, r * 0.88]], mSkin, g);
      add(new THREE.SphereGeometry(r, 12, 10), mSkin, g, q);
      if (j === 1) {
        const nail = add(new THREE.SphereGeometry(1, 10, 8), mNail, g, p.clone().lerp(q, 0.6).add(V3(-0.012, 0, 0.01)));
        nail.scale.set(r * 0.3, r * 1.0, r * 0.75);
      }
      p = q;
    });
  }
  /* Pie descalzo: talón, arco, tobillos y cinco dedos con uñas.
     Construido para el pie izquierdo (dedo gordo hacia +x) */
  function foot(parent, ankle, mirror) {
    const g = new THREE.Group();
    g.position.copy(ankle);
    if (mirror) g.scale.x = -1;
    g.rotation.y = 0.12;
    parent.add(g);
    const sole = add(sculpt((x, y, z) => {
      const t = (z + 1) / 2;
      const w = 0.72 + 0.32 * Math.sin(Math.min(1, t / 0.85) * Math.PI / 2);
      const h = t < 0.35 ? 1 : 1 - 0.6 * (t - 0.35) / 0.65;
      x *= w;
      if (x > 0.2 && y < 0) y *= 0.35 + 0.45 * gauss((t - 0.5) ** 2, 0.04) * (x - 0.2);   // arco interno
      y = y > 0 ? y * h : y * 0.38;
      return [x, y, z];
    }, 40, 28), mSkin, g, V3(0, -0.105, 0.115));
    sole.scale.set(0.088, 0.082, 0.215);
    [-1, 1].forEach(s => add(new THREE.SphereGeometry(0.019, 12, 10), mSkin, g, V3(s * 0.034, 0.005, -0.008)));
    const TOES = [[0.056, 0.095, 0.03], [0.022, 0.078, 0.021], [-0.008, 0.07, 0.02], [-0.036, 0.06, 0.019], [-0.06, 0.05, 0.017]];
    TOES.forEach(([x, L, r], k) => {
      const z0 = 0.29 - Math.abs(x + 0.005) * 0.55 - k * 0.006;
      const a = V3(x, -0.098 + r * 0.2, z0), b = V3(x * 1.04, -0.112 + r * 0.25, z0 + L);
      organic(a, b, [[0, r], [0.55, r * 0.95], [1, r * 0.9]], mSkin, g, 0.85);
      add(new THREE.SphereGeometry(r * 0.92, 12, 10), mSkin, g, b).scale.set(1, 0.85, 1);
      const nail = add(new THREE.SphereGeometry(1, 10, 8), mNail, g, b.clone().add(V3(0, r * 0.62, -r * 0.35)));
      nail.scale.set(r * 0.75, r * 0.22, r * 0.85);
    });
  }
  hand(body, WR_L, false); hand(body, WR_R, true);
  foot(body, V3(-0.165, 0.13, 0.0), false); foot(body, V3(0.165, 0.13, 0.0), true);

  /* ---------------- 1. Pañetes ---------------- */
  {
    const g = group('panetes');
    const m = mat('panetes', { color: 0xffffff, map: TEX.lino });
    tag(add(shell([[0.36, 1.86], [0.37, 2.04], [0.35, 2.22], [0.355, 2.3], [0.335, 2.31]], 0.66), m, g), 'panetes');
    [-1, 1].forEach(s => tag(limb(V3(s * 0.17, 1.98, 0), V3(s * 0.168, 1.42, 0.005), 0.18, 0.165, m, g), 'panetes'));
  }

  /* ---------------- 2. Túnica ---------------- */
  const TUNICA = [[0.56, 0.13], [0.53, 0.6], [0.47, 1.4], [0.43, 2.0], [0.4, 2.34], [0.415, 2.62], [0.435, 2.9], [0.45, 3.04], [0.37, 3.15], [0.22, 3.22], [0.13, 3.27]];
  {
    const g = group('tunica');
    const m = mat('tunica', { color: 0xffffff, map: TEX.labrada });
    tag(add(shell(TUNICA, 0.66), m, g), 'tunica');
    [-1, 1].forEach(s => {
      const sh = s < 0 ? SH_L : SH_R, el = s < 0 ? EL_L : EL_R, wr = s < 0 ? WR_L : WR_R;
      tag(organic(sh.clone().add(V3(-s * 0.03, 0.02, 0)), el, [[0, 0.122], [0.5, 0.118], [1, 0.106]], m, g), 'tunica');
      tag(add(new THREE.SphereGeometry(0.106, 16, 12), m, g, el), 'tunica');
      tag(organic(el, el.clone().lerp(wr, 0.93), [[0, 0.106], [0.7, 0.095], [1, 0.09]], m, g), 'tunica');
      tag(add(new THREE.SphereGeometry(0.128, 16, 12), m, g, sh), 'tunica');
    });
  }

  /* Cinto (bordado o de lino): faja y extremos colgantes */
  function sash(id, material, station) {
    const g = group(id);
    const endM = material.clone();
    endM.userData = { base: material.userData.base.clone(), f: 1, target: 1 };
    MATS[id].push(endM);
    if (material.map) { endM.map = material.map.clone(); endM.map.needsUpdate = true; endM.map.repeat.set(1, 5); }
    tag(add(shell([[0.43, 2.2], [0.425, 2.3], [0.43, 2.42]], 0.68), material, g), station);
    const knot = add(new THREE.SphereGeometry(0.05, 14, 10), endM, g, V3(-0.17, 2.3, 0.29));
    knot.scale.set(1.3, 0.8, 0.6);
    tag(knot, station);
    [[-0.19, 0.0], [-0.13, 0.08]].forEach(([x, tilt]) => {
      const end = add(new THREE.BoxGeometry(0.09, 0.85, 0.012), endM, g, V3(x, 1.85, 0.32));
      end.rotation.z = tilt;
      end.rotation.x = -0.08;
      tag(end, station);
    });
    return g;
  }
  sash('cinto', mat('cinto', { color: 0xffffff, map: TEX.recamado }), 'cinto');
  sash('cintoLino', mat('cintoLino', { color: 0xffffff, map: TEX.lino }), 'lino');

  /* ---------------- 4. Manto ---------------- */
  const MANTO = [[0.6, 0.76], [0.58, 1.0], [0.53, 1.5], [0.47, 2.0], [0.445, 2.34], [0.455, 2.62], [0.47, 2.9], [0.485, 3.05], [0.39, 3.17], [0.24, 3.24], [0.16, 3.27]];
  const MANTO_D = 0.69;
  {
    const g = group('manto');
    const m = mat('manto', { color: 0xffffff, map: TEX.manto });
    tag(add(shell(MANTO, MANTO_D), m, g), 'manto');
    // Borde tejido de la abertura (Éx 28:32)
    const collar = add(new THREE.TorusGeometry(0.165, 0.028, 10, 40), mat('manto', { color: 0xffffff, map: TEX.tejido }), g, V3(0, 3.265, 0));
    collar.rotation.x = Math.PI / 2;
    collar.scale.set(1, MANTO_D + 0.08, 1);
    tag(collar, 'manto');
    // Orla: granadas y campanillas alternadas (Éx 28:33-34); el número es convencional
    const N = 48;
    const gCol = [COL.azul, COL.purpura, COL.carmesi];
    const gMats = gCol.map(c => mat('manto', { color: c, roughness: 0.6 }));
    const bellM = mat('manto', goldOpts);
    const pomGeo = new THREE.SphereGeometry(0.042, 12, 10);
    const crownGeo = new THREE.ConeGeometry(0.018, 0.035, 8);
    const bellGeo = new THREE.CylinderGeometry(0.012, 0.034, 0.065, 14, 1, true);
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const r = 0.6;
      const p = V3(Math.sin(a) * r, 0.0, Math.cos(a) * r * MANTO_D);
      if (i % 2 === 0) {
        const mm = gMats[(i / 2) % 3];
        const pom = tag(add(pomGeo, mm, g, p.clone().setY(0.715)), 'manto');
        pom.scale.set(1, 1.18, 1);
        tag(add(crownGeo, mm, g, p.clone().setY(0.67)), 'manto').rotation.x = Math.PI;
      } else {
        tag(add(bellGeo, bellM, g, p.clone().setY(0.715)), 'manto');
      }
    }
  }

  /* ---------------- 5. Efod (dos paños, hombreras y cinto) ---------------- */
  const EFOD = [[0.585, 1.42], [0.56, 1.7], [0.5, 2.05], [0.475, 2.34], [0.49, 2.62], [0.51, 2.9]];
  const EFOD_D = 0.69;
  const efodFront = (y) => {           // z del frente del efod a la altura y (interpolado)
    for (let i = 0; i < EFOD.length - 1; i++) {
      const [r0, y0] = EFOD[i], [r1, y1] = EFOD[i + 1];
      if (y >= y0 && y <= y1) return (r0 + (r1 - r0) * (y - y0) / (y1 - y0)) * EFOD_D;
    }
    return EFOD[EFOD.length - 1][0] * EFOD_D;
  };
  {
    const g = group('efod');
    const m = mat('efod', { color: 0xffffff, map: TEX.tejido, roughness: 0.6, metalness: 0.12 });
    tag(add(shell(EFOD, EFOD_D, { phi0: -1.05, phiLen: 2.1 }), m, g), 'efod');
    tag(add(shell(EFOD, EFOD_D, { phi0: Math.PI - 1.05, phiLen: 2.1 }), m, g), 'efod');
    // Cinto del efod (Éx 28:8)
    tag(add(shell([[0.505, 2.24], [0.5, 2.32], [0.505, 2.42]], 0.7), m, g), 'efod');
    // Hombreras (Éx 28:7)
    [-1, 1].forEach(s => {
      tag(tube([V3(s * 0.27, 2.88, 0.33), V3(s * 0.28, 3.12, 0.2), V3(s * 0.29, 3.215, 0), V3(s * 0.28, 3.12, -0.2), V3(s * 0.27, 2.88, -0.33)], 0.05, m, g), 'efod');
    });
  }

  /* ---------------- 6. Piedras oniquinas ---------------- */
  const ONIX_POS = [-1, 1].map(s => V3(s * 0.28, 3.2, 0.17));
  {
    const g = group('oniquinas');
    const gold = mat('oniquinas', goldOpts);
    const stone = mat('oniquinas', { color: COL.onice, roughness: 0.18, metalness: 0.15, side: THREE.FrontSide });
    ONIX_POS.forEach(p => {
      const set = new THREE.Group();
      set.position.copy(p);
      set.rotation.x = 0.95;
      g.add(set);
      tag(add(new THREE.CylinderGeometry(0.085, 0.085, 0.03, 28), gold, set), 'oniquinas');
      const st = tag(add(new THREE.SphereGeometry(0.07, 24, 16), stone, set, V3(0, 0.015, 0)), 'oniquinas');
      st.scale.set(1, 0.38, 0.8);
    });
  }

  /* ---------------- 7. Racional (pectoral) ---------------- */
  /* Un palmo ≈ medio codo. Piedras según la RV 1960 (Éx 28:17-20); colores aproximados */
  const STONES = [
    [['Sárdica', 0xa3322b], ['Topacio', 0xd8c24b], ['Carbunclo', 0x7f1a2a]],
    [['Esmeralda', 0x2c8a57], ['Zafiro', 0x2b4ea3], ['Diamante', 0xe9eef2]],
    [['Jacinto', 0xd9822b], ['Ágata', 0x9a6a48], ['Amatista', 0x7b4c9f]],
    [['Berilo', 0x5eb2a6], ['Ónix', 0x2c2c30], ['Jaspe', 0x6f8f4a]]
  ];
  const RAC_Y = 2.67, RAC_Z = efodFront(RAC_Y) + 0.03;
  let racionalPlate = null;
  {
    const g = group('racional');
    const holder = new THREE.Group();
    holder.position.set(0, RAC_Y, RAC_Z);
    holder.rotation.x = -0.06;
    g.add(holder);
    const plateM = mat('racional', { color: 0xffffff, map: TEX.tejido, roughness: 0.55, metalness: 0.15, transparent: true, opacity: 1 });
    racionalPlate = plateM;
    const plateTex = TEX.tejido.clone(); plateTex.needsUpdate = true; plateTex.repeat.set(1.5, 1.5);
    plateM.map = plateTex;
    tag(add(new THREE.BoxGeometry(0.5, 0.5, 0.05), plateM, holder), 'racional');
    const gold = mat('racional', goldOpts);
    const setGeo = new THREE.CylinderGeometry(0.052, 0.052, 0.02, 22);
    const gemGeo = new THREE.SphereGeometry(0.043, 20, 14);
    STONES.forEach((row, r) => row.forEach(([, c], k) => {
      const p = V3((k - 1) * 0.145, (1.5 - r) * 0.112, 0.03);
      const s = add(setGeo, gold, holder, p); s.rotation.x = Math.PI / 2; tag(s, 'racional');
      const gm = mat('racional', { color: c, roughness: 0.15, metalness: 0.1, emissive: c, emissiveIntensity: 0.06, side: THREE.FrontSide });
      const gem = add(gemGeo, gm, holder, p.clone().add(V3(0, 0, 0.012)));
      gem.scale.set(0.85, 0.98, 0.45);
      tag(gem, 'racional');
    }));
    // Anillos, cadenillas de oro a las hombreras y cordón de jacinto al efod (Éx 28:22-28)
    const blue = mat('racional', { color: COL.azul, roughness: 0.7 });
    [-1, 1].forEach(s => {
      const top = V3(s * 0.23, RAC_Y + 0.23, RAC_Z + 0.02);
      const onix = ONIX_POS[s < 0 ? 0 : 1];
      tag(tube([top, V3(s * 0.25, RAC_Y + 0.36, RAC_Z - 0.01), onix.clone().add(V3(0, -0.03, 0.02))], 0.011, gold, g), 'racional');
      const bot = V3(s * 0.23, RAC_Y - 0.24, RAC_Z + 0.01);
      tag(tube([bot, V3(s * 0.24, RAC_Y - 0.29, RAC_Z), V3(s * 0.26, 2.42, efodFront(2.42) + 0.02)], 0.009, blue, g), 'racional');
    });
  }
  /* Urim y Tumim: solo se marca su lugar, sin forma (Éx 28:30) */
  const urim = new THREE.Group();
  {
    const glowM = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, depthWrite: false });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.125, 48), glowM);
    ring.position.set(0, RAC_Y, RAC_Z - 0.005);
    urim.add(ring);
    const dash = new THREE.Mesh(new THREE.CircleGeometry(0.11, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, depthWrite: false }));
    dash.position.copy(ring.position);
    urim.add(dash);
    fig.add(urim);
    urim.userData.mats = [glowM, dash.material];
  }

  /* ---------------- 9. Mitra (turbante sobre la frente, deja ver el rostro) ---------------- */
  const MITRA_D = 1.18;
  {
    const g = group('mitra');
    const m = mat('mitra', { color: 0xffffff, map: TEX.lino });
    tag(add(shell([[0.188, 3.6], [0.203, 3.66], [0.21, 3.76], [0.2, 3.86], [0.16, 3.94], [0.09, 3.985], [0.001, 3.995]], MITRA_D), m, g), 'mitra');
    [3.635, 3.705, 3.775, 3.845].forEach((y, i) => {
      const t = add(new THREE.TorusGeometry(0.205 - i * 0.004 - (i === 3 ? 0.01 : 0), 0.02, 10, 48), m, g, V3(0, y, 0));
      t.rotation.x = Math.PI / 2 + (i % 2 ? 0.08 : -0.08);
      t.scale.set(1, MITRA_D, 1);
      tag(t, 'mitra');
    });
  }

  /* ---------------- 10. Plancha de oro ---------------- */
  {
    const g = group('plancha');
    const tex = canvasTex(512, 96, (c, w, h) => {
      const grad = c.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#f0d27a'); grad.addColorStop(0.5, '#d2a93c'); grad.addColorStop(1, '#a9812a');
      c.fillStyle = grad; c.fillRect(0, 0, w, h);
      c.strokeStyle = 'rgba(90,60,10,0.6)'; c.lineWidth = 4; c.strokeRect(6, 6, w - 12, h - 12);
      c.fillStyle = '#5a3c0a';
      c.font = '600 58px "Times New Roman", "Noto Serif Hebrew", serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.direction = 'rtl';
      c.fillText('קדש ליהוה', w / 2, h / 2 + 2);
    });
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    const m = mat('plancha', { color: 0xffffff, map: tex, roughness: 0.3, metalness: 0.45, emissive: 0x2a1e00, emissiveIntensity: 0.3 });
    const plate = add(new THREE.CylinderGeometry(0.262, 0.262, 0.075, 32, 1, true, -0.55, 1.1), m, g, V3(0, 3.705, 0.0));
    plate.scale.set(0.86, 1, 1);
    tag(plate, 'plancha');
    // Cordón de jacinto que la ata a la mitra (Éx 28:37)
    const cord = add(new THREE.TorusGeometry(0.213, 0.006, 6, 56), mat('plancha', { color: COL.azul, roughness: 0.7 }), g, V3(0, 3.705, 0));
    cord.rotation.x = Math.PI / 2;
    cord.scale.set(1, MITRA_D, 1);
  }

  /* ---------------- Suelo ---------------- */
  const groundM = new THREE.MeshBasicMaterial({ color: 0xeeeeea });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(1.5, 64), groundM);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.002;
  scene.add(ground);

  /* ---------------- Etiquetas (sprites de texto) ---------------- */
  const labels = [];
  function cssVar(name, fb) { return getComputedStyle(root).getPropertyValue(name).trim() || fb; }
  function drawLabel(L) {
    const ink = cssVar('--ink', '#1f2430'), bg = cssVar('--bg', '#fafaf8'), line = cssVar('--line', '#e4e4df'), muted = cssVar('--muted', '#6b7080');
    const c = L.canvas, g = c.getContext('2d');
    const fs = 44, fs2 = 32, pad = L.bare ? 6 : 22, gap = 8;
    const font1 = `600 ${fs}px Inter, system-ui, sans-serif`, font2 = `500 ${fs2}px Inter, system-ui, sans-serif`;
    g.font = font1; const w1 = g.measureText(L.text).width;
    g.font = font2; const w2 = L.sub ? g.measureText(L.sub).width : 0;
    const W = Math.ceil(Math.max(w1, w2) + pad * 2), H = Math.ceil(L.sub ? fs + fs2 + gap + pad * 2 : fs + pad * 2);
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
    g.textBaseline = 'top';
    g.font = font1; g.fillStyle = ink;
    if (L.bare) { g.lineWidth = 8; g.strokeStyle = bg; g.strokeText(L.text, pad, pad + 2); }
    g.fillText(L.text, pad, pad + 2);
    if (L.sub) { g.font = font2; g.fillStyle = muted; g.fillText(L.sub, pad, pad + fs + gap); }
    L.tex.needsUpdate = true;
    L.sprite.scale.set(L.h * W / H, L.h, 1);
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
    const L = { canvas: cv, tex, sprite, text, sub, h, bare: o.bare };
    labels.push(L); drawLabel(L);
    return L;
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => labels.forEach(drawLabel));

  /* Nombres de las prendas, con una línea guía al punto que señalan */
  const names = new THREE.Group();
  scene.add(names);
  const NAME_SPOTS = {
    mitra: [V3(-0.18, 3.88, 0.1), V3(-0.75, 4.02, 0.1), 1],
    plancha: [V3(0.12, 3.705, 0.23), V3(0.75, 3.8, 0.3), 0],
    oniquinas: [V3(-0.28, 3.17, 0.17), V3(-0.95, 3.32, 0.2), 1],
    racional: [V3(0.2, 2.75, RAC_Z + 0.03), V3(0.95, 2.95, 0.4), 0],
    efod: [V3(-0.4, 2.0, 0.28), V3(-1.05, 2.1, 0.35), 1],
    manto: [V3(0.5, 1.2, 0.26), V3(1.05, 1.3, 0.3), 0],
    cinto: [V3(-0.3, 2.3, 0.22), V3(-1.0, 2.45, 0.3), 1],
    cintoLino: [V3(-0.3, 2.3, 0.22), V3(-1.0, 2.45, 0.3), 1],
    tunica: [V3(-0.45, 0.6, 0.25), V3(-1.05, 0.7, 0.3), 1],
    panetes: [V3(0.3, 1.6, 0.1), V3(0.95, 1.7, 0.3), 0]
  };
  const NAME_OBJ = {};
  const leaderM = new THREE.LineBasicMaterial({ color: 0x6b7080, transparent: true, opacity: 0.7, depthTest: false });
  Object.entries(NAME_SPOTS).forEach(([id, [at, lab, side]]) => {
    const gg = new THREE.Group();
    names.add(gg);
    const ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints([at, lab]), leaderM);
    ln.renderOrder = 19;
    gg.add(ln);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), new THREE.MeshBasicMaterial({ color: 0x6b7080, depthTest: false }));
    dot.position.copy(at); dot.renderOrder = 19;
    gg.add(dot);
    label(NAMES[id], null, 0.15, lab, gg, { cx: side, cy: 0.5 });
    NAME_OBJ[id] = gg;
  });

  /* Medidas: regla en codos y el palmo del racional */
  const dims = new THREE.Group();
  scene.add(dims);
  {
    const lineM = new THREE.LineBasicMaterial({ color: 0x6b7080, depthTest: false });
    const x = -1.25;
    dims.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([V3(x, 0, 0), V3(x, 4, 0)]), lineM));
    for (let i = 0; i <= 4; i++) {
      dims.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([V3(x - 0.07, i, 0), V3(x + 0.07, i, 0)]), lineM));
      if (i > 0) label(i === 1 ? '1 codo' : `${i} codos`, null, 0.13, V3(x - 0.12, i, 0), dims, { cx: 1, cy: 0.5, bare: true });
    }
    label('Estatura supuesta', '≈ 3,8 codos (1,70 m)', 0.24, V3(x - 0.12, 4.35, 0), dims, { cx: 1, cy: 0.5 });
  }
  const palmo = new THREE.Group();
  scene.add(palmo);
  {
    const lineM = new THREE.LineBasicMaterial({ color: 0x6b7080, depthTest: false });
    const y = RAC_Y - 0.31, z = RAC_Z + 0.05;
    palmo.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([V3(-0.25, y, z), V3(0.25, y, z)]), lineM));
    [-0.25, 0.25].forEach(xx => palmo.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([V3(xx, y - 0.025, z), V3(xx, y + 0.025, z)]), lineM)));
    label('1 palmo', '≈ 22 cm', 0.085, V3(0, y - 0.07, z), palmo, { cx: 0.5, cy: 1 });
  }
  const urimLabel = label('Urim y Tumim', 'forma desconocida', 0.07, V3(0.17, RAC_Y + 0.02, RAC_Z + 0.06), urim, { cx: 0, cy: 0.5 });

  /* ---------------- Estado: atuendo, prendas puestas, resalte ---------------- */
  let attire = 'oro', wearIdx = ORDER.length - 1, focus = null, showSet = [];
  let namesUser = false, dimsUser = false, attireOverride = null;
  const anims = [];            // prendas que bajan al ponerse
  const isOn = id => {
    if (attire === 'lino') return LINO_SET.includes(id);
    if (id === 'cintoLino') return false;
    const k = ORDER.indexOf(id);
    return k >= 0 && k <= wearIdx;
  };
  function applyState(animate) {
    Object.entries(GROUPS).forEach(([id, g]) => {
      const on = isOn(id);
      if (on && !g.visible && animate && !reduceMotion) {
        const lift = id === 'mitra' || id === 'plancha' ? 0.6 : 0.45;
        g.position.y = lift;
        anims.push({ g, from: lift, start: performance.now(), dur: 650 });
      }
      if (!on) g.position.y = 0;
      // Lo que queda completamente tapado no se dibuja (evita que asome a través de la capa exterior)
      const cov = COVERED_BY[id];
      g.visible = on && !(cov && isOn(cov));
    });
    const urimOn = showSet.includes('urim') && attire === 'oro' && wearIdx >= ORDER.indexOf('racional');
    urim.visible = urimOn;
    racionalPlate.opacity = urimOn ? 0.28 : 1;
    racionalPlate.depthWrite = !urimOn;
    // Resalte: prendas fuera del foco se oscurecen (materiales opacos, sin transparencias)
    Object.entries(MATS).forEach(([id, mats]) => {
      const on = !focus || focus.includes(id);
      mats.forEach(m => { m.userData.target = on ? 1 : (id === 'cuerpo' ? 0.85 : 0.62); });
    });
    // Nombres y medidas
    const namesOn = namesUser || showSet.includes('nombres');
    Object.entries(NAME_OBJ).forEach(([id, g]) => {
      const cov = COVERED_BY[id];
      g.visible = namesOn && isOn(id) && !(cov && isOn(cov));
    });
    const dimsOn = dimsUser || showSet.includes('medidas');
    dims.visible = dimsOn;
    palmo.visible = (dimsOn || showSet.includes('palmo')) && isOn('racional');
    namesBtn.setAttribute('aria-pressed', String(namesOn));
    dimsBtn.setAttribute('aria-pressed', String(dimsOn));
    linoBtn.setAttribute('aria-pressed', String(attire === 'lino'));
  }
  function updateFocus(dt) {
    Object.values(MATS).forEach(mats => mats.forEach(m => {
      const t = m.userData.target;
      m.userData.f += (t - m.userData.f) * Math.min(1, dt * 6);
      if (Math.abs(t - m.userData.f) < 0.002) m.userData.f = t;
      m.color.copy(m.userData.base).multiplyScalar(m.userData.f);
    }));
  }

  /* ---------------- Luces y tema ---------------- */
  const hemi = new THREE.HemisphereLight(0xffffff, 0x8f8a80, 0.85);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 0.85);
  key.position.set(4, 8, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.35);
  rim.position.set(-6, 3, -6);
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
    groundM.color.set(dark ? 0x22252c : 0xececE6);
    leaderM.color.set(dark ? 0x9a9ca6 : 0x6b7080);
    hemi.intensity = dark ? 0.7 : 0.85;
    key.intensity = dark ? 0.95 : 0.85;
    labels.forEach(drawLabel);
    themeBtn.textContent = dark ? 'Fondo claro' : 'Fondo oscuro';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', bg);
  }
  themeBtn.addEventListener('click', () => { userChoseTheme = true; applyTheme(!dark); });
  const onScheme = e => { if (!userChoseTheme) applyTheme(e.matches); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);

  /* ---------------- Botones de la escena ---------------- */
  const namesBtn = document.getElementById('t-names');
  const dimsBtn = document.getElementById('t-dims');
  const linoBtn = document.getElementById('t-lino');
  const spinBtn = document.getElementById('t-spin');
  namesBtn.addEventListener('click', () => { namesUser = !(namesUser || showSet.includes('nombres')); if (!namesUser) showSet = showSet.filter(s => s !== 'nombres'); applyState(false); });
  dimsBtn.addEventListener('click', () => { dimsUser = !(dimsUser || showSet.includes('medidas')); if (!dimsUser) showSet = showSet.filter(s => s !== 'medidas'); applyState(false); });
  linoBtn.addEventListener('click', () => {
    attireOverride = attire === 'lino' ? 'oro' : 'lino';
    attire = attireOverride;
    wearIdx = ORDER.length - 1;
    focus = null;
    showSet = showSet.filter(s => s !== 'urim');
    applyState(true);
  });
  spinBtn.addEventListener('click', () => {
    controls.autoRotate = !controls.autoRotate;
    spinBtn.setAttribute('aria-pressed', String(controls.autoRotate));
  });

  /* ---------------- Leyenda ---------------- */
  document.getElementById('legend').innerHTML = LEGEND.map(([k, t]) => `<span><i style="background:${hex(COL[k])}"></i>${t}</span>`).join('');

  /* ---------------- UI: selector de ruta, lista y ficha ----------------
     Patrón común: una ruta a la vez; la lista lleva solo sus pasos.
     Cada ruta: { id, grupo, n, info, steps }. */
  const ROUTES = [
    { id: 'vestimenta', grupo: 'Vestimenta', n: 'Las vestiduras', steps: STATIONS }
  ];
  const ROUTE_BY_ID = Object.fromEntries(ROUTES.map(r => [r.id, r]));
  const list = document.getElementById('stations');
  const routeSel = document.getElementById('ruta');
  const routeInfo = document.getElementById('ruta-info');
  routeSel.innerHTML = [...new Set(ROUTES.map(r => r.grupo))].map(g => `<optgroup label="${g}">${
    ROUTES.filter(r => r.grupo === g).map(r => `<option value="${r.id}">${r.n}</option>`).join('')
  }</optgroup>`).join('');
  routeSel.addEventListener('change', () => select(routeSel.value, 0));
  // Con una sola ruta no hay selector: solo la lista (DIRECTRICES §20)
  if (ROUTES.length < 2) document.querySelector('.ruta-sel').hidden = true;
  const stBtn = (tourId, i, num, name, ref) => `<button class="st" type="button" data-tour="${tourId}" data-i="${i}">
      <span class="st-num">${num ?? ''}</span>
      <span class="st-name">${name}</span>
      <span class="st-ref">${ref}</span>
    </button>`;
  let shownRoute = null;
  function renderRoute(t) {
    const r = ROUTE_BY_ID[t];
    shownRoute = t;
    routeSel.value = t;
    routeInfo.textContent = r.info || '';
    list.innerHTML = r.steps.map((s, i) => `<li>${stBtn(t, i, s.num, s.short || s.n, s.ref)}</li>`).join('');
  }
  list.addEventListener('click', e => {
    const b = e.target.closest('.st');
    if (b) select(b.dataset.tour, +b.dataset.i);
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
  let tour = 'vestimenta', idx = 0;
  const items = t => ROUTE_BY_ID[t].steps;

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  document.getElementById('t-home').addEventListener('click', () => select('vestimenta', 0));
  function step(d) {
    const n = items(tour).length;
    const i = Math.max(0, Math.min(n - 1, idx + d));
    if (i !== idx) select(tour, i);
  }
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  function renderDetail() {
    const arr = items(tour), it = arr[idx];
    dKicker.textContent = ROUTE_BY_ID[tour].n;
    dKicker.hidden = false;
    dTitle.textContent = it.n;
    dRef.textContent = it.ref;
    dRows.innerHTML = it.rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    dDesc.textContent = it.desc;
    dThink.hidden = !it.think;
    dThink.querySelector('span').textContent = it.think || '';
    const total = arr.filter(s => s.num).length;
    dPos.textContent = it.num ? `${it.num} de ${total}` : '';
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === arr.length - 1;
  }

  function select(t, i, instant) {
    if (i === undefined || !items(t)[i]) return;
    tour = t; idx = i;
    const it = items(t)[i];
    if (shownRoute !== t) renderRoute(t);
    list.querySelectorAll('.st').forEach(b => b.setAttribute('aria-current', String(+b.dataset.i === i)));
    renderDetail();
    attireOverride = null;
    attire = it.attire || 'oro';
    wearIdx = ORDER.indexOf(it.wear || 'plancha');
    focus = it.focus || null;
    showSet = (it.show || []).slice();
    applyState(!instant);
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
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(pickables, false);
    for (const h of hits) {
      if (!shown(h.object)) continue;
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
    if (moved < 6) {
      const id = pickAt(e);
      if (id && BY_ID[id] !== undefined && BY_ID[id] !== idx) select('vestimenta', BY_ID[id]);
    }
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
    } else {
      // En celular la barra de botones ocupa la franja superior: se baja un poco el encuadre
      const tb = document.querySelector('.tb-toolbar');
      const dy = tb ? Math.min(h * 0.08, tb.offsetHeight * 0.6) : 0;
      camera.setViewOffset(w, h, 0, -dy, w, h);
    }
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
    for (let i = anims.length - 1; i >= 0; i--) {
      const a = anims[i];
      const k = Math.min(1, (now - a.start) / a.dur);
      a.g.position.y = a.from * (1 - ease(k));
      if (k >= 1) anims.splice(i, 1);
    }
    if (urim.visible) {
      const pulse = 0.4 + 0.25 * Math.sin(now / 420);
      urim.userData.mats[0].opacity = reduceMotion ? 0.55 : pulse + 0.15;
    }
    updateFocus(reduceMotion ? 1 : dt);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  applyTheme(dark);
  select('vestimenta', 0, true);
  window.fypReset = () => select('vestimenta', 0);
  requestAnimationFrame(frame);
})();
