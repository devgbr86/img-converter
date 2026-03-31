# img-converter

Conversor de imagens client-side entre PNG, JPG e WebP.
Sem backend, sem upload, sem dependências externas.

---

## Como funciona

O arquivo é lido via `createImageBitmap()`, renderizado em um `<canvas>` e exportado no formato escolhido através de `canvas.toBlob()`. Todo o processamento ocorre no navegador.

---

## Uso

```
git clone https://github.com/devgbr86/img-converter.git
cd img-converter
```

Abra `index.html` diretamente no navegador. Nenhum servidor ou build necessário.

1. Selecione arquivos pelo botão ou arraste para a área de drop
2. Escolha o formato de saída (PNG, JPG ou WebP)
3. Converta individualmente ou use "Converter Todas"
4. Baixe os arquivos convertidos

---

## Arquitetura

```
src/
  main.js              — orquestrador, ponto de entrada
  store/
    store.js           — estado global das imagens carregadas
  services/
    imageService.js    — loadImage, convertImage, generateThumbnail
  ui/
    dropzone.js        — captura de arquivos (input + drag and drop)
    controls.js        — botões de ação global
    thumb.js           — criação e atualização dos cards de preview
  utils/
    escapeHtml.js      — sanitização de strings para o DOM
  styles/
    main.css           — estilos globais
```

A separação entre `services/` e `utils/` é intencional: `services/` contém lógica de domínio da aplicação (conversão de imagem), `utils/` contém apenas funções puras sem contexto de negócio.

---

## Tecnologias

- HTML5, CSS3, JavaScript ES6 (módulos nativos)
- Canvas API — `createImageBitmap()`, `toBlob()`
- `URL.createObjectURL()` com `revokeObjectURL()` para evitar memory leak

---

## Observações

- Metadados EXIF não são preservados na conversão
- Qualidade de saída padrão: 1.0 (máxima)
- WebP requer navegadores modernos (Chrome 32+, Firefox 65+, Safari 14+)

---

## Licença

MIT — uso livre para fins pessoais e comerciais.

---

Criado por [devgbr86](https://github.com/devgbr86) — 2025.