/* ==========================================================================
   VIAJES.JS — Atlas Bíblico · Fuego y Palabra
   ==========================================================================
   Este archivo contiene ÚNICAMENTE las rutas (líneas con flechas) que se
   dibujan sobre el mapa: viajes, migraciones, rutas de exilio, etc.
   El diseño y la lógica del mapa viven en index.html — no los edites aquí.

   CÓMO AGREGAR UNA RUTA NUEVA
   ----------------------------------------------------------------
   Copia un bloque existente dentro del arreglo JOURNEYS, pégalo antes del
   corchete de cierre "];", y edita sus valores:

   {
     n:     "Nombre de la ruta",           // texto a mostrar
     color: "#B4903B",                     // color de la línea y las flechas
     dash:  null,                          // null = línea sólida
                                            // "6,6" = línea punteada
     ref:   "Éxodo 12 - Josué 4",          // referencia bíblica
     d:     "Descripción breve de la ruta.",
     puntos: [
       {ref:"Gosén"},                      // punto = nombre EXACTO de un
       {ref:"Monte Sinaí"},                // lugar que ya existe en
       {ref:"Jericó"}                      // lugares.js (usa su "n")
     ]
   },

   Si necesitas un punto de paso que NO está en lugares.js (por ejemplo,
   una parada intermedia sin suficiente relevancia como para ser un lugar
   propio del mapa), puedes darle coordenadas directamente en vez de "ref":

     {lat: 34.4667, lng: 36.5333, label:"Riblá"}

   El orden de los puntos dentro de "puntos" define el orden en que se
   dibuja la ruta y hacia dónde apuntan las flechas.

   No olvides la coma "," al final de cada ruta (excepto la última antes
   de "];"). Guarda el archivo y recarga index.html — no se necesita
   ningún otro paso.
   ========================================================================== */

const JOURNEYS = [
  {
    n: "Israel: de Egipto a la Tierra Prometida",
    color: "#B4903B",
    dash: null,
    ref: "Éxodo 12 – Josué 4",
    d: "Ruta tradicional del Éxodo: desde la salida de Egipto, pasando por el Sinaí y el desierto, hasta el cruce del Jordán cuarenta años después.",
    puntos: [
      {ref:"Gosén"},
      {ref:"Cruce del Mar Rojo"},
      {ref:"Monte Sinaí"},
      {ref:"Cades-Barnea"},
      {ref:"Monte Nebo"},
      {ref:"Jericó"}
    ]
  },
  {
    n: "Exilio de Judá a Babilonia",
    color: "#5A5750",
    dash: "6,6",
    ref: "2 Reyes 25; Jeremías 39, 52",
    d: "Ruta forzada de los habitantes de Judá tras la destrucción de Jerusalén en el 586 a.C., camino al cautiverio en Babilonia.",
    puntos: [
      {ref:"Jerusalén"},
      {lat:34.4667, lng:36.5333, label:"Riblá"},
      {ref:"Babilonia"}
    ]
  },
  {
    n: "Primer viaje misionero de Pablo",
    color: "#2A5C63",
    dash: null,
    ref: "Hechos 13–14",
    d: "Primer recorrido misionero de Pablo y Bernabé por Chipre y el sur de Asia Menor.",
    puntos: [
      {ref:"Antioquía de Siria"},
      {lat:35.1856, lng:33.9002, label:"Salamina (Chipre)"},
      {ref:"Antioquía de Pisidia"},
      {ref:"Iconio"},
      {ref:"Listra"},
      {ref:"Derbe"},
      {ref:"Antioquía de Siria"}
    ]
  },
  {
    n: "Viaje de Pablo a Roma (prisionero)",
    color: "#A8452B",
    dash: "2,8",
    ref: "Hechos 27–28",
    d: "Traslado de Pablo como prisionero desde Cesarea hasta Roma, incluyendo el naufragio en Malta.",
    puntos: [
      {ref:"Cesarea Marítima"},
      {ref:"Creta"},
      {ref:"Malta"},
      {ref:"Roma"}
    ]
  }
];
