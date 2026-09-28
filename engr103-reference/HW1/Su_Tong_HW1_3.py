"""Tong Su | ENGR 103 HW 1-3 | Sphere surface area and volume."""
from math import pi

r_in = float(input("Sphere radius (in): "))
area_in2 = 4 * pi * r_in**2
volume_in3 = 4 * pi * r_in**3 / 3
print(f"Surface area: {area_in2:.3f} in^2")
print(f"Surface area: {area_in2 * 2.54**2:.3f} cm^2")
print(f"Volume: {volume_in3:.3f} in^3")
print(f"Volume: {volume_in3 * 2.54**3:.3f} cm^3")
