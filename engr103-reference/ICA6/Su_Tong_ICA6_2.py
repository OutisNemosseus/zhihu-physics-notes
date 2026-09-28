"""Tong Su | ENGR 103 ICA 6-2 | US lengths to metric, using if/elif."""


def us2metlen(x, in_unit="in", out_unit="cm"):
    """Convert x from in/ft/yd/mi/nmi to nm/um/mm/cm/m/km."""
    if in_unit == "in":
        meters = x * 0.0254
    elif in_unit == "ft":
        meters = x * 0.3048
    elif in_unit == "yd":
        meters = x * 0.9144
    elif in_unit == "mi":
        meters = x * 1609.344
    elif in_unit == "nmi":
        meters = x * 1852.0
    else:
        raise ValueError(f"Unsupported US unit: {in_unit}")
    if out_unit == "nm":
        return meters / 1e-9
    elif out_unit == "um":
        return meters / 1e-6
    elif out_unit == "mm":
        return meters / 1e-3
    elif out_unit == "cm":
        return meters / 1e-2
    elif out_unit == "m":
        return meters
    elif out_unit == "km":
        return meters / 1e3
    raise ValueError(f"Unsupported metric unit: {out_unit}")


if __name__ == "__main__":
    print(f"12 in = {us2metlen(12):.2f} cm")
