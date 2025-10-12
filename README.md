# 🖼️ Conversor de Imagens (PNG / JPG / WebP) — 100% Client-Side

Conversor simples e rápido feito em **HTML, CSS e JavaScript puro**, que permite **converter imagens entre PNG, JPG e WebP diretamente no navegador**, sem necessidade de backend ou upload para servidores.

---

## 🚀 Funcionalidades

* ✅ Conversão **totalmente local (client-side)** — privacidade total.
* ✅ Suporte a **PNG**, **JPG** e **WebP**.
* ✅ Conversão individual ou em lote (“Converter Todas”).
* ✅ **Download automático** das imagens convertidas.
* ✅ Interface responsiva e moderna.
* ✅ Pré-visualização em miniaturas (thumbnails).
* ✅ Compatível com navegadores modernos (Chrome, Edge, Firefox, Safari 14+).

---

## 🧠 Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (ES6)**
* API nativa:

  * [`<canvas>`](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API)
  * [`toBlob()`](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement/toBlob)
  * [`createImageBitmap()`](https://developer.mozilla.org/pt-BR/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap)

---

## 📦 Como usar

1. Baixe ou clone este repositório:

   ```bash
   git clone https://github.com/seuusuario/conversor-imagens.git
   cd conversor-imagens
   ```
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Clique em **Selecionar Arquivos** ou arraste as imagens para a área indicada.
4. Escolha o formato desejado (PNG, JPG ou WebP).
5. Clique em **Converter Todas** ou converta individualmente.
6. Faça o download dos arquivos convertidos.

---

## ⚙️ Como funciona

O script lê cada imagem com `createImageBitmap()`, renderiza em um `<canvas>` e exporta para o formato selecionado via `canvas.toBlob()`.
Tudo acontece no navegador, garantindo **zero upload** e **máxima privacidade**.

---

## 🧾 Observações

* Metadados EXIF **não são preservados**.
* A conversão usa **qualidade máxima (1.0)** por padrão.
* WebP pode não ser suportado em navegadores antigos.

---

## 📄 Licença

Código sob licença **MIT** — uso livre para fins pessoais e comerciais.

---

## 👨‍💻 Autor

Criado por [**codemaps**](https://codemaps.pages.dev) — 2025.

---
