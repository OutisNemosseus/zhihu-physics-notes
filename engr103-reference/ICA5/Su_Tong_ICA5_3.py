"""Tong Su | ENGR 103 ICA 5-3 | Projectile height and speed on three worlds."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def prohvt(v0, theta, tf, t0=0, g=9.81):
    """Return height (m), speed (m/s), and time (s) from t0 to tf."""
    t = np.linspace(t0, tf, 300)
    theta_rad = np.deg2rad(theta)
    h = v0 * t * np.sin(theta_rad) - g * t**2 / 2
    v = np.sqrt((v0 * np.cos(theta_rad))**2 +
                (v0 * np.sin(theta_rad) - g * t)**2)
    return h, v, t


v0, angle = 25.0, 45.0
flight_time = lambda gravity: 2 * v0 * np.sin(np.deg2rad(angle)) / gravity
fig, (ax_h, ax_v) = plt.subplots(2, 1, figsize=(8, 8))
for name, g in (("Earth", 9.81), ("Mars", 3.73), ("Moon", 1.62)):
    h, v, t = prohvt(v0, angle, flight_time(g), g=g)
    ax_h.plot(t, h, label=name)
    ax_v.plot(t, v, label=name)
    print(f"{name}: flight time {t[-1]:.3f} s; maximum height {h.max():.3f} m")
ax_h.set(xlabel="Time [s]", ylabel="Height [m]")
ax_v.set(xlabel="Time [s]", ylabel="Speed [m/s]")
for ax in (ax_h, ax_v):
    ax.legend()
    ax.grid()
fig.tight_layout()
fig.savefig(Path(__file__).with_name("ICA5_3.png"), dpi=160)
