// @ts-check
import { defineConfig } from 'astro/config';

/*
 * SITE_URL y BASE_PATH vienen del entorno para que el MISMO código
 * se publique en GitHub Pages (piloto) o en Hostinger (producción).
 *   GitHub Pages (repo adda-santiago/recursos-biblicos, sitio de proyecto):
 *     SITE_URL=https://adda-santiago.github.io  BASE_PATH=/recursos-biblicos/
 *   Con dominio propio:
 *     SITE_URL=https://tudominio.cl             BASE_PATH=/
 * Nunca escribas rutas absolutas a mano: usa ruta() de src/lib/url.ts.
 */
export default defineConfig({
  site: process.env.SITE_URL || 'https://adda-santiago.github.io',
  base: process.env.BASE_PATH || '/recursos-biblicos/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
