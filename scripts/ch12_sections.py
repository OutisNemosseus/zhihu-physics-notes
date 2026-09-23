sections={
35:r'''
### (a)–(c) 所求量与边界条件

目标依次为 $A_{vf}=v_o/v_i$、$R_{if}=v_i/i_i$ 和 $R_{of}=v_x/i_x$。保持反馈电阻 $R_1=1\,\mathrm{k\Omega}$、$R_2=10\,\mathrm{k\Omega}$；测输出电阻时令输入电压为零，不能断开反馈。

$$
\begin{aligned}
(A_{vf},R_{if},R_{of})&\leftarrow(v_o,i_i,v_x/i_x)\leftarrow\text{下列节点方程},\\
g_m,r_\pi&\leftarrow I_C/V_T,\ \beta V_T/I_C,\\
I_C&\leftarrow\frac{\beta}{\beta+1}I_Q
=\frac{140}{141}(0.2\,\mathrm{mA})=0.19858156\,\mathrm{mA}.
\end{aligned}
$$

题给静态 $v_O=0$，反馈分压器直流电流为零，所以晶体管发射极电流等于恒流源电流；理想分压极限增益是 $1+R_2/R_1=11$。有限运放差模输入电阻必须跨接输入和反馈节点，不能直接接地。
''',
36:r'''
### (a) 工作点 → 尾电流分配 → 电源和电阻

$$
\begin{aligned}
V_O,I_{C1},I_{C2},I_{C3}&\leftarrow\text{DC KCL 与 }V_{BE}=0.7\,\mathrm V,\\
I_{C1}+I_{C2}&=\frac{\beta}{\beta+1}(1\,\mathrm{mA}),\\
V_{B1}=V_{B2}&=-R_S I_{C1}/\beta,\\
(V_O-V_{B2})/R_2&=V_{B2}/R_1+I_{C2}/\beta,\\
\frac{\beta+1}{\beta}I_{C3}&=2\,\mathrm{mA}+V_O/R_L+(V_O-V_{B2})/R_2,\\
V_O+0.7&=12-R_C(I_{C2}+I_{C3}/\beta).
\end{aligned}
$$

未知量向下展开到这组线性方程后，代入 $R_S=1k,R_C=22.6k,R_1=10k,R_2=50k,R_L=4k,\beta=100$ 即闭合。若进一步忽略全部直流基极电流，会得到 $I_{C1}=I_{C2}=0.5\,\mathrm{mA}$、$I_{C3}=2\,\mathrm{mA}$、$V_O=0$；这是较粗的平衡近似，下面的主表保留有限 β。

### (b) 增益 → 跨导 → (a) 工作点

$A_{vf}\leftarrow v_o/v_i\leftarrow$ 下列交流 KCL $\leftarrow g_{mj}=I_{Cj}/26\,\mathrm{mV}$。尾电流源和输出恒流源交流开路；尾节点浮动，不能将两个发射极直接接交流地。输入 1 kΩ 串联电阻保留。
''',
37:r'''
### (a) 参数 → 静态电流 → 偏置网络

$$
\begin{aligned}
(g_{mj},r_{\pi j})&\leftarrow(I_{Cj}/V_T,\beta V_T/I_{Cj}),\\
I_{E1}&\leftarrow\frac{V_{TH}-0.7}{R_{E1}+R_{TH}/(\beta+1)},\\
V_{TH}&=10\frac{75}{400+75},\quad R_{TH}=400k\parallel75k,\\
I_{E2}&=\frac{10-R_{C1}I_{C1}-0.7}{R_{E2}+R_{C1}/(\beta+1)},\\
I_{E3}&=\frac{10-R_{C2}I_{C2}-0.7}{R_{E3}+R_{C2}/(\beta+1)},\quad I_{Cj}=\frac\beta{\beta+1}I_{Ej}.
\end{aligned}
$$

自上式最下层的电源、电阻、β 往上求出三管电流，再求 $g_m,r_\pi$，不能把相邻级基极负载忽略。

### (b)–(d) 三个端口量

$A_{vf}\leftarrow v_o/v_i$；$R_{if}\leftarrow v_i/[-i(V_{in})]$，包括输入分压电阻；$R_{of}\leftarrow v_x/i_x$，输入交流置零，保留 $R_{E3}$。三者共享下面展开的交流节点方程。$C_E$ 仅旁路 Q2 发射极，$R_{E1}$ 仍参与反馈。
''',
38:r'''
### (a) 增益及理想极限

$$
\begin{aligned}
A_{vf}&\leftarrow v_o/v_i\leftarrow\text{三级节点方程}\leftarrow(g_{mj},r_{\pi j}),\\
g_{mj}&\leftarrow I_{Cj}/V_T,\quad r_{\pi j}\leftarrow100/g_{mj},\\
(I_{C1},I_{C2},I_{C3})&=(14.3,4.62,4.47)\,\mathrm{mA},\quad V_T=26\,\mathrm{mV},\\
A_{vf,\mathrm{ideal}}&\leftarrow1+R_F/R_E=1+1200/50=25.
\end{aligned}
$$

保留有限 $g_m$ 和基极电流，节点解为 $23.67027119$，比理想值低 $5.318915\%$。这个偏差是有限环路增益和反馈网络加载，不是仿真误差。

### (b) 输入、输出电阻

$R_{if}=v_i/i_i$，$i_i=(v_i-v_{e1})/r_{\pi1}$；$R_{of}$ 令输入置零后在输出注入测试电流。题目只给交流等效电路和静态电流，不应编造未给出的电源、偏置电阻或 DC 原图。
''',
39:r'''
### 增益 → 差分跨导 → 静态电流

$$
\begin{aligned}
A_v&\leftarrow\frac{g_m/2}{1/R_D+1/(R_1+R_2)+(g_m/2)\beta_f},\\
\beta_f&\leftarrow R_2/(R_1+R_2)=1/2,\quad
 g_m\leftarrow2\sqrt{K_nI_D},\\
I_D&\simeq I_Q/2=0.5\,\mathrm{mA},\quad K_n=0.5\,\mathrm{mA/V^2}.
\end{aligned}
$$

向上代入得到 $g_m=1\,\mathrm{mS}$，$A_v=1.264679313$。公式来自尾源交流开路后 $i_{d2}=g_m(v_{g2}-v_i)/2$，以及输出节点 KCL。反馈分压器下端接 **−1.5 V**，不是 +1.5 V；交流时该理想电压源短路接地。

偏置近似给出 $v_O\simeq1.5\,\mathrm V$、$v_{G2}\simeq0$、源节点约 −1.5 V；两管 $V_{DS}\simeq3\,\mathrm V>V_{OV}=1\,\mathrm V$，饱和条件满足。此近似忽略分压器的直流负载（约 7.5 µA）；不能将其声称为完整非线性工作点。
''',
41:r'''
### (a)(i)(ii) 增益、电阻 → 跨导 → 给定电流

$$
\begin{aligned}
A_{vf}&\leftarrow\frac{g_mR_S}{1+g_mR_S},&R_{of}&\leftarrow\frac1{g_m+1/R_S},\\
g_m&\leftarrow2\sqrt{K_nI_{DQ}},&(K_n,I_{DQ},R_S)&=(1.5\,\mathrm{mA/V^2},1.2\,\mathrm{mA},1.5\,\mathrm{k\Omega}).
\end{aligned}
$$

来自输出 KCL $v_o/R_S=g_m(v_i-v_o)$；测电阻时 $v_i=0$、保留原图 $R_S$。向上代入：$g_m=2.683281573\,\mathrm{mS}$，$A_{vf}=0.8009919500$、$R_{of}=298.51207495\,\Omega$。

### (b)(i)(ii) 百分比变化 → 新参数 → 向上代入

题目仍假设 $I_{DQ}=1.2\,\mathrm{mA}$；并不是固定未给出的栅极偏置电压。

$$
\begin{aligned}
g'_m&=\sqrt{1.5}\,g_m=3.286335345\,\mathrm{mS},\\
A'_{vf}&=0.8313518018,\quad R'_{of}=252.97229727\,\Omega,\\
\Delta A/A&=(A'_{vf}/A_{vf}-1),\quad
\Delta R/R=(R'_{of}/R_{of}-1).
\end{aligned}
$$

数值百分比在下方第二工况中列出。这里只含题设 $\lambda=0$ 的无体效应模型；题目未给衬底偏置，因此没有加入未知体效应参数。
''',
42:r'''
### 所求中频增益 → 三节点 → 两个静态电流

$$
\begin{aligned}
A_{vf}&\leftarrow v_o/v_s\leftarrow(v_{e1},v_{b2},v_o),\\
(g_{m1},g_{m2},r_{\pi1},r_{\pi2})&\leftarrow(I_{C1},I_{C2},\beta,V_T),\\
I_{E1}&=\frac{25(47/197)-0.7}{(4.7k+100)+(150k\parallel47k)/51},\\
I_{E2}&=\frac{25(33/80)-0.7}{4.7k+(47k\parallel33k)/51},\quad I_C=\frac{50}{51}I_E.
\end{aligned}
$$

直流所有电容开路。中频所有电容视作短路，特别注意 $C_3$ 旁路的是 4.7 kΩ，**不是**下面的 100 Ω；$C_6$ 把输出经 4.7 kΩ 反馈到这个节点。$C_5$ 外端没有给出负载，故输出测量开路。交流网表验证的是中频极限，扫频曲线平坦不代表真实电容电路没有低频截止。
''',
43:r'''
### 设计目标 → 反馈电阻 → 三管偏置与负载

选择两级共射加一级射极跟随器，反馈从输出经 $R_F$ 返回 Q1 发射极；基极、级间、输出和反馈支路采用隔直耦合，在指定中频视为短路。设计自由量明确选择为 $V_{CC}=15\,\mathrm V$、$R_{C1}=R_{C2}=10\,\mathrm{k\Omega}$、$R_{E1}=100\,\Omega$、$R_{E3}=1\,\mathrm{k\Omega}$、$I_C=(0.5,1,5)\,\mathrm{mA}$。题给 $R_S=2k,R_L=3k,\beta=120$ 始终保留。

$$
\begin{aligned}
R_F&\leftarrow A_v(R_F)=50\leftarrow\text{含分压器加载的节点方程},\\
R_{Bj,top}&\leftarrow\frac{15-V_{Bj}}{V_{Bj}/R_{Bj,bottom}+I_{Cj}/120},\\
V_{B1}&=0.7+I_{C1}(121/120)(100),\quad V_{B2}=0.7,\\
V_{B3}&=0.7+I_{C3}(121/120)(1000),\\
(R_{B1,bottom},R_{B2,bottom},R_{B3,bottom})&=(10k,10k,100k).
\end{aligned}
$$

向上先确定分压电阻，再求小信号参数，最后只改变设计变量 $R_F$ 解 $A_v=50$；没有修改 β 或工作点凑答案。最终电阻和工作点列于下方。输入电阻应扣除外部 2 kΩ；输出电阻另外列出含负载值与去除 3 kΩ 导纳的放大器值。此设计指定的是中频增益，未指定带宽，实际耦合电容值需按目标最低频率选取。
''',
44:r'''
### 目标增益和零输出 → 分压比与漏极电阻 → MOS 尺寸及偏置

采用图 P12.36 的差分对加源极跟随器拓扑，三只 NPN 改为 NMOS。自主选择 $V^+=12\,\mathrm V$、$V^-=-12\,\mathrm V$、尾电流 1 mA、输出下拉恒流 2 mA，三管 $W/L=100$。题给 $k'_n=100\,\mu\mathrm{A/V^2}$，所以 $K_n=k'_n(W/L)/2=5\,\mathrm{mA/V^2}$，SPICE 若用 LEVEL=1 应取 KP=100 µA/V²、W/L=100。

$$
\begin{aligned}
(R_D,R_2)&\leftarrow(V_O=0,A_{vf}=8),\\
R_D&=\frac{12-(V_{TN}+\sqrt{I_{D3}/K_n})}{I_{D2}},\quad
 I_{D1}=I_{D2}=0.5\,\mathrm{mA},\ I_{D3}=2\,\mathrm{mA},\\
A_{vf}&=\frac{A_0}{1+1/(g_{m3}R_L)+\beta_f/(g_{m3}R_1)+\beta_fA_0},\\
A_0&=g_{m1}R_D/2,\quad g_{mj}=2\sqrt{K_nI_{Dj}},\\
\beta_f&=\frac{A_0/8-1-1/(g_{m3}R_L)}{A_0+1/(g_{m3}R_1)},\quad
R_2=R_1(1/\beta_f-1).
\end{aligned}
$$

代入 $R_1=15k,R_L=10k,V_{TN}=1.5$，得 $R_D=19.73508894\,\mathrm{k\Omega}$、$R_2=147.31164752\,\mathrm{k\Omega}$。MOS 输入无栅极电流，所以 1 kΩ 源电阻不造成中频压降。静态跟随管栅压 2.1324555 V、输出0 V；差分管公共源压 −1.8162278 V，三管均满足饱和条件。这里是设计选取的电源和电流，不是擅自补写原题已给值。
''',
45:r'''
### 目标 LED 电流 → 电阻比 → 给定输入电流

图中 $I_o$ 向左流入 LED 和运放输出端。理想虚地使 100 kΩ 源电阻不分流：

$$
\begin{aligned}
\frac{R_1}{R_2}&\leftarrow\frac{I_o}{I_s}-1,\\
I_o&=I_s+I_1,\quad V_o=-I_sR_1,\quad I_1=-V_o/R_2,\\
\frac{R_1}{R_2}&=\frac{5\,\mathrm{mA}}{60\,\mu\mathrm A}-1=82.3333333.
\end{aligned}
$$

选择 $R_2=1\,\mathrm{k\Omega}$、$R_1=82.3333333\,\mathrm{k\Omega}$，则 $V_o=-4.94\,\mathrm V$、$I_o=5\,\mathrm{mA}$。运放输出端须达到 $-4.94-V_{LED}$；题目没有给出 LED 压降，故不能声称 ±5 V 电源足够。

交流等效中 LED 的固定压降消失，运放用开环电压增益 $10^8$ 的受控源近似理想器件。表格保留有限开环增益导致的极小误差。它不是把 5 mA 预置到输出电流源。
''',
46:r'''
### (a) 静态电流 → 栅源电压 → 方程闭合

以 $I_1=I_{DQ1}$、$I_2=I_{DQ2}$ 表示正向大小，输入信号直流为零。

$$
\begin{aligned}
(I_1,I_2)&\leftarrow\begin{cases}
I_2=K_p(R_{D1}I_1-|V_{TP}|)^2,\\
V_G-V_{TN}-\sqrt{I_1/K_n}=R_FI_1+R_{D2}(I_1+I_2),
\end{cases}\\
V_{D1}&=10-R_{D1}I_1,\quad V_{S1}=7.6-1-\sqrt{I_1/K_n}.
\end{aligned}
$$

取满足 $R_{D1}I_1>|V_{TP}|$ 的导通根，代入题定电阻及 $K_n=K_p=10\,\mathrm{mA/V^2}$，得到 $I_1=3.984496412\,\mathrm{mA}$、$I_2=11.92159606\,\mathrm{mA}$。$V_{S1}=5.96877105$ V、LED 下端约3.97652 V；逐管检查 $V_{DS1}\ge V_{GS1}-V_{TN}$、$V_{SD2}\ge V_{SG2}-|V_{TP}|$ 均成立。

### (b) 所求电流增益 → 三个节点 KCL → 消元

令 $v_s,v_d,v_o$ 为 M1 源、M1 漏及 LED 下端的小信号电压，LED 的 $r_f=0$：

$$
\begin{aligned}
i_i&=g_{m1}v_s+(v_s-v_o)/R_F,\\
v_d&=g_{m1}R_{D1}v_s,\qquad i_o=-g_{m2}v_d,\\
v_o/R_{D2}&=i_o+(v_s-v_o)/R_F.
\end{aligned}
$$

从第三式解 $v_o$，代回第一式，再用第二式回代，得到

$$\boxed{\frac{i_o}{i_i}=
\frac{-g_{m2}R_{D1}}{1+\dfrac1{g_{m1}(R_F+R_{D2})}+\dfrac{g_{m2}R_{D1}R_{D2}}{R_F+R_{D2}}}}.$$

### (c) 向上代入

$g_{mj}=2\sqrt{K_jI_j}$；代入 (a) 的电流得到 $A_i=-2.326820099\,\mathrm{A/A}$，负号与原图的输入、输出箭头一致。
''',
47:r'''
### (a) 静态电流 → 恒流源 KCL → PMOS 平方律

$$
\begin{aligned}
I_1+I_2&=16\,\mathrm{mA},\\
I_2&=K_p(R_DI_1-|V_{TP}|)^2,\quad R_DI_1>|V_{TP}|,\\
I_1&=3.992017879\,\mathrm{mA},\qquad I_2=12.00798212\,\mathrm{mA}.
\end{aligned}
$$

M1 源压由 $V_{S1}=7.6-1-\sqrt{I_1/K_n}$ 求得；LED 下端电压为 $V_{S1}-I_1R_F$。加上题给 LED 压降1.6 V 后，两管均满足饱和区条件。不能把输出16 mA恒流源误读成LED电流本身，因为M1也经反馈电阻向该节点供电。

### (b) 电流增益 → 总电流守恒 → 器件跨导

输出恒流源交流开路，于是整个网络的交流 KCL 为 $i_i+i_{d1}+i_o=0$。同时 $i_o=g_{m2}R_Di_{d1}$。

$$
\begin{aligned}
A_i&\leftarrow-\frac{g_{m2}R_D}{1+g_{m2}R_D},\\
g_{m2}&\leftarrow2\sqrt{K_pI_2},\quad K_p=0.01\,\mathrm{A/V^2},\\
\boxed{A_i}&=\boxed{-0.9200383724\,\mathrm{A/A}}.
\end{aligned}
$$

在 $\lambda=0$、理想恒流源和 $r_f=0$ 的条件下，$R_F$ 与 $g_{m1}$ 从最终增益中消去，但仍影响工作点与输入电阻。
''',
48:r'''
### (a) 静态电流 → 指数模型及 KCL → 题给 IS

本题明确给出 $I_S=10^{-15}\,\mathrm A$，没有给定固定0.7 V压降，故采用 $V_{BE}=V_T\ln(I_C/I_S)$，$V_T=26$ mV。

$$
\begin{aligned}
I_{C2}&=16\,\mathrm{mA}-(1+1/180)I_{C1},\\
V_{EB2}&=200(I_{C1}-I_{C2}/180)
=V_T\ln(I_{C2}/I_S),\\
V_{E1}&=3.6-V_T\ln(I_{C1}/I_S).
\end{aligned}
$$

向上解正电流根：$I_{C1}=3.981675066\,\mathrm{mA}$、$I_{C2}=11.99620452\,\mathrm{mA}$。注意 PNP 基极电流注入 RC 节点，因此第一式中的 $I_{C2}/180$ 必须是减号。

### (b) 增益 → 两级电流关系 → 基极电流修正

$$
\begin{aligned}
A_i&\leftarrow-\frac{G}{1+1/\beta_1+G},\\
G=\frac{i_{c2}}{i_{c1}}&\leftarrow\frac{g_{m2}R_C}{1+g_{m2}R_C/\beta_2},\\
i_i+(1+1/\beta_1)i_{c1}+i_{c2}&=0,\qquad
 g_{m2}\leftarrow I_{C2}/V_T.
\end{aligned}
$$

### (c) 向上代入

代入 $R_C=200\,\Omega$、$\beta_1=\beta_2=180$ 及 (a) 电流，得 $A_i=-0.9837839112\,\mathrm{A/A}$。LED 直流压降1.6 V只参与合规电压和正向放大区检查，零增量电阻使其不进入小信号增益。
''',
49:r'''
### (a) 小信号参数 → 静态电流

$$
\begin{aligned}
I_{C1}&=\frac{100}{101}(0.2\,\mathrm{mA}),\\
I_{E2}&=\frac{10-40k I_{C1}-0.7}{1k+40k/101},\quad
I_{C2}=\frac{100}{101}I_{E2},\\
g_{mj}&=I_{Cj}/V_T,\quad r_{\pi j}=100/g_{mj}.
\end{aligned}
$$

### (b)、(c) 增益和输入电阻 → 三节点方程

设 Q1 基极为 $v_1$、Q2 基极为 $v_2$、Q2 发射极为 $v_e$，先由下列 KCL 解出它们，再求 $i_o=v_o/R_L$。输出负载电流与 Q2 集电极电流方向不能混淆，$v_o=-g_{m2}(v_2-v_e)(R_{C2}\parallel R_L)$。输入电阻定义为放大器自身端口，**排除外部并联 $R_S$**；仿真测试源看到的总电阻需用 $R_{if}=(1/R_{port}-1/R_S)^{-1}$ 换算。
''',
50:r'''
### (a) 电流增益 → 三节点消元 → 反馈网络

令 $G_B=1/R_S+1/R_{B1}+1/r_{\pi1}$、$G_C=1/R_{C1}+1/R_{B2}$、$g_\pi=1/r_{\pi2}$、$g_F=1/R_F$。目标向下展开为

$$
\begin{aligned}
A_{if}&\leftarrow -g_{m2}(R_{C2}\parallel R_L)(v_2-v_e)/(R_L i_s),\\
0&=g_{m1}v_1+(G_C+g_\pi)v_2-g_\pi v_e,\\
0&=-g_Fv_1-(g_\pi+g_{m2})v_2+(g_F+1/R_{E2}+g_\pi+g_{m2})v_e,\\
i_s&=(G_B+g_F)v_1-g_Fv_e.
\end{aligned}
$$

取 $H=g_F+1/R_{E2}+g_\pi+g_{m2}$、$B=G_C+g_\pi$，先消去 $v_2$：

$$
\begin{aligned}
q=\frac{v_e}{v_1}&=\frac{g_F-(g_\pi+g_{m2})g_{m1}/B}{H-(g_\pi+g_{m2})g_\pi/B},\\
p=\frac{v_2}{v_1}&=(g_\pi q-g_{m1})/B,\\
\boxed{A_{if}}&=\boxed{-\frac{g_{m2}(R_{C2}\parallel R_L)(p-q)}{R_L(G_B+g_F-g_Fq)}}.
\end{aligned}
$$

### (b) 向上代入与例题比较

两个偏置分压器分别化为 $(V_{TH},R_{TH})=(2\,\mathrm V,16k)$ 和 $(1.5\,\mathrm V,12.75k)$。$I_E=(V_{TH}-0.7)/(R_E+R_{TH}/101)$，因此 $I_{C1}=1.1111111$ mA、$I_{C2}=1.2648221$ mA。代入上式及 Example12.9 的 $R_S=10$ MΩ 得 $A_{if}=9.578209346$，按三位有效数字即教材例题的9.58。例题的旧 PSpice 结果只作引用对照，下面 LTspice 日志才是本次实际运行。
''',
51:r'''
### (a) 静态电流 → 分压器及级间负载

$$
\begin{aligned}
I_{E1}&=\frac{10(13.5/51.8)-0.7}{1k+(38.3k\parallel13.5k)/121},\\
I_{C1}&=(120/121)I_{E1},\\
I_{E2}&=\frac{10-3kI_{C1}-0.7}{8.1k+3k/121},\quad I_{C2}=(120/121)I_{E2},\\
g_{mj}&=I_{Cj}/26\,\mathrm{mV},\quad r_{\pi j}=120/g_{mj}.
\end{aligned}
$$

### (b) 电压增益 → 输入衰减及节点解

$$
A_v=\frac{v_o}{v_s}\leftarrow
\frac{-g_{m2}(v_{b2}-v_{e2})R_{C2}}{v_s}.
$$

$R_S=600\,\Omega$ 与反馈后很低的输入电阻产生显著衰减，不能把 $v_s$ 直接施加到 Q1 基极。两个公共发射级的反相相乘，最终增益为正；保留全部加载后 $A_v=7.475240281$。交流 $C_E$ 旁路 Q1 发射极，$C_F$ 将 RF 接到 Q2 发射极。
''',
52:r'''
### 输入电阻 → 测试源电流 → 复用 12.51 的偏置

题目所求是 CC 右侧放大器的输入电阻，不包括外部600 Ω。

$$
\begin{aligned}
R_{if}&\leftarrow v_1/i_x,\\
i_x&=v_1/(R_1\parallel R_2)+v_1/r_{\pi1}+(v_1-v_{e2})/R_F,\\
(v_1,v_{b2},v_{e2})&\leftarrow\text{下面KCL},\quad
(g_{mj},r_{\pi j})\leftarrow\text{12.51(a)静态电流}.
\end{aligned}
$$

向上代入三节点解：$R_{if}=6.334451806\,\Omega$。独立校验：12.51 的信号源所见电阻为 $600+R_{if}=606.334451806\,\Omega$。这里用1 A归一化交流测试源，输出电压可能很大，但不代表可以施加1 A的大信号而仍保持晶体管线性。
''',
53:r'''
### 增益 → 分段反馈节点 → 工作点

$$
\begin{aligned}
A_{if}&\leftarrow\frac{-g_{m2}(v_{b2}-v_{e2})(R_{C2}\parallel R_L)}{R_Li_s},\\
I_{C1}&\leftarrow50\left(\frac{10-0.7}{17.9k}-\frac{0.7}{1.4k}\right),\\
I_{E2}&\leftarrow\frac{10-7kI_{C1}-0.7}{250+500+7k/51},\quad I_{C2}=50I_{E2}/51,\\
(g_{mj},r_{\pi j})&\leftarrow(I_{Cj}/V_T,50V_T/I_{Cj}).
\end{aligned}
$$

向上求得 $I_{C1}=0.9776536313$ mA、$I_{C2}=2.714281305$ mA，再用四节点 KCL 得 $A_{if}=5.326188867$。反馈连接在 250 Ω 与500 Ω之间的抽头；只用总发射极电阻750 Ω而把 RF 接到顶端会得到另一个电路。
''',
54:r'''
### 设计目标 → RF → 选定拓扑与工作点

选择图 P12.49 的两级共射电流反馈拓扑，设计电源±10 V、$R_{C1}=40k,R_{C2}=2k,R_{E2}=1k$，Q1发射极恒流0.2 mA。信号源并联电阻改为题给25 kΩ，负载为500 Ω，β=120。输入、输出与反馈采用中频隔直耦合，Q1发射极旁路。

$$
\begin{aligned}
R_F&\leftarrow A_{if}(R_F)=30\leftarrow\text{含25 kΩ分流的节点方程},\\
I_{C1}&=\frac{120}{121}(0.2\,\mathrm{mA}),\\
I_{E2}&=\frac{10-40kI_{C1}-0.7}{1k+40k/121},\quad I_{C2}=120I_{E2}/121.
\end{aligned}
$$

先求这两个电流，再求小信号参数，最后解设计方程得到 $R_F=37.63675833\,\mathrm{k\Omega}$。下方实际 SPICE 输出检验增益30。$R_{if}$ 要去除外部25 kΩ并联支路，$R_{of}$ 要去除外部500 Ω负载；$V_A=\infty$ 时集电极反馈不感受输出测试电压，因此放大器输出电阻为 $R_{C2}=2\,\mathrm{k\Omega}$，含负载的400 Ω不是同一个定义。
''',
55:r'''
### (a) 跨导 → 虚短节点和负载KCL → 电阻

令 $k=R_F/R_1$，理想运放有 $v_-=v_+=V_L$：

$$
\begin{aligned}
I_o/V_i&\leftarrow V_L/(R_LV_i),\\
(V_L-V_i)/R_1+(V_L-V_o)/R_F&=0
\Rightarrow V_o=(1+k)V_L-kV_i,\\
I_o&=(V_o-V_L)/R_3-V_L/R_2,\quad V_L=I_oR_L,\\
\boxed{A_{gf}}&=\boxed{-\frac{k}{R_3+R_L(R_3/R_2-k)}}.
\end{aligned}
$$

### (b) 匹配条件向上代入

若 $k=R_3/R_2$，分母中的负载项严格消去，$I_o/V_i=-k/R_3=-1/R_2$。不匹配时增益依赖负载，不能只使用虚短就宣称理想电流源。

### (c) 设计向上代入

$-1/R_2=-0.5$ mA/V，故 $R_2=2$ kΩ。选择 $R_1=R_F=R_3=2$ kΩ 满足匹配。验证示例选 $R_L=1$ kΩ，运放开环增益取 $10^8$，所以数值结果与理想值有极小差异；该负载和有限增益是明确的验证工况，不是题目新增条件。
''',
56:r'''
### (a) 静态量 → 平衡差分对 → PMOS平方律

$$
\begin{aligned}
V_{D1}&\leftarrow3-R_DI_{D1},\quad I_{D1}\simeq I_Q/2=1\,\mathrm{mA},\\
I_{DQ3}&\leftarrow K_p(3-V_{D1}-|V_{TP}|)^2,\\
V_{G2}&\leftarrow-3+I_{DQ3}R_L.
\end{aligned}
$$

向上代入：$V_{D1}=1.4$ V，$I_{DQ3}=10(3-1.4-0.5)^2=12.1$ mA，$V_{G2}=-3+12.1\mathrm{mA}(248)=0.8$ mV。最后值很接近输入静态0 V，验证平衡近似；**0.8 mV不是严格非线性解的反馈误差**，严格解需重新求两支差分电流。

### (b) 跨导 → 差分级 → 输出反馈

$$
\begin{aligned}
i_o&=-g_{m3}v_{d1},\quad v_{d1}=-(g_{m1}R_D/2)(v_i-v_{g2}),\\
v_{g2}&=i_oR_L,\quad G=g_{m1}R_Dg_{m3}/2,\\
\boxed{A_{gf}}&=\boxed{G/(1+GR_L)}.
\end{aligned}
$$

### (c) 参数向上代入

$g_{m1}=2\sqrt{K_n I_{D1}}=2.828427125$ mS，$g_{m3}=2\sqrt{K_p I_{DQ3}}=22$ mS，故 $A_{gf}=3.730114839$ mA/V。LED 使用题给1.6 V固定压降且 $r_f=0$，检查 PMOS静态 $V_{SD}\simeq1.3992$ V大于过驱动1.1 V。
''',
57:r'''
### 跨导 → 输出集电极电流 → 三级节点方程 → 给定静态电流

$$
\begin{aligned}
A_{gf}&\leftarrow i_o/v_s\leftarrow g_{m3}(v_{b3}-v_{e3})/v_s,\\
(g_{mj},r_{\pi j})&\leftarrow(I_{Cj}/V_T,120V_T/I_{Cj}),\\
(I_{C1},I_{C2},I_{C3})&=(0.5,1,2)\,\mathrm{mA}.
\end{aligned}
$$

输出箭头是 $R_{C3}$ 中的集电极电流，故也可用 $i_o=-v_{c3}/1k$ 检查。Q3发射极电流在100 Ω和反馈RF之间分流，不能用 $v_{e3}/100$ 代替 $i_o$。给定三管电流后，不需要也不能杜撰未画出的偏置电路。代入下列KCL，得 $A_{gf}=98.04251505$ mA/V。
''',
58:r'''
### 设计 RF → 指定跨导 → 12.57节点方程

$$
\begin{aligned}
R_F&\leftarrow A_{gf}(R_F)-0.120=0,\\
A_{gf}(R_F)&\leftarrow g_{m3}(v_{b3}-v_{e3})/v_s,\\
(v_{b3},v_{e3})&\leftarrow\text{含未知 }1/R_F\text{ 的KCL},\\
(g_{mj},r_{\pi j})&\leftarrow\text{12.57给定电流和}\ \beta=120.
\end{aligned}
$$

保持电阻、工作点、晶体管参数不变，仅解设计变量 $R_F$，得 $R_F=1027.63002816\,\Omega$。下方独立LTspice测量确认 $I_o/V_s=0.120$ A/V；这是题目授权的电阻设计，并非修改器件参数使固定题目的答案吻合。
''',
59:r'''
### 跨导 → 负载分流 → Q3跨导 → 静态电流

$$
\begin{aligned}
A_{gf}&\leftarrow\frac{-g_{m3}(v_{b3}-v_{e3})(R_{C3}\parallel R_L)}{R_Lv_s},\\
(g_{mj},r_{\pi j})&\leftarrow(I_{Cj}/V_T,100V_T/I_{Cj}),\\
I_{C1}+I_{C2}&=\frac{100}{101}(1\,\mathrm{mA}),\quad V_{B2}=V_{B1}=0,\\
I_{E3}&=2\,\mathrm{mA}+I_{B2},\qquad
0.7=10-18.6k(I_{C2}+I_{B3}).
\end{aligned}
$$

题图中反馈电阻10 kΩ接在Q3发射极与地之间，Q2基极直接连接Q3发射极。$V_{B1}=V_{B2}$ 是固定相同0.7 V压降的教材偏置近似。向上解出电流，再列交流KCL得到 $A_{gf}=-0.06526861024$ mA/V；负号由负载电流的向下箭头决定。
''',
60:r'''
### (a) 电流斜率 → 检测电阻 → 理想虚短

LED替换图12.27中的 $R_L$，位于发射极与检测电阻之间。反馈取自 $R_E$ 上端，因此

$$
\begin{aligned}
R_E&\leftarrow V_i/I_{LED}\leftarrow1/(3\times10^{-3})
=\boxed{333.3333333\,\Omega},\\
I_{LED}&=V_i/R_E=0\text{ 至 }15\,\mathrm{mA}.
\end{aligned}
$$

这是理想运放且晶体管有足够顺从电压时的关系。需要 $V_{CC}$ 高于 $V_i+V_{LED}+V_{CE,\min}$，并保证运放能输出足够基极电压；题目未给LED压降或电源，因此保留符号条件。

### (b) 教材近似：电流误差 → 有限跨导 → 基极电流

题给运放跨导 $g_a=10^3$ mA/V = 1 A/V。先按本节教材的 $I_E\simeq I_C=\beta I_B$ 近似：

$$
\begin{aligned}
I_{LED}&\simeq\beta g_a(V_i-I_{LED}R_E),\\
I_{LED}&\simeq\frac{\beta g_a V_i}{1+\beta g_aR_E},\\
\beta&=80,\quad V_i=5\,\mathrm V,\quad R_E=1000/3\,\Omega,\\
I_{LED}&\simeq14.999437521\,\mathrm{mA},\\
\Delta I&\simeq-0.56247891\,\mu\mathrm A,\quad
\Delta I/(15\,\mathrm{mA})\simeq-0.0037498594\%.
\end{aligned}
$$

### 单列：保留基极电流

LED位于发射极串联支路，其实际电流是 $(\beta+1)I_B$。更精确的同一工作点模型只需把上式 β 改为 β+1：

$$
\begin{aligned}
I_{LED}&=\frac{(\beta+1)g_aV_i}{1+(\beta+1)g_aR_E}=14.999444465\,\mathrm{mA},\\
\Delta I&=-0.55553498\,\mu\mathrm A,\qquad
\Delta I/(15\,\mathrm{mA})=-0.0037035665\%.
\end{aligned}
$$

SPICE保留发射极的基极电流贡献，以开环跨导1 S和集电极／基极电流比80验证闭合方程；没有预置LED输出电流。下表主手算列使用先列的教材近似，差异来自 β 与 β+1 的区分。
'''
}
