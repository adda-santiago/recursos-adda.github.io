import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CLAVES_EPOCA, CLAVES_LIBRO, CLAVES_TESTAMENTO, CLAVES_TIPO } from './data/taxonomia';

/*
 * Esquema de un recurso (DIRECTRICES §8). Si un archivo no cumple, el build falla:
 * así la taxonomía, la licencia y la revisión son obligatorias, no opcionales.
 * Campos antiguos (asignatura, niveles, oa, coleccion) se ignoran si quedan en una ficha.
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
    // Identidad. `uid` es INMUTABLE: los favoritos lo referencian.
    uid: z.string().regex(/^[a-z0-9-]+$/),
    titulo: z.string(),
    resumen: z.string().max(180),
    emoji: z.string().default('📘'),

    // Taxonomía bíblica (§9). Obligatoria en todo recurso publicado (ver más abajo).
    testamento: z.array(z.enum(CLAVES_TESTAMENTO)).default([]),
    libros: z.array(z.enum(CLAVES_LIBRO)).default([]),     // libros donde el tema es central
    epocas: z.array(z.enum(CLAVES_EPOCA)).default([]),
    tipo: z.enum(CLAVES_TIPO),
    tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),

    // Visor
    visor: z.object({
      motor: z.enum(['legado', 'model-viewer', 'three']),
      ruta: z.string().optional(),      // legado: carpeta dentro de public/apps/
      modelo: z.string().optional(),    // model-viewer / three: URL ABSOLUTA del .glb
      poster: z.string().optional(),    // URL ABSOLUTA
      escala: z.string().optional(),    // p. ej. "1 unidad = 1 codo (≈ 45 cm)"
    }),
    hotspots: z.array(hotspot).default([]),

    // Procedencia y rigor
    licencia: z.object({
      contenido: z.string(),            // licencia del texto y la app
      modelo: z.string().optional(),    // licencia del archivo 3D o de las teselas si son de terceros
      atribucion: z.string().optional(),
    }),
    fuentes: z.array(z.string()).min(1),
    revision: z.object({
      estado: z.enum(['borrador', 'revisado']),
      revisor: z.string().optional(),
      fecha: z.coerce.date().optional(),
    }),

    // Fecha en que el recurso se publicó en el sitio: ordena "Recién agregados"
    fechaPublicacion: z.coerce.date(),
    orden: z.number().default(100),
    publicado: z.boolean().default(true),
  }).superRefine((d, ctx) => {
    // Los recursos ocultos pueden quedar sin taxonomía; los publicados, no.
    if (!d.publicado) return;
    if (!d.testamento.length) ctx.addIssue({ code: 'custom', path: ['testamento'], message: 'Un recurso publicado necesita al menos un testamento.' });
    if (!d.epocas.length) ctx.addIssue({ code: 'custom', path: ['epocas'], message: 'Un recurso publicado necesita al menos una época.' });
  }),
});

export const collections = { recursos };
