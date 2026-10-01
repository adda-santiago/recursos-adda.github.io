/* Todas las rutas internas pasan por aquí: así el sitio funciona igual
   en una subcarpeta de GitHub Pages o en la raíz de un dominio propio. */
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function ruta(p = ''): string {
  return BASE + p.replace(/^\//, '');
}

export function rutaRecurso(asignatura: string, slug: string): string {
  return ruta(`${asignatura}/${slug}/`);
}

export function rutaEmbed(slug: string): string {
  return ruta(`embed/${slug}/`);
}
