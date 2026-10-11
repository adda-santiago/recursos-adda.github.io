/* ==========================================================
   mapa-imperios.js — Mapa de imperios (compartido)
   Dibuja la geografía de imperios-geo.js sobre el mapa base vectorial
   (mapa-base.js; si no está, usa teselas de Esri).
   Requiere Leaflet 1.9 (JS y CSS) y window.IMPERIOS_GEO.

   Uso:
     const m = MapaImperios.crear(contenedor);
     m.mostrar({ view: [[s, o], [n, e]], capas: [...], vecinos: [...],
                 conVecinos: false, lugares: [...], trazos: [...] }, animar);
     m.ajustar();   // tras cambiar el tamaño del contenedor
   Colores por imperio: variables --babilonia, --asiria, --persia, --media,
   --lidia, --egipto, --grecia, --roma (con valores por defecto aquí).
   ========================================================== */
(() => {
  'use strict';
  if (window.MapaImperios) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OFF = { right: [7, 0], left: [-7, 0], top: [0, -7], bottom: [0, 7] };
  const ARROW = '<svg viewBox="-6 -6 12 12" aria-hidden="true"><path d="M0 -5 L4.5 4 L0 1.8 L-4.5 4 Z" fill="currentColor"/></svg>';

  function crear(cont) {
    const GEO = window.IMPERIOS_GEO, BASE = window.MAPA_BASE;
    if (typeof L === 'undefined' || !GEO) {
      cont.innerHTML = '<p class="mi-error">No se pudo cargar el mapa. Revisa tu conexión y vuelve a abrir la página.</p>';
      return { mostrar() {}, ajustar() {} };
    }
    cont.classList.add('mi');
    const lienzo = document.createElement('div');
    lienzo.className = 'mi-lienzo';
    cont.appendChild(lienzo);
    const leyenda = document.createElement('div');
    leyenda.className = 'mi-leyenda';
    const btnVec = document.createElement('button');
    btnVec.type = 'button';
    btnVec.className = 'mi-btn';
    btnVec.textContent = 'Vecinos';
    btnVec.setAttribute('aria-pressed', 'false');
    cont.append(leyenda, btnVec);

    const map = L.map(lienzo, { zoomControl: false, zoomSnap: 0.25, minZoom: 3, maxZoom: 9, attributionControl: true });
    map.setView([32, 42], 4); // antes de agregar capas
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    map.attributionControl.setPrefix(false);
    [['base', 200], ['capas', 380], ['trazos', 420], ['rotulos', 450]].forEach(([n, z]) => { map.createPane(n).style.zIndex = z; });
    map.getPane('rotulos').style.pointerEvents = 'none';

    if (BASE) {
      const o = { pane: 'base', interactive: false };
      L.layerGroup([
        ...BASE.tierra.map(p => L.polygon(p, { ...o, className: 'mi-tierra' })),
        ...BASE.lagos.map(p => L.polygon(p, { ...o, className: 'mi-agua' })),
        ...BASE.rios.map(l => L.polyline(l, { ...o, className: 'mi-rio' }))
      ]).addTo(map);
      map.attributionControl.addAttribution('Mapa base: Natural Earth');
    } else {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        { maxNativeZoom: 16, attribution: 'Teselas © Esri' }).addTo(map);
    }

    // Capas de imperios
    const capas = {};
    Object.entries(GEO.capas).forEach(([id, c]) => {
      const shapes = c.polys.flatMap(pid => GEO.polys[pid] || [])
        .map(p => L.polygon(p, { pane: 'capas', className: `mi-capa imp-${c.imp}`, interactive: false }));
      let mayor = null, area = -1;
      shapes.forEach(s => { const b = s.getBounds(), a = (b.getNorth() - b.getSouth()) * (b.getEast() - b.getWest()); if (a > area) { area = a; mayor = s; } });
      const rotulo = L.marker(c.rot || (mayor ? mayor.getBounds().getCenter() : [0, 0]), {
        pane: 'rotulos', interactive: false, keyboard: false,
        icon: L.divIcon({ className: `mi-txt mi-capa-n imp-${c.imp}`, html: `<span>${esc(c.n)}<em>${esc(c.periodo)}</em></span>`, iconSize: null })
      });
      capas[id] = { ...c, grupo: L.layerGroup(shapes), rotulo };
    });
    // Rótulos fijos
    L.layerGroup(GEO.rotulos.map(([t, la, lo, cls]) => L.marker([la, lo], {
      pane: 'rotulos', interactive: false, keyboard: false,
      icon: L.divIcon({ className: `mi-txt mi-fijo ${cls}`, html: `<span>${esc(t)}</span>`, iconSize: null })
    }))).addTo(map);
    // Lugares
    const lugares = {};
    const capaLugares = L.layerGroup().addTo(map);
    Object.entries(GEO.lugares).forEach(([id, [n, la, lo, lado = 'right']]) => {
      lugares[id] = { n, lado, dot: L.circleMarker([la, lo], { radius: 5.5, className: 'mi-pt', interactive: false }) };
    });
    // Trazos
    const bearing = (a, b) => {
      const pa = map.options.crs.latLngToPoint(L.latLng(a), 0), pb = map.options.crs.latLngToPoint(L.latLng(b), 0);
      return Math.atan2(pb.x - pa.x, -(pb.y - pa.y)) * 180 / Math.PI;
    };
    const trazos = {};
    Object.entries(GEO.trazos).forEach(([id, t]) => {
      const n = t.l.length;
      const linea = L.polyline(t.l, { pane: 'trazos', className: 'mi-trazo', interactive: false });
      const flecha = L.marker(t.l[n - 1], { pane: 'trazos', interactive: false, keyboard: false,
        icon: L.divIcon({ className: 'mi-flecha', iconSize: [14, 14], html: `<div style="transform:rotate(${bearing(t.l[n - 2], t.l[n - 1])}deg)">${ARROW}</div>` }) });
      trazos[id] = { ...t, linea, flecha, grupo: L.layerGroup([linea, flecha]) };
    });
    function parcial(pts, f) {
      if (f >= 1) return pts;
      const P = pts.map(p => map.options.crs.latLngToPoint(L.latLng(p), 0));
      const seg = []; let total = 0;
      for (let i = 1; i < P.length; i++) { seg.push(P[i].distanceTo(P[i - 1])); total += seg[i - 1]; }
      let goal = total * f;
      for (let i = 1; i < P.length; i++) {
        if (goal <= seg[i - 1]) {
          const ll = map.options.crs.pointToLatLng(P[i - 1].add(P[i].subtract(P[i - 1]).multiplyBy(seg[i - 1] ? goal / seg[i - 1] : 0)), 0);
          return pts.slice(0, i).concat([[ll.lat, ll.lng]]);
        }
        goal -= seg[i - 1];
      }
      return pts;
    }

    let estado = null, conVecinos = false, anim = null;
    function pintar(animar) {
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      const e = estado;
      const propias = e.capas || [];
      const vecinas = conVecinos ? (e.vecinos || []).filter(v => !propias.includes(v)) : [];
      Object.entries(capas).forEach(([id, c]) => {
        const on = propias.includes(id) || vecinas.includes(id);
        [c.grupo, c.rotulo].forEach(l => { if (on && !map.hasLayer(l)) l.addTo(map); if (!on && map.hasLayer(l)) map.removeLayer(l); });
        if (on) {
          c.grupo.eachLayer(p => p.getElement()?.classList.toggle('vecino', vecinas.includes(id)));
          c.rotulo.getElement()?.classList.toggle('vecino', vecinas.includes(id));
        }
      });
      btnVec.hidden = !(e.vecinos || []).length;
      btnVec.setAttribute('aria-pressed', String(conVecinos));

      capaLugares.clearLayers();
      (e.lugares || []).forEach(id => {
        const l = lugares[id];
        if (!l) return;
        l.dot.unbindTooltip();
        l.dot.bindTooltip(esc(l.n), { className: 'mi-lbl', direction: l.lado, offset: OFF[l.lado], permanent: true });
        capaLugares.addLayer(l.dot);
      });

      const activos = e.trazos || [];
      Object.entries(trazos).forEach(([id, t]) => {
        const on = activos.includes(id);
        if (on && !map.hasLayer(t.grupo)) t.grupo.addTo(map);
        if (!on && map.hasLayer(t.grupo)) map.removeLayer(t.grupo);
        t.linea.setLatLngs(t.l);
        // Un segundo trazo en el mismo mapa se dibuja con otro color, para distinguirlos en la leyenda
        const segundo = on && activos.indexOf(id) > 0;
        const el = t.linea.getElement && t.linea.getElement();
        if (el) el.classList.toggle('mi-trazo-2', segundo);
        const fl = t.flecha.getElement && t.flecha.getElement();
        if (fl) fl.classList.toggle('mi-flecha-2', segundo);
      });
      if (animar && activos.length && !reduceMotion) {
        const t0 = performance.now(), dur = 1600;
        const tick = now => {
          const k = Math.min(1, (now - t0) / dur), f = 1 - Math.pow(1 - k, 3);
          activos.forEach(id => {
            trazos[id].linea.setLatLngs(parcial(trazos[id].l, Math.max(0.01, f)));
            const el = trazos[id].flecha.getElement();
            if (el) el.style.opacity = k >= 1 ? 1 : 0;
          });
          anim = k < 1 ? requestAnimationFrame(tick) : null;
        };
        anim = requestAnimationFrame(tick);
      }

      const filas = [...propias, ...vecinas].filter(id => capas[id]).map(id => {
        const c = capas[id];
        return `<span class="${vecinas.includes(id) ? 'vec' : ''}"><i class="sw imp-${c.imp}"></i>${esc(c.n)}, ${esc(c.periodo)}</span>`;
      }).concat(activos.filter(id => trazos[id]).map((id, k) => `<span><i class="sw-trazo${k ? ' sw-trazo-2' : ''}"></i>${esc(trazos[id].n)}</span>`));
      leyenda.innerHTML = filas.join('');
      leyenda.hidden = !filas.length;
    }
    function encuadrar(animar) {
      if (!estado || !estado.view) return;
      const opts = { padding: [28, 28], maxZoom: 8 };
      if (animar && !reduceMotion) map.flyToBounds(estado.view, { ...opts, duration: 1 });
      else map.fitBounds(estado.view, { ...opts, animate: false });
    }
    btnVec.addEventListener('click', () => { conVecinos = !conVecinos; pintar(false); });

    function mostrar(e, animar) {
      const nuevo = !estado || e !== estado;
      estado = e;
      if (nuevo) conVecinos = !!e.conVecinos;
      map.invalidateSize();
      pintar(animar);
      encuadrar(animar);
    }
    new ResizeObserver(() => { map.invalidateSize(); }).observe(cont);
    return { mostrar, ajustar: () => { map.invalidateSize(); encuadrar(false); }, mapa: map };
  }

  const css = document.createElement('style');
  css.textContent = `
:root { --babilonia:#6b4e7c; --asiria:#5a5750; --persia:#4a6b7c; --media:#5e7d4f; --lidia:#8a5a44; --egipto:#a9772a; --grecia:#3f6fa3; --roma:#9e2b25; --hititas:#7d6b3d;
  --mi-trazo:#b8322a; --mi-mar:#dbe4ea; --mi-tierra:#f4f2ec; --mi-costa:#c9c6bb; --mi-rio:#8cadc5; --mi-rotulo:#5d6372; }
:root[data-theme="dark"] { --mi-mar:#141a22; --mi-tierra:#2c3038; --mi-costa:#444955; --mi-rio:#3f5f7a; --mi-rotulo:#a3a7b2; --mi-trazo:#e0786d; }
.mi { position: relative; overflow: hidden; background: var(--mi-mar); }
.mi-lienzo { position: absolute; inset: 0; background: var(--mi-mar); font-family: var(--sans, system-ui, sans-serif); }
.mi .leaflet-pane > svg { max-width: none !important; max-height: none !important; }
.mi .leaflet-control-attribution { font-size: .66rem; }
:root[data-theme="dark"] .mi .leaflet-control-attribution { background: rgba(21,23,28,.7); color: var(--muted, #9a9ca6); }
:root[data-theme="dark"] .mi .leaflet-control-attribution a { color: inherit; }
.mi-tierra { fill: var(--mi-tierra); fill-opacity: 1; stroke: var(--mi-costa); stroke-width: .8; }
.mi-agua { fill: var(--mi-mar); fill-opacity: 1; stroke: var(--mi-costa); stroke-width: .6; }
.mi-rio { fill: none; stroke: var(--mi-rio); stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.mi-capa { fill-opacity: .3; stroke-width: 1.6; stroke-linejoin: round; }
.mi-capa.vecino { fill-opacity: .13; stroke-width: 1.2; stroke-dasharray: 5 4; }
${['babilonia', 'asiria', 'persia', 'media', 'lidia', 'egipto', 'grecia', 'roma', 'hititas'].map(i =>
  `.mi-capa.imp-${i}{fill:var(--${i});stroke:var(--${i})}.mi-capa-n.imp-${i}{color:var(--${i})}.mi .sw.imp-${i}{background:var(--${i})}`).join('\n')}
.mi-txt { background: none; border: 0; white-space: nowrap; pointer-events: none; }
.mi-txt > span { display: block; transform: translate(-50%, -50%); }
.mi-fijo { font-family: var(--sans, system-ui, sans-serif); font-size: .72rem; font-weight: 500; color: var(--mi-rotulo); }
.mi-fijo.mar { font-family: var(--serif, Georgia, serif); font-style: italic; font-size: .9rem; color: color-mix(in srgb, var(--mi-rio) 70%, var(--mi-rotulo)); }
.mi-fijo.rio { font-family: var(--serif, Georgia, serif); font-style: italic; font-size: .82rem; color: var(--mi-rio); }
.mi-fijo.region { font-size: .7rem; letter-spacing: .06em; opacity: .8; }
.mi-capa-n { font-family: var(--serif, Georgia, serif); font-size: 1.05rem; font-weight: 500; text-align: center; line-height: 1.15; }
.mi-capa-n em { display: block; font-family: var(--sans, system-ui, sans-serif); font-style: normal; font-size: .68rem; font-weight: 500; opacity: .85; }
.mi-capa-n.vecino { font-size: .86rem; opacity: .8; }
:root[data-theme="dark"] .mi-capa-n { filter: brightness(1.7) saturate(.8); }
.mi-pt { fill: var(--accent, #9e2b25); fill-opacity: 1; stroke: var(--mi-tierra); stroke-width: 2; }
.leaflet-tooltip.mi-lbl { font-family: var(--sans, system-ui, sans-serif); font-size: .76rem; font-weight: 600; color: #1f2430;
  background: rgba(255,255,255,.88); border: 0; border-radius: 4px; box-shadow: none; padding: .05rem .35rem; }
.leaflet-tooltip.mi-lbl::before { display: none; }
:root[data-theme="dark"] .leaflet-tooltip.mi-lbl { background: rgba(21,23,28,.85); color: #ebe9e4; }
.mi-trazo { fill: none; stroke: var(--mi-trazo); stroke-width: 3; stroke-dasharray: 8 6; stroke-linecap: round; stroke-linejoin: round; }
.mi-flecha { background: none; border: 0; color: var(--mi-trazo); }
.mi-trazo.mi-trazo-2 { stroke: var(--mi-trazo-2, #2f6fa5); stroke-dasharray: 3 6; }
.mi-flecha.mi-flecha-2 { color: var(--mi-trazo-2, #2f6fa5); }
.mi-flecha div, .mi-flecha svg { width: 100%; height: 100%; display: block; }
.mi-leyenda { position: absolute; left: .75rem; bottom: .75rem; z-index: 500; display: flex; flex-direction: column; gap: .25rem;
  font: 500 .74rem var(--sans, system-ui, sans-serif); color: var(--ink, #1f2430); background: color-mix(in srgb, var(--bg, #fafaf8) 88%, transparent);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); border: 1px solid var(--line, #e4e4df); border-radius: 10px; padding: .45rem .7rem;
  pointer-events: none; max-width: calc(100% - 5rem); }
.mi-leyenda[hidden] { display: none; }
.mi-leyenda span { display: flex; align-items: center; gap: .5rem; }
.mi-leyenda .vec { color: var(--muted, #6b7080); }
.mi-leyenda .sw { flex: none; width: .9rem; height: .65rem; border-radius: 2px; opacity: .75; }
.mi-leyenda .vec .sw { opacity: .35; }
.mi-leyenda .sw-trazo { flex: none; width: .9rem; border-top: 2.5px dashed var(--mi-trazo); }
.mi-leyenda .sw-trazo.sw-trazo-2 { border-top: 2.5px dotted var(--mi-trazo-2, #2f6fa5); }
.mi-btn { position: absolute; top: .75rem; right: .75rem; z-index: 500; display: inline-flex; align-items: center; gap: .45rem;
  font: 500 .8rem var(--sans, system-ui, sans-serif); color: var(--ink, #1f2430); background: color-mix(in srgb, var(--bg, #fafaf8) 88%, transparent);
  border: 1px solid var(--line, #e4e4df); border-radius: 999px; padding: .4rem .85rem; cursor: pointer; }
.mi-btn[hidden] { display: none; }
.mi-btn::before { content: ""; width: .5rem; height: .5rem; border-radius: 50%; border: 1.5px solid var(--muted, #6b7080); }
.mi-btn[aria-pressed="true"]::before { background: var(--accent, #9e2b25); border-color: var(--accent, #9e2b25); }
.mi-error { position: absolute; inset: 0; display: grid; place-items: center; padding: 2rem; text-align: center; color: var(--muted, #6b7080); }
@media (max-width: 760px) { .mi .leaflet-control-zoom { display: none; } .mi-leyenda { font-size: .66rem; } }`;
  document.head.appendChild(css);

  window.MapaImperios = { crear };
})();
