/* ==========================================================
   citas.js — Burbuja de citas bíblicas (compartido)
   Convierte las referencias del texto (p. ej. «Dn 5:30-31»,
   «Daniel 5:7, 16, 29», «2 R 24:14; 25:12») en botones que abren
   una burbuja con el versículo. El texto sale de citas-rv1960.js:
   una referencia solo se vuelve botón si TODOS sus versículos están ahí.
   Las que faltan se listan en la consola (Citas.faltantes()).

   Uso: cargar citas-rv1960.js y luego este archivo. Procesa la página
   sola y vigila el contenido que se agregue después (diapositivas).
   Para excluir una zona: clase «no-citas». API: window.Citas.procesar(nodo).
   No depende de ningún CSS: trae sus estilos, con los tokens del sitio
   si existen (--bg, --ink, --muted, --line, --accent, --serif, --sans).
   ========================================================== */
(() => {
  'use strict';
  if (window.Citas) return;

  /* ---------- Libros: id, nombre para mostrar, formas aceptadas ---------- */
  const LIBROS = [
    ['gn', 'Génesis', ['Génesis', 'Genesis', 'Gn', 'Gén', 'Gen']],
    ['ex', 'Éxodo', ['Éxodo', 'Exodo', 'Éx', 'Ex']],
    ['lv', 'Levítico', ['Levítico', 'Levitico', 'Lv', 'Lev']],
    ['nm', 'Números', ['Números', 'Numeros', 'Nm', 'Núm', 'Num']],
    ['dt', 'Deuteronomio', ['Deuteronomio', 'Dt', 'Deut']],
    ['jos', 'Josué', ['Josué', 'Josue', 'Jos']],
    ['jue', 'Jueces', ['Jueces', 'Jue']],
    ['rt', 'Rut', ['Rut', 'Rt']],
    ['1s', '1 Samuel', ['1 Samuel', '1 Sam', '1 S', '1S']],
    ['2s', '2 Samuel', ['2 Samuel', '2 Sam', '2 S', '2S']],
    ['1r', '1 Reyes', ['1 Reyes', '1 Re', '1 R', '1R']],
    ['2r', '2 Reyes', ['2 Reyes', '2 Re', '2 R', '2R']],
    ['1cr', '1 Crónicas', ['1 Crónicas', '1 Cronicas', '1 Cr', '1Cr']],
    ['2cr', '2 Crónicas', ['2 Crónicas', '2 Cronicas', '2 Cr', '2Cr']],
    ['esd', 'Esdras', ['Esdras', 'Esd']],
    ['neh', 'Nehemías', ['Nehemías', 'Nehemias', 'Neh']],
    ['est', 'Ester', ['Ester', 'Est']],
    ['job', 'Job', ['Job']],
    ['sal', 'Salmos', ['Salmos', 'Salmo', 'Sal']],
    ['pr', 'Proverbios', ['Proverbios', 'Prov', 'Pr']],
    ['ec', 'Eclesiastés', ['Eclesiastés', 'Eclesiastes', 'Ec', 'Ecl']],
    ['cnt', 'Cantares', ['Cantares', 'Cnt', 'Cant']],
    ['is', 'Isaías', ['Isaías', 'Isaias', 'Is']],
    ['jer', 'Jeremías', ['Jeremías', 'Jeremias', 'Jer']],
    ['lm', 'Lamentaciones', ['Lamentaciones', 'Lm', 'Lam']],
    ['ez', 'Ezequiel', ['Ezequiel', 'Ez']],
    ['dn', 'Daniel', ['Daniel', 'Dn', 'Dan']],
    ['os', 'Oseas', ['Oseas', 'Os']],
    ['jl', 'Joel', ['Joel', 'Jl']],
    ['am', 'Amós', ['Amós', 'Amos', 'Am']],
    ['abd', 'Abdías', ['Abdías', 'Abdias', 'Abd']],
    ['jon', 'Jonás', ['Jonás', 'Jonas', 'Jon']],
    ['mi', 'Miqueas', ['Miqueas', 'Miq', 'Mi']],
    ['nah', 'Nahúm', ['Nahúm', 'Nahum', 'Nah']],
    ['hab', 'Habacuc', ['Habacuc', 'Hab']],
    ['sof', 'Sofonías', ['Sofonías', 'Sofonias', 'Sof']],
    ['hag', 'Hageo', ['Hageo', 'Hag']],
    ['zac', 'Zacarías', ['Zacarías', 'Zacarias', 'Zac']],
    ['mal', 'Malaquías', ['Malaquías', 'Malaquias', 'Mal']],
    ['mt', 'Mateo', ['Mateo', 'Mt']],
    ['mr', 'Marcos', ['Marcos', 'Mr', 'Mc']],
    ['lc', 'Lucas', ['Lucas', 'Lc']],
    ['jn', 'Juan', ['Juan', 'Jn']],
    ['hch', 'Hechos', ['Hechos', 'Hch']],
    ['ro', 'Romanos', ['Romanos', 'Ro', 'Rom']],
    ['1co', '1 Corintios', ['1 Corintios', '1 Co', '1 Cor', '1Co']],
    ['2co', '2 Corintios', ['2 Corintios', '2 Co', '2 Cor', '2Co']],
    ['ga', 'Gálatas', ['Gálatas', 'Galatas', 'Gá', 'Gál', 'Ga']],
    ['ef', 'Efesios', ['Efesios', 'Ef']],
    ['fil', 'Filipenses', ['Filipenses', 'Fil', 'Flp']],
    ['col', 'Colosenses', ['Colosenses', 'Col']],
    ['1ts', '1 Tesalonicenses', ['1 Tesalonicenses', '1 Ts', '1 Tes', '1Ts']],
    ['2ts', '2 Tesalonicenses', ['2 Tesalonicenses', '2 Ts', '2 Tes', '2Ts']],
    ['1ti', '1 Timoteo', ['1 Timoteo', '1 Ti', '1 Tim', '1Ti']],
    ['2ti', '2 Timoteo', ['2 Timoteo', '2 Ti', '2 Tim', '2Ti']],
    ['tit', 'Tito', ['Tito', 'Tit']],
    ['flm', 'Filemón', ['Filemón', 'Filemon', 'Flm']],
    ['he', 'Hebreos', ['Hebreos', 'He', 'Heb']],
    ['stg', 'Santiago', ['Santiago', 'Stg']],
    ['1p', '1 Pedro', ['1 Pedro', '1 P', '1 Pe', '1P']],
    ['2p', '2 Pedro', ['2 Pedro', '2 P', '2 Pe', '2P']],
    ['1jn', '1 Juan', ['1 Juan', '1 Jn', '1Jn']],
    ['2jn', '2 Juan', ['2 Juan', '2 Jn', '2Jn']],
    ['3jn', '3 Juan', ['3 Juan', '3 Jn', '3Jn']],
    ['jud', 'Judas', ['Judas', 'Jud']],
    ['ap', 'Apocalipsis', ['Apocalipsis', 'Ap', 'Apoc']]
  ];
  const POR_FORMA = new Map();
  const NOMBRE = {};
  LIBROS.forEach(([id, n, formas]) => { NOMBRE[id] = n; formas.forEach(f => POR_FORMA.set(f.toLowerCase(), id)); });
  const formas = [...POR_FORMA.keys()].sort((a, b) => b.length - a.length)
    .map(f => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s'));
  // Versículos: «7», «2-4», «7, 16, 29»; capítulos encadenados con «;»
  const VV = '\\d{1,3}(?:\\s?[-–]\\s?\\d{1,3})?(?:,\\s?\\d{1,3}(?:\\s?[-–]\\s?\\d{1,3})?)*';
  const CAP = `\\d{1,3}:${VV}`;
  const RE = new RegExp(`(?<![\\p{L}\\d])(${formas.join('|')})\\.?\\s(${CAP}(?:;\\s?${CAP})*)(?![\\d:])`, 'giu');

  // Libros de un solo capítulo, citados sin capítulo
  const UNICOS = ['Abdías', 'Abdias', 'Abd', 'Filemón', 'Filemon', 'Flm', '2 Juan', '2 Jn', '3 Juan', '3 Jn', 'Judas', 'Jud']
    .sort((a, b) => b.length - a.length).map(f => f.replace(/ /g, '\\s'));
  const RE1 = new RegExp(`(?<![\\p{L}\\d])(${UNICOS.join('|')})\\.?\\s(${VV})(?![\\d:])`, 'gu');
  // Capítulos sin versículo: «Daniel 5», «Jeremías 50–51», «Isaías 13; 21; 45».
  // Distingue mayúsculas para no confundir palabras comunes («mi 4»). No incluye libros de un capítulo.
  const CC = '\\d{1,3}(?:\\s?[-–]\\s?\\d{1,3})?';
  const formasCap = LIBROS.filter(([id]) => !['abd', 'flm', '2jn', '3jn', 'jud'].includes(id))
    .flatMap(([, , f]) => f).sort((a, b) => b.length - a.length).map(f => f.replace(/ /g, '\\s'));
  const RECAP = new RegExp(`(?<![\\p{L}\\d])(${formasCap.join('|')})\\.?\\s(${CC}(?:;\\s?${CC}(?![\\d:]|\\s?\\p{L}))*)(?![\\d:\\p{L}])`, 'gu');
  const CAPS = () => window.RV1960_CAP || {};
  // Un versículo se busca primero en la base de citas y, si no está, en los capítulos completos
  const DB = () => {
    const base = window.RV1960 || {}, caps = CAPS();
    return new Proxy(base, {
      has: (t, k) => k in t || (() => { const m = /^(\S+) (\d+):(\d+)$/.exec(k); return !!(m && caps[`${m[1]} ${m[2]}`] && caps[`${m[1]} ${m[2]}`][m[3] - 1] !== undefined); })(),
      get: (t, k) => { if (k in t) return t[k]; const m = /^(\S+) (\d+):(\d+)$/.exec(k); return m && caps[`${m[1]} ${m[2]}`] ? caps[`${m[1]} ${m[2]}`][m[3] - 1] : undefined; }
    });
  };
  // «13–14; 39» → [13, 14, 39]
  const listaCaps = txt => txt.split(/;\s?/).flatMap(t => { const [a, b] = t.split(/\s?[-–]\s?/).map(Number); return Array.from({ length: (b || a) - a + 1 }, (_, k) => a + k); });
  const faltan = new Set();

  /* «5:7, 16; 6:1-3» → [{cap, vs:[7,16]}, {cap:6, vs:[1,2,3]}] */
  function desarmar(cuerpo) {
    return cuerpo.split(/;\s?/).map(trozo => {
      const [cap, resto] = trozo.split(':');
      const vs = [];
      resto.split(/,\s?/).forEach(r => {
        const [a, b] = r.split(/\s?[-–]\s?/).map(Number);
        for (let v = a; v <= (b || a); v++) vs.push(v);
      });
      return { cap: +cap, vs };
    });
  }

  function procesar(raiz) {
    if (!raiz || !window.RV1960) return;
    const walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement;
        if (!p || p.closest('script, style, textarea, select, option, button, a, code, .no-citas, .cita-ref, .cita-burbuja')) return NodeFilter.FILTER_REJECT;
        RE.lastIndex = 0; RE1.lastIndex = 0; RECAP.lastIndex = 0;
        return (RE.test(n.nodeValue) || RE1.test(n.nodeValue) || RECAP.test(n.nodeValue)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodos = [];
    while (walker.nextNode()) nodos.push(walker.currentNode);
    nodos.forEach(n => {
      const txt = n.nodeValue;
      // Coincidencias de ambos patrones, en orden y sin solaparse
      const hallazgos = [];
      RE.lastIndex = 0; let m;
      while ((m = RE.exec(txt))) hallazgos.push({ i: m.index, t: m[0], libro: m[1], ref: m[2] });
      RE1.lastIndex = 0;
      while ((m = RE1.exec(txt))) hallazgos.push({ i: m.index, t: m[0], libro: m[1], ref: '1:' + m[2] });
      RECAP.lastIndex = 0;
      while ((m = RECAP.exec(txt))) hallazgos.push({ i: m.index, t: m[0], libro: m[1], caps: m[2] });
      hallazgos.sort((a, b) => a.i - b.i); // orden estable: a igual posición gana el versículo
      const frag = document.createDocumentFragment();
      let ultimo = 0, cambio = false;
      // «Ap 14:8; 17–18»: capítulos completos que siguen a una cita del mismo libro
      const CONT = /^(;\s?)(\d{1,3}(?:\s?[-–]\s?\d{1,3})?)(?![\d:]|\s?\p{L})/u; // «; 2 Crónicas» no es continuación
      const continuar = id => {
        let c;
        while ((c = CONT.exec(txt.slice(ultimo)))) {
          const sinCap = listaCaps(c[2]).map(k => `${id} ${k}`).filter(k => !CAPS()[k]);
          if (sinCap.length) { sinCap.forEach(k => faltan.add(k)); break; }
          frag.append(txt.slice(ultimo, ultimo + c[1].length));
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'cita-ref cap'; b.textContent = c[2];
          b.dataset.libro = id; b.dataset.caps = c[2];
          b.setAttribute('aria-haspopup', 'dialog'); b.setAttribute('aria-expanded', 'false');
          frag.append(b);
          ultimo += c[0].length;
        }
      };
      hallazgos.forEach(h => {
        if (h.i < ultimo) return;
        const id = POR_FORMA.get(h.libro.toLowerCase().replace(/\s+/g, ' '));
        if (h.caps) {
          const sinCap = listaCaps(h.caps).map(c => `${id} ${c}`).filter(k => !CAPS()[k]);
          if (sinCap.length) { sinCap.forEach(k => faltan.add(k)); return; }
          frag.append(txt.slice(ultimo, h.i));
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'cita-ref cap'; b.textContent = h.t;
          b.dataset.libro = id; b.dataset.caps = h.caps;
          b.setAttribute('aria-haspopup', 'dialog'); b.setAttribute('aria-expanded', 'false');
          frag.append(b);
          ultimo = h.i + h.t.length; cambio = true;
          continuar(id);
          return;
        }
        const claves = desarmar(h.ref).flatMap(p => p.vs.map(v => `${id} ${p.cap}:${v}`));
        const faltantes = claves.filter(k => !(k in DB()));
        if (faltantes.length) { faltantes.forEach(k => faltan.add(k)); return; }
        frag.append(txt.slice(ultimo, h.i));
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cita-ref';
        b.textContent = h.t;
        b.dataset.libro = id;
        b.dataset.ref = h.ref;
        b.setAttribute('aria-haspopup', 'dialog');
        b.setAttribute('aria-expanded', 'false');
        frag.append(b);
        ultimo = h.i + h.t.length;
        cambio = true;
        continuar(id);
      });
      if (!cambio) return;
      frag.append(txt.slice(ultimo));
      n.replaceWith(frag);
    });
  }

  /* ---------- Burbuja ---------- */
  const burbuja = document.createElement('div');
  burbuja.className = 'cita-burbuja';
  burbuja.setAttribute('role', 'dialog');
  burbuja.hidden = true;
  burbuja.innerHTML = '<div class="cb-cab"><p class="cb-ref"></p><button type="button" class="cb-cerrar" aria-label="Cerrar cita">×</button></div><div class="cb-texto"></div><p class="cb-version">Reina-Valera 1960</p>';
  let origen = null;

  function abrir(btn) {
    const id = btn.dataset.libro;
    burbuja.classList.remove('larga');
    if (btn.dataset.caps) { abrirCapitulo(btn, id); return; }
    const partes = desarmar(btn.dataset.ref);
    const UNICO = ['abd', 'flm', '2jn', '3jn', 'jud'].includes(id);
    const titulo = `${NOMBRE[id]} ${(UNICO ? btn.dataset.ref.replace(/^1:/, '') : btn.dataset.ref).replace(/\s?[-–]\s?/g, '–')}`;
    burbuja.querySelector('.cb-ref').textContent = titulo;
    burbuja.setAttribute('aria-label', titulo);
    const html = partes.map((p, i) => {
      const versos = p.vs.map(v => `<sup>${v}</sup>${esc(DB()[`${id} ${p.cap}:${v}`])}`).join(' ');
      return `<p>${partes.length > 1 ? `<span class="cb-cap">${NOMBRE[id]} ${p.cap}</span>` : ''}${versos}</p>`;
    }).join('');
    burbuja.querySelector('.cb-texto').innerHTML = html;
    // Dentro de pantalla completa, la burbuja va en el elemento en pantalla completa
    const host = document.fullscreenElement || document.webkitFullscreenElement || document.body;
    if (burbuja.parentElement !== host) host.appendChild(burbuja);
    if (origen) origen.setAttribute('aria-expanded', 'false');
    origen = btn;
    btn.setAttribute('aria-expanded', 'true');
    burbuja.hidden = false;
    ubicar();
    burbuja.querySelector('.cb-cerrar').focus({ preventScroll: true });
  }
  /* Capítulos completos (citas-rv1960-capitulos.js) */
  function abrirCapitulo(btn, id) {
    const caps = listaCaps(btn.dataset.caps);
    const titulo = `${NOMBRE[id]} ${btn.dataset.caps.replace(/\s?[-–]\s?/g, '–')}`;
    burbuja.querySelector('.cb-ref').textContent = titulo;
    burbuja.setAttribute('aria-label', titulo);
    burbuja.querySelector('.cb-texto').innerHTML = caps.map(c =>
      `<p>${caps.length > 1 ? `<span class="cb-cap">${esc(NOMBRE[id])} ${c}</span>` : ''}${(CAPS()[`${id} ${c}`] || []).map((t, k) => `<sup>${k + 1}</sup>${esc(t)}`).join(' ')}</p>`).join('');
    burbuja.classList.add('larga');
    mostrarBurbuja(btn);
    burbuja.scrollTop = 0;
  }
  function mostrarBurbuja(btn) {
    const host = document.fullscreenElement || document.webkitFullscreenElement || document.body;
    if (burbuja.parentElement !== host) host.appendChild(burbuja);
    if (origen) origen.setAttribute('aria-expanded', 'false');
    origen = btn;
    btn.setAttribute('aria-expanded', 'true');
    burbuja.hidden = false;
    ubicar();
    burbuja.querySelector('.cb-cerrar').focus({ preventScroll: true });
  }
  function cerrar(devolverFoco) {
    if (burbuja.hidden) return;
    burbuja.hidden = true;
    if (origen) {
      origen.setAttribute('aria-expanded', 'false');
      if (devolverFoco) origen.focus({ preventScroll: true });
    }
    origen = null;
  }
  function ubicar() {
    if (!origen || burbuja.hidden) return;
    const angosta = window.innerWidth < 600;
    burbuja.classList.toggle('hoja', angosta);
    if (angosta) { burbuja.style.left = burbuja.style.top = ''; return; }
    const r = origen.getBoundingClientRect();
    const w = burbuja.offsetWidth, h = burbuja.offsetHeight, m = 12;
    let x = Math.min(Math.max(m, r.left + r.width / 2 - w / 2), window.innerWidth - w - m);
    let y = r.bottom + 10;
    if (y + h > window.innerHeight - m) y = Math.max(m, r.top - h - 10);
    burbuja.style.left = x + 'px';
    burbuja.style.top = y + 'px';
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('.cita-ref');
    if (b) {
      e.preventDefault();
      e.stopPropagation(); // que el clic no avance la diapositiva
      if (origen === b && !burbuja.hidden) cerrar(); else abrir(b);
      return;
    }
    if (e.target.closest && e.target.closest('.cb-cerrar')) { e.stopPropagation(); cerrar(true); return; }
    if (!burbuja.hidden && !burbuja.contains(e.target)) cerrar();
  }, true);
  document.addEventListener('keydown', e => {
    if (burbuja.hidden) return;
    if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); cerrar(true); }
    // Con la burbuja abierta, las flechas no cambian de diapositiva
    else if (['ArrowLeft', 'ArrowRight', ' ', 'PageDown', 'PageUp'].includes(e.key)) { e.stopPropagation(); e.preventDefault(); cerrar(true); }
  }, true);
  window.addEventListener('resize', ubicar);
  // Desplazar la página cierra la burbuja; desplazar la burbuja misma, no
  window.addEventListener('scroll', e => {
    if (e.target === burbuja || (e.target.nodeType === 1 && burbuja.contains(e.target))) return;
    cerrar();
  }, true);

  /* ---------- Estilos propios ---------- */
  const css = document.createElement('style');
  css.textContent = `
.cita-ref { font: inherit; color: inherit; background: none; border: 0; padding: 0; margin: 0; cursor: pointer;
  text-decoration: underline dotted; text-decoration-color: var(--accent, #9e2b25); text-decoration-thickness: 1.5px;
  text-underline-offset: 0.18em; border-radius: 2px; }
.cita-ref:hover, .cita-ref[aria-expanded="true"] { color: var(--accent, #9e2b25); text-decoration-style: solid; }
.cita-ref:focus-visible { outline: 2px solid var(--accent, #9e2b25); outline-offset: 2px; }
.cita-burbuja { position: fixed; z-index: 10000; width: min(26rem, calc(100vw - 24px)); max-height: min(22rem, 60vh); overflow-y: auto;
  background: var(--bg, #fafaf8); color: var(--ink, #1f2430); border: 1px solid var(--line, #e4e4df); border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,.18); padding: 0.85rem 1rem 0.7rem; text-align: left;
  overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
.cita-burbuja[hidden] { display: none; }
.cita-burbuja.hoja { left: 0 !important; right: 0; bottom: 0; top: auto !important; width: auto; max-height: 55vh; border-radius: 14px 14px 0 0;
  padding-bottom: calc(0.8rem + env(safe-area-inset-bottom, 0px)); }
.cita-burbuja .cb-cab { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.45rem; }
.cita-burbuja .cb-ref { margin: 0; font-family: var(--sans, system-ui, sans-serif); font-size: 0.8rem; font-weight: 600; color: var(--accent, #9e2b25); }
.cita-burbuja .cb-cerrar { font: 500 1.25rem/1 var(--sans, system-ui, sans-serif); color: var(--muted, #6b7080); background: none; border: 0;
  padding: 0.1rem 0.35rem; cursor: pointer; border-radius: 4px; }
.cita-burbuja .cb-cerrar:hover { color: var(--ink, #1f2430); }
.cita-burbuja .cb-texto p { margin: 0 0 0.5rem; font-family: var(--serif, Georgia, serif); font-size: 1.02rem; line-height: 1.55; }
.cita-burbuja .cb-texto sup { font-family: var(--sans, system-ui, sans-serif); font-size: 0.66em; font-weight: 600; color: var(--muted, #6b7080); margin-right: 0.2em; }
.cita-burbuja .cb-cap { display: block; font-family: var(--sans, system-ui, sans-serif); font-size: 0.72rem; font-weight: 600; color: var(--muted, #6b7080); margin-bottom: 0.15rem; }
.cita-burbuja.larga { width: min(36rem, calc(100vw - 24px)); max-height: min(34rem, 75vh); }
.cita-burbuja.larga.hoja { max-height: 75vh; }
.cita-burbuja .cb-version { margin: 0.2rem 0 0; font-family: var(--sans, system-ui, sans-serif); font-size: 0.68rem; color: var(--muted, #6b7080); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .cita-burbuja { box-shadow: 0 10px 30px rgba(0,0,0,.5); } }`;
  document.head.appendChild(css);

  /* ---------- Arranque y contenido dinámico ---------- */
  const cola = new Set();
  let pendiente = null;
  const obs = new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(n => {
      const el = n.nodeType === 1 ? n : n.parentElement;
      if (el && !el.classList.contains('cita-ref') && !burbuja.contains(el)) cola.add(el);
    }));
    if (pendiente || !cola.size) return;
    pendiente = requestAnimationFrame(() => {
      pendiente = null;
      const lote = [...cola]; cola.clear();
      lote.forEach(el => { if (el.isConnected) procesar(el); });
    });
  });
  function iniciar() {
    procesar(document.body);
    obs.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();

  window.Citas = { procesar, faltantes: () => [...faltan].sort(), libros: NOMBRE };
})();
