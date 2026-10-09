"""Genera el texto bíblico del sitio: public/biblia/

Un archivo por capítulo y versión: public/biblia/{version}/{libro}/{capitulo}.json
(arreglo de versículos; índice 0 = versículo 1), más:
  public/biblia/versiones.json  metadatos y créditos de cada versión
  public/biblia/indice.json     versículos por capítulo de cada versión (para validar citas)

Fuentes (descargarlas en herramientas/biblia/fuentes/ antes de ejecutar):
  rv1960  josevladimir/bible-json (carpeta procesados/). Texto con derechos de las SBU:
          se usa con su autorización (en trámite, octubre de 2026).
  rv1909  palabra-de-dios/Reina-Valera-1909 (USFM, CC0; texto de dominio público)
  rv1865  palabra-de-dios/Reina-Valera-1865 (USFM, CC0; texto de dominio público)
  oso1569 palabra-de-dios/Biblia-del-Oso-1569 (USFM, CC0; texto de dominio público)

Uso: python herramientas/biblia/generar.py
"""
import ast, json, os, re, sys, glob

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, '..', '..'))
FUENTES = os.path.join(AQUI, 'fuentes')
SALIDA = os.path.join(RAIZ, 'public', 'biblia')

# id del sitio (citas.js), código USFM, archivo de josevladimir, nombre
LIBROS = [
 ('gn','GEN','genesis','Génesis'),('ex','EXO','exodo','Éxodo'),('lv','LEV','levitico','Levítico'),('nm','NUM','numeros','Números'),
 ('dt','DEU','deuteronomio','Deuteronomio'),('jos','JOS','josue','Josué'),('jue','JDG','jueces','Jueces'),('rt','RUT','rut','Rut'),
 ('1s','1SA','1_samuel','1 Samuel'),('2s','2SA','2_samuel','2 Samuel'),('1r','1KI','1_reyes','1 Reyes'),('2r','2KI','2_reyes','2 Reyes'),
 ('1cr','1CH','1_cronicas','1 Crónicas'),('2cr','2CH','2_cronicas','2 Crónicas'),('esd','EZR','esdras','Esdras'),('neh','NEH','nehemias','Nehemías'),
 ('est','EST','ester','Ester'),('job','JOB','job','Job'),('sal','PSA','salmos','Salmos'),('pr','PRO','proverbios','Proverbios'),
 ('ec','ECC','eclesiastes','Eclesiastés'),('cnt','SNG','cantares','Cantares'),('is','ISA','isaias','Isaías'),('jer','JER','jeremias','Jeremías'),
 ('lm','LAM','lamentaciones','Lamentaciones'),('ez','EZK','ezequiel','Ezequiel'),('dn','DAN','daniel','Daniel'),('os','HOS','oseas','Oseas'),
 ('jl','JOL','joel','Joel'),('am','AMO','amos','Amós'),('abd','OBA','abdias','Abdías'),('jon','JON','jonas','Jonás'),
 ('mi','MIC','miqueas','Miqueas'),('nah','NAM','nahum','Nahúm'),('hab','HAB','habacuc','Habacuc'),('sof','ZEP','sofonias','Sofonías'),
 ('hag','HAG','hageo','Hageo'),('zac','ZEC','zacarias','Zacarías'),('mal','MAL','malaquias','Malaquías'),
 ('mt','MAT','mateo','Mateo'),('mr','MRK','marcos','Marcos'),('lc','LUK','lucas','Lucas'),('jn','JHN','juan','Juan'),
 ('hch','ACT','hechos','Hechos'),('ro','ROM','romanos','Romanos'),('1co','1CO','1_corintios','1 Corintios'),('2co','2CO','2_corintios','2 Corintios'),
 ('ga','GAL','galatas','Gálatas'),('ef','EPH','efesios','Efesios'),('fil','PHP','filipenses','Filipenses'),('col','COL','colosenses','Colosenses'),
 ('1ts','1TH','1_tesalonicenses','1 Tesalonicenses'),('2ts','2TH','2_tesalonicenses','2 Tesalonicenses'),('1ti','1TI','1_timoteo','1 Timoteo'),
 ('2ti','2TI','2_timoteo','2 Timoteo'),('tit','TIT','tito','Tito'),('flm','PHM','filemon','Filemón'),('he','HEB','hebreos','Hebreos'),
 ('stg','JAS','santiago','Santiago'),('1p','1PE','1_pedro','1 Pedro'),('2p','2PE','2_pedro','2 Pedro'),('1jn','1JN','1_juan','1 Juan'),
 ('2jn','2JN','2_juan','2 Juan'),('3jn','3JN','3_juan','3 Juan'),('jud','JUD','judas','Judas'),('ap','REV','apocalipsis','Apocalipsis'),
]

VERSIONES = [
 {'id': 'rv1960', 'nombre': 'Reina-Valera 1960', 'abrev': 'RV 1960', 'defecto': True,
  'credito': 'Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso.',
  'fuente': ('json', 'bible-json-master/procesados')},
 {'id': 'rv1909', 'nombre': 'Reina-Valera 1909', 'abrev': 'RV 1909', 'credito': 'Reina-Valera 1909. Dominio público.',
  'fuente': ('usfm', 'Reina-Valera-1909-main')},
 {'id': 'rv1865', 'nombre': 'Reina-Valera 1865', 'abrev': 'RV 1865', 'credito': 'Reina-Valera 1865. Dominio público.',
  'fuente': ('usfm', 'Reina-Valera-1865-main')},
# Biblia del Oso 1569: descartada por ahora. La fuente trae Daniel y Ester en su forma griega (con las adiciones),
# numera los Salmos de otra manera (61 capítulos distintos) y faltan unos 460 versículos respecto de la RV 1960.
# {'id': 'oso1569', 'nombre': 'Biblia del Oso 1569', 'abrev': 'Oso 1569', 'credito': 'Biblia del Oso, Casiodoro de Reina, 1569. Dominio público.',
#  'fuente': ('usfm', 'Biblia-del-Oso-1569-main')},
]

# Correcciones puntuales de defectos de las fuentes: (versión, libro, capítulo, versículo, mal, bien)
CORRECCIONES = [
    ('rv1960', 'mt', 5, 41, 'vecon él', 've con él'),
    ('rv1960', 'hab', 3, 17, 'labrados 2 no', 'labrados no'),
    ('rv1960', 'hch', 7, 43, 'i ntes bien', 'Antes bien'),
    ('rv1960', '2cr', 31, 14, 'levitaCoré', 'levita Coré'),
    ('rv1960', 'flm', 1, 4, 'de tí', 'de ti'),
    ('rv1960', 'dn', 10, 20, 'a tí', 'a ti'),
    ('rv1960', 'lc', 16, 2, 'de tí', 'de ti'),
    ('rv1960', 'est', 2, 7, 'húerfana', 'huérfana'),
]

def limpiar(t):
    t = t.replace('/n', ' ')
    t = re.sub(r'\\f .*?\\f\*', '', t)            # notas
    t = re.sub(r'\\x .*?\\x\*', '', t)            # referencias cruzadas
    t = re.sub(r'\\w ([^|\\]*)\|[^\\]*\\w\*', r'\1', t)  # palabras con atributos
    t = re.sub(r'\\\+?[a-z]+\d?\*?', ' ', t)      # demás marcadores (\add, \nd, \q1, \p…)
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r' ([,.;:?!»)])', r'\1', t)
    t = re.sub(r'([«(¿¡]) ', r'\1', t)
    return t

def leer_json(carpeta):
    libros = {}
    for id_, _, archivo, _ in LIBROS:
        s = open(os.path.join(FUENTES, carpeta, archivo + '.js'), encoding='utf-8').read()
        s = s[s.index('['):s.rindex(']') + 1]
        datos = ast.literal_eval(s)   # arreglos JS con comillas simples
        libros[id_] = [[limpiar(v) for v in cap] for cap in datos]
    return libros

def leer_usfm(carpeta):
    libros = {}
    por_codigo = {c: i for i, c, _, _ in LIBROS}
    for f in glob.glob(os.path.join(FUENTES, carpeta, '*.usfm')):
        txt = open(f, encoding='utf-8-sig').read().replace('\r', '')
        codigo = re.search(r'^\\id (\w+)', txt, re.M).group(1)
        if codigo not in por_codigo: continue
        caps, actual, vers = [], None, None
        for linea in txt.split('\n'):
            m = re.match(r'\\c (\d+)', linea)
            if m:
                caps.append([]); actual = caps[-1]; vers = None; continue
            for parte in re.split(r'(?=\\v \d+)', linea):
                mv = re.match(r'\\v (\d+)\s*(.*)', parte)
                if mv:
                    n = int(mv.group(1))
                    while len(actual) < n - 1: actual.append('')   # versículo ausente en la fuente
                    actual.append(mv.group(2)); vers = len(actual) - 1
                elif vers is not None and actual is not None and parte.strip() and not re.match(r'\\(s\d?|ms|mr|d|r|cl|toc|mt|h|id)\b', parte):
                    actual[vers] += ' ' + parte
        # Las ediciones antiguas abren cada capítulo con la primera palabra en mayúsculas («EN el año»)
        versal = lambda t: re.sub(r'^([A-ZÁÉÍÓÚÑ])([A-ZÁÉÍÓÚÑ]+)\b', lambda m: m[1] + m[2].lower(), t)
        libros[por_codigo[codigo]] = [[versal(limpiar(v)) if k == 0 else limpiar(v) for k, v in enumerate(cap)] for cap in caps]
    return libros

def main():
    os.makedirs(SALIDA, exist_ok=True)
    indice, meta, informe = {}, [], []
    ref = None
    for v in VERSIONES:
        tipo, carpeta = v['fuente']
        if not os.path.isdir(os.path.join(FUENTES, carpeta)):
            print('Falta la fuente de', v['id'], '→', carpeta); continue
        libros = leer_json(carpeta) if tipo == 'json' else leer_usfm(carpeta)
        faltan = [i for i, *_ in LIBROS if i not in libros]
        if faltan: informe.append(f"{v['id']}: faltan libros {faltan}")
        for ver, lib, cap, vs, mal, bien in CORRECCIONES:
            if ver == v['id'] and lib in libros:
                libros[lib][cap - 1][vs - 1] = libros[lib][cap - 1][vs - 1].replace(mal, bien)
        indice[v['id']] = {i: [len(c) for c in libros.get(i, [])] for i, *_ in LIBROS}
        total = 0
        for i, caps in libros.items():
            for n, cap in enumerate(caps, 1):
                d = os.path.join(SALIDA, v['id'], i); os.makedirs(d, exist_ok=True)
                json.dump(cap, open(os.path.join(d, f'{n}.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
                total += len(cap)
                vacios = [k + 1 for k, t in enumerate(cap) if not t]
                if vacios: informe.append(f"{v['id']} {i} {n}: versículos vacíos {vacios}")
        meta.append({k: v[k] for k in ('id', 'nombre', 'abrev', 'credito')} | {'defecto': v.get('defecto', False), 'versiculos': total})
        if ref is None: ref = v['id']
        else:
            for i, *_ in LIBROS:
                a, b = indice[ref].get(i, []), indice[v['id']].get(i, [])
                if a != b: informe.append(f"{v['id']} {i}: capítulos/versículos distintos de {ref}")
    json.dump(meta, open(os.path.join(SALIDA, 'versiones.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump({'libros': [[i, n] for i, _, _, n in LIBROS], 'versiculos': indice},
              open(os.path.join(SALIDA, 'indice.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    open(os.path.join(AQUI, 'informe.txt'), 'w', encoding='utf-8').write('\n'.join(informe) + '\n')
    for m in meta: print(m['id'], m['versiculos'], 'versículos')
    print(len(informe), 'observaciones en herramientas/biblia/informe.txt')

if __name__ == '__main__':
    main()
