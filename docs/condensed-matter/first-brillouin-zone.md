---
title: "Why Is k Restricted to the First Brillouin Zone?"
original_title: "能带理论中k为什么限制在第一布里渊区？"
source: "https://www.zhihu.com/question/445522684/answer/2079210615785183204"
---

# Why Is \(k\) Restricted to the First Brillouin Zone?

> **Original Chinese title:** 能带理论中k为什么限制在第一布里渊区？  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/445522684/answer/2079210615785183204)

It is better to say that \(k\) is **identified modulo a reciprocal-lattice vector**, rather than that it is physically “forbidden” to go outside the first Brillouin zone.

What we are really discussing is how much phase a Bloch state acquires when an electron is translated by one crystal period. Once that phase has advanced by a full \(2\pi\), adding another full turn does not produce a new phase.

A simple analogy is a 12-hour clock. A day has 24 hours, but on the clock face, 13:00 and 1:00 point to the same position.

Likewise, for Bloch states,

\[
\psi_{n\mathbf k}(\mathbf r)
=
e^{i\mathbf k\cdot \mathbf r}
u_{n\mathbf k}(\mathbf r),
\]

and \(\mathbf k\) and \(\mathbf k+\mathbf G\), where \(\mathbf G\) is a reciprocal-lattice vector, describe equivalent crystal-momentum labels.

So the first Brillouin zone is best understood as a **fundamental domain** for reciprocal space: one representative from each equivalence class of \(\mathbf k\) values.
