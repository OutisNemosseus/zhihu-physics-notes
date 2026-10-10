---
title: "Lathi 2.3-1：特征模态与冲激响应 · SymPy / WASM"
---

# Lathi 2.3-1：特征模态与冲激响应

**(a)–(c) 完整解析 · 可编辑 SymPy · 浏览器内 WebAssembly 运算**

[返回 20 题原题页](lathi-20-exercises.md#exercise-2-3-1) · [跳到在线运行器](#sympy-wasm) · [下载 Python 源码](../../assets/python/lathi-2-3-1.py){ download }

!!! note "解题约定"
    以下求**因果、初始静止（零状态）**系统的冲激响应。\(D=d/dt\)，\(u(t)\) 为单位阶跃，\(\delta(t)\) 为单位冲激。只有微分方程而不指定因果性或边界条件，不能唯一确定双边冲激响应。所有最终 \(h(t)\) 都用实数项表示。

## 先看答案

| 小题 | 特征方程 | 一组实特征模态 | 因果冲激响应 \(h(t)\) |
| --- | --- | --- | --- |
| (a) | \(\lambda^2+1=0\) | \(\cos t,\ \sin t\) | \(2\cos t\,u(t)\) |
| (b) | \(\lambda(\lambda^2+1)=0\) | \(1,\ \cos t,\ \sin t\) | \(2\delta(t)+(1-\cos t-2\sin t)u(t)\) |
| (c) | \((\lambda+1)^2+4=0\) | \(e^{-t}\cos2t,\ e^{-t}\sin2t\) | \(4e^{-t}\sin2t\,u(t)\) |

!!! warning "(b) 的直接通路不能丢"
    \(H_b(s)\) 的多项式部分为 \(2\)，对应 \(2\delta(t)\)。它表示面积（权重）为 2 的冲激，不是有限高度的点。只画 \(t>0\) 的数值曲线会漏掉它，也不能据此验证完整冲激响应。

## 通用方法

把方程写成

\[
Q(D)y=P(D)x.
\]

1. 令输入为零，得到齐次方程 \(Q(D)y_n=0\)；特征方程是 \(Q(\lambda)=0\)
2. 根 \(\alpha\pm j\beta\) 的复指数模态为 \(e^{(\alpha\pm j\beta)t}\)，等价的实基底为 \(e^{\alpha t}\cos\beta t\)、\(e^{\alpha t}\sin\beta t\)
3. 在因果、初始静止条件下，\(H(s)=Y(s)/X(s)=P(s)/Q(s)\)，再作逆 Laplace 变换
4. 分子次数不小于分母时，**先作多项式除法**；常数项对应 \(\delta(t)\)，\(s^k\) 对应 \(\delta^{(k)}(t)\)

模态描述的是自然响应的基底。自然响应中的 \(C_1,C_2,\ldots\) 是任意常数；冲激响应的特定系数由输入算子 \(P(D)\) 与因果条件确定。

## (a) 二阶无阻尼系统

\[
(D^2+1)y(t)=2Dx(t).
\]

特征方程与根为

\[
\lambda^2+1=0,\qquad \lambda=\pm j.
\]

复模态为 \(e^{jt},e^{-jt}\)；实模态为 \(\cos t,\sin t\)。故

\[
y_n(t)=C_1\cos t+C_2\sin t.
\]

零状态传递函数为

\[
H_a(s)=\frac{2s}{s^2+1}.
\]

利用 \(\mathcal L\{\cos t\,u(t)\}=s/(s^2+1)\)：

\[
\boxed{h_a(t)=2\cos t\,u(t).}
\]

因果 ROC 为 \(\operatorname{Re}s>0\)。分布核对：令 \(f=2\cos t\)，有 \(f(0)=2,f'(0)=0\)，故

\[
(D^2+1)(fu)=(f''+f)u+f'(0)\delta+f(0)\delta'=2\delta'.
\]

这正是把 \(x=\delta\) 代入原方程的右端。

## (b) 三阶系统与直接通路

\[
(D^3+D)y(t)=(2D^3+1)x(t).
\]

特征方程与根为

\[
\lambda(\lambda^2+1)=0,\qquad \lambda=0,\pm j.
\]

复模态为 \(1,e^{jt},e^{-jt}\)；一组实模态为 \(1,\cos t,\sin t\)，自然响应为

\[
y_n(t)=C_1+C_2\cos t+C_3\sin t.
\]

先除法，再部分分式分解：

\[
\begin{aligned}
H_b(s)&=\frac{2s^3+1}{s(s^2+1)}\\
&=2+\frac{1-2s}{s(s^2+1)}\\
&=2+\frac1s-\frac{s}{s^2+1}-\frac2{s^2+1}.
\end{aligned}
\]

逐项作逆变换：

\[
\boxed{h_b(t)=2\delta(t)+\bigl(1-\cos t-2\sin t\bigr)u(t).}
\]

因果 ROC 为 \(\operatorname{Re}s>0\)。\(\lim_{s\to+\infty}H_b(s)=2\) 也验证了直接通路系数。

### 为什么仅检查 \(t>0\) 不够？

设 \(f=1-\cos t-2\sin t\)，则

\[
f(0)=0,\quad f'(0)=-2,\quad f''(0)=1,\quad f'''+f'=0.
\]

按分布导数计算，

\[
(D^3+D)(fu)=-2\delta'+\delta,
\]

而直接通路贡献

\[
(D^3+D)(2\delta)=2\delta'''+2\delta'.
\]

两者相加才得到

\[
(D^3+D)h_b=2\delta'''+\delta=(2D^3+1)\delta.
\]

漏掉 \(2\delta\) 时，普通区域的齐次方程仍成立，但原点处的分布方程是错的。

## (c) 阻尼振荡系统

\[
y''(t)+2y'(t)+5y(t)=8x(t).
\]

完成平方得到

\[
\lambda^2+2\lambda+5=(\lambda+1)^2+4=0,\qquad \lambda=-1\pm2j.
\]

复模态为 \(e^{(-1+2j)t},e^{(-1-2j)t}\)；实模态为 \(e^{-t}\cos2t,e^{-t}\sin2t\)。自然响应为

\[
y_n(t)=e^{-t}(C_1\cos2t+C_2\sin2t).
\]

传递函数为

\[
H_c(s)=\frac8{(s+1)^2+4}
=4\frac2{(s+1)^2+2^2}.
\]

所以

\[
\boxed{h_c(t)=4e^{-t}\sin(2t)\,u(t).}
\]

因果 ROC 为 \(\operatorname{Re}s>-1\)。令 \(f=4e^{-t}\sin2t\)，则 \(f(0)=0,f'(0)=8\) 且 \(f''+2f'+5f=0\)，所以

\[
(D^2+2D+5)(fu)=8\delta.
\]

## 在线 SymPy / WASM {#sympy-wasm}

点击“加载并运行”。Python 与 SymPy 在下方 iframe 内的 Web Worker 中运行，不需要服务器计算或 API 密钥。首次会从 Pyodide 官方文档指定的 jsDelivr 发行地址下载 **Pyodide 0.27.7** 及该发行版附带的 SymPy；下载速度取决于网络。

可编辑代码、重复运行、停止运算或恢复示例。**静态答案与推导无需等待运行时下载。** 加载超过 120 秒、计算超过 30 秒会自动停止；网络恢复后可重试。代码不会自动保存，请自行下载需要保留的版本。

[单独打开运行器](../../tools/lathi-2-3-1-sympy.html){ .md-button target="_blank" rel="noopener" } [下载示例 .py](../../assets/python/lathi-2-3-1.py){ .md-button download }

<iframe src="../../../tools/lathi-2-3-1-sympy.html" title="Lathi 2.3-1 SymPy WebAssembly 可编辑运行器" sandbox="allow-scripts" loading="lazy" style="width:100%;height:1100px;border:1px solid #7b8caa;border-radius:12px;background:#101827;"></iframe>

### 代码怎样避免把冲激项误消掉？

- 使用 `t = symbols('t', real=True)`，**不把完整分布中的 t 声明为 positive**，避免 \(\delta(t)\) 被化为零
- 先用 `div(P, Q, s)` 拆分多项式部分，显式构造 \(\delta\) 及其导数
- 只对严格真分式部分在正时间变量上作逆变换，再乘 \(u(t)\)
- 核对每个模态、正 Laplace 变换、\(t>0\) 残差，以及原点处每阶 \(\delta^{(k)}\) 的系数
- 预置代码通过时会显示 `ALL 3 CASES PASSED`；修改系统后也要同步修改预期答案，否则断言会提醒你答案已不一致

代码打印的 `I` 是 SymPy 的虚数单位，仅出现在特征根中；最终 `h(t)` 没有虚数项。`Heaviside(t)` 与 `DiracDelta(t)` 分别代表 \(u(t)\)、\(\delta(t)\)。\(u(0)\) 的单点取值不影响这里的分布等式。

## 来源与相关笔记

- 题目：Lathi & Green，*Linear Systems and Signals*，第三版，习题 2.3-1，印刷页 224–225；按本次截图的 (a)–(c) 核对，[查看原题](lathi-20-exercises.md#exercise-2-3-1)
- [Pyodide 0.27.7：浏览器运行 Python](https://pyodide.org/en/0.27.7/usage/quickstart.html) · [官方 Web Worker 用法](https://pyodide.org/en/0.27.7/usage/webworker.html)
- [Boulet 3.1：分布求导与直接通路](3-1.md) · [3.10：多项式除法与冲激](3-10.md) · [3.12：衰减正弦核](3-12.md)
