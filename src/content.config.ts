import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CLAVES_ASIGNATURA, CLAVES_COLECCION, CLAVES_NIVEL, CLAVES_TIPO } from './data/taxonomia';

/*
 * Esquema de un recurso. Si un archivo no cumple, el build falla:
 * así la taxonomía, la licencia y la revisión son obligatorias, no opcionales.
 */
const hotspot = z.object({
  id: z.string(),
  titulo: z.string(),
  texto: z.string(),
  posicion: z.tuple([z.number(), z.number(), z.number()]).optional(),
});

const recursos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recursos' }),
  schema: z.object({
    // Identidad. `uid` es INMUTABLE: favoritos, colecciones y cuentas futuras lo referencian.
    uid: z.string().regex(/^[a-z0-9-]+$/),
    titulo: z.string(),
    resumen: z.string().max(180),
    emoji: z.string().default('📘'),

    // Taxonomía controlada
    asignatura: z.enum(CLAVES_ASIGNATURA),
    niveles: z.array(z.enum(CLAVES_NIVEL)).default([]),     // vacío = uso general
    oa: z.array(z.string()).default([]),                     // códigos verificados en curriculumnacional.cl
    tipo: z.enum(CLAVES_TIPO),
    tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
    coleccion: z.enum(CLAVES_COLECCION).optional(),

    // Visor
    visor: z.object({
      motor: z.enum(['legado', 'model-viewer', 'three']),
      ruta: z.string().optional(),      // legado: carpeta dentro de public/apps/
      modelo: z.string().optional(),    // model-viewer / three: URL del .glb
      poster: z.string().optional(),
      escala: z.string().optional(),    // p. ej. "1 unidad = 1 codo (≈ 45 cm)"
    }),
    hotspots: z.array(hotspot).default([]),

    // Procedencia y rigor
    licencia: z.object({
      contenido: z.string(),            // licencia del texto y la app
      modelo: z.string().optional(),    // licencia del archivo 3D si es de terceros
      atribucion: z.string().optional(),
    }),
    fuentes: z.array(z.string()).min(1),
    revision: z.object({
      estado: z.enum(['borrador', 'revisado']),
      revisor: z.string().optional(),
      fecha: z.coerce.date().optional(),
    }),

    orden: z.number().default(100),
    publicado: z.boolean().default(true),
  }),
});

export const collections = { recursos };
