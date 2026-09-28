"""Tong Su | ENGR 103 ICA 2-2 | Matrix indexing and permutations."""
import numpy as np

A = np.array([12, 8, 14, 2, 25, 60])
B = np.array([[1, 67], [12, 2], [3, 23], [34, 4], [5, 45], [56, 6]])
C = np.array([[A[1], A[3], A[5]], [B[5, 0], B[5, 1], A[-1]],
              [A[-2], B[2, 0], B[2, 1]]])
D = np.column_stack((B[:, 0], A, B[:, 1]))
rng = np.random.default_rng()
E = rng.integers(0, 50, size=(5, 7))
F = rng.permutation(A)
G = rng.permutation(A).reshape(2, 3)
for name, arr in (("A", A), ("B", B), ("C", C), ("D", D),
                  ("E", E), ("F", F), ("G", G)):
    print(f"{name} =\n{arr}")
