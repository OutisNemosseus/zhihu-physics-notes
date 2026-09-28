"""Tong Su | ENGR 103 ICA 7-1 | Golf handicap differential."""
from pathlib import Path
import numpy as np


def hcdcalc(data):
    """Return (score - course rating) * 113 / slope as a column array."""
    values = np.asarray(data, dtype=float)
    if values.ndim != 2 or values.shape[1] != 3 or np.any(values[:, 1] <= 0):
        raise ValueError("Provide rows [rating, slope, score] with positive slopes.")
    return ((values[:, 2] - values[:, 0]) * 113 / values[:, 1]).reshape(-1, 1)


if __name__ == "__main__":
    data = np.loadtxt(Path(__file__).with_name("ENGR103 ICA_07_Golf Handicap Data.csv"),
                      delimiter=",", dtype=float)
    print("Handicap differentials:\n", np.round(hcdcalc(data), 3))
