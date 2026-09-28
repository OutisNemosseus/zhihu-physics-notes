"""Tong Su | ENGR 103 HW 9-2 | Forward difference versus exact derivative."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(0, 1, 20)  # seconds
y = np.sin(2 * np.pi * t)  # charge, coulombs
derivative_exact = 2 * np.pi * np.cos(2 * np.pi * t)  # amperes
derivative_forward = np.diff(y) / np.diff(t)
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 7), sharex=True)
ax1.plot(t, y, "o-", label="Charge")
ax2.plot(t, derivative_exact, "k-", label="Exact current")
ax2.plot(t[:-1], derivative_forward, "ro--", label="Forward difference")
ax1.set(ylabel="Charge [C]", title="Charge and current")
ax2.set(xlabel="Time [s]", ylabel="Current [A]")
for ax in (ax1, ax2):
    ax.grid()
    ax.legend()
fig.tight_layout()
fig.savefig(Path(__file__).with_name("HW9_2.png"), dpi=160)
