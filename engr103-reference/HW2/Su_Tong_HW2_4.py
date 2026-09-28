"""Tong Su | ENGR 103 HW 2-4 | Solve six simultaneous equations."""
import numpy as np

A = np.array([[2, -4, 5, -3.5, 1.8, 4],
              [-1.5, 3, 4, -1, -2, 5],
              [5, 1, -6, 3, -2, 2],
              [1.2, -2, 3, 4, -1, 4],
              [4, 1, -2, -3, -4, 1.5],
              [3, 1, -1, 4, -2, -4]])
b = np.array([52.52, -21.1, -27.6, 9.16, -17.9, -16.2])
solution = np.linalg.solve(A, b)
for name, value in zip("abcdef", solution):
    print(f"{name} = {value:.3f} m")
