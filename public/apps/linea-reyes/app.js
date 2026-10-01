/* =====================================================
   APP.JS — Lógica de diseño y renderizado.
   Depende de las variables definidas en data.js
   (deben cargarse en este orden en el HTML).
   Edita este archivo para cambios de layout/estilo/
   comportamiento, NO para agregar reyes/profetas/eventos.
   ===================================================== */

/* ============ LAYOUT ============ */
const BASE_YEAR = 1085;
const END_YEAR  = 525;
const PPY = 8;
const GAP = 6;
const KING_FLOOR = 8;      // ancho mínimo visible para reinados extremadamente breves (p. ej. 7 días)
const CHIP_FLOOR  = 70;    // ancho mínimo para jueces/profetas
const MIN_CHIP = 156;      // ancho fijo para el contexto histórico (eventos puntuales, sin duración)
const CHIP_ROW_H = 82;

function xOf(year){ return (BASE_YEAR - year) * PPY; }

function tierFor(w){
  if(w < 45) return "tier-xs";
  if(w < 85) return "tier-sm";
  if(w < 130) return "tier-md";
  return "tier-full";
}

/* Reyes: ancho = años de reinado × px por año (proporcional, sin recorte) */
function layoutKings(items){
  const arr = items.slice().sort((a,b)=> b.start - a.start);
  let cursor = 0;
  arr.forEach(it=>{
    const rawX = xOf(it.start);
    const rawW = (it.start - it.end) * PPY;
    const w = Math.max(KING_FLOOR, rawW);
    const x = Math.max(rawX, cursor);
    it._x = x; it._w = w; it._tier = tierFor(w);
    cursor = x + w + GAP;
  });
  return arr;
}

/* Jueces y profetas: ancho = años de ministerio × px por año (proporcional, con piso mínimo legible) */
function layoutDurationChips(items){
  const sorted = items.slice().sort((a,b)=> b.start - a.start);
  const cursors = [0,0];
  sorted.forEach((it,i)=>{
    const row = i % 2;
    const rawX = xOf(it.start);
    const rawW = Math.max(CHIP_FLOOR, (it.start - it.end) * PPY);
    const x = Math.max(rawX, cursors[row]);
    it._x = x; it._w = rawW; it._row = row;
    cursors[row] = x + rawW + GAP;
  });
  return sorted;
}

/* Contexto histórico: eventos puntuales, ancho fijo (no tienen "años de duración") */
function layoutChips(items){
  const sorted = items.slice().sort((a,b)=> b.start - a.start);
  const cursors = [0,0];
  sorted.forEach((it,i)=>{
    const row = i % 2;
    const rawX = xOf(it.start);
    const x = Math.max(rawX, cursors[row]);
    it._x = x; it._row = row;
    cursors[row] = x + MIN_CHIP + GAP;
  });
  return sorted;
}
function chipsRowCount(items){
  return items.reduce((m,i)=> Math.max(m, i._row), 0) + 1;
}

const topKings = layoutKings(unidos.map(k=>({...k, kind:"unido"})).concat(judah.map(k=>({...k, kind:"judah"}))));
const northKings = layoutKings(israel.map(k=>({...k, kind:"israel"})));
const southJP = layoutDurationChips(jueces.concat(profetasSur));
const northP  = layoutDurationChips(profetasNorte);
const ctxItems = layoutChips(contexto.map(c=>({...c, start:c.year, end:c.year})));

const iconMap = {imperio:"♜", profeta:"✎", evento:"▲", cultural:"✦", juez:"⚖"};

/* ============ RENDER ============ */
const rowJudah = document.getElementById("rowJudah");
const rowIsrael = document.getElementById("rowIsrael");
const rowJPSouth = document.getElementById("rowJPSouth");
const rowJPNorth = document.getElementById("rowJPNorth");
const rowContext = document.getElementById("rowContext");
const ruler = document.getElementById("ruler");
const milestonesEl = document.getElementById("milestones");
const guidesEl = document.getElementById("guides");
const timelineEl = document.getElementById("timeline");

let maxCursor = 0;
[...topKings, ...northKings, ...southJP, ...northP].forEach(k=> maxCursor = Math.max(maxCursor, k._x + k._w));
ctxItems.forEach(c=> maxCursor = Math.max(maxCursor, c._x + MIN_CHIP));
const totalWidth = maxCursor + 60;
timelineEl.style.width = totalWidth + "px";
document.getElementById("fixedScrollbarInner").style.width = totalWidth + "px";

/* Sincroniza el scroll horizontal del timeline con la barra fija junto al pie de página */
const timelineWrap = document.querySelector(".timeline-wrap");
const fixedScrollbar = document.getElementById("fixedScrollbar");
let syncing = false;
timelineWrap.addEventListener("scroll", ()=>{
  if(syncing) return; syncing = true;
  fixedScrollbar.scrollLeft = timelineWrap.scrollLeft;
  syncing = false;
});
fixedScrollbar.addEventListener("scroll", ()=>{
  if(syncing) return; syncing = true;
  timelineWrap.scrollLeft = fixedScrollbar.scrollLeft;
  syncing = false;
});

function renderKingCard(container, k){
  const div = document.createElement("div");
  const yearsTxt = (k.start === k.end) ? (k.start + " a.C.") : (k.start + "–" + k.end + " a.C.");
  div.className = "card " + k.kind + " " + k._tier;
  div.style.left = k._x + "px";
  div.style.width = k._w + "px";
  div.title = k.name + " · " + yearsTxt;
  const tagTxt = k.kind === "unido" ? "UNIDO" : (k.kind === "judah" ? "JUDÁ" : "ISRAEL");
  div.innerHTML =
    '<span class="ktag">' + tagTxt + '</span>' +
    '<span class="kname">' + k.name + '</span>' +
    '<span class="kyears">' + yearsTxt + '</span>' +
    '<span class="badge ' + k.ev + '">' + (k.ev==="bueno"?"✓ Bueno":k.ev==="malo"?"✕ Malo":"≈ Mixto") + '</span>' +
    '<span class="kref">' + k.ref + '</span>' +
    '<span class="plus-btn">+</span>';
  div.addEventListener("click", ()=> openKingModal(k, yearsTxt));
  container.appendChild(div);
}

function renderChip(container, c, side, isCtx){
  const div = document.createElement("div");
  const w = isCtx ? MIN_CHIP : c._w;
  const yearTxt = isCtx ? (c.year + " a.C.") : ((c.start===c.end) ? (c.start+" a.C.") : (c.start+"–"+c.end+" a.C."));
  const labelTxt = isCtx ? c.label : c.name;
  div.className = "chip tipo-" + c.tipo + (side ? (" " + side) : "") + (w < 110 ? " compact" : "");
  div.style.left = c._x + "px";
  div.style.width = w + "px";
  div.style.top = (c._row * CHIP_ROW_H) + "px";
  div.title = labelTxt + " · " + yearTxt;
  div.innerHTML =
    '<span class="cicon">' + iconMap[c.tipo] + '</span>' +
    '<span class="clabel">' + labelTxt + '</span>' +
    '<span class="cyear">' + yearTxt + '</span>';
  div.addEventListener("click", ()=> isCtx ? openCtxModal(c) : openJpModal(c));
  container.appendChild(div);
}

topKings.forEach(k=> renderKingCard(rowJudah, k));
northKings.forEach(k=> renderKingCard(rowIsrael, k));
southJP.forEach(c=> renderChip(rowJPSouth, c, "sur", false));
northP.forEach(c=> renderChip(rowJPNorth, c, "norte", false));
ctxItems.forEach(c=> renderChip(rowContext, c, null, true));

/* Ruler ticks every 25 years */
for(let y = BASE_YEAR; y >= END_YEAR; y -= 25){
  const t = document.createElement("div");
  t.className = "tick";
  t.style.left = xOf(y) + "px";
  t.innerHTML = '<span>' + y + '</span>';
  ruler.appendChild(t);
}

/* Milestones (arriba, no líneas rojas atravesando todo) */
const milestoneData = [
  {year:931, text:"División del reino"},
  {year:722, text:"Caída de Samaria"},
  {year:586, text:"Caída de Jerusalén"}
];
milestoneData.forEach(m=>{
  const div = document.createElement("div");
  div.className = "milestone";
  div.style.left = xOf(m.year) + "px";
  div.innerHTML = '<span class="flag"></span><span class="mtext">' + m.text + '</span><span class="myear">' + m.year + ' a.C.</span>';
  milestonesEl.appendChild(div);
});

/* ============ MODAL ============ */
const overlay = document.getElementById("overlay");
const modalContent = document.getElementById("modalContent");

function openKingModal(k, yearsTxt){
  const kindLabel = k.kind === "unido" ? "Reino Unido" : (k.kind === "judah" ? "Reino de Judá (Sur)" : "Reino de Israel (Norte)");
  const evLabel = k.ev==="bueno" ? "✓ Bueno" : k.ev==="malo" ? "✕ Malo" : "≈ Mixto";
  const evColor = k.ev==="bueno" ? "var(--good)" : k.ev==="malo" ? "var(--bad)" : "var(--mixed)";
  modalContent.innerHTML =
    '<div class="ficha-meta">' + kindLabel + ', ' + yearsTxt + '</div>' +
    '<h2 class="ficha-h">' + k.name + '</h2>' +
    '<span class="tag filled" style="background:' + evColor + '">' + evLabel + '</span>' +
    '<p class="ficha-texto">' + k.note + '</p>' +
    '<div class="ficha-refs"><b>Referencia</b> ' + k.ref + '</div>';
  overlay.classList.add("open");
}

function openJpModal(c){
  const yearTxt = (c.start===c.end) ? (c.start+" a.C.") : (c.start+"–"+c.end+" a.C.");
  const tipoLabel = c.tipo === "juez" ? "Juez" : "Profeta";
  modalContent.innerHTML =
    '<div class="ficha-meta">' + tipoLabel + ', ' + yearTxt + '</div>' +
    '<h2 class="ficha-h">' + c.name + '</h2>' +
    '<p class="ficha-texto">' + c.note + '</p>' +
    '<div class="ficha-refs"><b>Referencia</b> ' + c.ref + '</div>';
  overlay.classList.add("open");
}

function openCtxModal(c){
  modalContent.innerHTML =
    '<div class="ficha-meta">' + c.tipo.charAt(0).toUpperCase()+c.tipo.slice(1) + ', ' + c.year + ' a.C.</div>' +
    '<h2 class="ficha-h">' + c.label + '</h2>' +
    '<p class="ficha-texto">' + c.note + '</p>';
  overlay.classList.add("open");
}

document.getElementById("closeBtn").addEventListener("click", ()=> overlay.classList.remove("open"));
overlay.addEventListener("click", (e)=>{ if(e.target === overlay) overlay.classList.remove("open"); });
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") overlay.classList.remove("open"); });

/* ============ TOGGLES Y LAYOUT DINÁMICO ============ */
const jpToggle = document.getElementById("jpToggle");
const ctxToggle = document.getElementById("ctxToggle");

const RULER_H = 32, MILESTONES_H = 34, GAP_ROWS = 10;
const KINGS_ROW_H = 104;
const southJPRows = chipsRowCount(southJP);
const northPRows = chipsRowCount(northP);
const ctxRows = chipsRowCount(ctxItems);
const SOUTH_JP_H = southJPRows * CHIP_ROW_H + 16;
const NORTH_P_H  = northPRows * CHIP_ROW_H + 16;
const CTX_H      = ctxRows * CHIP_ROW_H + 16;

function recomputeLayout(){
  let top = RULER_H + MILESTONES_H;

  if(jpToggle.checked){
    rowJPSouth.classList.remove("hidden-row");
    rowJPSouth.style.top = top + "px";
    rowJPSouth.style.height = SOUTH_JP_H + "px";
    top += SOUTH_JP_H + GAP_ROWS;
  } else {
    rowJPSouth.classList.add("hidden-row");
  }

  const southKingsTop = top;
  rowJudah.style.top = top + "px";
  top += KINGS_ROW_H + GAP_ROWS;

  rowIsrael.style.top = top + "px";
  const northKingsBottom = top + KINGS_ROW_H;
  top += KINGS_ROW_H + GAP_ROWS;

  if(jpToggle.checked){
    rowJPNorth.classList.remove("hidden-row");
    rowJPNorth.style.top = top + "px";
    rowJPNorth.style.height = NORTH_P_H + "px";
    top += NORTH_P_H + GAP_ROWS;
  } else {
    rowJPNorth.classList.add("hidden-row");
  }

  if(ctxToggle.checked){
    rowContext.classList.remove("hidden-row");
    rowContext.style.top = top + "px";
    rowContext.style.height = CTX_H + "px";
    top += CTX_H + GAP_ROWS;
  } else {
    rowContext.classList.add("hidden-row");
  }

  timelineEl.style.height = (top + 20) + "px";

  /* Guías verticales: solo a través de las dos filas de reyes */
  guidesEl.innerHTML = "";
  milestoneData.forEach(m=>{
    const guide = document.createElement("div");
    guide.className = "guide-line";
    guide.style.left = xOf(m.year) + "px";
    guide.style.top = southKingsTop + "px";
    guide.style.height = (northKingsBottom - southKingsTop) + "px";
    guidesEl.appendChild(guide);
  });
}
jpToggle.addEventListener("change", recomputeLayout);
ctxToggle.addEventListener("change", recomputeLayout);
recomputeLayout();

/* ============ OCULTAR/MOSTRAR CABECERA ============ */
const headerToggle = document.getElementById("headerToggle");
const headerBody = document.getElementById("headerBody");
headerToggle.addEventListener("change", ()=>{
  headerBody.classList.toggle("header-hidden", headerToggle.checked);
});
