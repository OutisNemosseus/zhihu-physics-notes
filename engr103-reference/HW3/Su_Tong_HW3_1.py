"""Tong Su | ENGR 103 HW 3-1 | Two projectile trajectories."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 22.01, 0.5)
y1, y2 = -0.45 * x**2 + 9.5 * x, -0.52 * x**2 + 12 * x
fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, y1, "b-", label=r"$y_1=-0.45x^2+9.5x$")
ax.plot(x, y2, "r:", label=r"$y_2=-0.52x^2+12x$")
ax.set(title="Projectiles", xlabel="Distance (x) [ft]", ylabel="Height (y) [ft]")
ax.grid(color="green", alpha=0.5)
ax.legend()
fig.tight_layout()
fig.savefig(Path(__file__).with_name("HW3_1.png"), dpi=160)
