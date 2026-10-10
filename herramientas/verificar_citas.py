# Verifica que cada cita textual «…» seguida de (Ref) aparezca en la RV 1960 (DIRECTRICES §15).
# Uso: python herramientas/verificar_citas.py public/apps/<app>/data.js
import re, json, sys, unicodedata, subprocess
import os
B=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'biblia', 'rv1960') + '/'
AL={'gn':'gn','génesis':'gn','éx':'ex','ex':'ex','éxodo':'ex','lv':'lv','nm':'nm','números':'nm','dt':'dt','deuteronomio':'dt','jos':'jos','josué':'jos','jue':'jue',
'1 r':'1r','1 reyes':'1r','2 r':'2r','2 reyes':'2r','1 cr':'1cr','2 cr':'2cr','2 crónicas':'2cr','esd':'esd','esdras':'esd','neh':'neh','nehemías':'neh','est':'est','ester':'est',
'job':'job','sal':'sal','salmo':'sal','pr':'pr','ec':'ec','cnt':'cnt','is':'is','isaías':'is','jer':'jer','jeremías':'jer','lm':'lm','ez':'ez','ezequiel':'ez','dn':'dn','daniel':'dn',
'os':'os','oseas':'os','jl':'jl','am':'am','amós':'am','abd':'abd','jon':'jon','jonás':'jon','mi':'mi','miqueas':'mi','nah':'nah','nahúm':'nah','hab':'hab','sof':'sof','hag':'hag','zac':'zac','mal':'mal',
'mt':'mt','mateo':'mt','mr':'mr','mc':'mr','lc':'lc','lucas':'lc','jn':'jn','juan':'jn','hch':'hch','hechos':'hch','ro':'ro','1 co':'1co','2 co':'2co','he':'he','hebreos':'he','ap':'ap','apocalipsis':'ap','fil':'fil','1 ti':'1ti','1 p':'1p'}
def norm(s):
    s=unicodedata.normalize('NFC',s).lower()
    s=re.sub(r'[«»"“”¡!¿?,.;:()\-–—]',' ',s); return re.sub(r'\s+',' ',s).strip()
def versos(book,ref):
    out=''
    for part in ref.split(';'):
        part=part.strip()
        m=re.match(r'(\d+):(.+)',part)
        if not m: continue
        c=int(m.group(1)); 
        try: cap=json.load(open(f'{B}{book}/{c}.json'))
        except: continue
        for r in m.group(2).split(','):
            r=r.strip(); a,_,z=r.replace('–','-').partition('-')
            try:
                for v in range(int(a),int(z or a)+1): out+=' '+cap[v-1]
            except: pass
    return out
js=open(sys.argv[1]).read()
textos=re.findall(r"'((?:[^'\\]|\\.)*)'",js)
malas=0; total=0
for t in textos:
    for m in re.finditer(r'«([^»]{6,})»([^(«]{0,90})\(([^)]+)\)',t):
        q, ref = m.group(1), m.group(3)
        mm=re.match(r'([1-3] ?[A-Za-zÁÉÍÓÚáéíóúñ]+|[A-Za-zÁÉÍÓÚáéíóúñ]+)\.? (\d.*)',ref.strip())
        if not mm: continue
        b=AL.get(mm.group(1).lower().replace('  ',' '))
        if not b: continue
        texto=norm(versos(b,mm.group(2).split(';')[0] if False else mm.group(2)))
        trozos=[norm(x) for x in re.split(r'…|\.\.\.',q) if norm(x)]
        total+=1
        if not all(tr in texto for tr in trozos):
            malas+=1; print('REVISAR:', ref,'|',q[:90])
print('citas textuales revisadas',total,'con problemas',malas)
