"""Tong Su | ENGR 103 HW 4-2 | Radial sine contour plots."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

values = np.arange(-6, 6.01, 0.1)
X, Y = np.meshgrid(values, values)
Z = np.sin(np.hypot(X, Y))
fig, axes = plt.subplots(1, 2, figsize=(11, 5))
for ax, filled in zip(axes, (False, True)):
    p = ax.contourf(X, Y, Z, 24, cmap="jet") if filled else ax.contour(X, Y, Z, 24, cmap="jet")
    fig.colorbar(p, ax=ax, label="z")
    ax.set(xlabel="x [in]", ylabel="y [in]", title="Filled contours" if filled else "Contours")
fig.tight_layout()
fig.savefig(Path(__file__).with_name("HW4_2.png"), dpi=160)
