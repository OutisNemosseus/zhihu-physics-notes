---
title: "A Simple Way to Understand Quantum Degeneracy"
original_title: "请问如何通俗的去理解量子力学中简并(Degeneracy)这个概念？"
source: "https://www.zhihu.com/question/478538260/answer/2069557656998753787"
---

# A Simple Way to Understand Quantum Degeneracy

> **Original Chinese title:** 请问如何通俗的去理解量子力学中简并(Degeneracy)这个概念？  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/478538260/answer/2069557656998753787)

For a spin-\(\tfrac12\) electron, degeneracy is very simple in matrix language:

\[
\boxed{
\text{the same eigenvalue corresponds to more than one linearly independent eigenvector}.
}
\]

Choose the basis

\[
|\uparrow\rangle
=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
|\downarrow\rangle
=
\begin{pmatrix}
0\\
1
\end{pmatrix}.
\]

## 1. No magnetic field: twofold degeneracy

Suppose both spin states have the same energy \(E_0\). Then

\[
H_0
=
\begin{pmatrix}
E_0&0\\
0&E_0
\end{pmatrix}
=
E_0 I.
\]

The characteristic equation is

\[
\det(H_0-EI)
=
(E_0-E)^2
=
0.
\]

There is only one energy eigenvalue,

\[
E=E_0,
\]

but it has two linearly independent eigenstates:

\[
H_0|\uparrow\rangle
=
E_0|\uparrow\rangle,
\]

\[
H_0|\downarrow\rangle
=
E_0|\downarrow\rangle.
\]

In fact, every linear combination

\[
|\psi\rangle
=
a|\uparrow\rangle
+
b|\downarrow\rangle
\]

also satisfies

\[
H_0|\psi\rangle
=
E_0|\psi\rangle.
\]

Therefore

\[
\ker(H_0-E_0I)
=
\mathbb C^2,
\]

which has dimension \(2\).

So \(E_0\) is **twofold degenerate**.

## 2. Add a magnetic field: Zeeman splitting

Apply a magnetic field in the \(z\)-direction:

\[
\mathbf B
=
B\hat{\mathbf z}.
\]

Using a common sign convention, the Zeeman term can be written

\[
H_Z
=
\frac12 g\mu_BB\,\sigma_z,
\]

with

\[
\sigma_z
=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}.
\]

Therefore

\[
H_Z
=
\begin{pmatrix}
\frac12g\mu_BB&0\\
0&-\frac12g\mu_BB
\end{pmatrix}.
\]

The total Hamiltonian becomes

\[
H
=
H_0+H_Z
=
\begin{pmatrix}
E_0+\frac12g\mu_BB&0\\
0&E_0-\frac12g\mu_BB
\end{pmatrix}.
\]

The two energies are now

\[
E_\uparrow
=
E_0+\frac12g\mu_BB,
\]

\[
E_\downarrow
=
E_0-\frac12g\mu_BB.
\]

Their separation is

\[
\boxed{
\Delta E
=
g\mu_BB.
}
\]

Thus a single degenerate energy level splits into two distinct levels. This is **Zeeman splitting**.

The sign convention depends on how the magnetic moment is defined, but the central idea is unchanged: an external perturbation can lift a degeneracy.
