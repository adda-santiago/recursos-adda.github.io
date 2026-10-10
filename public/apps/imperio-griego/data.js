/* ==========================================================
   Recursos Bíblicos — El imperio griego · contenido de las rutas
   Motor: ../assets/js/ruta-estudio.js (formato descrito en su encabezado).
   Geografía: ../assets/js/imperios-geo.js. Citas textuales: Reina-Valera 1960.
   Las referencias del texto se vuelven burbujas con citas.js (texto en /biblia/).
   1 y 2 Macabeos se citan como fuentes históricas, no como Escritura.
   Diferencias entre la historia y el texto bíblico: bloque { posturas };
   nunca se presenta el texto bíblico como error. En temas doctrinales
   prevalece la línea pentecostal clásica (Asambleas de Dios), con escatología
   dispensacionalista.
   ========================================================== */
(() => {
  const EGEO = [[35.5, 19.5], [42.5, 31]];
  const MUNDO = [[22, 18], [46, 78]];
  const REINOS = [[24, 18], [44, 60]];
  const LEVANTE = [[28.5, 30], [38.5, 42]];

  /* ---------------- Ruta 1 · Historia ---------------- */
  const historia = [
    {
      id: 'en-la-biblia', n: 'Grecia en la Biblia', ref: 'Génesis 10:2-4; Zacarías 9:13; Daniel 8:21; Juan 12:20-21; Romanos 1:16', fecha: [-500, -30],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-acropolis.webp', alt: 'La Acrópolis de Atenas con el Partenón al atardecer, vista desde la ciudad antigua', pie: 'La Acrópolis de Atenas.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: MUNDO, capas: ['alejandro-323'], lugares: ['atenas', 'pella', 'alejandria', 'babilonia', 'jerusalen'] } }
      ],
      texto: [
        'Grecia aparece en la Biblia desde la tabla de las naciones. Entre los hijos de Jafet está Javán (Gn 10:2), el nombre hebreo de los jonios, los griegos de las costas del Egeo. Los profetas lo mencionan como un pueblo lejano y comerciante: Javán comerciaba con Tiro (Ez 27:13), y Joel denunció que los hijos de Judá habían sido vendidos como esclavos «a los hijos de los griegos» (Jl 3:6).',
        'En las visiones de Daniel, Grecia es el tercero de los imperios: el vientre y los muslos de bronce de la estatua (Dn 2:32, 39), el leopardo de cuatro alas y cuatro cabezas (Dn 7:6) y el macho cabrío que derriba al carnero persa, que el ángel identifica: «El macho cabrío es el rey de Grecia» (Dn 8:21). Zacarías anunció un día en que Dios despertaría a los hijos de Sion «contra tus hijos, oh Grecia» (Zac 9:13).',
        'Grecia nunca fue un imperio unido hasta Alejandro Magno, y su imperio se dividió apenas murió. Pero su lengua y su cultura dominaron el Oriente durante siglos, incluso bajo Roma. Por eso el Nuevo Testamento se escribió en griego, y en él «los griegos» representan a todos los pueblos no judíos: unos griegos pidieron «quisiéramos ver a Jesús» (Jn 12:20-21), y Pablo declaró que el evangelio es poder de Dios «al judío primeramente, y también al griego» (Ro 1:16).',
        'Este recurso recorre la historia del mundo griego desde las ciudades de Grecia hasta la conquista romana, con especial atención al período entre el Antiguo y el Nuevo Testamento, que Daniel 8 y 11 describen con detalle.'
      ],
      pensar: 'Dios usó la lengua y la cultura griegas, extendidas por todo el Oriente, para que el evangelio pudiera llegar a todas las naciones (Gá 4:4). ¿Cómo ves a Dios preparando la historia para la venida de Cristo?'
    },
    {
      id: 'ciudades', n: 'Las ciudades griegas', ref: 'Hechos 17:16-34; 18:1; Daniel 11:2', fecha: [-750, -338],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: EGEO, capas: ['grecia-480', 'persia-500'], lugares: ['atenas', 'esparta', 'corinto', 'delfos', 'maraton', 'efeso'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-agora.webp', alt: 'El ágora de una ciudad griega, con ciudadanos conversando entre columnas, comerciantes y un templo al fondo', pie: 'El ágora, plaza y centro de la vida de la ciudad griega.', origen: 'ia' }
      ],
      texto: [
        'La antigua Grecia no era un país unido sino un conjunto de ciudades independientes, llamadas polis, separadas por montañas y por el mar. Cada una tenía su gobierno, sus leyes, su ejército y su dios protector. Las más poderosas fueron Atenas, ciudad de comercio, arte y pensamiento, y Esparta, una sociedad militar. Corinto, entre los dos mares, era un gran puerto comercial. Muchas ciudades griegas fundaron colonias por todo el Mediterráneo.',
        'Atenas desarrolló una forma de gobierno en la que los ciudadanos varones votaban en asamblea las decisiones de la ciudad: la democracia. Esa asamblea se llamaba ekklesía, la misma palabra que el Nuevo Testamento usa para la iglesia, el pueblo convocado por Dios.',
        'Hacia 500 a.C., las ciudades griegas de Asia Menor estaban bajo dominio persa. Su rebelión llevó a las guerras con Persia: Maratón (490 a.C.) y Salamina (480 a.C.), que el recurso del imperio persa cuenta en detalle. Daniel lo había anunciado: el cuarto rey persa levantaría a todos «contra el reino de Grecia» (Dn 11:2). Tras la victoria, Atenas vivió su siglo de oro, con el Partenón, el teatro y los grandes filósofos.',
        'Pero las ciudades no lograron unirse. Atenas y Esparta se enfrentaron en una larga guerra, y en 338 a.C. Filipo II, rey de Macedonia, en el norte, venció a las ciudades griegas y las sometió. Siglos después, Pablo predicaría en esas mismas ciudades: en el Areópago de Atenas (Hch 17:22) y en Corinto (Hch 18:1).'
      ],
      pensar: 'La palabra griega ekklesía, la asamblea de los ciudadanos, pasó a nombrar a la iglesia: el pueblo que Dios llama a reunirse. ¿Qué significa para ti pertenecer a esa asamblea convocada por Dios?'
    },
    {
      id: 'alejandro', n: 'Alejandro Magno', ref: 'Daniel 2:39; 7:6; 8:5-8, 21; 11:3', fecha: [-336, -323],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '336 a.C.: Alejandro hereda Macedonia y Grecia; Persia domina el Oriente.', fecha: -336,
            estado: { view: MUNDO, capas: ['casandro-301', 'persia-336'], lugares: ['pella', 'atenas', 'persepolis'] } },
          { t: '334–331 a.C.: Gránico, Issos, Tiro, Egipto y Gaugamela.', fecha: [-334, -331],
            estado: { view: REINOS, capas: ['casandro-301', 'persia-336'], lugares: ['granico', 'issos', 'tiro', 'alejandria', 'gaugamela'], trazos: ['alejandro'] } },
          { t: '330–325 a.C.: Persépolis, Bactria y el río Hidaspes, en la India.', fecha: [-330, -325],
            estado: { view: MUNDO, capas: ['alejandro-323'], lugares: ['persepolis', 'bactra', 'hidaspes'], trazos: ['alejandro-oriente'] } },
          { t: '323 a.C.: Alejandro muere en Babilonia a los 32 años.', fecha: -323,
            estado: { view: MUNDO, capas: ['alejandro-323'], lugares: ['babilonia', 'pella', 'alejandria'] } }
        ] },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-alejandro.webp', alt: 'Alejandro Magno, joven y sin barba, a caballo al frente de su caballería macedonia', pie: 'Alejandro Magno al frente de su ejército.', origen: 'ia' }
      ],
      texto: [
        'Alejandro tenía veinte años cuando heredó el trono de Macedonia, en 336 a.C. Había sido alumno del filósofo Aristóteles y era un genio militar. En 334 cruzó a Asia con unos cuarenta mil soldados y, en menos de cuatro años, destruyó el imperio persa: venció en el río Gránico, en Issos y en Gaugamela, tomó Tiro y Egipto, donde fundó Alejandría, y entró en Babilonia, Susa y Persépolis.',
        'No se detuvo allí. Siguió hacia el oriente, por las montañas de Afganistán, hasta el río Hidaspes, en la India. Allí sus soldados, agotados después de ocho años de campaña, se negaron a seguir. Alejandro volvió a Babilonia, donde murió en 323 a.C., con apenas treinta y dos años, sin haber organizado su sucesión.',
        'La velocidad de esa conquista explica las imágenes de Daniel. El tercer imperio es un leopardo, un animal veloz, con cuatro alas de ave (Dn 7:6). Es también un macho cabrío que «venía del lado del poniente sobre la faz de toda la tierra, sin tocar tierra», con un cuerno notable entre los ojos (Dn 8:5). Y la muerte temprana del rey estaba anunciada: «estando en su mayor fuerza, aquel gran cuerno fue quebrado» (Dn 8:8). Daniel 11 lo resume: «Se levantará luego un rey valiente, el cual dominará con gran poder y hará su voluntad. Pero cuando se haya levantado, su reino será quebrantado» (Dn 11:3-4).',
        'Usa los botones bajo el mapa para seguir la campaña de Alejandro paso a paso.'
      ],
      pensar: 'Alejandro conquistó el mundo conocido, pero murió a los treinta y dos años «en su mayor fuerza» (Dn 8:8). ¿Qué te enseña su historia acerca de lo pasajero del poder humano frente al reino de Dios, que no tiene fin (Dn 2:44)?'
    },
    {
      id: 'reinos', n: 'Los reinos sucesores', ref: 'Daniel 8:8, 22; 11:4-20', fecha: [-323, -175],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '301 a.C.: tras la batalla de Ipso, el imperio queda dividido entre cuatro generales.', fecha: -301,
            estado: { view: REINOS, capas: ['casandro-301', 'lisimaco-301', 'seleucidas-301', 'ptolomeos-301'], lugares: ['pella', 'alejandria', 'antioquia', 'babilonia'] } },
          { t: 'c. 250 a.C.: Judea pertenece a los Ptolomeos de Egipto.', fecha: -250,
            estado: { view: LEVANTE, capas: ['ptolomeos-250', 'seleucidas-200'], lugares: ['alejandria', 'jerusalen', 'antioquia'] } },
          { t: '198 a.C.: Antíoco III vence en Panión, y Judea pasa a los seléucidas.', fecha: -198,
            estado: { view: LEVANTE, capas: ['seleucidas-200', 'egipto-1900'], lugares: ['panion', 'jerusalen', 'antioquia', 'alejandria'] } }
        ] },
        { tipo: 'tabla', titulo: 'Reinos', tabla: {
          titulo: 'Los cuatro reinos de Daniel 8:22', cab: ['General', 'Territorio', 'Destino'],
          filas: [
            ['Casandro', 'Macedonia y Grecia', 'Pasa a otras dinastías; Roma en 168 a.C.'],
            ['Lisímaco', 'Tracia y Asia Menor', 'Muere en 281 a.C.; su reino se reparte'],
            ['Seleuco I', 'Siria, Mesopotamia e Irán', 'Reino seléucida, el «rey del norte»'],
            ['Ptolomeo I', 'Egipto, Palestina y Chipre', 'Reino ptolemaico, el «rey del sur»']
          ],
          nota: 'Hubo años de guerra entre los generales de Alejandro, llamados diádocos, antes de esta división. Después de Ipso (301 a.C.), los cuatro reinos son la interpretación más común de los cuatro cuernos de Daniel 8.' } }
      ],
      texto: [
        'Al morir Alejandro, sus generales, llamados diádocos, lucharon por el imperio durante más de veinte años. Después de la batalla de Ipso, en 301 a.C., el territorio quedó repartido entre cuatro de ellos: Casandro en Macedonia y Grecia, Lisímaco en Tracia y Asia Menor, Seleuco en Siria, Mesopotamia e Irán, y Ptolomeo en Egipto. Daniel lo había visto: en lugar del gran cuerno quebrado «salieron otros cuatro cuernos notables hacia los cuatro vientos del cielo» (Dn 8:8), «cuatro reinos… aunque no con la fuerza de él» (Dn 8:22).',
        'Para Judea, los dos reinos importantes fueron los de Ptolomeo, al sur, y Seleuco, al norte, porque la tierra de Israel quedaba justo entre ellos. Daniel 11 los llama «el rey del sur» y «el rey del norte», y describe con detalle sus guerras, sus alianzas y sus matrimonios. Durante un siglo, desde 301 hasta 198 a.C., Judea perteneció a los Ptolomeos, que la gobernaron desde Alejandría y permitieron a los judíos vivir según su ley.',
        'En 198 a.C., el rey seléucida Antíoco III venció a los egipcios en Panión, cerca de las fuentes del Jordán, y Judea pasó al reino del norte. Al principio, Antíoco III respetó el templo y las costumbres judías, pero su hijo Antíoco IV cambió esa política.',
        'Este siglo y medio entre Alejandro y los Macabeos es el tiempo en que la cultura griega se extendió por todo el Oriente. La ruta «Sociedad y religión» muestra cómo esa cultura influyó en los judíos.'
      ],
      pensar: 'Judea quedó en medio de dos reinos poderosos que se disputaban la tierra, pero Daniel 11 muestra que ningún detalle de esa historia escapaba a Dios. ¿Qué paz te da saber que Dios conoce el curso de los acontecimientos aun cuando estás en medio de fuerzas que no controlas?'
    },
    {
      id: 'antioco', n: 'Antíoco IV y los Macabeos', ref: 'Daniel 8:9-14, 23-25; 11:21-35; Juan 10:22', fecha: [-175, -164],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-purificacion-templo.webp', alt: 'Judas Macabeo y sus hombres purifican el templo de Jerusalén y vuelven a encender el candelero', pie: 'La purificación del templo, 164 a.C.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[30.8, 33.8], [33.6, 36.8]], capas: ['seleucidas-200'], lugares: ['jerusalen', 'modin', 'antioquia'] } }
      ],
      texto: [
        'Antíoco IV, que reinó desde 175 a.C., se hacía llamar Epífanes, «dios manifestado». Quiso unificar su reino con la cultura griega y, en Judea, encontró aliados entre algunos judíos que deseaban adoptar las costumbres griegas. En Jerusalén se construyó un gimnasio, y el cargo de sumo sacerdote se compró con dinero.',
        'En 167 a.C., Antíoco prohibió la circuncisión, el sábado y la lectura de la ley, y ordenó ofrecer sacrificios a los dioses griegos. En el templo de Jerusalén levantó un altar a Zeus y sacrificó animales impuros. Daniel lo había anunciado con precisión: un rey «despreciable» que tomaría el reino con halagos (Dn 11:21), cuyas tropas «profanarán el santuario y la fortaleza, y quitarán el continuo sacrificio, y pondrán la abominación desoladora» (Dn 11:31).',
        'Pero Daniel también dijo: «el pueblo que conoce a su Dios se esforzará y actuará» (Dn 11:32). Un anciano sacerdote, Matatías, se negó a sacrificar a los ídolos en la aldea de Modín y huyó a los montes con sus hijos. Su hijo Judas, llamado Macabeo, «el martillo», dirigió una guerra de resistencia, y en diciembre de 164 a.C. recuperó Jerusalén, purificó el templo y lo volvió a dedicar a Dios. Los judíos recuerdan ese hecho en la fiesta de la Dedicación, Janucá, que Jesús celebró en Jerusalén (Jn 10:22).',
        'Estos hechos se conocen sobre todo por los libros de 1 y 2 Macabeos, que no forman parte del canon de las Escrituras que reconocen las iglesias evangélicas, pero que son una fuente histórica valiosa. La dinastía de los Macabeos, llamada asmonea, gobernó Judea con independencia hasta que Roma tomó Jerusalén en 63 a.C.'
      ],
      pensar: '«El pueblo que conoce a su Dios se esforzará y actuará» (Dn 11:32). ¿Qué significa conocer a Dios de tal manera que eso te dé firmeza cuando la cultura presiona para que abandones tu fe?'
    },
    {
      id: 'roma', n: 'Roma y el fin de los reinos griegos', ref: 'Daniel 2:40; 7:7; 11:18, 30', fecha: [-200, -30],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '190 a.C.: Roma vence a Antíoco III en Magnesia, en Asia Menor.', fecha: -190,
            estado: { view: REINOS, capas: ['seleucidas-200', 'ptolomeos-250', 'casandro-301'], lugares: ['efeso', 'antioquia', 'alejandria', 'pella'] } },
          { t: '168–146 a.C.: Roma conquista Macedonia y destruye Corinto.', fecha: [-168, -146],
            estado: { view: EGEO, capas: ['casandro-301'], lugares: ['pella', 'corinto', 'atenas'] } },
          { t: '63 a.C.: Pompeyo termina con el reino seléucida y toma Jerusalén.', fecha: -63,
            estado: { view: LEVANTE, capas: ['ptolomeos-250'], lugares: ['antioquia', 'jerusalen', 'alejandria'] } },
          { t: '30 a.C.: muere Cleopatra; Egipto, el último reino griego, pasa a Roma.', fecha: -30,
            estado: { view: LEVANTE, capas: ['egipto-romano'], lugares: ['alejandria', 'jerusalen'] } }
        ] },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-roma-llega.webp', alt: 'Legionarios romanos entran en una ciudad griega con templos de columnas, mientras sus habitantes observan', pie: 'Roma conquista el mundo griego.', origen: 'ia' }
      ],
      texto: [
        'Mientras los reinos griegos se desgastaban en guerras entre sí, en el occidente crecía un poder nuevo: Roma. En 190 a.C. venció a Antíoco III en Magnesia y le impuso una enorme indemnización; Daniel lo describe como un príncipe que haría cesar la afrenta del rey del norte (Dn 11:18). Años después, cuando Antíoco IV invadió Egipto, un embajador romano le ordenó retirarse, y el rey obedeció humillado. Daniel había anunciado que «vendrán contra él naves de Quitim» y que «se contristará, y volverá» (Dn 11:30); esa humillación lo llevó a descargar su furia contra Jerusalén.',
        'Roma fue absorbiendo uno por uno los reinos griegos. Conquistó Macedonia en 168 a.C. y destruyó Corinto en 146. En 63 a.C., el general Pompeyo terminó con el reino seléucida y entró en Jerusalén, poniendo fin a la independencia de los Macabeos. El último reino griego fue el de los Ptolomeos, que cayó en 30 a.C. con la muerte de Cleopatra.',
        'Así llegó el cuarto imperio de Daniel, el de hierro, que «desmenuza y rompe todas las cosas» (Dn 2:40), la bestia «espantosa y terrible» de Daniel 7:7, que el recurso del imperio romano estudia en detalle.',
        'Pero Roma no borró la cultura griega: la adoptó. El poeta romano Horacio escribió que Grecia, conquistada, conquistó a su fiero vencedor. En el Oriente del Imperio romano se siguió hablando griego, y en griego se escribió el Nuevo Testamento.'
      ],
      pensar: 'Los imperios pasan uno tras otro, pero Daniel anunció un reino que «no será jamás destruido» (Dn 2:44). ¿Qué lugar ocupa en tu vida la esperanza de ese reino que Dios establecerá?'
    }
  ];

  /* ---------------- Ruta 2 · Sociedad y cultura ---------------- */
  const sociedad = [
    {
      id: 'polis', n: 'La vida en la ciudad griega', ref: 'Hechos 17:17; 19:29-31; 1 Corintios 9:24-27',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-teatro.webp', alt: 'Un teatro griego al aire libre excavado en una ladera, lleno de público, con actores con máscaras en el escenario', pie: 'El teatro griego.', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Lugares', tabla: {
          titulo: 'Los lugares de la ciudad griega en el Nuevo Testamento', cab: ['Lugar', 'Qué era', 'En la Biblia'],
          filas: [
            ['Ágora', 'Plaza pública, mercado y centro de la vida social', 'Pablo discute «en la plaza cada día» (Hch 17:17)'],
            ['Teatro', 'Lugar de espectáculos y de asambleas', 'El alboroto de Éfeso (Hch 19:29-31)'],
            ['Estadio', 'Pista de carreras de los juegos atléticos', '«los que corren en el estadio» (1 Co 9:24)'],
            ['Gimnasio', 'Lugar de ejercicio y de educación de los jóvenes', 'El gimnasio de Jerusalén en tiempos de Antíoco IV'],
            ['Templo', 'Santuario del dios protector de la ciudad', 'El templo de Diana en Éfeso (Hch 19:27)']
          ] } }
      ],
      texto: [
        'La vida griega giraba en torno a la ciudad. Su centro era el ágora, una gran plaza rodeada de pórticos con columnas, donde se compraba y vendía, se discutía de política y filosofía y se encontraban los amigos. En el ágora de Atenas, Pablo «discutía… en la plaza cada día con los que concurrían» (Hch 17:17).',
        'Toda ciudad importante tenía un teatro, excavado en la ladera de una colina, donde se representaban tragedias y comedias, y que servía también para las asambleas del pueblo. En el teatro de Éfeso, con capacidad para unas veinticinco mil personas, se reunió la multitud enfurecida contra Pablo (Hch 19:29). Los griegos amaban también el deporte. En los juegos, como los de Olimpia o los de Corinto, los atletas competían en carreras y luchas para ganar una corona de hojas. Pablo usó esa imagen: los atletas corren «para recibir una corona corruptible, pero nosotros, una incorruptible» (1 Co 9:25).',
        'El gimnasio era el lugar donde los jóvenes se ejercitaban, desnudos, y recibían su educación. Para los judíos fieles era un escándalo, y cuando en tiempos de Antíoco IV se construyó un gimnasio en Jerusalén, se volvió un símbolo de la presión por abandonar la ley de Dios.',
        'La sociedad griega se apoyaba en el trabajo de los esclavos, y solo los ciudadanos varones participaban en el gobierno. El evangelio desafió esas divisiones: en Cristo «ya no hay judío ni griego; no hay esclavo ni libre; no hay varón ni mujer» (Gá 3:28).'
      ],
      pensar: 'Pablo comparó la vida cristiana con una carrera por una corona «incorruptible» (1 Co 9:25). ¿Qué disciplina necesitas para correr esa carrera con perseverancia?'
    },
    {
      id: 'dioses', n: 'Los dioses griegos', ref: 'Hechos 14:8-18; 17:16-23; 19:23-41; 1 Corintios 8:4-6',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-templo-diosa.webp', alt: 'El interior de un templo griego con una gran estatua de una diosa, iluminado por lámparas, con ofrendas en el altar', pie: 'Un templo griego con la estatua de su diosa.', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Dioses', tabla: {
          titulo: 'Dioses griegos que aparecen en el Nuevo Testamento', cab: ['Dios griego', 'Nombre romano en la RV 1960', 'Texto'],
          filas: [
            ['Zeus, rey de los dioses', 'Júpiter', 'Hch 14:12-13'],
            ['Hermes, mensajero de los dioses', 'Mercurio', 'Hch 14:12'],
            ['Ártemis, diosa de Éfeso', 'Diana', 'Hch 19:24-35'],
            ['Cástor y Pólux, protectores de los marinos', 'Cástor y Pólux', 'Hch 28:11']
          ],
          nota: 'La Reina-Valera usa los nombres romanos de estos dioses, como era costumbre en las traducciones antiguas.' } }
      ],
      texto: [
        'Los griegos adoraban a muchos dioses, que imaginaban con forma y pasiones humanas: Zeus, rey de los dioses; Atenea, diosa de la sabiduría y protectora de Atenas; Apolo, dios de la luz y de los oráculos; Ártemis, diosa de la caza, muy venerada en Éfeso, y muchos otros. Cada ciudad tenía sus templos y fiestas, y en Delfos un oráculo daba respuestas en nombre de Apolo.',
        'El Nuevo Testamento muestra varios encuentros con esta religión. En Listra, después de que Pablo sanara a un hombre cojo de nacimiento, la gente creyó que los dioses habían bajado en forma humana, llamó a Bernabé Júpiter y a Pablo Mercurio, y el sacerdote de Júpiter quiso ofrecerles sacrificios. Los apóstoles rasgaron sus ropas y les anunciaron que se convirtieran de esas vanidades «al Dios vivo, que hizo el cielo y la tierra» (Hch 14:8-15).',
        'En Éfeso, la predicación de Pablo y las sanidades que Dios hacía por sus manos hicieron que muchos abandonaran la magia y los ídolos, y los plateros que fabricaban templecillos de Diana organizaron un tumulto gritando: «¡Grande es Diana de los efesios!» (Hch 19:28). En Atenas, Pablo vio la ciudad «entregada a la idolatría» y encontró un altar con la inscripción «AL DIOS NO CONOCIDO» (Hch 17:16, 23). Desde allí les anunció al Dios que hizo el mundo y que no habita en templos hechos por manos humanas.',
        'Para los creyentes de origen griego, salir de esa religión tenía un precio: significaba dejar las fiestas de la ciudad y, a veces, el oficio. Pablo les recordó que «un ídolo nada es en el mundo», y que «para nosotros, sin embargo, sólo hay un Dios, el Padre» (1 Co 8:4, 6).'
      ],
      pensar: 'En Atenas había un altar «AL DIOS NO CONOCIDO», y Pablo les anunció a ese Dios (Hch 17:23). ¿Qué búsquedas espirituales ves hoy a tu alrededor, y cómo podrías presentar a Cristo a partir de ellas?'
    },
    {
      id: 'filosofia', n: 'La filosofía griega', ref: 'Hechos 17:18-32; 1 Corintios 1:18-25; Colosenses 2:8',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-filosofos.webp', alt: 'Filósofos griegos conversan bajo un pórtico de columnas mientras sus discípulos escuchan', pie: 'Filósofos y discípulos bajo un pórtico.', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Porque los judíos piden señales, y los griegos buscan sabiduría; pero nosotros predicamos a Cristo crucificado.', ref: '1 Corintios 1:22-23' }
      ],
      texto: [
        'Los griegos se preguntaron como nadie antes por el origen del mundo, la verdad, la justicia y la vida buena. Sócrates, en Atenas, enseñaba haciendo preguntas; su discípulo Platón fundó la Academia, y el discípulo de Platón, Aristóteles, fue maestro de Alejandro Magno. Su pensamiento influyó en toda la cultura occidental.',
        'En tiempos del Nuevo Testamento había dos escuelas muy extendidas. Los estoicos enseñaban a aceptar el destino con serenidad y a vivir según la razón que, pensaban, ordena el universo. Los epicúreos buscaban una vida tranquila, sin dolor ni temor a los dioses ni a la muerte. Con ellos discutió Pablo en Atenas, y algunos lo llamaron «palabrero» (Hch 17:18). En el Areópago, Pablo citó a poetas griegos, «Porque linaje suyo somos» (Hch 17:28), para anunciar al Dios creador y llamar al arrepentimiento.',
        'El punto de choque fue la resurrección: «cuando oyeron lo de la resurrección de los muertos, unos se burlaban» (Hch 17:32). Para muchos griegos, el cuerpo era una cárcel del alma, y la idea de que los muertos resucitaran les parecía absurda. Por eso Pablo escribió que el mensaje de «Cristo crucificado» era «para los gentiles locura», pero para los llamados es «poder de Dios, y sabiduría de Dios» (1 Co 1:23-24).',
        'La Biblia no rechaza el pensamiento, pero advierte: «Mirad que nadie os engañe por medio de filosofías y huecas sutilezas, según las tradiciones de los hombres… y no según Cristo» (Col 2:8). La verdadera sabiduría comienza en Dios y se revela en Cristo.'
      ],
      pensar: 'Para los griegos, la cruz y la resurrección parecían locura, pero Pablo las llamó «poder de Dios, y sabiduría de Dios» (1 Co 1:24). ¿Cómo respondes cuando tu fe parece una locura para quienes te rodean?'
    },
    {
      id: 'helenismo', n: 'El helenismo y los judíos', ref: 'Hechos 6:1; 2:5-11; Juan 7:35; Santiago 1:1',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-septuaginta.webp', alt: 'Ancianos judíos traducen las Escrituras hebreas al griego en una sala de Alejandría, con rollos sobre las mesas', pie: 'La traducción de las Escrituras al griego en Alejandría.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: REINOS, capas: ['ptolomeos-250', 'seleucidas-200'], lugares: ['alejandria', 'antioquia', 'jerusalen', 'efeso', 'babilonia'] } }
      ],
      texto: [
        'Después de Alejandro, la cultura griega se extendió por todo el Oriente: ciudades nuevas con templos, teatros y gimnasios, escuelas, y sobre todo una lengua común, el griego koiné, que se hablaba desde Egipto hasta la India. Esta mezcla de la cultura griega con las culturas locales se llama helenismo, de Hélade, el nombre griego de Grecia.',
        'Los judíos vivieron el helenismo de muchas maneras. Grandes comunidades se establecieron fuera de Judea, en la llamada diáspora: en Alejandría, Antioquía, Asia Menor y Roma. Muchos de ellos ya no entendían el hebreo, y en Alejandría, en el siglo III a.C., se tradujeron las Escrituras al griego, en la versión llamada Septuaginta. Las sinagogas, lugares de oración y lectura de la ley, se multiplicaron por todo el mundo griego.',
        'El helenismo también dividió al pueblo. Algunos judíos adoptaron con entusiasmo las costumbres griegas; otros las resistieron como una amenaza a la fe. Esa tensión estalló en tiempos de Antíoco IV y la rebelión de los Macabeos. Siglos después todavía se notaba en la iglesia de Jerusalén, donde hubo murmuración «de los griegos contra los hebreos», es decir, de los judíos de habla griega contra los de habla aramea (Hch 6:1).',
        'Dios usó todo ese mundo para preparar el evangelio. El día de Pentecostés, en Jerusalén había judíos «de todas las naciones bajo el cielo» (Hch 2:5), y las sinagogas de la diáspora fueron los primeros lugares donde Pablo predicó en cada ciudad.'
      ],
      pensar: 'La lengua común, las sinagogas y las Escrituras en griego prepararon el camino del evangelio (Gá 4:4). ¿Qué puentes culturales, idiomas o lugares podría usar Dios hoy para llevar el evangelio a otros por medio de ti?'
    },
    {
      id: 'legado', n: 'El legado griego', ref: 'Juan 1:1; Hechos 18:12; 1 Corintios 9:24; Apocalipsis 1:8',
      visual: [
        { tipo: 'tabla', titulo: 'Legado', tabla: {
          titulo: 'Lo que dejó el mundo griego', cab: ['Legado', 'Qué es', 'Dónde lo vemos'],
          filas: [
            ['El griego del Nuevo Testamento', 'El koiné, lengua común del Oriente', 'Los 27 libros del Nuevo Testamento'],
            ['Alfabeto con vocales', 'Los griegos agregaron vocales al alfabeto fenicio', '«Yo soy el Alfa y la Omega» (Ap 1:8)'],
            ['Palabras de la fe', 'Evangelio, iglesia, Cristo, apóstol, bautismo', 'En todo el Nuevo Testamento'],
            ['Democracia y ekklesía', 'La asamblea de los ciudadanos', 'La palabra «iglesia»'],
            ['Filosofía y ciencia', 'Lógica, geometría de Euclides, medición de la Tierra por Eratóstenes', 'La base del pensamiento occidental'],
            ['Juegos y teatro', 'Olimpiadas, estadio, tragedia y comedia', '1 Co 9:24-27; 2 Ti 4:7-8'],
            ['La Septuaginta', 'Las Escrituras traducidas al griego', 'La citan muchos textos del Nuevo Testamento']
          ] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-escriba.webp', alt: 'Un escriba del siglo I copia en griego un rollo de papiro a la luz de una lámpara de aceite', pie: 'La copia de textos en griego.', origen: 'ia' }
      ],
      texto: [
        'El mundo griego dejó una herencia enorme, y una parte de ella está unida a la historia de la Biblia.',
        { h: 'La lengua del Nuevo Testamento' },
        'El legado más importante para el creyente es la lengua. Gracias a la expansión del griego koiné, el Nuevo Testamento se escribió en una lengua que entendían personas de todo el Imperio romano. Muchas palabras de nuestra fe vienen del griego: evangelio, «buena noticia»; iglesia, de ekklesía, «asamblea»; Cristo, «ungido», la traducción de Mesías; apóstol, «enviado»; bautismo, «inmersión». El propio Jesús se presenta en el Apocalipsis con la primera y la última letra del alfabeto griego: «Yo soy el Alfa y la Omega» (Ap 1:8).',
        'Los griegos tomaron el alfabeto de los fenicios y le agregaron letras para las vocales, creando el primer alfabeto completo. De él vienen el alfabeto latino que usamos y el cirílico.',
        { h: 'Pensamiento, ciencia y cultura' },
        'La filosofía, la geometría, la medicina y la historia nacieron como disciplinas en Grecia. En Alejandría, Euclides escribió sus Elementos de geometría y Eratóstenes calculó con bastante precisión el tamaño de la Tierra, siglos antes de que nadie la recorriera. Los juegos olímpicos, el teatro y la idea de un gobierno votado por los ciudadanos también son herencia griega.',
        'Dios usó esa herencia: una lengua común, caminos y ciudades conectadas para que el mensaje de Cristo llegara, en pocas décadas, desde Jerusalén hasta Roma.'
      ],
      pensar: 'Jesús se presenta como «el Alfa y la Omega», el principio y el fin (Ap 1:8). ¿Qué significa para tu vida que Cristo esté al principio y al final de toda la historia?'
    }
  ];

  /* ---------------- Ruta 3 · Grecia y la Biblia ---------------- */
  const biblia = [
    {
      id: 'javan', n: 'Javán y las costas lejanas', ref: 'Génesis 10:2-5; Isaías 66:19; Ezequiel 27:13; Joel 3:4-8; Zacarías 9:13', fecha: [-800, -500],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[30, 18], [42.5, 38]], capas: ['grecia-480'], lugares: ['atenas', 'corinto', 'efeso', 'tiro', 'jerusalen'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-puerto-tiro.webp', alt: 'Barcos mercantes griegos y fenicios en el puerto de Tiro, cargando ánforas y telas', pie: 'El comercio entre Javán y Tiro (Ez 27:13).', origen: 'ia' }
      ],
      texto: [
        'En la tabla de las naciones de Génesis 10, Javán es uno de los hijos de Jafet, y de él descienden Elisa, Tarsis, Quitim y Dodanim (Gn 10:2-4). Javán corresponde a los jonios, los griegos que vivían en las islas y en las costas de Asia Menor. Desde Javán «se poblaron las costas» (Gn 10:5): para Israel, los griegos eran el pueblo de las islas y las tierras lejanas del occidente.',
        'Los profetas los mencionan como un pueblo de navegantes y comerciantes. Ezequiel describe a Javán comerciando con Tiro «con hombres y con utensilios de bronce» (Ez 27:13): vendían y compraban esclavos. Joel denuncia que Tiro y Sidón habían vendido a los hijos de Judá «a los hijos de los griegos, para alejarlos de su tierra», y anuncia que Dios devolvería esa injusticia (Jl 3:6-8).',
        'Pero también hay esperanza para Javán. Isaías anuncia que Dios enviará mensajeros «a Tubal y a Javán, a las costas lejanas que no oyeron de mí, ni vieron mi gloria; y publicarán mi gloria entre las naciones» (Is 66:19). Esa promesa comenzó a cumplirse cuando el evangelio llegó al mundo griego en el libro de los Hechos.',
        'Zacarías, ya después del exilio, anunció un conflicto: Dios despertaría a los hijos de Sion «contra tus hijos, oh Grecia» (Zac 9:13). Muchos intérpretes ven en ese texto la lucha de los judíos contra los reyes griegos en tiempos de los Macabeos.'
      ],
      pensar: 'Dios prometió que su gloria llegaría a «las costas lejanas que no oyeron de mí» (Is 66:19). ¿Qué te dice esa promesa acerca del deseo de Dios de alcanzar a los pueblos más lejanos, y del lugar que tienes tú en esa misión?'
    },
    {
      id: 'daniel', n: 'Grecia en las visiones de Daniel', ref: 'Daniel 2:32, 39; 7:6; 8:5-8, 21-22; 10:20; 11:2-4', fecha: [-336, -301],
      visual: [
        { tipo: 'tabla', titulo: 'Símbolos', tabla: {
          titulo: 'Grecia en las visiones de Daniel', cab: ['Visión', 'Símbolo', 'Cumplimiento'],
          filas: [
            ['La estatua (Dn 2)', 'Vientre y muslos de bronce, un reino que domina toda la tierra', 'El imperio de Alejandro'],
            ['Las bestias (Dn 7)', 'Un leopardo con cuatro alas y cuatro cabezas', 'Su rapidez y su división en cuatro'],
            ['El carnero y el macho cabrío (Dn 8)', 'El macho cabrío vence al carnero; su gran cuerno se quiebra y salen cuatro', 'Alejandro vence a Persia y muere joven'],
            ['El conflicto espiritual (Dn 10)', '«el príncipe de Grecia vendrá»', 'La lucha espiritual detrás de los imperios'],
            ['Los reyes (Dn 11:2-4)', 'Un rey valiente cuyo reino se reparte a los cuatro vientos', 'Alejandro y sus sucesores']
          ] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-carnero-macho-cabrio.webp', alt: 'Un macho cabrío embiste a un carnero de dos cuernos junto a un río, en una visión dramática', pie: 'La visión del carnero y el macho cabrío (Dn 8).', origen: 'ia' }
      ],
      texto: [
        'Daniel vivió en Babilonia y en Persia, pero Dios le mostró en visiones el imperio que vendría después: Grecia. En la estatua de Daniel 2 es el reino de bronce, que «dominará sobre toda la tierra» (Dn 2:39). En Daniel 7 es un leopardo con cuatro alas de ave y cuatro cabezas (Dn 7:6): un animal veloz, con alas que lo hacen aún más rápido, y cuatro cabezas que anticipan la división en cuatro reinos.',
        'La visión más clara está en Daniel 8. Un macho cabrío viene del occidente sin tocar tierra, ataca al carnero de dos cuernos, Media y Persia, y lo derriba. Después su gran cuerno se quiebra y en su lugar salen cuatro (Dn 8:5-8). Esta vez el ángel nombra a los imperios: «El macho cabrío es el rey de Grecia, y el cuerno grande que tenía entre sus ojos es el rey primero» (Dn 8:21).',
        'En Daniel 10, el mensajero celestial habla de una lucha en el mundo espiritual: debía pelear contra «el príncipe de Persia; y al terminar con él, el príncipe de Grecia vendrá» (Dn 10:20). Detrás del paso de un imperio a otro hay una realidad espiritual que la Biblia apenas deja ver.',
        { posturas: {
          titulo: '¿Cuándo se escribió el libro de Daniel?',
          a: { n: 'La postura crítica', t: 'Como Daniel describe con tanta precisión a Alejandro, a sus sucesores y a Antíoco IV, muchos estudiosos piensan que el libro se escribió hacia 165 a.C., en tiempos de los Macabeos, presentando hechos pasados como profecía.' },
          b: { n: 'La postura de este estudio', t: 'El libro se presenta como obra de Daniel en el siglo VI a.C., y Jesús lo llama «el profeta Daniel» (Mt 24:15). Entre los Rollos del mar Muerto hay copias de Daniel de fines del siglo II a.C., y el libro ya circulaba en griego.' },
          c: 'La precisión de Daniel no es un problema para quien cree que Dios conoce el futuro y lo revela a sus profetas. Este estudio sigue la fecha tradicional y lee Daniel 8 y 11 como profecía cumplida; además, la parte final de Daniel 11 y Daniel 12 van más allá de Antíoco y apuntan al tiempo del fin.'
        } }
      ],
      pensar: 'Dios mostró a Daniel la historia de imperios que todavía no existían. ¿Qué te enseña esto acerca de la confianza que puedes tener en las profecías que todavía esperan su cumplimiento?'
    },
    {
      id: 'daniel-11', n: 'Daniel 11: el rey del norte y el rey del sur', ref: 'Daniel 11:5-35', fecha: [-301, -164],
      visual: [
        { tipo: 'tabla', titulo: 'Cumplimiento', tabla: {
          titulo: 'Daniel 11:5-35 y la historia', cab: ['Texto', 'Lo que anuncia', 'Cumplimiento histórico'],
          filas: [
            ['11:5', 'El rey del sur se hace fuerte; uno de sus príncipes, más fuerte', 'Ptolomeo I y Seleuco I'],
            ['11:6', 'Alianza por matrimonio de la hija del rey del sur', 'Berenice casada con Antíoco II (c. 252 a.C.)'],
            ['11:7-9', 'Un renuevo de su familia ataca al norte y lleva botín a Egipto', 'Ptolomeo III, hermano de Berenice'],
            ['11:10-19', 'Guerras, victoria del norte; un príncipe lo detiene', 'Antíoco III: Panión (198) y Magnesia (190)'],
            ['11:20', 'Un rey que envía un cobrador de tributos', 'Seleuco IV y su ministro Heliodoro'],
            ['11:21-24', 'Un hombre despreciable toma el reino con halagos', 'Antíoco IV Epífanes (175 a.C.)'],
            ['11:25-30', 'Campañas contra Egipto; las naves de Quitim lo detienen', 'Las campañas de 170–168 a.C. y el ultimátum de Roma'],
            ['11:31-35', 'Profana el santuario; el pueblo que conoce a su Dios resiste', 'La profanación de 167 a.C. y los Macabeos']
          ],
          nota: 'Las identificaciones siguen la interpretación histórica más difundida. Los versículos 36 a 45 se leen en este estudio como referidos al tiempo del fin.' } },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: LEVANTE, capas: ['ptolomeos-250', 'seleucidas-200'], lugares: ['antioquia', 'alejandria', 'jerusalen', 'panion'] } }
      ],
      texto: [
        'Daniel 11 es la profecía más detallada de toda la Biblia. Después de anunciar a Alejandro y la división de su reino (Dn 11:3-4), describe durante treinta versículos la historia de dos de esos reinos: el del «rey del sur», los Ptolomeos de Egipto, y el del «rey del norte», los seléucidas de Siria. Judea, situada entre ambos, sufrió sus guerras.',
        'El capítulo menciona alianzas por matrimonio que fracasan, campañas militares, victorias y derrotas, impuestos, traiciones. La tabla muestra cómo los historiadores han relacionado cada parte con hechos conocidos: el matrimonio de Berenice, hija de Ptolomeo II, con el rey seléucida Antíoco II, que terminó en tragedia; las victorias de Antíoco III, y finalmente el reinado de Antíoco IV.',
        'El centro del capítulo es Antíoco IV, «un hombre despreciable» que tomaría el reino «con halagos» (Dn 11:21). Su historia ocupa quince versículos: sus campañas contra Egipto, la intervención de las «naves de Quitim», es decir, de Roma, y su furia contra el pacto santo, que terminó en la profanación del templo y la «abominación desoladora» (Dn 11:30-31).',
        'Todo este detalle tiene un propósito pastoral. A los judíos que vivieron esas persecuciones, Daniel 11 les mostraba que Dios lo había previsto todo, que la prueba tenía un límite, «porque aun para esto hay plazo» (Dn 11:35), y que «el pueblo que conoce a su Dios se esforzará y actuará» (Dn 11:32).'
      ],
      pensar: 'Daniel 11 recordaba a los perseguidos que su prueba tenía un plazo fijado por Dios (Dn 11:35). ¿Qué consuelo te da saber que tus pruebas también tienen un límite establecido por Él?'
    },
    {
      id: 'antioco', n: 'Antíoco IV y la abominación desoladora', ref: 'Daniel 8:9-14, 23-25; 11:31-45; 12:11; Mateo 24:15; 2 Tesalonicenses 2:3-4', fecha: -167,
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-profanacion.webp', alt: 'Soldados seléucidas levantan un altar pagano en el atrio del templo de Jerusalén mientras sacerdotes judíos observan con dolor', pie: 'La profanación del templo, 167 a.C.', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Por tanto, cuando veáis en el lugar santo la abominación desoladora de que habló el profeta Daniel (el que lee, entienda)…', ref: 'Mateo 24:15' }
      ],
      texto: [
        'Daniel 8 describe a un «cuerno pequeño» que sale de uno de los cuatro reinos griegos, crece hacia «la tierra gloriosa», quita «el continuo sacrificio» y echa por tierra el santuario (Dn 8:9-11). Es «un rey altivo de rostro» que se levantaría al final de esos reinos (Dn 8:23). Daniel 11 lo describe con más detalle y anuncia que pondría «la abominación desoladora» (Dn 11:31).',
        'Todo eso se cumplió en Antíoco IV. En 167 a.C. suspendió los sacrificios del templo, levantó sobre el altar de Dios un altar pagano y persiguió a quienes guardaban la ley. Daniel anunció también un plazo: «Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado» (Dn 8:14). En 164 a.C., Judas Macabeo purificó el templo.',
        'Pero la Biblia muestra que Antíoco no agota la profecía. Dos siglos después, Jesús habló de la abominación desoladora «de que habló el profeta Daniel» como algo todavía futuro: «cuando veáis en el lugar santo la abominación desoladora… entonces los que estén en Judea, huyan a los montes» (Mt 24:15-16). Y Pablo describe a «el hombre de pecado» que se sentará en el templo de Dios haciéndose pasar por Dios (2 Ts 2:3-4).',
        'En la interpretación dispensacionalista que sigue este estudio, Antíoco IV es una figura, un anticipo histórico, del Anticristo del tiempo del fin. Daniel 11:36-45 pasa de Antíoco a ese rey final, que «se engrandecerá sobre todo dios» (Dn 11:36), y su abominación ocurrirá en un templo reconstruido en Jerusalén, a la mitad de la semana setenta de Daniel, durante la Tribulación. El estudio de Daniel y el esquema escatológico desarrollan este tema.'
      ],
      pensar: 'Antíoco profanó el templo, pero Dios fijó un límite y el santuario fue purificado (Dn 8:14). ¿Qué esperanza te da saber que el mal, aun en su forma final, tiene un fin determinado por Dios?'
    },
    {
      id: 'intertestamentario', n: 'Entre los dos testamentos', ref: 'Malaquías 4:5-6; Juan 10:22-23; Gálatas 4:4; Lucas 1:17', fecha: [-430, -5],
      visual: [
        { tipo: 'tabla', titulo: 'Período', tabla: {
          titulo: 'Lo que cambió entre Malaquías y Mateo', cab: ['Antes (Malaquías, c. 430 a.C.)', 'Después (Mateo, s. I d.C.)'],
          filas: [
            ['Judea bajo Persia', 'Judea bajo Roma, con reyes herodianos'],
            ['Se habla hebreo y arameo', 'Se habla arameo, y el griego es la lengua común del Oriente'],
            ['El templo de Zorobabel', 'El templo ampliado por Herodes'],
            ['Pocas comunidades fuera de Judea', 'Sinagogas en todo el mundo griego y romano'],
            ['Sin partidos religiosos', 'Fariseos, saduceos y esenios'],
            ['Escrituras en hebreo', 'Escrituras también en griego (Septuaginta)']
          ] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-sinagoga.webp', alt: 'Una sinagoga del siglo I con hombres judíos sentados en bancos de piedra escuchando la lectura de un rollo', pie: 'Una sinagoga del período intertestamentario.', origen: 'ia' }
      ],
      texto: [
        'Entre el último profeta del Antiguo Testamento, Malaquías, y el nacimiento de Jesús pasaron unos cuatrocientos años sin un nuevo libro de las Escrituras. A ese tiempo se le llama período intertestamentario, y en gran parte fue un período griego.',
        'En esos siglos ocurrieron cambios que explican el mundo de los Evangelios. Se multiplicaron las sinagogas, donde se leía la ley cada sábado. Surgieron los fariseos, celosos de la ley y de sus tradiciones, y los saduceos, ligados a la aristocracia del templo. Las Escrituras se tradujeron al griego, y la esperanza en el Mesías se intensificó, sobre todo después de la persecución de Antíoco IV.',
        'También nació una fiesta nueva, la Dedicación o Janucá, que recordaba la purificación del templo por Judas Macabeo. El Evangelio de Juan la menciona: «Celebrábase en Jerusalén la fiesta de la dedicación. Era invierno, y Jesús andaba en el templo por el pórtico de Salomón» (Jn 10:22-23). En esa fiesta, que recordaba la liberación del templo, Jesús declaró: «Yo y el Padre uno somos» (Jn 10:30).',
        'Dios no estuvo ausente en esos siglos de silencio profético. Malaquías había terminado anunciando que Dios enviaría al profeta Elías antes del día de Jehová (Mal 4:5), y ese anuncio se cumplió en Juan el Bautista, que vino «con el espíritu y el poder de Elías» (Lc 1:17). Pablo lo resume así: «cuando vino el cumplimiento del tiempo, Dios envió a su Hijo» (Gá 4:4).'
      ],
      pensar: 'Durante cuatrocientos años no hubo nuevos profetas, pero Dios estaba preparando «el cumplimiento del tiempo» (Gá 4:4). ¿Cómo te ayuda esto a confiar en Dios en los períodos en que parece guardar silencio?'
    },
    {
      id: 'evangelio', n: 'El evangelio en el mundo griego', ref: 'Hechos 6:1; 11:19-26; 16–19; Romanos 1:16; Gálatas 3:28', fecha: [30, 60],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-pablo-areopago.webp', foco: '62% 50%', alt: 'El apóstol Pablo predica de pie en el Areópago de Atenas ante filósofos griegos, con la Acrópolis al fondo', pie: 'Pablo en el Areópago de Atenas (Hch 17:22).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[33, 19], [42.5, 37.5]], capas: ['grecia-480'], lugares: ['antioquia', 'efeso', 'tesalonica', 'atenas', 'corinto', 'jerusalen'] } }
      ],
      texto: [
        'El evangelio salió de Jerusalén en arameo, pero se extendió por el mundo en griego. Ya en la iglesia de Jerusalén había creyentes de habla griega, y entre ellos se eligieron los siete diáconos, todos con nombres griegos (Hch 6:1-6). Cuando la persecución dispersó a los discípulos, algunos llegaron a Antioquía y «hablaron también a los griegos, anunciando el evangelio del Señor Jesús» (Hch 11:20). Allí nació la primera iglesia formada por judíos y gentiles, y allí los discípulos fueron llamados cristianos por primera vez (Hch 11:26).',
        'Desde Antioquía, Pablo llevó el evangelio a las ciudades griegas de Asia Menor y de Grecia: Éfeso, Filipos, Tesalónica, Atenas y Corinto. En Atenas predicó en el Areópago a filósofos (Hch 17:22-31). En Corinto vivió un año y medio, y allí escribió sus cartas a los tesalonicenses (Hch 18:11).',
        'En Éfeso ocurrió algo que la iglesia pentecostal valora especialmente. Pablo encontró a unos discípulos y les preguntó: «¿Recibisteis el Espíritu Santo cuando creísteis?». No habían oído hablar de Él. Después de ser bautizados en el nombre del Señor Jesús, Pablo les impuso las manos, «vino sobre ellos el Espíritu Santo; y hablaban en lenguas, y profetizaban» (Hch 19:2-6). El mismo Espíritu de Pentecostés se derramó en el corazón del mundo griego.',
        'Así se cumplió lo que Pablo escribió: el evangelio es poder de Dios «al judío primeramente, y también al griego» (Ro 1:16), y en Cristo «ya no hay judío ni griego» (Gá 3:28).'
      ],
      pensar: 'En Éfeso, Pablo preguntó: «¿Recibisteis el Espíritu Santo cuando creísteis?» (Hch 19:2). ¿Cómo responderías hoy a esa pregunta, y qué lugar tiene el Espíritu Santo en tu vida cristiana?'
    },
    {
      id: 'arqueologia', n: 'La evidencia arqueológica', ref: 'Daniel 8:21; 11:21; Hechos 17:23; 18:12; 19:29; Romanos 16:23', fecha: [-300, 60],
      visual: [
        { tipo: 'tabla', titulo: 'Hallazgos', tabla: {
          titulo: 'Hallazgos y textos bíblicos', cab: ['Hallazgo', 'Qué muestra', 'Texto bíblico'],
          filas: [
            ['Monedas de Antíoco IV', 'El rey con el título «Theos Epifanes», «dios manifestado»', 'Dn 11:21, 36'],
            ['Rollos de Daniel de Qumrán', 'Copias de Daniel de fines del siglo II a.C.', 'Mt 24:15'],
            ['Papiros de la Septuaginta', 'Fragmentos del Antiguo Testamento en griego, desde el s. II a.C.', 'La Biblia de la diáspora'],
            ['Inscripción de Galión (Delfos)', 'Fecha el proconsulado de Galión hacia 51–52 d.C.', 'Hch 18:12'],
            ['Inscripción de Erasto (Corinto)', 'Un funcionario llamado Erasto pavimentó una plaza', 'Ro 16:23'],
            ['Teatro de Éfeso', 'Teatro para unas veinticinco mil personas', 'Hch 19:29'],
            ['Advertencia del templo de Herodes', 'Inscripción en griego que prohíbe a los extranjeros pasar al atrio interior', 'Hch 21:28-29; Ef 2:14']
          ],
          nota: 'La relación del Erasto de la inscripción con el de Romanos 16:23 es probable, aunque se discute.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/grecia-teatro-efeso.webp', alt: 'Arqueólogos del siglo XX excavan el gran teatro de Éfeso, con las gradas de piedra a la vista', pie: 'Recreación de las excavaciones del teatro de Éfeso.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[30.5, 20], [41, 37]], capas: ['grecia-480'], lugares: ['delfos', 'corinto', 'efeso', 'jerusalen', 'alejandria'] } }
      ],
      texto: [
        'El mundo griego dejó abundantes restos: templos, teatros, inscripciones, monedas y papiros. Algunos iluminan directamente los textos bíblicos.',
        'Las monedas de Antíoco IV lo muestran con el título «Theos Epifanes», «dios manifestado», el mismo orgullo que describe Daniel: un rey que «se engrandecerá sobre todo dios» (Dn 11:36). Entre los Rollos del mar Muerto, descubiertos en Qumrán desde 1947, hay varias copias del libro de Daniel, algunas de fines del siglo II a.C. Muestran que Daniel ya se copiaba y leía como Escritura poco después de los Macabeos. Y los papiros de la Septuaginta, hallados en Egipto, confirman que el Antiguo Testamento circulaba en griego antes de Jesús.',
        'Del Nuevo Testamento hay hallazgos notables. En Delfos se encontró una inscripción del emperador Claudio que menciona a Galión como procónsul de Acaya, lo que permite fechar la estadía de Pablo en Corinto hacia el año 51 (Hch 18:12). En Corinto apareció una inscripción en el pavimento que nombra a un funcionario llamado Erasto, probablemente el «tesorero de la ciudad» que saluda en Romanos 16:23. En Éfeso se conserva el gran teatro donde se reunió la multitud contra Pablo (Hch 19:29).',
        'En Jerusalén se encontraron dos inscripciones en griego del templo de Herodes que advierten a los extranjeros que no pasen del atrio de los gentiles, bajo pena de muerte. Es la «pared intermedia de separación» que Pablo dice que Cristo derribó (Ef 2:14).'
      ],
      pensar: 'En el templo había una inscripción que separaba a judíos y gentiles, pero Pablo dice que Cristo «derribando la pared intermedia de separación» (Ef 2:14). ¿Qué separaciones entre personas está llamado a derribar el evangelio hoy?'
    }
  ];

  window.RUTA_DATA = {
    titulo: 'El imperio griego',
    credito: 'Citas textuales: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso. Fronteras de los mapas aproximadas.',
    marca: 'Recursos Bíblicos',
    inicio: '../../',
    rutas: [
      { id: 'historia', grupo: 'El imperio griego', n: 'Historia', info: 'Las ciudades griegas, Alejandro, los reinos sucesores, los Macabeos y Roma',
        linea: { desde: -520, hasta: -20, hitos: [
          { a: -480, t: 'Salamina' }, { a: -336, t: 'Alejandro' }, { a: -323, t: 'Muere Alejandro' },
          { a: -198, t: 'Panión' }, { a: -167, t: 'Templo profanado' }, { a: -63, t: 'Pompeyo' }
        ] },
        estaciones: historia },
      { id: 'sociedad', grupo: 'El imperio griego', n: 'Sociedad y cultura', info: 'La ciudad, los dioses, la filosofía, el helenismo y el legado', estaciones: sociedad },
      { id: 'biblia', grupo: 'El imperio griego', n: 'Grecia y la Biblia', info: 'Javán, Daniel 2, 7, 8 y 11, Antíoco IV, el período entre testamentos y el evangelio entre los griegos',
        linea: { desde: -820, hasta: 80, hitos: [
          { a: -760, t: 'Joel y Javán' }, { a: -336, t: 'Alejandro' }, { a: -167, t: 'Abominación' },
          { a: -5, t: 'Nace Jesús' }, { a: 51, t: 'Pablo en Corinto' }
        ] },
        estaciones: biblia }
    ]
  };
})();
