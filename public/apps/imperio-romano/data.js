/* ==========================================================
   Recursos Bíblicos — El imperio romano · contenido de las rutas
   Motor: ../assets/js/ruta-estudio.js (formato descrito en su encabezado).
   Geografía: ../assets/js/imperios-geo.js. Citas textuales: Reina-Valera 1960.
   Las referencias del texto se vuelven burbujas con citas.js (texto en /biblia/).
   Diferencias entre la historia y el texto bíblico: bloque { posturas };
   nunca se presenta el texto bíblico como error. En temas doctrinales
   prevalece la línea pentecostal clásica (Asambleas de Dios), con escatología
   dispensacionalista. La crucifixión y las persecuciones se describen sin detalles crudos.
   ========================================================== */
(() => {
  const MEDITERRANEO = [[23, -6], [52, 50]];
  const ORIENTE = [[28, 18], [43, 42]];
  const JUDEA = [[30.8, 33.8], [33.4, 36.4]];

  /* ---------------- Ruta 1 · Historia ---------------- */
  const historia = [
    {
      id: 'en-la-biblia', n: 'Roma en la Biblia', ref: 'Daniel 2:40; 7:7; Lucas 2:1; 3:1; Hechos 28:14-16; Apocalipsis 17:9', fecha: [-63, 96],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-foro.webp', alt: 'El foro romano en su esplendor, con templos de mármol, arcos y ciudadanos con togas, al atardecer', pie: 'El foro de Roma.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: MEDITERRANEO, capas: ['roma-14'], lugares: ['roma', 'jerusalen', 'alejandria', 'antioquia', 'atenas'] } }
      ],
      texto: [
        'Roma es el imperio del Nuevo Testamento. Jesús nació cuando un edicto de Augusto César ordenó que «todo el mundo fuese empadronado» (Lc 2:1); su ministerio comenzó «en el año decimoquinto del imperio de Tiberio César» (Lc 3:1), y fue crucificado bajo el gobernador romano Poncio Pilato. El libro de los Hechos termina con Pablo en Roma, la capital del imperio, predicando el reino de Dios.',
        'Roma ya estaba anunciada en el Antiguo Testamento. Para la mayoría de los intérpretes, es el cuarto reino de Daniel: el reino de hierro de la estatua, que «desmenuza y rompe todas las cosas» (Dn 2:40), y la cuarta bestia, «espantosa y terrible y en gran manera fuerte», con dientes de hierro y diez cuernos (Dn 7:7).',
        'Roma fue el imperio más extenso y duradero de los que rodearon a Israel. Comenzó como una pequeña ciudad de Italia y llegó a dominar todo el Mediterráneo, desde Hispania hasta Mesopotamia. Durante su gobierno, el templo de Jerusalén fue destruido en el año 70, y los cristianos sufrieron persecuciones. Pero también fue en su territorio, por sus caminos y en su paz, donde el evangelio se extendió desde Jerusalén hasta los confines del mundo conocido.',
        'En el Apocalipsis, la gran ciudad que se sienta sobre «siete montes» (Ap 17:9) recuerda a Roma, la ciudad de las siete colinas. Este recurso recorre su historia, su sociedad y su lugar en la Biblia, hasta la profecía del tiempo del fin.'
      ],
      pensar: 'Dios hizo nacer a su Hijo en el momento en que un imperio unía todo el mundo conocido con caminos, leyes y una lengua común (Gá 4:4). ¿Qué te enseña esto acerca de cómo Dios gobierna la historia para cumplir su propósito de salvación?'
    },
    {
      id: 'republica', n: 'De ciudad a dueña del Mediterráneo', ref: 'Daniel 2:40; 11:18, 30; 1 Macabeos 8 (fuente histórica)', fecha: [-509, -31],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '133 a.C.: la república romana domina Italia, Hispania, Cartago, Grecia y Asia.', fecha: -133,
            estado: { view: MEDITERRANEO, capas: ['roma-133', 'seleucidas-200', 'ptolomeos-250'], lugares: ['roma', 'cartago', 'corinto', 'efeso'] } },
          { t: '63 a.C.: Pompeyo anexa Siria y entra en Jerusalén.', fecha: -63,
            estado: { view: MEDITERRANEO, capas: ['roma-133', 'ptolomeos-250'], lugares: ['roma', 'antioquia', 'jerusalen'] } },
          { t: '14 d.C.: a la muerte de Augusto, el Mediterráneo es un mar romano.', fecha: 14,
            estado: { view: MEDITERRANEO, capas: ['roma-14'], lugares: ['roma', 'alejandria', 'antioquia', 'jerusalen'] } }
        ] },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-senado.webp', alt: 'Senadores romanos con togas blancas debaten en la curia del senado', pie: 'El senado romano.', origen: 'ia' }
      ],
      texto: [
        'Según la tradición romana, Roma fue fundada en 753 a.C. junto al río Tíber. Al principio la gobernaron reyes, pero en 509 a.C. los romanos los expulsaron y crearon una república, gobernada por un senado y por magistrados elegidos cada año. Durante siglos fueron conquistando las ciudades vecinas, hasta dominar toda Italia.',
        'Después vino la expansión por el Mediterráneo. En las guerras contra Cartago, la gran ciudad comercial del norte de África, Roma se convirtió en potencia naval, y en 146 a.C. destruyó Cartago. Ese mismo año destruyó Corinto y dominó Grecia. Antes había vencido a los reinos griegos de Oriente: en 190 a.C. derrotó a Antíoco III, y en 168 obligó a Antíoco IV a retirarse de Egipto, como anuncia Daniel con las «naves de Quitim» (Dn 11:30).',
        'En 63 a.C., el general Pompeyo anexó Siria y entró en Jerusalén, poniendo fin a la independencia de los Macabeos. Pero la república se desangraba en guerras civiles entre sus generales: Pompeyo, Julio César, Marco Antonio. En 31 a.C., Octavio, sobrino adoptivo de César, venció a Antonio y Cleopatra en Accio, y poco después recibió el título de Augusto. Roma pasó de república a imperio.',
        'Usa los botones bajo el mapa para ver cómo Roma pasó de dominar Italia a rodear todo el Mediterráneo.'
      ],
      pensar: 'Roma creció conquista tras conquista, como el hierro que «desmenuza y rompe todas las cosas» (Dn 2:40). ¿Qué diferencia hay entre el poder que se impone por la fuerza y el reino de Cristo, que se extiende por el amor y la verdad?'
    },
    {
      id: 'judea', n: 'Roma en Judea', ref: 'Mateo 2:1-16; Lucas 2:1-3; 3:1; Juan 11:48; 19:12-16', fecha: [-63, 66],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-templo-herodes.webp', alt: 'El templo de Jerusalén ampliado por Herodes, con sus grandes atrios y pórticos, visto desde el monte de los Olivos', pie: 'El templo de Herodes en tiempos de Jesús.', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Gobernantes', tabla: {
          titulo: 'Quién gobernaba Judea en el Nuevo Testamento', cab: ['Gobernante', 'Período', 'En la Biblia'],
          filas: [
            ['Herodes el Grande, rey', '37–4 a.C.', 'Mt 2:1-16; Lc 1:5'],
            ['Arquelao, etnarca de Judea', '4 a.C.–6 d.C.', 'Mt 2:22'],
            ['Herodes Antipas, tetrarca de Galilea', '4 a.C.–39 d.C.', 'Lc 3:1; 13:31-32; 23:7-12'],
            ['Poncio Pilato, gobernador de Judea', '26–36 d.C.', 'Mt 27; Lc 3:1; Jn 18–19'],
            ['Herodes Agripa I, rey', '41–44 d.C.', 'Hch 12'],
            ['Félix y Festo, gobernadores', '52–62 d.C.', 'Hch 23–26'],
            ['Herodes Agripa II, rey', '48–c. 92 d.C.', 'Hch 25:13–26:32']
          ] } }
      ],
      texto: [
        'Después de que Pompeyo tomara Jerusalén en 63 a.C., Roma gobernó Judea a través de reyes aliados y, más tarde, de gobernadores romanos. El más famoso de esos reyes fue Herodes el Grande, un idumeo que el senado romano nombró «rey de los judíos» en 40 a.C. y que conquistó Jerusalén en 37 a.C. Fue un gran constructor: levantó fortalezas como Masada, la ciudad portuaria de Cesarea y, sobre todo, amplió el templo de Jerusalén hasta convertirlo en una de las maravillas de su tiempo. También fue cruel y desconfiado, y en sus últimos años mandó matar a los niños de Belén (Mt 2:16).',
        'Al morir Herodes, su reino se dividió entre sus hijos: Arquelao en Judea (Mt 2:22), Herodes Antipas en Galilea, el que hizo decapitar a Juan el Bautista, y Felipe en el noreste (Lc 3:1). Arquelao fue tan malo que Roma lo destituyó en el año 6 d.C., y desde entonces Judea fue gobernada directamente por funcionarios romanos, como Poncio Pilato.',
        'Los judíos pagaban impuestos a Roma, y había tropas romanas en Jerusalén, en la fortaleza Antonia, junto al templo. Las autoridades judías temían que cualquier agitación provocara la intervención romana: «vendrán los romanos, y destruirán nuestro lugar santo y nuestra nación» (Jn 11:48). Por eso, en el juicio de Jesús, presionaron a Pilato recordándole su lealtad a César (Jn 19:12).',
        'Esa tensión creció durante décadas hasta estallar en la gran rebelión del año 66, que terminó con la destrucción de Jerusalén.'
      ],
      pensar: 'Los líderes de Jerusalén temían perder su lugar ante Roma (Jn 11:48), y por eso entregaron a Jesús. ¿Qué temores pueden llevar a una persona a apartarse de la verdad, y cómo nos libra de ellos la confianza en Dios?'
    },
    {
      id: 'emperadores', n: 'Los emperadores y el Nuevo Testamento', ref: 'Lucas 2:1; 3:1; Mateo 22:17-21; Hechos 11:28; 18:2; 25:11; Apocalipsis 1:9', fecha: [-27, 96],
      visual: [
        { tipo: 'tabla', titulo: 'Emperadores', tabla: {
          titulo: 'Los emperadores romanos y el Nuevo Testamento', cab: ['Emperador', 'Reinado', 'En la Biblia'],
          filas: [
            ['Augusto', '27 a.C.–14 d.C.', 'El censo del nacimiento de Jesús (Lc 2:1)'],
            ['Tiberio', '14–37', 'Ministerio y muerte de Jesús (Lc 3:1); la moneda del tributo (Mt 22:21)'],
            ['Calígula', '37–41', 'No se nombra'],
            ['Claudio', '41–54', 'El hambre anunciada por Agabo (Hch 11:28); expulsa a los judíos de Roma (Hch 18:2)'],
            ['Nerón', '54–68', 'Pablo apela a César (Hch 25:11); persecución en Roma (64)'],
            ['Vespasiano y Tito', '69–81', 'La destrucción de Jerusalén (70)'],
            ['Domiciano', '81–96', 'Probablemente el tiempo del destierro de Juan en Patmos (Ap 1:9)']
          ],
          nota: 'En los Evangelios y Hechos, el emperador se llama simplemente «César», un título que venía de Julio César.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-augusto.webp', alt: 'El emperador Augusto con toga y corona de laurel, de pie en un salón de mármol del palacio', pie: 'Augusto, el emperador del nacimiento de Jesús.', origen: 'ia' }
      ],
      texto: [
        'Octavio Augusto gobernó desde 27 a.C. hasta 14 d.C. y fue el primer emperador. Terminó con las guerras civiles y comenzó un largo período de estabilidad, la pax romana. En su reinado ordenó el censo que llevó a José y María a Belén (Lc 2:1-4), cumpliendo sin saberlo la profecía de que el Mesías nacería allí (Mi 5:2).',
        'Su sucesor, Tiberio, reinaba cuando Jesús comenzó su ministerio (Lc 3:1) y cuando fue crucificado. Su rostro estaba en el denario que mostraron a Jesús para preguntarle si era lícito pagar el tributo: «Dad, pues, a César lo que es de César, y a Dios lo que es de Dios» (Mt 22:21).',
        'Claudio aparece dos veces en Hechos: durante su reinado hubo la gran hambre que había anunciado el profeta Agabo «por el Espíritu» (Hch 11:28), y expulsó a los judíos de Roma, por lo que Aquila y Priscila llegaron a Corinto (Hch 18:2). El historiador romano Suetonio cuenta que esa expulsión se debió a disturbios entre los judíos «a instigación de Cresto», probablemente una referencia confusa a Cristo.',
        'Nerón era el «César» al que Pablo apeló (Hch 25:11). En el año 64, después del gran incendio de Roma, culpó a los cristianos y los persiguió con crueldad. Según la tradición, Pedro y Pablo murieron en Roma en esa época. Bajo Vespasiano y su hijo Tito fue destruida Jerusalén, y bajo Domiciano, según los escritores cristianos antiguos, Juan fue desterrado a la isla de Patmos (Ap 1:9).'
      ],
      pensar: 'Agabo anunció «por el Espíritu» un hambre que llegó en tiempos de Claudio, y la iglesia de Antioquía se preparó para ayudar (Hch 11:28-30). ¿Cómo puede la guía del Espíritu Santo preparar a la iglesia para servir en tiempos difíciles?'
    },
    {
      id: 'jerusalen-70', n: 'La destrucción de Jerusalén', ref: 'Mateo 24:1-2; Lucas 19:41-44; 21:20-24; Daniel 9:26', fecha: [66, 73],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-sitio-jerusalen.webp', alt: 'Jerusalén rodeada por el ejército romano, con el templo en llamas a lo lejos, vista desde el monte de los Olivos al anochecer', pie: 'La destrucción de Jerusalén, año 70.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: JUDEA, capas: ['roma-14'], lugares: ['jerusalen', 'masada', 'cesarea', 'nazaret'] } }
      ],
      texto: [
        'En el año 66 d.C., cansados de los abusos de los gobernadores romanos, los judíos se rebelaron. Roma envió a su general Vespasiano, que fue sometiendo Galilea y Judea. Cuando Vespasiano se convirtió en emperador, su hijo Tito continuó la guerra y sitió Jerusalén en la primavera del año 70. Después de meses de asedio y hambre, los romanos entraron en la ciudad, y en agosto el templo fue incendiado y destruido. Los últimos rebeldes resistieron en la fortaleza de Masada hasta el año 73 o 74.',
        'Jesús lo había anunciado cuarenta años antes. Al ver la ciudad, lloró sobre ella: «vendrán días sobre ti, cuando tus enemigos te rodearán con vallado, y te sitiarán… y no dejarán en ti piedra sobre piedra» (Lc 19:43-44). Y cuando sus discípulos le mostraban los edificios del templo, respondió: «no quedará aquí piedra sobre piedra, que no sea derribada» (Mt 24:2).',
        'Jesús dio también una advertencia práctica: «cuando viereis a Jerusalén rodeada de ejércitos, sabed entonces que su destrucción ha llegado», y los que estuvieran en Judea debían huir a los montes (Lc 21:20-21). El historiador cristiano Eusebio cuenta que los creyentes de Jerusalén salieron de la ciudad antes del sitio y se refugiaron en Pela, al otro lado del Jordán.',
        'Daniel ya había anunciado que, después de que se quitara la vida al Mesías, «el pueblo de un príncipe que ha de venir destruirá la ciudad y el santuario» (Dn 9:26). En la interpretación dispensacionalista que sigue este estudio, ese pueblo fue Roma, y el «príncipe que ha de venir» es el gobernante del tiempo del fin, que surgirá de ese mismo pueblo. Jesús añadió que Jerusalén sería hollada por los gentiles «hasta que los tiempos de los gentiles se cumplan» (Lc 21:24).'
      ],
      pensar: 'Jesús lloró sobre Jerusalén «por cuanto no conociste el tiempo de tu visitación» (Lc 19:44). ¿Qué significa reconocer hoy el tiempo en que Dios se acerca a nosotros, y qué pasa cuando lo dejamos pasar?'
    },
    {
      id: 'fin', n: 'De los mártires a la caída del imperio', ref: 'Apocalipsis 2:10; 6:9-11; Daniel 2:41-44', fecha: [64, 476],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '117 d.C.: con Trajano, el imperio alcanza su mayor extensión.', fecha: 117,
            estado: { view: MEDITERRANEO, capas: ['roma-117'], lugares: ['roma', 'jerusalen', 'constantinopla'] } },
          { t: '313 d.C.: Constantino da libertad al cristianismo; luego funda Constantinopla.', fecha: 313,
            estado: { view: MEDITERRANEO, capas: ['roma-14'], lugares: ['roma', 'constantinopla'] } },
          { t: '476 d.C.: cae el imperio de Occidente; el de Oriente sigue en Constantinopla.', fecha: 476,
            estado: { view: MEDITERRANEO, capas: ['roma-14'], lugares: ['roma', 'constantinopla'] } }
        ] },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-catacumbas.webp', alt: 'Cristianos del siglo II reunidos en secreto en las catacumbas de Roma, orando a la luz de lámparas de aceite', pie: 'Cristianos reunidos en las catacumbas.', origen: 'ia' }
      ],
      texto: [
        'Durante casi tres siglos, los cristianos vivieron bajo la amenaza de la persecución. No siempre fue constante, pero hubo momentos terribles: con Nerón, con Domiciano, con Decio a mediados del siglo III y con Diocleciano a comienzos del IV. A los cristianos se les acusaba de no adorar a los dioses ni al emperador. Muchos fueron fieles hasta la muerte, como Jesús pidió a la iglesia de Esmirna: «Sé fiel hasta la muerte, y yo te daré la corona de la vida» (Ap 2:10).',
        'En 313, el emperador Constantino promulgó el edicto de Milán, que daba libertad al cristianismo. Después trasladó la capital a una nueva ciudad en el Bósforo, Constantinopla. A fines del siglo IV, el imperio quedó dividido en dos mitades. La de Occidente, con Roma, cayó en 476 ante los pueblos germánicos. La de Oriente, llamada imperio bizantino, continuó hasta 1453.',
        'Daniel describe el final del cuarto reino con una imagen extraña: pies y dedos «en parte de barro cocido de alfarero y en parte de hierro», un reino dividido que no se une, «como el hierro no se mezcla con el barro» (Dn 2:41, 43). Y añade que «en los días de estos reyes el Dios del cielo levantará un reino que no será jamás destruido» (Dn 2:44).',
        'En la interpretación dispensacionalista que sigue este estudio, los diez dedos de la estatua y los diez cuernos de la cuarta bestia (Dn 7:7, 24) representan una forma final del poder romano, una confederación de reinos en el tiempo del fin, de la cual surgirá el Anticristo. Cristo, la piedra «cortada no con mano», destruirá ese último reino y establecerá su reino eterno (Dn 2:34-35, 44). El estudio de Daniel y el esquema escatológico desarrollan esta enseñanza.'
      ],
      pensar: '«Sé fiel hasta la muerte, y yo te daré la corona de la vida» (Ap 2:10). ¿Qué te enseña el testimonio de los primeros cristianos acerca del valor de permanecer fiel a Cristo cuando cuesta?'
    }
  ];

  /* ---------------- Ruta 2 · Sociedad, ley y religión ---------------- */
  const sociedad = [
    {
      id: 'vida', n: 'La vida en el imperio', ref: 'Romanos 16:3-5; Hechos 20:8-9; 1 Corintios 7:21-23; Filemón 15-16',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-calle.webp', alt: 'Una calle de Roma en el siglo I con edificios de varios pisos, tiendas, gente de distintas clases y un acueducto al fondo', pie: 'Una calle de Roma en el siglo I.', origen: 'ia' }
      ],
      texto: [
        'En el siglo I, Roma era una ciudad de cerca de un millón de habitantes, la más grande del mundo. Los ricos vivían en casas con patio y jardín; la mayoría de la gente, en edificios de varios pisos llamados ínsulas, estrechos y con riesgo de incendio. Los acueductos llevaban agua a fuentes y baños públicos, y el Estado repartía trigo gratis a los ciudadanos pobres. Los emperadores ganaban el favor del pueblo con espectáculos: carreras de carros en el Circo Máximo y, desde el año 80, luchas de gladiadores en el Coliseo.',
        'La sociedad estaba muy dividida. Arriba estaban los senadores y los caballeros; después, los ciudadanos comunes; abajo, los extranjeros y los esclavos, que podían ser una tercera parte de la población de las ciudades. Un esclavo podía ser liberado y convertirse en liberto. Las cartas de Pablo hablan a esclavos y a amos, y la breve carta a Filemón pide recibir al esclavo fugitivo Onésimo «no ya como esclavo, sino como más que esclavo, como hermano amado» (Flm 16).',
        'Las primeras iglesias se reunían en casas. Pablo saluda a Priscila y Aquila y «a la iglesia de su casa» (Ro 16:3-5), y en Troas la reunión se hizo en un aposento alto de uno de esos edificios de varios pisos, de donde cayó el joven Eutico al dormirse (Hch 20:8-9).',
        'En una sociedad tan dividida por clases, la iglesia ofrecía algo radicalmente nuevo: en la misma mesa del Señor se sentaban amos y esclavos, ricos y pobres, judíos y griegos, como hermanos en Cristo.'
      ],
      pensar: 'Pablo pidió a Filemón recibir a su esclavo «como hermano amado» (Flm 16). ¿Qué diferencias sociales o personales está llamado el evangelio a superar en tu iglesia y en tu vida?'
    },
    {
      id: 'ley', n: 'Ley, ciudadanía y justicia', ref: 'Hechos 16:35-39; 22:24-29; 25:10-12; Romanos 13:1-7; Mateo 22:15-21', 
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-pablo-festo.webp', alt: 'El apóstol Pablo de pie ante el gobernador romano Festo en su tribunal, rodeado de soldados y consejeros', pie: 'Pablo ante Festo: «A César apelo» (Hch 25:11).', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Derechos', tabla: {
          titulo: 'La ciudadanía romana en el libro de los Hechos', cab: ['Derecho', 'Qué significaba', 'Texto'],
          filas: [
            ['No ser azotado sin juicio', 'Un ciudadano no podía ser castigado sin sentencia', 'Hch 16:37; 22:25'],
            ['Juicio justo', 'Derecho a defenderse ante el acusador', 'Hch 25:16'],
            ['Apelar a César', 'Llevar la causa ante el tribunal del emperador', 'Hch 25:11-12'],
            ['Ciudadanía por nacimiento', 'Pablo la tenía desde que nació; el tribuno la había comprado', 'Hch 22:28']
          ] } }
      ],
      texto: [
        'Roma dio al mundo un sistema de leyes que todavía es la base del derecho en muchos países, incluido Chile. La ciudadanía romana daba derechos importantes: un ciudadano no podía ser azotado ni crucificado sin juicio, tenía derecho a defenderse y podía apelar al tribunal del emperador.',
        'Pablo era ciudadano romano de nacimiento, y lo usó varias veces. En Filipos, después de ser azotado y encarcelado sin juicio, exigió que los magistrados vinieran personalmente a liberarlo (Hch 16:37). En Jerusalén, cuando iban a azotarlo, preguntó: «¿Os es lícito azotar a un ciudadano romano sin haber sido condenado?» (Hch 22:25). Y ante el gobernador Festo, para no ser entregado a sus enemigos, dijo: «A César apelo» (Hch 25:11). Así llegó a Roma, como el Señor le había prometido (Hch 23:11).',
        'Los cristianos tenían que decidir cómo vivir bajo esa autoridad. Jesús enseñó: «Dad, pues, a César lo que es de César, y a Dios lo que es de Dios» (Mt 22:21). Pablo escribió a los creyentes de Roma: «Sométase toda persona a las autoridades superiores; porque no hay autoridad sino de parte de Dios» (Ro 13:1). Pero cuando la autoridad exigía desobedecer a Dios, los apóstoles respondieron: «Es necesario obedecer a Dios antes que a los hombres» (Hch 5:29).',
        'La pax romana, la paz impuesta por Roma en todo el Mediterráneo, permitió viajar con relativa seguridad por tierra y por mar. Fue uno de los medios que Dios usó para que el evangelio llegara tan lejos en tan poco tiempo.'
      ],
      pensar: 'Pablo usó sus derechos de ciudadano para servir al evangelio, y a la vez enseñó a respetar a las autoridades (Ro 13:1). ¿Cómo equilibras tu responsabilidad como ciudadano con tu lealtad primera a Dios (Hch 5:29)?'
    },
    {
      id: 'ejercito', n: 'El ejército y la cruz', ref: 'Mateo 8:5-13; 27:27-54; Marcos 15:39; Hechos 10:1-48', 
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-centurion.webp', alt: 'Un centurión romano con su casco de cresta transversal y su vara de vid, de pie en una calle de Cafarnaúm', pie: 'Un centurión romano.', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Verdaderamente este hombre era Hijo de Dios.', ref: 'Marcos 15:39' }
      ],
      texto: [
        'El ejército romano era la base del imperio. Estaba organizado en legiones de unos cinco mil soldados, divididas en centurias, cada una al mando de un centurión, un oficial experimentado. En las provincias como Judea había tropas auxiliares, y en Jerusalén una cohorte vigilaba el templo desde la fortaleza Antonia.',
        'Sorprende que el Nuevo Testamento hable bien de varios centuriones. En Cafarnaúm, un centurión pidió a Jesús que sanara a su siervo con solo una palabra, y Jesús dijo: «ni aun en Israel he hallado tanta fe» (Mt 8:10). En Cesarea, Cornelio, «centurión de la compañía llamada la Italiana», piadoso y temeroso de Dios, recibió la visita de Pedro. Mientras Pedro predicaba, «el Espíritu Santo cayó sobre todos los que oían el discurso», y los creyentes judíos vieron que «también sobre los gentiles se derramase el don del Espíritu Santo», porque los oían hablar en lenguas (Hch 10:1, 44-46). Fue el Pentecostés de los gentiles.',
        'Roma usaba la crucifixión como castigo para esclavos, rebeldes y criminales que no eran ciudadanos. Era una muerte lenta y pública, pensada para humillar y para atemorizar. Jesús fue azotado y crucificado por soldados romanos, por orden de Pilato. Sobre la cruz pusieron un título «en hebreo, en griego y en latín»: el rey de los judíos (Jn 19:19-20).',
        'Y fue un soldado romano, el centurión que estaba frente a la cruz, quien al verlo morir dijo: «Verdaderamente este hombre era Hijo de Dios» (Mr 15:39).'
      ],
      pensar: 'Sobre Cornelio y su casa, gentiles y soldados de Roma, cayó el Espíritu Santo igual que sobre los apóstoles (Hch 10:44-47). ¿Qué te dice esto acerca de a quiénes quiere alcanzar Dios con su Espíritu?'
    },
    {
      id: 'religion', n: 'Dioses, emperadores y mártires', ref: 'Hechos 17:7; 1 Corintios 12:3; Filipenses 2:9-11; Apocalipsis 2:13; 13:4-8', 
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-culto-emperador.webp', alt: 'Un templo romano dedicado al emperador, con su estatua en el interior y ciudadanos ofreciendo incienso ante un altar', pie: 'El culto al emperador.', origen: 'ia' }
      ],
      texto: [
        'Los romanos adoraban a muchos dioses: Júpiter, Juno, Minerva, Marte y otros, muchos de ellos equivalentes a los dioses griegos. La religión era sobre todo un deber cívico: los sacrificios públicos aseguraban el favor de los dioses para la ciudad. Roma toleraba las religiones de los pueblos conquistados, y reconocía el judaísmo como una religión antigua, exenta de algunos deberes religiosos.',
        'Con el imperio surgió el culto al emperador. Augusto fue declarado divino después de su muerte, y en las provincias de Oriente se levantaron templos para adorar a Roma y al emperador. Ofrecer incienso ante su imagen era una muestra de lealtad política. Un título frecuente del emperador era «señor», y algunos se hicieron llamar «señor y dios».',
        'Aquí estaba el choque. Para los cristianos solo hay un Señor: «nadie puede llamar a Jesús Señor, sino por el Espíritu Santo» (1 Co 12:3), y un día «toda lengua confiese que Jesucristo es el Señor» (Fil 2:11). Por negarse a sacrificar a los dioses y al emperador, los cristianos fueron acusados de ateos y de desleales. En Tesalónica ya los acusaban de contravenir «los decretos de César, diciendo que hay otro rey, Jesús» (Hch 17:7). En Pérgamo, donde había un gran templo al emperador, Jesús habla de «el trono de Satanás» y del mártir Antipas (Ap 2:13).',
        'El Apocalipsis muestra esa lucha en su forma final: una bestia que exige adoración y que hace guerra contra los santos (Ap 13:4-8). En la interpretación dispensacionalista que sigue este estudio, esa bestia es el Anticristo del tiempo del fin, y el culto al emperador fue un anticipo de lo que vendrá.'
      ],
      pensar: 'Para los primeros cristianos, decir que Jesús es el Señor podía costar la vida, porque el emperador también se llamaba señor (1 Co 12:3). ¿Qué significa en tu vida diaria confesar que Jesús es tu Señor?'
    },
    {
      id: 'legado', n: 'El legado de Roma', ref: 'Juan 19:20; Gálatas 4:4; Hechos 28:14-15; Romanos 15:24',
      visual: [
        { tipo: 'tabla', titulo: 'Legado', tabla: {
          titulo: 'Lo que dejó Roma', cab: ['Legado', 'Qué era', 'Dónde lo vemos'],
          filas: [
            ['Caminos', 'Más de ochenta mil kilómetros de calzadas pavimentadas', 'Los viajes de Pablo; la Vía Apia (Hch 28:15)'],
            ['Derecho romano', 'Leyes escritas, juicios y derechos del ciudadano', 'La base del derecho civil en Chile y en gran parte del mundo'],
            ['El latín', 'Lengua de Roma y de Occidente', 'El castellano viene del latín; el título de la cruz (Jn 19:20)'],
            ['Calendario juliano', 'Calendario de 365 días con año bisiesto, de Julio César', 'Los meses de julio y agosto llevan el nombre de César y Augusto'],
            ['Acueductos y arcos', 'Ingeniería del agua y construcción con hormigón', 'Acueductos que aún se conservan en Europa'],
            ['La pax romana', 'Dos siglos de relativa paz en el Mediterráneo', 'El camino abierto para el evangelio (Gá 4:4)']
          ] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-calzada.webp', alt: 'Una calzada romana pavimentada con grandes piedras que atraviesa el campo, con un mojón y viajeros a pie', pie: 'Una calzada romana.', origen: 'ia' }
      ],
      texto: [
        'Roma dejó una herencia que todavía nos rodea, y muchas de sus obras sirvieron para la expansión del evangelio.',
        { h: 'Caminos y paz' },
        'Los romanos construyeron una red de calzadas pavimentadas de más de ochenta mil kilómetros que unía todas las provincias. Por ellas viajaban los soldados, los comerciantes y también los apóstoles. Pablo llegó a Roma por la Vía Apia, donde los hermanos salieron a recibirlo «hasta el Foro de Apio y las Tres Tabernas» (Hch 28:15). La pax romana hizo posible viajar con relativa seguridad. Cuando Pablo dice que Dios envió a su Hijo «cuando vino el cumplimiento del tiempo» (Gá 4:4), muchos ven en ese mundo unido por Roma parte de esa preparación.',
        { h: 'Ley y lengua' },
        'El derecho romano, con sus leyes escritas, sus juicios y sus derechos, es la base del derecho civil de muchos países, también el de Chile. El latín, la lengua de Roma, dio origen al castellano, al portugués, al francés, al italiano y al rumano. Sobre la cruz de Jesús, el título estaba escrito «en hebreo, en griego y en latín» (Jn 19:20), las tres lenguas del mundo de entonces.',
        { h: 'Tiempo y construcción' },
        'Julio César estableció un calendario de 365 días con un año bisiesto cada cuatro, que con un pequeño ajuste posterior es el que usamos hoy; los meses de julio y agosto llevan su nombre y el de Augusto. Los ingenieros romanos construyeron acueductos, puentes, cúpulas y arcos con un hormigón que ha resistido dos mil años.'
      ],
      pensar: 'Dios usó los caminos y la paz de Roma para que el evangelio llegara hasta la capital del imperio (Hch 28:14-16). ¿Qué «caminos» de tu tiempo, como la tecnología o los viajes, puede usar Dios para llevar su Palabra?'
    }
  ];

  /* ---------------- Ruta 3 · Roma y la Biblia ---------------- */
  const biblia = [
    {
      id: 'daniel', n: 'El cuarto reino de Daniel', ref: 'Daniel 2:40-45; 7:7-8, 19-27; 9:26-27', fecha: [-63, 476],
      visual: [
        { tipo: 'tabla', titulo: 'Símbolos', tabla: {
          titulo: 'El cuarto reino en Daniel', cab: ['Visión', 'Símbolo', 'Interpretación de este estudio'],
          filas: [
            ['La estatua (Dn 2:33, 40)', 'Piernas de hierro', 'El imperio romano'],
            ['La estatua (Dn 2:41-43)', 'Pies y diez dedos de hierro y barro', 'La forma final y dividida del poder romano'],
            ['Las bestias (Dn 7:7, 23)', 'Bestia espantosa con dientes de hierro', 'El imperio romano'],
            ['Las bestias (Dn 7:8, 24)', 'Diez cuernos y un cuerno pequeño', 'Diez reyes del tiempo del fin y el Anticristo'],
            ['Las setenta semanas (Dn 9:26)', 'El pueblo de un príncipe que ha de venir', 'Roma, que destruyó Jerusalén en el año 70']
          ] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-estatua-daniel.webp', alt: 'Una estatua colosal con cabeza de oro, pecho de plata, vientre de bronce, piernas de hierro y pies de hierro y barro, golpeada por una piedra', pie: 'La estatua del sueño de Nabucodonosor (Dn 2).', origen: 'ia' }
      ],
      texto: [
        'En la estatua de Daniel 2, después de la cabeza de oro, el pecho de plata y el vientre de bronce, vienen las piernas de hierro: «el cuarto reino será fuerte como hierro; y como el hierro desmenuza y rompe todas las cosas, desmenuzará y quebrantará todo» (Dn 2:40). En Daniel 7, el cuarto reino es una bestia diferente de todas, «espantosa y terrible», con dientes de hierro y diez cuernos (Dn 7:7).',
        { posturas: {
          titulo: '¿Es Roma el cuarto reino?',
          a: { n: 'La interpretación de este estudio', t: 'Los cuatro reinos son Babilonia, Medo-Persia, Grecia y Roma. Roma sucedió a los reinos griegos, dominó la tierra de Israel en tiempos del Mesías y destruyó Jerusalén (Dn 9:26).' },
          b: { n: 'Otra propuesta', t: 'Quienes fechan Daniel hacia 165 a.C. suelen contar a Media y a Persia por separado, y hacen de Grecia el cuarto reino, terminando la profecía con Antíoco IV.' },
          c: 'El propio Daniel presenta a Media y Persia como un solo reino, el carnero de dos cuernos (Dn 8:20), y Jesús habló de la abominación desoladora de Daniel como algo todavía futuro en su tiempo (Mt 24:15). Por eso este estudio, con la interpretación cristiana más antigua, identifica el cuarto reino con Roma.'
        } },
        'Daniel dice además que el cuarto reino tendrá una etapa final: los pies y los dedos de hierro mezclado con barro, un reino dividido (Dn 2:41-43), y diez cuernos, diez reyes, entre los cuales surge un cuerno pequeño que «hablaba grandes cosas» y hace guerra contra los santos (Dn 7:8, 21, 24-25). En la interpretación dispensacionalista, esta etapa todavía es futura: una confederación de naciones vinculada a la herencia de Roma, gobernada en su último tiempo por el Anticristo.',
        'El final de las dos visiones es el mismo. Una piedra «cortada, no con mano» golpea la estatua en los pies y la desmenuza, y se convierte en un gran monte que llena toda la tierra (Dn 2:34-35). El Hijo del Hombre recibe un reino eterno (Dn 7:13-14). Ese es Cristo, y su reino no tendrá fin.'
      ],
      pensar: 'Todos los imperios de la estatua terminan desmenuzados por una piedra «cortada, no con mano» (Dn 2:34). ¿Qué significa para ti que la historia termine con el reino de Cristo y no con el de los poderosos?'
    },
    {
      id: 'nacimiento', n: 'Jesús nace bajo Augusto', ref: 'Lucas 2:1-7; Miqueas 5:2; Mateo 2:1-16; Gálatas 4:4', fecha: -5,
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-censo-belen.webp', alt: 'José y María, ella embarazada, llegan a Belén entre una multitud de viajeros que acuden a empadronarse ante funcionarios romanos', pie: 'El censo que llevó a José y María a Belén (Lc 2:1-5).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: JUDEA, capas: ['roma-14'], lugares: ['nazaret', 'belen', 'jerusalen'] } }
      ],
      texto: [
        '«Aconteció en aquellos días, que se promulgó un edicto de parte de Augusto César, que todo el mundo fuese empadronado» (Lc 2:1). Así comienza el relato del nacimiento de Jesús. Un decreto del hombre más poderoso del mundo, dictado en Roma por razones de impuestos, puso en camino a un carpintero de Nazaret y a su esposa embarazada hacia Belén, la ciudad de David.',
        'Setecientos años antes, Miqueas había anunciado: «Pero tú, Belén Efrata, pequeña para estar entre las familias de Judá, de ti me saldrá el que será Señor en Israel» (Mi 5:2). Augusto no conocía esa profecía, pero su edicto la cumplió. Dios usó al emperador para llevar a María al lugar exacto donde debía nacer el Mesías.',
        { posturas: {
          titulo: 'El censo de Cirenio',
          a: { n: 'El texto bíblico', t: 'Lucas dice que «este primer censo se hizo siendo Cirenio gobernador de Siria» (Lc 2:2), en tiempos de Herodes el Grande, que murió hacia el 4 a.C.' },
          b: { n: 'Las fuentes históricas', t: 'El historiador Josefo registra un censo de Quirinio en Judea en el año 6 d.C., unos diez años después.' },
          c: 'Lucas habla de un «primer» censo, lo que supone que hubo otro posterior, el del año 6, que él mismo menciona en Hechos 5:37. Hay inscripciones que sugieren que Quirinio tuvo funciones en Oriente antes de ser gobernador de Siria, y la palabra griega que se traduce «primer» puede entenderse también como «anterior a». Lucas, un historiador cuidadoso, distingue los dos censos.'
        } },
        'Pablo resume el sentido de esta historia: «cuando vino el cumplimiento del tiempo, Dios envió a su Hijo, nacido de mujer y nacido bajo la ley» (Gá 4:4).'
      ],
      pensar: 'Augusto creía que gobernaba el mundo, pero su edicto sirvió para cumplir una profecía de Dios (Mi 5:2). ¿Cómo has visto a Dios usar circunstancias que no controlabas para guiarte a su propósito?'
    },
    {
      id: 'jesus-pilato', n: 'Jesús ante Roma', ref: 'Mateo 22:15-22; 27:11-26; Juan 18:28–19:22', fecha: 30,
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-jesus-pilato.webp', foco: '45% 50%', alt: 'Jesús, de pie con las manos atadas, ante Poncio Pilato sentado en su tribunal en el pretorio de Jerusalén', pie: 'Jesús ante Pilato (Jn 18:33-38).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Mi reino no es de este mundo; si mi reino fuera de este mundo, mis servidores pelearían para que yo no fuera entregado a los judíos.', ref: 'Juan 18:36' }
      ],
      texto: [
        'Jesús vivió toda su vida bajo el dominio de Roma, y en varias ocasiones habló de ese poder. Cuando sus enemigos quisieron atraparlo con la pregunta de si era lícito pagar tributo a César, pidió una moneda y preguntó de quién era la imagen. «De César», respondieron, y Jesús dijo: «Dad, pues, a César lo que es de César, y a Dios lo que es de Dios» (Mt 22:21). La moneda llevaba la imagen del emperador; el ser humano lleva la imagen de Dios.',
        'Al final, Jesús fue llevado ante el gobernador romano, Poncio Pilato. Pilato le preguntó si era el rey de los judíos, y Jesús respondió: «Mi reino no es de este mundo» (Jn 18:36). Cuando Pilato le recordó que tenía autoridad para soltarlo o crucificarlo, Jesús le contestó: «Ninguna autoridad tendrías contra mí, si no te fuese dada de arriba» (Jn 19:11).',
        'Pilato no encontró delito en Jesús, pero cedió a la presión de la multitud y de los líderes, que le gritaban: «Si a éste sueltas, no eres amigo de César» (Jn 19:12). Lo entregó para ser crucificado, el castigo romano reservado a esclavos y rebeldes, y mandó escribir sobre la cruz el motivo de la condena: «JESÚS NAZARENO, REY DE LOS JUDÍOS», en hebreo, griego y latín (Jn 19:19-20).',
        'Roma ejecutó a Jesús, pero no pudo retenerlo en la tumba. Al tercer día resucitó, y el mensaje de su reino, que «no es de este mundo», llegaría en pocas décadas hasta la misma capital del imperio.'
      ],
      pensar: 'Pilato tenía el poder de Roma, pero Jesús le dijo que esa autoridad le había sido dada «de arriba» (Jn 19:11). ¿Qué paz te da saber que ningún poder humano está por encima de Dios?'
    },
    {
      id: 'iglesia', n: 'La iglesia en el imperio', ref: 'Hechos 10; 16:37; 22:25-29; 25:11; 27–28; Filipenses 1:12-14; 4:22', fecha: [30, 64],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[30.5, 10], [43.5, 37.5]], capas: ['roma-14'], lugares: ['cesarea', 'creta', 'malta', 'puteoli', 'roma'], trazos: ['viaje-roma'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-naufragio.webp', alt: 'Un barco de carga romano lucha contra una gran tormenta en el Mediterráneo, con las velas rasgadas y los marineros echando la carga al mar', pie: 'La tempestad y el naufragio de Pablo (Hch 27).', origen: 'ia' }
      ],
      texto: [
        'El libro de los Hechos cuenta cómo el evangelio avanzó dentro del imperio romano. Uno de sus primeros frutos entre los gentiles fue un oficial romano, el centurión Cornelio, sobre cuya casa cayó el Espíritu Santo (Hch 10:44-46). A partir de allí, la iglesia se abrió a todas las naciones.',
        'Pablo recorrió las provincias romanas por sus caminos y sus rutas marítimas, fundando iglesias en ciudades como Filipos, que era colonia romana, Tesalónica, Corinto y Éfeso. Su ciudadanía romana lo protegió más de una vez (Hch 16:37; 22:25). Arrestado en Jerusalén y retenido dos años en Cesarea, apeló al emperador, y fue enviado a Roma (Hch 25:11-12).',
        'El viaje fue dramático. Una tempestad arrastró el barco durante catorce días hasta naufragar en la isla de Malta, pero un ángel había asegurado a Pablo que nadie perdería la vida (Hch 27:23-24, 44). Finalmente llegó a Roma, donde vivió dos años bajo vigilancia en una casa alquilada, recibiendo a todos y «predicando el reino de Dios y enseñando acerca del Señor Jesucristo, abiertamente y sin impedimento» (Hch 28:30-31). Así termina el libro de los Hechos.',
        'Desde su prisión, Pablo escribió que sus cadenas se habían hecho conocidas «en todo el pretorio», la guardia imperial (Fil 1:13), y envió saludos de los creyentes «de la casa de César» (Fil 4:22). El evangelio había llegado al corazón mismo del imperio.'
      ],
      pensar: 'Pablo llegó a Roma como prisionero, pero predicó allí «sin impedimento» (Hch 28:31), y el evangelio llegó hasta la casa de César (Fil 4:22). ¿Cómo puede Dios usar tus propias limitaciones para extender su obra?'
    },
    {
      id: 'templo-70', n: 'La destrucción del templo', ref: 'Mateo 24:1-2, 15-21; Lucas 19:41-44; 21:5-24; Daniel 9:26-27', fecha: 70,
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-triunfo-tito.webp', alt: 'Soldados romanos llevan en desfile triunfal el candelero de oro del templo de Jerusalén por las calles de Roma', pie: 'El triunfo de Tito en Roma con el candelero del templo, año 71.', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'No quedará aquí piedra sobre piedra, que no sea derribada.', ref: 'Mateo 24:2' }
      ],
      texto: [
        'El anuncio más solemne de Jesús sobre Roma fue la destrucción del templo. Cuando los discípulos admiraban sus enormes piedras, Jesús les dijo: «no quedará aquí piedra sobre piedra, que no sea derribada» (Mt 24:2). En el año 70, los soldados de Tito incendiaron el templo, y Jerusalén quedó en ruinas. En Roma, el Arco de Tito todavía muestra en relieve a los soldados que llevan en triunfo el candelero de oro del templo.',
        'Lucas registra la advertencia con detalle: «cuando viereis a Jerusalén rodeada de ejércitos, sabed entonces que su destrucción ha llegado» (Lc 21:20). Y añade una profecía que abarca siglos: sus habitantes serían «llevados cautivos a todas las naciones», y Jerusalén «será hollada por los gentiles, hasta que los tiempos de los gentiles se cumplan» (Lc 21:24).',
        'En Mateo 24, Jesús une la destrucción del templo con los acontecimientos del fin. Habla de «la abominación desoladora de que habló el profeta Daniel» y de una «gran tribulación, cual no la ha habido desde el principio del mundo» (Mt 24:15, 21). En la interpretación dispensacionalista que sigue este estudio, la destrucción del año 70 cumplió una parte de la profecía, pero la abominación desoladora y la gran tribulación pertenecen todavía al futuro, a la última semana de Daniel (Dn 9:27), antes de la venida gloriosa de Cristo.',
        'Para los judíos, la pérdida del templo fue una catástrofe. Para los cristianos, confirmó que el sacrificio definitivo ya se había ofrecido: Cristo «se presentó una vez para siempre por el sacrificio de sí mismo» (He 9:26).'
      ],
      pensar: 'El templo de Jerusalén fue destruido, pero Cristo ofreció el sacrificio definitivo «una vez para siempre» (He 9:26). ¿Qué significa para tu fe que tu acceso a Dios no dependa de un edificio sino de la obra de Cristo?'
    },
    {
      id: 'apocalipsis', n: 'Roma en el Apocalipsis', ref: 'Apocalipsis 1:9; 2:10, 13; 13:1-10; 17:1-18; 19:11-16', fecha: [81, 96],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-juan-patmos.webp', alt: 'El anciano apóstol Juan escribe en un rollo en una cueva de la isla de Patmos, con el mar Egeo a lo lejos', pie: 'Juan en la isla de Patmos (Ap 1:9).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[35.8, 25], [40, 30.5]], capas: ['roma-14'], lugares: ['patmos', 'efeso', 'pergamo'] } }
      ],
      texto: [
        'El Apocalipsis se escribió cuando el poder de Roma pesaba sobre las iglesias. Juan estaba desterrado en la isla de Patmos «por causa de la palabra de Dios y el testimonio de Jesucristo» (Ap 1:9). La iglesia de Esmirna iba a sufrir cárcel (Ap 2:10), y en Pérgamo, donde se adoraba al emperador, ya había muerto el mártir Antipas (Ap 2:13).',
        'En ese contexto, el libro muestra una bestia que sube del mar, con diez cuernos y siete cabezas, que recibe autoridad, exige adoración y hace guerra contra los santos (Ap 13:1-8). Muestra también a una mujer, «la gran ramera», sentada sobre la bestia, ebria de la sangre de los mártires, llamada «Babilonia la grande» (Ap 17:5-6). El ángel explica que «las siete cabezas son siete montes, sobre los cuales se sienta la mujer» (Ap 17:9), y que la mujer es «la gran ciudad que reina sobre los reyes de la tierra» (Ap 17:18). Para los lectores del siglo I, esa descripción evocaba a Roma, la ciudad de las siete colinas.',
        'En la interpretación dispensacionalista que sigue este estudio, la Roma del siglo I fue un anticipo, pero estas visiones se cumplirán plenamente en el tiempo del fin: la bestia es el Anticristo, que gobernará una forma final del cuarto reino de Daniel, con diez reyes asociados (Ap 17:12), y Babilonia la grande es el sistema religioso y económico mundial que se opone a Dios. Ambos serán juzgados durante la Tribulación.',
        'El Apocalipsis no termina con la bestia, sino con Cristo. El cielo se abre y aparece el jinete fiel y verdadero, con un nombre escrito: «REY DE REYES Y SEÑOR DE SEÑORES» (Ap 19:16). El que Roma crucificó con el título de «rey de los judíos» vuelve como Rey de todos los reyes.'
      ],
      pensar: 'Roma crucificó a Jesús como «rey de los judíos», pero Él volverá como «REY DE REYES Y SEÑOR DE SEÑORES» (Ap 19:16). ¿Cómo influye en tu vida diaria la esperanza de la venida de Cristo?'
    },
    {
      id: 'arqueologia', n: 'La evidencia arqueológica', ref: 'Lucas 3:1; Juan 18:13; 19:13; Hechos 18:2; Mateo 24:2', fecha: [-4, 117],
      visual: [
        { tipo: 'tabla', titulo: 'Hallazgos', tabla: {
          titulo: 'Hallazgos y textos bíblicos', cab: ['Hallazgo', 'Qué muestra', 'Texto bíblico'],
          filas: [
            ['Inscripción de Pilato (Cesarea, 1961)', 'Nombra a «Poncio Pilato, prefecto de Judea»', 'Lc 3:1; Mt 27:2'],
            ['Osario de Caifás (Jerusalén, 1990)', 'Caja de huesos con el nombre «José hijo de Caifás»', 'Jn 18:13-14, 24'],
            ['Talón de Yehohanán (Jerusalén, 1968)', 'Huesos de un crucificado del siglo I con el clavo todavía incrustado', 'Jn 19:17-18'],
            ['Arco de Tito (Roma)', 'Relieve de los soldados con el candelero del templo', 'Mt 24:2; Lc 21:6'],
            ['Tácito, Anales 15.44', 'Cristo fue ejecutado bajo Poncio Pilato; persecución de Nerón', 'Lc 23:1-25'],
            ['Suetonio, Vida de Claudio 25', 'Claudio expulsó a los judíos de Roma por disturbios «a instigación de Cresto»', 'Hch 18:2'],
            ['Grafito de Alexámenos (Roma)', 'Burla de un cristiano que adora a un crucificado', '1 Co 1:23']
          ],
          nota: 'La identificación del osario con el sumo sacerdote Caifás de los Evangelios es la más aceptada, aunque se ha discutido.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/roma-inscripcion-pilato.webp', alt: 'Arqueólogos de 1961 descubren en el teatro de Cesarea una piedra con una inscripción latina', pie: 'Recreación del hallazgo de la inscripción de Pilato en Cesarea, 1961.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: MEDITERRANEO, capas: ['roma-14'], lugares: ['cesarea', 'jerusalen', 'roma'] } }
      ],
      texto: [
        'El período romano es uno de los mejor documentados de la Antigüedad, y muchos hallazgos confirman detalles del Nuevo Testamento.',
        'Durante mucho tiempo se dudó de algunos personajes de los Evangelios. En 1961, en el teatro de Cesarea, apareció una piedra con una inscripción latina que menciona a «Poncio Pilato, prefecto de Judea», el gobernador que juzgó a Jesús. En 1990, en Jerusalén, se encontró un osario, una caja para guardar huesos, con el nombre de «José hijo de Caifás», probablemente el sumo sacerdote que presidió el juicio de Jesús (Jn 18:13-24).',
        'En 1968 se descubrió en Jerusalén el hueso del talón de un hombre crucificado en el siglo I, llamado Yehohanán, con el clavo de hierro todavía atravesado. Es una prueba directa de que los romanos crucificaban con clavos, como describen los Evangelios. Y en Roma, el Arco de Tito, levantado para celebrar la victoria sobre Judea, muestra a los soldados llevando el candelero de oro del templo destruido en el año 70.',
        'También los escritores romanos mencionan a los cristianos. El historiador Tácito, hacia el año 116, cuenta que el nombre de los cristianos venía de Cristo, «ejecutado por el procurador Poncio Pilato en el reinado de Tiberio», y describe la persecución de Nerón. Suetonio menciona la expulsión de los judíos de Roma bajo Claudio, la misma que aparece en Hechos 18:2. Son testigos que no eran cristianos, y que confirman el marco histórico del Nuevo Testamento.'
      ],
      pensar: 'Un historiador romano que despreciaba a los cristianos confirmó que Cristo fue ejecutado bajo Poncio Pilato. ¿Por qué es importante que nuestra fe se apoye en hechos que sucedieron realmente en la historia (1 Co 15:3-8)?'
    }
  ];

  window.RUTA_DATA = {
    titulo: 'El imperio romano',
    credito: 'Citas textuales: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso. Fronteras de los mapas aproximadas.',
    marca: 'Recursos Bíblicos',
    inicio: '../../',
    rutas: [
      { id: 'historia', grupo: 'El imperio romano', n: 'Historia', info: 'De la república al imperio, Judea, los emperadores, la destrucción de Jerusalén y la caída',
        linea: { desde: -200, hasta: 500, hitos: [
          { a: -146, t: 'Cartago' }, { a: -63, t: 'Pompeyo' }, { a: -27, t: 'Augusto' },
          { a: 30, t: 'La cruz' }, { a: 70, t: 'Jerusalén' }, { a: 313, t: 'Constantino' }, { a: 476, t: 'Fin de Occidente' }
        ] },
        estaciones: historia },
      { id: 'sociedad', grupo: 'El imperio romano', n: 'Sociedad, ley y religión', info: 'La vida, la ciudadanía, el ejército, el culto al emperador y el legado', estaciones: sociedad },
      { id: 'biblia', grupo: 'El imperio romano', n: 'Roma y la Biblia', info: 'Daniel, el nacimiento y la muerte de Jesús, la iglesia en el imperio, el año 70 y el Apocalipsis',
        linea: { desde: -80, hasta: 130, hitos: [
          { a: -63, t: 'Pompeyo' }, { a: -5, t: 'Nace Jesús' }, { a: 30, t: 'La cruz' },
          { a: 60, t: 'Pablo en Roma' }, { a: 70, t: 'Cae el templo' }, { a: 95, t: 'Apocalipsis' }
        ] },
        estaciones: biblia }
    ]
  };
})();
