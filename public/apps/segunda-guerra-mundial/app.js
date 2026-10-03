/*
 * Motor de la presentación. El contenido vive en data.js.
 *
 * Navegación: teclado, presentador inalámbrico (Av Pág / Re Pág), clic, toque y deslizamiento.
 * Estado en la URL: #n = diapositiva n (1-based).
 * Vista del presentador: segunda ventana (?presentador) sincronizada por postMessage.
 * Contrato del visor: window.fypReset vuelve a la portada.
 */
(function () {
  'use strict';

  var D = window.PRESENTACION;
  if (!D || !D.diapositivas || !D.diapositivas.length) {
    document.body.textContent = 'No se encontró el contenido de la presentación (data.js).';
    return;
  }

  var S = D.diapositivas;
  var ES_PRESENTADOR = new URLSearchParams(location.search).has('presentador');
  // Abierto como archivo local, el origen es opaco: se acepta '*' y se filtra por e.source.
  var ORIGEN = (location.protocol === 'file:' || location.origin === 'null') ? '*' : location.origin;
  var ANCHO = 1600, ALTO = 900;

  var actual = 0;
  var paso = 0;
  var ventanaPresentador = null;

  var $ = function (sel) { return document.querySelector(sel); };

  function esc(txt) {
    return String(txt == null ? '' : txt)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function parrafos(txt) {
    if (!txt) return '<p>Sin notas para esta diapositiva.</p>';
    return String(txt).split(/\n\s*\n/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
  }

  /* ---------- Plantillas por layout ---------- */

  function htmlImagen(img, esquina) {
    if (!img) return '';
    if (!img.src) {
      var desc = esc(img.pendiente || img.alt || 'Imagen por definir');
      if (esquina) return '<p class="pendiente-esquina">Imagen pendiente: ' + desc + '</p>';
      return '<div class="pendiente"><strong>Imagen pendiente</strong><span>' + desc + '</span></div>';
    }
    var etiqueta = img.tipo === 'ilustracion' ? '<span class="etiqueta-ia">Ilustración generada con IA</span>' : '';
    var credito = img.credito ? '<figcaption>' + esc(img.credito) + '</figcaption>' : '';
    return '<figure class="figura">' + etiqueta +
      '<img src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" loading="lazy" decoding="async">' +
      credito + '</figure>';
  }

  function htmlFuente(d) {
    return d.fuente ? '<p class="fuente">Fuente: ' + esc(d.fuente) + '</p>' : '';
  }

  var PLANTILLAS = {
    portada: function (d) {
      var desde = d.desde || 1939, hasta = d.hasta || 1945;
      var n = hasta - desde;
      var marcas = '';
      for (var i = 0; i <= n; i++) {
        var pct = (i / n) * 100;
        var retraso = (0.3 + 1.6 * (i / n)).toFixed(2);
        var rotulo = (i > 0 && i < n) ? '<span>' + (desde + i) + '</span>' : '';
        marcas += '<i class="regla-marca" style="left:' + pct + '%;transition-delay:' + retraso + 's">' + rotulo + '</i>';
      }
      var fondo = d.imagen && d.imagen.src
        ? '<div class="fondo-portada" style="background-image:url(\'' + esc(d.imagen.src) + '\')" role="img" aria-label="' + esc(d.imagen.alt) + '"></div>'
        : htmlImagen(d.imagen, true);
      return fondo +
        '<h1 class="portada-titulo">' + esc(d.titulo) + '</h1>' +
        (d.subtitulo ? '<p class="portada-sub">' + esc(d.subtitulo) + '</p>' : '') +
        '<div class="cronologia" aria-label="De ' + desde + ' a ' + hasta + '">' +
          '<span class="anio">' + desde + '</span>' +
          '<div class="regla" aria-hidden="true"><i class="regla-linea"></i>' + marcas + '</div>' +
          '<span class="anio anio-fin">' + hasta + '</span>' +
        '</div>';
    },

    pregunta: function (d) {
      return '<h2 class="pregunta">' + esc(d.titulo) + '</h2>' + htmlFuente(d);
    },

    puntos: function (d) {
      var items = (d.pasos || []).map(function (p, i) {
        return '<li data-paso="' + (i + 1) + '">' +
          '<span class="p-t">' + esc(p.t) + '</span>' +
          (p.d ? '<span class="p-d">' + esc(p.d) + '</span>' : '') +
          '</li>';
      }).join('');
      return '<header class="cabecera">' +
          '<h2 class="titulo">' + esc(d.titulo) + '</h2>' +
          (d.subtitulo ? '<p class="subtitulo">' + esc(d.subtitulo) + '</p>' : '') +
        '</header>' +
        '<ol class="puntos">' + items + '</ol>' +
        '<div class="col-imagen">' + htmlImagen(d.imagen) + '</div>' +
        htmlFuente(d);
    }
  };

  /* ---------- Construcción ---------- */

  var lienzo = $('#lienzo');
  var secciones = [];
  var totalPasos = [];

  function construir() {
    S.forEach(function (d, i) {
      var plantilla = PLANTILLAS[d.layout];
      var sec = document.createElement('section');
      sec.className = 'diapo diapo-' + d.layout;
      sec.id = 'd-' + (d.id || i);
      sec.setAttribute('aria-roledescription', 'diapositiva');
      sec.setAttribute('aria-label', (i + 1) + ' de ' + S.length + ': ' + d.titulo);
      sec.setAttribute('aria-hidden', 'true');
      sec.dataset.transicion = d.transicion || 'normal';
      sec.dataset.tono = d.tono || 'normal';
      sec.innerHTML = plantilla
        ? plantilla(d)
        : '<h2 class="titulo">' + esc(d.titulo) + '</h2><p class="subtitulo">Layout «' + esc(d.layout) + '» aún no implementado.</p>';
      lienzo.appendChild(sec);
      secciones.push(sec);

      var max = 0;
      sec.querySelectorAll('[data-paso]').forEach(function (el) {
        max = Math.max(max, parseInt(el.dataset.paso, 10) || 0);
      });
      totalPasos.push(max);
    });
  }

  function construirIndice() {
    var html = '';
    D.actos.forEach(function (acto) {
      var items = '';
      S.forEach(function (d, i) {
        if (d.acto !== acto.id) return;
        items += '<button type="button" class="indice-item" data-ir="' + i + '"><span>' + (i + 1) + '</span>' + esc(d.titulo) + '</button>';
      });
      if (items) html += '<h3 class="indice-acto">' + esc(acto.titulo) + '</h3>' + items;
    });
    $('#indice-lista').innerHTML = html;
  }

  /* ---------- Escala del lienzo ---------- */

  function ajustar() {
    var escala = Math.min(window.innerWidth / ANCHO, window.innerHeight / ALTO);
    lienzo.style.transform = 'translate(-50%, -50%) scale(' + escala + ')';
  }

  /* ---------- Navegación ---------- */

  function limitar(i) { return Math.max(0, Math.min(S.length - 1, i)); }

  function ir(i, p, opciones) {
    opciones = opciones || {};
    i = limitar(i);
    p = Math.max(0, Math.min(totalPasos[i], p || 0));
    var cambioDiapo = i !== actual || !secciones[i].classList.contains('activa');
    actual = i;
    paso = p;
    if (!ES_PRESENTADOR) pintar(cambioDiapo);
    else pintarPresentador();
    if (!opciones.sinHash) history.replaceState(null, '', location.pathname + location.search + '#' + (i + 1));
    if (!opciones.sinAviso) notificar();
  }

  function siguiente() {
    if (paso < totalPasos[actual]) ir(actual, paso + 1);
    else if (actual < S.length - 1) ir(actual + 1, 0);
  }

  function anterior() {
    if (paso > 0) ir(actual, paso - 1);
    else if (actual > 0) ir(actual - 1, totalPasos[actual - 1]);
  }

  function pintar(cambioDiapo) {
    secciones.forEach(function (sec, i) {
      var activa = i === actual;
      sec.classList.toggle('activa', activa);
      sec.setAttribute('aria-hidden', activa ? 'false' : 'true');
      if ('inert' in sec) sec.inert = !activa;
    });

    var sec = secciones[actual];
    sec.querySelectorAll('[data-paso]').forEach(function (el) {
      el.classList.toggle('visible', parseInt(el.dataset.paso, 10) <= paso);
    });

    if (cambioDiapo && sec.classList.contains('diapo-portada')) {
      // Reinicia la animación sin que se vea retroceder.
      sec.classList.add('reiniciar');
      sec.classList.remove('animar');
      void sec.offsetWidth;
      sec.classList.remove('reiniciar');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { sec.classList.add('animar'); });
      });
    }

    $('#contador').textContent = (actual + 1) + ' / ' + S.length;
    $('#progreso-barra').style.width = (S.length > 1 ? (actual / (S.length - 1)) * 100 : 100) + '%';
    $('#notas-texto').innerHTML = parrafos(S[actual].notas);

    document.querySelectorAll('.indice-item').forEach(function (b) {
      b.setAttribute('aria-current', parseInt(b.dataset.ir, 10) === actual ? 'true' : 'false');
    });

    if (cambioDiapo) {
      $('#anuncio').textContent = 'Diapositiva ' + (actual + 1) + ' de ' + S.length + ': ' + S[actual].titulo;
      document.title = S[actual].titulo + ' · ' + D.titulo;
    }
  }

  function leerHash() {
    var n = parseInt((location.hash || '').replace('#', ''), 10);
    return isNaN(n) ? 0 : n - 1;
  }

  /* ---------- Paneles y modos ---------- */

  var PANELES = ['#panel-indice', '#panel-notas', '#panel-ayuda'];

  function alternarPanel(sel) {
    var panel = $(sel);
    var abrir = panel.hidden;
    PANELES.forEach(function (s) { $(s).hidden = true; });
    panel.hidden = !abrir;
    if (abrir) {
      var foco = sel === '#panel-indice' ? panel.querySelector('[aria-current="true"]') : panel.querySelector('button');
      if (foco) foco.focus();
    }
  }

  function cerrarPaneles() {
    var habiaAbierto = false;
    PANELES.forEach(function (s) { if (!$(s).hidden) { habiaAbierto = true; $(s).hidden = true; } });
    return habiaAbierto;
  }

  function alternarNegro() {
    var n = $('#negro');
    n.hidden = !n.hidden;
  }

  function alternarTema() {
    var raiz = document.documentElement;
    var actualTema = raiz.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    raiz.dataset.theme = actualTema === 'dark' ? 'light' : 'dark';
    enviar({ tipo: 'sgm:tema', tema: raiz.dataset.theme });
  }

  function puedeCompleta() {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  }

  function alternarCompleta() {
    var el = document.documentElement;
    var activo = document.fullscreenElement || document.webkitFullscreenElement;
    if (activo) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else if (puedeCompleta()) {
      var pedir = el.requestFullscreen || el.webkitRequestFullscreen;
      var r = pedir.call(el);
      if (r && r.catch) r.catch(function () {});
    }
  }

  /* ---------- Vista del presentador (sincronización) ---------- */

  function enviar(msg) {
    var destino = ES_PRESENTADOR ? window.opener : ventanaPresentador;
    if (destino && !destino.closed) {
      try { destino.postMessage(msg, ORIGEN); } catch (e) { /* ventana cerrada */ }
    }
  }

  function notificar() {
    enviar(ES_PRESENTADOR
      ? { tipo: 'sgm:ir', actual: actual, paso: paso }
      : { tipo: 'sgm:estado', actual: actual, paso: paso });
  }

  function abrirPresentador() {
    if (ventanaPresentador && !ventanaPresentador.closed) {
      ventanaPresentador.focus();
      return;
    }
    var url = location.pathname + '?presentador#' + (actual + 1);
    ventanaPresentador = window.open(url, 'sgm-presentador', 'width=1100,height=720');
    if (!ventanaPresentador) {
      alert('El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio y vuelve a pulsar P.');
    }
  }

  window.addEventListener('message', function (e) {
    var m = e.data;
    if (!m || typeof m.tipo !== 'string' || m.tipo.indexOf('sgm:') !== 0) return;

    if (ES_PRESENTADOR) {
      if (e.source !== window.opener) return;
      if (m.tipo === 'sgm:estado') ir(m.actual, m.paso, { sinAviso: true });
      if (m.tipo === 'sgm:tema') document.documentElement.dataset.theme = m.tema;
    } else {
      if (!ventanaPresentador || e.source !== ventanaPresentador) return;
      if (m.tipo === 'sgm:hola') notificar();
      if (m.tipo === 'sgm:ir') ir(m.actual, m.paso);
      if (m.tipo === 'sgm:negro') alternarNegro();
    }
  });

  var inicioCrono = null;

  function formatoTiempo(ms) {
    var s = Math.floor(ms / 1000);
    var m = Math.floor(s / 60);
    var h = Math.floor(m / 60);
    var dos = function (n) { return (n < 10 ? '0' : '') + n; };
    return (h ? h + ':' + dos(m % 60) : m) + ':' + dos(s % 60);
  }

  function minutosHasta(i) {
    var total = 0;
    for (var k = 0; k < i; k++) total += S[k].minutos || 0;
    return total;
  }

  function construirPresentador() {
    document.body.classList.add('modo-presentador');
    var vp = document.createElement('div');
    vp.className = 'vp';
    vp.innerHTML =
      '<header class="vp-cabecera">' +
        '<span class="vp-reloj" id="vp-crono" title="Tiempo transcurrido desde el primer avance">0:00</span>' +
        '<span class="vp-dato">Hora <strong id="vp-hora"></strong></span>' +
        '<span class="vp-dato">Diapositiva <strong id="vp-num"></strong></span>' +
        '<span class="vp-dato">Ritmo previsto <strong id="vp-previsto"></strong></span>' +
        '<button type="button" id="vp-negro">Pantalla negra</button>' +
        '<button type="button" id="vp-reiniciar">Reiniciar cronómetro</button>' +
      '</header>' +
      '<section class="vp-actual">' +
        '<p class="vp-rotulo">Ahora</p>' +
        '<h1 class="vp-titulo" id="vp-titulo"></h1>' +
        '<p class="vp-paso" id="vp-paso"></p>' +
        '<div class="vp-notas" id="vp-notas"></div>' +
      '</section>' +
      '<section class="vp-siguiente">' +
        '<p class="vp-rotulo">A continuación</p>' +
        '<p class="vp-proximo" id="vp-proximo"></p>' +
      '</section>' +
      '<footer class="vp-pie">' +
        '<button type="button" id="vp-ant">Anterior</button>' +
        '<button type="button" id="vp-sig">Siguiente</button>' +
      '</footer>';
    document.body.appendChild(vp);

    $('#vp-ant').addEventListener('click', anterior);
    $('#vp-sig').addEventListener('click', siguiente);
    $('#vp-negro').addEventListener('click', function () { enviar({ tipo: 'sgm:negro' }); });
    $('#vp-reiniciar').addEventListener('click', function () { inicioCrono = null; $('#vp-crono').textContent = '0:00'; });

    function tictac() {
      $('#vp-hora').textContent = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
      if (inicioCrono) $('#vp-crono').textContent = formatoTiempo(Date.now() - inicioCrono);
    }
    tictac();
    setInterval(tictac, 1000);

    if (!window.opener) {
      var aviso = document.createElement('p');
      aviso.className = 'vp-desconectado';
      aviso.textContent = 'Esta ventana no está conectada a una presentación. Ábrela con la tecla P desde la presentación proyectada.';
      vp.insertBefore(aviso, vp.children[1]);
    } else {
      window.opener.postMessage({ tipo: 'sgm:hola' }, ORIGEN);
    }
  }

  function pintarPresentador() {
    if (!inicioCrono && (actual > 0 || paso > 0)) inicioCrono = Date.now();
    var d = S[actual];
    $('#vp-titulo').textContent = d.titulo;
    $('#vp-num').textContent = (actual + 1) + ' de ' + S.length;
    $('#vp-previsto').textContent = 'minuto ' + Math.round(minutosHasta(actual));
    $('#vp-paso').textContent = totalPasos[actual]
      ? 'Aparición ' + paso + ' de ' + totalPasos[actual] +
        (paso < totalPasos[actual] ? '. Siguiente clic: «' + S[actual].pasos[paso].t + '»' : '. Todo visible.')
      : 'Sin apariciones por clic.';
    $('#vp-notas').innerHTML = parrafos(d.notas);
    var prox = S[actual + 1];
    $('#vp-proximo').textContent = prox ? (actual + 2) + '. ' + prox.titulo : 'Fin de la presentación.';
  }

  /* ---------- Entradas ---------- */

  function enCampoTexto(el) {
    return el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  }

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || enCampoTexto(e.target)) return;
    var k = e.key;
    var negroVisible = !$('#negro').hidden;

    if (negroVisible && k !== 'b' && k !== 'B' && k !== '.') {
      $('#negro').hidden = true;
      e.preventDefault();
      return;
    }

    switch (k) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter':
        if (k === 'Enter' && e.target.tagName === 'BUTTON') return;
        if (k === ' ' && e.target.tagName === 'BUTTON') return;
        siguiente(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        anterior(); break;
      case 'Home': ir(0, 0); break;
      case 'End': ir(S.length - 1, totalPasos[S.length - 1]); break;
      case 'b': case 'B': case '.':
        if (ES_PRESENTADOR) enviar({ tipo: 'sgm:negro' }); else alternarNegro();
        break;
      case 'f': case 'F': if (!ES_PRESENTADOR) alternarCompleta(); break;
      case 'i': case 'I': if (!ES_PRESENTADOR) alternarPanel('#panel-indice'); break;
      case 'n': case 'N': if (!ES_PRESENTADOR) alternarPanel('#panel-notas'); break;
      case 'p': case 'P': if (!ES_PRESENTADOR) abrirPresentador(); break;
      case 't': case 'T': alternarTema(); break;
      case '?': if (!ES_PRESENTADOR) alternarPanel('#panel-ayuda'); break;
      case 'Escape': if (!cerrarPaneles()) return; break;
      default: return;
    }
    e.preventDefault();
  });

  function enlazarControles() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-accion]');
      if (b) {
        var a = b.dataset.accion;
        if (a === 'anterior') anterior();
        else if (a === 'siguiente') siguiente();
        else if (a === 'indice') alternarPanel('#panel-indice');
        else if (a === 'notas') alternarPanel('#panel-notas');
        else if (a === 'ayuda') alternarPanel('#panel-ayuda');
        else if (a === 'presentador') abrirPresentador();
        else if (a === 'tema') alternarTema();
        else if (a === 'completa') alternarCompleta();
        else if (a === 'cerrar') cerrarPaneles();
        return;
      }
      var irA = e.target.closest('[data-ir]');
      if (irA) {
        ir(parseInt(irA.dataset.ir, 10), 0);
        cerrarPaneles();
      }
    });

    $('#negro').addEventListener('click', alternarNegro);

    if (!puedeCompleta()) $('#btn-completa').hidden = true;

    // Clic y toque sobre el escenario: tercio izquierdo retrocede, el resto avanza.
    var escenario = $('#escenario');
    var x0 = null, y0 = null, deslizo = false;

    escenario.addEventListener('pointerdown', function (e) {
      x0 = e.clientX; y0 = e.clientY; deslizo = false;
    });
    escenario.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0, dy = e.clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        deslizo = true;
        if (dx < 0) siguiente(); else anterior();
      }
      x0 = null;
    });
    escenario.addEventListener('click', function (e) {
      if (deslizo) { deslizo = false; return; }
      if (e.target.closest('a, button, input, [data-interactivo]')) return;
      if (cerrarPaneles()) return;
      if (e.clientX < window.innerWidth / 3) anterior(); else siguiente();
    });

    // Los controles se ocultan tras unos segundos sin mover el mouse.
    var temporizador = null;
    function despertar() {
      document.body.classList.remove('inactivo');
      clearTimeout(temporizador);
      temporizador = setTimeout(function () { document.body.classList.add('inactivo'); }, 2500);
    }
    ['mousemove', 'pointerdown', 'keydown'].forEach(function (ev) {
      document.addEventListener(ev, despertar, { passive: true });
    });
    despertar();

    window.addEventListener('resize', ajustar);
    window.addEventListener('hashchange', function () {
      var i = leerHash();
      if (i !== actual) ir(i, 0, { sinHash: true });
    });
  }

  /* ---------- Contrato del visor ---------- */

  window.fypReset = function () {
    cerrarPaneles();
    $('#negro').hidden = true;
    ir(0, 0);
  };

  /* ---------- Arranque ---------- */

  if (ES_PRESENTADOR) {
    construir();            // solo para contar las apariciones; el escenario no se muestra
    construirPresentador();
    actual = limitar(leerHash());
    pintarPresentador();
  } else {
    construir();
    construirIndice();
    enlazarControles();
    ajustar();
    actual = -1;
    ir(leerHash(), 0, { sinAviso: true });
  }
})();
