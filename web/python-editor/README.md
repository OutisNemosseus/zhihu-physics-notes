# Python editor

A self-contained Monaco editor for the MkDocs site. The official
`browser-basedpyright` bundle runs the Python language server entirely in Web
Workers. Semantic tokens and diagnostics come from basedpyright; theme rules
map those token classifications to colors. No language-server backend is needed.

```sh
cd web/python-editor
npm ci
npm test
npm run build
```

The build writes `docs/assets/python-editor/`, which the existing MkDocs/Pages
workflow includes in the site. The source, lockfile and generated output are
separated so updates to the editor are reproducible.

The language server and standard-library stubs are bundled for same-origin
loading. Runtime execution uses Pyodide 0.26.2 from jsDelivr in a separate
terminable worker. `input()` reads the lines supplied in the input box.
Analysis uses Python 3.12 and basic type checking. Automatic completion starts
disabled, while semantic highlighting, hover and diagnostics remain enabled.

The editor preserves one document in browser localStorage, including its
download filename and stdin. Names and code supplied by users are never
inserted as HTML. Diagnostics with stale document versions are discarded.

`npm test` starts the **actual browser basedpyright bundle** with a worker API
adapter and checks semantic classifications, hover and diagnostics after edits.
This is a language-service integration test, not a replacement for visual browser
QA.

Dependencies: Monaco and basedpyright are MIT licensed. The deployed basedpyright
bundle retains its upstream LICENSE.txt. Monaco's notices are copied during the
build.
