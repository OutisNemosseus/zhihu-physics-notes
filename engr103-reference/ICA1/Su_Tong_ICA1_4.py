"""ENGR 103 ICA 1-4: volume and exposed area of a cone plus hemisphere."""

from math import cos, hypot, pi, radians, sin


METERS_PER_INCH = 0.0254
METERS_PER_FOOT = 0.3048

length_m = float(input("Cone slant length L (m): "))
theta_deg = float(input("Full cone angle theta (degrees): "))

if length_m <= 0 or not 0 < theta_deg < 180:
    raise ValueError("Length must be positive and theta must be between 0 and 180 degrees.")

half_angle_rad = radians(theta_deg / 2)
radius_m = length_m * sin(half_angle_rad)
height_m = length_m * cos(half_angle_rad)

hemisphere_volume_m3 = 2 * pi * radius_m**3 / 3
cone_volume_m3 = pi * height_m * radius_m**2 / 3
volume_m3 = hemisphere_volume_m3 + cone_volume_m3

# The common circular face is inside the solid, so it is excluded.
hemisphere_area_m2 = 2 * pi * radius_m**2
cone_lateral_area_m2 = pi * radius_m * hypot(height_m, radius_m)
area_m2 = hemisphere_area_m2 + cone_lateral_area_m2

print(f"Volume: {volume_m3:.3f} m^3")
print(f"Volume: {volume_m3 * 100**3:,.3f} cm^3")
print(f"Volume: {volume_m3 / METERS_PER_INCH**3:,.3f} in^3")
print(f"Volume: {volume_m3 / METERS_PER_FOOT**3:,.3f} ft^3")
print(f"Surface area: {area_m2:.3f} m^2")
print(f"Surface area: {area_m2 * 100**2:,.3f} cm^2")
print(f"Surface area: {area_m2 / METERS_PER_INCH**2:,.3f} in^2")
print(f"Surface area: {area_m2 / METERS_PER_FOOT**2:,.3f} ft^2")
