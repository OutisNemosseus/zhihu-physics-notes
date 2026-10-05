# Boulet × Osgood：第 1–3 章的算子与交换图

这组讲解把 Boulet 的十二道习题与 Osgood 的卷积、分布、正交投影和 LTI 算子观点联系起来。每题保留完整计算、成立条件和核对方法。题意采用重述，图由公式重新绘制；交换图是根据 Osgood 的算子关系制作的学习图。

## 按章节阅读

| 章节 | 题目 | 核心操作 |
| --- | --- | --- |
| 1 | [1.2](1-2.md)、[1.5](1-5.md)、[1.10](1-10.md) | 平移与系统能否交换；反射与正交投影 |
| 2 | [2.2](2-2.md)、[2.6](2-6.md)、[2.8](2-8.md)、[2.10](2-10.md) | 基本阶跃响应、平移组合、串联与并联 |
| 3 | [3.1](3-1.md)、[3.2](3-2.md)、[3.6](3-6.md)、[3.10](3-10.md)、[3.12](3-12.md) | 因果逆算子、微分与卷积、直接通路、被消去的模态 |

## 共用符号

定义

\[
D=\frac{d}{dt},\qquad (\tau_bx)(t)=x(t-b),\qquad
(Rx)(t)=x(-t),\qquad C_hx=h*x.
\]

离散时间的平移写成 \((\tau_Nx)[n]=x[n-N]\)。算子乘积按从右到左执行：\(ABx=A(Bx)\)。\(I\) 是恒等算子，\(u\) 是单位阶跃。

## 三张可以复用的交换图

### 系统与平移

\[
\begin{array}{ccc}
x & \xrightarrow{S} & Sx\\
{\scriptstyle\tau_b}\downarrow && \downarrow{\scriptstyle\tau_b}\\
\tau_bx & \xrightarrow{S} & S\tau_bx
\end{array}
\]

上右下路径得到 \(\tau_bSx\)，左下右路径得到 \(S\tau_bx\)。**对所有允许的输入与平移，两条路径相等，才叫时不变。** 若不相等，这张图就是显示失败位置的比较图。

### 时域与频域

Osgood 的 Fourier 约定是

\[
X(\nu)=\int_{-\infty}^{\infty}x(t)e^{-2\pi i\nu t}\,dt.
\]

\[
\begin{array}{ccc}
x & \xrightarrow{C_h} & y\\
{\scriptstyle\mathcal F}\downarrow && \downarrow{\scriptstyle\mathcal F}\\
X & \xrightarrow{M_H} & Y
\end{array}
\qquad M_HX=HX.
\]

这张图表达 \(\mathcal FC_h=M_H\mathcal F\)。时域卷积变成频域逐点乘法，时域微分变成乘以 \(2\pi i\nu\)。工程角频率为 \(\omega=2\pi\nu\)。

### 微分与卷积

\[
\begin{array}{ccc}
x & \xrightarrow{C_g} & g*x\\
{\scriptstyle D}\downarrow && \downarrow{\scriptstyle D}\\
Dx & \xrightarrow{C_g} & g*Dx
\end{array}
\]

对这里使用的因果分布，卷积和微分满足

\[
D(g*x)=(Dg)*x=g*(Dx).
\]

**这是三个相等的表达式，不是三个项相加的乘积求导法则。**

## 两个最常用的计算模块

\[
g_a(t)=e^{-at}u(t),\qquad (D+a)g_a=\delta,
\]

\[
q_a(t)=(g_a*u)(t)=\frac{1-e^{-at}}{a}u(t),\qquad a>0.
\]

任何阶跃的平移组合，都可以把 \(u\) 换成 \(q_a\) 后做相同平移组合。尤其 [2.2](2-2.md)、[2.6](2-6.md)、[2.8](2-8.md) 共用 \(a=1\) 的模块。

## 因果条件为什么不能省略

微分方程 \(A(D)y=B(D)x\) 需要指定解的选择。这里第 3 章采用因果零状态响应：输入为零的过去，系统处于静止。符号 \((D+a)^{-1}\) 在这些页面中表示这个**因果逆算子**，即与 \(g_a\) 卷积。

Laplace 变量 \(s\) 与 Fourier 频率 \(\nu\) 分开使用。满足收敛条件时可以令 \(s=2\pi i\nu\)；不稳定的因果响应不一定有普通 Fourier 变换。Osgood §3.5.1 的双边 Green 函数例子也不能直接代替因果初值问题。

若 \(h=c\delta+k\) 且 \(k\in L^1\)，则

\[
\|h*x\|_\infty\le (|c|+\|k\|_1)\|x\|_\infty.
\]

因此直接通路的 \(\delta\) 可以是 BIBO 稳定的；\(\delta'\) 对应微分器，性质不同。[3.6](3-6.md) 另外说明：零状态输入输出稳定与原方程自然响应稳定必须区分。

## 教材阅读地图

以下均为印刷页码，不是 PDF 阅读器的页序。

| 观点 | Osgood 对应章节与页码 |
| --- | --- |
| 内积、正交与平方可积函数 | §1.7，pp.42–59 |
| 平移、反射、尺度与 Fourier 性质 | §2.3，pp.118–134 |
| 卷积的几何与代数 | §§3.1–3.3，pp.159–169 |
| 微分多项式变成频域乘法 | §3.5，尤其 pp.174–175 |
| 分布、冲激与分布导数 | §§4.5–4.6，pp.268–291 |
| 系统串联与冲激响应 | §§8.4–8.5，pp.492–498 |
| 与平移交换的 LTI 系统 | §8.6，pp.499–503，尤其 pp.501–502 |
| Fourier 表示与指数特征函数 | §8.7，pp.504–508 |
| 因果性 | §8.8，pp.509–511 |

**资料**：Benoit Boulet, *Fundamentals of Signals and Systems*, Chapters 1–3；Brad G. Osgood, *Lectures on the Fourier Transform and Its Applications*, AMS, 2019。这里的跨书应用与交换图是独立推导，不表示 Osgood 原书解过这些 Boulet 习题。
