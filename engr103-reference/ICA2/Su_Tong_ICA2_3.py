"""Tong Su | ENGR 103 ICA 2-3 | Meshgrid cylinder volumes in m^3."""
import numpy as np

radii_m = np.arange(0, 13, 3)
heights_m = np.arange(10, 21, 2)
R, H = np.meshgrid(radii_m, heights_m)
volumes_m3 = np.pi * R**2 * H
print("Columns: radii (m):", radii_m)
print("Rows: heights (m):", heights_m)
print("Cylinder volume table (m^3):\n", volumes_m3)
