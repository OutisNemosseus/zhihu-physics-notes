"""Tong Su | ENGR 103 HW 1-1 | Triangle area from dimensions in inches."""
base_in = float(input("Triangle base (in): "))
height_in = float(input("Triangle height (in): "))
area_in2 = base_in * height_in / 2
print(f"Area: {area_in2:.3f} in^2")
print(f"Area: {area_in2 * 2.54**2:.3f} cm^2")
print(f"Area: {area_in2 / 12**2:.3f} ft^2")
print(f"Area: {area_in2 * 0.0254**2:.3f} m^2")
