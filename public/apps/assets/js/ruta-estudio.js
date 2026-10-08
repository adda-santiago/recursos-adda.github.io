/* ==========================================================
   ruta-estudio.js — Motor de rutas de aprendizaje (compartido)
   Para estudio personal: cada estación es una lámina con un panel
   visual (imagen, mapa, tabla o pasaje) y el texto extendido.
   Las presentaciones para enseñar usan otro motor (segunda-guerra-mundial).

   La página solo necesita <div id="ruta-app"></div> y window.RUTA_DATA:
   {
     titulo, marca, inicio (href de la marca), credito (línea de derechos de la versión bíblica),
     rutas: [{
       id, grupo, n, info, pendiente,             // pendiente: aparece deshabilitada
       linea: { desde, hasta, hitos: [{ a, t }] },  // opcional (linea-tiempo.js)
       estaciones: [{
         id, n, ref, fecha,                         // fecha: año o [desde, hasta]; negativos = a.C.
         visual: [                                  // uno o varios (pestañas)
           { tipo: 'imagen', titulo, src, alt, pie, origen: 'ia' | 'foto', licencia, foco },  // foco: object-position del recorte
           { tipo: 'mapa', titulo, estado: {...} }  // estado de mapa-imperios.js
           { tipo: 'mapa', titulo, pasos: [{ t, fecha, estado }] },
           { tipo: 'tabla', titulo, tabla: { titulo, cab, filas, nota } },
           { tipo: 'cita', titulo, texto, ref }
         ],
         texto: ['párrafo', { h: 'subtítulo' },
                 { posturas: { titulo, a: { n, t }, b: { n, t }, c } }, ...],  // dos posturas y cómo se entienden
         pensar: 'pregunta'
       }]
     }]
   }
   Componentes opcionales que aprovecha si están cargados: citas.js,
   linea-tiempo.js, mapa-imperios.js.
   ========================================================== */
(() => {
  'use strict';
  const D = window.RUTA_DATA;
  const raiz = document.getElementById('ruta-app');
  if (!D || !raiz) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const root = document.documentElement;
  const RUTAS = D.rutas;
  const RUTA = Object.fromEntries(RUTAS.map(r => [r.id, r]));
  const activas = RUTAS.filter(r => !r.pendiente);

  /* ---------------- Estructura ---------------- */
  raiz.className = 're-app';
  raiz.innerHTML = `
    <div class="re-visual" id="re-visual">
      <div class="re-tabs" id="re-tabs" role="tablist" hidden></div>
      <figure class="re-v re-img" id="re-img" hidden></figure>
      <div class="re-v re-mapa" id="re-mapa" hidden></div>
      <div class="re-v re-tabla" id="re-tabla" hidden></div>
      <blockquote class="re-v re-cita" id="re-cita" hidden></blockquote>
      <div class="re-pasos" id="re-pasos" hidden>
        <button type="button" class="re-paso-btn" id="re-paso-ant" aria-label="Paso anterior">‹</button>
        <p class="re-paso-txt" id="re-paso-txt" aria-live="polite"></p>
        <button type="button" class="re-paso-btn" id="re-paso-sig" aria-label="Paso siguiente">›</button>
      </div>
    </div>
    <article class="re-texto" id="re-texto">
      <div class="re-cab">
        <a class="re-marca brand" href="${esc(D.inicio || '../../')}">${esc(D.marca || '')}</a>
        <button type="button" class="re-tema" id="re-tema">Fondo oscuro</button>
      </div>
      <div class="re-cuerpo" id="re-cuerpo" tabindex="-1">
        <p class="re-kicker" id="re-kicker"></p>
        <h1 id="re-titulo"></h1>
        <p class="re-ref" id="re-ref"></p>
        <div class="re-parrafos" id="re-parrafos"></div>
        <aside class="re-pensar" id="re-pensar" hidden><strong>Para pensar</strong><p></p></aside>
        ${D.credito ? `<p class="re-credito">${esc(D.credito)}</p>` : ''}
      </div>
      <nav class="re-nav" aria-label="Estaciones">
        <button type="button" id="re-ant">Anterior</button>
        <span id="re-pos"></span>
        <button type="button" id="re-sig">Siguiente</button>
      </nav>
    </article>
    <div class="re-linea" id="re-linea"></div>
    <button type="button" class="re-rutas-btn" id="re-rutas-btn" aria-expanded="false" aria-controls="re-panel">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg><span>Rutas</span>
    </button>
    <aside class="re-panel" id="re-panel" hidden aria-label="Rutas de aprendizaje">
      <div class="re-panel-cab"><p>${esc(D.titulo)}</p><button type="button" id="re-ocultar">Ocultar</button></div>
      <div id="re-panel-lista"></div>
      ${D.credito ? `<p class="re-credito">${esc(D.credito)}</p>` : ''}
    </aside>`;
  const $ = id => document.getElementById(id);

  /* ---------------- Tema ---------------- */
  const btnTema = $('re-tema');
  function tema(oscuro) { root.dataset.theme = oscuro ? 'dark' : 'light'; btnTema.textContent = oscuro ? 'Fondo claro' : 'Fondo oscuro'; }
  tema(window.matchMedia('(prefers-color-scheme: dark)').matches);
  btnTema.addEventListener('click', () => tema(root.dataset.theme !== 'dark'));

  /* ---------------- Panel de rutas ---------------- */
  const panel = $('re-panel'), btnRutas = $('re-rutas-btn');
  function abrirPanel(abrir) {
    panel.hidden = !abrir;
    btnRutas.setAttribute('aria-expanded', String(abrir));
    if (abrir) { pintarPanel(); panel.querySelector('[aria-current="true"]')?.focus(); }
  }
  btnRutas.addEventListener('click', () => abrirPanel(panel.hidden));
  $('re-ocultar').addEventListener('click', () => { abrirPanel(false); btnRutas.focus(); });
  function pintarPanel() {
    const grupos = [...new Set(RUTAS.map(r => r.grupo))];
    $('re-panel-lista').innerHTML = grupos.map(g => `<section>${g !== D.titulo ? `<h2>${esc(g)}</h2>` : ''}${RUTAS.filter(r => r.grupo === g).map(r => r.pendiente
      ? `<div class="re-r pend"><span>${esc(r.n)}</span><em>En preparación</em></div>`
      : `<div class="re-r${r.id === ruta.id ? ' actual' : ''}">
          <button type="button" class="re-r-btn" data-r="${r.id}" data-e="0"><span>${esc(r.n)}</span>${r.info ? `<em>${esc(r.info)}</em>` : ''}</button>
          ${r.id === ruta.id ? `<ol>${r.estaciones.map((e, i) => `<li><button type="button" data-r="${r.id}" data-e="${i}" aria-current="${i === idx}"><b>${i + 1}</b>${esc(e.n)}</button></li>`).join('')}</ol>` : ''}
        </div>`).join('')}</section>`).join('');
  }
  $('re-panel-lista').addEventListener('click', e => {
    const b = e.target.closest('button[data-r]');
    if (!b) return;
    const cambiaRuta = b.dataset.r !== ruta.id;
    ir(b.dataset.r, +b.dataset.e);
    if (cambiaRuta) pintarPanel(); else abrirPanel(false);
  });

  /* ---------------- Línea de tiempo ---------------- */
  let linea = null, lineaDe = null;
  function prepararLinea() {
    if (lineaDe === ruta.id) return;
    lineaDe = ruta.id;
    if (linea) linea.destruir();
    linea = null;
    $('re-linea').hidden = !(ruta.linea && window.LineaTiempo);
    if (!$('re-linea').hidden) linea = window.LineaTiempo.crear($('re-linea'), ruta.linea);
    raiz.classList.toggle('sin-linea', $('re-linea').hidden);
  }
  const fechar = f => { if (linea && f !== undefined) linea.ir(f); };

  /* ---------------- Visual ---------------- */
  let mapa = null, vActual = 0, paso = 0;
  const vistas = ['re-img', 're-mapa', 're-tabla', 're-cita'];
  function pintarVisual(est, i) {
    vActual = i;
    const lista = est.visual || [];
    const tabs = $('re-tabs');
    tabs.hidden = lista.length < 2;
    tabs.innerHTML = lista.map((v, k) => `<button type="button" role="tab" data-v="${k}" aria-selected="${k === i}">${esc(v.titulo || v.tipo)}</button>`).join('');
    const v = lista[i];
    vistas.forEach(id => { $(id).hidden = true; });
    $('re-pasos').hidden = true;
    if (!v) return;
    if (v.tipo === 'imagen') {
      const f = $('re-img');
      const origen = v.origen === 'ia' ? 'Ilustración generada con IA' : `Foto${v.licencia ? ` · ${esc(v.licencia)}` : ''}`;
      f.innerHTML = (v.src
        ? `<img src="${esc(v.src)}" alt="${esc(v.alt)}"${v.foco ? ` style="object-position:${esc(v.foco)}"` : ''}>`
        : `<div class="re-img-pend" role="img" aria-label="${esc(v.alt)}"><span>${esc(v.alt)}</span><small>${v.origen === 'ia' ? 'Ilustración por generar' : 'Foto por agregar, con licencia verificada'}</small></div>`)
        + (v.pie ? `<figcaption>${esc(v.pie)} <em>${origen}</em></figcaption>` : '');
      f.hidden = false;
    } else if (v.tipo === 'mapa') {
      $('re-mapa').hidden = false;
      if (!mapa && window.MapaImperios) mapa = window.MapaImperios.crear($('re-mapa'));
      if (v.pasos) { paso = Math.min(paso, v.pasos.length - 1); pintarPaso(v, true); }
      else if (mapa) mapa.mostrar(v.estado, true);
    } else if (v.tipo === 'tabla') {
      const t = v.tabla;
      $('re-tabla').innerHTML = `<div class="re-tabla-in">${t.titulo ? `<h2>${esc(t.titulo)}</h2>` : ''}<div class="re-tabla-wrap"><table>
        <thead><tr>${t.cab.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${t.filas.map(f => `<tr>${f.map((c, k) => k === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>${t.nota ? `<p class="re-nota">${esc(t.nota)}</p>` : ''}</div>`;
      $('re-tabla').hidden = false;
    } else if (v.tipo === 'cita') {
      $('re-cita').innerHTML = `<p>${esc(v.texto)}</p><footer>${esc(v.ref)}</footer>`;
      $('re-cita').hidden = false;
    }
  }
  function pintarPaso(v, animar) {
    const p = v.pasos[paso];
    $('re-pasos').hidden = false;
    $('re-paso-txt').innerHTML = `<b>${paso + 1}/${v.pasos.length}</b> ${esc(p.t)}`;
    $('re-paso-ant').disabled = paso === 0;
    $('re-paso-sig').disabled = paso === v.pasos.length - 1;
    if (mapa) mapa.mostrar(p.estado, animar);
    fechar(p.fecha !== undefined ? p.fecha : est().fecha);
  }
  $('re-paso-ant').addEventListener('click', () => { paso--; pintarPaso(est().visual[vActual], true); });
  $('re-paso-sig').addEventListener('click', () => { paso++; pintarPaso(est().visual[vActual], true); });
  $('re-tabs').addEventListener('click', e => {
    const b = e.target.closest('button[data-v]');
    if (!b) return;
    paso = 0;
    pintarVisual(est(), +b.dataset.v);
    if (!est().visual[+b.dataset.v].pasos) fechar(est().fecha);
  });

  /* ---------------- Estación ---------------- */
  let ruta = activas[0], idx = 0;
  const est = () => ruta.estaciones[idx];
  function ir(rid, i, inicial) {
    const r = RUTA[rid];
    if (!r || r.pendiente || !r.estaciones[i]) return;
    ruta = r; idx = i; paso = 0;
    prepararLinea();
    const e = est();
    $('re-kicker').textContent = ruta.n;
    $('re-titulo').textContent = e.n;
    $('re-ref').textContent = e.ref || '';
    $('re-ref').hidden = !e.ref;
    $('re-parrafos').innerHTML = (e.texto || []).map(t => {
      if (typeof t === 'string') return `<p>${esc(t)}</p>`;
      if (t.h) return `<h2>${esc(t.h)}</h2>`;
      if (t.posturas) { const q = t.posturas; return `<section class="re-posturas"><h3>${esc(q.titulo)}</h3>
        <div class="re-pos2"><div><b>${esc(q.a.n)}</b><p>${esc(q.a.t)}</p></div><div><b>${esc(q.b.n)}</b><p>${esc(q.b.t)}</p></div></div>
        ${q.c ? `<div class="re-pos-c"><b>Cómo se entiende</b><p>${esc(q.c)}</p></div>` : ''}</section>`; }
      return '';
    }).join('');
    $('re-pensar').hidden = !e.pensar;
    $('re-pensar').querySelector('p').textContent = e.pensar || '';
    $('re-pos').textContent = `${idx + 1} de ${ruta.estaciones.length}`;
    $('re-ant').disabled = idx === 0;
    $('re-sig').disabled = idx === ruta.estaciones.length - 1;
    btnRutas.querySelector('span').textContent = ruta.n;
    pintarVisual(e, 0);
    if (!(e.visual && e.visual[0] && e.visual[0].pasos)) fechar(e.fecha);
    $('re-cuerpo').scrollTop = 0;
    if (!inicial) {
      if (window.innerWidth <= 760) raiz.scrollIntoView({ block: 'start' });
      history.replaceState(null, '', `#${ruta.id}/${idx + 1}`);
    }
  }
  $('re-ant').addEventListener('click', () => ir(ruta.id, idx - 1));
  $('re-sig').addEventListener('click', () => ir(ruta.id, idx + 1));
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    if (e.key === 'Escape' && !panel.hidden) { abrirPanel(false); btnRutas.focus(); return; }
    if (!panel.hidden) return;
    if (e.key === 'ArrowRight') ir(ruta.id, idx + 1);
    if (e.key === 'ArrowLeft') ir(ruta.id, idx - 1);
  });

  // Entrada: #ruta/numero
  const m = location.hash.match(/^#([\w-]+)\/(\d+)$/);
  if (m && RUTA[m[1]] && !RUTA[m[1]].pendiente) ir(m[1], Math.max(0, +m[2] - 1), true); else ir(ruta.id, 0, true);
  window.fypReset = () => ir(activas[0].id, 0);
})();
