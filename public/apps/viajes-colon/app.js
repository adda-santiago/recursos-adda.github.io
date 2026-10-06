/* ==========================================================
   Aula Visual — Los viajes de Colón (Leaflet 1.9 + teselas Esri)
   El contenido está en data.js. Este archivo solo dibuja y navega.
   Estados de cada tramo y lugar (clases CSS s-*):
     hidden · ghost (otro viaje) · future · done · current
   ========================================================== */
(() => {
  'use strict';

  const fallback = document.getElementById('fallback');
  if (typeof L === 'undefined' || !window.COLON_DATA) { fallback.hidden = false; return; }

  const { VOYAGES, STATIONS, AUX } = window.COLON_DATA;
  const VOY = Object.fromEntries(VOYAGES.map(v => [v.id, v]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- Mapa base ---------------- */
  const map = L.map('map', {
    zoomControl: false, worldCopyJump: false, zoomSnap: 0.25, minZoom: 1.5, maxZoom: 10,
    attributionControl: true
  });
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  map.attributionControl.setPrefix(false);
  const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
  const baseOcean = L.tileLayer(ESRI + 'Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    maxNativeZoom: 10, attribution: 'Teselas © Esri — GEBCO, NOAA, National Geographic y otros'
  });
  const baseSat = L.tileLayer(ESRI + 'World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxNativeZoom: 17, attribution: 'Teselas © Esri — Maxar, Earthstar Geographics y otros'
  });
  baseOcean.addTo(map);

  const setState = (layer, state) => {
    const el = layer.getElement ? layer.getElement() : layer._path;
    if (!el) return;
    el.classList.remove('s-hidden', 's-ghost', 's-future', 's-done', 's-current');
    el.classList.add('s-' + state);
  };

  /* Ángulo de pantalla de un tramo (Mercator es conforme: no cambia con el zoom) */
  const bearing = (a, b) => {
    const pa = map.options.crs.latLngToPoint(L.latLng(a), 0);
    const pb = map.options.crs.latLngToPoint(L.latLng(b), 0);
    return Math.atan2(pb.x - pa.x, -(pb.y - pa.y)) * 180 / Math.PI;
  };
  const ARROW_SVG = '<svg viewBox="-6 -6 12 12" aria-hidden="true"><path d="M0 -5 L4.5 4 L0 1.8 L-4.5 4 Z" fill="currentColor"/></svg>';
  const arrowIcon = (cls, deg, size = 12) => L.divIcon({
    className: cls, iconSize: [size, size],
    html: `<div style="width:100%;height:100%;transform:rotate(${deg}deg)">${ARROW_SVG}</div>`
  });

  /* Punto a una fracción del largo de un tramo (en coordenadas proyectadas) */
  function alongLeg(pts, f) {
    const P = pts.map(p => map.options.crs.latLngToPoint(L.latLng(p), 0));
    const seg = []; let total = 0;
    for (let i = 1; i < P.length; i++) { const d = P[i].distanceTo(P[i - 1]); seg.push(d); total += d; }
    let goal = total * f;
    for (let i = 1; i < P.length; i++) {
      if (goal <= seg[i - 1] || i === P.length - 1) {
        const k = seg[i - 1] ? Math.min(1, goal / seg[i - 1]) : 0;
        const pt = P[i - 1].add(P[i].subtract(P[i - 1]).multiplyBy(k));
        return { latlng: map.options.crs.pointToLatLng(pt, 0), i };
      }
      goal -= seg[i - 1];
    }
    return { latlng: L.latLng(pts[pts.length - 1]), i: pts.length - 1 };
  }
  /* Tramo recortado hasta la fracción f, para animar el trazado */
  function partialLeg(pts, f) {
    if (f >= 1) return pts;
    const { latlng, i } = alongLeg(pts, f);
    return pts.slice(0, i).concat([[latlng.lat, latlng.lng]]);
  }

  /* ---------------- Rutas de los viajes ---------------- */
  const routes = L.layerGroup().addTo(map);
  const places = L.layerGroup().addTo(map);
  VOYAGES.forEach(v => {
    v.steps.forEach((s, i) => {
      const prev = i > 0 ? v.steps[i - 1].p : null;
      s.leg = prev ? [prev, ...(s.via || []), s.p] : [s.p];
      if (s.leg.length > 1 && (s.leg[0][0] !== s.p[0] || s.leg[0][1] !== s.p[1] || s.via)) {
        s.line = L.polyline(s.leg, {
          className: `leg ${v.id}${s.vuelta ? ' vuelta' : ''}`, interactive: false, smoothFactor: 1
        }).addTo(routes);
        const mid = alongLeg(s.leg, 0.55);
        const a = mid.latlng, b = L.latLng(s.leg[mid.i]);
        const back = L.latLng(s.leg[Math.max(0, mid.i - 1)]);
        s.arrow = L.marker(a, {
          icon: arrowIcon(`arr ${v.id}`, bearing(back, b.equals(a) ? s.p : b)),
          interactive: false, keyboard: false
        }).addTo(routes);
      }
      const label = s.colon && s.colon !== s.n ? `${esc(s.n)} <em>(${esc(s.colon)})</em>` : esc(s.n);
      s.dot = L.circleMarker(s.p, {
        radius: 5.5, className: `pt ${v.id}`, bubblingMouseEvents: false
      }).addTo(places);
      s.dot.bindTooltip(label, { className: 'lbl', direction: 'right', offset: [6, 0], permanent: false });
      s.dot.on('click', () => select(v.id, i));
      s.label = label;
    });
  });

  /* ---------------- Capas auxiliares de la ruta ---------------- */
  const aux = {};
  const auxPoint = (pt) => L.circleMarker(pt.p, { radius: 5, className: 'aux-pt', interactive: false })
    .bindTooltip(`${esc(pt.n)} <em>${esc(pt.ref)}</em>`, {
      className: 'lbl', direction: pt.dir || 'right', offset: pt.dir === 'bottom' ? [0, 6] : [6, 0], permanent: true
    });
  const txt = (p, text, cls) => L.marker(p, {
    interactive: false, keyboard: false,
    icon: L.divIcon({ className: `txt ${cls}`, html: esc(text), iconSize: null })
  });

  aux.portugal = L.layerGroup([
    L.polyline(AUX.portugal.line, { className: 'aux-line', interactive: false }),
    ...AUX.portugal.points.map(auxPoint)
  ]);
  aux.cipango = L.layerGroup([
    L.polyline(AUX.cipango.line, { className: 'aux-line', interactive: false }),
    ...AUX.cipango.points.map(auxPoint),
    txt([40.5, -128], AUX.cipango.label, 'wind-name')
  ]);
  aux.tordesillas = L.layerGroup([
    ...AUX.tordesillas.lines.map(l => L.polyline([[-60, l.lng], [72, l.lng]], {
      className: 'aux-line' + (l.fuerte ? ' fuerte' : ''), interactive: false
    })),
    ...AUX.tordesillas.lines.map(l => L.marker(l.label, {
      interactive: false, keyboard: false,
      icon: L.divIcon({ className: 'txt line-name', html: `${esc(l.n)}<em>${esc(l.ref)}</em>`, iconSize: null })
    })),
    ...AUX.tordesillas.sides.map(s => txt(s.p, s.n, 'side'))
  ]);
  aux.vientos = L.layerGroup([
    ...AUX.vientos.alisios.map(([la, ln, d]) => L.marker([la, ln], { icon: arrowIcon('wind alisio', d, 26), interactive: false, keyboard: false })),
    ...AUX.vientos.oeste.map(([la, ln, d]) => L.marker([la, ln], { icon: arrowIcon('wind oeste', d, 26), interactive: false, keyboard: false })),
    txt([20.5, -41], 'Alisios', 'wind-name'),
    txt([45.5, -40], 'Vientos del oeste', 'wind-name oeste')
  ]);

  /* ---------------- Leyenda e indicador ---------------- */
  const legend = document.getElementById('legend');
  const hud = document.getElementById('hud');
  function renderLegend(visible) {
    legend.innerHTML = VOYAGES.map(v =>
      `<span class="${visible.includes(v.id) ? '' : 'off'}" title="${v.ref}"><i style="background:${v.color}"></i>${v.n}</span>`
    ).join('') + '<span><i class="dash"></i>Regreso</span>';
  }
  function renderHud(v, i) {
    const s = v.steps[i];
    hud.style.setProperty('--hud-color', v.color);
    hud.querySelector('.hud-voy i').style.background = v.color;
    hud.querySelector('.hud-voy span').textContent = `${v.n} · ${v.barcos} barcos`;
    hud.querySelector('.hud-date').textContent = s.ref;
    hud.querySelector('.hud-place').textContent = s.vuelta ? `${s.n} · regreso` : s.n;
    hud.querySelector('.hud-bar').innerHTML = v.steps.map((_, k) => `<b class="${k <= i ? 'on' : ''}"></b>`).join('');
  }

  /* ---------------- Panel: selector de ruta y lista ---------------- */
  /* Selector de ruta (patrón común, DIRECTRICES §20): una ruta a la vez;
     la lista muestra solo sus pasos. Cada ruta: { id, grupo, n, info, steps }. */
  const ROUTES = [
    { id: 'ruta', grupo: 'Recorrido', n: 'Ruta de aprendizaje', steps: STATIONS },
    ...VOYAGES.map(v => ({ ...v, grupo: 'Viajes', info: `${v.ref} · ${v.barcos} barcos` }))
  ];
  const ROUTE_BY_ID = Object.fromEntries(ROUTES.map(r => [r.id, r]));
  const list = document.getElementById('stations');
  const routeSel = document.getElementById('ruta');
  const routeInfo = document.getElementById('ruta-info');
  routeSel.innerHTML = [...new Set(ROUTES.map(r => r.grupo))].map(g => `<optgroup label="${g}">${
    ROUTES.filter(r => r.grupo === g).map(r => `<option value="${r.id}">${r.n}</option>`).join('')
  }</optgroup>`).join('');
  routeSel.addEventListener('change', () => select(routeSel.value, 0));
  const stBtn = (tourId, i, num, name, ref) => `<button class="st" type="button" data-tour="${tourId}" data-i="${i}">
      <span class="st-num">${num ?? ''}</span>
      <span class="st-name">${esc(name)}</span>
      <span class="st-ref">${esc(ref)}</span>
    </button>`;
  let shownRoute = null;
  function renderRoute(t) {
    const r = ROUTE_BY_ID[t];
    shownRoute = t;
    routeSel.value = t;
    routeInfo.innerHTML = r.info ? `${r.color ? `<i style="background:${r.color}"></i>` : ''}${r.info}` : '';
    list.innerHTML = r.steps.map((s, i) => `<li>${
      t === 'ruta' ? stBtn(t, i, s.num, s.short || s.n, s.ref) : stBtn(t, i, i + 1, s.n, s.ref)
    }</li>`).join('');
  }
  list.addEventListener('click', e => {
    const b = e.target.closest('.st');
    if (b) select(b.dataset.tour, +b.dataset.i);
  });

  /* ---------------- Ficha ---------------- */
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
  const items = t => (t === 'ruta' ? STATIONS : VOY[t].steps);

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
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
    const v = tour === 'ruta' ? null : VOY[tour];
    dKicker.textContent = v ? `${v.n}, ${v.ref}` : 'Ruta de aprendizaje';
    dKicker.hidden = false;
    dTitle.textContent = it.n;
    dRef.textContent = it.ref;
    const rows = (v && it.colon && it.colon !== it.n ? [['Colón la llamó', it.colon]] : []).concat(it.rows);
    dRows.innerHTML = rows.map(([k, val]) => `<dt>${esc(k)}</dt><dd>${esc(val)}</dd>`).join('');
    dDesc.textContent = it.desc;
    dThink.hidden = !it.think;
    dThink.querySelector('span').textContent = it.think || '';
    dPos.textContent = v ? `Paso ${idx + 1} de ${arr.length}` : (it.num ? `${it.num} de ${STATIONS.length - 1}` : '');
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === arr.length - 1;
  }

  /* ---------------- Estado del mapa ---------------- */
  const winds = document.getElementById('t-winds');
  const names = document.getElementById('t-names');
  const sat = document.getElementById('t-sat');
  let windsUser = false, namesUser = false, anim = null;

  function setAux(id, on) {
    if (on && !map.hasLayer(aux[id])) aux[id].addTo(map);
    if (!on && map.hasLayer(aux[id])) map.removeLayer(aux[id]);
  }

  function paint() {
    if (anim) { cancelAnimationFrame(anim); anim = null; }
    const ruta = tour === 'ruta';
    const it = items(tour)[idx];
    const show = (ruta && it.show) || [];
    const visible = ruta ? it.voyages : [tour];

    ['portugal', 'cipango', 'tordesillas'].forEach(id => setAux(id, show.includes(id)));
    const windsOn = windsUser || show.includes('vientos');
    setAux('vientos', windsOn);
    winds.setAttribute('aria-pressed', String(windsOn));
    const namesOn = namesUser || show.includes('nombres');
    names.setAttribute('aria-pressed', String(namesOn));

    VOYAGES.forEach(v => v.steps.forEach((s, i) => {
      let st;
      if (ruta) st = visible.includes(v.id) ? 'done' : 'hidden';
      else if (v.id !== tour) st = 'ghost';
      else st = i < idx ? 'done' : i === idx ? 'current' : 'future';
      if (s.line) { s.line.setLatLngs(s.leg); setState(s.line, st); }
      if (s.arrow) setState(s.arrow, st);
      // Lugares: en un viaje se ven los ya visitados; los futuros quedan ocultos
      const dotSt = st === 'future' ? 'hidden' : st;
      setState(s.dot, dotSt);
      s.dot.setRadius(st === 'current' ? 8 : st === 'ghost' ? 4 : 5.5);
      if (st === 'current') s.dot.bringToFront();
      // Etiquetas: el lugar actual siempre; el resto, con el botón Nombres
      const wantLabel = (st === 'current') || (namesOn && (st === 'done'));
      const tip = s.dot.getTooltip();
      if (wantLabel !== !!tip.options.permanent || (wantLabel && !s.dot.isTooltipOpen())) {
        s.dot.unbindTooltip();
        s.dot.bindTooltip(s.label, {
          className: 'lbl' + (st === 'current' ? ' actual' : ''), direction: 'right', offset: [8, 0], permanent: wantLabel
        });
      }
    }));
    // Evita que dos etiquetas del mismo lugar se encimen (p. ej. La Navidad en dos viajes)
    if (ruta && namesOn) dedupeLabels(visible);

    legend.hidden = !ruta;
    hud.hidden = ruta;
    if (ruta) renderLegend(visible); else renderHud(VOY[tour], idx);

    // El tramo actual se dibuja de nuevo: cada paso repite solo su tramo
    const cur = !ruta && VOY[tour].steps[idx];
    if (cur && cur.line && !reduceMotion) {
      const t0 = performance.now(), dur = 1400;
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3);
        cur.line.setLatLngs(partialLeg(cur.leg, Math.max(0.01, e)));
        anim = k < 1 ? requestAnimationFrame(tick) : null;
      };
      anim = requestAnimationFrame(tick);
    }
  }
  function dedupeLabels(visible) {
    const seen = new Set();
    VOYAGES.filter(v => visible.includes(v.id)).forEach(v => v.steps.forEach(s => {
      const key = s.p.join(',');
      if (seen.has(key)) s.dot.closeTooltip(); else seen.add(key);
    }));
  }

  winds.addEventListener('click', () => {
    const it = items(tour)[idx];
    const forced = tour === 'ruta' && (it.show || []).includes('vientos');
    if (!forced) { windsUser = !windsUser; paint(); }
  });
  names.addEventListener('click', () => {
    const it = items(tour)[idx];
    const forced = tour === 'ruta' && (it.show || []).includes('nombres');
    if (!forced) { namesUser = !namesUser; paint(); }
  });
  sat.addEventListener('click', () => {
    const on = !map.hasLayer(baseSat);
    if (on) { map.removeLayer(baseOcean); baseSat.addTo(map); } else { map.removeLayer(baseSat); baseOcean.addTo(map); }
    sat.setAttribute('aria-pressed', String(on));
  });
  document.getElementById('t-home').addEventListener('click', () => select('ruta', 0));

  /* ---------------- Encuadre ---------------- */
  const detailEl = document.getElementById('detail');
  function padding() {
    if (getComputedStyle(detailEl).position === 'absolute') {
      const w = map.getSize().x;
      return { paddingTopLeft: [Math.min(w - 220, detailEl.offsetWidth + 40), 80], paddingBottomRight: [40, 40] };
    }
    return { paddingTopLeft: [20, 56], paddingBottomRight: [20, 56] };
  }
  function boundsFor() {
    if (tour === 'ruta') return L.latLngBounds(items('ruta')[idx].view);
    const steps = VOY[tour].steps, s = steps[idx];
    const pts = s.leg.length > 1 ? s.leg : [s.p];
    let b = L.latLngBounds(pts);
    if (pts.length === 1 || (b.getNorth() - b.getSouth() < 3 && b.getEast() - b.getWest() < 3)) {
      const c = L.latLng(s.p);
      b = L.latLngBounds([c.lat - 3, c.lng - 4], [c.lat + 3, c.lng + 4]);
    }
    return b;
  }
  function frame(instant) {
    const opts = { ...padding(), maxZoom: tour === 'ruta' ? 8 : 7 };
    if (instant || reduceMotion) map.fitBounds(boundsFor(), { ...opts, animate: false });
    else map.flyToBounds(boundsFor(), { ...opts, duration: 1.2 });
  }

  /* ---------------- Selección ---------------- */
  function select(t, i, instant) {
    if (i === undefined || !items(t)[i]) return;
    tour = t; idx = i;
    const ruta = t === 'ruta';
    if (shownRoute !== t) renderRoute(t);
    list.querySelectorAll('.st').forEach(b => b.setAttribute('aria-current', String(+b.dataset.i === i)));
    renderDetail();
    paint();
    frame(instant);
  }

  new ResizeObserver(() => map.invalidateSize()).observe(document.getElementById('stage'));
  select('ruta', 0, true);
  window.fypReset = () => select('ruta', 0);
})();
