import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
A0 = 1.2
m = 10
k = 2.5
b1 = np.sqrt(4 * m * k) / 2
b2 = np.sqrt(4 * m * k)
b3 = np.sqrt(4 * m * k) / 0.5
w0 = np.sqrt(k / m)
a1 = b1 / (2 * m)
a2 = b2 / (2 * m)
a3 = b3 / (2 * m)
t = np.linspace(0, 20, 2001)
y1 = A0 * np.exp(-a1 * t) * np.cos(w0 * t)
y2 = A0 * np.exp(-a2 * t) * np.cos(w0 * t)
y3 = A0 * np.exp(-a3 * t) * np.cos(w0 * t)
plt.plot(t, y1, color="blue", linestyle="-", label=r"Underdamped $b=\sqrt{4mk}/2$")
plt.plot(t, y2, color="red", linestyle="--", label=r"Critically Damped $b=\sqrt{4mk}$")
plt.plot(t, y3, color="black", linestyle=":", label=r"Overdamped $b=\sqrt{4mk}/0.5$")
plt.title("Damped Harmonic Motion of Springs")
plt.xlabel("Time (t) [sec]")
plt.ylabel("Displacement (y) [m]")
plt.legend()
plt.grid(color="green")
plt.text(0.35, 0.85, r"$y(t)=A_0e^{-\alpha t}\cos(\omega_0 t)$,  $\alpha=b/(2m)$", transform=plt.gca().transAxes)
plt.savefig("q04.png", dpi=120)
print(b1, b2, b3, w0, a1, a2, a3)
