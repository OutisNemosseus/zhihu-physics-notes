import numpy as np
import matplotlib.pyplot as plt

v = np.linspace(-2, 2, 41)
X, Y = np.meshgrid(v, v)
Z = X*np.exp(-X**2-Y**2)
fig = plt.figure(figsize=(11, 5))
ax1 = fig.add_subplot(121, projection="3d")
ax2 = fig.add_subplot(122, projection="3d")
p1 = ax1.plot_surface(X, Y, Z, cmap="jet")
p2 = ax2.plot_surface(X, Y, Z, cmap="jet")
ax2.contour(X, Y, Z, levels=20, zdir="z", offset=-0.6, cmap="jet")
ax2.set_zlim(-0.6, 0.5)
for ax in (ax1, ax2):
    ax.set(xlabel="x [cm]", ylabel="y [cm]", zlabel="z")
    ax.view_init(elev=35, azim=-130)
ax1.set_title("Surface")
ax2.set_title("Surface + projected contours")
fig.colorbar(p1, ax=ax1)
fig.colorbar(p2, ax=ax2)
fig.tight_layout()
fig.savefig("ICA4_reference_4.png", dpi=150)
plt.show()
