---
title: Python Editor
hide:
  - toc
---

# Python Editor

在线编辑和运行 Python，支持语义高亮、类型悬停和错误提示。代码自动保存在当前浏览器中。

[在新标签页打开完整编辑器](../assets/python-editor/index.html){: target="_blank" rel="noopener" }

<iframe src="../../assets/python-editor/index.html" title="Python Editor — Monaco + basedpyright" style="width:100%;height:900px;border:1px solid #45454c;border-radius:8px;" allow="clipboard-write"></iframe>

- 函数与方法为淡黄色，类与类型为青绿色，变量与参数为浅蓝色。
- 点击「问题」查看分析结果，再点击某条问题跳转到对应代码。
- 按 **Ctrl / ⌘ + Enter** 运行；无限循环等长时间运行可点击「停止」。
- 使用 `input()` 时，先在「输入数据」中填入内容，每行对应一次输入。
- 点击 **上传 CSV** 添加自己的数据；按原文件名使用 `np.loadtxt("文件名.csv", delimiter=",", skiprows=1)` 读取。\n- **Q01 · 电压 CSV** 和 **Q07 · 晶体管 CSV** 已预置，点击标签即可运行对应示例或修改代码。每个标签分别保存代码。\n- 点击 **图表参数**，可用字号加减按钮、颜色和字重选项直接修改对应 Python 代码；再点运行更新图。\n- Matplotlib 图会直接显示在编辑器旁边，每张图有「下载图片」按钮。\n- 支持 `plt.show()`、`plt.savefig("q04.png", dpi=120)`，也会显示运行结束时尚未关闭的图。保存图片时保留文件名和原始分辨率。\n- 点击「绘图示例」可载入阻尼振动程序；首次使用 NumPy、Matplotlib 会下载相应依赖。\n- 支持打开和下载 `.py` 文件；自动补全可通过编辑器上方的开关开启。

首次加载分析器和首次运行 Python 需要下载依赖，请等待底部状态显示「basedpyright 已就绪」。语义分析针对 Python 3.12；运行使用浏览器中的 Pyodide Python，不连接本机 Python 环境。
