"""Tong Su | ENGR 103 HW 2-2 | Hydrostatic pressure table in Pa."""
import numpy as np

heights_m = np.arange(10, 21, 2)
sg = np.array([0.87, 1.00, 1.24])
SG, H = np.meshgrid(sg, heights_m)
pressure_pa = SG * 1000.0 * 9.81 * H
print("Columns: fluids A, B, C; rows: heights 10, 12, ..., 20 m")
print("Pressure (Pa):\n", pressure_pa)
