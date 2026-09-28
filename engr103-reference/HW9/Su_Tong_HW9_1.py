"""Tong Su | ENGR 103 HW 9-1 | Mesh and resistor currents."""
import numpy as np

R1, R2, R3, R4 = 18.0, 10.0, 16.0, 6.0
R5, R6, R7, R8 = 15.0, 8.0, 12.0, 14.0
V1, V2, V3 = 20.0, 12.0, 40.0
A = np.array([[R1 + R2 + R3, -R2, -R3, 0],
              [-R2, R2 + R4 + R5 + R7, -R4, -R7],
              [-R3, -R4, R3 + R4 + R6, -R6],
              [0, -R7, -R6, R6 + R7 + R8]])
meshes = np.linalg.solve(A, [V1, 0, -V2, V3])
for index, current in enumerate(meshes, 1):
    print(f"Mesh I{index}: {current:.3f} A")

# For a shared resistor, use the difference in adjacent mesh currents.
branch = {"R1": meshes[0], "R2": meshes[0] - meshes[1],
          "R3": meshes[0] - meshes[2], "R4": meshes[1] - meshes[2],
          "R5": meshes[1], "R6": meshes[2] - meshes[3],
          "R7": meshes[1] - meshes[3], "R8": meshes[3]}
for name, current in branch.items():
    print(f"{name} current (signed in mesh direction): {current:+.3f} A")
