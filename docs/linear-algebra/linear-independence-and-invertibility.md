---
title: "Why Do Linearly Independent Columns Make a Square Matrix Invertible?"
original_title: "为什么列向量线性无关矩阵就是可逆的?"
source: "https://www.zhihu.com/question/7212885662/answer/2068110027387310389"
---

# Why Do Linearly Independent Columns Make a Square Matrix Invertible?

> **Original Chinese title:** 为什么列向量线性无关矩阵就是可逆的?  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/7212885662/answer/2068110027387310389)

For a square matrix, invertibility is equivalent to the associated linear map being both injective and surjective.

Let

\[
A:\mathbb R^n\to\mathbb R^n.
\]

If the columns of \(A\) are linearly independent, then

\[
\operatorname{rank}(A)=n.
\]

Therefore the columns span all of \(\mathbb R^n\), so the map is surjective.

By the rank-nullity theorem,

\[
\operatorname{rank}(A)
+
\operatorname{nullity}(A)
=
n.
\]

Since \(\operatorname{rank}(A)=n\),

\[
\operatorname{nullity}(A)=0.
\]

Hence

\[
\ker(A)=\{0\},
\]

which means the map is injective.

Therefore, for a square matrix,

\[
\boxed{
\ker(A)=\{0\}
\Longleftrightarrow
\text{columns are linearly independent}
\Longleftrightarrow
\operatorname{rank}(A)=n
\Longleftrightarrow
A\text{ is invertible}.
}
\]

The statement is special to square matrices.

For example,

\[
A=
\begin{pmatrix}
0\\
1
\end{pmatrix}
\]

defines a map

\[
\mathbb R\to\mathbb R^2.
\]

Its single column is linearly independent, so the map is injective, but it is not surjective. Therefore it is not invertible as a map from \(\mathbb R\) onto \(\mathbb R^2\).
