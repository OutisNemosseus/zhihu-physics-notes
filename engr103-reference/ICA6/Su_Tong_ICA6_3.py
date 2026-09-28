"""Tong Su | ENGR 103 ICA 6-3 | Metric lengths to US, using match."""


def met2uslen(x, in_unit="cm", out_unit="in"):
    """Convert x from nm/um/mm/cm/m/km to in/ft/yd/mi/nmi."""
    match in_unit:
        case "nm": meters = x * 1e-9
        case "um": meters = x * 1e-6
        case "mm": meters = x * 1e-3
        case "cm": meters = x * 1e-2
        case "m": meters = x
        case "km": meters = x * 1e3
        case _: raise ValueError(f"Unsupported metric unit: {in_unit}")
    match out_unit:
        case "in": return meters / 0.0254
        case "ft": return meters / 0.3048
        case "yd": return meters / 0.9144
        case "mi": return meters / 1609.344
        case "nmi": return meters / 1852.0
        case _: raise ValueError(f"Unsupported US unit: {out_unit}")


if __name__ == "__main__":
    print(f"30.48 cm = {met2uslen(30.48):.2f} in")
