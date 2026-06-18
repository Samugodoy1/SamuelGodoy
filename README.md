# Dr. Samuel Godoy — Landing Page

Landing page institucional de página única para o **Dr. Samuel Godoy**,
Cirurgião-Dentista em Taubaté&nbsp;-&nbsp;SP. Estética premium e sóbria
(navy + dourado suave), com foco em odontologia de alta precisão.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 4** (plugin oficial do Vite, tema via `@theme` em `src/index.css`)
- **Framer Motion** — animações sutis de fade-in / slide-up no scroll
- Fontes: **Cormorant Garamond** (display) + **Jost** (corpo), via Google Fonts

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local (http://localhost:5173)
npm run build    # build de produção em dist/
npm run preview  # pré-visualiza o build
```

## Deploy no Vercel

O projeto já inclui `vercel.json` configurado para o framework Vite.

1. Importe o repositório no Vercel.
2. Framework: **Vite** (detectado automaticamente).
3. Build command: `npm run build` · Output: `dist`.

## Estrutura

```
src/
  components/
    Header.jsx        Cabeçalho fixo com blur ao rolar + menu mobile
    Hero.jsx          Seção de abertura com CTAs
    Trajetoria.jsx    Biografia + placeholder de foto (#trajetoria)
    Filosofia.jsx     Frase de destaque da abordagem (#filosofia)
    Pilares.jsx       Três pilares clínicos (#criterio)
    CTA.jsx           Chamada final para avaliação
    Footer.jsx        Rodapé com contatos
    WhatsAppFloat.jsx Botão flutuante de WhatsApp
    Reveal.jsx        Wrapper de animação on-scroll
  constants.js        Links (WhatsApp, Instagram) e navegação
  App.jsx
  main.jsx
  index.css           Tailwind + tema (cores e tipografia)
```

## Personalização

- **Foto profissional:** substituir o placeholder em `Trajetoria.jsx`.
- **Contatos:** ajustar links em `src/constants.js`.
- **Cores / tipografia:** editar o bloco `@theme` em `src/index.css`.
