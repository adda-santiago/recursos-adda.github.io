/*
 * Vocabulario controlado. Los recursos SOLO pueden usar valores de estas listas;
 * el esquema de contenido hace fallar el build si aparece uno distinto.
 * Agregar un valor aquí es una decisión editorial, no un detalle técnico.
 */
export const ASIGNATURAS = {
  'ciencias-naturales': 'Ciencias Naturales',
  'biologia': 'Biología',
  'fisica': 'Física',
  'quimica': 'Química',
  'historia': 'Historia, Geografía y Cs. Sociales',
  'religion': 'Religión',
  'tecnologia': 'Tecnología',
  'matematica': 'Matemática',
  'artes': 'Artes Visuales',
} as const;

// Niveles del sistema escolar chileno (Bases Curriculares Mineduc)
export const NIVELES = {
  '1b': '1° básico', '2b': '2° básico', '3b': '3° básico', '4b': '4° básico',
  '5b': '5° básico', '6b': '6° básico', '7b': '7° básico', '8b': '8° básico',
  '1m': '1° medio', '2m': '2° medio', '3m': '3° medio', '4m': '4° medio',
} as const;

export const TIPOS = {
  '3d': 'Modelo 3D',
  'mapa': 'Mapa',
  'linea-tiempo': 'Línea de tiempo',
  'genealogia': 'Árbol genealógico',
  'interactivo': 'Interactivo',
} as const;

// Colecciones: agrupaciones editoriales con identidad propia dentro de una asignatura.
export const COLECCIONES = {
  'fuego-y-palabra': 'Fuego y Palabra',
} as const;

export type Asignatura = keyof typeof ASIGNATURAS;
export type Nivel = keyof typeof NIVELES;
export type Tipo = keyof typeof TIPOS;

const claves = <T extends object>(o: T) =>
  Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];
export const CLAVES_ASIGNATURA = claves(ASIGNATURAS);
export const CLAVES_NIVEL = claves(NIVELES);
export const CLAVES_TIPO = claves(TIPOS);
export const CLAVES_COLECCION = claves(COLECCIONES);
