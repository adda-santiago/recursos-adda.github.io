/* ==========================================================================
   APP.JS — Árbol Genealógico · Fuego y Palabra
   ==========================================================================
   Lógica de renderizado. No contiene datos de personas/relaciones/épocas
   (esos viven en personas.js, relaciones.js, epocas.js).
   ========================================================================== */

const ROOT_ID = "adan";
const ROW_HEIGHT = 150;
const COL_WIDTH = 160;
const SPOUSE_OFFSET = 0.95;
const RULER_WIDTH = 78;
let baseWidth = 0, baseHeight = 0, zoomLevel = 1;

/* ---------- Calibración aproximada de años según la fila ----------
   Estos años son aproximaciones tradicionales con fines ilustrativos,
   especialmente antes de Abraham, donde no existe consenso académico
   sobre fechas absolutas. A partir de David, se acercan a cronologías
   históricas más aceptadas. Números negativos = antes de Cristo. */
const ANIO_ANCLAS = [
  { fila: 0,     anio: -4000 }, // Adán (tradicional)
  { fila: 9,     anio: -2350 }, // Noé / diluvio (tradicional)
  { fila: 19,    anio: -2000 }, // Abraham
  { fila: 26,    anio: -1450 }, // Éxodo (Aminadab/Naasón)
  { fila: 32,    anio: -1010 }, // David
  { fila: 33.54, anio: -970 },  // Salomón
  { fila: 52,    anio: -609 },  // Josías
  { fila: 53.54, anio: -586 },  // Exilio / Jeconías
  { fila: 56.62, anio: -538 },  // Retorno / Zorobabel
  { fila: 66.61, anio: -332 },  // Jadúa (aprox., época de Alejandro Magno)
  { fila: 72,    anio: -5 },    // José / nacimiento de Jesús
  { fila: 74,    anio: 30 },    // Ministerio/muerte de Jesús
  { fila: 79.61, anio: 47 }     // Ananías (Hechos 23)
];
function anioParaFila(fila) {
  const a = ANIO_ANCLAS;
  if (fila <= a[0].fila) {
    const s = a[1] ? (a[1].anio - a[0].anio) / (a[1].fila - a[0].fila) : 0;
    return a[0].anio + (fila - a[0].fila) * s;
  }
  for (let i = 0; i < a.length - 1; i++) {
    if (fila >= a[i].fila && fila <= a[i + 1].fila) {
      const t = (fila - a[i].fila) / (a[i + 1].fila - a[i].fila);
      return a[i].anio + t * (a[i + 1].anio - a[i].anio);
    }
  }
  const last = a[a.length - 1], prev = a[a.length - 2];
  const s = (last.anio - prev.anio) / (last.fila - prev.fila);
  return last.anio + (fila - last.fila) * s;
}
function formatAnio(anio) {
  const n = Math.round(Math.abs(anio));
  return anio < 0 ? `${n} a.C.` : `${n} d.C.`;
}

const ROL_ICON = {
  rey: "👑", profeta: "📯", sacerdote: "🏛️", sumo_sacerdote: "🏛️", juez: "⚖️"
};
const ROL_LABEL = {
  rey: "Rey", profeta: "Profeta", sacerdote: "Sacerdote", sumo_sacerdote: "Sumo sacerdote", juez: "Juez"
};
const LINEA_COLOR = {
  jesus_mateo: "#C97B4A",
  jesus_lucas: "#E8A25A",
  sumos_sacerdotes: "#6B4E7C"
};

/* ---------- Índices auxiliares ---------- */
const hijosDe = {};      // id padre/madre -> [ {id hijo, relacion} ]
const conyugesDe = {};   // id -> [id conyuge]
const relFiliacionByChild = {}; // id hijo -> [relaciones filiacion que le llegan]

RELACIONES.forEach(r => {
  if (r.tipo === "filiacion") {
    (hijosDe[r.de] ||= []).push(r);
    (relFiliacionByChild[r.a] ||= []).push(r);
  } else if (r.tipo === "matrimonio") {
    (conyugesDe[r.de] ||= []).push(r.a);
    (conyugesDe[r.a] ||= []).push(r.de);
  }
});

function padrePrincipalDe(id) {
  const rels = relFiliacionByChild[id] || [];
  const principal = rels.find(r => r.principal);
  if (principal) return principal.de;
  // Si esta persona no tiene padre principal en los datos (típicamente una
  // esposa que se unió a la familia por matrimonio, o alguien cuya única
  // filiación registrada es solo visual/no-principal), la traza de
  // ancestros continúa a través de su cónyuge de sangre.
  const conyuges = conyugesDe[id] || [];
  for (const c of conyuges) {
    if ((relFiliacionByChild[c] || []).some(r => r.principal)) return c;
  }
  return null;
}
function hijosDeFamilia(id) {
  // Reúne los hijos vinculados directamente a "id" MÁS los vinculados a
  // cualquiera de sus cónyuges (ej. los hijos de Jacob están en los datos
  // conectados a "lea"/"raquel"/etc., no a "jacob" directamente).
  const anclas = [id, ...(conyugesDe[id] || [])];
  const vistos = new Set();
  const hijos = [];
  anclas.forEach(pid => {
    (hijosDe[pid] || []).filter(r => r.principal).forEach(r => {
      if (!vistos.has(r.a)) { vistos.add(r.a); hijos.push(r.a); }
    });
  });
  return hijos;
}

/* ---------- Estado ---------- */
const state = {
  collapsed: new Set(),         // ids de personas cuyo subárbol está colapsado
  epocas: new Set(EPOCAS.map(e=>e.id)),
  libros: new Set([...new Set(PERSONAS.flatMap(p=>p.libros))]),
  lineas: new Set(),            // líneas activas para resaltar ("" = ninguna resaltada especialmente, todas visibles)
  searchPath: null              // Set de ids si hay una búsqueda activa (modo traza)
};

function esTroncal(padreId, hijoId) {
  const anclas = new Set([padreId, ...(conyugesDe[padreId] || [])]);
  const rels = (relFiliacionByChild[hijoId] || []).filter(r => r.principal && anclas.has(r.de));
  return rels.some(r => r.troncal);
}
function pasoDe(padreId, hijoId) {
  // Permite que una rama con más generaciones registradas para el mismo
  // período (ej. Lucas 3, con ~40 generaciones entre David y José, frente
  // a las 26 de Mateo) avance más lento por fila, para que ambas ramas
  // lleguen a la misma altura en el punto de convergencia (José/Jesús).
  const anclas = new Set([padreId, ...(conyugesDe[padreId] || [])]);
  const rels = (relFiliacionByChild[hijoId] || []).filter(r => r.principal && anclas.has(r.de));
  const conPaso = rels.find(r => typeof r.paso === "number");
  return conPaso ? conPaso.paso : 1;
}

/* ---------- Layout (algoritmo tipo "tidy tree", con distinción troncal/lateral) ---------- */
function computeLayout() {
  const positions = {};
  let cursor = 0;

  function visible(id) {
    if (!state.searchPath) return true;
    return state.searchPath.has(id);
  }

  function esHojaLateral(h) {
    // Un lateral es "hoja" si, en el estado actual (considerando colapsos),
    // no tiene descendientes visibles que dibujar.
    if (state.collapsed.has(h)) return true;
    return hijosDeFamilia(h).filter(visible).length === 0;
  }

  function place(id, gen) {
    const cursorAlEntrar = cursor;
    const hijos = hijosDeFamilia(id).filter(visible);
    const expandido = !state.collapsed.has(id) && hijos.length > 0;
    let x;

    if (!expandido) {
      x = cursor; cursor += 1;
      positions[id] = { x, y: gen, tieneHijos: hijos.length > 0, expandido };
      return x;
    }

    const troncales = hijos.filter(h => esTroncal(id, h));
    const lateralesTodos = hijos.filter(h => !esTroncal(id, h));
    const lateralesHoja = lateralesTodos.filter(esHojaLateral);
    const lateralesConHijos = lateralesTodos.filter(h => !esHojaLateral(h));

    if (troncales.length === 0 && lateralesConHijos.length === 0) {
      // Todos los hijos son ramas laterales sin descendientes: este nodo
      // ocupa una columna normal del cursor.
      x = cursor; cursor += 1;
    } else {
      const xsLatConHijos = lateralesConHijos.map(h => place(h, gen + pasoDe(id, h)));
      const xsTron = troncales.map(h => place(h, gen + pasoDe(id, h)));
      if (xsTron.length === 1) {
        x = xsTron[0]; // el padre se alinea exactamente bajo su único hijo troncal
      } else if (xsTron.length > 1) {
        x = (Math.min(...xsTron) + Math.max(...xsTron)) / 2; // punto medio de la bifurcación
      } else {
        x = (Math.min(...xsLatConHijos) + Math.max(...xsLatConHijos)) / 2;
      }
    }

    // Las ramas laterales SIN descendientes se pegan al costado del tronco
    // SI hay espacio de sobra disponible (sin invadir el espacio de una rama
    // anterior, ej. Leví). Si no hay espacio suficiente, reservan columnas
    // nuevas y genuinas: esto garantiza que nunca queden dos personas en la
    // misma coordenada exacta.
    if (lateralesHoja.length) {
      const anclaDerecha = Math.min(x, cursor - 1);
      const MARGEN_SEGURIDAD = 0.65;
      const espacioDisponible = anclaDerecha - cursorAlEntrar - MARGEN_SEGURIDAD;
      const ESPACIADO_MIN = 0.65;
      if (espacioDisponible >= lateralesHoja.length * ESPACIADO_MIN) {
        const espaciado = Math.min(1.15, espacioDisponible / lateralesHoja.length);
        lateralesHoja.forEach((h, i) => {
          const hijoGen = gen + pasoDe(id, h);
          positions[h] = { x: anclaDerecha - espaciado * (lateralesHoja.length - i), y: hijoGen, tieneHijos: false, expandido: false };
        });
      } else {
        lateralesHoja.forEach(h => {
          const hijoGen = gen + pasoDe(id, h);
          positions[h] = { x: cursor, y: hijoGen, tieneHijos: false, expandido: false };
          cursor += ESPACIADO_MIN;
        });
      }
    }

    positions[id] = { x, y: gen, tieneHijos: hijos.length > 0, expandido };
    return x;
  }

  place(ROOT_ID, 0);

  // Normalizar: como las ramas laterales pueden empujar coordenadas a valores
  // negativos, desplazamos TODO el árbol para que el mínimo x quede en 0 y
  // nada se dibuje fuera del lienzo visible.
  const todasLasX = Object.values(positions).map(p => p.x);
  const minX = todasLasX.length ? Math.min(...todasLasX) : 0;
  if (minX < 0) {
    Object.values(positions).forEach(p => { p.x -= minX; });
  }

  // Cónyuges: si tienen hijos propios ya ubicados, se posicionan sobre el
  // CENTRO de esos hijos (para que se entienda visualmente de quién es hijo
  // cada uno). Si no tienen hijos en los datos, se colocan al costado.
  Object.keys(positions).forEach(id => {
    (conyugesDe[id] || []).forEach((cId, i) => {
      if (positions[cId]) return; // ya posicionado como parte del árbol principal
      if (!visible(cId)) return;
      const hijosPropios = (hijosDe[cId] || [])
        .filter(r => r.principal && !r.troncal)
        .map(r => r.a)
        .filter(hid => positions[hid]);
      if (hijosPropios.length) {
        const xs = hijosPropios.map(hid => positions[hid].x);
        positions[cId] = {
          x: (Math.min(...xs) + Math.max(...xs)) / 2,
          y: positions[id].y,
          tieneHijos: false, expandido: false, esConyuge: true
        };
      } else {
        positions[cId] = {
          x: positions[id].x + SPOUSE_OFFSET * (i + 1),
          y: positions[id].y,
          tieneHijos: false, expandido: false, esConyuge: true
        };
      }
    });
  });

  return positions;
}

/* ---------- Render ---------- */
const svg = document.getElementById("tree-svg");
const svgNS = "http://www.w3.org/2000/svg";
const layerBands = document.getElementById("layer-bands");
const layerLinks = document.getElementById("layer-links");
const layerNodes = document.getElementById("layer-nodes");
const layerYears = document.getElementById("layer-years");

function elegibleParaMostrar(p) {
  if (state.searchPath && !state.searchPath.has(p.id)) return false;
  if (!state.epocas.has(p.epoca)) return false;
  if (!p.libros.some(l => state.libros.has(l))) return false;
  return true;
}

let ultimasPosiciones = {};
function render() {
  const positions = computeLayout();
  ultimasPosiciones = positions;
  const ids = Object.keys(positions).filter(id => PERSONAS_BY_ID[id] || conyugesDe[id] !== undefined || true);

  // Bounds
  let maxX = 0, maxY = 0;
  Object.values(positions).forEach(p => { maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); });
  const width = (maxX + 2) * COL_WIDTH + RULER_WIDTH;
  const height = (maxY + 2) * ROW_HEIGHT;
  baseWidth = width; baseHeight = height;
  svg.setAttribute("width", width * zoomLevel);
  svg.setAttribute("height", height * zoomLevel);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  layerBands.innerHTML = ""; layerLinks.innerHTML = ""; layerNodes.innerHTML = "";
  if (layerYears) layerYears.innerHTML = "";

  // Bandas de época (una franja horizontal por época presente en las filas visibles)
  const epocaPorFila = {};
  Object.entries(positions).forEach(([id, pos]) => {
    const p = PERSONAS_BY_ID[id];
    if (!p) return;
    epocaPorFila[pos.y] = p.epoca;
  });
  let bandStart = null, bandEpoca = null, bandEndPrev = null;
  const bandsInfo = [];
  const filas = Object.keys(epocaPorFila).map(Number).sort((a,b)=>a-b);
  filas.forEach((fila, i) => {
    const ep = epocaPorFila[fila];
    if (ep !== bandEpoca) {
      if (bandEpoca !== null) { drawBand(bandStart, bandEndPrev, bandEpoca, width); bandsInfo.push({epoca:bandEpoca, y0:bandStart, y1:bandEndPrev}); }
      bandStart = fila; bandEpoca = ep;
    }
    bandEndPrev = fila;
    if (i === filas.length - 1) { drawBand(bandStart, fila, bandEpoca, width); bandsInfo.push({epoca:bandEpoca, y0:bandStart, y1:fila}); }
  });
  actualizarEraNav(bandsInfo);

  // Regla de años al costado izquierdo
  const PASO_REGLA = 4; // una marca cada 4 filas
  for (let f = 0; f <= maxY + 1; f += PASO_REGLA) {
    const yPix = f * ROW_HEIGHT + ROW_HEIGHT * 0.38;
    const tick = document.createElementNS(svgNS, "line");
    tick.setAttribute("x1", RULER_WIDTH - 10); tick.setAttribute("x2", RULER_WIDTH - 2);
    tick.setAttribute("y1", yPix); tick.setAttribute("y2", yPix);
    tick.setAttribute("stroke", "#6b7080"); tick.setAttribute("stroke-width", "1");
    tick.setAttribute("opacity", "0.5");
    layerYears.appendChild(tick);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", RULER_WIDTH - 14);
    label.setAttribute("y", yPix + 3);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("class", "year-tick");
    label.textContent = formatAnio(anioParaFila(f));
    layerYears.appendChild(label);
  }
  const rulerLine = document.createElementNS(svgNS, "line");
  rulerLine.setAttribute("x1", RULER_WIDTH); rulerLine.setAttribute("x2", RULER_WIDTH);
  rulerLine.setAttribute("y1", 0); rulerLine.setAttribute("y2", height);
  rulerLine.setAttribute("stroke", "#6b7080"); rulerLine.setAttribute("stroke-width", "1"); rulerLine.setAttribute("opacity", "0.35");
  layerYears.appendChild(rulerLine);

  function drawBand(y0, y1, epocaId, width) {
    const meta = EPOCAS_BY_ID[epocaId];
    if (!meta) return;
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", RULER_WIDTH);
    rect.setAttribute("y", y0 * ROW_HEIGHT + ROW_HEIGHT * 0.15 - 12);
    rect.setAttribute("width", width - RULER_WIDTH);
    rect.setAttribute("height", (y1 - y0) * ROW_HEIGHT + ROW_HEIGHT * 0.7 + 24);
    rect.setAttribute("fill", meta.color);
    rect.setAttribute("opacity", "0.07");
    layerBands.appendChild(rect);
  }

  // Links: filiación
  RELACIONES.forEach(r => {
    if (r.tipo !== "filiacion") return;
    const a = positions[r.de], b = positions[r.a];
    if (!a || !b) return;
    const pa = PERSONAS_BY_ID[r.de], pb = PERSONAS_BY_ID[r.a];
    if (pa && !elegibleParaMostrar(pa)) return;
    if (pb && !elegibleParaMostrar(pb)) return;

    const highlighted = state.lineas.size > 0 && r.lineas.some(l => state.lineas.has(l));
    const anyLineaActiva = state.lineas.size > 0;
    const dimmed = anyLineaActiva && !highlighted;

    const path = document.createElementNS(svgNS, "path");
    const x1 = a.x * COL_WIDTH + COL_WIDTH + RULER_WIDTH, y1 = a.y * ROW_HEIGHT + ROW_HEIGHT * 0.62;
    const x2 = b.x * COL_WIDTH + COL_WIDTH + RULER_WIDTH, y2 = b.y * ROW_HEIGHT + ROW_HEIGHT * 0.15;
    const midY = (y1 + y2) / 2;
    path.setAttribute("d", `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`);
    path.setAttribute("fill", "none");
    let color = "#a9aba3";
    if (highlighted) color = LINEA_COLOR[r.lineas.find(l=>state.lineas.has(l))] || "#a9aba3";
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", highlighted ? 3.5 : 2);
    path.setAttribute("opacity", dimmed ? 0.15 : 0.85);
    if (r.fuente === "extrabiblica") path.setAttribute("stroke-dasharray", "5,5");
    layerLinks.appendChild(path);
  });

  // Links: matrimonio (punteada horizontal)
  RELACIONES.forEach(r => {
    if (r.tipo !== "matrimonio") return;
    const a = positions[r.de], b = positions[r.a];
    if (!a || !b) return;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", a.x * COL_WIDTH + COL_WIDTH + RULER_WIDTH);
    line.setAttribute("y1", a.y * ROW_HEIGHT + ROW_HEIGHT * 0.38);
    line.setAttribute("x2", b.x * COL_WIDTH + COL_WIDTH + RULER_WIDTH);
    line.setAttribute("y2", b.y * ROW_HEIGHT + ROW_HEIGHT * 0.38);
    line.setAttribute("stroke", "#6b7080");
    line.setAttribute("stroke-width", 1.5);
    line.setAttribute("stroke-dasharray", "3,4");
    line.setAttribute("opacity", "0.6");
    layerLinks.appendChild(line);
  });

  // Nodos
  Object.entries(positions).forEach(([id, pos]) => {
    const p = PERSONAS_BY_ID[id];
    if (!p) return;
    if (!elegibleParaMostrar(p)) return;

    const cx = pos.x * COL_WIDTH + COL_WIDTH + RULER_WIDTH;
    const cy = pos.y * ROW_HEIGHT + ROW_HEIGHT * 0.38;

    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("transform", `translate(${cx},${cy})`);
    g.setAttribute("class", "node" + (pos.esConyuge ? " node-conyuge" : ""));

    const w = Math.max(70, p.n.length * 7.2 + 26);
    const h = 34;
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", -w/2); rect.setAttribute("y", -h/2);
    rect.setAttribute("width", w); rect.setAttribute("height", h);
    rect.setAttribute("rx", 7);
    rect.setAttribute("class", "node-rect" + (p.id === "jesus" ? " node-jesus" : ""));
    g.appendChild(rect);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("class", "node-text");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dy", "0.32em");
    text.textContent = (p.rol ? ROL_ICON[p.rol] + " " : "") + p.n;
    g.appendChild(text);

    if (pos.tieneHijos) {
      const toggle = document.createElementNS(svgNS, "circle");
      toggle.setAttribute("cx", 0); toggle.setAttribute("cy", h/2 + 12);
      toggle.setAttribute("r", 8);
      toggle.setAttribute("class", "toggle-circle");
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.collapsed.has(id)) state.collapsed.delete(id); else state.collapsed.add(id);
        render();
      });
      g.appendChild(toggle);
      const toggleText = document.createElementNS(svgNS, "text");
      toggleText.setAttribute("x", 0); toggleText.setAttribute("y", h/2 + 16);
      toggleText.setAttribute("text-anchor", "middle");
      toggleText.setAttribute("class", "toggle-text");
      toggleText.textContent = pos.expandido ? "–" : "+";
      toggleText.style.pointerEvents = "none";
      g.appendChild(toggleText);
    }

    g.addEventListener("click", () => abrirFicha(p));
    layerNodes.appendChild(g);
  });
}

/* ---------- Ficha biográfica ---------- */
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
function abrirFicha(p) {
  const rolHtml = p.rol ? `<span class="tag">${ROL_ICON[p.rol]} ${ROL_LABEL[p.rol]}</span>` : "";
  const periodoHtml = p.periodo ? `<span class="ficha-periodo">${p.periodo}</span>` : "";
  const metaFila = (rolHtml || periodoHtml) ? `<div class="ficha-roles">${rolHtml}${periodoHtml}</div>` : "";
  const fuenteNote = p.fuente === "extrabiblica"
    ? `<div class="ficha-fuente">Fuente: registro histórico extrabíblico; no aparece directamente en el texto bíblico.</div>` : "";
  modalBody.innerHTML = `
    <div class="ficha-meta">${EPOCAS_BY_ID[p.epoca]?.n || ""}</div>
    <h2 class="ficha-h">${p.n}</h2>
    ${metaFila}
    <div class="ficha-texto">${p.bio}</div>
    <div class="ficha-refs"><b>Referencias</b> ${p.v.join(", ")}<br><b>Libro(s)</b> ${p.libros.join(", ")}</div>
    ${fuenteNote}
  `;
  modal.classList.add("open");
}
document.getElementById("modal-close").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });

/* ---------- Panel flotante de navegación por época ---------- */
const treewrap = document.getElementById("treewrap");
const eraNav = document.getElementById("era-nav");
let currentBands = [];

function actualizarEraNav(bandsInfo) {
  // Una sola entrada por época (la primera aparición), aunque sus franjas se repitan
  const vistas = new Set();
  currentBands = bandsInfo.filter(b => !vistas.has(b.epoca) && vistas.add(b.epoca));
  bandsInfo = currentBands;
  eraNav.innerHTML = "";
  bandsInfo.forEach(b => {
    const meta = EPOCAS_BY_ID[b.epoca];
    if (!meta) return;
    const pill = document.createElement("div");
    pill.className = "era-pill";
    pill.dataset.y0 = b.y0;
    pill.innerHTML = `<span class="dot" style="background:${meta.color}"></span>${meta.n}`;
    pill.addEventListener("click", () => {
      treewrap.scrollTo({ top: b.y0 * ROW_HEIGHT, behavior: "smooth" });
    });
    eraNav.appendChild(pill);
  });
  resaltarEraActiva();
}

function resaltarEraActiva() {
  const scrollY = treewrap.scrollTop;
  let activa = null;
  currentBands.forEach(b => {
    if (scrollY >= b.y0 * ROW_HEIGHT - ROW_HEIGHT * 0.5) activa = b;
  });
  document.querySelectorAll(".era-pill").forEach((el, i) => {
    el.classList.toggle("active", currentBands[i] === activa);
  });
}
treewrap.addEventListener("scroll", resaltarEraActiva);

/* ---------- Panel de filtros ---------- */
function construirFiltros() {
  // Época
  const epocaList = document.getElementById("epoca-list");
  EPOCAS.forEach(e => {
    const row = document.createElement("div"); row.className = "check-item";
    row.innerHTML = `<input type="checkbox" id="ep_${e.id}" checked><label for="ep_${e.id}"><span class="dot" style="background:${e.color}"></span>${e.n}</label>`;
    row.querySelector("input").addEventListener("change", (ev) => {
      ev.target.checked ? state.epocas.add(e.id) : state.epocas.delete(e.id);
      render();
    });
    epocaList.appendChild(row);
  });

  // Libros
  const libroList = document.getElementById("libro-list");
  const librosUnicos = [...new Set(PERSONAS.flatMap(p=>p.libros))];
  librosUnicos.forEach(l => {
    const row = document.createElement("div"); row.className = "check-item";
    const safe = l.replace(/\W+/g,"");
    row.innerHTML = `<input type="checkbox" id="lib_${safe}" checked><label for="lib_${safe}">${l}</label>`;
    row.querySelector("input").addEventListener("change", (ev) => {
      ev.target.checked ? state.libros.add(l) : state.libros.delete(l);
      render();
    });
    libroList.appendChild(row);
  });

  // Líneas genealógicas
  const lineaChecks = document.querySelectorAll("input[name=linea]");
  lineaChecks.forEach(cb => {
    cb.addEventListener("change", () => {
      cb.checked ? state.lineas.add(cb.value) : state.lineas.delete(cb.value);
      render();
    });
  });

  // Buscador
  const searchInput = document.getElementById("search-input");
  const searchClear = document.getElementById("search-clear");
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { state.searchPath = null; searchClear.style.display = "none"; render(); return; }
    const match = PERSONAS.find(p => p.n.toLowerCase().includes(q));
    if (!match) return;
    // reconstruir camino desde Adán hasta match siguiendo el padre principal
    const path = new Set([match.id]);
    let cur = match.id;
    while (true) {
      const padre = padrePrincipalDe(cur);
      if (!padre) break;
      path.add(padre);
      cur = padre;
    }
    state.searchPath = path;
    searchClear.style.display = "inline";
    render();
  });
  searchClear.addEventListener("click", () => {
    searchInput.value = ""; state.searchPath = null; searchClear.style.display = "none"; render();
  });

  // Expandir / colapsar todo
  document.getElementById("expand-all").addEventListener("click", () => { state.collapsed.clear(); render(); });
  document.getElementById("collapse-all").addEventListener("click", () => {
    PERSONAS.forEach(p => { if (hijosDeFamilia(p.id).length) state.collapsed.add(p.id); });
    render();
  });
}

construirFiltros();
render();

// Al abrir la página por primera vez, centrar la vista en Adán en vez de
// dejar al usuario en la esquina superior izquierda del árbol.
function centrarEnAdan() {
  const pos = ultimasPosiciones[ROOT_ID];
  if (!pos) return;
  const cx = pos.x * COL_WIDTH + COL_WIDTH + RULER_WIDTH;
  const cy = pos.y * ROW_HEIGHT + ROW_HEIGHT * 0.38;
  treewrap.scrollLeft = Math.max(0, cx - treewrap.clientWidth / 2);
  treewrap.scrollTop = Math.max(0, cy - 130);
}
requestAnimationFrame(() => requestAnimationFrame(centrarEnAdan));

/* ---------- Zoom (propio del árbol, no del navegador) ---------- */
const zoomLevelLabel = document.getElementById("zoom-level");
function aplicarZoom() {
  svg.setAttribute("width", baseWidth * zoomLevel);
  svg.setAttribute("height", baseHeight * zoomLevel);
  zoomLevelLabel.textContent = Math.round(zoomLevel * 100) + "%";
}
document.getElementById("zoom-in").addEventListener("click", () => {
  zoomLevel = Math.min(2.5, zoomLevel + 0.15); aplicarZoom();
});
document.getElementById("zoom-out").addEventListener("click", () => {
  zoomLevel = Math.max(0.25, zoomLevel - 0.15); aplicarZoom();
});
document.getElementById("zoom-reset").addEventListener("click", () => {
  zoomLevel = 1; aplicarZoom();
});
