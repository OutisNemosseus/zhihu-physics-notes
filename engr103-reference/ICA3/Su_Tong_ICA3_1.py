"""Tong Su | ENGR 103 ICA 3-1 | Threshold-voltage data and linear fit."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

folder = Path(__file__).resolve().parent
x, y = np.loadtxt(folder / "ENGR103 ICA_03_VT.csv", delimiter=",", unpack=True)
slope, intercept = np.polyfit(x, y, 1)
fig, ax = plt.subplots(figsize=(9, 5))
ax.plot(x, y, "o", markersize=8, markeredgecolor="red", markeredgewidth=2,
        markerfacecolor="blue", linestyle="none", label="Measured VT")
xf = np.linspace(x.min(), x.max(), 300)
ax.plot(xf, slope * xf + intercept, "--", color="teal", linewidth=2,
        label=fr"Fit: $V_T={slope:.3g}t+{intercept:.3g}$")
ax.set_title("Threshold voltage (VT) Testing", fontsize=20, fontweight="bold", pad=10, color="blue")
ax.set_xlabel("Time (t) [sec]", labelpad=4, fontsize=15, fontweight="semibold", color="blue")
ax.set_ylabel("Threshold voltage (VT) [Volts]", labelpad=4, fontsize=15, fontweight="semibold", color="blue")
ax.grid(color="blue", alpha=0.3)
ax.legend()
fig.tight_layout()
fig.savefig(folder / "ICA3_1.png", dpi=160)
print(f"Linear fit: VT = {slope:.8g} t + {intercept:.8g} V")
