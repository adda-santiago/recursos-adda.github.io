/* ==========================================================================
   FRONTERAS.JS — Atlas Bíblico · Fuego y Palabra
   ==========================================================================
   Contiene los territorios/fronteras históricas que se dibujan como
   polígonos semitransparentes sobre el mapa, activables desde el panel de
   filtros ("Fronteras históricas").

   *** IMPORTANTE — LEER ANTES DE CONFIAR EN ESTOS DATOS ***
   Estas fronteras son APROXIMADAS e ILUSTRATIVAS, con fines educativos.
   Los límites territoriales antiguos no están documentados con precisión
   cartográfica: cambiaban con cada rey o campaña militar, y los mapas
   históricos existentes ya son reconstrucciones con márgenes de error.
   No uses esto como referencia académica o cartográfica precisa.

   CÓMO AGREGAR UNA FRONTERA NUEVA
   ----------------------------------------------------------------
   {
     id:     "identificador_unico",
     n:      "Nombre a mostrar",
     periodo:"Rango de años aproximado, ej. 'c. 1010–930 a.C.'",
     color:  "#A8452B",              // color del relleno y del borde
     d:      "Descripción breve de 1-3 frases.",
     puntos: [ [lat,lng], [lat,lng], ... ]   // vértices del polígono, en orden
   },

   Los puntos NO necesitan repetir el primero al final; el polígono se
   cierra automáticamente. Mientras más puntos, más preciso el contorno,
   pero no hace falta exagerar el detalle dado el nivel de aproximación
   general de estos datos.
   ========================================================================== */

const FRONTERAS = [
  {
    id: "reino_unido",
    n: "Reino Unido de Israel",
    periodo: "c. 1010–930 a.C. (David y Salomón)",
    color: "#B4903B",
    d: "Extensión aproximada de Israel bajo David y Salomón, antes de la división del reino. El territorio de influencia/vasallaje descrito en 1 Reyes 4:21 llegaba mucho más lejos hacia el Éufrates; aquí se muestra el núcleo asentado.",
    puntos: [
      [33.27,35.60],[33.27,35.19],[32.55,34.90],[31.95,34.75],
      [31.50,34.47],[31.25,34.79],[30.90,35.15],[30.50,35.55],
      [31.10,35.90],[31.60,35.95],[31.95,35.93],[32.45,35.75],
      [32.85,35.85],[33.27,35.60]
    ]
  },
  {
    id: "reino_israel_norte",
    n: "Reino de Israel (norte)",
    periodo: "c. 930–722 a.C.",
    color: "#2A5C63",
    d: "Diez tribus del norte tras la división del reino a la muerte de Salomón; capital en Samaria. Cayó ante el Imperio Asirio en 722 a.C.",
    puntos: [
      [33.27,35.60],[33.27,35.19],[32.75,34.95],[32.30,34.85],
      [32.05,35.05],[31.90,35.25],[31.95,35.55],[32.15,35.65],
      [32.45,35.75],[32.85,35.85],[33.27,35.60]
    ]
  },
  {
    id: "reino_juda_sur",
    n: "Reino de Judá (sur)",
    periodo: "c. 930–586 a.C.",
    color: "#A8452B",
    d: "Dos tribus del sur (Judá y Benjamín) tras la división del reino, con Jerusalén como capital y sede del Templo. Cayó ante Babilonia en 586 a.C.",
    puntos: [
      [32.05,35.05],[31.90,34.75],[31.50,34.47],[31.25,34.79],
      [30.90,35.15],[30.50,35.55],[31.10,35.90],[31.60,35.95],
      [31.90,35.75],[31.95,35.55],[31.90,35.25],[32.05,35.05]
    ]
  },
  {
    id: "imperio_asirio",
    n: "Imperio Asirio",
    periodo: "Apogeo c. 700 a.C.",
    color: "#5A5750",
    d: "En su máxima extensión, dominó Mesopotamia, el Levante y partes de Egipto. Destruyó el Reino de Israel (norte) en 722 a.C. y sometió a Judá como tributaria.",
    puntos: [
      [37.5,42.5],[36.5,44.5],[34.5,46.5],[31.5,47.5],[29.5,45.0],
      [29.0,35.0],[30.0,32.5],[31.5,31.5],[33.0,35.0],[35.5,36.0],
      [37.0,38.5],[37.5,42.5]
    ]
  },
  {
    id: "imperio_babilonico",
    n: "Imperio Neobabilónico",
    periodo: "Apogeo c. 600 a.C.",
    color: "#6B4E7C",
    d: "Sucesor de Asiria; Nabucodonosor destruyó Jerusalén y el Templo en 586 a.C., iniciando el exilio de Judá en Babilonia.",
    puntos: [
      [36.5,40.5],[35.0,44.0],[32.5,47.5],[29.5,48.0],[28.5,45.0],
      [29.0,35.0],[31.0,33.5],[33.5,35.5],[35.5,36.5],[36.5,40.5]
    ]
  },
  {
    id: "imperio_persa",
    n: "Imperio Persa (Aqueménida)",
    periodo: "Apogeo c. 500 a.C.",
    color: "#4A6B7C",
    d: "El mayor imperio del Cercano Oriente antiguo hasta ese momento, desde el Indo hasta Egipto y Asia Menor. Ciro el Grande autorizó el retorno de los judíos y la reconstrucción del Templo.",
    puntos: [
      [42.0,45.0],[40.0,55.0],[35.0,65.0],[28.0,68.0],[24.0,60.0],
      [24.0,52.0],[24.0,35.0],[27.0,32.0],[31.0,31.5],[33.5,35.5],
      [36.5,32.0],[39.0,35.0],[41.0,40.0],[42.0,45.0]
    ]
  },
  {
    id: "imperio_seleucida",
    n: "Reino Seléucida (helenístico)",
    periodo: "c. 200 a.C.",
    color: "#7C5E4A",
    d: "Tras la muerte de Alejandro Magno, uno de los reinos helenísticos sucesores; gobernó Judea en el período intertestamentario, hasta la revuelta de los Macabeos.",
    puntos: [
      [40.5,28.0],[38.0,40.0],[35.0,48.0],[30.0,50.0],[28.0,45.0],
      [29.0,35.0],[31.5,32.5],[33.5,35.5],[36.0,36.5],[38.0,32.0],[40.5,28.0]
    ]
  },
  {
    id: "imperio_romano",
    n: "Imperio Romano (oriente)",
    periodo: "c. 30 d.C. (época de Jesús)",
    color: "#C97B4A",
    d: "Judea era, en tiempos de Jesús, una provincia romana (con reyes clientes como Herodes en ciertos períodos). Se muestra la mitad oriental del imperio; su extensión total llegaba hasta Britania y España.",
    puntos: [
      [45.0,28.0],[43.0,35.0],[41.0,42.0],[36.5,42.0],[33.0,35.5],
      [31.0,33.5],[29.5,25.0],[31.5,20.0],[35.0,15.0],[38.0,18.0],
      [40.5,20.0],[43.0,22.0],[45.0,28.0]
    ]
  },
  {
    id: "israel_actual",
    n: "Israel (fronteras actuales)",
    periodo: "Desde 1949, para comparar con la geografía bíblica",
    color: "#1E5AA8",
    d: "Territorio del Estado de Israel según las líneas de armisticio de 1949 ('línea verde'), la referencia más usada internacionalmente para su territorio soberano reconocido. Cisjordania, la Franja de Gaza y los Altos del Golán tienen un estatus disputado bajo el derecho internacional y no se incluyen en este contorno.",
    puntos: [
      [33.27,35.59],[33.09,35.11],[32.83,34.97],[32.05,34.77],
      [31.75,34.65],[31.35,34.35],[31.22,34.24],[30.85,34.36],
      [29.55,34.87],[29.85,34.96],[31.00,35.42],[31.50,35.22],
      [31.85,35.18],[32.15,34.98],[32.45,35.03],[32.60,35.35],
      [32.72,35.55],[33.09,35.57],[33.27,35.59]
    ]
  }
];

const FRONTERAS_BY_ID = Object.fromEntries(FRONTERAS.map(f => [f.id, f]));
