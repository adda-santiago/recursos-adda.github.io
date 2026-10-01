// @ts-check
import { defineConfig } from 'astro/config';

/*
 * SITE_URL y BASE_PATH vienen del entorno para que el MISMO código
 * se publique en GitHub Pages (piloto) o en Hostinger (producción).
 *   GitHub Pages (repo aula-visual.github.io): SITE_URL=https://aula-visual.github.io  BASE_PATH=/
 *   Con dominio propio:                        SITE_URL=https://tudominio.cl         BASE_PATH=/
 * Nunca escribas rutas absolutas a mano: usa ruta() de src/lib/url.ts.
 */
export default defineConfig({
  site: process.env.SITE_URL || 'https://aula-visual.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
