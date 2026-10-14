export const q01Code = `import numpy as np
import matplotlib.pyplot as plt

data = np.loadtxt("batch19-engr103-q01-threshold.csv", delimiter=",", skiprows=1)
x = data[:, 0]
y = data[:, 1]
m, c = np.polyfit(x, y, 1)
x_fit = np.array([x.min(), x.max()])
y_fit = m * x_fit + c

plt.plot(x, y, linestyle="none", marker="o", markersize=8,
         markerfacecolor="blue", markeredgecolor="red", markeredgewidth=2,
         label="Observed data")
plt.plot(x_fit, y_fit, color="teal", linestyle="--", linewidth=2,
         label="Linear best fit")
plt.title("Threshold voltage (VT) Testing",
          fontsize=20, fontweight="bold", pad=10, color="blue")
plt.xlabel("Time (t) [sec]", labelpad=4, loc="center",
           fontsize=15, fontweight="semibold", color="blue")
plt.ylabel("Threshold voltage (VT) [Volts]", labelpad=4, loc="center",
           fontsize=15, fontweight="semibold", color="blue")
plt.legend()
plt.grid(color="blue")
plt.tight_layout()
plt.savefig("threshold-voltage-fit.png", dpi=300)
plt.show()
print(f"m = {m:.7g}, c = {c:.7g}")
`;
export const q07Code = `import numpy as np
import matplotlib.pyplot as plt

data = np.loadtxt("batch19-engr103-q07-transistors.csv", delimiter=",", skiprows=1)
count = data[:, 0]  # First column: transistor count
year = data[:, 1]   # Second column: year
t = year - 1983
b, a = np.polyfit(t, np.log(count), 1)
year_fit = np.linspace(year.min(), year.max(), 300)
count_fit = np.exp(a + b * (year_fit - 1983))

plt.plot(year, count, linestyle="none", marker="o", markersize=8,
         markerfacecolor="lightblue", markeredgecolor="black", label="Observed data")
plt.plot(year_fit, count_fit, color="red", label="Exponential trendline")
plt.yscale("log")
plt.title("Moore's Law: The number of transistors on a microchip\\ndoubles every two years (synthetic practice data)", fontsize=12)
plt.xlabel("Year the Microchip was Introduced (x) [Years]", fontsize=10)
plt.ylabel("Transistor Count (y) [Transistors]", fontsize=10)
plt.legend()
plt.grid(color="black")
plt.tight_layout()
plt.savefig("transistor-count-fit.png", dpi=200)
plt.show()
print(f"ln(count) = {a:.7g} + {b:.7g} * (year - 1983)")
`;
export function uploadedCode(filename) {
  return `import numpy as np\nimport matplotlib.pyplot as plt\n\ndata = np.loadtxt(${JSON.stringify(filename)}, delimiter=",", skiprows=1, ndmin=2)\nprint("Data shape:", data.shape)\n\n# Edit this code for your CSV columns.\nx = data[:, 0]\ny = data[:, 1]\nplt.plot(x, y, "o", label="CSV data")\nplt.title("CSV plot", fontsize=16, color="blue")\nplt.xlabel("x", fontsize=12)\nplt.ylabel("y", fontsize=12)\nplt.legend()\nplt.grid(color="green")\nplt.tight_layout()\nplt.savefig("csv-plot.png", dpi=150)\nplt.show()\n`;
}
export class CsvWorkspace {
  constructor({ q01, q07, saved = {}, initialCode = '' }) {
    this.tabs = [
      { id: 'scratch', label: '自由编写', code: initialCode },
      { id: 'q01', label: 'Q01 · 电压 CSV', name: 'batch19-engr103-q01-threshold.csv', content: q01, code: q01Code },
      { id: 'q07', label: 'Q07 · 晶体管 CSV', name: 'batch19-engr103-q07-transistors.csv', content: q07, code: q07Code },
    ];
    const savedCodes = saved.datasetCodes && typeof saved.datasetCodes === 'object' ? saved.datasetCodes : {};
    for (const tab of this.tabs) if (typeof savedCodes[tab.id] === 'string') tab.code = savedCodes[tab.id];
    this.activeId = this.tabs.some((tab) => tab.id === saved.datasetId) ? saved.datasetId : 'scratch';
  }
  get active() { return this.tabs.find((tab) => tab.id === this.activeId); }
  saveCode(code) { this.active.code = code; }
  select(id) { if (!this.tabs.some((tab) => tab.id === id)) throw new Error('Unknown CSV tab'); this.activeId = id; return this.active; }
  addFile(name, content) {
    if (!name || /[\\/\0]/.test(name) || !/\.csv$/i.test(name)) throw new Error('请选择文件名有效的 CSV 文件。');
    const id = `upload:${name}`;
    let tab = this.tabs.find((item) => item.id === id);
    if (tab) tab.content = content;
    else { tab = { id, label: name, name, content, code: uploadedCode(name) }; this.tabs.push(tab); }
    return id;
  }
  files() {
    const map = new Map();
    for (const tab of this.tabs) if (tab.name) map.set(tab.name, { name: tab.name, content: tab.content });
    if (this.active.name) map.set(this.active.name, { name: this.active.name, content: this.active.content });
    return [...map.values()];
  }
  snapshot() { return { datasetId: this.activeId, datasetCodes: Object.fromEntries(this.tabs.map((tab) => [tab.id, tab.code])) }; }
}
