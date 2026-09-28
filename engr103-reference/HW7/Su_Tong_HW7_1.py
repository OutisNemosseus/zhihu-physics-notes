"""Tong Su | ENGR 103 HW 7-1 | Triangle areas using a loop."""
from math import radians, sin
import numpy as np


def triarea(AB):
    """Return a column of triangle areas for [a,b,included angle deg] rows."""
    triangles = np.asarray(AB, dtype=float)
    if triangles.ndim != 2 or triangles.shape[1] != 3:
        raise ValueError("Each row must contain [a, b, included angle in degrees].")
    results = []
    for a, b, angle in triangles:
        results.append([0.5 * a * b * sin(radians(angle))])
    return np.array(results)


if __name__ == "__main__":
    AB = np.array([[1, 2, 20], [5, 7, 30], [8, 2, 60], [5, 5, 45]])
    print(np.round(triarea(AB), 3))
