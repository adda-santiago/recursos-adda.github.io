/*
 * Contenido de la presentación «La Segunda Guerra Mundial».
 * Este archivo se puede editar sin tocar el motor (app.js).
 *
 * Esquema de cada diapositiva:
 *   id          identificador estable (minúsculas y guiones)
 *   acto        id de un acto declarado en `actos`
 *   layout      'portada' | 'pregunta' | 'puntos'   (más layouts en pasos siguientes)
 *   titulo      título visible y del índice
 *   subtitulo   opcional
 *   pasos       en 'puntos': lista de { t: 'idea', d: 'desarrollo' }; cada uno aparece con un clic
 *   imagen      { tipo: 'ilustracion' | 'archivo' | 'mapa', src, alt, credito, pendiente }
 *               src: null => se muestra un marcador «Imagen pendiente» con la descripción
 *   fuente      texto de la fuente visible en la diapositiva
 *   notas       notas del presentador (no se proyectan)
 *   transicion  'normal' | 'lenta' | 'ninguna'
 *   tono        'normal' | 'sobrio'  (sobrio: apariciones sin movimiento)
 *   minutos     duración estimada, para el cronómetro del presentador
 *
 * Regla: ninguna cifra entra sin fuente verificada.
 */
window.PRESENTACION = {
  titulo: 'La Segunda Guerra Mundial',

  actos: [
    { id: 'origen', titulo: 'El origen' },
    { id: 'expansion', titulo: 'La expansión del Eje, 1939–1941' },
    { id: 'inflexion', titulo: 'El punto de inflexión, 1942–1943' },
    { id: 'derrota', titulo: 'La derrota del Eje, 1944–1945' },
    { id: 'legado', titulo: 'El legado' }
  ],

  diapositivas: [
    {
      id: 'portada',
      acto: 'origen',
      layout: 'portada',
      titulo: 'La Segunda Guerra Mundial',
      subtitulo: 'Causas, desarrollo y legado de la guerra más mortífera de la historia',
      desde: 1939,
      hasta: 1945,
      imagen: {
        tipo: 'ilustracion',
        src: null,
        alt: '',
        credito: '',
        pendiente: 'Fondo de portada: ilustración sobria, sin personas reconocibles (prompt en el paso 5)'
      },
      transicion: 'lenta',
      notas: 'Presentarse y anunciar la duración (unos 40 minutos) y la estructura en cinco actos. Avisar que habrá un momento de discusión al final.',
      minutos: 0.5
    },
    {
      id: 'pregunta',
      acto: 'origen',
      layout: 'pregunta',
      titulo: '¿Cómo una guerra que terminó en 1918 produjo otra apenas 21 años después?',
      notas: 'Dejar la pregunta en pantalla unos segundos sin hablar. Pedir dos o tres hipótesis al público y anotarlas; se retoman en la diapositiva final.',
      minutos: 1
    },
    {
      id: 'versalles',
      acto: 'origen',
      layout: 'puntos',
      titulo: 'Una paz que no cerró la guerra',
      subtitulo: 'El Tratado de Versalles, 1919',
      pasos: [
        { t: 'Pérdidas territoriales', d: 'Alemania entrega Alsacia-Lorena a Francia, territorios al nuevo Estado polaco y todas sus colonias.' },
        { t: 'Reparaciones', d: 'Debe compensar a los vencedores por los daños de la guerra.' },
        { t: 'Responsabilidad', d: 'El artículo 231 le atribuye la responsabilidad por el conflicto.' },
        { t: 'Desarme', d: 'Su ejército queda limitado y la Renania, desmilitarizada.' },
        { t: 'Humillación', d: 'Muchos alemanes lo vivieron como un «Diktat», una paz impuesta. La propaganda nacionalista lo explotó durante dos décadas.' }
      ],
      imagen: {
        tipo: 'mapa',
        src: null,
        alt: 'Mapa de Alemania con los territorios perdidos en 1919',
        credito: '',
        pendiente: 'Mapa SVG de las pérdidas territoriales alemanas (paso 6)'
      },
      fuente: 'Tratado de Versalles (1919), arts. 42–44, 119, 160 y 231.',
      notas: 'Matiz para el debate: Keynes («Las consecuencias económicas de la paz», 1919) sostuvo que las reparaciones eran ruinosas. Historiadores posteriores, como Margaret MacMillan («París 1919»), matizan que el problema fue más político que económico: el tratado fue lo bastante duro para humillar y no lo bastante para impedir el resurgimiento alemán.',
      minutos: 2
    }
  ]
};
