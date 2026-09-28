"""Tong Su | ENGR 103 ICA 5-1 | Dot product and angle without np.dot."""
from math import acos, degrees, sqrt


def dotproduct(A, B):
    """Return the scalar product and the angle in degrees of two 3D vectors."""
    if len(A) != 3 or len(B) != 3:
        raise ValueError("Provide two vectors with exactly three components each.")
    scalar = sum(A[i] * B[i] for i in range(3))
    norm_a = sqrt(sum(value**2 for value in A))
    norm_b = sqrt(sum(value**2 for value in B))
    if norm_a == 0 or norm_b == 0:
        raise ValueError("The angle is undefined for the zero vector.")
    cosine = max(-1.0, min(1.0, scalar / (norm_a * norm_b)))
    return scalar, degrees(acos(cosine))


if __name__ == "__main__":
    product, angle = dotproduct([3, -4, 2], [2, 5, -6])
    print(f"Dot product: {product}")
    print(f"Angle: {angle:.3f} degrees")
