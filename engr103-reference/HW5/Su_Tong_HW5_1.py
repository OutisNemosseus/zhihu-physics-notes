"""Tong Su | ENGR 103 HW 5-1 | Distance between polar points."""
from math import cos, radians, sqrt


def poldist(ra, theta_a, rb, theta_b):
    """Distance for radii ra/rb and angles theta_a/theta_b in degrees."""
    if ra < 0 or rb < 0:
        raise ValueError("Polar radii must be nonnegative.")
    return sqrt(ra**2 + rb**2 - 2 * ra * rb * cos(radians(theta_a - theta_b)))


if __name__ == "__main__":
    print(f"Distance: {poldist(2, 30, 5, 135):.4f}")
