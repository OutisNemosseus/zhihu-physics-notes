"""Tong Su | ENGR 103 ICA 3-3 | Transistor counts and exponential trend."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

folder = Path(__file__).resolve().parent
counts, years = np.loadtxt(folder / "ENGR103 ICA_03_Transistor Count.csv",
                           delimiter=",", unpack=True)
mask = counts > 0
counts, years = counts[mask], years[mask]
slope, intercept = np.polyfit(years - years.min(), np.log(counts), 1)
xs = np.linspace(years.min(), years.max(), 400)
fit = np.exp(intercept + slope * (xs - years.min()))
fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(years, counts, "o", markersize=8, markerfacecolor="lightblue",
        markeredgecolor="black", linestyle="none", label="Integrated circuits")
ax.plot(xs, fit, "r--", label=f"Exponential fit (doubling time {np.log(2)/slope:.2f} years)")
ax.set_yscale("log")
ax.set(title="Moore's Law: The number of transistors on a microchip doubles every two years",
       xlabel="Year", ylabel="Transistor count")
ax.grid(color="black", alpha=0.3, which="both")
ax.legend()
fig.tight_layout()
fig.savefig(folder / "ICA3_3.png", dpi=160)
print(f"Fitted doubling time: {np.log(2) / slope:.3f} years")
