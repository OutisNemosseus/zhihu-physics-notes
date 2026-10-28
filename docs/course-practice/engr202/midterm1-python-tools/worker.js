let runtime;
self.onmessage = async ({data}) => {
  try {
    if (data.type === 'init') {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');
      runtime = await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'});
      const response = await fetch('engine.py');
      if (!response.ok) throw Error('Python helper download: '+response.status);
      runtime.runPython(await response.text());
      self.postMessage({type:'ready'});
    } else if (data.type === 'run') {
      let output = '';
      runtime.setStdout({batched: line => {if(output.length<40000) output+=line+'\n';}});
      runtime.setStderr({batched: line => {if(output.length<40000) output+=line+'\n';}});
      runtime.globals.set('input_json',JSON.stringify(data.inputs));
      runtime.runPython('import json\nd = {k: num(v) for k, v in json.loads(input_json).items()}');
      await runtime.runPythonAsync(data.code);
      self.postMessage({type:'done',output:output || '执行完成（无输出）。'});
    }
  } catch(error) {
    self.postMessage({type:'error',message:String(error)});
  }
};
