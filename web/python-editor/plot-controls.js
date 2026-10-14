// Read and edit common pyplot calls without evaluating any Python source.
function skipString(source, start) {
  const quote = source[start], triple = source.slice(start, start + 3) === quote.repeat(3);
  const delimiter = triple ? quote.repeat(3) : quote;
  let i = start + delimiter.length;
  while (i < source.length) {
    if (source[i] === '\\') { i += 2; continue; }
    if (source.startsWith(delimiter, i)) return i + delimiter.length;
    i++;
  }
  return source.length;
}
function endCall(source, start) {
  let depth = 1;
  for (let i = start + 1; i < source.length; i++) {
    if (source[i] === '"' || source[i] === "'") { i = skipString(source, i) - 1; continue; }
    if (source[i] === '#') { const newline = source.indexOf('\n', i); i = newline < 0 ? source.length : newline; continue; }
    if (source[i] === '(') depth++;
    if (source[i] === ')' && --depth === 0) return i;
  }
  return -1;
}
export function findPlotCalls(source) {
  const calls = [];
  for (let i = 0; i < source.length; i++) {
    if (source[i] === '"' || source[i] === "'") { i = skipString(source, i) - 1; continue; }
    if (source[i] === '#') { const newline = source.indexOf('\n', i); i = newline < 0 ? source.length : newline; continue; }
    if (i && /[\w.]/.test(source[i - 1])) continue;
    const match = /^plt\.(title|xlabel|ylabel|grid|legend)\s*\(/.exec(source.slice(i));
    if (!match) continue;
    const open = i + match[0].length - 1, close = endCall(source, open);
    if (close < 0) continue;
    calls.push({ name: match[1], start: i, open, close, body: source.slice(open + 1, close) });
    i = close;
  }
  return calls;
}
function splitArguments(body) {
  const result = []; let start = 0, depth = 0;
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '"' || body[i] === "'") { i = skipString(body, i) - 1; continue; }
    if ('([{'.includes(body[i])) depth++;
    if (')]}'.includes(body[i])) depth--;
    if (body[i] === ',' && depth === 0) { result.push(body.slice(start, i).trim()); start = i + 1; }
  }
  const last = body.slice(start).trim(); if (last) result.push(last);
  return result;
}
function literalValue(value, fallback) {
  if (value == null) return fallback;
  if (/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(value)) return Number(value);
  const match = /^(r?)(['"])([\s\S]*)\2$/i.exec(value);
  if (!match) return null;
  if (match[1]) return match[3];
  return match[3].replace(/\\([\\'"nrt])/g, (_, c) => ({ n: '\n', r: '\r', t: '\t' }[c] || c));
}
export function readPlotArgument(call, key, fallback) {
  const args = splitArguments(call.body);
  if (key === '$text') {
    const textKey = call.name === 'title' ? 'label' : call.name;
    const positional = args.find((s) => !/^\w+\s*=/.test(s));
    const keyword = args.find((s) => new RegExp(`^${textKey}\\s*=`).test(s));
    return literalValue(positional ?? keyword?.slice(keyword.indexOf('=') + 1).trim(), fallback);
  }
  const arg = args.find((s) => new RegExp(`^${key}\\s*=`).test(s));
  return literalValue(arg?.slice(arg.indexOf('=') + 1).trim(), fallback);
}
export function changePlotArgument(source, callIndex, key, value) {
  const call = findPlotCalls(source)[callIndex]; if (!call) return source;
  const args = splitArguments(call.body);
  const literal = typeof value === 'number' ? String(value) : JSON.stringify(value);
  if (key === '$text') {
    const index = args.findIndex((s) => !/^\w+\s*=/.test(s));
    if (index < 0) {
      const textKey = call.name === 'title' ? 'label' : call.name;
      const keywordIndex = args.findIndex((s) => new RegExp(`^${textKey}\\s*=`).test(s));
      if (keywordIndex < 0) args.unshift(literal); else args[keywordIndex] = `${textKey}=${literal}`;
    } else args[index] = literal;
  } else {
    const index = args.findIndex((s) => new RegExp(`^${key}\\s*=`).test(s));
    if (index < 0) args.push(`${key}=${literal}`); else args[index] = `${key}=${literal}`;
  }
  const separator = call.body.includes('\n') ? ',\n          ' : ', ';
  return source.slice(0, call.open + 1) + args.join(separator) + source.slice(call.close);
}
export function renderPlotControls({ container, code, onChange, document = globalThis.document }) {
  container.replaceChildren();
  const calls = findPlotCalls(code);
  if (!calls.length) { const note = document.createElement('p'); note.textContent = '代码中出现 plt.title()、plt.xlabel()、plt.ylabel()、plt.grid() 后，这里会显示对应参数按钮。'; container.append(note); return; }
  calls.forEach((call, index) => {
    const group = document.createElement('fieldset'), legend = document.createElement('legend'); legend.textContent = `plt.${call.name}()`; group.append(legend);
    const fields = call.name === 'legend' ? [] : call.name === 'grid' ? [['color', '网格颜色', 'color', 'blue']] : [
      ['$text', '文字', 'text', ''], ['fontsize', '字号', 'number', call.name === 'title' ? 12 : 10],
      ['fontweight', '字重', 'weight', 'normal'], [call.name === 'title' ? 'pad' : 'labelpad', '间距', 'number', call.name === 'title' ? 6 : 4],
      ['color', '颜色', 'color', 'black'], ...(call.name === 'title' ? [] : [['loc', '位置', call.name === 'xlabel' ? 'xloc' : 'yloc', 'center']]),
    ];
    if (call.name === 'legend') { const note = document.createElement('p'); note.textContent = '图例文字来自每条 plt.plot() 的 label 参数。'; group.append(note); }
    for (const [key, label, kind, fallback] of fields) {
      const value = readPlotArgument(call, key, fallback);
      // Leave expressions such as fontsize=size under code control.
      if (value === null) continue;
      const row = document.createElement('label'), name = document.createElement('span'); name.textContent = label; row.append(name);
      const wrap = document.createElement('span'); wrap.className = 'plot-param-input';
      const isSelect = ['color', 'weight', 'xloc', 'yloc'].includes(kind);
      const input = document.createElement(isSelect ? 'select' : 'input');
      input.setAttribute('aria-label', `plt.${call.name} ${label}`);
      if (isSelect) {
        const choices = kind === 'color' ? [['blue','蓝色'],['green','绿色'],['yellow','黄色'],['red','红色'],['black','黑色'],['teal','青色'],['orange','橙色'],['purple','紫色'],['white','白色']] : kind === 'weight' ? [['normal','正常'],['semibold','半粗'],['bold','粗体']] : kind === 'xloc' ? [['left','左'],['center','居中'],['right','右']] : [['bottom','下'],['center','居中'],['top','上']];
        if (!choices.some(([v]) => v === value)) choices.push([String(value), String(value)]);
        for (const [v, text] of choices) { const option = document.createElement('option'); option.value = v; option.textContent = text; input.append(option); }
      } else { input.type = kind === 'number' ? 'number' : 'text'; if (kind === 'number') { input.min = key === 'fontsize' ? 1 : 0; input.max = key === 'fontsize' ? 100 : 100; } }
      input.value = value;
      const change = (v) => onChange(index, key, v);
      input.addEventListener('change', () => { if (kind === 'number') { if (!input.checkValidity() || input.value === '') return; change(Number(input.value)); } else change(input.value); });
      if (kind === 'number') {
        for (const direction of [-1, 1]) { const button = document.createElement('button'); button.type = 'button'; button.textContent = direction < 0 ? '−' : '+'; button.setAttribute('aria-label', `${direction < 0 ? '减小' : '增大'} plt.${call.name} ${label}`); button.addEventListener('click', () => change(Math.min(100, Math.max(Number(input.min), Number(value) + direction)))); if (direction < 0) wrap.append(button, input); else wrap.append(button); }
      } else wrap.append(input);
      row.append(wrap); group.append(row);
    }
    container.append(group);
  });
}
