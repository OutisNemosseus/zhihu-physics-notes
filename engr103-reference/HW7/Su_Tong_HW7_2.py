"""Tong Su | ENGR 103 HW 7-2 | Symmetric Pascal matrices."""
import numpy as np


def pasm(n):
    """Return an n-by-n Pascal matrix with ones on top row and left column."""
    if not isinstance(n, int) or n < 1:
        raise ValueError("n must be a positive integer.")
    result = np.ones((n, n), dtype=object)
    for row in range(1, n):
        for col in range(1, n):
            result[row, col] = result[row - 1, col] + result[row, col - 1]
    return result


if __name__ == "__main__":
    print("4 x 4:\n", pasm(4))
    print("7 x 7:\n", pasm(7))
