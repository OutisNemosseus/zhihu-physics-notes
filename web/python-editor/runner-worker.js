// Agg works in a Worker; figures cross to the page as ordinary image data.
const plotBridge = String.raw`
import base64
import hashlib
import io
import json
import os
import matplotlib
matplotlib.use("Agg", force=True)
import matplotlib.pyplot as plt
from matplotlib.figure import Figure

_original_savefig = Figure.savefig
_images = []
_seen = set()

def begin_run():
    _images.clear()
    _seen.clear()
    plt.close("all")
    matplotlib.use("Agg", force=True)
    Figure.savefig = savefig
    plt.show = show

def emit(figure, filename=None, data=None, mime=None):
    preview = io.BytesIO()
    _original_savefig(figure, preview, format="png", dpi=120)
    png = preview.getvalue()
    fingerprint = hashlib.sha256(png).hexdigest()
    if filename is None and fingerprint in _seen:
        return
    _seen.add(fingerprint)
    _images.append({
        "filename": filename or f"figure-{len(_images) + 1}.png",
        "mime": mime or "image/png",
        "data": base64.b64encode(data if data is not None else png).decode("ascii"),
        "preview": base64.b64encode(data if mime == "image/png" and data is not None else png).decode("ascii"),
    })

def savefig(figure, fname, *args, **kwargs):
    result = _original_savefig(figure, fname, *args, **kwargs)
    if isinstance(fname, (str, os.PathLike)):
        path = os.fspath(fname)
        fmt = kwargs.get("format")
        if fmt is None and not os.path.splitext(path)[1]:
            path += "." + figure.canvas.get_default_filetype()
        extension = str(fmt or os.path.splitext(path)[1].lstrip(".")).lower()
        mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "svg": "image/svg+xml", "pdf": "application/pdf"}.get(extension, "application/octet-stream")
        with open(path, "rb") as image:
            data = image.read()
        emit(figure, os.path.basename(path), data, mime)
    else:
        emit(figure)
    return result

def show(*args, **kwargs):
    for number in plt.get_fignums():
        emit(plt.figure(number))

def finish_run():
    try:
        show()
        return json.dumps(_images)
    finally:
        plt.close("all")
`;
let runtime;
async function preparePlots() {
  // Set this before user imports pyplot, preventing the document-only backend.
  await runtime.runPythonAsync('import os\nos.environ["MPLBACKEND"] = "Agg"');
  if (!runtime.loadedPackages.matplotlib) return false;
  await runtime.runPythonAsync(`
import sys, types
if "_tong_editor_plots" not in sys.modules:
    _bridge = types.ModuleType("_tong_editor_plots")
    sys.modules["_tong_editor_plots"] = _bridge
    exec(${JSON.stringify(plotBridge)}, _bridge.__dict__)
sys.modules["_tong_editor_plots"].begin_run()
`);
  return true;
}
self.onmessage = async (event) => {
  const { code, stdin, files = [] } = event.data;
  try {
    if (!runtime) {
      self.postMessage({ type: 'status', text: '首次运行正在加载 Python，稍等片刻…' });
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js');
      runtime = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' });
    }
    const lines = stdin ? stdin.split(/\r?\n/) : [];
    let inputIndex = 0;
    runtime.setStdin({ stdin: () => inputIndex < lines.length ? lines[inputIndex++] : null });
    runtime.setStdout({ batched: (text) => self.postMessage({ type: 'stdout', text }) });
    runtime.setStderr({ batched: (text) => self.postMessage({ type: 'stderr', text }) });
    runtime.FS.chdir('/');
    for (const file of files) {
      if (!file || typeof file.name !== 'string' || !file.name || /[\\/\0]/.test(file.name) || file.name === '.' || file.name === '..' || typeof file.content !== 'string') throw new Error('Invalid CSV filename or content');
      runtime.FS.writeFile('/' + file.name, file.content, { encoding: 'utf8' });
    }
    self.postMessage({ type: 'started' });
    // Package installation doesn't import pyplot. Configure Agg before user code.
    await runtime.loadPackagesFromImports(code);
    const plotsReady = await preparePlots();
    const globals = runtime.toPy({ __name__: '__main__' });
    try {
      await runtime.runPythonAsync(code, { globals });
    } finally {
      try {
        if (plotsReady) {
          const images = JSON.parse(await runtime.runPythonAsync('import sys\nsys.modules["_tong_editor_plots"].finish_run()'));
          for (const image of images) self.postMessage({ type: 'image', ...image });
        }
      } catch (error) {
        self.postMessage({ type: 'stderr', text: `图像导出失败：${String(error)}` });
      } finally { globals.destroy(); }
    }
    self.postMessage({ type: 'done' });
  } catch (error) {
    self.postMessage({ type: 'error', text: String(error) });
  }
};
