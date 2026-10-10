/* ==========================================================
   Recursos Bíblicos — El imperio asirio · contenido de las rutas
   Motor: ../assets/js/ruta-estudio.js (formato descrito en su encabezado).
   Geografía: ../assets/js/imperios-geo.js. Citas textuales: Reina-Valera 1960.
   Las referencias del texto se vuelven burbujas con citas.js (texto en /biblia/).
   Diferencias entre la historia y el texto bíblico: bloque { posturas } con
   ambas versiones y cómo se entienden; nunca se presenta el texto bíblico como error.
   En temas doctrinales prevalece la línea pentecostal clásica (Asambleas de Dios).
   Contenido sensible: la violencia asiria se describe sin detalles crudos.
   ========================================================== */
(() => {
  const CRECIENTE = [[28.5, 31.5], [38.8, 50]];
  const NUCLEO = [[33, 38], [38.5, 47.5]];
  const LEVANTE = [[30.5, 33.5], [34.5, 37.5]];
  const ORIENTE = [[22, 26], [43, 56]];

  /* ---------------- Ruta 1 · Historia ---------------- */
  const historia = [
    {
      id: 'en-la-biblia', n: 'Asiria en la Biblia', ref: 'Génesis 10:11; Isaías 10:5; Jonás 3:3-10; Nahúm 3:1; Mateo 12:41', fecha: [-900, -612],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-ninive.webp', foco: '62% 50%', alt: 'Las murallas y puertas de Nínive junto al río Tigris, con el palacio real al fondo', pie: 'Nínive, la gran capital de Asiria.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: CRECIENTE, capas: ['asiria-670'], lugares: ['ninive', 'asur', 'samaria', 'jerusalen'] } }
      ],
      texto: [
        'Asiria fue la primera gran potencia que destruyó un reino del pueblo de Dios. En 722 a.C. conquistó Samaria y llevó cautivo al reino de Israel, las diez tribus del norte, y veinte años después sitió Jerusalén. Durante más de un siglo fue el gran poder del Oriente, y su sombra cubre buena parte de los libros de Reyes, Crónicas y los profetas.',
        'Su nombre aparece por primera vez en Génesis: desde la tierra de Sinar, Nimrod «salió para Asiria, y edificó Nínive» (Gn 10:11). Nínive llegó a ser la capital del imperio, la ciudad a la que Dios envió a Jonás. El libro de Jonás muestra un lado inesperado de esa historia: los ninivitas creyeron a Dios y se arrepintieron (Jon 3:5), y Dios tuvo misericordia de ellos.',
        'Los profetas presentan a Asiria con dos caras. Por un lado, era un instrumento en la mano de Dios para disciplinar a su pueblo: «Oh Asiria, vara y báculo de mi furor» (Is 10:5). Por otro, era un imperio orgulloso y cruel que sería juzgado. Nahúm le dedicó todo un libro y la llamó «ciudad sanguinaria» (Nah 3:1). En 612 a.C., Nínive cayó ante medos y babilonios, y Asiria desapareció de la historia.',
        'La Biblia no termina allí. Jesús recordó a los ninivitas como ejemplo de arrepentimiento (Mt 12:41), e Isaías anunció un día en que Dios llamará bendito al asirio junto a Egipto e Israel (Is 19:25).'
      ],
      pensar: 'Asiria fue la vara de Dios contra su pueblo, pero también recibió su misericordia en tiempos de Jonás. ¿Qué te enseña esto acerca del corazón de Dios hacia todas las naciones, aun las más crueles (Jon 4:11)?'
    },
    {
      id: 'origen', n: 'Origen: Asur junto al Tigris', ref: 'Génesis 10:8-12; Miqueas 5:6', fecha: [-2000, -900],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: NUCLEO, capas: ['asiria-1000'], lugares: ['asur', 'ninive', 'kalhu', 'arbela'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-asur.webp', alt: 'La antigua ciudad de Asur sobre un promontorio junto al río Tigris, con su zigurat y sus murallas', pie: 'Asur, la ciudad que dio nombre a Asiria.', origen: 'ia' }
      ],
      texto: [
        'Asiria nació en el norte de Mesopotamia, junto al río Tigris, en un triángulo de tierras fértiles con lluvias suficientes para cultivar sin depender solo del riego. Su primera capital fue Asur, una ciudad sobre un promontorio junto al río, que llevaba el nombre de su dios principal. A pocos kilómetros estaban las otras grandes ciudades que la Biblia menciona: Nínive y Cala (Gn 10:11). Miqueas llama a esta región «la tierra de Nimrod» (Mi 5:6).',
        'Mucho antes de ser un imperio, los asirios fueron comerciantes. Hacia 1900 a.C., en la época de los patriarcas, mercaderes de Asur llevaban estaño y telas en caravanas de burros hasta Anatolia, y miles de sus cartas y contratos se encontraron en la ciudad de Kanesh, en la actual Turquía. Siglos después, hacia 1100 a.C., el rey Tiglat-pileser I llevó por primera vez sus ejércitos hasta el Mediterráneo.',
        'Después vino un largo período de debilidad, mientras los pueblos arameos ocupaban Siria y el norte de Mesopotamia. Fue en ese tiempo cuando surgió el reino de Israel con David y Salomón, sin una gran potencia en el norte que lo amenazara.',
        'Hacia 900 a.C., los reyes asirios comenzaron a recuperar su territorio, año tras año, en campañas militares que repetían cada primavera. Así nació el imperio neoasirio, el que la Biblia conoce y el que esta ruta recorre.'
      ],
      pensar: 'Israel creció con David y Salomón en un tiempo en que no había una gran potencia en el norte. ¿Cómo ves la mano de Dios preparando los tiempos y las circunstancias para cumplir sus planes?'
    },
    {
      id: 'imperio', n: 'La formación del imperio', ref: '1 Reyes 22; 2 Reyes 15:19-20, 29; 16:7-9; 17:3-6', fecha: [-883, -667],
      visual: [{ tipo: 'mapa', titulo: 'Mapa', pasos: [
        { t: 'c. 900 a.C.: Asiria recupera su núcleo junto al Tigris.', fecha: -900,
          estado: { view: CRECIENTE, capas: ['asiria-1000'], lugares: ['asur', 'ninive', 'kalhu'] } },
        { t: '853 a.C.: Salmanasar III llega al Éufrates y combate en Qarqar contra una alianza que incluye a Acab de Israel.', fecha: -853,
          estado: { view: CRECIENTE, capas: ['asiria-850'], lugares: ['kalhu', 'qarqar', 'damasco', 'samaria'] } },
        { t: 'c. 730 a.C.: Tiglat-pileser III domina Babilonia, Siria y parte de Israel.', fecha: -730,
          estado: { view: CRECIENTE, capas: ['asiria-730'], lugares: ['kalhu', 'babilonia', 'damasco', 'samaria', 'jerusalen'] } },
        { t: '722 a.C.: cae Samaria, la capital del reino de Israel.', fecha: -722,
          estado: { view: CRECIENTE, capas: ['asiria-730'], lugares: ['ninive', 'samaria', 'gozan'], trazos: ['deportacion-722'] } },
        { t: 'c. 667 a.C.: con Asurbanipal, Asiria llega hasta Egipto.', fecha: -667,
          estado: { view: ORIENTE, capas: ['asiria-667'], lugares: ['ninive', 'jerusalen', 'menfis', 'tebas'] } }
      ] }],
      texto: [
        'El imperio se construyó en poco más de dos siglos. Asurnasirpal II (883–859 a.C.) trasladó la capital a Cala y llevó sus campañas hasta el Mediterráneo. Su hijo Salmanasar III enfrentó en 853 a.C., en Qarqar, junto al río Orontes, a una alianza de reyes de Siria y Palestina. Entre ellos estaba «Acab el israelita», que según las inscripciones asirias aportó dos mil carros, una de las fuerzas más grandes de la coalición. La batalla no fue decisiva, pero mostró el peligro que venía del norte.',
        'El gran organizador fue Tiglat-pileser III (745–727 a.C.), a quien la Biblia también llama Pul (2 R 15:19; 1 Cr 5:26). Convirtió los reinos vencidos en provincias gobernadas por funcionarios asirios y generalizó las deportaciones masivas. El rey Manahem de Israel le pagó mil talentos de plata (2 R 15:19-20); Acaz de Judá le pidió ayuda y se declaró «tu siervo y tu hijo» (2 R 16:7); y Tiglat-pileser tomó Damasco y el norte de Israel, llevando cautivos a sus habitantes (2 R 15:29).',
        'Sus sucesores completaron la obra. Salmanasar V sitió Samaria, y la ciudad cayó en 722 a.C., al comienzo del reinado de Sargón II, que dice haber deportado a 27.290 personas (2 R 17:3-6). Senaquerib atacó Judá en 701, Esar-hadón conquistó el Delta de Egipto en 671, y Asurbanipal llegó hasta Tebas, en el Alto Egipto, en 663 a.C. En ese momento, Asiria dominaba desde el golfo Pérsico hasta el Nilo.',
        'Usa los botones bajo el mapa para seguir el crecimiento del imperio paso a paso.'
      ],
      pensar: 'Acaz se declaró «siervo» del rey de Asiria para salvarse de sus enemigos (2 R 16:7), y su reino terminó sometido a Asiria. ¿Qué precio se paga cuando buscamos la protección de los poderosos en lugar de la de Dios?'
    },
    {
      id: 'reyes', n: 'Los reyes y la Biblia', ref: '2 Reyes 15–19; Isaías 20:1; Esdras 4:2, 10; 2 Crónicas 33:11', fecha: [-883, -627],
      visual: [
        { tipo: 'tabla', titulo: 'Reyes', tabla: {
          titulo: 'Los reyes asirios y la Biblia', cab: ['Rey', 'Reinado', 'En la Biblia'],
          filas: [
            ['Salmanasar III', '858–824 a.C.', 'No se nombra; combate a Acab y recibe tributo de Jehú'],
            ['Tiglat-pileser III (Pul)', '745–727 a.C.', '2 R 15:19, 29; 16:7-10; 1 Cr 5:26'],
            ['Salmanasar V', '727–722 a.C.', 'Sitia Samaria (2 R 17:3-5; 18:9)'],
            ['Sargón II', '722–705 a.C.', 'Is 20:1, su única mención'],
            ['Senaquerib', '705–681 a.C.', '2 R 18–19; 2 Cr 32; Is 36–37'],
            ['Esar-hadón', '681–669 a.C.', '2 R 19:37; Esd 4:2'],
            ['Asurbanipal (Asnapar)', '669–631 a.C.', 'Probablemente Esd 4:10; quizá 2 Cr 33:11']
          ],
          nota: 'Pul es el nombre con que Tiglat-pileser III gobernó Babilonia, según las listas babilónicas de reyes; 1 Crónicas 5:26 usa los dos nombres. La identificación de Asnapar con Asurbanipal es la más aceptada.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-rey-tributo.webp', alt: 'Un rey asirio con barba rizada y tiara cónica, sentado en su trono, recibe tributo de reyes vasallos arrodillados', pie: 'Un rey asirio recibe el tributo de los pueblos vencidos.', origen: 'ia' }
      ],
      texto: [
        'Ningún otro imperio aparece en la Biblia con tantos reyes por nombre. Algunos, como Tiglat-pileser III y Senaquerib, ocupan capítulos enteros; otros aparecen en una sola línea.',
        'Durante mucho tiempo, Sargón II fue un misterio. La Biblia lo nombra una sola vez: «En el año que vino el Tartán a Asdod, cuando lo envió Sargón rey de Asiria» (Is 20:1). Fuera de ese versículo, no se conocía ningún rey con ese nombre, y algunos críticos pensaban que Isaías se había equivocado. En 1843, el francés Paul-Émile Botta descubrió en Jorsabad el enorme palacio de Sargón, con sus inscripciones y relieves. Hoy es uno de los reyes asirios mejor conocidos.',
        'Senaquerib es el rey asirio que más espacio ocupa en la Biblia, por su campaña contra Judá en 701 a.C. Su muerte también está registrada: mientras adoraba a su dios, dos de sus hijos «lo hirieron a espada… Y reinó en su lugar Esarhadón su hijo» (2 R 19:37). Una crónica babilónica confirma que fue asesinado por un hijo en 681 a.C.',
        'Los últimos reyes aparecen de manera indirecta. Esar-hadón trasladó pueblos a Samaria, y sus descendientes todavía lo recordaban en tiempos de Zorobabel (Esd 4:2). Asurbanipal, el último gran rey, es probablemente «el grande y glorioso Asnapar» de Esdras 4:10. Durante su reinado, los generales asirios llevaron preso al rey Manasés de Judá (2 Cr 33:11).'
      ],
      pensar: 'Durante siglos, Sargón solo se conocía por un versículo de Isaías, hasta que la arqueología lo encontró. ¿Qué te enseña esto acerca de la confianza que merece la Palabra de Dios incluso en sus detalles?'
    },
    {
      id: 'senaquerib', n: 'Senaquerib contra Judá', ref: '2 Reyes 18:13–19:37; Isaías 36–37; 2 Crónicas 32', fecha: -701,
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[29.5, 33], [37.8, 44.5]], capas: ['asiria-730'], lugares: ['ninive', 'tiro', 'laquis', 'jerusalen', 'ecron'], trazos: ['senaquerib-701'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-sitio-laquis.webp', alt: 'El ejército asirio sitia la ciudad amurallada de Laquis con una rampa de tierra y arietes', pie: 'El sitio de Laquis, 701 a.C.', origen: 'ia' }
      ],
      texto: [
        'Cuando murió Sargón, en 705 a.C., varios reinos dejaron de pagar tributo a Asiria, entre ellos Judá, gobernada por Ezequías. Senaquerib respondió en 701 a.C. con una gran campaña hacia el oeste: sometió las ciudades de Fenicia y luego bajó por la costa. «Subió Senaquerib rey de Asiria contra todas las ciudades fortificadas de Judá, y las tomó» (2 R 18:13). La más importante fue Laquis, que resistió un sitio terrible.',
        'Ezequías intentó negociar y pagó un enorme tributo: «trescientos talentos de plata, y treinta talentos de oro» (2 R 18:14). Aun así, Senaquerib envió desde Laquis a sus generales para exigir la rendición de Jerusalén. El Rabsaces habló al pueblo desde fuera del muro y se burló de su confianza en Dios: «¿Acaso alguno de los dioses de las naciones ha librado su tierra de la mano del rey de Asiria?» (2 R 18:33).',
        'Ezequías llevó la carta del rey asirio al templo y oró: «sálvanos, te ruego, de su mano, para que sepan todos los reinos de la tierra que sólo tú, Jehová, eres Dios» (2 R 19:19). Por medio de Isaías, Dios respondió que el rey de Asiria no entraría en la ciudad. Esa noche, «salió el ángel de Jehová, y mató en el campamento de los asirios a ciento ochenta y cinco mil» (2 R 19:35), y Senaquerib volvió a Nínive.',
        { posturas: {
          titulo: '¿Qué dice Senaquerib de esta campaña?',
          a: { n: 'El relato asirio', t: 'En su prisma, Senaquerib dice que tomó cuarenta y seis ciudades de Judá, que encerró a Ezequías en Jerusalén «como a un pájaro en su jaula» y que recibió treinta talentos de oro y ochocientos de plata. No dice que haya tomado Jerusalén.' },
          b: { n: 'El relato bíblico', t: 'La Biblia coincide en la toma de las ciudades, en el sitio de Laquis y en los treinta talentos de oro (2 R 18:13-14), y agrega la oración de Ezequías y la intervención del ángel (2 R 19:35).' },
          c: 'Los reyes asirios nunca registraban sus derrotas: sus inscripciones eran propaganda. Que Senaquerib, después de tomar cuarenta y seis ciudades, no haya conquistado la capital y se haya retirado coincide con el relato bíblico de una intervención de Dios. La diferencia en la plata puede deberse a que se usaron talentos de distinto peso o a que el rey asirio incluyó otros bienes.'
        } }
      ],
      pensar: 'Ante la amenaza más grande de su reinado, Ezequías extendió la carta delante de Jehová y oró (2 R 19:14-19). ¿Qué «cartas» o amenazas necesitas extender hoy delante de Dios en oración?'
    },
    {
      id: 'caida', n: 'La caída de Nínive', ref: 'Nahúm 1–3; Sofonías 2:13-15; Isaías 10:12-19', fecha: [-627, -605],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-caida-ninive.webp', alt: 'Nínive en llamas de noche, con las aguas del río desbordadas junto a las murallas y soldados medos y babilonios entrando', pie: 'La caída de Nínive, 612 a.C.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '626 a.C.: Babilonia se independiza de Asiria con Nabopolasar.', fecha: -626,
            estado: { view: CRECIENTE, capas: ['asiria-670', 'babilonia-620'], lugares: ['ninive', 'babilonia'] } },
          { t: '614 y 612 a.C.: medos y babilonios toman Asur y Nínive.', fecha: [-614, -612],
            estado: { view: CRECIENTE, capas: ['babilonia-620'], lugares: ['asur', 'ninive', 'babilonia'] } },
          { t: '610–605 a.C.: el último rey asirio huye a Harán; Asiria desaparece en Carquemis.', fecha: [-610, -605],
            estado: { view: CRECIENTE, capas: ['babilonia-620'], lugares: ['haran', 'carquemis', 'babilonia'], trazos: ['campana-605'] } }
        ] }
      ],
      texto: [
        'Asiria parecía invencible a la muerte de Asurbanipal, hacia 631 a.C., pero en menos de veinte años desapareció. Babilonia se independizó en 626 a.C., y los medos, desde las montañas de Irán, se unieron a los babilonios contra su antiguo amo. En 614 cayó Asur, y en 612 a.C. cayó Nínive.',
        'Nahúm había anunciado esa caída con imágenes vivas: «¡Ay de ti, ciudad sanguinaria, toda llena de mentira y de rapiña» (Nah 3:1). Describió las puertas de los ríos que se abren y el palacio que se derrumba (Nah 2:6), y la comparó con Tebas, la gran ciudad egipcia que los propios asirios habían destruido: «¿Eres tú mejor que Tebas, que estaba asentada junto al Nilo…?» (Nah 3:8). Sofonías anunció que Dios convertiría a Nínive «en asolamiento y en sequedal como un desierto», la ciudad que decía en su corazón: «Yo, y no más» (Sof 2:13, 15).',
        'Los últimos asirios se refugiaron en Harán, de donde fueron expulsados en 610 a.C., y su intento de recuperarla con ayuda de Egipto fracasó. En 605 a.C., en Carquemis, Babilonia venció a Egipto, y Asiria desapareció para siempre. Nínive quedó en ruinas, cubiertas de tierra, hasta que los arqueólogos la redescubrieron en el siglo XIX.',
        'Isaías ya lo había dicho: después de usar a Asiria como vara contra su pueblo, Dios castigaría «el fruto de la soberbia del corazón del rey de Asiria» (Is 10:12). El recurso del imperio babilónico continúa esta historia.'
      ],
      pensar: 'Nínive decía en su corazón: «Yo, y no más» (Sof 2:15), y cayó. ¿Qué advertencia contiene esta historia para el orgullo personal, y qué promesa ofrece Nahúm a los que confían en Dios (Nah 1:7)?'
    }
  ];

  /* ---------------- Ruta 2 · Sociedad y religión ---------------- */
  const sociedad = [
    {
      id: 'capitales', n: 'Nínive y las capitales', ref: 'Génesis 10:11-12; Jonás 1:2; 3:3; 4:11; Nahúm 2–3',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-toros-alados.webp', alt: 'La entrada de un palacio asirio custodiada por dos enormes toros alados con cabeza humana tallados en piedra', pie: 'Toros alados en la puerta de un palacio asirio.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[35, 42.2], [37, 44.6]], capas: ['asiria-1000'], lugares: ['asur', 'kalhu', 'ninive', 'dur-sharrukin', 'arbela'] } }
      ],
      texto: [
        'Asiria tuvo cuatro capitales a lo largo de su historia, todas junto al Tigris o muy cerca de él. Asur fue la ciudad antigua y religiosa. Asurnasirpal II construyó una nueva capital en Cala, la Kalhu de las inscripciones (Gn 10:11). Sargón II levantó desde cero una ciudad con su nombre, Dur-Sharrukin, «la fortaleza de Sargón», que fue abandonada al morir él. Senaquerib trasladó finalmente la corte a Nínive, que se convirtió en la ciudad más grande del mundo de su tiempo.',
        'Senaquerib llamó a su residencia en Nínive «el palacio sin rival». Tenía decenas de salas decoradas con relieves que mostraban sus campañas, y sus puertas estaban custodiadas por enormes toros alados con cabeza humana, de varias toneladas de piedra. El rey rodeó la ciudad con una muralla de unos doce kilómetros, plantó grandes jardines y huertos, y para regarlos construyó canales y un acueducto que traía agua de las montañas.',
        'La Biblia llama a Nínive «aquella gran ciudad» (Jon 1:2) y dice que era «ciudad grande en extremo, de tres días de camino» (Jon 3:3). La expresión puede referirse al tiempo necesario para recorrer la ciudad y sus alrededores, una región que incluía varias poblaciones, o al tiempo que tomaba visitar sus barrios y predicar en ellos. Al final del libro, Dios habla de las «más de ciento veinte mil personas que no saben discernir entre su mano derecha y su mano izquierda, y muchos animales» (Jon 4:11): una ciudad enorme, vista con compasión por su Creador.'
      ],
      pensar: 'Dios veía a Nínive no solo como una capital poderosa, sino como una ciudad llena de personas y aun de animales por los que tenía compasión (Jon 4:11). ¿Cómo cambiaría tu manera de mirar tu ciudad si la vieras con los ojos de Dios?'
    },
    {
      id: 'guerra', n: 'Un imperio de guerra', ref: 'Isaías 10:5-15; 37:18-19; Nahúm 3:1-3; 2 Reyes 19:28',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-asedio.webp', alt: 'Soldados asirios con cascos cónicos y escudos altos avanzan junto a una torre de asedio con ariete hacia la muralla de una ciudad', pie: 'El ejército asirio y sus máquinas de asedio.', origen: 'ia' }
      ],
      texto: [
        'Asiria fue el primer imperio con un ejército permanente y profesional. Tenía infantería con lanzas y arcos, caballería, carros de guerra e ingenieros que construían rampas de tierra y torres de asedio con arietes para derribar murallas. En Laquis, los arqueólogos encontraron la rampa de piedras que levantaron los asirios en 701 a.C. y la contrarrampa que construyeron los defensores.',
        'El imperio usaba el terror como arma. Sus inscripciones y relieves describen castigos durísimos para las ciudades rebeldes, para que nadie se atreviera a resistir. El mensaje era claro: rendirse y pagar tributo, o ser destruido. Por eso los profetas describen a Asiria como una fuerza temible: Isaías dice que su pensamiento era «desarraigar y cortar naciones no pocas» (Is 10:7), y Nahúm la llama «ciudad sanguinaria» (Nah 3:1). Ezequías lo reconoció en su oración: «los reyes de Asiria destruyeron todas las tierras y sus comarcas» (Is 37:18).',
        'Pero la Biblia muestra que ese poder tenía un límite. Dios llamó a Asiria «vara y báculo de mi furor» (Is 10:5): una herramienta en su mano. Y cuando el rey asirio se jactó de que todo lo había hecho con su propia fuerza, Dios respondió con una pregunta: «¿Se gloriará el hacha contra el que con ella corta?» (Is 10:15). Los asirios ponían garfios en la nariz de sus prisioneros para llevarlos cautivos; Dios usó esa misma imagen contra Senaquerib: «yo pondré mi garfio en tu nariz, y mi freno en tus labios, y te haré volver por el camino por donde viniste» (2 R 19:28).'
      ],
      pensar: '«¿Se gloriará el hacha contra el que con ella corta?» (Is 10:15). ¿Qué enseña esta imagen acerca de los poderes que parecen dominar el mundo, y acerca de nuestra propia tentación de atribuirnos lo que Dios hace?'
    },
    {
      id: 'gobierno', n: 'Deportaciones y gobierno', ref: '2 Reyes 17:6, 24-41; 18:17, 26; 1 Crónicas 5:26; Esdras 4:2, 10',
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: CRECIENTE, capas: ['asiria-730'], lugares: ['samaria', 'gozan', 'ninive', 'babilonia', 'hamat'], trazos: ['deportacion-722'] } },
        { tipo: 'tabla', titulo: 'Cargos', tabla: {
          titulo: 'Los títulos asirios de 2 Reyes 18:17', cab: ['Título bíblico', 'Título asirio', 'Qué significaba'],
          filas: [
            ['Tartán', 'Turtanu', 'Comandante en jefe del ejército, segundo después del rey'],
            ['Rabsaris', 'Rab ša-rēši', 'Jefe de los funcionarios de la corte'],
            ['Rabsaces', 'Rab šāqê', 'Jefe de los coperos, alto funcionario y portavoz']
          ],
          nota: 'La Reina-Valera los escribe como nombres propios, pero son títulos de cargos que coinciden con los de los documentos asirios.' } }
      ],
      texto: [
        'Asiria inventó una forma de gobernar que imitaron los imperios posteriores. Los reinos vencidos pasaban primero a ser vasallos, que pagaban tributo cada año; si se rebelaban, se convertían en provincias gobernadas por un funcionario asirio. Una red de caminos y de mensajeros a caballo permitía que las órdenes y los informes viajaran rápidamente entre las provincias y la capital.',
        'La herramienta más dura era la deportación. Los asirios trasladaban a pueblos enteros de un extremo a otro del imperio, y llevaban a otros a ocupar su lugar. Así ocurrió con Israel: «el rey de Asiria tomó Samaria, y llevó a Israel cautivo a Asiria, y los puso en Halah, en Habor junto al río Gozán, y en las ciudades de los medos» (2 R 17:6), y a Samaria trajo «gente de Babilonia, de Cuta, de Ava, de Hamat y de Sefarvaim» (2 R 17:24). Los nuevos habitantes mezclaron el culto a Jehová con sus propios dioses (2 R 17:33). De esa mezcla nacieron los samaritanos, que siglos después seguían separados de los judíos (Jn 4:9).',
        'En la corte asiria había cargos que la Biblia registra con precisión. Senaquerib envió contra Jerusalén «al Tartán, al Rabsaris y al Rabsaces» (2 R 18:17), que no son nombres de personas sino títulos. Y cuando el Rabsaces habló al pueblo, los ministros de Ezequías le pidieron: «hables a tus siervos en arameo, porque nosotros lo entendemos» (2 R 18:26). El arameo ya era la lengua de la diplomacia internacional, que solo entendían los funcionarios; el pueblo hablaba hebreo.'
      ],
      pensar: 'Los samaritanos nacieron de una deportación asiria, y siglos después Jesús se detuvo a hablar con una mujer samaritana (Jn 4:9). ¿Qué te enseña esto acerca de cómo Dios puede alcanzar a quienes la historia dejó al margen?'
    },
    {
      id: 'religion', n: 'La religión de Asiria', ref: '2 Reyes 18:33-35; 19:12-19, 37; Isaías 37:19; Jonás 3:5-9',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-templo.webp', alt: 'Un sacerdote asirio ante un relieve de un genio alado con cabeza de águila en un templo iluminado por antorchas', pie: 'Un templo asirio con relieves de genios alados.', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Sólo tú eres Dios de todos los reinos de la tierra; tú hiciste el cielo y la tierra.', ref: '2 Reyes 19:15' }
      ],
      texto: [
        'El dios principal de Asiria era Asur, que daba nombre a la ciudad y al país. Los asirios creían que el rey gobernaba en su nombre y que cada guerra se hacía por orden de Asur: las victorias demostraban que su dios era más fuerte que los dioses de los pueblos vencidos. También adoraban a Istar de Nínive, diosa del amor y de la guerra, a Nabu, dios de la escritura, y a muchos otros. La Biblia menciona a Nisroc, el dios en cuyo templo fue asesinado Senaquerib (2 R 19:37), cuya identidad exacta no se conoce.',
        'Esa idea explica la burla del Rabsaces ante Jerusalén: si ningún dios de las naciones había librado a su pueblo del rey de Asiria, tampoco lo haría Jehová (2 R 18:33-35). Para los asirios, el Dios de Israel era uno más. Ezequías respondió en su oración con la verdad que Asiria no entendía: los dioses de las naciones «no eran dioses, sino obra de manos de hombre, madera y piedra» (Is 37:19), y Jehová «sólo tú eres Dios de todos los reinos de la tierra» (2 R 19:15).',
        'Los asirios buscaban conocer la voluntad de los dioses mediante presagios: observaban los astros, los eclipses, el vuelo de las aves y las entrañas de los animales sacrificados, y anotaban todo en grandes colecciones de tablillas. Un eclipse de sol o una plaga se interpretaba como señal de peligro, y se respondía con ritos, ayunos y vestidos de luto.',
        'Ese trasfondo ayuda a imaginar el arrepentimiento de Nínive en Jonás 3: el rey se levantó de su trono, se cubrió de cilicio y ordenó un ayuno general, incluso para los animales (Jon 3:5-9). Pero el texto no dice que se volvieran a un presagio, sino que «creyeron a Dios» (Jon 3:5).'
      ],
      pensar: 'Los asirios pensaban que sus victorias probaban la fuerza de su dios, pero Ezequías oró al Dios que hizo el cielo y la tierra (2 R 19:15). ¿Cómo responde tu fe cuando las circunstancias parecen decir que Dios no es poderoso?'
    },
    {
      id: 'legado', n: 'El legado de Asiria', ref: '2 Reyes 18:26; Esdras 4:7; Génesis 6–9',
      visual: [
        { tipo: 'tabla', titulo: 'Legado', tabla: {
          titulo: 'Lo que dejó Asiria', cab: ['Legado', 'Qué era', 'Dónde lo vemos'],
          filas: [
            ['La biblioteca de Asurbanipal', 'Decenas de miles de tablillas reunidas en Nínive', 'La mayor fuente de textos de Mesopotamia'],
            ['Gobierno por provincias', 'Provincias con gobernadores, tributo y caminos', 'Lo copiaron Babilonia, Persia y Roma'],
            ['Correo de relevos', 'Mensajeros a caballo con estaciones en los caminos', 'Antecedente del correo persa (Est 8:10)'],
            ['El arameo como lengua del imperio', 'Lengua común de la administración y la diplomacia', '2 R 18:26; Esd 4:7; la lengua de Jesús'],
            ['Ingeniería del agua', 'Canales y el acueducto de Jerwan, hacia 690 a.C.', 'Uno de los acueductos más antiguos que se conocen'],
            ['El arte en relieve', 'Relieves de piedra con escenas de guerra, caza y corte', 'Hoy en el Museo Británico y el Louvre']
          ] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-biblioteca.webp', alt: 'Escribas asirios ordenan tablillas de arcilla en los estantes de la biblioteca real de Nínive', pie: 'La biblioteca de Asurbanipal en Nínive.', origen: 'ia' }
      ],
      texto: [
        'Asiria es recordada sobre todo por su crueldad, pero también dejó herencias que marcaron la historia.',
        { h: 'La biblioteca de Nínive' },
        'Asurbanipal, el último gran rey, mandó reunir en su palacio de Nínive copias de todos los textos importantes de Mesopotamia: oraciones, presagios, diccionarios, tratados de medicina y astronomía, leyes y relatos antiguos. Cuando Nínive fue incendiada en 612 a.C., el fuego coció las tablillas de arcilla y las conservó. Hoy se guardan más de treinta mil fragmentos en el Museo Británico, y son la mayor fuente que tenemos para conocer el mundo de Mesopotamia.',
        { posturas: {
          titulo: 'El relato del diluvio de Nínive y el de Génesis',
          a: { n: 'Lo que se encontró', t: 'En 1872, George Smith descubrió entre las tablillas de Nínive un relato babilonio del diluvio, parte de la Epopeya de Gilgamesh, con un héroe que construye un barco, salva a su familia y a los animales, y suelta aves para ver si las aguas han bajado.' },
          b: { n: 'Lo que muestra el texto bíblico', t: 'El relato de Génesis comparte esos rasgos, pero presenta a un solo Dios, justo y misericordioso, que juzga el pecado, salva a Noé por gracia y hace un pacto con la humanidad (Gn 6:5-8; 9:8-17).' },
          c: 'Algunos estudiosos piensan que Génesis tomó el relato de Mesopotamia. Pero que distintos pueblos conserven la memoria de un gran diluvio apunta también a un hecho real recordado de distintas maneras. La diferencia decisiva es teológica: frente a dioses caprichosos, Génesis revela al Dios verdadero y su propósito.'
        } },
        { h: 'Gobierno, caminos y lengua' },
        'Asiria creó el primer sistema de provincias con gobernadores, impuestos fijos, caminos y mensajeros a caballo, el modelo que siguieron Babilonia, Persia y Roma. Bajo su dominio, el arameo se convirtió en la lengua común de la administración; por eso los ministros de Ezequías podían hablar con el Rabsaces en arameo (2 R 18:26), la misma lengua que siglos después hablaría Jesús. Senaquerib llevó agua a Nínive con canales y un acueducto de piedra en Jerwan, uno de los más antiguos que se conocen.'
      ],
      pensar: 'El fuego que destruyó Nínive conservó su biblioteca para nosotros. ¿Cómo has visto a Dios sacar algo bueno incluso de situaciones de destrucción o pérdida (Gn 50:20)?'
    }
  ];

  /* ---------------- Ruta 3 · Asiria y la Biblia ---------------- */
  const biblia = [
    {
      id: 'jonas', n: 'Jonás y Nínive', ref: 'Jonás 1–4; 2 Reyes 14:25; Mateo 12:39-41; Lucas 11:30', fecha: [-790, -750],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-jonas.webp', alt: 'El profeta Jonás predica en una calle de Nínive mientras la gente, vestida de cilicio, se arrodilla y llora', pie: 'Jonás predica en Nínive (Jon 3:4-5).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: CRECIENTE, capas: ['asiria-850'], lugares: ['gat-hefer', 'jope', 'ninive'], trazos: ['jonas'] } }
      ],
      texto: [
        'Jonás era un profeta de Israel en tiempos del rey Jeroboam II, hacia 780 a.C. (2 R 14:25). Dios lo envió a Nínive, la capital del enemigo más temido: «Levántate y ve a Nínive, aquella gran ciudad, y pregona contra ella» (Jon 1:2). Jonás huyó en dirección contraria, hacia Tarsis, embarcándose en Jope. Después de la tormenta y del gran pez, Dios le habló por segunda vez, y Jonás fue.',
        'Su mensaje fue breve: «De aquí a cuarenta días Nínive será destruida» (Jon 3:4). Y ocurrió lo inesperado: «los hombres de Nínive creyeron a Dios, y proclamaron ayuno, y se vistieron de cilicio desde el mayor hasta el menor de ellos» (Jon 3:5), y Dios no envió el castigo. Jonás se enojó, porque sabía que Dios es «clemente y piadoso, tardo en enojarte, y de grande misericordia» (Jon 4:2), y no quería que esa misericordia alcanzara a los enemigos de Israel. El libro termina con una pregunta de Dios que queda abierta para el lector (Jon 4:11).',
        'En esos años, Asiria atravesaba un período de debilidad, con rebeliones internas, epidemias y un eclipse total de sol en 763 a.C., que los asirios interpretaban como un mal presagio. Algunos estudiosos piensan que ese ambiente ayuda a entender por qué la ciudad respondió con tanta rapidez al mensaje.',
        { posturas: {
          titulo: '¿Es Jonás una historia real?',
          a: { n: 'La postura crítica', t: 'Muchos estudiosos leen Jonás como una parábola o un relato con enseñanza, sin base histórica, por el gran pez y por la conversión de toda una ciudad.' },
          b: { n: 'La postura de este estudio', t: 'Jonás fue un profeta histórico (2 R 14:25), y Jesús habló de él como de un hecho real: «Los hombres de Nínive se levantarán en el juicio con esta generación… porque ellos se arrepintieron a la predicación de Jonás» (Mt 12:41).' },
          c: 'Jesús compara la experiencia de Jonás con su propia muerte y resurrección (Mt 12:40) y pone a los ninivitas junto a personas reales del juicio final. Este estudio lee Jonás como historia, tal como lo leyó Jesús.'
        } }
      ],
      pensar: 'Jonás conocía la misericordia de Dios, pero no quería que alcanzara a sus enemigos (Jon 4:2). ¿Hay personas a las que te cuesta desear que Dios alcance con su gracia?'
    },
    {
      id: 'profetas', n: 'Los profetas del siglo VIII', ref: 'Oseas 7:11; 11:5; Amós 6:1-7; Isaías 7–10; Miqueas 1:6', fecha: [-760, -700],
      visual: [
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Oh Asiria, vara y báculo de mi furor, en su mano he puesto mi ira.', ref: 'Isaías 10:5' },
        { tipo: 'tabla', titulo: 'Profetas', tabla: {
          titulo: 'Los profetas que vieron venir a Asiria', cab: ['Profeta', 'A quién habló', 'Mensaje sobre Asiria'],
          filas: [
            ['Amós', 'Israel, c. 760 a.C.', 'Juicio sobre un pueblo rico y despreocupado; cautiverio «más allá de Damasco» (Am 5:27)'],
            ['Oseas', 'Israel, c. 750–722 a.C.', 'Efraín «llamarán a Egipto, acudirán a Asiria» (Os 7:11); «el asirio mismo será su rey» (Os 11:5)'],
            ['Isaías', 'Judá, c. 740–700 a.C.', 'Asiria, vara de Dios, y su juicio (Is 10:5-19); Emanuel (Is 7:14)'],
            ['Miqueas', 'Judá, c. 735–700 a.C.', 'La caída de Samaria (Mi 1:6) y la paz frente al asirio (Mi 5:5-6)']
          ] } }
      ],
      texto: [
        'Cuando Asiria comenzó su expansión, Dios levantó a cuatro profetas que hablaron casi al mismo tiempo. Sus libros muestran cómo veía Dios esa amenaza.',
        'Amós y Oseas hablaron al reino del norte, Israel, en un tiempo de prosperidad aparente. Amós denunció a los ricos que vivían tranquilos mientras oprimían a los pobres, y anunció que irían al cautiverio «más allá de Damasco» (Am 5:27). Oseas describió a Israel como «paloma incauta, sin entendimiento; llamarán a Egipto, acudirán a Asiria» (Os 7:11): un pueblo que buscaba alianzas en lugar de buscar a Dios. Y anunció el resultado: «el asirio mismo será su rey» (Os 11:5).',
        'Isaías y Miqueas hablaron a Judá. Cuando el rey Acaz, amenazado por Siria e Israel, decidió pedir ayuda a Asiria, Isaías le ofreció una señal: «He aquí que la virgen concebirá, y dará a luz un hijo, y llamará su nombre Emanuel» (Is 7:14), una profecía que el Nuevo Testamento ve cumplida en Jesús (Mt 1:23). Acaz no confió, y Asiria terminó siendo una amenaza para el propio Judá. Isaías explicó el sentido de todo: Asiria era «vara y báculo de mi furor» (Is 10:5), pero su orgullo también sería juzgado (Is 10:12).',
        'Miqueas anunció la ruina de Samaria (Mi 1:6) y, en medio de la amenaza asiria, habló de un gobernante nacido en Belén que sería «nuestra paz» (Mi 5:2, 5).'
      ],
      pensar: 'Frente a la amenaza de Asiria, Dios dio a Acaz la señal de Emanuel, «Dios con nosotros» (Is 7:14; Mt 1:23). ¿Qué significa para ti, en tus propias crisis, que Dios esté con nosotros en Cristo?'
    },
    {
      id: 'samaria', n: 'La caída de Samaria', ref: '2 Reyes 15:19-29; 16:7-9; 17:1-41; 1 Crónicas 5:26', fecha: -722,
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: CRECIENTE, capas: ['asiria-730'], lugares: ['samaria', 'damasco', 'gozan', 'ninive'], trazos: ['deportacion-722'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-deportacion-samaria.webp', alt: 'Familias israelitas deportadas salen de Samaria escoltadas por soldados asirios con cascos cónicos', pie: 'La deportación del reino de Israel, 722 a.C.', origen: 'ia' }
      ],
      texto: [
        'El reino de Israel, las diez tribus del norte con capital en Samaria, cayó en tres etapas. Primero, el rey Manahem pagó un gran tributo a Pul, es decir, Tiglat-pileser III, para mantenerse en el trono (2 R 15:19-20). Después, hacia 733 a.C., Tiglat-pileser tomó Galilea y la tierra de Neftalí y llevó cautivos a sus habitantes (2 R 15:29), junto con las tribus del otro lado del Jordán (1 Cr 5:26). Finalmente, el último rey, Oseas, dejó de pagar tributo y buscó ayuda en Egipto; Salmanasar V sitió Samaria durante tres años, y en 722 a.C. la ciudad cayó (2 R 17:3-6).',
        'Segundo Reyes se detiene en ese momento para explicar el porqué: «los hijos de Israel pecaron contra Jehová su Dios, que los sacó de tierra de Egipto… y temieron a dioses ajenos» (2 R 17:7). Dios les había advertido por medio de todos sus profetas, pero no escucharon, «hasta que Jehová quitó a Israel de delante de su rostro» (2 R 17:23).',
        'La política asiria completó la tragedia. Los israelitas fueron llevados a Mesopotamia y a las ciudades de los medos, y a Samaria llegaron colonos de otros pueblos, que adoraban a Jehová junto con sus propios dioses (2 R 17:24-33). Las diez tribus nunca regresaron como reino.',
        'Aun así, el pueblo de Dios no desapareció. Muchos del norte se habían refugiado en Judá, y en el Nuevo Testamento aparecen descendientes de esas tribus, como la profetisa Ana, «de la tribu de Aser» (Lc 2:36).'
      ],
      pensar: 'Dios advirtió a Israel por medio de todos sus profetas antes de la caída (2 R 17:13, 23). ¿Qué advertencias de la Palabra de Dios necesitas escuchar hoy, antes de que sea tarde?'
    },
    {
      id: 'ezequias', n: 'Ezequías y Senaquerib', ref: '2 Reyes 18–20; 2 Crónicas 32; Isaías 36–37', fecha: -701,
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-ezequias.webp', alt: 'El rey Ezequías, arrodillado en el templo de Jerusalén, extiende una carta delante del Señor y ora', pie: 'Ezequías extiende la carta delante de Jehová (2 R 19:14).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Ahora, pues, oh Jehová Dios nuestro, sálvanos, te ruego, de su mano, para que sepan todos los reinos de la tierra que sólo tú, Jehová, eres Dios.', ref: '2 Reyes 19:19' }
      ],
      texto: [
        'Ezequías fue uno de los mejores reyes de Judá. Purificó el templo, quitó los lugares altos y confió en Dios (2 R 18:3-6). Pero también se rebeló contra Asiria, y se preparó para la guerra. Una de sus obras fue un túnel excavado en la roca para llevar el agua de la fuente de Gihón dentro de los muros de Jerusalén (2 R 20:20; 2 Cr 32:30). El túnel todavía existe, y en él se encontró una inscripción en hebreo que cuenta cómo dos equipos de picadores se encontraron en el centro.',
        'En 701 a.C., Senaquerib tomó las ciudades de Judá y envió a sus generales contra Jerusalén. El Rabsaces se burló de Ezequías y de su Dios delante del pueblo reunido en el muro (2 R 18:19-35). Ezequías rasgó sus vestidos, entró en la casa de Jehová y envió a buscar al profeta Isaías (2 R 19:1-2). Cuando llegó una carta amenazante del rey de Asiria, la llevó al templo, la extendió delante de Jehová y oró (2 R 19:14-19).',
        'La respuesta de Dios por medio de Isaías fue clara: el rey de Asiria «no entrará en esta ciudad, ni echará saeta en ella» (2 R 19:32). Esa noche, el ángel de Jehová hirió el campamento asirio, y Senaquerib volvió a Nínive (2 R 19:35-36). Crónicas resume la lección: «Con él es el brazo de carne, mas con nosotros está Jehová nuestro Dios para ayudarnos, y pelear nuestras batallas» (2 Cr 32:8).',
        'El historiador griego Heródoto cuenta, con su propia versión, que un ejército de Senaquerib tuvo que retirarse de la frontera de Egipto en una noche, sin batalla. Su relato es diferente del bíblico, pero confirma que la campaña terminó de manera repentina.'
      ],
      pensar: '«Con él es el brazo de carne, mas con nosotros está Jehová nuestro Dios» (2 Cr 32:8). ¿Qué batalla estás enfrentando en la que necesitas recordar quién pelea por ti?'
    },
    {
      id: 'manases-nahum', n: 'Manasés, Nahúm y el fin de Nínive', ref: '2 Crónicas 33:1-20; Nahúm 1–3; Sofonías 2:13-15', fecha: [-687, -612],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-manases.webp', alt: 'El rey Manasés, encadenado y humillado, ora de rodillas en una prisión', pie: 'Manasés ora en su angustia (2 Cr 33:12).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Jehová es bueno, fortaleza en el día de la angustia; y conoce a los que en él confían.', ref: 'Nahúm 1:7' }
      ],
      texto: [
        'El hijo de Ezequías, Manasés, reinó cincuenta y cinco años y fue el rey más idólatra de Judá: reconstruyó los altares paganos, practicó la adivinación y llegó a sacrificar a sus propios hijos (2 Cr 33:1-9). Durante su reinado, Judá fue un vasallo fiel de Asiria; las inscripciones de Esar-hadón y de Asurbanipal mencionan a «Manasés, rey de Judá» entre los reyes que pagaban tributo.',
        'Crónicas cuenta que Dios trajo contra él a «los generales del ejército del rey de los asirios, los cuales aprisionaron con grillos a Manasés, y atado con cadenas lo llevaron a Babilonia» (2 Cr 33:11). Babilonia estaba entonces bajo dominio asirio, y se había rebelado contra Asurbanipal entre 652 y 648 a.C.; es posible que Manasés fuera llamado a dar cuenta en ese contexto. Allí ocurrió lo inesperado: «luego que fue puesto en angustias, oró a Jehová su Dios, humillado grandemente», y Dios lo escuchó y lo restauró a Jerusalén (2 Cr 33:12-13).',
        'Pocos años después, el profeta Nahúm anunció el fin de Nínive. Su libro es un poema de juicio contra la «ciudad sanguinaria» (Nah 3:1), pero comienza con una afirmación de consuelo para el pueblo oprimido: «Jehová es bueno, fortaleza en el día de la angustia; y conoce a los que en él confían» (Nah 1:7). Un siglo después de Jonás, Nínive había vuelto a su maldad, y esta vez no hubo arrepentimiento. En 612 a.C., la ciudad cayó.'
      ],
      pensar: 'Manasés, el peor rey de Judá, se humilló en la angustia y Dios lo escuchó (2 Cr 33:12-13). ¿Qué te enseña su historia sobre el alcance del perdón de Dios para quien se arrepiente de verdad?'
    },
    {
      id: 'profecia-nt', n: 'Asiria en la profecía y en el Nuevo Testamento', ref: 'Isaías 19:23-25; Miqueas 5:5-6; Mateo 12:41; Lucas 11:30; Juan 4:9; Hechos 8:5-17',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-samaritanos-espiritu.webp', alt: 'Pedro y Juan imponen las manos sobre creyentes samaritanos, que reciben el Espíritu Santo con gozo', pie: 'Los samaritanos reciben el Espíritu Santo (Hch 8:17).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Bendito el pueblo mío Egipto, y el asirio obra de mis manos, e Israel mi heredad.', ref: 'Isaías 19:25' }
      ],
      texto: [
        'Asiria desapareció en el siglo VII a.C., pero los profetas siguieron hablando de ella hacia el futuro. Isaías anunció un día en que habría «calzada de Egipto a Asiria», y los dos antiguos enemigos adorarían juntos a Dios; entonces Dios dirá: «Bendito el pueblo mío Egipto, y el asirio obra de mis manos, e Israel mi heredad» (Is 19:23-25). En la interpretación dispensacionalista que sigue este estudio, esta promesa se cumplirá en el reino milenial de Cristo, cuando las naciones de la región adoren al Señor junto a Israel.',
        'Miqueas, al anunciar al gobernante que nacería en Belén, dice que él «será nuestra paz», y que librará a su pueblo «del asirio, cuando viniere contra nuestra tierra» (Mi 5:5-6). Muchos intérpretes dispensacionalistas ven en «el asirio» de este pasaje una figura del enemigo del tiempo del fin, que el Mesías vencerá en su venida.',
        { h: 'En el Nuevo Testamento' },
        'Jesús recordó a Nínive dos veces. Comparó su propia muerte y resurrección con la señal de Jonás (Lc 11:30) y advirtió que «los hombres de Nínive se levantarán en el juicio con esta generación, y la condenarán; porque ellos se arrepintieron a la predicación de Jonás, y he aquí más que Jonás en este lugar» (Mt 12:41).',
        'Y la huella de Asiria está en los samaritanos, nacidos de la repoblación de Samaria. En tiempos de Jesús, «judíos y samaritanos no se tratan entre sí» (Jn 4:9). Pero el evangelio derribó ese muro. Felipe predicó a Cristo en Samaria, muchos creyeron, y cuando Pedro y Juan llegaron, «les imponían las manos, y recibían el Espíritu Santo» (Hch 8:5, 14-17). Los descendientes de una herida abierta por Asiria siete siglos antes recibieron el mismo Espíritu que los judíos en Pentecostés.'
      ],
      pensar: 'Los samaritanos, fruto de la deportación asiria, recibieron el Espíritu Santo igual que los judíos (Hch 8:14-17). ¿Qué muros entre personas o grupos puede derribar hoy el poder del Espíritu Santo?'
    },
    {
      id: 'arqueologia', n: 'La evidencia arqueológica', ref: '1 Reyes 16:29; 2 Reyes 9–10; 15:19; 18:13-16; 20:20; Isaías 20:1', fecha: [-853, -612],
      visual: [
        { tipo: 'tabla', titulo: 'Hallazgos', tabla: {
          titulo: 'Hallazgos y textos bíblicos', cab: ['Hallazgo', 'Qué dice o muestra', 'Texto bíblico'],
          filas: [
            ['Monolito de Kurkh (Museo Británico)', 'Salmanasar III enumera a «Acab el israelita» entre sus enemigos en Qarqar, 853 a.C.', '1 R 16:29–22:40'],
            ['Obelisco Negro (Museo Británico)', 'Muestra a Jehú, o a un enviado suyo, inclinado ante Salmanasar III, 841 a.C.', '2 R 9–10'],
            ['Anales de Tiglat-pileser III', 'Mencionan el tributo de Manahem de Samaria y de Acaz de Judá', '2 R 15:19-20; 16:7-8'],
            ['Palacio de Sargón en Jorsabad', 'Inscripciones que describen la toma de Samaria y la deportación de 27.290 personas', '2 R 17:6; Is 20:1'],
            ['Prisma de Senaquerib', 'Cuarenta y seis ciudades de Judá; Ezequías «como un pájaro en su jaula»', '2 R 18:13-16'],
            ['Relieves de Laquis (Museo Británico)', 'El sitio y la toma de Laquis, en el palacio de Nínive', '2 R 18:14, 17'],
            ['Túnel e inscripción de Siloé (Jerusalén)', 'El túnel del agua de Ezequías y el relato de su excavación', '2 R 20:20; 2 Cr 32:30'],
            ['Prisma de Esar-hadón', 'Nombra a «Manasés, rey de Judá» entre sus vasallos', '2 Cr 33:11']
          ],
          nota: 'En el Obelisco Negro, el texto llama a Jehú «hijo de Omri», como solían llamar los asirios a los reyes de Israel; se discute si la figura es el propio Jehú o su embajador.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/asiria-traslado-lamassu.webp', alt: 'Arqueólogos del siglo XIX y obreros locales trasladan con cuerdas y rodillos un enorme toro alado asirio descubierto en Nínive', pie: 'Recreación: el traslado de un toro alado de Nínive, hacia 1850.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[30, 33], [37.8, 45.5]], capas: ['asiria-730'], lugares: ['kalhu', 'ninive', 'dur-sharrukin', 'laquis', 'jerusalen', 'qarqar'] } }
      ],
      texto: [
        'Hasta mediados del siglo XIX, Asiria se conocía casi solo por la Biblia y por algunos autores griegos. Todo cambió entre 1843 y 1850, cuando Paul-Émile Botta excavó el palacio de Sargón en Jorsabad y Austen Henry Layard desenterró Cala y Nínive. Aparecieron palacios, toros alados, relieves y miles de tablillas, y con ellos los nombres de reyes y lugares que la Biblia ya mencionaba.',
        'Varios reyes de Israel y Judá aparecen en esas inscripciones. Salmanasar III registra a «Acab el israelita» entre sus enemigos en la batalla de Qarqar (853 a.C.). En el Obelisco Negro, el mismo rey hizo representar a Jehú, o a su enviado, inclinado ante él con el tributo: es la única imagen conservada de un rey de Israel o de su representante. Tiglat-pileser III registra el tributo de Manahem y de Acaz (2 R 15:19-20; 16:7-8), y Esar-hadón incluye a «Manasés, rey de Judá» entre sus vasallos.',
        'La campaña de Senaquerib contra Judá es uno de los hechos bíblicos mejor documentados fuera de la Biblia. Su prisma la narra desde el punto de vista asirio; los relieves de su palacio en Nínive muestran con detalle el sitio de Laquis, y en Laquis misma se excavaron la rampa de asedio y los restos de la batalla. En Jerusalén se conserva el túnel que Ezequías excavó para asegurar el agua (2 R 20:20).',
        'Y el caso de Sargón, conocido durante siglos solo por Isaías 20:1, recuerda que la falta de evidencia en un momento dado no prueba que la Biblia se equivoque.'
      ],
      pensar: 'Durante siglos, Asiria solo se conocía por la Biblia, hasta que la tierra devolvió sus palacios y sus nombres. ¿Qué te dice esto acerca de la confiabilidad de las Escrituras, y por qué nuestra fe descansa finalmente en la Palabra de Dios y no en los hallazgos (Ro 10:17)?'
    }
  ];

  window.RUTA_DATA = {
    titulo: 'El imperio asirio',
    credito: 'Citas textuales: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso. Fronteras de los mapas aproximadas.',
    marca: 'Recursos Bíblicos',
    inicio: '../../',
    rutas: [
      { id: 'historia', grupo: 'El imperio asirio', n: 'Historia', info: 'Origen, formación del imperio, reyes, Senaquerib y la caída de Nínive',
        linea: { desde: -950, hasta: -595, hitos: [
          { a: -883, t: 'Asurnasirpal II' }, { a: -853, t: 'Qarqar' }, { a: -745, t: 'Pul' },
          { a: -722, t: 'Cae Samaria' }, { a: -701, t: 'Senaquerib' }, { a: -612, t: 'Cae Nínive' }
        ] },
        estaciones: historia },
      { id: 'sociedad', grupo: 'El imperio asirio', n: 'Sociedad y religión', info: 'Las capitales, la guerra, las deportaciones, la religión y el legado', estaciones: sociedad },
      { id: 'biblia', grupo: 'El imperio asirio', n: 'Asiria y la Biblia', info: 'Jonás, los profetas, Samaria, Ezequías, Nahúm, el Nuevo Testamento y la arqueología',
        linea: { desde: -800, hasta: -600, hitos: [
          { a: -780, t: 'Jonás' }, { a: -745, t: 'Pul' }, { a: -722, t: 'Cae Samaria' },
          { a: -701, t: 'Ezequías' }, { a: -650, t: 'Manasés' }, { a: -612, t: 'Cae Nínive' }
        ] },
        estaciones: biblia }
    ]
  };
})();
