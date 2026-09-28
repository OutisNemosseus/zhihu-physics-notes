"""ENGR 103 ICA 1-1: distance and midpoint of two points."""

from math import hypot


CM_PER_FOOT = 30.48

x1 = float(input("First point x-coordinate (cm): "))
y1 = float(input("First point y-coordinate (cm): "))
x2 = float(input("Second point x-coordinate (cm): "))
y2 = float(input("Second point y-coordinate (cm): "))

distance_ft = hypot(x2 - x1, y2 - y1) / CM_PER_FOOT
x_mid_ft = (x1 + x2) / 2 / CM_PER_FOOT
y_mid_ft = (y1 + y2) / 2 / CM_PER_FOOT

print(f"Distance: {distance_ft:.3f} ft")
print(f"Midpoint x-coordinate: {x_mid_ft:.3f} ft")
print(f"Midpoint y-coordinate: {y_mid_ft:.3f} ft")
