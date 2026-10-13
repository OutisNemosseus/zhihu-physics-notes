let runtime;
self.onmessage = async (event) => {
  const { code, stdin } = event.data;
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
    self.postMessage({ type: 'started' });
    await runtime.loadPackagesFromImports(code);
    // A fresh namespace prevents previous runs from hiding undefined names.
    const globals = runtime.toPy({ __name__: '__main__' });
    try {
      await runtime.runPythonAsync(code, { globals });
    } finally {
      globals.destroy();
    }
    self.postMessage({ type: 'done' });
  } catch (error) {
    self.postMessage({ type: 'error', text: String(error) });
  }
};
