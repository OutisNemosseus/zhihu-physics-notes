const Q = [
["ica6-1","ICA 6","抛体动画","Launch at 18 m/s and 35°. Assemble the script that samples the motion and saves a GIF.","先算速度分量与落地时间，再算坐标，最后更新动画。",
"import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.animation import FuncAnimation, PillowWriter\nfig, ax = plt.subplots()\nax.set(xlim=(0, 35), ylim=(-1, 7))\npoint, = ax.plot([], [], 'ro')",
[
["L02",59,"theta = np.deg2rad(35)\nvx = 18 * np.cos(theta)\nvy = 18 * np.sin(theta)",[]],
["L02",29,"t = np.linspace(0, 2 * vy / 9.81, 60)",[0]],
["L05",30,"x = vx * t\ny = vy * t - 9.81 * t**2 / 2",[1]],
["L05",32,"def update(i):\n    point.set_data([x[i]], [y[i]])\n    return point,",[]],
["L05",34,"ani = FuncAnimation(fig, update, frames=len(t))\nani.save('practice_projectile.gif', writer=PillowWriter(fps=24))",[2,3]]
]],
["ica6-2","ICA 6","用 if 换算长度","Convert yards or miles to metres or kilometres. The function should return 4.572 for 5 yd in metres.","先转成米，再按目标单位返回。两段判断使用相同的 if/elif/else 结构。","",
[
["L05",8,"def to_metric(x, src='yd', dst='m'):",[]],
["L06",17,"    if src == 'yd':\n        metres = x * 0.9144\n    elif src == 'mi':\n        metres = x * 1609.344\n    else:\n        raise ValueError('Unknown source')",[0]],
["L06",17,"    if dst == 'm':\n        return metres\n    elif dst == 'km':\n        return metres / 1000\n    else:\n        raise ValueError('Unknown destination')",[1]],
["L05",8,"print(to_metric(5))",[2]]
]],
["ica6-3","ICA 6","用 match 换算长度","Convert centimetres or metres to inches or feet. Check that 30.48 cm gives 1 ft.","第一段 match 决定输入倍率，第二段 match 决定输出倍率。","",
[
["L05",8,"def to_us(x, src='cm', dst='ft'):",[]],
["L06",22,"    match src:\n        case 'cm':\n            metres = x / 100\n        case 'm':\n            metres = x\n        case _:\n            raise ValueError('Unknown source')",[0]],
["L06",22,"    match dst:\n        case 'in':\n            return metres / 0.0254\n        case 'ft':\n            return metres / 0.3048\n        case _:\n            raise ValueError('Unknown destination')",[1]],
["L05",8,"print(to_us(30.48))",[2]]
]],
["ica6-4","ICA 6","组合两个换算函数","Compose two existing converters. Check that 2 yd gives 6 ft through metres.","先调用第一段函数得到 metres，再把它作为第二段函数的输入。","def yd_to_m(x):\n    return x * 0.9144\n\ndef m_to_ft(x):\n    return x / 0.3048",
[
["L05",8,"def convert(x, route='yd→ft'):",[]],
["L06",22,"    match route:\n        case 'yd→ft':",[0]],
["L05",12,"            metres = yd_to_m(x)\n            return m_to_ft(metres)",[1]],
["L06",22,"        case _:\n            raise ValueError('Unknown route')",[2]],
["L05",8,"print(convert(2))",[3]]
]],
["ica7-1","ICA 7","CSV 与二维列数组","Load a numeric golf CSV and return its handicap differential as an N × 1 array.","用 0:1 保留第二个维度。公式先做 score − rating，再乘 113 并除以 slope。","import numpy as np",
[
["L02",81,"data = np.genfromtxt('practice_golf.csv', delimiter=',', dtype=float)",[]],
["L02",36,"rating = data[:, 0:1]\nslope = data[:, 1:2]\nscore = data[:, 2:3]",[0]],
["L02",25,"hcd = (score - rating) * 113 / slope",[1]],
["L02",34,"print(hcd, hcd.shape)",[2]]
]],
["ica7-2","ICA 7","用双层循环填矩阵","Fill a 3 × 4 array with r**c/(r+c), where mathematical row and column numbers start at 1.","NumPy 的索引从 0 起。先建立数组，再由内外两层循环生成索引。","import numpy as np",
[
["L02",25,"matrix = np.zeros((3, 4))",[]],
["L07",27,"for i in range(3):\n    for j in range(4):",[0]],
["L02",34,"        r, c = i + 1, j + 1\n        matrix[i, j] = r**c / (r + c)",[1]],
["L02",34,"print(matrix[1, 2])",[2]]
]],
["ica7-3","ICA 7","Fibonacci 循环","Build nine Fibonacci numbers starting with 0 and 1. The last value should be 21.","数组先有空间，再设种子，从索引 2 开始用前两项求和。","import numpy as np",
[
["L02",25,"seq = np.zeros(9, dtype=int)",[]],
["L02",33,"seq[1] = 1",[0]],
["L07",23,"for i in range(2, len(seq)):\n    seq[i] = seq[i - 1] + seq[i - 2]",[1]],
["L02",33,"print(seq[-1])",[2]]
]],
["hw6-1","HW 6","对数曲线 GIF","Animate y = 3 log₁₀(x) + 4 on 0.2 ≤ x ≤ 12 and save the animation.","linspace 产生 x，log10 逐项计算 y。每帧更新到当前坐标。","import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.animation import FuncAnimation, PillowWriter\nfig, ax = plt.subplots()\nax.set(xlim=(0, 12), ylim=(1, 8))\nline, = ax.plot([], [])",
[
["L02",29,"x = np.linspace(0.2, 12, 60)",[]],
["L02",60,"y = 3 * np.log10(x) + 4",[0]],
["L05",32,"def update(i):\n    line.set_data(x[:i + 1], y[:i + 1])\n    return line,",[]],
["L05",33,"ani = FuncAnimation(fig, update, frames=len(x))",[1,2]],
["L05",34,"ani.save('practice_log.gif', writer=PillowWriter(fps=24))",[3]]
]],
["hw6-2","HW 6","if 版温标换算","Convert Fahrenheit or Kelvin to Celsius using if/elif/else. Test 68 °F and 293.15 K.","输入分支先统一成摄氏度，return 应在判断块之后。","",
[
["L05",8,"def to_celsius(t, unit='F'):",[]],
["L06",17,"    if unit == 'F':\n        c = (t - 32) * 5 / 9\n    elif unit == 'K':\n        c = t - 273.15\n    else:\n        raise ValueError('Unknown unit')",[0]],
["L05",12,"    return c",[1]],
["L05",8,"print(to_celsius(68), to_celsius(293.15, 'K'))",[2]]
]],
["hw6-3","HW 6","match 版温标换算","Convert Celsius to Kelvin or Rankine using match/case. Check 20 °C in both units.","匹配目标温标并返回对应数值，case _ 处理未知单位。","",
[
["L05",8,"def from_celsius(c, unit='K'):",[]],
["L06",22,"    match unit:\n        case 'K':\n            return c + 273.15\n        case 'R':\n            return (c + 273.15) * 9 / 5",[0]],
["L06",22,"        case _:\n            raise ValueError('Unknown unit')",[1]],
["L05",8,"print(from_celsius(20), from_celsius(20, 'R'))",[2]]
]],
["hw7-1","HW 7","逐行求三角形面积","Calculate the area of two triangles given sides and their included angle in degrees. Return a 2 × 1 array.","每行先解包，再转弧度，再写进面积列。第一组面积是 6。","import numpy as np\ntriangles = np.array([[3, 4, 90], [6, 8, 30]])",
[
["L02",25,"area = np.zeros((triangles.shape[0], 1))",[]],
["L07",23,"for i in range(triangles.shape[0]):\n    a, b, degrees = triangles[i, :]",[0]],
["L02",59,"    theta = np.deg2rad(degrees)\n    area[i, 0] = a * b * np.sin(theta) / 2",[1]],
["L02",34,"print(area)",[2]]
]],
["hw7-2","HW 7","填 Pascal 矩阵","Build a 5 × 5 symmetric Pascal matrix. Each interior entry is the sum of its upper and left neighbours.","先把第一行、第一列置成 1，循环从索引 1 开始。右下角是 70。","import numpy as np",
[
["L02",25,"matrix = np.ones((5, 5), dtype=int)",[]],
["L07",27,"for i in range(1, 5):\n    for j in range(1, 5):",[0]],
["L02",34,"        matrix[i, j] = matrix[i - 1, j] + matrix[i, j - 1]",[1]],
["L02",34,"print(matrix[-1, -1])",[2]]
]],
["hw7-3","HW 7","递归计算各位数字和","Use recursion to find the digit sum of 5029. The expected sum is 16.","个位数直接返回。其他整数取末位，并递归处理去掉末位后的数。","",
[
["L07",32,"def digits(n):",[]],
["L07",32,"    if n < 10:\n        return n",[0]],
["L07",34,"    return n % 10 + digits(n // 10)",[1]],
["L05",8,"print(digits(5029))",[2]]
]]
];
