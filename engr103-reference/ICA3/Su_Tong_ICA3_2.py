"""Tong Su | ENGR 103 ICA 3-2 | Three prescribed damped-oscillation curves."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

folder = Path(__file__).resolve().parent
A0, mass, spring_k = 1.0, 12.0, 3.0
omega0 = np.sqrt(spring_k / mass)
t = np.arange(0, 20.01, 0.01)
b0 = np.sqrt(4 * mass * spring_k)
fig, ax = plt.subplots(figsize=(9, 5))
for b, label, style in ((b0 / 2, "Underdamped", "b-"),
                        (b0, "Critically damped", "g--"),
                        (b0 / 0.5, "Overdamped", "r:")):
    alpha = b / (2 * mass)
    y = A0 * np.exp(-alpha * t) * np.cos(omega0 * t)
    ax.plot(t, y, style, linewidth=2, label=fr"{label}: $b={b:.2f}$")
ax.set(title="Damped Harmonic Motion of Springs", xlabel="Time (t) [sec]",
       ylabel="Displacement (y) [m]")
ax.text(0.52, 0.82, r"$y(t)=A_0 e^{-\alpha t}\cos(\omega_0 t),\ \alpha=b/(2m)$",
        transform=ax.transAxes)
ax.grid(color="green", alpha=0.3)
ax.legend()
fig.tight_layout()
fig.savefig(folder / "ICA3_2.png", dpi=160)
