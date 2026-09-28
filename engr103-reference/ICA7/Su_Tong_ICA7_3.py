"""Tong Su | ENGR 103 ICA 7-3 | Fibonacci sequence as a NumPy array."""
import numpy as np


def fib(n):
    """Return the first n Fibonacci numbers, beginning 0, 1."""
    if not isinstance(n, int) or n < 0:
        raise ValueError("n must be a nonnegative integer.")
    values = []
    for _ in range(n):
        values.append(0 if not values else 1 if len(values) == 1 else values[-1] + values[-2])
    return np.array(values, dtype=object)


if __name__ == "__main__":
    print("12 terms:", fib(12))
    print("20 terms:", fib(20))
