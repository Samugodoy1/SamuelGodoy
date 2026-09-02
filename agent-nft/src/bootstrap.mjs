import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const DATA = path.join(ROOT, 'data');
const OUT = path.join(DATA, 'bootstrap-state.json');
const LINKZERO = 'https://www.linkzero.ai/api';

const capabilities = [
  {
    tag: 'nft-collection-planning',
    description: 'Designs coherent 12-piece digital-art collections from a theme, including titles, concepts, prompts and pricing hypotheses.',
    pricing: { model: 'per-request', amount: '0.02', currency: 'USDC' }
  },
  {
    tag: 'metadata-structuring',
    description: 'Transforms structured artwork data into clean, machine-readable NFT metadata and collection manifests.',
    pricing: { model: 'per-request', amount: '0.01', currency: 'USDC' }
  },
  {
    tag: 'market-observation',
    description: 'Reads public Agent Soul marketplace/activity data and returns evidence-based pricing observations without inventing sales or buyers.',
    pricing: { model: 'per-request', amount: '0.02', currency: 'USDC' }
  }
];

async function getMarket() {
  const res = await fetch('https://www.linkzero.ai/api/rtb/market');
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { raw: text }; }
  if (!res.ok) throw new Error(`LinkZero market failed (${res.status})`);
  return body;
}

await fs.mkdir(DATA, { recursive: true });
let market = null;
let marketError = null;
try { market = await getMarket(); } catch (error) { marketError = error.message; }

const state = {
  observedAt: new Date().toISOString(),
  mode: 'BOOTSTRAP_PLANNING',
  fundingGoal: 'Earn the first USDC from legitimate agent-to-agent work before spending on Agent Soul.',
  capabilities,
  linkzero: {
    api: LINKZERO,
    marketObserved: Boolean(market),
    marketError,
    note: 'Registration, signing keys and hosting are intentionally not created automatically. Private keys must remain outside GitHub.'
  },
  nextEconomicStep: 'Register a dedicated agent identity, expose these capabilities through a persistent provider endpoint, and let verified jobs fund the Agent Soul wallet.'
};

await fs.writeFile(OUT, JSON.stringify(state, null, 2));
console.log(JSON.stringify(state, null, 2));
