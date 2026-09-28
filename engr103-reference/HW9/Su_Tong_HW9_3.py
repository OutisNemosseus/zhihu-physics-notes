"""Tong Su | ENGR 103 HW 9-3 | Trapezoidal integration of current."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def current(t):
    return 2 * np.pi * np.cos(2 * np.pi * t)


a, b = -0.25, 0.25  # s; exact integral is sin(2*pi*b)-sin(2*pi*a)=2 C.
exact = np.sin(2 * np.pi * b) - np.sin(2 * np.pi * a)
fig, ax = plt.subplots(figsize=(9, 5))
fine = np.linspace(a, b, 500)
ax.plot(fine, current(fine), "k-", linewidth=2, label="Current i(t) [A]")
for n in (4, 8, 16, 32):
    t = np.linspace(a, b, n + 1)
    y = current(t)
    estimate = np.sum((y[:-1] + y[1:]) * np.diff(t) / 2)
    print(f"N={n}: {estimate:.6f} C (exact {exact:.6f} C)")
    ax.plot(t, y, "o--", markersize=3, label=f"N={n}: {estimate:.4f} C")
ax.set(xlabel="Time [s]", ylabel="Current [A]", title="Trapezoidal integral of current")
ax.grid()
ax.legend()
fig.tight_layout()
fig.savefig(Path(__file__).with_name("HW9_3.png"), dpi=160)
