"""Tong Su | ENGR 103 HW 4-3 | Radial sine wireframe and 3D contours."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

v = np.arange(-6, 6.01, 0.1)
X, Y = np.meshgrid(v, v)
Z = np.sin(np.hypot(X, Y))
fig = plt.figure(figsize=(11, 5))
ax1 = fig.add_subplot(121, projection="3d")
ax2 = fig.add_subplot(122, projection="3d")
ax1.plot_wireframe(X, Y, Z, rstride=4, cstride=4, linewidth=0.4)
ax2.contour3D(X, Y, Z, 25, cmap="jet")
for ax, title in ((ax1, "Wireframe"), (ax2, "3D contours")):
    ax.set(xlabel="x [in]", ylabel="y [in]", zlabel="z", title=title)
fig.tight_layout()
fig.savefig(Path(__file__).with_name("HW4_3.png"), dpi=160)
