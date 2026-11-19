const Q = [
  [
    "hw7-1",
    "HW 7",
    "三角形面积",
    "用 triarea(AB) 逐行计算两边及其夹角确定的面积，返回 N 行 1 列的数组。",
    "ICA 7.1 hcdcalc 先建列数组再逐行赋值。角度要转换成弧度。",
    "import numpy as np",
    [
      [
        "L07",
        23,
        "def triarea(AB):\n    areas = np.zeros((AB.shape[0], 1))",
        []
      ],
      [
        "L07",
        23,
        "    for i in range(AB.shape[0]):\n        a, b, angle = AB[i]",
        [
          0
        ]
      ],
      [
        "L07",
        23,
        "        areas[i, 0] = 0.5 * a * b * np.sin(np.deg2rad(angle))",
        [
          1
        ]
      ],
      [
        "L07",
        23,
        "    return areas",
        [
          2
        ]
      ],
      [
        "L07",
        23,
        "AB = np.array([[1,2,20], [5,7,30], [8,2,60], [5,5,45]])\nprint(np.round(triarea(AB), 3))",
        [
          3
        ]
      ]
    ]
  ],
  [
    "hw7-2",
    "HW 7",
    "Pascal 矩阵",
    "用 pasm(n) 生成对称 Pascal 矩阵，分别打印 4 × 4 和 7 × 7 的结果。",
    "ICA 7.2 rowcol 用两层循环逐格赋值。首行、首列已经是 1，从第二行和第二列开始填。",
    "import numpy as np",
    [
      [
        "L07",
        29,
        "def pasm(n):\n    P = np.ones((n, n), dtype=int)",
        []
      ],
      [
        "L07",
        29,
        "    for i in range(1, n):",
        [
          0
        ]
      ],
      [
        "L07",
        29,
        "        for j in range(1, n):",
        [
          1
        ]
      ],
      [
        "L07",
        29,
        "            P[i, j] = P[i - 1, j] + P[i, j - 1]",
        [
          2
        ]
      ],
      [
        "L07",
        29,
        "    return P",
        [
          3
        ]
      ],
      [
        "L07",
        29,
        "print(pasm(4))\nprint(pasm(7))",
        [
          4
        ]
      ]
    ]
  ],
  [
    "hw7-3",
    "HW 7",
    "递归求数字和",
    "写出 sumdig(num)。输入浮点数时引发错误，用递归计算 123456 的数字和。",
    "L07 例 18 先判断是否可以直接返回。% 10 取个位，// 10 去掉个位。",
    "",
    [
      [
        "L07",
        34,
        "def sumdig(num):\n    if num.__class__ is not int:\n        raise TypeError",
        []
      ],
      [
        "L07",
        34,
        "    if num < 0:\n        num = -num",
        [
          0
        ]
      ],
      [
        "L07",
        34,
        "    if num < 10:\n        return num",
        [
          1
        ]
      ],
      [
        "L07",
        34,
        "    return num % 10 + sumdig(num // 10)",
        [
          2
        ]
      ],
      [
        "L07",
        34,
        "print(sumdig(123456))",
        [
          3
        ]
      ]
    ]
  ]
];
