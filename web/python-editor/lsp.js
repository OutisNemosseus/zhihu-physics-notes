// The browser/boot protocol is provided by browser-basedpyright's official
// browser bundle. All Python analysis happens in same-origin Web Workers.
export class PythonLanguageService {
  constructor(workerUrl, { createWorker = (url, options) => new Worker(url, options), onDiagnostics = () => {}, onError = () => {} } = {}) {
    this.workerUrl = workerUrl;
    this.createWorker = createWorker;
    this.onDiagnostics = onDiagnostics;
    this.onError = onError;
    this.workers = [];
    this.pending = new Map();
    this.counter = 0;
    this.version = 1;
    this.text = '';
    this.uri = 'file:///src/main.py';
    this.settings = {
      pythonVersion: '3.12',
      typeCheckingMode: 'basic',
      diagnosticMode: 'openFilesOnly',
      inlayHints: { variableTypes: false, functionReturnTypes: false },
    };
  }

  async start(text) {
    this.text = text;
    const foreground = this.createWorker(this.workerUrl, { name: 'basedpyright-foreground' });
    this.foreground = foreground;
    this.workers.push(foreground);
    foreground.addEventListener('message', (event) => this.handleMessage(event.data));
    foreground.addEventListener('error', (event) => this.fail(new Error(event.message || 'Python language worker failed to load')));
    foreground.postMessage({ type: 'browser/boot', mode: 'foreground' });
    const result = await this.request('initialize', {
      processId: null,
      rootPath: '/src/',
      rootUri: 'file:///src/',
      workspaceFolders: [{ uri: 'file:///src/', name: 'Python' }],
      capabilities: {
        workspace: { configuration: true },
        textDocument: {
          synchronization: { didSave: false, dynamicRegistration: false },
          publishDiagnostics: { versionSupport: true, tagSupport: { valueSet: [1, 2] } },
          hover: { contentFormat: ['markdown', 'plaintext'] },
          completion: { completionItem: { snippetSupport: false, documentationFormat: ['markdown', 'plaintext'] } },
          semanticTokens: {
            requests: { full: true, range: false },
            tokenTypes: ['namespace', 'type', 'class', 'enum', 'interface', 'typeParameter', 'parameter', 'variable', 'property', 'enumMember', 'function', 'method', 'decorator'],
            tokenModifiers: ['declaration', 'definition', 'readonly', 'static', 'deprecated', 'abstract', 'async', 'modification', 'documentation', 'defaultLibrary', 'local'],
            formats: ['relative'],
            overlappingTokenSupport: false,
            multilineTokenSupport: false,
          },
        },
      },
      initializationOptions: {
        files: {
          '/src/main.py': text,
          '/src/pyrightconfig.json': JSON.stringify({ ...this.settings, include: ['main.py'] }),
        },
      },
    });
    const semanticProvider = result.capabilities.semanticTokensProvider;
    if (!semanticProvider?.legend) throw new Error('The language server did not advertise semantic highlighting');
    this.legend = semanticProvider.legend;
    this.notify('initialized', {});
    this.notify('workspace/didChangeConfiguration', { settings: { basedpyright: { analysis: this.settings } } });
    this.notify('textDocument/didOpen', {
      textDocument: { uri: this.uri, languageId: 'python', version: this.version, text },
    });
    return result;
  }

  handleMessage(message) {
    if (!message) return;
    if (message.type === 'browser/newWorker') {
      const worker = this.createWorker(this.workerUrl, { name: `basedpyright-background-${this.workers.length}` });
      this.workers.push(worker);
      worker.addEventListener('error', (event) => this.fail(new Error(event.message || 'Python analysis worker failed')));
      worker.postMessage({ type: 'browser/boot', mode: 'background', initialData: message.initialData, port: message.port }, [message.port]);
      return;
    }
    if (message.method && Object.hasOwn(message, 'id')) {
      let result = null;
      if (message.method === 'workspace/configuration') {
        result = (message.params?.items || []).map((item) => {
          if (/analysis$/.test(item.section || '')) return this.settings;
          if (item.section === 'python') return { pythonPath: '', analysis: this.settings };
          if (item.section === 'basedpyright' || item.section === 'pyright') return { analysis: this.settings };
          return {};
        });
      }
      this.foreground.postMessage({ jsonrpc: '2.0', id: message.id, result });
      return;
    }
    if (Object.hasOwn(message, 'id')) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      clearTimeout(pending.timer);
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
      return;
    }
    if (message.method === 'textDocument/publishDiagnostics') {
      const params = message.params;
      if (params.uri === this.uri && (params.version == null || params.version === this.version)) {
        this.onDiagnostics(params.diagnostics || [], this.version);
      }
    }
  }

  request(method, params, timeout = 45000) {
    if (this.disposed) return Promise.reject(new Error('Language service is closed'));
    const id = ++this.counter;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Python analysis timed out: ${method}`));
      }, timeout);
      this.pending.set(id, { resolve, reject, timer });
      this.foreground.postMessage({ jsonrpc: '2.0', id, method, params });
    });
  }

  notify(method, params) {
    if (!this.disposed) this.foreground.postMessage({ jsonrpc: '2.0', method, params });
  }

  change(text) {
    if (text === this.text) return;
    this.text = text;
    this.version += 1;
    this.notify('textDocument/didChange', {
      textDocument: { uri: this.uri, version: this.version }, contentChanges: [{ text }],
    });
  }

  tokens() {
    return this.request('textDocument/semanticTokens/full', { textDocument: { uri: this.uri } });
  }

  hover(position) {
    return this.request('textDocument/hover', { textDocument: { uri: this.uri }, position });
  }

  completions(position) {
    return this.request('textDocument/completion', { textDocument: { uri: this.uri }, position });
  }

  fail(error) {
    if (this.disposed) return;
    this.onError(error);
    this.dispose();
  }

  dispose() {
    this.disposed = true;
    this.workers.forEach((worker) => worker.terminate());
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(new Error('Language service was stopped'));
    }
    this.pending.clear();
  }
}
