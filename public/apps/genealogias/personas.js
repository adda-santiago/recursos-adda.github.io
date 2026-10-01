/* ==========================================================================
   PERSONAS.JS — Árbol Genealógico · Fuego y Palabra
   ==========================================================================
   Contiene ÚNICAMENTE los datos de cada persona. El diseño y la lógica del
   árbol viven en index.html y app.js — no los edites aquí.

   *** ESTADO ACTUAL: FASE 1 ***
   Tronco Adán → Jacob → Judá → David, con el ejemplo completo de las
   4 esposas de Jacob y sus hijos. Aún NO incluye: las dos ramas de Jesús
   (David→Mateo / David→Lucas), la línea de sumos sacerdotes, ni las
   ramas laterales (Caín, hijos de Noé, Ismael, hijos de Cetura, Esaú).
   Esas llegan en la Fase 2.

   CÓMO AGREGAR UNA PERSONA NUEVA
   ----------------------------------------------------------------
   {
     id:     "identificador_unico",       // minúsculas, sin espacios ni tildes
     n:      "Nombre a mostrar",
     bio:    "Descripción breve de 1-3 frases.",
     v:      ["Gn 5:6-8"],                // referencias bíblicas principales
     rol:    null,                        // null, "rey", "profeta",
                                           // "sacerdote", "sumo_sacerdote", "juez"
     libros: ["Génesis"],                 // libro(s) donde aparece
     epoca:  "creacion",                  // debe coincidir con un id de EPOCAS
     fuente: "biblica"                    // "biblica" o "extrabiblica"
   },

   Luego ve a relaciones.js para conectarla con su padre/madre/cónyuge.
   ========================================================================== */

const PERSONAS = [
  {id:"adan", n:"Adán", bio:"El primer ser humano, formado del polvo de la tierra. Vivió 930 años.", v:["Gn 2:7","Gn 5:1-5"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"eva", n:"Eva", bio:"La primera mujer, formada de una costilla de Adán; llamada 'madre de todos los vivientes'.", v:["Gn 2:21-23","Gn 3:20"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"cain", n:"Caín", bio:"Primogénito de Adán y Eva, labrador de la tierra; mató a su hermano Abel por celos y fue condenado a errar por la tierra.", v:["Gn 4:1-17"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},

  /* --- Línea de Caín (Gn 4:17-22), independiente de la línea de Set --- */
  {id:"enoc_ciudad", n:"Enoc", bio:"Hijo de Caín; en su honor, Caín construyó la primera ciudad mencionada en la Biblia (homónimo de Enoc, descendiente de Set, persona distinta).", v:["Gn 4:17"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"irad", n:"Irad", bio:"Descendiente de Caín.", v:["Gn 4:18"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"mehujael", n:"Mehujael", bio:"Descendiente de Caín.", v:["Gn 4:18"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"metusael", n:"Metusael", bio:"Descendiente de Caín, padre de Lamec.", v:["Gn 4:18"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"lamec2", n:"Lamec", bio:"Descendiente de Caín; el primer polígamo mencionado en la Biblia. Se jactó ante sus esposas de haber matado a un hombre, componiendo el primer poema registrado en las Escrituras (homónimo del padre de Noé, persona distinta).", v:["Gn 4:19-24"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"ada1", n:"Ada", bio:"Una de las dos esposas de Lamec; madre de Jabal y Jubal.", v:["Gn 4:19-20"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"zila1", n:"Zila", bio:"Una de las dos esposas de Lamec; madre de Tubal-caín y Naamá.", v:["Gn 4:19","Gn 4:22"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"jabal", n:"Jabal", bio:"Hijo de Lamec y Ada; padre de los que habitan en tiendas y crían ganado.", v:["Gn 4:20"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"jubal", n:"Jubal", bio:"Hijo de Lamec y Ada; padre de los que tocan arpa y flauta, el primer músico mencionado en la Biblia.", v:["Gn 4:21"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"tubalcain", n:"Tubal-caín", bio:"Hijo de Lamec y Zila; forjador de instrumentos de bronce y hierro, el primer herrero mencionado en la Biblia.", v:["Gn 4:22"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"naama1", n:"Naamá", bio:"Hija de Lamec y Zila; una de las pocas mujeres nombradas en las genealogías más antiguas del Génesis.", v:["Gn 4:22"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"abel", n:"Abel", bio:"Segundo hijo de Adán y Eva, pastor de ovejas; su ofrenda fue aceptada por Dios, lo que despertó los celos de su hermano Caín, quien lo asesinó.", v:["Gn 4:1-8"], rol:null, libros:["Génesis","Hebreos"], epoca:"creacion", fuente:"biblica"},
  {id:"set", n:"Set", bio:"Tercer hijo de Adán y Eva, nacido tras la muerte de Abel a manos de Caín.", v:["Gn 4:25","Gn 5:6-8"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"enos", n:"Enós", bio:"En su tiempo, según el texto, los hombres comenzaron a invocar el nombre del Señor.", v:["Gn 4:26","Gn 5:9-11"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"cainan", n:"Cainán", bio:"Descendiente de Set en la línea que llega hasta Noé.", v:["Gn 5:12-14"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"mahalaleel", n:"Mahalaleel", bio:"Descendiente de Set, padre de Jared.", v:["Gn 5:15-17"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"jared", n:"Jared", bio:"Padre de Enoc, uno de los patriarcas antediluvianos de mayor edad registrada.", v:["Gn 5:18-20"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"enoc1", n:"Enoc", bio:"'Caminó con Dios, y desapareció, porque le llevó Dios' sin pasar por la muerte, tras 365 años.", v:["Gn 5:21-24"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"matusalen", n:"Matusalén", bio:"El hombre más longevo registrado en la Biblia: 969 años.", v:["Gn 5:25-27"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"lamec1", n:"Lamec", bio:"Padre de Noé; expresó la esperanza de que su hijo traería alivio a la humanidad.", v:["Gn 5:28-31"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"noe", n:"Noé", bio:"Construyó el arca por instrucción divina y sobrevivió al diluvio junto a su familia.", v:["Gn 5:32","Gn 6-9"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},

  /* --- Otros hijos de Noé --- */
  {id:"cam", n:"Cam", bio:"Hijo de Noé; vio la desnudez de su padre embriagado, lo que provocó una maldición sobre su hijo Canaán. Antepasado de Egipto, Canaán y otros pueblos.", v:["Gn 9:18-27","Gn 10:6-20"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"jafet", n:"Jafet", bio:"Hijo de Noé; antepasado, según la Tabla de las Naciones, de pueblos que se extendieron hacia Asia Menor y las costas del Mediterráneo.", v:["Gn 9:27","Gn 10:1-5"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"cus1", n:"Cus", bio:"Hijo de Cam; padre de Nimrod. Su nombre se asocia con regiones al sur de Egipto (Etiopía/Nubia).", v:["Gn 10:6-8"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"canaan1", n:"Canaán", bio:"Hijo de Cam; antepasado de los pueblos cananeos que habitaban la tierra prometida antes de la conquista israelita.", v:["Gn 9:25","Gn 10:15-19"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"nimrod", n:"Nimrod", bio:"Nieto de Cam; descrito como 'vigoroso cazador delante de Jehová', fundó Babel y ciudades en Asiria, entre ellas Nínive. Tradicionalmente asociado con el origen de la Torre de Babel.", v:["Gn 10:8-12","1 Cr 1:10"], rol:"rey", libros:["Génesis","1 Crónicas"], epoca:"creacion", fuente:"biblica"},

  {id:"sem", n:"Sem", bio:"Hijo de Noé; de su línea desciende Abraham y, por tanto, el pueblo de Israel.", v:["Gn 5:32","Gn 11:10-11"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"arfaxad", n:"Arfaxad", bio:"Hijo de Sem, nacido dos años después del diluvio.", v:["Gn 11:12-13"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"sala", n:"Sala", bio:"Descendiente de Sem en la línea hacia Abraham.", v:["Gn 11:14-15"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"heber", n:"Heber", bio:"De su nombre derivaría, según la tradición, el término 'hebreo'.", v:["Gn 11:16-17"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"peleg", n:"Peleg", bio:"Su nombre significa 'división'; en sus días la tierra fue repartida entre los pueblos.", v:["Gn 11:18-19"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"reu", n:"Reu", bio:"Descendiente de Sem en la línea hacia Abraham.", v:["Gn 11:20-21"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"serug", n:"Serug", bio:"Padre de Nacor, abuelo de Taré.", v:["Gn 11:22-23"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"nacor1", n:"Nacor", bio:"Abuelo de Abraham.", v:["Gn 11:24-25"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"tare", n:"Taré", bio:"Padre de Abraham; inició el viaje desde Ur de los Caldeos hacia Canaán, deteniéndose en Harán.", v:["Gn 11:26-32"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},

  /* --- Hermanos de Abraham (otros hijos de Taré) --- */
  {id:"nacor2", n:"Nacor", bio:"Hermano de Abraham; se casó con Milká, hija de su propio hermano Harán. Su nieto Betuel sería abuelo de Jacob y de Labán.", v:["Gn 11:26-27","Gn 22:20-23"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"haran1", n:"Harán", bio:"Hermano de Abraham; murió joven en Ur de los Caldeos, antes de que la familia emigrara. Padre de Lot, Milká e Isca.", v:["Gn 11:27-28"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"milca", n:"Milká", bio:"Hija de Harán; se casó con su tío Nacor. Abuela de Betuel, y por tanto bisabuela de Rebeca y Labán.", v:["Gn 11:29","Gn 22:20-23"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"isca", n:"Isca", bio:"Hija de Harán, hermana de Lot y Milká; la Biblia no relata más sobre ella.", v:["Gn 11:29"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"lot", n:"Lot", bio:"Sobrino de Abraham; se estableció cerca de Sodoma y fue rescatado por ángeles antes de la destrucción de la ciudad. Sus hijas serían las madres de los pueblos moabita y amonita.", v:["Gn 13","Gn 19"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"moab1", n:"Moab", bio:"Hijo de Lot y su hija mayor; antepasado epónimo del pueblo moabita, del cual descendería, generaciones después, Rut.", v:["Gn 19:36-37"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"benami", n:"Ben-ammi", bio:"Hijo de Lot y su hija menor; antepasado epónimo del pueblo amonita.", v:["Gn 19:36-38"], rol:null, libros:["Génesis"], epoca:"creacion", fuente:"biblica"},
  {id:"betuel", n:"Betuel", bio:"Hijo de Nacor y Milká; padre de Rebeca y de Labán, uniendo por sangre a las dos ramas que más tarde se reencontrarían en el matrimonio de Jacob.", v:["Gn 22:22-23","Gn 24:15","Gn 28:5"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"rebeca", n:"Rebeca", bio:"Hija de Betuel; elegida providencialmente en el pozo como esposa para Isaac. Favoreció a Jacob sobre Esaú y orquestó el engaño de la bendición paterna.", v:["Gn 24","Gn 25:20-28","Gn 27"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"laban", n:"Labán", bio:"Hermano de Rebeca, hijo de Betuel; tío y luego suegro de Jacob, a quien engañó dándole a Lea en matrimonio antes que a Raquel, la mujer que realmente amaba.", v:["Gn 24:29-31","Gn 29-31"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},

  {id:"abraham", n:"Abraham", bio:"Llamado por Dios a dejar su tierra; padre de la fe y receptor de la promesa de una descendencia numerosa.", v:["Gn 12-25"], rol:null, libros:["Génesis","Romanos","Hebreos"], epoca:"patriarcas", fuente:"biblica", periodo:"c. 2166–1991 a.C. (cronología tradicional, sin consenso académico)"},

  /* --- Las tres esposas de Abraham --- */
  {id:"sara", n:"Sara", bio:"Esposa principal de Abraham; concibió a Isaac en su vejez, cumpliendo la promesa divina tras años de esterilidad.", v:["Gn 11:29","Gn 17:15-19","Gn 21:1-7"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"agar", n:"Agar", bio:"Sierva egipcia de Sara, entregada a Abraham para darle un hijo; madre de Ismael. Fue expulsada al desierto junto a su hijo tras el nacimiento de Isaac, pero Dios la protegió.", v:["Gn 16","Gn 21:9-21"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"cetura", n:"Cetura", bio:"Esposa de Abraham tras la muerte de Sara; madre de seis hijos que poblarían pueblos árabes del desierto.", v:["Gn 25:1-4"], rol:null, libros:["Génesis","1 Crónicas"], epoca:"patriarcas", fuente:"biblica"},

  /* --- Hijo de Abraham y Agar --- */
  {id:"ismael", n:"Ismael", bio:"Hijo de Abraham y Agar; recibió la promesa de convertirse en una gran nación, antepasado de doce príncipes árabes.", v:["Gn 16:15-16","Gn 17:20","Gn 25:12-18"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"nebaiot", n:"Nebaiot", bio:"Primogénito de Ismael.", v:["Gn 25:13"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"cedar", n:"Cedar", bio:"Hijo de Ismael; su nombre daría origen a una tribu árabe mencionada varias veces por los profetas.", v:["Gn 25:13","Is 21:16-17"], rol:null, libros:["Génesis","Isaías"], epoca:"patriarcas", fuente:"biblica"},
  {id:"adbeel", n:"Adbeel", bio:"Hijo de Ismael.", v:["Gn 25:13"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"mibsam", n:"Mibsam", bio:"Hijo de Ismael.", v:["Gn 25:13"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"misma", n:"Misma", bio:"Hijo de Ismael.", v:["Gn 25:14"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"duma", n:"Duma", bio:"Hijo de Ismael.", v:["Gn 25:14"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"massa", n:"Massa", bio:"Hijo de Ismael.", v:["Gn 25:14"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"hadad1", n:"Hadad", bio:"Hijo de Ismael.", v:["Gn 25:15"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"tema1", n:"Tema", bio:"Hijo de Ismael; su nombre daría origen a un oasis y tribu árabe mencionados por Job y los profetas.", v:["Gn 25:15","Job 6:19"], rol:null, libros:["Génesis","Job"], epoca:"patriarcas", fuente:"biblica"},
  {id:"jetur", n:"Jetur", bio:"Hijo de Ismael; antepasado de un pueblo árabe que combatió contra las tribus transjordanas de Israel.", v:["Gn 25:15","1 Cr 5:19"], rol:null, libros:["Génesis","1 Crónicas"], epoca:"patriarcas", fuente:"biblica"},
  {id:"nafis", n:"Nafis", bio:"Hijo de Ismael.", v:["Gn 25:15"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"cedema", n:"Cedema", bio:"Hijo menor de Ismael.", v:["Gn 25:15"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},

  /* --- Hijos de Abraham y Cetura --- */
  {id:"zimran", n:"Zimrán", bio:"Hijo de Abraham y Cetura.", v:["Gn 25:2"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"jocsan", n:"Jocsán", bio:"Hijo de Abraham y Cetura.", v:["Gn 25:2-3"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"medan", n:"Medán", bio:"Hijo de Abraham y Cetura.", v:["Gn 25:2"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"madian1", n:"Madián", bio:"Hijo de Abraham y Cetura; antepasado epónimo de los madianitas, pueblo con el que Israel tendría una relación tensa y, más tarde, Moisés encontraría refugio y esposa.", v:["Gn 25:2","Ex 2:15-21"], rol:null, libros:["Génesis","Éxodo"], epoca:"patriarcas", fuente:"biblica"},
  {id:"isbac", n:"Isbac", bio:"Hijo de Abraham y Cetura.", v:["Gn 25:2"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"sua1", n:"Súa", bio:"Hijo menor de Abraham y Cetura.", v:["Gn 25:2"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},

  {id:"isaac", n:"Isaac", bio:"Hijo de la promesa, nacido de Abraham y Sara en su vejez; padre de Jacob y Esaú.", v:["Gn 21-35"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica", periodo:"c. 2066–1886 a.C. (cronología tradicional)"},

  /* --- Esaú, hermano gemelo de Jacob --- */
  {id:"esau", n:"Esaú", bio:"Hermano gemelo mayor de Jacob; vendió su primogenitura por un plato de guiso y luego perdió la bendición paterna por engaño. Antepasado de los edomitas.", v:["Gn 25:24-34","Gn 27","Gn 36"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"elifaz1", n:"Elifaz", bio:"Hijo mayor de Esaú; padre de Amalec, cuya descendencia se convertiría en enemigos recurrentes de Israel.", v:["Gn 36:10-12"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"amalec1", n:"Amalec", bio:"Nieto de Esaú; antepasado epónimo de los amalecitas, pueblo que atacó a Israel en el desierto y sería recordado como enemigo perpetuo.", v:["Gn 36:12","Ex 17:8-16"], rol:null, libros:["Génesis","Éxodo"], epoca:"patriarcas", fuente:"biblica"},

  {id:"jacob", n:"Jacob (Israel)", bio:"Hijo menor de Isaac; recibió el nombre 'Israel' tras luchar con un ángel en Peniel. Padre de los doce patriarcas de las tribus de Israel.", v:["Gn 25-49"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica", periodo:"c. 2006–1859 a.C. (cronología tradicional)"},

  /* --- Las cuatro esposas de Jacob --- */
  {id:"lea", n:"Lea", bio:"Hija mayor de Labán; primera esposa de Jacob, entregada a él por engaño de su padre en lugar de Raquel.", v:["Gn 29:16-30"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"raquel", n:"Raquel", bio:"Hija menor de Labán, la esposa amada de Jacob; murió al dar a luz a Benjamín.", v:["Gn 29:16-30","Gn 35:16-20"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"bilha", n:"Bilhá", bio:"Sierva de Raquel, entregada a Jacob para darle hijos en nombre de su señora.", v:["Gn 30:1-8"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"zilpa", n:"Zilpá", bio:"Sierva de Lea, entregada a Jacob para darle hijos en nombre de su señora.", v:["Gn 30:9-13"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},

  /* --- Hijos de Lea --- */
  {id:"ruben", n:"Rubén", bio:"Primogénito de Jacob; perdió su derecho de primogenitura por deshonrar el lecho de su padre.", v:["Gn 29:32","Gn 49:3-4"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"simeon", n:"Simeón", bio:"Segundo hijo de Jacob y Lea; junto a Leví, vengó violentamente la deshonra de su hermana Dina.", v:["Gn 29:33","Gn 34"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"levi1", n:"Leví", bio:"Tercer hijo de Jacob y Lea. De su tribu descenderían, generaciones después, Moisés, Aarón y todo el sacerdocio de Israel.", v:["Gn 29:34"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"juda", n:"Judá", bio:"Cuarto hijo de Jacob y Lea. Propuso vender a José en vez de matarlo. De su tribu descendería el rey David y, según la promesa, el Mesías.", v:["Gn 29:35","Gn 49:8-12"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"isacar", n:"Isacar", bio:"Quinto hijo de Jacob y Lea.", v:["Gn 30:17-18"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"zabulon", n:"Zabulón", bio:"Sexto hijo de Jacob y Lea.", v:["Gn 30:19-20"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"dina", n:"Dina", bio:"Única hija de Jacob mencionada por nombre; su deshonra en Siquem desencadenó la venganza de sus hermanos Simeón y Leví.", v:["Gn 30:21","Gn 34"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},

  /* --- Hijos de Bilhá --- */
  {id:"dan1", n:"Dan", bio:"Primer hijo de Bilhá, sierva de Raquel.", v:["Gn 30:1-6"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"neftali", n:"Neftalí", bio:"Segundo hijo de Bilhá, sierva de Raquel.", v:["Gn 30:7-8"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},

  /* --- Hijos de Zilpá --- */
  {id:"gad1", n:"Gad", bio:"Primer hijo de Zilpá, sierva de Lea.", v:["Gn 30:9-11"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},
  {id:"aser", n:"Aser", bio:"Segundo hijo de Zilpá, sierva de Lea.", v:["Gn 30:12-13"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},

  /* --- Hijos de Raquel --- */
  {id:"jose1", n:"José", bio:"Hijo predilecto de Jacob; vendido por sus hermanos como esclavo, llegó a ser gobernador de Egipto y salvó a su familia del hambre.", v:["Gn 30:22-24","Gn 37-50"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica", periodo:"c. 1915–1805 a.C. (cronología tradicional)"},
  {id:"benjamin", n:"Benjamín", bio:"Hijo menor de Jacob; su nacimiento costó la vida de su madre, Raquel.", v:["Gn 35:16-18"], rol:null, libros:["Génesis"], epoca:"patriarcas", fuente:"biblica"},

  /* --- Continuación de la línea principal por Judá hacia David --- */
  {id:"fares", n:"Fares", bio:"Hijo de Judá y Tamar, su nuera; nació en circunstancias inusuales, disputando el nacimiento con su hermano gemelo Zara.", v:["Gn 38:27-30","Rt 4:18"], rol:null, libros:["Génesis","Rut","Mateo"], epoca:"patriarcas", fuente:"biblica"},
  {id:"esrom", n:"Esrom", bio:"Descendiente de Judá en la línea hacia David.", v:["Rt 4:18-19","1 Cr 2:5"], rol:null, libros:["Rut","1 Crónicas"], epoca:"patriarcas", fuente:"biblica"},
  {id:"aram1", n:"Aram (Ram)", bio:"Descendiente de Judá en la línea hacia David.", v:["Rt 4:19"], rol:null, libros:["Rut"], epoca:"patriarcas", fuente:"biblica"},
  {id:"aminadab", n:"Aminadab", bio:"Descendiente de Judá; su hija Elisabet se casaría con Aarón, uniendo por matrimonio las tribus de Judá y Leví.", v:["Rt 4:19-20","Ex 6:23"], rol:null, libros:["Rut","Éxodo"], epoca:"exodo", fuente:"biblica"},
  {id:"naason", n:"Naasón", bio:"Príncipe de la tribu de Judá durante el Éxodo, contemporáneo de Moisés y Aarón.", v:["Rt 4:20","Nm 1:7"], rol:null, libros:["Rut","Números"], epoca:"exodo", fuente:"biblica"},
  {id:"salmon", n:"Salmón", bio:"Se casó con Rahab, la mujer de Jericó que protegió a los espías israelitas.", v:["Rt 4:20-21","Mt 1:5"], rol:null, libros:["Rut","Mateo"], epoca:"jueces", fuente:"biblica"},
  {id:"rahab", n:"Rahab", bio:"Habitante de Jericó que escondió a los espías israelitas y se unió al pueblo de Israel; antepasada de David y de Jesús.", v:["Jos 2","Jos 6:22-25","Mt 1:5"], rol:null, libros:["Josué","Mateo","Hebreos"], epoca:"jueces", fuente:"biblica"},
  {id:"booz", n:"Booz", bio:"Terrateniente de Belén que ejerció el derecho de pariente-redentor y se casó con Rut, la moabita.", v:["Rt 2-4"], rol:null, libros:["Rut"], epoca:"jueces", fuente:"biblica"},
  {id:"rut", n:"Rut", bio:"Moabita que, tras enviudar, siguió a su suegra Noemí a Belén y se casó con Booz; bisabuela del rey David.", v:["Rut 1-4"], rol:null, libros:["Rut","Mateo"], epoca:"jueces", fuente:"biblica"},
  {id:"obed", n:"Obed", bio:"Hijo de Booz y Rut; abuelo del rey David.", v:["Rt 4:17","Rt 4:21-22"], rol:null, libros:["Rut"], epoca:"jueces", fuente:"biblica"},
  {id:"isai", n:"Isaí", bio:"Padre del rey David; Samuel lo visitó en Belén para ungir a uno de sus hijos como futuro rey.", v:["1 S 16:1-13"], rol:null, libros:["1 Samuel","Rut"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"david", n:"David", bio:"Pastor de Belén ungido como segundo rey de Israel; unificó el reino y estableció Jerusalén como capital. Recibió la promesa de un descendiente cuyo trono sería eterno.", v:["1 S 16","2 S","1 R 1-2"], rol:"rey", libros:["1 Samuel","2 Samuel","1 Reyes","Salmos","Mateo","Lucas"], epoca:"monarquia_unida", fuente:"biblica", periodo:"Reinó c. 1010–970 a.C."},

  /* ============ LÍNEA DE LEVÍ: hacia Moisés, Aarón y los sumos sacerdotes ============ */
  {id:"coat", n:"Coat (Kohat)", bio:"Segundo hijo de Leví; de él desciende la familia coatita, encargada de transportar los objetos sagrados del tabernáculo.", v:["Ex 6:16-18","Nm 3:27-31"], rol:null, libros:["Éxodo","Números"], epoca:"patriarcas", fuente:"biblica"},
  {id:"gerson1", n:"Gersón", bio:"Hijo mayor de Leví; su familia tenía a su cargo las cortinas y cubiertas del tabernáculo.", v:["Ex 6:16-17","Nm 3:21-26"], rol:null, libros:["Éxodo","Números"], epoca:"patriarcas", fuente:"biblica"},
  {id:"merari1", n:"Merari", bio:"Tercer hijo de Leví; su familia tenía a su cargo las tablas, barras y columnas del tabernáculo.", v:["Ex 6:16-19","Nm 3:33-37"], rol:null, libros:["Éxodo","Números"], epoca:"patriarcas", fuente:"biblica"},
  {id:"amram", n:"Amram", bio:"Hijo de Coat; padre de Moisés, Aarón y María.", v:["Ex 6:18-20","Nm 26:59"], rol:null, libros:["Éxodo","Números"], epoca:"exodo", fuente:"biblica"},
  {id:"izhar1", n:"Izhar", bio:"Hijo de Coat, hermano de Amram; padre de Coré, quien más tarde encabezaría una rebelión contra Moisés y Aarón.", v:["Ex 6:18","Nm 16"], rol:null, libros:["Éxodo","Números"], epoca:"exodo", fuente:"biblica"},
  {id:"hebron_lev", n:"Hebrón", bio:"Hijo de Coat, hermano de Amram.", v:["Ex 6:18"], rol:null, libros:["Éxodo"], epoca:"exodo", fuente:"biblica"},
  {id:"uziel1", n:"Uziel", bio:"Hijo de Coat, hermano de Amram.", v:["Ex 6:18","Lv 10:4"], rol:null, libros:["Éxodo","Levítico"], epoca:"exodo", fuente:"biblica"},
  {id:"moises", n:"Moisés", bio:"Criado en la corte de Faraón, huyó a Madián y regresó a Egipto para liberar a Israel de la esclavitud. Recibió la Ley en el Sinaí y condujo al pueblo durante cuarenta años en el desierto. La Biblia lo llama 'profeta' sin igual en Israel.", v:["Ex 2-40","Dt 34:10"], rol:"profeta", libros:["Éxodo","Números","Deuteronomio","Levítico"], epoca:"exodo", fuente:"biblica", periodo:"c. 1526–1406 a.C. (cronología tradicional)"},
  {id:"maria1", n:"Miriam", bio:"Llamada María en muchas traducciones (RVR1960); aquí usamos Miriam para diferenciarla de María, la madre de Jesús. Hermana de Moisés y Aarón; llamada profetisa, dirigió el cántico de celebración tras el cruce del Mar Rojo. Fue castigada temporalmente con lepra por cuestionar la autoridad de Moisés.", v:["Ex 15:20-21","Nm 12","Nm 20:1"], rol:"profeta", libros:["Éxodo","Números"], epoca:"exodo", fuente:"biblica"},
  {id:"aaron", n:"Aarón", bio:"Hermano mayor de Moisés y su portavoz ante Faraón; consagrado como el primer sumo sacerdote de Israel, estableciendo el sacerdocio que llevaría su nombre.", v:["Ex 4:14-16","Ex 28-29","Lv 8-9"], rol:"sumo_sacerdote", libros:["Éxodo","Levítico","Números"], epoca:"exodo", fuente:"biblica", periodo:"c. 1529–1407 a.C. (cronología tradicional)"},
  {id:"nadab1", n:"Nadab", bio:"Hijo mayor de Aarón; murió junto a su hermano Abiú al ofrecer 'fuego extraño' no autorizado ante el Señor.", v:["Lv 10:1-2","Nm 3:4"], rol:null, libros:["Levítico","Números"], epoca:"exodo", fuente:"biblica"},
  {id:"abiu1", n:"Abiú", bio:"Hijo de Aarón; murió junto a su hermano Nadab al ofrecer 'fuego extraño' no autorizado ante el Señor.", v:["Lv 10:1-2","Nm 3:4"], rol:null, libros:["Levítico","Números"], epoca:"exodo", fuente:"biblica"},
  {id:"itamar1", n:"Itamar", bio:"Hijo menor de Aarón; su familia ejercería el sumo sacerdocio más adelante en la época de Elí y Samuel.", v:["Ex 6:23","Nm 4:28"], rol:null, libros:["Éxodo","Números"], epoca:"exodo", fuente:"biblica"},
  {id:"eleazar1", n:"Eleazar", bio:"Hijo de Aarón; sucedió a su padre como segundo sumo sacerdote de Israel y acompañó a Josué en la conquista de Canaán.", v:["Nm 20:25-28","Jos 14:1"], rol:"sumo_sacerdote", libros:["Números","Josué"], epoca:"exodo", fuente:"biblica"},
  {id:"finees1", n:"Finees", bio:"Hijo de Eleazar; detuvo una plaga en Israel al actuar con celo contra la idolatría, recibiendo la promesa de un sacerdocio perpetuo para su descendencia.", v:["Nm 25:7-13","1 Cr 6:4"], rol:"sumo_sacerdote", libros:["Números","Josué","1 Crónicas"], epoca:"jueces", fuente:"biblica"},
  {id:"abisua", n:"Abisúa", bio:"Descendiente de Finees en la genealogía sacerdotal de 1 Crónicas 6.", v:["1 Cr 6:4-5"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"jueces", fuente:"biblica"},
  {id:"buqui", n:"Buqui", bio:"Descendiente de Finees en la genealogía sacerdotal de 1 Crónicas 6.", v:["1 Cr 6:5"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"jueces", fuente:"biblica"},
  {id:"uzi1", n:"Uzi", bio:"Descendiente de Finees en la genealogía sacerdotal de 1 Crónicas 6.", v:["1 Cr 6:5-6"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"jueces", fuente:"biblica"},
  {id:"zeraias", n:"Zeraías", bio:"Descendiente de Finees en la genealogía sacerdotal de 1 Crónicas 6.", v:["1 Cr 6:6"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"jueces", fuente:"biblica"},
  {id:"meraiot", n:"Meraiot", bio:"Descendiente de Finees en la genealogía sacerdotal de 1 Crónicas 6.", v:["1 Cr 6:6-7"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"amarias1_sac", n:"Amarías", bio:"Descendiente de la línea sacerdotal, mencionado en 1 Crónicas 6.", v:["1 Cr 6:7"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"ahitob1", n:"Ahitob", bio:"Descendiente de la línea sacerdotal, padre de Sadoc.", v:["1 Cr 6:7-8"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"sadoc1", n:"Sadoc", bio:"Sumo sacerdote fiel a David durante la rebelión de Absalón; ungió a Salomón como rey, consolidando su linaje sacerdotal frente a la casa rival de Elí.", v:["2 S 15:24-29","1 R 1:38-39","1 Cr 6:8"], rol:"sumo_sacerdote", libros:["2 Samuel","1 Reyes","1 Crónicas"], epoca:"monarquia_unida", fuente:"biblica", periodo:"Sumo sacerdote c. 1010–970 a.C. (bajo David y Salomón)"},
  {id:"ahimaas1", n:"Ahimaas", bio:"Hijo de Sadoc; corrió a llevar a David las noticias de la batalla contra Absalón.", v:["2 S 18:19-33","1 Cr 6:8-9"], rol:"sumo_sacerdote", libros:["2 Samuel","1 Crónicas"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"azarias1_sac", n:"Azarías", bio:"Descendiente de la línea sacerdotal, mencionado en 1 Crónicas 6.", v:["1 Cr 6:9"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"johanan1_sac", n:"Johanán", bio:"Descendiente de la línea sacerdotal, mencionado en 1 Crónicas 6.", v:["1 Cr 6:9-10"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"azarias2_sac", n:"Azarías", bio:"El que ejerció el sacerdocio en el Templo que Salomón edificó en Jerusalén, según 1 Crónicas 6:10.", v:["1 Cr 6:10"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"amarias2_sac", n:"Amarías", bio:"Descendiente de la línea sacerdotal, mencionado en 1 Crónicas 6.", v:["1 Cr 6:11"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"ahitob2", n:"Ahitob", bio:"Descendiente de la línea sacerdotal, mencionado en 1 Crónicas 6 (homónimo del padre de Sadoc, persona distinta).", v:["1 Cr 6:11-12"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"sadoc2", n:"Sadoc", bio:"Descendiente de la línea sacerdotal, mencionado en 1 Crónicas 6 (homónimo del sumo sacerdote de David, persona distinta).", v:["1 Cr 6:12"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"salum1", n:"Salum", bio:"Descendiente de la línea sacerdotal, padre de Hilcías.", v:["1 Cr 6:12-13"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"hilcias", n:"Hilcías", bio:"Sumo sacerdote que halló el libro de la Ley durante la restauración del Templo bajo el rey Josías, desencadenando una profunda reforma religiosa.", v:["2 R 22:8-14","1 Cr 6:13"], rol:"sumo_sacerdote", libros:["2 Reyes","1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Sumo sacerdote c. 640–609 a.C. (bajo Josías)"},
  {id:"azarias3_sac", n:"Azarías", bio:"Descendiente de la línea sacerdotal, mencionado en 1 Crónicas 6.", v:["1 Cr 6:13-14"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"seraias1", n:"Seraías", bio:"Sumo sacerdote en tiempos de la caída de Jerusalén; fue ejecutado por Nabucodonosor tras la conquista de la ciudad.", v:["2 R 25:18-21","1 Cr 6:14"], rol:"sumo_sacerdote", libros:["2 Reyes","1 Crónicas","Jeremías"], epoca:"exilio", fuente:"biblica"},
  {id:"josadac", n:"Josadac", bio:"También llamado Jehozadak. Sumo sacerdote llevado cautivo a Babilonia cuando Nabucodonosor destruyó Jerusalén; padre de Jesúa, quien lideraría el sacerdocio en el retorno.", v:["1 Cr 6:14-15"], rol:"sumo_sacerdote", libros:["1 Crónicas"], epoca:"exilio", fuente:"biblica", periodo:"Sumo sacerdote hasta el exilio de 586 a.C."},
  {id:"jesua_sumo", n:"Jesúa (Josué)", bio:"Sumo sacerdote del retorno del exilio, contemporáneo y colaborador de Zorobabel en la reconstrucción del Templo; el profeta Zacarías lo vio en visión vestido con ropas sucias, símbolo del pecado purificado.", v:["Esd 3:2","Hag 1:1","Zac 3"], rol:"sumo_sacerdote", libros:["Esdras","Hageo","Zacarías","Nehemías"], epoca:"retorno", fuente:"biblica", periodo:"Sumo sacerdote del retorno, c. 538–515 a.C."},
  {id:"joiacim", n:"Joiacim", bio:"Sumo sacerdote, hijo de Jesúa, mencionado en las listas sacerdotales de Nehemías.", v:["Neh 12:10","Neh 12:26"], rol:"sumo_sacerdote", libros:["Nehemías"], epoca:"retorno", fuente:"biblica"},
  {id:"eliasib", n:"Eliasib", bio:"Sumo sacerdote que colaboró en la reconstrucción del muro de Jerusalén bajo Nehemías, aunque también permitió abusos que Nehemías tuvo que corregir.", v:["Neh 3:1","Neh 12:10","Neh 13:4-9"], rol:"sumo_sacerdote", libros:["Nehemías"], epoca:"retorno", fuente:"biblica"},
  {id:"joiada1", n:"Joiada", bio:"Sumo sacerdote, hijo de Eliasib; uno de sus hijos se casó con la hija de Sanbalat, lo que provocó su expulsión por Nehemías.", v:["Neh 12:10","Neh 13:28"], rol:"sumo_sacerdote", libros:["Nehemías"], epoca:"retorno", fuente:"biblica"},
  {id:"johanan2_sumo", n:"Johanán", bio:"También llamado Jonatán. Sumo sacerdote mencionado en las listas de Nehemías y en los documentos de Elefantina, hacia finales del siglo V a.C.", v:["Neh 12:11","Neh 12:22","Esd 10:6"], rol:"sumo_sacerdote", libros:["Nehemías","Esdras"], epoca:"retorno", fuente:"biblica"},
  {id:"jadua", n:"Jadúa", bio:"Último sumo sacerdote mencionado por nombre en el Antiguo Testamento (Nehemías), situado hacia la época de Alejandro Magno según referencias históricas posteriores.", v:["Neh 12:11","Neh 12:22"], rol:"sumo_sacerdote", libros:["Nehemías"], epoca:"retorno", fuente:"biblica"},
  {id:"anas", n:"Anás (Ananás)", bio:"Sumo sacerdote nombrado por Roma el año 6 d.C. y depuesto poco después, pero que conservó enorme influencia religiosa; Jesús fue interrogado primero ante él. Entre Jadúa y Anás median más de tres siglos sin una genealogía sacerdotal continua en el texto bíblico: el período intertestamentario (asmoneo y herodiano) se conoce por fuentes históricas como Flavio Josefo, no por una lista bíblica de generaciones.", v:["Lc 3:2","Jn 18:13","Hch 4:6"], rol:"sumo_sacerdote", libros:["Lucas","Juan","Hechos"], epoca:"vida_jesus", fuente:"extrabiblica", periodo:"Sumo sacerdote 6–15 d.C."},
  {id:"caifas", n:"Caifás", bio:"Yerno de Anás y sumo sacerdote titular durante el juicio de Jesús; según el Evangelio de Juan, profetizó sin saberlo que convenía que un solo hombre muriera por el pueblo.", v:["Mt 26:57-68","Jn 11:49-52","Jn 18:13-14","Hch 4:6"], rol:"sumo_sacerdote", libros:["Mateo","Juan","Hechos"], epoca:"vida_jesus", fuente:"biblica", periodo:"Sumo sacerdote 18–36 d.C."},
  {id:"ananias_hch23", n:"Ananías", bio:"Sumo sacerdote ante quien el apóstol Pablo fue llevado a juicio años después de la muerte de Jesús; ordenó golpear a Pablo en pleno interrogatorio.", v:["Hch 23:1-5","Hch 24:1"], rol:"sumo_sacerdote", libros:["Hechos"], epoca:"vida_jesus", fuente:"biblica", periodo:"Sumo sacerdote c. 47–59 d.C."},

  /* --- Otros hijos de David (no continúan la línea hacia Jesús) --- */
  {id:"amnon", n:"Amnón", bio:"Hijo mayor de David; violó a su media hermana Tamar y fue asesinado por orden de Absalón en venganza.", v:["2 S 13"], rol:null, libros:["2 Samuel"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"tamar1", n:"Tamar", bio:"Hija de David, hermana de Absalón; sufrió la violación de su medio hermano Amnón.", v:["2 S 13"], rol:null, libros:["2 Samuel"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"absalon", n:"Absalón", bio:"Hijo de David, célebre por su belleza; vengó a su hermana Tamar y luego encabezó una rebelión contra su propio padre, muriendo colgado por su cabello en un roble.", v:["2 S 13-18"], rol:null, libros:["2 Samuel"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"adonias", n:"Adonías", bio:"Hijo de David; intentó proclamarse rey antes de la muerte de su padre, pero el trono fue para Salomón. Fue ejecutado más tarde por orden de Salomón.", v:["1 R 1-2"], rol:null, libros:["1 Reyes"], epoca:"monarquia_unida", fuente:"biblica"},

  /* ============ RAMA DE MATEO: David → José, vía Salomón y los reyes de Judá ============ */
  {id:"salomon", n:"Salomón", bio:"Hijo de David y Betsabé; el rey más sabio y rico de Israel, constructor del primer Templo de Jerusalén.", v:["1 R 1-11"], rol:"rey", libros:["1 Reyes","2 Crónicas","Proverbios","Mateo"], epoca:"monarquia_unida", fuente:"biblica", periodo:"Reinó c. 970–931 a.C."},
  {id:"roboam", n:"Roboam", bio:"Hijo de Salomón; su gobierno intransigente provocó la división del reino en Israel (norte) y Judá (sur).", v:["1 R 12","2 Cr 10-12"], rol:"rey", libros:["1 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 931–913 a.C."},
  {id:"abias1", n:"Abías", bio:"Rey de Judá; derrotó a Israel apelando a la legitimidad del linaje davídico y el culto en Jerusalén.", v:["1 R 15:1-8","2 Cr 13"], rol:"rey", libros:["1 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 913–911 a.C."},
  {id:"asa1", n:"Asa", bio:"Rey de Judá que promovió reformas religiosas contra la idolatría, aunque en su vejez buscó alianza con Siria en vez de confiar en Dios.", v:["1 R 15:9-24","2 Cr 14-16"], rol:"rey", libros:["1 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 911–870 a.C."},
  {id:"josafat", n:"Josafat", bio:"Rey de Judá conocido por sus reformas judiciales y religiosas, y por su alianza con el reino del norte.", v:["1 R 22","2 Cr 17-20"], rol:"rey", libros:["1 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 870–848 a.C."},
  {id:"joram1", n:"Joram", bio:"Rey de Judá; se casó con Atalía, hija de Acab, e introdujo la idolatría de la casa de Omri en Judá.", v:["2 R 8:16-24","2 Cr 21"], rol:"rey", libros:["2 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 848–841 a.C."},
  {id:"uzias", n:"Uzías (Ozías)", bio:"Rey de Judá de largo y próspero reinado; al final se enorgulleció y quiso ofrecer incienso en el Templo, por lo que fue herido de lepra. Mateo omite tres reyes entre Joram y Uzías (Ocozías, Joás y Amasías) para mantener una simetría de catorce generaciones en su genealogía.", v:["2 R 15:1-7","2 Cr 26"], rol:"rey", libros:["2 Reyes","2 Crónicas","Isaías","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 792–740 a.C."},
  {id:"jotam1", n:"Jotam", bio:"Rey de Judá que consolidó las fortificaciones del reino y fue considerado recto ante Dios.", v:["2 R 15:32-38","2 Cr 27"], rol:"rey", libros:["2 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 750–732 a.C. (con corregencia)"},
  {id:"acaz1", n:"Acaz", bio:"Rey de Judá que promovió abiertamente la idolatría y buscó la protección de Asiria pagando tributo.", v:["2 R 16","2 Cr 28"], rol:"rey", libros:["2 Reyes","2 Crónicas","Isaías","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 732–715 a.C."},
  {id:"ezequias", n:"Ezequías", bio:"Rey de Judá conocido por sus reformas religiosas y por resistir el asedio asirio de Senaquerib; su vida fue prolongada milagrosamente 15 años.", v:["2 R 18-20","2 Cr 29-32"], rol:"rey", libros:["2 Reyes","2 Crónicas","Isaías","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 715–686 a.C."},
  {id:"manases1", n:"Manasés", bio:"Rey de Judá de reinado extenso pero profundamente idólatra; según Crónicas, se arrepintió tras ser llevado cautivo a Babilonia.", v:["2 R 21:1-18","2 Cr 33:1-20"], rol:"rey", libros:["2 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 697–642 a.C. (con corregencia)"},
  {id:"amon1", n:"Amón", bio:"Rey de Judá de breve reinado, asesinado por sus propios siervos.", v:["2 R 21:19-26","2 Cr 33:21-25"], rol:"rey", libros:["2 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 642–640 a.C."},
  {id:"josias", n:"Josías", bio:"Rey de Judá que llevó adelante una profunda reforma religiosa tras el hallazgo del libro de la ley en el Templo; murió en batalla contra Egipto en Meguido.", v:["2 R 22-23","2 Cr 34-35"], rol:"rey", libros:["2 Reyes","2 Crónicas","Mateo"], epoca:"monarquia_dividida", fuente:"biblica", periodo:"Reinó c. 640–609 a.C."},
  {id:"jeconias", n:"Jeconías", bio:"También llamado Joaquín. Rey de Judá exiliado a Babilonia junto a su corte tras un breve reinado de tres meses; marca, en Mateo, el punto de la deportación.", v:["2 R 24:8-17","Mt 1:11-12"], rol:"rey", libros:["2 Reyes","Mateo"], epoca:"exilio", fuente:"biblica", periodo:"Reinó 3 meses, 597 a.C., luego exiliado"},
  {id:"salatiel_mt", n:"Salatiel", bio:"Hijo de Jeconías, nacido o criado en el exilio babilónico; padre (o antepasado inmediato, según Esdras) de Zorobabel.", v:["1 Cr 3:17","Mt 1:12"], rol:null, libros:["1 Crónicas","Mateo"], epoca:"exilio", fuente:"biblica"},
  {id:"zorobabel_mt", n:"Zorobabel", bio:"Líder del primer grupo de judíos que regresó del exilio babilónico; dirigió la reconstrucción del Templo de Jerusalén.", v:["Esd 2-5","Hag 1-2","Mt 1:12-13"], rol:null, libros:["Esdras","Hageo","Zacarías","Mateo"], epoca:"retorno", fuente:"biblica"},
  {id:"abiud", n:"Abiud", bio:"Mencionado únicamente en la genealogía de Mateo como descendiente de Zorobabel; no se conserva otra información bíblica sobre él.", v:["Mt 1:13"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"eliaquim_mt", n:"Eliaquim", bio:"Mencionado únicamente en la genealogía de Mateo; no se conserva otra información bíblica sobre él.", v:["Mt 1:13"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"azor", n:"Azor", bio:"Mencionado únicamente en la genealogía de Mateo; no se conserva otra información bíblica sobre él.", v:["Mt 1:13-14"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"sadoc_mt", n:"Sadoc", bio:"Mencionado únicamente en la genealogía de Mateo (homónimo del célebre sumo sacerdote Sadoc, pero una persona distinta); no se conserva otra información bíblica sobre él.", v:["Mt 1:14"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"aquim", n:"Aquim", bio:"Mencionado únicamente en la genealogía de Mateo; no se conserva otra información bíblica sobre él.", v:["Mt 1:14"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"eliud", n:"Eliud", bio:"Mencionado únicamente en la genealogía de Mateo; no se conserva otra información bíblica sobre él.", v:["Mt 1:14-15"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"eleazar_mt", n:"Eleazar", bio:"Mencionado únicamente en la genealogía de Mateo (homónimo del hijo de Aarón, pero una persona distinta); no se conserva otra información bíblica sobre él.", v:["Mt 1:15"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"matan", n:"Matán", bio:"Padre de Jacob y abuelo de José, esposo de María, según Mateo.", v:["Mt 1:15"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"jacob2", n:"Jacob", bio:"Padre de José, esposo de María, según la genealogía de Mateo (homónimo del patriarca Jacob, pero una persona distinta, unas 40 generaciones posterior).", v:["Mt 1:15-16"], rol:null, libros:["Mateo"], epoca:"intertestamentario", fuente:"biblica"},

  /* ============ RAMA DE LUCAS: David → José, vía Natán ============
     Nota: la cronología de esta rama entre el exilio y la época de Jesús
     es aproximada; salvo Zorobabel y Salatiel, ninguno de estos nombres
     tiene atestación fuera de Lucas 3, por lo que no es posible fecharlos
     con precisión. Revisa el orden contra Lucas 3:23-31 antes de publicar. */
  {id:"natan1", n:"Natán", bio:"Hijo de David y Betsabé, hermano de Salomón; a través de él, Lucas traza la genealogía de Jesús.", v:["2 S 5:14","1 Cr 3:5","Lc 3:31"], rol:null, libros:["2 Samuel","1 Crónicas","Lucas"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"matata", n:"Matata", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:31"], rol:null, libros:["Lucas"], epoca:"monarquia_unida", fuente:"biblica"},
  {id:"mainan", n:"Mainán", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:31"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"melea", n:"Melea", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:31"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"eliaquim_lc", n:"Eliaquim", bio:"Mencionado únicamente en la genealogía de Lucas (homónimo de otro Eliaquim en la rama de Mateo, persona distinta); no se conserva otra información bíblica sobre él.", v:["Lc 3:30"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"jonan", n:"Jonán", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:30"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"jose_lc1", n:"José", bio:"Mencionado únicamente en la genealogía de Lucas (uno de varios llamados 'José' en esta lista, persona distinta del esposo de María); no se conserva otra información bíblica sobre él.", v:["Lc 3:30"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"juda_lc1", n:"Judá", bio:"Mencionado únicamente en la genealogía de Lucas (homónimo del patriarca, persona distinta); no se conserva otra información bíblica sobre él.", v:["Lc 3:30"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"simeon_lc", n:"Simeón", bio:"Mencionado únicamente en la genealogía de Lucas (homónimo de otros personajes bíblicos, persona distinta); no se conserva otra información bíblica sobre él.", v:["Lc 3:30"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"levi_lc1", n:"Leví", bio:"Mencionado únicamente en la genealogía de Lucas (homónimo del patriarca, persona distinta); no se conserva otra información bíblica sobre él.", v:["Lc 3:29"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"matat_lc1", n:"Matat", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:29"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"jorim", n:"Jorim", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:29"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"eliezer_lc", n:"Eliezer", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:29"], rol:null, libros:["Lucas"], epoca:"monarquia_dividida", fuente:"biblica"},
  {id:"jose_lc2", n:"José", bio:"Mencionado únicamente en la genealogía de Lucas (uno de varios llamados 'José' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:29"], rol:null, libros:["Lucas"], epoca:"exilio", fuente:"biblica"},
  {id:"er1", n:"Er", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:28"], rol:null, libros:["Lucas"], epoca:"exilio", fuente:"biblica"},
  {id:"elmodam", n:"Elmodam", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:28"], rol:null, libros:["Lucas"], epoca:"exilio", fuente:"biblica"},
  {id:"cosam", n:"Cosam", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:28"], rol:null, libros:["Lucas"], epoca:"exilio", fuente:"biblica"},
  {id:"adi", n:"Adi", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:28"], rol:null, libros:["Lucas"], epoca:"exilio", fuente:"biblica"},
  {id:"melqui_lc1", n:"Melqui", bio:"Mencionado únicamente en la genealogía de Lucas (uno de dos llamados 'Melqui' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:28"], rol:null, libros:["Lucas"], epoca:"exilio", fuente:"biblica"},
  {id:"neri", n:"Neri", bio:"Padre de Salatiel según Lucas, contemporáneo aproximado del exilio babilónico.", v:["Lc 3:27"], rol:null, libros:["Lucas"], epoca:"exilio", fuente:"biblica"},
  {id:"salatiel_lc", n:"Salatiel", bio:"Mencionado en la genealogía de Lucas como hijo de Neri. Algunos estudiosos lo identifican con el Salatiel de la rama de Mateo (hijo de Jeconías), explicando la coincidencia por un matrimonio de levirato; otros los consideran dos personas distintas.", v:["Lc 3:27"], rol:null, libros:["Lucas"], epoca:"retorno", fuente:"biblica"},
  {id:"zorobabel_lc", n:"Zorobabel", bio:"Mencionado en la genealogía de Lucas como hijo de Salatiel. Comparte nombre con el líder del retorno del exilio de la rama de Mateo; la relación exacta entre ambos registros es debatida por los estudiosos.", v:["Lc 3:27"], rol:null, libros:["Lucas"], epoca:"retorno", fuente:"biblica"},
  {id:"resa", n:"Resa", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:27"], rol:null, libros:["Lucas"], epoca:"retorno", fuente:"biblica"},
  {id:"joana1", n:"Joana", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:27"], rol:null, libros:["Lucas"], epoca:"retorno", fuente:"biblica"},
  {id:"juda_lc2", n:"Judá", bio:"Mencionado únicamente en la genealogía de Lucas (uno de varios llamados 'Judá' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:26"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"jose_lc3", n:"José", bio:"Mencionado únicamente en la genealogía de Lucas (uno de varios llamados 'José' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:26"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"semei", n:"Semei", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:26"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"matatias_lc1", n:"Matatías", bio:"Mencionado únicamente en la genealogía de Lucas (uno de dos llamados 'Matatías' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:26"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"maat", n:"Maat", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:26"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"nagai", n:"Nagai", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:25"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"esli", n:"Esli", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:25"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"nahum1", n:"Nahúm", bio:"Mencionado únicamente en la genealogía de Lucas (homónimo del profeta Nahúm, persona distinta); no se conserva otra información bíblica sobre él.", v:["Lc 3:25"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"amos1", n:"Amós", bio:"Mencionado únicamente en la genealogía de Lucas (homónimo del profeta Amós, persona distinta); no se conserva otra información bíblica sobre él.", v:["Lc 3:25"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"matatias_lc2", n:"Matatías", bio:"Mencionado únicamente en la genealogía de Lucas (uno de dos llamados 'Matatías' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:25"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"jose_lc4", n:"José", bio:"Mencionado únicamente en la genealogía de Lucas (uno de varios llamados 'José' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:24"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"jana1", n:"Jana", bio:"Mencionado únicamente en la genealogía de Lucas; no se conserva otra información bíblica sobre él.", v:["Lc 3:24"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"melqui_lc2", n:"Melqui", bio:"Mencionado únicamente en la genealogía de Lucas (uno de dos llamados 'Melqui' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:24"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"levi_lc2", n:"Leví", bio:"Mencionado únicamente en la genealogía de Lucas (uno de dos llamados 'Leví' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:24"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"matat_lc2", n:"Matat", bio:"Mencionado únicamente en la genealogía de Lucas (uno de dos llamados 'Matat' en esta lista); no se conserva otra información bíblica sobre él.", v:["Lc 3:24"], rol:null, libros:["Lucas"], epoca:"intertestamentario", fuente:"biblica"},
  {id:"eli1", n:"Elí (Helí)", bio:"Padre de María, la madre de Jesús. Lucas registra la genealogía de José a través de su suegro Elí, según la costumbre judía de contar el yerno como hijo por matrimonio.", v:["Lc 3:23"], rol:null, libros:["Lucas"], epoca:"vida_jesus", fuente:"biblica"},
  {id:"maria_madre", n:"María", bio:"Joven de Nazaret elegida para ser la madre de Jesús por obra del Espíritu Santo; su 'sí' al anuncio del ángel Gabriel es central en los relatos de la natividad.", v:["Lc 1:26-56","Mt 1:18-25","Jn 2:1-11","Hch 1:14"], rol:null, libros:["Mateo","Lucas","Juan","Hechos"], epoca:"vida_jesus", fuente:"biblica", periodo:"Activa c. 6 a.C.–33 d.C. (año de nacimiento no registrado)"},

  /* --- Convergencia de ambas ramas --- */
  {id:"jose_esposo_maria", n:"José", bio:"Esposo de María y padre legal de Jesús; descendiente de David. Carpintero de Nazaret, obedeció las instrucciones angélicas para proteger a María y al niño Jesús, incluyendo la huida a Egipto.", v:["Mt 1:16-25","Mt 2","Lc 1-2"], rol:null, libros:["Mateo","Lucas"], epoca:"vida_jesus", fuente:"biblica", periodo:"Activo c. 6 a.C.–6 d.C. (año de nacimiento no registrado)"},
  {id:"jesus", n:"Jesús", bio:"El Mesías prometido, hijo de María y, legalmente, de José; su nacimiento en Belén cumple la genealogía trazada desde Adán, pasando por Abraham y David.", v:["Mt 1-2","Lc 1-2"], rol:null, libros:["Mateo","Marcos","Lucas","Juan"], epoca:"vida_jesus", fuente:"biblica", periodo:"n. c. 6–4 a.C. – m. c. 30 d.C."}
];

const PERSONAS_BY_ID = Object.fromEntries(PERSONAS.map(p => [p.id, p]));
