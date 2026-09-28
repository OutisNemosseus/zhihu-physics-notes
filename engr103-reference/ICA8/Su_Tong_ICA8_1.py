"""Tong Su | ENGR 103 ICA 8-1 | Manual text I/O for voltage signals."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def file_write1(filename, t, v1, v2):
    """Write rounded voltages using explicit open/close (no context manager)."""
    f = open(filename, "w", encoding="utf-8")
    try:
        f.write("t, v1, v2\n")
        for row in zip(t, v1, v2):
            f.write(", ".join(f"{value:.3f}" for value in row) + "\n")
    finally:
        f.close()


def file_write2(filename, t, v1, v2):
    """Write full float precision using a context manager."""
    with open(filename, "w", encoding="utf-8") as f:
        f.write("t, v1, v2\n")
        for row in zip(t, v1, v2):
            f.write(", ".join(str(value) for value in row) + "\n")


def file_read(filename):
    """Read one header line, then return three NumPy arrays."""
    with open(filename, encoding="utf-8") as f:
        header = f.readline().strip()
        if header != "t, v1, v2":
            raise ValueError("Unexpected column labels.")
        rows = [[float(part) for part in line.split(",")] for line in f if line.strip()]
    return np.array(rows).T


if __name__ == "__main__":
    folder = Path(__file__).resolve().parent
    t = np.linspace(0, 0.1, 101)
    v1 = 8 * np.cos(80 * t + np.deg2rad(-35))
    v2 = 12 * np.sin(80 * t + np.deg2rad(65))
    path1, path2 = folder / "voltages1.txt", folder / "voltages2.txt"
    file_write1(path1, t, v1, v2)
    file_write2(path2, t, v1, v2)
    fig, axes = plt.subplots(3, 1, figsize=(9, 9))
    for ax, data, title in zip(axes, ((t, v1, v2), file_read(path1), file_read(path2)),
                               ("Computed", "Rounded file", "Full-precision file")):
        ax.plot(data[0], data[1], label="v1")
        ax.plot(data[0], data[2], label="v2")
        ax.set(title=title, xlabel="Time [s]", ylabel="Voltage [V]")
        ax.grid()
        ax.legend()
    fig.tight_layout()
    fig.savefig(folder / "ICA8_1.png", dpi=160)
