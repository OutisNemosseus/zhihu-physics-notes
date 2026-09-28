"""Tong Su | ENGR 103 ICA 6-4 | Convert any supported length pair."""
from Su_Tong_ICA6_2 import us2metlen
from Su_Tong_ICA6_3 import met2uslen


def convlen(x, in_unit="in", out_unit="cm"):
    """Convert US/metric length units through meters, using prior functions."""
    metric = ("nm", "um", "mm", "cm", "m", "km")
    us = ("in", "ft", "yd", "mi", "nmi")
    match (in_unit in us, out_unit in us):
        case (True, False) if out_unit in metric:
            return us2metlen(x, in_unit, out_unit)
        case (False, True) if in_unit in metric:
            return met2uslen(x, in_unit, out_unit)
        case (True, True):
            return met2uslen(us2metlen(x, in_unit, "m"), "m", out_unit)
        case (False, False) if in_unit in metric and out_unit in metric:
            return us2metlen(met2uslen(x, in_unit, "in"), "in", out_unit)
        case _:
            raise ValueError(f"Unsupported conversion: {in_unit} -> {out_unit}")


if __name__ == "__main__":
    print(f"1 mi = {convlen(1, 'mi', 'km'):.6f} km")
    print(f"1 km = {convlen(1, 'km', 'mi'):.6f} mi")
