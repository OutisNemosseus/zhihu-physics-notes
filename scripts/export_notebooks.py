"""Publish the executed notebook as HTML and a downloadable notebook."""
from pathlib import Path
import shutil

import nbformat
from nbconvert import HTMLExporter


def on_post_build(config, **kwargs):
    root = Path(config.config_file_path).resolve().parent
    source = root / "notebooks/continuous_to_discrete_bandpass.ipynb"
    destination = Path(config["site_dir"]) / "assets/notebooks"
    destination.mkdir(parents=True, exist_ok=True)
    notebook = nbformat.read(source, as_version=4)
    exporter = HTMLExporter(template_name="lab")
    exporter.exclude_input_prompt = True
    exporter.exclude_output_prompt = True
    html, _ = exporter.from_notebook_node(notebook)
    (destination / (source.stem + ".html")).write_text(html, encoding="utf-8")
    shutil.copyfile(source, destination / source.name)
