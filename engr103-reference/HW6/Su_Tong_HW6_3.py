"""Tong Su | ENGR 103 HW 6-3 | Temperature conversion via match."""


def convtemp(t, in_unit="F", out_unit="C"):
    """Convert among F, C, K, R via absolute Kelvin temperature."""
    match in_unit:
        case "F": kelvin = (t + 459.67) * 5 / 9
        case "C": kelvin = t + 273.15
        case "K": kelvin = t
        case "R": kelvin = t * 5 / 9
        case _: raise ValueError(f"Unknown input unit: {in_unit}")
    if kelvin < 0:
        raise ValueError("Temperature cannot be below absolute zero.")
    match out_unit:
        case "F": return kelvin * 9 / 5 - 459.67
        case "C": return kelvin - 273.15
        case "K": return kelvin
        case "R": return kelvin * 9 / 5
        case _: raise ValueError(f"Unknown output unit: {out_unit}")


if __name__ == "__main__":
    print(f"0 C = {convtemp(0, 'C', 'F'):.2f} F")
