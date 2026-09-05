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
