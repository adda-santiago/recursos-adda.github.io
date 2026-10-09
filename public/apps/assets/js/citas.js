/* ==========================================================
   citas.js — Burbuja de citas bíblicas (compartido)
   Convierte las referencias del texto en botones que abren una burbuja
   con el pasaje: versículos («Dn 5:30-31», «Daniel 5:7, 16, 29»,
   «2 R 24:14; 25:12», «Abd 11-12») o capítulos completos («Daniel 5»,
   «Jeremías 50–51», «Ap 14:8; 17–18»).

   Texto bíblico: public/biblia/ (generado por herramientas/biblia/generar.py)
     versiones.json · indice.json · {versión}/{libro}/{capítulo}.json
   Cada capítulo se descarga solo cuando se toca una cita, y queda en memoria.
   El índice valida las citas: una referencia que no existe en la versión
   por defecto no se vuelve botón y se lista en Citas.faltantes().

   Versión: la elige la persona en la burbuja (o en la cabecera del sitio);
   se guarda en el dispositivo (localStorage «fyp:v1:version-biblia») y la
   comparten el sitio y todas las apps.
   Ubicación del texto: por defecto, ../../biblia/ relativo a esta carpeta
   (public/apps/assets/js/ → public/biblia/). Se puede fijar con
   window.CITAS_BIBLIA = 'ruta/'. Para demos sin servidor: window.BIBLIA_EMBEBIDA
   = { versiones, indice, capitulos: { 'rv1960/dn/5': [...] } }.

   API: Citas.procesar(nodo), Citas.faltantes(), Citas.version(), Citas.cambiarVersion(id),
        Citas.versiones() → promesa con la lista.
   Para excluir una zona: clase «no-citas». Trae sus propios estilos.
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
  // «44:28» y rangos; también rangos entre capítulos: «44:28–45:4»
  const CAP = `(?:\\d{1,3}:\\d{1,3}\\s?[-–]\\s?\\d{1,3}:\\d{1,3}|\\d{1,3}:${VV})`;
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

  const UNICO = ['abd', 'flm', '2jn', '3jn', 'jud'];
  // «13–14; 39» → [13, 14, 39]
  const listaCaps = txt => txt.split(/;\s?/).flatMap(t => { const [a, b] = t.split(/\s?[-–]\s?/).map(Number); return Array.from({ length: (b || a) - a + 1 }, (_, k) => a + k); });
  const faltan = new Set();
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Texto bíblico ---------- */
  const SCRIPT = document.currentScript && document.currentScript.src;
  const BASE = window.CITAS_BIBLIA || (SCRIPT ? new URL('../../../biblia/', SCRIPT).href : '../../biblia/');
  const EMB = window.BIBLIA_EMBEBIDA || null;
  const CLAVE = 'fyp:v1:version-biblia';
  let VERSIONES = [], INDICE = null, REF = 'rv1960';
  const cache = new Map();
  const json = url => fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  const listo = (EMB ? Promise.resolve([EMB.versiones, EMB.indice]) : Promise.all([json(BASE + 'versiones.json'), json(BASE + 'indice.json')]))
    .then(([v, i]) => { VERSIONES = v; INDICE = i; REF = (v.find(x => x.defecto) || v[0]).id; })
    .catch(e => console.warn('citas.js: no se pudo cargar el texto bíblico', e));
  function version() {
    let v = null;
    // Mismo formato que src/lib/storage.ts (almacen): el valor se guarda como JSON
    try { const r = localStorage.getItem(CLAVE); v = r && r.startsWith('"') ? JSON.parse(r) : r; } catch (e) { /* sin almacenamiento */ }
    return VERSIONES.some(x => x.id === v) ? v : REF;
  }
  function cambiarVersion(id) {
    try { localStorage.setItem(CLAVE, JSON.stringify(id)); } catch (e) { /* sin almacenamiento */ }
    if (origen && !burbuja.hidden) abrir(origen);
    window.dispatchEvent(new CustomEvent('citas:version', { detail: id }));
  }
  function capitulo(ver, libro, cap) {
    const k = `${ver}/${libro}/${cap}`;
    if (EMB) return Promise.resolve(EMB.capitulos[k] || null);
    if (!cache.has(k)) cache.set(k, json(`${BASE}${k}.json`).catch(() => { cache.delete(k); return null; }));
    return cache.get(k);
  }
  // ¿Existe el capítulo / versículo en la versión de referencia?
  const nVers = (libro, cap) => ((INDICE.versiculos[REF] || {})[libro] || [])[cap - 1] || 0;

  /* «5:7, 16; 6:1-3» → [{cap, vs:[7,16]}, {cap:6, vs:[1,2,3]}] */
  /* «5:7, 16; 6:1-3» → [{cap:5, vs:[7,16]}, {cap:6, vs:[1,2,3]}]
     «44:28–45:4» → [{cap:44, vs:[28…fin]}, {cap:45, vs:[1…4]}] (el fin del capítulo sale del índice) */
  function desarmar(cuerpo, id) {
    return cuerpo.split(/;\s?/).flatMap(trozo => {
      const x = trozo.match(/^(\d+):(\d+)\s?[-–]\s?(\d+):(\d+)$/);
      if (x) {
        const [c1, v1, c2, v2] = x.slice(1).map(Number), out = [];
        for (let c = c1; c <= c2; c++) {
          const fin = c === c2 ? v2 : (id && INDICE ? nVers(id, c) : v1);
          const ini = c === c1 ? v1 : 1;
          out.push({ cap: c, vs: Array.from({ length: Math.max(0, fin - ini + 1) }, (_, k) => ini + k) });
        }
        return out;
      }
      const [cap, resto] = trozo.split(':');
      const vs = [];
      resto.split(/,\s?/).forEach(r => {
        const [a, b] = r.split(/\s?[-–]\s?/).map(Number);
        for (let v = a; v <= (b || a); v++) vs.push(v);
      });
      return [{ cap: +cap, vs }];
    });
  }



  function procesar(raiz) {
    if (!raiz || !INDICE) return;
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
      const boton = (texto, id, datos) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'cita-ref' + (datos.caps ? ' cap' : ''); b.textContent = texto;
        b.dataset.libro = id;
        if (datos.caps) b.dataset.caps = datos.caps; else b.dataset.ref = datos.ref;
        b.setAttribute('aria-haspopup', 'dialog'); b.setAttribute('aria-expanded', 'false');
        return b;
      };
      const capsValidos = (id, caps) => {
        const malos = listaCaps(caps).filter(c => !nVers(id, c));
        malos.forEach(c => faltan.add(`${id} ${c}`));
        return !malos.length;
      };
      // «Ap 14:8; 17–18»: capítulos completos que siguen a una cita del mismo libro
      const CONT = /^(;\s?)(\d{1,3}(?:\s?[-–]\s?\d{1,3})?)(?![\d:]|\s?\p{L})/u; // «; 2 Crónicas» no es continuación
      // «Daniel 1–7; 9:2»: versículos que siguen a una cita de capítulos del mismo libro
      const CONTV = new RegExp(`^(;\\s?)(${CAP})(?![\\d:])`, 'u');
      const continuar = id => {
        let c;
        for (;;) {
          const resto = txt.slice(ultimo);
          if ((c = CONT.exec(resto))) {
            if (!capsValidos(id, c[2])) break;
            frag.append(txt.slice(ultimo, ultimo + c[1].length), boton(c[2], id, { caps: c[2] }));
          } else if ((c = CONTV.exec(resto))) {
            const malos = desarmar(c[2], id).flatMap(p => p.vs.filter(v => v > nVers(id, p.cap)).map(v => `${id} ${p.cap}:${v}`));
            if (malos.length) { malos.forEach(k => faltan.add(k)); break; }
            frag.append(txt.slice(ultimo, ultimo + c[1].length), boton(c[2], id, { ref: c[2] }));
          } else break;
          ultimo += c[0].length;
        }
      };
      hallazgos.forEach(h => {
        if (h.i < ultimo) return;
        const id = POR_FORMA.get(h.libro.toLowerCase().replace(/\s+/g, ' '));
        if (h.caps) {
          if (!capsValidos(id, h.caps)) return;
        } else {
          const malos = desarmar(h.ref, id).flatMap(p => p.vs.filter(v => v > nVers(id, p.cap)).map(v => `${id} ${p.cap}:${v}`));
          if (malos.length) { malos.forEach(k => faltan.add(k)); return; }
        }
        frag.append(txt.slice(ultimo, h.i), boton(h.t, id, h));
        ultimo = h.i + h.t.length; cambio = true;
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
  burbuja.innerHTML = '<div class="cb-cab"><p class="cb-ref"></p><select class="cb-ver" aria-label="Versión de la Biblia"></select>'
    + '<button type="button" class="cb-cerrar" aria-label="Cerrar cita">×</button></div><div class="cb-texto"></div><p class="cb-version"></p>';
  const selVer = burbuja.querySelector('.cb-ver');
  selVer.addEventListener('change', () => cambiarVersion(selVer.value));
  let origen = null, turno = 0, abiertaEn = 0;

  async function abrir(btn) {
    const id = btn.dataset.libro, mio = ++turno;
    const ver = version();
    const meta = VERSIONES.find(v => v.id === ver) || {};
    const caps = btn.dataset.caps ? listaCaps(btn.dataset.caps) : null;
    const partes = caps ? caps.map(c => ({ cap: c, vs: null })) : desarmar(btn.dataset.ref, id);
    const refTxt = (btn.dataset.caps || (UNICO.includes(id) ? btn.dataset.ref.replace(/^1:/, '') : btn.dataset.ref)).replace(/\s?[-–]\s?/g, '–');
    const titulo = `${NOMBRE[id]} ${refTxt}`;
    burbuja.querySelector('.cb-ref').textContent = titulo;
    burbuja.setAttribute('aria-label', titulo);
    selVer.innerHTML = VERSIONES.map(v => `<option value="${v.id}"${v.id === ver ? ' selected' : ''}>${esc(v.abrev)}</option>`).join('');
    selVer.hidden = VERSIONES.length < 2;
    burbuja.querySelector('.cb-version').textContent = meta.credito || '';
    burbuja.classList.toggle('larga', !!caps);
    const texto = burbuja.querySelector('.cb-texto');
    texto.innerHTML = '<p class="cb-cargando">Cargando…</p>';
    mostrarBurbuja(btn);
    const datos = await Promise.all(partes.map(p => capitulo(ver, id, p.cap)));
    if (mio !== turno) return; // se abrió otra cita mientras cargaba
    texto.innerHTML = partes.map((p, k) => {
      const cap = datos[k];
      if (!cap) return `<p class="cb-aviso">No se pudo cargar ${esc(NOMBRE[id])} ${p.cap}. Revisa tu conexión.</p>`;
      const vs = p.vs || cap.map((_, i) => i + 1);
      const verso = v => cap[v - 1]
        ? `<sup>${v}</sup>${esc(cap[v - 1])}`
        : `<sup>${v}</sup><span class="cb-aviso">En la ${esc(meta.abrev || ver)} este versículo tiene otra numeración o está unido al anterior o al siguiente.</span>`;
      // Tramos de versículos seguidos; entre tramos, una marca de versículos omitidos (Dn 8:3-8, 20-22)
      const tramos = [];
      vs.forEach((v, k) => { if (k && v === vs[k - 1] + 1) tramos[tramos.length - 1].push(v); else tramos.push([v]); });
      const cuerpo = tramos.map(t => t.map(verso).join(' '))
        .join(`</p><p class="cb-salto" role="separator">versículos omitidos</p><p>`);
      return `<p>${partes.length > 1 ? `<span class="cb-cap">${esc(NOMBRE[id])} ${p.cap}</span>` : ''}${cuerpo}</p>`;
    }).join('');
    ubicar();
  }
  function mostrarBurbuja(btn) {
    const host = document.fullscreenElement || document.webkitFullscreenElement || document.body;
    if (burbuja.parentElement !== host) host.appendChild(burbuja);
    if (origen && origen !== btn) origen.setAttribute('aria-expanded', 'false');
    origen = btn;
    btn.setAttribute('aria-expanded', 'true');
    const nueva = burbuja.hidden;
    if (nueva) abiertaEn = performance.now();
    burbuja.hidden = false;
    if (nueva) burbuja.scrollTop = 0;
    ubicar();
    if (nueva) burbuja.querySelector('.cb-cerrar').focus({ preventScroll: true });
  }
  function cerrar(devolverFoco) {
    if (burbuja.hidden) return;
    burbuja.hidden = true;
    turno++;
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

  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('.cita-ref');
    if (b) {
      e.preventDefault();
      e.stopPropagation(); // que el clic no avance la diapositiva
      if (origen === b && !burbuja.hidden) cerrar(); else { burbuja.scrollTop = 0; abrir(b); }
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
    if (performance.now() - abiertaEn < 400) return; // desplazamiento propio del toque que la abrió
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
.cita-burbuja .cb-cab { display: flex; align-items: center; gap: 0.6rem; margin: -0.85rem -1rem 0.45rem; padding: 0.7rem 1rem 0.4rem;
  position: sticky; top: -0.85rem; z-index: 1; background: var(--bg, #fafaf8); }
.cita-burbuja .cb-ref { flex: 1; }
.cita-burbuja .cb-ver { font: 600 0.74rem var(--sans, system-ui, sans-serif); color: var(--ink, #1f2430); background: var(--bg, #fafaf8);
  border: 1px solid var(--line, #e4e4df); border-radius: 999px; padding: 0.2rem 0.5rem; cursor: pointer; }
.cita-burbuja .cb-ver[hidden] { display: none; }
.cita-burbuja .cb-aviso, .cita-burbuja .cb-cargando { font-family: var(--sans, system-ui, sans-serif); font-size: 0.8rem !important; font-style: italic; color: var(--muted, #6b7080); }
.cita-burbuja .cb-ref { margin: 0; font-family: var(--sans, system-ui, sans-serif); font-size: 0.8rem; font-weight: 600; color: var(--accent, #9e2b25); }
.cita-burbuja .cb-cerrar { font: 500 1.25rem/1 var(--sans, system-ui, sans-serif); color: var(--muted, #6b7080); background: none; border: 0;
  padding: 0.1rem 0.35rem; cursor: pointer; border-radius: 4px; }
.cita-burbuja .cb-cerrar:hover { color: var(--ink, #1f2430); }
.cita-burbuja .cb-texto p { margin: 0 0 0.5rem; font-family: var(--serif, Georgia, serif); font-size: 1.02rem; line-height: 1.55; }
.cita-burbuja .cb-texto sup { font-family: var(--sans, system-ui, sans-serif); font-size: 0.66em; font-weight: 600; color: var(--muted, #6b7080); margin-right: 0.2em; }
.cita-burbuja .cb-cap { display: block; font-family: var(--sans, system-ui, sans-serif); font-size: 0.72rem; font-weight: 600; color: var(--muted, #6b7080); margin-bottom: 0.15rem; }
.cita-burbuja.larga { width: min(36rem, calc(100vw - 24px)); max-height: min(34rem, 75vh); }
.cita-burbuja.larga.hoja { max-height: 75vh; }
.cita-burbuja .cb-texto p.cb-salto { display: flex; align-items: center; gap: 0.6rem; margin: 0.1rem 0 0.6rem;
  font-family: var(--sans, system-ui, sans-serif); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.04em; color: var(--muted, #6b7080); }
.cita-burbuja .cb-texto p.cb-salto::before, .cita-burbuja .cb-texto p.cb-salto::after { content: ""; flex: 1; border-top: 1px dashed var(--line, #e4e4df); }
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
    if (pendiente || !cola.size || !INDICE) return;
    pendiente = requestAnimationFrame(() => {
      pendiente = null;
      const lote = [...cola]; cola.clear();
      lote.forEach(el => { if (el.isConnected) procesar(el); });
    });
  });
  function iniciar() {
    obs.observe(document.body, { childList: true, subtree: true });
    listo.then(() => procesar(document.body));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  // Otra pestaña o el iframe del sitio cambió la versión: la burbuja abierta se actualiza
  window.addEventListener('storage', e => { if (e.key === CLAVE && origen && !burbuja.hidden) abrir(origen); });

  window.Citas = {
    procesar, faltantes: () => [...faltan].sort(), libros: NOMBRE, listo,
    version, cambiarVersion, versiones: () => listo.then(() => VERSIONES)
  };
})();
