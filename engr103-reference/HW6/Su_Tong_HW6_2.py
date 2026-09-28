"""Tong Su | ENGR 103 HW 6-2 | Temperature conversion via if/elif."""


def convtemp(t, in_unit="F", out_unit="C"):
    """Convert among F, C, K, R via absolute Kelvin temperature."""
    if in_unit == "F":
        kelvin = (t + 459.67) * 5 / 9
    elif in_unit == "C":
        kelvin = t + 273.15
    elif in_unit == "K":
        kelvin = t
    elif in_unit == "R":
        kelvin = t * 5 / 9
    else:
        raise ValueError(f"Unknown input unit: {in_unit}")
    if kelvin < 0:
        raise ValueError("Temperature cannot be below absolute zero.")
    if out_unit == "F":
        return kelvin * 9 / 5 - 459.67
    elif out_unit == "C":
        return kelvin - 273.15
    elif out_unit == "K":
        return kelvin
    elif out_unit == "R":
        return kelvin * 9 / 5
    raise ValueError(f"Unknown output unit: {out_unit}")


if __name__ == "__main__":
    print(f"32 F = {convtemp(32):.2f} C")
