# ENGR 202 · 考前训练 01

10 道原创题，依据前四周课程范围。尚未与 Canvas Practice Exam 原题逐题对照。采用峰值、余弦参考相量。


## 1. Convert a sinusoid to a cosine-reference phasor {#q01}

Given \(x(t)=-12\sin(400t+\pi/6)\;\mathrm V\):

- Rewrite x(t) as a cosine with positive amplitude and phase in (−180°,180°].

- Find the peak phasor X in polar and rectangular form.

- Find f, T, x(0), and x(T/4).

- Sketch X on equal-scale real and imaginary axes.



## 2. Add two sinusoids at one frequency {#q02}

Let \(v_1(t)=10\cos(500t+\pi/6)\;\mathrm V\) and \(v_2(t)=8\sin(500t+\pi/6)\;\mathrm V\).

- Convert both to peak cosine-reference phasors.

- Find the phasor of v(t)=v₁(t)+v₂(t), in rectangular and polar form.

- Write v(t) as one cosine.

- Check your result at t=0.



## 3. Relate a time delay to a phasor rotation {#q03}

\(x(t)=8\cos(400t+\pi/6)\;\mathrm V\), and \(z(t)=x(t-\pi/1600)\).

- Find T and express the delay Δt as a fraction of T.

- Find X and Z in polar form. Does z lead or lag x?

- Evaluate x(0), z(0), x(T/4), and z(T/4).

- Sketch X and Z on the same equal-scale complex axes.



## 4. Find impedance and resonance in a series RLC circuit {#q04}

A resistor R=30 Ω, inductor L=10 mH, and capacitor C=20 μF are connected in series.

- At ω=2000 rad/s, find ZR, ZL, ZC and total Z in rectangular and polar form.

- State whether the circuit is net inductive or capacitive.

- Find the resonant angular frequency ω₀, resonant frequency f₀, and Z at resonance.



## 5. Solve the current and element voltages in a series loop {#q05}

In the series loop below, R=30 Ω, L=20 mH, C=6.25 μF and \(v_s(t)=100\cos(2000t+20\pi/180)\;\mathrm V\). Current i flows from the positive source terminal through R, L, and C. Element voltages follow the passive sign convention.

- Find total Z and the peak current phasor I.

- Write i(t).

- Find VR, VL and VC and verify KVL using rectangular phasors.

- Find the average power absorbed by R.



![Circuit](q05.svg)


## 6. Use KCL for a current-fed parallel network {#q06}

An ideal current source \(i_s(t)=5\cos(1000t-\pi/6)\;\mathrm A\) injects current upward from ground into node A. Three parallel branches connect A to ground: R=20 Ω, L=40 mH and C=50 μF. V=VA relative to ground; IR, IL and IC are directed downward.

- Find the total admittance Y and equivalent impedance Z.

- Find V in rectangular and polar form, then write vA(t).

- Find IR, IL and IC and verify KCL.

- State whether the source current leads or lags the node voltage.



![Circuit](q06.svg)


## 7. Analyze a loaded voltage divider {#q07}

A source with peak phasor Vs=60∠(−10°) V at ω=1000 rad/s drives a 10 Ω series resistor. The output node A has a 20 Ω resistor and a 50 μF capacitor connected in parallel to ground. Vo is measured from A to ground.

- Find the load impedance Zp.

- Find H=Vo/Vs in rectangular and polar form.

- Find Vo and write vo(t).

- Compare |H| with the result if the 20 Ω load resistor were removed.



![Circuit](q07.svg)


## 8. Solve a two-node AC network {#q08}

All impedances below are specified at ω=1000 rad/s. Node A connects to ground through 10 Ω and −j20 Ω. A 20 Ω resistor connects A to B. Node B connects to ground through j10 Ω. An ideal current source Is=2∠0° A injects current from ground into A.

- Write the two node-voltage equations using ground as the reference.

- Solve for VA and VB in rectangular and polar form.

- Find the current IAB from A to B.

- Verify KCL at B.



![Circuit](q08.svg)


## 9. Solve coupled mesh-current equations {#q09}

Two adjacent planar meshes share a 4 Ω resistor. Let I1 and I2 be clockwise peak mesh currents. In mesh 1, the unshared elements are a 6 Ω resistor, j10 Ω inductor impedance and a voltage source Vs=20∠0° V that is a voltage rise along I1. Mesh 2 has unshared elements 8 Ω and −j8 Ω and no source. The shared-branch reference current is I1−I2 in the direction of I1.

- Write both mesh equations.

- Find I1, I2 and the shared-branch current.

- Find the average power in the shared 4 Ω resistor.

- Verify both mesh equations numerically.



![Circuit](q09.svg)


## 10. Find instantaneous and average power {#q10}

A load has voltage \(v(t)=120\sqrt2\cos(377t+\pi/6)\;\mathrm V\) and current \(i(t)=5\sqrt2\cos(377t-\pi/6)\;\mathrm A\). Current enters the positive voltage-reference terminal.

- Find Vrms, Irms and the phase difference θv−θi.

- Derive p(t)=v(t)i(t) using a product-to-sum identity.

- Find average real power P and the power factor. State leading or lagging.

- Find the load impedance in rectangular form.

- Find the minimum and maximum instantaneous power and explain a negative p(t).
