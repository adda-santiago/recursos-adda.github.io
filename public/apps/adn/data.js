/* ==========================================================
   Aula Visual — El ADN · contenido
   Cada estación de la ruta define:
     n, short, ref, rows [[título, texto]], desc, think (pregunta),
     view { t: objetivo, p: posición de cámara } en nm,
     focus: categorías resaltadas (el resto se atenúa)
       'fosfato' | 'azucar' | 'esqueleto' | 'base' | 'puente'
     show: grupos auxiliares visibles
       'nucleotido' | 'bases' | 'extremos' | 'surcos' | 'medidas'
   ========================================================== */
window.ADN_DATA = {
  STATIONS: [
    {
      id: 'general', num: null, n: 'La molécula de ADN', short: 'Vista general',
      ref: 'Ácido desoxirribonucleico',
      rows: [
        ['Qué es', 'Un polímero de nucleótidos que almacena la información hereditaria'],
        ['Forma', 'Dos hebras enrolladas en una doble hélice que gira hacia la derecha'],
        ['Dónde está', 'En eucariontes, en el núcleo (y también en mitocondrias y cloroplastos); en procariontes, en el citoplasma']
      ],
      desc: 'El modelo muestra un tramo de 24 pares de bases en la forma B, la más común en las células. Recorre la ruta en orden: primero las piezas, después cómo se ensamblan y, al final, en la pestaña Procesos, cómo se copia la molécula.',
      think: '¿Por qué una molécula que guarda información tendría dos hebras y no una?',
      view: { t: [0, 0, 0], p: [0, 1, 18] }
    },
    {
      id: 'nucleotido', num: 1, n: 'El nucleótido', ref: 'La unidad que se repite',
      rows: [
        ['Partes', 'Un grupo fosfato, un azúcar (desoxirribosa) y una base nitrogenada'],
        ['Variantes', 'Cuatro, que se distinguen solo por la base: A, T, G o C'],
        ['En el modelo', 'A la derecha de la hélice, un nucleótido separado con sus tres partes']
      ],
      desc: 'El ADN es una cadena de nucleótidos unidos uno tras otro. El fosfato y el azúcar son iguales en todos los nucleótidos y forman el armazón de la cadena; lo único que cambia es la base.',
      think: 'Si el fosfato y el azúcar se repiten siempre, ¿en qué parte de la molécula está escrita la información?',
      view: { t: [4.35, 0.15, 0], p: [4.35, 0.5, 6.6] }, show: ['nucleotido'], focus: []
    },
    {
      id: 'azucar', num: 2, n: 'La desoxirribosa', ref: 'Un azúcar de cinco carbonos',
      rows: [
        ['Tipo', 'Pentosa: sus carbonos se numeran de 1′ a 5′'],
        ['Uniones', 'La base se une al carbono 1′ y el fosfato al carbono 5′'],
        ['Nombre', '«Desoxi»: le falta un oxígeno en el carbono 2′ comparada con la ribosa del ARN']
      ],
      desc: 'La numeración de los carbonos no es un detalle: los extremos 5′ y 3′ de cada hebra se nombran por ellos, y esa dirección es la que siguen las enzimas que leen y copian el ADN.',
      think: 'Además del azúcar, ¿qué otra diferencia entre el ADN y el ARN conoces?',
      view: { t: [3.95, 0.05, 0], p: [3.95, 0.35, 4.8] }, show: ['nucleotido'], focus: ['azucar']
    },
    {
      id: 'fosfato', num: 3, n: 'Fosfato y esqueleto', ref: 'Enlaces fosfodiéster',
      rows: [
        ['Unión', 'Cada fosfato une el carbono 3′ de un azúcar con el carbono 5′ del siguiente'],
        ['Posición', 'El esqueleto azúcar-fosfato queda hacia el exterior de la hélice'],
        ['Carga', 'Negativa: los fosfatos hacen del ADN una molécula ácida']
      ],
      desc: 'El esqueleto es la parte estructural de la molécula: une los nucleótidos de una misma hebra con enlaces covalentes, fuertes. Al quedar hacia afuera, deja a las bases protegidas en el interior.',
      think: '¿Por qué conviene que las bases queden hacia adentro y no hacia afuera?',
      view: { t: [0, 0, 0], p: [7.5, 2.5, 11.5] }, focus: ['fosfato', 'esqueleto', 'azucar']
    },
    {
      id: 'bases', num: 4, n: 'Las bases nitrogenadas', ref: 'Purinas y pirimidinas',
      rows: [
        ['Purinas', 'Adenina (A) y guanina (G): dos anillos'],
        ['Pirimidinas', 'Timina (T) y citosina (C): un anillo'],
        ['En el ARN', 'El uracilo (U) reemplaza a la timina']
      ],
      desc: 'El orden de las bases a lo largo de una hebra es la secuencia del ADN: el texto en que está escrita la información genética. En la hélice, las purinas se ven más largas que las pirimidinas.',
      think: 'Con solo cuatro letras, ¿cuántas secuencias distintas de tres bases se pueden formar?',
      view: { t: [3.9, 0.3, 0], p: [3.9, 0.45, 7.4] }, show: ['bases'], focus: ['base']
    },
    {
      id: 'pares', num: 5, n: 'Pares complementarios', ref: 'A con T, G con C',
      rows: [
        ['A con T', 'Dos puentes de hidrógeno'],
        ['G con C', 'Tres puentes de hidrógeno'],
        ['Regla de Chargaff', 'En el ADN de doble hebra, la cantidad de A es igual a la de T, y la de G igual a la de C']
      ],
      desc: 'Cada par une una purina con una pirimidina, por eso el ancho de la hélice es constante. Los puentes de hidrógeno son débiles uno a uno, lo que permite separar las hebras cuando hace falta. Como cada base determina a su pareja, conocer una hebra basta para deducir la otra.',
      think: 'Si una hebra dice A T G C, ¿qué dice la hebra complementaria frente a ella?',
      view: { t: [0, 0.3, 0], p: [1.2, 2.2, 6.8] }, focus: ['base', 'puente'], letters: true
    },
    {
      id: 'antiparalelas', num: 6, n: 'Hebras antiparalelas', ref: 'Direcciones 5′→3′ y 3′→5′',
      rows: [
        ['Hebra 1', 'Va de 5′ (abajo) a 3′ (arriba)'],
        ['Hebra 2', 'Va de 5′ (arriba) a 3′ (abajo)'],
        ['Por qué importa', 'La ADN polimerasa solo alarga una hebra en dirección 5′→3′']
      ],
      desc: 'Las dos hebras corren en sentidos opuestos, como los dos carriles de una carretera. Las etiquetas 5′ y 3′ marcan los extremos de cada una.',
      think: 'Si una enzima solo avanza en un sentido, ¿cómo copiará las dos hebras a la vez? Lo verás en Procesos.',
      view: { t: [0, 0, 0], p: [0, 0.5, 17] }, show: ['extremos'], focus: ['esqueleto', 'fosfato', 'azucar']
    },
    {
      id: 'surcos', num: 7, n: 'Surco mayor y surco menor', ref: 'La forma de la hélice',
      rows: [
        ['Origen', 'Los azúcares de cada par no quedan enfrentados: dejan un lado más ancho que el otro'],
        ['Surco mayor', 'Más ancho y profundo; deja expuestos más bordes de las bases'],
        ['Surco menor', 'Más estrecho']
      ],
      desc: 'Muchas proteínas que regulan los genes reconocen una secuencia «leyendo» los bordes de las bases desde el surco mayor, sin necesidad de separar las hebras.',
      think: '¿Por qué sería útil poder leer la secuencia sin abrir la doble hélice?',
      view: { t: [0.4, 0, 0], p: [0.4, 0, 12] }, show: ['surcos']
    },
    {
      id: 'medidas', num: 8, n: 'Dimensiones', ref: 'ADN en forma B',
      rows: [
        ['Diámetro', '≈ 2 nm'],
        ['Entre pares', '≈ 0,34 nm'],
        ['Una vuelta', '≈ 10,5 pares y ≈ 3,6 nm. Muchos textos escolares redondean a 10 pares y 3,4 nm'],
        ['Escala', '1 unidad del modelo = 1 nm (una millonésima de milímetro)']
      ],
      desc: 'Una célula humana contiene en total unos 2 metros de ADN, repartidos en 46 cromosomas, y aun así cabe en un núcleo de pocos micrómetros porque se enrolla alrededor de proteínas llamadas histonas.',
      think: '¿Cuántas veces más largo que ancho es el tramo de 24 pares que ves en pantalla?',
      view: { t: [0, 0.3, 0], p: [0, 0.6, 17.5] }, show: ['medidas']
    },
    {
      id: 'historia', num: 9, n: 'El descubrimiento', ref: '1953',
      rows: [
        ['Modelo', 'James Watson y Francis Crick propusieron la doble hélice en la revista Nature, en abril de 1953'],
        ['Evidencia', 'Imágenes de difracción de rayos X de Rosalind Franklin y Raymond Gosling (la «Fotografía 51») y de Maurice Wilkins, y las reglas de Erwin Chargaff'],
        ['Nobel', 'Watson, Crick y Wilkins lo recibieron en 1962. Franklin había muerto en 1958 y el Nobel no se otorga de forma póstuma']
      ],
      desc: 'El modelo no surgió de un experimento propio de Watson y Crick, sino de reunir datos obtenidos por otros. El aporte de Franklin fue decisivo y se reconoció ampliamente recién décadas después.',
      think: '¿Qué muestra esta historia sobre cómo se construye el conocimiento científico?',
      view: { t: [0, 0, 0], p: [10, 3, 13.5] }
    }
  ],

  PROCESSES: [
    {
      id: 'replicacion', n: 'Replicación', ref: 'Cómo se copia el ADN',
      steps: [
        {
          n: 'El origen de replicación', ref: 'Antes de la división celular',
          rows: [
            ['Cuándo', 'Antes de que la célula se divida; en eucariontes, durante la fase S del ciclo celular'],
            ['Dónde', 'En puntos específicos de la molécula llamados orígenes de replicación']
          ],
          desc: 'Copiar el ADN permite que cada célula hija reciba la misma información. En una bacteria la copia suele comenzar en un único origen; en eucariontes, en miles de orígenes a la vez.',
          think: '¿Qué pasaría con las células hijas si la copia tuviera errores frecuentes?',
          stage: 0, view: { t: [0, 0, 0], p: [0, 1, 18] }
        },
        {
          n: 'La helicasa abre la hélice', ref: 'Se forma la horquilla de replicación',
          rows: [
            ['Helicasa', 'Rompe los puentes de hidrógeno y separa las dos hebras'],
            ['Horquilla', 'La zona en forma de Y donde la molécula se está abriendo'],
            ['Ayudantes', 'La topoisomerasa alivia la torsión por delante; otras proteínas mantienen separadas las hebras simples']
          ],
          desc: 'Cada hebra separada servirá de molde para fabricar una hebra nueva. Por eso se rompen los puentes de hidrógeno, débiles, y no el esqueleto.',
          think: '¿Por qué la helicasa rompe los puentes de hidrógeno y no los enlaces del esqueleto?',
          stage: 1, view: { t: [0, 1.2, 0], p: [0, 2, 18.5] }
        },
        {
          n: 'Cebador y ADN polimerasa', ref: 'Empieza la síntesis',
          rows: [
            ['Primasa', 'Fabrica un cebador: un tramo corto de ARN que sirve de punto de partida'],
            ['ADN polimerasa', 'Agrega nucleótidos complementarios al molde, siempre en dirección 5′→3′'],
            ['Precisión', 'Revisa los nucleótidos que agrega y corrige la mayoría de los errores']
          ],
          desc: 'La polimerasa no puede comenzar una hebra desde cero: necesita el cebador. En el molde de la izquierda avanza hacia la horquilla, siguiendo su apertura.',
          think: 'Si el molde dice T A C, ¿qué nucleótidos agregará la polimerasa?',
          stage: 2, view: { t: [-1.2, 1.6, 0], p: [-1.2, 2.2, 13.5] }
        },
        {
          n: 'Hebra continua y hebra discontinua', ref: 'Fragmentos de Okazaki',
          rows: [
            ['Continua (conductora)', 'Se sintetiza sin interrupciones, en el mismo sentido en que avanza la horquilla'],
            ['Discontinua (rezagada)', 'Se sintetiza en tramos cortos que se alejan de la horquilla: los fragmentos de Okazaki'],
            ['Ligasa', 'Une los fragmentos, después de que los cebadores de ARN se reemplazan por ADN']
          ],
          desc: 'Es la respuesta a la pregunta de las hebras antiparalelas: como la polimerasa solo avanza 5′→3′, en un molde puede seguir a la horquilla y en el otro tiene que trabajar a saltos.',
          think: '¿Cuál de las dos hebras nuevas necesita más cebadores? ¿Por qué?',
          stage: 3, view: { t: [0.3, 1.4, 0], p: [0.3, 2, 21.5] }
        },
        {
          n: 'Dos moléculas semiconservativas', ref: 'El resultado',
          rows: [
            ['Resultado', 'Dos moléculas de ADN con la misma secuencia que la original'],
            ['Cada una tiene', 'Una hebra original y una hebra nueva'],
            ['Evidencia', 'El experimento de Matthew Meselson y Franklin Stahl, publicado en 1958']
          ],
          desc: 'Por eso se dice que la replicación es semiconservativa: ninguna de las dos moléculas hijas es completamente nueva. Cada una se irá a una célula hija.',
          think: 'Después de dos rondas de replicación, ¿cuántas moléculas tendrán todavía una hebra original?',
          stage: 4, view: { t: [0, 0.2, 0], p: [0, 1.5, 21] }
        }
      ]
    }
  ]
};
