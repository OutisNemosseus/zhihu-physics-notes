# Tong Su — Physics & Mathematics Notes

A personal academic notes website built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/). It collects English notes on condensed matter, linear algebra, vector calculus, quantum mechanics, superconductivity, semiconductors, and computational research.

Several articles originated as Chinese answers on Zhihu and were later translated or lightly edited into English. Their original titles and source URLs are preserved in each article.

## Install

Python 3 is required. A virtual environment is recommended:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

On Windows PowerShell, activate the environment with `.venv\Scripts\Activate.ps1`.

## Preview locally

```bash
mkdocs serve
```

Open the local address shown in the terminal (normally `http://127.0.0.1:8000/`). To perform the same strict build used in continuous deployment, run:

```bash
mkdocs build --strict
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site whenever a commit is pushed to `main`. It uses GitHub's official Pages artifact and deployment actions; generated HTML is not committed to the repository.

After pushing the repository to GitHub:

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`, or manually run the workflow from the **Actions** tab.

The deployment URL appears in the completed workflow and in the repository's Pages settings.

## Add an article

1. Create a Markdown file in the appropriate subject directory under `docs/`.
2. Add a title and, when applicable, the original Zhihu metadata:

   ```yaml
   ---
   title: "English Article Title"
   original_title: "Original Chinese title"
   source: "https://www.zhihu.com/..."
   ---
   ```

3. Add a visible source note near the article title, following the existing articles.
4. Add the file to the appropriate section of `nav` in `mkdocs.yml`.
5. Run `mkdocs build --strict` before committing.

MathJax supports inline mathematics written as `\( ... \)` and display mathematics written as `\[ ... \]`.

## Run the Notebook

Use Python 3.13 (verified with Python 3.13.13). From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
jupyter lab
```

On Windows PowerShell, replace the activation command with:

```powershell
.venv\Scripts\Activate.ps1
```

Open [`notebooks/continuous_to_discrete_bandpass.ipynb`](notebooks/continuous_to_discrete_bandpass.ipynb)
and select **Run → Run All Cells** using the virtual environment's Python kernel.
The notebook includes the original derivation, four dependency trees, analog and
digital spectra, and `solve_bandpass_latex(lower, upper, unit='rad/s')`.
Set `unit='Hz'` for ordinary frequencies. Step-by-step LaTeX is displayed inline;
a separate TeX installation is unnecessary.

To execute the notebook without opening JupyterLab:

```bash
jupyter nbconvert --to notebook --execute --inplace --ExecutePreprocessor.timeout=180 notebooks/continuous_to_discrete_bandpass.ipynb
```

For execution plus checks of the original answer, alternate inputs in both units,
invalid inputs, LaTeX outputs, and generated figures:

```bash
python scripts/validate_bandpass_notebook.py
```

The validation script runs in a fresh kernel and leaves the tracked notebook
unchanged. GitHub Actions runs it on pushes and pull requests.

## Publish notebooks automatically

Put `.ipynb` files in `notebooks/` (subfolders, spaces and Chinese filenames are
supported), then commit and push to `main`. GitHub Pages automatically generates
an HTML export, a dedicated reading page, a navigation entry and a homepage
iframe for every notebook. No manual edits to the homepage or navigation are
needed. Titles come from the first Markdown H1, or from the filename.

Publication uses **saved outputs** and does not execute uploaded code. Run and
save a notebook in Jupyter before uploading it if you want its figures and
computed results to appear. Additional execution dependencies belong in
`requirements.txt`; static publication does not need each notebook's kernel.
The existing bandpass regression workflow continues to execute its own tests.

After copying a notebook into the folder, publish it from the repository root:

```bash
git add notebooks/
git commit -m "Publish notebook"
git push origin main
```

Alternatively, open `notebooks/` on GitHub, choose **Add file → Upload files**,
and commit to `main`.

To generate the site locally with the installed project dependencies:

```bash
python scripts/export_notebooks.py
```

To preview and rebuild when notebooks are added or saved:

```bash
python scripts/export_notebooks.py --serve
```

Open the local address printed by MkDocs. The script is also registered as a
MkDocs hook, so `mkdocs build --strict` works too. Generated files live in `site/`
and are not committed. The original notebook files and the handwritten homepage
content remain intact. Hidden files and checkpoint folders are ignored.

See [notebooks/README.md](notebooks/README.md) for the Chinese quick-start guide.
