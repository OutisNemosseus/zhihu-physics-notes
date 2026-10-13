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
- 支持打开和下载 `.py` 文件；自动补全可通过编辑器上方的开关开启。

首次加载分析器和首次运行 Python 需要下载依赖，请等待底部状态显示「basedpyright 已就绪」。语义分析针对 Python 3.12；运行使用浏览器中的 Pyodide Python，不连接本机 Python 环境。
