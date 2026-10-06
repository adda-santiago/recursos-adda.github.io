# Directrices del proyecto — Recursos bíblicos interactivos

Versión 2.1 · 6 de octubre de 2026

Este documento es la fuente de verdad del proyecto. Cualquier decisión nueva que contradiga algo de aquí se registra en la bitácora (§23) y se actualiza la sección correspondiente. Si el código y este documento no coinciden, se corrige uno de los dos; no se deja la diferencia. Mientras una diferencia esté en proceso de corregirse, la sección lo indica como **pendiente de implementar**.

**Cambio de la versión 2.0:** el proyecto deja de ser una plataforma escolar con fines comerciales y pasa a ser un recurso de la iglesia para el estudio bíblico, sin anuncios ni planes pagados.

**Cambio de la versión 2.1:** nombre visible *Recursos Bíblicos*; taxonomía bíblica implementada (testamento, época, libro); las fichas pasan a `/{slug}/`.

---

## 1. Propósito y alcance

Biblioteca de modelos 3D, mapas, líneas de tiempo y árboles genealógicos interactivos para los miembros de la iglesia que quieren profundizar en el estudio de la Biblia. Es un proyecto de la iglesia, sin fines comerciales.

Queda dentro del alcance: recursos visuales interactivos sobre la Biblia y su contexto (geografía, historia, arqueología, personajes), cada uno con su ficha escrita y su ruta de aprendizaje; búsqueda; exploración por testamento, libro y época; pantalla completa para proyectar en reuniones; compartir.

**Antecedente.** El proyecto nace de Fuego y Palabra (`crist-alarc/Fuego-y-Palabra`). Este repositorio es la fuente oficial de todas sus apps (§24).

**Recursos no bíblicos.** El ADN, el motor de combustión, los viajes de Colón y la Segunda Guerra Mundial se crearon cuando el proyecto apuntaba a colegios. Quedan ocultos (`publicado: false`), sin borrarse, por si se retoman en otro proyecto.

Queda fuera: anuncios y cualquier forma de monetización, cuentas de usuario, evaluaciones calificadas, foros o comentarios públicos, contenido generado por usuarios.

## 2. Público y casos de uso

| Usuario | Situación | Qué necesita |
|---|---|---|
| Miembro estudiando por su cuenta | Lee la Biblia en casa, desde el celular o el computador, y quiere ver el contexto: lugar, época, personajes | Buscar por libro, pasaje o personaje; ficha con citas y fuentes; recursos que se entiendan sin alguien que los explique |
| Líder de estudio o grupo pequeño | Prepara una reunión y a veces proyecta | Pantalla completa, restaurar vista, compartir por WhatsApp |
| Predicador o maestro | Usa un recurso como apoyo visual en una prédica o clase | Lo mismo que el líder; a futuro, enlace directo a una estación de la ruta (`fyp:ir-a`, §6) |

## 3. Principios de producto

1. **Contenido sobre adornos.** La interfaz existe para mostrar el recurso; todo control debe justificar su lugar.
2. **Estudio primero.** La mayoría de los usuarios estudia solo. La ficha escrita y la ruta de aprendizaje pesan tanto como el visor, porque nadie va a estar al lado explicando. La pantalla completa se mantiene para cuando se proyecta.
3. **Rigor visible.** Cada recurso declara sus fuentes, su licencia y su estado de revisión. La ficha distingue lo que dice el texto bíblico, lo que aporta la arqueología o la historia, y lo que es reconstrucción o interpretación.
4. **Nadie necesita cuenta.** Todo se usa sin registrarse.
5. **Sin anuncios ni fines comerciales.** Sin excepciones (§10).
6. **Estructura normalizada desde el inicio.** Todo recurso nuevo nace con el esquema y el contrato de visor; no se refactoriza después.
7. **Demanda antes que oferta.** Los recursos nuevos se priorizan con las búsquedas sin resultado y las solicitudes del buzón, no por intuición.

## 4. Marca e identidad visual

**Decidido:** el sitio tiene identidad bíblica; ya no se busca una marca neutra.

**Nombre visible:** *Recursos Bíblicos*, con 📖 como favicon. Vive solo en `src/config/sitio.ts` (`SITIO.nombre` y `SITIO.emoji`); no se escribe en ningún otro lugar.

**Logo:** la cabecera muestra un símbolo de tamaño fijo junto al nombre. Mientras no haya logo, el símbolo es el emoji. Para usar un logo, se sube el archivo a `public/` (formato cuadrado, SVG o PNG de al menos 128 × 128 px) y se escribe su nombre en `SITIO.logo` (por ejemplo, `'logo.svg'`). No hay que tocar la cabecera.

**Publicación:** organización de GitHub `adda-santiago`, repositorio `recursos-biblicos`, sitio en `https://adda-santiago.github.io/recursos-biblicos/`.

**Cuidado con los nombres de organización y repositorio:** definen la URL del sitio mientras no haya dominio propio. Renombrar cualquiera de los dos rompe los enlaces compartidos. Antes de difundir el sitio masivamente en la iglesia, conviene decidir si se usará un dominio propio (§19).

Identidad actual (se mantiene):

| Elemento | Valor |
|---|---|
| Tipografía de contenido | Newsreader (serif) |
| Tipografía de controles | Inter (sans) |
| Tokens | `src/styles/tokens.css`: `--bg`, `--surface`, `--surface-2`, `--ink`, `--ink-2`, `--muted`, `--line`, `--line-strong`, `--accent`, `--serif`, `--sans`, escala `--text-*`, `--space-*`, `--measure`, `--radius` |
| Acento | Único (`--accent`), para foco, estados activos y enlaces subrayados |
| Modo oscuro | Por `prefers-color-scheme`, con `data-theme="light"` como anulación |

Reglas:

- Los **colores que codifican datos** no se reemplazan por tokens neutros: reino (`--judah`, `--israel`), evaluación (`--good`, `--bad`, `--mixed`), época y tipo. Cada nueva app que codifique categorías con color declara sus propias variables y las documenta en su CSS.
- Estética minimalista: listas con líneas finas, sin tarjetas con sombra, sin degradados decorativos.
- Accesibilidad mínima: foco visible, contraste AA, `prefers-reduced-motion` respetado, textos alternativos en todo recurso visual.
- Las apps legadas conservan sus CSS con fallback `:where()` para que rendericen aunque `tokens.css` no cargue primero.

## 5. Arquitectura técnica

### Stack

| Capa | Herramienta | Motivo |
|---|---|---|
| Generador del sitio | Astro 5 (estático) | Genera HTML por recurso (SEO), valida el esquema de contenido, carga JS solo donde hace falta |
| Búsqueda | Pagefind | Índice estático generado en el build, sin servidor, con filtros por faceta |
| Visor 3D simple | `<model-viewer>` (Google) | Hotspots, carga diferida, gestos táctiles, AR y Draco incluidos |
| Visor 3D complejo | Three.js | Escenas compuestas, recorridos, comparaciones a escala |
| Mapas | Leaflet + teselas Esri | Sin clave de API |
| Hosting | GitHub Pages, organización `adda-santiago`, repositorio `recursos-biblicos` | Gratis y permanente: sin uso comercial no hace falta otro hosting. Sitio de proyecto en la subcarpeta `/recursos-biblicos/` |
| Modelos pesados (`.glb`) | Almacenamiento externo con CDN | Pendiente hasta el primer modelo pesado (§22) |
| CI/CD | GitHub Actions (`.github/workflows/publicar.yml`) | Build, validación del esquema y despliegue |

No hay base de datos ni servidor propio. El contenido vive en archivos Markdown dentro del repositorio; Git actúa como base de datos, con historial y reversión.

### Estructura del repositorio

```
/
├─ astro.config.mjs          site/base desde variables de entorno
├─ docs/DIRECTRICES.md       este documento
├─ public/
│  ├─ apps/                  apps legadas, sin cambios de lógica
│  │  ├─ assets/css/         tokens.css, app.css y CSS por app (legado)
│  │  ├─ visor-bridge.js     contrato visor ↔ app (§6)
│  │  ├─ atlas/ linea-reyes/ genealogias/ tabernaculo/ templo-salomon/
│  │  ├─ adn/ motor-combustion/ viajes-colon/ segunda-guerra-mundial/   (fichas ocultas, §1)
│  └─ robots.txt             sin efecto mientras el sitio esté en subcarpeta (§19)
├─ src/
│  ├─ config/sitio.ts        nombre, buzón, analítica (anuncios: inactivo, a eliminar)
│  ├─ data/taxonomia.ts      vocabulario controlado (§9)
│  ├─ content.config.ts      esquema obligatorio de recurso (§8)
│  ├─ content/recursos/*.md  un archivo por recurso = ficha + metadatos
│  ├─ lib/                   url, storage, analitica (anuncios y cuenta: inactivos, a eliminar)
│  ├─ components/            Visor, Compartir, ItemRecurso (EspacioAnuncio: inactivo, a eliminar)
│  ├─ layouts/Base.astro
│  ├─ pages/                 portada, [slug] (ficha), [asignatura]/[slug] (redirecciones), embed/[slug], explorar, buzón, privacidad, 404
│  └─ styles/                tokens.css, global.css
└─ .github/workflows/        publicar.yml, desempaquetar.yml
```

### Rutas públicas

Todas cuelgan de la base `/recursos-biblicos/`.

| Ruta | Contenido | Indexable |
|---|---|---|
| `/?q=&testamento=&epoca=&libro=&tipo=&tag=&guardados=1` | Portada = catálogo completo: recién agregados, filtros y búsqueda. Valores múltiples separados por coma | Sí |
| `/explorar/` | Redirección a la portada (enlaces antiguos) | No |
| `/{slug}/` | Ficha: visor + artículo + fuentes | Sí (única página indexada por Pagefind) |
| `/religion/{slug}/` | Redirección a `/{slug}/` (URL de las fichas hasta la v2.0) | No |
| `/embed/{slug}/` | Visor limpio para insertar | No (`noindex`, canonical a la ficha) |
| `/apps/{app}/` | App legada cruda | No (`<meta name="robots" content="noindex">` en cada app) |
| `/buzon/`, `/privacidad/` | Páginas de servicio | Sí |

Reglas de rutas:

- **Nunca escribir rutas absolutas a mano.** Todo pasa por `ruta()`, `rutaRecurso()` y `rutaEmbed()` de `src/lib/url.ts`. Las URL completas (canonical, compartir, embed) se arman con `new URL(ruta(...), Astro.site)`, nunca concatenando texto.
- El `slug` es el nombre del archivo Markdown. Puede cambiar, pero si cambia se agrega una redirección estática en `public/{ruta-antigua}/index.html`. GitHub Pages no permite redirecciones 301.
- Hay slugs reservados porque chocan con páginas o carpetas del sitio (`apps`, `embed`, `buzon`, `privacidad`, `explorar`, `pagefind`, `404`, `_astro`, `religion`). La lista vive en `SLUGS_RESERVADOS` (`src/data/taxonomia.ts`) y el build falla si una ficha publicada usa uno.
- El `uid` no cambia jamás (§8).

### Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local con recarga (la búsqueda usa el catálogo local; Pagefind solo existe tras el build) |
| `npm run build` | Compila a `dist/` y genera el índice de Pagefind |
| `npm run preview` | Sirve `dist/` para probar el resultado final |

## 6. Contrato del visor (obligatorio)

Todo recurso se muestra con `src/components/Visor.astro`, sin importar el motor. El contrato es:

| Función | Comportamiento | Implementación |
|---|---|---|
| Pantalla completa | Botón principal, siempre visible. Deja solo el recurso y la barra mínima | Fullscreen API sobre el contenedor del visor; en iPhone (sin Fullscreen API para elementos que no son video) usa respaldo CSS `.pseudo-completa`. Esc sale |
| Restaurar vista | Vuelve a la cámara o encuadre inicial | Legado: `postMessage({tipo:'fyp:restaurar'})`. model-viewer: reasigna órbita, objetivo y campo de visión |
| Guardar | Marca el recurso en este dispositivo | `almacen.alternarFavorito(uid)` |
| Compartir | Enlace, WhatsApp, Google Classroom, Microsoft Teams, compartir nativo en móvil, código de inserción | `Compartir.astro`. WhatsApp es el canal principal |
| Pantalla de carga | Texto que dice qué se está cargando; nunca queda pegada (tope de 15 s) | Se oculta con `load` o con el mensaje `fyp:lista` |

La pantalla completa cumple el papel del "modo pizarra": no se agrega un segundo botón para lo mismo.

El visor nunca contiene anuncios ni elementos ajenos al recurso.

### Protocolo `visor-bridge.js` (apps legadas en iframe)

- Mensajes aceptados: `{ tipo: 'fyp:restaurar' }`, solo desde el mismo origen.
- Mensajes emitidos: `{ tipo: 'fyp:lista' }` al terminar de cargar.
- Cada app legada declara `window.fypReset = () => {...}`. Si no lo hace, el puente intenta `#t-home` o `#zoom-reset`; si no hay nada, recarga la app.
- Dentro del iframe, el puente agrega la clase `en-visor` a `<html>` y oculta la marca interna de la app.
- Mensajes nuevos se agregan aquí antes de implementarse (candidato: `fyp:ir-a`, para abrir una estación de la ruta o un hotspot desde la URL; útil para predicadores y maestros).

## 7. Motores y convenciones 3D

### Elección de motor

| Motor | Cuándo usarlo | Estado |
|---|---|---|
| `legado` | Apps que corren como página propia en `public/apps/` | En uso: atlas, línea de reyes, genealogías, tabernáculo, templo de Salomón (y las apps de las fichas ocultas) |
| `model-viewer` | Un solo `.glb` con hotspots (un objeto: arca, altar, lámpara, utensilio) | Implementado en el visor, **sin probar aún con un modelo real** |
| `three` | Escenas compuestas, recorridos narrativos, comparaciones, modelos procedurales | Reservado. El build falla a propósito si un recurso lo declara antes de implementarlo |

Las apps legadas no se reescriben por reescribir. Se migran a `three` nativo solo cuando necesitan algo que el iframe impide (por ejemplo, hotspots controlados desde la ficha).

### Convenciones de escena

- Escenas bíblicas e históricas: **1 unidad = 1 codo (≈ 45 cm)**. Ejes: **+x oriente, −z norte, +y arriba**.
- Si una escena usa otra escala, la declara en `visor.escala`.
- Toda escena declara su escala en el campo `visor.escala` de la ficha.
- Three.js: las apps legadas usan r128. Todo desarrollo nuevo en `three` usa una versión actual vía ES modules; no se agregan funciones nuevas sobre r128.

### Presupuesto de rendimiento (criterio propio, a validar con uso real)

| Métrica | Objetivo |
|---|---|
| Peso de un `.glb` en carga inicial | ≤ 5 MB con Draco (geometría) y KTX2 (texturas) |
| Texturas | ≤ 2048 px por lado; 1024 px por defecto |
| Primera interacción en celular gama media con 4G | Póster visible de inmediato; modelo interactivo en pocos segundos |
| Carga del 3D | Diferida: póster primero, modelo al interactuar o al entrar en pantalla |

Estos valores son una estimación inicial, no un benchmark publicado. Se ajustan con mediciones reales.

## 8. Modelo de contenido

Cada recurso es un archivo `src/content/recursos/{slug}.md`. El esquema está en `src/content.config.ts` y **el build falla si un recurso no lo cumple**.

| Campo | Obligatorio | Regla |
|---|---|---|
| `uid` | Sí | Minúsculas, números y guiones. **Inmutable.** Los favoritos lo referencian |
| `titulo` | Sí | Como lo buscaría un miembro de la iglesia ("El tabernáculo", no "Modelo 3D #12") |
| `resumen` | Sí | ≤ 180 caracteres. Se usa en búsqueda, listas y meta descripción |
| `emoji` | No | Un emoji representativo |
| `testamento` | Sí, si está publicado | Uno o ambos de `TESTAMENTOS` (§9) |
| `epocas` | Sí, si está publicado | Uno o más de `EPOCAS` (§9) |
| `libros` | No | Valores de `LIBROS` (§9). Libros donde el tema es central, no toda mención |
| `tipo` | Sí | Valor de `TIPOS` |
| `tags` | No | Minúsculas con guiones, sin `#`. No repiten lo que ya dicen testamento, época o libro |
| `visor.motor` | Sí | `legado`, `model-viewer` o `three` |
| `visor.ruta` / `visor.modelo` / `visor.poster` | Según motor | Carpeta en `public/apps/`, o URL absoluta (con `https://`) del `.glb` y su póster. Una ruta que empiece con `/` se rompe en la subcarpeta |
| `visor.escala` | Recomendado | Obligatorio para todo 3D nuevo |
| `hotspots` | No | `id`, `titulo`, `texto`, `posicion [x,y,z]` |
| `licencia.contenido` | Sí | Licencia del texto y la app |
| `licencia.modelo`, `licencia.atribucion` | Si el modelo o las teselas son de terceros | Texto exacto que exige la licencia |
| `fuentes` | Sí (≥ 1) | Citas bíblicas, bibliografía o repositorio de origen |
| `revision.estado` | Sí | `borrador` o `revisado` |
| `revision.revisor`, `revision.fecha` | Al pasar a `revisado` | Quién revisó y cuándo |
| `fechaPublicacion` | Sí | Fecha en que el recurso se publica (`AAAA-MM-DD`). Ordena "Recién agregados" |
| `orden` | No | Orden editorial en el catálogo |
| `publicado` | No | `false` oculta el recurso sin borrarlo. Si no está, el recurso se publica |

Los campos de la etapa escolar (`asignatura`, `niveles`, `oa`, `coleccion`) ya no existen en el esquema. Si quedan en una ficha oculta, el build los ignora.

## 9. Taxonomía

Vocabulario controlado en `src/data/taxonomia.ts`. Agregar un valor es una decisión editorial: se registra en la bitácora. El orden de cada lista es el orden en que se muestran los filtros.

| Faceta | Valores | Regla |
|---|---|---|
| `testamento` | `antiguo`, `nuevo` | Un recurso puede tener ambos |
| `epocas` | `creacion`, `patriarcas`, `exodo`, `jueces`, `monarquia-unida`, `monarquia-dividida`, `exilio`, `retorno`, `intertestamentario`, `vida-de-jesus`, `iglesia-primitiva` | Uno o más. Coinciden con las franjas del árbol genealógico (`public/apps/genealogias/epocas.js`), que junta en una sola franja la vida de Jesús y la iglesia primitiva. Un recurso transversal (atlas, genealogías) lleva todas las que recorre |
| `libros` | Los 66 libros del canon protestante, con identificador fijo en minúsculas y guiones (`genesis`, `1-reyes`, `cantares`, `apocalipsis`) | Libros donde el tema del recurso es central, no toda mención |
| `tipo` | modelo 3D, mapa, línea de tiempo, árbol genealógico, interactivo | Se mantiene |
| `tags` | Libres, en minúsculas con guiones | Antes de crear uno, revisar si ya existe una variante. No se usan para testamento, época ni libro |

Asignación actual:

| Recurso | Testamento | Épocas | Libros |
|---|---|---|---|
| Atlas bíblico | Antiguo, Nuevo | Patriarcas a iglesia primitiva | Génesis, Éxodo, Números, Josué, 1 y 2 Reyes, Hechos |
| Reyes, jueces y profetas | Antiguo | Conquista y jueces a retorno | Jueces, 1 y 2 Samuel, 1 y 2 Reyes, 1 y 2 Crónicas |
| Árbol genealógico | Antiguo, Nuevo | Creación a vida de Jesús | Génesis, Rut, 1 Crónicas, Mateo, Lucas |
| El tabernáculo | Antiguo, Nuevo | Éxodo y desierto | Éxodo, Levítico, Números, Hebreos |
| El templo de Salomón | Antiguo | Monarquía unida | 1 Reyes, 2 Crónicas |

## 10. Sin fines comerciales

El proyecto no tiene anuncios, planes pagados ni ninguna forma de monetización.

- El código heredado de la etapa comercial (`src/lib/anuncios.ts`, `EspacioAnuncio`, `SITIO.anuncios`, la llamada a `iniciarAnuncios()` en `Base.astro`) queda inactivo con `SITIO.anuncios.habilitados = false` y **se elimina** en la limpieza pendiente (§20).
- No se agregan scripts de terceros con fines publicitarios ni de seguimiento.

## 11. Usuarios

No hay cuentas ni se planean.

- "Guardar" marca recursos solo en el dispositivo, a través de `almacen` (`src/lib/storage.ts`, `localStorage` con prefijo `fyp:v1:`).
- Ningún componente usa `localStorage` directamente; todo pasa por `almacen`.
- Los favoritos guardan `uid`, nunca títulos ni rutas, para sobrevivir a cambios de slug.
- `src/lib/cuenta.ts` queda inactivo y se elimina en la limpieza pendiente (§20).
- Si en el futuro hiciera falta sincronizar entre dispositivos, se evalúa como decisión nueva en la bitácora.

## 12. Analítica

Anónima, sin cookies de seguimiento ni datos personales. Proveedor sugerido: GoatCounter (se activa con `SITIO.analitica.goatcounter`). Eventos definidos en `src/lib/analitica.ts`:

| Evento | Para qué sirve |
|---|---|
| `abrir-recurso` | Uso por recurso |
| `pantalla-completa` | Proxy de uso en reuniones y prédicas |
| `restaurar-vista` | Si es muy alto, la navegación del modelo confunde |
| `compartir`, `copiar-embed` | Canales de difusión |
| `busqueda` | Qué se busca |
| `busqueda-sin-resultados` | **Lista de recursos nuevos por hacer** |
| `filtrar` | Qué facetas se usan (`faceta/valor`) |
| `guardar-favorito` | Qué recursos se marcan para volver a ellos |

No se agregan eventos sin documentarlos en esta tabla.

## 13. Privacidad

- No se recolectan datos personales. El buzón pide correo opcional y advierte no escribir datos personales de terceros.
- Si en algún momento se recolectaran datos personales, revisar antes la Ley 21.719 de protección de datos personales (Chile) y su fecha de vigencia.
- El proyecto no usa infraestructura corporativa de terceros (por ejemplo, el tenant de Microsoft de un empleador) para formularios, automatizaciones ni datos.

## 14. Portada y búsqueda

La portada es el catálogo completo, a ancho de pantalla:

| Zona | Comportamiento |
|---|---|
| Cabecera fija | Marca (símbolo + nombre en serif grande), buscador (presente en todas las páginas; desde otra página envía a la portada con `?q=`) y Sugerencias |
| Panel de filtros | Columna izquierda desde arriba, a la altura de "Recién agregados". Testamento, época, libro, tipo y etiquetas. En libro y etiquetas, 8 opciones visibles y el resto tras "Ver más"; "Solo mis guardados" si el visitante guardó algo. Fijo al hacer scroll en escritorio; plegable en celular, antes de "Recién agregados". Cada opción muestra cuántos recursos quedarían |
| Recién agregados | Columna derecha, arriba del catálogo. Los 4 recursos con `fechaPublicacion` más reciente. Se oculta mientras hay búsqueda o filtros activos, para que los resultados queden arriba. En celular, carrusel horizontal |
| Catálogo | Rejilla de tarjetas (imagen o emoji, tipo, título, resumen). En celular, tarjetas horizontales compactas |

Reglas de filtrado: **O** dentro de una misma faceta, **Y** entre facetas distintas. La búsqueda y los filtros se combinan. Con búsqueda, el orden es por relevancia; sin ella, por `orden`. Todo el estado vive en la URL, así que una vista filtrada se puede compartir.

Las tarjetas se generan en el HTML (SEO y uso sin JavaScript); el navegador solo las oculta o reordena.

- Pagefind indexa solo el `<article data-pagefind-body>` de cada ficha. Filtros: los de §9.
- La portada filtra los resultados de Pagefind para exigir que cada término aparezca por su raíz en el texto: evita falsos positivos por coincidencias parciales.
- En `npm run dev` (sin índice) se usa una búsqueda local sobre el catálogo, insensible a tildes.
- Búsqueda sin resultados: mensaje con enlace al buzón con la consulta precargada, y evento de analítica.
- Variantes de nombres bíblicos (Salomón/Salomon, Jerusalén/Jerusalem, Nabucodonosor/Nebucadnezar): a medida que aparezcan en las búsquedas sin resultado, se agregan como texto de la ficha o como tags.

## 15. Ficha escrita y SEO

Cada ficha tiene un artículo propio. Estructura recomendada de secciones H2:

1. **Qué muestra** (el modelo, mapa o línea de tiempo)
2. **Las partes / el contenido** (H3 por parte o sección)
3. **Qué dice el texto bíblico** (pasajes principales, citados)
4. **Cómo usarlo** (botones; sugerencias para estudio personal y para grupos)
5. **Qué es reconstrucción / limitaciones** (supuestos, fechas aproximadas, debates)

Además, cada ficha incluye automáticamente: JSON-LD `LearningResource`, canonical, Open Graph, fuentes, licencia, estado de revisión y enlace para reportar errores.

Reglas: el artículo explica lo que se ve; no repite el resumen ni rellena para alcanzar un largo. Las citas bíblicas usan Reina-Valera 1909 (dominio público) salvo decisión en contrario (§22). Donde hay interpretaciones distintas entre tradiciones o estudiosos, la ficha lo dice.

## 16. Compartir e insertar

- Opciones: copiar enlace, WhatsApp (canal principal), Google Classroom, Microsoft Teams y compartir nativo del sistema en móvil.
- Código de inserción: `<iframe src="{url absoluta}/embed/{slug}/" … allow="fullscreen" allowfullscreen loading="lazy">`. El embed conserva pantalla completa, restaurar vista y compartir, y enlaza a la ficha completa. Se mantiene porque ya funciona, aunque deja de ser prioridad.
- Los enlaces compartidos deben durar: todo cambio de ruta lleva redirección, y un cambio de organización, repositorio o dominio se planifica (§19).

## 17. Buzón de retroalimentación

- Formulario externo (Tally o Google Forms), configurado en `SITIO.buzonUrl`.
- La página `/buzon/` traspasa `?recurso={uid}` y `?q={búsqueda}` al formulario para que llegue precargado.
- Categorías sugeridas: sugerir recurso nuevo, reportar error de contenido (bíblico, histórico o geográfico), problema técnico, cómo lo uso.
- Prioridad de atención: errores de contenido primero.

## 18. Licencias, fuentes y rigor

- Todo recurso declara `fuentes` y `licencia`. Sin ellas, no compila.
- Modelos de terceros: solo con licencia explícita que permita el uso (CC0, CC-BY o dominio público). Repositorios candidatos: Smithsonian 3D (gran parte CC0), Sketchfab filtrado por licencia CC. Se revisa la licencia de cada modelo individualmente y se copia la atribución exacta.
- Antes de construir un modelo nuevo se evalúa la certeza de la evidencia (textual o arqueológica) junto con su complejidad. Lo incierto se muestra como tal en la ficha.
- Revisión: todo recurso nace como `borrador`. Pasa a `revisado` cuando alguien distinto del autor lo revisa, idealmente alguien con formación bíblica.

## 19. Hosting y despliegue

| Etapa | Destino | Configuración (`.github/workflows/publicar.yml`) |
|---|---|---|
| Actual | GitHub Pages, repo `adda-santiago/recursos-biblicos` | `SITE_URL=https://adda-santiago.github.io`, `BASE_PATH=/recursos-biblicos/` |
| Con dominio propio (opcional) | GitHub Pages + dominio | `SITE_URL=https://tudominio.cl`, `BASE_PATH=/`, dominio en Settings → Pages |

Reglas:

1. **Decidir si habrá dominio propio antes de difundir el sitio masivamente.** Pasar de `github.io` a un dominio cambia todas las URL.
2. GitHub Pages no permite redirecciones 301: todo cambio de ruta lleva una página de redirección estática.
3. Límites publicados de Pages: 1 GB de sitio y 100 GB/mes de transferencia (límites blandos).
4. Los `.glb` pesados no se guardan en Git: van a almacenamiento externo con CDN y se referencian por URL absoluta.
5. Mientras el sitio esté en subcarpeta (`/recursos-biblicos/`), `robots.txt` no tiene efecto: los buscadores solo lo leen en la raíz del dominio. Las apps legadas se excluyen con `<meta name="robots" content="noindex">` en su `index.html`. Con dominio propio en la raíz, `robots.txt` vuelve a funcionar.
6. En el plan gratuito, Pages exige repositorio público.
7. Sin computador propio, todo se edita desde el navegador (github.com o github.dev, tecla `.` en el repositorio). La validación la hace GitHub Actions: si un recurso no cumple el esquema, el flujo falla y el sitio publicado no cambia.
8. **Carga masiva por ZIP.** Subir por la web pierde la estructura de carpetas. Para cargar o actualizar muchos archivos, se sube un `.zip` a la raíz del repositorio: el flujo `desempaquetar.yml` lo descomprime conservando las carpetas, lo borra, confirma los cambios y lanza `publicar.yml`. Cada archivo del ZIP **reemplaza completo** al del repositorio: nunca se incluyen fragmentos. Los ZIP no pueden modificar `.github/` (GitHub no permite que un flujo edite flujos): los archivos de `.github/workflows/` se crean o editan a mano desde la web.

## 20. Flujos de trabajo

### Agregar un recurso nuevo

1. Revisar el buzón y las búsquedas sin resultado para confirmar la demanda.
2. Evaluar certeza de la evidencia y complejidad (§18). Elegir motor (§7).
3. Conseguir o construir el modelo. Verificar licencia. Comprimir (Draco, KTX2) y generar póster.
4. Crear `src/content/recursos/{slug}.md` con todos los campos obligatorios y `revision.estado: borrador`.
5. Escribir la ficha con la estructura de §15.
6. Verificar que GitHub Actions termine sin errores. Probar en escritorio, celular (táctil) y proyección (pantalla completa, restaurar vista).
7. Pedir revisión y pasar a `revisado` con revisor y fecha.

### Incorporar una app existente

1. Copiar la carpeta a `public/apps/{slug}/` (nombre sin espacios ni tildes).
2. Cambiar el enlace de marca a `../../`, agregar `<script src="../visor-bridge.js"></script>` antes de `</body>` y `<meta name="robots" content="noindex">` en el `<head>`.
3. Revisar que la app no use rutas que empiecen con `/`: dentro de la subcarpeta se rompen. Usar rutas relativas.
4. Declarar `window.fypReset` con la vista inicial.
5. Crear la ficha en `src/content/recursos/` con `visor.motor: legado` y `visor.ruta: {slug}`.

### Ruta de aprendizaje (obligatoria en todo modelo 3D)

**Todo modelo 3D nuevo incluye una ruta de aprendizaje.** Un modelo sin ruta no se publica. Siguen el patrón del tabernáculo: panel lateral con dos pestañas (estaciones y procesos), ficha flotante con título, filas de datos, explicación y navegación Anterior/Siguiente, y cámara que viaja a cada estación. Reglas:

- El contenido va en `data.js`, separado del motor (`app.js`), para poder revisar o corregir textos sin tocar el 3D.
- Cada estación cierra con una pregunta **Para pensar**, sin la respuesta escrita en la misma ficha. Sirve tanto para el estudio personal como para conversar en grupo.
- La ruta va de lo simple a lo complejo: piezas, ensamblaje, escala y contexto histórico.
- Las piezas que se muestran separadas de la escena principal usan materiales propios, para no atenuarse cuando se resalta una categoría.
- Lo que el modelo simplifica se declara en la sección «Qué es reconstrucción / limitaciones» de la ficha.
- Si el modelo representa un proceso que avanza en el tiempo, la escena muestra un indicador de estado con lo que está pasando en ese momento, y cada paso de Procesos repite solo su tramo.
- Las estaciones pueden mostrar grupos auxiliares (nombres, medidas) y fijar un tramo de animación; los botones de la escena permiten activarlos también a mano.
- **Mapas con recorridos** (viajes, rutas, campañas: el éxodo, los viajes de Pablo) usan el mismo patrón con Leaflet: la pestaña Procesos se llama según el contenido (por ejemplo, Viajes), la cámara es el encuadre del mapa (`view` como límites sur-oeste y norte-este), cada paso redibuja solo su tramo y el indicador de estado muestra recorrido, fecha, lugar y avance. Referencia técnica: `viajes-colon/` (ficha oculta, la app sigue en el repositorio).

### Pendientes

- **Despliegue en `adda-santiago`:** actualizar `publicar.yml`, reactivar Pages y verificar el sitio en la subcarpeta.
- **`noindex` en las apps legadas** (§19, regla 5).
- **Limpieza del código comercial:** eliminar `anuncios.ts`, `cuenta.ts`, `EspacioAnuncio`, `SITIO.anuncios` y la llamada a `iniciarAnuncios()`.
- **Templo de Herodes** (`herodes/`): no estaba en el repositorio de Fuego y Palabra. Incorporarlo con el procedimiento anterior.
- Revisar la respuesta en celular de las apps legadas con barra lateral fija: dentro del visor, en pantallas angostas, quedan apretadas. Solución de fondo: panel lateral colapsable por defecto bajo cierto ancho. Es prioritario, porque el estudio personal ocurre sobre todo en el celular.

## 21. Roadmap

| Fase | Alcance | Criterio de salida |
|---|---|---|
| 0. Plataforma mínima | Astro, visor con contrato, Pagefind, apps bíblicas incorporadas, compartir, embed, buzón | **Hecho en v1.1**, salvo Herodes y buzón sin URL |
| 1. Reorientación a la iglesia | Despliegue en `adda-santiago` (hecho), nombre visible (hecho), taxonomía bíblica (hecho), limpieza del código comercial | Sitio publicado en la URL nueva con facetas bíblicas |
| 2. Contenido | Templo de Herodes y recursos nuevos según el buzón y las búsquedas sin resultado | Usado por miembros y líderes de la iglesia |
| 3. Crecimiento | Analítica activa, PWA con modo sin conexión, enlace directo a estaciones (`fyp:ir-a`) | Uso sostenido medible |

## 22. Decisiones abiertas

| Decisión | Opciones | Estado |
|---|---|---|
| Dominio propio | Seguir en `github.io` / dominio de la iglesia | Pendiente; decidir antes de difundir masivamente |
| Logo | Imagen propia junto al nombre en la cabecera | Pendiente; la cabecera ya lo admite (`SITIO.logo`, §4) |
| Traducción bíblica para citas | Reina-Valera 1909 (dominio público) / otra con permiso | RV 1909 por defecto |
| Proveedor del buzón | Tally / Google Forms | Pendiente |
| Almacenamiento de `.glb` | Cloudflare R2 / otro | Pendiente hasta el primer modelo pesado |
| Destino final de los recursos no bíblicos | Mantener ocultos / borrar / mover a otro repositorio | Ocultos por ahora |

## 23. Bitácora de decisiones

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-09-30 | Migración a Astro estático con apps legadas en iframe y contrato de visor común | Escalar a cientos de recursos con SEO sin reescribir las apps existentes |
| 2026-09-30 | Pagefind como motor de búsqueda | Estático, sin servidor, con facetas |
| 2026-09-30 | Taxonomía controlada con niveles Mineduc y OA | Evitar degradación de tags libres; alinear con cómo planifica el profesor |
| 2026-09-30 | Pantalla completa absorbe el "modo pizarra" | Dos botones para la misma acción confunden |
| 2026-09-30 | Sin anuncios en visor ni en embed; anuncios solo en producción con dominio propio | Docencia sin interrupciones, políticas de AdSense y de GitHub Pages |
| 2026-09-30 | Cuentas solo para profesores, preparadas vía `storage` y `cuenta` | Plan sin anuncios futuro sin cargar datos de menores |
| 2026-09-30 | Repositorio nuevo en organización de GitHub, separado de Fuego y Palabra | El proyecto excede el alcance bíblico; la organización da URL en raíz y permite sumar colaboradores |
| 2026-09-30 | Marca propia neutra; Fuego y Palabra pasa a ser colección de Religión | Los colegios laicos y otras asignaturas no deben heredar una marca religiosa |
| 2026-09-30 | Este repositorio es la fuente oficial de las apps bíblicas; el de Fuego y Palabra queda congelado | Evitar dos copias que se desalinean |
| 2026-09-30 | Nombre provisional Aula Visual | Permite avanzar; el nombre vive en un solo archivo |
| 2026-10-01 | Portada a ancho completo: buscador en la cabecera, recién agregados, filtros por faceta y catálogo completo; `/explorar/` se integra a la portada | Mostrar más recursos sin navegar; una sola puerta de entrada al catálogo |
| 2026-10-01 | Campo obligatorio `fechaPublicacion` | Ordenar "Recién agregados" con un dato explícito, no inferido |
| 2026-10-01 | Primer recurso fuera de Religión: El ADN (Biología), con ruta de aprendizaje y replicación | Validar que la plataforma escala a otras asignaturas con el mismo contrato de visor |
| 2026-10-01 | Patrón "ruta de aprendizaje" con pregunta Para pensar por estación | Convertir el modelo en secuencia didáctica, no solo en objeto para mirar |
| 2026-10-01 | La ruta de aprendizaje pasa a ser obligatoria en todo modelo 3D nuevo | Consistencia didáctica; el usuario encuentra siempre la misma estructura |
| 2026-10-01 | Motor de combustión interna (Tecnología): corte, ciclo Otto animado con indicador de estado y comparación con el diésel | Primer recurso de Tecnología; valida el patrón de ruta en un mecanismo que se mueve |
| 2026-10-01 | El motor de combustión pasa a cuatro cilindros en línea (orden 1-3-4-2) con corte en escalón e indicador del tiempo de cada cilindro | Mostrar cómo se reparten las explosiones y por qué un motor de varios cilindros gira más parejo |
| 2026-10-02 | Primer recurso de Historia: los viajes de Colón (mapa Leaflet con ruta de aprendizaje de diez estaciones y los cuatro viajes paso a paso) | Validar el patrón de ruta en un mapa |
| 2026-10-02 | La ruta de aprendizaje se extiende a los mapas con recorridos | Misma estructura en todos los recursos que se recorren por pasos |
| 2026-10-02 | Primer código de OA cargado en una ficha (HI05 OA 01), verificado en curriculumnacional.cl | Aplicar la regla de OA verificados |
| 2026-10-06 | El repositorio vuelve a ser público | GitHub Pages en plan gratuito exige repositorio público |
| 2026-10-06 | Organización `adda-santiago`, repositorio `recursos-biblicos`; el sitio pasa a subcarpeta (`BASE_PATH=/recursos-biblicos/`) | El proyecto pasa a ser un recurso de la iglesia, sin fines comerciales |
| 2026-10-06 | Se descarta la monetización (anuncios y plan sin anuncios) y las cuentas de usuario | No es rentable a corto plazo; sin plan pagado, las cuentas pierden su motivo principal |
| 2026-10-06 | Público: miembros de la iglesia que quieren profundizar en el estudio de la Biblia | Define el uso principal: estudio personal, con proyección ocasional en reuniones |
| 2026-10-06 | Se abandona la marca neutra; el sitio tiene identidad bíblica | La neutralidad respondía a colegios laicos, que ya no son el público |
| 2026-10-06 | ADN, motor de combustión y viajes de Colón quedan ocultos (`publicado: false`) | No corresponden al propósito; se conservan por si se retoman en otro proyecto |
| 2026-10-06 | Taxonomía bíblica (testamento, libro, época, tipo) reemplaza asignatura, niveles y OA; pendiente de implementar | Facetas que corresponden a cómo se estudia la Biblia |
| 2026-10-06 | GitHub Pages pasa a ser el hosting permanente; se descarta Hostinger | Sin uso comercial no hay restricción de Pages ni necesidad de AdSense |
| 2026-10-06 | Apps legadas excluidas de buscadores con `meta robots noindex` | `robots.txt` no aplica en un sitio de proyecto en subcarpeta |
| 2026-10-06 | `visor.modelo` y `visor.poster` deben ser URL absolutas | Una ruta que empiece con `/` se rompe en la subcarpeta |
| 2026-10-06 | Nombre visible: *Recursos Bíblicos* | Coincide con el propósito y con el nombre del repositorio |
| 2026-10-06 | La Segunda Guerra Mundial queda oculta (`publicado: false`) | No corresponde al propósito bíblico |
| 2026-10-06 | Taxonomía bíblica implementada: testamento, época y libro reemplazan asignatura, niveles, OA y colección | Facetas que corresponden a cómo se estudia la Biblia; con un solo valor, "Sección" y "Colección" no filtraban nada |
| 2026-10-06 | Épocas alineadas con las franjas del árbol genealógico, separando la iglesia primitiva | Un solo vocabulario de épocas en el sitio y en las apps |
| 2026-10-06 | Las fichas pasan de `/religion/{slug}/` a `/{slug}/`, con páginas de redirección desde la URL antigua | Sin asignaturas, el segmento sobraba; se cambia ahora, antes de difundir enlaces |
| 2026-10-06 | Testamento y época obligatorios en todo recurso publicado | Evitar fichas que no aparezcan en ningún filtro |
| 2026-10-06 | Filtros en la columna izquierda desde arriba de la portada, junto a "Recién agregados" | Los filtros quedaban bajo los recién agregados y obligaban a bajar para usarlos |
| 2026-10-06 | Nombre del sitio más grande, en serif, con un símbolo de tamaño fijo preparado para un logo (`SITIO.logo`) | Dar presencia a la marca y poder incorporar el logo sin rediseñar la cabecera |

## 24. Relación con el repositorio Fuego y Palabra

- `crist-alarc/Fuego-y-Palabra` queda **congelado**: no se le hacen mejoras. Toda corrección a las apps bíblicas se hace aquí.
- Su sitio sigue publicado para no romper enlaces existentes.
- Cuando este sitio esté estable en `adda-santiago`, se reemplaza el contenido de ese repositorio por páginas de redirección hacia las fichas nuevas (misma técnica de §19, regla 2), y se deja un README que apunte aquí.
