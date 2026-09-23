"""Package existing chapter files without inventing or rewriting simulator output."""
from pathlib import Path
import hashlib,json,zipfile
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'docs/assets/downloads/ch12-20-60'
PAGES=ROOT/'docs/circuits/basic-feedback'
manifest=json.loads((ROOT/'docs/assets/images/ch12-source/manifest.json').read_text())
ALLOWED={'.asc','.asy','.inc','.cir','.log','.raw','.plt','.md','.txt','.json'}
def files_for(n):
 files={PAGES/f'12-{n}.md'}
 for item in manifest['problems'][str(n)]:files.add(ROOT/'docs/assets/images/ch12-source'/item['file'])
 for folder in ([ROOT/'docs/assets/downloads/p12-40'] if n==40 else [BASE/f'p12-{n}']+([BASE/'p12-41b'] if n==41 else [])):
  if folder.exists():files.update(p for p in folder.iterdir() if p.suffix in ALLOWED and not p.name.endswith('.op.raw'))
 for tag in [str(n)]+(['41b'] if n==41 else []):
  files.update((ROOT/'docs/assets/images/ch12-spice').glob(f'p12-{tag}-*.png'))
 return files

def writezip(path,files):
 with zipfile.ZipFile(path,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
  for p in sorted(files):
   # fixed archive metadata, preserve file bytes exactly including real .log line endings.
   info=zipfile.ZipInfo(p.relative_to(ROOT).as_posix(),date_time=(2026,9,22,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
   z.writestr(info,p.read_bytes())
 with zipfile.ZipFile(path) as z:
  assert z.testzip() is None
  for name in z.namelist():assert z.read(name)==(ROOT/name).read_bytes(),name

allfiles=set()
for n in range(20,61):
 files=files_for(n);allfiles.update(files)
 # downloadable markdown is a byte-for-byte copy, regenerated only after final page edits.
 (BASE/f'12-{n}.md.txt').write_bytes((PAGES/f'12-{n}.md').read_bytes())
 files.add(BASE/f'12-{n}.md.txt');allfiles.add(BASE/f'12-{n}.md.txt')
 writezip(BASE/f'p12-{n}.zip',files)
allfiles.update([ROOT/'mkdocs.yml',ROOT/'docs/assets/stylesheets/extra.css',ROOT/'docs/assets/javascripts/mathjax.js',PAGES/'status-12-20-60.md',BASE/'calculations.json',ROOT/'docs/assets/images/ch12-source/manifest.json',BASE/'README.md.txt'])
for p in (ROOT/'scripts').glob('*ch12*'):
 if p.is_file():allfiles.add(p)
allfiles.update(BASE.glob('*validation*.json'))
allfiles.update(BASE.glob('browser-check.json'))
# Inventory hashes cover every archived source asset, not the archive itself.
inventory={p.relative_to(ROOT).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(allfiles)}
(BASE/'SHA256.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n');allfiles.add(BASE/'SHA256.json')
writezip(ROOT/'docs/assets/downloads/ch12-20-60.zip',allfiles)
# Keep established P12.40 download current.
with zipfile.ZipFile(ROOT/'docs/assets/downloads/P12_40_Auto.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(ROOT.glob('docs/assets/downloads/p12-40/*')):
  if p.suffix in ALLOWED and not p.name.endswith('.op.raw'):z.write(p,'P12_40_Auto/'+p.name)
print(f'41 individual ZIPs; aggregate {len(allfiles)} files; all archived bytes verified against source files.')
