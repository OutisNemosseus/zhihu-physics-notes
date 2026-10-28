// Each program is actual editable Python executed by Pyodide in a worker.
export const tools = [
{id:'wave',title:'频率、周期与平移',qs:'Q1–3',note:'v(t)=A cos(ωt+θ)。右移 τ 为正，负峰时间按平移前的波形计算。',fields:[['w','角频率 ω / rad·s⁻¹','100*pi'],['phase','初相 θ / °','60'],['delay','右移 τ / ms','10/3']],code:`w = positive(d['w'], '角频率')
theta = real(d['phase'])
tau = real(d['delay']) / 1000
frequency = w / (2*math.pi)
period = 1 / frequency
print('f = ω/(2π) =', f(frequency), 'Hz')
print('T = 1/f =', f(period*1000), 'ms')
print('右移相位 θ − ωτ =', f(angle(theta-math.degrees(w*tau))), '°')
remaining = (180-theta) % 360
if remaining < 1e-10: remaining = 360
print('t>0 首次负峰 =', f(math.radians(remaining)/w*1000), 'ms')`},
{id:'phasor',title:'正弦／余弦 → 相量',qs:'Q4、9',note:'输入带符号的峰值 A。basis=0 表示 cos，basis=1 表示 sin。输出统一为余弦相量。',fields:[['amp','带符号峰值 A','-20'],['phase','原初相 θ / °','-30'],['basis','波形：0=cos，1=sin','1']],code:`a, theta, basis = real(d['amp']), real(d['phase']), real(d['basis'])
if basis not in (0,1): raise ValueError('波形只能选 0 或 1。')
phase = theta - (90 if basis == 1 else 0)
z = P(a, phase)
print('sin(α) = cos(α − 90°)；负幅值自动合入相位。')
show('峰值相量', z)
show('RMS 相量', z/math.sqrt(2))
print('余弦时域：', f(abs(z)), 'cos(ωt + (', f(angle(math.degrees(cmath.phase(z)))), '°))')`},
{id:'complex',title:'复数／相量四则运算',qs:'Q5、16、33–34',note:'op：0 加，1 减，2 乘，3 除，4 并联。可以输入 3+j4、3+4j、10@-90。',fields:[['a','复数 A','10'],['b','复数 B','10@-90'],['op','运算编号','0']],code:`a,b,op = d['a'],d['b'],real(d['op'])
if op == 0: z = a+b; equation = 'A + B'
elif op == 1: z = a-b; equation = 'A − B'
elif op == 2: z = a*b; equation = 'A × B'
elif op == 3: z = a/b; equation = 'A / B'
elif op == 4: z = parallel(a,b); equation = 'A ∥ B = AB/(A+B)'
else: raise ValueError('运算编号应为 0–4。')
show('A',a); show('B',b); show(equation,z)`},
{id:'rlc',title:'RLC 阻抗与电流',qs:'Q6–7、24–25、28',note:'串联 RLC。L 输入 mH、C 输入 μF；0 表示省略该元件。源相量可用峰值或 RMS，basis=0/1 必须对应。',fields:[['w','角频率 ω / rad·s⁻¹','8000'],['r','R / Ω','40'],['l','L / mH（0=省略）','5'],['c','C / μF（0=省略）','1.25'],['vs','电源相量 V','600@20'],['basis','0=峰值，1=RMS','0']],code:`w=positive(d['w'],'角频率')
R,L,C=real(d['r']),real(d['l'])/1000,real(d['c'])/1e6
if min(R,L,C)<0: raise ValueError('R、L、C 不能为负。')
basis=real(d['basis'])
if basis not in (0,1): raise ValueError('basis 只能为 0 或 1。')
ZL=1j*w*L
ZC=1/(1j*w*C) if C else 0j
Z=R+ZL+ZC
print('L =', f(L), 'H；C =', f(C), 'F')
print('ZL = jωL；ZC = 1/(jωC)；Z = R + ZL + ZC')
show('ZL',ZL,'Ω'); show('ZC（省略时为 0）',ZC,'Ω'); show('Z',Z,'Ω')
I=d['vs']/Z
show('I = Vs/Z',I,'A RMS' if basis else 'A peak')
k=1 if basis else 0.5
power=k*abs(I)**2*R
print('电阻平均吸收功率 =',f(power),'W')
print('理想 L、C 平均功率 = 0 W')
print('电源平均吸收功率 =',f(-power),'W；提供功率 =',f(power),'W')`},
{id:'load',title:'已知阻抗：电流与功率',qs:'Q23、28',note:'直接输入电压相量与总阻抗。basis：0 峰值，1 RMS；电流方向按被动符号约定。',fields:[['v','电压 V / V','120'],['z','阻抗 Z / Ω','30+j40'],['basis','0=峰值，1=RMS','1']],code:`basis=real(d['basis'])
if basis not in (0,1): raise ValueError('basis 只能为 0 或 1。')
I=d['v']/d['z']
show('I = V/Z',I,'A RMS' if basis else 'A peak')
S=(1 if basis else 0.5)*d['v']*I.conjugate()
print('平均吸收功率 P =',f(S.real),'W')
print('无功功率 Q =',f(S.imag),'var')`},
{id:'divider',title:'串联分压',qs:'Q8、22',note:'Z1 和 Z2 串联，输出跨在 Z2 两端，参考极性沿电流方向。',fields:[['vs','电源 Vs / V','100@0'],['z1','Z1 / Ω','30'],['z2','Z2 / Ω','-j40']],code:`total=d['z1']+d['z2']
I=d['vs']/total
show('Z1 + Z2',total,'Ω')
show('I = Vs/(Z1+Z2)',I,'A')
show('Vo = Vs × Z2/(Z1+Z2)',I*d['z2'],'V')`},
{id:'node',title:'两源单节点 KCL',qs:'Q9–11',note:'Vs1—Z1—Va—Z2—Vs2，Va 经 R 接地。三支路参考方向随结果列出。',fields:[['v1','左源 Vs1 / V','15+j20'],['v2','右源 Vs2 / V','15+j10'],['z1','左支路 Z1 / Ω','-j50'],['z2','右支路 Z2 / Ω','j20'],['r','接地电阻 R / Ω','150']],code:`v1,v2,z1,z2=d['v1'],d['v2'],d['z1'],d['z2']
R=positive(d['r'],'电阻')
print('(Vs1−Va)/Z1 = Va/R + (Va−Vs2)/Z2')
Y=1/z1+1/z2+1/R
rhs=v1/z1+v2/z2
show('Va 的系数 1/Z1+1/Z2+1/R',Y,'S')
show('右端 Vs1/Z1+Vs2/Z2',rhs,'A')
Va=rhs/Y
show('Va = 右端/系数',Va,'V')
show('左支路流入 (Vs1−Va)/Z1',(v1-Va)/z1,'A')
show('电阻流出 Va/R',Va/R,'A')
show('右支路流出 (Va−Vs2)/Z2',(Va-v2)/z2,'A')`},
{id:'matrix2',title:'2×2 复数方程组',qs:'Q12–16',note:'表格填系数，方程为 A·x=b。Ω 与 V 得 A；kΩ 与 V 得 mA。右端只填已移项的常数。',matrix:2,fields:[],code:`A=[[d['a11'],d['a12']],[d['a21'],d['a22']]]
b=[d['b1'],d['b2']]
for i,row in enumerate(A): print('第',i+1,'行：',row,'；右端',b[i])
x1,x2=solve(A,b)
show('x1',x1); show('x2',x2)
show('共享支路 x1 − x2',x1-x2)
print('下式仅适用 Q16 的 −j2 kΩ 电容和 mA 网孔电流：')
show('Q16 Vcap = (−j2)(x1−x2)',-2j*(x1-x2),'V')`},
{id:'matrix3',title:'3×3 复数方程组',qs:'Q17–19',note:'预设为 HW3 P4。可修改任意系数；附加 Vo、IL 只适用于预设的参考方向和 10 Ω 支路。',matrix:3,fields:[],code:`A=[[d['a11'],d['a12'],d['a13']],
   [d['a21'],d['a22'],d['a23']],
   [d['a31'],d['a32'],d['a33']]]
b=[d['b1'],d['b2'],d['b3']]
for i,row in enumerate(A): print('第',i+1,'行：',row,'；右端',b[i])
x1,x2,x3=solve(A,b)
show('x1',x1); show('x2',x2); show('x3',x3)
print('仅按 HW3 P4 的支路、单位 A 和箭头：')
show('Vo = 10(x1−x3)',10*(x1-x3),'V')
show('IL = −x2',-x2,'A')`},
{id:'thevenin',title:'戴维南与接负载',qs:'Q20–23',note:'这里固定采用 Q21–22 的拓扑：Vs、Za、Zb、R 串联，开路输出跨 R；置零后 R 与 Za+Zb 并联。不能用于任意拓扑。',fields:[['vs','Vs / V','240'],['za','Za / Ω','j60'],['zb','Zb / Ω','-j48'],['r','R / Ω','36'],['load','外接负载 Zload / Ω','32.4-j10.8']],code:`R=positive(d['r'],'电阻')
Zseries=d['za']+d['zb']
print('独立电压源置零→短路；独立电流源置零→开路；受控源保留。')
Zth=parallel(R,Zseries)
Vth=d['vs']*R/(R+Zseries)
show('Za + Zb',Zseries,'Ω')
show('Zth = R ∥ (Za+Zb)',Zth,'Ω')
show('Vth = Vs R/(R+Za+Zb)',Vth,'V')
IL=Vth/(Zth+d['load'])
show('IL = Vth/(Zth+Zload)',IL,'A')
show('Vload = IL Zload',IL*d['load'],'V')`},
{id:'power',title:'瞬时、平均与复功率',qs:'Q24–26、28',note:'V、I 都用余弦相量；电流进入电压正端为被动符号约定。basis=0 峰值、1 RMS。若源用 sin，先用相量转换器。',fields:[['v','电压 V / V','160@0'],['i','电流 I / A','33@60'],['w','角频率 ω / rad·s⁻¹','50'],['basis','0=峰值，1=RMS','0']],code:`V,I=d['v'],d['i']
w=positive(d['w'],'角频率')
basis=real(d['basis'])
if basis not in (0,1): raise ValueError('basis 只能为 0 或 1。')
k=1 if basis else 0.5
S=k*V*I.conjugate()
phi=angle(math.degrees(cmath.phase(V)-cmath.phase(I)))
phase_sum=angle(math.degrees(cmath.phase(V)+cmath.phase(I)))
print('S = V × conjugate(I)' + ('' if basis else ' / 2'))
show('S',S,'VA')
print('P 平均吸收 =',f(S.real),'W；Q =',f(S.imag),'var')
print('平均提供 =',f(-S.real),'W')
print('电压相对电流相位 =',f(phi),'°')
print('功率因数 =',f(math.cos(math.radians(phi))))
print('p(t) =',f(S.real),'+',f(k*abs(V)*abs(I)),
      'cos(',f(2*w),'t + (',f(phase_sum),'°)) W')`},
{id:'rms',title:'峰值、Vpp 与偏置 RMS',qs:'Q27–29、31',note:'只适用于正弦。kind：0 峰峰值 Vpp，1 峰值 Vm，2 交流部分 RMS。DC 可正可负。',fields:[['value','交流幅值读数 / V','20'],['kind','0=Vpp，1=峰值，2=交流RMS','0'],['dc','直流偏置 / V','0']],code:`value=real(d['value']); kind=real(d['kind']); dc=real(d['dc'])
if value<0: raise ValueError('幅值读数不能为负。')
if kind==0: peak=value/2
elif kind==1: peak=value
elif kind==2: peak=value*math.sqrt(2)
else: raise ValueError('kind 只能为 0、1、2。')
ac=peak/math.sqrt(2)
print('Vm =',f(peak),'V；Vpp =',f(2*peak),'V')
print('交流 RMS = Vm/√2 =',f(ac),'V')
print('总 RMS = √(DC²+Vm²/2) =',f(math.hypot(dc,ac)),'V')`},
{id:'scope',title:'示波器延时 → 相位',qs:'Q30–32',note:'Δt=输出峰值时间−参考峰值时间；输出晚出现填正数，早出现填负数。',fields:[['freq','频率 f / Hz','1000'],['dt','Δt / μs（晚为正）','125'],['vpp','输出 Vpp / V','2']],code:`frequency=positive(d['freq'],'频率')
dt=real(d['dt'])/1e6
vpp=real(d['vpp'])
if vpp<0: raise ValueError('Vpp 不能为负。')
T=1/frequency
phi=-360*frequency*dt
print('T = 1/f =',f(T*1000),'ms')
print('φ = −360° f Δt =',f(phi),'°（未折叠）')
print('主值相位 =',f(angle(phi)),'°')
print('输出晚出现→滞后；输出早出现→超前。')
show('输出峰值相量',P(vpp/2,phi),'V peak')
show('输出 RMS 相量',P(vpp/(2*math.sqrt(2)),phi),'V RMS')`}
];
const set=(id,values={})=>({id,values});
export const matrixDefaults={
  matrix2:{a11:'6-j2',a12:'-4+j2',a21:'-4+j2',a22:'6+j2',b1:'6',b2:'0'},
  matrix3:{a11:'10-j10',a12:'j10',a13:'-10',a21:'j10',a22:'0',a23:'-10',a31:'-10',a32:'-10',a33:'20',b1:'-j50',b2:'0',b3:'-25'}
};
export const presets={
  1:set('wave'),2:set('wave'),3:set('wave'),4:set('phasor'),5:set('complex'),6:set('rlc'),7:set('rlc'),8:set('divider'),
  9:set('phasor',{amp:'25',phase:'143.13',basis:'1'}),10:set('node'),11:set('node'),
  12:set('matrix2',{a11:'2-j',a12:'-1',a21:'-1',a22:'2+j',b1:'2-5j',b2:'-1+4j'}),
  13:set('matrix2'),14:set('matrix2'),15:set('matrix2'),16:set('matrix2'),17:set('matrix3'),18:set('matrix3'),19:set('matrix3'),
  20:set('thevenin'),21:set('thevenin'),22:set('thevenin'),23:set('thevenin'),24:set('rlc'),25:set('rlc'),26:set('power'),
  27:set('rms'),28:set('load'),
  29:set('rms',{value:'4',kind:'1',dc:'3'}),30:set('scope'),31:set('scope'),32:set('scope'),
  33:set('complex',{a:'3+j4',b:'1-j2',op:'1'}),34:set('complex',{a:'1.2',b:'-0.8',op:'1'}),35:set('node')
};
export const questionNotes={
  9:'这里载入第一个电源：25 sin(400t+143.13°)。第二个电源改填 A=18.03、θ=33.69、basis=0。',
  16:'取网孔电流单位 mA，矩阵阻抗单位 kΩ；输出末尾的 Vcap 才是本题答案。',
  17:'老师要求此题正确列矩阵即可；本工具另提供数值解作核对。第一行右端是 −j50。',
  20:'概念题：独立电压源短路、独立电流源开路；受控源保留。下面计算用于后续 Q21–23。',
  26:'原题 i(t)=−33 sin(50t−30°)=33 cos(50t+60°)，故电流填 33@60。',
  32:'概念题：V=IZ。电阻电压电流同相；电感电压超前电流 90°；电容电压滞后电流 90°。',
  35:'概念题：画相量电路，标节点、电流箭头和阻抗；写 KCL 电流关系及未化简方程。下面显示对应节点计算。'
};
