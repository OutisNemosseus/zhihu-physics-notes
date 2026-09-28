"""Tong Su | ENGR 103 HW 5-2 | Cylinder area/volume function and plots."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def cylsav(r, h):
    """Return total cylinder surface area (in^2) and volume (in^3)."""
    if np.any(np.asarray(r) < 0) or h < 0:
        raise ValueError("Radius and height must be nonnegative.")
    return 2 * np.pi * r * h + 2 * np.pi * r**2, np.pi * r**2 * h


if __name__ == "__main__":
    sa12, vol12 = cylsav(12, 25)
    print(f"Test: area={sa12:.5f} in^2, volume={vol12:.5f} in^3")
    r = np.linspace(0, 10, 200)
    area, volume = cylsav(r, 15)
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
    ax1.plot(r, area, label="Surface area")
    ax2.plot(r, volume, color="darkorange", label="Volume")
    for ax, ylabel in ((ax1, "Area [in^2]"), (ax2, "Volume [in^3]")):
        ax.set(xlabel="Radius [in]", ylabel=ylabel)
        ax.grid()
        ax.legend()
    fig.tight_layout()
    fig.savefig(Path(__file__).with_name("HW5_2.png"), dpi=160)
