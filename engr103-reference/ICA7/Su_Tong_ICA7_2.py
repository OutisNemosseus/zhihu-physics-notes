"""Tong Su | ENGR 103 ICA 7-2 | Build matrix using nested loops."""
import numpy as np


def rowcol(R, C):
    """Entry (i,j) = i**j/(i+j), with row/column indices starting at 1."""
    if not isinstance(R, int) or not isinstance(C, int) or R < 1 or C < 1:
        raise ValueError("R and C must be positive integers.")
    matrix = np.empty((R, C))
    for i in range(1, R + 1):
        for j in range(1, C + 1):
            matrix[i - 1, j - 1] = i**j / (i + j)
    return matrix


if __name__ == "__main__":
    print(np.round(rowcol(5, 5), 2))
