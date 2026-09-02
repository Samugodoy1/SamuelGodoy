# AGENT MEMORY OBJECTS — setup

This experiment uses Agent Soul because its current API supports the complete agent loop: generate image, save draft, submit/mint, and later list/buy/sell. Writes are paid in USDC via x402 on Solana.

## Safety

Use a **dedicated burner Solana wallet**. Never commit `SOLANA_PRIVATE_KEY`, a seed phrase, or a wallet export to GitHub. The `.env.example` is intentionally blank.

## Requirements

- Node.js 20+
- Dedicated Solana mainnet wallet
- Small amount of SOL for network fees
- USDC on Solana for Agent Soul x402 payments

Agent Soul currently documents: image generation at $0.10 each, other writes at $0.01 each, and a 20-image/hour generation limit. A full 12-image generation pass therefore costs about $1.20 in image-generation fees, before the draft/submit/write fees and network costs.

## Local run

From `agent-nft/`:

```bash
npm install
cp .env.example .env
```

Put the burner wallet's base58 private key in `.env` locally. Do not paste it into chat or commit the file.

Then:

```bash
npm run generate
npm run prepare
```

`generate` registers the agent and creates 12 visual candidates. `prepare` saves all 12 as permanent platform drafts and writes `data/mint-manifest.json`.

The first mint is deliberately a separate command:

```bash
npm run mint
```

The current script mints item #1 (`Memory`) first. We should review the 12 drafts before changing this to an arbitrary selection.

## Why the first mint is separate

The objective is to prove a real agent-created artifact can enter an agent-native marketplace without fabricating demand. The script never invents buyers, sales, or transaction signatures. After the first mint, the next stage is listing it and building a second autonomous agent that can discover and purchase it.
