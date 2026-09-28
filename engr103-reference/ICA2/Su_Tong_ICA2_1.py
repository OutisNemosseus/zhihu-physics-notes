"""Tong Su | ENGR 103 ICA 2-1 | One- and two-dimensional NumPy arrays."""
import numpy as np

A = np.fromstring(input("Enter 1D values separated by spaces: "), sep=" ")
rows = int(input("Number of rows in matrix B: "))
values = [np.fromstring(input(f"Row {i + 1} values: "), sep=" ") for i in range(rows)]
if not values or len({len(row) for row in values}) != 1:
    raise ValueError("Enter at least one row and the same number of values in each row.")
B = np.array(values)
C = np.arange(6.4, 12.0 + 0.8 / 2, 0.8)
D = np.linspace(44, 23, 7)
for name, arr in (("A", A), ("B", B), ("C", C), ("D", D)):
    print(f"{name} =\n{arr}")
