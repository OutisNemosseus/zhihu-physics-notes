export const exercises = {
  "ica6-1": {
    "id": "ica6-1",
    "title": "抛体轨迹 GIF",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.animation import FuncAnimation, PillowWriter",
    "blocks": [
      "angle = np.deg2rad(45)\nt = np.linspace(0, 2*25*np.sin(angle)/9.81, 32)\nx = 25*np.cos(angle)*t\ny = 25*np.sin(angle)*t-9.81*t**2/2",
      "fig, ax = plt.subplots()\nax.set(xlim=(0, x.max()*1.05), ylim=(0, y.max()*1.1), xlabel='x (m)', ylabel='y (m)')\nline, = ax.plot([], [], 'r.-')",
      "def update(frame):\n    line.set_data(x[:frame+1], y[:frame+1])\n    return (line,)",
      "animation = FuncAnimation(fig, update, frames=len(x))\nanimation.save('trajectory.gif', writer=PillowWriter(fps=12), dpi=70)"
    ],
    "gif": "trajectory.gif"
  },
  "ica6-2": {
    "id": "ica6-2",
    "title": "用 if 换算长度",
    "preamble": "",
    "blocks": [
      "def to_metric(x, src='yd', dst='m'):",
      "    if src == 'yd':\n        metres = x * 0.9144\n    elif src == 'mi':\n        metres = x * 1609.344\n    else:\n        raise ValueError('Unknown source')",
      "    if dst == 'm':\n        return metres\n    elif dst == 'km':\n        return metres / 1000\n    else:\n        raise ValueError('Unknown destination')",
      "print(to_metric(5))"
    ]
  },
  "ica6-3": {
    "id": "ica6-3",
    "title": "用 match 换算长度",
    "preamble": "",
    "blocks": [
      "def to_us(x, src='cm', dst='ft'):",
      "    match src:\n        case 'cm':\n            metres = x / 100\n        case 'm':\n            metres = x\n        case _:\n            raise ValueError('Unknown source')",
      "    match dst:\n        case 'in':\n            return metres / 0.0254\n        case 'ft':\n            return metres / 0.3048\n        case _:\n            raise ValueError('Unknown destination')",
      "print(to_us(30.48))"
    ]
  },
  "ica6-4": {
    "id": "ica6-4",
    "title": "组合两个换算函数",
    "preamble": "def yd_to_m(x):\n    return x * 0.9144\n\ndef m_to_ft(x):\n    return x / 0.3048",
    "blocks": [
      "def convert(x, route='yd→ft'):",
      "    match route:\n        case 'yd→ft':",
      "            metres = yd_to_m(x)\n            return m_to_ft(metres)",
      "        case _:\n            raise ValueError('Unknown route')",
      "print(convert(2))"
    ]
  },
  "ica7-1": {
    "id": "ica7-1",
    "title": "CSV 与二维列数组",
    "preamble": "import numpy as np",
    "blocks": [
      "data = np.genfromtxt('practice_golf.csv', delimiter=',', dtype=float)",
      "rating = data[:, 0:1]\nslope = data[:, 1:2]\nscore = data[:, 2:3]",
      "hcd = (score - rating) * 113 / slope",
      "print(hcd, hcd.shape)"
    ],
    "files": [
      {
        "name": "practice_golf.csv",
        "content": "70,113,82\n72,120,85\n69,110,78\n"
      }
    ]
  },
  "ica7-2": {
    "id": "ica7-2",
    "title": "用双层循环填矩阵",
    "preamble": "import numpy as np",
    "blocks": [
      "matrix = np.zeros((3, 4))",
      "for i in range(3):\n    for j in range(4):",
      "        r, c = i + 1, j + 1\n        matrix[i, j] = r**c / (r + c)",
      "print(matrix[1, 2])"
    ]
  },
  "ica7-3": {
    "id": "ica7-3",
    "title": "Fibonacci 循环",
    "preamble": "import numpy as np",
    "blocks": [
      "seq = np.zeros(9, dtype=int)",
      "seq[1] = 1",
      "for i in range(2, len(seq)):\n    seq[i] = seq[i - 1] + seq[i - 2]",
      "print(seq[-1])"
    ]
  },
  "hw6-1": {
    "id": "hw6-1",
    "title": "对数函数 GIF",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.animation import FuncAnimation, PillowWriter",
    "blocks": [
      "x = np.linspace(0.1, 20, 32)\ny = 5*np.log10(x) + 10",
      "fig, ax = plt.subplots()\nax.set(xlim=(0, x.max()*1.05), ylim=(0, y.max()*1.1), xlabel='x (m)', ylabel='y (m)')\nline, = ax.plot([], [], 'r.-')",
      "def update(frame):\n    line.set_data(x[:frame+1], y[:frame+1])\n    return (line,)",
      "animation = FuncAnimation(fig, update, frames=len(x))\nanimation.save('trajectory.gif', writer=PillowWriter(fps=12), dpi=70)"
    ],
    "gif": "trajectory.gif"
  },
  "hw6-2": {
    "id": "hw6-2",
    "title": "if 版温标换算",
    "preamble": "",
    "blocks": [
      "def convtemp(t, in_unit='F', out_unit='C'):",
      "    if in_unit == 'F':\n        c = (t - 32) * 5 / 9\n    elif in_unit == 'C':\n        c = t\n    elif in_unit == 'K':\n        c = t - 273.15\n    elif in_unit == 'R':\n        c = (t - 491.67) * 5 / 9\n    else:\n        raise ValueError('Unknown source')",
      "    if out_unit == 'C':\n        return c\n    elif out_unit == 'F':\n        return c * 9 / 5 + 32\n    elif out_unit == 'K':\n        return c + 273.15\n    elif out_unit == 'R':\n        return (c + 273.15) * 9 / 5\n    else:\n        raise ValueError('Unknown destination')",
      "print(convtemp(68), convtemp(20, 'C', 'R'), convtemp(293.15, 'K', 'F'))"
    ]
  },
  "hw6-3": {
    "id": "hw6-3",
    "title": "match 版温标换算",
    "preamble": "",
    "blocks": [
      "def convtemp(t, in_unit='F', out_unit='C'):",
      "    match in_unit:\n        case 'F':\n            c = (t - 32) * 5 / 9\n        case 'C':\n            c = t\n        case 'K':\n            c = t - 273.15\n        case 'R':\n            c = (t - 491.67) * 5 / 9\n        case _:\n            raise ValueError('Unknown source')",
      "    match out_unit:\n        case 'C':\n            return c\n        case 'F':\n            return c * 9 / 5 + 32\n        case 'K':\n            return c + 273.15\n        case 'R':\n            return (c + 273.15) * 9 / 5\n        case _:\n            raise ValueError('Unknown destination')",
      "print(convtemp(68), convtemp(20, 'C', 'R'), convtemp(293.15, 'K', 'F'))"
    ]
  },
  "hw7-1": {
    "id": "hw7-1",
    "title": "逐行求三角形面积",
    "preamble": "import numpy as np\ntriangles = np.array([[3, 4, 90], [6, 8, 30]])",
    "blocks": [
      "def triarea(AB):\n    area = np.zeros((AB.shape[0], 1))",
      "    for i in range(AB.shape[0]):\n        a, b, angle = AB[i]",
      "        area[i, 0] = a * b * np.sin(np.deg2rad(angle)) / 2",
      "    return area",
      "print(triarea(triangles))"
    ]
  },
  "hw7-2": {
    "id": "hw7-2",
    "title": "填 Pascal 矩阵",
    "preamble": "import numpy as np",
    "blocks": [
      "def pasm(n):\n    matrix = np.ones((n, n), dtype=int)",
      "    for i in range(1, n):\n        for j in range(1, n):",
      "            matrix[i, j] = matrix[i-1, j] + matrix[i, j-1]",
      "    return matrix",
      "print(pasm(4))\nprint(pasm(7))"
    ]
  },
  "hw7-3": {
    "id": "hw7-3",
    "title": "递归计算各位数字和",
    "preamble": "",
    "blocks": [
      "def sumdig(n):\n    if type(n) is not int:\n        raise TypeError('Expected an integer')\n    n = abs(n)",
      "    if n < 10:\n        return n",
      "    return n % 10 + sumdig(n // 10)",
      "print(sumdig(123456))"
    ]
  },
  "ica5-1": {
    "id": "ica5-1",
    "title": "点积与夹角",
    "preamble": "import numpy as np",
    "blocks": [
      "A, B = np.array([3,-4,2]), np.array([2,5,-6])",
      "def dotproduct(A, B):\n    dot = sum(a*b for a, b in zip(A, B))\n    cosine = dot / (np.linalg.norm(A) * np.linalg.norm(B))\n    return dot, np.rad2deg(np.arccos(np.clip(cosine, -1, 1)))",
      "value, angle = dotproduct(A, B)",
      "print(value, angle)"
    ]
  },
  "ica5-2": {
    "id": "ica5-2",
    "title": "导入并测试 dotproduct",
    "preamble": "import numpy as np",
    "blocks": [
      "from vector_ops import dotproduct",
      "A, B = [3,-4,2], [2,5,-6]",
      "value, angle = dotproduct(A, B)",
      "print(value, angle)"
    ],
    "files": [
      {
        "name": "vector_ops.py",
        "content": "import numpy as np\ndef dotproduct(A, B):\n    dot = sum(a*b for a, b in zip(A, B))\n    cosine = dot / (np.linalg.norm(A) * np.linalg.norm(B))\n    return dot, np.rad2deg(np.arccos(np.clip(cosine, -1, 1)))"
      }
    ]
  },
  "hw5-1": {
    "id": "hw5-1",
    "title": "极坐标距离",
    "preamble": "import numpy as np",
    "blocks": [
      "def poldist(ra, theta_a, rb, theta_b):\n    angle = np.deg2rad(theta_a-theta_b)\n    return np.sqrt(ra**2 + rb**2 - 2*ra*rb*np.cos(angle))",
      "distance = poldist(2, 30, 5, 135)",
      "print(round(distance, 4))"
    ]
  },
  "hw5-2": {
    "id": "hw5-2",
    "title": "圆柱表面积与体积",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "def cylsav(r, h):\n    return 2*np.pi*r*(r+h), np.pi*r**2*h",
      "r = np.linspace(0, 10, 100)\narea, volume = cylsav(r, 15)",
      "fig, (top, bottom) = plt.subplots(2, 1)\ntop.plot(r, area)\nbottom.plot(r, volume)",
      "top.set(ylabel='Surface area (in²)', title='Cylinder surface area')\nbottom.set(xlabel='Radius (in)', ylabel='Volume (in³)')\nfig.subplots_adjust(hspace=0.5)\nplt.show()"
    ]
  },
  "hw5-3": {
    "id": "hw5-3",
    "title": "椭圆上下两支",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "def ellipse(a, b, h=0, k=0):\n    x = np.linspace(h-a, h+a, 201)\n    root = b*np.sqrt(np.maximum(0, 1-((x-h)/a)**2))\n    return x, k+root, k-root",
      "x, upper, lower = ellipse(6, 3, 3, 1)",
      "fig, ax = plt.subplots()\nax.plot(x, upper, 'b', x, lower, 'r')",
      "ax.set(aspect='equal', xlabel='x (cm)', ylabel='y (cm)', title='Ellipse')\nax.grid()\nplt.show()"
    ]
  },
  "ica5-3": {
    "id": "ica5-3",
    "title": "三种重力下的抛体运动",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "def prohvt(v0, theta, tf, t0=0, g=9.81):\n    t = np.linspace(t0, tf, 100)\n    vx = v0*np.cos(np.deg2rad(theta))\n    vy = v0*np.sin(np.deg2rad(theta))\n    return vy*t-g*t**2/2, np.hypot(vx, vy-g*t), t",
      "fig, axes = plt.subplots(2, 1)\nv0, theta = 25, 45",
      "for label, g in [('Earth', 9.81), ('Mars', 3.73), ('Moon', 1.62)]:\n    tf = 2*v0*np.sin(np.deg2rad(theta))/g\n    h, v, t = prohvt(v0, theta, tf, g=g)\n    axes[0].plot(t, h, label=label)\n    axes[1].plot(t, v, label=label)",
      "for ax, unit in zip(axes, ['Height (m)', 'Speed (m/s)']):\n    ax.set(xlabel='Time (s)', ylabel=unit)\n    ax.legend()\nfig.subplots_adjust(hspace=0.5)\nplt.show()"
    ]
  },
  "ica8-1": {
    "id": "ica8-1",
    "title": "TXT 写入、读回与绘图",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "t = np.linspace(0, 0.1, 100)\nv1 = 8*np.cos(80*t + np.deg2rad(-35))\nv2 = 12*np.cos(80*t + np.deg2rad(65))",
      "with open('signals.txt', 'w') as f:\n    for row in zip(t, v1, v2):\n        f.write(' '.join(f'{v:.5f}' for v in row) + '\\n')\nf = open('manual.txt', 'w')\nfor row in zip(t, v1, v2):\n    f.write(' '.join(f'{v:.5f}' for v in row) + '\\n')\nf.close()",
      "xr, ar, br = np.loadtxt('signals.txt', unpack=True)\nxm, am, bm = np.loadtxt('manual.txt', unpack=True)",
      "fig = plt.figure()\nleft = plt.subplot(1, 2, 1)\ntop = plt.subplot(2, 2, 2)\nbottom = plt.subplot(2, 2, 4)\nleft.plot(t, v1, 'b-', t, v2, 'r--')\ntop.plot(xm, am, 'b-', xm, bm, 'r--')\nbottom.plot(xr, ar, 'b-', xr, br, 'r--')\nleft.set_title('Original')\ntop.set_title('Read back 1')\nbottom.set_title('Read back 2')",
      "for ax in fig.axes:\n    ax.set_xlabel('Time (s)')\n    ax.set_ylabel('Voltage (V)')\n    ax.grid()\nfig.subplots_adjust(wspace=0.55, hspace=0.65)\nplt.show()"
    ]
  },
  "ica8-2": {
    "id": "ica8-2",
    "title": "CSV 写入、读回与绘图",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt\nimport pandas as pd",
    "blocks": [
      "t = np.linspace(0, 0.1, 100)\nv1 = 8*np.cos(80*t + np.deg2rad(-35))\nv2 = 12*np.cos(80*t + np.deg2rad(65))",
      "data = pd.DataFrame({'t': t, 'v1': v1, 'v2': v2})\ndata.to_csv('signals.csv', index=False)",
      "saved = pd.read_csv('signals.csv')\nxr, ar, br = saved[['t', 'v1', 'v2']].to_numpy().T",
      "fig, (left, right) = plt.subplots(1, 2)\nleft.plot(t, v1, 'b-', t, v2, 'r--')\nright.plot(xr, ar, 'b-', xr, br, 'r--')\nleft.set_title('Original')\nright.set_title('Read back')",
      "for ax in fig.axes:\n    ax.set_xlabel('Time (s)')\n    ax.set_ylabel('Voltage (V)')\n    ax.grid()\nfig.subplots_adjust(wspace=0.55, hspace=0.65)\nplt.show()"
    ]
  },
  "ica8-3": {
    "id": "ica8-3",
    "title": "Excel 单表 写入、读回与绘图",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt\nimport pandas as pd\nimport openpyxl",
    "blocks": [
      "t = np.linspace(0, 0.1, 100)\nv1 = 8*np.cos(80*t + np.deg2rad(-35))\nv2 = 12*np.cos(80*t + np.deg2rad(65))",
      "data = pd.DataFrame({'t': t, 'v1': v1, 'v2': v2})\ndata.to_excel('signals.xlsx', sheet_name='Data', index=False)",
      "saved = pd.read_excel('signals.xlsx', sheet_name='Data')\nxr, ar, br = saved[['t', 'v1', 'v2']].to_numpy().T",
      "fig, (left, right) = plt.subplots(1, 2)\nleft.plot(t, v1, 'b-', t, v2, 'r--')\nright.plot(xr, ar, 'b-', xr, br, 'r--')\nleft.set_title('Original')\nright.set_title('Read back')",
      "for ax in fig.axes:\n    ax.set_xlabel('Time (s)')\n    ax.set_ylabel('Voltage (V)')\n    ax.grid()\nfig.subplots_adjust(wspace=0.55, hspace=0.65)\nplt.show()"
    ],
    "excel": true
  },
  "ica8-4": {
    "id": "ica8-4",
    "title": "Excel 双表 写入、读回与绘图",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt\nimport pandas as pd\nimport openpyxl",
    "blocks": [
      "t = np.linspace(0, 0.1, 100)\nv1 = 8*np.cos(80*t + np.deg2rad(-35))\nv2 = 12*np.cos(80*t + np.deg2rad(65))",
      "data = pd.DataFrame({'t': t, 'v1': v1, 'v2': v2})\nwith pd.ExcelWriter('signals.xlsx', engine='openpyxl') as writer:\n    data[['t', 'v1']].to_excel(writer, sheet_name='First', index=False)\n    data[['t', 'v2']].to_excel(writer, sheet_name='Second', index=False)",
      "xr, ar = pd.read_excel('signals.xlsx', sheet_name='First').to_numpy().T\nxs, br = pd.read_excel('signals.xlsx', sheet_name='Second').to_numpy().T",
      "fig = plt.figure()\nleft = plt.subplot(1, 2, 1)\ntop = plt.subplot(2, 2, 2)\nbottom = plt.subplot(2, 2, 4)\nleft.plot(t, v1, 'b-', t, v2, 'r--')\ntop.plot(xr, ar, 'b-')\nbottom.plot(xs, br, 'r--')\nleft.set_title('Original')\ntop.set_title('Read back 1')\nbottom.set_title('Read back 2')",
      "for ax in fig.axes:\n    ax.set_xlabel('Time (s)')\n    ax.set_ylabel('Voltage (V)')\n    ax.grid()\nfig.subplots_adjust(wspace=0.55, hspace=0.65)\nplt.show()"
    ],
    "excel": true
  },
  "hw8-1": {
    "id": "hw8-1",
    "title": "TXT 写入、读回与绘图",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "theta = np.linspace(0, 4*np.pi, 100)\ny1 = 3*np.sin(theta)\ny2 = 7*np.cos(theta)",
      "with open('signals.txt', 'w') as f:\n    for row in zip(theta, y1, y2):\n        f.write(' '.join(f'{v:.5f}' for v in row) + '\\n')",
      "xr, ar, br = np.loadtxt('signals.txt', unpack=True)",
      "fig, (left, right) = plt.subplots(1, 2)\nleft.plot(theta, y1, 'b-', theta, y2, 'r--')\nright.plot(xr, ar, 'b-', xr, br, 'r--')\nleft.set_title('Original')\nright.set_title('Read back')",
      "for ax in fig.axes:\n    ax.set_xlabel('Angle (rad)')\n    ax.set_ylabel('Displacement (cm)')\n    ax.grid()\nfig.subplots_adjust(wspace=0.55, hspace=0.65)\nplt.show()"
    ]
  },
  "hw8-2": {
    "id": "hw8-2",
    "title": "CSV 写入、读回与绘图",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt\nimport pandas as pd",
    "blocks": [
      "theta = np.linspace(0, 4*np.pi, 100)\ny1 = 3*np.sin(theta)\ny2 = 7*np.cos(theta)",
      "data = pd.DataFrame({'theta': theta, 'y1': y1, 'y2': y2})\ndata.to_csv('signals.csv', index=False)",
      "saved = pd.read_csv('signals.csv')\nxr, ar, br = saved[['theta', 'y1', 'y2']].to_numpy().T",
      "fig, (left, right) = plt.subplots(1, 2)\nleft.plot(theta, y1, 'b-', theta, y2, 'r--')\nright.plot(xr, ar, 'b-', xr, br, 'r--')\nleft.set_title('Original')\nright.set_title('Read back')",
      "for ax in fig.axes:\n    ax.set_xlabel('Angle (rad)')\n    ax.set_ylabel('Displacement (cm)')\n    ax.grid()\nfig.subplots_adjust(wspace=0.55, hspace=0.65)\nplt.show()"
    ]
  },
  "hw8-3": {
    "id": "hw8-3",
    "title": "Excel 单表 写入、读回与绘图",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt\nimport pandas as pd\nimport openpyxl",
    "blocks": [
      "theta = np.linspace(0, 4*np.pi, 100)\ny1 = 3*np.sin(theta)\ny2 = 7*np.cos(theta)",
      "data = pd.DataFrame({'theta': theta, 'y1': y1, 'y2': y2})\ndata.to_excel('signals.xlsx', sheet_name='Data', index=False)",
      "saved = pd.read_excel('signals.xlsx', sheet_name='Data')\nxr, ar, br = saved[['theta', 'y1', 'y2']].to_numpy().T",
      "fig, (left, right) = plt.subplots(1, 2)\nleft.plot(theta, y1, 'b-', theta, y2, 'r--')\nright.plot(xr, ar, 'b-', xr, br, 'r--')\nleft.set_title('Original')\nright.set_title('Read back')",
      "for ax in fig.axes:\n    ax.set_xlabel('Angle (rad)')\n    ax.set_ylabel('Displacement (cm)')\n    ax.grid()\nfig.subplots_adjust(wspace=0.55, hspace=0.65)\nplt.show()"
    ],
    "excel": true
  },
  "hw8-4": {
    "id": "hw8-4",
    "title": "Excel 双表 写入、读回与绘图",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt\nimport pandas as pd\nimport openpyxl",
    "blocks": [
      "theta = np.linspace(0, 4*np.pi, 100)\ny1 = 3*np.sin(theta)\ny2 = 7*np.cos(theta)",
      "data = pd.DataFrame({'theta': theta, 'y1': y1, 'y2': y2})\nwith pd.ExcelWriter('signals.xlsx', engine='openpyxl') as writer:\n    data[['theta', 'y1']].to_excel(writer, sheet_name='First', index=False)\n    data[['theta', 'y2']].to_excel(writer, sheet_name='Second', index=False)",
      "xr, ar = pd.read_excel('signals.xlsx', sheet_name='First').to_numpy().T\nxs, br = pd.read_excel('signals.xlsx', sheet_name='Second').to_numpy().T",
      "fig = plt.figure()\nleft = plt.subplot(1, 2, 1)\ntop = plt.subplot(2, 2, 2)\nbottom = plt.subplot(2, 2, 4)\nleft.plot(theta, y1, 'b-', theta, y2, 'r--')\ntop.plot(xr, ar, 'b-')\nbottom.plot(xs, br, 'r--')\nleft.set_title('Original')\ntop.set_title('Read back 1')\nbottom.set_title('Read back 2')",
      "for ax in fig.axes:\n    ax.set_xlabel('Angle (rad)')\n    ax.set_ylabel('Displacement (cm)')\n    ax.grid()\nfig.subplots_adjust(wspace=0.55, hspace=0.65)\nplt.show()"
    ],
    "excel": true
  },
  "ica9-1": {
    "id": "ica9-1",
    "title": "弹簧位移",
    "preamble": "import numpy as np",
    "blocks": [
      "k1, k2, k3 = 500, 800, 400",
      "A = np.array([[k1+k2,-k2,0],[-k2,k2+k3,-k3],[0,-k3,k3]])\nb = 9.81*np.array([3,1,7])",
      "x = np.linalg.solve(A,b)",
      "print('Displacement (cm):', (100*x).round(1))"
    ]
  },
  "ica9-2": {
    "id": "ica9-2",
    "title": "前向差分与解析导数",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "t = np.linspace(0, 5, 10)\ny = 2*(1-np.exp(-t))\nexact = 2*np.exp(-t)",
      "approx = np.diff(y)/np.diff(t)",
      "fig, axes = plt.subplots(2, 1)\naxes[0].plot(t, y)\naxes[1].plot(t, exact, 'b-', label='Analytical')\naxes[1].plot(t[:-1], approx, 'r--', label='Forward difference')",
      "axes[0].set_ylabel('Position (m)')\naxes[1].set(xlabel='Time (s)', ylabel='Velocity (m/s)')\naxes[1].legend()\nplt.show()"
    ]
  },
  "ica9-3": {
    "id": "ica9-3",
    "title": "梯形积分与分段数",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "def f(t):\n    return 1/((t-0.3)**2+0.01) + 1/((t-0.9)**2+0.04) + 14\na, b = 0, 1",
      "fine = np.linspace(a, b, 300)\nfig, axes = plt.subplots(2, 2)",
      "for ax, n in zip(axes.flat, [4,8,16,32]):\n    t = np.linspace(a,b,n+1)\n    y = f(t)\n    total = np.sum((y[:-1]+y[1:])*np.diff(t)/2)\n    ax.plot(fine, f(fine), 'b-')\n    ax.plot(t, y, 'r.-')\n    ax.vlines(t, 0, y, colors='gray', linewidth=0.7)\n    ax.set_title(f'N={n}, integral={total:.3f}')",
      "fig.subplots_adjust(hspace=0.55, wspace=0.35)\nplt.show()"
    ]
  },
  "ica9-4": {
    "id": "ica9-4",
    "title": "三次多项式拟合",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "x, y = np.loadtxt('positions.csv', delimiter=',', skiprows=1, unpack=True)",
      "fit = np.polynomial.Polynomial.fit(x, y, deg=3)\nx_line = np.linspace(x.min(), x.max(), 200)",
      "fig, ax = plt.subplots()\nax.scatter(x, y, label='Data')\nax.plot(x_line, fit(x_line), 'r-', label='Fit')",
      "ax.set(xlabel='x', ylabel='y', title='Polynomial fit')\nax.legend()\nplt.show()"
    ],
    "files": [
      {
        "name": "positions.csv",
        "content": "x,y\r\n0,-29.40579428\r\n0.34482759,-19.02957787\r\n0.68965517,-6.70363175\r\n1.03448276,1.80121025\r\n1.37931034,8.09291552\r\n1.72413793,7.05128903\r\n2.06896552,5.24012684\r\n2.4137931,3.10414432\r\n2.75862069,4.89566943\r\n3.10344828,3.62127069\r\n3.44827586,-5.27472742\r\n3.79310345,-15.23440725\r\n4.13793103,-20.23602404\r\n4.48275862,-18.52738543\r\n4.82758621,-28.57840422\r\n5.17241379,-39.89044692\r\n5.51724138,-39.8534913\r\n5.86206897,-47.15579789\r\n6.20689655,-48.52704588\r\n6.55172414,-49.73959252\r\n6.89655172,-50.46922791\r\n7.24137931,-44.89417186\r\n7.5862069,-42.89387885\r\n7.93103448,-38.30251002\r\n8.27586207,-26.56816717\r\n8.62068966,-13.75763569\r\n8.96551724,-6.56763668\r\n9.31034483,15.50464664\r\n9.65517241,34.79677962\r\n10,62.48053433\r\n"
      }
    ]
  },
  "hw9-1": {
    "id": "hw9-1",
    "title": "四网孔电流",
    "preamble": "import numpy as np",
    "blocks": [
      "R1,R2,R3,R4,R5,R6,R7,R8 = 18,10,16,6,15,8,12,14",
      "A = np.array([[R1+R2+R3,-R2,-R3,0],[-R2,R2+R4+R5+R7,-R4,-R7],[-R3,-R4,R3+R4+R6,-R6],[0,-R7,-R6,R6+R7+R8]])\nb = [20,0,-12,40]",
      "currents = np.linalg.solve(A, b)",
      "print('Mesh currents (A):', currents.round(3))"
    ]
  },
  "hw9-2": {
    "id": "hw9-2",
    "title": "前向差分与解析导数",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "t = np.linspace(0, 1, 20)\ny = np.sin(2*np.pi*t)\nexact = 2*np.pi*np.cos(2*np.pi*t)",
      "approx = np.diff(y)/np.diff(t)",
      "fig, axes = plt.subplots(2, 1)\naxes[0].plot(t, y)\naxes[1].plot(t, exact, 'b-', label='Analytical')\naxes[1].plot(t[:-1], approx, 'r--', label='Forward difference')",
      "axes[0].set_ylabel('Charge (C)')\naxes[1].set(xlabel='Time (s)', ylabel='Current (A)')\naxes[1].legend()\nplt.show()"
    ]
  },
  "hw9-3": {
    "id": "hw9-3",
    "title": "梯形积分与分段数",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "def f(t):\n    return 2*np.pi*np.cos(2*np.pi*t)\na, b = -0.25, 0.25",
      "fine = np.linspace(a, b, 300)\nfig, axes = plt.subplots(2, 2)",
      "for ax, n in zip(axes.flat, [4,8,16,32]):\n    t = np.linspace(a,b,n+1)\n    y = f(t)\n    total = np.sum((y[:-1]+y[1:])*np.diff(t)/2)\n    ax.plot(fine, f(fine), 'b-')\n    ax.plot(t, y, 'r.-')\n    ax.vlines(t, 0, y, colors='gray', linewidth=0.7)\n    ax.set_title(f'N={n}, integral={total:.3f}')",
      "fig.subplots_adjust(hspace=0.55, wspace=0.35)\nplt.show()"
    ]
  },
  "hw9-4": {
    "id": "hw9-4",
    "title": "八次多项式拟合",
    "preamble": "import numpy as np\nimport matplotlib.pyplot as plt",
    "blocks": [
      "x, y = np.loadtxt('positions.csv', delimiter=',', skiprows=1, unpack=True)",
      "fit = np.polynomial.Polynomial.fit(x, y, deg=8)\nx_line = np.linspace(x.min(), x.max(), 200)",
      "fig, ax = plt.subplots()\nax.scatter(x, y, label='Data')\nax.plot(x_line, fit(x_line), 'r-', label='Fit')",
      "ax.set(xlabel='x', ylabel='y', title='Polynomial fit')\nax.legend()\nplt.show()"
    ],
    "files": [
      {
        "name": "positions.csv",
        "content": "x,y\r\n0,0\r\n1,0.5104\r\n2,0.3345\r\n3,0.0315\r\n4,-0.1024\r\n5,-0.0787\r\n6,-0.0139\r\n7,0.0198\r\n8,0.0181\r\n9,0.0146\r\n10,-0.0037\r\n"
      }
    ]
  }
};
export const questions = [
  {
    "id": "H01",
    "hw": "hw5-1",
    "ref": "ica5-3",
    "block": 0,
    "step": 0,
    "prompt": "Two polar angles are supplied in degrees. Which expression gives their difference in radians?",
    "options": [
      "np.deg2rad(theta_a-theta_b)",
      "np.rad2deg(theta_a-theta_b)",
      "np.deg2rad(theta_a)-theta_b",
      "theta_a-theta_b"
    ],
    "why": "先相减再把整个角度差转为弧度，才能传给 NumPy 的三角函数。",
    "layout": [
      3,
      0,
      1,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
  },
  {
    "id": "H02",
    "hw": "hw5-1",
    "ref": "ica5-3",
    "block": 0,
    "step": 0,
    "prompt": "With angle in radians and radii ra and rb, which expression returns the distance between the two points?",
    "options": [
      "np.sqrt(ra**2 + rb**2 - 2*ra*rb*np.cos(angle))",
      "ra**2 + rb**2 - 2*ra*rb*np.cos(angle)",
      "np.sqrt(ra**2 + rb**2 + 2*ra*rb*np.cos(angle))",
      "np.sqrt(ra**2 + rb**2 - 2*ra*rb*np.sin(angle))"
    ],
    "why": "余弦定理先给距离的平方。返回距离时还要开平方。",
    "layout": [
      0,
      2,
      1,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
  },
  {
    "id": "H03",
    "hw": "hw5-2",
    "ref": "ica5-3",
    "block": 0,
    "step": 0,
    "prompt": "Which return statement produces surface area first and volume second, for every radius in r?",
    "options": [
      "return 2*np.pi*r*(r+h), np.pi*r**2*h",
      "return np.pi*r**2*h, 2*np.pi*r*(r+h)",
      "return 2*np.pi*r*h, np.pi*r*h",
      "return 2*np.pi*r*(r+h) + np.pi*r**2*h"
    ],
    "why": "函数一次返回两个数组。圆柱总表面积含两个底面，体积是底面积乘高。",
    "layout": [
      2,
      3,
      1,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
  },
  {
    "id": "H04",
    "hw": "hw5-2",
    "ref": "ica5-3",
    "block": 1,
    "step": 0,
    "prompt": "Which call unpacks cylsav for h = 15 while preserving those two meanings?",
    "options": [
      "area, volume = cylsav(r, 15)",
      "volume, area = cylsav(r, 15)",
      "area, volume = cylsav(15, r)",
      "area = volume = cylsav(r, 15)[0]"
    ],
    "why": "位置参数先半径后高度，返回值先面积后体积。",
    "layout": [
      0,
      2,
      3,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
  },
  {
    "id": "H05",
    "hw": "hw5-2",
    "ref": "ica5-3",
    "block": 2,
    "step": 2,
    "prompt": "Which instruction plots the volume against radius on the lower axes?",
    "options": [
      "bottom.plot(r, volume)",
      "top.plot(r, volume)",
      "bottom.plot(volume, r)",
      "bottom.plot(r, area)"
    ],
    "why": "选 bottom 作为目标坐标轴，plot 的第一个参数是横轴。",
    "layout": [
      3,
      0,
      1,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
  },
  {
    "id": "H06",
    "hw": "hw5-3",
    "ref": "ica5-3",
    "block": 0,
    "step": 0,
    "prompt": "Which x grid covers the whole real ellipse from left edge to right edge for a positive semi-axis a?",
    "options": [
      "np.linspace(h-a, h+a, 201)",
      "np.linspace(-a, a, 201)",
      "np.linspace(h, h+a, 201)",
      "np.linspace(k-b, k+b, 201)"
    ],
    "why": "中心横坐标为 h，两端各距中心 a。",
    "layout": [
      0,
      1,
      2,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
  },
  {
    "id": "H07",
    "hw": "hw5-3",
    "ref": "ica5-3",
    "block": 0,
    "step": 0,
    "prompt": "Which return statement supplies x, the upper branch and the lower branch in that order?",
    "options": [
      "return x, k+root, k-root",
      "return x, root, -root",
      "return x, k-root, k+root",
      "return k+root, k-root, x"
    ],
    "why": "两支都以 k 为中线，根号项分别取正、负。",
    "layout": [
      1,
      3,
      2,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
  },
  {
    "id": "H08",
    "hw": "hw5-3",
    "ref": "ica5-3",
    "block": 2,
    "step": 2,
    "prompt": "Which command plots both returned branches against the same horizontal coordinate?",
    "options": [
      "ax.plot(x, upper, 'b', x, lower, 'r')",
      "ax.plot(upper, x, 'b', lower, x, 'r')",
      "ax.plot(x, upper, 'b', x, upper, 'r')",
      "ax.plot(upper, lower, 'b')"
    ],
    "why": "每条曲线各给一组 x、y，第二组 y 使用 lower。",
    "layout": [
      0,
      3,
      2,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658194"
  },
  {
    "id": "H09",
    "hw": "hw6-1",
    "ref": "ica6-1",
    "block": 0,
    "step": 0,
    "prompt": "Which x grid includes both endpoints and stays inside the domain of log₁₀ for this animation?",
    "options": [
      "np.linspace(0.1, 20, 32)",
      "np.linspace(-20, 20, 32)",
      "np.linspace(0, 20, 32)",
      "np.linspace(0.1, 2, 32)"
    ],
    "why": "区间从 0.1 到 20，整个数组都是正数。",
    "layout": [
      1,
      0,
      3,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H10",
    "hw": "hw6-1",
    "ref": "ica6-1",
    "block": 2,
    "step": 2,
    "prompt": "In update(frame), which line shows the full trajectory through the current frame?",
    "options": [
      "line.set_data(x[:frame+1], y[:frame+1])",
      "line.set_data(x[:frame], y[:frame])",
      "line.set_data(x[frame:], y[frame:])",
      "line.set_data(x[:1], y[:1])"
    ],
    "why": "切片右端不包含在结果里，因此加 1 才会显示当前采样点。",
    "layout": [
      2,
      1,
      0,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H11",
    "hw": "hw6-1",
    "ref": "ica6-1",
    "block": 3,
    "step": 3,
    "prompt": "Which constructor passes the update function and requests one frame per x sample?",
    "options": [
      "FuncAnimation(fig, update, frames=len(x))",
      "FuncAnimation(fig, update(0), frames=len(x))",
      "FuncAnimation(fig, update, frames=1)",
      "FuncAnimation(fig, update, frames=len(x)-1)"
    ],
    "why": "传入回调函数自身，帧数与采样数相等。",
    "layout": [
      1,
      2,
      3,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H12",
    "hw": "hw6-2",
    "ref": "ica6-2",
    "block": 0,
    "step": 0,
    "prompt": "Which function header makes convtemp(68) convert Fahrenheit to Celsius by default?",
    "options": [
      "def convtemp(t, in_unit='F', out_unit='C'):",
      "def convtemp(t, in_unit='C', out_unit='F'):",
      "def convtemp(t, in_unit, out_unit):",
      "def convtemp(in_unit, out_unit='C', t=68):"
    ],
    "why": "第一个实参是数值，输入和输出温标各有一个默认值。",
    "layout": [
      2,
      3,
      0,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H13",
    "hw": "hw6-2",
    "ref": "ica6-2",
    "block": 1,
    "step": 1,
    "prompt": "Which Fahrenheit branch sets the Celsius intermediate value to 20 when t is 68?",
    "options": [
      "c = (t - 32) * 5 / 9",
      "c = t - 32 * 5 / 9",
      "c = (t + 32) * 5 / 9",
      "c = t * 9 / 5 + 32"
    ],
    "why": "先减去 32，接着乘 5/9。",
    "layout": [
      1,
      3,
      0,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H14",
    "hw": "hw6-2",
    "ref": "ica6-2",
    "block": 2,
    "step": 2,
    "prompt": "After the first branch produces Celsius c, which output expression converts c to Kelvin?",
    "options": [
      "return c + 273.15",
      "return c - 273.15",
      "return c * 273.15",
      "return (c + 273.15) * 9 / 5"
    ],
    "why": "摄氏和开尔文的单位间距相同，零点相差 273.15。",
    "layout": [
      2,
      1,
      0,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H15",
    "hw": "hw6-3",
    "ref": "ica6-3",
    "block": 1,
    "step": 1,
    "prompt": "The first match block must interpret the supplied temperature. Which subject belongs after match?",
    "options": [
      "match in_unit:",
      "match out_unit:",
      "match t:",
      "match 'in_unit':"
    ],
    "why": "先检查输入单位，才能将 t 统一换成摄氏数值。",
    "layout": [
      2,
      3,
      1,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H16",
    "hw": "hw6-3",
    "ref": "ica6-3",
    "block": 2,
    "step": 2,
    "prompt": "The second match block selects the requested output. Which subject should it inspect?",
    "options": [
      "match out_unit:",
      "match in_unit:",
      "match c:",
      "match 'out_unit':"
    ],
    "why": "第二段根据目标温标返回结果。",
    "layout": [
      0,
      2,
      3,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H17",
    "hw": "hw6-3",
    "ref": "ica6-3",
    "block": 2,
    "step": 2,
    "prompt": "In the Rankine output case, which return expression correctly converts Celsius c?",
    "options": [
      "return (c + 273.15) * 9 / 5",
      "return c + 273.15 * 9 / 5",
      "return c * 9 / 5 + 32",
      "return (c - 273.15) * 9 / 5"
    ],
    "why": "先移到绝对温标，再将开尔文单位换成兰氏度。",
    "layout": [
      3,
      0,
      1,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H18",
    "hw": "hw7-1",
    "ref": "ica7-1",
    "block": 0,
    "step": 1,
    "prompt": "Which allocation creates one result column for all rows of AB?",
    "options": [
      "np.zeros((AB.shape[0], 1))",
      "np.zeros((1, AB.shape[0]))",
      "np.zeros(AB.shape[0])",
      "np.zeros_like(AB)"
    ],
    "why": "二维列数组的形状是（行数，1）。",
    "layout": [
      0,
      2,
      1,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
  },
  {
    "id": "H19",
    "hw": "hw7-1",
    "ref": "ica7-1",
    "block": 1,
    "step": 1,
    "prompt": "Each input row stores a, b and an included angle. Which unpacking statement reads row i?",
    "options": [
      "a, b, angle = AB[i]",
      "a, b, angle = AB[:, i]",
      "a, b, angle = AB[0]",
      "angle, a, b = AB[i]"
    ],
    "why": "AB[i] 选择一整行，变量顺序与输入三列一致。",
    "layout": [
      2,
      3,
      1,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
  },
  {
    "id": "H20",
    "hw": "hw7-1",
    "ref": "ica7-1",
    "block": 2,
    "step": 2,
    "prompt": "With angles in degrees, which assignment writes the triangle area to row i of the result column?",
    "options": [
      "area[i, 0] = a * b * np.sin(np.deg2rad(angle)) / 2",
      "area[0, i] = a * b * np.sin(np.deg2rad(angle)) / 2",
      "area[i, 0] = a * b * np.sin(angle) / 2",
      "area[i, 0] = a * b * np.cos(np.deg2rad(angle)) / 2"
    ],
    "why": "按行写到第 0 列，正弦使用弧度。",
    "layout": [
      0,
      3,
      2,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
  },
  {
    "id": "H21",
    "hw": "hw7-2",
    "ref": "ica7-2",
    "block": 0,
    "step": 0,
    "prompt": "Which initialization gives Pascal's matrix a first row and first column of ones?",
    "options": [
      "np.ones((n, n), dtype=int)",
      "np.eye(n, dtype=int)",
      "np.zeros((n, n), dtype=int)",
      "np.ones((1, n), dtype=int)"
    ],
    "why": "所有元素初始取 1，内部元素随后由循环覆盖。",
    "layout": [
      1,
      0,
      3,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
  },
  {
    "id": "H22",
    "hw": "hw7-2",
    "ref": "ica7-2",
    "block": 1,
    "step": 1,
    "prompt": "Which outer loop fills the interior while leaving row zero untouched?",
    "options": [
      "for i in range(1, n):",
      "for i in range(n):",
      "for i in range(1, n-1):",
      "for i in range(n, 0, -1):"
    ],
    "why": "从索引 1 开始，到 n−1 结束，首行保留边界值。",
    "layout": [
      0,
      1,
      2,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
  },
  {
    "id": "H23",
    "hw": "hw7-2",
    "ref": "ica7-2",
    "block": 2,
    "step": 2,
    "prompt": "Which recurrence reads the two neighbors that are ready in row-major traversal?",
    "options": [
      "matrix[i-1, j] + matrix[i, j-1]",
      "matrix[i+1, j] + matrix[i, j+1]",
      "matrix[i-1, j-1] + matrix[i-1, j-1]",
      "matrix[i, j] + matrix[i, j-1]"
    ],
    "why": "上方和左方已经计算完成，两者之和就是当前位置。",
    "layout": [
      1,
      3,
      2,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
  },
  {
    "id": "H24",
    "hw": "hw7-3",
    "ref": "ica7-3",
    "block": 1,
    "step": 1,
    "prompt": "For a nonnegative integer, which base case immediately returns its digit sum?",
    "options": [
      "if n < 10:",
      "if n <= 10:",
      "if n >= 10:",
      "if n == 10:"
    ],
    "why": "0 到 9 都是单个数字，可直接返回。10 的数字和是 1。",
    "layout": [
      0,
      3,
      2,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
  },
  {
    "id": "H25",
    "hw": "hw7-3",
    "ref": "ica7-3",
    "block": 2,
    "step": 2,
    "prompt": "Which recurrence adds the units digit and continues with the remaining digits?",
    "options": [
      "return n % 10 + sumdig(n // 10)",
      "return n // 10 + sumdig(n % 10)",
      "return n % 10 + sumdig(n - 10)",
      "return n % 10 + sumdig(n / 10)"
    ],
    "why": "% 10 取个位，// 10 得到剩余整数。这里将 ICA 的递推思想迁移为递归。",
    "layout": [
      1,
      3,
      0,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658209"
  },
  {
    "id": "H26",
    "hw": "hw7-3",
    "ref": "ica6-2",
    "block": 0,
    "step": 1,
    "prompt": "Before recursion, which guard rejects inputs other than integers, matching the homework's required error type?",
    "options": [
      "if type(n) is not int:\n        raise TypeError('Expected an integer')",
      "if type(n) is int:\n        raise TypeError('Expected an integer')",
      "if type(n) is not int:\n        return 0",
      "if type(n) is not int:\n        raise ValueError('Expected an integer')"
    ],
    "why": "ICA 的单位分支遇到无效输入时抛出异常。HW 检查输入类型，并用 TypeError 表示类型错误。",
    "layout": [
      2,
      1,
      0,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658201"
  },
  {
    "id": "H27",
    "hw": "hw8-1",
    "ref": "ica8-1",
    "block": 1,
    "step": 1,
    "prompt": "Which file-opening statement creates a fresh text output and closes it when the block ends?",
    "options": [
      "with open('signals.txt', 'w') as f:",
      "with open('signals.txt', 'r') as f:",
      "with open('signals.txt', 'rb') as f:",
      "with open('different.txt', 'w') as f:"
    ],
    "why": "with 管理关闭，w 用于覆盖写入。后面读取同名文件。",
    "layout": [
      1,
      2,
      3,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H28",
    "hw": "hw8-1",
    "ref": "ica8-1",
    "block": 1,
    "step": 1,
    "prompt": "Which iterator pairs the three entries on each row in the required column order?",
    "options": [
      "zip(theta, y1, y2)",
      "zip(theta, y2, y1)",
      "zip(y1, theta, y2)",
      "zip(theta, y1, y1)"
    ],
    "why": "每行三列依次是 theta、y1、y2。",
    "layout": [
      2,
      3,
      0,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H29",
    "hw": "hw8-1",
    "ref": "ica8-1",
    "block": 2,
    "step": 2,
    "prompt": "Which read operation returns the three file columns as separate arrays?",
    "options": [
      "np.loadtxt('signals.txt', unpack=True)",
      "np.loadtxt('signals.txt', unpack=False)",
      "np.loadtxt('signals.txt', usecols=(0, 1), unpack=True)",
      "np.loadtxt('signals.txt', delimiter=',', unpack=True)"
    ],
    "why": "空白分隔的文件可直接用 loadtxt，unpack=True 让解包按列进行。",
    "layout": [
      1,
      3,
      0,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H30",
    "hw": "hw8-2",
    "ref": "ica8-2",
    "block": 1,
    "step": 1,
    "prompt": "Which DataFrame constructor assigns each original signal to its matching column label?",
    "options": [
      "pd.DataFrame({'theta': theta, 'y1': y1, 'y2': y2})",
      "pd.DataFrame({'theta': theta, 'y1': y2, 'y2': y1})",
      "pd.DataFrame({'theta': y1, 'y1': theta, 'y2': y2})",
      "pd.DataFrame([theta, y1, y2])"
    ],
    "why": "字典的键为列名，值为这一列的数据。",
    "layout": [
      0,
      2,
      1,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H31",
    "hw": "hw8-2",
    "ref": "ica8-2",
    "block": 1,
    "step": 1,
    "prompt": "Which CSV call keeps the header and writes exactly the three data columns?",
    "options": [
      "data.to_csv('signals.csv', index=False)",
      "data.to_csv('signals.csv', index=True)",
      "data.to_csv('signals.csv', index=False, header=False)",
      "data.to_csv('signals.csv', index=False, sep=';')"
    ],
    "why": "index=False 去掉行索引，默认保留列名和逗号分隔符。",
    "layout": [
      2,
      3,
      1,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H32",
    "hw": "hw8-2",
    "ref": "ica8-2",
    "block": 3,
    "step": 3,
    "prompt": "Which call draws both series from the CSV read-back variables on the right axes?",
    "options": [
      "right.plot(xr, ar, 'b-', xr, br, 'r--')",
      "left.plot(xr, ar, 'b-', xr, br, 'r--')",
      "right.plot(theta, y1, 'b-', theta, y2, 'r--')",
      "right.plot(xr, ar, 'b-', xr, ar, 'r--')"
    ],
    "why": "右图必须取读回的 xr、ar、br，才能检验文件往返。",
    "layout": [
      0,
      2,
      3,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H33",
    "hw": "hw8-3",
    "ref": "ica8-3",
    "block": 1,
    "step": 1,
    "prompt": "Which call writes one worksheet named Data without an index column?",
    "options": [
      "data.to_excel('signals.xlsx', sheet_name='Data', index=False)",
      "data.to_excel('signals.xlsx', sheet_name='Other', index=False)",
      "data.to_excel('signals.xlsx', sheet_name='Data', index=True)",
      "data.to_csv('signals.xlsx', index=False)"
    ],
    "why": "Excel 工作表名称与后续读取相符，index=False 保留三个目标列。",
    "layout": [
      3,
      0,
      1,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H34",
    "hw": "hw8-3",
    "ref": "ica8-3",
    "block": 2,
    "step": 2,
    "prompt": "Which command reads the Data sheet back from the workbook just created?",
    "options": [
      "pd.read_excel('signals.xlsx', sheet_name='Data')",
      "pd.read_csv('signals.xlsx')",
      "pd.read_excel('signals.xlsx', sheet_name='First')",
      "pd.read_excel('signals.xlsx', sheet_name=None)"
    ],
    "why": "按名称选中该表会返回单个 DataFrame。",
    "layout": [
      0,
      2,
      1,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H35",
    "hw": "hw8-3",
    "ref": "ica8-3",
    "block": 2,
    "step": 2,
    "prompt": "Which expression gives three correctly ordered row vectors for unpacking as xr, ar, br?",
    "options": [
      "saved[['theta', 'y1', 'y2']].to_numpy().T",
      "saved[['theta', 'y1', 'y2']].to_numpy()",
      "saved[['theta', 'y2', 'y1']].to_numpy().T",
      "saved[['y1', 'y2']].to_numpy().T"
    ],
    "why": "先明确列顺序，再将 N×3 数据转置成 3×N。",
    "layout": [
      1,
      3,
      2,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H36",
    "hw": "hw8-4",
    "ref": "ica8-4",
    "block": 1,
    "step": 1,
    "prompt": "Which context manager allows both sheets to be written into one workbook?",
    "options": [
      "with pd.ExcelWriter('signals.xlsx', engine='openpyxl') as writer:",
      "with open('signals.xlsx', 'r') as writer:",
      "with pd.ExcelFile('signals.xlsx') as writer:",
      "with pd.ExcelWriter('other.xlsx', engine='openpyxl') as writer:"
    ],
    "why": "两次 to_excel 共用同一个 writer，退出 with 时完成保存。",
    "layout": [
      0,
      3,
      2,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H37",
    "hw": "hw8-4",
    "ref": "ica8-4",
    "block": 1,
    "step": 1,
    "prompt": "Which instruction places the second signal and its horizontal coordinates on the Second sheet?",
    "options": [
      "data[['theta', 'y2']].to_excel(writer, sheet_name='Second', index=False)",
      "data[['theta', 'y1']].to_excel(writer, sheet_name='Second', index=False)",
      "data[['theta', 'y2']].to_excel(writer, sheet_name='First', index=False)",
      "data[['y2', 'theta']].to_excel(writer, sheet_name='Second', index=False)"
    ],
    "why": "第二张表按 theta、y2 的顺序存放，使用独立表名。",
    "layout": [
      1,
      0,
      3,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H38",
    "hw": "hw8-4",
    "ref": "ica8-4",
    "block": 3,
    "step": 3,
    "prompt": "Which plotting statement uses the Second sheet arrays and the lower axes?",
    "options": [
      "bottom.plot(xs, br, 'r--')",
      "top.plot(xs, br, 'r--')",
      "bottom.plot(xr, ar, 'r--')",
      "bottom.plot(br, xs, 'r--')"
    ],
    "why": "xs 与 br 来自第二张表，bottom 对应下方子图。",
    "layout": [
      0,
      1,
      2,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658217"
  },
  {
    "id": "H39",
    "hw": "hw9-1",
    "ref": "ica9-1",
    "block": 1,
    "step": 1,
    "prompt": "Mesh sources have signs +V₁, 0, −V₂, +V₃. Which right-hand side matches the four equations?",
    "options": [
      "b = [20,0,-12,40]",
      "b = [20,0,12,40]",
      "b = [20,-12,0,40]",
      "b = [0,20,-12,40]"
    ],
    "why": "按网孔编号逐行填写源电压，第三行取负号。",
    "layout": [
      1,
      3,
      2,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H40",
    "hw": "hw9-1",
    "ref": "ica9-1",
    "block": 2,
    "step": 2,
    "prompt": "Which call returns the simultaneous solution of A I = b?",
    "options": [
      "np.linalg.solve(A, b)",
      "np.linalg.solve(b, A)",
      "np.multiply(A, b)",
      "np.linalg.det(A)"
    ],
    "why": "系数矩阵在前，右端向量在后，返回的四个分量是网孔电流。",
    "layout": [
      2,
      3,
      0,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H41",
    "hw": "hw9-1",
    "ref": "ica9-1",
    "block": 1,
    "step": 1,
    "prompt": "R₂ is shared by meshes 1 and 2. Select the first coefficient row for clockwise mesh currents.",
    "options": [
      "[R1+R2+R3,-R2,-R3,0]",
      "[R1+R2+R3,R2,R3,0]",
      "[R1,-R2,-R3,0]",
      "[R1+R2+R3,-R3,-R2,0]"
    ],
    "why": "对角项为本回路电阻之和，相邻网孔的系数是共用电阻的负值。",
    "layout": [
      1,
      3,
      0,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H42",
    "hw": "hw9-2",
    "ref": "ica9-2",
    "block": 0,
    "step": 0,
    "prompt": "Which grid provides 20 equally spaced time samples including both 0 and 1 second?",
    "options": [
      "np.linspace(0, 1, 20)",
      "np.linspace(0, 1, 21)",
      "np.arange(0, 1, 0.05)",
      "np.linspace(0, 20, 1)"
    ],
    "why": "linspace 的第三个参数是点数，默认包括两端。",
    "layout": [
      2,
      1,
      0,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H43",
    "hw": "hw9-2",
    "ref": "ica9-2",
    "block": 1,
    "step": 1,
    "prompt": "Which expression approximates current from consecutive charge and time samples?",
    "options": [
      "np.diff(y)/np.diff(t)",
      "np.diff(t)/np.diff(y)",
      "y[1:]/t[1:]",
      "np.diff(y)*np.diff(t)"
    ],
    "why": "电流是电荷的变化量除以同段时间的变化量。",
    "layout": [
      1,
      2,
      3,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H44",
    "hw": "hw9-2",
    "ref": "ica9-2",
    "block": 2,
    "step": 2,
    "prompt": "Which plotted x values associate the 19 forward differences with their left endpoints?",
    "options": [
      "axes[1].plot(t[:-1], approx, 'r--', label='Forward difference')",
      "axes[1].plot(t[1:], approx, 'r--', label='Forward difference')",
      "axes[1].plot(t, approx, 'r--', label='Forward difference')",
      "axes[1].plot(approx, t[:-1], 'r--', label='Forward difference')"
    ],
    "why": "从 t[i] 向前一格求差，估计值放在 t[i]，最后一个采样点没有前向差分。",
    "layout": [
      0,
      2,
      3,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H45",
    "hw": "hw9-3",
    "ref": "ica9-3",
    "block": 2,
    "step": 2,
    "prompt": "Which grid gives n trapezoids between a and b?",
    "options": [
      "np.linspace(a,b,n+1)",
      "np.linspace(a,b,n)",
      "np.linspace(a,b,n-1)",
      "np.linspace(b,a,n+1)"
    ],
    "why": "n 个小区间需要 n+1 个边界点，顺序从下限到上限。",
    "layout": [
      3,
      0,
      1,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H46",
    "hw": "hw9-3",
    "ref": "ica9-3",
    "block": 2,
    "step": 2,
    "prompt": "Which expression totals the signed trapezoid areas over the full interval?",
    "options": [
      "np.sum((y[:-1]+y[1:])*np.diff(t)/2)",
      "np.sum((y[:-1]+y[1:])*np.diff(t))",
      "np.sum(y[:-1]*np.diff(t))",
      "np.sum((y[1:]-y[:-1])*np.diff(t)/2)"
    ],
    "why": "每个梯形取两端点高度的平均值，乘区间宽度，然后相加。",
    "layout": [
      0,
      2,
      1,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H47",
    "hw": "hw9-3",
    "ref": "ica9-3",
    "block": 2,
    "step": 2,
    "prompt": "Which iteration assigns N=4, 8, 16 and 32 once each to the four individual axes?",
    "options": [
      "zip(axes.flat, [4,8,16,32])",
      "zip(axes, [4,8,16,32])",
      "zip(axes.flat, [4,8,16])",
      "zip(axes.flat, [4,8,12,16])"
    ],
    "why": "axes 为 2×2 数组。flat 逐个产生四个坐标轴，与四个分段数配对。",
    "layout": [
      2,
      3,
      1,
      0
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H48",
    "hw": "hw9-4",
    "ref": "ica9-4",
    "block": 0,
    "step": 0,
    "prompt": "The position CSV starts with x,y. Which load reads numeric columns into x and y?",
    "options": [
      "np.loadtxt('positions.csv', delimiter=',', skiprows=1, unpack=True)",
      "np.loadtxt('positions.csv', delimiter=',', skiprows=0, unpack=True)",
      "np.loadtxt('positions.csv', delimiter=',', skiprows=1, unpack=False)",
      "np.loadtxt('positions.csv', delimiter=';', skiprows=1, unpack=True)"
    ],
    "why": "跳过表头，指定逗号，按列解包两个坐标数组。",
    "layout": [
      0,
      2,
      3,
      1
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H49",
    "hw": "hw9-4",
    "ref": "ica9-4",
    "block": 1,
    "step": 1,
    "prompt": "ICA fits a cubic. Which expression fits the required eighth-degree polynomial to y as a function of x?",
    "options": [
      "np.polynomial.Polynomial.fit(x, y, deg=8)",
      "np.polynomial.Polynomial.fit(x, y, deg=3)",
      "np.polynomial.Polynomial.fit(y, x, deg=8)",
      "np.polynomial.Polynomial.fit(x, y, deg=7)"
    ],
    "why": "保留自变量、因变量顺序，将次数改成 HW 要求的 8。",
    "layout": [
      1,
      0,
      3,
      2
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  },
  {
    "id": "H50",
    "hw": "hw9-4",
    "ref": "ica9-4",
    "block": 2,
    "step": 2,
    "prompt": "Which call draws the fitted values on the dense x grid?",
    "options": [
      "ax.plot(x_line, fit(x_line), 'r-', label='Fit')",
      "ax.plot(x, y, 'r-', label='Fit')",
      "ax.plot(x_line, fit(x), 'r-', label='Fit')",
      "ax.plot(fit(x_line), x_line, 'r-', label='Fit')"
    ],
    "why": "拟合对象要在绘图的同一组 x_line 上求值，横纵数组才能一一对应。",
    "layout": [
      0,
      1,
      2,
      3
    ],
    "source": "https://linnbenton.instructure.com/courses/12961/modules/items/658224"
  }
];
