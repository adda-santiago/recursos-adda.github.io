/*
 * Carga de anuncios. Se decide en el navegador porque depende de la cuenta.
 * Reglas duras (DIRECTRICES §10):
 *  - Nunca dentro ni encima del visor. Nunca en /embed/.
 *  - Solo si SITIO.anuncios.habilitados y la cuenta no tiene "sin anuncios".
 *  - El script de AdSense se carga una sola vez y solo si hay espacios en la página.
 */
import { SITIO } from '../config/sitio';
import { estadoCuenta } from './cuenta';

export async function iniciarAnuncios(): Promise<void> {
  const espacios = document.querySelectorAll<HTMLElement>('[data-anuncio]');
  if (!espacios.length || !SITIO.anuncios.habilitados || !SITIO.anuncios.clienteAdsense) return;
  const { sinAnuncios } = await estadoCuenta();
  if (sinAnuncios) return;

  const s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITIO.anuncios.clienteAdsense}`;
  document.head.appendChild(s);

  espacios.forEach((el) => {
    el.hidden = false;
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = SITIO.anuncios.clienteAdsense;
    ins.dataset.adSlot = el.dataset.anuncio || '';
    ins.dataset.adFormat = 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    el.appendChild(ins);
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
}
