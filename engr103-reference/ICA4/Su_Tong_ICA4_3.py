"""Tong Su | ENGR 103 ICA 4-3 | 3D wireframe and contours."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

v = np.arange(-2, 2.01, 0.1)
X, Y = np.meshgrid(v, v)
Z = X * np.exp(-X**2 - Y**2)
fig = plt.figure(figsize=(11, 5))
ax1 = fig.add_subplot(121, projection="3d")
ax2 = fig.add_subplot(122, projection="3d")
ax1.plot_wireframe(X, Y, Z, rstride=2, cstride=2, color="blue", linewidth=0.5)
ax2.contour3D(X, Y, Z, 25, cmap="jet")
for ax, title in ((ax1, "Wireframe"), (ax2, "3D contours")):
    ax.set(xlabel="x [cm]", ylabel="y [cm]", zlabel="z [cm]", title=title)
fig.tight_layout()
fig.savefig(Path(__file__).with_name("ICA4_3.png"), dpi=160)
