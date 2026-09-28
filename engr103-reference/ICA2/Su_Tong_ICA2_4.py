"""Tong Su | ENGR 103 ICA 2-4 | Trail-mix bag counts from ingredient mass."""
import numpy as np

# Ingredient amounts per bag (oz). Rows = ingredients; columns = mixes 1-5.
ingredients = np.array([[3, 1, 1, 2, 1],
                        [1, 2, 1, 0, 2],
                        [1, 1, 0, 3, 3],
                        [2, 3, 3, 1, 0],
                        [1, 1, 3, 2, 2]], dtype=float)
available_lb = np.array([105, 74, 102, 118, 121], dtype=float)
# 1 pound-force denotes weight; its equivalent ounce-force count is 16.
physical_bags = np.linalg.solve(ingredients, available_lb * 16)
handout_bags = np.linalg.solve(ingredients, available_lb * 2)
print("If listed supplies really are pounds (1 lb = 16 oz):")
for index, number in enumerate(physical_bags, start=1):
    print(f"Mix {index}: {number:.1f} bags")
print("The handout's 26, 22, 30, 28, 24 check values require multiplying")
print("the listed numbers by 2 instead of 16; these conflict with 'lbf'.")
print("Handout check numbers:", handout_bags)
