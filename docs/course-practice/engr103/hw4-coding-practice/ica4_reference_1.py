import matplotlib.pyplot as plt
import numpy as np

z = np.linspace(0, 8 * np.pi, 800)
x, y = np.cos(z), np.sin(z)
fig = plt.figure(figsize=(11, 5))
for index, (elev, azim) in enumerate(((30, -165), (45, -130)), 1):
    ax = fig.add_subplot(1, 2, index, projection="3d")
    ax.plot(x, y, z, color="navy")
    ax.view_init(elev=elev, azim=azim)
    ax.set(xlabel="x [cm]", ylabel="y [cm]", zlabel="z [cm]", title=f"View {index}")
fig.tight_layout()
fig.savefig("ICA4_reference_1.png", dpi=150)

plt.show()
