"""ENGR 103 ICA 1-3: solve a triangle using the law of cosines."""

from math import acos, cos, degrees, radians, sqrt


a = float(input("Side a (in): "))
b = float(input("Side b (in): "))
gamma_deg = float(input("Included angle gamma (degrees): "))

if a <= 0 or b <= 0 or not 0 < gamma_deg < 180:
    raise ValueError("Sides must be positive and gamma must be between 0 and 180 degrees.")

c = sqrt(a**2 + b**2 - 2 * a * b * cos(radians(gamma_deg)))

# Limit tiny floating-point rounding errors to the domain of acos.
cos_alpha = (b**2 + c**2 - a**2) / (2 * b * c)
cos_beta = (a**2 + c**2 - b**2) / (2 * a * c)
alpha_deg = degrees(acos(max(-1.0, min(1.0, cos_alpha))))
beta_deg = degrees(acos(max(-1.0, min(1.0, cos_beta))))
angle_sum = alpha_deg + beta_deg + gamma_deg

print(f"Side c: {c:.3f} in")
print(f"Angle alpha: {alpha_deg:.3f} degrees")
print(f"Angle beta: {beta_deg:.3f} degrees")
print(f"Sum of angles: {angle_sum:.3f} degrees")
print(f"Angles total 180 degrees: {abs(angle_sum - 180.0) < 1e-8}")
