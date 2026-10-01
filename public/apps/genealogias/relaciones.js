/* ==========================================================================
   RELACIONES.JS — Árbol Genealógico · Fuego y Palabra
   ==========================================================================
   Conecta a las personas de personas.js entre sí. Dos tipos de vínculo:

   1) FILIACIÓN (padre/madre → hijo):
      {
        tipo: "filiacion",
        de:   "id_del_padre_o_madre",
        a:    "id_del_hijo",
        principal: true,     // true = define la posición del hijo en el
                              // árbol (usar SOLO uno de los dos padres como
                              // "principal" cuando ambos están en los datos)
        lineas: [],           // "jesus_mateo" | "jesus_lucas" |
                              // "sumos_sacerdotes" — puede tener varias o
                              // ninguna. Colorea la línea en el árbol.
        fuente: "biblica"     // "biblica" o "extrabiblica"
      },

   2) MATRIMONIO (cónyuge — cónyuge), se dibuja como línea punteada:
      { tipo:"matrimonio", de:"id1", a:"id2" }

   Para agregar gente nueva: primero agrégala en personas.js, luego conéctala
   aquí. El orden en que aparecen los hijos de una misma persona en este
   archivo es el orden en que se dibujan de izquierda a derecha en el árbol.
   ========================================================================== */

const RELACIONES = [
  // --- Adán y Eva ---
  {tipo:"matrimonio", de:"adan", a:"eva"},
  {tipo:"filiacion", de:"adan", a:"cain", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"adan", a:"abel", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"adan", a:"set", principal:true, troncal:true, lineas:[], fuente:"biblica"},

  // --- Línea de Caín ---
  {tipo:"filiacion", de:"cain", a:"enoc_ciudad", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"enoc_ciudad", a:"irad", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"irad", a:"mehujael", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"mehujael", a:"metusael", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"metusael", a:"lamec2", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"matrimonio", de:"lamec2", a:"ada1"},
  {tipo:"matrimonio", de:"lamec2", a:"zila1"},
  {tipo:"filiacion", de:"ada1", a:"jabal", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ada1", a:"jubal", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"zila1", a:"tubalcain", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"zila1", a:"naama1", principal:true, lineas:[], fuente:"biblica"},

  // --- Tronco Adán → Noé ---
  {tipo:"filiacion", de:"set", a:"enos", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"enos", a:"cainan", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cainan", a:"mahalaleel", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"mahalaleel", a:"jared", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"jared", a:"enoc1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"enoc1", a:"matusalen", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"matusalen", a:"lamec1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"lamec1", a:"noe", principal:true, lineas:[], fuente:"biblica"},

  // --- Noé → Sem → Abraham ---
  {tipo:"filiacion", de:"noe", a:"sem", principal:true, troncal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"noe", a:"cam", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"noe", a:"jafet", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cam", a:"cus1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cam", a:"canaan1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cus1", a:"nimrod", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"sem", a:"arfaxad", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"arfaxad", a:"sala", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"sala", a:"heber", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"heber", a:"peleg", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"peleg", a:"reu", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"reu", a:"serug", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"serug", a:"nacor1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"nacor1", a:"tare", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"tare", a:"abraham", principal:true, troncal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"tare", a:"nacor2", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"tare", a:"haran1", principal:true, lineas:[], fuente:"biblica"},

  {tipo:"filiacion", de:"haran1", a:"lot", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"haran1", a:"milca", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"haran1", a:"isca", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"lot", a:"moab1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"lot", a:"benami", principal:true, lineas:[], fuente:"biblica"},

  {tipo:"matrimonio", de:"nacor2", a:"milca"},
  {tipo:"filiacion", de:"nacor2", a:"betuel", principal:true, lineas:[], fuente:"biblica"},
  // Rebeca y Labán son hijos de Betuel, pero sus posiciones reales las
  // determinan sus propios matrimonios/familias (Rebeca con Isaac, Labán
  // como padre de Lea y Raquel) — estas relaciones no son "principal" para
  // no interferir con esa posición, pero sí dibujan la línea de parentesco.
  {tipo:"filiacion", de:"betuel", a:"rebeca", principal:false, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"betuel", a:"laban", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"laban", a:"lea", principal:false, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"laban", a:"raquel", principal:false, lineas:[], fuente:"biblica"},

  // --- Abraham → Isaac → Jacob ---
  {tipo:"matrimonio", de:"abraham", a:"sara"},
  {tipo:"matrimonio", de:"abraham", a:"agar"},
  {tipo:"matrimonio", de:"abraham", a:"cetura"},

  {tipo:"filiacion", de:"sara", a:"isaac", principal:true, troncal:true, lineas:[], fuente:"biblica"},

  {tipo:"filiacion", de:"agar", a:"ismael", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"nebaiot", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"cedar", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"adbeel", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"mibsam", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"misma", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"duma", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"massa", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"hadad1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"tema1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"jetur", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"nafis", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"ismael", a:"cedema", principal:true, lineas:[], fuente:"biblica"},

  {tipo:"filiacion", de:"cetura", a:"zimran", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cetura", a:"jocsan", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cetura", a:"medan", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cetura", a:"madian1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cetura", a:"isbac", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"cetura", a:"sua1", principal:true, lineas:[], fuente:"biblica"},

  {tipo:"matrimonio", de:"isaac", a:"rebeca"},
  {tipo:"filiacion", de:"isaac", a:"jacob", principal:true, troncal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"isaac", a:"esau", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"esau", a:"elifaz1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"elifaz1", a:"amalec1", principal:true, lineas:[], fuente:"biblica"},

  // --- Matrimonios de Jacob ---
  {tipo:"matrimonio", de:"jacob", a:"lea"},
  {tipo:"matrimonio", de:"jacob", a:"raquel"},
  {tipo:"matrimonio", de:"jacob", a:"bilha"},
  {tipo:"matrimonio", de:"jacob", a:"zilpa"},

  // --- Hijos de Jacob y Lea ---
  {tipo:"filiacion", de:"lea", a:"ruben", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"lea", a:"simeon", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"lea", a:"levi1", principal:true, lineas:["sumos_sacerdotes"], fuente:"biblica"},

  // ============ LÍNEA DE LEVÍ → SUMOS SACERDOTES ============
  {tipo:"filiacion", de:"levi1", a:"gerson1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"levi1", a:"coat", principal:true, troncal:true, paso:1.667, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"levi1", a:"merari1", principal:true, lineas:[], fuente:"biblica"},

  {tipo:"filiacion", de:"coat", a:"amram", principal:true, troncal:true, paso:1.667, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"coat", a:"izhar1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"coat", a:"hebron_lev", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"coat", a:"uziel1", principal:true, lineas:[], fuente:"biblica"},

  {tipo:"filiacion", de:"amram", a:"moises", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"amram", a:"maria1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"amram", a:"aaron", principal:true, troncal:true, paso:1.667, lineas:["sumos_sacerdotes"], fuente:"biblica"},

  {tipo:"filiacion", de:"aaron", a:"nadab1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"aaron", a:"abiu1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"aaron", a:"itamar1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"aaron", a:"eleazar1", principal:true, troncal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},

  {tipo:"filiacion", de:"eleazar1", a:"finees1", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"finees1", a:"abisua", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"abisua", a:"buqui", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"buqui", a:"uzi1", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"uzi1", a:"zeraias", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"zeraias", a:"meraiot", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"meraiot", a:"amarias1_sac", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"amarias1_sac", a:"ahitob1", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"ahitob1", a:"sadoc1", principal:true, paso:0.6, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"sadoc1", a:"ahimaas1", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"ahimaas1", a:"azarias1_sac", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"azarias1_sac", a:"johanan1_sac", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"johanan1_sac", a:"azarias2_sac", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"azarias2_sac", a:"amarias2_sac", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"amarias2_sac", a:"ahitob2", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"ahitob2", a:"sadoc2", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"sadoc2", a:"salum1", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"salum1", a:"hilcias", principal:true, paso:2.111, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"hilcias", a:"azarias3_sac", principal:true, paso:0.77, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"azarias3_sac", a:"seraias1", principal:true, paso:0.77, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"seraias1", a:"josadac", principal:true, paso:0.77, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"josadac", a:"jesua_sumo", principal:true, paso:3.08, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"jesua_sumo", a:"joiacim", principal:true, paso:1.845, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"joiacim", a:"eliasib", principal:true, paso:1.845, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"eliasib", a:"joiada1", principal:true, paso:1.845, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"joiada1", a:"johanan2_sumo", principal:true, paso:1.845, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  {tipo:"filiacion", de:"johanan2_sumo", a:"jadua", principal:true, paso:1.845, lineas:["sumos_sacerdotes"], fuente:"biblica"},
  // Salto de ~350 años sin genealogía bíblica continua (período intertestamentario);
  // el vínculo Jadúa -> Anás es de sucesión histórica (Josefo), no de filiación bíblica.
  {tipo:"filiacion", de:"jadua", a:"anas", principal:true, paso:7.0, lineas:["sumos_sacerdotes"], fuente:"extrabiblica"},
  // Caifás fue yerno de Anás (se casó con su hija, cuyo nombre no registra la Biblia), no su hijo biológico.
  {tipo:"filiacion", de:"anas", a:"caifas", principal:true, paso:1.5, lineas:["sumos_sacerdotes"], fuente:"extrabiblica"},
  // Tras Caifás, Roma nombraba a los sumos sacerdotes con criterios políticos, no genealógicos.
  {tipo:"filiacion", de:"caifas", a:"ananias_hch23", principal:true, paso:4.5, lineas:["sumos_sacerdotes"], fuente:"extrabiblica"},

  // --- Otros hijos de David (no continúan la línea hacia Jesús) ---
  {tipo:"filiacion", de:"lea", a:"juda", principal:true, troncal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"lea", a:"isacar", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"lea", a:"zabulon", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"lea", a:"dina", principal:true, lineas:[], fuente:"biblica"},

  // --- Hijos de Jacob y Bilhá ---
  {tipo:"filiacion", de:"bilha", a:"dan1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"bilha", a:"neftali", principal:true, lineas:[], fuente:"biblica"},

  // --- Hijos de Jacob y Zilpá ---
  {tipo:"filiacion", de:"zilpa", a:"gad1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"zilpa", a:"aser", principal:true, lineas:[], fuente:"biblica"},

  // --- Hijos de Jacob y Raquel ---
  {tipo:"filiacion", de:"raquel", a:"jose1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"raquel", a:"benjamin", principal:true, lineas:[], fuente:"biblica"},

  // --- Judá → David (línea hacia Jesús y, más adelante, hacia los reyes) ---
  {tipo:"filiacion", de:"juda", a:"fares", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"fares", a:"esrom", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"esrom", a:"aram1", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"aram1", a:"aminadab", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"aminadab", a:"naason", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"naason", a:"salmon", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"matrimonio", de:"salmon", a:"rahab"},
  {tipo:"filiacion", de:"salmon", a:"booz", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"matrimonio", de:"booz", a:"rut"},
  {tipo:"filiacion", de:"booz", a:"obed", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"obed", a:"isai", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"isai", a:"david", principal:true, lineas:["jesus_mateo","jesus_lucas"], fuente:"biblica"},

  // --- Otros hijos de David ---
  {tipo:"filiacion", de:"david", a:"amnon", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"david", a:"tamar1", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"david", a:"absalon", principal:true, lineas:[], fuente:"biblica"},
  {tipo:"filiacion", de:"david", a:"adonias", principal:true, lineas:[], fuente:"biblica"},

  // ============ RAMA DE MATEO: David → José, vía Salomón ============
  {tipo:"filiacion", de:"david", a:"salomon", principal:true, troncal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"salomon", a:"roboam", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"roboam", a:"abias1", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"abias1", a:"asa1", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"asa1", a:"josafat", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"josafat", a:"joram1", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"joram1", a:"uzias", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"uzias", a:"jotam1", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"jotam1", a:"acaz1", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"acaz1", a:"ezequias", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"ezequias", a:"manases1", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"manases1", a:"amon1", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"amon1", a:"josias", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"josias", a:"jeconias", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"jeconias", a:"salatiel_mt", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"salatiel_mt", a:"zorobabel_mt", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"zorobabel_mt", a:"abiud", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"abiud", a:"eliaquim_mt", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"eliaquim_mt", a:"azor", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"azor", a:"sadoc_mt", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"sadoc_mt", a:"aquim", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"aquim", a:"eliud", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"eliud", a:"eleazar_mt", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"eleazar_mt", a:"matan", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"matan", a:"jacob2", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},
  {tipo:"filiacion", de:"jacob2", a:"jose_esposo_maria", principal:true, paso:1.5385, lineas:["jesus_mateo"], fuente:"biblica"},

  // ============ RAMA DE LUCAS: David → José, vía Natán ============
  {tipo:"filiacion", de:"david", a:"natan1", principal:true, troncal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"natan1", a:"matata", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"matata", a:"mainan", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"mainan", a:"melea", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"melea", a:"eliaquim_lc", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"eliaquim_lc", a:"jonan", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"jonan", a:"jose_lc1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"jose_lc1", a:"juda_lc1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"juda_lc1", a:"simeon_lc", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"simeon_lc", a:"levi_lc1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"levi_lc1", a:"matat_lc1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"matat_lc1", a:"jorim", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"jorim", a:"eliezer_lc", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"eliezer_lc", a:"jose_lc2", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"jose_lc2", a:"er1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"er1", a:"elmodam", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"elmodam", a:"cosam", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"cosam", a:"adi", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"adi", a:"melqui_lc1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"melqui_lc1", a:"neri", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"neri", a:"salatiel_lc", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"salatiel_lc", a:"zorobabel_lc", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"zorobabel_lc", a:"resa", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"resa", a:"joana1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"joana1", a:"juda_lc2", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"juda_lc2", a:"jose_lc3", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"jose_lc3", a:"semei", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"semei", a:"matatias_lc1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"matatias_lc1", a:"maat", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"maat", a:"nagai", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"nagai", a:"esli", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"esli", a:"nahum1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"nahum1", a:"amos1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"amos1", a:"matatias_lc2", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"matatias_lc2", a:"jose_lc4", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"jose_lc4", a:"jana1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"jana1", a:"melqui_lc2", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"melqui_lc2", a:"levi_lc2", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"levi_lc2", a:"matat_lc2", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"filiacion", de:"matat_lc2", a:"eli1", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  // Elí es padre de María (no de José): la genealogía de Lucas se registra
  // a través del suegro de José, según la costumbre judía.
  {tipo:"filiacion", de:"eli1", a:"maria_madre", principal:true, lineas:["jesus_lucas"], fuente:"biblica"},
  {tipo:"matrimonio", de:"jose_esposo_maria", a:"maria_madre"},
  // María, no José, es la conexión biológica de la rama de Lucas hacia Jesús.
  {tipo:"filiacion", de:"maria_madre", a:"jesus", principal:false, lineas:["jesus_lucas"], fuente:"biblica"},

  // --- José y María → Jesús ---
  {tipo:"filiacion", de:"jose_esposo_maria", a:"jesus", principal:true, lineas:["jesus_mateo"], fuente:"biblica"}
];
