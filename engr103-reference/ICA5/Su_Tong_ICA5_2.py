"""Tong Su | ENGR 103 ICA 5-2 | Import and use the preceding function."""
from Su_Tong_ICA5_1 import dotproduct

A, B = [3, -4, 2], [2, 5, -6]
scalar, angle_deg = dotproduct(A, B)
print(f"Dot product: {scalar}")
print(f"Angle between vectors: {angle_deg:.3f} degrees")
