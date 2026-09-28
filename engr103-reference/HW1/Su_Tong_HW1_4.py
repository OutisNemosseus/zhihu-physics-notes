"""Tong Su | ENGR 103 HW 1-4 | Open-belt length between two pulleys."""
from math import asin, cos, pi

R = float(input("Larger pulley radius R (in): "))
r = float(input("Smaller pulley radius r (in): "))
L = float(input("Center spacing L (in): "))
if r < 0 or R < r or L <= R - r:
    raise ValueError("Require 0 <= r <= R and L > R-r.")
theta = asin((R - r) / L)  # Radians.
belt_in = 2 * L * cos(theta) + pi * (R + r) + 2 * theta * (R - r)
print(f"Belt length: {belt_in:.3f} in")
print(f"Belt length: {belt_in / 12:.3f} ft")
print(f"Belt length: {belt_in * 2.54:.3f} cm")
print(f"Belt length: {belt_in * 0.0254:.3f} m")
