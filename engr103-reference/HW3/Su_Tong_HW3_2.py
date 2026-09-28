"""Tong Su | ENGR 103 HW 3-2 | Bacteria counts and exponential fit."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

folder = Path(__file__).resolve().parent
x, y = np.loadtxt(folder / "ENGR103 HW_03_Number of Bacteria.csv",
                  delimiter=",", unpack=True)
if np.any(y <= 0):
    raise ValueError("Exponential fitting requires positive bacteria counts.")
rate, log_initial = np.polyfit(x, np.log(y), 1)
xf = np.linspace(x.min(), x.max(), 300)
fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, y, "o", markersize=8, markerfacecolor="blue", label="Observations")
ax.plot(xf, np.exp(log_initial + rate * xf), "r--", linewidth=2,
        label=fr"$N(t)={np.exp(log_initial):.2f}e^{{{rate:.3f}t}}$")
ax.set_yscale("log")
ax.set_title("Bacteria Growth", fontsize=20, fontweight="bold", color="blue")
ax.set_xlabel("Time (t) [sec]", fontsize=15, fontweight="semibold", color="blue")
ax.set_ylabel("Number of Bacteria", fontsize=15, fontweight="semibold", color="blue")
ax.grid(color="blue", alpha=0.3, which="both")
ax.legend()
fig.tight_layout()
fig.savefig(folder / "HW3_2.png", dpi=160)
