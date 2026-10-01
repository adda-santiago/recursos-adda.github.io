/* =====================================================
   DATA.JS — Contenido editable: reyes, jueces, profetas
   y eventos de contexto histórico.
   Edita SOLO este archivo para agregar/corregir personajes
   o eventos. No toques index.html ni app.js para esto.
   ===================================================== */

/* ============ DATOS: REYES ============ */
const unidos = [
  {name:"Saúl", start:1050, end:1010, ev:"malo", ref:"1 Samuel 9–31",
   note:"Primer rey de Israel, elegido por petición del pueblo. Comenzó bien, pero la desobediencia, la impaciencia religiosa y los celos hacia David marcaron su reinado. Murió por su propia mano en la batalla de Gilboa frente a los filisteos."},
  {name:"David", start:1010, end:970, ev:"bueno", ref:"1 Samuel 16 – 1 Reyes 2; 1 Crónicas 11–29; Salmos",
   note:"Llamado “varón conforme al corazón de Dios” (1 Samuel 13:14), pese a pecados graves como el adulterio con Betsabé y el homicidio de Urías. Con él, Dios estableció un pacto de dinastía eterna (2 Samuel 7)."},
  {name:"Salomón", start:970, end:931, ev:"mixto", ref:"1 Reyes 1–11; 2 Crónicas 1–9",
   note:"Construyó el templo de Jerusalén y gobernó con una sabiduría proverbial (1 Reyes 3–4). Sus matrimonios políticos con mujeres extranjeras lo llevaron a tolerar la idolatría, sembrando el descontento que provocaría la división del reino."}
];

const judah = [
  {name:"Roboam", start:931, end:913, ev:"malo", ref:"1 Reyes 12; 14:21-31; 2 Crónicas 10–12",
   note:"Hijo de Salomón. Su trato duro hacia el pueblo provocó que las diez tribus del norte se rebelaran y formaran el Reino de Israel, dividiendo la nación en 931 a.C."},
  {name:"Abías", start:913, end:911, ev:"malo", ref:"1 Reyes 15:1-8; 2 Crónicas 13",
   note:"Reinado breve. Peleó contra Jeroboam I de Israel y obtuvo una victoria notable, aunque su corazón no fue íntegro como el de David."},
  {name:"Asá", start:911, end:870, ev:"bueno", ref:"1 Reyes 15:9-24; 2 Crónicas 14–16",
   note:"Reformador religioso que quitó ídolos y fortaleció el culto a Yahvé. Hacia el final de su reinado buscó una alianza con Ben-adad de Siria en lugar de confiar en Dios."},
  {name:"Josafat", start:870, end:848, ev:"bueno", ref:"1 Reyes 22:41-50; 2 Crónicas 17–20",
   note:"Rey piadoso y reformador judicial, pero sus alianzas con la casa de Acab (Israel) trajeron consecuencias negativas para Judá."},
  {name:"Jorám", start:848, end:841, ev:"malo", ref:"2 Reyes 8:16-24; 2 Crónicas 21",
   note:"Casado con Atalía, hija de Acab y Jezabel; introdujo el culto a Baal en Judá y asesinó a sus propios hermanos para asegurar el trono."},
  {name:"Ocozías", start:841, end:841, ev:"malo", ref:"2 Reyes 8:25-29; 9:27-29; 2 Crónicas 22",
   note:"Reinó menos de un año. Murió a manos de Jehú mientras visitaba a su tío Joram, rey de Israel."},
  {name:"Atalía (reina)", start:841, end:835, ev:"malo", ref:"2 Reyes 11; 2 Crónicas 22:10-23:15",
   note:"Única mujer que gobernó Judá. Hija de Acab y Jezabel; tras la muerte de su hijo Ocozías, mandó matar a toda la familia real para usurpar el trono. Fue derrocada por el sacerdote Joiada."},
  {name:"Joás", start:835, end:796, ev:"mixto", ref:"2 Reyes 11:21-12:21; 2 Crónicas 24",
   note:"Coronado a los 7 años tras ser rescatado de la masacre de Atalía. Hizo lo recto mientras vivió el sacerdote Joiada, pero después se desvió y ordenó matar al profeta Zacarías, hijo de Joiada."},
  {name:"Amasías", start:796, end:767, ev:"mixto", ref:"2 Reyes 14:1-22; 2 Crónicas 25",
   note:"Comenzó bien y venció a Edom, pero luego adoptó dioses edomitas y provocó una guerra innecesaria con Israel que terminó en derrota humillante."},
  {name:"Uzías (Azarías)", start:767, end:740, ev:"mixto", ref:"2 Reyes 15:1-7; 2 Crónicas 26",
   note:"Coreinó con su padre Amasías desde cerca de 792 a.C.; su reinado en solitario se suele fechar 767–740 a.C. Llevó a Judá a gran expansión y prosperidad, pero el orgullo lo llevó a usurpar funciones sacerdotales, por lo que fue herido de lepra hasta su muerte."},
  {name:"Jotam", start:750, end:732, ev:"bueno", ref:"2 Reyes 15:32-38; 2 Crónicas 27",
   note:"Coreinó con su padre Uzías desde aprox. 750 a.C. debido a la lepra de este. Fortaleció militarmente a Judá y se mantuvo fiel a Dios, aunque no quitó todos los lugares de culto idolátrico."},
  {name:"Acaz", start:735, end:715, ev:"malo", ref:"2 Reyes 16; 2 Crónicas 28",
   note:"Ante la amenaza de la alianza siro-efrainita, buscó ayuda del imperio asirio en vez de confiar en Dios, convirtiendo a Judá en vasallo de Asiria. Practicó el sacrificio de sus propios hijos."},
  {name:"Ezequías", start:715, end:686, ev:"bueno", ref:"2 Reyes 18–20; 2 Crónicas 29–32; Isaías 36–39",
   note:"Uno de los reyes más piadosos de Judá; llevó una profunda reforma religiosa. Jerusalén fue librada milagrosamente del sitio del rey asirio Senaquerib (701 a.C.). Su cronología exacta —por posibles corregencias con Acaz— ha sido debatida por historiadores; algunos la ubican hasta una década antes."},
  {name:"Manasés", start:696, end:642, ev:"malo", ref:"2 Reyes 21:1-18; 2 Crónicas 33:1-20",
   note:"El reinado más largo de Judá (coreinó con su padre Ezequías desde cerca de 696 a.C.) y también el más idólatra: derramó sangre inocente y llenó Jerusalén de altares paganos. 2 Crónicas 33:12-13 sugiere que se arrepintió al final de su vida."},
  {name:"Amón", start:642, end:640, ev:"malo", ref:"2 Reyes 21:19-26; 2 Crónicas 33:21-25",
   note:"Continuó la idolatría de su padre Manasés. Fue asesinado por sus propios oficiales tras solo dos años de reinado."},
  {name:"Josías", start:640, end:609, ev:"bueno", ref:"2 Reyes 22–23; 2 Crónicas 34–35",
   note:"Subió al trono con solo 8 años. Durante una reparación del templo se halló el “libro de la ley”, lo que desató la última gran reforma religiosa antes del exilio. Murió en batalla contra Egipto en Meguido."},
  {name:"Joacaz", start:609, end:609, ev:"malo", ref:"2 Reyes 23:31-33; 2 Crónicas 36:1-4",
   note:"Reinó solo tres meses antes de ser depuesto y deportado a Egipto por el faraón Necao II."},
  {name:"Joacim", start:609, end:598, ev:"malo", ref:"2 Reyes 23:34-24:7; 2 Crónicas 36:5-8; Jeremías 22, 36",
   note:"Puesto en el trono por Egipto y luego vasallo de Babilonia. Persiguió al profeta Jeremías y quemó uno de sus rollos."},
  {name:"Joaquín", start:598, end:597, ev:"malo", ref:"2 Reyes 24:8-16; 2 Crónicas 36:9-10",
   note:"Reinó solo tres meses antes de ser deportado a Babilonia por Nabucodonosor II, junto con gran parte de la nobleza de Judá (primera gran deportación, 597 a.C.)."},
  {name:"Sedequías", start:597, end:586, ev:"malo", ref:"2 Reyes 24:17-25:21; 2 Crónicas 36:11-21; Jeremías 39, 52",
   note:"Último rey de Judá. Su rebelión contra Babilonia, contra el consejo del profeta Jeremías, provocó el sitio y destrucción de Jerusalén y el templo en 586 a.C."}
];

const israel = [
  {name:"Jeroboam I", start:931, end:910, ev:"malo", ref:"1 Reyes 12:20-14:20; 2 Crónicas 13",
   note:"Primer rey del Reino del Norte. Instituyó becerros de oro en Dan y Betel para evitar que el pueblo peregrinara a Jerusalén; su nombre se volvió sinónimo del “pecado de Jeroboam” repetido en casi todos los reyes de Israel."},
  {name:"Nadab", start:910, end:909, ev:"malo", ref:"1 Reyes 15:25-31",
   note:"Continuó los pecados de su padre Jeroboam I. Fue asesinado por Baasá, quien tomó el trono."},
  {name:"Baasá", start:909, end:886, ev:"malo", ref:"1 Reyes 15:27-16:7",
   note:"Exterminó a toda la casa de Jeroboam, cumpliendo una profecía, pero repitió los mismos pecados idolátricos."},
  {name:"Elá", start:886, end:885, ev:"malo", ref:"1 Reyes 16:8-14",
   note:"Asesinado mientras estaba ebrio por su propio oficial, Zimri, quien usurpó el trono."},
  {name:"Zimri", start:885, end:885, ev:"malo", ref:"1 Reyes 16:9-20",
   note:"Usurpó el trono y reinó apenas siete días antes de quitarse la vida al verse cercado por Omri."},
  {name:"Omri", start:885, end:874, ev:"malo", ref:"1 Reyes 16:21-28",
   note:"Fundó la dinastía más estable del Reino del Norte y construyó Samaria como nueva capital, pero “hizo lo malo… más que todos los que reinaron antes de él”."},
  {name:"Acab", start:874, end:853, ev:"malo", ref:"1 Reyes 16:29-22:40",
   note:"Junto a su esposa fenicia Jezabel, promovió activamente el culto a Baal y persiguió a los profetas de Yahvé. Se enfrentó al profeta Elías en el Monte Carmelo."},
  {name:"Ocozías", start:853, end:852, ev:"malo", ref:"1 Reyes 22:51-2 Reyes 1:18",
   note:"Hijo de Acab. Reinó brevemente y murió tras una caída, sin arrepentirse de la idolatría familiar."},
  {name:"Jorám (Joram)", start:852, end:841, ev:"malo", ref:"2 Reyes 3:1-9:26",
   note:"Último rey de la dinastía de Omri. Fue asesinado por Jehú, quien también dio muerte a Jezabel, cumpliendo el juicio anunciado por Elías."},
  {name:"Jehú", start:841, end:814, ev:"mixto", ref:"2 Reyes 9–10",
   note:"Ungido para acabar con la dinastía de Omri y el culto a Baal, pero no abandonó los becerros de oro de Jeroboam. Su reinado quedó registrado fuera de la Biblia en el Obelisco Negro de Salmanasar III de Asiria."},
  {name:"Joacaz", start:814, end:798, ev:"malo", ref:"2 Reyes 13:1-9",
   note:"Reinado marcado por la opresión de Siria (Hazael y Ben-adad); Dios tuvo misericordia de Israel a pesar de su idolatría."},
  {name:"Joás (Jehoás)", start:798, end:782, ev:"malo", ref:"2 Reyes 13:10-25",
   note:"Visitó al profeta Eliseo en su lecho de muerte y recuperó ciudades perdidas ante Siria, aunque continuó en los pecados de Jeroboam."},
  {name:"Jeroboam II", start:793, end:753, ev:"malo", ref:"2 Reyes 14:23-29",
   note:"Coreinó con su padre Joás desde cerca de 793 a.C. Bajo su gobierno el Reino del Norte alcanzó su mayor expansión y prosperidad, con una desigualdad social profunda denunciada por Amós y Oseas."},
  {name:"Zacarías", start:753, end:752, ev:"malo", ref:"2 Reyes 15:8-12",
   note:"Último de la dinastía de Jehú. Asesinado a los seis meses de reinado, cumpliendo la profecía de que esa dinastía llegaría hasta la cuarta generación."},
  {name:"Salum", start:752, end:752, ev:"malo", ref:"2 Reyes 15:13-15",
   note:"Usurpador que reinó apenas un mes antes de ser asesinado por Manahem."},
  {name:"Manahem", start:752, end:742, ev:"malo", ref:"2 Reyes 15:14-22",
   note:"Gobernó con extrema crueldad y pagó un enorme tributo a Tiglat-pileser III de Asiria para conservar su trono, marcando el inicio de la sumisión de Israel a Asiria."},
  {name:"Pekaía", start:742, end:740, ev:"malo", ref:"2 Reyes 15:23-26",
   note:"Asesinado por su propio oficial Peka tras solo dos años de reinado."},
  {name:"Peka", start:752, end:732, ev:"malo", ref:"2 Reyes 15:27-31",
   note:"Reinó como rival desde 752 a.C. antes de tomar el trono en solitario en 740 a.C. Su alianza con Siria contra Judá aceleró la caída del propio Reino del Norte."},
  {name:"Oseas", start:732, end:722, ev:"malo", ref:"2 Reyes 17",
   note:"Último rey de Israel. Su rebelión contra Asiria provocó que Sargón II sitiara y conquistara Samaria en 722 a.C., deportando a las diez tribus del norte y poniendo fin al Reino de Israel."}
];

/* ============ DATOS: JUECES (solo Sansón y Samuel) ============ */
const jueces = [
  {name:"Sansón", start:1075, end:1055, tipo:"juez", ref:"Jueces 13–16",
   note:"Nazareo dotado de fuerza sobrenatural en su cabello; su debilidad por Dalila lo llevó a la ruina, aunque murió derribando el templo de Dagón sobre los filisteos."},
  {name:"Samuel", start:1070, end:1010, tipo:"juez", ref:"1 Samuel 1–25",
   note:"Último de los jueces y primer gran profeta tras Moisés; ungió a Saúl y luego a David como reyes, marcando la transición hacia la monarquía. Sus fechas se solapan con las de Sansón, ya que el período de los jueces no fue continuo ni centralizado."}
];

/* ============ DATOS: PROFETAS DEL SUR (Judá) ============ */
const profetasSur = [
  {name:"Isaías", start:740, end:681, tipo:"profeta", ref:"Isaías 1–66",
   note:"Uno de los profetas mayores; ministró en Judá durante Uzías, Jotam, Acaz y Ezequías, anunciando tanto juicio como esperanza mesiánica."},
  {name:"Miqueas", start:735, end:700, tipo:"profeta", ref:"Miqueas 1–7",
   note:"Contemporáneo de Isaías; anunció el nacimiento del Mesías en Belén (Miqueas 5:2)."},
  {name:"Sofonías", start:640, end:609, tipo:"profeta", ref:"Sofonías 1–3",
   note:"Ministró durante el reinado de Josías, anunciando el “día del Señor”."},
  {name:"Nahúm", start:634, end:626, tipo:"profeta", ref:"Nahúm 1–3",
   note:"Profeta judío que anunció la caída de Nínive, capital asiria, cumplida en 612 a.C."},
  {name:"Habacuc", start:609, end:598, tipo:"profeta", ref:"Habacuc 1–3",
   note:"Cuestionó a Dios sobre el uso de Babilonia como instrumento de juicio contra Judá."},
  {name:"Jeremías", start:627, end:580, tipo:"profeta", ref:"Jeremías 1–52",
   note:"El “profeta llorón”; ministró durante los últimos cinco reyes de Judá, anunciando la caída de Jerusalén y luego consolando a los exiliados."},
  {name:"Ezequiel", start:593, end:571, tipo:"profeta", ref:"Ezequiel 1–48",
   note:"Profetizó entre los exiliados de Judá en Babilonia, anunciando tanto el juicio final sobre Jerusalén como la restauración futura."},
  {name:"Daniel", start:605, end:536, tipo:"profeta", ref:"Daniel 1–12",
   note:"Exiliado de Judá a Babilonia desde joven; sirvió en las cortes de Nabucodonosor, Belsasar, Darío y Ciro, y recibió visiones sobre los imperios futuros."}
];

/* ============ DATOS: PROFETAS DEL NORTE (Israel) ============ */
const profetasNorte = [
  {name:"Elías", start:875, end:848, tipo:"profeta", ref:"1 Reyes 17 – 2 Reyes 2",
   note:"Profeta del Reino del Norte; enfrentó a Acab y Jezabel, desafió a los profetas de Baal en el Monte Carmelo y fue llevado al cielo en un torbellino."},
  {name:"Eliseo", start:848, end:797, tipo:"profeta", ref:"2 Reyes 2–13",
   note:"Sucesor de Elías; realizó numerosos milagros y aconsejó a varios reyes de Israel."},
  {name:"Jonás", start:786, end:746, tipo:"profeta", ref:"Jonás 1–4; 2 Reyes 14:25",
   note:"Profeta israelita de Gat-hefer enviado a predicar a Nínive; su historia muestra la misericordia de Dios incluso hacia los enemigos de Israel."},
  {name:"Amós", start:767, end:753, tipo:"profeta", ref:"Amós 1–9",
   note:"Pastor de Judá enviado a profetizar contra el Reino del Norte; denunció la injusticia social y la religiosidad vacía durante el auge económico de Jeroboam II."},
  {name:"Oseas", start:750, end:715, tipo:"profeta", ref:"Oseas 1–14",
   note:"Profeta del Reino del Norte; usando la metáfora de un matrimonio infiel, anunció el juicio venidero sobre Israel."}
];

/* ============ DATOS: CONTEXTO HISTÓRICO GLOBAL ============ */
const contexto = [
  {year:1046, tipo:"imperio", label:"Se establece la dinastía Zhou en China", note:"Un marcador de contexto verdaderamente global: mientras Israel tenía sus primeros reyes, en el otro extremo del mundo antiguo comenzaba una de las dinastías chinas más influyentes."},
  {year:1000, tipo:"cultural", label:"Los fenicios expanden el comercio marítimo y el alfabeto", note:"Vecinos de Israel en la costa (Tiro, Sidón), los fenicios difundieron por el Mediterráneo el alfabeto del que descienden el hebreo, el griego y el latino."},
  {year:925, tipo:"evento", label:"El faraón Sisac invade Palestina", note:"Poco después de la división del reino, el faraón egipcio Sisac (Sheshonq I) saqueó Jerusalén y otras ciudades (1 Reyes 14:25-26)."},
  {year:883, tipo:"imperio", label:"Asurnasirpal II expande el Imperio Asirio", note:"Asiria comienza a consolidarse como la gran potencia militar de Mesopotamia (883–859 a.C.), una amenaza creciente para Israel y Judá."},
  {year:853, tipo:"evento", label:"Batalla de Qarqar", note:"Registrada en inscripciones asirias, muestra que Acab de Israel formó parte de una coalición siria que detuvo temporalmente el avance asirio de Salmanasar III."},
  {year:841, tipo:"evento", label:"Jehú paga tributo a Asiria", note:"El Obelisco Negro de Salmanasar III conserva una imagen asociada a un enviado de Jehú entregando tributo: evidencia arqueológica directa fuera del texto bíblico."},
  {year:776, tipo:"cultural", label:"Primeros Juegos Olímpicos en Grecia", note:"Fecha tradicional del inicio de los Juegos Olímpicos, contemporáneo del reinado de Jeroboam II en Israel."},
  {year:753, tipo:"cultural", label:"Fundación tradicional de Roma", note:"Fecha legendaria del inicio de la ciudad que siglos después gobernaría Judea."},
  {year:745, tipo:"imperio", label:"Tiglat-pileser III reorganiza el Imperio Asirio", note:"Convierte a Asiria en un imperio de conquista sistemática y deportaciones masivas (745–727 a.C.), la maquinaria que finalmente destruirá el Reino de Israel."},
  {year:722, tipo:"evento", label:"Caída de Samaria: fin del Reino de Israel", note:"Sargón II de Asiria conquista Samaria y deporta a gran parte de la población del Reino del Norte (2 Reyes 17)."},
  {year:701, tipo:"evento", label:"Senaquerib sitia Jerusalén", note:"El rey asirio Senaquerib sitia Jerusalén durante el reinado de Ezequías; según 2 Reyes 19, un ángel del Señor libra milagrosamente la ciudad."},
  {year:664, tipo:"imperio", label:"Egipto se reunifica bajo la dinastía saíta", note:"Egipto recupera fuerza como actor regional justo cuando Asiria empieza a debilitarse."},
  {year:612, tipo:"evento", label:"Caída de Nínive: fin del Imperio Asirio", note:"La capital asiria cae ante babilonios y medos; Babilonia queda como nueva superpotencia."},
  {year:605, tipo:"evento", label:"Batalla de Carquemis", note:"Babilonia derrota a Egipto y consolida el control sobre Siria-Palestina; comienza el ascenso de Nabucodonosor II."},
  {year:597, tipo:"evento", label:"Primera deportación a Babilonia", note:"Nabucodonosor II deporta al rey Joaquín y a gran parte de la nobleza de Judá, incluido el futuro profeta Ezequiel."},
  {year:539, tipo:"imperio", label:"Ciro el Grande conquista Babilonia", note:"El auge del Imperio Persa pone fin al dominio babilónico sobre el antiguo Cercano Oriente."},
  {year:538, tipo:"evento", label:"Edicto de Ciro: primer retorno de los judíos", note:"Ciro permite el regreso de los judíos exiliados a Jerusalén y la reconstrucción del templo (Ezra 1)."}
];
