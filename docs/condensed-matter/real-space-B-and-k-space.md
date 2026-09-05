---
title: "Why Can We Compare a Real-Space Magnetic Field B with a Reciprocal-Space k?"
original_title: "半导体物理回旋共振实验中，为什么可以直接讨论实空间的磁场B与倒空间的k的夹角？"
source: "https://www.zhihu.com/question/667888891/answer/2072273391080550472"
---

# Why Can We Compare a Real-Space Magnetic Field \(B\) with a Reciprocal-Space \(k\)?

> **Original Chinese title:** 半导体物理回旋共振实验中，为什么可以直接讨论实空间的磁场B与倒空间的k的夹角？  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/667888891/answer/2072273391080550472)

Crystal momentum only becomes meaningful because the crystal has translational periodicity.

The lattice potential satisfies

\[
\boxed{
V(\mathbf r+\mathbf R)=V(\mathbf r),
}
\]

where \(\mathbf R\) is a lattice translation vector.

The electron obeys the Schrödinger equation

\[
\left[
-\frac{\hbar^2}{2m}\nabla^2
+
V(\mathbf r)
\right]
\psi(\mathbf r)
=
E\psi(\mathbf r).
\]

The combination of the Schrödinger equation and lattice translational symmetry gives Bloch states and the band relation

\[
\boxed{
E_n(\mathbf k).
}
\]

The label \(\mathbf k\) classifies Bloch eigenstates according to the phase they acquire under lattice translation.

Reciprocal space is therefore not an unrelated “imaginary space.” Its basis is constructed from the real-space lattice, and the components of \(\mathbf k\) retain a definite geometric relationship to the crystal axes.

That is why one can meaningfully discuss the orientation of a real-space magnetic field \(\mathbf B\) relative to crystal-momentum directions such as \(\mathbf k\), especially when the band structure is anisotropic.

A useful analogy is interference: a phase difference is not itself a physical distance, but the geometry of the underlying real-space setup determines how phase changes with displacement.
