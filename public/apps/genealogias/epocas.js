/* ==========================================================================
   EPOCAS.JS — Árbol Genealógico · Fuego y Palabra
   ==========================================================================
   Define las franjas de época que se dibujan como bandas horizontales
   detrás del árbol, y que sirven como filtro. El orden del arreglo es el
   orden cronológico (de arriba hacia abajo en el árbol).

   Los rangos de años son aproximados y con fines ilustrativos: la
   cronología bíblica antigua es objeto de debate académico y no hay
   consenso único, especialmente antes de Abraham.
   ========================================================================== */

const EPOCAS = [
  { id:"creacion",       n:"Creación y patriarcas primitivos", color:"#8B7355", rango:"Adán – Noé" },
  { id:"patriarcas",     n:"Patriarcas",                        color:"#A8452B", rango:"Abraham – José (Egipto)" },
  { id:"exodo",          n:"Éxodo y desierto",                  color:"#B4903B", rango:"c. 1446–1406 a.C." },
  { id:"jueces",         n:"Conquista y Jueces",                color:"#5C6B3D", rango:"c. 1406–1050 a.C." },
  { id:"monarquia_unida",n:"Monarquía unida",                   color:"#2A5C63", rango:"c. 1050–930 a.C." },
  { id:"monarquia_dividida",n:"Monarquía dividida",             color:"#6B4E7C", rango:"c. 930–586 a.C." },
  { id:"exilio",         n:"Exilio babilónico",                 color:"#5A5750", rango:"586–538 a.C." },
  { id:"retorno",        n:"Retorno y período persa",           color:"#4A6B7C", rango:"538–332 a.C." },
  { id:"intertestamentario",n:"Período intertestamentario",     color:"#7C5E4A", rango:"332–4 a.C." },
  { id:"vida_jesus",     n:"Vida de Jesús e iglesia primitiva",  color:"#C97B4A", rango:"c. 4 a.C. – 100 d.C." }
];

const EPOCAS_BY_ID = Object.fromEntries(EPOCAS.map(e => [e.id, e]));
