"""Tong Su | ENGR 103 HW 2-1 | Projectile range and peak height in m."""
import numpy as np

v0, g = 260.0, 9.81  # m/s, m/s^2
angles_deg = np.array([15, 25, 35, 45, 55, 65, 75])
theta = np.deg2rad(angles_deg)
range_m = v0**2 / g * np.sin(2 * theta)
height_m = v0**2 * np.sin(theta)**2 / (2 * g)
print("Angles (deg):", angles_deg)
print("Maximum horizontal distances (m):", np.round(range_m, 3))
print("Maximum heights (m):", np.round(height_m, 3))
