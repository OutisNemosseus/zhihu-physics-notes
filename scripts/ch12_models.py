"""Textbook constant-VBE DC / hybrid-pi AC circuits, independently solved by MNA.
Generate LTspice decks and actual component schematics (not rendered screenshots).
Run from the repository root with numpy installed. No simulation logs are fabricated.
"""
from pathlib import Path
import json, math
import numpy as np
BASE=Path('docs/assets/downloads/ch12-20-60');BASE.mkdir(parents=True,exist_ok=True)
VT=.026
class Circuit:
 def __init__(self):self.parts=[]
 def r(self,n,a,b,v):self.parts.append(('R'+n,[a,b],float(v)))
 def v(self,n,a,b,v):self.parts.append(('V'+n,[a,b],float(v)))
 def i(self,n,a,b,v):self.parts.append(('I'+n,[a,b],float(v)))
 def g(self,n,a,b,c,d,v):self.parts.append(('G'+n,[a,b,c,d],float(v)))
 def e(self,n,a,b,c,d,v):self.parts.append(('E'+n,[a,b,c,d],float(v)))
 def f(self,n,a,b,ctrl,v):self.parts.append(('F'+n,[a,b,ctrl],float(v)))
 def dcq(self,n,c,b,e,beta):self.v('be'+n,b,e,.7);self.f('c'+n,c,e,'Vbe'+n,beta)
 def acq(self,n,c,b,e,ic,beta):self.r('pi'+n,b,e,beta*VT/ic);self.g('m'+n,c,e,b,e,ic/VT)
 def solve(self):
  nodes=sorted({p for name,ns,v in self.parts for p in (ns[:2] if name[0]=='F' else ns) if p!='0'})
  branches=[name for name,ns,v in self.parts if name[0] in 'VE']
  keys=nodes+branches;idx={k:i for i,k in enumerate(keys)};a=np.zeros((len(keys),len(keys)));z=np.zeros(len(keys))
  def stamp(row,col,val):
   if row!='0' and col!='0':a[idx[row],idx[col]]+=val
  def rhs(row,val):
   if row!='0':z[idx[row]]+=val
  for name,ns,v in self.parts:
   x,y=ns[:2];typ=name[0]
   if typ=='R':
    for r,c,k in [(x,x,1),(y,y,1),(x,y,-1),(y,x,-1)]:stamp(r,c,k/v)
   elif typ=='I':rhs(x,-v);rhs(y,v)
   elif typ=='G':
    cp,cm=ns[2:];stamp(x,cp,v);stamp(x,cm,-v);stamp(y,cp,-v);stamp(y,cm,v)
   elif typ=='F':stamp(x,ns[2],v);stamp(y,ns[2],-v)
   elif typ in 'VE':
    stamp(x,name,1);stamp(y,name,-1);stamp(name,x,1);stamp(name,y,-1)
    if typ=='V':rhs(name,v)
    else:stamp(name,ns[2],-v);stamp(name,ns[3],v)
  sol=np.linalg.solve(a,z);res=float(np.max(np.abs(a@sol-z)))
  return dict(zip(keys,map(float,sol))),res
 def copy(self):
  c=Circuit();c.parts=list(self.parts);return c

def root(f,a,b):
 fa=f(a);fb=f(b)
 if fa*fb>0:raise ValueError((a,b,fa,fb))
 for _ in range(100):
  m=(a+b)/2;fm=f(m)
  if fa*fm<=0:b=m
  else:a=m;fa=fm
 return (a+b)/2

results={}
def save(n,title,ac,dc=None,ic=None,beta=None,output='out',kind='V/V',scale=1,rin='in',rout=True,notes='',extra=None):
 sol,res=ac.solve();val=sol[output]*scale
 # Input impedance uses the actual source port; DC circuit is independent.
 rinval=((-1/sol['Vin']) if sol['Vin'] else None) if 'Vin' in sol else sol.get(rin,0)
 routval=None
 if rout:
  test=ac.copy();test.parts=[(name,ns,0. if name in ['Vin','Iin'] else v) for name,ns,v in test.parts];test.i('test','0',output,1)
  st,_=test.solve();routval=st[output]
 data={'title':title,'gain':val,'unit':kind,'rin':rinval,'rout':routval,'ac_solution':sol,'residual':res,'notes':notes,'ic':ic,'beta':beta,'extra':extra or {}}
 if dc:
  sd,rd=dc.solve();data['dc_solution']=sd;data['dc_residual']=rd
 data['ac_parts']=ac.parts;data['dc_parts']=dc.parts if dc else []
 results[str(n)]=data
 return data

def common_dc(vcc=10):
 c=Circuit();c.v('cc','vcc','0',vcc);return c
# 35: op-amp + follower. DC output fixed at zero in problem.
c=Circuit();c.v('in','in','0',1);c.r('i','in','fb',30000);c.e('amp','oa','0','in','fb',1e5);c.r('o','oa','b',500);c.acq('1','0','b','out',.2e-3*140/141,140);c.r('1','fb','0',1000);c.r('2','out','fb',10000)
save(35,'运放与射极跟随器的串联–并联反馈',c,ic=[.2e-3*140/141],beta=140)
# 36: constant Vbe DC pair and follower.
d=common_dc(12);d.v('in','s','0',0);d.r('s','s','b1',1000);d.i('tail','tail','0',.001);d.i('sink','out','0',.002);d.r('c','vcc','b3',22600);d.r('1','fb','0',10000);d.r('2','out','fb',50000);d.r('L','out','0',4000)
for j,co,ba,em in [('1','vcc','b1','tail'),('2','b3','fb','tail'),('3','vcc','b3','out')]:d.dcq(j,co,ba,em,100)
sd,_=d.solve();ics=[sd['Vbe'+str(i)]*100 for i in (1,2,3)]
c=Circuit();c.v('in','in','0',1);c.r('s','in','b1',1000);c.r('c','0','b3',22600);c.r('1','fb','0',10000);c.r('2','out','fb',50000);c.r('L','out','0',4000)
for j,co,ba,em,ic in zip(('1','2','3'),('0','b3','0'),('b1','fb','b3'),('tail','tail','out'),ics):c.acq(j,co,ba,em,ic,100)
save(36,'差分级与射极跟随器',c,d,ics,100,notes='恒流源交流开路；尾节点不是交流地。有限基极电流纳入 DC KCL。')
# 37: all bias resistors and direct coupling, capacitors open at DC.
d=common_dc();d.r('1','vcc','b1',400000);d.r('2','b1','0',75000);d.r('c1','vcc','b2',8800);d.r('c2','vcc','b3',13000);d.r('e1','e1','0',500);d.r('e2','e2','0',3600);d.r('e3','out','0',1400)
for j,co,ba,em in [('1','b2','b1','e1'),('2','b3','b2','e2'),('3','vcc','b3','out')]:d.dcq(j,co,ba,em,120)
sd,_=d.solve();ics=[120*sd['Vbe'+str(j)] for j in (1,2,3)]
c=Circuit();c.v('in','in','0',1);c.r('1','in','0',400000);c.r('2','in','0',75000);c.r('c1','b2','0',8800);c.r('c2','b3','0',13000);c.r('e1','e1','0',500);c.r('e3','out','0',1400);c.r('f','out','e1',10000)
for j,co,ba,em,ic in zip(('1','2','3'),('b2','b3','0'),('in','b2','b3'),('e1','0','out'),ics):c.acq(j,co,ba,em,ic,120)
save(37,'三级反馈电压放大器的节点分析',c,d,ics,120,notes='CE 将 Q2 发射极交流接地；CF 只在交流把 RF 接到输出；CC 在中频短路。')
# reusable 3-transistor series-shunt AC circuit

def three(rf,rs,rl,ics,beta=120,re=100,rc1=10000,rc2=10000,re3=1000):
 c=Circuit();c.v('in','in','0',1)
 b='in'
 if rs:c.r('s','in','b1',rs);b='b1'
 c.r('c1','b2','0',rc1);c.r('c2','b3','0',rc2);c.r('e1','e1','0',re);c.r('f','e1','out',rf)
 if re3:c.r('e3','out','0',re3)
 if rl:c.r('L','out','0',rl)
 for j,co,ba,em,ic in zip(('1','2','3'),('b2','b3','0'),(b,'b2','b3'),('e1','0','out'),ics):c.acq(j,co,ba,em,ic,beta)
 return c
c=three(1200,0,0,[.0143,.00462,.00447],100,50,300,650,0)
save(38,'给定偏置的三级交流反馈网络',c,ic=[.0143,.00462,.00447],beta=100,extra={'ideal_gain':25})
# 39 MOS differential pair, textbook bias ignores divider DC loading.
gm=2*math.sqrt(.0005*.0005)
c=Circuit();c.v('in','in','0',1);c.r('d1','d1','0',7000);c.r('d2','out','0',7000);c.r('1','out','fb',200000);c.r('2','fb','0',200000);c.g('1','d1','tail','in','tail',gm);c.g('2','out','tail','fb','tail',gm)
save(39,'MOS 差分对与电阻反馈',c,ic=[.0005,.0005],notes='教材偏置近似忽略 400 kΩ 分压支路的直流负载；交流保留该支路。gm1=gm2=1 mS；λ=0、体端接源极。')
# 41 fixed operating current, two Kn cases.
for n,k in [(41,.0015),('41b',.00225)]:
 gm=2*math.sqrt(k*.0012);c=Circuit();c.v('in','in','0',1);c.r('s','out','0',1500);c.g('m','0','out','in','out',gm)
 save(n,'固定偏置电流的源极跟随器',c,ic=[.0012],extra={'Kn':k,'gm':gm},notes='按题目假定每个 Kn 情况下均保持 IDQ=1.2 mA；未给偏置电压，不擅自固定 VGG。')
# 42 DC feedback capacitors open.
d=common_dc(25);d.r('b11','vcc','b1',150000);d.r('b12','b1','0',47000);d.r('c1','vcc','c1',10000);d.r('e1','e1','f',4700);d.r('1','f','0',100);d.r('b21','vcc','b2',47000);d.r('b22','b2','0',33000);d.r('c2','vcc','out',4700);d.r('e2','e2','0',4700);d.dcq('1','c1','b1','e1',50);d.dcq('2','out','b2','e2',50)
sd,_=d.solve();ics=[50*sd['Vbe'+str(j)] for j in (1,2)]
c=Circuit();c.v('in','in','0',1);c.r('b11','in','0',150000);c.r('b12','in','0',47000);c.r('c1','b2','0',10000);c.r('b21','b2','0',47000);c.r('b22','b2','0',33000);c.r('c2','out','0',4700);c.r('1','e1','0',100);c.r('2','e1','out',4700);c.acq('1','b2','in','e1',ics[0],50);c.acq('2','out','b2','0',ics[1],50)
save(42,'双共射级的中频反馈',c,d,ics,50,notes='中频 C1–C6 视为短路；C3 跨接 4.7 kΩ 而不旁路 100 Ω。输出开路，题目没有给负载电阻。')
# 43 one specified design, RF selected for loaded source-to-output gain.
ics=[.0005,.001,.005]
# AC-coupled stages with independent resistor bias dividers; explicitly designed DC values.
vsupply=15.;vb=[.7+ics[0]*121/120*100,.7,.7+ics[2]*121/120*1000]
rbottom=[10000,10000,100000]
rtop=[(vsupply-v)/(v/r+ic/120) for v,r,ic in zip(vb,rbottom,ics)]
def design43(rf):
 c=three(rf,2000,3000,ics)
 for j,node in enumerate(['b1','b2','b3']):
  c.r('bt'+str(j),node,'0',rtop[j]);c.r('bb'+str(j),node,'0',rbottom[j])
 return c
rf=root(lambda rf:design43(rf).solve()[0]['out']-50,100,100000)
c=design43(rf)
d=common_dc(15)
for j,node in enumerate(['b1','b2','b3']):
 d.r('bt'+str(j),node,'vcc',rtop[j]);d.r('bb'+str(j),node,'0',rbottom[j])
d.r('c1','vcc','c1',10000);d.r('c2','vcc','c2',10000);d.r('e1','e1','0',100);d.r('e3','out','0',1000)
d.dcq('1','c1','b1','e1',120);d.dcq('2','c2','b2','0',120);d.dcq('3','vcc','b3','out',120)
save(43,'增益 50 的分立三级反馈设计',c,d,ics,120,extra={'RF':rf,'RS':2000,'RL':3000,'bias_top':rtop,'bias_bottom':rbottom,'VCC':15},notes='设计选择 RC1=RC2=10 kΩ、RE1=100 Ω、RE3=1 kΩ，IC=(0.5,1,5) mA，电源15V。三级之间、输入、输出、RF均用隔直耦合电容；中频理想电容短路，DC开路。各基极用独立电阻分压偏置，实际分压电阻加载保留。')
# 44 NMOS redesign, select W/L=100 for all MOS; K=knprime*(W/L)/2.
k=.005;gm1=2*math.sqrt(k*.0005);gm3=2*math.sqrt(k*.002);rd=(12-1.5-math.sqrt(.002/k))/.0005
A0=gm1*rd/2;b=(A0/8-1-1/(gm3*10000))/(A0+1/(gm3*15000));r2=15000*(1/b-1)
c=Circuit();c.v('in','in','0',1);c.r('s','in','g1',1000);c.r('d','b3','0',rd);c.r('1','fb','0',15000);c.r('2','out','fb',r2);c.r('L','out','0',10000);c.g('1','0','tail','g1','tail',gm1);c.g('2','b3','tail','fb','tail',gm1);c.g('3','0','out','b3','out',gm3)
save(44,'以 MOSFET 重设计差分反馈放大器',c,ic=[.0005,.0005,.002],extra={'RD':rd,'R2':r2,'beta_feedback':b,'K':k,'gm1':gm1,'gm3':gm3},notes='自主设计参数：V+=12 V、V−=−12 V、尾电流1 mA、输出恒流下拉2 mA、三管W/L=100；题目指定 knprime=100 µA/V²。')
# 45 ideal op-amp approximated by finite 1e8 V/V to run SPICE, LED incremental rf=0 as design example.
c=Circuit();c.i('in','0','in',60e-6);c.e('amp','out','0','0','in',1e8);c.r('1','in','out',82333.3333333333);c.r('2','out','0',1000);c.r('s','in','0',100000)
# output current defined into amplifier = -(vout/R2+(vout-vin)/R1), get by source branch.
sol,_=c.solve();save(45,'理想运放 LED 电流设计',c,output='out',rout=False,notes='增益设计 R1/R2=82.333333。交流等效 LED 为短路，仅验证电流关系；其正向压降未给出，直流电源顺从范围需保留为符号条件。',extra={'Io':sol['Eamp'],'Is':60e-6,'R1':82333.3333333333,'R2':1000})
# 46,47 common-gate NMOS + PMOS, LED constant drop DC / short circuit AC.
def mos_bias(sink):
 def f(i):
  j=.01*(525*i-1)**2
  return (i+j-.016) if sink else 7.6-1-math.sqrt(i/.01)-500*i-250*(i+j)
 i=root(f,1/525+1e-10,.006);j=.01*(525*i-1)**2;vs=7.6-1-math.sqrt(i/.01);vo=vs-500*i
 return i,j,vs,vo
for n,sink in [(46,False),(47,True)]:
 i,j,vs,vo=mos_bias(sink);g1=2*math.sqrt(.01*i);g2=2*math.sqrt(.01*j)
 c=Circuit();c.i('in','0','in',1);c.r('d','d','0',525);c.r('f','in','out',500);c.g('1','d','in','0','in',g1);c.g('2','0','out','0','d',g2)
 if not sink:c.r('2','out','0',250)
 # monitor PMOS output current at isolated high-Z voltage transducer, factor 1 ohm.
 c.e('io','io','0','0','d',g2)
 save(n,'共栅 MOS 与 PMOS 的电流反馈',c,ic=[i,j],output='io',kind='A/A',rout=False,extra={'gm1':g1,'gm2':g2,'VS1':vs,'VO':vo,'VD1':10-525*i},notes='Ii 是零均值小信号；DC 输入电流为零。LED 使用题给1.6 V压降及零增量电阻；输出电流方向为PMOS流向LED。Eio为不加载主电路的电流读数转换，增益为器件gm，不是预设闭环答案。')
# 48 exponential BJT bias, VT=26mV textbook.
i=root(lambda x:200*(x-(.016-(181/180)*x)/180)-VT*math.log((.016-(181/180)*x)/1e-15),1e-5,.01);j=.016-i*181/180;ve=3.6-VT*math.log(i/1e-15)
c=Circuit();c.i('in','0','in',1);c.r('c','d','0',200);c.r('f','in','out',500);c.acq('1','d','0','in',i,180)
# PNP equivalent: current from source(ground) into collector, controlled V_E-V_B.
c.r('pi2','d','0',180*VT/j);c.g('2','0','out','0','d',j/VT);c.e('io','io','0','0','d',j/VT)
save(48,'共基极 BJT 与 PNP 电流反馈',c,ic=[i,j],beta=180,output='io',kind='A/A',rout=False,extra={'VE1':ve,'VO':ve-500*i*181/180,'VB2':5-200*(i-j/180)},notes='使用题给 IS=10^-15 A，而非强制 VBE=0.7 V。DC 联立指数方程；VT=26mV。')
# general two-stage current feedback ac model; out current = out voltage/RL.
def current_ac(ics,beta,rf,rs,rc1,rc2,re2,rl,rb1=None,rb2=None,split=None,voltage=False):
 c=Circuit()
 if voltage:c.v('in','src','0',1);c.r('s','src','in',rs)
 else:c.i('in','0','in',1);c.r('s','in','0',rs)
 if rb1:c.r('b1','in','0',rb1)
 if rb2:c.r('b2','b2','0',rb2)
 c.r('c1','b2','0',rc1);c.r('c2','out','0',rc2)
 if rl:c.r('L','out','0',rl)
 if split:
  c.r('e21','e2','tap',split[0]);c.r('e22','tap','0',split[1]);fb='tap'
 else:c.r('e2','e2','0',re2);fb='e2'
 c.r('f','in',fb,rf);c.acq('1','b2','in','0',ics[0],beta);c.acq('2','out','b2','e2',ics[1],beta)
 return c

def dc49(beta):
 d=common_dc();d.r('s','b1','0',10000);d.i('e1','e1','0',.0002);d.r('c1','vcc','b2',40000);d.r('c2','vcc','out',2000);d.r('e2','e2','0',1000);d.dcq('1','b2','b1','e1',beta);d.dcq('2','out','b2','e2',beta)
 sd,_=d.solve();return d,[beta*sd['Vbe'+str(j)] for j in (1,2)]
d,ics=dc49(100);c=current_ac(ics,100,10000,10000,40000,2000,1000,500)
save(49,'两级电流反馈：增益和输入电阻',c,d,ics,100,kind='A/A',scale=1/500,notes='RL仅经隔直电容接入，DC断开；Q1发射极被旁路。Rif排除外部并联RS，另列端口电阻。')
# 50 textbook Fig12.24, independent bias dividers; RS from Example12.9.
d=common_dc()
for name,a,b,v in [('1','vcc','b1',80000),('2','b1','0',20000),('3','vcc','b2',85000),('4','b2','0',15000),('c1','vcc','c1',2000),('c2','vcc','out',4000),('e1','e1','0',1000),('e2','e2','0',500)]:d.r(name,a,b,v)
d.dcq('1','c1','b1','e1',100);d.dcq('2','out','b2','e2',100);sd,_=d.solve();ics=[100*sd['Vbe'+str(j)] for j in (1,2)]
c=current_ac(ics,100,10000,1e7,2000,4000,500,4000,16000,12750)
save(50,'图 12.25 的节点方程与电流增益',c,d,ics,100,kind='A/A',scale=1/4000,notes='RS=10 MΩ来自题目要求比较的Example12.9；原图12.24未写数值。教材例题PSpice参考值9.58不是本次运行值。')
# 51 and 52 direct-coupled pair.
d=common_dc()
for name,a,b,v in [('1','vcc','b1',38300),('2','b1','0',13500),('c1','vcc','b2',3000),('c2','vcc','out',4000),('e1','e1','0',1000),('e2','e2','0',8100)]:d.r(name,a,b,v)
d.dcq('1','b2','b1','e1',120);d.dcq('2','out','b2','e2',120);sd,_=d.solve();ics=[120*sd['Vbe'+str(j)] for j in (1,2)]
c=current_ac(ics,120,1200,600,3000,4000,8100,None,1/(1/38300+1/13500),voltage=True)
save(51,'电流取样反馈电路的电压增益',c,d,ics,120,notes='输出定义是集电极电压；不能改为发射极电压。输入600 Ω在增益中保留。')
c=current_ac(ics,120,1200,1e30,3000,4000,8100,None,1/(1/38300+1/13500))
save(52,'同一电路的放大器输入电阻',c,d,ics,120,output='in',kind='Ω',rout=False,notes='用1 A测试源代替原信号源和600 Ω串联电阻；Rif为CC之后向放大器看入的电阻。1e30 Ω仅提供可忽略的测试源并联电导。')
# 53 grounded emitter Q1, tapped emitter feedback Q2.
d=common_dc()
for name,a,b,v in [('1','vcc','b1',17900),('2','b1','0',1400),('c1','vcc','b2',7000),('c2','vcc','out',2200),('e21','e2','tap',250),('e22','tap','0',500)]:d.r(name,a,b,v)
d.dcq('1','b2','b1','0',50);d.dcq('2','out','b2','e2',50);sd,_=d.solve();ics=[50*sd['Vbe'+str(j)] for j in (1,2)]
c=current_ac(ics,50,5000,1e30,7000,2200,750,2000,1/(1/17900+1/1400),split=(250,500))
save(53,'发射极分段取样的电流反馈',c,d,ics,50,kind='A/A',scale=1/2000,notes='反馈取自250 Ω与500 Ω中点，不能直接接Q2发射极；输出电流是2 kΩ负载中的电流。')
# 54 redesign of49, RF is design variable rather than tuned model parameter.
d,ics=dc49(120)
d.parts=[(name,ns,25000. if name=='Rs' else v) for name,ns,v in d.parts]
rf=root(lambda r:current_ac(ics,120,r,25000,40000,2000,1000,500).solve()[0]['out']/500-30,1000,1e6)
c=current_ac(ics,120,rf,25000,40000,2000,1000,500)
save(54,'电流增益 30 的两级反馈设计',c,d,ics,120,kind='A/A',scale=1/500,extra={'RF':rf,'RS':25000,'RL':500},notes='选择图P12.49拓扑，RC1=40k、RC2=2k、RE2=1k、Q1恒流0.2mA，电源±10V；仅设计RF。DC RS改为25k不改变零偏置基极。')
# 55 ideal Howland pump design, one illustrative RL=1k, finite A=1e8 simulation.
c=Circuit();c.v('in','in','0',1);c.r('1','in','minus',2000);c.r('f','minus','oa',2000);c.r('2','out','0',2000);c.r('3','oa','out',2000);c.r('L','out','0',1000);c.e('amp','oa','0','out','minus',1e8)
save(55,'平衡电桥式跨导源',c,kind='A/V',scale=1/1000,rout=False,extra={'RL_example':1000},notes='设计选R1=RF=R2=R3=2 kΩ。RL=1 kΩ仅为数值验证工况，题目未限定RL。运放使用1e8开环增益近似理想运放。')
# 56 dc approximation balanced differential pair.
gm1=2*math.sqrt(.002*.001);gm3=2*math.sqrt(.01*.0121)
c=Circuit();c.v('in','in','0',1);c.r('d1','d1','0',1600);c.r('d2','d2','0',1600);c.r('L','fb','0',248);c.g('1','d1','tail','in','tail',gm1);c.g('2','d2','tail','fb','tail',gm1);c.g('3','0','fb','0','d1',gm3);c.e('monitor','out','0','fb','0',1)
save(56,'MOS 差分跨导反馈与 LED',c,ic=[.001,.001,.0121],kind='A/V',scale=1/248,rout=False,extra={'VD1':1.4,'VG2':.0008,'gm1':gm1,'gm3':gm3},notes='教材平衡偏置近似ID1=ID2=1mA；由M3求VG2=0.8mV后检查接近0V。LED题给1.6V、rf=0。')
# 57 and58, output collector current measured with1ohm isolated transducer.
def trans_ac(rf):
 c=three(rf,0,0,[.0005,.001,.002],120,100,5000,2000,100)
 # Original Q3 collector is not ground: RC3=1k connects it to AC ground.
 c.parts=[(name,['c3' if (name=='Gm3' and j==0) else x for j,x in enumerate(ns)],v) for name,ns,v in c.parts]
 c.r('c3','c3','0',1000);c.e('io','io','0','0','c3',.001)
 return c
c=trans_ac(800);save(57,'三级串联–串联跨导反馈',c,ic=[.0005,.001,.002],beta=120,output='io',kind='A/V',rout=False,extra={'RF':800},notes='Io为RC3向下的电流，等于−v(c3)/RC3；不是发射极电流。偏置由题目给定，不重造未提供的偏置电路。')
rf=root(lambda r:trans_ac(r).solve()[0]['io']-.12,800,100000)
c=trans_ac(rf);save(58,'设计 RF 使跨导达到 120 mA/V',c,ic=[.0005,.001,.002],beta=120,output='io',kind='A/V',rout=False,extra={'RF':rf},notes='唯一设计变量为RF；保持题给三管静态电流和β不变。必须用实际SPICE测量确认计算选值。')
# 59 diff pair, Q3 current sensed in collector load.
d=common_dc();d.v('in','in','0',0);d.i('tail','tail','0',.001);d.i('sink','e3','0',.002);d.r('f','e3','0',10000);d.r('c2','vcc','b3',18600);d.r('c3','vcc','out',2000)
d.dcq('1','vcc','in','tail',100);d.dcq('2','b3','e3','tail',100);d.dcq('3','out','b3','e3',100);sd,_=d.solve();ics=[100*sd['Vbe'+str(j)] for j in (1,2,3)]
c=Circuit();c.v('in','in','0',1);c.r('f','e3','0',10000);c.r('c2','b3','0',18600);c.r('c3','out','0',2000);c.r('L','out','0',1000)
for j,co,ba,em,ic in zip(('1','2','3'),('0','b3','out'),('in','e3','b3'),('tail','tail','e3'),ics):c.acq(j,co,ba,em,ic,100)
save(59,'差分级驱动的跨导反馈',c,d,ics,100,kind='A/V',scale=1/1000,notes='负载电流按图向下，正输入使Q3集电极电压降低，因此跨导为负。RL经电容接入，DC不加载。')
# 60 finite transconductance source feeding base; beta+1 emitter LED current.
c=Circuit();c.v('in','in','0',5);c.r('e','fb','0',1/.003);c.g('base','0','b','in','fb',1);c.v('sense','b','fb',0);c.f('collector','0','fb','Vsense',80)
save(60,'线性 LED 电流源的设计及有限增益误差',c,output='fb',kind='A',scale=.003,rout=False,extra={'RE':1/.003,'IO_ideal':.015},notes='LED在发射极串联支路；其电流为(β+1)倍基极电流。题给Ag=1000mA/V是运放输出到基极的跨导1S。增量LED压降不影响下方RE电流反馈；实际电源必须有足够顺从电压。')
# save independent calculation, to be compared against engine-produced logs.
(BASE/'calculations.json').write_text(json.dumps(results,indent=2,ensure_ascii=False,allow_nan=False))
print('\n'.join(f'{n}: gain={r["gain"]:.10g} {r["unit"]}, Rin={r["rin"]}, Rout={r["rout"]}, Ic={r["ic"]}' for n,r in results.items()))
