export function initControls({ onConvertAll, onDownloadAll }) {
  document.getElementById('convert').addEventListener('click', onConvertAll)
  document.getElementById('downloadAll').addEventListener('click', onDownloadAll)
}