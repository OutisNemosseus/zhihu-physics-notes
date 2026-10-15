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

Matplotlib plotting uses Agg inside the runtime worker. `plt.show()` and
`plt.savefig("q04.png", dpi=120)` produce inline image previews with a named
one-click download. Unsaved open figures are captured at the end of execution;
figures displayed or saved before `plt.close()` remain available. Saving preserves
the original output bytes and filename (SVG/PDF use a PNG preview). Each run
closes old figures and resets the gallery. Clearing output revokes image URLs.
The plotting example button loads a damped-motion example without changing
a saved document until the user selects it.

The plotting integration test uses the real pinned Pyodide/Matplotlib runtime
and the ENGR103 Q04 example. Its first execution may download scientific
package wheels from the versioned Pyodide CDN; later runs use cached wheels.

The CSV upload button adds files to Pyodide's virtual filesystem before each
execution. Q01 threshold-voltage and Q07 transistor-count CSVs are bundled from
the user's supplied practice files and available on every run. Their tabs start
with NumPy/Matplotlib imports and the CSV-loading statement only; each tab keeps its own editable code. Preset
code drafts are restored from browser localStorage. Uploaded CSV content remains
in the current page session. The runtime accepts plain basenames only.

The Plot Settings toolbar button reads common `plt.title`, `plt.xlabel`,
`plt.ylabel`, and `plt.grid` calls. Font-size +/- buttons, text fields, color,
weight, padding, and axis-position choices modify the corresponding Python
argument. Code containing an expression instead of a literal keeps that
argument under direct code control. Run again to render the edited plot.
