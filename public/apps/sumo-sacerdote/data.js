/* ==========================================================
   Recursos Bíblicos — El sumo sacerdote · contenido
   Citas: Reina-Valera 1960, salvo indicación en contrario.
   Cada estación define:
     n, short, ref, rows [[título, texto]], desc, think (pregunta),
     view { t: objetivo, p: posición de cámara } en codos,
     wear: última prenda puesta, en el orden de Lv 8:7-9
       'panetes' | 'tunica' | 'cinto' | 'manto' | 'efod' |
       'oniquinas' | 'racional' | 'mitra' | 'plancha'
     attire: 'oro' (por defecto) | 'lino' (Día de la Expiación)
     focus: prendas resaltadas (el resto se atenúa)
     show: grupos auxiliares visibles: 'nombres' | 'medidas' | 'palmo' | 'urim'
   ========================================================== */
window.SACERDOTE_DATA = {
  STATIONS: [
    {
      id: 'general', num: null, n: 'El sumo sacerdote', short: 'Vista general',
      ref: 'Éxodo 28; Levítico 8:7-9',
      rows: [
        ['Quién', 'Aarón y, después de él, un descendiente suyo por vez: al morir Aarón, sus vestiduras pasan a su hijo Eleazar (Nm 20:25-28)'],
        ['Prendas', 'Éx 28:4 nombra seis: pectoral, efod, manto, túnica bordada, mitra y cinturón. Con los calzoncillos (v. 42) y la lámina de oro (v. 36) suman ocho'],
        ['Propósito', '«Para honra y hermosura» (Éx 28:2)'],
        ['Aarón', 'Tenía 83 años cuando habló a Faraón (Éx 7:7); el Salmo 133:2 menciona su barba. Su rostro no se describe: el modelo es una representación']
      ],
      desc: 'El modelo viste al sumo sacerdote en el orden en que Moisés vistió a Aarón el día de su consagración (Lv 8:7-9): primero lo que queda junto a la piel, al final lo que todos ven. Recorre la ruta en orden. El botón «Vestiduras de lino» muestra el atuendo del Día de la Expiación.',
      think: '¿Por qué Dios detalla con tanta precisión la ropa de un hombre?',
      view: { t: [0, 1.95, 0], p: [3.4, 2.7, 7.6] }, wear: 'plancha', show: ['nombres']
    },
    {
      id: 'panetes', num: 1, n: 'Los calzoncillos de lino', ref: 'Éxodo 28:42-43',
      rows: [
        ['Material', 'Lino'],
        ['Alcance', '«Desde los lomos hasta los muslos» (v. 42)'],
        ['Quién', 'Aarón y sus hijos, al entrar al tabernáculo o acercarse al altar'],
        ['Relación', 'El altar sin gradas de Éx 20:26 responde a la misma preocupación']
      ],
      desc: 'Es la prenda que va sobre la piel y la única cuyo propósito el texto explica por el pudor: «para cubrir su desnudez». Su uso era obligatorio al ministrar, «para que no lleven pecado y mueran» (v. 43). Levítico 8 no la nombra entre las prendas que Moisés pone a Aarón; aquí va primero porque es la capa interior (Lv 16:4).',
      think: '¿Por qué Dios regula también la prenda que nadie ve?',
      view: { t: [0, 1.9, 0], p: [2.0, 2.4, 6.4] }, wear: 'panetes', focus: ['panetes']
    },
    {
      id: 'tunica', num: 2, n: 'La túnica de lino', ref: 'Éxodo 28:39; 39:27',
      rows: [
        ['Material', 'Lino fino, de obra de tejedor (39:27)'],
        ['Nombre', '«Túnica bordada» (28:4)'],
        ['Quién', 'También la vestían los hijos de Aarón (28:40)']
      ],
      desc: 'Es la prenda base, larga y con mangas. «Bordada» traduce una palabra hebrea que parece describir un tejido con dibujo, quizás en cuadros o rombos; el modelo lo sugiere con una trama sutil. Los demás sacerdotes vestían esta misma túnica: lo que distingue al sumo sacerdote se pone encima.',
      think: '¿Qué comunica que el sumo sacerdote comparta la túnica con sus hermanos?',
      view: { t: [0, 1.9, 0], p: [2.6, 2.5, 7.0] }, wear: 'tunica', focus: ['tunica']
    },
    {
      id: 'cinto', num: 3, n: 'El cinto bordado', ref: 'Éxodo 28:39; 39:29',
      rows: [
        ['Material', 'Lino torcido, azul, púrpura y carmesí (39:29)'],
        ['Obra', '«De recamador»: bordado'],
        ['Orden', 'Se ciñe sobre la túnica, antes del manto (Lv 8:7)']
      ],
      desc: 'Una faja ancha que rodea la cintura y deja caer sus extremos. Lleva los mismos colores de las cortinas del santuario. En las estaciones siguientes queda oculta por el manto, que en este modelo llega bajo la rodilla.',
      think: 'Ceñirse es prepararse para trabajar (Lc 12:35). ¿Qué dice esa imagen del oficio sacerdotal?',
      view: { t: [0, 2.1, 0.2], p: [1.4, 2.5, 4.4] }, wear: 'cinto', focus: ['cinto']
    },
    {
      id: 'manto', num: 4, n: 'El manto del efod', ref: 'Éxodo 28:31-35; 39:22-26',
      rows: [
        ['Color', '«Todo de azul» (v. 31)'],
        ['Cuello', 'Con un borde de obra tejida, «como el cuello de un coselete, para que no se rompa» (v. 32)'],
        ['Orla', 'Granadas de azul, púrpura y carmesí, alternadas con campanillas de oro (v. 33-34)']
      ],
      desc: 'Se pone sobre la túnica y debajo del efod. El texto no da su largo ni cuántas campanillas tenía; el modelo usa 24 granadas y 24 campanillas como convención. Las campanillas tenían una función precisa: «se oirá su sonido cuando él entre en el santuario delante de Jehová y cuando salga, para que no muera» (v. 35).',
      think: '¿Por qué el sonido debía oírse al entrar y también al salir?',
      view: { t: [0, 1.75, 0], p: [2.6, 2.3, 7.4] }, wear: 'manto', focus: ['manto']
    },
    {
      id: 'efod', num: 5, n: 'El efod', ref: 'Éxodo 28:6-8; 39:2-5',
      rows: [
        ['Material', 'Oro, azul, púrpura, carmesí y lino torcido, «de obra primorosa» (v. 6)'],
        ['Técnica', 'Hilos cortados de planchas de oro y tejidos entre los demás (39:3)'],
        ['Partes', 'Dos hombreras y un cinto de la misma obra (28:7-8)']
      ],
      desc: 'Es la prenda exclusiva del sumo sacerdote y la que sostiene a las demás: en sus hombreras van las piedras memoriales y a ella se ata el pectoral. Su forma exacta se discute; el modelo lo muestra como dos paños, delantero y trasero, unidos por las hombreras y ceñidos con su cinto.',
      think: '¿Qué cambia en el atuendo cuando aparece el oro?',
      view: { t: [0, 2.5, 0], p: [2.2, 3.0, 6.0] }, wear: 'efod', focus: ['efod']
    },
    {
      id: 'oniquinas', num: 6, n: 'Las piedras memoriales', ref: 'Éxodo 28:9-14',
      rows: [
        ['Piedras', 'Dos piedras de ónice, con engastes de oro'],
        ['Nombres', 'Seis en cada una, «conforme al orden de nacimiento de ellos» (v. 10)'],
        ['Propósito', '«Aarón llevará los nombres de ellos delante de Jehová sobre sus dos hombros por memorial» (v. 12)']
      ],
      desc: 'Grabadas «como grabaduras de sello» (v. 11), las dos piedras llevaban los nombres de los doce hijos de Israel. Cada vez que Aarón entraba ante Dios, el pueblo entero entraba con él, sobre sus hombros. De sus engastes bajan los cordones de oro que sostendrán el pectoral.',
      think: '¿Qué significa llevar a alguien sobre los hombros?',
      view: { t: [0, 3.1, 0.05], p: [1.3, 4.0, 2.9] }, wear: 'oniquinas', focus: ['oniquinas']
    },
    {
      id: 'racional', num: 7, n: 'El pectoral del juicio', ref: 'Éxodo 28:15-29',
      rows: [
        ['Medida', '«Cuadrado y doble, de un palmo de largo y un palmo de ancho» (v. 16): unos 22 cm'],
        ['Piedras', 'Doce, en cuatro hileras de tres, «montadas en engastes de oro» (v. 20)'],
        ['Sujeción', 'Cordones de oro trenzados a las hombreras y un cordón de azul a los anillos del efod (v. 22-28)']
      ],
      desc: 'Cada piedra llevaba el nombre de una tribu. El texto da la lista de piedras, pero no dice qué tribu iba en cuál. Tampoco hay certeza sobre qué gemas modernas corresponden a los nombres hebreos: los colores del modelo siguen los nombres castellanos de la RV 1960, y las traducciones difieren entre sí.',
      think: 'Hombros y corazón: ¿qué diferencia hay entre cargar a alguien y llevarlo en el corazón?',
      view: { t: [0, 2.7, 0.3], p: [0.7, 2.95, 2.7] }, wear: 'racional', focus: ['racional'], show: ['palmo']
    },
    {
      id: 'urim', num: 8, n: 'El Urim y el Tumim', ref: 'Éxodo 28:30; Números 27:21',
      rows: [
        ['Dónde', '«En el pectoral del juicio», sobre el corazón de Aarón (v. 30)'],
        ['Uso', 'Consultar la voluntad de Dios (Nm 27:21; 1 S 28:6)'],
        ['Forma', 'Desconocida: el texto no la describe']
      ],
      desc: 'El pectoral era doble, como una bolsa, y dentro se ponían el Urim y el Tumim. El modelo vuelve transparente el pectoral y marca solo el lugar que ocupaban, sin darles forma, porque cualquier forma sería inventada. Al volver del exilio ya no había sacerdote que pudiera consultarlos (Esd 2:63).',
      think: '¿Por qué crees que el texto no explica cómo funcionaban?',
      view: { t: [0, 2.68, 0.3], p: [0.45, 2.8, 2.2] }, wear: 'racional', focus: ['racional'], show: ['urim']
    },
    {
      id: 'mitra', num: 9, n: 'La mitra', ref: 'Éxodo 28:39; Levítico 8:9',
      rows: [
        ['Material', 'Lino fino (39:28)'],
        ['Diferencia', 'Los hijos de Aarón llevaban tiaras, no mitra (28:40)'],
        ['Forma', 'Probablemente un turbante enrollado']
      ],
      desc: 'Cubría la cabeza y sostenía la lámina de oro. La forma de turbante es una reconstrucción: la palabra hebrea se relaciona con el verbo enrollar.',
      think: 'La pieza más visible del atuendo se apoya en una prenda sencilla de lino. ¿Qué te sugiere eso?',
      view: { t: [0, 3.68, 0], p: [1.4, 4.2, 3.0] }, wear: 'mitra', focus: ['mitra']
    },
    {
      id: 'plancha', num: 10, n: 'La lámina de oro', ref: 'Éxodo 28:36-38; 39:30-31',
      rows: [
        ['Material', 'Oro fino'],
        ['Inscripción', '«SANTIDAD A JEHOVÁ», «como grabadura de sello» (v. 36)'],
        ['Sujeción', 'Un cordón de azul, «por la parte delantera de la mitra» (v. 37)']
      ],
      desc: 'Es la última pieza que Moisés pone a Aarón (Lv 8:9). El v. 38 explica su función: «llevará Aarón las faltas cometidas en todas las cosas santas» que el pueblo consagraba, «para que obtengan gracia delante de Jehová». El modelo escribe la inscripción en hebreo; el tipo de letra original no se conoce.',
      think: '¿Qué implica que la santidad se lleve en la frente, a la vista de todos?',
      view: { t: [0, 3.66, 0.2], p: [0.45, 3.75, 2.0] }, wear: 'plancha', focus: ['plancha']
    },
    {
      id: 'lino', num: 11, n: 'Las vestiduras de lino', ref: 'Levítico 16:4, 23-24',
      rows: [
        ['Prendas', 'Túnica, calzoncillos, cinto y mitra, todo de lino'],
        ['Cuándo', 'El Día de la Expiación, para entrar al Lugar Santísimo'],
        ['Después', 'Se las quitaba en el tabernáculo, se lavaba y volvía a vestir sus vestiduras (v. 23-24)']
      ],
      desc: 'Una vez al año el sumo sacerdote dejaba el oro, las piedras y el azul, y entraba detrás del velo vestido solo de lino. El texto las llama santas vestiduras y manda ponérselas después de lavarse con agua (v. 4). Es un atuendo más sencillo que el de cualquier día ordinario.',
      think: '¿Por qué el día más solemne se viste con menos esplendor y no con más?',
      view: { t: [0, 1.95, 0], p: [-3.0, 2.6, 7.4] }, wear: 'plancha', attire: 'lino', focus: ['tunica', 'panetes', 'cintoLino', 'mitra'], show: ['nombres']
    }
  ]
};
