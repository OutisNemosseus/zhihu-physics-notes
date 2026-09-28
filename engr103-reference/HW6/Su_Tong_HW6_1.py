"""Tong Su | ENGR 103 HW 6-1 | Animate y=5 ln(x)+10 and save GIF."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, PillowWriter
import numpy as np

x = np.linspace(0.1, 20, 100)
y = 5 * np.log(x) + 10
fig, ax = plt.subplots(figsize=(8, 4))
ax.set(xlim=(0, 20), ylim=(min(0, y.min() - 1), y.max() + 2),
       xlabel="Horizontal distance x [m]", ylabel="Vertical distance y [m]",
       title=r"$y=5\ln(x)+10$")
ax.grid()
line, = ax.plot([], [], color="teal", linewidth=2)


def update(frame):
    line.set_data(x[:frame + 1], y[:frame + 1])
    return (line,)


animation = FuncAnimation(fig, update, frames=len(x), interval=40, blit=True)
animation.save(Path(__file__).with_name("HW6_1.gif"), writer=PillowWriter(fps=20))
plt.close(fig)
print("Saved HW6_1.gif")
