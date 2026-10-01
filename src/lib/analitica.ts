/*
 * Analítica anónima de eventos. Sin cookies de seguimiento ni datos personales.
 * Eventos definidos (no inventar otros sin documentarlos en DIRECTRICES §12):
 *   abrir-recurso, pantalla-completa, restaurar-vista, compartir, copiar-embed,
 *   busqueda, busqueda-sin-resultados, guardar-favorito
 */
import { SITIO } from '../config/sitio';

declare global {
  interface Window { goatcounter?: { count: (o: Record<string, unknown>) => void } }
}

export function registrar(evento: string, detalle = ''): void {
  if (!SITIO.analitica.goatcounter) {
    if (import.meta.env.DEV) console.debug('[analítica]', evento, detalle);
    return;
  }
  window.goatcounter?.count({ path: `evento/${evento}${detalle ? '/' + detalle : ''}`, event: true });
}
