# 第 10 章 10.19–10.25：电流源解答

按题目截图逐题整理。电流均以题目所示方向的幅值计算。10.23、10.24 缺原书图 10.8、10.9，采用各节注明的标准拓扑；10.25 的电路图在本次截图中未完整显示，沿用已有笔记的输出管发射极电阻连接，需原图核对。10.19 采用基极电流补偿式基本三管电流镜。

10.19–10.22 是直流设计与 KCL 消元，不需要引入小信号模型；10.23 使用小信号输出电阻；10.24–10.25 使用指数模型与发射极电阻。

| 题目 | 结果 |
|---|---|
| D10.19 | $I_{\mathrm{REF}}=150.1829\,\mu\mathrm A$；$R_1=30.6293\,\mathrm{k}\Omega$ |
| D10.20 | $I_{\mathrm{REF}}=0.8023704\,\mathrm{mA}$；$R_1=20.6887\,\mathrm{k}\Omega$ |
| 10.21 | $I_O/I_{\mathrm{REF}}=\beta(\beta+2)/(\beta^2+2\beta+2)$ |
| 10.22 | $I_{\mathrm{REF}}=0.2501366\,\mathrm{mA}$；$R_1=34.78\,\mathrm{k}\Omega$ |
| 10.23 | 标准 Wilson 近似：$R_{\mathrm{out}}\approx20\,\mathrm{M}\Omega$；$\Delta I_O\approx+0.25\,\mu\mathrm A$ |
| 10.24 | $I_{\mathrm{REF}}=0.462366\,\mathrm{mA}$；$I_O=41.7010\,\mu\mathrm A$；$V_{BE2}=0.637448\,\mathrm V$ |
| 10.25(a) | $V_{BE1}=0.634716\,\mathrm V$；$V_{BE2}=0.604014\,\mathrm V$；$I_O=61.4039\,\mu\mathrm A$ |
| 10.25(b) | $V_{BE1}=0.634716\,\mathrm V$；$V_{BE2}=0.599115\,\mathrm V$；$I_O=71.2020\,\mu\mathrm A$ |

涉及指数模型的主结果使用 $V_T=26\,\mathrm{mV}$；各节附 $25\,\mathrm{mV}$ 对照。

## D10.19 — PNP 三晶体管电流源设计

已知 $I_O=0.15\,\mathrm{mA}$、$V^+=+3\,\mathrm V$、$V^-=-3\,\mathrm V$、$\beta=40$、$V_{EB}(\mathrm{on})=0.7\,\mathrm V$、$V_A=\infty$。

采用带第三管基极电流补偿的基本三管电流镜，即 P10.22 的单位面积、PNP 版本。截图没有画出本题所指的基本电路；以下明确采用这组连接。

### 1. PNP 电路怎样连接

将 NPN 基本三管电流镜的极性翻转。输出是向负载提供电流的 PNP 电流源，$I_O$ 定义为流出 $Q_2$ 集电极的电流幅值。

| 元件 | 连接 |
|---|---|
| $Q_1$、$Q_2$ | 匹配的 PNP；两管发射极接 $+3\,\mathrm V$；基极相连，记为节点 $B$ |
| $Q_2$ 集电极 | 接输出负载 |
| $Q_3$ | PNP；发射极接 $B$，集电极接 $-3\,\mathrm V$ |
| $Q_1$ 集电极与 $Q_3$ 基极 | 相连，记为节点 $X$ |
| $R_1$ | 从 $X$ 接至 $-3\,\mathrm V$，建立 $I_{\mathrm{REF}}$ |

$Q_1,Q_2$ 的 $V_{EB}$ 相等且匹配，所以 $I_{C1}=I_{C2}=I_O$。计算使用电流幅值；PNP 的基极电流流出基极。

### 2. 从未知展开到已知

$$
\begin{gathered}
\boxed{R_1\;?}\\[4pt]
\downarrow\\[4pt]
R_1=\frac{V_X-V^-}{I_{\mathrm{REF}}}\\[4pt]
\downarrow\\[4pt]
V_X=V^+-V_{EB1}-V_{EB3},\qquad
I_{\mathrm{REF}}=I_O+I_{B3}\\[4pt]
\downarrow\\[4pt]
I_{B3}=\frac{I_{E3}}{\beta+1},\qquad
I_{E3}=I_{B1}+I_{B2}=\frac{2I_O}{\beta}\\[4pt]
\downarrow\\[4pt]
\boxed{I_O,\ \beta,\ V^+,\ V^-,\ V_{EB1},\ V_{EB3}\text{ 均已知}}
\end{gathered}
$$

第三管承担两只镜像管的基极电流，电阻支路只需额外提供第三管自己的基极电流。

$$
\boxed{I_{\mathrm{REF}}=I_O\left(1+\frac{2}{\beta(\beta+1)}\right)}.
$$

$$
\boxed{R_1=\frac{V^+-V^--V_{EB1}-V_{EB3}}
{I_O\left(1+\frac{2}{\beta(\beta+1)}\right)}}.
$$

### 3. 代入计算

$$
V_B=3-0.7=2.3\,\mathrm V,\qquad V_X=2.3-0.7=1.6\,\mathrm V.
$$

$$
I_{B1}=I_{B2}=\frac{150}{40}=3.75\,\mu\mathrm A,
\quad I_{E3}=7.50\,\mu\mathrm A,
\quad I_{B3}=\frac{7.50}{41}=0.182927\,\mu\mathrm A.
$$

$$
\boxed{I_{\mathrm{REF}}=150.182927\,\mu\mathrm A},\qquad
\boxed{R_1=\frac{1.6-(-3)}{150.182927\times10^{-6}}
=30.6293\,\mathrm{k}\Omega}.
$$

这是题目固定 $V_{EB}$ 模型下的设计值。若直接忽略基极电流，得到 $30.6667\,\mathrm{k}\Omega$。实际选用电阻后应按选定阻值重新计算电流。输出管必须保持放大区；上述模型下输出电压宜低于其基极电压 $2.3\,\mathrm V$。

---

## D10.20 — PNP Wilson 电流源设计

已知 $I_O=0.8\,\mathrm{mA}$、$V^+=+9\,\mathrm V$、$V^-=-9\,\mathrm V$、$\beta=25$、$V_{EB}(\mathrm{on})=0.7\,\mathrm V$、$V_A=\infty$。求 $I_{\mathrm{REF}}$，并设计建立该电流的电阻。

采用图 P10.21 的匹配三管 Wilson 电路的 PNP 版本。$I_O$ 定义为流出 $Q_3$ 集电极的电流幅值。

### 1. PNP 电路连接

| 元件 | 连接 |
|---|---|
| $Q_1,Q_2$ | 匹配 PNP；发射极接 $+9\,\mathrm V$；基极相连为节点 $B$ |
| $Q_2$ 集电极 | 接节点 $B$，形成二极管连接 |
| $Q_3$ 发射极 | 接节点 $B$ |
| $Q_3$ 基极、$Q_1$ 集电极 | 相连为节点 $X$ |
| $Q_3$ 集电极 | 接输出负载 |
| $R_1$ | 从节点 $X$ 接至 $-9\,\mathrm V$ |

### 2. 从未知展开到已知

$$
\begin{gathered}
\boxed{I_{\mathrm{REF}}\;?}\\[4pt]
\downarrow\\[4pt]
I_{\mathrm{REF}}=I+I_{B3}=I+\frac{I_O}{\beta}\\[4pt]
\downarrow\\[4pt]
I=\frac{\beta+1}{\beta+2}I_O\\[4pt]
\downarrow\\[4pt]
\boxed{I_O=0.8\,\mathrm{mA},\quad\beta=25}
\end{gathered}
$$

这里 $I=I_{C1}=I_{C2}$。公共基极节点 KCL 给出

$$
I_{E3}=I_{C2}+I_{B1}+I_{B2}=I\left(1+\frac{2}{\beta}\right).
$$

又因为 $I_{E3}=I_O(1+1/\beta)$，所以

$$
I=I_O\frac{\beta+1}{\beta+2}.
$$

参考节点 KCL：

$$
\boxed{I_{\mathrm{REF}}=I_O
\frac{\beta^2+2\beta+2}{\beta(\beta+2)}
=I_O\left(1+\frac{2}{\beta(\beta+2)}\right)}.
$$

这与 [10.21](10-21.md) 的电流关系互为反解。PNP 翻转改变电流方向，幅值关系不变。

### 3. 代入计算

$$
I=0.8\frac{26}{27}=0.77037037\,\mathrm{mA},\qquad
I_{B3}=\frac{0.8}{25}=0.032\,\mathrm{mA}.
$$

$$
\boxed{I_{\mathrm{REF}}=0.80237037\,\mathrm{mA}}.
$$

节点电压为

$$
V_B=9-0.7=8.3\,\mathrm V,\qquad
V_X=8.3-0.7=7.6\,\mathrm V.
$$

因此

$$
\boxed{R_1=\frac{V_X-V^-}{I_{\mathrm{REF}}}
=\frac{7.6-(-9)}{0.80237037\times10^{-3}}
=20.6887\,\mathrm{k}\Omega}.
$$

要求 PNP 输出管 $Q_3$ 保持放大区，输出电压宜低于其基极电压 $7.6\,\mathrm V$。输出电压靠近发射极电压 $8.3\,\mathrm V$ 时会进入饱和，设计电流关系不再成立。

---

## 10.21 — Wilson 电流源

求 $I_O$ 与 $I_{\mathrm{REF}}$、$\beta$ 的关系。所有管子具有相同有限 $\beta$，$V_A=\infty$；按图中正常放大区工作分析。

$Q_1,Q_2$ 的基极相连、发射极相连，且单位面积相同。因此 $I_{C1}=I_{C2}=I$。图中 $Q_2$ 的集电极与基极相连。$Q_3$ 的发射极连接公共基极节点；双发射极标记不会改变本题使用的端口关系 $I_{E3}=I_{C3}(1+1/\beta)$。

### 从未知向下展开

先将节点之间相互依赖的关系消元（推导见下一节），得到无循环的依赖链：

$$
\begin{gathered}
\boxed{I_O\;?}\\[4pt]
\downarrow\\[4pt]
I_O=\frac{\beta+2}{\beta+1}I\\[4pt]
\downarrow\\[4pt]
I=\frac{I_{\mathrm{REF}}}{1+\frac{\beta+2}{\beta(\beta+1)}}\\[4pt]
\downarrow\\[4pt]
\boxed{I_{\mathrm{REF}},\ \beta\ \text{为题目给定参数}}
\end{gathered}
$$

### 每一层关系从哪里来

公共基极节点：$Q_3$ 的发射极电流需要供应 $Q_2$ 的集电极电流以及两管的基极电流。

$$
I_{E3}=I_{C2}+I_{B1}+I_{B2}
=I+\frac{I}{\beta}+\frac{I}{\beta}
=\frac{\beta+2}{\beta}I.
$$

而 $I_O=I_{C3}=\beta I_{E3}/(\beta+1)$，所以

$$
I_O=\frac{\beta+2}{\beta+1}I,
\qquad I_{B3}=\frac{I_O}{\beta}.
$$

参考电流节点：

$$
I_{\mathrm{REF}}=I_{C1}+I_{B3}
=I+\frac{I_O}{\beta}
=I\left[1+\frac{\beta+2}{\beta(\beta+1)}\right].
$$

### 向上代入

$$
\boxed{
I_O=\frac{\beta(\beta+2)}{\beta^2+2\beta+2}I_{\mathrm{REF}}
=\left(1-\frac{2}{\beta^2+2\beta+2}\right)I_{\mathrm{REF}}
}
$$

当 $\beta\to\infty$，$I_O\to I_{\mathrm{REF}}$；相对误差约为 $2/\beta^2$。

---

## 10.22 — 带基极电流补偿的比例电流镜

已知 $I_O=0.5\,\mathrm{mA}$，$\beta_1=\beta_2=90$，$\beta_3=60$，$V_{BE1}=V_{BE2}=0.7\,\mathrm V$，$V_{BE3}=0.6\,\mathrm V$，电源为 $+5\,\mathrm V$ 与 $-5\,\mathrm V$，$V_A=\infty$。

**图中 $Q_2$ 有两个相连的单位发射极，面积是 $Q_1$ 的两倍。因此 $I_{C2}=2I_{C1}$；不是两管电流相等，也不是 $\beta$ 翻倍。**

### (a) 从待求电阻向下展开

$$
\begin{gathered}
\boxed{R_1\;?}\\[4pt]
\downarrow\\[4pt]
R_1=\frac{V^+-V_{B3}}{I_{\mathrm{REF}}}\\[8pt]
\begin{array}{cc}
\downarrow&\downarrow\\[4pt]
V_{B3}=V_{E3}+V_{BE3}&I_{\mathrm{REF}}=I_{C1}+I_{B3}\\[6pt]
\downarrow&\downarrow\\[4pt]
V_{E3}=V_{B1}=V^-+V_{BE1}&I_{B3}=\dfrac{I_{E3}}{\beta_3+1}\\[6pt]
\downarrow&\downarrow\\[4pt]
\boxed{V^-=-5\,\mathrm V,\ V_{BE1}=0.7\,\mathrm V}&I_{E3}=I_{B1}+I_{B2}\\[6pt]
&\downarrow\\[4pt]
&I_{B1}=\dfrac{I_{C1}}{\beta_1},\quad I_{B2}=\dfrac{I_{C2}}{\beta_2}\\[8pt]
&\downarrow\\[4pt]
&I_{C1}=I_O/2,\quad I_{C2}=I_O\\[6pt]
&\downarrow\\[4pt]
&\boxed{I_O=0.5\,\mathrm{mA},\ \beta_1=\beta_2=90}
\end{array}
\end{gathered}
$$

其余叶节点为已知量 $V^+=5\,\mathrm V$、$V_{BE3}=0.6\,\mathrm V$、$\beta_3=60$。

### 展开到只剩已知量

$$
I_{\mathrm{REF}}=\frac{I_O}{2}
+\frac{\frac{I_O}{2\beta_1}+\frac{I_O}{\beta_2}}{\beta_3+1}.
$$

$$
\boxed{R_1=
\frac{V^+-V^- -V_{BE1}-V_{BE3}}
{\displaystyle\frac{I_O}{2}+\frac{\frac{I_O}{2\beta_1}+\frac{I_O}{\beta_2}}{\beta_3+1}}}
$$

$$
V_{B3}=-5+0.7+0.6=-3.7\,\mathrm V,
\qquad V_{R_1}=5-(-3.7)=8.7\,\mathrm V.
$$

$$
\boxed{I_{\mathrm{REF}}=0.2501366\,\mathrm{mA}},
\qquad
\boxed{R_1=34.78\,\mathrm{k}\Omega}.
$$

### (b) 其余未知电流

同一依赖树中的关系直接给出：

$$
\begin{aligned}
I_{B1}&=\frac{I_O}{2\beta_1}=\boxed{2.7778\,\mu\mathrm A},\\
I_{B2}&=\frac{I_O}{\beta_2}=\boxed{5.5556\,\mu\mathrm A},\\
I_{E3}&=I_{B1}+I_{B2}=\boxed{8.3333\,\mu\mathrm A},\\
I_{B3}&=\frac{I_{E3}}{\beta_3+1}=\boxed{0.1366\,\mu\mathrm A}.
\end{aligned}
$$

两个节点的电流检查：$I_{E3}=I_{B1}+I_{B2}$，$I_{\mathrm{REF}}=I_{C1}+I_{B3}$。

---

## 10.23 — Wilson 电流源的输出电阻

**适用条件：截图没有提供原书图 10.8。以下采用标准三管 Wilson 电流源：输出取自 $Q_3$ 集电极，参考支路为理想电流源，拓扑与本页 P10.21 的 Wilson 连接相同。若图 10.8 的参考支路或连接不同，需要重算。**

已知 $I_{\mathrm{REF}}=0.25\,\mathrm{mA}$，$\beta=100$，$V_A=100\,\mathrm V$，$V_{BE}(\mathrm{on})=0.7\,\mathrm V$。求输出电阻，以及输出电压增加 $5\,\mathrm V$ 时的电流变化。

### 从未知向下展开

$$
\begin{gathered}
\boxed{\Delta I_O\;?}\\[4pt]
\downarrow\\[4pt]
\Delta I_O\approx\frac{\Delta V_O}{R_{\mathrm{out}}}\\[4pt]
\downarrow\\[4pt]
\boxed{R_{\mathrm{out}}\;?}\approx\frac{\beta}{2}r_o\\[4pt]
\downarrow\\[4pt]
r_o\approx\frac{V_A}{I_C}\\[4pt]
\downarrow\\[4pt]
I_C\approx I_{\mathrm{REF}}\\[4pt]
\downarrow\\[4pt]
\boxed{I_{\mathrm{REF}}=0.25\,\mathrm{mA},\quad V_A=100\,\mathrm V}\\[4pt]
\boxed{\beta=100,\quad\Delta V_O=+5\,\mathrm V}
\end{gathered}
$$

这里 $R_{\mathrm{out}}\approx\beta r_o/2$ 是大 $\beta$、各管电流近似相等时的 Wilson 小信号近似，不能当成任意三管电路的通用公式。

### 向上代入

$$
r_o\approx\frac{100\,\mathrm V}{0.25\,\mathrm{mA}}
=400\,\mathrm{k}\Omega.
$$

$$
\boxed{R_{\mathrm{out}}\approx\frac{100}{2}(400\,\mathrm{k}\Omega)
=20\,\mathrm{M}\Omega}
$$

$$
\boxed{\Delta I_O\approx\frac{5\,\mathrm V}{20\,\mathrm{M}\Omega}
=+0.25\,\mu\mathrm A}
$$

相对变化约为 $0.25/250=0.001=0.1\%$。正号表示按输出电流流入 NPN 集电极的方向定义，输出电压升高时电流略增。

### 常用近似的来源：小信号节点关系

记 $x$ 为 $Q_3$ 基极电压，$y$ 为 $Q_3$ 发射极电压，$v$ 为输出测试电压。用相等的 $g_m$、$g_o=1/r_o$、$g_\pi=1/r_\pi=g_m/\beta$ 近似各管参数。理想参考电流源在小信号下开路。

参考节点：

$$
g_o x+g_m y+g_\pi(x-y)=0.
$$

公共基极节点：

$$
(2g_m+2g_o+3g_\pi)y-(g_m+g_\pi)x-g_o v=0.
$$

输出测试电流：

$$
i=g_o(v-y)+g_m(x-y),\qquad R_{\mathrm{out}}=v/i.
$$

令 $A=g_m/g_o$、$B=g_\pi/g_o=A/\beta$，消元得到该相等参数模型下的表达式：

$$
R_{\mathrm{out}}=r_o\,
\frac{A^2+2AB+2A+2B^2+5B+2}{2AB+A+2B^2+4B+1}.
$$

当 $A\gg\beta\gg1$，主导项之比约为 $A^2/(2AB)=\beta/2$。题中 $A\approx V_A/V_T\approx3846$（取 $V_T=26\,\mathrm{mV}$），满足常用近似条件。保留上式各项时约为 $19.95\,\mathrm{M}\Omega$；这仍是相等偏置参数模型，不是未提供电路图的精确大信号解。

$V_{BE}(\mathrm{on})=0.7\,\mathrm V$ 主要用于直流电位和工作区检查，不直接进入上述输出电阻主导项。电压变化估算要求管子保持放大区。

---

## 10.24 — Widlar 电流源

**截图未提供原书图 10.9。以下按标准 Widlar 连接：$R_1$ 从 $V^+$ 接到二极管连接的 $Q_1$，$Q_1$ 发射极接 $V^-$；$Q_2$ 基极接 $Q_1$ 基极，$Q_2$ 发射极经 $R_E$ 接 $V^-$。假设两管匹配，忽略 Early 效应。需要原图作最终核对。**

已知 $V^+=5\,\mathrm V$、$V^-=0$、$R_1=9.3\,\mathrm{k}\Omega$、$R_E=1.5\,\mathrm{k}\Omega$、$V_{BE1}=0.7\,\mathrm V$，忽略基极电流。主计算取 $V_T=26\,\mathrm{mV}$。

### 从未知向下展开

$$
\begin{gathered}
\boxed{V_{BE2}\;?}\\[4pt]
\downarrow\\[4pt]
V_{BE2}=V_{BE1}-I_OR_E\\[4pt]
\downarrow\\[4pt]
\boxed{I_O\;?}\\[4pt]
\downarrow\\[4pt]
I_OR_E=V_T\ln\!\left(\frac{I_{\mathrm{REF}}}{I_O}\right)\\[4pt]
\downarrow\\[4pt]
\boxed{I_{\mathrm{REF}}\;?}=\frac{V^+-V^- -V_{BE1}}{R_1}\\[4pt]
\downarrow\\[4pt]
\boxed{V^+=5\,\mathrm V,\ V^-=0,\ V_{BE1}=0.7\,\mathrm V,\ R_1=9.3\,\mathrm{k}\Omega}\\[4pt]
\boxed{R_E=1.5\,\mathrm{k}\Omega,\quad V_T=26\,\mathrm{mV}}
\end{gathered}
$$

### 中间的隐式方程从哪里来

同一基极电位，$Q_2$ 发射极比 $Q_1$ 高 $I_OR_E$，所以

$$
V_{BE1}-V_{BE2}=I_OR_E.
$$

匹配晶体管的指数模型给出

$$
\frac{I_{\mathrm{REF}}}{I_O}
=\frac{I_Se^{V_{BE1}/V_T}}{I_Se^{V_{BE2}/V_T}}
=e^{(V_{BE1}-V_{BE2})/V_T}.
$$

联立即得到依赖图中的方程。它包含待求量 $I_O$，因此这一层需要解方程，不能直接当作已知量代入。

### 展开成显式形式

令 $W_0(z)e^{W_0(z)}=z$，则

$$
\boxed{I_O=\frac{V_T}{R_E}
W_0\!\left(\frac{R_E}{V_T}\frac{V^+-V^- -V_{BE1}}{R_1}\right)}.
$$

不用 Lambert W 也可以在 $0<I_O<I_{\mathrm{REF}}$ 内用二分法求解。函数 $f(I)=IR_E-V_T\ln(I_{\mathrm{REF}}/I)$ 满足 $f'(I)=R_E+V_T/I>0$，因此正根唯一。

### 向上代入

$$
\boxed{I_{\mathrm{REF}}=\frac{4.3}{9300}\,\mathrm A=0.462366\,\mathrm{mA}}
$$

$$
1500I_O=0.026\ln\!\left(\frac{0.000462366}{I_O}\right)
\quad (I_O\text{ 用 A}).
$$

$$
\boxed{I_O=41.7010\,\mu\mathrm A},
\qquad
\boxed{V_{BE2}=0.7-1500I_O=0.637448\,\mathrm V}.
$$

若教材采用 $V_T=25\,\mathrm{mV}$，则 $I_O=40.5597\,\mu\mathrm A$、$V_{BE2}=0.639160\,\mathrm V$；参考电流不变。

---

## 10.25 — 输出管发射极带电阻

本次截图未完整显示图 P10.25；以下沿用已有笔记的标准 Widlar 连接，需原图最终核对：$Q_1$ 二极管连接且发射极接地；$Q_2$ 发射极经 $R_E$ 接地。忽略基极电流，$V_A=\infty$。

已知 $I_{\mathrm{REF}}=200\,\mu\mathrm A$、$R_E=500\,\Omega$。主计算取 $V_T=26\,\mathrm{mV}$。

(a) $I_{S1}=I_{S2}=5\times10^{-15}\,\mathrm A$。

(b) $I_{S1}=5\times10^{-15}\,\mathrm A$，$I_{S2}=7\times10^{-15}\,\mathrm A$。

### 从未知向下展开：两问共用

$$
\begin{gathered}
\boxed{V_{BE2}\;?}\\[4pt]
\downarrow\\[4pt]
V_{BE2}=V_{BE1}-I_OR_E\\[8pt]
\begin{array}{cc}
\downarrow&\downarrow\\[4pt]
\boxed{V_{BE1}\;?}&\boxed{I_O\;?}\\[6pt]
V_{BE1}=V_T\ln(I_{\mathrm{REF}}/I_{S1})
&I_OR_E=V_T\ln\!\left(\dfrac{I_{\mathrm{REF}}I_{S2}}{I_OI_{S1}}\right)\\[8pt]
\downarrow&\downarrow\\[4pt]
\boxed{I_{\mathrm{REF}},I_{S1},V_T}&\boxed{I_{\mathrm{REF}},I_{S1},I_{S2},R_E,V_T}
\end{array}
\end{gathered}
$$

右侧是需要数值求根的隐式方程。它来自

$$
I_O=I_{S2}e^{V_{BE2}/V_T},\qquad
I_{\mathrm{REF}}=I_{S1}e^{V_{BE1}/V_T},\qquad
V_{BE1}-V_{BE2}=I_OR_E.
$$

### 展开到只剩已知量

定义 $W_0(z)e^{W_0(z)}=z$，则

$$
\boxed{I_O=\frac{V_T}{R_E}
W_0\!\left(\frac{R_EI_{\mathrm{REF}}I_{S2}}{V_TI_{S1}}\right)}.
$$

$$
\boxed{V_{BE1}=V_T\ln\!\left(\frac{I_{\mathrm{REF}}}{I_{S1}}\right)},
\qquad
\boxed{V_{BE2}=V_{BE1}-I_OR_E}.
$$

### (a) 向上代入

$$
V_{BE1}=0.026\ln\!\left(\frac{200\times10^{-6}}{5\times10^{-15}}\right)
=\boxed{0.634716\,\mathrm V}.
$$

$$
500I_O=0.026\ln\!\left(\frac{200\times10^{-6}}{I_O}\right)
\quad (I_O\text{ 用 A}).
$$

$$
\boxed{I_O=61.4039\,\mu\mathrm A},
\qquad
\boxed{V_{BE2}=0.604014\,\mathrm V}.
$$

### (b) 向上代入

$I_{\mathrm{REF}}$ 与 $I_{S1}$ 不变，所以 $V_{BE1}$ 不变。电流方程变为

$$
500I_O=0.026\ln\!\left(\frac{280\times10^{-6}}{I_O}\right).
$$

$$
\boxed{I_O=71.2020\,\mu\mathrm A},\qquad
\boxed{V_{BE1}=0.634716\,\mathrm V},\qquad
\boxed{V_{BE2}=0.599115\,\mathrm V}.
$$

$I_{S2}$ 增大后电流增大，但电阻压降也增大，使 $V_{BE2}$ 降低。因此输出电流并不会直接变成 (a) 的 1.4 倍。

### 温度约定对照

| 热电压 | 情形 | $V_{BE1}$ (V) | $V_{BE2}$ (V) | $I_O$ (μA) |
|---|---|---:|---:|---:|
| 26 mV | (a) | 0.634716 | 0.604014 | 61.4039 |
| 26 mV | (b) | 0.634716 | 0.599115 | 71.2020 |
| 25 mV | (a) | 0.610304 | 0.580249 | 60.1084 |
| 25 mV | (b) | 0.610304 | 0.575503 | 69.6007 |

### 可复算代码：不用额外 Python 库

```python
from math import log

VT, Iref, RE, Is1 = 0.026, 200e-6, 500.0, 5e-15
for Is2 in (5e-15, 7e-15):
    target = Iref * Is2 / Is1
    lo, hi = 0.0, target
    for _ in range(100):
        mid = (lo + hi) / 2
        f = mid * RE - VT * log(target / mid)
        if f > 0:
            hi = mid
        else:
            lo = mid
    Io = (lo + hi) / 2
    Vbe1 = VT * log(Iref / Is1)
    Vbe2 = Vbe1 - Io * RE
    print(Is2, Vbe1, Vbe2, Io * 1e6)
```
