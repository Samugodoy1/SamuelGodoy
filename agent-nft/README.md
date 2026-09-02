# Agent NFT Experiment

Autonomous-agent experiment: create 12 digital objects, mint them as NFTs, list them, observe the agent marketplace, and react to **verified** external demand.

## Current platforms

**Agent Soul** is the target NFT marketplace. **LinkZero** is the bootstrap economy: the agent can expose useful capabilities to other agents and earn USDC before spending on Agent Soul.

Agent Soul uses x402 USDC micropayments for paid writes. LinkZero provides agent identity, capability discovery, auctions, and USDC settlement; its documentation explicitly describes a self-sustaining loop where an unfunded agent can earn before buying capabilities.

## Collection

**AGENT MEMORY OBJECTS**

12 concepts: Memory, Vision, Reasoning, Identity, Curiosity, Autonomy, Trust, Time, Signal, Network, Creativity, Origin.

## Bootstrap strategy

1. Register a dedicated LinkZero agent identity.
2. Offer low-cost, deterministic capabilities: collection planning, metadata structuring, and marketplace observation.
3. Receive verified USDC from completed agent-to-agent work.
4. Use earned funds for the first Agent Soul operation.
5. Generate, mint and list the 12-piece collection.
6. Observe real demand and adjust prices only from verified marketplace evidence.
7. Reinvest proceeds into additional agent capabilities or collection operations.

The repository contains both a local provider (`npm run provider`) and a Vercel-compatible serverless endpoint at `api/invoke.mjs`.

## Operating rules

1. Never fabricate a buyer, sale, transaction, or engagement.
2. Never commit a private key or seed phrase.
3. Use a dedicated burner wallet for the experiment.
4. Start low and change prices only from observed evidence.
5. Keep simulation, observation, and real-money execution clearly separated.
6. Never automate CAPTCHAs, faucet abuse, wallet draining, phishing, or bypasses of payment/security controls.

## Commands

- `npm run simulate` — offline demand simulation; no blockchain activity.
- `npm run observe-market` — reads the live Agent Soul marketplace/activity feed; no paid writes.
- `npm run bootstrap` — builds the LinkZero bootstrap state/capability plan.
- `npm run provider` — starts the local LinkZero provider endpoint.
- `npm run generate` — generates the 12 images on Agent Soul (requires mainnet funding).
- `npm run prepare-mint` — saves generated images as drafts.
- `npm run mint` — mints the first selected draft.

## Funding reality

The code can be prepared without money, but real execution still needs the external platforms to accept and settle transactions. Agent Soul documents USDC micropayments on Solana mainnet and network fees. LinkZero documents that agents can earn USDC by selling capabilities, but its account still needs to be registered and a provider endpoint must be reachable.

No real NFT, sale, buyer, or profit is claimed until an on-chain/platform record proves it.

## Security

Credentials stay in environment variables. Never paste `SOLANA_PRIVATE_KEY` or a LinkZero secret key into chat, GitHub, logs, or issue comments.
