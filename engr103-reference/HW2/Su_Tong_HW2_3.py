"""Tong Su | ENGR 103 HW 2-3 | NumPy array slicing and stacking."""
import numpy as np

A = np.array([[15, 3, 22], [3, 8, 5], [14, 3, 82]])
B = np.array([1, 5, 6])
C = np.array([12, 18, 5, 2])
D = A[:, 2]
E = np.column_stack((B, D))
F = np.concatenate((B, D)).reshape(6, 1)
G = np.vstack((A, C[:3]))
H = np.array([A[0, 2], C[1], B[1]])
for name, arr in (("A", A), ("B", B), ("C", C), ("D", D),
                  ("E", E), ("F", F), ("G", G), ("H", H)):
    print(f"{name} =\n{arr}")
