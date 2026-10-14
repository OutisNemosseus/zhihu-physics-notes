function imageBlob(base64, mime) {
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  return new Blob([bytes], { type: mime });
}

export class PlotOutput {
  constructor({ container, panel, consolePane, layout, onLayoutChange = () => {}, document = globalThis.document, urls = URL }) {
    Object.assign(this, { container, panel, consolePane, layout, onLayoutChange, document, urls });
    this.objectUrls = [];
    this.count = 0;
    this.tab = 'output';
  }
  updateVisibility(tab = this.tab) {
    this.tab = tab;
    const visible = this.count > 0 && tab === 'output';
    this.panel.hidden = !visible;
    this.consolePane.classList.toggle('has-plots', visible);
    this.layout.classList.toggle('showing-plots', visible);
    this.onLayoutChange();
  }
  reset() {
    for (const url of this.objectUrls) this.urls.revokeObjectURL(url);
    this.objectUrls = [];
    this.container.replaceChildren();
    this.count = 0;
    this.updateVisibility();
  }
  add(image) {
    const filename = String(image.filename || `figure-${this.count + 1}.png`).split(/[\\/]/).pop();
    const downloadUrl = this.urls.createObjectURL(imageBlob(image.data, image.mime));
    const previewUrl = image.mime === 'image/png' && image.data === image.preview
      ? downloadUrl : this.urls.createObjectURL(imageBlob(image.preview, 'image/png'));
    this.objectUrls.push(downloadUrl);
    if (previewUrl !== downloadUrl) this.objectUrls.push(previewUrl);
    const figure = this.document.createElement('figure'); figure.className = 'plot-card';
    const img = this.document.createElement('img'); img.src = previewUrl; img.alt = `Python 绘图结果：${filename}`;
    const caption = this.document.createElement('figcaption');
    const name = this.document.createElement('span'); name.textContent = filename;
    const download = this.document.createElement('a'); download.href = downloadUrl; download.download = filename;
    download.textContent = '↓ 下载图片'; download.setAttribute('aria-label', `下载 ${filename}`);
    caption.append(name, download); figure.append(img, caption); this.container.append(figure);
    this.count++;
    this.updateVisibility();
    this.panel.scrollTop = this.panel.scrollHeight;
  }
}
