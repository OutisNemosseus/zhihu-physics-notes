"""Tong Su | ENGR 103 HW 1-2 | Circle circumference and area."""
from math import pi

r_in = float(input("Circle radius (in): "))
perimeter_in = 2 * pi * r_in
area_in2 = pi * r_in**2
print(f"Perimeter: {perimeter_in:.3f} in")
print(f"Perimeter: {perimeter_in * 2.54:.3f} cm")
print(f"Area: {area_in2:.3f} in^2")
print(f"Area: {area_in2 * 2.54**2:.3f} cm^2")
