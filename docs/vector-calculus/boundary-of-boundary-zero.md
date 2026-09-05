---
title: "Why Is the Divergence of a Curl Zero?"
original_title: "矢量场的旋度的散度恒为零，它的物理意义是什么，如何理解？"
source: "https://www.zhihu.com/question/29970414/answer/2078641994742634402"
---

# Why Is the Divergence of a Curl Zero?

> **Original Chinese title:** 矢量场的旋度的散度恒为零，它的物理意义是什么，如何理解？  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/29970414/answer/2078641994742634402)

Imagine eight small Rubik's-Cube-like cubes joined to form one large cube. On every face of every small cube, take a line integral once around its four oriented edges, and finally add all these integrals together.

## First cancellation: the internal faces

Every internal face is shared by two neighboring small cubes. The outward normal of one cube points in the opposite direction to the outward normal of the other, so each shared face occurs twice with opposite orientations and cancels:

\[
\iint_{S_{ij}}\mathbf F\cdot\mathbf n_i\,dS
+
\iint_{S_{ji}}\mathbf F\cdot\mathbf n_j\,dS
=0,
\qquad
\mathbf n_j=-\mathbf n_i.
\]

After all internal faces have disappeared, only the outer surface of the assembled large cube remains. This is the cancellation behind the divergence theorem:

\[
\iiint_{V}\nabla\cdot\mathbf F\,dV
=
\oiint_{\partial V}\mathbf F\cdot\mathbf n\,dS.
\]

When the eight small volumes are added, flux through their common faces cancels, leaving only flux through the boundary \(\partial V\) of the large volume.

## Second cancellation: the internal edges of each outer face

Now consider one outer face of the large cube. It is assembled from smaller square faces. Along every edge shared by two adjacent small squares, one square traverses the edge in one direction and the other traverses it in the opposite direction. Those internal line integrals cancel in pairs.

Only the line integral around the outer perimeter of the large square face remains. In two dimensions, this is exactly the cancellation displayed by Green's theorem:

\[
\oint_{\partial S}
(P\,dx+Q\,dy)
=
\iint_S
\left(
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}
\right)dA.
\]

The integral over a region assembled from smaller regions reduces to the integral over its outer boundary because all common internal edges are traversed twice in opposite directions.

## The same operation on all six outer faces

The same edge cancellation occurs on each of the six outer faces of the large cube. In three-dimensional vector notation, Stokes' theorem expresses the relation between the circulation around each face and the flux of the curl through that face:

\[
\oint_{\partial S}\mathbf A\cdot d\boldsymbol\ell
=
\iint_S
(\nabla\times\mathbf A)\cdot\mathbf n\,dS.
\]

After applying this to all six faces, only their outer edges remain.

## Final cancellation: the twelve edges of the large cube

Each of the twelve edges belongs to two adjacent outer faces. The orientations induced on their common edge are opposite, so every remaining edge integral again appears once in each direction:

\[
\int_e\mathbf A\cdot d\boldsymbol\ell
+
\int_{-e}\mathbf A\cdot d\boldsymbol\ell
=0.
\]

All twelve edges therefore cancel, and the final result is zero.

The compact statement is

\[
\boxed{
\partial(\partial \Omega)=0
}
\]

or, in words,

\[
\boxed{\text{the boundary of a boundary is zero}.}
\]

This is the geometric reason behind identities such as

\[
\nabla\cdot(\nabla\times \mathbf A)=0.
\]

Indeed, applying the divergence theorem and then Stokes' theorem face by face gives

\[
\iiint_V
\nabla\cdot(\nabla\times\mathbf A)\,dV
=
\oiint_{\partial V}
(\nabla\times\mathbf A)\cdot\mathbf n\,dS
=
\sum_{S\subset\partial V}
\oint_{\partial S}\mathbf A\cdot d\boldsymbol\ell
=0,
\]

because every edge of the closed surface is counted twice with opposite orientations. The corresponding identity one dimension lower is

\[
\nabla\times(\nabla f)=0.
\]

In the language of differential forms, both are manifestations of

\[
\boxed{d^2=0}.
\]

The cancellation is not an accident of three-dimensional vector calculus; it is a structural fact about oriented boundaries.
