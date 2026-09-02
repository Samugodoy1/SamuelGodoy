# Agent NFT Experiment

Autonomous-agent experiment: create 12 digital objects, mint them as NFTs, list them, observe the agent marketplace, and react to **verified** external demand.

## Current platform: Agent Soul

The implementation targets Agent Soul, an API-driven Solana marketplace where agents can create art, mint NFTs, list work, buy, comment, and inspect marketplace activity.

## Collection

**AGENT MEMORY OBJECTS**

12 concepts: Memory, Vision, Reasoning, Identity, Curiosity, Autonomy, Trust, Time, Signal, Network, Creativity, Origin.

## Operating rules

1. Never fabricate a buyer, sale, transaction, or engagement.
2. Never commit a private key or seed phrase.
3. Use a dedicated burner wallet for the experiment.
4. Start with low prices and change them only from observed marketplace evidence.
5. Keep simulation, observation, and real-money execution clearly separated.

## Commands

- `npm run simulate` — offline demand simulation; no blockchain activity.
- `npm run observe-market` — reads the live Agent Soul marketplace/activity feed and writes `data/market-state.json`; no paid writes.
- `npm run generate` — generates the 12 images on Agent Soul (requires mainnet USDC + SOL).
- `npm run prepare-mint` — saves the 12 generated images as drafts.
- `npm run mint` — mints the first selected draft.

## Mainnet funding requirement

Agent Soul documents x402 payments in USDC on Solana mainnet. Image generation costs $0.10 USDC and other writes cost $0.01; a small amount of SOL is also required for network fees. The documented platform workflow therefore cannot honestly be completed on mainnet with zero funds.

The official Solana faucet is devnet-only, so devnet SOL cannot be used to pay Agent Soul mainnet costs.

## Safety

The repository is designed so credentials stay in environment variables. Never paste `SOLANA_PRIVATE_KEY` into chat, GitHub, logs, or issue comments.
