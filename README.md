# JPGpress

Conversor de imagens (PNG, WebP, qualquer formato suportado pelo navegador) para JPG comprimido. 100% client-side — nada é enviado para servidor.

## Como funciona

1. Selecione ou arraste imagens.
2. Cada imagem gera uma miniatura via `createImageBitmap` + `<canvas>`.
3. "Prensar" desenha a imagem num canvas com fundo branco (evita transparência virando preto) e exporta via `canvas.toBlob('image/jpeg', 0.8)`.
4. Baixe individualmente ou tudo de uma vez.

## Stack

- Vanilla JS, sem build step, sem dependências.
- Fontes: Space Mono (mono) + DM Sans (sans), via Google Fonts.

## Estrutura

```
index.html   markup + import dos scripts
style.css    tema dark, grid de thumbs
store.js     Store — estado dos arquivos (add/remove/getAll/getPending/getConverted)
press.js     Press — loadImage, convertToJpg, generateThumbnail (toda lógica de canvas)
ui.js        UI — render de thumbs, dropzone, controles, helpers de formatação
main.js      orquestração — liga Store + Press + UI, define QUALITY
```

Padrão: cada módulo é uma IIFE que expõe um objeto global (`Store`, `Press`, `UI`), sem imports/bundler.

## Qualidade de compressão

Fixa em `0.8` (constante `QUALITY` em `main.js`). Sem controle na UI — ajustar direto no código se precisar de outro valor.

## Limitações conhecidas

- Object URLs de conversões repetidas da mesma imagem não são revogados (leak leve se reconverter várias vezes).
- Sem validação de tipo no drag-and-drop — arquivo não suportado pelo navegador falha silenciosamente (só loga no console).
- `onConvertAll` reprocessa imagens já convertidas.

## Rodando local

Sem build. Basta servir os arquivos estáticos:

```bash
npx serve .
```

## Licença

MIT