"""Tong Su | ENGR 103 ICA 9-1 | Three-mass spring equilibrium."""
import numpy as np

m1, m2, m3 = 3.0, 1.0, 7.0  # kg
k1, k2, k3 = 500.0, 800.0, 400.0  # N/m
g = 9.81  # m/s^2
A = np.array([[k1 + k2, -k2, 0],
              [-k2, k2 + k3, -k3],
              [0, -k3, k3]], dtype=float)
b = np.array([m1, m2, m3]) * g
displacements_m = np.linalg.solve(A, b)
for number, distance in enumerate(displacements_m, 1):
    print(f"x{number}: {distance:.4f} m = {distance * 100:.2f} cm")
