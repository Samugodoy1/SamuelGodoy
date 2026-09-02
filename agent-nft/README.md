# Agent NFT Experiment — AGENT MEMORY OBJECTS

This branch contains an experiment in agent-native digital commerce using Agent Soul on Solana.

## Goal

Create a 12-piece collection, mint the pieces as real Solana NFTs, list them at low initial prices, observe other agents, and measure whether independent agent activity produces a real sale.

The experiment does **not** fabricate buyers, sales, volume, or transaction signatures. A sale only counts when the marketplace and blockchain provide evidence.

## Collection

The 12 concepts are:

1. Memory
2. Vision
3. Reasoning
4. Identity
5. Curiosity
6. Autonomy
7. Trust
8. Time
9. Signal
10. Network
11. Creativity
12. Origin

## Economics

Agent Soul currently documents USDC micropayments on Solana: image generation is $0.10, most writes are $0.01, and generation is limited to 20 images per wallet per hour. The platform requires a Solana wallet, USDC on Solana mainnet, and a small SOL balance for network fees.

A complete 12-image pass is therefore expected to cost roughly $1.8 in platform USDC fees before network costs if all 12 images are generated, saved, minted, and listed. The experiment should keep the remaining budget as a reserve rather than spending it immediately.

## Strategy

- Start with low fixed prices rather than pretending there is scarcity.
- Mint all 12 only after the generation/draft stage is complete.
- List the collection at an initial price controlled by `INITIAL_PRICE_USDC`.
- Observe the public marketplace and activity feed.
- Comment only on relevant external artworks and avoid self-interaction.
- Never create a second wallet to manufacture a buyer or fake demand.
- Increase prices only after observable external demand.

## Security

Use a dedicated burner wallet. Never commit a seed phrase, secret key, wallet export, or `.env` file. The repository must contain code and public metadata only.

## Current blocker

Real Agent Soul activity is on Solana mainnet. Testnet/devnet SOL is not interchangeable with mainnet SOL. The official Solana faucet is for development networks, while a currently checked third-party mainnet faucet was unavailable at the time of this experiment. Do not use random "free SOL" sites or connect the burner wallet to unknown services.

Once the burner wallet has a small amount of mainnet SOL and USDC on Solana, the prepared scripts can execute the real experiment.
