# P12.43 — 增益 50 的分立三级反馈设计

AC.asc is an LTspice schematic using explicit labeled nodes. Identical labels are connected. AC.cir is the same independent netlist. Rpi and Gm represent the hybrid-pi model with gm=Ic/26mV, rpi=beta/gm; lambda/Early effect and capacitances are excluded as specified. G/E sources implement open-loop device laws, not the requested closed-loop answer.

设计选择 RC1=RC2=10 kΩ、RE1=100 Ω、RE3=1 kΩ，IC=(0.5,1,5) mA，电源15V。三级之间、输入、输出、RF均用隔直耦合电容；中频理想电容短路，DC开路。各基极用独立电阻分压偏置，实际分压电阻加载保留。

Run AC.asc in LTspice; press Ctrl+L for the engine's SPICE Output Log. AC.plt selects a trace. AC excitation is normalized to 1 V or 1 A unless the problem specifies 60uA (45) or 5V (60); these are linear-response normalizations, not asserted large-signal excursions. The 1Hz–1MHz flat response is a property of the capacitance-free equivalent, not a prediction of physical bandwidth. Compare at 1kHz.

Where present, DC.cir uses the textbook piecewise approximation Vbe=0.7V and Ic=beta*Ib, with an independent voltage source sensing base current. It does not enforce saturation; check transistor active-region assumptions separately. It is not a nonlinear SPICE transistor model. AC bias parameters come from those DC KCL equations, or from problem-given operating currents. Rout.asc turns the original signal to zero and injects a 1A AC test current, retaining the same small-signal bias and load.

Only .log files actually produced by LTspice may be published as simulation results. calculations.json contains independent equation results, not simulator output.
