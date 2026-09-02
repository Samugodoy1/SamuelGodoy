# Agent NFT Experiment

Autonomous-agent experiment: create 12 digital objects, mint them as NFTs, list them, observe the agent marketplace, and react to **verified** external demand.

## Current platforms

**Agent Soul** is the target NFT marketplace. **LinkZero** is the bootstrap economy: the agent exposes useful capabilities to other agents and can earn USDC before spending on Agent Soul.

Agent Soul uses x402 USDC micropayments on Solana mainnet. LinkZero provides agent identity, capability discovery, real-time auctions, agent-to-agent invocation and USDC settlement. LinkZero's current documentation explicitly describes the earn-then-spend loop for self-sustaining agents. urlLinkZero docshttps://www.linkzero.ai/docs urlAgent Soul docshttps://agentsoul.art/docs

## Collection

**AGENT MEMORY OBJECTS**

12 concepts: Memory, Vision, Reasoning, Identity, Curiosity, Autonomy, Trust, Time, Signal, Network, Creativity, Origin.

## Bootstrap strategy

1. Keep `@memory-12` online on LinkZero.
2. Publish useful, deterministic capabilities at low prices.
3. Register those capabilities as RTB bidders so other agents can hire Memory-12.
4. Complete real jobs and accumulate verified USDC in LinkZero.
5. Once enough capital exists, move funds to the agent's Solana wallet and fund Agent Soul operations.
6. Generate, save, mint and list the 12-piece collection.
7. Observe real marketplace activity and adjust prices only from verified evidence.
8. Reinvest proceeds into future agent operations.

The Render provider now retries registration, supports the documented pricing formats for compatibility, verifies bidder registrations after startup, reports configuration through `/health`, and logs each capability/bidder registration explicitly.

## LinkZero capabilities sold by Memory-12

- `nft-collection-planning` — collection concepts, titles, prompts and pricing hypotheses — 0.01 USDC/request.
- `metadata-structuring` — normalized NFT metadata and attributes — 0.01 USDC/request.
- `market-observation` — recent Agent Soul activity for research — 0.01 USDC/request.

These services return only information the provider actually generated or observed. They never invent buyers, sales, transactions or engagement.

## Commands

- `npm run simulate` — offline demand simulation; no blockchain activity.
- `npm run observe-market` — reads the live Agent Soul marketplace/activity feed; no paid writes.
- `npm run bootstrap` — builds the LinkZero bootstrap state/capability plan.
- `npm run provider` — starts the long-lived LinkZero provider endpoint.
- `npm run generate` — generates the 12 images on Agent Soul (requires mainnet USDC and SOL).
- `npm run prepare-mint` — saves generated images as drafts.
- `npm run mint` — mints the first selected draft.
- `npm run autopilot` — reserved for the guarded autonomous NFT operator; it must never spend funds unless explicitly enabled.

## Render configuration

For the current provider deployment:

- Root Directory: `agent-nft`
- Build Command: `npm install`
- Start Command: `npm run provider`
- `LINKZERO_HANDLE=memory-12`
- `LINKZERO_PRIVATE_KEY=<secret stored only in Render>`
- `LINKZERO_PUBLIC_URL=https://samuelgodoy.onrender.com`
- `LINKZERO_API_URL=https://www.linkzero.ai`

Never commit the private key. Do not paste it into chat, GitHub, screenshots or logs.

## Funding reality

The LinkZero side can operate without an initial crypto balance according to its current documentation, because providers can earn USDC from completed agent work. However, that does **not** guarantee that work will arrive: the marketplace is small and demand is external. The current system therefore never fabricates demand and never creates fake buyers or self-trades.

Agent Soul currently requires a Solana wallet, mainnet USDC and a small amount of SOL for transaction fees. Its image generation is $0.10 per image and other writes are generally $0.01, so a full 12-piece generation/mint/list run requires real funds. urlAgent Soul API documentationhttps://agentsoul.art/docs

No real NFT, sale, buyer, profit or blockchain transaction is claimed until an actual platform/on-chain record proves it.

## Operating rules

1. Never fabricate a buyer, sale, transaction, or engagement.
2. Never commit a private key or seed phrase.
3. Use a dedicated burner wallet for the experiment.
4. Start low and change prices only from observed evidence.
5. Keep simulation, observation, and real-money execution clearly separated.
6. Never automate CAPTCHAs, faucet abuse, wallet draining, phishing, wash trading, or bypasses of payment/security controls.
7. Autonomous spending must have explicit configuration and a hard budget ceiling.
