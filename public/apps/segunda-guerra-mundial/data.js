/*
 * Contenido de la presentación «La Segunda Guerra Mundial».
 * Este archivo se puede editar sin tocar el motor (app.js).
 *
 * Layouts disponibles y sus campos:
 *   portada    titulo, subtitulo, desde, hasta, imagen
 *   pregunta   titulo
 *   puntos     titulo, subtitulo, pasos [{t, d}], cierre (opcional, aparece al final), imagen
 *   tabla      titulo, filas [rótulos], columnas [{titulo, celdas []}]  (una columna por clic)
 *   linea      titulo, carriles [{id, titulo}], eventos [{fecha, carril, t}]  (un evento por clic)
 *   mapa       titulo, mapa ('europa' | 'america'), desde, hasta (índices de la secuencia)
 *   paneles    titulo, paneles [{titulo, fecha, lugar, texto, resultado}]  (un panel por clic)
 *   debate     titulo, hechos [], columnas [{titulo, items []}]  (alterna columnas por clic)
 *   cifras     titulo, unidad, barras [{nombre, min, max, nota}], remate
 *   preguntas  titulo, preguntas []  (una por clic)
 *
 * Campos comunes: id, acto, imagen, fuente, notas, transicion ('normal'|'lenta'|'ninguna'),
 *   tono ('normal'|'sobrio'), minutos.
 * imagen: { tipo: 'ilustracion' | 'archivo', src, alt, credito, pendiente }.
 *   src: null muestra el marcador «Imagen pendiente».
 *   ajuste: 'completa' muestra la foto entera sin recortar (fotos de archivo).
 *
 * Regla: ninguna cifra entra sin fuente verificada.
 */

/* ---------- Secuencias de los mapas ----------
 * Cada país tiene una cadena con un carácter por etapa.
 * Europa:  E Eje y aliados · O ocupado o controlado por el Eje · A Aliados · U URSS · N neutral · D Eje derrotado
 * América: W declaró la guerra · J declaró la guerra solo a Japón · R rompió relaciones · N neutral
 */
var MAPA_EUROPA = {
  etapas: [
    { etiqueta: '1939', texto: 'Septiembre de 1939: Alemania y la URSS se reparten Polonia. Francia y el Reino Unido declaran la guerra a Alemania.' },
    { etiqueta: '1940', texto: 'Alemania ocupa Dinamarca, Noruega, los Países Bajos, Bélgica, Luxemburgo y Francia. La URSS anexa los países bálticos. El Reino Unido queda solo frente al Eje.' },
    { etiqueta: '1941', texto: 'El Eje conquista Yugoslavia y Grecia, e invade la URSS en junio. En diciembre, el avance se detiene a las puertas de Moscú.' },
    { etiqueta: '1942', texto: 'Noviembre de 1942: máxima extensión del Eje en Europa. El frente llega a Stalingrado y al Cáucaso.' },
    { etiqueta: '1943', texto: 'Tras Stalingrado y Kursk, el Ejército Rojo avanza hacia el oeste. Italia se rinde en septiembre y Alemania ocupa el norte del país.' },
    { etiqueta: '1944', texto: 'Desembarco en Normandía (junio) y operación Bagration (junio–agosto). Francia y Bélgica son liberadas; Rumania y Bulgaria cambian de bando.' },
    { etiqueta: '1945', texto: 'Mayo de 1945: Alemania se rinde incondicionalmente y queda ocupada por los Aliados.' }
  ],
  leyenda: [
    { estado: 'E', texto: 'Eje y sus aliados' },
    { estado: 'O', texto: 'Ocupado o controlado por el Eje' },
    { estado: 'A', texto: 'Aliados' },
    { estado: 'U', texto: 'URSS (en guerra con Alemania desde junio de 1941)' },
    { estado: 'N', texto: 'Neutral' },
    { estado: 'D', texto: 'Eje derrotado, ocupado por los Aliados' }
  ],
  frente: { 2: '1941', 3: '1942', 4: '1943' },
  paises: {
    'alemania': 'EEEEEED', 'italia': 'EEEEOOA', 'albania': 'OOOOOAA',
    'checoslovaquia': 'OOOOOOA', 'polonia': 'OOOOOOA', 'francia': 'AOOOOAA',
    'reino-unido': 'AAAAAAA', 'irlanda': 'NNNNNNN', 'espana': 'NNNNNNN',
    'portugal': 'NNNNNNN', 'suecia': 'NNNNNNN', 'suiza': 'NNNNNNN', 'turquia': 'NNNNNNN',
    'noruega': 'NOOOOOA', 'dinamarca': 'NOOOOOA', 'paises-bajos': 'NOOOOOA',
    'belgica': 'NOOOOAA', 'luxemburgo': 'NOOOOAA', 'finlandia': 'NNEEENN',
    'estonia': 'NUOOOUU', 'letonia': 'NUOOOUU', 'lituania': 'NUOOOUU', 'urss': 'UUUUUUU',
    'hungria': 'NEEEEOD', 'rumania': 'NEEEEAA', 'bulgaria': 'NNEEEAA',
    'yugoslavia': 'NNOOOAA', 'grecia': 'NAOOOAA'
  },
  nota: 'Fronteras de 1938. Colores por país al cierre de cada año; el frente del Este es un trazado aproximado.'
};

var MAPA_AMERICA = {
  etapas: [
    { etiqueta: 'Dic. 1941', texto: 'Tras Pearl Harbor, Centroamérica y el Caribe declaran la guerra junto a Estados Unidos. Colombia y Venezuela rompen relaciones con el Eje.' },
    { etiqueta: '1942', texto: 'La conferencia de Río de Janeiro (enero) recomienda romper con el Eje. Tras el hundimiento de sus barcos, México (mayo) y Brasil (agosto) declaran la guerra.' },
    { etiqueta: '1943', texto: 'Chile rompe relaciones con el Eje (enero). Bolivia (abril) y Colombia (noviembre) declaran la guerra.' },
    { etiqueta: '1944', texto: 'Argentina, la última de la región, rompe relaciones con el Eje (enero).' },
    { etiqueta: '1945', texto: 'Febrero y marzo de 1945: Ecuador, Paraguay, Perú, Venezuela y Uruguay declaran la guerra; Chile, solo a Japón; Argentina, en marzo.' }
  ],
  leyenda: [
    { estado: 'W', texto: 'Declaró la guerra al Eje' },
    { estado: 'J', texto: 'Declaró la guerra solo a Japón' },
    { estado: 'R', texto: 'Rompió relaciones, sin declarar la guerra' },
    { estado: 'N', texto: 'Neutral' }
  ],
  paises: {
    'estados-unidos': 'WWWWW',
    'cuba': 'WWWWW', 'haiti': 'WWWWW', 'republica-dominicana': 'WWWWW', 'guatemala': 'WWWWW',
    'honduras': 'WWWWW', 'el-salvador': 'WWWWW', 'nicaragua': 'WWWWW', 'costa-rica': 'WWWWW', 'panama': 'WWWWW',
    'mexico': 'NWWWW', 'brasil': 'NWWWW', 'bolivia': 'NRWWW', 'colombia': 'RRWWW',
    'venezuela': 'RRRRW', 'ecuador': 'NRRRW', 'peru': 'NRRRW', 'paraguay': 'NRRRW', 'uruguay': 'NRRRW',
    'chile': 'NNRRJ', 'argentina': 'NNNRW'
  },
  nota: 'Las colonias europeas (Guayanas, Belice, Antillas) quedan sin color.'
};

window.PRESENTACION = {
  titulo: 'La Segunda Guerra Mundial',
  mapas: { europa: MAPA_EUROPA, america: MAPA_AMERICA },

  actos: [
    { id: 'origen', titulo: 'El origen' },
    { id: 'expansion', titulo: 'La expansión del Eje, 1939–1941' },
    { id: 'inflexion', titulo: 'El punto de inflexión, 1942–1943' },
    { id: 'derrota', titulo: 'La derrota del Eje, 1944–1945' },
    { id: 'legado', titulo: 'El legado' }
  ],

  diapositivas: [

    /* ================= ACTO I · EL ORIGEN ================= */

    {
      id: 'portada', acto: 'origen', layout: 'portada',
      titulo: 'La Segunda Guerra Mundial',
      subtitulo: 'Causas, desarrollo y legado de la guerra más mortífera de la historia',
      desde: 1939, hasta: 1945,
      imagen: { tipo: 'ilustracion', src: 'img/01-portada.jpg', alt: 'Llanura europea al amanecer bajo un cielo nublado', credito: 'Ilustración generada con IA (Google Flow).' },
      transicion: 'lenta',
      notas: 'Presentarse y anunciar la duración (unos 40 minutos) y la estructura en cinco actos. Avisar que habrá un momento de discusión al final.',
      minutos: 0.5
    },
    {
      id: 'pregunta', acto: 'origen', layout: 'pregunta',
      titulo: '¿Cómo una guerra que terminó en 1918 produjo otra apenas 21 años después?',
      notas: 'Dejar la pregunta en pantalla unos segundos sin hablar. Pedir dos o tres hipótesis al público y anotarlas: se retoman en la diapositiva final.',
      minutos: 1
    },
    {
      id: 'versalles', acto: 'origen', layout: 'puntos',
      titulo: 'Una paz que no cerró la guerra',
      subtitulo: 'El Tratado de Versalles, 1919',
      pasos: [
        { t: 'Pérdidas territoriales', d: 'Alemania entrega Alsacia-Lorena a Francia, territorios al nuevo Estado polaco y todas sus colonias.' },
        { t: 'Reparaciones', d: 'Debe compensar a los vencedores por los daños de la guerra.' },
        { t: 'Responsabilidad', d: 'El artículo 231 le atribuye la responsabilidad por el conflicto.' },
        { t: 'Desarme', d: 'Su ejército queda limitado y la Renania, desmilitarizada.' },
        { t: 'Humillación', d: 'Muchos alemanes lo vivieron como un «Diktat», una paz impuesta. La propaganda nacionalista lo explotó durante dos décadas.' }
      ],
      imagen: { tipo: 'ilustracion', src: 'img/03-versalles.jpg', alt: 'Galería de los Espejos con una mesa de firma y siluetas al fondo', credito: 'Ilustración generada con IA (Google Flow).' },
      fuente: 'Tratado de Versalles (1919), arts. 42–44, 119, 160 y 231.',
      notas: 'Matiz para el debate: Keynes («Las consecuencias económicas de la paz», 1919) sostuvo que las reparaciones eran ruinosas. Historiadores posteriores, como Margaret MacMillan («París 1919»), matizan que el problema fue más político que económico: el tratado fue lo bastante duro para humillar y no lo bastante para impedir el resurgimiento alemán.',
      minutos: 2
    },
    {
      id: 'crisis-1929', acto: 'origen', layout: 'puntos',
      titulo: 'La gran depresión',
      subtitulo: 'De la caída de Wall Street a la crisis de las democracias',
      pasos: [
        { t: 'El derrumbe', d: 'La caída de la bolsa de Nueva York en octubre de 1929 se transmite al mundo a través del crédito y el comercio.' },
        { t: 'Alemania, expuesta', d: 'Su economía dependía de préstamos estadounidenses. Al retirarse, el desempleo se dispara.' },
        { t: 'América Latina', d: 'Se desploman los precios del cobre, el salitre, el café y el azúcar. La crisis golpea a toda la región.' },
        { t: 'La democracia pierde crédito', d: 'Millones culpan a los partidos tradicionales. En julio de 1932, el partido nazi se convierte en la primera fuerza del parlamento alemán.' }
      ],
      imagen: { tipo: 'ilustracion', src: 'img/04-depresion.jpg', alt: 'Fila de hombres frente a un comedor popular en una calle de los años treinta', credito: 'Ilustración generada con IA (Google Flow).' },
      notas: 'Conectar con la pregunta inicial: la crisis no causa la guerra por sí sola, pero hace atractivas las soluciones autoritarias. En América Latina también hubo quiebres institucionales en esos años; se puede mencionar si el público es de la región.',
      minutos: 1.5
    },
    {
      id: 'totalitarismos', acto: 'origen', layout: 'tabla',
      titulo: 'Los regímenes que llevaron a la guerra',
      filas: ['Llega al poder', 'Ideas centrales', 'Enemigos declarados', 'Expansión y represión'],
      columnas: [
        { titulo: 'Italia fascista', celdas: ['Mussolini, 1922', 'Nacionalismo, Estado por sobre el individuo, culto al líder', 'Socialismo y democracia liberal', 'Invasión de Etiopía (1935–1936)'] },
        { titulo: 'Alemania nazi', celdas: ['Hitler, 1933', 'Nacionalismo racial, antisemitismo, «espacio vital» en el Este', 'Judíos, comunistas, el orden de Versalles', 'Persecución de judíos y opositores; expansión desde 1938'] },
        { titulo: 'URSS estalinista', celdas: ['Stalin consolida su poder a fines de los años veinte', 'Comunismo, partido único, economía planificada', '«Enemigos de clase» y disidentes internos', 'Colectivización forzosa y Gran Terror (1936–1938)'] },
        { titulo: 'Japón imperial', celdas: ['Sin dictador único: militares y burócratas gobiernan en nombre del emperador', 'Nacionalismo imperial y militarismo', 'Las potencias occidentales en Asia y el comunismo', 'Ocupación de Manchuria (1931) e invasión de China (1937)'] }
      ],
      notas: 'Japón no fue un régimen totalitario en sentido estricto; está en la tabla por su militarismo expansionista. El concepto de totalitarismo (Hannah Arendt, «Los orígenes del totalitarismo», 1951) sigue en discusión, sobre todo al comparar nazismo y estalinismo. Preguntar al público qué rasgos comparten y en qué se diferencian.',
      minutos: 2
    },
    {
      id: 'camino', acto: 'origen', layout: 'linea',
      titulo: 'El camino a la guerra',
      carriles: [ { id: 'asia', titulo: 'Asia' }, { id: 'europa', titulo: 'Europa y África' } ],
      eventos: [
        { fecha: 'Sep. 1931', carril: 'asia', t: 'Japón ocupa Manchuria' },
        { fecha: 'Ene. 1933', carril: 'europa', t: 'Hitler llega al poder' },
        { fecha: 'Oct. 1935', carril: 'europa', t: 'Italia invade Etiopía' },
        { fecha: 'Mar. 1936', carril: 'europa', t: 'Alemania remilitariza la Renania' },
        { fecha: 'Jul. 1936', carril: 'europa', t: 'Guerra Civil española: Alemania e Italia apoyan a Franco' },
        { fecha: 'Jul. 1937', carril: 'asia', t: 'Comienza la guerra total entre Japón y China' },
        { fecha: 'Mar. 1938', carril: 'europa', t: 'Alemania anexa Austria' },
        { fecha: 'Sep. 1938', carril: 'europa', t: 'Acuerdos de Múnich: los Sudetes pasan a Alemania' },
        { fecha: 'Mar. 1939', carril: 'europa', t: 'Alemania ocupa Praga' },
        { fecha: 'Ago. 1939', carril: 'europa', t: 'Pacto germano-soviético de no agresión' },
        { fecha: 'Sep. 1939', carril: 'europa', t: 'Alemania invade Polonia' }
      ],
      notas: 'Primer matiz: en Asia la guerra empezó antes de 1939. Para China, el conflicto comienza en 1937 o incluso en 1931.\n\nSegundo matiz, sobre Múnich: la política de apaciguamiento suele juzgarse como un error, pero sus defensores sostienen que el Reino Unido y Francia no estaban preparados para combatir en 1938. Dejar la pregunta abierta: se retoma al final.',
      minutos: 2
    },

    /* ================= ACTO II · LA EXPANSIÓN DEL EJE ================= */

    {
      id: 'polonia', acto: 'expansion', layout: 'puntos',
      titulo: 'Estalla la guerra',
      subtitulo: 'Polonia, septiembre de 1939',
      pasos: [
        { t: '1 de septiembre', d: 'Alemania invade Polonia.' },
        { t: '3 de septiembre', d: 'El Reino Unido y Francia declaran la guerra a Alemania.' },
        { t: '17 de septiembre', d: 'La URSS invade desde el este, según el protocolo secreto del pacto con Alemania.' },
        { t: 'Ocupación', d: 'Polonia queda dividida. Ambos ocupantes ejecutan a miles de dirigentes, sacerdotes y profesionales; los judíos son encerrados en guetos.' },
        { t: 'La «guerra de broma»', d: 'En el frente occidental pasan meses casi sin combates.' }
      ],
      imagen: { tipo: 'ilustracion', src: 'img/07-polonia.jpg', alt: 'Civiles con carretas por un camino rural, con humo en el horizonte', credito: 'Ilustración generada con IA (Google Flow).' },
      notas: 'Mencionar Katyn (1940): la URSS asesinó a miles de oficiales polacos prisioneros y durante décadas culpó a Alemania.',
      minutos: 1.5
    },
    {
      id: 'blitzkrieg', acto: 'expansion', layout: 'puntos',
      titulo: 'La guerra relámpago',
      subtitulo: 'La caída de Francia, mayo y junio de 1940',
      pasos: [
        { t: 'Cómo funcionaba', d: 'Tanques, aviación y radio coordinados para romper el frente en un punto y avanzar sin detenerse.' },
        { t: 'Por las Ardenas', d: 'En mayo de 1940, los blindados alemanes cruzan un bosque que los franceses creían infranqueable.' },
        { t: 'Dunkerque', d: 'Cientos de miles de soldados británicos y franceses son evacuados por mar hacia Inglaterra.' },
        { t: 'Armisticio', d: 'El 22 de junio, Francia se rinde: el norte queda ocupado y el sur, bajo el gobierno colaboracionista de Vichy.' }
      ],
      imagen: { tipo: 'ilustracion', src: 'img/08-blitzkrieg.jpg', alt: 'Columna de tanques avanzando por un camino embarrado en un bosque', credito: 'Ilustración generada con IA (Google Flow).' },
      notas: 'Matiz: el historiador Karl-Heinz Frieser («La leyenda de la Blitzkrieg») sostiene que la guerra relámpago no fue una doctrina planificada, sino una improvisación que funcionó mejor de lo esperado.',
      minutos: 2
    },
    {
      id: 'inglaterra', acto: 'expansion', layout: 'puntos',
      titulo: 'La Batalla de Inglaterra',
      subtitulo: 'Julio a octubre de 1940',
      pasos: [
        { t: 'El objetivo alemán', d: 'Dominar el aire para poder invadir Gran Bretaña.' },
        { t: 'Radar', d: 'Una red de radares y centros de mando permite a la RAF concentrar sus cazas donde llegan los ataques.' },
        { t: 'El Blitz', d: 'Alemania pasa a bombardear ciudades: Londres, Coventry y otras sufren meses de ataques nocturnos.' },
        { t: 'Resultado', d: 'La invasión se posterga indefinidamente. Es la primera derrota de Hitler.' }
      ],
      imagen: { tipo: 'ilustracion', src: 'img/09-inglaterra.jpg', alt: 'Cielo con estelas de aviones sobre la campiña inglesa', credito: 'Ilustración generada con IA (Google Flow).' },
      notas: 'Destacar el papel de pilotos de otros países en la RAF, como polacos y checos.',
      minutos: 1.5
    },
    {
      id: 'mapa-expansion', acto: 'expansion', layout: 'mapa',
      titulo: 'Europa bajo el Eje, 1939–1942',
      mapa: 'europa', desde: 0, hasta: 3,
      fuente: 'Fronteras de 1938: historical-basemaps (A. Ourednik). Situación por año: elaboración propia.',
      notas: 'Avanzar año por año con clic o con el control deslizante. Detenerse en 1942: es la máxima extensión del Eje. Recordar que el frente del Este está dibujado de forma aproximada.',
      minutos: 2
    },
    {
      id: 'barbarroja', acto: 'expansion', layout: 'puntos',
      titulo: 'Operación Barbarroja',
      subtitulo: 'La invasión de la URSS, 22 de junio de 1941',
      pasos: [
        { t: 'La mayor invasión', d: 'Alemania y sus aliados atacan la URSS a lo largo de un frente que va del Báltico al mar Negro.' },
        { t: 'Guerra de aniquilamiento', d: 'El plan nazi busca destruir el Estado soviético y someter o eliminar a su población. Millones de prisioneros soviéticos mueren en cautiverio.' },
        { t: 'Detrás del frente', d: 'Unidades especiales fusilan a cientos de miles de judíos. Es el comienzo del exterminio sistemático.' },
        { t: 'Leningrado', d: 'La ciudad queda sitiada desde septiembre de 1941 hasta enero de 1944.' },
        { t: 'Moscú', d: 'En diciembre, la contraofensiva soviética detiene a los alemanes frente a la capital.' }
      ],
      imagen: { tipo: 'ilustracion', src: 'img/11-barbarroja.jpg', alt: 'Camino nevado con camiones abandonados y figuras lejanas', credito: 'Ilustración generada con IA (Google Flow).' },
      notas: 'La invasión rompe el pacto de 1939 y convierte a la URSS en aliada del Reino Unido.',
      minutos: 1.5
    },
    {
      id: 'pearl-harbor', acto: 'expansion', layout: 'puntos',
      titulo: 'Pearl Harbor',
      subtitulo: 'La guerra se vuelve mundial, diciembre de 1941',
      pasos: [
        { t: 'El contexto', d: 'Estados Unidos corta el suministro de petróleo a Japón por su expansión en Asia.' },
        { t: '7 de diciembre', d: 'Japón ataca la flota estadounidense en Hawái y, en los mismos días, Filipinas, Malasia y Hong Kong.' },
        { t: '8 de diciembre', d: 'Estados Unidos declara la guerra a Japón.' },
        { t: '11 de diciembre', d: 'Alemania e Italia declaran la guerra a Estados Unidos.' },
        { t: 'Una guerra global', d: 'Se combate en Europa, el Atlántico, el norte de África, Asia y el Pacífico.' }
      ],
      imagen: { tipo: 'archivo', src: 'img/12-pearl-harbor.jpg', alt: 'El acorazado USS Arizona en llamas, envuelto en humo', credito: 'USS Arizona en llamas, 7 de diciembre de 1941. National Archives de EE.UU., identificador 195617. Dominio público.', ajuste: 'completa' },
      notas: 'Este es el momento en que América Latina empieza a entrar en la guerra: se retoma en la diapositiva sobre la región.',
      minutos: 1.5
    },

    /* ================= ACTO III · EL PUNTO DE INFLEXIÓN ================= */

    {
      id: 'holocausto', acto: 'inflexion', layout: 'puntos',
      titulo: 'El Holocausto',
      tono: 'sobrio', transicion: 'ninguna',
      pasos: [
        { t: 'Persecución', d: 'Desde 1933: exclusión legal de los judíos, leyes de Núremberg (1935) y pogromo de noviembre de 1938.' },
        { t: 'Guetos', d: 'Desde 1939, millones de judíos son encerrados en guetos en la Polonia ocupada.' },
        { t: 'Fusilamientos', d: 'Desde 1941, asesinatos masivos en la URSS ocupada.' },
        { t: 'Exterminio', d: 'En 1942, la «solución final» se coordina en la conferencia de Wannsee. Campos como Treblinka, Sobibor, Belzec y Auschwitz-Birkenau funcionan como centros de asesinato.' }
      ],
      cierre: 'Cerca de seis millones de judíos fueron asesinados. También fueron perseguidos y asesinados gitanos (roma y sinti), personas con discapacidad, prisioneros soviéticos, opositores políticos, homosexuales y testigos de Jehová.',
      fuente: 'United States Holocaust Memorial Museum, Enciclopedia del Holocausto.',
      notas: 'Sin efectos en esta diapositiva. Dar tiempo de silencio después del cierre. Si el público pregunta por el negacionismo, la documentación del propio régimen nazi y los juicios de posguerra son la base de las cifras.',
      minutos: 3
    },
    {
      id: 'tres-batallas', acto: 'inflexion', layout: 'paneles',
      titulo: 'El punto de inflexión',
      paneles: [
        { titulo: 'Midway', fecha: 'Junio de 1942', lugar: 'Océano Pacífico', texto: 'La armada estadounidense, que había descifrado parte de las comunicaciones japonesas, hunde cuatro portaaviones de Japón.', resultado: 'Japón pierde la iniciativa en el Pacífico.' },
        { titulo: 'El Alamein', fecha: 'Octubre y noviembre de 1942', lugar: 'Egipto', texto: 'El ejército británico detiene y hace retroceder a las fuerzas de Rommel. Días después, los Aliados desembarcan en Marruecos y Argelia.', resultado: 'En mayo de 1943, el Eje es expulsado del norte de África.' },
        { titulo: 'Stalingrado', fecha: 'Agosto de 1942 a febrero de 1943', lugar: 'URSS', texto: 'Tras meses de combates casa por casa, el Ejército Rojo cerca al VI Ejército alemán, que se rinde el 2 de febrero de 1943.', resultado: 'Comienza el avance soviético hacia el oeste.' }
      ],
      notas: 'Las tres batallas ocurren en el mismo semestre: muestran que la guerra se decide en varios frentes a la vez. Kursk (julio de 1943) confirma después el cambio en el Este.',
      minutos: 3
    },
    {
      id: 'frente-interno', acto: 'inflexion', layout: 'puntos',
      titulo: 'La guerra total',
      subtitulo: 'El frente interno',
      pasos: [
        { t: 'Economía de guerra', d: 'Las fábricas civiles se reconvierten: las líneas de automóviles producen tanques, aviones y camiones.' },
        { t: 'Mujeres', d: 'Ocupan puestos en la industria y los servicios. En la URSS también combaten como pilotos, francotiradoras y sanitarias.' },
        { t: 'Racionamiento', d: 'Alimentos, combustible y ropa se distribuyen por cupones. La propaganda moviliza a la población.' },
        { t: 'Trabajo forzado', d: 'Alemania y Japón explotan a trabajadores forzados de los territorios ocupados.' },
        { t: 'Ciencia', d: 'El radar, el descifrado de códigos y el Proyecto Manhattan cambian la forma de combatir.' }
      ],
      imagen: { tipo: 'archivo', src: 'img/15-fabrica.jpg', alt: 'Dos mujeres trabajando bajo el fuselaje de un bombardero', credito: '«Women at work on bomber», Douglas Aircraft Company, Long Beach (California), octubre de 1942. Alfred T. Palmer, Oficina de Información de Guerra de EE.UU. Library of Congress, colección FSA/OWI. Dominio público.', ajuste: 'completa' },
      notas: 'En América Latina, la guerra se vivió sobre todo como frente económico: demanda de materias primas, escasez de importaciones y listas negras de empresas vinculadas al Eje.',
      minutos: 2
    },

    /* ================= ACTO IV · LA DERROTA DEL EJE ================= */

    {
      id: 'mapa-derrota', acto: 'derrota', layout: 'mapa',
      titulo: 'Dos frentes que se cierran, 1943–1945',
      mapa: 'europa', desde: 4, hasta: 6,
      fuente: 'Fronteras de 1938: historical-basemaps (A. Ourednik). Situación por año: elaboración propia.',
      notas: 'Matiz frecuente: el Día D es el hecho más conocido en Occidente, pero la mayor parte de las pérdidas militares alemanas ocurrió en el frente del Este. La operación Bagration (junio de 1944) destruyó un grupo de ejércitos alemán completo.',
      minutos: 2.5
    },
    {
      id: 'berlin', acto: 'derrota', layout: 'puntos',
      titulo: 'La caída de Berlín',
      subtitulo: 'Abril y mayo de 1945',
      pasos: [
        { t: 'El cerco', d: 'En abril, el Ejército Rojo rodea Berlín.' },
        { t: '30 de abril', d: 'Hitler se suicida en su búnker.' },
        { t: '2 de mayo', d: 'La ciudad se rinde.' },
        { t: '8 de mayo', d: 'Alemania se rinde sin condiciones. Termina la guerra en Europa.' },
        { t: 'Los campos', d: 'Al avanzar, los Aliados liberan los campos y el mundo ve las pruebas del exterminio.' }
      ],
      imagen: { tipo: 'ilustracion', src: 'img/17-berlin.jpg', alt: 'Ciudad en ruinas con un gran edificio de cúpula dañada', credito: 'Ilustración generada con IA (Google Flow).' },
      transicion: 'lenta',
      notas: 'En la URSS y en Rusia, la victoria se celebra el 9 de mayo por la diferencia horaria con la firma.',
      minutos: 1.5
    },
    {
      id: 'bombas', acto: 'derrota', layout: 'debate',
      titulo: 'Hiroshima y Nagasaki',
      tono: 'sobrio',
      hechos: [
        '6 de agosto de 1945: bomba atómica sobre Hiroshima. 8 de agosto: la URSS declara la guerra a Japón. 9 de agosto: bomba sobre Nagasaki. 15 de agosto: Japón anuncia su rendición, que firma el 2 de septiembre.',
        'Muertes estimadas: entre 90.000 y 140.000 en Hiroshima y entre 60.000 y 80.000 en Nagasaki.'
      ],
      columnas: [
        { titulo: 'Quienes defienden la decisión', items: [
          'Japón no aceptaba la rendición incondicional y preparaba la defensa de su territorio.',
          'La invasión planificada habría costado muchas más vidas, japonesas y aliadas.',
          'La batalla de Okinawa (abril a junio de 1945) había mostrado lo sangrienta que sería.'
        ] },
        { titulo: 'Quienes la critican', items: [
          'Las bombas se lanzaron sobre ciudades: la mayoría de las víctimas fueron civiles.',
          'Japón estaba bloqueado, y la entrada soviética en la guerra pudo bastar para forzar la rendición.',
          'La decisión también buscaba mostrar el poder estadounidense ante la URSS.'
        ] }
      ],
      fuente: 'Muertes: Radiation Effects Research Foundation (RERF).',
      notas: 'No dar una conclusión. Historiadores de referencia: Richard Frank («Downfall», 1999) sostiene que Japón no se habría rendido sin las bombas; Tsuyoshi Hasegawa («Racing the Enemy», 2005) da más peso a la entrada soviética; Gar Alperovitz plantea el argumento de la diplomacia atómica. La RERF advierte que las estimaciones tienen márgenes de error amplios.',
      minutos: 3
    },

    /* ================= ACTO V · EL LEGADO ================= */

    {
      id: 'balance', acto: 'legado', layout: 'cifras',
      titulo: 'El costo humano',
      tono: 'sobrio',
      unidad: 'millones de muertos, civiles y militares',
      barras: [
        { nombre: 'URSS', min: 24 },
        { nombre: 'China', min: 20 },
        { nombre: 'Alemania', min: 6.6, max: 8.8 },
        { nombre: 'Polonia', min: 5.6 },
        { nombre: 'Japón', min: 2.6, max: 3.1 },
        { nombre: 'Yugoslavia', min: 1.0 },
        { nombre: 'Francia', min: 0.57 },
        { nombre: 'Italia', min: 0.46 },
        { nombre: 'Reino Unido', min: 0.45 },
        { nombre: 'Estados Unidos', min: 0.42 }
      ],
      remate: 'El mismo recuento estima unos 45 millones de civiles muertos, tres veces más que los militares caídos en combate. Otras estimaciones superan los 70 millones de muertos al incluir el hambre y las enfermedades causadas por la guerra.',
      fuente: 'The National WWII Museum, «Research Starters: Worldwide Deaths in World War II». Los rangos indican estimaciones mínimas y máximas.',
      notas: 'Las cifras son estimaciones y varían según la fuente. Por ejemplo, el gobierno ruso estima las pérdidas soviéticas en 26,6 millones. Para América Latina, el mismo museo registra unos 2.000 muertos brasileños.\n\nPolonia perdió alrededor del 17 % de su población, según WorldAtlas: conviene contrastar esa proporción con otra fuente antes de citarla.',
      minutos: 2
    },
    {
      id: 'america-latina', acto: 'legado', layout: 'mapa',
      titulo: 'América Latina en la guerra',
      mapa: 'america', desde: 0, hasta: 4,
      lateral: 'La región aportó materias primas estratégicas: cobre, salitre, petróleo, caucho, carne. Brasil envió una fuerza expedicionaria a Italia, y México, el Escuadrón 201 al Pacífico.',
      fuente: 'Memoria Chilena (Biblioteca Nacional de Chile); Omniatlas; G. Lora (Bolivia); Wikipedia: Colombia y Venezuela durante la Segunda Guerra Mundial.',
      notas: 'Muchas declaraciones de 1945 respondieron a la condición fijada por los Aliados para participar en la conferencia que fundó la ONU.\n\nChile nunca declaró la guerra a Alemania. Las fuentes difieren sobre la fecha de su declaración contra Japón (febrero o abril de 1945): verificar antes de citarla.\n\nTemas para profundizar si hay tiempo: el exilio republicano español y el refugio judío en la región; y, en la posguerra, la huida de criminales nazis a Sudamérica (Eichmann fue capturado en Buenos Aires en 1960).',
      minutos: 2.5
    },
    {
      id: 'mundo-nuevo', acto: 'legado', layout: 'puntos',
      titulo: 'Un mundo nuevo',
      subtitulo: 'Lo que dejó la guerra',
      pasos: [
        { t: 'Naciones Unidas', d: 'Su Carta se firma en San Francisco en junio de 1945. Los países latinoamericanos están entre sus fundadores.' },
        { t: 'Justicia internacional', d: 'Los juicios de Núremberg (1945–1946) y Tokio (1946–1948) juzgan a dirigentes por crímenes de guerra y contra la humanidad.' },
        { t: 'Derechos humanos', d: 'En 1948 se aprueban la Declaración Universal de Derechos Humanos y la Convención contra el Genocidio. El chileno Hernán Santa Cruz participó en la redacción de la Declaración.' },
        { t: 'Guerra Fría', d: 'Europa queda dividida entre la influencia de Estados Unidos y la de la URSS, que compiten también en América Latina.' },
        { t: 'Descolonización', d: 'Los imperios europeos salen debilitados. India se independiza en 1947 y le siguen otros países de Asia y África.' }
      ],
      notas: 'Cerrar el arco: muchas de estas instituciones se diseñaron para que lo ocurrido entre 1939 y 1945 no se repitiera.',
      minutos: 2.5
    },
    {
      id: 'discusion', acto: 'legado', layout: 'preguntas',
      titulo: 'Para discutir',
      preguntas: [
        'Volvamos a la pregunta inicial: ¿cuáles de nuestras hipótesis se sostienen?',
        '¿Se pudo detener a Hitler en 1936 o en 1938? ¿A qué costo?',
        '¿Por qué tantas sociedades aceptaron o apoyaron regímenes totalitarios?',
        '¿Qué instituciones nacidas en 1945 siguen vigentes, y cuáles están en crisis?'
      ],
      notas: 'Retomar las hipótesis anotadas al inicio. Moderar sin cerrar con una respuesta única.',
      minutos: 2.5
    }
  ]
};
