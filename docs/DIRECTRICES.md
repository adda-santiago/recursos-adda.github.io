# Directrices del proyecto — Aula Visual (nombre provisional)

Versión 1.5 · 1 de octubre de 2026

Este documento es la fuente de verdad del proyecto. Cualquier decisión nueva que contradiga algo de aquí se registra en la bitácora (§23) y se actualiza la sección correspondiente. Si el código y este documento no coinciden, se corrige uno de los dos; no se deja la diferencia.

---

## 1. Propósito y alcance

Biblioteca de modelos 3D, mapas y líneas de tiempo interactivas para el ecosistema escolar, empezando por los recursos bíblicos existentes y ampliándose a ciencias, historia, tecnología y otras asignaturas.

Queda dentro del alcance: recursos visuales interactivos con su ficha escrita, búsqueda, exploración por asignatura y nivel, pantalla completa para proyectar, compartir e insertar en plataformas de clases.

**Antecedente.** El proyecto nace de Fuego y Palabra (`crist-alarc/Fuego-y-Palabra`), un sitio de recursos bíblicos. Esa línea de trabajo continúa aquí como la colección *Fuego y Palabra* dentro de la asignatura Religión (§4, §24). Este repositorio es la fuente oficial de todas sus apps.

Queda fuera, por ahora: cuentas de usuario, evaluaciones calificadas, foros o comentarios públicos, contenido generado por usuarios.

## 2. Público y casos de uso

| Usuario | Situación | Qué necesita |
|---|---|---|
| Profesor en sala | Proyecta en pizarra o televisor, a veces con internet débil | Abrir rápido, pantalla completa, restaurar vista, nada que distraiga |
| Profesor planificando | Busca material por tema, curso u objetivo de aprendizaje | Búsqueda por concepto, filtros por nivel, ficha con fuentes, código para insertar |
| Alumno | Estudia desde el celular | Carga liviana, gestos táctiles, sin registro |
| Plataforma de terceros | Classroom, Moodle, Canvas, blogs escolares | Visor insertable (`/embed/`), sin anuncios |

## 3. Principios de producto

1. **Contenido sobre adornos.** La interfaz existe para mostrar el recurso; todo control debe justificar su lugar.
2. **El aula primero.** Si una decisión mejora algo en escritorio pero empeora la proyección en sala, gana la sala.
3. **Rigor visible.** Cada recurso declara sus fuentes, su licencia y su estado de revisión. Donde hay reconstrucción o supuestos, la ficha lo dice.
4. **Los alumnos nunca necesitan cuenta.** Ninguna función básica queda detrás de un registro.
5. **El visor es territorio libre de anuncios.** Sin excepciones (§10).
6. **Estructura normalizada desde el inicio.** Todo recurso nuevo nace con el esquema y el contrato de visor; no se refactoriza después.
7. **Demanda antes que oferta.** El backlog de recursos se prioriza con las búsquedas sin resultado y las solicitudes del buzón, no por intuición.

## 4. Marca e identidad visual

**Decidido:** la plataforma tiene marca propia y neutra. Fuego y Palabra es una colección dentro de ella (campo `coleccion`, §8).

**Pendiente (§22):** el nombre definitivo. El provisional es *Aula Visual*, con la organización de GitHub `aula-visual`. El nombre visible vive solo en `src/config/sitio.ts` (`SITIO.nombre` y `SITIO.emoji` para el favicon); no se escribe en ningún otro lugar.

**Cuidado con el nombre de la organización:** define la URL del sitio (`aula-visual.github.io`) mientras no haya dominio propio. Renombrar la organización después rompe los enlaces compartidos. Por eso el nombre definitivo, o el dominio propio, debe estar resuelto **antes** de invitar profesores al piloto.

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
| Hosting piloto | GitHub Pages, organización `aula-visual`, repositorio `aula-visual.github.io` | Gratis, despliegue automático, sitio en la raíz sin subcarpeta |
| Hosting producción | Hostinger (u otro estático) + almacenamiento de objetos para `.glb` | Dominio propio, sin zona gris comercial, sin límites de Pages |
| CI/CD | GitHub Actions (`.github/workflows/publicar.yml`) | El mismo build sirve para ambos destinos |

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
│  │  ├─ adn/ motor-combustion/
│  └─ robots.txt
├─ src/
│  ├─ config/sitio.ts        nombre, buzón, anuncios, analítica
│  ├─ data/taxonomia.ts      vocabulario controlado (§9)
│  ├─ content.config.ts      esquema obligatorio de recurso (§8)
│  ├─ content/recursos/*.md  un archivo por recurso = ficha + metadatos
│  ├─ lib/                   url, storage, cuenta, anuncios, analitica
│  ├─ components/            Visor, Compartir, EspacioAnuncio, ItemRecurso
│  ├─ layouts/Base.astro
│  ├─ pages/                 portada, explorar, [asignatura]/[slug], embed/[slug], buzón, privacidad, 404
│  └─ styles/                tokens.css, global.css
└─ .github/workflows/publicar.yml
```

### Rutas públicas

| Ruta | Contenido | Indexable |
|---|---|---|
| `/?q=&seccion=&coleccion=&tipo=&nivel=&tag=&guardados=1` | Portada = catálogo completo: recién agregados, filtros y búsqueda. Valores múltiples separados por coma | Sí |
| `/explorar/` | Redirección a la portada (conserva los parámetros; `asignatura` pasa a `seccion`) | No |
| `/{asignatura}/{slug}/` | Ficha: visor + artículo + fuentes | Sí (única página indexada por Pagefind) |
| `/embed/{slug}/` | Visor limpio para insertar | No (`noindex`, canonical a la ficha) |
| `/apps/{app}/` | App legada cruda | No (`robots.txt`) |
| `/buzon/`, `/privacidad/` | Páginas de servicio | Sí |

Reglas de rutas:

- **Nunca escribir rutas absolutas a mano.** Todo pasa por `ruta()`, `rutaRecurso()` y `rutaEmbed()` de `src/lib/url.ts`. Así el mismo código funciona en la subcarpeta de GitHub Pages y en la raíz de un dominio.
- El `slug` es el nombre del archivo Markdown. Puede cambiar, pero si cambia se agrega una redirección estática en `public/{ruta-antigua}/index.html`. GitHub Pages no permite redirecciones 301.
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
| Guardar | Marca el recurso en este dispositivo (futuro: en la cuenta) | `almacen.alternarFavorito(uid)` |
| Compartir | Enlace, WhatsApp, Google Classroom, Microsoft Teams, compartir nativo en móvil, código de inserción | `Compartir.astro` |
| Pantalla de carga | Texto que dice qué se está cargando; nunca queda pegada (tope de 15 s) | Se oculta con `load` o con el mensaje `fyp:lista` |

El "modo pizarra" de la especificación original **es** la pantalla completa: no se agrega un segundo botón para lo mismo.

### Protocolo `visor-bridge.js` (apps legadas en iframe)

- Mensajes aceptados: `{ tipo: 'fyp:restaurar' }`, solo desde el mismo origen.
- Mensajes emitidos: `{ tipo: 'fyp:lista' }` al terminar de cargar.
- Cada app legada declara `window.fypReset = () => {...}`. Si no lo hace, el puente intenta `#t-home` o `#zoom-reset`; si no hay nada, recarga la app.
- Dentro del iframe, el puente agrega la clase `en-visor` a `<html>` y oculta la marca interna de la app.
- Mensajes nuevos se agregan aquí antes de implementarse (candidatos: `fyp:ir-a` para abrir un hotspot o paso de recorrido desde la URL).

## 7. Motores y convenciones 3D

### Elección de motor

| Motor | Cuándo usarlo | Estado |
|---|---|---|
| `legado` | Apps que corren como página propia en `public/apps/` | En uso: atlas, línea de reyes, genealogías, tabernáculo, templo de Salomón, ADN, motor de combustión |
| `model-viewer` | Un solo `.glb` con hotspots (la mayoría de ciencias: célula, órgano, motor) | Implementado en el visor, **sin probar aún con un modelo real** |
| `three` | Escenas compuestas, recorridos narrativos, comparaciones, modelos procedurales | Reservado. El build falla a propósito si un recurso lo declara antes de implementarlo |

Las apps legadas no se reescriben por reescribir. Se migran a `three` nativo solo cuando necesitan algo que el iframe impide (por ejemplo, hotspots controlados desde la ficha).

### Convenciones de escena

- Escenas históricas y bíblicas: **1 unidad = 1 codo (≈ 45 cm)**. Ejes: **+x oriente, −z norte, +y arriba**.
- Escenas de ciencias y tecnología: **1 unidad = 1 metro** salvo que se declare otra en `visor.escala` (una célula no se modela en metros; se declara la escala real y la del modelo).
- Toda escena declara su escala en el campo `visor.escala` de la ficha.
- Three.js: las apps legadas usan r128. Todo desarrollo nuevo en `three` usa una versión actual vía ES modules; no se agregan funciones nuevas sobre r128.

### Presupuesto de rendimiento (criterio propio, a validar con el piloto)

| Métrica | Objetivo |
|---|---|
| Peso de un `.glb` en carga inicial | ≤ 5 MB con Draco (geometría) y KTX2 (texturas) |
| Texturas | ≤ 2048 px por lado; 1024 px por defecto |
| Primera interacción en celular gama media con 4G | Póster visible de inmediato; modelo interactivo en pocos segundos |
| Carga del 3D | Diferida: póster primero, modelo al interactuar o al entrar en pantalla |

Estos valores son una estimación inicial, no un benchmark publicado. Se ajustan con mediciones reales del piloto.

## 8. Modelo de contenido

Cada recurso es un archivo `src/content/recursos/{slug}.md`. El esquema está en `src/content.config.ts` y **el build falla si un recurso no lo cumple**.

| Campo | Obligatorio | Regla |
|---|---|---|
| `uid` | Sí | Minúsculas, números y guiones. **Inmutable.** Favoritos, colecciones y cuentas futuras lo referencian |
| `titulo` | Sí | Como lo buscaría un profesor ("Célula eucariota animal", no "Modelo 3D #12") |
| `resumen` | Sí | ≤ 180 caracteres. Se usa en búsqueda, listas y meta descripción |
| `emoji` | No | Un emoji representativo |
| `asignatura` | Sí | Valor de `ASIGNATURAS` (§9) |
| `niveles` | No | Valores de `NIVELES`. Vacío = uso general |
| `oa` | No | Códigos de Objetivos de Aprendizaje **verificados** en curriculumnacional.cl. Nunca se infieren |
| `tipo` | Sí | Valor de `TIPOS` |
| `tags` | No | Minúsculas con guiones, sin `#` |
| `coleccion` | No | Valor de `COLECCIONES` (§9). Agrupación editorial con identidad propia |
| `visor.motor` | Sí | `legado`, `model-viewer` o `three` |
| `visor.ruta` / `visor.modelo` / `visor.poster` | Según motor | Carpeta en `public/apps/` o URL del `.glb` y su póster |
| `visor.escala` | Recomendado | Obligatorio para todo 3D nuevo |
| `hotspots` | No | `id`, `titulo`, `texto`, `posicion [x,y,z]` |
| `licencia.contenido` | Sí | Licencia del texto y la app |
| `licencia.modelo`, `licencia.atribucion` | Si el modelo es de terceros | Texto exacto que exige la licencia |
| `fuentes` | Sí (≥ 1) | Citas bíblicas, bibliografía o repositorio de origen |
| `revision.estado` | Sí | `borrador` o `revisado` |
| `revision.revisor`, `revision.fecha` | Al pasar a `revisado` | Quién revisó y cuándo |
| `fechaPublicacion` | Sí | Fecha en que el recurso se publica en la plataforma (`AAAA-MM-DD`). Ordena "Recién agregados" |
| `orden` | No | Orden editorial en el catálogo |
| `publicado` | No | `false` oculta el recurso sin borrarlo |

## 9. Taxonomía

Vocabulario controlado en `src/data/taxonomia.ts`. Agregar un valor es una decisión editorial: se registra en la bitácora.

- **Asignaturas:** ciencias naturales, biología, física, química, historia, religión, tecnología, matemática, artes visuales.
- **Niveles:** 1° a 8° básico y 1° a 4° medio, según las Bases Curriculares. Ojo: 3° y 4° medio tienen plan común y electivos; si un recurso apunta a un electivo, se indica en el `oa`.
- **Tipos:** modelo 3D, mapa, línea de tiempo, árbol genealógico, interactivo.
- **OA:** es el diferenciador para profesores chilenos, que planifican por objetivo. Cada código se copia desde la fuente oficial; si no se ha verificado, el campo queda vacío.
- **Colecciones:** agrupaciones editoriales con identidad propia dentro de una asignatura. Hoy existe una: `fuego-y-palabra` (recursos bíblicos). Una colección no reemplaza a la asignatura; la complementa.
- **Tags:** complemento libre, en minúsculas con guiones. Antes de crear uno nuevo, revisar si ya existe una variante (`antiguo-testamento`, no `at` ni `antiguotestamento`).

Los recursos bíblicos están en la asignatura `religion` y la colección `fuego-y-palabra`, con tags de historia cuando corresponde.

## 10. Monetización

### Anuncios (Google AdSense)

Reglas duras:

1. **Nunca dentro, encima ni al costado inmediato del visor.** El componente `Visor` no admite anuncios.
2. **Nunca en `/embed/`.** Los profesores no insertan en Classroom algo con publicidad, y los anuncios en iframes de terceros tienen problemas de política.
3. Solo en `EspacioAnuncio` con ubicaciones declaradas: `ficha-final`, `ficha-lateral`, `explorar-final`. Nuevas ubicaciones se agregan aquí primero.
4. Se activan con `SITIO.anuncios.habilitados = true` **solo en producción** con dominio propio. AdSense exige un dominio verificable propio; un subdominio `github.io` no califica.
5. Antes de activarlos: banner de consentimiento certificado por Google (CMP) y política de privacidad actualizada.
6. Sitio con público escolar: evaluar la marcación como contenido dirigido a menores, que implica anuncios no personalizados y menor rendimiento. **No hay cifras de CPM confiables para educación en Latinoamérica en este documento**; se medirán con datos propios.
7. AdSense rechaza sitios con poco contenido original: las fichas escritas (§15) son requisito de aprobación, no un adorno.

### Plan sin anuncios (futuro)

Segunda vía de ingreso: cuentas de profesor (o de colegio) que pagan por no ver anuncios y, eventualmente, por funciones adicionales.

- Los componentes preguntan por **capacidades**, no por planes: `estadoCuenta().sinAnuncios`, no `plan === 'premium'`. Así se pueden crear planes nuevos sin tocar componentes.
- `iniciarAnuncios()` consulta la cuenta antes de cargar el script de AdSense: con plan sin anuncios, el script ni siquiera se descarga.
- Opción a evaluar cuando llegue el momento: licencia por colegio (un pago cubre a todos sus profesores) frente a suscripción individual.

## 11. Usuarios (preparación para cuentas futuras)

Hoy no hay login. El código está preparado para agregarlo sin rehacer nada:

| Pieza | Hoy | Con cuentas |
|---|---|---|
| `src/lib/storage.ts` (`almacen`) | `localStorage` con prefijo `fyp:v1:` | Implementación remota con la misma interfaz. `exportar()` sube lo guardado localmente en el primer login |
| `src/lib/cuenta.ts` (`estadoCuenta`) | Siempre anónimo, sin plan | Consulta al backend |
| Identificadores | `uid` inmutable por recurso | Las colecciones y favoritos guardan `uid`, nunca títulos ni rutas |
| Estado en URL | Vista, filtros, búsqueda | "Clases preparadas" = listas de URLs con estado |

Reglas:

- **Solo los profesores tendrán cuenta.** Los alumnos usan todo sin registrarse. Esto reduce la carga regulatoria sobre datos de menores y la fricción en el aula.
- Ningún componente usa `localStorage` directamente; todo pasa por `almacen`.
- El backend será un servicio administrado (Supabase, Firebase o similar) consumido desde el navegador. No se agrega un servidor propio, para que el sitio siga funcionando en hosting estático compartido.
- No se construye nada de cuentas hasta que la analítica o el piloto lo justifiquen.

## 12. Analítica

Anónima, sin cookies de seguimiento ni datos personales. Proveedor sugerido: GoatCounter (se activa con `SITIO.analitica.goatcounter`). Eventos definidos en `src/lib/analitica.ts`:

| Evento | Para qué sirve |
|---|---|
| `abrir-recurso` | Uso por recurso |
| `pantalla-completa` | Proxy de uso en sala |
| `restaurar-vista` | Si es muy alto, la navegación del modelo confunde |
| `compartir`, `copiar-embed` | Canales de difusión |
| `busqueda` | Qué se busca |
| `busqueda-sin-resultados` | **Backlog de recursos nuevos** |
| `filtrar` | Qué facetas usan los profesores (`faceta/valor`) |
| `guardar-favorito` | Señal para justificar cuentas |

No se agregan eventos sin documentarlos en esta tabla.

## 13. Privacidad y cumplimiento

- Piloto: no se recolectan datos personales. El buzón pide correo opcional y advierte no escribir datos de alumnos.
- La Ley 21.719 de protección de datos personales entra en vigencia en Chile a fines de 2026 (**verificar la fecha exacta antes de activar cuentas o anuncios**). Aplica de lleno cuando existan cuentas y anuncios.
- Antes de activar anuncios: CMP certificado y política de privacidad actualizada (`/privacidad/`).
- Antes de activar cuentas: base legal del tratamiento, política de retención y borrado de cuenta.
- El proyecto no usa infraestructura corporativa de terceros (por ejemplo, el tenant de Microsoft de un empleador) para formularios, automatizaciones ni datos.

## 14. Portada y búsqueda

La portada es el catálogo completo, a ancho de pantalla:

| Zona | Comportamiento |
|---|---|
| Cabecera fija | Marca, buscador arriba a la izquierda (presente en todas las páginas; desde otra página envía a `/?q=`) y Sugerencias |
| Recién agregados | Los 4 recursos con `fechaPublicacion` más reciente. Se oculta mientras hay búsqueda o filtros activos, para que los resultados queden arriba. En celular, carrusel horizontal |
| Panel de filtros | Sección, colección, tipo, nivel y etiquetas (las 8 más usadas visibles, el resto tras "Ver más"); "Solo mis guardados" si el visitante guardó algo. Fijo al hacer scroll en escritorio; plegable en celular. Cada opción muestra cuántos recursos quedarían |
| Catálogo | Rejilla de tarjetas (imagen o emoji, tipo, sección, título, resumen). En celular, tarjetas horizontales compactas |

Reglas de filtrado: **O** dentro de una misma faceta, **Y** entre facetas distintas. La búsqueda y los filtros se combinan. Con búsqueda, el orden es por relevancia; sin ella, por `orden`. Todo el estado vive en la URL, así que una vista filtrada se puede compartir.

Las tarjetas se generan en el HTML (SEO y uso sin JavaScript); el navegador solo las oculta o reordena. Cuando el catálogo supere unos pocos cientos de recursos, se evalúa paginar o cargar por bloques.


- Pagefind indexa solo el `<article data-pagefind-body>` de cada ficha. Filtros: asignatura, tipo, nivel.
- La portada filtra los resultados de Pagefind para exigir que cada término aparezca por su raíz en el texto: evita falsos positivos por coincidencias parciales.
- En `npm run dev` (sin índice) se usa una búsqueda local sobre el catálogo, insensible a tildes.
- Búsqueda sin resultados: mensaje con enlace al buzón con la consulta precargada, y evento de analítica.
- Sinónimos (ADN/DNA, célula/celula): a medida que aparezcan en las búsquedas sin resultado, se agregan como texto de la ficha o como tags.

## 15. SEO y ficha técnica

Cada ficha tiene un artículo propio. Estructura recomendada de secciones H2:

1. **Qué muestra** (el modelo, mapa o línea de tiempo)
2. **Las partes / el contenido** (H3 por parte o sección)
3. **Cómo usarlo en clases** (botones, sugerencias de uso)
4. **Qué es reconstrucción / limitaciones** (supuestos, fechas aproximadas, debates)

Además, cada ficha incluye automáticamente: JSON-LD `LearningResource`, canonical, Open Graph, fuentes, licencia, estado de revisión y enlace para reportar errores.

Reglas: el artículo explica lo que se ve; no repite el resumen ni rellena para alcanzar un largo. Las citas bíblicas usan Reina-Valera 1909 (dominio público) salvo decisión en contrario (§22).

## 16. Compartir e insertar

- Opciones: copiar enlace, WhatsApp, Google Classroom, Microsoft Teams y compartir nativo del sistema en móvil.
- Código de inserción: `<iframe src="/embed/{slug}/" … allow="fullscreen" allowfullscreen loading="lazy">`. El embed conserva pantalla completa, restaurar vista y compartir, y enlaza a la ficha completa.
- Los enlaces compartidos son permanentes: por eso el dominio se compra antes del piloto (§19) y todo cambio de ruta lleva redirección.

## 17. Buzón de retroalimentación

- Formulario externo (Tally o Google Forms), configurado en `SITIO.buzonUrl`.
- La página `/buzon/` traspasa `?recurso={uid}` y `?q={búsqueda}` al formulario para que llegue precargado.
- Categorías sugeridas para el formulario: sugerir recurso nuevo, reportar error de contenido, problema técnico, cómo lo uso en clases.
- Prioridad de atención: errores de contenido primero.

## 18. Licencias, fuentes y rigor

- Todo recurso declara `fuentes` y `licencia`. Sin ellas, no compila.
- Modelos de terceros: solo con licencia explícita que permita el uso (CC0, CC-BY o dominio público). Repositorios candidatos: Smithsonian 3D (gran parte CC0), NASA 3D Resources, Sketchfab filtrado por licencia CC. Se revisa la licencia de cada modelo individualmente y se copia la atribución exacta.
- Antes de construir un modelo nuevo se evalúa la certeza de la evidencia (textual, arqueológica o científica) junto con su complejidad. Lo incierto se muestra como tal en la ficha.
- Revisión: todo recurso nace como `borrador`. Pasa a `revisado` cuando alguien distinto del autor lo revisa; para ciencias, idealmente un profesor de la asignatura.

## 19. Hosting, despliegue y migración

| Etapa | Destino | Configuración (`.github/workflows/publicar.yml`) |
|---|---|---|
| Piloto | GitHub Pages, repo `aula-visual/aula-visual.github.io` | `SITE_URL=https://aula-visual.github.io`, `BASE_PATH=/` |
| Piloto con dominio | GitHub Pages + dominio propio | `SITE_URL=https://tudominio.cl`, `BASE_PATH=/`, dominio en Settings → Pages |
| Producción | Hostinger + almacenamiento de objetos para `.glb` | Igual que con dominio; se activa el job de FTP/SSH |

Reglas:

1. **Resolver nombre definitivo o dominio propio antes de invitar profesores al piloto.** Con dominio, pasar a Hostinger es solo un cambio de DNS y ningún enlace compartido se rompe.
2. GitHub Pages no permite redirecciones 301: todo cambio de ruta lleva una página de redirección estática.
3. Límites publicados de Pages (1 GB de sitio y 100 GB/mes de transferencia, límites blandos) y su política contra uso comercial: los anuncios solo se activan fuera de Pages.
4. Los `.glb` pesados no se guardan en Git: van a almacenamiento de objetos con CDN y se referencian por URL.
5. `robots.txt` funciona porque el sitio está en la raíz del dominio.
6. En el plan gratuito, Pages exige repositorio público.
7. Sin computador propio, todo se edita desde el navegador (github.com o github.dev, tecla `.` en el repositorio). La validación la hace GitHub Actions: si un recurso no cumple el esquema, el flujo falla y el sitio publicado no cambia.
8. **Carga masiva por ZIP.** Subir por la web pierde la estructura de carpetas. Para cargar o actualizar muchos archivos, se sube un `.zip` a la raíz del repositorio: el flujo `desempaquetar.yml` lo descomprime conservando las carpetas, lo borra, confirma los cambios y lanza `publicar.yml`. Los ZIP no pueden modificar `.github/` (GitHub no permite que un flujo edite flujos): los archivos de `.github/workflows/` se crean o editan a mano desde la web.

## 20. Flujos de trabajo

### Agregar un recurso nuevo

1. Revisar el buzón y las búsquedas sin resultado para confirmar la demanda.
2. Evaluar certeza de la evidencia y complejidad (§18). Elegir motor (§7).
3. Conseguir o construir el modelo. Verificar licencia. Comprimir (Draco, KTX2) y generar póster.
4. Crear `src/content/recursos/{slug}.md` con todos los campos obligatorios y `revision.estado: borrador`.
5. Escribir la ficha con la estructura de §15.
6. `npm run build` sin errores. Probar en escritorio, celular (táctil) y proyección (pantalla completa, restaurar vista).
7. Probar el embed dentro de una página externa.
8. Pedir revisión y pasar a `revisado` con revisor y fecha.

### Incorporar una app existente (por ejemplo, de Fuego y Palabra)

1. Copiar la carpeta a `public/apps/{slug}/` (nombre sin espacios ni tildes).
2. Cambiar el enlace de marca a `../../` y agregar `<script src="../visor-bridge.js"></script>` antes de `</body>`.
3. Declarar `window.fypReset` con la vista inicial.
4. Crear la ficha en `src/content/recursos/` con `visor.motor: legado`, `visor.ruta: {slug}` y, si corresponde, `coleccion`.

### Ruta de aprendizaje (obligatoria en todo modelo 3D)

**Todo modelo 3D nuevo incluye una ruta de aprendizaje.** Un modelo sin ruta no se publica. Siguen el patrón del tabernáculo, del ADN y del motor de combustión: panel lateral con dos pestañas (estaciones y procesos), ficha flotante con título, filas de datos, explicación y navegación Anterior/Siguiente, y cámara que viaja a cada estación. Reglas:

- El contenido va en `data.js`, separado del motor (`app.js`), para que un profesor pueda revisar o corregir textos sin tocar el 3D.
- Cada estación de una ruta escolar cierra con una pregunta **Para pensar**, sin la respuesta escrita en la misma ficha.
- La ruta va de lo simple a lo complejo: piezas, ensamblaje, escala y contexto histórico.
- Las piezas que se muestran separadas de la escena principal usan materiales propios, para no atenuarse cuando se resalta una categoría.
- Lo que el modelo simplifica se declara en la sección «Qué es simplificación» de la ficha.
- Si el modelo representa un proceso que avanza en el tiempo (un ciclo, una reacción), la escena muestra un indicador de estado con lo que está pasando en ese momento, y cada paso de Procesos repite solo su tramo. Referencia: el indicador del ciclo del motor de combustión.
- Las estaciones pueden mostrar grupos auxiliares (nombres, medidas) y fijar un tramo de animación; los botones de la escena permiten activarlos también a mano.

### Pendiente de migración

- **Templo de Herodes** (`herodes/`): no estaba en el repositorio de Fuego y Palabra. Incorporarlo aquí con el procedimiento anterior.
- Revisar la respuesta en celular de las apps legadas con barra lateral fija: dentro del visor en pantallas angostas quedan apretadas. Solución de fondo: panel lateral colapsable por defecto bajo cierto ancho.

## 21. Roadmap

| Fase | Alcance | Criterio de salida |
|---|---|---|
| 0. Decisiones | Marca, dominio, esquema de taxonomía | Dominio apuntando al sitio, marca decidida |
| 1. Plataforma mínima | Astro, visor con contrato, Pagefind, apps bíblicas incorporadas, compartir, embed, buzón | **Hecho en v1.1**, salvo Herodes y buzón sin URL |
| 2. Contenido piloto | 10–15 recursos de ciencias con `model-viewer` y hotspots, elegidos por OA de alto uso | Probado por 2–3 profesores reales en sala |
| 3. Crecimiento | Analítica activa, PWA con modo sin conexión ("preparar para clase"), SEO de fichas | Tráfico orgánico medible |
| 4. Monetización | Hostinger, CMP, AdSense en espacios definidos | AdSense aprobado |
| 5. Cuentas | Profesores con favoritos y colecciones sincronizados; plan sin anuncios | Demanda demostrada por `guardar-favorito` y el piloto |

## 22. Decisiones abiertas

| Decisión | Opciones | Estado |
|---|---|---|
| Nombre definitivo de la plataforma | Provisional: Aula Visual (`aula-visual`) | Pendiente; resolver antes del piloto |
| Dominio | Por definir | Pendiente |
| Traducción bíblica para citas | Reina-Valera 1909 (dominio público) / otra con permiso | RV 1909 por defecto |
| Proveedor del buzón | Tally / Google Forms | Pendiente |
| Almacenamiento de `.glb` | Cloudflare R2 / Hostinger / otro | Pendiente hasta el primer modelo pesado |
| Modelo de plan sin anuncios | Individual / por colegio | Pendiente hasta fase 5 |

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
| 2026-10-01 | La ruta de aprendizaje pasa a ser obligatoria en todo modelo 3D nuevo | Consistencia didáctica entre asignaturas; el profesor encuentra siempre la misma estructura |
| 2026-10-01 | Motor de combustión interna (Tecnología): corte, ciclo Otto animado con indicador de estado y comparación con el diésel | Primer recurso de Tecnología; valida el patrón de ruta en un mecanismo que se mueve, no solo en un objeto estático |
| 2026-10-01 | El motor de combustión pasa a cuatro cilindros en línea (orden 1-3-4-2) con corte en escalón e indicador del tiempo de cada cilindro | Mostrar cómo se reparten las explosiones y por qué un motor de varios cilindros gira más parejo; es el motor que los alumnos conocen |

## 24. Relación con el repositorio Fuego y Palabra

- `crist-alarc/Fuego-y-Palabra` queda **congelado**: no se le hacen mejoras. Toda corrección a las apps bíblicas se hace aquí.
- Su sitio sigue publicado para no romper enlaces existentes.
- Cuando esta plataforma esté estable, se reemplaza el contenido de ese repositorio por páginas de redirección hacia las fichas nuevas (misma técnica de §19, regla 2), y se deja un README que apunte aquí.
