---
title: "What Is the Essence of Linearity?"
original_title: "线性代数的本质是什么，它的线性体现在哪？"
source: "https://www.zhihu.com/question/1891180217566987851/answer/2079070986704524549"
---

# What Is the Essence of Linearity?

> **Original Chinese title:** 线性代数的本质是什么，它的线性体现在哪？  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/1891180217566987851/answer/2079070986704524549)

The basic idea is that when vectors in a vector space \(V\) are mapped into another vector space \(W\), the operations we already know—vector addition and scalar multiplication—should be preserved.

For addition, a linear map \(T:V\to W\) satisfies

\[
\boxed{
T(u+v)=T(u)+T(v)
}
\]

This can be represented by the commutative diagram

\[
\begin{array}{ccc}
V\times V & \xrightarrow{+_V} & V\\
\downarrow {T\times T} && \downarrow T\\
W\times W & \xrightarrow{+_W} & W .
\end{array}
\]

The point of saying that the diagram **commutes** is that the result is the same whichever route we take.

Going across the top and then down gives

\[
(u,v)
\longmapsto
u+v
\longmapsto
T(u+v).
\]

Going down first and then across gives

\[
(u,v)
\longmapsto
(T(u),T(v))
\longmapsto
T(u)+T(v).
\]

Commutativity is exactly the statement that these are equal.

Scalar multiplication is handled in the same way:

\[
T(\lambda v)=\lambda T(v).
\]

If \(T\) preserves the relevant structure and is also a bijection between \(V\) and \(W\), then it is an **isomorphism**.

This point of view suggests a more general way to think about algebra: a “good” map is one that preserves whatever operations or relations define the structure.

That naturally leads to further questions. What if a map is additive but not homogeneous? What if it is homogeneous but not additive? What if a diagram commutes only on a particular subspace of \(W\)? What kind of matrix-like representation should such maps have?

Those questions move beyond ordinary linear algebra and toward the general study of structure-preserving maps.
