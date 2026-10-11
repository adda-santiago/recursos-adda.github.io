/* ==========================================================
   visor-3d.js — Adapta una app 3D al diseño común (DIRECTRICES §20)
   Para las apps que todavía tienen la estructura anterior
   (panel lateral .tb-panel con selector #ruta y lista #stations,
   y ficha flotante #detail). No toca la lógica de cada app:
     · lleva la ficha a la columna izquierda, con cabecera y cuerpo
       desplazable, y la navegación fija abajo;
     · crea el botón flotante «Rutas» y su panel, que lista solo los
       nombres de las rutas (opciones del selector #ruta); al tocar una,
       dispara el mismo cambio del selector que usaba la app;
     · amplía las imágenes .desc-img del texto (visor de imagen).
   Se carga DESPUÉS de app.js. Requiere assets/css/visor-3d.css.
   ========================================================== */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const app = document.querySelector('.tb-app');
  const detail = $('detail');
  if (!app || !detail || document.getElementById('rutas-panel')) return;
  document.body.classList.add('v3d');
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Columna de texto ---------- */
  const head = document.querySelector('.tb-head');
  const brand = head && head.querySelector('.brand');
  const titulo = head && head.querySelector('h1');
  const lead = head && head.querySelector('.lead');
  const cab = document.createElement('header');
  cab.className = 'tb-cab';
  if (brand) cab.appendChild(brand);
  const h1 = document.createElement('h1');
  h1.className = 'tb-recurso';
  h1.textContent = titulo ? titulo.textContent : document.title.split('·')[0].trim();
  cab.appendChild(h1);
  const cuerpo = document.createElement('div');
  cuerpo.className = 'tb-cuerpo';
  cuerpo.id = 'd-cuerpo';
  const nav = detail.querySelector('.tb-nav');
  [...detail.childNodes].forEach(n => { if (n !== nav) cuerpo.appendChild(n); });
  const credito = document.querySelector('.tb-panel .credito');
  if (credito) cuerpo.appendChild(credito);
  detail.prepend(cab);
  detail.insertBefore(cuerpo, nav);
  app.prepend(detail);
  // Cada estación nueva vuelve al comienzo del texto
  new MutationObserver(() => { cuerpo.scrollTop = 0; }).observe($('d-title'), { childList: true, characterData: true, subtree: true });

  /* ---------- Botón y panel de rutas ---------- */
  const stage = $('stage');
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'tb-rutas-btn'; btn.id = 'rutas-btn';
  btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'rutas-panel');
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg><span>Rutas</span>';
  stage.appendChild(btn);
  const panel = document.createElement('aside');
  panel.className = 'tb-rutas'; panel.id = 'rutas-panel'; panel.hidden = true;
  panel.setAttribute('aria-label', 'Rutas de aprendizaje');
  panel.innerHTML = `<div class="tb-rutas-cab"><p>${esc(h1.textContent)}</p><button type="button" id="rutas-ocultar">Ocultar</button></div>
    ${lead ? `<p class="lead">${esc(lead.textContent)}</p>` : ''}<div id="rutas-lista"></div>`;
  app.appendChild(panel);
  const lista = panel.querySelector('#rutas-lista');
  const sel = $('ruta');
  const estaciones = $('stations');

  function rutas() {
    // Con el selector: sus opciones, agrupadas. Sin él: una sola ruta.
    if (sel && sel.options.length) {
      return [...sel.options].map(o => ({ id: o.value, n: o.textContent, grupo: o.parentElement.tagName === 'OPTGROUP' ? o.parentElement.label : '' , actual: o.value === sel.value }));
    }
    return [{ id: '', n: 'Recorrido', grupo: '', actual: true }];
  }
  function pintar() {
    const rs = rutas(), info = $('ruta-info');
    const grupos = [...new Set(rs.map(r => r.grupo))];
    lista.innerHTML = grupos.map(g => `<section>${g ? `<h2>${esc(g)}</h2>` : ''}${rs.filter(r => r.grupo === g).map(r => `
      <div class="tb-r${r.actual ? ' actual' : ''}">
        <button type="button" class="tb-r-btn" data-r="${esc(r.id)}"${r.actual ? ' aria-current="true"' : ''}><span>${esc(r.n)}</span>${r.actual && info && info.textContent ? `<em>${esc(info.textContent)}</em>` : ''}</button>
      </div>`).join('')}</section>`).join('');
  }
  function abrir(on) {
    panel.hidden = !on;
    btn.setAttribute('aria-expanded', String(on));
    if (on) { pintar(); const c = panel.querySelector('[aria-current="true"]'); if (c) c.focus(); }
  }
  btn.addEventListener('click', () => abrir(panel.hidden));
  panel.querySelector('#rutas-ocultar').addEventListener('click', () => { abrir(false); btn.focus(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) abrir(false); });
  lista.addEventListener('click', e => {
    const r = e.target.closest('[data-r]');
    if (!r) return;
    // Elegir otra ruta lleva a su primer paso (lo hace la app al cambiar el selector);
    // los pasos se recorren con Anterior/Siguiente
    if (sel && r.dataset.r !== sel.value) {
      sel.value = r.dataset.r;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
    abrir(false);
  });

  /* ---------- Imágenes del texto, ampliables ---------- */
  const lb = document.createElement('div');
  lb.className = 'tb-lightbox'; lb.hidden = true;
  lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Imagen ampliada');
  lb.innerHTML = '<button type="button" class="tb-lightbox-cerrar">Cerrar</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(lb);
  const cerrar = () => { lb.hidden = true; lb.querySelector('img').removeAttribute('src'); };
  lb.addEventListener('click', cerrar);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) cerrar(); });
  cuerpo.addEventListener('click', e => {
    const b = e.target.closest('.desc-img');
    if (!b) return;
    const img = b.querySelector('img');
    lb.querySelector('img').src = b.dataset.src || img.src; lb.querySelector('img').alt = img.alt;
    lb.querySelector('figcaption').textContent = b.dataset.pie || '';
    lb.hidden = false; lb.querySelector('button').focus();
  });
})();
