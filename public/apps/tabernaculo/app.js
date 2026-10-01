/* ==========================================================
   Fuego y Palabra — El tabernáculo (three.js r128)
   Unidad de la escena: 1 = 1 codo (≈ 45 cm).
   Ejes: +x oriente, −x occidente, −z norte, +z sur, +y arriba.
   ========================================================== */
(() => {
  'use strict';

  /* ---------------- Datos ---------------- */
  const STATIONS = [
    {
      id: 'general', num: null, n: 'El atrio', short: 'Vista general',
      ref: 'Éxodo 27:9–19; 38:9–20',
      rows: [
        ['Medidas', '100 × 50 codos (≈ 45 × 22,5 m); cortinas de 5 codos de alto (≈ 2,25 m)'],
        ['Materiales', 'Cortinas de lino torcido; 60 columnas con basas de bronce, y capiteles y molduras de plata'],
        ['Ubicación', 'En medio del campamento, con la entrada al oriente (Nm 2:2)']
      ],
      desc: 'El recinto separaba el espacio sagrado del campamento. Todo el recorrido avanza de oriente a occidente: del altar, a la vista de todo el pueblo, hasta el arca, oculta tras el velo. El modelo usa el codo común de unos 45 cm.',
      view: { t: [-3, 0, 0], p: [70, 60, 84] }, covers: true
    },
    {
      id: 'puerta', num: 1, n: 'Puerta del atrio', ref: 'Éxodo 27:16; 38:18–19',
      rows: [
        ['Medidas', '20 codos de ancho (≈ 9 m) y 5 de alto'],
        ['Materiales', 'Cortina de azul, púrpura, carmesí y lino torcido, obra de recamador; cuatro columnas'],
        ['Ubicación', 'Lado oriental del atrio']
      ],
      desc: 'Era la única entrada al recinto. El texto asigna cuatro columnas a la puerta; cómo se reparten las 60 columnas en las esquinas se resuelve de distintas formas, y aquí se puso una cada 5 codos.',
      view: { t: [50, 3, 0], p: [78, 12, 24] }, ring: [50, 0, 11]
    },
    {
      id: 'altar', num: 2, n: 'Altar del holocausto', ref: 'Éxodo 27:1–8; 38:1–7; Levítico 6:12–13',
      rows: [
        ['Medidas', '5 × 5 codos y 3 de alto (≈ 2,25 × 2,25 × 1,35 m)'],
        ['Materiales', 'Madera de acacia cubierta de bronce, con un enrejado de bronce y un cuerno en cada esquina'],
        ['Ubicación', 'Delante de la entrada de la tienda (Éx 40:6)']
      ],
      desc: 'Lo primero que encontraba quien entraba. Aquí se ofrecían los sacrificios, y el fuego debía mantenerse encendido sin apagarse nunca.',
      view: { t: [20, 2, 0], p: [32, 11, 14] }, ring: [20, 0, 4.6]
    },
    {
      id: 'fuente', num: 3, n: 'Fuente de bronce', ref: 'Éxodo 30:17–21; 38:8; 40:30–32',
      rows: [
        ['Medidas', 'El texto no da medidas; el tamaño del modelo es una estimación'],
        ['Materiales', 'Bronce, con su base de bronce, hecha de los espejos de las mujeres que velaban a la puerta'],
        ['Ubicación', 'Entre la tienda y el altar']
      ],
      desc: 'Aarón y sus hijos se lavaban las manos y los pies antes de entrar en la tienda o de acercarse al altar.',
      view: { t: [5, 1.5, 0], p: [12, 7, 9] }, ring: [5, 0, 2.3]
    },
    {
      id: 'tienda', num: 4, n: 'La tienda de reunión', ref: 'Éxodo 26; 36:8–38',
      rows: [
        ['Medidas', 'Tablas de 10 × 1,5 codos; se reconstruye un interior de 30 × 10 × 10 codos (≈ 13,5 × 4,5 × 4,5 m)'],
        ['Materiales', 'Tablas de acacia cubiertas de oro sobre basas de plata; cuatro cubiertas: lino con querubines, pelo de cabra, pieles de carnero teñidas de rojo y pieles finas por encima'],
        ['Ubicación', 'Mitad occidental del atrio']
      ],
      desc: 'La entrada tenía una cortina de colores sobre cinco columnas doradas. Dentro, el velo dividía el Lugar Santo, de 20 codos, del Lugar Santísimo, un cubo de 10 codos. Esas medidas interiores se deducen del número de tablas; el texto no las da de forma directa. Desactiva las cubiertas para ver el interior.',
      view: { t: [-20, 5, 0], p: [12, 24, 36] }, covers: true
    },
    {
      id: 'candelero', num: 5, n: 'Candelero de oro', ref: 'Éxodo 25:31–40; 26:35; 27:20–21',
      rows: [
        ['Medidas', 'El texto no da medidas; la altura del modelo es una estimación'],
        ['Materiales', 'Un talento de oro puro labrado a martillo, con copas en forma de flor de almendro'],
        ['Ubicación', 'Lugar Santo, lado sur, frente a la mesa']
      ],
      desc: 'Siete lámparas: el tronco central y tres brazos a cada lado. Era la única luz del Lugar Santo, y Aarón y sus hijos la mantenían encendida desde la tarde hasta la mañana.',
      view: { t: [-15, 2, 3.3], p: [-10, 12.5, -4.3] }, covers: false, ring: [-15, 3.3, 1.5]
    },
    {
      id: 'mesa', num: 6, n: 'Mesa de los panes de la proposición', ref: 'Éxodo 25:23–30; 26:35; Levítico 24:5–9',
      rows: [
        ['Medidas', '2 × 1 codo y 1,5 de alto (≈ 90 × 45 × 67 cm)'],
        ['Materiales', 'Acacia cubierta de oro puro, con una moldura y una cornisa de oro'],
        ['Ubicación', 'Lugar Santo, lado norte']
      ],
      desc: 'Sobre ella se ponían doce panes en dos hileras de seis. Se renovaban cada día de reposo, y los panes retirados eran para Aarón y sus hijos.',
      view: { t: [-15, 1.3, -3.3], p: [-10, 12, 4.3] }, covers: false, ring: [-15, -3.3, 1.5]
    },
    {
      id: 'incienso', num: 7, n: 'Altar del incienso', ref: 'Éxodo 30:1–10; 40:26–27',
      rows: [
        ['Medidas', '1 × 1 codo y 2 de alto (≈ 45 × 45 × 90 cm)'],
        ['Materiales', 'Acacia cubierta de oro puro, con cuernos y una cornisa de oro'],
        ['Ubicación', 'Lugar Santo, delante del velo']
      ],
      desc: 'Aarón quemaba incienso aromático sobre él cada mañana y cada tarde. Una vez al año se hacía expiación sobre sus cuernos con la sangre del sacrificio.',
      view: { t: [-23, 1.2, 0], p: [-17, 11, 3.8] }, covers: false, ring: [-23, 0, 1.1]
    },
    {
      id: 'velo', num: 8, n: 'El velo', ref: 'Éxodo 26:31–33; Levítico 16:2; Hebreos 10:19–20',
      rows: [
        ['Medidas', 'Cuelga de cuatro columnas, a 20 codos de la entrada'],
        ['Materiales', 'Azul, púrpura, carmesí y lino torcido, con querubines de obra primorosa; columnas de acacia cubiertas de oro sobre basas de plata'],
        ['Ubicación', 'Entre el Lugar Santo y el Lugar Santísimo']
      ],
      desc: 'Separaba el Lugar Santo del Santísimo. Solo el sumo sacerdote lo cruzaba, una vez al año, en el Día de la Expiación. Los evangelios registran que el velo del templo se rasgó al morir Jesús (Mt 27:51).',
      view: { t: [-25, 5, 0], p: [-11, 10.5, 3.5] }, covers: false, ring: [-25, 0, 5.6]
    },
    {
      id: 'arca', num: 9, n: 'Arca del pacto', ref: 'Éxodo 25:10–22; Hebreos 9:4–5',
      rows: [
        ['Medidas', '2,5 × 1,5 codos y 1,5 de alto (≈ 1,12 × 0,67 × 0,67 m)'],
        ['Materiales', 'Acacia cubierta de oro por dentro y por fuera; propiciatorio y dos querubines de oro puro'],
        ['Ubicación', 'Lugar Santísimo']
      ],
      desc: 'Guardaba el testimonio, las tablas de la ley. Hebreos añade la urna de oro con el maná y la vara de Aarón que reverdeció. Sobre el propiciatorio, entre los querubines, Dios dijo que se reuniría con Moisés.',
      view: { t: [-30, 1.2, 0], p: [-25.6, 8.2, 3.7] }, covers: false, ring: [-30, 0, 2.1]
    },
    {
      id: 'nube', num: null, n: 'La nube y el fuego', short: 'Sobre la tienda',
      ref: 'Éxodo 40:34–38; Números 9:15–23',
      rows: [
        ['De día', 'Una nube cubría el tabernáculo'],
        ['De noche', 'Una apariencia de fuego sobre la tienda'],
        ['Marcha', 'Cuando la nube se alzaba, Israel partía; donde se detenía, acampaba']
      ],
      desc: 'Cambia a la vista de noche para ver la columna de fuego. El modelo la sitúa sobre el Lugar Santísimo como recurso visual; el texto dice que cubría el tabernáculo.',
      view: { t: [-30, 34, 0], p: [42, 26, 88] }, covers: true
    }
  ];
  const BY_ID = Object.fromEntries(STATIONS.map((s, i) => [s.id, i]));

  /* Ceremonias: posiciones [x, z] de los actores en cada paso */
  const V = {
    altarE: { t: [25, 2, 0], p: [42, 12, 16] },
    altarN: { t: [19, 2, -4], p: [31, 11, -17] },
    altarW: { t: [18, 1.5, 0.5], p: [7, 10, 11] },
    altarNW: { t: [18, 2.5, -2], p: [8, 10.5, -10] },
    laver: { t: [5, 1.8, -1.5], p: [14, 8, -11] },
    entrance: { t: [0, 2, 0], p: [14, 11, 13] },
    lamp: { t: [-15, 2, 2.6], p: [-10, 12.5, -4.3] },
    table: { t: [-15, 1.5, -2.6], p: [-10, 12, 4.3] },
    incense: { t: [-22.3, 1.5, 0.4], p: [-15.5, 11, -3.8] },
    veil: { t: [-24, 3, 0.5], p: [-13, 10.5, -3.8] },
    hoh: { t: [-30, 1.2, -0.4], p: [-25.7, 10.8, 4.3] },
    out: { t: [221, 2.2, 0], p: [247, 9, 9] }
  };
  const P_ALTAR = [17.4, -3.8];          // sacerdote junto al altar, lado norte
  const R_ALTAR = [20, 0, 4.6];
  const OUT = [225, 0];                  // fuera del campamento, al oriente
  const CEREMONIES = [
    {
      id: 'holocausto', n: 'Holocausto', ref: 'Levítico 1; 6:8–13',
      steps: [
        { n: 'El oferente trae el animal', ref: 'Levítico 1:3, 10',
          rows: [['Quién', 'El israelita que ofrece'], ['Dónde', 'Ante la puerta del tabernáculo, en el atrio']],
          desc: 'Un macho sin defecto del rebaño, de las ovejas o de las cabras, presentado de su propia voluntad para ser aceptado delante de Jehová.',
          act: { offerer: [29.6, 2.4], lamb: [28, 3.8], priest: [25.5, -1.8] }, view: V.altarE, ring: [29, 3, 2.2] },
        { n: 'Pone la mano sobre la cabeza', ref: 'Levítico 1:4',
          rows: [['Quién', 'El oferente'], ['Dónde', 'Delante de Jehová, junto al animal']],
          desc: 'El oferente apoya su mano sobre la cabeza del animal, y la ofrenda es aceptada a su favor para hacer expiación por él.',
          act: { offerer: [28.9, 2.9], lamb: [28, 3.8], priest: [25.5, -1.8] }, view: V.altarE, ring: [28.5, 3.3, 1.8] },
        { n: 'Degüello al lado norte del altar', ref: 'Levítico 1:5, 11',
          rows: [['Quién', 'El oferente degüella; los sacerdotes rocían'], ['Dónde', 'Lado norte del altar']],
          desc: 'El animal se degüella al lado norte del altar, delante de Jehová, y los sacerdotes rocían su sangre alrededor sobre el altar.',
          act: { offerer: [21.6, -5.8], lamb: [19.6, -5.5], priest: P_ALTAR }, fx: { type: 'blood', at: [18.2, 3.1, -2.4] }, view: V.altarN, ring: [20, -5, 3] },
        { n: 'Se divide y se lava', ref: 'Levítico 1:12–13',
          rows: [['Quién', 'El oferente'], ['Dónde', 'Junto al altar']],
          desc: 'El animal se divide en piezas, con la cabeza y la grosura. Las entrañas y las piernas se lavan con agua.',
          act: { offerer: [21.6, -5.8], lamb: [19.6, -5.5], priest: P_ALTAR }, view: V.altarN, ring: [20, -5, 3] },
        { n: 'Todo arde sobre el altar', ref: 'Levítico 1:13; 6:12–13',
          rows: [['Quién', 'El sacerdote'], ['Dónde', 'Sobre la leña del altar']],
          desc: 'El sacerdote acomoda las piezas sobre la leña y lo hace arder todo. Es ofrenda encendida de olor grato a Jehová. El fuego del altar no debía apagarse nunca.',
          act: { offerer: [23.5, -6.2], priest: P_ALTAR }, fx: { type: 'burn' }, view: V.altarE, ring: R_ALTAR },
        { n: 'Las cenizas salen del campamento', ref: 'Levítico 1:16; 6:10–11',
          rows: [['Quién', 'El sacerdote, con otras vestiduras'], ['Dónde', 'Un lugar limpio fuera del campamento']],
          desc: 'Las cenizas se dejaban junto al altar, al oriente, en el lugar de las cenizas. Después el sacerdote se cambiaba de ropa y las llevaba fuera del campamento. Activa Tribus para ver dónde queda ese punto respecto del campamento.',
          act: { priest: OUT }, view: V.out, ring: [OUT[0], OUT[1], 3] }
      ]
    },
    {
      id: 'diario', n: 'Servicio diario', ref: 'Éxodo 27:20–21; 29:38–42; 30:7–8',
      steps: [
        { n: 'El cordero de la mañana', ref: 'Éxodo 29:38–42',
          rows: [['Quién', 'El sacerdote'], ['Cuándo', 'Cada mañana y cada tarde, todos los días']],
          desc: 'Cada día se ofrecían dos corderos de un año, uno por la mañana y otro a la caída de la tarde, con flor de harina, aceite y vino. Era el holocausto continuo.',
          act: { priest: P_ALTAR, lamb: [19.6, -5.5] }, fx: { type: 'burn' }, view: V.altarN, ring: R_ALTAR },
        { n: 'Lavado en la fuente', ref: 'Éxodo 30:19–21',
          rows: [['Quién', 'El sacerdote'], ['Dónde', 'La fuente de bronce']],
          desc: 'Antes de entrar en la tienda o de acercarse al altar, el sacerdote se lavaba las manos y los pies, para que no muriera.',
          act: { priest: [5, -2.3] }, view: V.laver, ring: [5, 0, 2.3] },
        { n: 'Las lámparas', ref: 'Éxodo 27:20–21; 30:7–8',
          rows: [['Quién', 'Aarón y sus hijos'], ['Cuándo', 'Por la mañana se preparaban; al anochecer se encendían']],
          desc: 'Con aceite puro de olivas machacadas, el sacerdote preparaba las lámparas por la mañana y las encendía al anochecer, para que ardieran desde la tarde hasta la mañana.',
          act: { priest: [-15, 1.9] }, fx: { type: 'lamps' }, covers: false, view: V.lamp, ring: [-15, 3.3, 1.5] },
        { n: 'El incienso de la mañana', ref: 'Éxodo 30:7–8, 34–38',
          rows: [['Quién', 'Aarón'], ['Dónde', 'El altar de oro, delante del velo']],
          desc: 'Mientras preparaba las lámparas, quemaba incienso aromático en el altar de oro. La mezcla era santa y nadie podía hacerla para uso propio.',
          act: { priest: [-21.7, 0.2] }, fx: { type: 'incense', at: [-23, 2.2, 0] }, covers: false, view: V.incense, ring: [-23, 0, 1.1] },
        { n: 'El pan de la proposición', ref: 'Levítico 24:5–9',
          rows: [['Quién', 'El sacerdote'], ['Cuándo', 'Cada día de reposo']],
          desc: 'No era diario: cada día de reposo se ponían doce panes nuevos sobre la mesa. Los retirados los comían Aarón y sus hijos en lugar santo.',
          act: { priest: [-15, -1.9] }, covers: false, view: V.table, ring: [-15, -3.3, 1.5] },
        { n: 'La ofrenda de la tarde', ref: 'Éxodo 29:41; 30:8',
          rows: [['Quién', 'El sacerdote'], ['Cuándo', 'A la caída de la tarde']],
          desc: 'Al atardecer se repetía el holocausto con el segundo cordero, y al encender las lámparas se volvía a quemar incienso. Así el día quedaba enmarcado por la ofrenda continua.',
          act: { priest: P_ALTAR, lamb: [19.6, -5.5] }, fx: { type: 'burn' }, view: V.altarN, ring: R_ALTAR }
      ]
    },
    {
      id: 'pecado', n: 'Ofrenda por el pecado', ref: 'Levítico 4:1–12',
      intro: 'Caso del sacerdote ungido',
      steps: [
        { n: 'El becerro a la puerta', ref: 'Levítico 4:3–4',
          rows: [['Quién', 'El sacerdote ungido'], ['Dónde', 'A la puerta del tabernáculo']],
          desc: 'Si el sacerdote ungido pecaba y hacía culpable al pueblo, traía un becerro sin defecto, ponía la mano sobre su cabeza y lo degollaba delante de Jehová.',
          act: { priest: [2, 0.8], bull: [0.2, -2.6] }, view: V.entrance, ring: [0.5, -1, 3] },
        { n: 'Siete veces delante del velo', ref: 'Levítico 4:5–6',
          rows: [['Quién', 'El sacerdote ungido'], ['Dónde', 'Lugar Santo, frente al velo']],
          desc: 'Llevaba parte de la sangre dentro de la tienda, mojaba el dedo en ella y la rociaba siete veces delante de Jehová, frente al velo del santuario.',
          act: { priest: [-22.1, 2.2] }, fx: { type: 'blood', at: [-24.4, 1.6, 1.3] }, covers: false, view: V.veil, ring: [-25, 0, 5.6] },
        { n: 'Los cuernos del altar del incienso', ref: 'Levítico 4:7',
          rows: [['Quién', 'El sacerdote ungido'], ['Dónde', 'Altar del incienso']],
          desc: 'Ponía de la sangre sobre los cuernos del altar del incienso aromático, que está en el tabernáculo delante de Jehová.',
          act: { priest: [-21.7, 0.9] }, fx: { type: 'blood', at: [-23, 2.15, 0] }, covers: false, view: V.incense, ring: [-23, 0, 1.1] },
        { n: 'La sangre al pie del altar', ref: 'Levítico 4:7',
          rows: [['Quién', 'El sacerdote ungido'], ['Dónde', 'Base del altar del holocausto']],
          desc: 'El resto de la sangre lo derramaba al pie del altar del holocausto, que está a la puerta del tabernáculo.',
          act: { priest: [16.4, 1.4] }, fx: { type: 'blood', at: [17.4, 0.6, 1.0] }, view: V.altarW, ring: [17.5, 1, 1.6] },
        { n: 'La grosura sobre el altar', ref: 'Levítico 4:8–10',
          rows: [['Quién', 'El sacerdote ungido'], ['Dónde', 'Sobre el altar del holocausto']],
          desc: 'Separaba toda la grosura, los dos riñones y la grosura del hígado, y los hacía arder sobre el altar del holocausto.',
          act: { priest: P_ALTAR }, fx: { type: 'burn' }, view: V.altarN, ring: R_ALTAR },
        { n: 'El resto, fuera del campamento', ref: 'Levítico 4:11–12; Hebreos 13:11–12',
          rows: [['Quién', 'El sacerdote'], ['Dónde', 'Donde se echan las cenizas, fuera del campamento']],
          desc: 'La piel, la carne, la cabeza, las piernas y las entrañas se sacaban fuera del campamento, a un lugar limpio, y se quemaban al fuego sobre la leña. Hebreos toma esta imagen para hablar de Jesús, que padeció fuera de la puerta.',
          act: { priest: OUT }, fx: { type: 'fire', at: [OUT[0] + 3, 0.2, 0] }, view: V.out, ring: [OUT[0] + 1.5, 0, 3.5] }
      ]
    },
    {
      id: 'expiacion', n: 'Día de la Expiación', ref: 'Levítico 16',
      steps: [
        { n: 'Aarón se lava y se viste de lino', ref: 'Levítico 16:3–4, 29',
          rows: [['Quién', 'El sumo sacerdote'], ['Cuándo', 'Una vez al año, el día diez del mes séptimo']],
          desc: 'Aarón lavaba su cuerpo con agua y se vestía con la túnica, los calzoncillos, el cinto y la mitra de lino. Ese día dejaba a un lado las vestiduras de color y oro.',
          act: { priest: [5, -2.3] }, view: V.laver, ring: [5, 0, 2.3] },
        { n: 'El becerro por sí y por su casa', ref: 'Levítico 16:6, 11',
          rows: [['Quién', 'Aarón'], ['Dónde', 'Junto al altar']],
          desc: 'Primero ofrecía un becerro como expiación por él mismo y por su familia, y lo degollaba.',
          act: { priest: P_ALTAR, bull: [20.4, -6.2] }, view: V.altarN, ring: [20, -5.5, 3] },
        { n: 'Los dos machos cabríos', ref: 'Levítico 16:7–10',
          rows: [['Quién', 'Aarón'], ['Dónde', 'A la puerta del tabernáculo']],
          desc: 'Presentaba dos machos cabríos delante de Jehová y echaba suertes sobre ellos: uno para Jehová y otro para Azazel, que sería enviado vivo al desierto.',
          act: { priest: [2.2, 0], goatA: [-0.6, 2], goatB: [-0.6, -2] }, view: V.entrance, ring: [0, 0, 3.2] },
        { n: 'Incienso detrás del velo', ref: 'Levítico 16:12–13',
          rows: [['Quién', 'Aarón, solo'], ['Dónde', 'Lugar Santísimo']],
          desc: 'Tomaba un incensario lleno de brasas del altar y dos puñados de incienso, entraba detrás del velo y ponía el incienso sobre el fuego, para que la nube cubriera el propiciatorio.',
          act: { priest: [-27.3, -0.2], goatA: [-0.6, 2], goatB: [-0.6, -2] }, fx: { type: 'incense', at: [-29.4, 1.9, 0], big: true }, covers: false, view: V.hoh, ring: [-30, 0, 2.1] },
        { n: 'Sangre sobre el propiciatorio', ref: 'Levítico 16:14–15',
          rows: [['Quién', 'Aarón'], ['Dónde', 'Lugar Santísimo']],
          desc: 'Rociaba con el dedo la sangre del becerro sobre el propiciatorio y siete veces delante de él. Luego degollaba el macho cabrío de Jehová y hacía lo mismo con su sangre.',
          act: { priest: [-27.3, -0.2], goatB: [-0.6, -2] }, fx: { type: 'blood', at: [-30, 1.8, 0] }, covers: false, view: V.hoh, ring: [-30, 0, 2.1] },
        { n: 'Purificación del altar', ref: 'Levítico 16:16–19',
          rows: [['Quién', 'Aarón'], ['Dónde', 'Santuario, tienda y altar']],
          desc: 'Hacía expiación por el santuario y por la tienda. Después salía al altar, ponía de la sangre sobre sus cuernos y la rociaba siete veces para limpiarlo.',
          act: { priest: [16.4, -3.3], goatB: [-0.6, -2] }, fx: { type: 'blood', at: [17.8, 3.3, -2.3] }, view: V.altarNW, ring: [17.75, -2.25, 1.4] },
        { n: 'Las manos sobre el macho cabrío vivo', ref: 'Levítico 16:20–21',
          rows: [['Quién', 'Aarón'], ['Qué', 'Confiesa las iniquidades del pueblo']],
          desc: 'Aarón ponía ambas manos sobre la cabeza del macho cabrío vivo y confesaba sobre él todas las iniquidades, rebeliones y pecados de los hijos de Israel.',
          act: { priest: [28.6, 0.2], goatB: [30.4, 0.6] }, view: V.altarE, ring: [29.5, 0.4, 2.2] },
        { n: 'Enviado al desierto', ref: 'Levítico 16:21–22',
          rows: [['Quién', 'Un hombre designado'], ['Dónde', 'Tierra inhabitada']],
          desc: 'Un hombre designado llevaba el macho cabrío al desierto, y el animal cargaba sobre sí las iniquidades del pueblo hacia una tierra inhabitada.',
          act: { priest: [28.6, 0.2], offerer: [OUT[0] - 2, 1.6], goatB: [OUT[0], 0] }, view: V.out, ring: [OUT[0] - 1, 0.6, 3] }
      ]
    }
  ];
  const CER_BY_ID = Object.fromEntries(CEREMONIES.map(c => [c.id, c]));

  const CAMP_INFO = {
    n: 'El campamento de Israel', ref: 'Números 2; 3:21–39',
    rows: [
      ['Oriente', 'Judá, Isacar y Zabulón: 186.400 (Nm 2:9)'],
      ['Sur', 'Rubén, Simeón y Gad: 151.450 (Nm 2:16)'],
      ['Occidente', 'Efraín, Manasés y Benjamín: 108.100 (Nm 2:24)'],
      ['Norte', 'Dan, Aser y Neftalí: 157.600 (Nm 2:31)'],
      ['Levitas', 'Moisés y los sacerdotes al oriente; coatitas al sur, gersonitas al occidente y meraritas al norte']
    ],
    desc: 'Cada tribu acampaba junto a su bandera, alrededor del tabernáculo y a cierta distancia (Nm 2:2), con los levitas entre el pueblo y el santuario (Nm 1:53). Las cifras de las tribus son varones de veinte años arriba; las de los levitas, varones desde un mes. El texto no da distancias ni el orden dentro de cada lado: la disposición es solo referencial.',
    view: { t: [0, 0, 0], p: [205, 470, 345] }
  };

  /* ---------------- Arranque ---------------- */
  const stage = document.getElementById('stage');
  const canvas = document.getElementById('scene');
  if (!window.THREE || !THREE.OrbitControls) {
    document.getElementById('fallback').hidden = false;
    return;
  }
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2500);
  camera.position.set(170, 130, 200);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.485;
  controls.minDistance = 3;
  controls.maxDistance = 700;
  controls.target.set(-3, 0, 0);

  /* Mapa de entorno sencillo para que los metales reflejen algo */
  (function buildEnv() {
    const env = new THREE.Scene();
    const geo = new THREE.SphereGeometry(50, 32, 16);
    const pos = geo.attributes.position;
    const top = new THREE.Color(0xf4efe4), mid = new THREE.Color(0xd9ccb2), bot = new THREE.Color(0x6a5a46);
    const cols = [];
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 50;
      const c = y > 0 ? mid.clone().lerp(top, y) : mid.clone().lerp(bot, -y);
      cols.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    env.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
    const sunBall = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 8), new THREE.MeshBasicMaterial({ color: 0xfff6e6 }));
    sunBall.position.set(22, 34, 16);
    env.add(sunBall);
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(env, 0.04).texture;
    pm.dispose();
  })();

  /* ---------------- Texturas ---------------- */
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  function canvasTexture(w, h, draw) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = maxAniso;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }
  function weave(g, w, h, a) {
    for (let y = 0; y < h; y += 2) { g.fillStyle = `rgba(0,0,0,${Math.random() * a})`; g.fillRect(0, y, w, 1); }
    for (let x = 0; x < w; x += 2) { g.fillStyle = `rgba(255,255,255,${Math.random() * a})`; g.fillRect(x, 0, 1, h); }
  }
  function folds(g, w, h, n, a) {
    for (let i = 0; i < n; i++) {
      const x0 = (i / n) * w, gw = w / n;
      const gr = g.createLinearGradient(x0, 0, x0 + gw, 0);
      gr.addColorStop(0, `rgba(0,0,0,0)`);
      gr.addColorStop(0.5, `rgba(0,0,0,${a})`);
      gr.addColorStop(1, `rgba(0,0,0,0)`);
      g.fillStyle = gr; g.fillRect(x0, 0, gw, h);
    }
  }

  const linenTex = canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = '#efe9dc'; g.fillRect(0, 0, w, h);
    weave(g, w, h, 0.06); folds(g, w, h, 5, 0.07);
  });

  const COLORS = ['#2c4a8a', '#6a2c6c', '#a4282b', '#efe9dc'];
  const screenTex = canvasTexture(256, 256, (g, w, h) => {
    const bw = w / 8;
    for (let i = 0; i < 8; i++) { g.fillStyle = COLORS[i % 4]; g.fillRect(i * bw, 0, bw + 1, h); }
    weave(g, w, h, 0.08); folds(g, w, h, 4, 0.12);
  });

  const veilTex = canvasTexture(512, 512, (g, w, h) => {
    g.fillStyle = '#26407a'; g.fillRect(0, 0, w, h);
    const band = (y, hh) => {
      g.fillStyle = '#6a2c6c'; g.fillRect(0, y, w, hh);
      g.fillStyle = '#a4282b'; g.fillRect(0, y + hh * 0.35, w, hh * 0.3);
    };
    band(0, 34); band(h - 34, 34);
    g.strokeStyle = '#d1aa52'; g.fillStyle = '#d1aa52'; g.lineWidth = 3; g.lineCap = 'round';
    const figure = (cx, cy, s, flip) => {
      g.save(); g.translate(cx, cy); g.scale(flip ? -s : s, s);
      g.beginPath(); g.arc(0, -46, 8, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.moveTo(0, -36); g.lineTo(0, 30); g.stroke();
      for (let k = 0; k < 3; k++) {
        g.beginPath(); g.moveTo(0, -28 + k * 6);
        g.quadraticCurveTo(28 + k * 6, -70 + k * 8, 58 - k * 4, -40 + k * 14); g.stroke();
      }
      g.beginPath(); g.moveTo(0, -24); g.quadraticCurveTo(-26, -40, -34, -18); g.stroke();
      g.restore();
    };
    for (let r = 0; r < 2; r++) {
      const cy = 170 + r * 210;
      figure(w * 0.25 - 20, cy, 1.25, false); figure(w * 0.25 + 20, cy, 1.25, true);
      figure(w * 0.75 - 20, cy, 1.25, false); figure(w * 0.75 + 20, cy, 1.25, true);
    }
    weave(g, w, h, 0.08); folds(g, w, h, 4, 0.14);
  });

  const sandTex = canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = '#d6c6a4'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) {
      const v = Math.random();
      g.fillStyle = v > 0.5 ? `rgba(255,250,235,${Math.random() * 0.25})` : `rgba(90,70,40,${Math.random() * 0.18})`;
      g.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
  });
  sandTex.repeat.set(90, 90);

  const puffTex = canvasTexture(128, 128, (g, w, h) => {
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.45, 'rgba(255,255,255,0.5)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  });
  puffTex.wrapS = puffTex.wrapT = THREE.ClampToEdgeWrapping;

  /* ---------------- Materiales ---------------- */
  const stdMats = [];
  function std(o) { const m = new THREE.MeshStandardMaterial(o); stdMats.push(m); return m; }
  const M = {
    gold: std({ color: 0xd6ad4b, metalness: 0.9, roughness: 0.36 }),
    bronze: std({ color: 0xa2683a, metalness: 0.85, roughness: 0.42 }),
    bronzeDS: std({ color: 0xa2683a, metalness: 0.85, roughness: 0.42, side: THREE.DoubleSide }),
    bronzeDark: std({ color: 0x5e3b20, metalness: 0.7, roughness: 0.6 }),
    silver: std({ color: 0xdfe3e8, metalness: 0.95, roughness: 0.25 }),
    wood: std({ color: 0x8a6844, metalness: 0, roughness: 0.85 }),
    skin: std({ color: 0x5b4c3e, metalness: 0, roughness: 1 }),
    ram: std({ color: 0x8e2f26, metalness: 0, roughness: 0.9 }),
    goat: std({ color: 0x3d3531, metalness: 0, roughness: 1 }),
    bread: std({ color: 0xd9ab6c, metalness: 0, roughness: 0.9 }),
    ash: std({ color: 0x2b2522, metalness: 0, roughness: 1 }),
    water: std({ color: 0x9fb8c4, metalness: 0.3, roughness: 0.05, transparent: true, opacity: 0.85 }),
    mount: std({ color: 0xc4ab82, metalness: 0, roughness: 1, flatShading: true }),
    ground: std({ map: sandTex, color: 0xcbc4b8, metalness: 0, roughness: 1 })
  };
  function fabric(tex, rx, ry) {
    const t = tex.clone(); t.needsUpdate = true; t.repeat.set(rx, ry);
    return std({ map: t, metalness: 0, roughness: 0.95, side: THREE.DoubleSide });
  }

  /* ---------------- Ayudas ---------------- */
  function add(obj, parent) { (parent || scene).add(obj); return obj; }
  function mesh(geo, mat, x, y, z, parent) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    m.castShadow = true; m.receiveShadow = true;
    return add(m, parent);
  }
  const box = (w, h, d, mat, x, y, z, p) => mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, p);
  const cyl = (rt, rb, h, mat, x, y, z, p, seg) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 20), mat, x, y, z, p);
  const pickables = [];
  function group(id, x, y, z) {
    const g = new THREE.Group();
    g.position.set(x || 0, y || 0, z || 0);
    g.userData.station = id;
    pickables.push(g);
    return add(g);
  }

  /* ---------------- Terreno y horizonte ---------------- */
  const ground = mesh(new THREE.PlaneGeometry(1600, 1600), M.ground, 0, 0, 0);
  ground.rotation.x = -Math.PI / 2; ground.castShadow = false;

  (function mountains() {
    const rnd = mulberry(7);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 + rnd() * 0.3;
      const d = 430 + rnd() * 110;
      const big = i === 3 || i === 4;
      const h = big ? 110 + rnd() * 30 : 35 + rnd() * 55;
      const r = big ? 120 : 60 + rnd() * 70;
      const m = mesh(new THREE.ConeGeometry(r, h, 6), M.mount, Math.cos(a) * d, h / 2 - 3, Math.sin(a) * d);
      m.rotation.y = rnd() * Math.PI; m.castShadow = false;
    }
  })();

  const stars = (function () {
    const rnd = mulberry(11), pts = [];
    for (let i = 0; i < 900; i++) {
      const th = rnd() * Math.PI * 2, ph = Math.acos(0.08 + rnd() * 0.92);
      pts.push(Math.sin(ph) * Math.cos(th) * 1000, Math.cos(ph) * 1000, Math.sin(ph) * Math.sin(th) * 1000);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.8 })));
  })();

  function mulberry(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------------- Atrio ---------------- */
  const court = group('general');
  const gate = group('puerta');

  function curtain(len, tex, parent, x, z, rotY) {
    const m = mesh(new THREE.PlaneGeometry(len, 5), fabric(tex, len / 5, 1), x, 2.5, z, parent);
    m.rotation.y = rotY;
    return m;
  }
  curtain(100, linenTex, court, 0, -25, 0);
  curtain(100, linenTex, court, 0, 25, 0);
  curtain(50, linenTex, court, -50, 0, Math.PI / 2);
  curtain(15, linenTex, court, 50, -17.5, Math.PI / 2);
  curtain(15, linenTex, court, 50, 17.5, Math.PI / 2);
  curtain(20, screenTex, gate, 50, 0, Math.PI / 2);

  const postGeo = new THREE.CylinderGeometry(0.22, 0.24, 5, 12);
  const baseGeo = new THREE.BoxGeometry(0.7, 0.45, 0.7);
  const capGeo = new THREE.CylinderGeometry(0.3, 0.26, 0.35, 12);
  const ropePts = [];
  const posts = [];
  for (let x = -50; x <= 50; x += 5) { posts.push([x, -25]); posts.push([x, 25]); }
  for (let z = -20; z <= 20; z += 5) { posts.push([-50, z]); posts.push([50, z]); }
  posts.forEach(([x, z]) => {
    const parent = (x === 50 && Math.abs(z) <= 10) ? gate : court;
    mesh(postGeo, M.wood, x, 2.5, z, parent);
    mesh(baseGeo, M.bronze, x, 0.22, z, parent);
    mesh(capGeo, M.silver, x, 5.05, z, parent);
    const ox = Math.abs(x) === 50 ? Math.sign(x) : 0;
    const oz = Math.abs(z) === 25 ? Math.sign(z) : 0;
    const len = Math.hypot(ox, oz) || 1;
    ropePts.push(x, 4.9, z, x + (ox / len) * 3, 0.02, z + (oz / len) * 3);
  });
  (function ropes() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(ropePts, 3));
    court.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x8f7f66 })));
  })();

  /* ---------------- Tienda ---------------- */
  const tent = group('tienda');
  const boardGeo = new THREE.BoxGeometry(1.46, 10, 0.5);
  const sockGeo = new THREE.BoxGeometry(0.68, 0.4, 0.6);
  for (let i = 0; i < 20; i++) {
    const x = -35 + 0.75 + 1.5 * i;
    [-1, 1].forEach(s => {
      mesh(boardGeo, M.gold, x, 5.4, s * 5.25, tent);
      mesh(sockGeo, M.silver, x - 0.37, 0.2, s * 5.25, tent);
      mesh(sockGeo, M.silver, x + 0.37, 0.2, s * 5.25, tent);
    });
  }
  {
    const n = 7, w = 11 / n;
    for (let j = 0; j < n; j++) {
      const z = -5.5 + w / 2 + w * j;
      box(0.5, 10, w - 0.04, M.gold, -35.25, 5.4, z, tent);
      box(0.6, 0.4, w * 0.45, M.silver, -35.25, 0.2, z - w * 0.24, tent);
      box(0.6, 0.4, w * 0.45, M.silver, -35.25, 0.2, z + w * 0.24, tent);
    }
  }
  [2.2, 5.4, 8.6].forEach(h => {
    [-1, 1].forEach(s => { cyl(0.09, 0.09, 30, M.gold, -20, h, s * 5.58, tent, 8).rotation.z = Math.PI / 2; });
    cyl(0.09, 0.09, 11, M.gold, -35.58, h, 0, tent, 8).rotation.x = Math.PI / 2;
  });
  [-4.6, -2.3, 0, 2.3, 4.6].forEach(z => {
    cyl(0.22, 0.22, 10, M.gold, -5, 5.4, z, tent, 14);
    box(0.6, 0.4, 0.6, M.bronze, -5, 0.2, z, tent);
  });
  mesh(new THREE.PlaneGeometry(10, 10), fabric(screenTex, 2, 1), -4.85, 5.4, 0, tent).rotation.y = Math.PI / 2;

  const covers = new THREE.Group();
  tent.add(covers);
  box(31.6, 0.3, 12.3, M.skin, -20.2, 10.6, 0, covers);
  [-1, 1].forEach(s => {
    box(31.6, 9.4, 0.2, M.skin, -20.2, 5.9, s * 6.1, covers);
    box(31.7, 0.5, 0.22, M.ram, -20.2, 1.0, s * 6.12, covers);
  });
  box(0.2, 9.4, 12.3, M.skin, -36.05, 5.9, 0, covers);
  box(0.22, 0.5, 12.4, M.ram, -36.07, 1.0, 0, covers);
  box(0.25, 1.2, 12.3, M.goat, -4.45, 10.1, 0, covers);

  /* ---------------- Velo ---------------- */
  const veil = group('velo');
  [-3.75, -1.25, 1.25, 3.75].forEach(z => {
    cyl(0.2, 0.2, 10, M.gold, -25, 5.4, z, veil, 14);
    box(0.6, 0.4, 0.6, M.silver, -25, 0.2, z, veil);
  });
  mesh(new THREE.PlaneGeometry(10, 10), fabric(veilTex, 1, 1), -24.8, 5.4, 0, veil).rotation.y = Math.PI / 2;

  /* ---------------- Altar de bronce ---------------- */
  const altar = group('altar', 20, 0, 0);
  box(5, 3, 5, M.bronze, 0, 1.5, 0, altar);
  box(5.14, 0.4, 5.14, M.bronzeDark, 0, 1.5, 0, altar);
  box(4.4, 0.1, 4.4, M.ash, 0, 3.02, 0, altar);
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => mesh(new THREE.ConeGeometry(0.28, 0.6, 8), M.bronze, a * 2.25, 3.3, b * 2.25, altar));
  [-1, 1].forEach(s => { cyl(0.12, 0.12, 8, M.bronze, 0, 1.5, s * 2.75, altar, 8).rotation.z = Math.PI / 2; });

  /* ---------------- Fuente ---------------- */
  const laver = group('fuente', 5, 0, 0);
  cyl(1.0, 1.2, 0.35, M.bronze, 0, 0.18, 0, laver, 32);
  cyl(0.28, 0.42, 1.3, M.bronze, 0, 1.0, 0, laver, 24);
  cyl(0.95, 0.95, 0.06, M.bronze, 0, 1.65, 0, laver, 32);
  mesh(new THREE.CylinderGeometry(1.5, 0.95, 0.75, 40, 1, true), M.bronzeDS, 0, 2.0, 0, laver);
  mesh(new THREE.CircleGeometry(1.42, 40), M.water, 0, 2.22, 0, laver).rotation.x = -Math.PI / 2;

  /* ---------------- Candelero (lado sur) ---------------- */
  const lamp = group('candelero', -15, 0, 3.3);
  cyl(0.35, 0.5, 0.2, M.gold, 0, 0.1, 0, lamp, 24);
  cyl(0.06, 0.07, 2.45, M.gold, 0, 1.4, 0, lamp, 12);
  [0.9, 1.5, 2.05, 2.4].forEach(y => mesh(new THREE.SphereGeometry(0.1, 12, 8), M.gold, 0, y, 0, lamp));
  const lampXs = [0];
  [0.35, 0.7, 1.05].forEach(r => {
    mesh(new THREE.TorusGeometry(r, 0.045, 8, 36, Math.PI), M.gold, 0, 2.62, 0, lamp).rotation.z = Math.PI;
    lampXs.push(-r, r);
  });
  lampXs.forEach(x => cyl(0.09, 0.05, 0.12, M.gold, x, 2.68, 0, lamp, 12));

  /* ---------------- Mesa (lado norte) ---------------- */
  const table = group('mesa', -15, 0, -3.3);
  box(2, 0.08, 1, M.gold, 0, 1.46, 0, table);
  box(2, 0.08, 0.04, M.gold, 0, 1.54, 0.48, table);
  box(2, 0.08, 0.04, M.gold, 0, 1.54, -0.48, table);
  box(0.04, 0.08, 1, M.gold, 0.98, 1.54, 0, table);
  box(0.04, 0.08, 1, M.gold, -0.98, 1.54, 0, table);
  box(1.86, 0.12, 0.86, M.gold, 0, 1.3, 0, table);
  [[-0.9, -0.4], [-0.9, 0.4], [0.9, -0.4], [0.9, 0.4]].forEach(([x, z]) => cyl(0.05, 0.05, 1.42, M.gold, x, 0.71, z, table, 10));
  const loafGeo = new THREE.CylinderGeometry(0.32, 0.34, 0.1, 22);
  [-0.5, 0.5].forEach(x => { for (let k = 0; k < 6; k++) mesh(loafGeo, M.bread, x, 1.56 + k * 0.105, 0, table).scale.set(1, 1, 0.8); });

  /* ---------------- Altar del incienso ---------------- */
  const incense = group('incienso', -23, 0, 0);
  box(1, 2, 1, M.gold, 0, 1, 0, incense);
  box(1.08, 0.08, 1.08, M.gold, 0, 1.96, 0, incense);
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => mesh(new THREE.ConeGeometry(0.08, 0.22, 6), M.gold, a * 0.42, 2.11, b * 0.42, incense));

  /* ---------------- Arca ---------------- */
  const ark = group('arca', -30, 0, 0);
  box(2.5, 1.5, 1.5, M.gold, 0, 0.8, 0, ark);
  box(2.56, 0.12, 1.56, M.gold, 0, 1.5, 0, ark);
  box(2.5, 0.1, 1.5, M.gold, 0, 1.6, 0, ark);
  [-1, 1].forEach(s => { cyl(0.07, 0.07, 5.2, M.gold, 0, 0.35, s * 0.86, ark, 10).rotation.z = Math.PI / 2; });
  [[-1.05, -0.8], [-1.05, 0.8], [1.05, -0.8], [1.05, 0.8]].forEach(([x, z]) => {
    mesh(new THREE.TorusGeometry(0.1, 0.025, 6, 14), M.gold, x, 0.35, z, ark).rotation.y = Math.PI / 2;
  });
  function cherub(x, facePlusX) {
    const c = new THREE.Group();
    c.position.set(x, 1.65, 0);
    c.rotation.y = facePlusX ? 0 : Math.PI;
    ark.add(c);
    cyl(0.1, 0.17, 0.55, M.gold, 0, 0.28, 0, c, 14);
    mesh(new THREE.SphereGeometry(0.11, 14, 10), M.gold, 0.05, 0.64, 0, c);
    [-1, 1].forEach(s => {
      const pivot = new THREE.Group();
      pivot.position.set(0, 0.5, s * 0.13);
      pivot.rotation.set(-s * 0.35, 0, 0.72);
      c.add(pivot);
      box(1.0, 0.04, 0.34, M.gold, 0.5, 0, 0, pivot);
    });
  }
  cherub(-0.95, true);
  cherub(0.95, false);

  /* ---------------- Nube / fuego ---------------- */
  const cloudHit = mesh(new THREE.CylinderGeometry(5, 5, 55, 12), new THREE.MeshBasicMaterial({ visible: false }), -30, 46, 0);
  cloudHit.castShadow = cloudHit.receiveShadow = false;
  cloudHit.userData.station = 'nube';
  pickables.push(cloudHit);

  const rnd = mulberry(3);
  const column = [];
  for (let i = 0; i < 150; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, opacity: 0 }));
    s.userData = { a: rnd() * Math.PI * 2, r: rnd(), y: rnd(), spd: 0.5 + rnd(), size: rnd(), shade: rnd() };
    column.push(add(s));
  }
  function makeFlames(n, parent) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffb04a }));
      s.userData = { a: rnd() * Math.PI * 2, r: rnd(), y: rnd(), spd: 0.6 + rnd() };
      arr.push(add(s, parent));
    }
    return arr;
  }
  const altarFire = makeFlames(34, altar);
  const lampFlames = lampXs.map(x => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffcf70 }));
    s.position.set(x, 2.86, 0); s.scale.setScalar(0.3);
    s.userData.ph = rnd() * 10;
    return add(s, lamp);
  });
  const ember = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xff8a3a }));
  ember.position.set(0, 2.12, 0); ember.scale.setScalar(0.5);
  add(ember, incense);

  /* ---------------- Etiquetas (sprites de texto) ---------------- */
  const labels = [];
  function cssVar(name, fb) { return getComputedStyle(root).getPropertyValue(name).trim() || fb; }
  function drawLabel(L) {
    const ink = cssVar('--ink', '#1f2430'), bg = cssVar('--bg', '#fafaf8'), line = cssVar('--line', '#e4e4df'), muted = cssVar('--muted', '#6b7080');
    const c = L.canvas, g = c.getContext('2d');
    const fs = 44, fs2 = 32, pad = 22, gap = 8, dot = L.dot ? 34 : 0;
    const font1 = `500 ${fs}px Inter, system-ui, sans-serif`, font2 = `500 ${fs2}px Inter, system-ui, sans-serif`;
    g.font = font1; const w1 = g.measureText(L.text).width;
    g.font = font2; const w2 = L.sub ? g.measureText(L.sub).width : 0;
    const W = Math.ceil(Math.max(w1 + dot, w2) + pad * 2), H = Math.ceil(L.sub ? fs + fs2 + gap + pad * 2 : fs + pad * 2);
    c.width = W; c.height = H;
    const r = 16;
    g.beginPath();
    g.moveTo(r, 1); g.lineTo(W - r, 1); g.quadraticCurveTo(W - 1, 1, W - 1, r);
    g.lineTo(W - 1, H - r); g.quadraticCurveTo(W - 1, H - 1, W - r, H - 1);
    g.lineTo(r, H - 1); g.quadraticCurveTo(1, H - 1, 1, H - r);
    g.lineTo(1, r); g.quadraticCurveTo(1, 1, r, 1); g.closePath();
    g.globalAlpha = 0.93; g.fillStyle = bg; g.fill();
    g.globalAlpha = 1; g.lineWidth = 2; g.strokeStyle = line; g.stroke();
    if (L.dot) { g.fillStyle = L.dot; g.beginPath(); g.arc(pad + 11, pad + fs * 0.55, 11, 0, Math.PI * 2); g.fill(); }
    g.textBaseline = 'top';
    g.font = font1; g.fillStyle = ink; g.fillText(L.text, pad + dot, pad + 2);
    if (L.sub) { g.font = font2; g.fillStyle = muted; g.fillText(L.sub, pad, pad + fs + gap); }
    L.tex.needsUpdate = true;
    L.sprite.scale.set(L.h * W / H, L.h, 1);
  }
  function label(text, sub, h, x, y, z, parent, dot) {
    const canvas = document.createElement('canvas');
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false, transparent: true, fog: false }));
    sprite.renderOrder = 20;
    sprite.center.set(0.5, 0);
    sprite.position.set(x, y, z);
    (parent || scene).add(sprite);
    const L = { canvas, tex, sprite, text, sub, h, dot };
    labels.push(L); drawLabel(L);
    return L;
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => labels.forEach(drawLabel));

  /* ---------------- Personas y animales ---------------- */
  const skinMat = std({ color: 0xb98a64, metalness: 0, roughness: 0.8 });
  function person(robe, sash, turban, parent) {
    const g = new THREE.Group();
    const robeMat = std({ color: robe, metalness: 0, roughness: 0.9 });
    mesh(new THREE.CylinderGeometry(0.3, 0.5, 3.0, 16), robeMat, 0, 1.5, 0, g);
    mesh(new THREE.SphereGeometry(0.34, 16, 10), robeMat, 0, 3.0, 0, g).scale.set(1, 0.5, 1);
    mesh(new THREE.SphereGeometry(0.3, 16, 12), skinMat, 0, 3.42, 0, g);
    if (sash) mesh(new THREE.CylinderGeometry(0.37, 0.39, 0.2, 16), std({ color: sash, metalness: 0, roughness: 0.9 }), 0, 2.15, 0, g);
    if (turban) mesh(new THREE.CylinderGeometry(0.27, 0.31, 0.3, 16), std({ color: 0xf1ede4, metalness: 0, roughness: 0.9 }), 0, 3.66, 0, g);
    return add(g, parent);
  }
  function animal(kind) {
    const S = {
      bull: { L: 2.6, H: 1.3, W: 1.0, leg: 1.3, col: 0x6b4a32, horns: true },
      lamb: { L: 1.1, H: 0.6, W: 0.55, leg: 0.6, col: 0xe8e2d4 },
      goat: { L: 1.2, H: 0.6, W: 0.5, leg: 0.75, col: 0x4a3f38, horns: true }
    }[kind];
    const g = new THREE.Group();
    const mat = std({ color: S.col, metalness: 0, roughness: 1 });
    box(S.L, S.H, S.W, mat, 0, S.leg + S.H / 2, 0, g);
    box(S.H * 0.75, S.H * 0.6, S.W * 0.6, mat, S.L / 2 + S.H * 0.3, S.leg + S.H * 0.95, 0, g);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => cyl(S.W * 0.1, S.W * 0.08, S.leg, mat, a * S.L * 0.38, S.leg / 2, b * S.W * 0.32, g, 8));
    if (S.horns) [-1, 1].forEach(b => {
      const h = mesh(new THREE.ConeGeometry(S.W * 0.07, S.H * 0.45, 6), M.ash, S.L / 2 + S.H * 0.25, S.leg + S.H * 1.35, b * S.W * 0.22, g);
      h.rotation.x = b * 0.5;
    });
    return add(g);
  }

  /* ---------------- Escala ---------------- */
  const scaleGroup = new THREE.Group();
  scaleGroup.visible = false;
  add(scaleGroup);
  const dimMat = new THREE.LineBasicMaterial({ color: 0x9e2b25 });
  const rulerA = new THREE.MeshBasicMaterial({ color: 0x9e2b25 });
  const rulerB = new THREE.MeshBasicMaterial({ color: 0xfafaf8 });
  function dimLine(a, b, tick, text, sub, at, h) {
    const k = 1.2, pts = [...a, ...b];
    [a, b].forEach(p => pts.push(p[0] - tick[0] * k, p[1] - tick[1] * k, p[2] - tick[2] * k, p[0] + tick[0] * k, p[1] + tick[1] * k, p[2] + tick[2] * k));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    scaleGroup.add(new THREE.LineSegments(g, dimMat));
    label(text, sub, h || 2.6, at[0], at[1], at[2], scaleGroup);
  }
  dimLine([-50, 0.25, -31], [50, 0.25, -31], [0, 0, 1], '100 codos', '≈ 45 m', [0, 0.5, -31], 5);
  dimLine([-57, 0.25, -25], [-57, 0.25, 25], [1, 0, 0], '50 codos', '≈ 22,5 m', [-57, 0.5, 0], 5);
  dimLine([-35, 0.25, 9.5], [-5, 0.25, 9.5], [0, 0, 1], '30 codos', '≈ 13,5 m', [-20, 0.5, 9.5]);
  dimLine([-3.4, 0, -7.5], [-3.4, 10.4, -7.5], [1, 0, 0], '10 codos', '≈ 4,5 m', [-3.4, 11, -7.5]);
  dimLine([17.5, 3.4, 3.6], [22.5, 3.4, 3.6], [0, 1, 0], '5 codos', '≈ 2,25 m', [20, 4.6, 3.6], 1.8);
  for (let i = 0; i < 10; i++) {
    const seg = new THREE.Mesh(new THREE.BoxGeometry(1, 0.08, 0.5), i % 2 ? rulerB : rulerA);
    seg.position.set(30.5 + i, 0.05, 16);
    scaleGroup.add(seg);
  }
  label('Regla de 10 codos', 'cada tramo, 1 codo ≈ 45 cm', 1.8, 35, 0.6, 16, scaleGroup);
  const humanMarks = [[46, -6, true], [25.6, 3.6, true], [-6.6, -2.8, false], [-33.3, -3.6, false]];
  humanMarks.forEach(([x, z, lab]) => {
    const p = person(0x7d7466, null, false, scaleGroup);
    p.position.set(x, 0, z);
    if (lab) label('Persona de 1,70 m', '≈ 3,8 codos', 1.5, x, 4.3, z, scaleGroup);
  });

  /* ---------------- Campamento de las tribus ---------------- */
  const camp = new THREE.Group();
  camp.visible = false;
  add(camp);
  const Q = { e: '#a4282b', s: '#b08a2e', w: '#2f5d8a', n: '#4d7a4a', l: '#8a7f70' };
  const CAMP = [
    ['Moisés y los sacerdotes', 'Nm 3:38', [56, -26, 80, 26], Q.l, 8],
    ['Coatitas', '8.600 · Nm 3:28–29', [-50, 32, 50, 48], Q.l, 8],
    ['Gersonitas', '7.500 · Nm 3:22–23', [-80, -26, -56, 26], Q.l, 8],
    ['Meraritas', '6.200 · Nm 3:34–35', [-50, -48, 50, -32], Q.l, 8],
    ['Judá', '74.600 · Nm 2:3–4', [100, -36, 190, 36], Q.e],
    ['Isacar', '54.400 · Nm 2:5–6', [100, -115, 190, -42], Q.e],
    ['Zabulón', '57.400 · Nm 2:7–8', [100, 42, 190, 115], Q.e],
    ['Rubén', '46.500 · Nm 2:10–11', [-36, 72, 36, 150], Q.s],
    ['Simeón', '59.300 · Nm 2:12–13', [42, 72, 115, 150], Q.s],
    ['Gad', '45.650 · Nm 2:14–15', [-115, 72, -42, 150], Q.s],
    ['Efraín', '40.500 · Nm 2:18–19', [-190, -36, -100, 36], Q.w],
    ['Manasés', '32.200 · Nm 2:20–21', [-190, -115, -100, -42], Q.w],
    ['Benjamín', '35.400 · Nm 2:22–23', [-190, 42, -100, 115], Q.w],
    ['Dan', '62.700 · Nm 2:25–26', [-36, -150, 36, -72], Q.n],
    ['Aser', '41.500 · Nm 2:27–28', [-115, -150, -42, -72], Q.n],
    ['Neftalí', '53.400 · Nm 2:29–30', [42, -150, 115, -72], Q.n]
  ].map(r => { r[1] = r[1].replace(' · ', ', '); return r; });
  (function buildCamp() {
    const crnd = mulberry(21);
    const tentMat = std({ color: 0x4a403a, metalness: 0, roughness: 1 });
    const tentGeo = new THREE.ConeGeometry(1.8, 2.4, 4);
    const spots = [];
    CAMP.forEach(([n, sub, [x0, z0, x1, z1], col, lh]) => {
      const w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.2, depthWrite: false }));
      floor.rotation.x = -Math.PI / 2; floor.position.set(cx, 0.04, cz);
      camp.add(floor);
      const lg = new THREE.BufferGeometry();
      lg.setAttribute('position', new THREE.Float32BufferAttribute([x0, 0.08, z0, x1, 0.08, z0, x1, 0.08, z1, x0, 0.08, z1], 3));
      camp.add(new THREE.LineLoop(lg, new THREE.LineBasicMaterial({ color: col })));
      const step = 9;
      for (let x = x0 + 4; x < x1 - 3; x += step) for (let z = z0 + 4; z < z1 - 3; z += step) {
        if (crnd() < 0.3) continue;
        spots.push([x + (crnd() - 0.5) * 4, z + (crnd() - 0.5) * 4, crnd() * Math.PI]);
      }
      label(n, sub, lh || 13, cx, 4, cz, camp, col);
    });
    const inst = new THREE.InstancedMesh(tentGeo, tentMat, spots.length);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), one = new THREE.Vector3(1, 1, 1);
    spots.forEach(([x, z, r], i) => {
      q.setFromEuler(e.set(0, r, 0));
      m4.compose(new THREE.Vector3(x, 1.2, z), q, one);
      inst.setMatrixAt(i, m4);
    });
    inst.castShadow = true;
    camp.add(inst);
  })();

  /* ---------------- Actores de las ceremonias ---------------- */
  const actors = {
    priest: person(0xeeeae0, 0x2c4a8a, true),
    offerer: person(0x8a6a4a, 0x5b4c3e, false),
    bull: animal('bull'),
    lamb: animal('lamb'),
    goatA: animal('goat'),
    goatB: animal('goat')
  };
  Object.values(actors).forEach(a => { a.visible = false; a.userData.walk = null; });
  function face(a, dx, dz) { if (Math.abs(dx) + Math.abs(dz) > 0.01) a.rotation.y = Math.atan2(-dz, dx); }
  function applyActors(step, instant) {
    Object.entries(actors).forEach(([k, a]) => {
      const to = step && step.act[k];
      if (!to) { a.visible = false; a.userData.walk = null; return; }
      if (!a.visible || instant || reduceMotion) {
        a.position.set(to[0], 0, to[1]);
        a.rotation.y = Math.PI;
        a.visible = true; a.userData.walk = null;
        return;
      }
      const from = a.position.clone();
      const dist = Math.hypot(to[0] - from.x, to[1] - from.z);
      if (dist < 0.05) return;
      face(a, to[0] - from.x, to[1] - from.z);
      a.userData.walk = { from, to: new THREE.Vector3(to[0], 0, to[1]), start: performance.now(), dur: Math.min(3200, 500 + dist * 140) };
    });
  }
  function updateActors(now) {
    Object.values(actors).forEach(a => {
      const w = a.userData.walk;
      if (!w) return;
      const k = Math.min(1, (now - w.start) / w.dur);
      a.position.lerpVectors(w.from, w.to, k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
      a.position.y = k < 1 ? Math.abs(Math.sin(k * w.dur / 110)) * 0.08 : 0;
      if (k >= 1) { a.userData.walk = null; a.rotation.y = Math.PI; }
    });
  }

  /* ---------------- Efectos de las ceremonias ---------------- */
  const fxSprites = [];
  for (let i = 0; i < 48; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false }));
    s.visible = false;
    s.userData = { age: 0, life: 1, v: new THREE.Vector3(), o: new THREE.Vector3() };
    fxSprites.push(add(s));
  }
  let fx = null, burnBoost = 1, burnTarget = 1, lampBoost = 1, lampTarget = 1;
  const BLOOD = new THREE.Color(0x7d1111), SMOKE = new THREE.Color(0xe9e6df);
  function setFx(f) {
    burnTarget = f && f.type === 'burn' ? 1.9 : 1;
    lampTarget = f && f.type === 'lamps' ? 2 : 1;
    fx = f && f.at ? { type: f.type, big: !!f.big, at: new THREE.Vector3(...f.at) } : null;
    fxSprites.forEach((s, i) => {
      s.visible = false;
      s.userData.age = -(i / fxSprites.length) * 0.8;
      if (fx) {
        const additive = fx.type === 'fire';
        s.material.blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;
        s.material.needsUpdate = true;
      }
    });
  }
  function spawn(s) {
    const u = s.userData, t = fx.type;
    u.age = 0;
    if (t === 'blood') {
      u.life = 0.9; u.o.set((rnd() - 0.5) * 0.3, 0, (rnd() - 0.5) * 0.3);
      u.v.set((rnd() - 0.5) * 1.2, 0.6 + rnd(), (rnd() - 0.5) * 1.2);
    } else if (t === 'incense') {
      u.life = 3 + rnd() * 1.5; u.o.set((rnd() - 0.5) * 0.2, 0, (rnd() - 0.5) * 0.2);
      u.v.set((rnd() - 0.5) * 0.25, 0.7 + rnd() * 0.4, (rnd() - 0.5) * 0.25);
    } else {
      u.life = 0.8 + rnd() * 0.6; u.o.set((rnd() - 0.5) * 2.2, 0, (rnd() - 0.5) * 2.2);
      u.v.set((rnd() - 0.5) * 0.3, 2.2 + rnd() * 1.5, (rnd() - 0.5) * 0.3);
    }
  }
  function updateFx(dt) {
    burnBoost += (burnTarget - burnBoost) * Math.min(1, dt * 3);
    lampBoost += (lampTarget - lampBoost) * Math.min(1, dt * 3);
    if (!fx) return;
    fxSprites.forEach(s => {
      const u = s.userData;
      u.age += dt;
      if (u.age < 0) return;
      if (!s.visible || u.age > u.life) { spawn(s); s.visible = true; }
      const k = u.age / u.life;
      if (fx.type === 'blood') {
        s.position.set(fx.at.x + u.o.x + u.v.x * u.age, fx.at.y + u.v.y * u.age - 4.5 * u.age * u.age, fx.at.z + u.o.z + u.v.z * u.age);
        s.material.color.copy(BLOOD); s.material.opacity = 0.95 * (1 - k);
        s.scale.setScalar(0.24);
      } else if (fx.type === 'incense') {
        const big = fx.big ? 1.8 : 1;
        s.position.set(fx.at.x + (u.o.x + u.v.x * u.age) * big, fx.at.y + u.v.y * u.age * big, fx.at.z + (u.o.z + u.v.z * u.age) * big);
        s.material.color.copy(SMOKE); s.material.opacity = 0.55 * (1 - k) * Math.min(1, u.age * 3);
        s.scale.setScalar((0.35 + k * 2.2) * big);
      } else {
        s.position.set(fx.at.x + u.o.x * (1 - k * 0.5), fx.at.y + u.v.y * u.age, fx.at.z + u.o.z * (1 - k * 0.5));
        s.material.color.copy(FIRE[0]).lerp(FIRE[1], Math.min(1, k * 1.4));
        s.material.opacity = 0.85 * (1 - k); s.scale.setScalar(1.4 * (1 - k * 0.5));
      }
    });
  }

  /* ---------------- Luces ---------------- */
  const hemi = add(new THREE.HemisphereLight(0xffffff, 0xb49a74, 0.8));
  const sun = new THREE.DirectionalLight(0xfff2da, 1.05);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -85, right: 85, top: 60, bottom: -60, near: 1, far: 320 });
  sun.shadow.bias = -0.0004;
  add(sun); add(sun.target);
  const fireLight = add(new THREE.PointLight(0xff8a3d, 0, 190));
  fireLight.position.set(-30, 24, 0);
  const altarLight = add(new THREE.PointLight(0xff9a4a, 0.5, 30));
  altarLight.position.set(20, 4.8, 0);
  const lampLight = add(new THREE.PointLight(0xffc877, 0.6, 16));
  lampLight.position.set(-15, 3.4, 3.3);

  /* ---------------- Anillo de selección ---------------- */
  const ringMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide });
  const ring = add(new THREE.Mesh(new THREE.RingGeometry(0.94, 1, 72), ringMat));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.06; ring.visible = false;

  /* ---------------- Tema día / noche ---------------- */
  const themeBtn = document.getElementById('t-theme');
  const mq = matchMedia('(prefers-color-scheme: dark)');
  let night = root.dataset.theme ? root.dataset.theme === 'dark' : mq.matches;
  let userChoseTheme = false;

  function applyTheme(isNight) {
    night = isNight;
    root.dataset.theme = night ? 'dark' : 'light';
    const cs = getComputedStyle(root);
    const bg = cs.getPropertyValue('--bg').trim() || (night ? '#15171c' : '#fafaf8');
    const accent = cs.getPropertyValue('--accent').trim() || '#9e2b25';
    scene.background = new THREE.Color(bg);
    scene.fog = new THREE.Fog(bg, 190, 680);
    updateFog();
    ringMat.color.set(accent);
    dimMat.color.set(accent); rulerA.color.set(accent); rulerB.color.set(bg);
    labels.forEach(drawLabel);
    if (night) {
      hemi.color.set(0x34425f); hemi.groundColor.set(0x16130f); hemi.intensity = 0.55;
      sun.color.set(0xa3b6dc); sun.intensity = 0.3; sun.position.set(-40, 80, -55);
    } else {
      hemi.color.set(0xfffaf0); hemi.groundColor.set(0x8a7658); hemi.intensity = 0.42;
      sun.color.set(0xfff0d4); sun.intensity = 0.8; sun.position.set(55, 95, 42);
    }
    fireLight.intensity = night ? 2.3 : 0;
    altarLight.intensity = night ? 1.7 : 0.5;
    lampLight.intensity = night ? 1.4 : 0.6;
    stars.visible = night;
    stdMats.forEach(m => { const base = m.metalness > 0.5 ? 1 : 0.25; m.envMapIntensity = base * (night ? 0.3 : 1); });
    column.forEach(s => {
      s.material.blending = night ? THREE.AdditiveBlending : THREE.NormalBlending;
      s.material.needsUpdate = true;
    });
    themeBtn.textContent = night ? 'Ver de día' : 'Ver de noche';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', bg);
  }
  function updateFog() {
    if (!scene.fog) return;
    const far = camp.visible;
    scene.fog.near = far ? 380 : (night ? 110 : 190);
    scene.fog.far = far ? 1300 : (night ? 560 : 680);
  }
  themeBtn.addEventListener('click', () => { userChoseTheme = true; applyTheme(!night); });
  const onScheme = e => { if (!userChoseTheme) applyTheme(e.matches); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);

  /* ---------------- Cubiertas ---------------- */
  const coversBtn = document.getElementById('t-covers');
  function setCovers(on) {
    covers.visible = on;
    coversBtn.setAttribute('aria-pressed', String(on));
  }
  coversBtn.addEventListener('click', () => setCovers(!covers.visible));

  /* ---------------- Escala y tribus ---------------- */
  const scaleBtn = document.getElementById('t-scale');
  scaleBtn.addEventListener('click', () => {
    scaleGroup.visible = !scaleGroup.visible;
    scaleBtn.setAttribute('aria-pressed', String(scaleGroup.visible));
  });
  const tribesBtn = document.getElementById('t-tribes');
  tribesBtn.addEventListener('click', () => {
    camp.visible = !camp.visible;
    tribesBtn.setAttribute('aria-pressed', String(camp.visible));
    updateFog();
    if (camp.visible) {
      renderInfo(CAMP_INFO, '', '');
      flyTo(CAMP_INFO.view);
    } else {
      renderDetail();
      flyTo(items(tour)[idx].view);
    }
  });

  /* ---------------- UI: pestañas, listas y ficha ---------------- */
  const list = document.getElementById('stations');
  const cerBox = document.getElementById('ceremonies');
  const tabPartes = document.getElementById('tab-partes');
  const tabCer = document.getElementById('tab-cer');
  const stBtn = (tourId, i, num, name, ref) => `<button class="st" type="button" data-tour="${tourId}" data-i="${i}">
      <span class="st-num">${num ?? ''}</span>
      <span class="st-name">${name}</span>
      <span class="st-ref">${ref}</span>
    </button>`;
  list.innerHTML = STATIONS.map((s, i) => `<li>${stBtn('partes', i, s.num, s.short || s.n, s.ref)}</li>`).join('');
  cerBox.innerHTML = CEREMONIES.map(c => `<section class="cer">
      <button class="cer-head" type="button" data-cer="${c.id}" aria-expanded="false">
        <span class="cer-name">${c.n}</span>
        <span class="st-ref">${c.intro ? c.intro + ', ' : ''}${c.ref}</span>
      </button>
      <ol class="cer-steps" hidden>${c.steps.map((s, i) => `<li>${stBtn(c.id, i, i + 1, s.n, s.ref)}</li>`).join('')}</ol>
    </section>`).join('');

  function showTab(which) {
    const cer = which === 'cer';
    tabPartes.setAttribute('aria-selected', String(!cer));
    tabCer.setAttribute('aria-selected', String(cer));
    list.hidden = cer;
    cerBox.hidden = !cer;
  }
  tabPartes.addEventListener('click', () => { if (tour !== 'partes') select('partes', 0); else showTab('partes'); });
  tabCer.addEventListener('click', () => { if (tour === 'partes') select(CEREMONIES[0].id, 0); else showTab('cer'); });
  document.querySelector('.tb-panel').addEventListener('click', e => {
    const b = e.target.closest('.st');
    if (b) return select(b.dataset.tour, +b.dataset.i);
    const h = e.target.closest('.cer-head');
    if (h) select(h.dataset.cer, 0);
  });

  const dKicker = document.getElementById('d-kicker');
  const dTitle = document.getElementById('d-title');
  const dRef = document.getElementById('d-ref');
  const dRows = document.getElementById('d-rows');
  const dDesc = document.getElementById('d-desc');
  const dPos = document.getElementById('d-pos');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let tour = 'partes', idx = 0;
  const items = t => (t === 'partes' ? STATIONS : CER_BY_ID[t].steps);

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  document.getElementById('t-home').addEventListener('click', () => select('partes', 0));
  function step(d) {
    const n = items(tour).length;
    const i = Math.max(0, Math.min(n - 1, idx + d));
    if (i !== idx) select(tour, i);
  }
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, canvas')) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  function renderInfo(it, kicker, pos) {
    dKicker.textContent = kicker;
    dKicker.hidden = !kicker;
    dTitle.textContent = it.n;
    dRef.textContent = it.ref;
    dRows.innerHTML = it.rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    dDesc.textContent = it.desc;
    dPos.textContent = pos;
  }
  function renderDetail() {
    const list_ = items(tour), it = list_[idx];
    const cer = tour === 'partes' ? null : CER_BY_ID[tour];
    renderInfo(it, cer ? cer.n : '', cer ? `Paso ${idx + 1} de ${list_.length}` : (it.num ? `${it.num} de 9` : ''));
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === list_.length - 1;
  }

  function select(t, i, instant) {
    if (typeof t === 'string' && i === undefined) { i = BY_ID[t]; t = 'partes'; }   // selección por id de estación
    if (i === undefined || !items(t)[i]) return;
    const tourChanged = t !== tour;
    tour = t; idx = i;
    const it = items(t)[i];
    showTab(t === 'partes' ? 'partes' : 'cer');
    document.querySelectorAll('.tb-panel .st').forEach(b => b.setAttribute('aria-current', String(b.dataset.tour === t && +b.dataset.i === i)));
    cerBox.querySelectorAll('.cer-head').forEach(h => {
      const open = h.dataset.cer === t;
      h.setAttribute('aria-expanded', String(open));
      h.nextElementSibling.hidden = !open;
    });
    renderDetail();
    if (it.covers === true) setCovers(true);
    if (it.covers === false) setCovers(false);
    if (it.ring) {
      ring.visible = true;
      ring.position.set(it.ring[0], 0.06, it.ring[1]);
      ring.scale.setScalar(it.ring[2]);
    } else ring.visible = false;
    applyActors(t === 'partes' ? null : it, tourChanged || instant);
    setFx(t === 'partes' ? null : it.fx);
    flyTo(it.view, instant);
  }

  /* ---------------- Cámara ---------------- */
  let flight = null;
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function flyTo(v, instant) {
    const p1 = new THREE.Vector3(...v.p), t1 = new THREE.Vector3(...v.t);
    if (instant || reduceMotion) {
      camera.position.copy(p1); controls.target.copy(t1); flight = null; return;
    }
    const dist = camera.position.distanceTo(p1);
    flight = {
      p0: camera.position.clone(), t0: controls.target.clone(), p1, t1,
      start: performance.now(), dur: Math.min(2200, 900 + dist * 9)
    };
  }
  controls.addEventListener('start', () => { flight = null; });

  /* ---------------- Selección con el puntero ---------------- */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function shown(o) { while (o) { if (!o.visible) return false; o = o.parent; } return true; }
  function pickAt(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(pickables, true);
    for (const h of hits) {
      if (h.object.isSprite || h.object.isLineSegments || !shown(h.object)) continue;
      let o = h.object;
      while (o) { if (o.userData && o.userData.station) return o.userData.station; o = o.parent; }
    }
    return null;
  }
  let down = null;
  canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY }; });
  canvas.addEventListener('pointerup', e => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved < 6) { const id = pickAt(e); if (id) select('partes', BY_ID[id]); }
  });
  let hoverQueued = false, lastMove = null;
  canvas.addEventListener('pointermove', e => {
    if (e.buttons || e.pointerType === 'touch') return;
    lastMove = e;
    if (hoverQueued) return;
    hoverQueued = true;
    requestAnimationFrame(() => {
      hoverQueued = false;
      canvas.style.cursor = pickAt(lastMove) ? 'pointer' : '';
    });
  });

  /* ---------------- Tamaño ---------------- */
  const detailEl = document.getElementById('detail');
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    /* En escritorio la ficha tapa la esquina inferior izquierda: se corre el centro de la vista */
    if (getComputedStyle(detailEl).position === 'absolute') {
      const dx = Math.min(w * 0.22, (detailEl.offsetWidth + 20) / 2);
      camera.setViewOffset(w, h, -dx, Math.min(60, h * 0.07), w, h);
    } else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  new ResizeObserver(resize).observe(detailEl);
  resize();

  /* ---------------- Animación ---------------- */
  const cTmp = new THREE.Color();
  const FIRE = [new THREE.Color(0xffd27a), new THREE.Color(0xff6a2a), new THREE.Color(0xa8261a)];
  const CLOUD_DARK = new THREE.Color(0xc7ccd4), CLOUD_LIGHT = new THREE.Color(0xeef0f3);
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  function updateColumn(dt, t) {
    for (const s of column) {
      const u = s.userData;
      if (night) {
        u.y += dt * (0.09 + 0.05 * u.spd);
        if (u.y > 1) { u.y -= 1; u.a = rnd() * Math.PI * 2; }
        const h = 12 + u.y * 56;
        const rad = (1.1 + u.y * 2.4) * (0.25 + u.r);
        const ang = u.a + t * 0.6 * (u.spd - 0.4);
        s.position.set(-30 + Math.cos(ang) * rad, h, Math.sin(ang) * rad);
        const k = u.y < 0.5 ? u.y * 2 : (u.y - 0.5) * 2;
        cTmp.copy(u.y < 0.5 ? FIRE[0] : FIRE[1]).lerp(u.y < 0.5 ? FIRE[1] : FIRE[2], k);
        s.material.color.copy(cTmp);
        s.material.opacity = 0.7 * Math.pow(1 - u.y, 1.2) * smooth(0, 0.06, u.y);
        s.scale.setScalar((5.5 + u.size * 5) * (1 - u.y * 0.55) * (0.9 + 0.1 * Math.sin(t * 9 + u.a * 5)));
      } else {
        u.y += dt * 0.012 * u.spd;
        if (u.y > 1) u.y -= 1;
        const h = 14 + u.y * 62;
        const rad = (2.2 + u.y * 3.6) * (0.35 + u.r * 0.9);
        const ang = u.a + t * 0.04;
        s.position.set(-30 + Math.cos(ang) * rad, h, Math.sin(ang) * rad);
        s.material.color.copy(CLOUD_DARK).lerp(CLOUD_LIGHT, Math.min(1, u.shade * 0.6 + u.y * 0.6));
        s.material.opacity = 0.62 * smooth(0, 0.1, u.y) * (1 - smooth(0.85, 1, u.y));
        s.scale.setScalar(9 + u.size * 9 + u.y * 6);
      }
    }
  }
  function updateFires(dt, t) {
    for (const s of altarFire) {
      const u = s.userData;
      u.y += dt * (0.55 + 0.4 * u.spd);
      if (u.y > 1) { u.y -= 1; u.a = rnd() * Math.PI * 2; u.r = rnd(); }
      const rad = 1.7 * u.r * (1 - u.y * 0.6);
      s.position.set(Math.cos(u.a) * rad, 3.1 + u.y * 2.4 * burnBoost, Math.sin(u.a) * rad);
      const k = u.y;
      s.material.color.copy(FIRE[0]).lerp(FIRE[1], Math.min(1, k * 1.4));
      s.material.opacity = (night ? 0.9 : 0.75) * (1 - k) * smooth(0, 0.08, k);
      s.scale.setScalar((1.3 + u.spd * 0.6) * (1 - k * 0.5) * (0.6 + 0.4 * burnBoost));
    }
    lampFlames.forEach(s => { s.scale.setScalar((0.28 + 0.05 * Math.sin(t * 11 + s.userData.ph)) * lampBoost); });
    lampLight.intensity = (night ? 1.4 : 0.6) * (0.5 + 0.5 * lampBoost);
    ember.material.opacity = 0.55 + 0.25 * Math.sin(t * 3.1);
    const flick = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3);
    altarLight.intensity = (night ? 1.7 : 0.5) * flick * burnBoost;
    if (night) fireLight.intensity = 2.3 * (0.9 + 0.1 * Math.sin(t * 5.7));
  }

  const needle = document.getElementById('needle');
  let last = performance.now();
  let lastAz = null;
  function frame(now) {
    const realDt = Math.min(0.05, (now - last) / 1000);
    const dt = reduceMotion ? 0 : realDt;
    last = now;
    const t = reduceMotion ? 0 : now / 1000;
    if (flight) {
      const k = Math.min(1, (now - flight.start) / flight.dur);
      const e = ease(k);
      camera.position.lerpVectors(flight.p0, flight.p1, e);
      controls.target.lerpVectors(flight.t0, flight.t1, e);
      if (k >= 1) flight = null;
    }
    updateColumn(dt, t);
    updateFx(realDt);
    updateFires(dt, t);
    updateActors(now);
    if (ring.visible) ringMat.opacity = reduceMotion ? 0.9 : 0.65 + 0.3 * Math.sin(now / 350);
    controls.update();
    const az = controls.getAzimuthalAngle();
    if (az !== lastAz) { needle.setAttribute('transform', `rotate(${(az * 180 / Math.PI).toFixed(1)} 22 22)`); lastAz = az; }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  applyTheme(night);
  select('partes', 0, false);
  window.fypReset = () => select('partes', 0);
  requestAnimationFrame(frame);
})();
