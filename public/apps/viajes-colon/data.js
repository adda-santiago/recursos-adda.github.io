/* ==========================================================
   Aula Visual — Los viajes de Colón · contenido
   Coordenadas en grados [latitud, longitud] (WGS84).
   Las rutas en alta mar son trazados aproximados: los diarios
   dan rumbos y distancias estimadas, no posiciones medidas.

   STATIONS (ruta de aprendizaje): n, short, ref, rows, desc, think,
     view: [[sur, oeste], [norte, este]]  encuadre del mapa
     voyages: viajes visibles ('v1'…'v4'); show: capas auxiliares
       'portugal' | 'cipango' | 'vientos' | 'tordesillas' | 'nombres'
   AUX.*.points admiten dir ('right' | 'bottom') para la etiqueta
   VOYAGES (pestaña Viajes): cada paso define
     n (lugar), colon (nombre que le dio Colón), ref (fecha), p [lat,lng],
     via (puntos intermedios desde el paso anterior), vuelta (tramo de regreso),
     rows, desc, think (opcional)
   ========================================================== */
window.COLON_DATA = {
  VOYAGES: [
    {
      id: 'v1', n: 'Primer viaje', ref: '1492–1493', color: 'var(--v1)', barcos: 3,
      steps: [
        {
          n: 'Palos de la Frontera', ref: '3 de agosto de 1492', p: [37.215, -6.93],
          rows: [
            ['Barcos', 'La nao Santa María y las carabelas Pinta y Niña'],
            ['Tripulación', 'Unos 90 hombres, la mayoría marineros de la zona'],
            ['Capitanes', 'Colón en la Santa María; Martín Alonso Pinzón en la Pinta; Vicente Yáñez Pinzón en la Niña']
          ],
          desc: 'Zarpó al amanecer desde el río Tinto. En las Capitulaciones de Santa Fe, firmadas en abril, los Reyes Católicos le prometieron los títulos de almirante, virrey y gobernador de las tierras que encontrara, y una parte de sus ganancias.'
        },
        {
          n: 'Islas Canarias', ref: '9 de agosto – 6 de septiembre de 1492', p: [28.09, -17.11],
          via: [[33.2, -10.5], [28.3, -15.3]],
          rows: [
            ['Escala', 'Reparar el timón de la Pinta y cambiar las velas latinas de la Niña por velas cuadradas'],
            ['Salida', 'El 6 de septiembre desde La Gomera, la última isla castellana']
          ],
          desc: 'Canarias era el punto de partida lógico: está en la latitud donde los vientos alisios soplan hacia el oeste. Aquí cargaron agua, leña y víveres para la travesía.'
        },
        {
          n: 'En alta mar', ref: 'Septiembre y octubre de 1492', p: [26.6, -55],
          via: [[28, -30], [27.8, -42]],
          rows: [
            ['Duración', 'Más de cinco semanas sin ver tierra'],
            ['Tensión', 'La tripulación temía no poder volver; a comienzos de octubre estuvo cerca de amotinarse'],
            ['Señales', 'Aves, ramas y grandes manchas de algas flotantes: el mar de los Sargazos']
          ],
          desc: 'Según su diario, Colón anotaba para la tripulación menos leguas de las que creía recorrer, para que la distancia a casa no pareciera tan grande. El 7 de octubre giró al suroeste siguiendo el vuelo de bandadas de aves.',
          think: 'Si fueras uno de los marineros, ¿qué te habría hecho seguir adelante después de un mes sin ver tierra?'
        },
        {
          n: 'Guanahaní', colon: 'San Salvador', ref: '12 de octubre de 1492', p: [24.06, -74.48],
          via: [[25.4, -66], [24.6, -71]],
          rows: [
            ['Avistamiento', 'De madrugada, desde la Pinta; la tradición lo atribuye a Rodrigo de Triana'],
            ['Habitantes', 'Lucayos, un pueblo taíno de las Bahamas'],
            ['Cuál isla', 'Se discute; la más aceptada es la actual San Salvador, en Bahamas']
          ],
          desc: 'Colón tomó posesión de la isla en nombre de los reyes ante sus habitantes, que no podían entender la ceremonia. Después recorrió otras islas de las Bahamas preguntando por oro, y los lucayos le señalaron tierras grandes al sur.'
        },
        {
          n: 'Cuba', colon: 'Juana', ref: '28 de octubre de 1492', p: [21.1, -75.65],
          via: [[23.65, -74.85], [23.2, -75.1], [22.7, -74.3], [22.2, -75.3]],
          rows: [
            ['Llegada', 'Bahía de Bariay, en el oriente de Cuba'],
            ['Lo que creyó', 'Que era tierra firme de Asia; envió a dos hombres a buscar al Gran Kan'],
            ['Lo que vieron', 'Aldeas taínas y personas que fumaban hojas enrolladas: el tabaco']
          ],
          desc: 'El 21 de noviembre Martín Alonso Pinzón se separó con la Pinta para explorar por su cuenta. Colón siguió con dos barcos.'
        },
        {
          n: 'La Española', colon: 'La Española', ref: '6 de diciembre de 1492', p: [19.82, -73.4],
          via: [[21.3, -76.2], [21.0, -75.0], [20.25, -74.15]],
          rows: [
            ['Nombre', 'La llamó La Española por su parecido con el paisaje de Castilla'],
            ['Habitantes', 'Taínos organizados en cacicazgos; el cacique Guacanagarí lo recibió en paz'],
            ['Oro', 'Vio adornos de oro, lo que lo convenció de que la empresa podía pagarse']
          ],
          desc: 'La Española, hoy dividida entre Haití y República Dominicana, se convertiría en el centro de la presencia española en el Caribe.'
        },
        {
          n: 'La Navidad', ref: '25 de diciembre de 1492', p: [19.72, -72.17],
          via: [[20.0, -72.8]],
          rows: [
            ['Naufragio', 'La Santa María encalló en un arrecife en la noche de Navidad'],
            ['Fuerte', 'Con su madera se levantó un fuerte, donde quedaron 39 hombres'],
            ['Ayuda', 'La gente de Guacanagarí ayudó a rescatar la carga']
          ],
          desc: 'Fue el primer asentamiento europeo de este período en América. Colón no podía llevar a todos de vuelta en la Niña, y decidió que esperaran su regreso buscando oro.',
          think: 'Colón dejó a 39 hombres en una isla que no conocía, entre personas cuya lengua no hablaban. ¿Qué podía salir mal?'
        },
        {
          n: 'Samaná', colon: 'Golfo de las Flechas', ref: '13 de enero de 1493', p: [19.2, -69.4],
          via: [[19.95, -71.3], [19.8, -70.2]],
          rows: [
            ['Reencuentro', 'La Pinta se había reunido con Colón el 6 de enero'],
            ['Choque', 'Primer enfrentamiento armado con habitantes del lugar, los ciguayos'],
            ['Partida', 'El 16 de enero zarparon de regreso a Castilla']
          ],
          desc: 'Por las flechas del encuentro, Colón llamó al lugar Golfo de las Flechas. Hoy es la bahía de Samaná, en República Dominicana.'
        },
        {
          n: 'Azores', ref: '18 de febrero de 1493', p: [36.97, -25.1], vuelta: true,
          via: [[24.5, -65], [33, -58], [37.5, -45], [37.4, -32]],
          rows: [
            ['Rumbo', 'Subió al norte buscando los vientos del oeste, que soplan hacia Europa'],
            ['Tormenta', 'El 14 de febrero una tormenta separó a la Niña y la Pinta'],
            ['Escala', 'Isla de Santa María, de Portugal; parte de la tripulación fue detenida unos días']
          ],
          desc: 'En plena tormenta, Colón escribió un relato del viaje, lo selló en un barril y lo arrojó al mar, por si el barco se hundía y nadie llegaba a contarlo.'
        },
        {
          n: 'Lisboa', ref: '4 de marzo de 1493', p: [38.69, -9.21], vuelta: true,
          via: [[38.2, -17], [38.9, -11]],
          rows: [
            ['Por qué Lisboa', 'Otra tormenta obligó a la Niña a refugiarse en Portugal'],
            ['Encuentro', 'El rey Juan II lo recibió y sostuvo que las tierras correspondían a Portugal'],
            ['Consecuencia', 'La disputa llevó a las bulas papales de 1493 y al Tratado de Tordesillas']
          ],
          desc: 'Portugal tenía, desde el Tratado de Alcáçovas de 1479, el derecho a navegar al sur de Canarias. Juan II pensó que las islas de Colón caían en su zona.'
        },
        {
          n: 'Regreso a Palos', ref: '15 de marzo de 1493', p: [37.215, -6.93], vuelta: true,
          via: [[37.0, -9.2], [36.9, -7.6]],
          rows: [
            ['Llegada', 'La Niña entró a Palos; la Pinta llegó horas después'],
            ['Después', 'En abril, los reyes lo recibieron en Barcelona; llevaba taínos, aves, plantas y algo de oro'],
            ['Resultado', 'Se preparó de inmediato un segundo viaje, mucho mayor']
          ],
          desc: 'Martín Alonso Pinzón murió pocos días después de llegar. La noticia del viaje se difundió por Europa en una carta de Colón impresa ese mismo año.'
        }
      ]
    },
    {
      id: 'v2', n: 'Segundo viaje', ref: '1493–1496', color: 'var(--v2)', barcos: 17,
      steps: [
        {
          n: 'Cádiz', ref: '25 de septiembre de 1493', p: [36.53, -6.3],
          rows: [
            ['Flota', '17 barcos'],
            ['Gente', 'Entre 1.200 y 1.500 personas, según las fuentes'],
            ['Carga', 'Caballos, vacas, cerdos, semillas, caña de azúcar y herramientas']
          ],
          desc: 'Ya no era una exploración: era una flota para poblar, gobernar y comerciar. Viajaban soldados, artesanos, religiosos y funcionarios de la Corona.'
        },
        {
          n: 'El Hierro', ref: '13 de octubre de 1493', p: [27.75, -18.0],
          via: [[32, -10], [28.1, -17.1]],
          rows: [
            ['Escala', 'La Gomera y El Hierro, en Canarias'],
            ['Rumbo', 'Más al sur que en el primer viaje']
          ],
          desc: 'Al bajar más al sur, Colón aprovechó mejor los alisios y llegó al Caribe por las islas que forman su borde oriental.'
        },
        {
          n: 'Dominica', colon: 'Dominica', ref: '3 de noviembre de 1493', p: [15.42, -61.35],
          via: [[24, -35], [18, -52]],
          rows: [
            ['Travesía', 'Unas tres semanas, mucho más rápida que la primera'],
            ['Nombre', 'La llamó Dominica porque llegaron un domingo'],
            ['Entrada', 'Por las Antillas Menores, el arco de islas del este del Caribe']
          ],
          desc: 'Desde aquí la flota fue de isla en isla hacia el noroeste, poniéndoles nombres: Marigalante, Guadalupe, Montserrat, Antigua, Nevis, San Cristóbal.'
        },
        {
          n: 'Guadalupe', colon: 'Santa María de Guadalupe', ref: '4 de noviembre de 1493', p: [16.17, -61.67],
          via: [[15.93, -61.27]],
          rows: [
            ['Habitantes', 'Kalinagos, a quienes los europeos llamaron caribes'],
            ['La imagen', 'Los españoles los describieron como caníbales y feroces'],
            ['Uso de esa imagen', 'Más tarde sirvió para justificar su esclavización']
          ],
          desc: 'Gran parte de lo que se sabe de los kalinagos de esta época viene de relatos europeos, escritos por quienes estaban en conflicto con ellos. Por eso los historiadores leen esas descripciones con cautela.'
        },
        {
          n: 'Santa Cruz', colon: 'Santa Cruz', ref: '14 de noviembre de 1493', p: [17.75, -64.7],
          via: [[16.75, -62.2], [17.15, -62.6], [17.3, -62.75]],
          rows: [
            ['Combate', 'Un enfrentamiento con kalinagos dejó muertos de ambos lados'],
            ['Después', 'Pasó por un archipiélago que llamó Once Mil Vírgenes: las islas Vírgenes']
          ],
          desc: 'Hoy la isla se llama Saint Croix y pertenece a las Islas Vírgenes de Estados Unidos.'
        },
        {
          n: 'Puerto Rico', colon: 'San Juan Bautista', ref: '19 de noviembre de 1493', p: [18.35, -67.25],
          via: [[18.4, -64.6], [17.95, -65.8], [17.95, -67.1]],
          rows: [
            ['Nombre taíno', 'Borinquén'],
            ['Estadía', 'Dos días en la costa oeste para cargar agua']
          ],
          desc: 'La conquista de Puerto Rico comenzó en 1508, con Juan Ponce de León. En este viaje fue solo una escala.'
        },
        {
          n: 'La Navidad, destruida', ref: '28 de noviembre de 1493', p: [19.72, -72.17],
          via: [[18.5, -68.3], [19.3, -69.1], [19.95, -70.7]],
          rows: [
            ['Lo que encontró', 'El fuerte quemado y ninguno de los 39 hombres con vida'],
            ['Versión de Guacanagarí', 'Que los había atacado el cacique Caonabo'],
            ['Causa probable', 'Los hombres se habían dividido y habían abusado de la población taína']
          ],
          desc: 'Fue la primera señal de que la convivencia no sería pacífica. Colón decidió fundar la nueva población en otro lugar.',
          think: 'Las fuentes de este episodio son españolas. ¿Cómo crees que lo habrían contado los taínos?'
        },
        {
          n: 'La Isabela', ref: 'Enero de 1494', p: [19.885, -71.08],
          via: [[19.95, -71.7]],
          rows: [
            ['Fundación', 'Primera villa española en América'],
            ['Problemas', 'Enfermedades, escasez de alimentos y mucho menos oro del esperado'],
            ['Interior', 'Colón exploró el valle del Cibao buscando minas']
          ],
          desc: 'Doce barcos volvieron pronto a Castilla con noticias y pedidos de víveres. Muchos colonos se sintieron engañados: no había riquezas fáciles.'
        },
        {
          n: 'Jamaica', colon: 'Santiago', ref: '5 de mayo de 1494', p: [18.44, -77.2],
          via: [[19.95, -72.8], [20.15, -74.2], [19.9, -75.1], [19.0, -76.3]],
          rows: [
            ['Ruta', 'Bordeó el oriente de Cuba y bajó al sur'],
            ['Recepción', 'Los taínos de Jamaica salieron en canoas a impedir el desembarco']
          ],
          desc: 'Colón buscaba la isla de oro de la que le habían hablado los taínos de Cuba. Encontró una isla poblada, pero no las riquezas que esperaba.'
        },
        {
          n: 'Costa sur de Cuba', ref: '12 de junio de 1494', p: [22.0, -82.6],
          via: [[19.85, -77.7], [20.6, -78.6], [21.4, -80.0], [21.75, -81.3]],
          rows: [
            ['Ruta', 'Siguió la costa sur de Cuba hacia el oeste'],
            ['Juramento', 'Hizo declarar a la tripulación ante notario que Cuba era tierra firme, no una isla'],
            ['Realidad', 'Cuba es una isla; se confirmó al rodearla en 1508']
          ],
          desc: 'Si Cuba era tierra firme, Colón podía sostener que había llegado al continente asiático. Dio la vuelta muy cerca del extremo occidental de la isla.',
          think: '¿Por qué le importaba tanto a Colón que Cuba fuera un continente y no una isla?'
        },
        {
          n: 'Regreso a La Isabela', ref: '29 de septiembre de 1494', p: [19.885, -71.08],
          via: [[20.4, -78.6], [17.9, -77.0], [18.0, -74.4], [18.1, -71.0], [18.15, -68.6], [19.3, -69.1], [19.95, -70.7]],
          rows: [
            ['Estado', 'Colón volvió enfermo, tras bordear Jamaica y el sur de La Española'],
            ['Gobierno', 'Su hermano Bartolomé había quedado a cargo'],
            ['Conflictos', 'Rebeliones de colonos, guerra con los cacicazgos y un tributo en oro impuesto a los taínos']
          ],
          desc: 'En estos años se tomaron cientos de taínos como esclavos y algunos fueron enviados a Castilla. La reina Isabel ordenó más tarde que fueran liberados.'
        },
        {
          n: 'Regreso a Cádiz', ref: '11 de junio de 1496', p: [36.53, -6.3], vuelta: true,
          via: [[18.6, -68.2], [16.2, -61.7], [22, -50], [32, -32], [36.4, -15]],
          rows: [
            ['Salida', '10 de marzo de 1496, con dos barcos'],
            ['Travesía', 'Lenta y con hambre: salió por el sur, contra los alisios'],
            ['Motivo', 'Defenderse en la corte de las quejas contra su gobierno']
          ],
          desc: 'El viaje de vuelta mostró por qué conviene volver por el norte: tardó tres meses, contra los dos del primer regreso, que fue por el norte.'
        }
      ]
    },
    {
      id: 'v3', n: 'Tercer viaje', ref: '1498–1500', color: 'var(--v3)', barcos: 6,
      steps: [
        {
          n: 'Sanlúcar de Barrameda', ref: '30 de mayo de 1498', p: [36.78, -6.36],
          rows: [
            ['Flota', '6 barcos'],
            ['Objetivo', 'Buscar tierras más al sur, donde se creía que había más oro'],
            ['Mientras tanto', 'Ese mismo mes, Vasco da Gama llegaba a la India rodeando África']
          ],
          desc: 'Costó reunir tripulantes: las noticias de La Española no eran buenas. Parte de los pasajeros eran condenados a quienes se conmutó la pena por viajar.'
        },
        {
          n: 'Madeira y Canarias', ref: 'Junio de 1498', p: [28.09, -17.11],
          via: [[33.0, -16.4]],
          rows: [
            ['División', 'Tres barcos fueron directo a La Española con víveres'],
            ['Colón', 'Siguió al sur con los otros tres']
          ],
          desc: 'La flota pasó por Porto Santo y Madeira antes de llegar a La Gomera.'
        },
        {
          n: 'Cabo Verde', ref: 'Fines de junio de 1498', p: [14.93, -23.51],
          via: [[16.1, -22.8]],
          rows: [
            ['Qué era', 'Una colonia portuguesa y un centro del comercio de personas esclavizadas de África'],
            ['Rumbo', 'Desde aquí navegó al suroeste, hacia el ecuador']
          ],
          desc: 'Colón quería comprobar si al sur, en la latitud de las costas africanas con oro, había tierras al otro lado del océano.'
        },
        {
          n: 'Las calmas', ref: 'Julio de 1498', p: [8.6, -33],
          via: [[10.5, -28]],
          rows: [
            ['Qué pasó', 'Días sin viento, con un calor que echó a perder el agua y los alimentos'],
            ['Por qué', 'Cerca del ecuador los vientos se debilitan: es la zona de calmas ecuatoriales']
          ],
          desc: 'Colón escribió que temió que se quemaran los barcos. Cuando volvió el viento, puso rumbo al oeste.',
          think: 'Compara este tramo con la flecha de los alisios. ¿Por qué el tercer viaje fue mucho más difícil que el segundo?'
        },
        {
          n: 'Trinidad', colon: 'Trinidad', ref: '31 de julio de 1498', p: [10.08, -61.0],
          via: [[9.6, -45], [9.9, -55]],
          rows: [
            ['Nombre', 'Por tres montes que se veían desde el mar'],
            ['Paso', 'Entró al golfo de Paria por un estrecho de corrientes violentas']
          ],
          desc: 'El agua del golfo era casi dulce. Colón pensó que un río tan grande no podía venir de una isla.'
        },
        {
          n: 'Península de Paria', colon: 'Isla de Gracia', ref: 'Comienzos de agosto de 1498', p: [10.66, -61.93],
          via: [[10.15, -61.9]],
          rows: [
            ['Hito', 'Primer desembarco de Colón en tierra firme de América'],
            ['Lo que creyó', 'Primero, que era una isla; después, que era una tierra enorme'],
            ['Perlas', 'Los habitantes llevaban perlas, lo que atrajo después otras expediciones']
          ],
          desc: 'El caudal del Orinoco lo llevó a escribir que estaba ante una tierra muy grande, quizá cerca del Paraíso terrenal. Aun así, siguió creyendo que todo era parte de Asia.'
        },
        {
          n: 'Margarita', colon: 'Margarita', ref: '15 de agosto de 1498', p: [11.0, -63.9],
          via: [[10.72, -61.75], [10.85, -62.6]],
          rows: [
            ['Salida', 'Por la Boca del Dragón, otro estrecho peligroso'],
            ['Nombre', 'Margarita significa perla en latín']
          ],
          desc: 'Colón estaba enfermo de los ojos y apurado por llegar a La Española. No exploró la costa de perlas, que otros aprovecharon al año siguiente.'
        },
        {
          n: 'Santo Domingo', ref: '31 de agosto de 1498', p: [18.47, -69.89],
          via: [[13.2, -66.5], [16.6, -68.6]],
          rows: [
            ['La ciudad', 'Nueva capital, fundada por su hermano Bartolomé hacia 1496–1498'],
            ['Lo que encontró', 'Una rebelión de colonos encabezada por Francisco Roldán']
          ],
          desc: 'Para calmar la rebelión, Colón repartió tierras y taínos a los colonos para que trabajaran para ellos. Fue el antecedente del sistema de encomiendas.'
        },
        {
          n: 'Colón, detenido', ref: 'Agosto–octubre de 1500', p: [18.47, -69.89],
          rows: [
            ['Investigador', 'Francisco de Bobadilla, enviado por los reyes por las quejas contra Colón'],
            ['Arresto', 'Colón y sus hermanos fueron enviados a Castilla con grilletes'],
            ['Cargos', 'Mal gobierno y castigos crueles, también contra colonos españoles']
          ],
          desc: 'El descubridor de las tierras volvía preso desde ellas. Es uno de los giros más fuertes de su vida.',
          think: '¿Por qué crees que los reyes enviaron a un investigador en vez de confiar en el informe del propio Colón?'
        },
        {
          n: 'Regreso a Cádiz', ref: 'Fines de 1500', p: [36.53, -6.3], vuelta: true,
          via: [[24, -62], [33, -46], [37, -28], [37, -12]],
          rows: [
            ['Llegada', 'Encadenado, por decisión propia, hasta ver a los reyes'],
            ['Los reyes', 'Lo liberaron y le devolvieron sus bienes, pero no el gobierno de La Española'],
            ['Sucesor', 'En 1502 asumió Nicolás de Ovando']
          ],
          desc: 'Las fuentes difieren en la fecha exacta de llegada, entre fines de octubre y noviembre de 1500.'
        }
      ]
    },
    {
      id: 'v4', n: 'Cuarto viaje', ref: '1502–1504', color: 'var(--v4)', barcos: 4,
      steps: [
        {
          n: 'Cádiz', ref: '11 de mayo de 1502', p: [36.53, -6.3],
          rows: [
            ['Flota', '4 barcos: la Capitana, la Santiago, la Gallega y la Vizcaína'],
            ['Con él', 'Su hermano Bartolomé y su hijo Hernando, de 13 años'],
            ['Objetivo', 'Encontrar un paso por mar hacia el océano Índico']
          ],
          desc: 'Los reyes le prohibieron detenerse en Santo Domingo, que ya no gobernaba. Hernando Colón escribiría años después la biografía de su padre.'
        },
        {
          n: 'Arcila', ref: 'Mayo de 1502', p: [35.47, -6.04],
          rows: [
            ['Desvío', 'Ir en ayuda de la guarnición portuguesa, sitiada en el norte de África'],
            ['Resultado', 'Cuando llegó, el cerco ya se había levantado']
          ],
          desc: 'Arcila, en el actual Marruecos, era una de las plazas que Portugal tenía en la costa africana.'
        },
        {
          n: 'Gran Canaria', ref: '20 de mayo de 1502', p: [28.1, -15.42],
          via: [[32, -10]],
          rows: [
            ['Escala', 'Agua, leña y víveres'],
            ['Salida', 'El 25 de mayo, rumbo al Caribe']
          ],
          desc: 'Colón conocía ya bien el camino de los alisios. Esta sería su travesía más rápida.'
        },
        {
          n: 'Martinica', colon: 'Matininó', ref: '15 de junio de 1502', p: [14.64, -61.0],
          via: [[22, -35], [16, -52]],
          rows: [
            ['Travesía', 'Unos 21 días, la más corta de sus cuatro viajes'],
            ['Por qué', 'Ruta al sur, con alisios constantes']
          ],
          desc: 'Compara este tramo con el primer viaje: el mismo océano, con experiencia, se cruzaba en menos de la mitad del tiempo.'
        },
        {
          n: 'Frente a Santo Domingo', ref: '29 de junio de 1502', p: [18.47, -69.89],
          via: [[15.4, -61.4], [16.5, -64.0], [18.0, -68.5]],
          rows: [
            ['Aviso', 'Pidió refugio porque reconoció señales de un huracán'],
            ['Respuesta', 'Ovando se lo negó y despachó una flota hacia Castilla'],
            ['Resultado', 'El huracán hundió unos veinte barcos; Bobadilla y Roldán murieron. Los de Colón resistieron al abrigo de la costa']
          ],
          desc: 'Huracán es una palabra taína. Los navegantes europeos aprendieron a temer estas tormentas, que no existían en sus mares.',
          think: '¿Qué señales del cielo y del mar crees que reconoció Colón para anunciar el huracán?'
        },
        {
          n: 'Guanaja', ref: '30 de julio de 1502', p: [16.45, -85.9],
          via: [[18.0, -71.5], [17.7, -75.5], [17.5, -78.5], [17.0, -82.5]],
          rows: [
            ['Encuentro', 'Una gran canoa de comerciantes, con cacao, tejidos de algodón y objetos de cobre'],
            ['Importancia', 'Es el primer contacto europeo conocido con mercaderes de Mesoamérica, probablemente mayas'],
            ['Decisión', 'La canoa venía del oeste, pero Colón giró al este buscando el paso']
          ],
          desc: 'Guanaja es una de las islas de la Bahía, frente a la costa de Honduras.',
          think: 'Si Colón hubiera seguido hacia el oeste, de donde venía la canoa, ¿a qué región y a qué pueblos habría llegado?'
        },
        {
          n: 'Costa de Honduras', ref: '14 de agosto de 1502', p: [15.95, -86.0],
          rows: [
            ['Hito', 'Desembarco en Punta Caxinas, cerca de la actual Trujillo'],
            ['Misa', 'Se celebró una misa en tierra firme del continente']
          ],
          desc: 'Desde aquí empezó un mes de lucha contra vientos y corrientes en contra, avanzando muy poco cada día hacia el este.'
        },
        {
          n: 'Cabo Gracias a Dios', ref: 'Septiembre de 1502', p: [15.0, -83.15],
          via: [[16.0, -85.0], [15.9, -84.0]],
          rows: [
            ['Nombre', 'Al doblar el cabo y encontrar mejor viento, dio gracias a Dios'],
            ['Hoy', 'Frontera entre Honduras y Nicaragua']
          ],
          desc: 'Desde el cabo la costa gira al sur, y los barcos pudieron avanzar con viento favorable.'
        },
        {
          n: 'Cariay', ref: '25 de septiembre de 1502', p: [10.0, -83.02],
          via: [[13.5, -83.4], [11.8, -83.6]],
          rows: [
            ['Dónde', 'Cerca de la actual Puerto Limón, en Costa Rica'],
            ['Estadía', 'Unos diez días para reparar los barcos y descansar']
          ],
          desc: 'Los habitantes llevaban adornos de oro y le hablaron de tierras ricas hacia el sur.'
        },
        {
          n: 'Veragua y Portobelo', ref: 'Octubre y noviembre de 1502', p: [9.55, -79.66],
          via: [[9.3, -82.2], [9.0, -81.0], [9.4, -80.2]],
          rows: [
            ['Oro', 'En Veragua, en el actual Panamá, los habitantes tenían oro en abundancia'],
            ['La noticia', 'Le hablaron de otro mar, a pocos días de camino'],
            ['Nombre', 'Llamó Portobelo al puerto por su belleza']
          ],
          desc: 'Colón estaba a menos de cien kilómetros del océano Pacífico, pero buscaba un paso por agua y no lo había. Vasco Núñez de Balboa cruzaría el istmo a pie en 1513.'
        },
        {
          n: 'Santa María de Belén', ref: 'Enero – abril de 1503', p: [8.88, -80.83],
          via: [[9.6, -79.0], [9.3, -80.3]],
          rows: [
            ['Asentamiento', 'Fundó una población junto al río Belén para explotar el oro de Veragua'],
            ['Resistencia', 'El quibián, jefe del lugar, atacó el asentamiento'],
            ['Abandono', 'En abril se retiraron; la Gallega quedó en el río']
          ],
          desc: 'Fue el primer intento europeo de poblar el continente. Duró unos tres meses.'
        },
        {
          n: 'Varados en Jamaica', ref: '25 de junio de 1503', p: [18.44, -77.2],
          via: [[9.6, -79.6], [9.4, -78.6], [12.5, -79.6], [20.7, -79.0], [19.3, -77.8]],
          rows: [
            ['Por qué', 'Los cascos estaban perforados por la broma, un molusco que come madera'],
            ['Dónde', 'Bahía de Santa Gloria, en la costa norte de Jamaica'],
            ['Rescate', 'Diego Méndez cruzó en canoa hasta La Española para pedir ayuda']
          ],
          desc: 'La Vizcaína se había abandonado antes, en Portobelo. Las dos naves que quedaban se convirtieron en refugio en la playa. Pasaron un año ahí.'
        },
        {
          n: 'El eclipse', ref: '29 de febrero de 1504', p: [18.44, -77.2],
          rows: [
            ['Problema', 'Los taínos de Jamaica dejaron de entregar alimentos'],
            ['Estrategia', 'Con un almanaque astronómico, Colón sabía que habría un eclipse de luna y anunció que Dios oscurecería la luna'],
            ['Resultado', 'Los taínos volvieron a entregar comida']
          ],
          desc: 'El episodio lo cuenta Hernando Colón, que estaba presente. Muestra cómo el conocimiento se usó como herramienta de poder.',
          think: 'Colón usó un dato que los taínos no tenían. ¿Te parece un engaño justificado? ¿Por qué?'
        },
        {
          n: 'Regreso a Sanlúcar', ref: '7 de noviembre de 1504', p: [36.78, -6.36], vuelta: true,
          via: [[18.2, -73.5], [18.47, -69.89], [24, -62], [33, -45], [37, -26], [37, -10]],
          rows: [
            ['Rescate', 'A fines de junio de 1504; pasó por Santo Domingo antes de cruzar'],
            ['Después', 'La reina Isabel murió el 26 de noviembre de ese año'],
            ['Su muerte', 'Colón murió en Valladolid el 20 de mayo de 1506']
          ],
          desc: 'Murió con riqueza, pero reclamando títulos y derechos que la Corona ya no le reconocía. Sus herederos siguieron pleiteando por décadas.'
        }
      ]
    }
  ],

  STATIONS: [
    {
      id: 'general', num: null, n: 'Los viajes de Colón', short: 'Vista general', ref: '1492–1504',
      rows: [
        ['Quién', 'Cristóbal Colón, navegante genovés al servicio de los Reyes Católicos'],
        ['Cuántos', 'Cuatro viajes de ida y vuelta entre 1492 y 1504'],
        ['Dónde', 'Las Antillas, la costa de Venezuela y la de Centroamérica']
      ],
      desc: 'Colón buscaba llegar a Asia navegando hacia el oeste, y nunca llegó. La ruta recorre primero por qué viajó y con qué medios, después qué encontró y, al final, qué cambió. En la pestaña Viajes puedes seguir cada viaje paso a paso.',
      think: '¿Por qué alguien navegaría hacia el oeste para llegar a un lugar que está al este?',
      view: [[6, -92], [44, -2]], voyages: ['v1', 'v2', 'v3', 'v4']
    },
    {
      id: 'asia', num: 1, n: 'El problema: llegar a Asia', short: 'Llegar a Asia', ref: 'Europa en el siglo XV',
      rows: [
        ['Qué buscaban', 'Especias, seda, porcelana y oro de Asia'],
        ['El obstáculo', 'Esos productos llegaban por tierra y pasaban por muchos intermediarios, que encarecían su precio'],
        ['La vía portuguesa', 'Bordear África: Bartolomeu Dias pasó el cabo de Buena Esperanza en 1488 y Vasco da Gama llegó a la India en 1498']
      ],
      desc: 'La caída de Constantinopla en manos otomanas, en 1453, suele citarse como causa de los viajes, aunque los historiadores discuten cuánto afectó al comercio. Portugal llevaba décadas avanzando por la costa africana, y el Tratado de Alcáçovas (1479) le reservó esa ruta. A Castilla le quedaba otra apuesta: cruzar el océano hacia el oeste.',
      think: 'Si Portugal ya tenía la ruta de África, ¿qué ganaban los Reyes Católicos apoyando a Colón?',
      view: [[-38, -32], [46, 92]], voyages: ['v1'], show: ['portugal']
    },
    {
      id: 'calculo', num: 2, n: 'Un error de cálculo', short: 'El error de cálculo', ref: 'El tamaño de la Tierra',
      rows: [
        ['Lo que se sabía', 'Los europeos instruidos sabían que la Tierra es redonda; lo que se discutía era su tamaño'],
        ['Lo que calculó Colón', 'Que Japón, Cipango, estaba a pocos miles de kilómetros al oeste de Canarias'],
        ['La realidad', 'La distancia hacia el oeste es más de cuatro veces mayor, con América y el océano Pacífico entremedio']
      ],
      desc: 'Colón tomó la medida más pequeña que circulaba para la Tierra y la más grande para Asia; así el océano parecía corto. Los expertos que asesoraron a los reyes consideraron que su cálculo estaba errado, y tenían razón: si América no hubiera estado ahí, sus barcos no habrían tenido agua ni comida para llegar a Asia.',
      think: 'Colón se equivocó en el cálculo y aun así su viaje cambió la historia. ¿Qué papel tuvo el azar?',
      view: [[-5, -228], [58, 2]], voyages: ['v1'], show: ['cipango']
    },
    {
      id: 'tecnologia', num: 3, n: 'Barcos e instrumentos', short: 'Barcos e instrumentos', ref: 'La tecnología de la navegación',
      rows: [
        ['Barcos', 'La nao, grande y de carga, y la carabela, liviana y rápida, desarrollada por los portugueses'],
        ['Instrumentos', 'Brújula, cuadrante o astrolabio, ampolleta (reloj de arena) y cartas náuticas'],
        ['Método', 'Navegación por estima: con el rumbo, la velocidad y el tiempo se calcula dónde se está']
      ],
      desc: 'En alta mar la latitud se podía estimar por la altura de la estrella Polar sobre el horizonte. La longitud, en cambio, no se podía medir con exactitud: eso recién se resolvió en el siglo XVIII. Por eso la posición de los barcos siempre era una estimación, y las rutas de este mapa también lo son.',
      think: 'Si no podían medir la longitud, ¿cómo sabían cuánto habían avanzado hacia el oeste?',
      view: [[25.5, -21], [39.5, -4]], voyages: ['v1']
    },
    {
      id: 'vientos', num: 4, n: 'El camino del viento', short: 'El camino del viento', ref: 'Alisios y vientos del oeste',
      rows: [
        ['Ida', 'Bajó a Canarias para tomar los alisios, que soplan del noreste hacia el oeste'],
        ['Vuelta', 'Subió al norte para tomar los vientos del oeste, que soplan hacia Europa'],
        ['Herencia', 'Ese circuito fue el camino de los barcos entre Europa y América por más de tres siglos']
      ],
      desc: 'Bajar a Canarias no fue un desvío: desde ahí el viento empuja a los barcos hacia el Caribe. Para volver hay que hacer lo contrario. Los portugueses ya conocían ese giro, la volta do mar, por sus viajes a lo largo de África.',
      think: 'Mira las flechas: ¿por qué la ruta de vuelta del primer viaje pasa tan al norte de la ruta de ida?',
      view: [[8, -82], [50, -4]], voyages: ['v1'], show: ['vientos']
    },
    {
      id: 'llegada', num: 5, n: 'La llegada', short: 'La llegada', ref: '12 de octubre de 1492',
      rows: [
        ['Dónde', 'Guanahaní, una isla de las Bahamas que Colón llamó San Salvador'],
        ['Quiénes vivían ahí', 'Los lucayos, un pueblo taíno'],
        ['El nombre «indios»', 'Colón creía estar en las Indias, como se llamaba entonces a Asia']
      ],
      desc: 'Colón describió en su diario a los lucayos como gente pacífica y pensó que serían fáciles de convertir y de someter. Es la primera descripción europea de los pueblos de América, escrita por alguien que no entendía su lengua. En Chile, el 12 de octubre se conmemora como Día del Encuentro de Dos Mundos.',
      think: 'Colón llamó «indios» a los habitantes. ¿Qué revela ese nombre sobre lo que él creía haber encontrado?',
      view: [[19, -81], [27.5, -68]], voyages: ['v1'], show: ['nombres']
    },
    {
      id: 'pueblos', num: 6, n: 'Quiénes vivían ahí', short: 'Los pueblos del Caribe', ref: 'Taínos, lucayos y kalinagos',
      rows: [
        ['Taínos', 'Agricultores de yuca y maíz en las Antillas Mayores, organizados en cacicazgos'],
        ['Kalinagos', 'En las Antillas Menores; los europeos los llamaron caribes'],
        ['Su huella', 'Huracán, hamaca, canoa, barbacoa y tabaco son palabras de origen taíno']
      ],
      desc: 'En pocas décadas la población taína de La Española cayó de forma drástica por las epidemias, el trabajo forzado, la guerra y el hambre. Las cifras de población anterior a 1492 se discuten mucho entre historiadores, pero hay acuerdo en que la caída fue enorme.',
      think: 'Hoy usamos palabras taínas sin saberlo. ¿Qué nos dice eso sobre lo que dejó el encuentro?',
      view: [[10, -87], [26, -59]], voyages: ['v1', 'v2'], show: ['nombres']
    },
    {
      id: 'continente', num: 7, n: 'Un continente, no Asia', short: 'Un continente', ref: 'Tercer viaje, 1498',
      rows: [
        ['El hecho', 'En agosto de 1498 Colón desembarcó en la península de Paria, en la actual Venezuela'],
        ['La pista', 'El enorme caudal del Orinoco solo podía venir de una tierra muy grande'],
        ['Su conclusión', 'Aun así murió en 1506 convencido de haber llegado a Asia']
      ],
      desc: 'Américo Vespucio, que navegó la costa de Sudamérica entre 1499 y 1502, difundió la idea de un Mundo Nuevo. En 1507 el cartógrafo Martin Waldseemüller llamó America al continente en su honor. El nombre no viene de quien llegó primero, sino de quien explicó que era otro continente.',
      think: '¿Te parece justo que el continente lleve el nombre de Vespucio y no el de Colón? ¿Por qué?',
      view: [[7.5, -67], [13.5, -58.5]], voyages: ['v3'], show: ['nombres']
    },
    {
      id: 'tordesillas', num: 8, n: 'Repartir el mundo', short: 'Tordesillas', ref: 'Tratado de Tordesillas, 1494',
      rows: [
        ['Antes', 'La bula Inter caetera (1493) trazó una línea 100 leguas al oeste de las Azores y Cabo Verde'],
        ['El tratado', 'Castilla y Portugal la movieron a 370 leguas al oeste de Cabo Verde'],
        ['Efecto', 'Portugal pudo reclamar lo que hoy es el este de Brasil; el resto de América quedó para Castilla']
      ],
      desc: 'Ningún pueblo de los que vivían en esas tierras participó del acuerdo. La línea se trazó sin saber qué había al otro lado, y como la longitud no se podía medir con exactitud, su posición precisa se discutió durante siglos.',
      think: '¿Por qué hoy en Brasil se habla portugués y en casi todo el resto de Sudamérica, castellano?',
      view: [[-38, -82], [42, -10]], voyages: ['v1', 'v2'], show: ['tordesillas']
    },
    {
      id: 'intercambio', num: 9, n: 'Lo que cruzó el océano', short: 'El intercambio', ref: 'Intercambio colombino',
      rows: [
        ['De América', 'Maíz, papa, tomate, porotos, cacao, tabaco'],
        ['Hacia América', 'Caballos, vacas, cerdos, trigo y caña de azúcar, ya desde el segundo viaje'],
        ['También', 'Enfermedades como la viruela, que causaron una mortalidad enorme entre los pueblos indígenas']
      ],
      desc: 'El segundo viaje cambió el sentido de la empresa: de explorar se pasó a poblar. Con los barcos cruzaron personas, animales, plantas y microbios, y ambos lados del océano se transformaron. El historiador Alfred Crosby llamó a este proceso intercambio colombino.',
      think: 'Piensa en lo que comiste hoy. ¿Qué ingredientes son de origen americano y cuáles llegaron desde Europa, Asia o África?',
      view: [[8, -88], [44, -2]], voyages: ['v2']
    },
    {
      id: 'comparar', num: 10, n: 'Los cuatro viajes comparados', short: 'Comparar los viajes', ref: '1492–1504',
      rows: [
        ['Primero', '3 barcos. Bahamas, Cuba y La Española'],
        ['Segundo', '17 barcos. Antillas Menores, Puerto Rico y Jamaica; fundación de La Isabela'],
        ['Tercero', '6 barcos. Trinidad y la costa de Venezuela; termina preso'],
        ['Cuarto', '4 barcos. Costa de Centroamérica; un año varado en Jamaica']
      ],
      desc: 'Cada viaje fue más al sur que el anterior, buscando un paso hacia Asia que no existía en el Caribe. El paso por mar lo encontraría Hernando de Magallanes en 1520, en el extremo sur de lo que hoy es Chile.',
      think: 'Si Colón hubiera seguido la costa de Centroamérica, ¿habría encontrado el paso hacia Asia? ¿Por qué?',
      view: [[6, -92], [44, -2]], voyages: ['v1', 'v2', 'v3', 'v4']
    }
  ],

  /* Capas auxiliares de la ruta */
  AUX: {
    portugal: {
      label: 'Vasco da Gama, 1497–1498',
      line: [[38.69, -9.21], [28.3, -15.5], [14.9, -23.5], [-5, -27], [-22, -24], [-32.7, 18.0], [-34.6, 18.5], [-34.2, 22.1], [-29.5, 32], [-15.0, 40.7], [-4.05, 39.7], [-3.2, 40.1], [6, 60], [11.25, 75.78]],
      points: [
        { p: [-34.36, 18.47], n: 'Cabo de Buena Esperanza', ref: 'Bartolomeu Dias, 1488' },
        { p: [11.25, 75.78], n: 'Calicut', ref: 'Vasco da Gama, 1498' },
        { p: [41.01, 28.98], n: 'Constantinopla', ref: 'Otomana desde 1453' }
      ]
    },
    cipango: {
      label: 'Distancia real hacia el oeste',
      line: [[28.09, -17.11], [29, -60], [30, -95], [33, -125], [35, -175], [35.68, -220.3]],
      points: [
        { p: [26.5, -63], n: 'Donde Colón esperaba encontrar Asia', ref: 'Ubicación aproximada', dir: 'bottom' },
        { p: [35.68, -220.3], n: 'Japón', ref: 'Posición real' }
      ]
    },
    tordesillas: {
      lines: [
        { lng: -46.6, label: [-22, -46.1], n: 'Tordesillas, 1494', ref: '370 leguas al oeste de Cabo Verde', fuerte: true },
        { lng: -38, label: [-30, -37.5], n: 'Inter caetera, 1493', ref: 'Posición aproximada' }
      ],
      sides: [
        { p: [30, -62], n: 'Castilla' },
        { p: [30, -30], n: 'Portugal' }
      ]
    },
    /* Flechas: [lat, lng, dirección hacia la que sopla en grados desde el norte] */
    vientos: {
      alisios: [[24, -25, 240], [20, -35, 255], [17, -47, 262], [15, -58, 268], [26, -45, 250], [22, -60, 262], [12, -38, 260]],
      oeste: [[40, -60, 70], [42, -45, 80], [40, -32, 90], [43, -20, 100], [37, -48, 75]]
    }
  }
};
