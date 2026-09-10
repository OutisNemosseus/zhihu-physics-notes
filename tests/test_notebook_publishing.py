"""Exercise a real MkDocs build with an isolated notebook collection."""
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from urllib.parse import unquote, urljoin

from bs4 import BeautifulSoup
import nbformat

HOOK = Path(__file__).resolve().parents[1] / 'scripts/export_notebooks.py'


class NotebookPublishingTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        (self.root / 'docs').mkdir()
        (self.root / 'notebooks').mkdir()
        (self.root / 'docs/index.md').write_text(
            '# Existing homepage\n\nKeep this paragraph.\n\n<!-- NOTEBOOK_GALLERY -->\n',
            encoding='utf-8',
        )
        (self.root / 'mkdocs.yml').write_text(
            f'site_name: Notebook test\nnav:\n  - Home: index.md\nhooks:\n  - {HOOK.as_posix()}\n',
            encoding='utf-8',
        )

    def notebook(self, path, title):
        target = self.root / 'notebooks' / path
        target.parent.mkdir(parents=True, exist_ok=True)
        notebook = nbformat.v4.new_notebook(cells=[
            nbformat.v4.new_markdown_cell('# ' + title),
            nbformat.v4.new_code_cell(
                'raise RuntimeError("Publishing must not execute this cell")',
                execution_count=1,
                outputs=[nbformat.v4.new_output('stream', name='stdout', text='Saved result: 42\n')],
            ),
        ])
        nbformat.write(notebook, target)
        return target

    def build(self):
        result = subprocess.run(
            [sys.executable, '-m', 'mkdocs', 'build', '--strict'],
            cwd=self.root, capture_output=True, text=True,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        return BeautifulSoup((self.root / 'site/index.html').read_text(), 'html.parser')

    def assert_links(self, page_path, soup):
        for element in soup.select('iframe, a[download]'):
            url = element.get('src') or element['href']
            target = self.root / 'site' / unquote(urljoin(page_path, url))
            self.assertTrue(target.is_file(), str(target))

    def test_multiple_names_subfolders_and_saved_outputs(self):
        sources = [
            self.notebook('first/same name.ipynb', 'First notebook'),
            self.notebook('second/same name.ipynb', 'Second notebook'),
            self.notebook('中文 # &/测试 notebook.ipynb', '中文 <tag> & "quoted"'),
        ]
        originals = {path: path.read_bytes() for path in sources}
        self.notebook('.ipynb_checkpoints/hidden.ipynb', 'Checkpoint')
        homepage = self.build()
        self.assertEqual(len(homepage.select('iframe')), 3)
        self.assertIn('Keep this paragraph.', homepage.get_text())
        self.assertNotIn('Checkpoint', homepage.get_text())
        self.assert_links('index.html', homepage)
        pages = list((self.root / 'site/notebook-pages').glob('*/index.html'))
        self.assertEqual(len(pages), 3)
        for page in pages:
            soup = BeautifulSoup(page.read_text(), 'html.parser')
            self.assertEqual(len(soup.select('iframe')), 1)
            self.assert_links(page.relative_to(self.root / 'site').as_posix(), soup)
        exports = list((self.root / 'site/assets/notebooks').rglob('*.html'))
        self.assertEqual(len(exports), 3)
        for exported in exports:
            self.assertIn('Saved result: 42', exported.read_text())
        for source, content in originals.items():
            self.assertEqual(source.read_bytes(), content)
        self.assertNotIn('notebook-pages', (self.root / 'docs/index.md').read_text())
        # A fresh build reflects removal and leaves no stale generated pages.
        sources[0].unlink()
        homepage = self.build()
        self.assertEqual(len(homepage.select('iframe')), 2)
        self.assertEqual(len(list((self.root / 'site/notebook-pages').glob('*/index.html'))), 2)

    def test_empty_folder(self):
        homepage = self.build()
        self.assertEqual(len(homepage.select('iframe')), 0)
        self.assertIn('No notebooks have been published yet.', homepage.get_text())


if __name__ == '__main__':
    unittest.main()
