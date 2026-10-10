/* ==========================================================
   Recursos Bíblicos — Los imperios en la historia bíblica · integrador
   Reúne los seis recursos de imperios (Egipto, Asiria, Babilonia, Persia,
   Grecia y Roma). Reutiliza sus imágenes (../<app>/img/…) y su geografía.
   Motor: ../assets/js/ruta-estudio.js. Citas textuales: Reina-Valera 1960.
   En temas doctrinales prevalece la línea pentecostal clásica (Asambleas de
   Dios), con escatología dispensacionalista.
   ========================================================== */
(() => {
  const MUNDO = [[18, 15], [45, 78]];
  const OCCIDENTE = [[24, -5], [50, 48]];
  const ORIENTE = [[17, 18], [46, 62]];

  /* ---------------- Ruta 1 · La sucesión de los imperios ---------------- */
  const sucesion = [
    {
      id: 'panorama', n: 'Seis imperios, una historia', ref: 'Daniel 2:21; Hechos 17:26; Ezequiel 5:5', fecha: [-1500, 476],
      visual: [{ tipo: 'mapa', titulo: 'Mapa', pasos: [
        { t: 'c. 1450 a.C.: Egipto domina desde el Nilo hasta Siria.', fecha: -1450,
          estado: { view: ORIENTE, capas: ['egipto-1450'], lugares: ['tebas', 'jerusalen'] } },
        { t: 'c. 667 a.C.: Asiria llega desde el Tigris hasta Egipto.', fecha: -667,
          estado: { view: ORIENTE, capas: ['asiria-667'], lugares: ['ninive', 'jerusalen'] } },
        { t: 'c. 570 a.C.: Babilonia, con Nabucodonosor.', fecha: -570,
          estado: { view: ORIENTE, capas: ['babilonia-570'], lugares: ['babilonia', 'jerusalen'] } },
        { t: 'c. 500 a.C.: Persia, de Egipto a la India.', fecha: -500,
          estado: { view: MUNDO, capas: ['persia-500'], lugares: ['susa', 'jerusalen'] } },
        { t: '323 a.C.: el imperio de Alejandro Magno.', fecha: -323,
          estado: { view: MUNDO, capas: ['alejandro-323'], lugares: ['babilonia', 'pella', 'jerusalen'] } },
        { t: '117 d.C.: Roma, en su mayor extensión.', fecha: 117,
          estado: { view: OCCIDENTE, capas: ['roma-117'], lugares: ['roma', 'jerusalen'] } }
      ] }],
      texto: [
        'Durante casi dos mil años, la historia de Israel transcurrió a la sombra de grandes imperios. Primero Egipto, donde los hijos de Jacob se convirtieron en pueblo y en esclavos. Después Asiria, que destruyó el reino del norte; Babilonia, que destruyó Jerusalén y llevó a Judá al exilio; Persia, que permitió el regreso; Grecia, que extendió su lengua y su cultura por todo el Oriente, y Roma, el imperio del Nuevo Testamento.',
        'Uno tras otro, cada imperio llegó a dominar la tierra de Israel, y uno tras otro desapareció. El mapa lo muestra paso a paso: cada uno parecía invencible en su momento, y cada uno dio paso al siguiente. Daniel resumió esa historia con una frase: Dios «muda los tiempos y las edades; quita reyes, y pone reyes» (Dn 2:21).',
        'En el centro de todos esos mapas está siempre el mismo punto: Jerusalén. Israel ocupaba una franja estrecha entre el desierto y el mar, el único paso entre África, Asia y Europa. Por eso todos los imperios la codiciaron, y por eso Dios la eligió como el lugar desde donde su revelación llegaría a todas las naciones: «Esta es Jerusalén; la puse en medio de las naciones» (Ez 5:5).',
        'Este recurso reúne lo que los seis recursos de imperios estudian por separado: la sucesión de los imperios en la historia, su lugar en la profecía de Daniel y lo que enseñan sobre la manera en que Dios gobierna a las naciones. Usa los botones bajo el mapa para recorrer los seis imperios.'
      ],
      pensar: 'Pablo dijo en Atenas que Dios «les ha prefijado el orden de los tiempos, y los límites de su habitación» a todas las naciones (Hch 17:26). ¿Qué te enseña ver la sucesión de los imperios acerca de quién dirige realmente la historia?'
    },
    {
      id: 'egipto-asiria', n: 'Egipto y Asiria: antes del exilio', ref: 'Éxodo 20:2; 2 Reyes 17:6; 18:13; Isaías 10:5', fecha: [-1500, -612],
      visual: [
        { tipo: 'imagen', titulo: 'Egipto', src: '../egipto/img/egipto-piramides.webp', alt: 'Las pirámides de Giza junto al Nilo al atardecer', pie: 'Egipto: el país de la esclavitud y del Éxodo.', origen: 'ia' },
        { tipo: 'imagen', titulo: 'Asiria', src: '../imperio-asirio/img/asiria-ninive.webp', foco: '62% 50%', alt: 'Las murallas y puertas de Nínive junto al río Tigris', pie: 'Asiria: Nínive, la capital del imperio.', origen: 'ia' }
      ],
      texto: [
        'Egipto fue la primera gran potencia en la historia de Israel. Allí bajó la familia de Jacob en tiempos de José, allí se convirtió en un pueblo numeroso y allí fue esclavizada. La salida de Egipto se volvió el acto fundacional de la fe de Israel: «Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto, de casa de servidumbre» (Éx 20:2). En tiempos de los reyes, Egipto fue un vecino poderoso y una tentación constante: un aliado al que acudir en lugar de confiar en Dios.',
        'Asiria fue el primer imperio que destruyó un reino del pueblo de Dios. Desde Nínive, junto al río Tigris, sus reyes extendieron su dominio hasta el Mediterráneo y Egipto. En 722 a.C. tomaron Samaria y llevaron cautivas a las diez tribus del norte (2 R 17:6), y en 701 a.C. Senaquerib invadió Judá y sitió Jerusalén, que fue librada por la intervención de Dios (2 R 18:13; 19:35).',
        'Isaías explicó el papel de Asiria con una imagen: era «vara y báculo de mi furor» (Is 10:5), un instrumento en la mano de Dios para disciplinar a un pueblo que se había apartado. Pero ese instrumento no podía gloriarse contra el que lo usaba, y su orgullo también fue juzgado: Nínive cayó en 612 a.C.',
        'Los recursos «Egipto» y «El imperio asirio» estudian estas dos potencias en detalle.'
      ],
      pensar: 'Egipto fue para Israel casa de esclavitud y, después, una falsa esperanza; Asiria fue la vara de la disciplina de Dios. ¿Qué te enseñan estas dos experiencias acerca de dónde poner tu confianza?'
    },
    {
      id: 'babilonia-persia', n: 'Babilonia y Persia: exilio y regreso', ref: '2 Reyes 25:8-11; Jeremías 25:11-12; Esdras 1:1-4; Isaías 45:1', fecha: [-626, -330],
      visual: [
        { tipo: 'imagen', titulo: 'Babilonia', src: '../imperio-babilonico/img/babilonia-puerta-ishtar.webp', alt: 'La Puerta de Ishtar de Babilonia al atardecer', pie: 'Babilonia: la Puerta de Ishtar.', origen: 'ia' },
        { tipo: 'imagen', titulo: 'Persia', src: '../imperio-persa/img/persia-persepolis.webp', alt: 'La Puerta de Todas las Naciones en Persépolis', pie: 'Persia: Persépolis.', origen: 'ia' }
      ],
      texto: [
        'Babilonia y Persia marcan el gran corte de la historia de Israel. Babilonia, con Nabucodonosor, destruyó Jerusalén y el templo de Salomón en 586 a.C. y llevó al pueblo de Judá al exilio (2 R 25:8-11). Fue el momento más oscuro del Antiguo Testamento: sin rey, sin templo y fuera de la tierra prometida.',
        'Pero Dios había fijado un límite. Jeremías anunció que el exilio duraría setenta años (Jer 25:11-12), e Isaías llamó por su nombre al rey que permitiría el regreso: Ciro, «su ungido» (Is 45:1). En 539 a.C., Ciro tomó Babilonia, y al año siguiente proclamó un decreto para que los judíos volvieran a Jerusalén y reconstruyeran el templo (Esd 1:1-4).',
        'Bajo Persia, el pueblo de Dios se reorganizó. Se reconstruyeron el templo y los muros de Jerusalén, Esdras enseñó la ley y, en Susa, Dios preservó a su pueblo por medio de Ester. Daniel vivió el paso de un imperio al otro, desde la corte de Nabucodonosor hasta los primeros años de Ciro.',
        'El exilio cambió para siempre al pueblo de Israel: nunca más volvió a caer en la idolatría como antes, las Escrituras ocuparon el centro de su vida y comenzaron a formarse las comunidades judías dispersas por el mundo. Los recursos «El imperio babilónico» y «El imperio persa» estudian estos dos imperios en detalle.'
      ],
      pensar: 'El exilio parecía el fin del pueblo de Dios, pero tenía un plazo fijado por Dios y terminó en restauración (Jer 29:10-11). ¿Qué esperanza te da esto en tus propios tiempos de «exilio»?'
    },
    {
      id: 'grecia-roma', n: 'Grecia y Roma: hacia el Nuevo Testamento', ref: 'Daniel 8:21; 11:31; Lucas 2:1; Gálatas 4:4', fecha: [-336, 476],
      visual: [
        { tipo: 'imagen', titulo: 'Grecia', src: '../imperio-griego/img/grecia-acropolis.webp', alt: 'La Acrópolis de Atenas con el Partenón al atardecer', pie: 'Grecia: la Acrópolis de Atenas.', origen: 'ia' },
        { tipo: 'imagen', titulo: 'Roma', src: '../imperio-romano/img/roma-foro.webp', alt: 'El foro romano en su esplendor, al atardecer', pie: 'Roma: el foro.', origen: 'ia' }
      ],
      texto: [
        'Alejandro Magno conquistó el imperio persa en menos de diez años, y aunque su reino se dividió al morir, la lengua y la cultura griegas se extendieron por todo el Oriente. Daniel lo había visto como el macho cabrío que venía del occidente «sin tocar tierra»: «El macho cabrío es el rey de Grecia» (Dn 8:21). Bajo los reinos griegos, Judea vivió la persecución de Antíoco IV, la profanación del templo y la rebelión de los Macabeos (Dn 11:31).',
        'Roma tomó Jerusalén en 63 a.C. y gobernó toda la cuenca del Mediterráneo. Bajo su dominio nació Jesús, cuando un edicto de Augusto ordenó el censo que llevó a José y María a Belén (Lc 2:1). Un gobernador romano lo condenó a la cruz, y soldados romanos lo crucificaron. En el año 70, Roma destruyó el templo de Jerusalén.',
        'Grecia y Roma prepararon, sin saberlo, el camino del evangelio. Grecia dio una lengua común, el griego en que se escribió el Nuevo Testamento; Roma dio caminos, leyes y una paz que permitía viajar. Pablo lo resume así: «cuando vino el cumplimiento del tiempo, Dios envió a su Hijo» (Gá 4:4).',
        'Los recursos «El imperio griego» y «El imperio romano» estudian estos dos imperios en detalle.'
      ],
      pensar: 'Dios usó la lengua de Grecia y los caminos de Roma para que el evangelio llegara a todas las naciones (Gá 4:4). ¿Cómo ves a Dios usando las circunstancias de tu tiempo para su propósito?'
    },
    {
      id: 'comparacion', n: 'Los seis imperios comparados', ref: 'Daniel 2:37-40; Isaías 40:15-17, 23',
      visual: [{ tipo: 'tabla', titulo: 'Comparación', tabla: {
        titulo: 'Los seis imperios de la historia bíblica', cab: ['Imperio', 'Capital', 'Época de dominio', 'Relación con Israel', 'Trato a los pueblos'],
        filas: [
          ['Egipto', 'Tebas, Menfis', 'c. 1550–1069 a.C. (Reino Nuevo)', 'Esclavitud y Éxodo; aliado y tentación', 'Tributo; dominio de Canaán por guarniciones'],
          ['Asiria', 'Nínive', '911–609 a.C.', 'Destruye Israel (722); sitia Jerusalén (701)', 'Terror y deportaciones masivas'],
          ['Babilonia', 'Babilonia', '626–539 a.C.', 'Destruye Jerusalén y el templo (586); exilio', 'Deportación de las élites'],
          ['Persia', 'Susa, Persépolis', '550–330 a.C.', 'Permite el regreso y la reconstrucción', 'Tolerancia religiosa y retorno de los pueblos'],
          ['Grecia', 'Pela, Alejandría, Antioquía', '334–63 a.C.', 'Helenismo; persecución de Antíoco IV', 'Difusión de la cultura griega'],
          ['Roma', 'Roma', '63 a.C.–476 d.C. en Judea y Occidente', 'Nacimiento y cruz de Jesús; destruye el templo (70)', 'Ciudadanía, leyes y caminos; reyes clientes']
        ],
        nota: 'Las fechas indican el período en que cada imperio dominó la región de Israel o fue la gran potencia del Oriente, no toda su historia.' } }],
      texto: [
        'Puestos uno al lado del otro, los seis imperios muestran diferencias importantes. Algunos gobernaron con terror, como Asiria, que deportaba pueblos enteros para quebrar cualquier rebelión. Otros, como Persia, prefirieron respetar las religiones locales y permitir que los deportados volvieran a su tierra. Grecia conquistó más por su cultura que por sus ejércitos, y Roma unió el mundo con leyes y caminos.',
        'Todos tuvieron algo en común: se creyeron eternos y todos pasaron. Nínive, Babilonia, Persépolis y las capitales griegas quedaron en ruinas. Isaías lo había dicho: delante de Dios, «las naciones le son como la gota de agua que cae del cubo», y Él «convierte en nada a los poderosos» (Is 40:15, 23).',
        'En la estatua del sueño de Nabucodonosor, los metales van perdiendo valor de arriba hacia abajo: oro, plata, bronce, hierro, y finalmente hierro mezclado con barro (Dn 2:37-43). Muchos intérpretes ven en esa secuencia un descenso en la gloria y la unidad de los reinos humanos, aunque aumente su fuerza y su dureza.',
        'La tabla resume las características de cada imperio. Para estudiar cualquiera de ellos en detalle, conviene recorrer su propio recurso.'
      ],
      pensar: 'Todos los imperios se creyeron eternos, y todos pasaron (Is 40:23). ¿En qué cosas de este mundo tendemos a poner una seguridad que solo Dios puede dar?'
    },
    {
      id: 'israel', n: 'Israel en medio de los imperios', ref: 'Deuteronomio 32:8; Ezequiel 5:5; Jeremías 29:7; Hechos 1:8', fecha: [-1500, 70],
      visual: [
        { tipo: 'mapa', titulo: 'Mapa', estado: { view: [[24, 26], [40, 50]], capas: ['egipto-1900', 'asiria-1000', 'grecia-480'], lugares: ['jerusalen', 'menfis', 'ninive', 'babilonia', 'susa', 'atenas'] } },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/integrador-jerusalen-caminos.webp', alt: 'Vista de Jerusalén antigua sobre sus colinas al amanecer, con caminos que parten hacia el mar, el desierto y el norte', pie: 'Jerusalén, en el cruce de los caminos de tres continentes.', origen: 'ia' }
      ],
      texto: [
        'Si se mira un mapa del mundo antiguo, Israel aparece como un pequeño puente entre grandes potencias. Al suroeste estaba Egipto; al noreste, Mesopotamia, donde surgieron Asiria y Babilonia; más al este, Persia; y al oeste, más allá del mar, Grecia y Roma. Los ejércitos y las caravanas que iban de un extremo a otro tenían que pasar por la estrecha franja de tierra entre el mar Mediterráneo y el desierto. Por eso, cada vez que un imperio quería dominar a otro, pasaba por la tierra de Israel.',
        'Desde un punto de vista humano, era el peor lugar para un pueblo pequeño. Pero desde el punto de vista de Dios, era el lugar exacto. Dios había puesto a Israel «en medio de las naciones» (Ez 5:5) para que desde allí su nombre fuera conocido por todos los pueblos. Moisés llegó a decir que, cuando Dios estableció los límites de las naciones, lo hizo «según el número de los hijos de Israel» (Dt 32:8).',
        'Esa ubicación hizo que el pueblo de Dios viviera en contacto con los imperios: como esclavo en Egipto, como exiliado en Babilonia, como súbdito de Persia, de los griegos y de Roma. En el exilio, Dios le enseñó a vivir con fe en tierra extraña: «procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová» (Jer 29:7).',
        'Y desde ese mismo cruce de caminos salió el evangelio. Jesús envió a sus discípulos a ser testigos «en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra» (Hch 1:8). Los caminos que habían traído a los ejércitos de los imperios llevaron ahora el mensaje de Cristo a todas las naciones.'
      ],
      pensar: 'Dios puso a su pueblo «en medio de las naciones» (Ez 5:5) para que su nombre fuera conocido. ¿Qué significa para ti haber sido puesto por Dios en el lugar donde vives, trabajas o estudias?'
    }
  ];

  /* ---------------- Ruta 2 · Los imperios en la profecía ---------------- */
  const profecia = [
    {
      id: 'estatua', n: 'La estatua de Daniel 2', ref: 'Daniel 2:31-45',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: '../imperio-romano/img/roma-estatua-daniel.webp', alt: 'Una estatua colosal de metales diversos golpeada en los pies por una piedra', pie: 'La estatua del sueño de Nabucodonosor (Dn 2).', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Metales', tabla: {
          titulo: 'Los metales de la estatua', cab: ['Parte', 'Metal', 'Imperio'],
          filas: [
            ['Cabeza', 'Oro', 'Babilonia (Dn 2:37-38)'],
            ['Pecho y brazos', 'Plata', 'Medo-Persia'],
            ['Vientre y muslos', 'Bronce', 'Grecia'],
            ['Piernas', 'Hierro', 'Roma'],
            ['Pies y dedos', 'Hierro y barro', 'La forma final y dividida del cuarto reino'],
            ['La piedra', 'Cortada no con mano', 'El reino de Cristo, que llena la tierra']
          ],
          nota: 'Solo la cabeza de oro está identificada en el propio texto. Las demás identificaciones siguen la interpretación tradicional, que coincide con Daniel 8:20-21.' } }
      ],
      texto: [
        'El rey Nabucodonosor soñó con una gran estatua: la cabeza de oro fino, el pecho y los brazos de plata, el vientre y los muslos de bronce, las piernas de hierro y los pies en parte de hierro y en parte de barro cocido. Una piedra «cortada, no con mano» la golpeó en los pies, y toda la estatua se desmenuzó como el tamo, mientras la piedra se convertía en «un gran monte que llenó toda la tierra» (Dn 2:31-35).',
        'Daniel explicó el sueño: Nabucodonosor era la cabeza de oro, y después vendrían otros tres reinos, cada uno de menor valor, hasta un cuarto reino fuerte como el hierro (Dn 2:37-40). Con la ayuda de Daniel 7 y 8, la interpretación tradicional identifica esos reinos con Babilonia, Medo-Persia, Grecia y Roma. Los cuatro dominaron, uno tras otro, la tierra de Israel.',
        'El centro del sueño no son los imperios, sino la piedra. «En los días de estos reyes el Dios del cielo levantará un reino que no será jamás destruido… desmenuzará y consumirá a todos estos reinos, pero él permanecerá para siempre» (Dn 2:44). Esa piedra es Cristo y su reino.',
        'En la interpretación dispensacionalista que sigue este estudio, la piedra golpea la estatua en los pies, es decir, en la etapa final del cuarto reino, todavía futura. El reino de Cristo se establecerá en plenitud en su segunda venida, cuando destruya los reinos del mundo y reine sobre toda la tierra.'
      ],
      pensar: 'Todos los metales de la estatua terminaron como tamo que se llevó el viento, y la piedra llenó toda la tierra (Dn 2:35). ¿Qué te enseña esta imagen acerca de lo que permanece y lo que pasa?'
    },
    {
      id: 'bestias', n: 'Las cuatro bestias de Daniel 7', ref: 'Daniel 7:1-28',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/integrador-cuatro-bestias.webp', alt: 'Cuatro bestias simbólicas suben de un mar agitado por el viento: un león con alas de águila, un oso, un leopardo de cuatro alas y una bestia terrible con dientes de hierro', pie: 'Las cuatro bestias de Daniel 7.', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Bestias', tabla: {
          titulo: 'Las bestias y la estatua', cab: ['Daniel 7', 'Daniel 2', 'Imperio'],
          filas: [
            ['León con alas de águila', 'Cabeza de oro', 'Babilonia'],
            ['Oso que se alza de un costado', 'Pecho y brazos de plata', 'Medo-Persia'],
            ['Leopardo con cuatro alas y cuatro cabezas', 'Vientre de bronce', 'Grecia'],
            ['Bestia terrible con dientes de hierro y diez cuernos', 'Piernas de hierro, pies de hierro y barro', 'Roma y su forma final'],
            ['El Hijo del Hombre recibe el reino', 'La piedra que llena la tierra', 'El reino de Cristo']
          ] } }
      ],
      texto: [
        'Años después del sueño de Nabucodonosor, el propio Daniel tuvo una visión de los mismos imperios, ahora como bestias que subían del mar agitado: «Estas cuatro grandes bestias son cuatro reyes que se levantarán en la tierra» (Dn 7:17). Lo que para el rey era una estatua brillante, para el profeta eran fieras.',
        'La primera era como un león con alas de águila: Babilonia, cuyo poder fue humillado y recibió «corazón de hombre», como Nabucodonosor después de su locura (Dn 7:4). La segunda era un oso que se alzaba más de un costado, con tres costillas en la boca: Medo-Persia, con Persia como la parte más fuerte (Dn 7:5). La tercera, un leopardo con cuatro alas y cuatro cabezas: Grecia, veloz con Alejandro y dividida en cuatro reinos (Dn 7:6). La cuarta era «espantosa y terrible», con dientes de hierro y diez cuernos, diferente de todas: Roma (Dn 7:7).',
        'Entre los diez cuernos surge un cuerno pequeño con ojos de hombre y una boca que habla grandes cosas, que hace guerra contra los santos (Dn 7:8, 21, 25). En la interpretación dispensacionalista que sigue este estudio, los diez cuernos son reyes de la forma final del cuarto reino, y el cuerno pequeño es el Anticristo del tiempo del fin.',
        'Pero la visión termina en el cielo. Daniel vio al Anciano de días sentado en su trono, y a «uno como un hijo de hombre» que venía con las nubes del cielo, y «le fue dado dominio, gloria y reino… su dominio es dominio eterno, que nunca pasará» (Dn 7:13-14). Jesús se aplicó a sí mismo ese título: el Hijo del Hombre que viene en las nubes (Mt 26:64).'
      ],
      pensar: 'Daniel vio a los imperios como bestias, y al Hijo del Hombre recibiendo un reino eterno (Dn 7:13-14). ¿Cómo cambia tu manera de ver el poder de este mundo cuando lo miras desde el trono de Dios?'
    },
    {
      id: 'carnero', n: 'El carnero y el macho cabrío', ref: 'Daniel 8:1-27', fecha: [-550, -164],
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: '../imperio-griego/img/grecia-carnero-macho-cabrio.webp', alt: 'Un macho cabrío embiste a un carnero de dos cuernos junto a un río', pie: 'La visión del carnero y el macho cabrío (Dn 8).', origen: 'ia' },
        { tipo: 'mapa', titulo: 'Mapa', pasos: [
          { t: 'El carnero: Media y Persia (Dn 8:20).', fecha: -500, estado: { view: MUNDO, capas: ['persia-500'], lugares: ['susa', 'jerusalen'] } },
          { t: 'El macho cabrío: Grecia, con Alejandro (Dn 8:21).', fecha: -323, estado: { view: MUNDO, capas: ['alejandro-323'], lugares: ['pella', 'babilonia', 'jerusalen'] } },
          { t: 'Los cuatro cuernos: los reinos sucesores (Dn 8:22).', fecha: -301, estado: { view: ORIENTE, capas: ['casandro-301', 'lisimaco-301', 'seleucidas-301', 'ptolomeos-301'], lugares: ['jerusalen'] } }
        ] }
      ],
      texto: [
        'En Daniel 8, la visión se concentra en dos imperios, y esta vez el ángel los nombra. Un carnero con dos cuernos, uno más alto que el otro, embestía hacia el occidente, el norte y el sur: «éstos son los reyes de Media y de Persia» (Dn 8:20). Un macho cabrío venía del occidente sin tocar tierra, con un cuerno notable entre los ojos, y derribó al carnero: «El macho cabrío es el rey de Grecia, y el cuerno grande que tenía entre sus ojos es el rey primero» (Dn 8:21).',
        'El gran cuerno se quebró en su mayor fuerza, y en su lugar salieron cuatro (Dn 8:8, 22): la muerte de Alejandro y la división de su imperio. De uno de ellos salió un cuerno pequeño que creció hacia «la tierra gloriosa», quitó el sacrificio continuo y profanó el santuario (Dn 8:9-11), lo que se cumplió en Antíoco IV.',
        'Esta visión es la clave para identificar los reinos de las otras visiones. Si el segundo reino es Medo-Persia y el tercero es Grecia, como dice el ángel, entonces el cuarto, el de hierro, es Roma, el imperio que vino después de los griegos.',
        'El ángel también dijo a Daniel que la visión era «para el tiempo del fin» (Dn 8:17). En la interpretación dispensacionalista, el cuerno pequeño de Daniel 8, cumplido en Antíoco, es también una figura del Anticristo, el «rey altivo de rostro» de los últimos días (Dn 8:23).'
      ],
      pensar: 'Dios anunció con detalle el paso de Persia a Grecia unos dos siglos antes de que ocurriera. ¿Qué confianza te da esto para creer las promesas que todavía esperan su cumplimiento?'
    },
    {
      id: 'tiempos-gentiles', n: 'Los tiempos de los gentiles', ref: 'Lucas 21:24; Daniel 2:44; 9:24-27; Romanos 11:25', fecha: [-605, 476],
      visual: [
        { tipo: 'tabla', titulo: 'Esquema', tabla: {
          titulo: 'Los tiempos de los gentiles', cab: ['Etapa', 'Qué ocurre', 'Texto'],
          filas: [
            ['Comienzo', 'Nabucodonosor domina Jerusalén (605–586 a.C.)', 'Dn 1:1-2; 2:37-38'],
            ['Los cuatro imperios', 'Babilonia, Persia, Grecia y Roma dominan Jerusalén', 'Dn 2; 7'],
            ['Jesús lo anuncia', 'Jerusalén «será hollada por los gentiles»', 'Lc 21:24'],
            ['Período actual', 'La iglesia predica el evangelio a todas las naciones', 'Ro 11:25; Mt 24:14'],
            ['La forma final', 'Diez reyes y el Anticristo; la última semana de Daniel', 'Dn 7:24-25; 9:27'],
            ['El final', 'Cristo vuelve y establece su reino', 'Dn 2:44; Ap 11:15']
          ],
          nota: 'Esquema según la interpretación dispensacionalista que sigue este estudio; el recurso del esquema escatológico lo desarrolla en detalle.' } }
      ],
      texto: [
        'Jesús usó una expresión que resume la historia de los imperios: «Jerusalén será hollada por los gentiles, hasta que los tiempos de los gentiles se cumplan» (Lc 21:24). Los «tiempos de los gentiles» son el largo período en que Jerusalén y el pueblo de Israel están bajo el dominio de naciones no judías.',
        'Ese período comenzó con Babilonia, cuando Nabucodonosor tomó Jerusalén. Por eso Daniel 2 empieza con la cabeza de oro: desde entonces, los imperios gentiles se sucedieron sobre Jerusalén, uno tras otro. Persia, Grecia y Roma la gobernaron, y Roma destruyó el templo en el año 70, como Jesús anunció.',
        'En la interpretación dispensacionalista que sigue este estudio, los tiempos de los gentiles no han terminado. Daniel 9 habla de setenta semanas de años determinadas sobre el pueblo de Israel; sesenta y nueve se cumplieron hasta el Mesías, a quien «se quitará la vida… mas no por sí» (Dn 9:26), y la última semana todavía es futura (Dn 9:27). Entre ambas está el tiempo de la iglesia, en que el evangelio se predica a todas las naciones, «hasta que haya entrado la plenitud de los gentiles» (Ro 11:25).',
        'Los tiempos de los gentiles terminarán con el regreso de Cristo, cuando la piedra golpee la estatua y se cumpla la proclamación del Apocalipsis: «Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo; y él reinará por los siglos de los siglos» (Ap 11:15).'
      ],
      pensar: 'Vivimos en el tiempo en que el evangelio se predica a todas las naciones, antes del fin (Mt 24:14). ¿Qué lugar ocupa en tu vida la tarea de anunciar a Cristo mientras ese tiempo dura?'
    },
    {
      id: 'reino', n: 'El reino que no tendrá fin', ref: 'Daniel 2:44; 7:13-14, 27; Lucas 1:32-33; Apocalipsis 11:15; 19:11-16',
      visual: [
        { tipo: 'cita', titulo: 'Pasaje', texto: 'Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo; y él reinará por los siglos de los siglos.', ref: 'Apocalipsis 11:15' },
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/integrador-gran-monte.webp', alt: 'Un gran monte iluminado por la luz del amanecer se eleva sobre las ruinas de antiguos imperios esparcidas por la llanura', pie: 'La piedra que se convirtió en un gran monte (Dn 2:35).', origen: 'ia' }
      ],
      texto: [
        'Todas las visiones de Daniel sobre los imperios terminan del mismo modo: con un reino que Dios mismo establece. En Daniel 2 es la piedra cortada no con mano, que se convierte en un monte que llena la tierra. En Daniel 7 es el Hijo del Hombre, que recibe del Anciano de días «dominio, gloria y reino», un reino «que no será destruido» (Dn 7:14), y que comparte con el «pueblo de los santos del Altísimo» (Dn 7:27).',
        'El Nuevo Testamento anuncia que ese Rey es Jesús. El ángel Gabriel le dijo a María que su hijo recibiría «el trono de David su padre… y su reino no tendrá fin» (Lc 1:32-33). Jesús comenzó su ministerio proclamando que el reino de Dios se había acercado, y ante el sumo sacerdote declaró que lo verían venir «en las nubes del cielo» (Mt 26:64), con las palabras de Daniel 7.',
        'En la interpretación dispensacionalista que sigue este estudio, el reino de Cristo tiene un aspecto presente, en el corazón de los que creen y en la iglesia, y un cumplimiento futuro visible: cuando Cristo vuelva en gloria, vencerá a los reinos del mundo, reinará sobre la tierra durante mil años y después establecerá el reino eterno.',
        'Egipto, Asiria, Babilonia, Persia, Grecia y Roma pasaron. El Apocalipsis muestra el final de toda esa historia: el jinete que sale del cielo lleva escrito «REY DE REYES Y SEÑOR DE SEÑORES» (Ap 19:16), y la gran voz proclama que los reinos del mundo han venido a ser de nuestro Señor y de su Cristo (Ap 11:15).'
      ],
      pensar: '«Su reino no tendrá fin» (Lc 1:33). Si los imperios pasan y el reino de Cristo permanece, ¿a qué reino estás dedicando tu vida, tu tiempo y tus fuerzas?'
    }
  ];

  /* ---------------- Ruta 3 · Dios y las naciones ---------------- */
  const naciones = [
    {
      id: 'soberania', n: 'Dios gobierna los reinos', ref: 'Daniel 4:17, 32-37; Proverbios 21:1; Salmo 2; Isaías 40:15-23',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: '../imperio-asirio/img/asiria-rey-tributo.webp', alt: 'Un rey asirio en su trono recibe el tributo de reyes vasallos', pie: 'Los reyes de la tierra se creían dueños de las naciones.', origen: 'ia' },
        { tipo: 'cita', titulo: 'Pasaje', texto: 'El Altísimo gobierna el reino de los hombres, y a quien él quiere lo da.', ref: 'Daniel 4:17' }
      ],
      texto: [
        'La gran lección de la historia de los imperios aparece en boca del más poderoso de los reyes de Babilonia. Nabucodonosor se paseaba por su palacio y decía: «¿No es ésta la gran Babilonia que yo edifiqué… con la fuerza de mi poder, y para gloria de mi majestad?» (Dn 4:30). Dios lo humilló hasta que reconoció «que el Altísimo tiene el dominio en el reino de los hombres, y lo da a quien él quiere» (Dn 4:32).',
        'Esa verdad recorre toda la Biblia. «Como los repartimientos de las aguas, así está el corazón del rey en la mano de Jehová» (Pr 21:1). Las naciones se amotinan contra Dios, pero «el que mora en los cielos se reirá» (Sal 2:1, 4). Delante de Él, las naciones son como una gota de agua, y Él «convierte en nada a los poderosos» (Is 40:15, 23).',
        'Esto no significa que Dios apruebe todo lo que hacen los imperios. Los profetas denunciaron la crueldad de Asiria, el orgullo de Babilonia y la idolatría de todos. Pero muestra que ningún poder humano está fuera de su control: Dios puede usar a los reyes para sus propósitos, ponerles límites y juzgarlos.',
        'Para el creyente, esta verdad es fuente de paz. Las noticias pueden mostrar guerras, crisis y gobernantes poderosos, pero el trono más alto no está en ninguna capital de la tierra.'
      ],
      pensar: 'Nabucodonosor tuvo que aprender que «el Altísimo gobierna el reino de los hombres» (Dn 4:17). ¿Cómo te ayuda esta verdad a enfrentar con paz las noticias y los cambios del mundo?'
    },
    {
      id: 'instrumentos', n: 'Instrumentos y juicio', ref: 'Isaías 10:5-15; 45:1-7; Jeremías 25:8-14; Habacuc 1:5-13; 2:14',
      visual: [{ tipo: 'tabla', titulo: 'Instrumentos', tabla: {
        titulo: 'Cómo llama Dios a los imperios', cab: ['Imperio', 'Cómo lo llama Dios', 'Para qué', 'Su juicio'],
        filas: [
          ['Asiria', '«Vara y báculo de mi furor»', 'Disciplinar a Israel', 'Is 10:5, 12-19; Nahúm'],
          ['Babilonia', '«Nabucodonosor… mi siervo»', 'Disciplinar a Judá y a las naciones', 'Jer 25:9, 12; 50–51'],
          ['Persia', '«Su ungido, a Ciro»', 'Hacer volver a su pueblo', 'Dn 8:5-7'],
          ['Grecia y Roma', 'Reinos de bronce y de hierro', 'Preparar el tiempo del Mesías', 'Dn 2:44-45; 7:11']
        ] } }],
      texto: [
        'Una de las enseñanzas más difíciles de los profetas es que Dios usó a imperios paganos como instrumentos de su plan. Llamó a Asiria «vara y báculo de mi furor» (Is 10:5); a Nabucodonosor, «mi siervo» (Jer 25:9), y a Ciro, «su ungido» (Is 45:1). Ninguno de ellos conocía al Dios de Israel, pero todos cumplieron su propósito.',
        'Habacuc no podía entenderlo: ¿cómo podía un Dios santo usar a los caldeos, más malvados que su propio pueblo (Hab 1:13)? La respuesta de Dios fue doble. Por un lado, el instrumento también sería juzgado: Asiria cayó por su orgullo (Is 10:12), y Babilonia recibió el castigo que había dado a otros (Jer 25:12). Por otro, el justo debía vivir por la fe mientras esperaba, porque llegaría el día en que «la tierra será llena del conocimiento de la gloria de Jehová, como las aguas cubren el mar» (Hab 2:14).',
        'Esta verdad no excusa el mal de los imperios: Dios los hace responsables de su crueldad. Pero muestra que ni siquiera el mal humano puede frustrar su plan. Dios puede usar aun las decisiones de quienes no lo conocen para disciplinar, corregir y finalmente bendecir a su pueblo.',
        'El ejemplo supremo está en la cruz. Las autoridades judías y romanas condenaron a Jesús por motivos injustos, y sin embargo hicieron cuanto «tu mano y tu consejo habían antes determinado que sucediera» (Hch 4:28): la salvación del mundo.'
      ],
      pensar: 'Dios usó aun la injusticia de Roma en la cruz para traer salvación (Hch 4:27-28). ¿Qué situación injusta de tu vida necesitas poner en manos de un Dios que puede sacar bien aun del mal (Gn 50:20)?'
    },
    {
      id: 'orgullo', n: 'El orgullo de los imperios', ref: 'Génesis 11:1-9; Daniel 4:30-37; 5:20-23; Hechos 12:21-23; Apocalipsis 18:7-8',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/integrador-torre-babel.webp', alt: 'Una enorme torre escalonada en construcción en la llanura de Mesopotamia, con miles de obreros y ladrillos, bajo un cielo de tormenta', pie: 'La torre de Babel (Gn 11:4).', origen: 'ia' }
      ],
      texto: [
        'Hay un pecado que se repite en todos los imperios: el orgullo. Comienza en Babel, cuando los hombres dijeron: «edifiquémonos una ciudad y una torre, cuya cúspide llegue al cielo; y hagámonos un nombre» (Gn 11:4). Dios confundió su lengua y los dispersó.',
        'El mismo espíritu aparece en los reyes. El faraón del Éxodo preguntó: «¿Quién es Jehová, para que yo oiga su voz?» (Éx 5:2). El rey de Asiria se jactó de que había conquistado con su propia fuerza (Is 10:13). Nabucodonosor se glorió de la gran Babilonia que él había edificado, y fue humillado (Dn 4:30-33). Su descendiente Belsasar usó los vasos del templo en un banquete, y esa misma noche perdió el reino (Dn 5:23, 30). Herodes Agripa aceptó que lo aclamaran como un dios, y «un ángel del Señor le hirió, por cuanto no dio la gloria a Dios» (Hch 12:23).',
        'Ezequiel describe a Faraón como el dragón que decía: «Mío es el Nilo, pues yo lo hice» (Ez 29:3), y Sofonías, a Nínive, que decía en su corazón: «Yo, y no más» (Sof 2:15). En el Apocalipsis, Babilonia la grande repite la misma soberbia: «Yo estoy sentada como reina… y no veré llanto» (Ap 18:7), y cae en un solo día.',
        'La lección vale para los imperios y para cada persona. «Antes del quebrantamiento es la soberbia» (Pr 16:18). En cambio, Nabucodonosor terminó alabando al Rey del cielo, porque «él puede humillar a los que andan con soberbia» (Dn 4:37).'
      ],
      pensar: 'Desde Babel hasta Babilonia la grande, el orgullo humano quiere hacerse un nombre sin Dios (Gn 11:4). ¿En qué áreas de tu vida necesitas humillarte y dar la gloria a Dios?'
    },
    {
      id: 'pueblo', n: 'El pueblo de Dios en medio de los imperios', ref: 'Génesis 41; Daniel 1; 6; Ester 4:14; Nehemías 1–2; Jeremías 29:4-7; Filipenses 3:20',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: '../imperio-persa/img/persia-daniel-foso.webp', alt: 'El profeta Daniel, anciano, en calma dentro del foso de los leones', pie: 'Daniel, fiel en la corte de dos imperios (Dn 6).', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Ejemplos', tabla: {
          titulo: 'Creyentes que sirvieron en los imperios', cab: ['Persona', 'Imperio', 'Cómo fue fiel'],
          filas: [
            ['José', 'Egipto', 'Gobernó con sabiduría y salvó a muchos (Gn 41; 50:20)'],
            ['Daniel y sus amigos', 'Babilonia y Persia', 'No se contaminaron ni dejaron de orar (Dn 1:8; 3:18; 6:10)'],
            ['Ester y Mardoqueo', 'Persia', 'Arriesgaron su vida por su pueblo (Est 4:14-16)'],
            ['Nehemías', 'Persia', 'Usó su cargo para reconstruir Jerusalén (Neh 1–2)'],
            ['Pablo', 'Roma', 'Usó su ciudadanía para el evangelio (Hch 22:25; 25:11)']
          ] } }
      ],
      texto: [
        'Una parte importante de la Biblia muestra cómo vivir fielmente bajo gobiernos que no conocen a Dios. José sirvió en la corte de Egipto, Daniel en la de Babilonia y Persia, Ester y Nehemías en el palacio de Susa, y Pablo usó su ciudadanía romana para llevar el evangelio hasta Roma.',
        'Ninguno de ellos se aisló, pero ninguno se dejó absorber. Daniel aceptó estudiar en la escuela del rey, pero «propuso en su corazón no contaminarse» (Dn 1:8), y siguió orando aunque estaba prohibido (Dn 6:10). Sus amigos se negaron a adorar la estatua: «sepas, oh rey, que no serviremos a tus dioses» (Dn 3:18). Ester arriesgó su vida, sabiendo que tal vez había llegado al reino «para esta hora» (Est 4:14).',
        'Jeremías dio a los exiliados una instrucción que todavía orienta al creyente: edificar casas, plantar huertos, formar familias y «procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová» (Jer 29:7). El pueblo de Dios debía ser una bendición en tierra extraña, sin olvidar que su verdadera esperanza estaba en Dios.',
        'El Nuevo Testamento lo dice así: «nuestra ciudadanía está en los cielos, de donde también esperamos al Salvador» (Fil 3:20). El creyente vive en las naciones de la tierra como ciudadano responsable, pero su lealtad primera es para el Rey que viene.'
      ],
      pensar: 'Daniel sirvió con excelencia a reyes paganos sin dejar de orar a su Dios (Dn 6:10). ¿Cómo puedes ser fiel a Dios y, al mismo tiempo, una bendición para el lugar donde vives (Jer 29:7)?'
    },
    {
      id: 'evangelio', n: 'Las naciones y el evangelio', ref: 'Hechos 2:1-11; Isaías 19:23-25; Mateo 28:19; Apocalipsis 7:9-10',
      visual: [
        { tipo: 'imagen', titulo: 'Imagen', src: 'img/integrador-pentecostes.webp', alt: 'El día de Pentecostés en Jerusalén: los discípulos llenos del Espíritu Santo hablan a una multitud de judíos de muchas naciones, con vestidos de Egipto, Persia, Mesopotamia, Grecia y Roma', pie: 'Pentecostés: las naciones de los antiguos imperios oyen las maravillas de Dios (Hch 2:5-11).', origen: 'ia' },
        { tipo: 'tabla', titulo: 'Pentecostés', tabla: {
          titulo: 'Los imperios presentes en Pentecostés (Hch 2:9-11)', cab: ['Pueblos nombrados', 'Antiguo imperio'],
          filas: [
            ['Partos, medos, elamitas', 'Persia y Media'],
            ['Los que habitan en Mesopotamia', 'Asiria y Babilonia'],
            ['Egipto y las regiones de África más allá de Cirene', 'Egipto'],
            ['Asia, Frigia, Panfilia, cretenses', 'El mundo griego'],
            ['Romanos aquí residentes', 'Roma']
          ] } }
      ],
      texto: [
        'La historia de los imperios tiene un final inesperado en el libro de los Hechos. El día de Pentecostés, cuando el Espíritu Santo descendió sobre los discípulos, había en Jerusalén judíos y prosélitos «de todas las naciones bajo el cielo» (Hch 2:5). Lucas los enumera: «Partos, medos, elamitas, y los que habitamos en Mesopotamia… en Egipto y en las regiones de Africa más allá de Cirene, y romanos aquí residentes» (Hch 2:9-10).',
        'Son, uno por uno, los pueblos de los antiguos imperios: Persia y Media, Asiria y Babilonia en Mesopotamia, Egipto, el mundo griego y Roma. Los descendientes de los que habían sido deportados por Asiria y Babilonia, y los que vivían dispersos por el mundo griego y romano, oyeron en su propia lengua «las maravillas de Dios» (Hch 2:11). Lo que Babel había dividido con la confusión de las lenguas, el Espíritu Santo comenzó a unir en Cristo.',
        'Los profetas lo habían anunciado. Isaías vio el día en que Egipto y Asiria, los antiguos enemigos, adorarían a Dios junto con Israel: «Bendito el pueblo mío Egipto, y el asirio obra de mis manos, e Israel mi heredad» (Is 19:25). Y Jesús envió a sus discípulos a hacer discípulos «a todas las naciones» (Mt 28:19).',
        'El Apocalipsis muestra el final de esa historia: «una gran multitud, la cual nadie podía contar, de todas naciones y tribus y pueblos y lenguas», delante del trono y del Cordero (Ap 7:9). Los imperios pasaron; los pueblos que dominaron están representados ante el trono de Dios.'
      ],
      pensar: 'En Pentecostés, el Espíritu Santo reunió a gente de todos los pueblos de los antiguos imperios para oír «las maravillas de Dios» (Hch 2:11). ¿Qué papel tiene el Espíritu Santo en tu vida para llevar el evangelio a personas de otras naciones, culturas o trasfondos?'
    }
  ];

  window.RUTA_DATA = {
    titulo: 'Los imperios en la historia bíblica',
    credito: 'Citas textuales: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso. Fronteras de los mapas aproximadas.',
    marca: 'Recursos Bíblicos',
    inicio: '../../',
    rutas: [
      { id: 'sucesion', grupo: 'Los imperios en la historia bíblica', n: 'La sucesión de los imperios', info: 'Seis imperios en un mapa: de Egipto a Roma, y la tierra de Israel en medio',
        linea: { desde: -1550, hasta: 520, hitos: [
          { a: -1450, t: 'Egipto' }, { a: -722, t: 'Asiria' }, { a: -586, t: 'Babilonia' },
          { a: -539, t: 'Persia' }, { a: -332, t: 'Grecia' }, { a: -63, t: 'Roma' }, { a: 70, t: 'Cae el templo' }
        ] },
        estaciones: sucesion },
      { id: 'profecia', grupo: 'Los imperios en la historia bíblica', n: 'Los imperios en la profecía', info: 'La estatua, las bestias, el carnero, los tiempos de los gentiles y el reino eterno', estaciones: profecia },
      { id: 'naciones', grupo: 'Los imperios en la historia bíblica', n: 'Dios y las naciones', info: 'Soberanía, instrumentos y juicio, orgullo, fidelidad y el evangelio a todas las naciones', estaciones: naciones }
    ]
  };
})();
