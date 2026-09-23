# P12.50 — 图 12.25 的节点方程与电流增益

AC.asc is an LTspice schematic using explicit labeled nodes. Identical labels are connected. AC.cir is the same independent netlist. Rpi and Gm represent the hybrid-pi model with gm=Ic/26mV, rpi=beta/gm; lambda/Early effect and capacitances are excluded as specified. G/E sources implement open-loop device laws, not the requested closed-loop answer.

RS=10 MΩ来自题目要求比较的Example12.9；原图12.24未写数值。教材例题PSpice参考值9.58不是本次运行值。

Run AC.asc in LTspice; press Ctrl+L for the engine's SPICE Output Log. AC.plt selects a trace. AC excitation is normalized to 1 V or 1 A unless the problem specifies 60uA (45) or 5V (60); these are linear-response normalizations, not asserted large-signal excursions. The 1Hz–1MHz flat response is a property of the capacitance-free equivalent, not a prediction of physical bandwidth. Compare at 1kHz.

Where present, DC.cir uses the textbook piecewise approximation Vbe=0.7V and Ic=beta*Ib, with an independent voltage source sensing base current. It does not enforce saturation; check transistor active-region assumptions separately. It is not a nonlinear SPICE transistor model. AC bias parameters come from those DC KCL equations, or from problem-given operating currents. Rout.asc turns the original signal to zero and injects a 1A AC test current, retaining the same small-signal bias and load.

Only .log files actually produced by LTspice may be published as simulation results. calculations.json contains independent equation results, not simulator output.
