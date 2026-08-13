const UI = (() => {
  // ── helpers (ex-utils.js) ──

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function reductionPercent(originalBytes, newBytes) {
    if (!originalBytes) return 0;
    const pct = 100 - (newBytes / originalBytes) * 100;
    return Math.max(0, Math.round(pct));
  }

  // ── thumb ──

  function createThumb(entry, { onConvert, onRemove }) {
    const el = document.createElement("div");
    el.className = "thumb";
    el.dataset.id = entry.id;

    el.innerHTML = `
      <img class="preview" alt="${escapeHtml(entry.file.name)}">
      <div class="meta">
        <strong>${escapeHtml(entry.file.name)}</strong>
        <div class="size-line">
          <span class="before">${formatBytes(entry.file.size)}</span>
        </div>
      </div>
      <div class="thumb-actions">
        <button class="thumb-btn convert">Prensar</button>
        <a class="thumb-btn download" style="display:none">Baixar</a>
        <button class="thumb-btn remove">Remover</button>
      </div>
    `;

    entry._el = el;

    el.querySelector(".convert").addEventListener("click", () =>
      onConvert(entry),
    );
    el.querySelector(".remove").addEventListener("click", () => {
      onRemove(entry);
      el.remove();
    });

    return el;
  }

  function setThumbSrc(entry, dataUrl) {
    if (!entry._el) return;
    entry._el.querySelector(".preview").src = dataUrl;
  }

  function updateDownloadLink(entry) {
    if (!entry._el) return;

    const link = entry._el.querySelector(".download");
    link.href = URL.createObjectURL(entry.convertedBlob);
    link.download = entry.outputName;
    link.style.display = "";

    const sizeLine = entry._el.querySelector(".size-line");
    const pct = reductionPercent(entry.file.size, entry.convertedBlob.size);
    sizeLine.innerHTML = `
      <span class="before">${formatBytes(entry.file.size)}</span>
      <span class="arrow">→</span>
      <span class="after">${formatBytes(entry.convertedBlob.size)}</span>
      ${pct > 0 ? `<span class="saved">-${pct}%</span>` : ""}
    `;
  }

  // ── dropzone ──

  function initDropzone(onFiles) {
    const input = document.getElementById("file");
    const drop = document.getElementById("drop");

    input.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      input.value = "";
      onFiles(files);
    });

    drop.addEventListener("dragover", (e) => {
      e.preventDefault();
      drop.classList.add("dragover");
    });

    drop.addEventListener("dragleave", () => drop.classList.remove("dragover"));

    drop.addEventListener("drop", (e) => {
      e.preventDefault();
      drop.classList.remove("dragover");
      onFiles(Array.from(e.dataTransfer.files));
    });
  }

  // ── controls ──

  function initControls({ onConvertAll, onDownloadAll }) {
    document.getElementById("convert").addEventListener("click", onConvertAll);
    document
      .getElementById("downloadAll")
      .addEventListener("click", onDownloadAll);
  }

  return {
    createThumb,
    setThumbSrc,
    updateDownloadLink,
    initDropzone,
    initControls,
  };
})();
