/* ==========================================================
   visor-bridge.js — Contrato entre el visor de la plataforma
   y una app legada que corre dentro de un <iframe>.
   Mensajes que acepta (window.postMessage desde el padre):
     { tipo: 'fyp:restaurar' }  → vuelve a la vista inicial
   Mensajes que emite hacia el padre:
     { tipo: 'fyp:lista' }      → la app terminó de cargar
   Cada app puede declarar window.fypReset = () => {...}.
   Si no lo hace, se intenta #t-home o #zoom-reset; si nada
   existe, se recarga la app (último recurso).
   ========================================================== */
(() => {
  'use strict';
  const enIframe = window.self !== window.top;

  function restaurar() {
    if (typeof window.fypReset === 'function') return window.fypReset();
    const boton = document.getElementById('t-home') || document.getElementById('zoom-reset');
    if (boton) return boton.click();
    location.reload();
  }

  window.addEventListener('message', (e) => {
    if (e.origin !== location.origin) return;           // solo el propio sitio
    if (e.data && e.data.tipo === 'fyp:restaurar') restaurar();
  });

  if (enIframe) {
    document.documentElement.classList.add('en-visor');
    // Dentro del visor la marca ya está en la página contenedora: se oculta la de la app
    const estilo = document.createElement('style');
    estilo.textContent = '.en-visor a.mark, .en-visor a.brand { display: none !important; }';
    document.head.appendChild(estilo);
    // El enlace de marca debe abrir la plataforma completa, no navegar dentro del iframe
    document.querySelectorAll('a.mark, a.brand').forEach((a) => { a.target = '_top'; });
    window.parent.postMessage({ tipo: 'fyp:lista' }, location.origin);
  }
})();
