"""Genera public/apps/assets/js/imperios-geo.js

Los polígonos de abajo son trazados a mano, APROXIMADOS e ILUSTRATIVOS:
las fronteras antiguas no están documentadas con precisión cartográfica.
Se dibujan con holgura hacia el mar y el script los recorta con la tierra
de Natural Earth 1:50m (dominio público), para que sigan la costa.

Uso:  pip install shapely  ·  python geo/imperios.py
Requiere ne_50m_land.geojson en geo/ (github.com/nvkelso/natural-earth-vector).
Coordenadas [latitud, longitud].
"""
import json, os
from shapely.geometry import shape, Polygon
from shapely.ops import unary_union

AQUI = os.path.dirname(os.path.abspath(__file__))
TIERRA = unary_union([shape(f['geometry']) for f in json.load(open(os.path.join(AQUI, 'ne_50m_land.geojson')))['features']
                      if shape(f['geometry']).intersects(Polygon([(-5,0),(80,0),(80,56),(-5,56)]))])

# ---------------- Polígonos fuente ----------------
P = {}
P['babilonia-nucleo'] = [[33.7,43.3],[34.1,44.6],[33.5,45.6],[32.6,46.5],[31.6,47.5],[30.3,48.4],[29.6,48.2],
    [30.2,46.8],[30.9,45.4],[31.7,44.1],[32.5,43.2],[33.2,42.8]]
_bab = [[35.7,45.3],[34.5,45.9],[33.3,46.6],[32.8,47.6],[32.7,48.6],[31.6,49.0],[30.4,48.9],[29.2,48.4],
    [29.2,46.6],[30.1,44.6],[31.2,42.6],[32.0,40.6],[31.6,38.6],[30.4,36.7],[29.5,35.6],[29.3,34.9],
    [30.6,34.3],[31.1,33.7],[31.4,33.6],[31.9,34.3],[33.0,34.6],[34.0,35.2],[35.0,35.4],[35.9,35.4],
    [36.6,35.6],[37.1,36.5],[37.3,38.0],[37.1,39.5],[37.0,41.0],[36.7,42.4],[36.2,43.2],[35.7,44.2]]
P['babilonia-570'] = _bab
# Nabonido (c. 552–543): campañas en el norte de Arabia, hasta Yatrib
_i = _bab.index([30.4,36.7])
P['babilonia-545'] = _bab[:_i] + [[30.0,38.8],[28.0,39.4],[26.0,40.1],[24.4,40.2],[24.3,39.4],[25.6,38.3],
    [27.2,37.3],[28.9,36.4]] + _bab[_i:]
P['asiria-670'] = [[37.7,36.6],[37.9,38.5],[37.8,41.0],[37.5,43.5],[37.0,45.0],[35.6,46.0],[34.2,46.4],
    [32.6,47.6],[31.0,48.6],[29.8,48.3],[30.2,46.6],[31.3,44.0],[32.6,41.6],[33.0,39.5],[32.0,37.6],
    [30.5,35.8],[29.6,35.0],[30.6,34.2],[31.1,33.6],[31.6,33.4],[33.0,34.6],[35.0,35.3],[36.8,35.3],[37.2,36.0]]
P['media-585'] = [[41.8,35.8],[41.5,38.8],[41.3,41.6],[42.3,44.8],[42.0,47.0],[41.0,49.2],[38.4,49.2],
    [37.2,50.5],[36.7,53.8],[37.6,56.5],[37.3,60.5],[33.5,61.0],[31.0,58.0],[29.0,54.5],[28.6,51.6],
    [29.6,50.3],[30.6,49.4],[31.6,49.0],[32.7,48.6],[33.3,46.6],[34.5,45.9],[35.7,45.3],[35.7,44.2],
    [36.2,43.2],[36.7,42.4],[37.0,41.0],[37.1,39.5],[37.3,38.0],[37.4,36.6],[38.4,35.6],[39.6,34.6],[40.6,34.4]]
P['lidia-560'] = [[41.3,28.6],[41.5,31.6],[41.8,35.8],[40.6,34.4],[39.6,34.6],[38.4,35.6],[37.4,36.6],
    [36.6,35.8],[36.2,33.5],[36.0,30.5],[36.4,28.5],[37.3,26.8],[38.6,26.0],[39.8,25.8],[40.6,26.4]]
P['egipto-570'] = [[31.8,29.6],[31.8,31.0],[31.5,32.4],[31.2,32.9],[30.4,32.7],[29.7,32.5],[28.6,31.4],
    [27.6,31.4],[26.4,32.8],[25.2,33.1],[24.0,33.1],[24.0,32.6],[25.2,32.4],[26.3,31.5],[27.4,30.6],
    [28.6,30.4],[29.4,30.4],[29.6,30.0],[30.4,29.6],[31.0,29.0],[31.3,28.8]]
# Persis y el oriente iraní bajo Ciro (sin Asia central más allá del mapa)
P['persia-oriente-539'] = [[37.3,60.5],[37.6,56.5],[36.7,53.8],[37.2,50.5],[38.4,49.2],[41.0,49.2],[41.6,52.5],
    [42.5,55.0],[42.8,59.0],[43.0,63.0],[42.0,68.5],[37.5,71.5],[33.0,71.5],[28.0,68.5],[24.5,67.5],[25.2,61.5],[25.6,57.4],[27.0,56.0],
    [27.8,53.0],[28.6,51.6],[29.0,54.5],[31.0,58.0],[33.5,61.0]]

def recortar(pts):
    return recortar_geom(Polygon([(lo, la) for la, lo in pts]).buffer(0))

def recortar_geom(g):
    g = g.intersection(TIERRA)
    polys = [g] if g.geom_type == 'Polygon' else [p for p in getattr(g, 'geoms', []) if p.geom_type == 'Polygon']
    polys = [p.simplify(0.03, preserve_topology=True) for p in polys if p.area > 0.02]
    return [[[round(y, 2), round(x, 2)] for x, y in p.exterior.coords] for p in polys]

G = {k: recortar(v) for k, v in P.items()}
# Persia de Ciro como un solo contorno (Media + Lidia + oriente), sin líneas internas
_u = unary_union([Polygon([(lo, la) for la, lo in P[k]]).buffer(0) for k in ('media-585', 'lidia-560', 'persia-oriente-539')]).buffer(0.05).buffer(-0.05)
P['persia-539'] = None
G['persia-539'] = recortar_geom(_u)

# ---------------- Capas: un imperio en un momento ----------------
CAPAS = {
  'babilonia-620': {'n': 'Babilonia', 'periodo': 'c. 620 a.C.', 'imp': 'babilonia', 'polys': ['babilonia-nucleo']},
  'babilonia-570': {'n': 'Imperio babilónico', 'periodo': 'c. 570 a.C., Nabucodonosor', 'imp': 'babilonia', 'polys': ['babilonia-570']},
  'babilonia-545': {'n': 'Imperio babilónico', 'periodo': 'c. 545 a.C., Nabonido', 'imp': 'babilonia', 'polys': ['babilonia-545']},
  'asiria-670':    {'n': 'Imperio asirio', 'periodo': 'c. 670 a.C.', 'imp': 'asiria', 'polys': ['asiria-670']},
  'media-585':     {'n': 'Media', 'periodo': 'c. 585 a.C. (extensión discutida)', 'imp': 'media', 'polys': ['media-585']},
  'lidia-560':     {'n': 'Lidia', 'periodo': 'c. 560 a.C.', 'imp': 'lidia', 'polys': ['lidia-560']},
  'egipto-570':    {'n': 'Egipto', 'periodo': 'c. 570 a.C., dinastía XXVI', 'imp': 'egipto', 'polys': ['egipto-570']},
  'persia-539':    {'n': 'Imperio persa', 'periodo': '539 a.C., Ciro', 'imp': 'persia',
                    'polys': ['persia-539'], 'rot': [36.4, 57.0]},
}

# ---------------- Lugares ----------------
LUGARES = {
  'babilonia': ['Babilonia', 32.536, 44.421], 'ninive': ['Nínive', 36.359, 43.153], 'asur': ['Asur', 35.456, 43.262],
  'haran': ['Harán', 36.865, 39.031], 'carquemis': ['Carquemis', 36.830, 38.012, 'left'], 'jerusalen': ['Jerusalén', 31.778, 35.235],
  'ribla': ['Ribla', 34.39, 36.55], 'hamat': ['Hamat', 35.13, 36.75], 'damasco': ['Damasco', 33.51, 36.29],
  'tiro': ['Tiro', 33.27, 35.20, 'left'], 'laquis': ['Laquis', 31.565, 34.849, 'left'], 'mizpa': ['Mizpa', 31.88, 35.22, 'top'],
  'gaza': ['Gaza', 31.50, 34.46, 'left'], 'rio-egipto': ['Río de Egipto', 31.13, 33.80, 'left'],
  'susa': ['Susa', 32.19, 48.25, 'bottom'], 'ecbatana': ['Ecbatana', 34.80, 48.52], 'pasargada': ['Pasargada', 30.20, 53.17],
  'ur': ['Ur', 30.963, 46.103], 'uruk': ['Uruk (Erec)', 31.32, 45.64], 'nipur': ['Nipur', 32.13, 45.23],
  'borsipa': ['Borsipa', 32.39, 44.34, 'left'], 'kish': ['Kish', 32.54, 44.60, 'bottom'], 'sipar': ['Sipar', 33.06, 44.25],
  'opis': ['Opis', 33.30, 44.50, 'top'], 'tema': ['Tema', 27.63, 38.55], 'menfis': ['Menfis', 29.85, 31.25],
  'tafnes': ['Tafnes', 30.86, 32.17], 'sardis': ['Sardis', 38.49, 28.04],
  'tel-abib': ['Tel-abib (aprox.)', 32.05, 45.45, 'bottom'],
}

# ---------------- Trazos (rutas aproximadas) ----------------
TRAZOS = {
  'campana-605': {'n': 'Avance babilónico a Carquemis, 605 a.C.',
    'l': [[32.54,44.42],[33.06,44.25],[33.64,42.83],[34.55,40.89],[35.95,39.03],[36.83,38.01]]},
  'deportacion': {'n': 'Camino de los deportados de Judá',
    'l': [[31.78,35.23],[33.02,35.57],[34.39,36.55],[35.13,36.75],[36.2,37.15],[35.99,38.11],[35.95,39.03],
          [34.55,40.89],[33.64,42.83],[33.06,44.25],[32.54,44.42]]},
  'caida-539': {'n': 'Avance de Ciro, 539 a.C.',
    'l': [[34.80,48.52],[34.35,47.10],[34.0,45.6],[33.30,44.50],[33.06,44.25],[32.54,44.42]]},
}

# ---------------- Rótulos de regiones, mares y ríos ----------------
ROTULOS = [
  ['Mar Grande', 34.2, 31.0, 'mar'], ['Golfo Pérsico', 27.4, 51.2, 'mar'], ['Mar Rojo', 22.0, 37.6, 'mar'],
  ['Mar Caspio', 41.0, 51.0, 'mar'], ['Éufrates', 34.9, 40.3, 'rio'], ['Tigris', 35.0, 43.75, 'rio'],
  ['Nilo', 26.9, 31.5, 'rio'], ['Jordán', 32.35, 35.75, 'rio'],
  ['Arabia', 26.5, 43.0, 'region'], ['Elam', 31.6, 49.4, 'region'],
  ['Persis', 29.7, 53.6, 'region'], ['Judá', 31.4, 35.0, 'region'], ['Fenicia', 34.0, 35.75, 'region'],
]

out = {'polys': G, 'capas': CAPAS, 'lugares': LUGARES, 'trazos': TRAZOS, 'rotulos': ROTULOS}
JS = '''/* ==========================================================
   imperios-geo.js — Geografía compartida de los imperios bíblicos
   Lo usan los recursos de cada imperio, el integrador, el exilio y Daniel.
   *** Fronteras APROXIMADAS e ILUSTRATIVAS, con fines educativos. ***
   Generado por geo/imperios.py (polígonos a mano recortados con la tierra
   de Natural Earth, dominio público). No editar a mano: editar el script.
   polys: geometrías · capas: imperio en un momento (usa polys; rot fija el rótulo si el centro no sirve)
   lugares: id → [nombre, lat, lng, lado de la etiqueta (opcional)] · trazos: rutas aproximadas
   rotulos: [texto, lat, lng, clase]
   ========================================================== */
window.IMPERIOS_GEO = ''' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n'
open(os.path.join(AQUI, '..', 'public', 'apps', 'assets', 'js', 'imperios-geo.js'), 'w').write(JS)
print({k: [len(p) for p in v] for k, v in G.items()}, len(JS))
