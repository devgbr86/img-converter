import { escapeHtml } from '../utils/escapeHtml.js'

export function createThumb(entry, { onConvert, onRemove }) {
  const el = document.createElement('div')
  el.className = 'thumb'
  el.id = 't-' + entry.id

  el.innerHTML = `
    <img class="preview" src="" alt="pré-visualização">
    <div class="meta">
      <strong>${escapeHtml(entry.file.name)}</strong>
      <div>${(entry.file.size / 1024).toFixed(1)} KB · ${entry.file.type || 'imagem'}</div>
    </div>
    <div class="thumb-actions">
      <button class="thumb-btn convert">Converter</button>
      <a class="thumb-btn download" style="display:none" download>Baixar</a>
      <button class="thumb-btn remove">✕</button>
    </div>
  `

  el.querySelector('.convert').onclick = () => onConvert(entry)
  el.querySelector('.remove').onclick  = () => { onRemove(entry); el.remove() }

  return el
}

export function updateDownloadLink(entry) {
  const el = document.getElementById('t-' + entry.id)
  if (!el) return

  const a = el.querySelector('.download')
  a.style.display = 'flex'
  a.download = entry.outputName

  const prev = a._objectUrl
  if (prev) URL.revokeObjectURL(prev)

  const url = URL.createObjectURL(entry.convertedBlob)
  a._objectUrl = url
  a.href = url

  a.onclick = () => setTimeout(() => {
    URL.revokeObjectURL(url)
    a._objectUrl = null
  }, 5000)

  el.querySelector('.convert').style.display = 'none'
}

export function setThumbSrc(entry, src) {
  const img = document.querySelector('#t-' + entry.id + ' img.preview')
  if (img) img.src = src
}