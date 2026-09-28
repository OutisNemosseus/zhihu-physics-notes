"""Tong Su | ENGR 103 HW 4-1 | Two views of a cylinder-surface sine curve."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(0, 2 * np.pi, 1000)
r, h, a = 1.0, 0.3, 10
x, y, z = r * np.cos(t), r * np.sin(t), h * np.cos(a * t)
fig = plt.figure(figsize=(11, 5))
for i, (elev, azim) in enumerate(((35, -130), (65, -130)), 1):
    ax = fig.add_subplot(1, 2, i, projection="3d")
    ax.plot(x, y, z)
    ax.view_init(elev=elev, azim=azim)
    ax.set(xlabel="x [in]", ylabel="y [in]", zlabel="z [in]", title=f"View {i}")
fig.tight_layout()
fig.savefig(Path(__file__).with_name("HW4_1.png"), dpi=160)
