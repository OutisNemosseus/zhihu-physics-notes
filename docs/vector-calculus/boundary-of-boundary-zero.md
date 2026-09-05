---
title: "Why Is the Divergence of a Curl Zero?"
original_title: "矢量场的旋度的散度恒为零，它的物理意义是什么，如何理解？"
source: "https://www.zhihu.com/question/29970414/answer/2078641994742634402"
---

# Why Is the Divergence of a Curl Zero?

> **Original Chinese title:** 矢量场的旋度的散度恒为零，它的物理意义是什么，如何理解？  
> **Original Chinese version:** [Zhihu](https://www.zhihu.com/question/29970414/answer/2078641994742634402)

A useful geometric picture is to build one large cube from eight smaller cubes.

Imagine performing oriented boundary integrals on the faces and edges of all eight small cubes, and then summing everything.

Every internal face is shared by two neighboring cubes with opposite orientations, so the contributions from internal faces cancel.

After that cancellation, only the outer boundary of the large cube remains.

Now look at the edges of the outer faces. Each edge shared by two adjacent outer faces again appears twice with opposite orientation, so those contributions cancel as well.

Eventually nothing remains.

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
\nabla\cdot(\nabla\times \mathbf A)=0
\]

and

\[
\nabla\times(\nabla f)=0.
\]

In the language of differential forms, both are manifestations of

\[
\boxed{d^2=0}.
\]

The cancellation is not an accident of three-dimensional vector calculus; it is a structural fact about oriented boundaries.
