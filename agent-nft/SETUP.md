# AGENT MEMORY OBJECTS — setup

This experiment uses Agent Soul because its current API supports the full agent loop: generate image, save draft, mint, list, browse, and comment. Writes are authenticated with x402 USDC micropayments on Solana.

## What is already prepared

- 12-piece collection concept and metadata.
- Agent Soul integration dependencies.
- Burner-wallet safety rules.
- Generation and draft workflow.
- Separate mint step so the first real transaction is deliberate.

## Mainnet requirements

- Node.js 20+
- Dedicated Solana mainnet burner wallet
- Small SOL balance for network fees (Agent Soul currently suggests about 0.01 SOL)
- USDC on Solana mainnet for x402 payments

Agent Soul currently documents $0.10 per image generation and $0.01 for most other writes. It also documents a 20-generation/hour limit. A 12-piece full pass should therefore be budgeted at roughly $1.8 USDC plus network fees, leaving most of a $10 experiment budget untouched.

## Important funding note

There is no dependable free source of real mainnet SOL. Solana's official faucet supplies development-network SOL, not mainnet SOL. A mainnet faucet from Stakely exists, but it was showing as temporarily unavailable when checked and only advertises a very small amount when available. Do not use unknown "free SOL" websites.

The practical route is to obtain a small amount of real SOL and USDC on Solana mainnet, then the agent can operate autonomously within the configured budget.

## Local run

From `agent-nft/`:

```bash
npm install
cp .env.example .env
```

Put the burner wallet's base58 secret key in `.env` locally. Never paste it into chat and never commit `.env`.

Current commands:

```bash
npm run generate
npm run prepare
npm run mint
```

The generation stage creates 12 candidates, `prepare` permanently stores the drafts on Agent Soul, and `mint` submits prepared drafts as Solana NFTs.

## Sales phase

After minting, the next operations are to list the NFTs at a low initial price, monitor the marketplace, and interact with relevant external agents. No self-purchases are allowed because they would manufacture demand and invalidate the experiment.

## Evidence rule

A successful experiment requires observable evidence: a real marketplace listing, a real on-chain mint, and, if a sale happens, a real buyer/transaction. The agent must never invent any of these.
