"""Tong Su | ENGR 103 ICA 6-1 | Animate a projectile and save a GIF."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, PillowWriter
import numpy as np

v0, angle, g = 25.0, np.deg2rad(45), 9.81
tf = 2 * v0 * np.sin(angle) / g
t = np.linspace(0, tf, 100)
x = v0 * np.cos(angle) * t
y = v0 * np.sin(angle) * t - 0.5 * g * t**2
fig, ax = plt.subplots(figsize=(8, 4))
ax.set(xlim=(0, x.max() * 1.05), ylim=(0, y.max() * 1.15),
       xlabel="Horizontal position [m]", ylabel="Height [m]", title="Projectile motion")
ax.grid()
line, = ax.plot([], [], color="navy")
point, = ax.plot([], [], "ro")


def update(frame):
    line.set_data(x[:frame + 1], y[:frame + 1])
    point.set_data([x[frame]], [y[frame]])
    return line, point


animation = FuncAnimation(fig, update, frames=len(t), interval=40, blit=True)
animation.save(Path(__file__).with_name("ICA6_1.gif"), writer=PillowWriter(fps=20))
plt.close(fig)
print(f"Flight time: {tf:.3f} s; GIF saved as ICA6_1.gif")
