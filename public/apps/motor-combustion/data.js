/* ==========================================================
   Aula Visual — Motor de combustión interna · contenido
   Cada estación de la ruta define:
     n, short, ref, rows [[título, texto]], desc, think (pregunta),
     view { t: objetivo, p: posición de cámara } en cm,
     focus: categorías resaltadas (el resto se atenúa)
       'bloque' | 'culata' | 'piston' | 'biela' | 'ciguenal' | 'valvulas'
       'levas' | 'distribucion' | 'bujia' | 'volante' | 'gas'
     show: grupos auxiliares visibles  'nombres' | 'numeros' | 'pms' | 'medidas'
     range [a, b] y speed (°/s): tramo del ciclo que se repite (opcional)
   Ángulo del ciclo: 0° = PMS al inicio de la admisión; un ciclo = 720°
   (dos vueltas del cigüeñal). El ángulo es el del cilindro 1; los otros tres
   van desfasados según el orden de encendido 1-3-4-2.
   ========================================================== */
window.MOTOR_DATA = {
  STATIONS: [
    {
      id: 'general', num: null, n: 'El motor de cuatro tiempos', short: 'Vista general',
      ref: 'Motor de combustión interna',
      rows: [
        ['Qué es', 'Una máquina que quema combustible dentro de un cilindro y transforma la energía liberada en movimiento de rotación'],
        ['Dónde se usa', 'Automóviles, motos, cortadoras de pasto, generadores, lanchas y maquinaria agrícola'],
        ['En el modelo', 'Un motor de gasolina de cuatro cilindros en línea, con un corte en escalón: el cilindro 1 cortado de frente y los cilindros 2, 3 y 4 cortados de costado']
      ],
      desc: 'El motor repite sin parar un ciclo de cuatro tiempos: admisión, compresión, explosión y escape. Recorre la ruta en orden: primero las piezas, después cómo se coordinan y, al final, en la pestaña Procesos, el ciclo paso a paso y la diferencia con el motor diésel. El indicador de arriba muestra en qué tiempo va el cilindro 1 y, en la última línea, en qué tiempo va cada uno de los cuatro cilindros.',
      think: '¿Por qué se le llama motor de combustión «interna»? ¿Cómo sería uno de combustión externa?',
      view: { t: [0, 13, -16], p: [62, 40, 84] }, show: ['nombres']
    },
    {
      id: 'cilindro', num: 1, n: 'Cilindro y culata', ref: 'Donde ocurre la combustión',
      rows: [
        ['Cilindro', 'Un tubo de paredes lisas, labrado en el bloque del motor, por donde sube y baja el pistón'],
        ['Culata', 'La tapa del cilindro. Contiene los conductos de admisión y escape, las válvulas y la bujía'],
        ['Cámara', 'El espacio que queda entre el pistón y la culata cuando el pistón está arriba: ahí se enciende la mezcla']
      ],
      desc: 'El bloque y la culata son piezas separadas, unidas con pernos y con una junta entre ellas que sella la cámara. Las caras rojas muestran por dónde se cortó el modelo para ver su interior.',
      think: 'Si el cilindro no estuviera bien sellado, ¿qué pasaría con el empuje de los gases al quemarse?',
      view: { t: [0, 17, 0], p: [15, 23, 42] }, focus: ['bloque', 'culata', 'gas']
    },
    {
      id: 'piston', num: 2, n: 'El pistón', ref: 'Recibe el empuje de los gases',
      rows: [
        ['Función', 'Sube y baja dentro del cilindro: comprime la mezcla y recibe el empuje de los gases al quemarse'],
        ['Aros', 'Anillos metálicos en ranuras del pistón. Los de arriba sellan la cámara; el de abajo raspa el exceso de aceite de la pared'],
        ['Pasador', 'Un eje corto que une el pistón con la biela y le permite oscilar']
      ],
      desc: 'El pistón es la pieza que convierte la presión de los gases en fuerza. Como cambia de dirección miles de veces por minuto, se fabrica de aleación de aluminio, liviana y buena conductora del calor.',
      think: '¿Por qué conviene que el pistón sea liviano si cambia de dirección tantas veces por segundo?',
      view: { t: [0, 16, 0], p: [10, 19, 27] }, focus: ['piston', 'gas']
    },
    {
      id: 'biela', num: 3, n: 'Biela y cigüeñal', ref: 'De subir y bajar a girar',
      rows: [
        ['Biela', 'Une el pistón con el cigüeñal'],
        ['Cigüeñal', 'Un eje con un codo, la muñequilla. La biela empuja el codo y el eje gira, como la pierna empuja el pedal de una bicicleta'],
        ['PMS y PMI', 'Punto muerto superior e inferior: las posiciones extremas del pistón, donde se detiene un instante y cambia de dirección'],
        ['Carrera', 'El recorrido del pistón entre el PMS y el PMI: el doble del radio del codo']
      ],
      desc: 'Este mecanismo, llamado biela-manivela, convierte el movimiento de ida y vuelta del pistón en movimiento de rotación. Los contrapesos del cigüeñal equilibran el peso del codo y de la biela para que el motor vibre menos.',
      think: 'En el PMS, la biela y el codo quedan en línea recta. ¿Puede la biela hacer girar al cigüeñal en ese instante?',
      view: { t: [1.5, 10.5, 0], p: [15, 14, 48] }, show: ['pms'], focus: ['biela', 'ciguenal', 'piston']
    },
    {
      id: 'valvulas', num: 4, n: 'Válvulas de admisión y escape', ref: 'Las puertas del cilindro',
      rows: [
        ['Admisión', 'Deja entrar la mezcla de aire y combustible. Suele ser la más grande'],
        ['Escape', 'Deja salir los gases quemados'],
        ['Resorte', 'Mantiene cada válvula cerrada; la leva la empuja para abrirla']
      ],
      desc: 'Las válvulas se abren hacia el interior del cilindro y se cierran apoyándose en un asiento de la culata. Así, la presión de la combustión las aprieta todavía más contra el asiento. Mira el indicador: cada válvula se abre una sola vez por ciclo, es decir, una vez cada dos vueltas del cigüeñal.',
      think: '¿Por qué ninguna de las dos válvulas debe estar abierta durante la explosión?',
      view: { t: [0, 26, 0], p: [8, 30, 29] }, focus: ['valvulas', 'culata', 'gas']
    },
    {
      id: 'distribucion', num: 5, n: 'Levas y distribución', ref: 'Giran a la mitad de velocidad',
      rows: [
        ['Levas', 'Salientes de un eje que, al girar, empujan las válvulas en el momento justo. Cada árbol tiene una leva por cilindro, giradas entre sí'],
        ['Correa', 'Une el cigüeñal con los árboles de levas para que giren siempre sincronizados. En otros motores es una cadena o un tren de engranajes'],
        ['Relación 2 a 1', 'La polea de las levas tiene el doble de diámetro que la del cigüeñal: el cigüeñal da dos vueltas por cada vuelta de las levas']
      ],
      desc: 'Este conjunto se llama distribución porque reparte en el tiempo la apertura y el cierre de las válvulas. Si la correa se corta, el motor se detiene, y en muchos motores las válvulas pueden chocar con el pistón: por eso se cambia según el plan de mantenimiento del fabricante.',
      think: 'Si un ciclo completo dura dos vueltas del cigüeñal, ¿por qué las levas deben girar a la mitad de velocidad?',
      view: { t: [0, 16, -41], p: [-42, 26, -88] }, focus: ['levas', 'distribucion', 'valvulas']
    },
    {
      id: 'bujia', num: 6, n: 'La bujía', ref: 'El encendido',
      rows: [
        ['Qué hace', 'Produce una chispa eléctrica entre dos electrodos, dentro de la cámara'],
        ['Cuándo', 'Un poco antes de que el pistón llegue al PMS, al final de la compresión'],
        ['La mezcla', 'La gasolina se quema por completo con unos 14,7 kg de aire por cada kilogramo de combustible']
      ],
      desc: 'La chispa enciende la mezcla comprimida y la llama avanza por la cámara en milésimas de segundo. La chispa se adelanta porque la combustión tarda un poco en desarrollarse: así la presión máxima llega justo cuando el pistón empieza a bajar. En esta estación el motor repite lentamente ese momento.',
      think: '¿Qué pasaría con el empuje si la chispa saltara cuando el pistón ya va bajando?',
      view: { t: [0, 23.5, 0], p: [4, 26, 19] }, focus: ['bujia', 'gas'], range: [300, 420], speed: 30
    },
    {
      id: 'volante', num: 7, n: 'El volante de inercia', ref: 'Suaviza el giro',
      rows: [
        ['El problema', 'En cada cilindro, de los cuatro tiempos solo la explosión entrega energía; los otros tres la consumen'],
        ['La solución', 'Un disco pesado unido al cigüeñal que acumula energía cinética y mantiene el giro entre una explosión y la siguiente'],
        ['Corona', 'El borde dentado donde engrana el motor de arranque para poner en marcha el motor']
      ],
      desc: 'El volante empuja al cigüeñal entre una explosión y la siguiente. Con un solo cilindro tendría que hacerlo durante una vuelta y media; con cuatro, las explosiones se turnan y el empuje es mucho más parejo, así que el volante puede ser más liviano.',
      think: 'Con un solo cilindro hay una explosión cada dos vueltas del cigüeñal. ¿Cada cuánto hay una explosión en este motor de cuatro cilindros?',
      view: { t: [0, 1, -44], p: [-26, 8, -70] }, focus: ['volante', 'ciguenal']
    },
    {
      id: 'cilindros', num: 8, n: 'Cuatro cilindros en línea', ref: 'Orden de encendido 1-3-4-2',
      rows: [
        ['Disposición', 'Cuatro cilindros iguales, uno detrás del otro, que mueven un mismo cigüeñal'],
        ['Cigüeñal', 'Tiene un codo por cilindro. Los pistones 1 y 4 suben y bajan juntos; el 2 y el 3, también, pero al revés que el 1 y el 4'],
        ['Orden de encendido', '1-3-4-2: cada media vuelta del cigüeñal hay una explosión en un cilindro distinto'],
        ['En cada instante', 'Cada cilindro está en un tiempo distinto: uno aspira, otro comprime, otro empuja y otro expulsa']
      ],
      desc: 'Mira el corte de costado y la última línea del indicador: los colores del gas muestran en qué tiempo va cada cilindro. Si el 1 y el 4 se encendieran juntos, el empuje llegaría de a dos y el motor vibraría más; el orden 1-3-4-2 reparte las explosiones de forma pareja y equilibrada a lo largo del cigüeñal.',
      think: 'Los pistones 1 y 4 bajan al mismo tiempo. Si el cilindro 1 está en explosión, ¿en qué tiempo está el cilindro 4?',
      view: { t: [0, 12, -21], p: [104, 34, -6] }, show: ['numeros'], focus: ['piston', 'biela', 'ciguenal', 'gas', 'bloque', 'culata']
    },
    {
      id: 'medidas', num: 9, n: 'Cilindrada y compresión', ref: 'Los números de un motor',
      rows: [
        ['Diámetro y carrera', '8 cm y 8 cm en este modelo'],
        ['Cilindrada', 'El volumen que barre un pistón entre el PMI y el PMS: π × (4 cm)² × 8 cm ≈ 402 cm³. Los cuatro cilindros suman ≈ 1608 cm³: es un motor de 1,6 litros'],
        ['Compresión', 'Volumen total dividido por el volumen de la cámara: (402 + 45) ÷ 45 ≈ 10. Se escribe 10:1'],
        ['Escala', '1 unidad del modelo = 1 cm']
      ],
      desc: 'La cilindrada indica cuánta mezcla aspira el motor en cada ciclo y se relaciona con la potencia que puede entregar. La relación de compresión indica cuánto se aprieta la mezcla antes de encenderla: comprimir más aprovecha mejor el combustible, pero en un motor de gasolina demasiada compresión hace que la mezcla se encienda sola antes de tiempo.',
      think: 'Si la cámara de combustión fuera más pequeña, ¿la relación de compresión aumentaría o disminuiría?',
      view: { t: [2.5, 15, 0], p: [4, 17, 48] }, show: ['medidas']
    },
    {
      id: 'energia', num: 10, n: 'De la energía química al movimiento', ref: 'Transformaciones de la energía',
      rows: [
        ['Química → térmica', 'Al quemarse, el combustible libera la energía guardada en sus enlaces químicos y los gases se calientan'],
        ['Térmica → mecánica', 'Los gases calientes se expanden, empujan el pistón y hacen girar el cigüeñal'],
        ['Pérdidas', 'Gran parte de la energía sale como calor por el escape y el sistema de refrigeración'],
        ['Rendimiento', 'Con compresión 10:1, el límite del ciclo ideal es cercano al 60 %. Un motor de gasolina real aprovecha bastante menos: del orden de 30 % a 40 % en su mejor punto de funcionamiento']
      ],
      desc: 'Ningún motor térmico puede transformar todo el calor en trabajo: siempre debe entregar parte del calor a un ambiente más frío. Es lo que establece la segunda ley de la termodinámica.',
      think: 'Si un motor aprovecha un tercio de la energía del combustible, ¿qué pasa con los otros dos tercios? ¿Dónde los podrías sentir?',
      view: { t: [0, 16, 0], p: [18, 20, 44] }
    },
    {
      id: 'historia', num: 11, n: 'Otto, Benz y Diesel', ref: '1862–1897',
      rows: [
        ['El principio', 'Alphonse Beau de Rochas describió el ciclo de cuatro tiempos en 1862'],
        ['Primer motor', 'Nikolaus Otto construyó el primer motor práctico de cuatro tiempos en 1876, en la fábrica Deutz, en Alemania. Por eso se habla del ciclo Otto'],
        ['Automóvil', 'Karl Benz patentó en 1886 un vehículo movido por un motor de cuatro tiempos'],
        ['Diésel', 'Rudolf Diesel solicitó en 1892 la patente de un motor encendido por compresión; el primero que funcionó bien estuvo listo en 1897']
      ],
      desc: 'Antes del motor de combustión interna, las máquinas de vapor quemaban el combustible fuera del cilindro, en una caldera. Llevar la combustión al interior del cilindro permitió motores mucho más pequeños y livianos, capaces de mover un vehículo.',
      think: '¿Qué ventajas y qué problemas trajo para las ciudades el uso masivo de motores de combustión?',
      view: { t: [0, 15, -1], p: [-26, 22, 48] }
    }
  ],

  PROCESSES: [
    {
      id: 'otto', n: 'Ciclo de cuatro tiempos', ref: 'Motor de gasolina (ciclo Otto)', mode: 'otto',
      steps: [
        {
          n: 'Admisión', ref: '1.er tiempo · el pistón baja',
          rows: [
            ['Pistón', 'Baja del PMS al PMI'],
            ['Válvulas', 'Admisión abierta, escape cerrada'],
            ['Qué pasa', 'Al bajar, el pistón deja un espacio que se llena con mezcla de aire y gasolina']
          ],
          desc: 'El pistón actúa como el émbolo de una jeringa: al bajar, la presión en el cilindro disminuye y la mezcla entra desde el conducto de admisión.',
          think: '¿Qué tiene en común este tiempo con tirar del émbolo de una jeringa?',
          range: [0, 180], view: { t: [0, 20, 0], p: [7, 23, 47] }
        },
        {
          n: 'Compresión', ref: '2.º tiempo · el pistón sube',
          rows: [
            ['Pistón', 'Sube del PMI al PMS'],
            ['Válvulas', 'Las dos cerradas'],
            ['Qué pasa', 'La mezcla queda encerrada y se comprime a una décima parte de su volumen. Al comprimirse, se calienta']
          ],
          desc: 'Comprimir la mezcla antes de encenderla hace que la combustión empuje con mucha más fuerza y aprovecha mejor el combustible. El tiempo termina justo antes de que salte la chispa.',
          think: 'Al inflar una pelota, el bombín se calienta. ¿Qué tiene que ver eso con este tiempo?',
          range: [180, 348], view: { t: [0, 20, 0], p: [7, 23, 47] }
        },
        {
          n: 'Explosión', ref: '3.er tiempo · el único que entrega trabajo',
          rows: [
            ['Encendido', 'La bujía hace saltar la chispa y la mezcla se quema muy rápido'],
            ['Pistón', 'Los gases calientes aumentan su presión y empujan el pistón hacia abajo'],
            ['Válvulas', 'Las dos cerradas']
          ],
          desc: 'Se le dice explosión, pero es una combustión muy rápida y controlada que avanza desde la bujía. Si la mezcla estallara de golpe, lo que se llama detonación (el «cascabeleo» del motor), dañaría el pistón. Este tiempo también se llama expansión o trabajo.',
          think: '¿De dónde sale la energía para mover el pistón en los otros tres tiempos?',
          range: [340, 540], view: { t: [0, 20, 0], p: [7, 23, 47] }
        },
        {
          n: 'Escape', ref: '4.º tiempo · el pistón sube',
          rows: [
            ['Pistón', 'Sube del PMI al PMS'],
            ['Válvulas', 'Escape abierta, admisión cerrada'],
            ['Qué pasa', 'El pistón empuja los gases quemados hacia el tubo de escape']
          ],
          desc: 'La válvula de escape se abre un poco antes de que el pistón llegue abajo, para aprovechar la presión que queda en los gases. Al final del escape, las dos válvulas quedan abiertas un instante a la vez: es el cruce de válvulas, que ayuda a vaciar y llenar mejor el cilindro.',
          think: '¿Por qué conviene sacar los gases quemados antes de que entre mezcla nueva?',
          range: [540, 720], view: { t: [0, 20, 0], p: [7, 23, 47] }
        },
        {
          n: 'El ciclo completo', ref: 'Dos vueltas del cigüeñal',
          rows: [
            ['Duración', 'Dos vueltas del cigüeñal: media vuelta por tiempo'],
            ['Trabajo', 'En cada cilindro, un solo tiempo empuja: el de explosión'],
            ['Cuatro cilindros', 'Las explosiones se turnan en orden 1-3-4-2: hay una en cada media vuelta del cigüeñal'],
            ['En la realidad', 'A 3000 revoluciones por minuto, cada cilindro completa 25 ciclos por segundo']
          ],
          desc: 'En el modelo, un ciclo dura unos ocho segundos para poder seguirlo. Observa cómo se coordinan el pistón, las válvulas, las levas y la bujía del cilindro 1, y gira la vista hacia el costado para ver a los otros tres cilindros trabajando por turnos.',
          think: 'A 3000 revoluciones por minuto, ¿cuántas veces salta la chispa de la bujía en un minuto?',
          range: [0, 720], loop: true, view: { t: [0, 14, -14], p: [48, 30, 62] }
        }
      ]
    },
    {
      id: 'diesel', n: 'Motor diésel', ref: 'Encendido por compresión', mode: 'diesel',
      steps: [
        {
          n: 'Admisión de aire', ref: '1.er tiempo · el pistón baja',
          rows: [
            ['Qué entra', 'Solo aire, sin combustible'],
            ['Válvulas', 'Admisión abierta, escape cerrada'],
            ['Encendido', 'No tiene bujía: en su lugar hay un inyector']
          ],
          desc: 'Las piezas son las mismas que en el motor de gasolina: pistón, biela, cigüeñal, válvulas y levas. La gran diferencia está en cómo se enciende el combustible.',
          think: '¿Qué pieza del motor de gasolina no aparece en este motor?',
          range: [0, 180], view: { t: [0, 20, 0], p: [7, 23, 47] }
        },
        {
          n: 'Compresión fuerte', ref: '2.º tiempo · el aire se calienta',
          rows: [
            ['Compresión', 'Mucho mayor que en un motor de gasolina: suele estar entre 14:1 y 22:1, según el motor'],
            ['Temperatura', 'El aire comprimido se calienta a varios cientos de grados Celsius'],
            ['Válvulas', 'Las dos cerradas']
          ],
          desc: 'Al comprimir tanto el aire, queda más caliente que la temperatura a la que el gasóleo se enciende solo. El color del aire en el cilindro representa ese calentamiento.',
          think: '¿Por qué un motor diésel puede comprimir tanto y uno de gasolina no?',
          range: [180, 346], view: { t: [0, 20, 0], p: [7, 23, 47] }
        },
        {
          n: 'Inyección y autoencendido', ref: '3.er tiempo · sin chispa',
          rows: [
            ['Inyector', 'Rocía gasóleo a muy alta presión dentro del aire caliente'],
            ['Encendido', 'El combustible se enciende solo al contacto con el aire caliente'],
            ['Pistón', 'Los gases empujan el pistón hacia abajo, igual que en el motor de gasolina']
          ],
          desc: 'Como el combustible entra recién al final de la compresión, no hay riesgo de que se encienda antes de tiempo. Por eso el diésel puede usar compresiones altas y aprovecha mejor el combustible que un motor de gasolina.',
          think: 'Si no hay chispa, ¿qué decide el momento exacto del encendido en un diésel?',
          range: [338, 540], view: { t: [0, 20, 0], p: [7, 23, 47] }
        },
        {
          n: 'Escape', ref: '4.º tiempo · el pistón sube',
          rows: [
            ['Pistón', 'Sube y empuja los gases quemados'],
            ['Válvulas', 'Escape abierta, admisión cerrada'],
            ['Comparación', 'Más fuerza a bajas revoluciones y menor consumo, pero un motor más pesado, con emisiones de partículas y óxidos de nitrógeno que exigen filtros y catalizadores']
          ],
          desc: 'Por estas características, los motores diésel se usan sobre todo en camiones, buses, barcos, tractores y generadores.',
          think: '¿Por qué crees que los buses y camiones usan casi siempre motores diésel?',
          range: [540, 720], view: { t: [0, 20, 0], p: [7, 23, 47] }
        }
      ]
    }
  ]
};
