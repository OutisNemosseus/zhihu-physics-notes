"""Tong Su | ENGR 103 ICA 9-3 | Composite trapezoidal integration."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def f(t):
    return 1 / ((t - 0.3)**2 + 0.01) + 1 / ((t - 0.9)**2 + 0.04) + 14


def trapezoids(a, b, n):
    x = np.linspace(a, b, n + 1)
    y = f(x)
    return np.sum((y[1:] + y[:-1]) * np.diff(x) / 2), x, y


# The handout does not give bounds or segment counts. Use 0 <= t <= 1.
a, b = 0.0, 1.0
fig, ax = plt.subplots(figsize=(8, 5))
x_dense = np.linspace(a, b, 1000)
ax.plot(x_dense, f(x_dense), "k-", label="f(t)")
for n, color in ((4, "C0"), (8, "C1"), (16, "C2")):
    result, x, y = trapezoids(a, b, n)
    ax.plot(x, y, "o--", color=color, label=f"N={n}; area={result:.3f}")
    print(f"N={n}, trapezoidal integral [{a}, {b}]: {result:.6f}")
ax.set(xlabel="t", ylabel="f(t)", title="Trapezoidal rule")
ax.grid()
ax.legend()
fig.tight_layout()
fig.savefig(Path(__file__).with_name("ICA9_3.png"), dpi=160)
