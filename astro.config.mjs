// @ts-check
import { defineConfig } from 'astro/config';

/*
 * SITE_URL y BASE_PATH vienen del entorno (.github/workflows/publicar.yml).
 * Los valores de abajo solo se usan si la variable no existe (por ejemplo, npm run dev).
 *   GitHub Pages (repo adda-santiago/recursos-biblicos, sitio de proyecto):
 *     SITE_URL=https://adda-santiago.github.io  BASE_PATH=/recursos-biblicos/
 *   Con dominio propio en la raíz:
 *     SITE_URL=https://tudominio.cl             BASE_PATH=/
 * SITE_URL va SIN subcarpeta: la subcarpeta va solo en BASE_PATH.
 * Nunca escribas rutas absolutas a mano: usa ruta() de src/lib/url.ts.
 */
export default defineConfig({
  site: process.env.SITE_URL || 'https://adda-santiago.github.io',
  base: process.env.BASE_PATH || '/recursos-biblicos/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
