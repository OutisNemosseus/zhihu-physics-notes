---
title: "Why Can We Compare a Real-Space Magnetic Field B with a Reciprocal-Space k?"
original_title: "半导体物理回旋共振实验中，为什么可以直接讨论实空间的磁场B与倒空间的k的夹角？"
source: "https://www.zhihu.com/question/667888891/answer/2072273391080550472"
---

# Why Can We Compare a Real-Space Magnetic Field \(B\) with a Reciprocal-Space \(k\)?

> **Original Chinese title:** 半导体物理回旋共振实验中，为什么可以直接讨论实空间的磁场B与倒空间的k的夹角？  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/667888891/answer/2072273391080550472)

Momentum space in this sense can be discussed only when a crystal has a periodic structure. The relation \(E(\mathbf k)\) comes jointly from the Schrödinger equation and the periodicity of the crystal itself—hence the term *periodic potential*.

An electron without this periodic environment cannot be classified by a Bloch wave vector \(\mathbf k\). Here, \(\mathbf k\)-space classifies eigenfunctions according to the phase they acquire after translation by one crystal period: eigenfunctions with the same phase change belong to the same class.

The definition of a reciprocal-lattice basis is, in fact, similar to double-slit interference. After light passes through two slits, maxima and minima appear. At each maximum, the phase differs from the initial wave by an integer number of cycles. However, although adjacent maxima differ by a phase cycle, their physical separation is not one slit spacing \(D\). For plane waves, the two quantities are related proportionally through the wave vector.

!!! note
    The formulas and extended explanation below were generated with AI assistance. Neither the preceding nor the following discussion is guaranteed to be completely correct.

Atoms in a crystal are arranged periodically, so the potential experienced by an electron satisfies

\[
V(\mathbf r+\mathbf R)=V(\mathbf r),
\]

where \(\mathbf R\) is any lattice translation vector. The electron satisfies

\[
\left[
-\frac{\hbar^2}{2m}\nabla^2+V(\mathbf r)
\right]\psi(\mathbf r)
=E\psi(\mathbf r).
\]

The term *periodic potential* means precisely that \(V(\mathbf r)\) repeats after translation by one lattice period.

It is the combination

\[
\boxed{
\text{Schrödinger equation}
+
\text{crystal translational periodicity}
}
\]

that gives crystal-electron states their Bloch form and ultimately produces the band relation

\[
E_n(\mathbf k).
\]

## 1. Why can crystal-electron states be classified by \(\mathbf k\)?

After translation by a lattice vector \(\mathbf R\), the Hamiltonian is unchanged. Therefore the lattice translation operator \(\hat T_{\mathbf R}\) commutes with the Hamiltonian:

\[
[\hat H,\hat T_{\mathbf R}]=0.
\]

We can therefore choose simultaneous eigenstates satisfying

\[
\hat H\psi_{n\mathbf k}=E_n(\mathbf k)\psi_{n\mathbf k}
\]

and

\[
\hat T_{\mathbf R}\psi_{n\mathbf k}
=e^{i\mathbf k\cdot\mathbf R}\psi_{n\mathbf k}.
\]

Equivalently,

\[
\psi_{n\mathbf k}(\mathbf r+\mathbf R)
=e^{i\mathbf k\cdot\mathbf R}\psi_{n\mathbf k}(\mathbf r).
\]

The meaning of the Bloch wave vector \(\mathbf k\) is therefore not that the wavefunction contains only one ordinary plane wave. Rather, \(\mathbf k\) labels the rule governing how the wavefunction's phase changes under a lattice translation.

The phase gained is

\[
\Delta\phi=\mathbf k\cdot\mathbf R.
\]

If two different eigenfunctions are both multiplied by the same factor

\[
e^{i\mathbf k\cdot\mathbf R}
\]

when translated by the same lattice vector, they have the same Bloch \(\mathbf k\). They may still be different eigenstates, so an additional band index \(n\) is required:

\[
\psi_{n\mathbf k},
\qquad
E_n(\mathbf k).
\]

Consequently, several energies can exist at the same \(\mathbf k\):

\[
E_1(\mathbf k),\ E_2(\mathbf k),\ E_3(\mathbf k),\ldots
\]

These are the multiple energy bands.

## 2. Why is Bloch \(\mathbf k\) not simply the ordinary momentum of one electron?

A Bloch eigenstate generally contains many ordinary Fourier wave vectors. Bloch's theorem gives

\[
\psi_{n\mathbf k}(\mathbf r)
=e^{i\mathbf k\cdot\mathbf r}u_{n\mathbf k}(\mathbf r),
\]

where

\[
u_{n\mathbf k}(\mathbf r+\mathbf R)
=u_{n\mathbf k}(\mathbf r).
\]

Because \(u_{n\mathbf k}\) is periodic, it can be expanded as a Fourier series:

\[
u_{n\mathbf k}(\mathbf r)
=\sum_{\mathbf G}c_{n,\mathbf k+\mathbf G}
e^{i\mathbf G\cdot\mathbf r}.
\]

Therefore

\[
\psi_{n\mathbf k}(\mathbf r)
=\sum_{\mathbf G}c_{n,\mathbf k+\mathbf G}
e^{i(\mathbf k+\mathbf G)\cdot\mathbf r}.
\]

A single Bloch state can thus contain many ordinary plane-wave components,

\[
\mathbf k+\mathbf G.
\]

The Bloch vector \(\mathbf k\) is the lattice-translation phase label shared by these components.

## 3. Why does the reciprocal lattice appear?

Consider the lattice itself. A real-space lattice translation is

\[
\mathbf R=n_1\mathbf a_1+n_2\mathbf a_2+n_3\mathbf a_3.
\]

We seek special spatial wave vectors \(\mathbf G\) for which translation by any lattice vector advances the phase by an integer number of complete cycles:

\[
e^{i\mathbf G\cdot\mathbf R}=1.
\]

Equivalently,

\[
\mathbf G\cdot\mathbf R=2\pi m,
\qquad m\in\mathbb Z.
\]

All \(\mathbf G\) satisfying this condition form the reciprocal lattice.

In one dimension, if the lattice period is \(a\), then

\[
R=na
\]

and

\[
G_m=\frac{2\pi m}{a}.
\]

The smallest nonzero reciprocal-lattice vector is therefore

\[
G=\frac{2\pi}{a}.
\]

A reciprocal-lattice vector is neither a position nor a phase. It is a spatial wave vector with units

\[
[G]=\mathrm{length}^{-1}.
\]

The actual phase is

\[
\mathbf G\cdot\mathbf R.
\]

## 4. Why are \(\mathbf k\) and \(\mathbf k+\mathbf G\) equivalent?

After translating a Bloch wavefunction by \(\mathbf R\), we obtain

\[
\psi_{n\mathbf k}(\mathbf r+\mathbf R)
=e^{i\mathbf k\cdot\mathbf R}\psi_{n\mathbf k}(\mathbf r).
\]

If the Bloch wave vector is changed to

\[
\mathbf k'=\mathbf k+\mathbf G,
\]

the translation phase becomes

\[
e^{i(\mathbf k+\mathbf G)\cdot\mathbf R}
=e^{i\mathbf k\cdot\mathbf R}e^{i\mathbf G\cdot\mathbf R}.
\]

The definition of a reciprocal-lattice vector guarantees that

\[
e^{i\mathbf G\cdot\mathbf R}=1.
\]

Hence

\[
e^{i(\mathbf k+\mathbf G)\cdot\mathbf R}
=e^{i\mathbf k\cdot\mathbf R}.
\]

From the perspective of lattice translational symmetry,

\[
\boxed{\mathbf k\sim\mathbf k+\mathbf G.}
\]

This is why one Brillouin zone is sufficient to represent the inequivalent Bloch wave vectors.

## 5. Connection with double-slit interference

The reciprocal-lattice phase condition and double-slit interference share the same mathematical core.

Let the slit separation be \(\mathbf D\). For an observation direction corresponding to outgoing wave vector \(\mathbf k\), the phase difference between waves from the two slits is

\[
\Delta\phi=\mathbf k\cdot\mathbf D.
\]

In the standard double-slit geometry, this may also be written as

\[
\Delta\phi=\frac{2\pi}{\lambda}D\sin\theta.
\]

When

\[
\Delta\phi=2\pi m,
\]

the two paths differ by an integer number of wavelengths, producing constructive interference and a bright fringe.

The reciprocal-lattice condition is

\[
\mathbf G\cdot\mathbf R=2\pi m.
\]

The essential common structure is therefore

\[
\boxed{
\text{wave vector}
\times
\text{spatial displacement}
=
\text{phase difference}.
}
\]

In the double-slit experiment, \(\mathbf D\) is the displacement between the slits. In a crystal, \(\mathbf R\) is the displacement between equivalent unit cells.

The double-slit problem seeks observation directions that make the two waves arrive in phase. The reciprocal lattice collects the special wave vectors \(\mathbf G\) for which lattice translations produce an integer multiple of \(2\pi\) in phase.

Since

\[
[\mathbf G]=\mathrm{length}^{-1},
\]

two reciprocal-lattice points separated by \(\mathbf G\) are not two real-space points separated by a physical distance of the same magnitude. The correct relationship is Fourier duality:

\[
\boxed{
\text{large real-space period}
\Longleftrightarrow
\text{small reciprocal-space spacing}.
}
\]

Similarly, the positions of bright fringes on a screen are not the slit spacing \(D\) itself; they are determined by the phase-matching condition

\[
\frac{2\pi}{\lambda}D\sin\theta=2\pi m.
\]

The reciprocal lattice therefore does not copy the real-space lattice into another space. It records which spatial wave vectors have integer phase matching with the periodic real-space lattice.

## 6. Why can \(\mathbf B\) and \(\mathbf k\) have an angle between them?

Although \(\mathbf B\) is a real-space vector and \(\mathbf k\) is a wave vector, both are expressed relative to the crystal axes. The reciprocal basis is defined by the real-space basis through

\[
\mathbf a_i\cdot\mathbf b_j=2\pi\delta_{ij}.
\]

Thus reciprocal space is not an unrelated imaginary space: its directions have a definite geometric relationship to the crystal. In experiments such as cyclotron resonance, comparing the direction of \(\mathbf B\) with a direction in \(\mathbf k\)-space describes how the field is oriented relative to anisotropic constant-energy surfaces or crystallographic directions.

## 7. Overall logic

The full chain of reasoning can be compressed to

\[
\boxed{
\text{periodic crystal structure}
\Longrightarrow
\text{periodic potential}
\Longrightarrow
[\hat H,\hat T_{\mathbf R}]=0
\Longrightarrow
\text{Bloch states}.
}
\]

The vector \(\mathbf k\) can therefore serve as the translational-phase label of a Bloch eigenstate. At the same time, the lattice period \(\mathbf R\) defines reciprocal-lattice vectors \(\mathbf G\) satisfying

\[
e^{i\mathbf G\cdot\mathbf R}=1.
\]

Consequently,

\[
\mathbf k\sim\mathbf k+\mathbf G.
\]

Finally, the Schrödinger equation in a periodic potential gives

\[
E_n(\mathbf k).
\]

The conduction-band structure of silicon is therefore not artificially created by the definition of reciprocal-lattice basis vectors. A more accurate causal chain is

\[
\boxed{
\text{crystal structure}
\Longrightarrow
\text{periodic potential}
\Longrightarrow
\text{Bloch states and band structure}.
}
\]

The reciprocal lattice is the Fourier-space or wave-vector-space expression of that same crystal periodicity.

*Edited August 15, 2026, in the United States.*
