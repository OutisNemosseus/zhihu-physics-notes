"""ENGR 103 ICA 1-2: hydrostatic gauge pressure."""


WATER_DENSITY_KG_M3 = 1000.0
GRAVITY_M_S2 = 9.81
PA_PER_ATM = 101325.0
PSI_PER_ATM = 14.7  # Conversion specified in the assignment.

depth_m = float(input("Fluid depth (m): "))
specific_gravity = float(input("Fluid specific gravity (unitless): "))

if depth_m < 0 or specific_gravity < 0:
    raise ValueError("Depth and specific gravity must be nonnegative.")

fluid_density = specific_gravity * WATER_DENSITY_KG_M3
pressure_pa = fluid_density * GRAVITY_M_S2 * depth_m
pressure_psi = pressure_pa * PSI_PER_ATM / PA_PER_ATM

print(f"Hydrostatic pressure: {pressure_pa:,.1f} Pa")
print(f"Hydrostatic pressure: {pressure_psi:.3f} psi")
