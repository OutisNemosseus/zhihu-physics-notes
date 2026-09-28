"""Tong Su | ENGR 103 ICA 9-2 | Forward-difference velocity."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

# Handout specifies ten samples, but not the endpoint; use 0 <= t <= 10 s.
t = np.linspace(0, 10, 10)
x = 2 * (1 - np.exp(-t))  # m
velocity_approx = np.diff(x) / np.diff(t)  # m/s, located at left endpoints.
velocity_exact = 2 * np.exp(-t)
fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(t[:-1], velocity_approx, "o-", label="Forward difference")
ax.plot(t, velocity_exact, "--", label="Exact derivative")
ax.set(xlabel="Time [s]", ylabel="Velocity [m/s]", title="Forward-difference velocity")
ax.grid()
ax.legend()
fig.tight_layout()
fig.savefig(Path(__file__).with_name("ICA9_2.png"), dpi=160)
print("Time [s]:", t[:-1])
print("Forward-difference velocity [m/s]:", velocity_approx)
