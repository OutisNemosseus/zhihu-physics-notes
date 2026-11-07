const slides = {"L02":"https://drive.google.com/file/d/1-Ah1XbD2dm0Nq_W1Ogai5HkSe7byVhIL/view","L03":"https://drive.google.com/file/d/10XLowCfYfFVO94reVTG0fTRTyoYZYRMh/view","L05":"https://drive.google.com/file/d/1WDp-IVJEkD44ENwXgYEradBFyfIQNyqu/view","L06":"https://drive.google.com/file/d/1gRfTlpa9CeVrTkT4Li6ztDAIO6IH4Cyt/view","L07":"https://drive.google.com/file/d/10ZHEu72CAIfqWv4txzROSnlFpZgvnHtb/view","L08":"https://drive.google.com/file/d/1AJwe6Pn4wTCGTXmqeFY2k6k0qfKO7e2-/view"};
const byId = id => document.getElementById(id);
const key = "engr103-ordering-67-v1";
let state = {};
try { state = JSON.parse(localStorage.getItem(key) || "{}") || {}; } catch {}
let index = 0;
let dragged = null;
let feedback = "";

function shuffle(ids) {
  const result = ids.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  if (result.every((value, i) => value === ids[i])) result.push(result.shift());
  return result;
}

function canonical(blocks) { return blocks.map((_, i) => i); }
function ordered(order, blocks) {
  const positions = new Map(order.map((id, pos) => [id, pos]));
  return blocks.every(([, , , deps], id) => deps.every(dep => positions.get(dep) < positions.get(id)));
}
function scrambled(blocks) {
  const ids = canonical(blocks);
  let result = shuffle(ids);
  if (ordered(result, blocks)) result = ids.slice().reverse();
  return result;
}
function questionState(id, blocks) {
  const previous = state[id];
  if (!previous || !Array.isArray(previous.order) ||
      previous.order.slice().sort((a,b) => a-b).join() !== canonical(blocks).join()) {
    state[id] = {order: scrambled(blocks), solved: false};
  }
  return state[id];
}
function persist() {
  try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
}
function codeWithSource([lecture, page, code]) {
  return code.match(/^ */)[0] + "# " + lecture + " p. " + page + " " + slides[lecture] + "\n" + code;
}
function assemble(given, blocks, order) {
  return [given, ...order.map(id => codeWithSource(blocks[id]))].filter(Boolean).join("\n") + "\n";
}
function select(next) {
  index = Math.max(0, Math.min(next, Q.length - 1));
  feedback = "";
  history.replaceState(null, "", "#" + Q[index][0]);
  byId("reference").open = false;
  byId("hint").open = false;
  render();
}
function move(from, to, focusId) {
  const [id, , , , , , blocks] = Q[index];
  const current = questionState(id, blocks);
  if (from === to || from < 0 || to < 0 || to >= current.order.length) return;
  const [moved] = current.order.splice(from, 1);
  current.order.splice(to, 0, moved);
  feedback = "";
  persist();
  render();
  if (focusId !== undefined) byId("handle-" + focusId)?.focus();
}

function render() {
  const [id, group, title, prompt, hint, given, blocks] = Q[index];
  const current = questionState(id, blocks);
  const count = Q.filter(([qid]) => state[qid]?.solved).length;
  byId("progress").value = count;
  byId("done").textContent = count + " / " + Q.length + " 已通过";
  byId("nav").replaceChildren();
  for (const label of ["ICA 6", "ICA 7", "HW 6", "HW 7"]) {
    const heading = document.createElement("h2");
    heading.textContent = label;
    byId("nav").append(heading);
    const row = document.createElement("div");
    row.className = "number-row";
    Q.forEach(([qid, qgroup, qtitle], i) => {
      if (qgroup !== label) return;
      const button = document.createElement("button");
      button.textContent = qid.split("-")[1] + (state[qid]?.solved ? " ✓" : "");
      button.title = qtitle;
      button.setAttribute("aria-label", label + " " + qid.split("-")[1] + " " + qtitle);
      if (i === index) button.setAttribute("aria-current", "true");
      button.onclick = () => select(i);
      row.append(button);
    });
    byId("nav").append(row);
  }
  byId("meta").textContent = group + " · " + (index + 1) + "/" + Q.length;
  byId("title").textContent = title;
  byId("prompt").textContent = prompt;
  byId("hint-text").textContent = hint;
  byId("given-box").hidden = !given;
  byId("given").textContent = given;
  byId("csv").hidden = id !== "ica7-1";
  byId("reference-code").textContent = assemble(given, blocks, canonical(blocks));
  byId("feedback").textContent = feedback;
  byId("prev").disabled = index === 0;
  byId("next").disabled = index === Q.length - 1;
  byId("blocks").replaceChildren();
  current.order.forEach((blockId, pos) => {
    const [lecture, page, code] = blocks[blockId];
    const row = document.createElement("li");
    row.className = "block";
    const handle = document.createElement("button");
    handle.className = "handle";
    handle.id = "handle-" + blockId;
    handle.textContent = "⠿";
    handle.draggable = true;
    handle.title = "拖动或按 Alt + ↑ / ↓";
    handle.setAttribute("aria-label", "移动第 " + (pos + 1) + " 块代码");
    handle.addEventListener("dragstart", event => {
      dragged = pos;
      event.dataTransfer.setData("text/plain", String(pos));
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setDragImage(row, 20, 20);
    });
    handle.addEventListener("dragend", () => {
      dragged = null;
      document.querySelectorAll(".over").forEach(el => el.classList.remove("over"));
    });
    row.addEventListener("dragover", event => {
      if (dragged === null) return;
      event.preventDefault();
      row.classList.add("over");
    });
    row.addEventListener("dragleave", event => {
      if (!row.contains(event.relatedTarget)) row.classList.remove("over");
    });
    row.addEventListener("drop", event => {
      if (dragged === null) return;
      event.preventDefault();
      const from = dragged;
      dragged = null;
      row.classList.remove("over");
      move(from, pos, blockId);
    });
    handle.onkeydown = event => {
      if (!event.altKey || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      move(pos, pos + (event.key === "ArrowUp" ? -1 : 1), blockId);
    };
    const body = document.createElement("div");
    body.className = "block-body";
    const pre = document.createElement("pre");
    pre.textContent = code;
    const source = document.createElement("a");
    source.href = slides[lecture] + "#page=" + page;
    source.target = "_blank";
    source.rel = "noopener";
    source.textContent = lecture + " · 第 " + page + " 页 ↗";
    body.append(pre, source);
    const controls = document.createElement("div");
    controls.className = "arrows";
    for (const [arrow, delta, name] of [["↑", -1, "上移"], ["↓", 1, "下移"]]) {
      const button = document.createElement("button");
      button.textContent = arrow;
      button.setAttribute("aria-label", name + "第 " + (pos + 1) + " 块");
      button.disabled = pos + delta < 0 || pos + delta >= current.order.length;
      button.onclick = () => move(pos, pos + delta, blockId);
      controls.append(button);
    }
    row.append(handle, body, controls);
    byId("blocks").append(row);
  });
}

byId("check").onclick = () => {
  const [id, , , , , , blocks] = Q[index];
  const current = questionState(id, blocks);
  if (ordered(current.order, blocks)) {
    current.solved = true;
    feedback = "顺序正确。所有代码块的前置步骤都已就位。";
  } else {
    feedback = "还有前置步骤放在了它的使用位置之后。展开提示，再调整顺序。";
  }
  persist();
  render();
};
byId("shuffle").onclick = () => {
  const [id, , , , , , blocks] = Q[index];
  questionState(id, blocks).order = scrambled(blocks);
  feedback = "已重新打乱。";
  persist();
  render();
};
byId("download").onclick = () => {
  const [id, , , , , given, blocks] = Q[index];
  const url = URL.createObjectURL(new Blob([assemble(given, blocks, questionState(id, blocks).order)], {type: "text/plain;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = id + "-ordering.py";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
byId("prev").onclick = () => select(index - 1);
byId("next").onclick = () => select(index + 1);
function fromHash() {
  const found = Q.findIndex(([id]) => "#" + id === location.hash);
  if (found >= 0) select(found);
}
window.addEventListener("hashchange", fromHash);
if (location.hash) { fromHash(); if (!byId("title").textContent) select(0); } else select(0);
