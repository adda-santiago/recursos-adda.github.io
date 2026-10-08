/* ==========================================================
   linea-tiempo.js — Línea de tiempo inferior (compartido)
   Franja al pie de una presentación: eje de años, hitos y un
   marcador que se desliza hasta la fecha de cada diapositiva.

   Años: negativos = a.C., positivos = d.C. (-586 → «586 a.C.»).
   Uso:
     const lt = LineaTiempo.crear(contenedor, {
       desde: -626, hasta: -539,
       hitos: [{ a: -605, t: 'Carquemis' }, { a: [-588, -586], t: 'Sitio' }]
     });
     lt.ir(-597);            // un año
     lt.ir([-553, -543]);    // un período
     lt.ir(null);            // sin fecha: el marcador se atenúa
     lt.destruir();
   No depende de ningún CSS: trae sus estilos, con los tokens del sitio si existen.
   ========================================================== */
(() => {
  'use strict';
  if (window.LineaTiempo) return;

  const anio = a => (a < 0 ? `${-a} a.C.` : `${a} d.C.`);
  // [-553, -543] → «553–543 a.C.»; si cruza el año 1, «4 a.C.–30 d.C.»
  const rango = v => {
    if (!Array.isArray(v)) return anio(v);
    const [a, b] = v;
    return (a < 0) === (b < 0) ? `${Math.abs(a)}–${anio(b)}` : `${anio(a)}–${anio(b)}`;
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function crear(cont, cfg) {
    const { desde, hasta } = cfg;
    const pos = a => ((a - desde) / (hasta - desde)) * 100;
    const el = document.createElement('div');
    el.className = 'lt';
    el.setAttribute('role', 'img');
    // Hitos en dos filas alternadas para que los rótulos no se pisen
    const hitos = (cfg.hitos || []).map((h, i) => {
      const [a, b] = Array.isArray(h.a) ? h.a : [h.a, h.a];
      const izq = pos(a), ancho = Math.max(0, pos(b) - izq);
      const lado = izq > 85 ? ' der' : izq < 15 ? ' izq' : '';
      return `<div class="lt-hito fila${i % 2}${lado}" style="left:${izq}%;${ancho ? `width:${ancho}%` : ''}" data-a="${a}">
        <i></i><span><b>${esc(rango(h.a))}</b>${esc(h.t)}</span></div>`;
    }).join('');
    el.innerHTML = `<div class="lt-eje"><span class="lt-ext">${anio(desde)}</span><div class="lt-pista">${hitos}
      <div class="lt-marca" hidden><div class="lt-banda"></div><div class="lt-punto"></div><output class="lt-hoy"></output></div>
      </div><span class="lt-ext">${anio(hasta)}</span></div>`;
    cont.appendChild(el);
    const marca = el.querySelector('.lt-marca'), banda = el.querySelector('.lt-banda'), hoy = el.querySelector('.lt-hoy');
    el.setAttribute('aria-label', `Línea de tiempo de ${anio(desde)} a ${anio(hasta)}`);

    function ir(v) {
      if (v === null || v === undefined) { marca.classList.add('sin'); return; }
      marca.hidden = false;
      marca.classList.remove('sin');
      const [a, b] = Array.isArray(v) ? v : [v, v];
      const izq = pos(Math.max(desde, Math.min(hasta, a)));
      const der = pos(Math.max(desde, Math.min(hasta, b)));
      const centro = (izq + der) / 2;
      marca.style.left = centro + '%';
      // El ancho de la banda se calcula sobre la pista, no sobre la marca
      banda.style.width = (der - izq) / 100 * el.querySelector('.lt-pista').offsetWidth + 'px';
      banda.style.marginLeft = -(der - izq) / 200 * el.querySelector('.lt-pista').offsetWidth + 'px';
      hoy.textContent = rango(v);
      hoy.classList.toggle('der', centro > 88);
      hoy.classList.toggle('izq', centro < 12);
      el.setAttribute('aria-label', `Línea de tiempo: ${rango(v)}`);
      let coincide = false;
      el.querySelectorAll('.lt-hito').forEach(h => {
        const ha = +h.dataset.a, act = ha >= a && ha <= b;
        h.classList.toggle('pasado', ha <= b);
        h.classList.toggle('actual', act);
        if (act) coincide = true;
      });
      // Si la fecha ya es un hito, su rótulo se resalta; si no, la marca lleva el suyo
      hoy.hidden = coincide;
    }
    return { el, ir, destruir: () => el.remove() };
  }

  const css = document.createElement('style');
  css.textContent = `
.lt { font-family: var(--sans, system-ui, sans-serif); color: var(--ink, #1f2430); padding: 0.4rem 0 0.2rem; user-select: none; }
.lt-eje { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.9rem; }
.lt-ext { font-size: 0.68rem; font-weight: 500; color: var(--muted, #6b7080); white-space: nowrap; }
.lt-pista { position: relative; height: 3.6rem; }
.lt-pista::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 2px; margin-top: -1px; background: var(--line, #e4e4df); }
.lt-hito { position: absolute; top: 50%; height: 0; }
.lt-hito i { position: absolute; left: 0; top: -4px; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: var(--bg, #fafaf8); border: 1.5px solid var(--muted, #6b7080); }
.lt-hito[style*="width"] i { width: 100%; height: 4px; top: -2px; margin-left: 0; border-radius: 2px; border: 0; background: var(--muted, #6b7080); opacity: .5; }
.lt-hito span { position: absolute; left: 0; transform: translateX(-50%); white-space: nowrap; font-size: 0.66rem; line-height: 1.2; color: var(--muted, #6b7080); text-align: center; }
.lt-hito[style*="width"] span { left: 50%; }
.lt-hito.izq span { transform: none; text-align: left; }
.lt-hito.der span { transform: translateX(-100%); text-align: right; }
.lt-hito.fila0 span { bottom: 0.55rem; }
.lt-hito.fila1 span { top: 0.55rem; }
.lt-hito span b { display: block; font-weight: 600; }
.lt-hito.pasado i { border-color: var(--ink, #1f2430); }
.lt-hito.actual span { color: var(--accent, #9e2b25); }
.lt-hito.actual i { border-color: var(--accent, #9e2b25); background: var(--accent, #9e2b25); }
.lt-marca { position: absolute; top: 50%; left: 0; width: 0; transition: left .7s cubic-bezier(.3,.7,.2,1); }
.lt-marca.sin { opacity: .3; }
.lt-banda { position: absolute; top: -4px; height: 8px; border-radius: 4px; background: color-mix(in srgb, var(--accent, #9e2b25) 35%, transparent); transition: width .7s ease, margin .7s ease; }
.lt-punto { position: absolute; left: -8px; top: -8px; width: 16px; height: 16px; border-radius: 50%; background: var(--accent, #9e2b25); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent, #9e2b25) 22%, transparent); }
.lt-hoy { position: absolute; bottom: 14px; left: 0; transform: translateX(-50%); font-size: 0.74rem; font-weight: 600; color: #fff; background: var(--accent, #9e2b25);
  padding: 0.1rem 0.45rem; border-radius: 4px; white-space: nowrap; }
.lt-hoy.der { transform: translateX(-100%); } .lt-hoy.izq { transform: none; }
@media (prefers-reduced-motion: reduce) { .lt-marca, .lt-banda { transition: none; } }
@media (max-width: 600px) { .lt-ext { display: none; } .lt-eje { grid-template-columns: 1fr; } .lt-hito span { font-size: 0.62rem; }
  /* En pantallas angostas solo se rotula el hito actual */ .lt-hito:not(.actual) span { display: none; } }`;
  document.head.appendChild(css);

  window.LineaTiempo = { crear, anio };
})();
