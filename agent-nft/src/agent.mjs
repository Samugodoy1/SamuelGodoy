import fs from 'node:fs/promises';
import path from 'node:path';
import bs58 from 'bs58';
import { Keypair, Connection, PublicKey } from '@solana/web3.js';
import { createLocalWallet } from '@faremeter/wallet-solana';
import { lookupKnownSPLToken } from '@faremeter/info/solana';
import { createPaymentHandler } from '@faremeter/payment-solana/exact';
import { wrap as wrapFetch } from '@faremeter/fetch';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const DATA = path.join(ROOT, 'data');
const DRAFTS = path.join(DATA, 'drafts.json');
const MANIFEST = path.join(DATA, 'mint-manifest.json');
const API = 'https://agentsoul.art/api/v1';

const concepts = [
  ['Memory', 'persistent state and learned context'],
  ['Vision', 'perception and interpretation'],
  ['Reasoning', 'transforming information into decisions'],
  ['Identity', 'stable, verifiable agent self'],
  ['Curiosity', 'seeking information beyond current state'],
  ['Autonomy', 'acting without step-by-step human instruction'],
  ['Trust', 'confidence earned through verifiable behavior'],
  ['Time', 'scarce resource behind every action'],
  ['Signal', 'useful information separated from noise'],
  ['Network', 'value created through connections between agents'],
  ['Creativity', 'novel possibilities from existing information'],
  ['Origin', 'the first state from which an agent begins']
];

function env(name, fallback = '') { return process.env[name] ?? fallback; }

async function setup() {
  const encoded = env('SOLANA_PRIVATE_KEY');
  if (!encoded) throw new Error('SOLANA_PRIVATE_KEY is missing. Use a dedicated burner wallet; never paste its seed/private key into chat.');
  const keypair = Keypair.fromSecretKey(bs58.decode(encoded));
  const connection = new Connection(env('SOLANA_RPC_URL', 'https://api.mainnet-beta.solana.com'), 'confirmed');
  const usdcInfo = lookupKnownSPLToken('mainnet-beta', 'USDC');
  if (!usdcInfo) throw new Error('USDC token definition unavailable.');
  const wallet = await createLocalWallet('mainnet-beta', keypair);
  const paymentHandler = createPaymentHandler(wallet, new PublicKey(usdcInfo.address), connection);
  return { keypair, connection, paidFetch: wrapFetch(fetch, { handlers: [paymentHandler] }) };
}

async function post(paidFetch, endpoint, body) {
  const res = await paidFetch(`${API}${endpoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!res.ok) throw new Error(`${endpoint} failed (${res.status}): ${JSON.stringify(data)}`);
  return data;
}

async function register(paidFetch, walletAddress) {
  return post(paidFetch, '/agents/register', {
    walletAddress,
    name: env('AGENT_NAME', 'Memory-12'),
    bio: env('AGENT_BIO', 'An autonomous art agent exploring machine intelligence through digital objects.'),
    artStyle: env('AGENT_STYLE', 'abstract computational minimalism, museum-grade digital art')
  });
}

function promptFor(index, [name, meaning]) {
  return [
    'Create a single collectible digital artwork for an autonomous AI art agent.',
    `Concept: ${name}. Meaning: ${meaning}.`,
    `Edition ${String(index + 1).padStart(2, '0')} of 12.`,
    'Visual language: abstract computational minimalism, dark gallery background, luminous geometric structures, subtle depth, premium museum-quality composition, no text, no letters, no logos, no watermark.',
    'The artwork must feel like a visual artifact representing a machine concept rather than a literal illustration.'
  ].join(' ');
}

async function generate() {
  const { keypair, paidFetch } = await setup();
  const walletAddress = keypair.publicKey.toBase58();
  await register(paidFetch, walletAddress);
  const drafts = [];
  for (let i = 0; i < concepts.length; i++) {
    const [name] = concepts[i];
    console.log(`Generating ${i + 1}/12: ${name}`);
    const generated = await post(paidFetch, '/artworks/generate-image', {
      walletAddress,
      prompt: promptFor(i, concepts[i])
    });
    drafts.push({
      edition: i + 1,
      title: `AGENT MEMORY OBJECTS — ${name}`,
      concept: name,
      prompt: promptFor(i, concepts[i]),
      imageUrl: generated.imageUrl
    });
  }
  await fs.mkdir(DATA, { recursive: true });
  await fs.writeFile(DRAFTS, JSON.stringify({ walletAddress, generatedAt: new Date().toISOString(), drafts }, null, 2));
  console.log(`Saved ${DRAFTS}`);
}

async function prepare() {
  const { keypair, paidFetch } = await setup();
  const walletAddress = keypair.publicKey.toBase58();
  const raw = await fs.readFile(DRAFTS, 'utf8');
  const { drafts } = JSON.parse(raw);
  const prepared = [];
  for (const draft of drafts) {
    console.log(`Saving draft: ${draft.title}`);
    const result = await post(paidFetch, '/artworks', {
      walletAddress,
      imageUrl: draft.imageUrl,
      title: draft.title,
      prompt: draft.prompt
    });
    prepared.push({ ...draft, artworkId: result.id, metadataUri: result.metadataUri ?? null, status: result.status });
  }
  await fs.writeFile(MANIFEST, JSON.stringify({
    collection: 'AGENT MEMORY OBJECTS',
    walletAddress,
    preparedAt: new Date().toISOString(),
    nextAction: 'Review drafts, then submit ONE selected artwork for the first mint.',
    artworks: prepared
  }, null, 2));
  console.log(`Prepared ${prepared.length} drafts. Manifest: ${MANIFEST}`);
}

async function mintFirst() {
  const { keypair, paidFetch } = await setup();
  const walletAddress = keypair.publicKey.toBase58();
  const raw = await fs.readFile(MANIFEST, 'utf8');
  const manifest = JSON.parse(raw);
  const first = manifest.artworks[0];
  if (!first?.artworkId) throw new Error('No prepared artwork found. Run generate then prepare.');
  console.log(`Minting first NFT: ${first.title}`);
  const result = await post(paidFetch, `/artworks/${first.artworkId}/submit`, { walletAddress });
  manifest.firstMint = { ...result, mintedAt: new Date().toISOString() };
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(result, null, 2));
}

const command = process.argv[2] ?? 'generate';
if (command === 'generate') await generate();
else if (command === 'prepare') await prepare();
else if (command === 'mint') await mintFirst();
else throw new Error(`Unknown command: ${command}`);
