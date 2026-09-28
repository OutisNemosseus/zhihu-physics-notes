"""Tong Su | ENGR 103 ICA 10-1 | Vertex arrays and four polygons."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def polygon(r, n):
    """Return x/y vertices for an n-gon of radius r, closing the loop."""
    if r <= 0 or not isinstance(n, int) or n < 3:
        raise ValueError("Require a positive radius and an integer n >= 3.")
    theta = 2 * np.pi * np.arange(n + 1) / n
    return r * np.cos(theta), r * np.sin(theta)


if __name__ == "__main__":
    x, y = polygon(3, 5)
    print("Pentagon x:", x)
    print("Pentagon y:", y)
    fig, axes = plt.subplots(2, 2, figsize=(9, 9))
    for ax, radius, sides in zip(axes.flat, (2, 3, 4, 5), (8, 7, 6, 5)):
        x, y = polygon(radius, sides)
        ax.plot(x, y, "o-", label=f"r={radius} m, n={sides}")
        ax.set_aspect("equal")
        ax.set(title=f"{sides}-sided polygon", xlabel="x [m]", ylabel="y [m]")
        ax.grid()
        ax.legend()
    fig.tight_layout()
    fig.savefig(Path(__file__).with_name("ICA10_1.png"), dpi=160)
