"""Tong Su | ENGR 103 HW 8-1 | Low-level text file I/O."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def filewrite(filename, theta, y1, y2):
    with open(filename, "w", encoding="utf-8") as f:
        f.write("theta, y1, y2\n")
        for values in zip(theta, y1, y2):
            f.write(", ".join(f"{number:.5f}" for number in values) + "\n")


def fileread(filename):
    with open(filename, encoding="utf-8") as f:
        header = f.readline().strip()
        if header != "theta, y1, y2":
            raise ValueError("Unexpected header.")
        data = np.array([[float(x) for x in line.split(",")] for line in f if line.strip()])
    return data.T


if __name__ == "__main__":
    folder = Path(__file__).resolve().parent
    theta = np.linspace(0, 4 * np.pi, 100)
    y1, y2 = 3 * np.sin(theta), 7 * np.cos(theta)
    path = folder / "sinusoidal_1.txt"
    filewrite(path, theta, y1, y2)
    fig, axes = plt.subplots(2, 1, figsize=(8, 7))
    for ax, (angle, first, second), title in zip(
            axes, ((theta, y1, y2), fileread(path)), ("Original", "Read from text")):
        ax.plot(angle, first, label="y1")
        ax.plot(angle, second, label="y2")
        ax.set(title=title, xlabel="Angle theta [rad]", ylabel="y [cm]")
        ax.grid()
        ax.legend()
    fig.tight_layout()
    fig.savefig(folder / "HW8_1.png", dpi=160)
