const drop = document.getElementById('drop');
const fileInput = document.getElementById('file');
const thumbs = document.getElementById('thumbs');
const formatSelect = document.getElementById('format');
const convertBtn = document.getElementById('convert');
const downloadAllBtn = document.getElementById('downloadAll');

let files = [];

fileInput.addEventListener('change', async (e) => {
     await handleFiles(Array.from(e.target.files));
     fileInput.value = '';
});

['dragenter', 'dragover'].forEach(ev => {
     drop.addEventListener(ev, e => {
          e.preventDefault();
          drop.classList.add('dragover');
     });
});

['dragleave', 'drop'].forEach(ev => {
     drop.addEventListener(ev, e => {
          e.preventDefault();
          drop.classList.remove('dragover');
     });
});

drop.addEventListener('drop', async (e) => {
     const dt = e.dataTransfer;
     if (!dt) return;
     const f = Array.from(dt.files).filter(f => f.type.startsWith('image/'));
     await handleFiles(f);
});

async function handleFiles(fileList) {
     for (const f of fileList) {
          const id = crypto.randomUUID();
          const entry = { id, file: f, imageBitmap: null, convertedBlob: null, outputName: null };
          files.push(entry);
          renderThumb(entry);
          try {
               entry.imageBitmap = await createImageBitmap(f);
               updateThumbPreview(entry);
          } catch (err) {
               console.error('Erro ao criar imagem:', err);
          }
     }
}

function renderThumb(entry) {
     const el = document.createElement('div');
     el.className = 'thumb';
     el.id = 't-' + entry.id;
     el.innerHTML = `
          <img class="preview" src="" alt="pré-visualização">
          <div class="meta">
               <strong>${escapeHtml(entry.file.name)}</strong>
               <div>${(entry.file.size / 1024).toFixed(1)} KB • ${entry.file.type || 'imagem'}</div>
          </div>
          <div class="thumb-actions">
               <button class="thumb-btn convert" data-action="convert">Converter</button>
               <a class="thumb-btn download" data-action="download" style="display:none" download>Baixar</a>
               <button class="thumb-btn remove" data-action="remove">Remover</button>
          </div>
     `;
     thumbs.appendChild(el);

     el.querySelector('[data-action=convert]').onclick = async () => {
          await convertSingle(entry);
     };

     el.querySelector('[data-action=download]').onclick = () => {
          if (entry.convertedBlob) {
               const a = el.querySelector('[data-action=download]');
               a.href = URL.createObjectURL(entry.convertedBlob);
          }
     };

     el.querySelector('[data-action=remove]').onclick = () => {
          files = files.filter(x => x.id !== entry.id);
          el.remove();
     };
}

function updateThumbPreview(entry) {
     const img = document.querySelector('#t-' + entry.id + ' img.preview');
     const canvas = document.createElement('canvas');
     const ctx = canvas.getContext('2d');
     const aspect = entry.imageBitmap.width / entry.imageBitmap.height;
     const w = 300, h = Math.round(w / aspect);
     canvas.width = w;
     canvas.height = h;
     ctx.drawImage(entry.imageBitmap, 0, 0, w, h);
     img.src = canvas.toDataURL('image/png');
}

async function convertSingle(entry) {
     if (!entry.imageBitmap) {
          alert('Imagem ainda não está pronta.');
          return;
     }

     const fmt = formatSelect.value;
     const quality = 1.0;

     const canvas = document.createElement('canvas');
     const img = entry.imageBitmap;
     canvas.width = img.width;
     canvas.height = img.height;
     const ctx = canvas.getContext('2d');
     ctx.drawImage(img, 0, 0);

     let ext = 'png';
     if (fmt === 'image/jpeg') ext = 'jpg';
     if (fmt === 'image/webp') ext = 'webp';

     const blob = await new Promise((res) => {
          canvas.toBlob(res, fmt, quality);
     });

     if (!blob) {
          alert('Não foi possível converter (formato não suportado pelo navegador).');
          return;
     }

     const baseName = entry.file.name.replace(/\.[^/.]+$/, '');
     entry.convertedBlob = blob;
     entry.outputName = `${baseName}.${ext}`;

     const el = document.getElementById('t-' + entry.id);
     const a = el.querySelector('[data-action=download]');
     a.style.display = 'flex';
     a.download = entry.outputName;
     a.href = URL.createObjectURL(blob);
     a.onclick = () => setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

convertBtn.addEventListener('click', async () => {
     for (const entry of files) {
          await convertSingle(entry);
     }
});

downloadAllBtn.addEventListener('click', async () => {
     const need = files.filter(f => !f.convertedBlob);
     for (const f of need) await convertSingle(f);

     const converted = files.filter(f => f.convertedBlob);
     if (converted.length === 0) {
          alert('Nenhum arquivo convertido.');
          return;
     }

     for (const f of converted) {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(f.convertedBlob);
          a.download = f.outputName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 5000);
     }
});

function escapeHtml(s) {
     return s.replace(/[&<>"']/g, c => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
     }[c]));
}