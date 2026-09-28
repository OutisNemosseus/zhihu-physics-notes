"""Tong Su | ENGR 103 ICA 8-2 | Pandas CSV I/O for voltage signals."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


def file_write_csv(filename, t, v1, v2):
    pd.DataFrame({"t": t, "v1": v1, "v2": v2}).to_csv(filename, index=False)


def file_read_csv(filename):
    data = pd.read_csv(filename)
    return data["t"].to_numpy(), data["v1"].to_numpy(), data["v2"].to_numpy()


if __name__ == "__main__":
    folder = Path(__file__).resolve().parent
    t = np.linspace(0, 0.1, 101)
    v1 = 8 * np.cos(80 * t + np.deg2rad(-35))
    v2 = 12 * np.sin(80 * t + np.deg2rad(65))
    path = folder / "voltages3.csv"
    file_write_csv(path, t, v1, v2)
    fig, axes = plt.subplots(2, 1, figsize=(8, 6))
    for ax, data, title in zip(axes, ((t, v1, v2), file_read_csv(path)),
                               ("Original", "Read from CSV")):
        ax.plot(data[0], data[1], label="v1")
        ax.plot(data[0], data[2], label="v2")
        ax.set(title=title, xlabel="Time [s]", ylabel="Voltage [V]")
        ax.grid()
        ax.legend()
    fig.tight_layout()
    fig.savefig(folder / "ICA8_2.png", dpi=160)
