---
title: "Why Are Quotient Groups and Quotient Spaces Both Called Quotients?"
original_title: "商群和商空间为什么都叫“商”(Quotient)，(我看不出联系)?"
source: "https://www.zhihu.com/question/528662103/answer/2076943105635491874"
---

# Why Are Quotient Groups and Quotient Spaces Both Called Quotients?

> **Original Chinese title:** 商群和商空间为什么都叫“商”(Quotient)，(我看不出联系)?  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/528662103/answer/2076943105635491874)

The word **quotient** is fundamentally about an equivalence relation, not specifically about groups or vector spaces.

A familiar elementary example is fractions. We identify

\[
\frac24,\qquad
\frac48,\qquad
\frac36
\]

because the pairs \((a,b)\) and \((c,d)\) are declared equivalent when

\[
ad=bc.
\]

A quotient set is formed by replacing individual elements with their equivalence classes.

Only after extra algebraic structure is present do we obtain a **quotient group**, **quotient vector space**, and so on.

## Quotient vector spaces

Suppose

\[
V=\mathbb R^2,
\qquad
U=\text{the \(x\)-axis}.
\]

In the quotient \(V/U\), two vectors are considered equivalent if they differ by an element of \(U\). Thus all points with the same \(y\)-coordinate lie in the same coset.

The quotient is therefore naturally isomorphic to a one-dimensional vector space, such as the \(y\)-axis:

\[
V/U \cong \mathbb R.
\]

But the quotient is not literally “the old \(y\)-axis sitting inside \(V\).” It is a new set of equivalence classes equipped with induced operations.

## Quotient groups

Similarly, consider the homomorphism

\[
\mathbb Z\longrightarrow \mathbb Z/2\mathbb Z.
\]

Its kernel is

\[
2\mathbb Z.
\]

The first isomorphism theorem gives

\[
\boxed{
\mathbb Z/\ker f
\cong
\operatorname{im} f.
}
\]

This is what the standard diagram expresses:

\[
\begin{array}{ccc}
G & \xrightarrow{f} & \operatorname{im}f\\
\downarrow \pi && \uparrow \cong\\
G/\ker f &&
\end{array}
\]

So “quotient” always means the same conceptual move:

\[
\boxed{
\text{identify elements that differ only by something we choose to ignore}.
}
\]
