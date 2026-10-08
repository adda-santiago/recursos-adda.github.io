/* ==========================================================
   Recursos Bíblicos — El imperio babilónico · contenido de las rutas
   Motor: ../assets/js/ruta-estudio.js (formato descrito en su encabezado).
   Geografía: ../assets/js/imperios-geo.js. Citas: Reina-Valera 1960.
   Las referencias del texto se vuelven burbujas con citas.js: todo
   versículo citado debe estar en ../assets/js/citas-rv1960.js.
   Diferencias entre la historia y el texto bíblico: bloque { posturas } con
   ambas versiones y cómo se entienden; nunca se presenta el texto bíblico como error.
   En temas doctrinales prevalece la línea pentecostal clásica (Asambleas de Dios).
   ========================================================== */
(() => {
  const CRECIENTE = [[28.5, 31.5], [38.5, 50]];
  const ORIENTE = [[22, 26], [43, 60]];
  const IMPERIO = [[27, 30], [39, 51]];
  const MESOPOTAMIA = [[29.5, 39.5], [37, 50.5]];
  const VECINOS = ['media-585', 'lidia-560', 'egipto-570'];

  const historia = [
    {
      id: 'en-la-biblia', n: 'Babilonia en la Biblia', ref: 'Génesis 11; 2 Reyes 24–25; Jeremías 50–51; Mateo 1:17; Apocalipsis 18', fecha: [-626, -539],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-puerta-ishtar.webp', alt: 'La Puerta de Ishtar de Babilonia al atardecer', pie: 'La Puerta de Ishtar, entrada norte de Babilonia en tiempos de Nabucodonosor.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: IMPERIO, capas: ['babilonia-570'], vecinos: VECINOS, lugares: ['babilonia', 'jerusalen'] } }
      ],
      texto: [
        'Pocas naciones ocupan tanto espacio en la Biblia como Babilonia. Su nombre aparece por primera vez en Génesis, cuando la ciudad de Babel, «en la tierra de Sinar», es el comienzo del reino de Nimrod (Gn 10:10). Allí los hombres quisieron edificar una torre «cuya cúspide llegue al cielo» para hacerse un nombre (Gn 11:4), y Dios confundió su lengua (Gn 11:9). El nombre vuelve en el último libro de la Biblia, donde «la gran Babilonia» representa el poder humano que se levanta contra Dios en el tiempo del fin (Ap 18:2).',
        'Entre esos dos extremos está el imperio histórico que estudia esta ruta. Los historiadores lo llaman imperio neobabilónico, para distinguirlo de la Babilonia antigua del rey Hammurabi, unos mil años anterior. Duró apenas 87 años, desde 626 hasta 539 a.C., pero en ese tiempo destruyó Jerusalén y el templo de Salomón, y llevó al pueblo de Judá al exilio. Para los autores bíblicos fue el gran instrumento del juicio de Dios sobre Judá y, al mismo tiempo, el símbolo del orgullo humano.',
        'La Biblia llama a sus gobernantes «caldeos». Eran tribus establecidas en el sur de Mesopotamia, junto a los pantanos donde se unen el Tigris y el Éufrates, que llegaron a reinar sobre la antigua ciudad de Babilonia.',
        'Babilonia atraviesa casi toda la Biblia. Los libros históricos narran sus campañas contra Judá y la destrucción del templo (2 R 24:10-16; 2 Cr 36:17-20). Los profetas hablan de ella una y otra vez: Isaías anunció el exilio y también la caída de Babilonia (Is 39:6-7; 13:19); Jeremías vivió el asedio de Jerusalén y escribió contra ella sus capítulos más largos (Jer 50–51); Ezequiel profetizó desde el exilio, «junto al río Quebar» (Ez 1:1), y Habacuc se preguntó por qué Dios usaba a «los caldeos, nación cruel y presurosa» (Hab 1:6). Los Salmos y Lamentaciones conservan el dolor del pueblo (Sal 137:1; Lm 1:1); Esdras y Nehemías cuentan el regreso; Daniel muestra cómo vivir con fidelidad en su corte. En el Nuevo Testamento, la genealogía de Jesús marca «la deportación a Babilonia» como uno de los grandes cortes de la historia de Israel (Mt 1:17).'
      ],
      pensar: 'El rey de Babilonia decía en su corazón: «Subiré al cielo… y seré semejante al Altísimo» (Is 14:13-14), lo mismo que buscaban los constructores de Babel (Gn 11:4). ¿Por qué el orgullo es el pecado que más se repite en la historia de Babilonia, y cómo se manifiesta hoy en nosotros?'
    },
    {
      id: 'origen', n: 'Origen y auge', ref: '2 Reyes 20:12-18; 23:29; Nahúm 3; Jeremías 46:2', fecha: [-626, -605],
      visual: [{ tipo: 'mapa', titulo: 'Mapa', pasos: [
        { t: 'Hacia 670 a.C., Babilonia es una provincia del imperio asirio.', fecha: -670,
          estado: { view: CRECIENTE, capas: ['asiria-670'], lugares: ['babilonia', 'ninive', 'asur'] } },
        { t: '626 a.C.: Nabopolasar expulsa a los asirios y se proclama rey.', fecha: -626,
          estado: { view: CRECIENTE, capas: ['asiria-670', 'babilonia-620'], lugares: ['babilonia'] } },
        { t: '614 y 612 a.C.: caen Asur y Nínive ante medos y babilonios.', fecha: [-614, -612],
          estado: { view: CRECIENTE, capas: ['babilonia-620'], lugares: ['asur', 'ninive', 'babilonia'] } },
        { t: '610 a.C.: los últimos asirios son expulsados de Harán.', fecha: -610,
          estado: { view: CRECIENTE, capas: ['babilonia-620'], lugares: ['haran', 'babilonia'] } },
        { t: '605 a.C.: Nabucodonosor derrota a Egipto en Carquemis.', fecha: -605,
          estado: { view: CRECIENTE, capas: ['babilonia-620'], lugares: ['carquemis', 'babilonia', 'jerusalen'], trazos: ['campana-605'] } }
      ] }],
      texto: [
        'Durante más de un siglo, Babilonia fue una provincia del imperio asirio, y una provincia difícil de gobernar. Sus habitantes se rebelaban una y otra vez. Uno de esos rebeldes fue Merodac-baladán, un jefe caldeo que buscaba aliados contra Asiria y por eso envió embajadores al rey Ezequías. Ezequías les mostró todos sus tesoros, e Isaías le anunció que un día todo eso sería llevado a Babilonia (2 R 20:12-18). Cuando lo dijo, Babilonia era un pueblo sometido; la profecía parecía improbable.',
        'Todo cambió en 626 a.C. Otro caldeo, Nabopolasar, expulsó a los asirios y se proclamó rey de Babilonia. En pocos años se alió con los medos, un pueblo de las montañas de Irán, y juntos atacaron el corazón de Asiria. Los medos tomaron la antigua capital, Asur, en 614. En 612 cayó Nínive, la gran ciudad que había dominado el Oriente, tal como lo había anunciado Nahúm: «Nínive es asolada» (Nah 3:7). Los últimos asirios huyeron a Harán, y también fueron expulsados de allí en 610.',
        'Egipto vio el peligro y movió su ejército hacia el norte. En ese avance, el faraón Necao se cruzó con el rey Josías de Judá, que salió a detenerlo en Meguido y murió en la batalla (2 R 23:29). El relato paralelo de Crónicas precisa que Necao iba a hacer guerra en Carquemis, junto al Éufrates (2 Cr 35:20).',
        { posturas: {
          titulo: '¿Necao subió contra Asiria o en su ayuda?',
          a: { n: 'El texto bíblico', t: 'La Reina-Valera 1960 traduce que Necao «subió contra el rey de Asiria al río Eufrates» (2 R 23:29).' },
          b: { n: 'Las fuentes históricas', t: 'La Crónica babilónica registra que en 609 a.C. un gran ejército egipcio cruzó el Éufrates junto al rey de Asiria para recuperar Harán.' },
          c: 'La diferencia está en la traducción, no en el texto. La preposición hebrea que la RV 1960 traduce «contra» significa también «hacia» o «al encuentro de», y así la traducen otras versiones. Leído de esa manera, el relato bíblico y la crónica describen el mismo viaje: Necao subía hacia el Éufrates, donde estaba el rey de Asiria.'
        } },
        'La lucha final ocurrió en 605 a.C. en Carquemis, junto al Éufrates. Allí el príncipe heredero de Babilonia, Nabucodonosor, destruyó al ejército egipcio (Jer 46:2). Ese mismo verano murió su padre, y Nabucodonosor volvió a toda prisa a Babilonia para ser coronado.',
        'Carquemis decidió el futuro de toda la región. Siria, Fenicia y Judá, que hasta entonces miraban a Egipto, quedaron bajo el poder de Babilonia. Jeremías fechó ese momento como «el año cuarto de Joacim… el cual era el año primero de Nabucodonosor» (Jer 25:1), y anunció que Dios traería contra Judá a «Nabucodonosor rey de Babilonia, mi siervo» (Jer 25:9). Habacuc, que probablemente profetizó en esos mismos años, recibió el mensaje: «yo levanto a los caldeos» (Hab 1:6). Ese año salieron de Jerusalén los primeros cautivos, entre ellos Daniel y sus amigos (Dn 1:1-6). Usa los botones bajo el mapa para seguir estos pasos.'
      ],
      pensar: 'Isaías anunció el exilio a Babilonia cuando Babilonia era todavía una provincia sometida. ¿Qué nos enseña esto acerca de la palabra profética y de la manera en que Dios conoce y dirige la historia?'
    },
    {
      id: 'territorio', n: 'Territorio', ref: '2 Reyes 24:7; Jeremías 27:3-7; 37:7; Ezequiel 29:18', fecha: -570,
      visual: [{ tipo: 'mapa', titulo: 'Mapa', estado: { view: IMPERIO, capas: ['babilonia-570'], vecinos: VECINOS, conVecinos: true,
        lugares: ['babilonia', 'carquemis', 'tiro', 'jerusalen', 'rio-egipto', 'susa'] } }],
      texto: [
        'Bajo Nabucodonosor, el imperio heredó casi todo lo que había sido de Asiria. Iba desde el golfo Pérsico hasta la frontera de Egipto y tenía la forma de un gran arco, que los historiadores llaman el Creciente Fértil. El arco seguía el agua: subía por los ríos Tigris y Éufrates, cruzaba Siria y bajaba por la costa del Mediterráneo. En el centro quedaba el desierto de Arabia. Por eso, quien viajaba de Jerusalén a Babilonia no cruzaba el desierto en línea recta, sino que subía hacia el norte y bajaba por el Éufrates: un camino de unos 1.300 a 1.400 kilómetros.',
        'La Biblia describe el alcance del imperio con precisión: el rey de Babilonia tomó todo lo que había sido de Egipto, «desde el río de Egipto hasta el río Eufrates», y el faraón «nunca más» salió de su tierra (2 R 24:7). Jeremías va más allá: Dios mismo había puesto «todas estas tierras» en mano de Nabucodonosor, a quien llama «mi siervo» (Jer 27:6). Por eso aconsejó a los reyes de Edom, Moab, Amón, Tiro y Sidón que se sometieran (Jer 27:3). Judá, en cambio, siguió esperando ayuda de Egipto, y Jeremías le advirtió que el ejército del faraón se volvería a su tierra (Jer 37:7).',
        'No todos se sometieron con facilidad. Tiro, una ciudad construida sobre una isla, resistió un sitio de unos trece años, según el historiador judío Josefo; Ezequiel menciona el enorme esfuerzo que costó (Ez 29:18).',
        'Alrededor del imperio había otros tres grandes reinos. Al norte y al este estaba Media, la antigua aliada, cuya frontera exacta no se conoce bien. En Anatolia estaba Lidia, el reino de la moneda de oro. Al suroeste, Egipto, debilitado pero independiente. El botón «Vecinos» los muestra u oculta. Las fronteras del mapa son aproximadas: los límites antiguos cambiaban con cada campaña y no quedaron trazados en ningún documento.'
      ],
      pensar: 'Judá buscó seguridad en Egipto en lugar de escuchar la palabra de Dios por medio de Jeremías. ¿En qué apoyos humanos somos tentados hoy a confiar más que en el Señor?'
    },
    {
      id: 'reyes', n: 'Los reyes', ref: '2 Reyes 24–25; 2 Crónicas 36; Jeremías 25:9; 52:31-34; Ezequiel 26:7; Daniel 4–5', fecha: [-605, -539],
      visual: [
        { tipo: 'tabla', titulo: 'Reyes', tabla: {
          titulo: 'Los reyes del imperio babilónico', cab: ['Rey', 'Reinado', 'En la Biblia'],
          filas: [
            ['Nabopolasar', '626–605 a.C.', 'No se nombra'],
            ['Nabucodonosor II', '605–562 a.C.', '2 Reyes, Crónicas, Jeremías, Ezequiel, Daniel 1–4'],
            ['Evil-merodac (Amel-Marduk)', '562–560 a.C.', 'Saca de la cárcel a Joaquín (2 R 25:27)'],
            ['Neriglisar', '560–556 a.C.', 'Probablemente Nergal-sarezer (Jer 39:3)'],
            ['Labasi-Marduk', '556 a.C.', 'No se nombra'],
            ['Nabonido', '556–539 a.C.', 'No se nombra; su hijo Belsasar sí (Daniel 5)']
          ],
          nota: 'Fechas según la cronología habitual de las crónicas babilonias. La identificación de Neriglisar con Nergal-sarezer es probable, no segura.' } },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[23, 31.5], [38.5, 50]], capas: ['babilonia-545'], lugares: ['babilonia', 'tema', 'haran'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-carquemis.webp', alt: 'Batalla de Carquemis junto al Éufrates: carros babilonios contra soldados egipcios', pie: 'La batalla de Carquemis, 605 a.C. (Jer 46:2).', origen: 'ia' }
      ],
      texto: [
        'En 87 años el imperio tuvo seis reyes, pero uno solo domina la historia: Nabucodonosor II, que reinó 43 años (605–562 a.C.). Es uno de los reyes extranjeros más nombrados del Antiguo Testamento, y cada libro lo muestra desde un ángulo distinto. En Reyes y Crónicas es el conquistador que se llevó los tesoros del templo, quemó la casa de Jehová y llevó cautivo al pueblo (2 R 24:13; 25:9; 2 Cr 36:18-19). Para Jeremías es «mi siervo», el instrumento que Dios usa para disciplinar a Judá y a las naciones (Jer 25:9; 43:10). Ezequiel lo llama «rey de reyes» y anuncia que Dios le dará Egipto como paga por el sitio de Tiro (Ez 26:7; 29:19-20). Daniel narra cómo Dios lo humilló hasta que reconoció que «el Altísimo tiene el dominio en el reino de los hombres» (Dn 4:32).',
        'Fue también un gran constructor. Reconstruyó casi entera la ciudad de Babilonia e hizo grabar su nombre en miles de ladrillos que todavía se encuentran entre las ruinas. Los documentos babilonios de la segunda mitad de su reinado son escasos, y fuera de la Biblia no se ha encontrado un registro del período de humillación que narra Daniel 4.',
        'Después de su muerte, el imperio entró en crisis. Su hijo Evil-merodac reinó solo dos años. Los libros de Reyes y de Jeremías terminan justamente con él: saca de la cárcel al rey Joaquín de Judá y le da de comer de su mesa todos los días de su vida (2 R 25:27-30; Jer 52:31-34). Es la última noticia de la casa de David antes del regreso, y una pequeña luz de esperanza. Evil-merodac fue asesinado por su cuñado Neriglisar, probablemente el «Nergal-sarezer» que estuvo presente en la caída de Jerusalén (Jer 39:3). El hijo de Neriglisar, Labasi-Marduk, apenas alcanzó a reinar unos meses.',
        'El último rey fue Nabonido (556–539 a.C.), que no era de la familia real. Era devoto de Sin, el dios luna, y pasó unos diez años en el oasis de Tema, en Arabia, dejando a su hijo Belsasar a cargo de Babilonia. Por eso, en Daniel 5, Belsasar actúa como rey y ofrece a quien lea la escritura de la pared ser «el tercer señor del reino» (Dn 5:29): el primero era Nabonido; el segundo, él mismo. Daniel lo llama hijo de Nabucodonosor (Dn 5:2, 18); en hebreo y arameo, «padre» e «hijo» se usaban también para antepasados y sucesores en el trono.'
      ],
      pensar: 'Dios llama a Nabucodonosor «mi siervo» (Jer 25:9) aunque el rey no lo conocía, y lo usa para cumplir sus propósitos. ¿Qué nos enseña esto acerca de la soberanía de Dios sobre los gobernantes de la tierra, aun sobre los que no lo reconocen (Dn 4:32)?'
    },
    {
      id: 'caida', n: 'La caída', ref: 'Isaías 13; 21; 45; 47; Jeremías 51; Daniel 5; 2 Crónicas 36:21-22; Esdras 1:1', fecha: -539,
      visual: [
        { tipo: 'imagen', titulo: 'Banquete', src: 'img/babilonia-banquete-belsasar.webp', foco: '75% 50%', alt: 'El banquete de Belsasar: una mano escribe en la pared del palacio', pie: 'El banquete de Belsasar, la noche de la caída (Daniel 5).', origen: 'ia' },
        { tipo: 'imagen', titulo: 'Jeremías 51', src: 'img/babilonia-seraias-eufrates.webp', foco: '40% 50%', alt: 'Seraías arroja al Éufrates un libro atado a una piedra frente a las murallas de Babilonia', pie: '«Así se hundirá Babilonia, y no se levantará» (Jer 51:64).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '550–547 a.C.: Ciro une Media y Persia, y conquista Lidia.', fecha: [-550, -547],
            estado: { view: ORIENTE, capas: ['persia-539', 'babilonia-545'], lugares: ['ecbatana', 'sardis', 'pasargada', 'babilonia'] } },
          { t: 'Octubre de 539 a.C.: el ejército persa vence en Opis.', fecha: -539,
            estado: { view: MESOPOTAMIA, capas: ['persia-539', 'babilonia-545'], lugares: ['ecbatana', 'opis'], trazos: ['caida-539'] } },
          { t: 'Sipar se rinde sin luchar; dos días después cae Babilonia.', fecha: -539,
            estado: { view: [[31.5, 42.5], [34.5, 46.5]], capas: ['babilonia-545'], lugares: ['opis', 'sipar', 'babilonia'], trazos: ['caida-539'] } }
        ] }
      ],
      texto: [
        'Mientras Babilonia se debilitaba, a su alrededor crecía un nuevo poder. Ciro, rey de un pequeño reino persa, venció a los medos en 550 a.C. y unió ambos pueblos. En 547 conquistó Lidia, en Anatolia. Babilonia quedó rodeada.',
        'En octubre de 539 a.C., el ejército persa derrotó a los babilonios en Opis, junto al Tigris. Días después, la ciudad de Sipar se rindió sin luchar, y dos días más tarde un general de Ciro entró en Babilonia sin batalla. Así lo registra la Crónica de Nabonido, una tablilla babilonia. Ciro llegó a la ciudad poco más de dos semanas después. Los historiadores griegos Heródoto y Jenofonte, que escribieron más tarde, cuentan que esa noche la ciudad estaba de fiesta.',
        'Los profetas lo habían anunciado mucho antes. Isaías vio a los medos levantarse contra Babilonia, «hermosura de reinos», y la comparó con Sodoma y Gomorra (Is 13:17-19); oyó el grito «Cayó, cayó Babilonia» (Is 21:9) y le ordenó: «Desciende y siéntate en el polvo, virgen hija de Babilonia» (Is 47:1). Llegó a llamar a Ciro por su nombre, como el instrumento de Dios (Is 45:1). Jeremías anunció que Jehová despertaría «el espíritu de los reyes de Media» (Jer 51:11).',
        'Jeremías hizo además un gesto que no se olvida. En el cuarto año del rey Sedequías, cuando Babilonia estaba en su apogeo, escribió en un libro las profecías contra ella y se lo entregó a Seraías, que viajaba a Babilonia. Al llegar, Seraías debía leerlo, atarle una piedra y arrojarlo al Éufrates, diciendo: «Así se hundirá Babilonia, y no se levantará» (Jer 51:59-64). Unos cincuenta y cinco años después, la palabra se cumplió.',
        'Daniel narra la última noche desde adentro del palacio: el banquete de Belsasar con los vasos del templo de Jerusalén, la mano que escribió en la pared y la sentencia: «Pesado has sido en balanza, y fuiste hallado falto» (Dn 5:27). «La misma noche fue muerto Belsasar rey de los caldeos» (Dn 5:30). El reino pasó a «Darío de Media» (Dn 5:31), cuya identidad se discute: unos lo identifican con un gobernador que Ciro puso sobre Babilonia, otros con el mismo Ciro bajo otro título (Dn 6:28).',
        'Crónicas y Esdras cierran la historia mostrando su sentido: el exilio duró hasta que se cumplió «la palabra de Jehová por la boca de Jeremías», y en el primer año de Ciro, Jehová «despertó el espíritu de Ciro rey de los persas» para que el pueblo volviera a su tierra (2 Cr 36:21-22; Esd 1:1).'
      ],
      pensar: 'Jeremías arrojó al Éufrates un libro con la sentencia contra Babilonia cuando el imperio parecía invencible (Jer 51:63-64). ¿Qué te enseña esto acerca de confiar en las promesas de Dios cuando las circunstancias parecen decir lo contrario?'
    }
  ];


  const SUR = [[30.6, 43.2], [33.6, 47.2]];
  const sociedad = [
    {
      id: 'ciudad', n: 'La ciudad de Babilonia', ref: 'Daniel 4:29-30; Génesis 11:3; Jeremías 51:58', fecha: [-605, -562],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-ciudad-eufrates.webp', alt: 'Babilonia vista desde el Éufrates, con sus murallas y el zigurat al fondo', pie: 'Babilonia junto al Éufrates en tiempos de Nabucodonosor, con el zigurat Etemenanki al fondo.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: SUR, capas: ['babilonia-570'], lugares: ['babilonia', 'borsipa', 'kish', 'sipar', 'nipur', 'uruk', 'ur'] } }
      ],
      texto: [
        'Babilonia se levantaba a orillas del Éufrates, en la gran llanura del sur de Mesopotamia, unos 85 kilómetros al sur de la actual Bagdad. El río atravesaba la ciudad y la dividía en dos partes unidas por un puente. En esa llanura no hay piedra: todo se construía con barro, en ladrillos secados al sol o cocidos en hornos, unidos con betún. Génesis describe lo mismo en Babel: «les sirvió el ladrillo en lugar de piedra, y el asfalto en lugar de mezcla» (Gn 11:3).',
        'Nabucodonosor convirtió a Babilonia en una de las ciudades más grandes de su tiempo. La rodeó con una doble muralla y un foso alimentado por el río, y agregó una tercera muralla exterior. Isaías la llama «hermosura de reinos y ornamento de la grandeza de los caldeos» (Is 13:19), y Jeremías habla de «el muro ancho de Babilonia», anunciando que será derribado (Jer 51:58). La ciudad tenía ocho puertas con nombres de dioses. La más famosa era la Puerta de Ishtar, cubierta de ladrillos vidriados de color azul, con figuras de toros y de dragones, el animal de Marduk. De ella partía la vía procesional, decorada con leones. Una parte de la puerta, reconstruida con ladrillos originales, se conserva hoy en el Museo de Pérgamo de Berlín.',
        'En el centro de la ciudad estaba el Esagila, el gran templo de Marduk, y junto a él el zigurat Etemenanki, «casa del fundamento del cielo y la tierra»: una torre escalonada que, según una tablilla antigua, medía unos 91 metros por lado en la base. La torre de Babel de Génesis 11 es mucho más antigua, pero el Etemenanki ayuda a imaginar el tipo de construcción que describe el relato.',
        'Junto a la Puerta de Ishtar estaban los palacios reales. Allí, «paseando en el palacio real de Babilonia», Nabucodonosor pronunció su jactancia: «¿No es ésta la gran Babilonia que yo edifiqué…?» (Dn 4:29-30). Las excavaciones confirman su orgullo: miles de ladrillos de la ciudad llevan estampado su nombre. Los famosos jardines colgantes, en cambio, solo se conocen por autores griegos posteriores; no se han identificado en las ruinas, y algunos investigadores piensan que en realidad estaban en Nínive.'
      ],
      pensar: 'Jeremías anunció que el gran muro de Babilonia sería derribado y que los pueblos habían trabajado «en vano» (Jer 51:58), y hoy la ciudad es un campo de ruinas. A la luz de las palabras de Jesús sobre los tesoros en la tierra y en el cielo (Mt 6:19-20), ¿en qué estás invirtiendo tu vida?'
    },
    {
      id: 'vida', n: 'Vida diaria y la escuela del rey', ref: 'Daniel 1:3-20; 2:4; Isaías 39:7; Ezequiel 1:1; Nehemías 1:11', fecha: -605,
      visual: [
        { tipo: 'tabla', titulo: 'Nombres', tabla: {
          titulo: 'Los nombres de Daniel y sus amigos (Dn 1:7)', cab: ['Nombre hebreo', 'Significado', 'Nombre babilónico'],
          filas: [
            ['Daniel', 'Dios es mi juez', 'Beltsasar: probablemente «protege la vida del rey», invocando a Bel'],
            ['Ananías', 'Jehová ha tenido gracia', 'Sadrac: significado incierto'],
            ['Misael', '¿Quién es como Dios?', 'Mesac: significado incierto'],
            ['Azarías', 'Jehová ha ayudado', 'Abed-nego: «siervo de Nego», probablemente el dios Nabu']
          ],
          nota: 'Los significados de los nombres babilónicos son propuestas de los estudiosos; el de Sadrac y Mesac no se conoce con seguridad.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-escuela-escribas.webp', foco: '45% 50%', alt: 'Jóvenes judíos aprenden a escribir en tablillas de arcilla en la corte de Babilonia', pie: 'Jóvenes cautivos en la escuela de escribas del palacio.', origen: 'ia' }
      ],
      texto: [
        'La riqueza de Babilonia venía del agua. Una red de canales llevaba el agua del Éufrates a los campos, donde se cultivaba cebada y crecían enormes plantaciones de palmeras datileras; también se criaban ovejas y cabras. El río Quebar, junto al que vivían Ezequiel y otros deportados (Ez 1:1), era probablemente uno de esos canales. Los templos y el palacio eran grandes centros económicos, con tierras, rebaños, talleres y trabajadores, y las familias de comerciantes guardaban sus contratos y préstamos en tablillas de arcilla, muchas de las cuales se han conservado.',
        'Escribir era un oficio de especialistas. Los escribas aprendían durante años la escritura cuneiforme, hecha con cuñas marcadas en barro, y la lengua acadia, que se usaba en la administración y en los textos religiosos. Pero la lengua que hablaba la gente común en todo el imperio era el arameo. Esa lengua dejó huella en la Biblia: Daniel cambia al arameo cuando los sabios responden al rey «en lengua aramea» (Dn 2:4) y sigue en esa lengua hasta el capítulo 7; también están en arameo varios documentos oficiales copiados en Esdras y un versículo de Jeremías (Jer 10:11).',
        { h: 'La escuela del rey' },
        'Nabucodonosor tenía un plan para los jóvenes de los pueblos conquistados: escoger muchachos de la familia real y de la nobleza para enseñarles «las letras y la lengua de los caldeos» durante tres años y ponerlos después al servicio del rey (Dn 1:4-5). Así se cumplía lo que Isaías había anunciado a Ezequías más de un siglo antes: algunos de sus descendientes serían «eunucos en el palacio del rey de Babilonia» (Is 39:7). La idea era formar funcionarios leales al imperio; por eso también les cambiaron el nombre, y los nombres hebreos, que honraban al Dios de Israel, fueron reemplazados por nombres babilónicos (Dn 1:7).',
        'Daniel y sus tres amigos aceptaron estudiar, pero hubo un punto en que no cedieron: «Daniel propuso en su corazón no contaminarse con la porción de la comida del rey» (Dn 1:8), y Dios les dio «conocimiento e inteligencia en todas las letras y ciencias» (Dn 1:17). No serían los únicos judíos al servicio de un rey extranjero: más tarde Nehemías fue copero del rey de Persia (Neh 1:11) y Ester llegó a ser reina en Susa. La Biblia muestra que se puede servir con excelencia en un gobierno pagano sin renunciar a la fe.'
      ],
      pensar: 'Daniel aprendió la lengua y la ciencia de Babilonia, pero «propuso en su corazón» no contaminarse (Dn 1:8). ¿Dónde está hoy el límite entre aprender de la cultura que nos rodea y comprometer la fidelidad a Dios?'
    },
    {
      id: 'religion', n: 'La religión de Babilonia', ref: 'Isaías 46–47; Jeremías 7:18; 44:17; Ezequiel 8; 21:21; Habacuc 2:18; Daniel 2–3', fecha: [-605, -539],
      visual: [
        { tipo: 'tabla', titulo: 'Dioses', tabla: {
          titulo: 'Dioses de Babilonia en la Biblia', cab: ['Dios', 'Qué representaba', 'En la Biblia'],
          filas: [
            ['Marduk (Bel, Merodac)', 'Dios de la ciudad de Babilonia, cabeza de sus dioses', 'Is 46:1; Jer 50:2'],
            ['Nabu (Nebo)', 'Dios de la escritura y la sabiduría, hijo de Marduk; templo en Borsipa', 'Is 46:1; presente en el nombre de Nabucodonosor'],
            ['Sin', 'Dios de la luna; el preferido del rey Nabonido', 'No se nombra'],
            ['Ishtar', 'Diosa del amor y de la guerra', 'Posiblemente la «reina del cielo» (Jer 7:18)']
          ],
          nota: 'La identificación de la «reina del cielo» con Ishtar, o con una diosa semejante, es probable, no segura.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-procesion-ano-nuevo.webp', alt: 'Procesión del Año Nuevo por la vía procesional de Babilonia, con la estatua de un dios sobre un carro', pie: 'La fiesta de Año Nuevo: la procesión de los dioses por la vía procesional.', origen: 'ia' }
      ],
      texto: [
        'Los babilonios adoraban a muchos dioses, y cada ciudad tenía el suyo. El dios de Babilonia era Marduk, a quien llamaban Bel, «señor»; los profetas lo nombran como Bel y como Merodac (Is 46:1; Jer 50:2). Su hijo Nabu, dios de la escritura y la sabiduría, tenía su templo en la ciudad vecina de Borsipa, y su nombre forma parte del de Nabucodonosor. También se adoraba a Ishtar, diosa del amor y de la guerra; a Sin, la luna, y a Shamash, el sol.',
        'La religión estaba unida a la política. Cada primavera se celebraba la gran fiesta de Año Nuevo: la estatua de Nabu era llevada desde Borsipa, los dioses recorrían en procesión la vía principal, y el rey renovaba su derecho a gobernar «tomando la mano de Bel». Cuando Nabonido pasó años lejos, en Tema, la fiesta no se celebró, y los sacerdotes de Marduk se lo reprocharon.',
        'Los babilonios buscaban conocer el futuro en los astros, en los sueños y en las señales del cuerpo de los animales sacrificados. Ezequiel describe al rey de Babilonia en una encrucijada, decidiendo hacia dónde marchar: «ha sacudido las saetas, consultó a sus ídolos, miró el hígado» (Ez 21:21). Isaías se burla de «los contempladores de los cielos, los que observan las estrellas» (Is 47:13). Con el tiempo, la palabra «caldeo» llegó a significar astrólogo (Dn 2:2); frente a ellos, Daniel declaró que «hay un Dios en los cielos, el cual revela los misterios» (Dn 2:28).',
        'La religión de Babilonia no se quedó en Babilonia: antes del exilio, sus costumbres ya habían entrado en Judá. Ezequiel vio en visión a mujeres «endechando a Tamuz», un dios de Mesopotamia, a la puerta del templo, y a hombres que adoraban al sol con la espalda vuelta a la casa de Jehová (Ez 8:14, 16). Jeremías denunció a las familias que hacían tortas a «la reina del cielo» (Jer 7:18), y aun refugiados en Egipto, los de Judá insistieron en ofrecerle incienso (Jer 44:17). Por eso los profetas presentan el exilio como el juicio de Dios sobre la idolatría.',
        'Los profetas también se burlan de los ídolos. Habacuc pregunta de qué sirve «la estatua de fundición que enseña mentira» (Hab 2:18). Isaías muestra que los dioses de Babilonia tienen que ser cargados sobre animales (Is 46:1-2), mientras que el Dios de Israel es quien carga a su pueblo: «yo hice, yo llevaré, yo soportaré y guardaré» (Is 46:3-4). Y en la misma Babilonia, cuando Nabucodonosor exigió adorar su estatua de oro, los amigos de Daniel respondieron: «no serviremos a tus dioses» (Dn 3:18).'
      ],
      pensar: 'Los sabios de Babilonia buscaban el futuro en las estrellas (Is 47:13), y el pueblo de Judá terminó adorando dioses ajenos (Ez 8:14-16). ¿A qué fuentes acude hoy la gente para conocer su futuro o asegurar su bienestar, y por qué el creyente busca su dirección solo en Dios, en su Palabra y en la guía de su Espíritu?'
    },
    {
      id: 'conquistados', n: 'El trato a los pueblos conquistados', ref: '2 Reyes 24:14-16; 25:11-12; Jeremías 29:4-10; Ezequiel 3:15; Salmo 137', fecha: [-597, -539],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-camino-exilio.webp', alt: 'Una larga columna de cautivos de Judá camina junto al Éufrates escoltada por soldados babilonios', pie: 'El camino de los deportados hacia Babilonia.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: CRECIENTE, capas: ['babilonia-570'], lugares: ['jerusalen', 'ribla', 'carquemis', 'babilonia', 'tel-abib'], trazos: ['deportacion'] } },
        { tipo: 'tabla', titulo: 'Comparación', tabla: {
          titulo: 'Tres imperios, tres políticas', cab: ['', 'Asiria', 'Babilonia', 'Persia'],
          filas: [
            ['A quién movía', 'Poblaciones completas, en ambas direcciones', 'La familia real, la élite y los artesanos', 'Permitía volver'],
            ['La tierra', 'Repoblada con otros pueblos', 'Quedaba con los más pobres', 'Devuelta a sus pueblos'],
            ['Los dioses', 'Estatuas de dioses llevadas como botín', 'Objetos sagrados llevados a Babilonia (Dn 1:2)', 'Templos reconstruidos'],
            ['En la Biblia', '2 R 17:6, 24', '2 R 24:14-16; 25:11-12', 'Esd 1:2-3']
          ] } }
      ],
      texto: [
        'Babilonia no deportaba a pueblos enteros. Se llevaba a quienes podían dirigir una rebelión y a quienes tenían oficios útiles: la familia real, los príncipes, los soldados y los artesanos. En 597 a.C., Nabucodonosor llevó de Jerusalén «hasta diez mil cautivos, y a todos los artesanos y herreros; no quedó nadie, excepto los pobres del pueblo de la tierra» (2 R 24:14). Después de la destrucción de 586, a los más pobres se les dejó «para que labrasen las viñas y la tierra» (2 R 25:12).',
        'Esta política era distinta de la de Asiria. Cuando Asiria conquistó Samaria, llevó a los israelitas a lugares lejanos y trajo gente de otros pueblos para ocupar sus ciudades (2 R 17:6, 24); de esa mezcla surgieron los samaritanos. Babilonia, en cambio, no llenó Judá de extranjeros, y asentó a los deportados juntos. Ezequiel vivía con ellos en Tel-abib, «junto al río Quebar» (Ez 3:15), y los ancianos de Judá se reunían en su casa (Ez 8:1). Unas tablillas encontradas en Irak, llamadas de Al-Yahudu, «el pueblo de Judá», muestran desde 572 a.C. a familias judías trabajando la tierra y conservando nombres que honraban al Dios de Israel.',
        'El exilio fue doloroso. El Salmo 137 lo recuerda así: «Junto a los ríos de Babilonia, allí nos sentábamos, y aun llorábamos, acordándonos de Sion» (Sal 137:1). Sin embargo, Dios envió por medio de Jeremías una carta a los cautivos: «Edificad casas, y habitadlas; y plantad huertos» (Jer 29:5); casaos y multiplicaos (Jer 29:6); «procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová» (Jer 29:7). Y les dio una promesa: cumplidos los setenta años, «yo os visitaré… para haceros volver a este lugar» (Jer 29:10).',
        'Esa forma de exilio permitió que el pueblo conservara su identidad, su fe y la esperanza del regreso. Cuando Persia lo autorizó, hubo un pueblo listo para volver a Jerusalén y reconstruir el templo (Esd 1:2-3).'
      ],
      pensar: 'Dios mandó a los cautivos procurar la paz de la ciudad que los había deportado y orar por ella (Jer 29:7). ¿Qué significa para el creyente de hoy vivir como ciudadano del cielo y, al mismo tiempo, buscar el bien de la ciudad donde Dios lo ha puesto?'
    },
    {
      id: 'legado', n: 'El legado de Babilonia', ref: 'Isaías 47:13; Jeremías 32:9-14; Nehemías 1–2; Ester 3:7', fecha: [-626, -539],
      visual: [
        { tipo: 'tabla', titulo: 'Legado', tabla: {
          titulo: 'Lo que dejó Babilonia', cab: ['Legado', 'Qué era', 'Dónde lo vemos'],
          filas: [
            ['Base 60', 'Contar de 60 en 60', '60 minutos, 60 segundos, 360 grados'],
            ['Astronomía', 'Registros diarios del cielo y predicción de eclipses', 'La astronomía; el zodiaco surgió allí en época persa'],
            ['Nombres de los meses', 'Nisán, Siván, Elul, Quisleu, Tebet, Sebat, Adar', 'Nehemías, Ester, Zacarías y el calendario judío actual'],
            ['Escritura cuadrada', 'La escritura aramea', 'La letra de la Biblia hebrea impresa'],
            ['Documentos sellados', 'Contratos con testigos y copia guardada', 'La compra de Jeremías (Jer 32:10-14)'],
            ['Mirar el pasado', 'Nabonido excava templos antiguos; la colección de Ennigaldi; el mapa del mundo', 'La arqueología y los museos'],
            ['Leyes de Hammurabi', 'Código de la Babilonia antigua, c. 1750 a.C.', 'Se compara con la ley de Moisés']
          ],
          nota: 'Algunos legados son de toda la tradición mesopotámica, más antigua que el imperio. Que la colección de Ennigaldi haya sido un museo es la interpretación de su excavador y se discute.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-astronomo.webp', foco: '35% 50%', alt: 'Un astrónomo babilonio anota en una tablilla de arcilla la posición de los astros, de noche, en lo alto de un zigurat', pie: 'Un astrónomo de Babilonia registra el cielo nocturno.', origen: 'ia' }
      ],
      texto: [
        'Babilonia cayó hace más de dos mil quinientos años, pero dejó huellas que todavía usamos. Algunas vienen de toda la tradición de Mesopotamia, más antigua que el imperio de Nabucodonosor; otras nacieron o se perfeccionaron en el período que estudia este recurso.',
        { h: 'Contar el tiempo y mirar el cielo' },
        'Los escribas de Mesopotamia contaban en base 60. Por eso una hora tiene 60 minutos, un minuto 60 segundos y un círculo 360 grados. Los astrónomos de Babilonia observaron el cielo noche tras noche y anotaron lo que veían en tablillas que hoy se llaman diarios astronómicos, una serie que se mantuvo durante siglos; con esos registros aprendieron a predecir eclipses. El zodiaco de doce signos surgió allí, ya en época persa. La Biblia reconoce esa fama, pero muestra su límite: Isaías desafió a «los contempladores de los cielos, los que observan las estrellas, los que cuentan los meses» a salvar a Babilonia, y no pudieron (Is 47:13).',
        { h: 'Huellas en la Biblia' },
        'El exilio dejó una marca en el calendario del pueblo de Dios. Antes, la Biblia nombra los meses por su número o con nombres antiguos, como Abib (Éx 13:4) o Zif (1 R 6:1). Después del exilio aparecen los nombres babilónicos: Nisán, Siván, Elul, Quisleu, Tebet, Sebat y Adar (Neh 1:1; 2:1; 6:15; Zac 1:7). Ester incluso los explica: «el mes primero, que es el mes de Nisán» (Est 3:7). El calendario judío los usa hasta hoy. Algo parecido ocurrió con la escritura: durante el exilio y después de él, los judíos fueron adoptando la escritura aramea, de letras cuadradas, que reemplazó a la antigua escritura hebrea. Es la letra en que se imprime la Biblia hebrea hoy.',
        'Babilonia era también una sociedad de documentos: contratos, recibos y préstamos quedaban por escrito, sellados y con testigos. Así compró Jeremías un campo en Anatot mientras Jerusalén estaba sitiada: «escribí la carta y la sellé, y la hice certificar con testigos» (Jer 32:10), y guardó la escritura en una vasija de barro para que se conservara (Jer 32:14).',
        { h: 'Mirar el pasado' },
        'El último rey, Nabonido, excavaba los cimientos de templos antiguos para leer las inscripciones de quienes los habían construido, y por eso a veces se le llama el primer arqueólogo. Su hija Ennigaldi reunió en Ur objetos antiguos con etiquetas que los describían; su excavador lo interpretó como el museo más antiguo conocido, aunque esa lectura se discute. De alrededor de esta época se conserva también el mapa del mundo más antiguo que se conoce, una tablilla que pone a Babilonia en el centro. Y aunque es mil años anterior al imperio, el código de Hammurabi, de la Babilonia antigua, se siguió copiando durante siglos; es la colección de leyes antigua más conocida y suele compararse con la ley de Moisés.'
      ],
      pensar: 'Babilonia dejó al mundo números, calendarios y conocimientos, pero no pudo salvarse a sí misma (Is 47:13). ¿Qué diferencia hay entre el conocimiento humano, que también es un don de Dios, y la sabiduría que comienza con el temor de Jehová (Pr 9:10)?'
    }
  ];


  const biblia = [
    {
      id: 'historicos', n: 'Reyes y Crónicas', ref: '2 Reyes 24–25; 2 Crónicas 36; Jeremías 52', fecha: [-605, -562],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-jerusalen-sitiada.webp', alt: 'Jerusalén sitiada de noche, rodeada por los campamentos y torres de asedio del ejército babilónico', pie: 'Jerusalén sitiada por Babilonia, 588–586 a.C. (2 R 25:1-3).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: CRECIENTE, capas: ['babilonia-570'], lugares: ['jerusalen', 'laquis', 'mizpa', 'ribla', 'babilonia'], trazos: ['deportacion'] } },
        { tipo: 'tabla', titulo: 'Cronología', tabla: {
          titulo: 'Babilonia y Judá', cab: ['Año a.C.', 'Hecho', 'Texto'],
          filas: [
            ['605', 'Judá queda sometida a Babilonia; primeros cautivos', '2 R 24:1; Dn 1:1-3'],
            ['601–598', 'Joacim se rebela tras tres años de vasallaje', '2 R 24:1-2'],
            ['597', 'Joaquín se rinde; son llevados la élite y los artesanos; Sedequías es puesto como rey', '2 R 24:10-17'],
            ['588–586', 'Sitio de Jerusalén; hambre en la ciudad', '2 R 25:1-3'],
            ['586', 'Sedequías es juzgado en Ribla; el templo es quemado', '2 R 25:6-9'],
            ['c. 586–582', 'Gedalías gobierna desde Mizpa y es asesinado', '2 R 25:22-25'],
            ['562', 'Evil-merodac saca a Joaquín de la cárcel', '2 R 25:27-30']
          ],
          nota: 'La destrucción de Jerusalén se fecha en 586 o en 587 a.C., según cómo se cuenten los años de reinado.' } }
      ],
      texto: [
        'Los libros de los Reyes y de las Crónicas narran el final del reino de Judá, y los dos lo leen de la misma manera: lo que hizo Babilonia fue el cumplimiento de la palabra de Dios. Cuando Nabucodonosor envió tropas contra Joacim, el texto aclara que fue «conforme a la palabra de Jehová que había hablado por sus siervos los profetas» (2 R 24:2), y que vino «por mandato de Jehová» a causa de los pecados acumulados por Manasés (2 R 24:3).',
        'El relato avanza en tres golpes. Primero, Joacim pasó a ser vasallo de Babilonia y luego se rebeló (2 R 24:1). Después, en 597 a.C., su hijo Joaquín se rindió, y Nabucodonosor se llevó los tesoros del templo, la familia real, los soldados y los artesanos (2 R 24:10-16). Por último, Sedequías, el rey que Babilonia había puesto, también se rebeló (2 R 24:20). Siguió un sitio de año y medio, con hambre en la ciudad (2 R 25:1-3). Sedequías intentó huir, fue capturado, juzgado en Ribla y llevado ciego a Babilonia (2 R 25:6-7), y el capitán Nabuzaradán quemó la casa de Jehová (2 R 25:8-9).',
        { posturas: {
          titulo: '¿Diez mil cautivos o tres mil veintitrés?',
          a: { n: '2 Reyes', t: 'En la deportación de Joaquín, Nabucodonosor llevó «hasta diez mil cautivos», además de los artesanos y herreros (2 R 24:14), en el año octavo de su reinado (2 R 24:12).' },
          b: { n: 'Jeremías', t: 'Jeremías registra «tres mil veintitrés hombres de Judá» llevados en el año séptimo de Nabucodonosor (Jer 52:28).' },
          c: 'No son dos cuentas del mismo grupo. Jeremías cuenta a los «hombres de Judá» de un año distinto, el séptimo, y Reyes da el total de los que salieron con el rey en el año octavo, incluyendo a la gente de Jerusalén, los soldados y los artesanos. Ambos textos se complementan: la deportación ocurrió en más de una etapa.'
        } },
        'Crónicas agrega la razón más profunda. Dios había enviado mensajeros una y otra vez, «porque él tenía misericordia de su pueblo», pero ellos «hacían escarnio de los mensajeros de Dios» hasta que «no hubo ya remedio» (2 Cr 36:15-16). Aun así, los dos libros terminan con esperanza: Reyes, con el rey Joaquín liberado y comiendo a la mesa del rey de Babilonia (2 R 25:27-30); Crónicas, con el decreto de Ciro que permite volver (2 Cr 36:22-23).'
      ],
      pensar: 'Dios envió sus mensajeros «constantemente», porque tenía misericordia de su pueblo (2 Cr 36:15). ¿Qué nos enseña esto acerca de la paciencia de Dios y del peligro de menospreciar su Palabra?'
    },
    {
      id: 'profetas-antes', n: 'Los profetas antes del exilio', ref: 'Isaías 39; 13–14; 47; Miqueas 4:10; Habacuc 1–3; Jeremías 25; 27; 29; 50–51', fecha: [-701, -586],
      visual: [
        { tipo: 'tabla', titulo: 'Profecías', tabla: {
          titulo: 'Babilonia anunciada por los profetas', cab: ['Texto', 'Qué anuncia', 'Cumplimiento'],
          filas: [
            ['Is 39:5-7', 'Los tesoros y descendientes de Ezequías irán a Babilonia', '605–586 a.C.'],
            ['Mi 4:10', 'Sion irá a Babilonia y allí será redimida', 'Exilio y regreso'],
            ['Hab 1:6', 'Dios levanta a los caldeos para juzgar a Judá', '605–586 a.C.'],
            ['Jer 25:11; 29:10', 'Setenta años de servidumbre y luego el regreso', '539–538 a.C.; Dn 9:2'],
            ['Is 13:17-19; 21:9; Jer 51', 'Los medos derribarán a Babilonia', '539 a.C.'],
            ['Is 44:28; 45:1', 'Ciro, llamado por su nombre, reconstruirá Jerusalén', 'Esd 1:1-4']
          ],
          nota: 'Los setenta años se cuentan desde 605 (primera deportación) o desde 586 (destrucción del templo, hasta su reconstrucción en 516); ambos cálculos dan alrededor de setenta.' } },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Aunque la higuera no florezca, ni en las vides haya frutos… con todo, yo me alegraré en Jehová, y me gozaré en el Dios de mi salvación.', ref: 'Habacuc 3:17-18' }
      ],
      texto: [
        'Babilonia aparece en los profetas mucho antes de ser un imperio. En tiempos de Ezequías, cuando la gran potencia era Asiria, Isaías anunció que los tesoros del palacio y algunos descendientes del rey serían llevados a Babilonia (Is 39:6-7). Su contemporáneo Miqueas fue más lejos: Sion saldría de la ciudad y «llegarás hasta Babilonia; allí serás librada, allí te redimirá Jehová» (Mi 4:10). El exilio y el regreso quedaron anunciados en una sola frase. Isaías anunció también la caída de Babilonia (Is 13:19; 47:1) y llamó por su nombre a Ciro, el rey que permitiría el regreso (Is 44:28; 45:1).',
        { h: 'Habacuc: la pregunta del justo' },
        'Habacuc vivió el ascenso de Babilonia y se atrevió a preguntarle a Dios. Primero se quejó de la violencia en Judá, y Dios le respondió: «yo levanto a los caldeos» (Hab 1:6). Entonces surgió una pregunta más difícil: ¿cómo puede un Dios santo usar a una nación más malvada que su pueblo (Hab 1:13)? La respuesta fue un principio que el Nuevo Testamento retoma varias veces: «el justo por su fe vivirá» (Hab 2:4). Babilonia sería juzgada a su tiempo, y el profeta terminó con un canto de confianza aun en medio de la escasez (Hab 3:17-18).',
        { h: 'Jeremías: el profeta de la crisis' },
        'Ninguno vivió la crisis tan de cerca como Jeremías. Durante cuarenta años advirtió a Judá, y su mensaje parecía una traición: «Someted vuestros cuellos al yugo del rey de Babilonia, y servidle… y vivid» (Jer 27:12). Anunció setenta años de servidumbre (Jer 25:11) y escribió a los ya deportados que edificaran casas y buscaran la paz de la ciudad, porque Dios los haría volver (Jer 29:7, 10). Al caer Jerusalén, el propio Nabucodonosor ordenó cuidarlo (Jer 39:11-12). Y fue Jeremías quien escribió las profecías más extensas contra Babilonia (Jer 50–51): el instrumento del juicio también sería juzgado.'
      ],
      pensar: 'Habacuc no entendía lo que Dios hacía, pero decidió alegrarse en Jehová aunque faltara todo (Hab 3:17-18). ¿Qué significa vivir «por la fe» (Hab 2:4) cuando no entendemos lo que está pasando?'
    },
    {
      id: 'profetas-exilio', n: 'Los profetas del exilio: Ezequiel y Daniel', ref: 'Ezequiel 1; 24; 33; 36–37; Daniel 1–7', fecha: [-597, -539],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-ezequiel-quebar.webp', foco: '55% 50%', alt: 'El profeta Ezequiel habla a un grupo de deportados judíos junto a un canal de riego en Babilonia', pie: 'Ezequiel entre los deportados, junto al río Quebar.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[30.6, 43.2], [33.6, 47.2]], capas: ['babilonia-570'], lugares: ['babilonia', 'nipur', 'tel-abib'] } }
      ],
      texto: [
        'Dos profetas vivieron el exilio dentro de Babilonia, y cada uno muestra un lado distinto de esa experiencia: Ezequiel, entre el pueblo deportado; Daniel, en el palacio del rey.',
        { h: 'Ezequiel, entre los deportados' },
        'Ezequiel era sacerdote y fue llevado a Babilonia con el rey Joaquín en 597 a.C. Cinco años después, junto al río Quebar, recibió una visión de la gloria de Dios (Ez 1:1-3): el Dios de Israel no estaba encerrado en el templo de Jerusalén, sino presente también entre los cautivos. Desde allí siguió los hechos a la distancia. El mismo día en que Nabucodonosor comenzó el sitio de Jerusalén, Dios le mandó escribir la fecha (Ez 24:1-2), y unos años después llegó un fugitivo con la noticia: «La ciudad ha sido conquistada» (Ez 33:21).',
        'Después de la caída, el mensaje de Ezequiel cambió del juicio a la esperanza. Dios prometió un corazón nuevo y algo más: «pondré dentro de vosotros mi Espíritu» (Ez 36:26-27). La visión de los huesos secos que vuelven a la vida (Ez 37) anunció que el pueblo, que se sentía muerto en el exilio, sería restaurado por el Espíritu de Dios.',
        { h: 'Daniel, en la corte' },
        'Daniel es el único libro que muestra a Babilonia desde el interior del palacio: la escuela del rey (Dn 1), los sueños de Nabucodonosor (Dn 2 y 4), la estatua de oro (Dn 3) y la última noche de Belsasar (Dn 5). En sus visiones, Babilonia es el primero de los imperios: la cabeza de oro de la estatua (Dn 2:38) y el león con alas de águila (Dn 7:4). Ezequiel menciona a Daniel como ejemplo de justicia, junto a Noé y Job (Ez 14:14); la mayoría de los intérpretes conservadores lo identifica con el Daniel que servía en Babilonia. El estudio del libro de Daniel profundiza en todo esto.'
      ],
      pensar: 'En el exilio, Dios prometió a su pueblo un corazón nuevo y su Espíritu dentro de ellos (Ez 36:26-27). ¿Cómo se cumple esa promesa en la vida del creyente hoy, y qué cambia cuando el Espíritu de Dios habita en una persona?'
    },
    {
      id: 'poesia', n: 'El dolor hecho oración: Salmos y Lamentaciones', ref: 'Salmo 137; 79; Lamentaciones 1–5; Abdías 11-12', fecha: -586,
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-arpas-sauces.webp', alt: 'Cautivos judíos sentados junto a un río de Babilonia, con sus arpas colgadas de los sauces', pie: '«Sobre los sauces en medio de ella colgamos nuestras arpas» (Salmo 137:2).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.', ref: 'Lamentaciones 3:22-23' }
      ],
      texto: [
        'Los libros históricos cuentan lo que pasó; la poesía de la Biblia cuenta lo que se sintió. La destrucción de Jerusalén dejó una herida que el pueblo de Dios llevó a la oración, y esas oraciones quedaron en las Escrituras.',
        { h: 'Lamentaciones' },
        'Lamentaciones son cinco poemas sobre la ciudad destruida, que la tradición atribuye a Jeremías. Cuatro de ellos son acrósticos: cada estrofa comienza con una letra sucesiva del alfabeto hebreo, como si el dolor se dijera completo, de la primera a la última letra. El libro abre con una imagen desoladora: «¡Cómo ha quedado sola la ciudad populosa!» (Lm 1:1). No esconde la causa: Jerusalén había pecado (Lm 1:8). Pero en el centro del libro, rodeado de ruinas, aparece uno de los textos de esperanza más conocidos de la Biblia: «Por la misericordia de Jehová no hemos sido consumidos… Nuevas son cada mañana; grande es tu fidelidad» (Lm 3:22-23).',
        { h: 'Los Salmos' },
        'El Salmo 79 clama: «Oh Dios, vinieron las naciones a tu heredad; han profanado tu santo templo; redujeron a Jerusalén a escombros» (Sal 79:1). El Salmo 137 nos lleva a Babilonia. Junto a sus ríos, los cautivos colgaron sus arpas en los sauces (Sal 137:1-2), y cuando sus captores les pidieron cantos de Sion, respondieron: «¿Cómo cantaremos cántico de Jehová en tierra de extraños?» (Sal 137:4). El salmo recuerda también a Edom, que se alegró de la caída de Jerusalén (Sal 137:7), lo mismo que denuncia el profeta Abdías (Abd 11-12).',
        'El final del Salmo 137 es duro (Sal 137:8-9). Es el clamor de un pueblo herido que pide a Dios justicia contra el opresor, con las mismas palabras con que los profetas habían anunciado el juicio de Babilonia. No es una invitación a la venganza personal: el creyente deja la justicia en manos de Dios, que dice «Mía es la venganza, yo pagaré» (Ro 12:19).'
      ],
      pensar: 'Lamentaciones y el Salmo 137 presentan ante Dios el dolor sin disfrazarlo, y aun así encuentran su fidelidad (Lm 3:22-23). ¿Cómo podemos llevar nuestro dolor a Dios con honestidad sin perder la esperanza?'
    },
    {
      id: 'regreso', n: 'El regreso: Esdras y Nehemías', ref: 'Esdras 1; 5–7; Nehemías 1–2; 6; Zacarías 2:7; Daniel 9:2', fecha: [-538, -445],
      visual: [
        { tipo: 'tabla', titulo: 'Regresos', tabla: {
          titulo: 'De Babilonia a Jerusalén', cab: ['Año a.C.', 'Quién', 'Qué ocurre', 'Texto'],
          filas: [
            ['538', 'Sesbasar y Zorobabel', 'Primer regreso, con los utensilios del templo; 42.360 personas', 'Esd 1–2'],
            ['520–516', 'Zorobabel y Josué, animados por Hageo y Zacarías', 'Se reconstruye y termina el templo', 'Esd 5:1; 6:15'],
            ['458', 'Esdras', 'Regresa un grupo con el escriba y la ley', 'Esd 7:6-9'],
            ['445', 'Nehemías', 'Se reconstruyen los muros en 52 días', 'Neh 2:1; 6:15']
          ],
          nota: 'Las fechas siguen la cronología más aceptada para Esdras y Nehemías.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-reconstruccion-templo.webp', alt: 'Judíos que regresan reconstruyen los cimientos del templo en Jerusalén', pie: 'La reconstrucción del templo en Jerusalén.', origen: 'ia' }
      ],
      texto: [
        'La historia de Babilonia en la Biblia no termina con su caída, sino con el regreso. Daniel, ya anciano, leyó en el libro de Jeremías que las desolaciones de Jerusalén durarían setenta años (Dn 9:2), y vio cumplirse la promesa: en el primer año de Ciro, «para que se cumpliese la palabra de Jehová por boca de Jeremías», Dios despertó el espíritu del rey persa para que permitiera volver (Esd 1:1).',
        'El primer grupo salió hacia 538 a.C. Volvieron «todos aquellos cuyo espíritu despertó Dios para subir a edificar la casa de Jehová» (Esd 1:5). Con ellos viajaron los utensilios del templo «que Nabucodonosor había sacado de Jerusalén» (Esd 1:7): los mismos vasos que Belsasar había usado en su banquete regresaban a su lugar. La obra encontró oposición y se detuvo, hasta que los profetas Hageo y Zacarías animaron al pueblo (Esd 5:1), y el templo se terminó «el tercer día del mes de Adar», hacia 516 a.C. (Esd 6:15).',
        'Zacarías llamó a los que todavía vivían en Babilonia: «Oh Sion, la que moras con la hija de Babilonia, escápate» (Zac 2:7). Décadas después volvieron otros grupos. Esdras, «escriba diligente en la ley de Moisés», subió de Babilonia para enseñar la ley (Esd 7:6), y Nehemías, que había sido copero del rey de Persia, reconstruyó los muros de Jerusalén en cincuenta y dos días (Neh 6:15).',
        'No todos regresaron. Muchos judíos se quedaron en Mesopotamia, y allí floreció durante más de mil años una de las comunidades judías más importantes del mundo, donde siglos después se escribió el Talmud de Babilonia. El exilio, que parecía el fin del pueblo, fue también el lugar donde Dios lo preservó.'
      ],
      pensar: 'Volvieron a Jerusalén «todos aquellos cuyo espíritu despertó Dios» (Esd 1:5). ¿Cómo despierta Dios hoy el espíritu de su pueblo para su obra, y qué te está llamando a reconstruir a ti?'
    },
    {
      id: 'nuevo-testamento', n: 'Babilonia en el Nuevo Testamento', ref: 'Mateo 1:11-17; Hechos 7:43; 1 Pedro 5:13; Apocalipsis 14:8; 17–18',
      visual: [
        { tipo: 'tabla', titulo: 'Textos', tabla: {
          titulo: 'Babilonia en el Nuevo Testamento', cab: ['Texto', 'Cómo aparece', 'Sentido'],
          filas: [
            ['Mt 1:11-12, 17', 'La genealogía de Jesús, dividida por «la deportación a Babilonia»', 'Histórico'],
            ['Hch 7:43', 'Esteban recuerda el exilio como castigo de la idolatría', 'Histórico'],
            ['1 P 5:13', '«La iglesia que está en Babilonia»', 'Probablemente Roma; otros, la ciudad de Mesopotamia'],
            ['Ap 14:8; 16:19', '«Ha caído, ha caído Babilonia»', 'Profético'],
            ['Ap 17–18', '«Babilonia la grande» y su destrucción', 'Profético: el sistema del mundo en el tiempo del fin']
          ] } },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Salid de ella, pueblo mío, para que no seáis partícipes de sus pecados, ni recibáis parte de sus plagas.', ref: 'Apocalipsis 18:4' }
      ],
      texto: [
        'Babilonia ya no existía como imperio en tiempos de Jesús, pero el Nuevo Testamento la nombra de dos maneras: como un recuerdo histórico y como un símbolo profético.',
        'Mateo organiza la genealogía de Jesús en tres grupos de catorce generaciones, y uno de los cortes es precisamente «la deportación a Babilonia» (Mt 1:17). Jeconías, el rey Joaquín llevado cautivo, aparece en la lista, y después de él vienen Salatiel y Zorobabel, el que dirigió el regreso (Mt 1:11-12). La promesa hecha a David sobrevivió al exilio y llegó hasta Cristo. Esteban, en su defensa ante el concilio, recordó el exilio como consecuencia de la idolatría de Israel (Hch 7:43); al citar a Amós, que había dicho «más allá de Damasco» (Am 5:27), Esteban resume toda la historia hasta la deportación más lejana, «más allá de Babilonia».',
        'Pedro termina su primera carta con un saludo de «la iglesia que está en Babilonia» (1 P 5:13). La mayoría de los intérpretes entiende que usa «Babilonia» como nombre simbólico de Roma, la capital del imperio de su tiempo; otros piensan en la comunidad judía que seguía viviendo en Mesopotamia.',
        { h: 'Babilonia la grande' },
        'En el Apocalipsis, Babilonia es el nombre del sistema mundial que se levanta contra Dios en el tiempo del fin: una ciudad seductora, rica y perseguidora de los santos (Ap 17–18). En la interpretación que sigue este estudio, su juicio pertenece a los acontecimientos futuros de la Tribulación, antes del regreso glorioso de Cristo (Ap 19). El final repite el gesto de Jeremías: así como Seraías arrojó al Éufrates el libro atado a una piedra (Jer 51:63-64), un ángel arroja una gran piedra de molino al mar, diciendo que Babilonia «nunca más será hallada» (Ap 18:21). Y el llamado de Dios a su pueblo es el mismo que hizo Zacarías: «Salid de ella, pueblo mío» (Ap 18:4).'
      ],
      pensar: 'Dios llama a su pueblo a salir de Babilonia «para que no seáis partícipes de sus pecados» (Ap 18:4). ¿Qué significa hoy para el creyente vivir en el mundo sin participar del sistema que se opone a Dios?'
    },
    {
      id: 'arqueologia', n: 'La evidencia arqueológica', ref: '2 Reyes 24:10-17; 25:27-30; Jeremías 34:7; 39:3; Daniel 5; Esdras 1', fecha: [-597, -539],
      visual: [
        { tipo: 'tabla', titulo: 'Hallazgos', tabla: {
          titulo: 'Hallazgos y textos bíblicos', cab: ['Hallazgo', 'Qué dice', 'Texto bíblico'],
          filas: [
            ['Crónica babilónica (Museo Británico)', 'Nabucodonosor toma Jerusalén en marzo de 597, captura al rey y pone a otro de su elección', '2 R 24:10-17'],
            ['Tablillas de raciones (Babilonia)', 'Raciones de aceite para «Joaquín, rey de Judá» y sus hijos', '2 R 25:29-30'],
            ['Cartas de Laquis', 'Un oficial escribe que vigilan las señales de Laquis y que ya no ven las de Azeca', 'Jer 34:7'],
            ['Tablilla de Nabu-sharrussu-ukin (Museo Británico)', 'Nombra a un alto funcionario de Nabucodonosor en 595 a.C.', 'Jer 39:3'],
            ['Cilindros de Nabonido (Ur)', 'Nabonido ora por su hijo mayor, Bel-shar-usur', 'Belsasar (Dn 5)'],
            ['Tablillas de Al-Yahudu', 'Vida de familias judías en Babilonia entre 572 y 477 a.C.', 'Jer 29:5-7'],
            ['Cilindro de Ciro (Babilonia)', 'Ciro devuelve a los pueblos sus dioses y sus hogares', 'Esd 1:1-4']
          ] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/babilonia-excavacion.webp', foco: '40% 60%', alt: 'Arqueólogos y obreros descubren muros de ladrillos vidriados azules en las ruinas de Babilonia, hacia 1905', pie: 'Recreación de las excavaciones de Babilonia a comienzos del siglo XX.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: CRECIENTE, capas: ['babilonia-570'], lugares: ['babilonia', 'ur', 'laquis', 'jerusalen'] } }
      ],
      texto: [
        'Babilonia es uno de los períodos de la historia bíblica mejor documentados fuera de la Biblia. Sus escribas registraban todo en tablillas de arcilla, que resisten el paso del tiempo mejor que el papiro o el pergamino, y muchas de ellas mencionan personas y hechos que aparecen en las Escrituras.',
        'La Crónica babilónica, una tablilla que resume los años de Nabucodonosor, registra que en el séptimo año de su reinado sitió «la ciudad de Judá», la tomó el segundo día del mes de adar, capturó al rey y puso en su lugar a uno de su elección: es la rendición de Joaquín y el nombramiento de Sedequías (2 R 24:10-17), con fecha exacta, marzo de 597 a.C. En las excavaciones de Babilonia aparecieron listas de raciones de aceite entregadas a cautivos del palacio, y entre ellos figura «Joaquín, rey de Judá», con sus hijos, como dice el final de Reyes (2 R 25:29-30).',
        'En Laquis, una de las últimas ciudades fortificadas de Judá, se encontraron cartas de un oficial que dice que vigilan las señales de Laquis porque ya no ven las de Azeca, exactamente las dos ciudades que, según Jeremías, quedaban en pie (Jer 34:7). En el Museo Británico se identificó una tablilla de 595 a.C. que nombra a Nabu-sharrussu-ukin, alto funcionario de Nabucodonosor; muchos lo relacionan con «Sarsequim», uno de los príncipes presentes en la caída de Jerusalén (Jer 39:3).',
        'Durante siglos, Belsasar solo se conocía por Daniel, y algunos críticos pensaban que el libro se había equivocado. A mediados del siglo XIX aparecieron en Ur unos cilindros en que el rey Nabonido ora por su hijo mayor, Bel-shar-usur: Belsasar. Y el Cilindro de Ciro, hallado en Babilonia, describe la política del rey persa de devolver a los pueblos deportados sus dioses y sus hogares, la misma que permitió el regreso narrado en Esdras (Esd 1:1-4).',
        'La arqueología no es la base de la fe, pero ilumina el texto bíblico y muestra que sus relatos se escribieron en un mundo real, con personas, fechas y lugares que todavía pueden encontrarse.'
      ],
      pensar: 'Durante siglos, Belsasar solo se conoció por la Biblia, hasta que la arqueología lo encontró. Si «la fe es por el oír, y el oír, por la palabra de Dios» (Ro 10:17), ¿qué lugar ocupan los hallazgos arqueológicos en la vida del creyente?'
    }
  ];

  window.RUTA_DATA = {
    titulo: 'El imperio babilónico',
    credito: 'Citas bíblicas: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso. Fronteras de los mapas aproximadas.',
    marca: 'Recursos Bíblicos',
    inicio: '../../',
    rutas: [
      { id: 'historia', grupo: 'El imperio babilónico', n: 'Historia', info: 'Origen, territorio, reyes y caída',
        linea: { desde: -680, hasta: -530, hitos: [
          { a: -626, t: 'Nabopolasar' }, { a: -605, t: 'Carquemis' }, { a: -586, t: 'Cae el templo' },
          { a: -562, t: 'Muere Nabucodonosor' }, { a: -539, t: 'Cae Babilonia' }
        ] },
        estaciones: historia },
      { id: 'sociedad', grupo: 'El imperio babilónico', n: 'Sociedad y religión', info: 'La ciudad, la vida diaria, sus dioses, su trato a los conquistados y su legado',
        linea: { desde: -680, hasta: -530, hitos: [
          { a: -626, t: 'Nabopolasar' }, { a: -605, t: 'Daniel llevado cautivo' }, { a: -586, t: 'Cae el templo' },
          { a: -572, t: 'Tablillas de Al-Yahudu' }, { a: -539, t: 'Cae Babilonia' }
        ] },
        estaciones: sociedad },
      { id: 'biblia', grupo: 'El imperio babilónico', n: 'El imperio y la Biblia', info: 'Babilonia en cada parte de la Biblia y en la arqueología',
        linea: { desde: -720, hasta: -430, hitos: [
          { a: -701, t: 'Isaías anuncia el exilio' }, { a: -605, t: 'Primera deportación' }, { a: -586, t: 'Cae el templo' },
          { a: -539, t: 'Cae Babilonia' }, { a: -516, t: 'Templo reconstruido' }, { a: -445, t: 'Muros de Nehemías' }
        ] },
        estaciones: biblia }
    ]
  };
})();
