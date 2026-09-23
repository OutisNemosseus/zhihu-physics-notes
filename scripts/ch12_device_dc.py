from pathlib import Path
import json
base=Path('docs/assets/downloads/ch12-20-60');data=json.loads((base/'calculations.json').read_text())
models={}
models[39]=('''VCC vcc 0 5
VSS vss 0 -5
Vin in 0 0
VREF ref 0 -1.5
RD1 vcc d1 7k
RD2 vcc out 7k
R1 out fb 200k
R2 fb ref 200k
M1 d1 in tail tail MN L=1u W=1u
M2 out fb tail tail MN L=1u W=1u
Itail tail vss 1m
.model MN NMOS (LEVEL=1 VTO=0.5 KP=1m LAMBDA=0)''',5,{'id1':'Id(M1)','id2':'Id(M2)','vout':'V(out)'})
e=data['44']['extra']
models[44]=(f'''VCC vcc 0 12
VSS vss 0 -12
Vin in 0 0
RS in g1 1k
RD vcc b3 {e['RD']:.14g}
R1 fb 0 15k
R2 out fb {e['R2']:.14g}
RL out 0 10k
M1 vcc g1 tail tail MN L=1u W=100u
M2 b3 fb tail tail MN L=1u W=100u
M3 vcc b3 out out MN L=1u W=100u
Itail tail vss 1m
Isink out vss 2m
.model MN NMOS (LEVEL=1 VTO=1.5 KP=100u LAMBDA=0)''',12,{'id1':'Id(M1)','id2':'Id(M2)','id3':'Id(M3)','vout':'V(out)'})
for n in [46,47]:
 models[n]=('''VCC vcc 0 10
VG gate 0 7.6
RD vcc d 525
RF s out 500
M1 d gate s s MN L=1u W=1u
M2 ledtop d vcc vcc MP L=1u W=1u
VLED ledtop out 1.6
.model MN NMOS (LEVEL=1 VTO=1 KP=20m LAMBDA=0)
.model MP PMOS (LEVEL=1 VTO=-1 KP=20m LAMBDA=0)
'''+('RD2 out 0 250' if n==46 else 'IQ out 0 16m'),10,{'id1':'Id(M1)','id2':'(-Id(M2))','vout':'V(out)','vs1':'V(s)'})
models[48]=('''VCC vcc 0 5
VB b 0 3.6
RC vcc d 200
RF s out 500
Q1 d b s QN
Q2 ledtop d vcc QP
VLED ledtop out 1.6
IQ out 0 16m
.model QN NPN (BF=180 IS=1e-15)
.model QP PNP (BF=180 IS=1e-15)''',5,{'ic1':'Ic(Q1)','ic2':'(-Ic(Q2))','vout':'V(out)'})
models[56]=('''VCC vcc 0 3
VSS vss 0 -3
Vin in 0 0
RD1 vcc d1 1.6k
RD2 vcc d2 1.6k
RL fb vss 248
M1 d1 in tail tail MN L=1u W=1u
M2 d2 fb tail tail MN L=1u W=1u
M3 ledtop d1 vcc vcc MP L=1u W=1u
VLED ledtop fb 1.6
Itail tail vss 2m
.model MN NMOS (LEVEL=1 VTO=0.5 KP=4m LAMBDA=0)
.model MP PMOS (LEVEL=1 VTO=-0.5 KP=20m LAMBDA=0)''',3,{'id1':'Id(M1)','id2':'Id(M2)','id3':'(-Id(M3))','vd1':'V(d1)','vg2':'V(fb)'})
for n,(body,vcc,meas) in models.items():
 s=f'P12.{n} nonlinear device DC verification; LED constant drop as specified\n'+body+'\n.temp 27\n.options numdgt=15 measdgt=12 reltol=1e-9 abstol=1e-14 vntol=1e-10\n'+f'.dc VCC {vcc} {vcc+1e-6:.12g} 1u\n'
 for k,x in meas.items():s+=f'.meas DC {k} FIND {x} AT={vcc}\n'
 s+='.end\n';(base/f'p12-{n}'/'DeviceDC.cir').write_text(s)
