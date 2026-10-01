/* =====================================================
   DATA.JS — Contenido del templo de Salomón.
   Edita aquí textos, medidas, citas y vistas de cámara.
   Unidad: 1 = 1 codo (≈ 45 cm). Ejes: +x oriente, −z norte.
   Debe cargarse ANTES de app.js.
   ===================================================== */
window.TEMPLO = window.TEMPLO || {};
(() => {
  window.TEMPLO.STATIONS = [
    {
      id: 'general', num: null, n: 'El templo de Salomón', short: 'Vista general',
      ref: '1 Reyes 6:1–2, 7, 37–38; 2 Crónicas 3:1–3',
      rows: [
        ['Medidas', 'La casa: 60 × 20 codos y 30 de alto (≈ 27 × 9 × 13,5 m)'],
        ['Construcción', 'Siete años, desde el cuarto año del reinado de Salomón'],
        ['Ubicación', 'Monte Moriah, en la era de Ornán jebuseo, en Jerusalén']
      ],
      desc: 'La piedra llegaba ya labrada desde la cantera, y durante la obra no se oyó martillo ni hacha en la casa. El modelo usa el codo común de unos 45 cm; 2 Crónicas 3:3 habla de "la medida antigua", que pudo ser algo mayor.',
      view: { t: [8, 6, 0], p: [150, 100, 150] }, roof: true
    },
    {
      id: 'atrio', num: 1, n: 'El atrio interior', ref: '1 Reyes 6:36; 7:12; 2 Crónicas 4:9',
      rows: [
        ['Medidas', 'El texto no las da; el tamaño del modelo es una estimación'],
        ['Materiales', 'Tres hileras de piedra labrada y una hilera de vigas de cedro'],
        ['Ubicación', 'Rodea la casa; más allá estaba el gran atrio']
      ],
      desc: 'Crónicas lo llama el atrio de los sacerdotes, distinto del gran atrio, que tenía puertas cubiertas de bronce. Aquí se modela solo el atrio interior, con una puerta al oriente.',
      view: { t: [15, 0, 0], p: [150, 72, 112] }, roof: true
    },
    {
      id: 'altar', num: 2, n: 'Altar de bronce', ref: '2 Crónicas 4:1; 1 Reyes 8:64',
      rows: [
        ['Medidas', '20 × 20 codos y 10 de alto (≈ 9 × 9 × 4,5 m)'],
        ['Materiales', 'Bronce'],
        ['Ubicación', 'En el atrio, frente a la casa']
      ],
      desc: 'Cuatro veces el tamaño del altar del tabernáculo en cada lado. Aun así, en la dedicación resultó pequeño y Salomón consagró el centro del atrio para las ofrendas. El texto no describe cómo se subía al altar, así que el modelo no inventa una rampa.',
      view: { t: [62, 5, 0], p: [96, 28, 40] }, ring: [62, 0, 15]
    },
    {
      id: 'mar', num: 3, n: 'El mar de bronce', ref: '1 Reyes 7:23–26, 39; 2 Crónicas 4:2–6, 10',
      rows: [
        ['Medidas', '10 codos de diámetro, 5 de alto y 30 de circunferencia (≈ 4,5 m de ancho)'],
        ['Materiales', 'Bronce fundido de un palmo de grueso, con el borde como flor de lis, sobre doce bueyes'],
        ['Ubicación', 'Al lado derecho de la casa, hacia el sureste']
      ],
      desc: 'Servía para que los sacerdotes se lavaran. Los doce bueyes miraban tres a cada punto cardinal. Reyes le da 2.000 batos de capacidad y Crónicas 3.000; la diferencia se discute.',
      view: { t: [42, 4, 28], p: [64, 18, 54] }, ring: [42, 28, 7]
    },
    {
      id: 'basas', num: 4, n: 'Las diez basas con sus fuentes', ref: '1 Reyes 7:27–39; 2 Crónicas 4:6',
      rows: [
        ['Medidas', 'Cada basa, 4 × 4 codos y 3 de alto, con ruedas de codo y medio; cada fuente, 4 codos y 40 batos'],
        ['Materiales', 'Bronce, con tableros de leones, bueyes, querubines y palmeras'],
        ['Ubicación', 'Cinco al sur y cinco al norte de la casa']
      ],
      desc: 'En estas fuentes se lavaba lo que se ofrecía en holocausto, mientras el mar era para los sacerdotes. Las basas tenían ruedas, pero el texto no dice si se movían en el uso diario.',
      view: { t: [2, 2, 25], p: [22, 15, 50] }, ring: [2, 25, 25]
    },
    {
      id: 'columnas', num: 5, n: 'Jaquín y Boaz', ref: '1 Reyes 7:15–22, 41–42; 2 Crónicas 3:15–17',
      rows: [
        ['Medidas', '18 codos de alto y 12 de circunferencia, con capiteles de 5 codos (≈ 8,1 m + 2,25 m)'],
        ['Materiales', 'Bronce, con redes, cadenas, lirios y doscientas granadas en cada capitel'],
        ['Ubicación', 'Delante del pórtico: Jaquín a la derecha (sur) y Boaz a la izquierda (norte)']
      ],
      desc: 'Jaquín significa "él establecerá" y Boaz "en él hay fortaleza". Crónicas da 35 codos, que muchos entienden como la suma de ambas. El texto tampoco aclara si sostenían algo o estaban exentas; aquí están exentas.',
      view: { t: [36, 12, 0], p: [72, 16, 28] }, ring: [36, 0, 11]
    },
    {
      id: 'portico', num: 6, n: 'El pórtico', ref: '1 Reyes 6:3; 2 Crónicas 3:4',
      rows: [
        ['Medidas', '20 codos de ancho y 10 de fondo'],
        ['Altura', '2 Crónicas 3:4 dice 120 codos en el texto hebreo; muchos lo ven como error de copia y el modelo usa la altura de la casa'],
        ['Ubicación', 'Frente de la casa, al oriente']
      ],
      desc: 'Era la antesala del Lugar Santo. Crónicas dice que Salomón lo cubrió por dentro de oro puro. Desde aquí, dos puertas de ciprés de dos hojas plegables daban paso al interior.',
      view: { t: [28, 12, 0], p: [64, 22, 32] }, roof: true, ring: [28, 0, 7]
    },
    {
      id: 'camaras', num: 7, n: 'Las cámaras laterales', ref: '1 Reyes 6:5–10',
      rows: [
        ['Medidas', 'Tres pisos de 5, 6 y 7 codos de ancho, cada uno de 5 codos de alto'],
        ['Construcción', 'El muro se escalonaba hacia afuera para apoyar las vigas sin empotrarlas en la casa'],
        ['Ubicación', 'Alrededor de la casa, por el norte, el occidente y el sur']
      ],
      desc: 'Se subía por una escalera de caracol desde una puerta en el lado derecho. Por encima de las cámaras, el muro de la casa tenía ventanas anchas por dentro y estrechas por fuera. El grosor de los muros no se da; el modelo usa 3 codos.',
      view: { t: [-12, 8, 16], p: [16, 26, 64] }, roof: true
    },
    {
      id: 'santo', num: 8, n: 'El Lugar Santo', ref: '1 Reyes 6:15–18, 29–35; 7:48–50; 2 Crónicas 4:7–8',
      rows: [
        ['Medidas', '40 × 20 codos y 30 de alto (≈ 18 × 9 × 13,5 m)'],
        ['Materiales', 'Cedro tallado con calabazas, flores, palmeras y querubines, todo cubierto de oro; suelo de ciprés'],
        ['Contenido', 'Altar de oro, diez candeleros, diez mesas y la mesa de los panes']
      ],
      desc: 'Los candeleros y las mesas estaban cinco a la derecha y cinco a la izquierda; su orden exacto no se describe, así que la disposición del modelo es ilustrativa. Desactiva el techo para ver el interior.',
      view: { t: [-2, 1, 0], p: [19, 46, 7.5] }, roof: false, ring: [0, 0, 20]
    },
    {
      id: 'santisimo', num: 9, n: 'El Lugar Santísimo', ref: '1 Reyes 6:16, 19–22, 31–32; 2 Crónicas 3:8–14',
      rows: [
        ['Medidas', 'Un cubo de 20 codos (≈ 9 m por lado)'],
        ['Materiales', 'Cubierto de oro fino, seiscientos talentos; puertas de olivo y un velo de azul, púrpura, carmesí y lino'],
        ['Ubicación', 'Extremo occidental de la casa']
      ],
      desc: 'Era el doble en cada medida que el del tabernáculo. Su techo quedaba 10 codos más bajo que el de la casa; el texto no dice qué había en ese espacio. Activa Tabernáculo para comparar ambos tamaños.',
      view: { t: [-30, 4, 0], p: [-22.5, 40, 7.5] }, roof: false, ring: [-30, 0, 10.5]
    },
    {
      id: 'querubines', num: 10, n: 'Los querubines y el arca', ref: '1 Reyes 6:23–28; 8:6–9; 2 Crónicas 3:10–13',
      rows: [
        ['Medidas', 'Cada querubín, 10 codos de alto y alas de 5 codos; juntos cubrían los 20 codos de pared a pared'],
        ['Materiales', 'Madera de olivo cubierta de oro'],
        ['Contenido', 'El arca, con solo las dos tablas de piedra']
      ],
      desc: 'Los querubines estaban de pie, con el rostro hacia la casa, y el arca quedó bajo sus alas. Las varas eran tan largas que sus extremos se veían desde el Lugar Santo, aunque no desde afuera.',
      view: { t: [-31, 6, -0.5], p: [-22.2, 17.5, 8] }, roof: false, ring: [-30, 0, 4]
    },
    {
      id: 'dedicacion', num: null, n: 'La dedicación', short: 'La dedicación',
      ref: '1 Reyes 8:10–11, 62–64; 2 Crónicas 5:13–14; 7:1–3',
      rows: [
        ['La nube', 'Llenó la casa, y los sacerdotes no podían quedarse a ministrar'],
        ['El fuego', 'Descendió del cielo y consumió el holocausto y los sacrificios'],
        ['Ofrendas', 'Veintidós mil bueyes y ciento veinte mil ovejas']
      ],
      desc: 'Al subir el arca al Lugar Santísimo, la gloria de Jehová llenó la casa. Salomón oró de rodillas delante del altar con las manos extendidas al cielo, y la fiesta duró catorce días.',
      view: { t: [8, 14, 0], p: [112, 48, 92] }, roof: true
    }
  ];
})();
