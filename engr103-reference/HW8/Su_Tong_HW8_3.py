"""Tong Su | ENGR 103 HW 8-3 | Pandas Excel file I/O."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


def filewriteexcel(filename, sheetname, theta, y1, y2):
    pd.DataFrame({"theta": theta, "y1": y1, "y2": y2}).to_excel(
        filename, sheet_name=sheetname, index=False)


def filereadexcel(filename, sheetname):
    data = pd.read_excel(filename, sheet_name=sheetname)
    return data["theta"].to_numpy(), data["y1"].to_numpy(), data["y2"].to_numpy()


if __name__ == "__main__":
    folder = Path(__file__).resolve().parent
    theta = np.linspace(0, 4 * np.pi, 100)
    y1, y2 = 3 * np.sin(theta), 7 * np.cos(theta)
    path, sheet = folder / "sinusoidal_3.xlsx", "Sinusoidal"
    filewriteexcel(path, sheet, theta, y1, y2)
    fig, axes = plt.subplots(2, 1, figsize=(8, 7))
    for ax, (angle, first, second), title in zip(
            axes, ((theta, y1, y2), filereadexcel(path, sheet)), ("Original", "Read from Excel")):
        ax.plot(angle, first, label="y1")
        ax.plot(angle, second, label="y2")
        ax.set(title=title, xlabel="Angle theta [rad]", ylabel="y [cm]")
        ax.grid()
        ax.legend()
    fig.tight_layout()
    fig.savefig(folder / "HW8_3.png", dpi=160)
