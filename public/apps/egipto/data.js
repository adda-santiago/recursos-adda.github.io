/* ==========================================================
   Recursos Bíblicos — Egipto · contenido de las rutas
   Motor: ../assets/js/ruta-estudio.js (formato descrito en su encabezado).
   Geografía: ../assets/js/imperios-geo.js. Citas textuales: Reina-Valera 1960.
   Las referencias del texto se vuelven burbujas con citas.js (texto en /biblia/).
   Diferencias entre la historia y el texto bíblico: bloque { posturas } con
   ambas versiones y cómo se entienden; nunca se presenta el texto bíblico como error.
   En temas doctrinales prevalece la línea pentecostal clásica (Asambleas de Dios).
   Fechas: cronología convencional de Egipto; para la Biblia, la cronología
   del texto (Éxodo hacia 1446 a.C., según 1 Reyes 6:1).
   ========================================================== */
(() => {
  const NILO = [[22, 26], [33, 36]];
  const DELTA = [[29.3, 29.8], [31.8, 34.6]];
  const LEVANTE_EGIPTO = [[22, 26], [38, 42]];
  const REGION = [[17, 18], [43, 50]];

  /* ---------------- Ruta 1 · Historia ---------------- */
  const historia = [
    {
      id: 'en-la-biblia', n: 'Egipto en la Biblia', ref: 'Génesis 12:10; Éxodo 20:2; Isaías 31:1; Mateo 2:13-15; Apocalipsis 11:8', fecha: [-2100, -30],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-piramides.webp', alt: 'Las pirámides de Giza junto al Nilo al atardecer, con barcas de vela en el río', pie: 'Las pirámides de Giza y el Nilo.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: LEVANTE_EGIPTO, capas: ['egipto-1900'], lugares: ['menfis', 'gosen', 'tebas', 'jerusalen'] } }
      ],
      texto: [
        'Después de Israel, pocas naciones aparecen tantas veces en la Biblia como Egipto. Está presente desde Génesis hasta Apocalipsis, y casi siempre en uno de tres papeles: refugio, opresor o falsa esperanza.',
        'Egipto fue refugio. Abraham descendió allá en tiempos de hambre (Gn 12:10); José llegó como esclavo y terminó gobernando el país, y Jacob y su familia se establecieron en la tierra de Gosén. Siglos después, José y María huyeron a Egipto con el niño Jesús para protegerlo de Herodes (Mt 2:13-15).',
        'Egipto fue también el opresor. Los descendientes de Jacob se convirtieron en esclavos, y la liberación de Egipto se volvió el gran acto de salvación del Antiguo Testamento. Dios se presenta a su pueblo en los Diez Mandamientos con esas palabras: «Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto, de casa de servidumbre» (Éx 20:2).',
        'Y Egipto fue la falsa esperanza. Cuando Asiria y Babilonia amenazaban, los reyes de Judá buscaron la ayuda del faraón en lugar de confiar en Dios, y los profetas lo denunciaron: «¡Ay de los que descienden a Egipto por ayuda… y no miran al Santo de Israel, ni buscan a Jehová!» (Is 31:1). En el Apocalipsis, el nombre llega a usarse como símbolo del mundo que se opone a Dios (Ap 11:8).',
        'A diferencia de los otros imperios de esta serie, Egipto no fue una potencia de pocos siglos: su historia abarca casi tres mil años, desde la unificación del país hacia 3100 a.C. hasta la conquista romana en 30 a.C. Esta ruta recorre esas épocas y muestra en cuál de ellas se ubica cada relato bíblico.'
      ],
      pensar: 'Egipto fue para Israel un refugio, una casa de esclavitud y una falsa esperanza. ¿En qué momentos de tu vida has buscado seguridad en «Egipto» en lugar de buscarla en Dios?'
    },
    {
      id: 'nilo', n: 'El Nilo y la tierra', ref: 'Génesis 41:1-4; 45:10; 47:6; Deuteronomio 11:10-11; Ezequiel 29:3', fecha: [-3100, -30],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: NILO, capas: ['egipto-1900'], lugares: ['menfis', 'tebas', 'gosen', 'on', 'tanis', 'elefantina', 'giza'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-nilo.webp', alt: 'Campos verdes de cultivo a orillas del Nilo, con el desierto dorado a pocos metros', pie: 'La franja fértil del Nilo y el desierto que la rodea.', origen: 'ia' }
      ],
      texto: [
        'Egipto es un país de desierto atravesado por un río. El Nilo corre de sur a norte por más de seis mil kilómetros, y en su último tramo dibuja una franja verde de pocos kilómetros de ancho, rodeada de arena. Antes de llegar al Mediterráneo se abre en varios brazos y forma el Delta, una gran llanura fértil. El historiador griego Heródoto escribió que Egipto era «un don del Nilo».',
        'Cada año, entre julio y octubre, el río crecía con las lluvias del interior de África, inundaba los campos y dejaba al bajar una capa de limo negro y fértil. Los egipcios llamaban a su país Kemet, «la tierra negra», por ese limo. Si la crecida era buena, había abundancia; si fallaba, había hambre. Por eso el sueño de Faraón comienza «junto al río», del que salían siete vacas gordas y siete flacas (Gn 41:1-4). Moisés recordó al pueblo la diferencia con Canaán: en Egipto se sembraba y se regaba «con tu pie», mediante canales, mientras que la tierra prometida «bebe las aguas de la lluvia del cielo» (Dt 11:10-11).',
        'El país estaba dividido en dos regiones: el Alto Egipto, el largo valle del sur, y el Bajo Egipto, el Delta del norte. La corona del faraón unía las dos. En el borde oriental del Delta estaba la tierra de Gosén, buena para el pastoreo, donde José estableció a su familia (Gn 45:10; 47:6).',
        'El río era también un dios. Los egipcios adoraban al Nilo en la figura de Hapi, y el faraón se presentaba como quien garantizaba sus crecidas. Ezequiel desenmascaró ese orgullo: Dios está contra Faraón, «el cual dijo: Mío es el Nilo, pues yo lo hice» (Ez 29:3).'
      ],
      pensar: 'Egipto dependía de su río, y Canaán dependía de la lluvia que Dios enviaba (Dt 11:11-12). ¿Qué diferencia hay entre vivir confiando en lo que uno controla y vivir dependiendo cada día de Dios?'
    },
    {
      id: 'epocas', n: 'Las grandes épocas', ref: 'Génesis 12; 41; Éxodo 1:8-11; 12:40-41; 1 Reyes 6:1', fecha: [-3100, -30],
      visual: [
        { tipo: 'tabla', titulo: 'Épocas', tabla: {
          titulo: 'Las épocas de Egipto y la Biblia', cab: ['Época', 'Fechas aprox.', 'Qué ocurre', 'En la Biblia'],
          filas: [
            ['Reino Antiguo', '2686–2181 a.C.', 'Pirámides de Giza', 'Antes de Abraham'],
            ['Reino Medio', '2055–1650 a.C.', 'Prosperidad, obras de riego', 'Abraham (Gn 12) y José (Gn 37–50)'],
            ['Segundo Período Intermedio', '1650–1550 a.C.', 'Los hicsos, pueblos semitas, gobiernan el Delta', 'Israel en Egipto'],
            ['Reino Nuevo', '1550–1069 a.C.', 'Imperio de Tutmosis III y Ramsés II', 'Opresión y Éxodo'],
            ['Tercer Período Intermedio', '1069–664 a.C.', 'Egipto dividido; faraones libios y nubios', 'Salomón, Sisac, So, Tirhaca'],
            ['Período Tardío', '664–332 a.C.', 'Dinastía de Sais; dominio persa', 'Necao, Hofra; Jeremías en Egipto'],
            ['Ptolomeos y Roma', '332 a.C.–', 'Alejandro, los Ptolomeos, Cleopatra, Roma', 'Daniel 11; la huida a Egipto']
          ],
          nota: 'Las fechas siguen la cronología convencional de Egipto. La ubicación de Abraham, José y el Éxodo sigue la cronología del texto bíblico (1 R 6:1; Éx 12:40); otras propuestas los ubican más tarde.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-escribas.webp', alt: 'Escribas egipcios sentados con las piernas cruzadas escriben en rollos de papiro en un patio de templo', pie: 'Escribas del Reino Medio.', origen: 'ia' }
      ],
      texto: [
        'Los historiadores dividen la larga historia de Egipto en «reinos», épocas de unidad y fuerza, separados por «períodos intermedios», épocas de división. Conocer esas épocas ayuda a ubicar los relatos bíblicos.',
        'El Reino Antiguo fue el tiempo de las grandes pirámides, levantadas hacia 2600–2500 a.C. Ya eran monumentos antiguos cuando Abraham llegó a Egipto. El Reino Medio fue una época de prosperidad, con grandes obras de riego, y es el trasfondo más probable de Abraham y de José si se sigue la cronología que da el propio texto bíblico. Después vino un período de división en el que pueblos semitas llamados hicsos gobernaron el Delta.',
        'El Reino Nuevo, desde 1550 a.C., fue la época del imperio: los faraones expulsaron a los hicsos y extendieron su dominio hasta Canaán y Siria. Un faraón de este tiempo fue el «nuevo rey que no conocía a José» (Éx 1:8), y en esta época ocurrió el Éxodo. La Biblia da dos datos que permiten calcularlo: Israel vivió en Egipto cuatrocientos treinta años (Éx 12:40-41), y Salomón comenzó el templo «en el año cuatrocientos ochenta después que los hijos de Israel salieron de Egipto» (1 R 6:1), lo que lleva a una fecha cercana a 1446 a.C.',
        'Desde el año 1000 a.C., Egipto fue perdiendo fuerza. Gobernaron faraones de origen libio y luego nubio, y después la dinastía de Sais, que intentó recuperar Siria y chocó con Babilonia. Finalmente fue conquistado por Persia, por Alejandro Magno y por Roma. En esos siglos aparecen en la Biblia los faraones con nombre propio: Sisac, So, Tirhaca, Necao y Hofra.'
      ],
      pensar: 'Egipto vivió épocas de esplendor y de decadencia, pero el plan de Dios con su pueblo siguió adelante en todas ellas. ¿Qué te enseña esto acerca de la fidelidad de Dios a través de las distintas etapas de tu vida?'
    },
    {
      id: 'reino-nuevo', n: 'El imperio del Reino Nuevo', ref: 'Éxodo 1:8-11; Jueces 1–3; 1 Reyes 6:1', fecha: [-1550, -1069],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: 'c. 1550 a.C.: Ahmosis expulsa a los hicsos y reunifica Egipto.', fecha: -1550,
            estado: { view: LEVANTE_EGIPTO, capas: ['egipto-1900'], lugares: ['tebas', 'menfis', 'tanis'] } },
          { t: 'c. 1457 a.C.: Tutmosis III vence en Meguido; Egipto domina Canaán y Siria.', fecha: -1457,
            estado: { view: LEVANTE_EGIPTO, capas: ['egipto-1450'], lugares: ['tebas', 'meguido', 'carquemis'] } },
          { t: 'c. 1350 a.C.: las cartas de Amarna muestran a Canaán pidiendo ayuda al faraón.', fecha: -1350,
            estado: { view: [[28, 30], [37, 40]], capas: ['egipto-1450'], lugares: ['amarna', 'jerusalen', 'meguido', 'gezer'] } },
          { t: '1274 a.C.: Ramsés II se enfrenta a los hititas en Qadés.', fecha: -1274,
            estado: { view: [[24, 26], [42, 42]], capas: ['egipto-1274', 'hititas-1300'], lugares: ['rameses', 'qades', 'tebas'] } }
        ] },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-ramses.webp', alt: 'El faraón Ramsés II en su carro de guerra dirige su ejército en el desierto', pie: 'Ramsés II, el faraón más famoso del Reino Nuevo.', origen: 'ia' }
      ],
      texto: [
        'Hacia 1550 a.C., el faraón Ahmosis expulsó a los hicsos y reunificó Egipto. Sus sucesores llevaron la guerra fuera del país. Tutmosis III, el gran conquistador, venció a una alianza de reyes cananeos en Meguido hacia 1457 a.C. y llegó hasta el río Éufrates. Durante más de dos siglos, Canaán fue una provincia egipcia, con guarniciones y reyes locales que pagaban tributo.',
        'Un archivo descubierto en Amarna, la capital del faraón Akenatón, muestra cómo era ese dominio hacia 1350 a.C. Son cartas de reyes de Canaán, entre ellos el rey de Jerusalén, que piden soldados al faraón porque sus ciudades están amenazadas por bandas llamadas «habiru». Muchos estudiosos han discutido si esos habiru tienen relación con los hebreos; el nombre es parecido, pero designa a grupos de distintos orígenes, y la relación no es segura.',
        'El faraón más famoso de esta época es Ramsés II (1279–1213 a.C.), gran constructor y guerrero. En 1274 a.C. se enfrentó a los hititas en Qadés, en Siria, en una batalla sin vencedor claro, y años después firmó con ellos uno de los primeros tratados de paz conocidos. Construyó una nueva capital en el Delta, Pi-Ramsés, cerca de la antigua tierra de Gosén.',
        'En este imperio, en algún momento, Israel pasó de huésped a esclavo: «se levantó sobre Egipto un nuevo rey que no conocía a José» (Éx 1:8), y los israelitas fueron obligados a construir para Faraón «las ciudades de almacenaje, Pitón y Ramesés» (Éx 1:11). La ruta «Egipto y la Biblia» trata en detalle cuándo ocurrió el Éxodo y qué faraón pudo ser.'
      ],
      pensar: 'Un nuevo rey «que no conocía a José» olvidó todo el bien que José había hecho a Egipto (Éx 1:8). ¿Qué te enseña esto acerca de poner tu seguridad en el reconocimiento de las personas, y no en Dios?'
    },
    {
      id: 'reyes', n: 'Faraones en tiempos de los reyes', ref: '1 Reyes 3:1; 11:40; 14:25-26; 2 Reyes 17:4; 18:21; 19:9; 23:29; Jeremías 37:5-7; 44:30', fecha: [-970, -570],
      visual: [
        { tipo: 'tabla', titulo: 'Faraones', tabla: {
          titulo: 'Los faraones que nombra la Biblia', cab: ['Faraón', 'Época', 'Qué hace', 'Texto'],
          filas: [
            ['Sisac (Sheshonq I)', 'c. 925 a.C.', 'Acoge a Jeroboam y saquea Jerusalén', '1 R 11:40; 14:25-26'],
            ['So', 'c. 725 a.C.', 'Oseas de Israel le pide ayuda contra Asiria', '2 R 17:4'],
            ['Tirhaca (Taharqa)', '690–664 a.C.', 'Sale contra Senaquerib en tiempos de Ezequías', '2 R 19:9; Is 37:9'],
            ['Necao II', '610–595 a.C.', 'Mata a Josías; vencido en Carquemis', '2 R 23:29; Jer 46:2'],
            ['Hofra (Apries)', '589–570 a.C.', 'Envía un ejército durante el sitio de Jerusalén', 'Jer 37:5-7; 44:30']
          ],
          nota: 'La identidad de So es incierta: se ha propuesto a Osorkón IV, a Tefnajt o incluso que «So» sea el nombre de la ciudad de Sais. Tirhaca reinó desde 690 a.C.; en 701, cuando ocurre 2 Reyes 19, probablemente dirigía el ejército como príncipe, y el texto le da el título que tendría después.' } },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[22, 28], [38, 40]], capas: ['egipto-900'], lugares: ['tanis', 'menfis', 'napata', 'jerusalen', 'meguido', 'carquemis'] } }
      ],
      texto: [
        'Cuando Israel fue un reino, Egipto ya no era el gran imperio de antes, pero seguía siendo una potencia vecina con la que los reyes de Israel y Judá se relacionaban. Salomón se casó con la hija de un faraón (1 R 3:1), que le dio como dote la ciudad de Gezer (1 R 9:16).',
        'El primer faraón que la Biblia nombra es Sisac, el Sheshonq I de las fuentes egipcias. Dio refugio a Jeroboam cuando huía de Salomón (1 R 11:40), y en el quinto año de Roboam subió contra Jerusalén y se llevó los tesoros del templo y los escudos de oro de Salomón (1 R 14:25-26). En el templo de Karnak, en Tebas, Sheshonq dejó grabada la lista de las ciudades que conquistó en esa campaña.',
        'Después Egipto quedó dividido entre varias dinastías, y por un tiempo lo gobernaron reyes de Nubia, más al sur. Los reyes de Israel y Judá buscaban su apoyo contra Asiria: Oseas, el último rey de Israel, pidió ayuda a «So, rey de Egipto» (2 R 17:4), y Tirhaca, rey nubio de Egipto, salió contra Senaquerib en tiempos de Ezequías (2 R 19:9). Los asirios se burlaban de esa confianza: Egipto era un «báculo de caña cascada», que hiere la mano del que se apoya en él (2 R 18:21).',
        'En el Período Tardío, la dinastía de Sais intentó recuperar Siria. El faraón Necao mató al rey Josías en Meguido (2 R 23:29) y fue derrotado por Babilonia en Carquemis (Jer 46:2). Hofra envió un ejército cuando Babilonia sitiaba Jerusalén, pero se retiró, como había anunciado Jeremías (Jer 37:5-7), y el profeta anunció también su caída (Jer 44:30).'
      ],
      pensar: 'Egipto fue para Judá un «báculo de caña cascada» (2 R 18:21): parecía un apoyo, pero hería al que se apoyaba en él. ¿Qué apoyos aparentemente fuertes pueden fallarnos, y por qué la Biblia insiste en confiar solo en Dios?'
    },
    {
      id: 'persia-roma', n: 'De Persia a Roma', ref: 'Daniel 11:5-9; Mateo 2:13-15; Hechos 27:6', fecha: [-525, -30],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '525 a.C.: Cambises conquista Egipto para Persia.', fecha: -525,
            estado: { view: REGION, capas: ['persia-500'], lugares: ['pelusio', 'menfis', 'susa'] } },
          { t: '332 a.C.: Alejandro entra en Egipto y funda Alejandría.', fecha: -332,
            estado: { view: LEVANTE_EGIPTO, capas: ['egipto-1900'], lugares: ['alejandria', 'menfis', 'tiro', 'jerusalen'], trazos: ['alejandro'] } },
          { t: 'c. 250 a.C.: el reino de los Ptolomeos domina Egipto y Judea.', fecha: -250,
            estado: { view: LEVANTE_EGIPTO, capas: ['ptolomeos-250'], lugares: ['alejandria', 'jerusalen'] } },
          { t: '30 a.C.: muere Cleopatra y Egipto pasa a ser provincia romana.', fecha: -30,
            estado: { view: LEVANTE_EGIPTO, capas: ['egipto-romano'], lugares: ['alejandria', 'jerusalen'] } }
        ] },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-faro-alejandria.webp', alt: 'El gran faro de Alejandría junto al puerto, con barcos de vela, al atardecer', pie: 'El puerto y el faro de Alejandría.', origen: 'ia' }
      ],
      texto: [
        'En 525 a.C., el rey persa Cambises venció a los egipcios en Pelusio, la puerta oriental del Delta, y Egipto pasó a formar parte del imperio persa. Los egipcios se rebelaron varias veces y lograron unos sesenta años de independencia, pero Persia volvió a dominarlos en 343 a.C.',
        'En 332 a.C. llegó Alejandro Magno, que entró en Egipto sin batalla y fundó junto al mar la ciudad de Alejandría. A su muerte, uno de sus generales, Ptolomeo, se quedó con Egipto y fundó una dinastía de reyes griegos. Durante más de un siglo, los Ptolomeos gobernaron también Judea, y lucharon una y otra vez con los seléucidas de Siria. Daniel 11 los llama «el rey del sur», enfrentado al «rey del norte» (Dn 11:5-9), una profecía que el estudio de Daniel y el recurso del imperio griego desarrollan en detalle.',
        'Alejandría llegó a ser la ciudad más importante del mundo griego, con su faro, su gran biblioteca y una enorme comunidad judía. Allí, según la tradición, setenta sabios judíos tradujeron las Escrituras hebreas al griego, en la versión llamada Septuaginta. Fue la Biblia que leyeron muchos judíos de habla griega, y la que citan con frecuencia los escritores del Nuevo Testamento.',
        'La última reina de esa dinastía fue Cleopatra VII. Tras su derrota y su muerte, en 30 a.C., Egipto se convirtió en provincia de Roma y en el gran granero del imperio. Por eso Pablo viajó a Roma en «una nave alejandrina» cargada de trigo (Hch 27:6, 38). Pocas décadas antes, cuando ya era provincia romana, José y María huyeron allá con el niño Jesús (Mt 2:13-15).'
      ],
      pensar: 'Dios usó la gran ciudad de Alejandría para que las Escrituras se tradujeran al griego, la lengua común de su tiempo, y se prepararan para llegar a todas las naciones. ¿Cómo has visto a Dios preparar el camino para que su Palabra llegue a otros?'
    }
  ];

  /* ---------------- Ruta 2 · Sociedad y religión ---------------- */
  const sociedad = [
    {
      id: 'faraon', n: 'Faraón y su corte', ref: 'Génesis 40:1-23; 41:8, 41-44; Éxodo 5:2; 7:11; Hechos 7:22',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-faraon-corte.webp', alt: 'Un faraón egipcio en su trono, con la doble corona, rodeado de sacerdotes, escribas y sirvientes', pie: 'Faraón y su corte.', origen: 'ia' },
        { tipo: 'tabla', titulo: 'La corte', tabla: {
          titulo: 'Cargos de la corte egipcia en la Biblia', cab: ['Cargo', 'Qué hacía', 'Texto'],
          filas: [
            ['Jefe de los coperos', 'Servía el vino al rey; era un hombre de confianza', 'Gn 40:1-13; 41:9'],
            ['Jefe de los panaderos', 'Preparaba la comida del rey', 'Gn 40:16-22'],
            ['Capitán de la guardia', 'Jefe de la guardia y de la prisión real', 'Gn 39:1; 40:3'],
            ['Magos y sabios', 'Interpretaban sueños y realizaban encantamientos', 'Gn 41:8; Éx 7:11'],
            ['Gobernador de la tierra', 'Segundo después del rey, a cargo de los graneros', 'Gn 41:40-44']
          ] } }
      ],
      texto: [
        '«Faraón» significa en egipcio «la casa grande», es decir, el palacio. Con el tiempo, la palabra pasó a designar al rey mismo, y así aparece en la Biblia: casi siempre como «Faraón», sin nombre propio, hasta la época de los reyes de Israel. Para los egipcios, el faraón no era solo un gobernante: era un dios en la tierra, hijo del dios sol, responsable de mantener el orden del mundo. Por eso la pregunta del faraón del Éxodo suena tan desafiante: «¿Quién es Jehová, para que yo oiga su voz?» (Éx 5:2).',
        'El rey estaba rodeado de una corte numerosa. Génesis menciona varios de sus cargos con mucha precisión: el jefe de los coperos y el jefe de los panaderos, que José conoció en la cárcel (Gn 40), el capitán de la guardia, Potifar (Gn 39:1), y los magos y sabios a los que Faraón llamó para interpretar sus sueños (Gn 41:8).',
        'Cuando Faraón puso a José sobre todo Egipto, la ceremonia sigue las costumbres egipcias: le dio su anillo de sellar, lo vistió «de ropas de lino finísimo, y puso un collar de oro en su cuello» (Gn 41:42), lo hizo subir en su segundo carro y le dio un nombre egipcio (Gn 41:43-45). Las pinturas de las tumbas muestran escenas muy parecidas de funcionarios recompensados por el rey.',
        'Moisés creció en esa corte. Esteban recordó que «fue enseñado Moisés en toda la sabiduría de los egipcios» (Hch 7:22): lectura, escritura, administración y leyes. Dios usó esa formación, pero Moisés no puso su confianza en ella: por la fe rehusó ser llamado hijo de la hija de Faraón (He 11:24-26).'
      ],
      pensar: 'José y Moisés conocieron desde dentro la corte más poderosa de su tiempo, pero su lealtad estaba con Dios. ¿Cómo puede el creyente aprovechar la formación y las oportunidades del mundo sin que estas ocupen el lugar de Dios?'
    },
    {
      id: 'vida', n: 'La vida diaria', ref: 'Génesis 43:32; 46:34; Éxodo 1:14; 5:6-19; Números 11:5',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-ladrillos.webp', foco: '40% 50%', alt: 'Trabajadores semitas fabrican ladrillos de barro y paja junto a un canal del Nilo, vigilados por capataces egipcios', pie: 'La fabricación de ladrillos de barro y paja (Éx 5:7).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: DELTA, capas: ['egipto-1900'], lugares: ['gosen', 'rameses', 'piton', 'on', 'tanis', 'menfis'] } }
      ],
      texto: [
        'La mayoría de los egipcios eran campesinos que vivían al ritmo del Nilo: sembraban cuando bajaba la crecida, cosechaban en primavera y, durante la inundación, muchos trabajaban en las grandes obras del faraón. Comían pan, cebollas, ajos, puerros, pepinos, melones y pescado del río. En el desierto, los israelitas recordaban con nostalgia esa comida: «el pescado que comíamos en Egipto de balde, … los pepinos, los melones, los puerros, las cebollas y los ajos» (Nm 11:5).',
        'Los egipcios construían sus casas, palacios y almacenes con ladrillos de barro del Nilo, mezclado con paja para darle firmeza y secado al sol. Ese fue el trabajo que se impuso a los israelitas: «amargaron su vida con dura servidumbre, en hacer barro y ladrillo» (Éx 1:14). Cuando Moisés pidió libertad, Faraón ordenó que ya no se les diera paja, y que la recogieran ellos mismos sin bajar la cantidad de ladrillos (Éx 5:6-19). Una pintura de la tumba de Rekmira, un alto funcionario de esta época, muestra a trabajadores extranjeros haciendo ladrillos bajo la vigilancia de capataces.',
        'La sociedad egipcia era muy cerrada con los extranjeros. Génesis lo registra con detalle: los egipcios no podían comer con los hebreos, porque era «abominación a los egipcios» (Gn 43:32), y «para los egipcios es abominación todo pastor de ovejas» (Gn 46:34). Por eso José instaló a su familia en Gosén, apartada, donde pudieron conservar su identidad y multiplicarse durante generaciones.',
        'Lo que en un comienzo fue protección se convirtió después en esclavitud. Pero también ahí, en el lugar de la opresión, Dios estaba formando un pueblo.'
      ],
      pensar: 'En el desierto, el pueblo recordaba la comida de Egipto y olvidaba la esclavitud (Nm 11:5). ¿Por qué a veces añoramos lo que Dios nos sacó, y cómo podemos mantener la mirada en lo que Él promete?'
    },
    {
      id: 'dioses', n: 'Los dioses de Egipto', ref: 'Éxodo 7–12; 12:12; Números 33:4; Isaías 19:1; Éxodo 32:4',
      visual: [
        { tipo: 'tabla', titulo: 'Plagas y dioses', tabla: {
          titulo: 'Las plagas como juicio sobre los dioses de Egipto', cab: ['Plaga', 'Texto', 'Lo que tocó'],
          filas: [
            ['El agua en sangre', 'Éx 7:14-25', 'El Nilo, venerado como Hapi, fuente de vida'],
            ['Las ranas', 'Éx 8:1-15', 'Posiblemente Heqet, diosa con cabeza de rana'],
            ['Los piojos y las moscas', 'Éx 8:16-32', 'La pureza de los sacerdotes; los «dedos de Dios» (Éx 8:19)'],
            ['La peste en el ganado', 'Éx 9:1-7', 'Los animales sagrados, como el buey Apis y la vaca Hathor'],
            ['Las úlceras y el granizo', 'Éx 9:8-35', 'Dioses de la salud y del cielo'],
            ['Las langostas', 'Éx 10:1-20', 'Las cosechas que los dioses debían proteger'],
            ['Las tinieblas', 'Éx 10:21-29', 'Ra, el dios sol, el más importante de Egipto'],
            ['La muerte de los primogénitos', 'Éx 11–12', 'Faraón, considerado dios, y su heredero']
          ],
          nota: 'La Biblia afirma que Dios ejecutó juicios «en todos los dioses de Egipto» (Éx 12:12; Nm 33:4). Algunas asociaciones son claras (el Nilo, el sol, el ganado, el faraón); otras, como la de las ranas con Heqet, son propuestas de los estudiosos.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-templo-dioses.webp', alt: 'Interior de un templo egipcio con columnas pintadas y estatuas de dioses con cabeza de animal, iluminado por antorchas', pie: 'Un templo egipcio con estatuas de sus dioses.', origen: 'ia' }
      ],
      texto: [
        'Los egipcios adoraban a cientos de dioses. Muchos tenían forma humana con cabeza de animal: Horus con cabeza de halcón, Anubis con cabeza de chacal, Hathor con forma de vaca. El más importante era Ra, el sol, que cada día cruzaba el cielo en su barca. Osiris era el dios de los muertos, e Isis, su esposa, una de las diosas más veneradas. También se adoraba a animales concretos, como el buey Apis de Menfis.',
        'Por eso las plagas no fueron solo castigos: fueron una demostración de quién es el verdadero Dios. Antes de la última plaga, Dios anunció: «ejecutaré mis juicios en todos los dioses de Egipto. Yo Jehová» (Éx 12:12), y Números lo repite: «había hecho Jehová juicios contra sus dioses» (Nm 33:4). El Nilo, considerado fuente de vida, se convirtió en sangre; el sol, el dios supremo, se oscureció tres días mientras en las casas de Israel había luz (Éx 10:23); y murió el primogénito de Faraón, a quien los egipcios tenían por divino.',
        'Los propios magos de Egipto tuvieron que reconocerlo cuando no pudieron imitar la plaga de los piojos: «Dedo de Dios es éste» (Éx 8:19). Siglos después, Isaías anunció que Dios entraría en Egipto y «los ídolos de Egipto temblarán delante de él» (Is 19:1).',
        'La idolatría de Egipto dejó huella en Israel. Pocas semanas después del Éxodo, el pueblo hizo un becerro de oro y dijo: «Israel, estos son tus dioses, que te sacaron de la tierra de Egipto» (Éx 32:4). Muchos estudiosos ven en ese becerro un eco del culto egipcio a los toros sagrados. Es más fácil sacar al pueblo de Egipto que sacar a Egipto del corazón del pueblo.'
      ],
      pensar: 'Dios sacó a Israel de Egipto, pero Israel volvió a hacer un ídolo al estilo egipcio (Éx 32:4). ¿Qué «dioses» de la cultura que nos rodea pueden seguir ocupando un lugar en el corazón del creyente?'
    },
    {
      id: 'muerte', n: 'La muerte y el más allá', ref: 'Génesis 50:2-3, 24-26; Éxodo 13:19; Josué 24:32; Hebreos 11:22',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-embalsamamiento.webp', alt: 'Sacerdotes egipcios embalsaman un cuerpo envuelto en vendas de lino en una sala iluminada por lámparas', pie: 'El embalsamamiento egipcio (Gn 50:2-3).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Dios ciertamente os visitará, y haréis llevar de aquí mis huesos.', ref: 'Génesis 50:25' }
      ],
      texto: [
        'Ningún pueblo antiguo se preocupó tanto por la muerte como los egipcios. Creían que la persona seguía viviendo después de morir, siempre que su cuerpo se conservara y su tumba tuviera lo necesario para la otra vida. Por eso desarrollaron el embalsamamiento: extraían los órganos, secaban el cuerpo con sal natrón, lo ungían y lo envolvían en vendas de lino. Los reyes del Reino Antiguo se hicieron enterrar en pirámides, y los del Reino Nuevo en tumbas excavadas en la roca, en el Valle de los Reyes.',
        'La Biblia registra esta costumbre en la muerte de Jacob y de José. José mandó a los médicos embalsamar a su padre, «y le cumplieron cuarenta días, porque así cumplían los días de los embalsamados, y lo lloraron los egipcios setenta días» (Gn 50:2-3). Los textos egipcios y el historiador Heródoto describen un proceso de unos setenta días en total, que coincide con el relato. José mismo fue embalsamado y «puesto en un ataúd en Egipto» (Gn 50:26).',
        { posturas: {
          titulo: '¿Construyeron los hebreos las pirámides?',
          a: { n: 'La creencia popular', t: 'Es frecuente imaginar a los israelitas esclavos construyendo las pirámides de Giza.' },
          b: { n: 'Lo que dicen la Biblia y la historia', t: 'Las grandes pirámides se construyeron hacia 2600–2500 a.C., unos mil años antes del Éxodo. La Biblia dice que los israelitas hicieron ladrillos de barro y construyeron «las ciudades de almacenaje, Pitón y Ramesés» (Éx 1:11).' },
          c: 'El texto bíblico es más preciso que la creencia popular: habla de ladrillos, no de bloques de piedra, y de ciudades de almacenaje, no de pirámides. Cuando los israelitas llegaron a Egipto, las pirámides ya eran monumentos antiguos.'
        } },
        'Pero José, a diferencia de los egipcios, no puso su esperanza en una tumba. Antes de morir hizo jurar a sus hermanos: «Dios ciertamente os visitará, y haréis llevar de aquí mis huesos» (Gn 50:25). Moisés los llevó consigo en el Éxodo (Éx 13:19), y fueron enterrados en Siquem, en la tierra prometida (Jos 24:32). Hebreos lo cuenta entre los actos de fe (He 11:22).'
      ],
      pensar: 'Los egipcios buscaban la vida eterna en sus tumbas; José puso su esperanza en la promesa de Dios (He 11:22). ¿En qué descansa tu esperanza frente a la muerte, a la luz de la resurrección de Cristo?'
    },
    {
      id: 'legado', n: 'El legado de Egipto', ref: 'Génesis 40:20; Hechos 7:22; Hechos 27:6',
      visual: [
        { tipo: 'tabla', titulo: 'Legado', tabla: {
          titulo: 'Lo que dejó Egipto', cab: ['Legado', 'Qué era', 'Dónde lo vemos'],
          filas: [
            ['Papiro', 'Hojas para escribir hechas con la planta del Nilo', 'La palabra «papel»; los primeros manuscritos del Nuevo Testamento'],
            ['Calendario de 365 días', '12 meses de 30 días más 5 días adicionales', 'Base del calendario que usamos hoy'],
            ['El alfabeto', 'Trabajadores semitas en el Sinaí adaptaron signos egipcios hacia 1800 a.C.', 'De ahí vienen el alfabeto hebreo y, más tarde, el nuestro'],
            ['Medicina', 'Tratados de cirugía y de remedios', 'Los «médicos» de José (Gn 50:2)'],
            ['Geometría', 'Medición de los campos después de cada crecida', 'Las pirámides; la palabra significa «medida de la tierra»'],
            ['Cumpleaños', 'Celebración del cumpleaños del rey', 'El primero en la Biblia es el de Faraón (Gn 40:20)'],
            ['La Septuaginta', 'Traducción de las Escrituras al griego en Alejandría', 'La Biblia que citan muchos textos del Nuevo Testamento']
          ],
          nota: 'El origen del alfabeto en las inscripciones del Sinaí (Serabit el-Jadim) es la explicación más aceptada, aunque algunos detalles se discuten.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-papiro.webp', foco: '62% 50%', alt: 'Un artesano egipcio fabrica hojas de papiro cortando y prensando tallos de la planta junto al Nilo', pie: 'La fabricación del papiro.', origen: 'ia' }
      ],
      texto: [
        'Egipto dejó al mundo herencias que todavía usamos, y algunas están muy cerca de la historia de la Biblia.',
        { h: 'Escribir' },
        'Los egipcios fabricaban hojas para escribir con los tallos de una planta del Nilo, el papiro, y de ese nombre viene nuestra palabra «papel». En papiro se escribieron muchas cartas del mundo antiguo y los manuscritos más antiguos que conservamos del Nuevo Testamento, hallados justamente en las arenas de Egipto. Pero el aporte más importante fue otro: hacia 1800 a.C., trabajadores semitas de las minas del Sinaí tomaron algunos signos egipcios y los usaron para representar sonidos de su propia lengua. Así nació el primer alfabeto, del que vienen el fenicio, el hebreo en que se escribió el Antiguo Testamento, el griego, el latín y nuestras letras.',
        { h: 'Medir el tiempo y la tierra' },
        'Los egipcios crearon un calendario de 365 días, con doce meses de treinta días y cinco días adicionales, que con los ajustes posteriores de romanos y cristianos es la base del calendario actual. Como el Nilo borraba cada año los límites de los campos, desarrollaron la geometría para volver a medirlos; la palabra misma significa «medida de la tierra». Esa precisión hizo posibles las pirámides. Sus médicos escribieron tratados de cirugía y de remedios, y Génesis menciona a los médicos egipcios que embalsamaron a Jacob (Gn 50:2).',
        { h: 'Costumbres y Escrituras' },
        'La primera celebración de un cumpleaños que menciona la Biblia es egipcia: «el día del cumpleaños de Faraón», cuando el rey hizo un banquete a sus servidores (Gn 40:20). Y en Alejandría se tradujeron las Escrituras hebreas al griego, la versión llamada Septuaginta, que hizo posible que el mundo de habla griega leyera la Biblia y preparó el camino para la predicación del evangelio.'
      ],
      pensar: 'Del alfabeto nacido junto a Egipto y de la traducción hecha en Alejandría, Dios se sirvió para que su Palabra pudiera escribirse y llegar a todos. ¿Qué valor tiene para ti poder leer hoy la Biblia en tu propia lengua?'
    }
  ];

  /* ---------------- Ruta 3 · Egipto y la Biblia ---------------- */
  const biblia = [
    {
      id: 'abraham-jose', n: 'Abraham y José', ref: 'Génesis 12:10-20; 37–50; Hechos 7:9-16', fecha: [-2090, -1805],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-jose-anillo.webp', foco: '45% 50%', alt: 'José, vestido de lino egipcio y con un collar de oro, recibe el anillo del faraón ante la corte', pie: 'José puesto sobre la tierra de Egipto (Gn 41:41-43).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[28.5, 30], [33.5, 36.5]], capas: ['egipto-1900'], lugares: ['gosen', 'on', 'menfis', 'jerusalen'], trazos: ['jose'] } }
      ],
      texto: [
        'La historia de Israel y Egipto comienza con Abraham. Hubo hambre en Canaán, «y descendió Abram a Egipto para morar allá» (Gn 12:10). Por temor, presentó a Sara como su hermana, y Faraón la llevó a su casa, hasta que Dios intervino con plagas y Abraham tuvo que salir del país (Gn 12:11-20). Ya en este primer encuentro aparece un anticipo de lo que vendría: hambre, descenso a Egipto, plagas y salida.',
        'José llegó a Egipto vendido por sus hermanos a unos mercaderes que bajaban de Galaad (Gn 37:25-28). Fue esclavo en casa de Potifar, prisionero injustamente, y finalmente intérprete de los sueños de Faraón. A los treinta años fue puesto como gobernador sobre toda la tierra de Egipto, para administrar los siete años de abundancia y los siete de hambre (Gn 41:41-46).',
        'Cuando el hambre llegó a Canaán, los hermanos de José bajaron a comprar grano. Tras una larga prueba, José se dio a conocer y les dijo unas palabras que resumen toda su historia: «Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo» (Gn 50:20). Jacob bajó con setenta personas y se estableció en Gosén (Gn 46:27; 47:6).',
        'Muchos detalles del relato encajan con lo que se conoce de Egipto: los mercaderes que llevaban especias y resinas, los cargos de la corte, los sueños como mensajes de los dioses, la investidura de José con anillo, lino y collar de oro, el embalsamamiento. Una pintura de la tumba de Jnumhotep II en Beni Hasán, hacia 1890 a.C., muestra a un grupo de semitas con vestidos de colores llegando a Egipto con sus familias y sus animales, una escena muy parecida a la llegada de los hermanos de José.'
      ],
      pensar: '«Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien» (Gn 50:20). ¿Qué situación difícil de tu vida necesitas mirar con la fe de José, confiando en que Dios puede encaminarla a bien (Ro 8:28)?'
    },
    {
      id: 'exodo', n: 'Moisés y el Éxodo', ref: 'Éxodo 1–15; 12:40-41; 1 Reyes 6:1', fecha: -1446,
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-mar-rojo.webp', alt: 'El pueblo de Israel cruza el mar en seco entre dos muros de agua, guiado por Moisés con la vara en alto', pie: 'El paso del mar Rojo (Éx 14:21-22).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[27.5, 30.5], [31.8, 35.2]], capas: ['egipto-1450'], lugares: ['rameses', 'piton', 'sinai'], trazos: ['exodo'] } }
      ],
      texto: [
        'Con el tiempo, los descendientes de Jacob se multiplicaron, y un nuevo faraón, temeroso de su número, los sometió a trabajos forzados y mandó matar a los niños varones (Éx 1:8-22). Moisés, salvado de las aguas y criado en la corte, huyó a Madián después de matar a un egipcio. Cuarenta años después, Dios lo llamó desde la zarza ardiente para sacar a su pueblo (Éx 3).',
        'Faraón se negó una y otra vez, y Dios envió diez plagas, hasta la muerte de los primogénitos. Aquella noche, Israel celebró la primera Pascua: la sangre del cordero en los postes de las puertas protegió a cada familia (Éx 12:13), una imagen que el Nuevo Testamento aplica a Cristo, «nuestra pascua» (1 Co 5:7). El pueblo salió de Ramesés, y Dios abrió el mar: «el mar se retirase por recio viento oriental toda aquella noche; y volvió el mar en seco» (Éx 14:21).',
        { posturas: {
          titulo: '¿Cuándo ocurrió el Éxodo?',
          a: { n: 'La fecha temprana (la de este estudio)', t: 'Salomón comenzó el templo 480 años después del Éxodo (1 R 6:1), hacia 966 a.C., lo que da una fecha cercana a 1446 a.C., en el reinado de Tutmosis III o de Amenhotep II.' },
          b: { n: 'La fecha tardía', t: 'Muchos estudiosos ubican el Éxodo hacia 1270 a.C., con Ramsés II, porque Éxodo 1:11 menciona la ciudad de Ramesés, que llevaba el nombre de ese faraón.' },
          c: 'El nombre Ramesés aparece también en tiempos de José, mucho antes de Ramsés II (Gn 47:11): el autor usa el nombre que el lugar tenía cuando se escribió o copió el texto. Por eso no obliga a una fecha tardía. Este estudio sigue la cronología que da el texto bíblico.'
        } },
        'Las rutas que se han propuesto para el Éxodo y la ubicación del monte Sinaí son varias. El mapa muestra la ruta tradicional, por el sur de la península, como una aproximación.'
      ],
      pensar: 'La sangre del cordero en los postes protegió a cada familia la noche de la Pascua (Éx 12:13), y Pablo dice que «nuestra pascua, que es Cristo, ya fue sacrificada» (1 Co 5:7). ¿Qué significa para ti estar cubierto por la sangre de Cristo?'
    },
    {
      id: 'salomon', n: 'Salomón y Egipto', ref: '1 Reyes 3:1; 9:16, 24; 10:28-29; 11:40; Deuteronomio 17:16', fecha: [-970, -930],
      visual: [
        { tipo: 'tabla', titulo: 'Salomón y Egipto', tabla: {
          titulo: 'Los lazos de Salomón con Egipto', cab: ['Lazo', 'Texto'],
          filas: [
            ['Se casa con la hija de Faraón', '1 R 3:1'],
            ['Faraón conquista Gezer y se la da como dote', '1 R 9:16'],
            ['Le construye un palacio aparte', '1 R 7:8; 9:24'],
            ['Compra caballos y carros de Egipto', '1 R 10:28-29'],
            ['Jeroboam, su enemigo, se refugia con Sisac', '1 R 11:40']
          ] } },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[29, 30.5], [33.5, 36.5]], capas: ['egipto-900'], lugares: ['tanis', 'gezer', 'jerusalen', 'menfis'] } }
      ],
      texto: [
        'Con Salomón, la relación entre Israel y Egipto dio un giro inesperado: el pueblo que había salido de la esclavitud se convirtió en socio del faraón. Salomón «hizo parentesco con Faraón rey de Egipto, pues tomó la hija de Faraón» (1 R 3:1). Era una alianza de alto nivel: el faraón había tomado la ciudad cananea de Gezer y se la dio como dote a su hija (1 R 9:16).',
        'El comercio también unió a ambos reinos. Los mercaderes de Salomón compraban caballos y carros en Egipto y los revendían a los reyes de los hititas y de Siria (1 R 10:28-29). Pero la ley de Moisés había advertido contra eso: el rey de Israel no debía multiplicar caballos ni hacer volver al pueblo a Egipto para conseguirlos, «porque Jehová os ha dicho: No volváis nunca por este camino» (Dt 17:16). Salomón hizo justamente lo que la ley prohibía, y su corazón se fue apartando de Dios por sus muchas mujeres extranjeras (1 R 11:1-4).',
        'Al final de su reinado, Egipto ya no era un aliado seguro. Cuando Salomón quiso matar a Jeroboam, este huyó a Egipto, al faraón Sisac, y allí esperó hasta la muerte del rey (1 R 11:40). Pocos años después, Sisac subió contra Jerusalén y se llevó los tesoros que Salomón había acumulado (1 R 14:25-26).'
      ],
      pensar: 'La ley decía sobre Egipto: «No volváis nunca por este camino» (Dt 17:16), pero Salomón volvió a buscar allí su fuerza. ¿Qué «caminos de regreso» a lo que Dios ya te sacó necesitas cerrar?'
    },
    {
      id: 'faraones', n: 'Los faraones de los reyes', ref: '1 Reyes 14:25-26; 2 Reyes 17:4; 18:21; 19:9; 23:29-35; Isaías 30:1-3; 36:6', fecha: [-925, -609],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-sisac.webp', alt: 'Soldados egipcios cargan los escudos de oro y los tesoros del templo de Jerusalén', pie: 'Sisac saquea los tesoros de Jerusalén (1 R 14:25-26).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[22, 28], [38, 40]], capas: ['egipto-900'], lugares: ['tanis', 'napata', 'jerusalen', 'meguido', 'carquemis', 'samaria'] } }
      ],
      texto: [
        'Durante los siglos de los reyes, Egipto apareció una y otra vez en la historia de Israel y de Judá, casi siempre como una tentación: un aliado poderoso al que acudir en lugar de buscar a Dios.',
        'El primero fue Sisac, que en el quinto año de Roboam saqueó Jerusalén y se llevó los escudos de oro de Salomón. Roboam los reemplazó por escudos de bronce (1 R 14:25-27), una imagen triste de un reino que había perdido su gloria por apartarse de Dios. Dos siglos después, Oseas, el último rey de Israel, dejó de pagar tributo a Asiria y buscó ayuda en «So, rey de Egipto». La ayuda no llegó, y Samaria cayó (2 R 17:4-6).',
        'En tiempos de Ezequías, cuando Asiria amenazaba Jerusalén, algunos consejeros de Judá también miraron a Egipto. Isaías los reprendió: «¡Ay de los hijos que se apartan… para fortalecerse con la fuerza de Faraón!» (Is 30:1-2). El propio general asirio se burló de esa confianza: Egipto era un «báculo de caña frágil» (Is 36:6). Ezequías, en cambio, llevó la carta del rey asirio al templo y oró, y Dios libró a Jerusalén (Is 37:14-36).',
        'El último encuentro fue trágico. En 609 a.C., el faraón Necao subió hacia el Éufrates, y el buen rey Josías salió a enfrentarlo en Meguido, donde murió (2 R 23:29). Necao depuso al hijo de Josías y puso en el trono a Joacim, que pagó tributo a Egipto (2 R 23:33-35), hasta que Babilonia venció a Egipto en Carquemis y tomó su lugar.'
      ],
      pensar: 'Ezequías, frente a la amenaza, no corrió a Egipto: llevó la carta al templo y oró (Is 37:14). ¿A quién o a qué acudes primero cuando enfrentas una amenaza?'
    },
    {
      id: 'profetas', n: 'Egipto en los profetas', ref: 'Isaías 19; 30–31; Jeremías 42–44; 46; Ezequiel 29–32', fecha: [-735, -570],
      visual: [
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Bendito el pueblo mío Egipto, y el asirio obra de mis manos, e Israel mi heredad.', ref: 'Isaías 19:25' },
        { tipo: 'tabla', titulo: 'Profecías', tabla: {
          titulo: 'Egipto en los profetas', cab: ['Texto', 'Qué anuncia'],
          filas: [
            ['Is 30:1-7; 31:1-3', 'Juicio sobre quienes confían en Egipto en lugar de Dios'],
            ['Jer 42:13-22; 43:7', 'Advertencia al remanente de no huir a Egipto; desobedecen y llegan a Tafnes'],
            ['Jer 46:1-26', 'Derrota de Necao en Carquemis y conquista de Egipto por Babilonia'],
            ['Ez 29:1-16', 'Faraón, «el gran dragón» del Nilo; Egipto será un reino humilde'],
            ['Is 19:19-25', 'En el futuro, Egipto conocerá a Jehová junto a Asiria e Israel']
          ],
          nota: 'En la lectura dispensacionalista que sigue este estudio, Isaías 19:19-25 se cumplirá en el reino milenial de Cristo.' } }
      ],
      texto: [
        'Los profetas hablaron mucho de Egipto, siempre con dos mensajes a la vez: juicio para quienes confían en él en lugar de Dios, y juicio sobre el propio Egipto por su orgullo.',
        'Isaías advirtió a Judá: «¡Ay de los que descienden a Egipto por ayuda, y confían en caballos… y no miran al Santo de Israel, ni buscan a Jehová!» (Is 31:1). Siglo y medio después, cuando Jerusalén ya había caído, el remanente de Judá preguntó a Jeremías qué hacer, y Dios respondió: «No vayáis a Egipto» (Jer 42:19). No obedecieron, «y llegaron hasta Tafnes», en el Delta, llevándose al profeta con ellos (Jer 43:7). Allí Jeremías anunció que Nabucodonosor llegaría también a Egipto (Jer 43:8-13) y entregaría a Faraón Hofra en manos de sus enemigos (Jer 44:30).',
        'Ezequiel, desde Babilonia, dedicó cuatro capítulos a Egipto. Presentó a Faraón como «el gran dragón que yace en medio de sus ríos, el cual dijo: Mío es el Nilo, pues yo lo hice» (Ez 29:3), y anunció que Egipto, después del juicio, sería un reino humilde que «nunca más se alzará sobre las naciones» (Ez 29:15). Así ocurrió: tras la conquista persa, Egipto nunca volvió a ser una potencia independiente en la antigüedad.',
        'Pero la última palabra de los profetas sobre Egipto es de esperanza. Isaías anunció un día en que habrá «altar para Jehová en medio de la tierra de Egipto» (Is 19:19), y en que Dios bendecirá juntos a los antiguos enemigos: «Bendito el pueblo mío Egipto, y el asirio obra de mis manos, e Israel mi heredad» (Is 19:25). En la interpretación que sigue este estudio, esa promesa se cumplirá plenamente cuando Cristo reine sobre la tierra.'
      ],
      pensar: 'Dios llama a Egipto, el antiguo opresor, «pueblo mío» (Is 19:25). ¿Qué te enseña esta promesa acerca del alcance de la gracia de Dios, aun para quienes fueron enemigos de su pueblo?'
    },
    {
      id: 'nuevo-testamento', n: 'Egipto en el Nuevo Testamento', ref: 'Mateo 2:13-15; Oseas 11:1; Hechos 2:10; 7:9-36; 18:24; Hebreos 11:22-29; Apocalipsis 11:8',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-huida.webp', alt: 'José guía de noche un asno por el desierto; María va montada con el niño Jesús en brazos', pie: 'La huida a Egipto (Mt 2:13-15).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Cuando Israel era muchacho, yo lo amé, y de Egipto llamé a mi hijo.', ref: 'Oseas 11:1' }
      ],
      texto: [
        'Egipto vuelve a aparecer en el comienzo de la vida de Jesús. Cuando Herodes quiso matar al niño, un ángel avisó a José: «huye a Egipto, y permanece allá hasta que yo te diga» (Mt 2:13). Egipto, que había sido refugio para Abraham y para Jacob, fue refugio también para el Hijo de Dios. Mateo ve en el regreso un cumplimiento de Oseas: «De Egipto llamé a mi Hijo» (Mt 2:15; Os 11:1). Lo que en Oseas se dice de Israel, el hijo que Dios sacó de Egipto, Mateo lo ve realizado plenamente en Jesús, el Hijo verdadero, que recorre de nuevo la historia de su pueblo y la cumple sin pecado.',
        'En Pentecostés, entre los que oyeron a los discípulos hablar las maravillas de Dios en su propia lengua había judíos y prosélitos de «Egipto y… las regiones de África más allá de Cirene» (Hch 2:10). Poco después aparece Apolos, «natural de Alejandría, varón elocuente, poderoso en las Escrituras» (Hch 18:24), un fruto de la gran comunidad judía de esa ciudad, que llegó a ser colaborador de Pablo.',
        'Esteban, en su discurso, recordó a José y a Moisés en Egipto (Hch 7:9-36), y Hebreos presenta su historia como ejemplo de fe: Moisés tuvo «por mayores riquezas el vituperio de Cristo que los tesoros de los egipcios» y «por la fe dejó a Egipto» (He 11:26-27).',
        'Finalmente, en el Apocalipsis, Egipto se usa como símbolo. La ciudad donde mueren los dos testigos, «donde también nuestro Señor fue crucificado», se llama «en sentido espiritual… Sodoma y Egipto» (Ap 11:8): un lugar que se ha vuelto tan rebelde contra Dios como aquellos que esclavizaron a su pueblo.'
      ],
      pensar: 'Moisés tuvo «por mayores riquezas el vituperio de Cristo que los tesoros de los egipcios» (He 11:26). ¿Qué estarías dispuesto a dejar por seguir a Cristo, y qué te ayuda a mirar «el galardón»?'
    },
    {
      id: 'arqueologia', n: 'La evidencia arqueológica', ref: 'Génesis 37:25; 47:11; Éxodo 1:11, 15; 5:7; 1 Reyes 14:25-26', fecha: [-1900, -925],
      visual: [
        { tipo: 'tabla', titulo: 'Hallazgos', tabla: {
          titulo: 'Hallazgos y textos bíblicos', cab: ['Hallazgo', 'Qué muestra', 'Texto bíblico'],
          filas: [
            ['Pintura de Beni Hasán (c. 1890 a.C.)', 'Un grupo de semitas con vestidos de colores llega a Egipto con sus familias', 'Gn 37:3; 46:5-7'],
            ['Papiro Brooklyn (c. 1740 a.C.)', 'Lista de sirvientes de una casa egipcia; muchos tienen nombres semitas, entre ellos uno parecido a Sifra', 'Éx 1:15'],
            ['Pintura de la tumba de Rekmira (s. XV a.C.)', 'Trabajadores extranjeros fabrican ladrillos bajo capataces', 'Éx 1:14; 5:7'],
            ['Cartas de Amarna (c. 1350 a.C.)', 'Reyes de Canaán, entre ellos el de Jerusalén, escriben al faraón', 'Jos 10:1'],
            ['Estela de Merneptah (c. 1208 a.C.)', 'La primera mención de «Israel» fuera de la Biblia, como pueblo en Canaán', 'Jue 1–2'],
            ['Relieve de Sheshonq I en Karnak (c. 925 a.C.)', 'Lista de ciudades conquistadas en Canaán', '1 R 14:25-26'],
            ['Piedra de Rosetta (196 a.C.)', 'Un mismo decreto en jeroglíficos, demótico y griego', 'Permitió leer los textos egipcios']
          ],
          nota: 'La relación del nombre del papiro Brooklyn con la Sifra de Éxodo es una coincidencia notable de nombre, no una identificación: muestra que ese nombre semita se usaba en Egipto.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/egipto-karnak.webp', alt: 'Arqueólogos de comienzos del siglo XX excavan entre las columnas del templo de Karnak en Tebas', pie: 'Recreación de las excavaciones en Karnak.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: NILO, capas: ['egipto-1900'], lugares: ['beni-hasan', 'amarna', 'tebas', 'menfis', 'tanis'] } }
      ],
      texto: [
        'Egipto ha conservado más textos e imágenes antiguas que casi cualquier otro país, gracias a su clima seco. Algunos de esos hallazgos iluminan los relatos bíblicos de manera notable.',
        'Una pintura de la tumba de Jnumhotep II en Beni Hasán, hacia 1890 a.C., muestra a un grupo de semitas llegando a Egipto: hombres con barba, mujeres y niños, vestidos de telas de colores, con sus asnos y sus armas. No se trata de la familia de Jacob, pero muestra cómo se veían los grupos de Canaán que bajaban a Egipto en esa época. Un papiro de hacia 1740 a.C., conservado en el Museo de Brooklyn, enumera a los sirvientes de una casa egipcia, y muchos tienen nombres semitas, entre ellos uno muy parecido al de Sifra, la partera hebrea de Éxodo 1:15.',
        'La pintura de la tumba de Rekmira, visir de Tutmosis III, muestra a trabajadores extranjeros haciendo ladrillos de barro bajo la vigilancia de capataces con varas, una escena que ilustra Éxodo 1 y 5. Las cartas de Amarna conservan la correspondencia de los reyes de Canaán con el faraón hacia 1350 a.C., incluidas seis cartas del rey de Jerusalén.',
        'La estela de Merneptah, hacia 1208 a.C., es la primera mención de Israel fuera de la Biblia: entre los pueblos vencidos en Canaán, el faraón nombra a «Israel». Prueba que en esa fecha Israel ya era un pueblo establecido en la tierra. Y en Karnak, Sheshonq I, el Sisac de la Biblia, dejó grabada la lista de las ciudades que tomó en su campaña (1 R 14:25-26). Todos estos textos se pudieron leer gracias a la Piedra de Rosetta, que en 1822 permitió descifrar los jeroglíficos.'
      ],
      pensar: 'La estela de Merneptah nombra a Israel como un pueblo vencido, pero Israel sigue existiendo y el imperio de Merneptah desapareció. ¿Qué te dice esto acerca de las promesas de Dios a su pueblo a lo largo de la historia?'
    }
  ];

  window.RUTA_DATA = {
    titulo: 'Egipto',
    credito: 'Citas textuales: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso. Fronteras de los mapas aproximadas.',
    marca: 'Recursos Bíblicos',
    inicio: '../../',
    rutas: [
      { id: 'historia', grupo: 'Egipto', n: 'Historia', info: 'El Nilo, las grandes épocas, el imperio, la decadencia y Roma',
        linea: { desde: -3100, hasta: 0, hitos: [
          { a: -2560, t: 'Gran Pirámide' }, { a: -1550, t: 'Reino Nuevo' }, { a: -1274, t: 'Qadés' },
          { a: -925, t: 'Sisac' }, { a: -525, t: 'Persia' }, { a: -332, t: 'Alejandro' }, { a: -30, t: 'Roma' }
        ] },
        estaciones: historia },
      { id: 'sociedad', grupo: 'Egipto', n: 'Sociedad y religión', info: 'Faraón, la vida diaria, los dioses, la muerte y el legado', estaciones: sociedad },
      { id: 'biblia', grupo: 'Egipto', n: 'Egipto y la Biblia', info: 'De Abraham y José al Éxodo, los reyes, los profetas y el Nuevo Testamento',
        linea: { desde: -2200, hasta: 100, hitos: [
          { a: -2090, t: 'Abraham' }, { a: -1876, t: 'Jacob en Egipto' }, { a: -1446, t: 'Éxodo' },
          { a: -925, t: 'Sisac' }, { a: -586, t: 'Jeremías a Egipto' }, { a: -5, t: 'Jesús en Egipto' }
        ] },
        estaciones: biblia }
    ]
  };
})();
