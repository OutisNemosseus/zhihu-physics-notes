"""Tong Su | ENGR 103 HW 7-3 | Recursive digit sum without loops."""


def sumdig(num):
    """Sum decimal digits of an integer using only recursion and arithmetic."""
    if type(num) is not int:
        raise TypeError("num must be an integer, not a float or boolean.")
    if num < 0:
        return sumdig(-num)
    if num < 10:
        return num
    return num % 10 + sumdig(num // 10)


if __name__ == "__main__":
    print("sumdig(123456) =", sumdig(123456))
