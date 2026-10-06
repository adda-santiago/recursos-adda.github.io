/*
 * Vocabulario controlado (DIRECTRICES §9). Los recursos SOLO pueden usar valores
 * de estas listas; el esquema de contenido hace fallar el build si aparece uno distinto.
 * Agregar un valor aquí es una decisión editorial, no un detalle técnico.
 * El orden de cada lista es el orden en que se muestran los filtros.
 */
export const TESTAMENTOS = {
  'antiguo': 'Antiguo Testamento',
  'nuevo': 'Nuevo Testamento',
} as const;

// Los 66 libros, en el orden del canon protestante.
export const LIBROS = {
  'genesis': 'Génesis', 'exodo': 'Éxodo', 'levitico': 'Levítico', 'numeros': 'Números',
  'deuteronomio': 'Deuteronomio', 'josue': 'Josué', 'jueces': 'Jueces', 'rut': 'Rut',
  '1-samuel': '1 Samuel', '2-samuel': '2 Samuel', '1-reyes': '1 Reyes', '2-reyes': '2 Reyes',
  '1-cronicas': '1 Crónicas', '2-cronicas': '2 Crónicas', 'esdras': 'Esdras', 'nehemias': 'Nehemías',
  'ester': 'Ester', 'job': 'Job', 'salmos': 'Salmos', 'proverbios': 'Proverbios',
  'eclesiastes': 'Eclesiastés', 'cantares': 'Cantares', 'isaias': 'Isaías', 'jeremias': 'Jeremías',
  'lamentaciones': 'Lamentaciones', 'ezequiel': 'Ezequiel', 'daniel': 'Daniel', 'oseas': 'Oseas',
  'joel': 'Joel', 'amos': 'Amós', 'abdias': 'Abdías', 'jonas': 'Jonás', 'miqueas': 'Miqueas',
  'nahum': 'Nahúm', 'habacuc': 'Habacuc', 'sofonias': 'Sofonías', 'hageo': 'Hageo',
  'zacarias': 'Zacarías', 'malaquias': 'Malaquías',
  'mateo': 'Mateo', 'marcos': 'Marcos', 'lucas': 'Lucas', 'juan': 'Juan', 'hechos': 'Hechos',
  'romanos': 'Romanos', '1-corintios': '1 Corintios', '2-corintios': '2 Corintios', 'galatas': 'Gálatas',
  'efesios': 'Efesios', 'filipenses': 'Filipenses', 'colosenses': 'Colosenses',
  '1-tesalonicenses': '1 Tesalonicenses', '2-tesalonicenses': '2 Tesalonicenses',
  '1-timoteo': '1 Timoteo', '2-timoteo': '2 Timoteo', 'tito': 'Tito', 'filemon': 'Filemón',
  'hebreos': 'Hebreos', 'santiago': 'Santiago', '1-pedro': '1 Pedro', '2-pedro': '2 Pedro',
  '1-juan': '1 Juan', '2-juan': '2 Juan', '3-juan': '3 Juan', 'judas': 'Judas', 'apocalipsis': 'Apocalipsis',
} as const;

// Épocas en orden cronológico. Coinciden con las franjas del árbol genealógico
// (public/apps/genealogias/epocas.js), que separa además la iglesia primitiva.
export const EPOCAS = {
  'creacion': 'Creación y primeros patriarcas',
  'patriarcas': 'Patriarcas',
  'exodo': 'Éxodo y desierto',
  'jueces': 'Conquista y jueces',
  'monarquia-unida': 'Monarquía unida',
  'monarquia-dividida': 'Monarquía dividida',
  'exilio': 'Exilio babilónico',
  'retorno': 'Retorno y período persa',
  'intertestamentario': 'Período intertestamentario',
  'vida-de-jesus': 'Vida de Jesús',
  'iglesia-primitiva': 'Iglesia primitiva',
} as const;

export const TIPOS = {
  '3d': 'Modelo 3D',
  'mapa': 'Mapa',
  'linea-tiempo': 'Línea de tiempo',
  'genealogia': 'Árbol genealógico',
  'interactivo': 'Interactivo',
} as const;

export type Testamento = keyof typeof TESTAMENTOS;
export type Libro = keyof typeof LIBROS;
export type Epoca = keyof typeof EPOCAS;
export type Tipo = keyof typeof TIPOS;

const claves = <T extends object>(o: T) =>
  Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];
export const CLAVES_TESTAMENTO = claves(TESTAMENTOS);
export const CLAVES_LIBRO = claves(LIBROS);
export const CLAVES_EPOCA = claves(EPOCAS);
export const CLAVES_TIPO = claves(TIPOS);

// Nombres que no pueden usarse como slug de un recurso: chocan con páginas
// y carpetas del sitio, porque las fichas viven en /{slug}/.
export const SLUGS_RESERVADOS = [
  'apps', 'embed', 'buzon', 'privacidad', 'explorar', 'pagefind', '404', '_astro', 'religion',
];
