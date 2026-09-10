"""Build the site and discover notebooks automatically (also a MkDocs hook)."""
import argparse
from hashlib import sha256
from html import escape
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
from urllib.parse import quote

import nbformat
from nbconvert import HTMLExporter
from mkdocs.structure.files import File
from mkdocs.utils import get_relative_url

MARKER = "<!-- NOTEBOOK_GALLERY -->"
_entries = []


def discover(root):
    entries = []
    folder = root / "notebooks"
    for source in sorted(folder.rglob("*.ipynb")):
        relative = source.relative_to(folder)
        if any(part.startswith(".") for part in relative.parts):
            continue
        if source.is_symlink():
            continue
        try:
            notebook = nbformat.read(source, as_version=4)
        except Exception as exc:
            raise ValueError(f"Cannot read notebook {relative}: {exc}") from exc
        title = source.stem.replace("_", " ")
        for cell in notebook.cells:
            if cell.cell_type == "markdown":
                heading = re.search(r"^# +(.+?) *#* *$", cell.source, re.MULTILINE)
                if heading:
                    title = heading.group(1)
                    break
        readable = re.sub(r"[^a-z0-9]+", "-", source.stem.lower()).strip("-") or "notebook"
        digest = sha256(relative.as_posix().encode()).hexdigest()[:12]
        slug = f"{readable[:60]}-{digest}"
        asset = "assets/notebooks/" + relative.with_suffix(".html").as_posix()
        entries.append(dict(source=source, notebook=notebook, title=title,
                            relative=relative, slug=slug, asset=asset))
    return entries


def on_config(config):
    global _entries
    root = Path(config.config_file_path).resolve().parent
    _entries = discover(root)
    folder = str(root / "notebooks")
    if folder not in config.watch:
        config.watch.append(folder)
    # MkDocs reloads a fresh configuration on each preview rebuild.
    config.nav = list(config.nav or [])
    if _entries:
        config.nav.append({"Notebooks": [
            {entry["title"]: f"notebook-pages/{entry['slug']}.md"}
            for entry in _entries
        ]})
    return config


def embed(entry, page_url, detail_url=None):
    def link(path):
        return escape(quote(get_relative_url(path, page_url), safe="/"), quote=True)
    title = escape(entry["title"], quote=True)
    asset = link(entry["asset"])
    download = link("assets/notebooks/" + entry["relative"].as_posix())
    detail = (f'<a href="{link(detail_url)}">Open notebook page</a> · '
              if detail_url else "")
    return (f'<p>{detail}<a href="{asset}" target="_blank" rel="noopener">'
            f'Open full-width view</a> · <a href="{download}" download>Download Notebook</a></p>\n'
            f'<iframe class="notebook-frame" src="{asset}" title="{title}" '
            f'loading="lazy"></iframe>\n')


def on_files(files, config):
    for entry in _entries:
        src_uri = f"notebook-pages/{entry['slug']}.md"
        generated = File.generated(config, src_uri, content="")
        entry["page_url"] = generated.url
        title = escape(entry["title"])
        content = (f'---\ntitle: {json.dumps(entry["title"], ensure_ascii=False)}\n'
                   f'hide: [toc]\n---\n\n<h1>{title}</h1>\n\n'
                   'Read the saved notebook below. Download it to edit and run in Jupyter.\n\n'
                   + embed(entry, generated.url))
        files.append(File.generated(config, src_uri, content=content))
    return files


def on_page_markdown(markdown, page, config, files):
    if page.file.src_uri == "index.md" and MARKER in markdown:
        gallery = "\n\n".join(
            f'<h3>{escape(entry["title"])}</h3>\n'
            + embed(entry, page.file.url, entry["page_url"])
            for entry in _entries
        ) or "No notebooks have been published yet."
        return markdown.replace(MARKER, gallery)
    return markdown


def on_post_build(config, **kwargs):
    destination = Path(config["site_dir"]) / "assets/notebooks"
    # This directory contains only generated exports; remove stale renamed files.
    if destination.exists():
        shutil.rmtree(destination)
    destination.mkdir(parents=True, exist_ok=True)
    exporter = HTMLExporter(template_name="lab")
    exporter.exclude_input_prompt = True
    exporter.exclude_output_prompt = True
    for entry in _entries:
        target = destination / entry["relative"]
        target.parent.mkdir(parents=True, exist_ok=True)
        html, _ = exporter.from_notebook_node(entry["notebook"])
        target.with_suffix(".html").write_text(html, encoding="utf-8")
        shutil.copyfile(entry["source"], target)


def main():
    parser = argparse.ArgumentParser(description="Publish every notebooks/**/*.ipynb in the site.")
    parser.add_argument("--serve", action="store_true", help="Preview locally and watch for changes.")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    command = [sys.executable, "-m", "mkdocs", "serve" if args.serve else "build", "--strict"]
    subprocess.run(command, cwd=root, check=True)


if __name__ == "__main__":
    main()
