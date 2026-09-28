"""Tong Su | ENGR 103 HW 5-3 | Upper and lower halves of an ellipse."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def ellipse(a, b, h=0, k=0):
    """Return x, upper y, lower y; a/b are semi-axes, h/k center."""
    if a <= 0 or b <= 0:
        raise ValueError("Semi-axes must be positive.")
    x = np.linspace(h - a, h + a, 301)
    y = b * np.sqrt(np.maximum(0, 1 - ((x - h) / a)**2))
    return x, y + k, -y + k


if __name__ == "__main__":
    x, top, bottom = ellipse(6, 3, 3, 1)
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.plot(x, top, label="Upper half")
    ax.plot(x, bottom, label="Lower half")
    ax.set_aspect("equal")
    ax.set(xlabel="x [cm]", ylabel="y [cm]", title="Ellipse centered at (3, 1) cm")
    ax.grid()
    ax.legend()
    fig.tight_layout()
    fig.savefig(Path(__file__).with_name("HW5_3.png"), dpi=160)
