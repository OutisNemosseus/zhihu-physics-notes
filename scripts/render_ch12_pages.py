from pathlib import Path
import sys,json,html,math,re
from ch12_sections import sections
BASE=Path('docs/assets/downloads/ch12-20-60');ROOT=Path('docs/circuits/basic-feedback')
data=json.loads((BASE/'calculations.json').read_text());manifest=json.loads(Path('docs/assets/images/ch12-source/manifest.json').read_text())
def readlog(p):
 s=p.read_text(errors='replace')
 assert s.startswith('LTspice 26.1.1'),p
 assert not re.search(r'Fatal|failed|Cannot|Unknown|This sweep spec|Error on',s,re.I),p
 return s

def measurements(s):
 out={}
 for line in s.splitlines():
  m=re.match(r'(\w+):.*=\(([-+\d.eE]+)dB,([-+\d.eE]+)°\) at ',line)
  if m:out[m[1]]=10**(float(m[2])/20)*math.cos(math.radians(float(m[3])));continue
  m=re.match(r'(\w+):.*=([-+\d.eE]+) at ',line)
  if m:out[m[1]]=float(m[2])
 return out

def source(n):
 s='## 教材题目与引用图\n\n来源：用户提供的 `electrobook-(4th ed).pdf`，页序号从 1 起。\n\n'
 for i,img in enumerate(manifest['problems'][str(n)]):
  s+=f"![12.{n} 原题或引用图 {i+1}，书内第 {img['printed_page']} 页／PDF 第 {img['pdf_page']} 页](../../assets/images/ch12-source/{img['file']})\n\n"
 return s

def v(node):return '0' if node=='0' else r'v_{\mathrm{'+node+'}}'
def sub(a,b):return v(a) if b=='0' else ('-'+v(b) if a=='0' else '('+v(a)+'-'+v(b)+')')
def sy(name):return r'\mathrm{'+name+'}'
def equations(parts):
 nodes=sorted({x for name,ns,val in parts for x in (ns[:2] if name[0]=='F' else ns) if x!='0'})
 terms={x:[] for x in nodes};extra=[]
 def add(node,t,sign=1):
  if node!='0':terms[node].append((sign,t))
 for name,ns,val in parts:
  a,b=ns[:2];typ=name[0]
  if typ=='R':t=r'\frac{'+sub(a,b)+'}{'+sy(name)+'}'
  elif typ=='G':t=sy(name)+sub(ns[2],ns[3])
  elif typ=='F':t=sy(name)+r'i_{\mathrm{'+ns[2]+'}}'
  elif typ=='I':t=sy(name)
  elif typ in 'VE':
   t=r'i_{\mathrm{'+name+'}}'
   extra.append(sub(a,b)+'&='+ (sy(name) if typ=='V' else sy(name)+sub(ns[2],ns[3])))
  else:continue
  add(a,t);add(b,t,-1)
 eq=[]
 for node in nodes:
  s=''.join(('+' if sign>0 else '-')+t for sign,t in terms[node]);s=s.lstrip('+')
  eq.append(s+'&=0'+r'\quad('+v(node)+r'\text{ 节点})')
 return '\n\n'.join('$$\n\\begin{aligned}\n'+'\\\\[5pt]\n'.join(eq[i:i+3])+'\n\\end{aligned}\n$$' for i in range(0,len(eq),3))+'\n\n$$\n\\begin{aligned}\n'+'\\\\[4pt]\n'.join(extra)+'\n\\end{aligned}\n$$\n'

def row(label,manual,sim,unit,reason):
 err=(sim-manual)
 error=f'{err/manual*100:+.5g}%' if manual else f'绝对误差 {err:.5g} {unit}（零值不算相对误差）'
 return '<tr>'+''.join('<td>'+html.escape(x)+'</td>' for x in [label,f'{manual:.10g}',f'{sim:.10g}',unit,error,reason])+'</tr>'

for ns,r in data.items():
 if ns.endswith('b'):continue
 n=int(ns);folder=BASE/f'p12-{ns}'
 s=f'# 12.{n} — {r["title"]}\n\n'
 s+='[41 题完成清单](status-12-20-60.md) · [本题文件包](../../assets/downloads/ch12-20-60/p12-'+ns+'.zip)\n\n'
 s+=source(n)+'## 按教材模型展开推导\n\n'+sections[n]
 s+='\n### 从依赖量展开到可代入的节点方程\n\n'
 s+=r['notes']+'\n\n'
 if n in (46,47,48,57,58):s+='测量节点 `io` 的电压定义为输出电流乘以1 Ω：$v_{read}=(1\\,\\Omega)i_o$。E源仅提供不加载原电路的读数转换，日志中的电压数值据此还原为电流；该转换不预设闭环增益。\n\n'
 if r['ic'] and r['beta']:
  s+='未知的 $g_m,r_\\pi$ 先由静态电流展开：$g_{mj}=I_{Cj}/V_T$、$r_{\\pi j}=\\beta/g_{mj}$，$V_T=26$ mV；$r_o=\\infty$。向上代入如下，单位明确列出。\n\n|管号|$I_C$ (mA)|$g_m$ (mS)|$r_\\pi$ (Ω)|\n|---|---:|---:|---:|\n'
  for j,ic in enumerate(r['ic']):s+=f'|Q{j+1}|{ic*1000:.10g}|{ic/.026*1000:.10g}|{r["beta"]*.026/ic:.10g}|\n'
 if r.get('dc_solution'):
  s+='\n直流节点值由上面的固定 $V_{BE}$ 与电流 KCL 得到；表中 **不是**指数晶体管模型的输出。所有下表节点名与 `DC.cir` 一致，电压相对地：\n\n|节点|直流电压 (V)|\n|---|---:|\n'
  for node,val in r['dc_solution'].items():
   if not node.startswith('V'):s+=f'|`{node}`|{val:.10g}|\n'
  s+='\nDC 网表的每管用 `Vbe` 维持 0.7 V、用 F 源实现 $I_C=\\beta I_B$；这是教材分段近似的独立电路实现，不预设待求电流。\n'
 s+='\n为了逐节点核对，下面直接列出与原理图同名的全部节点 KCL。先由这些方程确定输出节点及输入电流，再向上组成所求比值。$i_V$ 是独立／受控电压源由正端流向负端的电流，所有理想直流电源在交流中接地，理想恒流偏置在交流中开路。\n\n'
 s+=equations(r['ac_parts'])
 s+='\n本组方程中的已知量如下。G 的系数为器件跨导（S），E 为开环电压增益或不加载电路的测量转换；不是题目闭环答案。1 V／1 A 是线性响应归一化，不是允许的大信号幅度。\n\n|元件|连接节点（顺序同网表）|参数（SI 单位）|\n|---|---|---:|\n'
 for name,nodes,value in r['ac_parts']:s+=f'|`{name}`|`{" → ".join(nodes)}`|{value:.12g}|\n'
 s+='\n### 向上代入得到结果\n\n将上述已知参数代入 KCL（线性方程组数值求解），再取目标端口量。计算脚本为仓库中的 `scripts/ch12_models.py`，与 LTspice 引擎独立。\n\n'
 if n in (45,55,60):
  man={45:.005,55:-.0005,60:80*5/(1+80*(1000/3))}[n]
  s+=f'主结果：**{man:.10g} {"A" if n in (45,60) else "A/V"}**。\n\n'
 else:s+=f'主结果：**{r["gain"]:.10g} {r["unit"]}**。\n\n'
 if r['rin'] is not None and n not in(45,60,52):
  s+=f'信号源端口电阻：{r["rin"]:.10g} Ω。'
  if n in(36,43,51):s+=f'减去外部串联电阻后，放大器输入电阻为 {r["rin"]-{36:1000,43:2000,51:600}[n]:.10g} Ω。'
  if n in(49,50,54):s+=f'去除外部并联源电阻后，放大器输入电阻为 {1/(1/r["rin"]-1/{49:10000,50:1e7,54:25000}[n]):.10g} Ω。'
  s+='\n\n'
 if r['rout'] is not None:
  s+=f'保持图中电阻与负载的输出测试电阻：{r["rout"]:.10g} Ω。'
  if n in(43,54):s+=f'去除外部负载导纳后，放大器输出电阻为 {1/(1/r["rout"]-1/{43:3000,54:500}[n]):.10g} Ω。'
  s+='\n\n'
 if r['extra'] and n in(43,44,54,58):
  s+='设计数值（电阻单位 Ω，其余按变量定义）：\n\n```json\n'+json.dumps(r['extra'],ensure_ascii=False,indent=2)+'\n```\n\n'
 if n==41:
  rb=data['41b'];s+=f'第二工况：$A_v={rb["gain"]:.10g}$，$R_{{of}}={rb["rout"]:.10g}$ Ω；增益变化 **{100*(rb["gain"]/r["gain"]-1):.8g}%**，电阻变化 **{100*(rb["rout"]/r["rout"]-1):.8g}%**。\n\n'
 s+='## 实际 LTspice 电路与频响截图\n\n以下为 **LTspice 26.1.1 for Windows 实际窗口截图**，下方是教材小信号等效原理图，上方是引擎生成的 AC 曲线。同名节点标签表示电气相连。\n\n'
 s+=f'![12.{n} LTspice 高清等效电路截图](../../assets/images/ch12-spice/p12-{n}-schematic.png)\n\n![12.{n} LTspice 实际原理图及 AC 结果](../../assets/images/ch12-spice/p12-{n}-run.png)\n\n'
 s+='未加入题目没有给出的结电容；因此 1 Hz–1 MHz 的平坦曲线只验证本页中频／理想等效模型，不代表实际器件带宽。对比值在 **1 kHz、同一套 $g_m,r_\\pi$、同一端口定义**下提取。原日志的 AC 测量以 dB 和相位显示，数值表按 $x=10^{d/20}\\cos\\phi$ 换回线性值；180° 对应负号。\n\n'
 logs={p.stem:readlog(p) for p in folder.glob('*.log') if p.stem in ('AC','DC','Rout','DeviceDC')}
 ac=measurements(logs['AC']);manual=r['gain'];unit=r['unit']
 if n==45:manual=.005;unit='A'
 if n==55:manual=-.0005
 if n==60:manual=80*5/(1+80*(1000/3))
 rows=row('主结果',manual,ac['result'],unit,'相同教材等效模型；数值舍入' if n not in(45,55,60) else ('保留基极电流：β与β+1的差异' if n==60 else '有限运放开环增益10^8与理想极限的差异'))
 # sanity check only compares like-for-like quantity; ideal op-amp tolerances allow finite A.
 assert math.isclose(manual,ac['result'],rel_tol=1e-6,abs_tol=1e-11),(n,manual,ac['result'])
 if 'rin_port' in ac:rows+=row('输入测试端口电阻',r['rin'],ac['rin_port'],'Ω','相同端口；包含源电阻时的换算见上文')
 if 'Rout' in logs:rows+=row('输出测试端口电阻',r['rout'],measurements(logs['Rout'])['rout_port'],'Ω','保持原负载；放大器自身值另列')
 if 'DC' in logs:
  dm=measurements(logs['DC'])
  for j,ic in enumerate(r['ic'] or []):rows+=row(f'IC{j+1}',ic,dm[f'ic{j+1}'],'A','固定VBE、有限β的同一偏置模型')
  if 'v_out' in dm:rows+=row('DC out',r['dc_solution']['out'],dm['v_out'],'V','固定VBE近似；与AC扰动区分')
 if 'DeviceDC' in logs:
  dm=measurements(logs['DeviceDC'])
  for j,ic in enumerate(r['ic'] or []):
   key=('ic' if n==48 else 'id')+str(j+1)
   if key in dm:rows+=row(key+'（器件DC）',ic,dm[key],'A','单列器件模型：偏置近似、26mV与27°C热电压差异')
  if n==39:rows+=row('VO（器件DC）',1.5,dm['vout'],'V','分压器直流加载；手算平衡近似')
  if n==44:rows+=row('VO（器件DC）',0,dm['vout'],'V','理想设计零输出；只比较绝对误差')
  if n in (46,47,48):rows+=row('VO（器件DC）',r['extra']['VO'],dm['vout'],'V','同一电源；器件模型与教材近似')
  if n==56:
   rows+=row('VD1（器件DC）',1.4,dm['vd1'],'V','平衡差分对近似与精确平方律')
   rows+=row('VG2（器件DC）',.0008,dm['vg2'],'V','平衡电流回代估算不是严格非线性解')
 if n==41:
  rb=data['41b'];ab=measurements(readlog(BASE/'p12-41b/AC.log'));ob=measurements(readlog(BASE/'p12-41b/Rout.log'))
  rows+=row('(b) Av',rb['gain'],ab['result'],'V/V','Kn增加50%，保持给定IDQ')
  rows+=row('(b) Rof',rb['rout'],ob['rout_port'],'Ω','同一负载与固定偏置电流')
 s+='<div class="p1240-results-grid">\n<section class="p1240-result-panel">\n<h3>LTspice 原始运行日志</h3>\n'
 for name,log in logs.items():s+=f'<details{" open" if name=="AC" else ""}><summary>{name}.log</summary><pre class="p1240-log"><code>{html.escape(log)}</code></pre></details>\n'
 s+='</section>\n<section class="p1240-result-panel">\n<h3>教材计算与实际仿真</h3>\n<div class="p1240-table-scroll"><table><thead><tr><th>物理量</th><th>教材近似计算</th><th>实际仿真</th><th>单位</th><th>相对误差</th><th>原因／定义</th></tr></thead><tbody>'+rows+'</tbody></table></div>\n<p>计算来自上文节点方程，不以日志数值回填手算列。相对误差为 (仿真−计算)/计算；手算为零时只列绝对误差。同模型吻合验证代数与接线，不证明忽略寄生参数的近似适用于任意实物。</p>\n</section>\n</div>\n\n'
 if 'DeviceDC' in logs:
  s+='### 单列：非线性器件直流检查\n\n`DeviceDC.cir` 使用 LEVEL=1 MOS 或题给 IS 的 BJT 器件，在27°C实际运行。它与上面的教材近似偏置不同，**没有用新工作点悄悄替换上方 AC 对比的参数**。MOS 差异来自分压器负载／差分对非平衡；BJT 差异还包含26 mV近似与27°C实际热电压的区别。\n\n|日志量|实际值（SI）|\n|---|---:|\n'
  for key,val in measurements(logs['DeviceDC']).items():s+=f'|`{key}`|{val:.12g}|\n'
 if n==41:
  s+='\n### 第二工况的实际验证\n\n[第二工况 ASC](../../assets/downloads/ch12-20-60/p12-41b/AC.asc) · [AC日志](../../assets/downloads/ch12-20-60/p12-41b/AC.log) · [输出电阻日志](../../assets/downloads/ch12-20-60/p12-41b/Rout.log)\n\n![12.41(b)实际运行](../../assets/images/ch12-spice/p12-41b-run.png)\n\n'
  log=readlog(BASE/'p12-41b/AC.log');s+='```text\n'+log+'\n```\n'
 s+='## 下载与复现\n\n[本题完整文件包](../../assets/downloads/ch12-20-60/p12-'+ns+'.zip) · [12.20–12.60 全部成果包](../../assets/downloads/ch12-20-60.zip)\n\n'
 for p in sorted(folder.iterdir()):
  if p.suffix in ('.asc','.cir','.log','.raw','.plt') and not p.name.endswith('.op.raw'):s+=f'- [{p.name}](../../assets/downloads/ch12-20-60/p12-{ns}/{p.name})\n'
 s+='\n完整解压后用 LTspice 打开 `AC.asc`，运行并按 **Ctrl+L** 查看本机新生成的日志。`AC.plt` 为波形选择配置；`Rout.asc`（如有）单独测试输出电阻，`DC.cir`（如有）验证教材固定 VBE 偏置。模型与参数直接写在文件中，不依赖外部器件库。\n'
 (ROOT/f'12-{n}.md').write_text(s)
print('Wrote',len(sections),'pages with real logs and independent comparisons')
