/* ==========================================================================
   LUGARES.JS — Atlas Bíblico · Fuego y Palabra
   ==========================================================================
   Este archivo contiene ÚNICAMENTE los datos de los lugares y eventos.
   El diseño, los filtros y el mapa viven en mapa.html — no los edites aquí.

   CÓMO AGREGAR UN LUGAR NUEVO
   ----------------------------------------------------------------
   Copia una línea existente dentro del arreglo PLACES, pégala antes del
   corchete de cierre "];", y edita sus valores. Estructura de cada lugar:

   {
     n:   "Nombre del lugar",              // texto a mostrar
     lat: 31.7683,  lng: 35.2137,          // coordenadas (clic derecho en
                                            // Google Maps → "¿Qué hay aquí?")
     t:   "AT",                            // "AT" o "NT"
     li:  ["Génesis","Josué"],             // libro(s) donde aparece — deben
                                            // escribirse EXACTAMENTE como en
                                            // BIBLE_ORDER (dentro de mapa.html)
                                            // para que se ordenen bien
     ty:  ["Ciudad","Alianza/Pacto"],      // uno o más tipos — deben ser
                                            // EXACTAMENTE alguno de:
                                            //   Ciudad, Guerra/Batalla,
                                            //   Evento profético,
                                            //   Predicación/Discurso, Milagro,
                                            //   Alianza/Pacto,
                                            //   Exilio/Cautiverio,
                                            //   Conversión/Encuentro
                                            // (el primero define el color
                                            // del marcador en el mapa)
     p:   "Patriarcas",                    // período (puedes escribir uno
                                            // nuevo; se agrega solo al filtro)
     r:   "Gn 12:6-7",                     // referencia bíblica
     d:   "Descripción breve de 1-2 frases."
   },

   No olvides la coma "," al final de cada lugar (excepto el último antes
   de "];"). Guarda el archivo y recarga mapa.html en el navegador — no se
   necesita ningún otro paso.
   ========================================================================== */

const PLACES = [
{n:"Ur de los Caldeos",lat:30.9625,lng:46.1053,t:"AT",li:["Génesis"],ty:["Ciudad"],p:"Patriarcas",r:"Gn 11:31",d:"Ciudad natal de Abraham en Mesopotamia, de donde partió por llamado de Dios hacia una tierra desconocida."},
{n:"Harán",lat:36.8563,lng:39.0335,t:"AT",li:["Génesis"],ty:["Ciudad"],p:"Patriarcas",r:"Gn 11:31-32",d:"Lugar donde la familia de Abraham se detuvo antes de continuar hacia Canaán; allí murió Taré, su padre."},
{n:"Siquem",lat:32.2137,lng:35.2797,t:"AT",li:["Génesis","Josué","Juan"],ty:["Ciudad","Alianza/Pacto"],p:"Patriarcas / Conquista",r:"Gn 12:6-7; Jos 24",d:"Primer lugar donde Abraham construyó un altar en Canaán; siglos más tarde, escenario de la renovación del pacto bajo Josué."},
{n:"Betel",lat:31.9306,lng:35.2164,t:"AT",li:["Génesis"],ty:["Ciudad","Evento profético"],p:"Patriarcas",r:"Gn 28:10-19",d:"Lugar donde Jacob soñó con una escalera que llegaba al cielo y despertó llamando 'casa de Dios' a ese sitio."},
{n:"Hebrón",lat:31.5326,lng:35.0998,t:"AT",li:["Génesis","2 Samuel"],ty:["Ciudad"],p:"Patriarcas / Monarquía unida",r:"Gn 23; 2 S 5:3",d:"Ciudad de los patriarcas y sepultura de Abraham, Isaac y Jacob; más tarde, primera capital del reinado de David."},
{n:"Mamre",lat:31.5200,lng:35.1050,t:"AT",li:["Génesis"],ty:["Evento profético"],p:"Patriarcas",r:"Gn 18",d:"Encinar junto a Hebrón donde Abraham recibió a tres visitantes celestiales que anunciaron el nacimiento de Isaac."},
{n:"Sodoma",lat:31.0600,lng:35.4000,t:"AT",li:["Génesis"],ty:["Ciudad"],p:"Patriarcas",r:"Gn 19",d:"Ciudad destruida por fuego debido a su maldad; su ubicación tradicional se sitúa al sur del Mar Muerto."},
{n:"Beerseba",lat:31.2589,lng:34.7913,t:"AT",li:["Génesis"],ty:["Ciudad","Alianza/Pacto"],p:"Patriarcas",r:"Gn 21:31",d:"Lugar de pactos entre los patriarcas y los filisteos; marcaba el límite sur de la tierra de Israel ('de Dan a Beerseba')."},
{n:"Peniel",lat:32.3500,lng:35.5500,t:"AT",li:["Génesis"],ty:["Evento histórico"],p:"Patriarcas",r:"Gn 32:22-30",d:"Lugar junto al río Jaboc donde Jacob luchó toda la noche con un ángel y recibió el nuevo nombre de 'Israel'."},
{n:"Gosén",lat:30.8000,lng:31.6000,t:"AT",li:["Génesis","Éxodo"],ty:["Ciudad"],p:"Patriarcas / Éxodo",r:"Gn 47:6",d:"Región fértil del delta del Nilo donde se asentó la familia de Jacob y donde los israelitas se multiplicaron antes del Éxodo."},
{n:"Cruce del Mar Rojo",lat:29.9700,lng:32.5500,t:"AT",li:["Éxodo"],ty:["Milagro"],p:"Éxodo",r:"Ex 14",d:"Lugar tradicional donde las aguas se abrieron para que Israel escapara del ejército egipcio."},
{n:"Monte Sinaí",lat:28.5392,lng:33.9734,t:"AT",li:["Éxodo"],ty:["Evento profético","Alianza/Pacto"],p:"Éxodo",r:"Ex 19-20",d:"Monte donde Dios entregó los Diez Mandamientos a Moisés y estableció el pacto con Israel."},
{n:"Cades-Barnea",lat:30.6900,lng:34.4200,t:"AT",li:["Números"],ty:["Ciudad"],p:"Éxodo",r:"Nm 13-14",d:"Campamento israelita desde donde se enviaron los doce espías a explorar Canaán; escenario de la rebelión que costó cuarenta años de peregrinaje."},
{n:"Monte Nebo",lat:31.7667,lng:35.7269,t:"AT",li:["Deuteronomio"],ty:["Evento histórico"],p:"Éxodo",r:"Dt 34",d:"Monte desde donde Moisés contempló la Tierra Prometida antes de morir, sin poder entrar en ella."},
{n:"Jericó",lat:31.8667,lng:35.4497,t:"AT",li:["Josué","Lucas"],ty:["Guerra/Batalla","Milagro"],p:"Conquista",r:"Jos 6",d:"Primera ciudad conquistada en Canaán; sus murallas cayeron tras el asedio israelita liderado por Josué."},
{n:"Gilgal",lat:31.8833,lng:35.4667,t:"AT",li:["Josué"],ty:["Evento histórico"],p:"Conquista",r:"Jos 4-5",d:"Primer campamento de Israel en Canaán tras cruzar milagrosamente el río Jordán."},
{n:"Hai (Ai)",lat:31.9333,lng:35.2833,t:"AT",li:["Josué"],ty:["Guerra/Batalla"],p:"Conquista",r:"Jos 7-8",d:"Escenario de la primera derrota israelita por el pecado oculto de Acán, y luego de su conquista definitiva."},
{n:"Gabaón",lat:31.8483,lng:35.1811,t:"AT",li:["Josué"],ty:["Guerra/Batalla","Milagro"],p:"Conquista",r:"Jos 10",d:"Lugar de la batalla en la que Josué pidió que el sol se detuviera, y el día se prolongó."},
{n:"Montes Ebal y Gerizim",lat:32.2100,lng:35.2800,t:"AT",li:["Deuteronomio","Josué"],ty:["Alianza/Pacto"],p:"Conquista",r:"Dt 27; Jos 8:30-35",d:"Montes gemelos junto a Siquem donde Israel proclamó públicamente las bendiciones y maldiciones del pacto."},
{n:"Silo",lat:32.0558,lng:35.2897,t:"AT",li:["Josué","Jueces","1 Samuel"],ty:["Ciudad"],p:"Conquista / Jueces",r:"Jos 18:1",d:"Sede del tabernáculo y centro de adoración de Israel antes de la construcción del Templo en Jerusalén."},
{n:"Timná",lat:31.7833,lng:34.9667,t:"AT",li:["Jueces"],ty:["Evento histórico"],p:"Jueces",r:"Jue 14",d:"Escenario del matrimonio de Sansón y del inicio de su enfrentamiento con los filisteos."},
{n:"Gaza",lat:31.5017,lng:34.4668,t:"AT",li:["Jueces"],ty:["Evento histórico"],p:"Jueces",r:"Jue 16",d:"Ciudad filistea donde Sansón, en su último acto de fuerza, derribó las columnas del templo de Dagón."},
{n:"Meguido",lat:32.5814,lng:35.1834,t:"AT",li:["Jueces","2 Reyes","Apocalipsis"],ty:["Guerra/Batalla"],p:"Jueces / Monarquía",r:"Jue 5; 2 R 23:29",d:"Fortaleza estratégica en el valle de Jezreel, escenario de numerosas batallas y asociada con el 'Armagedón' del Apocalipsis."},
{n:"Dan",lat:33.2489,lng:35.6519,t:"AT",li:["Jueces"],ty:["Ciudad"],p:"Jueces",r:"Jue 18",d:"Ciudad en el extremo norte de Israel; junto a Beerseba marcaba los límites tradicionales de la tierra."},
{n:"Ramá",lat:31.9161,lng:35.1997,t:"AT",li:["1 Samuel"],ty:["Ciudad"],p:"Jueces / Monarquía",r:"1 S 1",d:"Ciudad natal y residencia del profeta y juez Samuel."},
{n:"Valle de Ela",lat:31.6975,lng:34.9636,t:"AT",li:["1 Samuel"],ty:["Guerra/Batalla"],p:"Monarquía unida",r:"1 S 17",d:"Lugar del célebre duelo entre el joven David y el gigante filisteo Goliat."},
{n:"Monte Gilboa",lat:32.5000,lng:35.4167,t:"AT",li:["1 Samuel"],ty:["Guerra/Batalla"],p:"Monarquía unida",r:"1 S 31",d:"Monte donde el rey Saúl y sus hijos murieron en batalla frente a los filisteos."},
{n:"Ezión-Guéber",lat:29.5328,lng:34.9878,t:"AT",li:["1 Reyes"],ty:["Ciudad"],p:"Monarquía unida",r:"1 R 9:26",d:"Puerto de Salomón en el Mar Rojo, base de sus flotas comerciales hacia Ofir."},
{n:"Jerusalén",lat:31.7683,lng:35.2137,t:"AT",li:["Múltiples libros"],ty:["Ciudad","Alianza/Pacto"],p:"Todas las épocas",r:"2 S 5; 1 R 6-8",d:"Capital religiosa y política de Israel desde David; sede del Templo de Salomón y escenario de la mayor parte de la historia bíblica posterior."},
{n:"Belén",lat:31.7054,lng:35.2024,t:"AT",li:["Rut","Miqueas"],ty:["Ciudad","Evento profético"],p:"Monarquía unida",r:"Mi 5:2",d:"Ciudad natal del rey David, y siglos más tarde señalada por el profeta Miqueas como cuna del futuro Mesías."},
{n:"Samaria",lat:32.2778,lng:35.1917,t:"AT",li:["1 Reyes","2 Reyes"],ty:["Ciudad","Guerra/Batalla"],p:"Monarquía dividida",r:"1 R 16:24; 2 R 17",d:"Capital del reino del norte de Israel, fundada por Omri; cayó ante el imperio asirio en el año 722 a.C."},
{n:"Jezreel",lat:32.5561,lng:35.3247,t:"AT",li:["1 Reyes","2 Reyes"],ty:["Ciudad"],p:"Monarquía dividida",r:"1 R 21; 2 R 9",d:"Residencia real del rey Acab y la reina Jezabel; escenario de la muerte de esta última."},
{n:"Monte Carmelo",lat:32.7317,lng:34.9709,t:"AT",li:["1 Reyes"],ty:["Evento profético"],p:"Monarquía dividida",r:"1 R 18",d:"Lugar del célebre enfrentamiento del profeta Elías contra los profetas de Baal, con fuego del cielo como veredicto."},
{n:"Horeb",lat:28.5392,lng:33.9734,t:"AT",li:["1 Reyes"],ty:["Evento profético"],p:"Monarquía dividida",r:"1 R 19",d:"Donde Elías, huyendo de Jezabel, escuchó la voz de Dios no en el viento ni el fuego, sino en un susurro apacible."},
{n:"Ramot de Galaad",lat:32.6000,lng:35.9000,t:"AT",li:["1 Reyes","2 Reyes"],ty:["Guerra/Batalla"],p:"Monarquía dividida",r:"1 R 22",d:"Escenario de repetidas batallas entre Israel/Judá y Siria; allí murió el rey Acab."},
{n:"Laquis",lat:31.5658,lng:34.8514,t:"AT",li:["2 Reyes","Isaías"],ty:["Guerra/Batalla"],p:"Monarquía dividida",r:"2 R 18-19",d:"Fortaleza clave de Judá, asediada y conquistada por el ejército asirio de Senaquerib."},
{n:"Carquemis",lat:36.8267,lng:38.0117,t:"AT",li:["2 Crónicas","Jeremías"],ty:["Guerra/Batalla"],p:"Monarquía dividida",r:"2 Cr 35:20; Jer 46:2",d:"Batalla decisiva entre Egipto y Babilonia que reconfiguró el equilibrio de poder en la región."},
{n:"Nínive",lat:36.3600,lng:43.1500,t:"AT",li:["Jonás","Nahúm"],ty:["Ciudad","Evento profético"],p:"Monarquía dividida",r:"Jon 3",d:"Capital del imperio asirio; ciudad a la que el profeta Jonás fue enviado a predicar arrepentimiento."},
{n:"Jope",lat:32.0533,lng:34.7500,t:"AT",li:["Jonás"],ty:["Ciudad"],p:"Monarquía dividida",r:"Jon 1:3",d:"Puerto desde el cual Jonás intentó huir por mar hacia Tarsis para evitar el llamado de Dios."},
{n:"Damasco",lat:33.5138,lng:36.2765,t:"AT",li:["2 Reyes"],ty:["Ciudad"],p:"Monarquía dividida",r:"2 R 5",d:"Capital de Siria (Aram), frecuente adversaria y a veces aliada de los reinos de Israel y Judá."},
{n:"Babilonia",lat:32.5364,lng:44.4208,t:"AT",li:["2 Reyes","Daniel","Jeremías","Génesis"],ty:["Ciudad","Exilio/Cautiverio"],p:"Exilio",r:"2 R 25; Dn 1-6",d:"Capital del imperio que destruyó Jerusalén y su Templo en 586 a.C., llevando a Judá al exilio; escenario de los relatos de Daniel y, según la tradición, de la Torre de Babel."},
{n:"Río Quebar",lat:32.0000,lng:44.6000,t:"AT",li:["Ezequiel"],ty:["Evento profético"],p:"Exilio",r:"Ez 1",d:"Lugar junto al cual el profeta Ezequiel, en el exilio, tuvo su visión inaugural del carro divino."},
{n:"Susa",lat:32.1888,lng:48.2582,t:"AT",li:["Ester","Daniel","Nehemías"],ty:["Ciudad"],p:"Exilio / Retorno",r:"Est 1",d:"Capital de invierno del imperio persa; escenario principal del libro de Ester."},
{n:"Monte Ararat",lat:39.7000,lng:44.3000,t:"AT",li:["Génesis"],ty:["Evento histórico"],p:"Relatos primigenios",r:"Gn 8:4",d:"Lugar tradicional donde reposó el arca de Noé tras el diluvio."},

{n:"Nazaret",lat:32.7009,lng:35.2035,t:"NT",li:["Mateo","Lucas"],ty:["Ciudad"],p:"Vida de Jesús",r:"Lc 1:26; 2:39",d:"Pueblo de Galilea donde Jesús creció, y por el cual sería conocido como 'Jesús de Nazaret'."},
{n:"Caná",lat:32.7472,lng:35.3400,t:"NT",li:["Juan"],ty:["Milagro"],p:"Vida de Jesús",r:"Jn 2:1-11",d:"Lugar del primer milagro público de Jesús: convertir el agua en vino durante una boda."},
{n:"Capernaúm",lat:32.8807,lng:35.5753,t:"NT",li:["Mateo","Marcos","Lucas"],ty:["Ciudad","Milagro"],p:"Vida de Jesús",r:"Mt 4:13; Mc 1:21",d:"Centro de operaciones del ministerio de Jesús en Galilea; escenario de numerosas sanidades y enseñanzas."},
{n:"Mar de Galilea",lat:32.8000,lng:35.5900,t:"NT",li:["Mateo","Marcos","Lucas","Juan"],ty:["Milagro"],p:"Vida de Jesús",r:"Mt 8:23-27; 14:22-33",d:"Lago donde Jesús calmó una tempestad, caminó sobre las aguas y llamó a varios de sus discípulos pescadores."},
{n:"Monte de las Bienaventuranzas",lat:32.8756,lng:35.5586,t:"NT",li:["Mateo"],ty:["Predicación/Discurso"],p:"Vida de Jesús",r:"Mt 5-7",d:"Lugar tradicional del Sermón del Monte, el discurso más extenso de Jesús registrado en los evangelios."},
{n:"Sicar (pozo de Jacob)",lat:32.2137,lng:35.2797,t:"NT",li:["Juan"],ty:["Predicación/Discurso"],p:"Vida de Jesús",r:"Jn 4",d:"Junto a este pozo, cerca de Siquem, Jesús conversó con la mujer samaritana y se reveló como el Mesías."},
{n:"Cesarea de Filipo",lat:33.2494,lng:35.6931,t:"NT",li:["Mateo"],ty:["Predicación/Discurso"],p:"Vida de Jesús",r:"Mt 16:13-20",d:"Lugar donde Pedro confesó a Jesús como 'el Cristo, el Hijo del Dios viviente'."},
{n:"Betania",lat:31.7719,lng:35.2556,t:"NT",li:["Juan"],ty:["Milagro"],p:"Vida de Jesús",r:"Jn 11",d:"Pueblo cercano a Jerusalén donde Jesús resucitó a su amigo Lázaro cuatro días después de su muerte."},
{n:"Getsemaní",lat:31.7794,lng:35.2396,t:"NT",li:["Mateo","Marcos","Lucas","Juan"],ty:["Evento histórico"],p:"Vida de Jesús",r:"Mt 26:36-46",d:"Huerto en el Monte de los Olivos donde Jesús oró en angustia antes de ser arrestado."},
{n:"Gólgota",lat:31.7784,lng:35.2298,t:"NT",li:["Mateo","Marcos","Lucas","Juan"],ty:["Evento histórico"],p:"Vida de Jesús",r:"Jn 19:17-18",d:"Lugar tradicional de la crucifixión de Jesús, fuera de las murallas de Jerusalén."},
{n:"Emaús",lat:31.8386,lng:34.9908,t:"NT",li:["Lucas"],ty:["Evento histórico"],p:"Vida de Jesús",r:"Lc 24:13-35",d:"Camino donde Jesús resucitado se apareció a dos discípulos, quienes lo reconocieron al partir el pan."},
{n:"Jerusalén (Pentecostés)",lat:31.7780,lng:35.2360,t:"NT",li:["Hechos"],ty:["Predicación/Discurso"],p:"Iglesia primitiva",r:"Hch 2",d:"Donde el Espíritu Santo descendió sobre los discípulos y Pedro predicó el primer sermón que dio origen a la iglesia."},
{n:"Cesarea Marítima",lat:32.5000,lng:34.8933,t:"NT",li:["Hechos"],ty:["Ciudad","Conversión/Encuentro"],p:"Iglesia primitiva",r:"Hch 10; 23-26",d:"Puerto romano donde Pedro predicó al centurión Cornelio, abriendo el evangelio a los gentiles; luego prisión de Pablo."},
{n:"Camino a Damasco",lat:33.3000,lng:36.1000,t:"NT",li:["Hechos"],ty:["Conversión/Encuentro"],p:"Iglesia primitiva",r:"Hch 9",d:"Lugar donde Saulo de Tarso, camino a perseguir cristianos, se encontró con Jesús resucitado y fue transformado en el apóstol Pablo."},
{n:"Tarso",lat:36.9000,lng:34.8833,t:"NT",li:["Hechos"],ty:["Ciudad"],p:"Iglesia primitiva",r:"Hch 9:11; 22:3",d:"Ciudad natal del apóstol Pablo, importante centro cultural de Asia Menor."},
{n:"Antioquía de Siria",lat:36.2000,lng:36.1500,t:"NT",li:["Hechos"],ty:["Ciudad","Predicación/Discurso"],p:"Iglesia primitiva",r:"Hch 11:26; 13:1",d:"Donde los seguidores de Jesús fueron llamados 'cristianos' por primera vez; base de lanzamiento de los viajes misioneros de Pablo."},
{n:"Antioquía de Pisidia",lat:38.3000,lng:31.1900,t:"NT",li:["Hechos"],ty:["Predicación/Discurso"],p:"Iglesia primitiva",r:"Hch 13:14-52",d:"Donde Pablo predicó su primer sermón registrado en detalle ante una sinagoga de gentiles y judíos."},
{n:"Iconio",lat:37.8667,lng:32.4833,t:"NT",li:["Hechos"],ty:["Ciudad"],p:"Iglesia primitiva",r:"Hch 14:1-7",d:"Ciudad de Asia Menor evangelizada por Pablo y Bernabé durante su primer viaje misionero."},
{n:"Listra",lat:37.5800,lng:32.4500,t:"NT",li:["Hechos"],ty:["Milagro"],p:"Iglesia primitiva",r:"Hch 14:8-20",d:"Donde Pablo sanó a un hombre cojo de nacimiento y, poco después, fue apedreado por la multitud."},
{n:"Derbe",lat:37.3500,lng:33.3500,t:"NT",li:["Hechos"],ty:["Ciudad"],p:"Iglesia primitiva",r:"Hch 14:20-21",d:"Ciudad del sur de Galacia visitada por Pablo hacia el final de su primer viaje misionero."},
{n:"Filipos",lat:41.0138,lng:24.2875,t:"NT",li:["Hechos","Filipenses"],ty:["Ciudad","Milagro"],p:"Iglesia primitiva",r:"Hch 16",d:"Primera iglesia fundada en suelo europeo; allí Pablo y Silas fueron encarcelados y liberados por un terremoto milagroso."},
{n:"Tesalónica",lat:40.6401,lng:22.9444,t:"NT",li:["Hechos","1 Tesalonicenses"],ty:["Predicación/Discurso"],p:"Iglesia primitiva",r:"Hch 17:1-9",d:"Ciudad donde Pablo predicó en la sinagoga durante tres semanas, formando una iglesia próspera pese a la oposición."},
{n:"Berea",lat:40.5297,lng:22.2003,t:"NT",li:["Hechos"],ty:["Ciudad"],p:"Iglesia primitiva",r:"Hch 17:10-15",d:"Ciudad elogiada porque sus habitantes examinaban diariamente las Escrituras para comprobar la predicación de Pablo."},
{n:"Atenas (Areópago)",lat:37.9715,lng:23.7257,t:"NT",li:["Hechos"],ty:["Predicación/Discurso"],p:"Iglesia primitiva",r:"Hch 17:16-34",d:"Donde Pablo predicó ante los filósofos griegos en el Areópago, citando incluso a poetas locales."},
{n:"Corinto",lat:37.9061,lng:22.8781,t:"NT",li:["Hechos","1 Corintios","2 Corintios"],ty:["Ciudad"],p:"Iglesia primitiva",r:"Hch 18:1-18",d:"Ciudad portuaria y comercial donde Pablo pasó un año y medio fundando una de sus iglesias más influyentes."},
{n:"Éfeso",lat:37.9396,lng:27.3417,t:"NT",li:["Hechos","Efesios"],ty:["Ciudad","Milagro"],p:"Iglesia primitiva",r:"Hch 19",d:"Centro de un poderoso ministerio de Pablo, marcado por sanidades notables y una quema pública de libros de magia."},
{n:"Mileto",lat:37.5297,lng:27.2861,t:"NT",li:["Hechos"],ty:["Predicación/Discurso"],p:"Iglesia primitiva",r:"Hch 20:17-38",d:"Lugar del emotivo discurso de despedida de Pablo a los ancianos de la iglesia de Éfeso."},
{n:"Creta",lat:35.2401,lng:24.8093,t:"NT",li:["Hechos","Tito"],ty:["Ciudad"],p:"Iglesia primitiva",r:"Hch 27; Tit 1:5",d:"Isla donde Pablo dejó a Tito para organizar la iglesia, y donde su barco buscó refugio antes del naufragio."},
{n:"Malta",lat:35.8997,lng:14.5146,t:"NT",li:["Hechos"],ty:["Milagro"],p:"Iglesia primitiva",r:"Hch 28:1-10",d:"Isla donde Pablo naufragó, sobrevivió a la mordida de una serpiente venenosa y sanó a los enfermos del lugar."},
{n:"Roma",lat:41.9028,lng:12.4964,t:"NT",li:["Hechos","Romanos"],ty:["Ciudad","Predicación/Discurso"],p:"Iglesia primitiva",r:"Hch 28",d:"Capital del Imperio romano y destino final del viaje de Pablo, donde predicó el evangelio incluso bajo arresto domiciliario."},
{n:"Patmos",lat:37.3086,lng:26.5453,t:"NT",li:["Apocalipsis"],ty:["Evento profético"],p:"Iglesia primitiva",r:"Ap 1:9",d:"Isla del Egeo donde el apóstol Juan, exiliado, recibió la visión que dio origen al libro del Apocalipsis."}
];
