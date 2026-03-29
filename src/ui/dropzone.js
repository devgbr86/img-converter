export function initDropzone(onFiles) {
  const drop = document.getElementById('drop')
  const fileInput = document.getElementById('file')

  fileInput.addEventListener('change', async (e) => {
    await onFiles(Array.from(e.target.files))
    fileInput.value = ''
  })

  ;['dragenter', 'dragover'].forEach(ev => {
    drop.addEventListener(ev, e => {
      e.preventDefault()
      drop.classList.add('dragover')
    })
  })

  ;['dragleave', 'drop'].forEach(ev => {
    drop.addEventListener(ev, e => {
      e.preventDefault()
      drop.classList.remove('dragover')
    })
  })

  drop.addEventListener('drop', async (e) => {
    const files = Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'))
    if (files.length) await onFiles(files)
  })
}