"""Generate runnable open-loop-element verification decks, never result logs."""
import json, math
from pathlib import Path
BASE=Path('docs/assets/downloads/ch12-20-60')
data=json.loads((BASE/'calculations.json').read_text())
SYMS={'F':('f',[(0,0),(0,80)]),'R':('res',[(16,16),(16,96)]),'V':('voltage',[(0,16),(0,96)]),'I':('current',[(0,0),(0,80)]),'G':('g',[(0,96),(0,16),(-48,32),(-48,80)]),'E':('e',[(0,16),(0,96),(-48,32),(-48,80)])}
def num(v):return f'{v:.9g}'
def circuit_files(folder,stem,parts,directives,ac=True):
 lines=[f'P12 {stem}: textbook equivalent; see README.md']
 asc=['Version 4','SHEET 1 1800 1500',f'TEXT 16 -48 Left 2 ;{stem}: explicit node labels join identical nodes; hybrid-pi / ideal sources']
 for j,(name,ns,val) in enumerate(parts):
  typ=name[0];value=num(val)
  if ac and name in ('Vin','Iin','Itest'):value='0 AC '+num(val)
  lines.append(' '.join([name,*ns,value]))
  if typ not in SYMS:
   asc.append('TEXT 16 1450 Left 2 !'+' '.join([name,*ns,value]));continue
  symbol,pins=SYMS[typ];x=120+(j%5)*340;y=48+(j//5)*240
  for (px,py),node in zip(pins,ns):
   # short actual wires lead from pins to labels. Labels outside the symbol.
   dx=-48 if px<0 else 0;dy=0 if px<0 else (-24 if py<56 else 24)
   asc.append(f'WIRE {x+px} {y+py} {x+px+dx} {y+py+dy}')
   asc.append(f'FLAG {x+px+dx} {y+py+dy} {node}')
  asc += [f'SYMBOL {symbol} {x} {y} R0',f'SYMATTR InstName {name}']
  if ac and name in ('Vin','Iin','Itest'):
   asc += ['WINDOW 123 24 124 Left 2','SYMATTR Value 0',f'SYMATTR Value2 AC {num(val)}']
  else:asc.append('SYMATTR Value '+(' '.join(ns[2:])+' ' if typ=='F' else '')+value)
 lines+=directives+['.end'];(folder/(stem+'.cir')).write_text('\n'.join(lines)+'\n')
 y=48+((len(parts)+4)//5)*240
 asc.append(f'TEXT 16 {y} Left 2 !'+'\\n'.join(directives))
 (folder/(stem+'.asc')).write_text('\n'.join(asc)+'\n')

for n,r in data.items():
 folder=BASE/f'p12-{n}';folder.mkdir(exist_ok=True)
 output={'46':'io','47':'io','48':'io','52':'in','57':'io','58':'io','60':'fb'}.get(n,'out')
 scale={'49':1/500,'50':1/4000,'53':1/2000,'54':1/500,'55':1/1000,'56':1/248,'59':1/1000,'60':.003}.get(n,1)
 expr='I(Eamp)' if n=='45' else f'V({output})*{num(scale)}'
 directives=['.ac dec 20 1 1Meg','.options numdgt=15 measdgt=12',f'.meas AC result FIND re({expr}) AT=1k']
 if r['rin'] is not None and n not in ('45','60'):
  exprrin='V(src)/(-I(Vin))' if n=='51' else ('V(in)/(-I(Vin))' if any(p[0]=='Vin' for p in r['ac_parts']) else 'V(in)/I(Iin)')
  directives.append(f'.meas AC rin_port FIND re({exprrin}) AT=1k')
 circuit_files(folder,'AC',r['ac_parts'],directives)
 # Save plotting settings, load alongside AC.raw in LTspice.
 trace='I(Eamp)' if n=='45' else f'V({output})'
 value=abs(r['ac_solution']['Eamp'] if n=='45' else r['ac_solution'][output])
 low=10**(math.floor(math.log10(value))-1);high=10**(math.ceil(math.log10(value))+1)
 (folder/'AC.plt').write_text('[AC Analysis]\n{\n   Npanes: 1\n   {\n      traces: 1 {524290,0,"'+trace+'"}\n      X: (\' \',0,1,0,1000000)\n      Y[0]: (\' \',0,'+str(low)+',10,'+str(high)+')\n      Y[1]: (\' \',0,-180,90,180)\n      Log: 1 2 0\n      GridStyle: 1\n      PltMag: 1\n      PltPhi: 1 0\n   }\n}\n')
 if r['dc_parts']:
  # DC constant-VBE model is a real linear circuit; F source uses Ib sensor.
  text=['P12.'+n+' textbook DC: Vbe=0.7 V; Ic=beta*Ib, not a device-model OP']
  text += [' '.join([name,*ns,num(v)]) for name,ns,v in r['dc_parts']]
  vcc=next(v for name,ns,v in r['dc_parts'] if name=='Vcc')
  text += [f'.dc Vcc {num(vcc)} {num(vcc+0.000001)} 0.000001','.options numdgt=15 measdgt=12']
  for name,ns,v in r['dc_parts']:
   if name.startswith('Fc'):text.append(f'.meas DC ic{name[2:]} FIND (I({ns[2]})*{num(v)}) AT={num(vcc)}')
  for node in sorted({x for name,ns,v in r['dc_parts'] for x in (ns[:2] if name[0]=='F' else ns) if x!='0'}):text.append(f'.meas DC v_{node} FIND V({node}) AT={num(vcc)}')
  text+=['.end'];(folder/'DC.cir').write_text('\n'.join(text)+'\n')
 if r['rout'] is not None:
  parts=[(name,ns,0 if name in ('Vin','Iin') else v) for name,ns,v in r['ac_parts']]+[('Itest',['0',output],1)]
  circuit_files(folder,'Rout',parts,['.ac dec 1 1 1Meg','.options numdgt=15 measdgt=12',f'.meas AC rout_port FIND re(V({output})) AT=1k'])
 (folder/'README.md.txt').write_text(f'''# P12.{n} — {r['title']}

AC.asc is an LTspice schematic using explicit labeled nodes. Identical labels are connected. AC.cir is the same independent netlist. Rpi and Gm represent the hybrid-pi model with gm=Ic/26mV, rpi=beta/gm; lambda/Early effect and capacitances are excluded as specified. G/E sources implement open-loop device laws, not the requested closed-loop answer.

{r['notes']}

Run AC.asc in LTspice; press Ctrl+L for the engine's SPICE Output Log. AC.plt selects a trace. AC excitation is normalized to 1 V or 1 A unless the problem specifies 60uA (45) or 5V (60); these are linear-response normalizations, not asserted large-signal excursions. The 1Hz–1MHz flat response is a property of the capacitance-free equivalent, not a prediction of physical bandwidth. Compare at 1kHz.

Where present, DC.cir uses the textbook piecewise approximation Vbe=0.7V and Ic=beta*Ib, with an independent voltage source sensing base current. It does not enforce saturation; check transistor active-region assumptions separately. It is not a nonlinear SPICE transistor model. AC bias parameters come from those DC KCL equations, or from problem-given operating currents. Rout.asc turns the original signal to zero and injects a 1A AC test current, retaining the same small-signal bias and load.

Only .log files actually produced by LTspice may be published as simulation results. calculations.json contains independent equation results, not simulator output.
''')
print('Generated',len(data),'AC schematics and optional DC/Rout decks')
