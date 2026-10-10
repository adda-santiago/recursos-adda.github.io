/* ==========================================================
   Recursos Bíblicos — El imperio persa · contenido de las rutas
   Motor: ../assets/js/ruta-estudio.js (formato descrito en su encabezado).
   Geografía: ../assets/js/imperios-geo.js. Citas textuales: Reina-Valera 1960.
   Las referencias del texto se vuelven burbujas con citas.js (texto en /biblia/).
   Diferencias entre la historia y el texto bíblico: bloque { posturas } con
   ambas versiones y cómo se entienden; nunca se presenta el texto bíblico como error.
   En temas doctrinales prevalece la línea pentecostal clásica (Asambleas de Dios).
   ========================================================== */
(() => {
  const ORIENTE = [[20, 18], [46, 76]];
  const NUCLEO = [[24, 30], [42, 62]];
  const EGEO = [[35.5, 19.5], [42.5, 31]];
  const VECINOS_500 = ['grecia-480'];

  const historia = [
    {
      id: 'en-la-biblia', n: 'Persia en la Biblia', ref: 'Isaías 44:28–45:4; Esdras 1:1-4; Ester 1:1; Daniel 8:20; Hechos 2:9', fecha: [-550, -330],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-persepolis.webp', alt: 'La Puerta de Todas las Naciones en Persépolis, con sus toros alados, al amanecer', pie: 'Persépolis, la ciudad ceremonial de los reyes persas.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: ORIENTE, capas: ['persia-500'], lugares: ['persepolis', 'susa', 'babilonia', 'jerusalen'] } }
      ],
      texto: [
        'Ningún imperio enmarca tantos libros de la Biblia como Persia. Bajo su dominio se escribieron o transcurren Esdras, Nehemías y Ester; en su tiempo profetizaron Hageo, Zacarías y Malaquías, y en su corte termina la vida de Daniel. Duró unos doscientos veinte años, desde que Ciro unió a medos y persas hacia 550 a.C. hasta que Alejandro Magno lo conquistó en 330 a.C., y fue el imperio más grande que el mundo había visto hasta entonces.',
        'Persia entra en la Biblia antes de existir como imperio. Más de un siglo antes, Isaías anunció a un rey llamado Ciro, a quien Dios llama «mi pastor» y «su ungido», que mandaría reconstruir Jerusalén y el templo (Is 44:28; 45:1). Dios le dice: «te puse sobrenombre, aunque no me conociste» (Is 45:4). La promesa se cumplió cuando Ciro proclamó: «Jehová el Dios de los cielos… me ha mandado que le edifique casa en Jerusalén» (Esd 1:2).',
        'El libro de Ester describe la extensión del imperio en tiempos de Asuero: reinaba «desde la India hasta Etiopía sobre ciento veintisiete provincias» (Est 1:1). Daniel lo vio en sus visiones como el segundo de los imperios: el pecho y los brazos de plata de la estatua (Dn 2:32, 39), el oso que se alzaba más de un costado (Dn 7:5) y el carnero de dos cuernos, que el ángel interpreta: «éstos son los reyes de Media y de Persia» (Dn 8:20).',
        'Su nombre aparece todavía en el Nuevo Testamento. El día de Pentecostés, cuando el Espíritu Santo descendió sobre los discípulos, entre los que oyeron las maravillas de Dios en su propia lengua había «partos, medos, elamitas» (Hch 2:9): judíos y prosélitos venidos de las tierras que habían sido el corazón de Persia.'
      ],
      pensar: 'Dios llamó a Ciro por su nombre y lo usó para cumplir su promesa, «aunque no me conociste» (Is 45:4). ¿Qué te enseña esto acerca de la fidelidad de Dios a su Palabra y de su dominio sobre los gobernantes de la tierra?'
    },
    {
      id: 'origen', n: 'Origen: medos y persas', ref: 'Isaías 13:17; 45:1-3; Daniel 5:28; 8:3-4', fecha: [-559, -530],
      visual: [{ tipo: 'mapa', titulo: 'Mapa', pasos: [
        { t: '559 a.C.: Ciro es rey de Anshán, en Persis, vasallo de los medos.', fecha: -559,
          estado: { view: NUCLEO, capas: ['persis-559', 'media-585', 'babilonia-570', 'lidia-560'], lugares: ['pasargada', 'ecbatana'] } },
        { t: '550 a.C.: Ciro vence a Astiages y une Media y Persia.', fecha: -550,
          estado: { view: NUCLEO, capas: ['persia-550', 'babilonia-570', 'lidia-560'], lugares: ['pasargada', 'ecbatana'] } },
        { t: 'c. 547 a.C.: Ciro conquista Lidia y toma Sardis.', fecha: -547,
          estado: { view: NUCLEO, capas: ['persia-547', 'babilonia-545'], lugares: ['sardis', 'ecbatana', 'pasargada'] } },
        { t: '539 a.C.: Babilonia cae ante Ciro.', fecha: -539,
          estado: { view: NUCLEO, capas: ['persia-539', 'babilonia-545'], lugares: ['babilonia', 'opis', 'ecbatana'], trazos: ['caida-539'] } },
        { t: '530 a.C.: al morir Ciro, el imperio va del Egeo al Asia central.', fecha: -530,
          estado: { view: ORIENTE, capas: ['persia-530'], lugares: ['pasargada', 'babilonia', 'sardis', 'jerusalen'] } }
      ] }],
      texto: [
        'Los persas eran un pueblo de las montañas del suroeste de Irán, en la región que los griegos llamaban Persis. Estaban emparentados con los medos, que vivían más al norte y que, aliados con Babilonia, habían destruido a Asiria. Durante décadas los persas fueron vasallos de los medos. Por eso la Biblia los nombra casi siempre juntos: el reino fue dado «a los medos y a los persas» (Dn 5:28), y cuando Isaías anunció la caída de Babilonia habló de los medos (Is 13:17).',
        'Todo cambió con Ciro II, de la familia de los aqueménidas, que hacia 559 a.C. era rey de Anshán, en Persis. En 550 se rebeló contra Astiages, rey de los medos, lo venció y tomó su capital, Ecbatana. En lugar de borrar a los medos, los incorporó al gobierno: el nuevo imperio fue de medos y persas, aunque los persas tenían el mando. Daniel lo vio como un carnero con dos cuernos altos, uno más alto que el otro, y el más alto había crecido después (Dn 8:3), una imagen precisa de ese reino doble donde Persia, la más reciente, terminó dominando.',
        'Después Ciro avanzó hacia el oeste. Hacia 547 conquistó Lidia, el rico reino de Creso en Anatolia, y llegó hasta el mar Egeo. En 539 tomó Babilonia, casi sin batalla. Isaías lo había descrito: Dios lo tomaría «por su mano derecha, para sujetar naciones delante de él», y le daría «los tesoros escondidos» (Is 45:1-3). Ciro murió en 530 a.C. en una campaña en Asia central, y fue sepultado en Pasargada, la ciudad que había construido en Persis, donde su tumba todavía se conserva.',
        'Usa los botones bajo el mapa para seguir el crecimiento del imperio paso a paso.'
      ],
      pensar: 'El carnero de Daniel crecía en todas direcciones y «ninguna bestia podía parar delante de él» (Dn 8:4), pero su poder también tendría un fin. ¿Qué nos enseña la historia de los imperios acerca de dónde poner nuestra seguridad?'
    },
    {
      id: 'territorio', n: 'El imperio más grande hasta entonces', ref: 'Ester 1:1; 8:9; Daniel 6:1-2; Esdras 4:10', fecha: -500,
      visual: [{ tipo: 'mapa', titulo: 'Mapa', estado: { view: ORIENTE, capas: ['persia-500'], vecinos: VECINOS_500, conVecinos: true,
        lugares: ['persepolis', 'susa', 'babilonia', 'sardis', 'menfis', 'jerusalen'] } }],
      texto: [
        'Los sucesores de Ciro siguieron ampliando el imperio. Su hijo Cambises conquistó Egipto en 525 a.C. Darío I, que reinó desde 522, llevó las fronteras hasta el valle del Indo, en el este, y hasta Tracia, en Europa. En su máxima extensión, Persia iba de Libia y Egipto hasta la India, y del mar Egeo hasta el Asia central: nunca antes un solo rey había gobernado tantos pueblos.',
        'Para gobernar ese territorio, Darío lo organizó en grandes regiones llamadas satrapías, cada una a cargo de un sátrapa, con escribas, recaudadores de impuestos y guarniciones. Judá, llamada Yehud, era una provincia pequeña dentro de la satrapía de «las demás provincias del otro lado del río», como dicen los documentos en arameo que cita Esdras (Esd 4:10). Las órdenes del rey se escribían en las lenguas de cada pueblo: un decreto de Asuero se envió a las provincias «desde la India hasta Etiopía… a cada provincia según su escritura, y a cada pueblo conforme a su lengua» (Est 8:9).',
        { posturas: {
          titulo: '¿Veinte satrapías, ciento veinte o ciento veintisiete?',
          a: { n: 'El texto bíblico', t: 'Ester habla de «ciento veintisiete provincias» (Est 1:1) y Daniel, de «ciento veinte sátrapas» puestos por Darío sobre el reino (Dn 6:1).' },
          b: { n: 'Las fuentes históricas', t: 'Heródoto cuenta unas veinte satrapías, y las inscripciones de Darío enumeran entre veintitrés y treinta pueblos o regiones.' },
          c: 'Las cifras no miden lo mismo. Las satrapías eran las grandes regiones; dentro de ellas había provincias menores, como Judá, y muchos funcionarios. Las «provincias» de Ester son esas divisiones menores, y los «sátrapas» de Daniel son los gobernantes que Darío puso sobre el reino recién conquistado, no las satrapías de Heródoto. Además, el número de regiones cambió con el tiempo.'
        } },
        'Al norte y al oeste, más allá del mar Egeo, quedaban las ciudades griegas, pequeñas y divididas, que serían el gran desafío de los reyes persas. El botón «Vecinos» las muestra en el mapa.'
      ],
      pensar: 'Asuero reinaba sobre ciento veintisiete provincias, pero el libro de Ester muestra que Dios cuidaba a su pueblo en cada una de ellas. ¿Qué consuelo te da saber que ningún lugar está fuera del cuidado de Dios (Sal 139:7-10)?'
    },
    {
      id: 'reyes', n: 'Los reyes y la Biblia', ref: 'Esdras 1; 4–7; Nehemías 2:1; Ester 1–10; Hageo 1:1; Daniel 11:2', fecha: [-559, -330],
      visual: [
        { tipo: 'tabla', titulo: 'Reyes', tabla: {
          titulo: 'Los reyes persas y la Biblia', cab: ['Rey', 'Reinado', 'En la Biblia'],
          filas: [
            ['Ciro II el Grande', '559–530 a.C.', 'Is 44:28–45:4; 2 Cr 36:22-23; Esd 1; Dn 1:21; 10:1'],
            ['Cambises II', '530–522 a.C.', 'No se nombra; conquista Egipto'],
            ['Darío I', '522–486 a.C.', 'Esd 4:24–6:15; Hag 1:1; Zac 1:1'],
            ['Jerjes I (Asuero)', '486–465 a.C.', 'Esd 4:6; Ester'],
            ['Artajerjes I', '465–424 a.C.', 'Esd 4:7-23; 7:1–8:36; Neh 2:1; 13:6'],
            ['Darío II', '423–404 a.C.', 'Posiblemente «Darío el persa» (Neh 12:22)'],
            ['Artajerjes II y III, Arsés', '404–336 a.C.', 'No se nombran'],
            ['Darío III', '336–330 a.C.', 'Vencido por Alejandro (Dn 8:5-7; 11:3)']
          ],
          nota: 'La identificación de Asuero con Jerjes I es la más aceptada: su nombre persa, Jshayarsha, da en hebreo Ajashverosh. «Darío el persa» de Nehemías 12:22 puede ser Darío II o Darío III.' } },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: NUCLEO, capas: ['persia-500'], lugares: ['pasargada', 'persepolis', 'susa', 'ecbatana', 'babilonia'] } }
      ],
      texto: [
        'Persia tuvo una dinastía larga, la de los aqueménidas, y varios de sus reyes aparecen en la Biblia, cada uno ligado a un momento de la historia del pueblo de Dios. Ciro autorizó el regreso de los judíos y la reconstrucción del templo (Esd 1:1-4). Su hijo Cambises no aparece en el texto bíblico, aunque bajo su reinado Egipto pasó a ser parte del imperio.',
        'Darío I llegó al trono en 522 a.C., en medio de rebeliones, y lo celebró con una gran inscripción en la roca de Behistún. En su segundo año, los profetas Hageo y Zacarías animaron al pueblo a retomar la obra del templo (Hag 1:1; Zac 1:1). Cuando los enemigos de los judíos escribieron al rey para detenerlos, Darío buscó en los archivos de Ecbatana, encontró el decreto de Ciro y ordenó que la obra siguiera, pagada con los impuestos de la provincia (Esd 6:1-12). El templo se terminó en el sexto año de su reinado, hacia 516 a.C. (Esd 6:15).',
        'Su hijo Jerjes es el Asuero del libro de Ester, el rey que hizo reina a una joven judía y bajo cuyo reinado los judíos fueron librados de la conspiración de Amán. Daniel había anunciado que «el cuarto se hará de grandes riquezas más que todos ellos… levantará a todos contra el reino de Grecia» (Dn 11:2), una descripción que encaja con Jerjes y su gran campaña contra los griegos.',
        'Artajerjes I, hijo de Jerjes, envió a Esdras con la ley de Dios en 458 a.C. (Esd 7:1-7) y, trece años después, permitió que su copero Nehemías reconstruyera los muros de Jerusalén (Neh 2:1-8). Después de él, los reyes persas desaparecen del relato bíblico, que se cierra con Malaquías. La dinastía terminó con Darío III, vencido por Alejandro Magno.'
      ],
      pensar: 'Un rey pagano buscó en sus archivos y encontró el decreto que protegía la obra de Dios (Esd 6:1-12). ¿Qué te enseña esto acerca de cómo Dios guarda y defiende lo que Él mismo ha comenzado (Fil 1:6)?'
    },
    {
      id: 'grecia', n: 'Persia contra Grecia', ref: 'Daniel 11:2; Ester 1:3; 2:16; Proverbios 21:1', fecha: [-499, -479],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-salamina.webp', alt: 'Trirremes griegas y persas combaten en el estrecho de Salamina', pie: 'La batalla naval de Salamina, 480 a.C.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: EGEO, capas: ['persia-500', 'grecia-480'], lugares: ['sardis', 'atenas', 'maraton', 'termopilas', 'salamina'], trazos: ['invasion-480'] } }
      ],
      texto: [
        'Hacia 499 a.C., las ciudades griegas de la costa de Anatolia, que estaban bajo dominio persa, se rebelaron con la ayuda de Atenas. Darío sofocó la rebelión y decidió castigar a los atenienses. En 490 a.C. su ejército desembarcó en Maratón, cerca de Atenas, y fue derrotado por un ejército griego mucho menor. Darío murió antes de poder intentarlo de nuevo.',
        'Su hijo Jerjes preparó durante años la mayor expedición de su tiempo. En 480 a.C. cruzó el Helesponto, el estrecho entre Asia y Europa, sobre un puente de barcos, y bajó por Grecia. En el paso de las Termópilas, un pequeño grupo de griegos dirigido por los espartanos lo retuvo varios días. Jerjes llegó a quemar Atenas, pero su flota fue derrotada en el estrecho de Salamina, y al año siguiente su ejército fue vencido en Platea. Persia nunca conquistó Grecia.',
        'Estos hechos ayudan a ubicar el libro de Ester. El gran banquete de Asuero, en el que estaban «los más poderosos de Persia y de Media», se celebró en el tercer año de su reinado (Est 1:3), hacia 483 a.C., cuando, según Heródoto, Jerjes reunió a sus nobles para planear la campaña contra Grecia. Ester fue llevada al rey «en el año séptimo de su reinado» (Est 2:16), hacia 479 a.C., después del regreso de Grecia. Muchos estudiosos relacionan así el texto bíblico con la historia conocida, aunque el libro de Ester no menciona la guerra.',
        'Para Daniel, esta guerra era parte de un plan mayor. El cuarto rey persa «levantará a todos contra el reino de Grecia» (Dn 11:2), y en el versículo siguiente ya aparece el rey griego que dominaría «con gran poder» (Dn 11:3). El conflicto que comenzó en Maratón terminaría siglo y medio después con Persia conquistada por un griego.'
      ],
      pensar: '«Como los repartimientos de las aguas, así está el corazón del rey en la mano de Jehová» (Pr 21:1). ¿Cómo cambia tu manera de mirar las noticias y los conflictos del mundo saber que Dios gobierna sobre los reyes?'
    },
    {
      id: 'caida', n: 'La caída ante Alejandro', ref: 'Daniel 8:3-8, 20-22; 11:3-4; 2:21', fecha: [-334, -330],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-gaugamela.webp', foco: '45% 50%', alt: 'La caballería de Alejandro Magno carga contra el ejército persa en la llanura de Gaugamela', pie: 'La batalla de Gaugamela, 331 a.C.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: '336 a.C.: Alejandro hereda Macedonia; Darío III reina sobre Persia.', fecha: -336,
            estado: { view: ORIENTE, capas: ['persia-336', 'macedonia-336'], lugares: ['pella', 'persepolis', 'babilonia'] } },
          { t: '334–333 a.C.: Alejandro cruza a Asia, vence en el Gránico y en Issos.', fecha: [-334, -333],
            estado: { view: [[30, 20], [43, 40]], capas: ['persia-336', 'macedonia-336'], lugares: ['pella', 'granico', 'sardis', 'issos'], trazos: ['alejandro'] } },
          { t: '332 a.C.: toma Tiro y entra en Egipto.', fecha: -332,
            estado: { view: [[28, 26], [38, 40]], capas: ['persia-336'], lugares: ['issos', 'tiro', 'jerusalen', 'alejandria'], trazos: ['alejandro'] } },
          { t: '331–330 a.C.: Gaugamela, Babilonia, Susa y Persépolis.', fecha: [-331, -330],
            estado: { view: NUCLEO, capas: ['persia-336'], lugares: ['gaugamela', 'babilonia', 'susa', 'persepolis'], trazos: ['alejandro'] } }
        ] }
      ],
      texto: [
        'Siglo y medio después de Salamina, los papeles se invirtieron. En 334 a.C., Alejandro, el joven rey de Macedonia, cruzó a Asia con un ejército pequeño y bien entrenado. Venció a los persas junto al río Gránico, y en 333 derrotó al propio rey Darío III en Issos. Tomó Tiro después de un largo sitio y entró en Egipto sin resistencia. En 331 venció definitivamente a Darío en Gaugamela, cerca de la antigua Nínive, y entró en Babilonia, Susa y Persépolis, que fue incendiada. Darío III murió en 330 a.C., asesinado por uno de sus propios gobernadores, y el imperio persa terminó.',
        'Daniel había visto esta escena unos doscientos años antes. Un macho cabrío venía del occidente tan rápido que no tocaba el suelo, con un cuerno notable entre los ojos; atacó al carnero, «le quebró sus dos cuernos», y no hubo quien librara al carnero de su poder (Dn 8:5-7). El ángel explicó: «El macho cabrío es el rey de Grecia, y el cuerno grande que tenía entre sus ojos es el rey primero» (Dn 8:21). Anunció también que ese cuerno sería quebrado en su mejor momento y que su reino se dividiría en cuatro (Dn 8:8, 22; 11:4), tal como ocurrió a la muerte de Alejandro en 323 a.C.',
        'El historiador judío Josefo cuenta que, al pasar por Judea, Alejandro visitó Jerusalén y que le mostraron el libro de Daniel, donde se anunciaba que un griego vencería a los persas. Es una tradición antigua que no aparece en otras fuentes, y los historiadores no la consideran segura.',
        'La historia de Persia confirma lo que Daniel dijo al comienzo de su libro: Dios «muda los tiempos y las edades; quita reyes, y pone reyes» (Dn 2:21). El estudio del imperio griego continúa esta historia.'
      ],
      pensar: 'Daniel vio la caída de Persia unos dos siglos antes de que ocurriera (Dn 8:5-8). ¿Qué confianza te da saber que la historia está en las manos de un Dios que conoce el final desde el principio (Is 46:9-10)?'
    }
  ];


  const sociedad = [
    {
      id: 'capitales', n: 'Las capitales', ref: 'Ester 1:2-6; Nehemías 1:1-4; Daniel 8:2; Esdras 6:2', fecha: [-550, -330],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-palacio-susa.webp', alt: 'Patio del palacio real de Susa con columnas de mármol, cortinas de lino y un pavimento de mosaico', pie: 'El palacio de Susa, escenario del libro de Ester.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[27, 42], [37, 56]], capas: ['persia-500'], lugares: ['pasargada', 'persepolis', 'susa', 'ecbatana', 'babilonia'] } }
      ],
      texto: [
        'Persia no tuvo una sola capital. La corte se trasladaba según la estación del año entre varias ciudades, cada una con sus palacios y sus archivos, y la Biblia las menciona casi todas.',
        'Pasargada fue la ciudad de Ciro, construida en Persis, la tierra de origen de los persas, con jardines y palacios abiertos; allí está su tumba, una sencilla construcción de piedra que todavía se conserva. Ecbatana, la antigua capital de los medos, era la residencia de verano, en las montañas. La Biblia la llama Acmeta: allí, en el archivo del palacio, se encontró el decreto de Ciro que autorizaba reconstruir el templo (Esd 6:2).',
        'Susa, en la llanura de Elam, era la capital administrativa, donde el rey pasaba el invierno. Allí transcurre el libro de Ester: Asuero reinaba «en Susa capital del reino» (Est 1:2), y el banquete se celebró en un patio con cortinas de lino blancas, verdes y azules, columnas de mármol, reclinatorios de oro y plata y un pavimento de piedras de colores (Est 1:6). En Susa vivía también Nehemías, copero del rey (Neh 1:1), y allí estaba Daniel, en visión, junto al río Ulai (Dn 8:2). Los arqueólogos excavaron el palacio de Darío en Susa y encontraron sus grandes salas de columnas y los relieves de ladrillo vidriado con arqueros de la guardia real.',
        'Persépolis, en Persis, fue la gran obra de Darío I y sus sucesores: una ciudad ceremonial construida sobre una terraza, con escaleras decoradas con relieves de delegaciones de todos los pueblos del imperio que traen sus tributos al rey. No se menciona en la Biblia, pero muestra mejor que ninguna otra el mundo de Ester y Nehemías. Alejandro Magno la incendió en 330 a.C.'
      ],
      pensar: 'Nehemías vivía en el palacio más lujoso del mundo, pero cuando supo que el muro de Jerusalén estaba derribado, «me senté y lloré… y ayuné y oré delante del Dios de los cielos» (Neh 1:3-4). ¿Qué te enseña su ejemplo acerca de dónde está el corazón del creyente?'
    },
    {
      id: 'gobierno', n: 'Cómo se gobernaba', ref: 'Daniel 6:7-15; Ester 1:19; 3:13; 6:1; 8:8-14; Esdras 4:13-15', fecha: [-522, -330],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[28, 24], [42, 52]], capas: ['persia-500'], lugares: ['sardis', 'susa', 'babilonia', 'persepolis'], trazos: ['camino-real'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-correo-real.webp', alt: 'Un jinete persa entrega una carta sellada a otro jinete en una estación de relevo del Camino Real', pie: 'Los correos del rey cambiaban de caballo en cada estación del camino.', origen: 'ia' }
      ],
      texto: [
        'El rey de Persia se llamaba a sí mismo «rey de reyes». Gobernaba con la ayuda de los sátrapas, que administraban las grandes regiones, y de una red de escribas, recaudadores y jueces. Los impuestos eran el corazón del sistema: los enemigos de los judíos advirtieron al rey que, si Jerusalén se reconstruía, «no pagarán tributo, impuesto y rentas» (Esd 4:13), y en tiempos de Nehemías hubo familias que tuvieron que hipotecar sus campos para pagar el tributo del rey (Neh 5:4).',
        { h: 'Una ley que no se podía cambiar' },
        'Una vez sellada con el anillo del rey, una ley persa no podía revocarse: era «la ley de Media y de Persia, la cual no puede ser abrogada» (Dn 6:8). Esa regla explica dos relatos bíblicos. En Daniel 6, el propio rey quedó atrapado por el decreto que había firmado y trabajó hasta la puesta del sol para librar a Daniel, sin lograrlo (Dn 6:14-15). En Ester, el decreto contra los judíos no se podía anular, así que el rey autorizó un segundo decreto que les permitía defenderse (Est 8:8, 11).',
        { h: 'Correos y archivos' },
        'Para que las órdenes llegaran a tiempo, Persia organizó el mejor sistema de comunicaciones de su época. El Camino Real unía Sardis con Susa a lo largo de unos 2.500 kilómetros, con estaciones a un día de marcha. Los mensajeros del rey cambiaban de caballo en cada una, de modo que una carta recorría en días lo que a pie tomaba meses. El libro de Ester lo muestra dos veces: los decretos se enviaron «por medio de correos a todas las provincias» (Est 3:13), y el segundo, «por medio de correos montados en caballos veloces» (Est 8:10). Heródoto escribió que nada detenía a esos mensajeros, ni la nieve, ni la lluvia, ni el calor, ni la noche.',
        'El imperio también guardaba memoria de todo. Los adversarios de los judíos pidieron al rey que buscara «en el libro de las memorias de tus padres» (Esd 4:15), y una noche de insomnio Asuero se hizo leer «el libro de las memorias y crónicas» y descubrió que Mardoqueo le había salvado la vida (Est 6:1-3).'
      ],
      pensar: 'Una noche en que el rey no podía dormir, alguien le leyó justo el registro que salvaría a Mardoqueo (Est 6:1-3). ¿Cómo has visto la mano de Dios obrar en detalles que parecían pequeños o casuales?'
    },
    {
      id: 'religion', n: 'La religión de Persia', ref: 'Isaías 45:5-7; Daniel 6:7-10; Esdras 6:9-10', fecha: [-550, -330],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-magos-fuego.webp', alt: 'Dos magos persas vestidos de blanco cuidan el fuego sagrado sobre un altar de piedra al aire libre', pie: 'Magos ante un altar de fuego.', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Que formo la luz y creo las tinieblas, que hago la paz y creo la adversidad. Yo Jehová soy el que hago todo esto.', ref: 'Isaías 45:7' }
      ],
      texto: [
        'Los reyes persas adoraban a Ahura Mazda, «el Señor sabio». En la inscripción de Behistún, Darío repite una y otra vez que reina «por la gracia de Ahura Mazda». Esta religión se relaciona con un maestro llamado Zaratustra o Zoroastro, cuya época se discute mucho. Enseñaba que el mundo es escenario de una lucha entre el bien, que viene de Ahura Mazda, y el mal, que viene de un espíritu enemigo.',
        'Los persas no hacían estatuas de sus dioses, a diferencia de babilonios y egipcios. Rendían culto al aire libre, en lugares altos, y daban gran importancia al fuego, que cuidaban en altares. Los sacerdotes eran los magos, una tribu de los medos especializada en los sacrificios, los sueños y los astros. Su nombre llegó hasta el Nuevo Testamento: los magos que vinieron del oriente a adorar a Jesús (Mt 2:1) llevaban ese mismo título.',
        'La Biblia ofrece una respuesta directa a la idea de dos poderes enfrentados. Por medio de Isaías, Dios le habla al propio Ciro: «Yo soy Jehová, y ninguno más hay; no hay Dios fuera de mí» (Is 45:5), y «Yo Jehová soy el que hago todo esto» (Is 45:7). No hay un dios del mal a la altura del Dios verdadero: todo está bajo su gobierno.',
        { posturas: {
          titulo: '¿Influyó la religión persa en la fe de Israel?',
          a: { n: 'Lo que proponen algunos estudiosos', t: 'Como la fe judía habla más de ángeles, de juicio final y de resurrección en los libros escritos después del exilio, algunos suponen que esas ideas se tomaron de la religión persa.' },
          b: { n: 'Lo que muestra el texto bíblico', t: 'Los ángeles aparecen desde Génesis (Gn 22:11), la esperanza de ver a Dios después de la muerte está en Job (Job 19:25-26) y la resurrección, en Isaías (Is 26:19), antes del contacto con Persia; Daniel la anuncia con claridad (Dn 12:2).' },
          c: 'Que dos religiones hablen de temas parecidos no prueba que una copie a la otra. Lo que la Biblia enseña sobre los ángeles, el juicio y la resurrección forma parte de una revelación que Dios fue dando de manera progresiva a su pueblo, y en tiempos de Persia se expresa con más detalle, no con un origen distinto.'
        } },
        'Los reyes persas respetaban los dioses de los pueblos conquistados y apoyaban sus cultos, por conveniencia política. Darío financió los sacrificios del templo de Jerusalén para que los sacerdotes oraran «por la vida del rey y por sus hijos» (Esd 6:9-10). Por eso resalta lo que ocurrió en Daniel 6: un decreto prohibió orar a cualquier dios fuera del rey durante treinta días, y Daniel siguió orando tres veces al día con las ventanas abiertas hacia Jerusalén (Dn 6:7, 10).'
      ],
      pensar: 'Frente a una religión que veía el mundo como una lucha entre el bien y el mal, Dios declaró: «Yo Jehová soy el que hago todo esto» (Is 45:7). ¿Qué seguridad te da saber que ningún poder puede igualarse a Dios?'
    },
    {
      id: 'pueblos', n: 'El trato a los pueblos', ref: 'Esdras 1:1-11; 6:3-12; 7:11-27; Nehemías 2:7-9', fecha: [-539, -400],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[22, 26], [38, 50]], capas: ['persia-500'], lugares: ['babilonia', 'jerusalen', 'elefantina', 'menfis', 'susa'], trazos: ['regreso'] } },
        { tipo: 'tabla', titulo: 'Decretos', tabla: {
          titulo: 'Los decretos persas a favor de los judíos', cab: ['Rey', 'Año a.C.', 'Qué autoriza', 'Texto'],
          filas: [
            ['Ciro', '538', 'Volver, reconstruir el templo y llevar los utensilios', 'Esd 1:1-11; 6:3-5'],
            ['Darío I', 'c. 519', 'Seguir la obra, con gastos pagados por el tesoro real', 'Esd 6:6-12'],
            ['Artajerjes I', '458', 'Esdras enseña la ley y nombra jueces; ofrendas para el templo', 'Esd 7:11-26'],
            ['Artajerjes I', '445', 'Nehemías reconstruye los muros, con madera del bosque del rey', 'Neh 2:7-9']
          ] } }
      ],
      texto: [
        'Persia trató a los pueblos conquistados de una manera muy distinta a la de Asiria y Babilonia. En lugar de deportarlos, permitió que los deportados volvieran a sus tierras y que reconstruyeran sus templos. El Cilindro de Ciro, escrito en Babilonia en 539 a.C., dice que el rey devolvió a varias ciudades sus dioses y reunió a sus habitantes para que volvieran a sus hogares. El decreto que la Biblia registra en favor de los judíos encaja con esa política (Esd 1:2-4).',
        'Ciro devolvió además los utensilios del templo que Nabucodonosor se había llevado: «cinco mil cuatrocientos» objetos de oro y de plata (Esd 1:11). Darío ordenó que los gastos de la reconstrucción se pagaran con los impuestos de la región (Esd 6:8). Artajerjes envió a Esdras con plata, oro y autoridad para enseñar la ley y nombrar jueces (Esd 7:12-26), y años después dio a Nehemías cartas para los gobernadores y madera del bosque del rey (Neh 2:7-8). Esdras reconoció de dónde venía todo: «Bendito Jehová Dios de nuestros padres, que puso tal cosa en el corazón del rey» (Esd 7:27).',
        'Esa tolerancia tenía límites. Persia respetaba las religiones mientras se pagaran los impuestos y no hubiera rebelión; cuando Babilonia o Egipto se rebelaron, los castigó con dureza.',
        { h: 'Una comunidad judía en Egipto' },
        'En la isla de Elefantina, junto a la primera catarata del Nilo, vivía una guarnición de soldados judíos al servicio de Persia, con su propio templo. Sus cartas en arameo, escritas en papiro, se conservaron. En una de ellas, hacia 407 a.C., piden ayuda al gobernador de Judá para reconstruir su templo, destruido por los sacerdotes egipcios, y mencionan a los hijos de Sanbalat, gobernador de Samaria, el mismo que se opuso a Nehemías (Neh 2:10, 19), y al sumo sacerdote Johanán (Neh 12:22).'
      ],
      pensar: 'Esdras vio la mano de Dios en las decisiones de un rey pagano: «puso tal cosa en el corazón del rey» (Esd 7:27). ¿De qué manera puedes orar hoy por las autoridades, sabiendo que Dios puede inclinar su corazón (1 Ti 2:1-2)?'
    },
    {
      id: 'legado', n: 'El legado de Persia', ref: 'Nehemías 2:8; Cantares 4:13; Lucas 23:43; Mateo 5:41; Marcos 5:41; Esdras 2:69', fecha: [-550, -330],
      visual: [
        { tipo: 'tabla', titulo: 'Legado', tabla: {
          titulo: 'Lo que dejó Persia', cab: ['Legado', 'Qué era', 'Dónde lo vemos'],
          filas: [
            ['Paraíso', 'Pairidaeza, el jardín cercado del rey', 'Neh 2:8; Cnt 4:13; Lc 23:43; Ap 2:7'],
            ['Correo de relevos', 'Mensajeros que cambiaban de caballo en cada estación', 'Est 8:10; la palabra «obligar» de Mt 5:41'],
            ['Arameo imperial', 'Lengua común de la administración', 'Esd 4–7; Dn 2–7; las palabras de Jesús en arameo'],
            ['Moneda de oro', 'El dárico, con la figura del rey arquero', 'Probablemente las «dracmas de oro» de Esd 2:69'],
            ['Qanats', 'Canales subterráneos para llevar agua al desierto', 'Todavía se usan en Irán'],
            ['Gobierno por provincias', 'Satrapías, impuestos fijos y caminos', 'Modelo para griegos y romanos']
          ],
          nota: 'Que las «dracmas» de Esdras 2:69 sean dáricos es probable, no seguro: la palabra hebrea puede referirse también a la dracma griega.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-jardin-paraiso.webp', alt: 'Un jardín persa cercado, con canales de agua en cruz, árboles frutales y un pabellón al fondo', pie: 'Un jardín real persa, el «paraíso».', origen: 'ia' }
      ],
      texto: [
        'Persia dejó huellas que llegan hasta el Nuevo Testamento, y algunas están en palabras que usamos todos los días.',
        { h: 'El paraíso' },
        'Los reyes persas tenían grandes jardines cercados, con árboles frutales, agua corriendo por canales y animales. En persa antiguo se llamaban pairidaeza, «cercado». La palabra pasó al hebreo como pardes: es el «bosque del rey» que custodiaba Asaf, de donde Nehemías obtuvo madera (Neh 2:8), y el «paraíso de granados» del Cantar de los Cantares (Cnt 4:13). Del hebreo pasó al griego como paradeisos, y así la usó Jesús en la cruz: «hoy estarás conmigo en el paraíso» (Lc 23:43). El Apocalipsis promete al vencedor el árbol de la vida, «el cual está en medio del paraíso de Dios» (Ap 2:7).',
        { h: 'El correo y la lengua' },
        'Los mensajeros del rey podían obligar a cualquiera a ayudarlos en su camino. De esa costumbre viene un verbo griego que significa «obligar a prestar un servicio», y es el que aparece en las palabras de Jesús: «a cualquiera que te obligue a llevar carga por una milla, ve con él dos» (Mt 5:41), y cuando los soldados obligaron a Simón de Cirene a llevar la cruz (Mt 27:32). Persia también hizo del arameo la lengua común de su administración, desde Egipto hasta la India. Por eso partes de Esdras y Daniel están escritas en arameo, y siglos después era la lengua de Jesús: «Talita cumi» (Mr 5:41).',
        { h: 'Monedas, agua y gobierno' },
        'Darío acuñó una moneda de oro, el dárico, que circuló en todo el imperio; las «dracmas de oro» que los judíos ofrecieron para el templo eran probablemente dáricos (Esd 2:69). Los persas construyeron qanats, canales subterráneos que llevan agua desde las montañas hasta lugares secos, y que todavía se usan. Y su forma de gobernar por provincias, con impuestos fijos y caminos, sirvió de modelo a los imperios que vinieron después.'
      ],
      pensar: 'La palabra que los persas usaban para los jardines de su rey terminó en labios de Jesús en la cruz: «hoy estarás conmigo en el paraíso» (Lc 23:43). ¿Qué esperanza tiene el creyente frente a la muerte, y cómo cambia eso tu manera de vivir hoy?'
    }
  ];


  const LEVANTE = [[28.5, 31.5], [38.5, 50]];
  const biblia = [
    {
      id: 'isaias', n: 'Isaías y Ciro', ref: 'Isaías 44:24–45:13; 2 Crónicas 36:22-23; Esdras 1:1-4', fecha: [-700, -538],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-ciro-decreto.webp', foco: '40% 50%', alt: 'El rey Ciro, de pie en su palacio, dicta un decreto a un escriba que escribe en un rollo', pie: 'Ciro proclama el regreso de los judíos (Esd 1:1-4).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Así dice Jehová a su ungido, a Ciro, al cual tomé yo por su mano derecha, para sujetar naciones delante de él.', ref: 'Isaías 45:1' }
      ],
      texto: [
        'La historia de Persia en la Biblia comienza con una profecía. Hacia 700 a.C., cuando Asiria era la gran potencia y Babilonia aún no había destruido Jerusalén, Isaías anunció que Dios levantaría a un rey llamado Ciro. Dios dice de él: «Es mi pastor, y cumplirá todo lo que yo quiero, al decir a Jerusalén: Serás edificada; y al templo: Serás fundado» (Is 44:28).',
        'En el capítulo siguiente, Dios le habla directamente a Ciro y lo llama «su ungido» (Is 45:1), un título que en el Antiguo Testamento se usaba para los reyes de Israel y que apunta al Mesías. Le promete abrirle puertas, darle tesoros escondidos y entregarle naciones, y le explica la razón: «Por amor de mi siervo Jacob, y de Israel mi escogido, te llamé por tu nombre; te puse sobrenombre, aunque no me conociste» (Is 45:4). Ciro sería un instrumento para el bien del pueblo de Dios, aunque él mismo no adorara al Dios de Israel.',
        'Unos ciento cincuenta años después, la profecía se cumplió. Ciro tomó Babilonia en 539 a.C. y al año siguiente hizo pregonar por todo su reino un decreto: «Jehová el Dios de los cielos me ha dado todos los reinos de la tierra, y me ha mandado que le edifique casa en Jerusalén» (Esd 1:2). El último libro de la Biblia hebrea, Crónicas, termina con ese mismo decreto (2 Cr 36:22-23), como si toda la historia de Israel desembocara en esa invitación a volver.',
        { posturas: {
          titulo: '¿Cómo pudo Isaías nombrar a Ciro?',
          a: { n: 'La postura crítica', t: 'Muchos estudiosos sostienen que los capítulos 40 a 55 de Isaías fueron escritos por un profeta posterior, durante el exilio, cuando Ciro ya estaba en escena.' },
          b: { n: 'La postura de este estudio', t: 'El libro se presenta como obra de Isaías hijo de Amoz (Is 1:1), y el Nuevo Testamento cita esas mismas secciones atribuyéndolas a Isaías (Jn 12:38-41).' },
          c: 'El propio texto presenta el anuncio de Ciro como prueba de que solo Dios conoce el futuro: Él anuncia las cosas antes de que sucedan (Is 44:24-28; 46:9-10). Este estudio sigue la autoría tradicional: nombrar a Ciro antes de su tiempo es una profecía, no una crónica escrita después de los hechos.'
        } }
      ],
      pensar: 'Dios llamó a Ciro por su nombre más de un siglo antes de su nacimiento (Is 44:28). ¿Qué te enseña esto acerca de la confianza que puedes tener en las promesas de la Palabra de Dios para tu propia vida?'
    },
    {
      id: 'esdras', n: 'Esdras, Hageo y Zacarías', ref: 'Esdras 1–6; Hageo 1–2; Zacarías 4:6-10', fecha: [-538, -516],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: '../imperio-babilonico/img/babilonia-reconstruccion-templo.webp', alt: 'Judíos que regresan reconstruyen los cimientos del templo en Jerusalén', pie: 'La reconstrucción del templo (Esd 3:10-13).', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Cronología', tabla: {
          titulo: 'Del decreto al templo terminado', cab: ['Año a.C.', 'Hecho', 'Texto'],
          filas: [
            ['538', 'Decreto de Ciro y primer regreso con Sesbasar y Zorobabel', 'Esd 1–2'],
            ['537', 'Se levanta el altar y se echan los cimientos del templo', 'Esd 3'],
            ['536–520', 'La oposición detiene la obra', 'Esd 4:1-5, 24'],
            ['520', 'Hageo y Zacarías animan a retomar la construcción', 'Esd 5:1-2; Hag 1:1'],
            ['519', 'Darío confirma el decreto de Ciro', 'Esd 6:1-12'],
            ['516', 'El templo se termina y se celebra la Pascua', 'Esd 6:15-22']
          ] } },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: LEVANTE, capas: ['persia-500'], lugares: ['babilonia', 'jerusalen'], trazos: ['regreso'] } }
      ],
      texto: [
        'El primer grupo volvió de Babilonia hacia 538 a.C., guiado por Sesbasar y Zorobabel, descendiente de David. Al año siguiente levantaron el altar y echaron los cimientos del templo. Fue un momento de emociones mezcladas: los jóvenes gritaban de alegría, y los ancianos que habían visto el templo de Salomón lloraban en alta voz, de modo que «no podía distinguir el pueblo el clamor de los gritos de alegría, de la voz del lloro» (Esd 3:12-13).',
        'Pronto vino la oposición. Los pueblos vecinos desanimaron a los constructores, sobornaron a consejeros del rey y lograron detener la obra durante unos dieciséis años (Esd 4:4-5, 24). Mientras tanto, el pueblo se dedicó a sus propias casas.',
        { posturas: {
          titulo: '¿Por qué Esdras 4 menciona a reyes posteriores?',
          a: { n: 'Lo que dice el texto', t: 'En medio del relato del templo, en tiempos de Ciro y Darío, Esdras 4:6-23 cita acusaciones enviadas a Asuero y a Artajerjes, reyes que vinieron después.' },
          b: { n: 'Lo que dice la historia', t: 'Asuero (Jerjes) y Artajerjes reinaron después de Darío, entre 486 y 424 a.C.' },
          c: 'El autor agrupa los hechos por tema, no por fecha: reúne en un solo lugar todas las veces que los enemigos de Judá escribieron a los reyes persas, y en el versículo 24 retoma el relato donde lo había dejado, en tiempos de Darío.'
        } },
        'En 520 a.C., Dios levantó a dos profetas. Hageo confrontó al pueblo: «¿Es para vosotros tiempo, para vosotros, de habitar en vuestras casas artesonadas, y esta casa está desierta?» (Hag 1:4). Zacarías animó a Zorobabel con una palabra que se volvió central para la fe del pueblo de Dios: «No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos» (Zac 4:6). La obra se retomó, Darío confirmó el decreto de Ciro y el templo se terminó en 516 a.C. (Esd 6:15).'
      ],
      pensar: '«No con ejército, ni con fuerza, sino con mi Espíritu» (Zac 4:6). ¿En qué obra de tu vida o de tu iglesia necesitas depender del poder del Espíritu Santo más que de tus propias fuerzas?'
    },
    {
      id: 'ester', n: 'Ester: el pueblo de Dios en Susa', ref: 'Ester 1–10', fecha: [-483, -473],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-ester-rey.webp', alt: 'La reina Ester, con vestido real, se presenta ante el rey Asuero en su trono, que le extiende el cetro de oro', pie: 'Ester ante el rey (Est 5:1-2).', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: '¿Y quién sabe si para esta hora has llegado al reino?', ref: 'Ester 4:14' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[20, 18], [46, 76]], capas: ['persia-500'], lugares: ['susa', 'jerusalen', 'babilonia', 'persepolis'] } }
      ],
      texto: [
        'No todos los judíos volvieron a Jerusalén. Muchos se quedaron en las ciudades del imperio, y el libro de Ester cuenta lo que vivieron en Susa, la capital, en tiempos de Asuero. Mardoqueo, un judío de la tribu de Benjamín, había criado a su prima huérfana, Hadasa, conocida como Ester (Est 2:5-7). Cuando el rey buscó una nueva reina, Ester fue elegida.',
        'Amán, el hombre más poderoso de la corte, odiaba a Mardoqueo porque no se inclinaba ante él, y consiguió un decreto para exterminar a todos los judíos del imperio en un solo día (Est 3:8-13). Mardoqueo le pidió a Ester que intercediera ante el rey, aunque presentarse sin ser llamada podía costarle la vida: «¿Y quién sabe si para esta hora has llegado al reino?» (Est 4:14). Ester pidió que todos los judíos de Susa ayunaran tres días, y respondió: «si perezco, que perezca» (Est 4:16). El rey la recibió, Amán cayó, y un nuevo decreto permitió a los judíos defenderse. La fiesta de Purim recuerda hasta hoy esa liberación (Est 9:26-28).',
        'Ester es el único libro de la Biblia en que no aparece el nombre de Dios, y sin embargo su mano se ve en cada detalle: una reina judía en el lugar justo, una noche de insomnio del rey, un registro leído a tiempo.',
        { posturas: {
          titulo: '¿Quién era la reina de Asuero?',
          a: { n: 'El texto bíblico', t: 'Asuero destituye a la reina Vasti (Est 1:19) y luego hace reina a Ester (Est 2:17).' },
          b: { n: 'Las fuentes históricas', t: 'Heródoto nombra como esposa de Jerjes a Amestris, y no menciona a Vasti ni a Ester.' },
          c: 'Los reyes persas tenían varias esposas, y Heródoto no pretende hacer una lista completa. Algunos estudiosos identifican a Vasti con Amestris; otros piensan que Ester fue una de las esposas del rey a la que la corte persa no dio el mismo rango oficial. En cualquier caso, la falta de una mención en Heródoto no contradice el relato bíblico.'
        } }
      ],
      pensar: 'Mardoqueo le dijo a Ester que tal vez había llegado al reino «para esta hora» (Est 4:14). ¿Qué lugar te ha dado Dios hoy, y cómo podrías usarlo para su propósito?'
    },
    {
      id: 'nehemias', n: 'Nehemías y Malaquías', ref: 'Nehemías 1–13; Esdras 7–10; Malaquías 1–4', fecha: [-458, -430],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-muros-nehemias.webp', foco: '40% 50%', alt: 'Constructores judíos levantan el muro de Jerusalén con una herramienta en una mano y una espada en la otra', pie: '«Con una mano trabajaban en la obra, y en la otra tenían la espada» (Neh 4:17).', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Paralelos', tabla: {
          titulo: 'Los problemas que enfrentaron Nehemías y Malaquías', cab: ['Problema', 'Nehemías', 'Malaquías'],
          filas: [
            ['Sacerdotes infieles', 'Neh 13:4-9, 28-29', 'Mal 1:6–2:9'],
            ['Diezmos descuidados', 'Neh 13:10-12', 'Mal 3:8-10'],
            ['Matrimonios con paganos', 'Neh 13:23-27', 'Mal 2:11'],
            ['Injusticia con los pobres', 'Neh 5:1-13', 'Mal 3:5']
          ],
          nota: 'Los mismos problemas en ambos libros sugieren que Malaquías profetizó en la misma época que Nehemías.' } }
      ],
      texto: [
        'En 458 a.C., en el séptimo año de Artajerjes, Esdras, «escriba diligente en la ley de Moisés», volvió de Babilonia con un nuevo grupo y con autoridad para enseñar la ley (Esd 7:6-10). Trece años después, en 445, Nehemías, copero del rey en Susa, recibió la noticia de que el muro de Jerusalén seguía derribado. Lloró, ayunó y oró (Neh 1:4), y el rey le permitió ir a reconstruirlo.',
        'La obra encontró burla y amenazas de Sanbalat, Tobías y Gesem, y los constructores trabajaban «con una mano… en la obra, y en la otra tenían la espada» (Neh 4:17). El muro se terminó en cincuenta y dos días, y hasta los enemigos reconocieron «que por nuestro Dios había sido hecha esta obra» (Neh 6:15-16). Después, Esdras leyó la ley ante todo el pueblo, que lloraba al oírla, y Nehemías les dijo: «no os entristezcáis, porque el gozo de Jehová es vuestra fuerza» (Neh 8:9-10).',
        { posturas: {
          titulo: '¿Llegó Esdras antes que Nehemías?',
          a: { n: 'La postura tradicional', t: 'Esdras llegó en el séptimo año de Artajerjes I, en 458 a.C. (Esd 7:7), y Nehemías en el año veinte del mismo rey, en 445 (Neh 2:1). Ambos aparecen juntos en Nehemías 8:9.' },
          b: { n: 'Otra propuesta', t: 'Algunos estudiosos piensan que el Artajerjes de Esdras 7 es Artajerjes II, y que Esdras llegó en 398 a.C., después de Nehemías.' },
          c: 'Este estudio sigue el orden que presenta el texto: Esdras primero y Nehemías después, trabajando juntos en Jerusalén. Es la lectura más sencilla de los dos libros y explica por qué aparecen lado a lado en Nehemías 8.'
        } },
        'Malaquías, el último profeta del Antiguo Testamento, habló en los mismos años y denunció los mismos males que corrigió Nehemías. Llamó al pueblo a traer los diezmos y a probar a Dios, que abriría «las ventanas de los cielos» (Mal 3:10), y terminó con una promesa: «yo os envío el profeta Elías, antes que venga el día de Jehová» (Mal 4:5). Después de él, la voz profética calló durante unos cuatrocientos años, hasta Juan el Bautista.'
      ],
      pensar: 'Nehemías dijo al pueblo: «el gozo de Jehová es vuestra fuerza» (Neh 8:10). ¿Qué diferencia hay entre la alegría que dan las circunstancias y el gozo que viene del Señor?'
    },
    {
      id: 'daniel', n: 'Daniel y Persia', ref: 'Daniel 1:21; 2:32, 39; 5:30–6:28; 7:5; 8:3-4, 20; 9:1-2; 10:1–11:2', fecha: [-539, -536],
      visual: [
        { tipo: 'tabla', titulo: 'Símbolos', tabla: {
          titulo: 'Persia en las visiones de Daniel', cab: ['Visión', 'Símbolo', 'Texto'],
          filas: [
            ['La estatua', 'El pecho y los brazos de plata, un reino inferior al de oro', 'Dn 2:32, 39'],
            ['Las cuatro bestias', 'Un oso que se alzaba más de un costado, con tres costillas en la boca', 'Dn 7:5'],
            ['El carnero y el macho cabrío', 'Un carnero de dos cuernos, uno más alto que creció después', 'Dn 8:3-4, 20'],
            ['Los reyes del norte y del sur', 'Tres reyes persas y un cuarto muy rico que se levanta contra Grecia', 'Dn 11:2']
          ],
          nota: 'Una interpretación frecuente ve en el costado más alto del oso y en el cuerno más alto del carnero el predominio de Persia sobre Media, y en las tres costillas a Lidia, Babilonia y Egipto, sus grandes conquistas.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-daniel-foso.webp', alt: 'El profeta Daniel, anciano, de pie en calma dentro del foso de los leones, iluminado por la luz que entra desde arriba', pie: 'Daniel en el foso de los leones (Dn 6:22).', origen: 'ia' }
      ],
      texto: [
        'Daniel, que había llegado a Babilonia como joven cautivo en 605 a.C., vivió para ver la caída del imperio y los primeros años de Persia: «continuó Daniel hasta el año primero del rey Ciro» (Dn 1:21). Ya anciano, siguió sirviendo en el nuevo gobierno. Bajo «Darío de Media» fue uno de los tres gobernadores puestos sobre los sátrapas, y la envidia de sus colegas lo llevó al foso de los leones, de donde Dios lo libró (Dn 6:1-23). Quién es exactamente Darío de Media se discute: unos lo identifican con Gubaru, el gobernador que Ciro puso sobre Babilonia, y otros con el mismo Ciro.',
        'En ese primer año del nuevo imperio, Daniel leyó en el libro de Jeremías que las desolaciones de Jerusalén durarían setenta años (Dn 9:2). Al ver que el tiempo se cumplía, oró confesando los pecados de su pueblo y recibió la profecía de las setenta semanas, que el estudio de Daniel desarrolla en detalle.',
        'En el tercer año de Ciro, Daniel tuvo su última gran visión. Un mensajero celestial le explicó que había sido enviado desde el primer día de su oración, pero que «el príncipe del reino de Persia» se le opuso durante veintiún días, hasta que llegó en su ayuda Miguel, uno de los principales príncipes (Dn 10:12-13). El pasaje levanta el velo sobre una realidad espiritual: detrás de los reinos de la tierra hay una lucha en el mundo invisible, y la oración perseverante del creyente forma parte de ella.',
        'En sus visiones, Daniel vio a Persia como el segundo de los imperios: el pecho y los brazos de plata (Dn 2:32), el oso (Dn 7:5) y el carnero de dos cuernos que representa «los reyes de Media y de Persia» (Dn 8:20). Y le fue anunciado que después de tres reyes vendría un cuarto, muy rico, que se levantaría «contra el reino de Grecia» (Dn 11:2).'
      ],
      pensar: 'La respuesta a la oración de Daniel fue enviada el primer día, pero llegó después de veintiún días de lucha en el mundo espiritual (Dn 10:12-13). ¿Qué te enseña esto acerca de perseverar en la oración aunque la respuesta parezca tardar?'
    },
    {
      id: 'profecia-nt', n: 'Persia en la profecía y en el Nuevo Testamento', ref: 'Ezequiel 38:1-16; Mateo 2:1-12; Hechos 2:1-11',
      visual: [
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Partos, medos, elamitas, y los que habitamos en Mesopotamia… les oímos hablar en nuestras lenguas las maravillas de Dios.', ref: 'Hechos 2:9-11' },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-magos-oriente.webp', alt: 'Tres magos de Oriente viajan de noche en camellos por el desierto, guiados por una estrella brillante', pie: 'Los magos que vinieron del oriente (Mt 2:1-2).', origen: 'ia' }
      ],
      texto: [
        'Persia no desaparece de la Biblia con el fin del Antiguo Testamento. Aparece en una profecía sobre el futuro y en dos momentos clave del Nuevo Testamento.',
        { h: 'En la profecía de Ezequiel' },
        'Ezequiel anunció que «al cabo de los días» un enemigo llamado Gog, de la tierra de Magog, subiría contra el pueblo de Israel ya reunido en su tierra, y entre sus aliados nombra a «Persia, Cus y Fut» (Ez 38:5, 8, 16). Dios mismo intervendría para derrotarlo y mostrar su santidad a las naciones. En la lectura dispensacionalista que sigue este estudio, esta invasión es un acontecimiento futuro, relacionado con el tiempo del fin, y la Persia antigua corresponde a la región del actual Irán.',
        { h: 'Los magos de Oriente' },
        'Cuando Jesús nació, «vinieron del oriente a Jerusalén unos magos», preguntando por el rey de los judíos cuya estrella habían visto (Mt 2:1-2). El texto no dice de qué país venían, pero «magos» era el título de los sabios y sacerdotes de Persia y Babilonia. Allí, siglos antes, Daniel había sido jefe de los sabios (Dn 2:48), y una comunidad judía había conservado las Escrituras y la esperanza del Mesías.',
        { h: 'Partos, medos y elamitas en Pentecostés' },
        'En tiempos del Nuevo Testamento, las antiguas tierras de Persia formaban el reino de los partos, el gran rival de Roma. El día de Pentecostés, cuando el Espíritu Santo descendió sobre los discípulos, en Jerusalén había judíos y prosélitos de esas regiones: «Partos, medos, elamitas» (Hch 2:9). Cada uno los oía hablar en su propia lengua «las maravillas de Dios» (Hch 2:6, 11). Los descendientes de los deportados que Asiria y Babilonia habían dispersado por el oriente escucharon el evangelio por obra del Espíritu, en el idioma de las tierras de su exilio.'
      ],
      pensar: 'En Pentecostés, personas de las lejanas tierras de Persia oyeron en su propia lengua las maravillas de Dios (Hch 2:9-11). ¿Qué te enseña esto acerca del propósito del Espíritu Santo de llevar el evangelio a todas las naciones (Hch 1:8)?'
    },
    {
      id: 'arqueologia', n: 'La evidencia arqueológica', ref: 'Esdras 1:1-4; 6:1-5; Ester 1:2-6; Nehemías 2:10; 12:22', fecha: [-539, -400],
      visual: [
        { tipo: 'tabla', titulo: 'Hallazgos', tabla: {
          titulo: 'Hallazgos y textos bíblicos', cab: ['Hallazgo', 'Qué dice', 'Texto bíblico'],
          filas: [
            ['Cilindro de Ciro (Babilonia, Museo Británico)', 'Ciro devuelve a varias ciudades sus dioses y a sus habitantes sus hogares', 'Esd 1:1-4; 6:3-5'],
            ['Inscripción de Behistún (Irán)', 'Darío I narra cómo llegó al trono, en persa antiguo, elamita y babilonio', 'Esd 4:24; Hag 1:1'],
            ['Palacio de Susa', 'Salas de columnas, patios y relieves de ladrillo vidriado de la época de Darío y Artajerjes', 'Est 1:2-6; Neh 1:1'],
            ['Tablillas de Persépolis', 'Miles de registros de raciones, viajes y pagos de la administración real', 'Esd 6:8; 7:21-22'],
            ['Papiros de Elefantina (Egipto)', 'Cartas de judíos que nombran a los hijos de Sanbalat y al sumo sacerdote Johanán', 'Neh 2:10; 12:22'],
            ['Archivo Murashu (Nipur)', 'Contratos con familias judías que vivían en Babilonia bajo Persia', 'Esd 2:1; Est 9:20'],
            ['Tablilla de Marduka (Persépolis)', 'Nombra a un funcionario de Jerjes llamado Marduka', 'Posiblemente Mardoqueo (Est 2:5)']
          ],
          nota: 'La relación de Marduka con Mardoqueo es posible, no segura: el nombre era común.' } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/persia-behistun-rawlinson.webp', alt: 'Un estudioso del siglo XIX, colgado de cuerdas en un acantilado, copia una gran inscripción tallada en la roca', pie: 'Recreación: Henry Rawlinson copia la inscripción de Behistún, hacia 1840.', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[22, 26], [38, 56]], capas: ['persia-500'], lugares: ['babilonia', 'behistun', 'susa', 'persepolis', 'elefantina', 'nipur'] } }
      ],
      texto: [
        'Persia es uno de los períodos mejor documentados de la historia antigua, y muchos de sus hallazgos iluminan directamente los libros de Esdras, Nehemías y Ester.',
        'El Cilindro de Ciro, hallado en Babilonia en 1879, describe en babilonio cómo Ciro entró en la ciudad y devolvió a varios pueblos sus dioses y sus habitantes. No menciona a los judíos, pero muestra que la política que la Biblia atribuye a Ciro era real (Esd 1:1-4). La inscripción de Behistún, tallada por Darío I en un acantilado, cuenta en tres idiomas cómo llegó al trono; al compararlos, los estudiosos del siglo XIX lograron descifrar la escritura cuneiforme, lo que abrió la puerta a leer todos los textos de Mesopotamia.',
        'En Susa, los arqueólogos excavaron el palacio real, con sus salas de columnas y patios, el escenario de Ester y Nehemías (Est 1:2-6; Neh 1:1). En Persépolis aparecieron miles de tablillas de la administración: raciones para trabajadores y viajeros, pagos y permisos, como los que Darío y Artajerjes ordenaron entregar para el templo (Esd 6:8; 7:21-22). Entre los funcionarios de la época de Jerjes aparece un tal Marduka; algunos lo relacionan con Mardoqueo, aunque el nombre era común y la identificación no es segura.',
        'En Egipto, los papiros de Elefantina conservan las cartas de una colonia judía del siglo V a.C. que mencionan a los hijos de Sanbalat, el adversario de Nehemías, y al sumo sacerdote Johanán (Neh 2:10; 12:22). Y el archivo de la familia Murashu, en Nipur, muestra a familias judías que seguían viviendo y trabajando en Babilonia bajo los persas, los mismos que no regresaron con Esdras.',
        'La arqueología no sostiene la fe, pero confirma que la Biblia habla de personas, lugares y costumbres reales.'
      ],
      pensar: 'La Biblia nombró a Ciro, a Darío, a Asuero y a Artajerjes, y la arqueología ha confirmado su historia. ¿Por qué es importante para el creyente que la fe esté anclada en hechos reales de la historia (Lc 1:1-4)?'
    }
  ];

  window.RUTA_DATA = {
    titulo: 'El imperio persa',
    credito: 'Citas textuales: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso. Fronteras de los mapas aproximadas.',
    marca: 'Recursos Bíblicos',
    inicio: '../../',
    rutas: [
      { id: 'historia', grupo: 'El imperio persa', n: 'Historia', info: 'Origen, territorio, reyes, guerras con Grecia y caída',
        linea: { desde: -565, hasta: -325, hitos: [
          { a: -550, t: 'Ciro une Media y Persia' }, { a: -539, t: 'Cae Babilonia' }, { a: -490, t: 'Maratón' },
          { a: -480, t: 'Salamina' }, { a: -445, t: 'Muros de Nehemías' }, { a: -331, t: 'Gaugamela' }
        ] },
        estaciones: historia },
      { id: 'sociedad', grupo: 'El imperio persa', n: 'Sociedad y religión', info: 'Las capitales, el gobierno, la religión, el trato a los pueblos y su legado',
        linea: { desde: -565, hasta: -325, hitos: [
          { a: -550, t: 'Ciro une Media y Persia' }, { a: -538, t: 'Decreto de Ciro' },
          { a: -458, t: 'Esdras' }, { a: -407, t: 'Cartas de Elefantina' }, { a: -330, t: 'Persépolis incendiada' }
        ] },
        estaciones: sociedad },
      { id: 'biblia', grupo: 'El imperio persa', n: 'El imperio y la Biblia', info: 'Persia en Isaías, Esdras, Ester, Nehemías, Daniel, los profetas y el Nuevo Testamento',
        linea: { desde: -720, hasta: -320, hitos: [
          { a: -700, t: 'Isaías' }, { a: -538, t: 'Decreto de Ciro' }, { a: -516, t: 'Templo terminado' },
          { a: -479, t: 'Ester reina' }, { a: -445, t: 'Muros' }, { a: -330, t: 'Fin de Persia' }
        ] },
        estaciones: biblia }
    ]
  };
})();
