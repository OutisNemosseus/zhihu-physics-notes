"""Tong Su | ENGR 103 ICA 4-2 | Contour plots of x exp(-x²-y²)."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

values = np.arange(-2, 2.01, 0.1)
X, Y = np.meshgrid(values, values)
Z = X * np.exp(-X**2 - Y**2)
fig, axes = plt.subplots(1, 2, figsize=(11, 5))
for ax, filled in zip(axes, (False, True)):
    plot = ax.contourf(X, Y, Z, 20, cmap="jet") if filled else ax.contour(X, Y, Z, 20, cmap="jet")
    fig.colorbar(plot, ax=ax, label="z [cm]")
    ax.set(xlabel="x [cm]", ylabel="y [cm]", title="Filled contours" if filled else "Contours")
fig.tight_layout()
fig.savefig(Path(__file__).with_name("ICA4_2.png"), dpi=160)
