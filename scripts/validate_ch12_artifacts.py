"""Audit 41 real pages, engine logs, independent calculations and native netlists."""
from pathlib import Path
import json,math,re,hashlib
ROOT=Path(__file__).resolve().parents[1];BASE=ROOT/'docs/assets/downloads/ch12-20-60'
r=json.loads((BASE/'calculations.json').read_text())
def acvalue(path,key):
 s=path.read_text(errors='strict')
 assert s.startswith('LTspice 26.1.1'),path
 assert not re.search(r'Fatal|failed|Error on|Unknown|This sweep spec',s,re.I),path
 m=re.search(r'^'+key+r':.*=\(([-+\d.eE]+)dB,([-+\d.eE]+)°\) at 1000',s,re.M)
 assert m,(path,key)
 return 10**(float(m[1])/20)*math.cos(math.radians(float(m[2])))
def normalized(path):
 lines=path.read_text().splitlines()
 if path.suffix=='.cir':lines=lines[1:]
 return sorted(' '.join(x.lower().split()) for x in lines if x and not x.startswith('*') and x.lower() not in ('.end','.backanno'))
report={'problems':41,'engine':'LTspice 26.1.1 for Windows','native_asc_matches':[],'ac_comparisons':[],'log_hashes':{}}
for n in range(20,61):
 p=ROOT/f'docs/circuits/basic-feedback/12-{n}.md';text=p.read_text();assert text.startswith(f'# 12.{n}') and ('## 教材题目' in text or '## 题目与原电路图' in text),p
 assert not any(ord(c)<32 and c not in '\r\n\t' for c in text),p
 assert f'circuits/basic-feedback/12-{n}.md' in (ROOT/'mkdocs.yml').read_text()
for key,case in r.items():
 folder=BASE/f'p12-{key}';target=case['extra']['Io'] if key=='45' else case['gain']
 actual=acvalue(folder/'AC.log','result')
 assert math.isclose(target,actual,rel_tol=2e-7,abs_tol=1e-11),(key,target,actual)
 report['ac_comparisons'].append({'problem':key,'equation':target,'spice':actual,'unit':'A' if key=='45' else case['unit'],'relative_error':(actual-target)/target})
 if case['rout'] is not None:assert math.isclose(case['rout'],acvalue(folder/'Rout.log','rout_port'),rel_tol=2e-7)
 for asc in folder.glob('*.asc'):
  net=asc.with_suffix('.net');cir=asc.with_suffix('.cir')
  assert net.exists(),f'Generate with LTspice -netlist first: {asc}'
  assert normalized(net)==normalized(cir),(asc,normalized(net),normalized(cir))
  report['native_asc_matches'].append(str(asc.relative_to(ROOT)))
 for log in folder.glob('*.log'):
  text=log.read_text();assert text.startswith('LTspice 26.1.1'),log
  assert not re.search(r'Fatal|failed|Error on|Unknown|This sweep spec',text,re.I),log
  report['log_hashes'][str(log.relative_to(ROOT))]=hashlib.sha256(log.read_bytes()).hexdigest()
  if log.stem=='DC':
   for j,ic in enumerate(case['ic']):
    m=re.search(r'^ic'+str(j+1)+r':.*=([-+\d.eE]+) at ',text,re.M);assert m,log
    assert math.isclose(ic,float(m[1]),rel_tol=2e-7),(key,j,ic,m[1])
 p=ROOT/f'docs/assets/images/ch12-spice/p12-{key}-schematic.png';assert p.stat().st_size>10000,p
 p=ROOT/f'docs/assets/images/ch12-spice/p12-{key}-run.png';assert p.stat().st_size>10000,p
log=ROOT/'docs/assets/downloads/p12-40/P12_40_Auto.log';text=log.read_text()
for key,want in [('av_v_per_v',.8819698233),('rof_ohm',141.63621)]:
 m=re.search(r'^'+key+r':.*=([-+\d.eE]+)',text,re.M);assert m and math.isclose(float(m[1]),want,rel_tol=1e-8)
report['log_hashes'][str(log.relative_to(ROOT))]=hashlib.sha256(log.read_bytes()).hexdigest()
(ROOT/'docs/assets/downloads/ch12-20-60/validation.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print(f"PASS: 41 pages, {len(report['native_asc_matches'])} native ASC/CIR matches, {len(report['ac_comparisons'])} AC cases, {len(report['log_hashes'])} real engine logs")
