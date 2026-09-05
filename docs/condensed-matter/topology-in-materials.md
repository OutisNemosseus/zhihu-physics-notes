---
title: "Where Is the 'Topology' in Topological Materials?"
original_title: "想要知道拓扑材料拓扑在哪，应该看什么书/文献？"
source: "https://www.zhihu.com/question/278017675/answer/2069913723851034825"
---

# Where Is the “Topology” in Topological Materials?

> **Original Chinese title:** 想要知道拓扑材料拓扑在哪，应该看什么书/文献？  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/278017675/answer/2069913723851034825)

For a two-dimensional crystal, the first Brillouin zone is parameterized by

\[
(k_x,k_y).
\]

Because opposite edges of the Brillouin zone are identified, each momentum direction behaves like a circle. Gluing both directions produces a torus:

\[
\boxed{
T^2.
}
\]

At each point \(\mathbf k\) on this momentum-space torus, the Hamiltonian has eigenstates. In a simple two-band model, the occupied state can often be represented by a point on a sphere.

So the band structure defines a map

\[
\boxed{
T^2_{\text{BZ}}
\longrightarrow
S^2.
}
\]

As \(\mathbf k\) runs through the Brillouin zone once, the image may wrap around the sphere zero times, once, twice, and so on.

That integer winding is characterized by the **Chern number**

\[
\boxed{
C
=
\frac{1}{2\pi}
\int_{\text{BZ}}
\Omega(\mathbf k)\,d^2k.
}
\]

A nonzero Chern number cannot be changed continuously without closing the relevant energy gap.

That robustness is the sense in which the material possesses a topological property.
