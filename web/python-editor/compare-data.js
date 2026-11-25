export const weeks = [
  [
    5,
    "函数与参数",
    [
      [
        "ENGR 103 ICA 5",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
      ],
      [
        "ENGR 103 HW 5",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658198"
      ]
    ]
  ],
  [
    6,
    "动画与条件分支",
    [
      [
        "ENGR 103 ICA 6",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
      ],
      [
        "ENGR 103 HW 6",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658206"
      ]
    ]
  ],
  [
    7,
    "循环、数组与递推",
    [
      [
        "ENGR 103 ICA 7",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
      ],
      [
        "ENGR 103 HW 7",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658213"
      ]
    ]
  ],
  [
    8,
    "TXT、CSV 与 Excel",
    [
      [
        "ENGR 103 ICA 8",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
      ],
      [
        "ENGR 103 HW 8",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658222"
      ]
    ]
  ],
  [
    9,
    "线性方程与数值方法",
    [
      [
        "ENGR 103 ICA 9",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
      ],
      [
        "ENGR 103 HW 9",
        "https://linnbenton.instructure.com/courses/12961/modules/items/658229"
      ]
    ]
  ]
];
export const pairs = [
  [
    5,
    "ICA 5.1 · 点积与向量夹角",
    "HW 5.1 · 极坐标两点距离",
    "输入的角度都需要转成弧度。ICA 用点积和向量长度求夹角，HW 用已知夹角与半径求距离。",
    [
      [
        "把输入代入各自的几何公式",
        "dot = A[0] * B[0] + A[1] * B[1] + A[2] * B[2]\ncos_angle = dot / (np.linalg.norm(A) * np.linalg.norm(B))",
        "delta_rad = np.deg2rad(theta_a - theta_b)\nd_squared = ra**2 + rb**2 - 2 * ra * rb * np.cos(delta_rad)"
      ],
      [
        "返回由三角关系求出的量",
        "angle_deg = np.rad2deg(np.arccos(np.clip(cos_angle, -1, 1)))\nreturn dot, angle_deg",
        "return np.sqrt(np.maximum(d_squared, 0))"
      ]
    ]
  ],
  [
    5,
    "ICA 5.2 · 导入并测试点积函数",
    "HW 5.1–5.3 · 调用并验证自定义函数",
    "ICA 专门练习跨文件导入。HW 复用调用和测试的方法，函数也可以与测试写在同一个文件。",
    [
      [
        "准备可手算的输入",
        "A = np.array([3, -4, 2])\nB = np.array([2, 5, -6])",
        "r1, theta1 = 3, 0\nr2, theta2 = 4, 90"
      ],
      [
        "调用和验证",
        "dot, angle_deg = dotproduct(A, B)\nassert np.isclose(dot, -26)",
        "distance = poldist(r1, theta1, r2, theta2)\nassert np.isclose(distance, 5)"
      ]
    ]
  ],
  [
    5,
    "ICA 5.3 · 抛体的高度、速度和时间",
    "HW 5.2 · 圆柱表面积与体积",
    "用同一组数组输入计算多个结果，再拆开返回值作图。",
    [
      [
        "计算并返回多组数据",
        "def prohvt(v0, theta, tf, t0=0, g=9.81):\n    t = np.linspace(t0, tf, 100)\n    vx = v0 * np.cos(np.deg2rad(theta))\n    vy0 = v0 * np.sin(np.deg2rad(theta))\n    h = vy0 * t - g * t**2 / 2\n    v = np.hypot(vx, vy0 - g * t)\n    return h, v, t",
        "def cylsav(r, h):\n    sa = 2 * np.pi * r * h + 2 * np.pi * r**2\n    v = np.pi * r**2 * h\n    return sa, v"
      ],
      [
        "把返回的数组用于两张子图",
        "height, speed, t = prohvt(v0, theta, tf, g=g)\nax_height.plot(t, height)\nax_speed.plot(t, speed)",
        "area, volume = cylsav(r, h=15)\nax_area.plot(r, area)\nax_volume.plot(r, volume)"
      ]
    ]
  ],
  [
    5,
    "ICA 5.3 · 抛体函数与数组参数",
    "HW 5.3 · 平移椭圆",
    "两题都用默认参数控制坐标计算。椭圆图上的实数点要求 h−a ≤ x ≤ h+a，超出范围的 x 不参与开方。",
    [
      [
        "封装数组计算与默认参数",
        "def prohvt(v0, theta, tf, t0=0, g=9.81):\n    t = np.linspace(t0, tf, 100)\n    vx = v0 * np.cos(np.deg2rad(theta))\n    vy0 = v0 * np.sin(np.deg2rad(theta))\n    h = vy0 * t - g * t**2 / 2\n    v = np.hypot(vx, vy0 - g * t)\n    return h, v, t",
        "def ellipse(a, b, h=0, k=0):\n    x = np.linspace(h - a, h + a, 100)\n    root = b * np.sqrt(np.maximum(0, 1 - ((x - h) / a)**2))\n    return x, k + root, k - root"
      ],
      [
        "分别绘制返回的两组数据",
        "height, speed, t = prohvt(v0, theta, tf)\nax_height.plot(t, height)\nax_speed.plot(t, speed)",
        "x, upper, lower = ellipse(6, 3, h=3, k=1)\nax.plot(x, upper)\nax.plot(x, lower)\nax.set_aspect('equal')"
      ]
    ]
  ],
  [
    6,
    "ICA 6.1 · 抛体轨迹 GIF",
    "HW 6.1 · 对数曲线 GIF",
    "轨迹方程不同。逐帧更新、FuncAnimation 和 GIF 保存的结构相同。",
    [
      [
        "生成轨迹数据",
        "t = np.linspace(0, flight_time, 60)\nx = vx * t\ny = vy * t - 0.5 * g * t**2",
        "x = np.linspace(0.1, 20, 60)\ny = 5 * np.log10(x) + 10"
      ],
      [
        "逐帧更新曲线",
        "def update(i):\n    line.set_data(x[:i + 1], y[:i + 1])\n    return (line,)",
        "def update(i):\n    line.set_data(x[:i + 1], y[:i + 1])\n    return (line,)"
      ],
      [
        "生成并保存 GIF",
        "ani = FuncAnimation(fig, update, frames=len(t))\nani.save('projectile.gif', writer=PillowWriter(fps=20))",
        "ani = FuncAnimation(fig, update, frames=len(x))\nani.save('log_curve.gif', writer=PillowWriter(fps=20))"
      ]
    ]
  ],
  [
    6,
    "ICA 6.2 · if / elif 换长度单位",
    "HW 6.2 · if / elif 换温标",
    "都根据来源单位分支。温标换算会加减偏移量。",
    [
      [
        "按输入单位选择公式",
        "if source == 'yd':\n    m = value * 0.9144\nelif source == 'mi':\n    m = value * 1609.344\nelse:\n    raise ValueError('Unknown source')",
        "if source == 'F':\n    c = (value - 32) * 5 / 9\nelif source == 'K':\n    c = value - 273.15\nelif source == 'R':\n    c = (value - 491.67) * 5 / 9\nelif source == 'C':\n    c = value\nelse:\n    raise ValueError('Unknown source')"
      ]
    ]
  ],
  [
    6,
    "ICA 6.3 · match / case 换长度单位",
    "HW 6.3 · match / case 换温标",
    "逐一枚举支持的单位，用 case _ 处理未知值。",
    [
      [
        "用 match 按单位分支",
        "match source:\n    case 'cm':\n        m = value / 100\n    case 'm':\n        m = value\n    case _:\n        raise ValueError('Unknown source')",
        "match source:\n    case 'F':\n        c = (value - 32) * 5 / 9\n    case 'K':\n        c = value - 273.15\n    case 'R':\n        c = (value - 491.67) * 5 / 9\n    case 'C':\n        c = value\n    case _:\n        raise ValueError('Unknown source')"
      ]
    ]
  ],
  [
    6,
    "ICA 6.4 · 整合长度转换",
    "HW 6.2–6.3 · 任意输入与输出温标",
    "把任意单位转成一个共同基准，再从该基准转到目标单位。",
    [
      [
        "先转到共同基准",
        "metres = to_metres(value, source)",
        "celsius = to_celsius(value, source)"
      ],
      [
        "从基准转到输出单位",
        "length = from_metres(metres, target)",
        "temperature = from_celsius(celsius, target)"
      ]
    ]
  ],
  [
    7,
    "ICA 7.1 · 逐行计算差点",
    "HW 7.1 · 三角形面积列数组",
    "输入每一行有三个数，输出每一行一个结果。夹角列进入 sin 前要转弧度。",
    [
      [
        "建立 (n, 1) 的输出",
        "hcd = np.zeros((data.shape[0], 1))",
        "area = np.zeros((AB.shape[0], 1))"
      ],
      [
        "逐行取值并写入结果",
        "for i in range(data.shape[0]):\n    rating, slope, score = data[i]\n    hcd[i, 0] = 113 * (score - rating) / slope",
        "for i in range(AB.shape[0]):\n    a, b, theta_deg = AB[i]\n    area[i, 0] = 0.5 * a * b * np.sin(np.deg2rad(theta_deg))"
      ]
    ]
  ],
  [
    7,
    "ICA 7.2 · 双层循环填矩阵",
    "HW 7.2 · 对称 Pascal 矩阵",
    "循环都在逐格写入。Pascal 的首行和首列是边界，内部要用上方和左方已算好的值。",
    [
      [
        "初始化矩阵",
        "matrix = np.zeros((m, n))",
        "pascal = np.ones((n, n), dtype=int)"
      ],
      [
        "双层循环逐格填值",
        "for i in range(m):\n    for j in range(n):\n        r, c = i + 1, j + 1\n        matrix[i, j] = r**c / (r + c)",
        "for i in range(1, n):\n    for j in range(1, n):\n        pascal[i, j] = pascal[i - 1, j] + pascal[i, j - 1]"
      ]
    ]
  ],
  [
    7,
    "ICA 7.3 · Fibonacci 序列",
    "HW 7.2 · Pascal 矩阵的递推",
    "给定初始值之后，每个新结果都依赖之前已知的结果。",
    [
      [
        "设置边界值",
        "fib = np.zeros(n, dtype=int)  # n ≥ 2\nfib[0], fib[1] = 0, 1",
        "pascal = np.ones((n, n), dtype=int)"
      ],
      [
        "由已知值推出新值",
        "for i in range(2, n):\n    fib[i] = fib[i - 1] + fib[i - 2]",
        "for i in range(1, n):\n    for j in range(1, n):\n        pascal[i, j] = pascal[i - 1, j] + pascal[i, j - 1]"
      ]
    ]
  ],
  [
    7,
    "ICA 7.3 · Fibonacci 序列",
    "HW 7.3 · 递归求数字和",
    "两题都有基本情形。ICA 用循环从前往后填，HW 在函数中递归调用更小的输入。",
    [
      [
        "基本情形",
        "fib = np.zeros(n, dtype=int)  # n ≥ 2\nfib[0], fib[1] = 0, 1",
        "def sumdig(n):\n    if type(n) is not int:\n        raise TypeError('Expected an integer')\n    n = abs(n)\n    if n < 10:\n        return n"
      ],
      [
        "缩小问题后组合",
        "for i in range(2, n):\n    fib[i] = fib[i - 1] + fib[i - 2]",
        "    return n % 10 + sumdig(n // 10)"
      ]
    ]
  ],
  [
    8,
    "ICA 8.1 · TXT 上下文管理",
    "HW 8.1 · 三列 TXT 与五位小数",
    "复用 with open 的读写结构。HW 把每个浮点值格式化为小数点后五位。",
    [
      [
        "逐行格式化后写入 TXT",
        "with open(path, 'w', encoding='utf-8') as file:\n    for left, right in zip(x, y):\n        file.write(f'{left} {right}\\n')",
        "with open(path, 'w', encoding='utf-8') as file:\n    for t, a, b in zip(theta, y1, y2):\n        file.write(f'{t:.5f} {a:.5f} {b:.5f}\\n')"
      ],
      [
        "读取并拆列",
        "with open(path, encoding='utf-8') as file:\n    x_read, y_read = np.loadtxt(file, unpack=True)",
        "with open(path, encoding='utf-8') as file:\n    theta_read, y1_read, y2_read = np.loadtxt(file, unpack=True)"
      ]
    ]
  ],
  [
    8,
    "ICA 8.2 · pandas CSV",
    "HW 8.2 · 正弦数组 CSV",
    "原始数组与读回数组用同样的绘图方法。CSV 表头决定读回时使用的列名。",
    [
      [
        "建立 DataFrame 并写入",
        "table = pd.DataFrame({'x': x, 'y': y})\ntable.to_csv(path, index=False)",
        "table = pd.DataFrame({'theta': theta, 'y1': y1, 'y2': y2})\ntable.to_csv(path, index=False)"
      ],
      [
        "按列名读回",
        "saved = pd.read_csv(path)\nx_read = saved['x'].to_numpy()\ny_read = saved['y'].to_numpy()",
        "saved = pd.read_csv(path)\ntheta_read = saved['theta'].to_numpy()\ny1_read = saved['y1'].to_numpy()\ny2_read = saved['y2'].to_numpy()"
      ],
      [
        "为原始和读回数据选择坐标轴",
        "ax.plot(x_read, y_read)",
        "left.plot(theta, y1)\nleft.plot(theta, y2)\nright.plot(theta_read, y1_read)\nright.plot(theta_read, y2_read)"
      ]
    ]
  ],
  [
    8,
    "ICA 8.3 · 单张 Excel 工作表",
    "HW 8.3 · 正弦数据单表",
    "两题都用 sheet_name 指定同一张表。HW 将三列读回为三个数组。",
    [
      [
        "在一张工作表写入数据",
        "table = pd.DataFrame({'x': x, 'y': y})\ntable.to_excel(path, sheet_name='Data', index=False)",
        "table = pd.DataFrame({'theta': theta, 'y1': y1, 'y2': y2})\ntable.to_excel(path, sheet_name='Signals', index=False)"
      ],
      [
        "从指定工作表取列",
        "saved = pd.read_excel(path, sheet_name='Data')\nx_read = saved['x'].to_numpy()",
        "saved = pd.read_excel(path, sheet_name='Signals')\ntheta_read, y1_read, y2_read = (\n    saved[name].to_numpy() for name in ('theta', 'y1', 'y2')\n)"
      ]
    ]
  ],
  [
    8,
    "ICA 8.4 · 一个工作簿写两张表",
    "HW 8.4 · 正弦数据分两张表",
    "共用一个 ExcelWriter，保证两个信号都进入同一个工作簿。",
    [
      [
        "使用同一个 writer",
        "with pd.ExcelWriter(path) as writer:\n    table_a.to_excel(writer, sheet_name='A', index=False)\n    table_b.to_excel(writer, sheet_name='B', index=False)",
        "with pd.ExcelWriter(path) as writer:\n    first.to_excel(writer, sheet_name='Signal 1', index=False)\n    second.to_excel(writer, sheet_name='Signal 2', index=False)"
      ],
      [
        "按表名读回后分别使用",
        "a = pd.read_excel(path, sheet_name='A')\nb = pd.read_excel(path, sheet_name='B')",
        "a = pd.read_excel(path, sheet_name='Signal 1')\nb = pd.read_excel(path, sheet_name='Signal 2')\nleft.plot(a['theta'], a['y1'])\nright.plot(b['theta'], b['y2'])"
      ]
    ]
  ],
  [
    9,
    "ICA 9.1 · 多弹簧静态位移",
    "HW 9.1 · 网孔电流",
    "把物理方程写成 A x = b。弹簧系数乘位移，电阻系数乘网孔电流。",
    [
      [
        "由方程系数建矩阵",
        "A = np.array([[k1 + k2, -k2, 0],\n              [-k2, k2 + k3, -k3],\n              [0, -k3, k3]])\nb = g * np.array([m1, m2, m3])",
        "A = np.array([[R1+R2+R3, -R2, -R3, 0],\n              [-R2, R2+R4+R5+R7, -R4, -R7],\n              [-R3, -R4, R3+R4+R6, -R6],\n              [0, -R7, -R6, R6+R7+R8]])\nb = np.array([V1, 0, -V2, V3])"
      ],
      [
        "解线性方程组",
        "displacement = np.linalg.solve(A, b)",
        "mesh_current = np.linalg.solve(A, b)"
      ],
      [
        "用解读出物理量",
        "displacement_cm = 100 * displacement",
        "I1, I2, I3, I4 = mesh_current\ncurrent_R2 = I1 - I2  # reference direction of I1"
      ]
    ]
  ],
  [
    9,
    "ICA 9.2 · 前向差分求速度",
    "HW 9.2 · 前向差分求电流",
    "速度是位置的导数，电流是电荷的导数。两个公式共用相同的时间间隔。",
    [
      [
        "生成原函数采样",
        "t = np.linspace(0, t_end, 10)\nposition = 2 * (1 - np.exp(-t))",
        "t = np.linspace(0, 1, 20)\ncharge = np.sin(2 * np.pi * t)"
      ],
      [
        "相邻采样值的差商",
        "v_forward = np.diff(position) / np.diff(t)",
        "i_forward = np.diff(charge) / np.diff(t)"
      ],
      [
        "对齐横轴并比较导数",
        "ax.plot(t[:-1], v_forward, label='Forward difference')\nax.plot(t, 2 * np.exp(-t), label='Analytical derivative')",
        "ax.plot(t[:-1], i_forward, label='Forward difference')\nax.plot(t, 2 * np.pi * np.cos(2 * np.pi * t), label='Analytical derivative')"
      ]
    ]
  ],
  [
    9,
    "ICA 9.3 · 梯形法近似积分",
    "HW 9.3 · 电流积分与分段数比较",
    "同样以每段的两个端点求平均高度。HW 换成电流做累计量，并比较分段数。",
    [
      [
        "建立含端点的网格",
        "t = np.linspace(a, b, n + 1)\ny = 1 / ((t - 0.3)**2 + 0.01) + 1 / ((t - 0.9)**2 + 0.04) + 14",
        "t = np.linspace(-0.25, 0.25, n + 1)\ni = 2 * np.pi * np.cos(2 * np.pi * t)"
      ],
      [
        "求所有梯形的面积和",
        "integral = np.sum(0.5 * (y[:-1] + y[1:]) * np.diff(t))",
        "charge = np.sum(0.5 * (i[:-1] + i[1:]) * np.diff(t))\nerror = abs(charge - 2)"
      ]
    ]
  ],
  [
    9,
    "ICA 9.4 · 三次多项式拟合",
    "HW 9.4 · 八次多项式拟合",
    "输入文件和次数改变，读数据、拟合、在较密网格上绘图的流程相同。",
    [
      [
        "读取数据后拟合",
        "x, y = np.loadtxt(ica_csv, delimiter=',', unpack=True)\nmodel = np.polynomial.Polynomial.fit(x, y, deg=3)",
        "x, y = np.loadtxt(hw_csv, delimiter=',', unpack=True)\nmodel = np.polynomial.Polynomial.fit(x, y, deg=8)"
      ],
      [
        "绘制数据点与拟合曲线",
        "x_line = np.linspace(x.min(), x.max(), 200)\nax.scatter(x, y)\nax.plot(x_line, model(x_line))",
        "x_line = np.linspace(x.min(), x.max(), 200)\nax.scatter(x, y)\nax.plot(x_line, model(x_line))"
      ]
    ]
  ]
];
export const figures = {
  "ICA 5.3": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica5-3.jpeg",
    "caption": "老师原图 · ICA 5 PDF 第 2 页",
    "alt": "抛体高度和速度随时间变化"
  },
  "HW 5.2": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw5-2.jpeg",
    "caption": "老师原图 · HW 5 PDF 第 2 页",
    "alt": "圆柱表面积和体积随半径变化"
  },
  "HW 5.3": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw5-3.jpeg",
    "caption": "老师原图 · HW 5 PDF 第 3 页",
    "alt": "正负两支组成的椭圆"
  },
  "ICA 6.1": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica6-1.jpeg",
    "caption": "老师原图 · ICA 6 PDF 第 1 页",
    "alt": "抛体动画的轨迹示例"
  },
  "HW 6.1": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw6-1.jpeg",
    "caption": "老师原图 · HW 6 PDF 第 1 页",
    "alt": "对数动画的轨迹示例"
  },
  "HW 7.1": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw7-1.png",
    "caption": "老师原图 · HW 7 PDF 第 1 页",
    "alt": "已知两边和夹角的三角形示意"
  },
  "ICA 8.1": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica8-1.jpeg",
    "caption": "老师原图 · ICA 8 PDF 第 2 页",
    "alt": "电压原始数据与两种 TXT 读回结果"
  },
  "ICA 8.2": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica8-2.jpeg",
    "caption": "老师原图 · ICA 8 PDF 第 3 页",
    "alt": "电压 CSV 写入与读回"
  },
  "ICA 8.3": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica8-3.jpeg",
    "caption": "老师原图 · ICA 8 PDF 第 4 页",
    "alt": "电压单张 Excel 表写入与读回"
  },
  "ICA 8.4": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica8-4.jpeg",
    "caption": "老师原图 · ICA 8 PDF 第 5 页",
    "alt": "电压双工作表写入与读回"
  },
  "HW 8.1": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw8-1.jpeg",
    "caption": "老师原图 · HW 8 PDF 第 1 页",
    "alt": "正弦数据 TXT 写入与读回"
  },
  "HW 8.2": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw8-2.jpeg",
    "caption": "老师原图 · HW 8 PDF 第 2 页",
    "alt": "正弦数据 CSV 写入与读回"
  },
  "HW 8.3": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw8-3.jpeg",
    "caption": "老师原图 · HW 8 PDF 第 3 页",
    "alt": "正弦数据单张 Excel 表写入与读回"
  },
  "HW 8.4": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw8-4.jpeg",
    "caption": "老师原图 · HW 8 PDF 第 4 页",
    "alt": "正弦数据双工作表写入与读回"
  },
  "ICA 9.1": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica9-1.png",
    "caption": "老师原图 · ICA 9 PDF 第 1 页",
    "alt": "三弹簧悬挂和位移示意"
  },
  "HW 9.1": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw9-1.jpeg",
    "caption": "老师原图 · HW 9 PDF 第 1 页",
    "alt": "四网孔电路图"
  },
  "ICA 9.2": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica9-2.jpeg",
    "caption": "老师原图 · ICA 9 PDF 第 2 页",
    "alt": "位置曲线与速度的前向差分"
  },
  "HW 9.2": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw9-2.jpeg",
    "caption": "老师原图 · HW 9 PDF 第 2 页",
    "alt": "电荷曲线与电流的前向差分"
  },
  "ICA 9.3": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica9-3.jpeg",
    "caption": "老师原图 · ICA 9 PDF 第 3 页",
    "alt": "四种分段数的梯形近似"
  },
  "HW 9.3": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw9-3.jpeg",
    "caption": "老师原图 · HW 9 PDF 第 3 页",
    "alt": "四种分段数的电荷积分"
  },
  "ICA 9.4": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/ica9-4.jpeg",
    "caption": "老师原图 · ICA 9 PDF 第 4 页",
    "alt": "三次多项式拟合图"
  },
  "HW 9.4": {
    "path": "../../course-practice/engr103/ica-hw-5-9/figures/hw9-4.jpeg",
    "caption": "老师原图 · HW 9 PDF 第 4 页",
    "alt": "八次多项式拟合图"
  }
};
