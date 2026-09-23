import pymupdf as fitz,json,hashlib
from pathlib import Path
import argparse
parser=argparse.ArgumentParser(description='Extract audited problem crops from the user-provided textbook.')
parser.add_argument('pdf', type=Path)
pdf=parser.parse_args().pdf; doc=fitz.open(pdf)
# Boxes are measured on 1.6x page renders, then converted back to PDF points.
parts={20:[(954,110,733,665,793)],21:[(954,110,793,665,850)],22:[(954,110,850,665,1015)],23:[(954,110,1015,665,1073)],24:[(955,267,300,816,359)],25:[(955,267,360,816,418)],26:[(955,267,416,816,637)],27:[(955,267,975,816,1032)],28:[(955,267,1032,816,1093)],29:[(956,111,107,663,165)],30:[(956,111,165,663,539)],31:[(956,111,567,663,625)],32:[(956,111,625,663,721)],33:[(956,111,721,663,851)],34:[(956,111,851,663,935)],35:[(956,111,975,663,1055),(957,137,174,405,410)],36:[(956,111,1054,663,1095),(957,422,103,817,488)],37:[(957,269,488,817,585),(957,130,620,514,978)],38:[(957,552,663,817,978),(957,269,1008,817,1075),(958,160,105,664,165)],39:[(958,110,165,667,598)],40:[(958,110,624,667,1075)],41:[(959,76,107,228,319),(959,271,106,816,225)],42:[(959,271,227,816,666)],43:[(959,271,685,816,777)],44:[(959,271,777,816,856)],45:[(959,271,896,816,981),(960,111,184,445,376)],46:[(959,271,981,816,1100),(960,476,102,817,376),(960,162,380,666,498)],47:[(960,111,498,666,575),(960,118,585,453,901)],48:[(960,111,911,666,1033),(960,473,585,817,901)],49:[(960,111,1033,666,1075),(961,317,101,817,535)],50:[(961,268,535,817,652)],51:[(961,268,652,817,1075)],52:[(962,111,106,669,166)],53:[(962,111,167,669,581)],54:[(962,111,594,669,694)],55:[(962,111,743,669,842),(963,88,196,298,443)],56:[(962,111,842,669,978),(963,333,107,567,443)],57:[(962,111,978,669,1075),(963,585,128,817,443)],58:[(963,268,465,817,525)],59:[(963,268,525,817,934)],60:[(963,268,954,817,1078)]}
refs={'12.9':(890,111,278,453,539),'12.12':(893,266,396,613,651),'12.14':(894,111,540,457,801),'P12.22':(955,317,103,575,284),'P12.26':(955,317,651,570,953),'12.24':(906,111,107,511,689),'12.25':(907,266,100,817,711),'12.27':(910,665,304,838,615)}
links={20:['12.9'],21:['12.9'],22:['P12.22'],23:['P12.22'],24:['12.12'],25:['12.12'],26:['P12.26'],27:['P12.26'],28:['12.14'],29:['12.14'],50:['12.24','12.25'],60:['12.27']}
# Cross-referenced problem figures reuse the original image, not a redrawing.
extra={23:22,27:26,31:30,44:36,52:51,58:57}
base=Path('docs/assets/images/ch12-source');base.mkdir(parents=True,exist_ok=True)
manifest={'source':pdf.name,'sha256':hashlib.sha256(pdf.read_bytes()).hexdigest(),'pages':len(doc),'problems':{}}
def crop(name,b):
 n,x0,y0,x1,y1=b
 r=fitz.Rect(x0/1.6,y0/1.6,x1/1.6,y1/1.6)
 doc[n-1].get_pixmap(matrix=fitz.Matrix(3,3),clip=r).save(base/(name+'.png'))
 return {'file':name+'.png','pdf_page':n,'printed_page':n-23,'clip_points':list(r)}
for key,b in refs.items():crop('figure-'+key,b)
for n,boxes in parts.items():
 items=[crop(f'12-{n}-{j+1}',b) for j,b in enumerate(boxes)]
 for key in links.get(n,[]):items.append({'file':'figure-'+key+'.png','pdf_page':refs[key][0],'printed_page':refs[key][0]-23,'reference':key})
 if n in extra:
  for j,b in enumerate(parts[extra[n]]):items.append({'file':f'12-{extra[n]}-{j+1}.png','pdf_page':b[0],'printed_page':b[0]-23,'reference':f'P12.{extra[n]}'})
 manifest['problems'][str(n)]=items
(base/'manifest.json').write_text(json.dumps(manifest,indent=2))
print('Extracted',sum(len(v) for v in manifest['problems'].values()),'source references')
