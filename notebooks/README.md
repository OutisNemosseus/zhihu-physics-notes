# Notebook 自动发布文件夹

把要发布的 `.ipynb` 文件放在此目录，也可以放进子文件夹。
支持中文和带空格的文件名，同名文件放在不同子目录也不会冲突。

1. 在 Jupyter 中运行 Notebook 并保存，让图表和计算结果保存在文件里。
2. 将文件放入这个 `notebooks/` 文件夹。
3. 提交并推送到 GitHub 的 `main` 分支，等待 Pages workflow 完成。

网站会自动添加：首页 iframe、独立阅读页、导航入口、全宽查看和下载链接。
标题取第一个 Markdown 一级标题（`# 标题`），没有标题则使用文件名。
不需要手动修改首页、导航或 HTML。

也可以在 GitHub 的这个文件夹里点击 **Add file → Upload files** 上传。
仅把文件放在电脑本地不会更新线上网站，还需要提交并推送。

在仓库根目录运行：

```bash
python scripts/export_notebooks.py          # 生成 site/ 网站
python scripts/export_notebooks.py --serve  # 本地预览，新增或保存文件后自动重建
```

首次使用请先按照仓库 README 安装 `requirements.txt` 中的依赖。
网页展示已保存的内容和输出，不会自动执行新上传的 Notebook；
要修改参数并重新计算，请使用 Jupyter。
