/* ==========================================================
   Recursos Bíblicos — El templo de Herodes · contenido
   Citas bíblicas: Reina-Valera 1960, salvo indicación en contrario.
   Unidad: 1 = 1 codo común (≈ 45 cm). Ejes: +x oriente, −z norte, +y arriba.
   Origen: centro del Lugar Santísimo, al nivel del atrio de los gentiles.
   Debe cargarse ANTES de app.js.

   LAYOUT: medidas y posiciones que usa app.js para construir la escena.
     Corregir aquí una medida corrige el modelo.
   ROUTES: una ruta = { id, grupo, n, info, steps }.
   Cada estación define:
     n, short, ref, rows [[título, texto]],
     desc: párrafos (arreglo de textos),
     think: pregunta «Para pensar» (sin respuesta),
     view { t: objetivo, p: posición de cámara } en codos,
     zona: parte que se resalta (ver LAYOUT.zonas),
     roof: false quita los techos para ver el interior,
     show: grupos auxiliares: 'nombres' | 'medidas' | 'middot' | 'escala' | 'salomon'
   ========================================================== */
window.HERODES_DATA = {

  /* ---------------- Medidas del modelo ----------------
     Plataforma: arqueología (perímetro actual del Haram, simplificado).
     Atrios y santuario: Mishná, tratado Middot.
     Lo que ninguna fuente fija se marca «estimado». */
  LAYOUT: {
    codo: 0.45,
    niveles: {            // altura del piso, en codos
      calleSur: -50,      // calle al pie del muro sur (estimado)
      gentiles: 0,
      mujeres: 6,         // doce escalones de medio codo desde el jel (Middot 2:3)
      israel: 13.5,       // quince escalones (Middot 2:5)
      sacerdotes: 16,     // dos codos y medio más alto (Middot 2:6)
      santuario: 22       // doce escalones desde el atrio de los sacerdotes (Middot 3:6)
    },
    // Plataforma trapezoidal: muro occidental ≈ 488 m, oriental ≈ 470 m,
    // norte ≈ 315 m, sur ≈ 280 m (medidas modernas, redondeadas)
    plataforma: { nO: [-270, -420], nE: [430, -420], sE: [372, 665], sO: [-250, 665] },
    middot: { x: [-60, 440], z: [-230, 270] },          // cuadrado de 500 × 500 codos (Middot 2:1)
    soreg: { x: [-60, 307], z: [-90, 90], alto: 1.7 },  // diez palmos (Middot 2:3); trazado estimado
    mujeres: { x: [150, 285], z: [-67.5, 67.5] },       // 135 × 135 (Middot 2:5)
    atrioInterior: { x: [-38, 149], z: [-67.5, 67.5] }, // 187 × 135 (Middot 5:1)
    franjas: { israel: [138, 149], sacerdotes: [127, 138] }, // once codos cada una
    altar: { x: [95, 127], z: [-16, 16], alto: 9, rampa: { z: [16, 48] } }, // Middot 3:1-3
    lavatorio: [85, 0, 20],
    matadero: { x: [95, 127], z: [-50, -18] },          // al norte del altar (Middot 3:5)
    santuario: {
      x: [-27, 73], alto: 100,                          // 100 × 100 × 100 (Middot 4:6)
      cuerpo: 70, portico: 100,                         // «ancho por delante, angosto por detrás»
      porticoX: [57, 73], santoX: [11, 51], veloX: [10, 11], santisimoX: [-10, 10],
      santoAlto: 40
    },
    porticoReal: { z: [620, 665], columnas: 162, hileras: 4 },
    porticoSalomon: { x: [400, 430] },
    antonia: { x: [-260, -80], z: [-470, -400] },
    arcoRobinson: [-250, 630],
    puertasHulda: { doble: [-20, 665], triple: [110, 665] },
    /* Templo de Salomón superpuesto (botón «Templo de Salomón»).
       Mismas medidas que public/apps/templo-salomon/, desplazadas +30 codos en x
       para que ambos Lugares Santísimos coincidan. Se apoya en el piso del santuario.
       Lo que en ese modelo es estimado sigue siéndolo aquí (atrio, muros, cámaras). */
    salomon: {
      desplazamiento: 30,
      santisimo: { x: [-10, 10], alto: 20 },           // 1 R 6:20
      santo: { x: [10, 50], alto: 30 },                // 1 R 6:2, 17
      casa: { x: [-13, 53], z: [-13, 13], alto: 30 },  // con muros de 3 codos (estimado)
      portico: { x: [53, 63], z: [-13, 13], alto: 30 },// 1 R 6:3; alto según el modelo de Salomón
      camaras: { x: [-20, 53], z: [-20, 20], alto: 15 },// 1 R 6:5-10; tres pisos de 5 codos
      columnas: { x: 67, z: 6.8, alto: 23 },           // Jaquín y Boaz: 18 + capitel de 5
      altar: { x: [82, 102], z: [-10, 10], alto: 10 },  // 2 Cr 4:1
      mar: { pos: [72, 28], diametro: 10, alto: 5 },    // 1 R 7:23
      atrio: { x: [-34, 124], z: [-48, 48] }            // estimado
    },
    zonas: [
      'plataforma', 'escalinata', 'robinson', 'porticoReal', 'porticoSalomon',
      'gentiles', 'soreg', 'mujeres', 'nicanor', 'israel', 'altar', 'lavatorio',
      'santuario', 'santo', 'velo', 'santisimo', 'antonia'
    ]
  },

  ROUTES: [
    {
      id: 'recorrido', grupo: 'El templo', n: 'Recorrido por el monte del templo',
      info: 'Del muro sur al Lugar Santísimo, como subía un peregrino en tiempos de Jesús.',
      steps: [
        {
          id: 'general', num: null, n: 'El templo de Herodes', short: 'Vista general',
          ref: 'Juan 2:20; Marcos 13:1; Lucas 21:5',
          rows: [
            ['Qué es', 'El segundo templo, el que reconstruyeron los que volvieron del exilio (Esd 6:15), ampliado y rehecho por Herodes el Grande'],
            ['Obras', 'Comenzaron hacia el año 20 a.C. y siguieron hasta poco antes del año 70 d.C. En tiempos de Jesús ya llevaban 46 años (Jn 2:20)'],
            ['Tamaño', 'La explanada mide unos 480 × 300 m, casi el doble de la anterior'],
            ['Fin', 'Destruido por los romanos en el año 70 d.C., como Jesús lo había anunciado (Mt 24:1-2)'],
            ['Fuentes', 'Nuevo Testamento; Flavio Josefo (Antigüedades 15; Guerra 5); Mishná, tratado Middot; arqueología']
          ],
          desc: [
            'Este es el templo que conocieron Jesús, sus discípulos y la iglesia de Jerusalén. No era un edificio nuevo en sentido estricto: Herodes no derribó el templo de Zorobabel de una vez, sino que lo fue reemplazando por partes para que el culto no se interrumpiera. Por eso los judíos lo siguieron llamando el segundo templo.',
            'La Biblia no da sus medidas. El modelo combina tres fuentes: la arqueología para la plataforma y los muros, que todavía existen; la Mishná, escrita hacia el año 200 d.C. por quienes conservaban la memoria del templo, para los atrios y el santuario; y el historiador Flavio Josefo, testigo directo, para los pórticos y la fortaleza Antonia. Cuando esas fuentes no coinciden, la ficha de cada estación lo dice.',
            'Recorre la ruta en orden: empieza fuera del muro sur, donde llegaban los peregrinos, y avanza hacia el centro, donde cada atrio es más alto y más restringido que el anterior.'
          ],
          think: 'Jesús dijo: «uno mayor que el templo está aquí» (Mt 12:6). ¿Qué quiso enseñar con esas palabras a quienes veían este edificio cada día?',
          view: { t: [80,  -10,  120], p: [978,  879,  1018] }, show: ['nombres']
        },
        {
          id: 'plataforma', num: 1, n: 'La plataforma y sus muros', short: 'La plataforma',
          ref: 'Marcos 13:1-2; Juan 2:20',
          rows: [
            ['Medidas', 'Trapecio de unos 488 m (oeste), 470 m (este), 315 m (norte) y 280 m (sur)'],
            ['Altura', 'En la esquina suroeste el muro se alzaba unos 30 m sobre la calle (estimado)'],
            ['Piedras', 'Sillares con borde rebajado y centro en relieve, típicos de Herodes. Uno del muro occidental mide unos 13,6 m de largo'],
            ['Hoy', 'El Muro Occidental es parte del muro de contención de esta plataforma, no del templo mismo']
          ],
          desc: [
            'El monte Moriah no era plano. Para tener una explanada tan grande, Herodes rodeó la cima con cuatro muros de contención y rellenó el interior con tierra y bóvedas. Por el sur, donde el terreno caía hacia el valle, los muros alcanzaban su mayor altura.',
            'Las piedras se colocaban sin mortero, sostenidas por su propio peso. El sillar más grande conocido, en el túnel del muro occidental, mide unos 13,6 m de largo; su peso se ha estimado entre 250 y más de 500 toneladas, según el cálculo que se use. Por eso los discípulos le dijeron a Jesús: «Maestro, mira qué piedras, y qué edificios» (Mr 13:1).',
            'El muro que hoy se conoce como Muro Occidental o de los Lamentos es un tramo de esta contención. Sobrevivió porque los romanos derribaron el templo y los pórticos, pero no la base del monte.'
          ],
          think: 'Los discípulos admiraban piedras que parecían eternas, y Jesús les anunció que no quedaría piedra sobre piedra (Mr 13:2). ¿En qué cosas solemos poner una seguridad que solo corresponde a Dios?',
          view: { t: [-200,  -25,  600], p: [-650,  110,  1050] }, zona: 'plataforma', show: ['medidas', 'escala']
        },
        {
          id: 'escalinata', num: 2, n: 'Las escalinatas del sur y las puertas de Hulda', short: 'Escalinatas y puertas de Hulda',
          ref: 'Salmos 122:1-2; Salmos 120–134',
          rows: [
            ['Ubicación', 'Muro sur, frente a la ciudad de David'],
            ['Puertas', 'Dos: la doble (al oeste) y la triple (al este). La Mishná las llama puertas de Hulda (Middot 1:3)'],
            ['Acceso', 'Túneles en rampa que subían bajo el pórtico real hasta la explanada'],
            ['Baños', 'Al pie de la escalinata se han hallado muchos baños rituales (mikvaot) para purificarse antes de subir']
          ],
          desc: [
            'Por aquí entraba la mayoría de los peregrinos. Venían desde la ciudad baja, se lavaban en los baños rituales que rodeaban la escalinata y subían por gradas anchas hasta las dos puertas del muro sur. La escalinata frente a la puerta doble fue excavada en el siglo XX y hoy se puede pisar.',
            'Los peldaños tienen distinto ancho, y eso obliga a subir con un paso pausado. Los Salmos 120 al 134 se titulan «cántico gradual» o «cántico de las subidas»: la tradición los relaciona con los peregrinos que subían a Jerusalén en las fiestas, aunque el texto no dice en qué lugar exacto se cantaban.',
            'Las puertas daban a túneles en pendiente que pasaban bajo el pórtico real y salían a la explanada. Según la Mishná, se entraba por la derecha y se salía por la izquierda; quien iba de luto lo hacía al revés, y los demás lo consolaban al cruzarse con él.'
          ],
          think: '«Yo me alegré con los que me decían: a la casa de Jehová iremos» (Sal 122:1). ¿Con qué actitud llegas tú a reunirte con el pueblo de Dios?',
          view: { t: [40,  -40,  670], p: [85,  -4,  924] }, zona: 'escalinata', show: ['nombres']
        },
        {
          id: 'robinson', num: 3, n: 'El arco de Robinson y la calle herodiana', short: 'El arco de Robinson',
          ref: 'Lucas 2:41-42',
          rows: [
            ['Qué era', 'Una escalera monumental sobre arcos que subía desde la calle hasta el pórtico real'],
            ['Nombre', 'Por Edward Robinson, que identificó el arranque del arco en 1838'],
            ['Calle', 'Al pie del muro occidental corría una calle pavimentada con tiendas'],
            ['Hallazgo', 'Una piedra caída del ángulo superior lleva grabado en hebreo «al lugar del toque de trompeta»']
          ],
          desc: [
            'En la esquina suroeste todavía se ve, saliendo del muro, el comienzo de un gran arco. Sostenía una escalera que doblaba en ángulo recto y llevaba a la gente desde la calle comercial, abajo, hasta la entrada occidental del pórtico real, arriba.',
            'En 1968 se encontró al pie de esa esquina una piedra que había caído en la destrucción del año 70. Tiene una inscripción incompleta que se lee como «al lugar del toque de trompeta». Josefo cuenta que un sacerdote subía a lo alto del templo para anunciar con la trompeta el comienzo y el fin del día de reposo. Esta piedra muestra dónde se hacía.',
            'Las calles que pasaban junto al muro estaban llenas de tiendas. A esta ciudad subía la familia de Jesús cada año para la Pascua (Lc 2:41-42).'
          ],
          think: 'Desde lo alto del templo se anunciaba a toda la ciudad el comienzo del día de reposo. ¿Qué lugar le das al día que dedicas al Señor en tu semana?',
          view: { t: [-262,  -22,  630], p: [-473,  14,  778] }, zona: 'robinson', show: ['nombres', 'escala']
        },
        {
          id: 'porticoReal', num: 4, n: 'El pórtico real', short: 'El pórtico real',
          ref: 'Mateo 21:12-13; Isaías 56:7',
          rows: [
            ['Medidas', 'A lo largo de todo el muro sur, unos 280 m (Josefo da «un estadio», ≈ 185 m)'],
            ['Columnas', '162, en cuatro hileras; tres hombres con los brazos extendidos apenas abarcaban una (Josefo, Antigüedades 15)'],
            ['Forma', 'Tres naves, la central más alta, como una basílica romana'],
            ['Uso', 'Probable lugar de reunión, de comercio y de cambio de moneda']
          ],
          desc: [
            'Josefo lo describe como la obra más digna de mención de todas las que hay bajo el sol. Era una gran sala con columnas a lo largo de todo el lado sur de la explanada, abierta hacia el norte, desde donde se veían los atrios y el santuario.',
            'El Nuevo Testamento no nombra este pórtico, pero muchos estudiosos piensan que allí, o en el atrio inmediato, estaban los cambistas y los vendedores de animales. El impuesto del templo debía pagarse en una moneda de plata determinada, y los peregrinos que venían de lejos necesitaban comprar los animales para sus sacrificios.',
            'Jesús no condenó el sacrificio ni la ofrenda, sino que el lugar de oración se hubiera convertido en mercado: «Mi casa, casa de oración será llamada; mas vosotros la habéis hecho cueva de ladrones» (Mt 21:13). Su cita viene de Isaías 56:7, que termina diciendo «para todos los pueblos».'
          ],
          think: 'Jesús purificó el templo porque el comercio ocupaba el lugar de la oración. ¿Qué cosas pueden ocupar en tu vida el espacio que Dios quiere para la oración?',
          view: { t: [40,  20,  640], p: [40,  66,  425] }, zona: 'porticoReal', show: ['nombres']
        },
        {
          id: 'porticoSalomon', num: 5, n: 'El pórtico de Salomón', short: 'El pórtico de Salomón',
          ref: 'Juan 10:22-23; Hechos 3:11; Hechos 5:12',
          rows: [
            ['Ubicación', 'A lo largo del muro oriental, frente al monte de los Olivos'],
            ['Nombre', 'Josefo dice que se atribuía a Salomón y que Herodes lo conservó (Antigüedades 20)'],
            ['Forma', 'Dos hileras de columnas con techo de cedro (estimado a partir de Josefo)'],
            ['En la Biblia', 'Jesús enseñó allí en la fiesta de la dedicación; la iglesia de Jerusalén se reunía allí']
          ],
          desc: [
            'Los pórticos rodeaban toda la explanada, y el del lado oriental tenía un nombre propio. Josefo afirma que era una obra antigua que se atribuía a Salomón. Es probable que fuera anterior a Herodes, aunque difícilmente del primer templo, que los babilonios destruyeron por completo.',
            'Era invierno, en la fiesta de la dedicación, cuando Jesús caminaba por este pórtico y los judíos lo rodearon para preguntarle si era el Cristo (Jn 10:22-24). Era un lugar techado, protegido del viento.',
            'Después de Pentecostés, la iglesia se reunía aquí «unánimes» y por mano de los apóstoles se hacían muchas señales y prodigios en el pueblo (Hch 5:12). Allí corrió la gente a ver al cojo que Pedro y Juan habían sanado en el nombre de Jesús (Hch 3:11).'
          ],
          think: 'La primera iglesia se reunía en un pórtico del templo, «unánimes», y Dios confirmaba la palabra con señales (Hch 5:12). ¿Qué relación ves entre la unidad de los creyentes y el obrar del Espíritu Santo?',
          view: { t: [395,  12,  -250], p: [224,  59,  -220] }, zona: 'porticoSalomon', show: ['nombres', 'escala']
        },
        {
          id: 'gentiles', num: 6, n: 'El atrio de los gentiles', short: 'El atrio de los gentiles',
          ref: 'Isaías 56:6-7; Marcos 11:15-17',
          rows: [
            ['Quién entraba', 'Cualquier persona, judía o no'],
            ['Tamaño', 'Toda la explanada fuera del recinto sagrado; la mayor parte del monte'],
            ['Nombre', 'Moderno: ni la Biblia ni Josefo usan «atrio de los gentiles»'],
            ['Piso', 'Losas de piedra; el centro de la explanada quedaba al aire libre']
          ],
          desc: [
            'Al salir de los túneles o bajar de los pórticos, el peregrino llegaba a una inmensa explanada abierta. Era la única parte del templo donde podía estar un extranjero. Por eso hoy se la llama atrio de los gentiles, aunque las fuentes antiguas no le dan ese nombre.',
            'Herodes amplió sobre todo este espacio. Los atrios interiores y el santuario se mantuvieron en el lugar de siempre, y la plataforma creció a su alrededor, en especial hacia el sur.',
            'Aquí se movían multitudes en las fiestas, y aquí enseñaban los maestros. Marcos es el único evangelista que conserva la frase completa de Isaías en la purificación del templo: casa de oración «para todas las naciones» (Mr 11:17). El espacio para los gentiles estaba lleno de mesas y animales.'
          ],
          think: 'El atrio más grande era el único abierto a todas las naciones. ¿Qué te dice eso del corazón de Dios para los que todavía no lo conocen (Mt 28:19)?',
          view: { t: [120,  0,  250], p: [445,  375,  812] }, zona: 'gentiles', show: ['nombres', 'middot']
        },
        {
          id: 'soreg', num: 7, n: 'El soreg y la inscripción de advertencia', short: 'El soreg',
          ref: 'Hechos 21:27-29; Efesios 2:13-14',
          rows: [
            ['Qué era', 'Una baranda de piedra calada que rodeaba el recinto sagrado'],
            ['Altura', 'Diez palmos (Middot 2:3); Josefo dice tres codos'],
            ['Inscripción', 'En griego y en latín, a intervalos. Se conservan dos ejemplares en griego: uno completo (Estambul) y un fragmento (Jerusalén)'],
            ['Detrás', 'Una terraza de diez codos, el jel, y luego los muros de los atrios']
          ],
          desc: [
            'Una baranda baja marcaba el límite que ningún extranjero podía cruzar. A trechos tenía placas de piedra con una advertencia. La que se encontró completa en 1871 dice, en sustancia, que ningún extranjero pase la baranda que rodea el santuario, y que quien sea sorprendido será responsable de su propia muerte.',
            'Esta baranda explica el tumulto de Hechos 21. Unos judíos de Asia acusaron a Pablo de haber metido griegos en el templo, porque lo habían visto en la ciudad con Trófimo de Éfeso. La acusación era falsa, pero bastó para que toda la ciudad se alborotara y quisieran matarlo (Hch 21:28-31).',
            'Pablo pensaba en una separación como esta cuando escribió a los efesios, que eran gentiles: Cristo «es nuestra paz, que de ambos pueblos hizo uno, derribando la pared intermedia de separación» (Ef 2:14).'
          ],
          think: 'Una inscripción amenazaba de muerte al extranjero que se acercara; en Cristo, a los que estaban lejos Pablo les dice: «habéis sido hechos cercanos por la sangre de Cristo» (Ef 2:13). ¿Qué barreras entre personas debería derribar hoy el evangelio en tu iglesia y en tu entorno?',
          view: { t: [270,  2,  90], p: [352,  25,  159] }, zona: 'soreg', show: ['nombres', 'escala']
        },
        {
          id: 'mujeres', num: 8, n: 'La puerta la Hermosa y el atrio de las mujeres', short: 'El atrio de las mujeres',
          ref: 'Hechos 3:1-10; Marcos 12:41-44; Juan 8:20',
          rows: [
            ['Medidas', '135 × 135 codos (≈ 61 m por lado) (Middot 2:5)'],
            ['Quién entraba', 'Todo israelita en estado de pureza, hombres y mujeres'],
            ['Esquinas', 'Cuatro cámaras: de los nazareos, de la leña, de los leprosos purificados y del aceite'],
            ['El tesoro', 'Trece recipientes en forma de trompeta para las ofrendas (Mishná, Shekalim 6)'],
            ['La puerta la Hermosa', 'Probablemente la puerta oriental de este atrio; otros la identifican con la de Nicanor o con una puerta del muro exterior']
          ],
          desc: [
            'Se llamaba atrio de las mujeres porque era el punto más avanzado al que ellas podían llegar, no porque fuera solo para ellas. Era el lugar de reunión del pueblo: aquí se oraba, se enseñaba y se depositaban las ofrendas.',
            'A la entrada oriental de este atrio pedía limosna el cojo de nacimiento al que Pedro le dijo: «No tengo plata ni oro, pero lo que tengo te doy; en el nombre de Jesucristo de Nazaret, levántate y anda» (Hch 3:6). La Biblia la llama «la puerta del templo que se llama la Hermosa» (Hch 3:2), pero no dice cuál era. La identificación con esta puerta es la más común, no la única.',
            'Junto a los recipientes del tesoro, Jesús vio a una viuda pobre echar dos blancas, y dijo que había dado más que todos (Mr 12:41-44). También enseñó «en el lugar de las ofrendas» (Jn 8:20). En la fiesta de los tabernáculos se encendían aquí grandes candeleros que, según la Mishná, iluminaban toda Jerusalén; en ese contexto Jesús dijo: «Yo soy la luz del mundo» (Jn 8:12).'
          ],
          think: 'Jesús se sentó frente al tesoro a mirar cómo ofrendaba el pueblo (Mr 12:41). ¿Con qué mide Dios una ofrenda, y qué dice eso de tu manera de dar?',
          view: { t: [220,  8,  0], p: [411,  116,  -69] }, zona: 'mujeres', show: ['nombres']
        },
        {
          id: 'nicanor', num: 9, n: 'Los quince escalones y la puerta de Nicanor', short: 'La puerta de Nicanor',
          ref: 'Lucas 2:22-24; Levítico 12:6-8',
          rows: [
            ['Escalones', 'Quince, en semicírculo, de medio codo cada uno (Middot 2:5)'],
            ['Puerta', 'De bronce corintio, donada por Nicanor de Alejandría. Josefo dice que valía más que las cubiertas de oro y plata (Guerra 5)'],
            ['Uso', 'Desde aquí se presentaban las ofrendas de purificación de las madres y de los leprosos sanados'],
            ['Levitas', 'Según la Mishná, cantaban en estos escalones en la fiesta de los tabernáculos']
          ],
          desc: [
            'Desde el atrio de las mujeres, quince escalones curvos subían a la puerta principal del atrio interior. La Mishná dice que correspondían a los quince cánticos graduales (Sal 120–134) y que los levitas los cantaban aquí con instrumentos. Es una tradición judía antigua; la Biblia no lo afirma.',
            'La puerta era famosa por su bronce corintio. Una familia judía de Alejandría donó sus hojas, y en un osario hallado en el monte de los Olivos se lee el nombre de «Nicanor de Alejandría, el que hizo las puertas».',
            'Probablemente aquí se presentó María para su purificación cuarenta días después del nacimiento de Jesús. Ofreció «un par de tórtolas, o dos palominos» (Lc 2:24), lo que la ley permitía a quien no podía pagar un cordero (Lv 12:8). En el templo los esperaban Simeón y Ana, que reconocieron en el niño la salvación de Dios (Lc 2:25-38).'
          ],
          think: 'José y María presentaron la ofrenda de los pobres, y aun así llevaban en brazos al Hijo de Dios. ¿Qué te enseña esto sobre la manera en que Dios elige obrar?',
          view: { t: [152,  12,  0], p: [219,  30,  -12] }, zona: 'nicanor', show: ['nombres', 'escala']
        },
        {
          id: 'israel', num: 10, n: 'El atrio de Israel y el de los sacerdotes', short: 'Atrios de Israel y de los sacerdotes',
          ref: 'Lucas 1:8-10; 1 Pedro 2:9',
          rows: [
            ['Medidas', 'Dos franjas de 135 × 11 codos (Middot 2:6)'],
            ['Israel', 'Para los varones israelitas'],
            ['Sacerdotes', 'Dos codos y medio más alto, separado por una baranda baja'],
            ['Estrado', 'Entre ambos, el estrado donde cantaban los levitas']
          ],
          desc: [
            'Al cruzar la puerta de Nicanor se entraba al atrio interior. La primera franja, angosta, era el atrio de Israel: hasta aquí llegaban los varones israelitas para presentar sus sacrificios y adorar. Más allá de una baranda baja comenzaba el atrio de los sacerdotes, con el altar, el lavatorio y el santuario.',
            'Desde estas franjas el pueblo veía el altar y el humo de los sacrificios. Mientras un sacerdote ofrecía el incienso dentro del santuario, «toda la multitud del pueblo estaba fuera orando» (Lc 1:10).',
            'Cada atrio estaba más alto que el anterior y era más restringido: gentiles, mujeres, varones de Israel, sacerdotes y, al final, solo el sumo sacerdote. El edificio entero enseñaba que el acceso a Dios tenía límites.'
          ],
          think: 'El pueblo se detenía en una baranda que solo cruzaban los sacerdotes. Pedro escribe que todos los creyentes son «real sacerdocio» (1 P 2:9). ¿Qué significa para tu vida que hoy puedas acercarte a Dios sin intermediarios humanos?',
          view: { t: [140,  15,  0], p: [215,  138,  43] }, zona: 'israel', show: ['nombres', 'medidas']
        },
        {
          id: 'altar', num: 11, n: 'El altar del holocausto', short: 'El altar',
          ref: 'Éxodo 20:25-26; Levítico 6:12-13; Romanos 12:1',
          rows: [
            ['Medidas', 'Base de 32 × 32 codos (≈ 14,4 m), que se angostaba en gradas hasta 24 × 24 en lo alto (Middot 3:1)'],
            ['Altura', 'Unos 9 codos (≈ 4 m); Josefo da 15'],
            ['Rampa', 'Al sur, de 32 codos de largo y 16 de ancho (Middot 3:3)'],
            ['Material', 'Piedras sin labrar, que no había tocado el hierro (Middot 3:4)']
          ],
          desc: [
            'El altar estaba frente al santuario, al aire libre. Era una masa maciza de piedras enteras, como mandaba la ley: «si me hicieres altar de piedras, no las labres de cantería» (Éx 20:25). Se blanqueaba con cal dos veces al año. Los sacerdotes subían por una rampa y no por gradas, de acuerdo con Éxodo 20:26.',
            'La Mishná describe una línea roja a media altura que marcaba dónde se rociaba la sangre de unos sacrificios y de otros, y canales que llevaban la sangre hacia el valle del Cedrón. Las cifras de Josefo son mayores que las de la Mishná; el modelo sigue la Mishná.',
            'Sobre el altar ardía un fuego que no debía apagarse nunca: «el fuego arderá continuamente en el altar; no se apagará» (Lv 6:13). Cada mañana y cada tarde se ofrecía el holocausto continuo por todo el pueblo.'
          ],
          think: 'Dios mandó que el fuego del altar nunca se apagara. Pablo pide que nos presentemos como «sacrificio vivo» (Ro 12:1). ¿Qué alimenta el fuego del Espíritu en tu vida de cada día, y qué lo apaga?',
          view: { t: [111,  20,  10], p: [178,  75,  77] }, zona: 'altar', show: ['medidas', 'escala']
        },
        {
          id: 'lavatorio', num: 12, n: 'El lavatorio y el lugar del sacrificio', short: 'Lavatorio y matadero',
          ref: 'Éxodo 30:18-21; Hebreos 10:11-12',
          rows: [
            ['Lavatorio', 'Entre el pórtico y el altar, hacia el sur (Middot 3:6). La Mishná le atribuye doce caños'],
            ['Matadero', 'Al norte del altar (Lv 1:11): anillos en el piso para sujetar los animales, mesas de mármol y postes con ganchos'],
            ['Anillos', 'Veinticuatro, en hileras (Middot 3:5)'],
            ['Forma', 'Ninguna fuente describe el aspecto del lavatorio; el del modelo es una estimación']
          ],
          desc: [
            'Antes de entrar al santuario o de servir en el altar, los sacerdotes se lavaban las manos y los pies, como lo mandaba la ley desde el tabernáculo: «se lavarán con agua, para que no mueran» (Éx 30:20). La Mishná cuenta que un sumo sacerdote le agregó doce caños para que varios sacerdotes pudieran lavarse a la vez.',
            'Al norte del altar estaba el lugar donde se degollaban y preparaban los animales. La Mishná describe anillos fijos en el piso para sujetarlos, mesas para lavar la carne y postes con ganchos para colgarla. En las grandes fiestas, como la Pascua, el trabajo duraba todo el día.',
            'La carta a los Hebreos contrasta este servicio diario con la obra de Cristo: los sacerdotes ofrecían «muchas veces los mismos sacrificios, que nunca pueden quitar los pecados», pero Cristo, «habiendo ofrecido una vez para siempre un solo sacrificio por los pecados, se ha sentado a la diestra de Dios» (He 10:11-12).'
          ],
          think: 'Los sacerdotes se lavaban antes de servir. ¿Por qué Dios pone la limpieza antes que el servicio, y cómo se aplica eso a quien sirve hoy en la iglesia (1 Jn 1:9)?',
          view: { t: [100,  18,  -5], p: [152,  70,  -57] }, zona: 'lavatorio', show: ['nombres']
        },
        {
          id: 'santuario', num: 13, n: 'El santuario y su pórtico', short: 'El santuario',
          ref: 'Hageo 2:7-9; Lucas 21:5',
          rows: [
            ['Medidas', '100 × 100 codos y 100 de alto (Middot 4:6); el pórtico, de 100 de ancho, era más ancho que el cuerpo, de 70'],
            ['Entrada', 'Un vano de 40 codos de alto y 20 de ancho, sin puertas (Josefo, Guerra 5)'],
            ['Adorno', 'Una vid de oro sobre la entrada, con racimos del tamaño de un hombre según Josefo'],
            ['Fachada', 'Cubierta de placas de oro; desde lejos, el santuario parecía un monte cubierto de nieve (Josefo)']
          ],
          desc: [
            'Doce escalones subían del atrio de los sacerdotes al pórtico del santuario. Era el edificio más alto del monte, de unos 45 m, y se veía desde cualquier punto de Jerusalén. La Mishná lo compara con un león: ancho por delante y angosto por detrás.',
            'Josefo cuenta que la fachada estaba cubierta de placas de oro que al salir el sol encandilaban, y que donde no había oro la piedra era tan blanca que desde lejos parecía nieve. Sobre la entrada colgaba una vid de oro, a la que los fieles agregaban hojas y racimos como ofrenda. A eso se refieren los discípulos cuando hablan del templo «adornado de hermosas piedras y ofrendas votivas» (Lc 21:5).',
            'Cuando se puso el cimiento del segundo templo, los ancianos que habían visto el primero lloraron, porque era pobre en comparación (Esd 3:12). Dios respondió por medio de Hageo: «La gloria postrera de esta casa será mayor que la primera» (Hag 2:9). Esa gloria no vino del oro de Herodes: a esta casa entró el Señor mismo, como lo anunció Malaquías 3:1.'
          ],
          think: 'El templo de Herodes era mucho más hermoso que el de Zorobabel, pero la gloria mayor que anunció Hageo fue la presencia de Cristo en él. ¿Qué es lo que realmente hace gloriosa una casa de Dios?',
          view: { t: [25,  60,  0], p: [417,  169,  105] }, zona: 'santuario', show: ['nombres', 'medidas']
        },
        {
          id: 'santo', num: 14, n: 'El Lugar Santo', short: 'El Lugar Santo',
          ref: 'Lucas 1:8-13; Apocalipsis 8:3-4',
          rows: [
            ['Medidas', '40 codos de largo, 20 de ancho y 40 de alto (Middot 4:6-7)'],
            ['Mobiliario', 'El candelero de siete brazos, la mesa de los panes y el altar del incienso (Josefo, Guerra 5)'],
            ['Quién entraba', 'Los sacerdotes en servicio, elegidos por suertes para cada tarea'],
            ['Sobre él', 'Cámaras altas; el modelo las muestra como un volumen sin detalle']
          ],
          desc: [
            'El Lugar Santo tenía las mismas tres piezas del tabernáculo y del templo de Salomón: al sur el candelero, al norte la mesa de los panes de la proposición y, en el centro, frente al velo, el altar de oro del incienso. En el templo de Salomón había diez candeleros y diez mesas (2 Cr 4:7-8); en este, según Josefo, uno de cada uno.',
            'Cada día, por la mañana y por la tarde, un sacerdote entraba a quemar incienso. La suerte se echaba entre muchos, y un sacerdote podía hacerlo solo una vez en la vida. Así le tocó a Zacarías, y mientras ofrecía el incienso se le apareció el ángel Gabriel para anunciarle el nacimiento de Juan el Bautista (Lc 1:8-13).',
            'El candelero de este templo fue llevado a Roma en el año 70. Aparece tallado en el arco de Tito, que todavía está en pie en el foro romano.'
          ],
          think: 'El ángel apareció a Zacarías en la hora del incienso y le dijo: «tu oración ha sido oída» (Lc 1:13). Apocalipsis une el incienso con las oraciones de los santos (Ap 8:3-4). ¿Qué te enseña esto sobre la oración que parece no tener respuesta?',
          view: { t: [31,  24,  0], p: [57,  94,  0] }, zona: 'santo', roof: false, show: ['nombres']
        },
        {
          id: 'velo', num: 15, n: 'El velo', short: 'El velo',
          ref: 'Mateo 27:50-51; Hebreos 10:19-22',
          rows: [
            ['Qué separaba', 'El Lugar Santo del Lugar Santísimo'],
            ['Forma', 'Según la Mishná, dos cortinas separadas por un codo (Yoma 5:1)'],
            ['Material', 'Josefo describe un tapiz de azul, carmesí, lino y púrpura en la entrada del santuario (Guerra 5)'],
            ['Cuál se rasgó', 'Mateo no lo precisa; Hebreos llama «segundo velo» al del Lugar Santísimo (He 9:3)']
          ],
          desc: [
            'En el templo de Salomón, el Lugar Santísimo tenía paredes y puertas. En el segundo templo lo cerraba un velo. La Mishná dice que eran dos cortinas paralelas con un pasillo de un codo entre ellas, y que el sumo sacerdote entraba por un extremo y cruzaba hasta el otro. El modelo muestra las dos cortinas.',
            'En el momento en que Jesús murió, «el velo del templo se rasgó en dos, de arriba abajo» (Mt 27:51). Ocurrió a la hora novena, la hora de la oración de la tarde, cuando había sacerdotes sirviendo en el santuario. Que se rasgara de arriba abajo indica que no fue obra de manos humanas.',
            'La carta a los Hebreos explica el sentido: tenemos «libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo, por el camino nuevo y vivo que él nos abrió a través del velo, esto es, de su carne» (He 10:19-20).'
          ],
          think: 'El velo se rasgó de arriba abajo cuando Cristo murió. ¿Cómo cambia eso la confianza con la que te acercas a Dios en oración (He 4:16)?',
          view: { t: [10.5,  30,  0], p: [36,  84,  0] }, zona: 'velo', roof: false, show: ['nombres']
        },
        {
          id: 'santisimo', num: 16, n: 'El Lugar Santísimo vacío', short: 'El Lugar Santísimo',
          ref: 'Levítico 16:2, 12-15; Jeremías 3:16; 1 Corintios 6:19',
          rows: [
            ['Medidas', '20 × 20 codos y 40 de alto (Middot 4:7)'],
            ['Contenido', 'Nada. El arca se había perdido con la destrucción del primer templo'],
            ['En su lugar', 'Una roca que sobresalía tres dedos del piso, llamada «piedra de la fundación» (Mishná, Yoma 5:2)'],
            ['Quién entraba', 'Solo el sumo sacerdote, una vez al año, el Día de la Expiación']
          ],
          desc: [
            'El lugar más santo del templo estaba vacío. El arca del pacto desapareció cuando los babilonios destruyeron Jerusalén, y la Biblia no dice qué fue de ella. Jeremías había anunciado que llegaría un tiempo en que no se diría más «Arca del pacto de Jehová», ni se haría otra (Jer 3:16). Josefo confirma que en el santuario interior no había nada.',
            'El general romano Pompeyo entró aquí en el año 63 a.C., cuando tomó Jerusalén, y se sorprendió de no encontrar ninguna imagen. Para los judíos fue una profanación. El sumo sacerdote entraba una vez al año con incienso y sangre, y colocaba el incensario sobre la roca donde antes estuvo el arca.',
            'La Biblia no registra que la nube de gloria llenara este templo, como llenó el tabernáculo y el templo de Salomón (Éx 40:34; 2 Cr 7:1). La presencia de Dios llegó a él en la persona de Jesús. Después de Pentecostés, el Nuevo Testamento llama templo del Espíritu Santo al cuerpo del creyente (1 Co 6:19) y a la iglesia (Ef 2:21-22).'
          ],
          think: 'El lugar más santo del templo estaba vacío, y Dios derramó su Espíritu sobre personas en vez de llenar un edificio (Hch 2:1-4). ¿Qué significa para ti ser templo del Espíritu Santo (1 Co 6:19-20)?',
          view: { t: [0,  24,  0], p: [-14,  97,  -8] }, zona: 'santisimo', roof: false, show: ['nombres', 'medidas']
        },
        {
          id: 'antonia', num: 17, n: 'La fortaleza Antonia', short: 'La fortaleza Antonia',
          ref: 'Hechos 21:30-40; Hechos 22:1, 22-24',
          rows: [
            ['Ubicación', 'En la esquina noroeste del monte, pegada a los pórticos'],
            ['Nombre', 'Herodes la llamó así en honor de Marco Antonio, antes de que este cayera en desgracia'],
            ['Uso', 'Cuartel de la cohorte romana, que vigilaba el templo desde sus torres en las fiestas'],
            ['Acceso', 'Escaleras que bajaban directo a los pórticos (Josefo, Guerra 5)'],
            ['Forma', 'Cuatro torres en las esquinas; su tamaño exacto se discute']
          ],
          desc: [
            'Una fortaleza dominaba el templo por el norte. Desde sus torres los soldados romanos veían todo lo que pasaba en la explanada, y en las fiestas se repartían por los techos de los pórticos para impedir disturbios.',
            'Cuando la multitud arrastró a Pablo fuera del templo para matarlo, el tribuno de la cohorte bajó corriendo con soldados y lo rescató. Al llegar «a las gradas» de la fortaleza, los soldados tuvieron que llevarlo en peso por la violencia de la gente (Hch 21:35). Desde esas gradas, Pablo pidió hablar al pueblo y contó en hebreo cómo Jesús lo había encontrado en el camino a Damasco (Hch 22:1-21).',
            'Una tradición ubica en la Antonia el juicio de Jesús ante Pilato y el Enlosado o Gabata (Jn 19:13). Muchos historiadores piensan, en cambio, que Pilato juzgaba en el palacio de Herodes, en la parte alta de la ciudad. El modelo no toma partido y lo deja indicado.'
          ],
          think: 'Pablo usó las gradas de una fortaleza romana, rodeado por una multitud que quería matarlo, para contar su testimonio. ¿Cómo puede una situación difícil convertirse en una oportunidad para hablar de Cristo?',
          view: { t: [-170,  25,  -430], p: [-39,  148,  -202] }, zona: 'antonia', show: ['nombres', 'escala']
        }
      ]
    },
    {
      id: 'comparacion', grupo: 'Comparación', n: 'Templo de Salomón y templo de Herodes',
      info: 'Dos templos en el mismo lugar, a la misma escala. El templo de Salomón aparece superpuesto en rojo.',
      steps: [
        {
          id: 'cmp-general', num: null, n: 'Dos templos en el mismo monte', short: 'Vista general',
          ref: '1 Reyes 6:1, 37-38; Esdras 6:15; Juan 2:20',
          rows: [
            ['Primer templo', 'Salomón, hacia 966–959 a.C. Destruido por Nabucodonosor en 586 a.C. (2 R 25:8-9)'],
            ['Segundo templo', 'Zorobabel, terminado en 516 a.C. (Esd 6:15). Herodes lo rehízo y amplió desde hacia 20 a.C. Destruido por Roma en 70 d.C.'],
            ['Entre ambos', 'Unos 70 años sin templo, en el exilio en Babilonia'],
            ['Cómo se compara', 'Ambos modelos usan el mismo codo (≈ 45 cm) y se alinean en el Lugar Santísimo']
          ],
          desc: [
            'El templo de Herodes no reemplazó al de Salomón: entre ambos hubo casi cuatro siglos y medio y un tercer edificio, el de Zorobabel. Pero los tres se levantaron en el mismo lugar, y el de Herodes conservó la planta de los anteriores.',
            'El botón «Templo de Salomón» superpone, en rojo y a la misma escala, el templo que se muestra en el recurso del templo de Salomón. Los dos se alinean en el Lugar Santísimo, porque la tradición judía sostiene que ocupaba siempre el mismo punto. Lo que en el modelo de Salomón es estimado, como el tamaño del atrio, también lo es aquí.',
            'Del templo de Zorobabel la Biblia da muy pocas medidas (Esd 6:3), por eso no se modela. Esta ruta compara lo que el texto bíblico dice del primero con lo que la Mishná y Josefo dicen del último.'
          ],
          think: 'Dios mantuvo su casa en el mismo lugar a lo largo de siglos de reyes, exilios y reconstrucciones. ¿Qué te enseña eso sobre la fidelidad de Dios a sus promesas?',
          view: { t: [55,  30,  0], p: [274,  195,  184] }, show: ['salomon', 'nombres']
        },
        {
          id: 'cmp-monte', num: 1, n: 'El monte: de la era de Ornán a la gran explanada', short: 'El monte',
          ref: '2 Crónicas 3:1; Génesis 22:2; 1 Crónicas 21:18-26',
          rows: [
            ['Salomón', 'El monte Moriah, en la era de Ornán jebuseo, donde David levantó un altar (2 Cr 3:1)'],
            ['Herodes', 'Una explanada artificial de unos 480 × 300 m'],
            ['Entre ambos', 'La Mishná describe un monte de 500 × 500 codos (Middot 2:1); se discute si es el recinto anterior a Herodes'],
            ['Tamaño', 'Herodes duplicó aproximadamente la superficie del recinto']
          ],
          desc: [
            'Salomón construyó en el lugar que David compró a Ornán jebuseo, donde Jehová detuvo la plaga (1 Cr 21:18-26). Crónicas lo llama monte Moriah, el mismo nombre de la tierra donde Abraham fue a ofrecer a Isaac (Gn 22:2). La Biblia no da el tamaño del recinto de Salomón.',
            'El cuadrado de 500 codos que describe la Mishná no coincide con la explanada de Herodes. Algunos arqueólogos proponen que corresponde al recinto anterior, y creen ver restos de él en el muro oriental. Es una propuesta, no un dato seguro; el botón «Middot» muestra ese cuadrado.',
            'Herodes extendió la plataforma hacia el sur, el norte y el oeste, sobre rellenos y bóvedas. El santuario, en cambio, no se movió. Activa el botón «Templo de Salomón» y aléjate: el templo de Salomón cabe varias veces en el atrio de los gentiles.'
          ],
          think: 'El mismo monte une el sacrificio de Isaac, el altar de David y el templo. ¿Qué te enseña esa historia de un mismo lugar sobre el plan de Dios en la redención?',
          view: { t: [100,  0,  100], p: [772,  1344,  1264] }, show: ['salomon', 'middot', 'nombres']
        },
        {
          id: 'cmp-salas', num: 2, n: 'Las mismas salas interiores', short: 'Las salas interiores',
          ref: '1 Reyes 6:2, 16-20; 2 Crónicas 3:8',
          rows: [
            ['Lugar Santo', 'Salomón: 40 × 20 codos (1 R 6:17). Herodes: 40 × 20 (Middot 4:7)'],
            ['Lugar Santísimo', 'Salomón: 20 × 20 (1 R 6:20). Herodes: 20 × 20 (Middot 4:7)'],
            ['Diferencia', 'Ninguna en la planta: solo cambió la altura'],
            ['Tabernáculo', 'Ambas salas son el doble de las del tabernáculo en cada medida']
          ],
          desc: [
            'Este es el punto más importante de la comparación. Si se mira la planta, el Lugar Santo y el Lugar Santísimo de Herodes tienen exactamente las mismas medidas que los de Salomón. Herodes podía agrandar los atrios, la fachada y la plataforma, pero no las salas del santuario.',
            'La medida no venía de un arquitecto. David entregó a Salomón un plano que, según el texto, Jehová le había hecho entender por escrito (1 Cr 28:11-12, 19). A su vez, esas salas son el doble del tabernáculo, cuyo modelo Dios mostró a Moisés en el monte (Éx 25:9, 40).',
            'Por eso el modelo alinea los dos templos en el Lugar Santísimo: en planta, las dos líneas rojas coinciden con las paredes de Herodes.'
          ],
          think: 'Herodes cambió casi todo, pero no se atrevió a cambiar las medidas que Dios había dado. ¿Qué cosas del culto a Dios deben permanecer sin cambio, aunque cambien las formas?',
          view: { t: [20,  22,  0], p: [38,  157,  31] }, roof: false, show: ['salomon', 'medidas']
        },
        {
          id: 'cmp-altura', num: 3, n: 'La altura y la fachada', short: 'Altura y fachada',
          ref: '1 Reyes 6:2-3; 2 Crónicas 3:4',
          rows: [
            ['Salomón', 'La casa: 30 codos de alto (≈ 13,5 m); el Lugar Santísimo, 20 (1 R 6:2, 20)'],
            ['Herodes', 'El santuario: 100 codos de alto (≈ 45 m); Lugar Santo y Santísimo, 40 cada uno (Middot 4:6-7)'],
            ['Pórtico de Salomón', '20 de ancho y 10 de fondo (1 R 6:3). 2 Crónicas 3:4 le da 120 de alto, una cifra que muchos consideran un error de copia'],
            ['Pórtico de Herodes', '100 de ancho, más ancho que el cuerpo del edificio']
          ],
          desc: [
            'Donde Herodes sí impuso su sello fue en la altura. El santuario de Salomón medía 30 codos; el de Herodes, más del triple. La Mishná dice que sobre el Lugar Santo había cámaras altas, y que el pórtico se ensanchaba hasta 100 codos para formar una fachada imponente.',
            'Crónicas da al pórtico de Salomón 120 codos de alto (2 Cr 3:4). Reyes no da su altura, y esa cifra haría del pórtico una torre cuatro veces más alta que la casa. Varios manuscritos antiguos de la Septuaginta y de la versión siríaca dan 20 codos, por lo que muchos piensan que hubo un error al copiar el número. El modelo de Salomón usa 30, la altura de la casa.',
            'Con el botón «Templo de Salomón» activo, la casa entera de Salomón queda contenida en la mitad inferior del santuario de Herodes.'
          ],
          think: 'El templo más alto no fue el que tuvo la gloria visible de Dios. ¿Qué peligro hay en medir la obra de Dios por el tamaño o el esplendor (1 S 16:7)?',
          view: { t: [30,  60,  0], p: [303,  116,  158] }, show: ['salomon', 'medidas', 'escala']
        },
        {
          id: 'cmp-separacion', num: 4, n: 'Puertas o velo', short: 'Puertas o velo',
          ref: '1 Reyes 6:31-32; 2 Crónicas 3:14; Mateo 27:51',
          rows: [
            ['Salomón', 'Un tabique con puertas de olivo talladas y cubiertas de oro (1 R 6:31-32), y un velo (2 Cr 3:14)'],
            ['Herodes', 'Sin pared: dos velos separados por un codo (Mishná, Yoma 5:1)'],
            ['Por qué', 'Según la Mishná, había duda sobre si ese codo pertenecía a una sala o a la otra'],
            ['Diferencia', 'El Lugar Santo de Herodes empieza un codo más al oriente']
          ],
          desc: [
            'En el templo de Salomón, un tabique separaba las dos salas, y en él había puertas de madera de olivo talladas con querubines, palmeras y flores, todo cubierto de oro. Crónicas agrega un velo de azul, púrpura, carmesí y lino, con querubines bordados.',
            'En el templo de Herodes no había pared. La Mishná explica que los sabios no sabían si el codo que ocupaba el muro en el primer templo pertenecía al Lugar Santo o al Santísimo, y por eso pusieron dos velos con un codo de pasillo entre ambos.',
            'Fue ese velo el que se rasgó de arriba abajo cuando murió Jesús (Mt 27:51). En el templo de Salomón no habría bastado con rasgar una tela; en el de Herodes, lo único que separaba al hombre de la presencia de Dios era el velo.'
          ],
          think: 'En el último templo, solo una tela separaba el Lugar Santo del Santísimo, y Dios la rasgó. ¿Qué te dice esto sobre lo cerca que Dios quiere estar de quienes se acercan por medio de Cristo?',
          view: { t: [10.5,  30,  0], p: [36,  84,  0] }, roof: false, show: ['salomon', 'nombres']
        },
        {
          id: 'cmp-mobiliario', num: 5, n: 'Del arca al lugar vacío', short: 'El mobiliario',
          ref: '1 Reyes 6:23-28; 1 Reyes 7:48-50; 2 Crónicas 4:7-8',
          rows: [
            ['Lugar Santísimo', 'Salomón: el arca y dos querubines de olivo de 10 codos (1 R 6:23). Herodes: vacío'],
            ['Candeleros', 'Salomón: diez (1 R 7:49). Herodes: uno (Josefo)'],
            ['Mesas', 'Salomón: diez (2 Cr 4:8). Herodes: una (Josefo)'],
            ['Altar del incienso', 'Uno en ambos (1 R 7:48)']
          ],
          desc: [
            'El templo de Salomón tenía en el Lugar Santísimo el arca del pacto, bajo las alas de dos grandes querubines de madera de olivo cubiertos de oro que tocaban ambas paredes. En el Lugar Santo había diez candeleros y diez mesas, cinco a cada lado.',
            'Todo eso se perdió con la caída de Jerusalén: los babilonios se llevaron los utensilios de oro (2 R 25:13-15), y del arca no se vuelve a hablar. El segundo templo volvió al mobiliario del tabernáculo: un solo candelero, una sola mesa y el altar del incienso. El Lugar Santísimo quedó vacío.',
            'El modelo de Salomón muestra los querubines y el arca. Aquí se marcan solo como contorno, para que se vea el espacio que ocupaban en una sala que en tiempos de Jesús estaba vacía.'
          ],
          think: 'El arca, que representaba el trono de Dios, ya no estaba en el templo cuando Jesús llegó a él. ¿Dónde estaba la presencia de Dios en ese tiempo (Jn 1:14)?',
          view: { t: [10,  25,  0], p: [41,  110,  0] }, roof: false, show: ['salomon', 'nombres']
        },
        {
          id: 'cmp-atrio', num: 6, n: 'El atrio y el altar', short: 'Atrio y altar',
          ref: '2 Crónicas 4:1, 9; 1 Reyes 8:41-43',
          rows: [
            ['Altar de Salomón', 'Bronce, 20 × 20 codos y 10 de alto (2 Cr 4:1)'],
            ['Altar de Herodes', 'Piedra sin labrar, 32 × 32 en la base (Middot 3:1)'],
            ['Atrios de Salomón', 'Atrio de los sacerdotes y gran atrio (2 Cr 4:9)'],
            ['Atrios de Herodes', 'Gentiles, mujeres, Israel y sacerdotes, cada uno más alto que el anterior']
          ],
          desc: [
            'El altar de Salomón era de bronce; el de Herodes, de piedras enteras, como el de Éxodo 20:25. El de Herodes era más grande, pero está más lejos del santuario: el modelo los muestra a ambos para que se vea la diferencia.',
            'Salomón tenía dos atrios: el de los sacerdotes, junto a la casa, y el gran atrio, con puertas cubiertas de bronce. La Biblia no dice que hubiera un atrio separado para las mujeres ni una barrera para los extranjeros. En su oración de dedicación, Salomón pidió que Dios oyera al extranjero que viniera de lejos a orar en esa casa (1 R 8:41-43).',
            'El templo de Herodes multiplicó las divisiones: cada grupo tenía su atrio y su límite. Esas divisiones se fueron fijando durante el período del segundo templo; el Nuevo Testamento las da por sabidas (Hch 21:28).'
          ],
          think: 'Salomón oró por el extranjero que viniera a buscar a Dios; siglos después, una barrera le advertía que no pasara. ¿Cómo puede la religión alejar a las personas de lo que Dios quiso para ellas?',
          view: { t: [90,  20,  0], p: [266,  181,  147] }, show: ['salomon', 'nombres', 'medidas']
        },
        {
          id: 'cmp-perdido', num: 7, n: 'Lo que no volvió', short: 'Lo que no volvió',
          ref: '2 Reyes 25:13-17; Jeremías 52:17-23',
          rows: [
            ['Jaquín y Boaz', 'Las dos columnas de bronce del pórtico (1 R 7:21)'],
            ['El mar de bronce', 'El gran depósito de agua sobre doce bueyes (1 R 7:23-25)'],
            ['Las diez basas', 'Los carros de bronce con sus fuentes (1 R 7:27-39)'],
            ['Su destino', 'Los caldeos los quebraron y llevaron el bronce a Babilonia (2 R 25:13)']
          ],
          desc: [
            'Las piezas de bronce más famosas del templo de Salomón no volvieron nunca. Segundo de Reyes cuenta que los caldeos quebraron las columnas, las basas y el mar de bronce, y que el bronce era tanto que no se podía pesar (2 R 25:16). Jeremías lo había anunciado (Jer 27:19-22).',
            'En el templo de Herodes, el lugar del mar de bronce lo ocupaba un lavatorio, y el pórtico no tenía columnas exentas. En el modelo, Jaquín y Boaz, el mar y las basas aparecen solo en rojo, como parte del templo de Salomón.',
            'Los utensilios de oro sí volvieron en parte: Ciro los devolvió por medio de Sesbasar (Esd 1:7-11). Los de bronce, que se fundieron, no.'
          ],
          think: 'Lo que Israel creía permanente se perdió por la desobediencia del pueblo, como lo habían advertido los profetas (2 Cr 36:15-16). ¿Qué te enseña esto sobre oír a tiempo la voz de Dios?',
          view: { t: [72,  22,  10], p: [150,  64,  55] }, show: ['salomon', 'nombres']
        },
        {
          id: 'cmp-gloria', num: 8, n: 'La gloria', short: 'La gloria',
          ref: '2 Crónicas 7:1-3; Ezequiel 10:18-19; Hageo 2:7-9; Juan 1:14',
          rows: [
            ['Salomón', 'La nube llenó la casa y bajó fuego del cielo sobre el altar (2 Cr 5:13-14; 7:1)'],
            ['Antes del exilio', 'Ezequiel vio la gloria salir del templo hacia el oriente (Ez 10:18-19; 11:23)'],
            ['Segundo templo', 'La Biblia no registra que la nube lo llenara'],
            ['La promesa', '«La gloria postrera de esta casa será mayor que la primera» (Hag 2:9)']
          ],
          desc: [
            'El día de la dedicación del templo de Salomón, la nube de la gloria de Jehová llenó la casa, y los sacerdotes no podían quedarse a ministrar. Después de la oración de Salomón bajó fuego del cielo sobre el holocausto (2 Cr 7:1-3).',
            'Antes de la destrucción, Ezequiel vio en visión cómo la gloria de Dios se apartaba del templo y se detenía sobre el monte del oriente, el monte de los Olivos (Ez 11:23). No hay registro de que la nube volviera a llenar el segundo templo, ni en tiempos de Zorobabel ni en los de Herodes.',
            'Sin embargo, Hageo prometió que la gloria de esa casa sería mayor. Juan escribe que el Verbo se hizo carne y «habitó entre nosotros, y vimos su gloria» (Jn 1:14); la palabra que usa evoca el tabernáculo. La gloria mayor llegó al segundo templo en la persona de Jesús, y en Pentecostés se derramó sobre su iglesia (Hch 2:1-4).'
          ],
          think: 'El primer templo tuvo la nube; el segundo tuvo al Hijo de Dios caminando por sus atrios. ¿Por qué muchos que adoraban en ese templo no reconocieron la gloria que tenían delante (Lc 19:44)?',
          view: { t: [40,  50,  0], p: [382,  194,  197] }, show: ['salomon']
        },
        {
          id: 'cmp-final', num: 9, n: 'Dos destrucciones', short: 'Dos destrucciones',
          ref: '2 Reyes 25:8-9; Lucas 19:41-44; Mateo 24:1-2',
          rows: [
            ['Primer templo', 'Quemado por Nabuzaradán en 586 a.C., en el mes quinto (2 R 25:8-9; Jer 52:12-13)'],
            ['Segundo templo', 'Quemado por las tropas de Tito en el año 70 d.C.'],
            ['La fecha', 'Josefo afirma que el segundo ardió el mismo día del mes que el primero (Guerra 6); la tradición judía recuerda ambos el 9 de Av'],
            ['Anuncio', 'Jeremías anunció la primera (Jer 7:12-14); Jesús, la segunda (Lc 19:43-44)']
          ],
          desc: [
            'Los dos templos terminaron igual: tomados por un imperio extranjero y quemados. En ambos casos Dios lo había anunciado con años de anticipación, y en ambos casos el pueblo confiaba en que el edificio lo protegería. Jeremías reprendió a los que repetían «templo de Jehová» como si eso bastara (Jer 7:4).',
            'Jesús lloró sobre Jerusalén y anunció que sus enemigos no dejarían piedra sobre piedra, «por cuanto no conociste el tiempo de tu visitación» (Lc 19:44). Unos cuarenta años después, en el año 70, se cumplió.',
            'El Nuevo Testamento no termina con un edificio. En la nueva Jerusalén Juan no vio templo, «porque el Señor Dios Todopoderoso es el templo de ella, y el Cordero» (Ap 21:22). La ruta «Historia del segundo templo» trata también el templo que la profecía anuncia para los últimos tiempos.'
          ],
          think: 'Dos veces el pueblo perdió el templo por no oír a Dios a tiempo. ¿En qué cosas externas podemos confiar hoy en lugar de una relación viva con Él?',
          view: { t: [80,  20,  100], p: [581,  470,  697] }, show: ['salomon', 'nombres']
        }
      ]
    }
  ]
};
