"""Tong Su | ENGR 103 HW 3-3 | Load voltage, current and power."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

folder = Path(__file__).resolve().parent
R, V = np.loadtxt(folder / "ENGR103_HW_03_Electrical Testing Data.csv",
                  delimiter=",", unpack=True)
I = V / R
P = V**2 / R
fig, axes = plt.subplots(3, 1, figsize=(8, 10), sharex=True)
for ax, values, title, units, color in zip(
        axes, (V, I, P), ("Load Voltage", "Load Current", "Load Power"),
        ("V", "A", "W"), ("C0", "C1", "C2")):
    ax.plot(R, values, "o-", color=color, label=title)
    ax.set(ylabel=f"{title} [{units}]", title=title)
    ax.grid()
    ax.legend()
axes[-1].set_xlabel("Resistance RSB [ohm]")
fig.tight_layout()
fig.savefig(folder / "HW3_3.png", dpi=160)
