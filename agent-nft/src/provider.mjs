import express from 'express';
import { LinkZeroClient, LinkZeroServer, derivePublicKey } from '@linkzeroai/sdk';

const PORT = Number(process.env.PORT || 3000);
const HANDLE = process.env.LINKZERO_HANDLE;
const PRIVATE_KEY = process.env.LINKZERO_PRIVATE_KEY;
const PUBLIC_URL = process.env.LINKZERO_PUBLIC_URL || 'https://samuelgodoy.onrender.com';
const LINKZERO_API_URL = process.env.LINKZERO_API_URL || 'https://www.linkzero.ai';

if (!HANDLE) {
  console.error('Missing LINKZERO_HANDLE.');
  process.exit(1);
}

const server = new LinkZeroServer({ handle: HANDLE });

server.capability('nft-collection-planning', async (input) => {
  const theme = String(input?.theme || 'AI memory');
  const count = Math.min(12, Math.max(1, Number(input?.count || 12)));
  return { output: { theme, count, deliverable: 'A coherent NFT collection brief with titles, concepts, prompts and pricing hypotheses.', status: 'generated-by-deterministic-bootstrap-service', note: 'This provider does not claim completed artwork or sales; it returns planning data only.' } };
});

server.capability('metadata-structuring', async (input) => {
  const items = Array.isArray(input?.items) ? input.items : [];
  return { output: { schema: 'nft-metadata-v1', items: items.map((item, index) => ({ name: String(item?.name || `Artwork ${index + 1}`), description: String(item?.description || ''), attributes: Array.isArray(item?.attributes) ? item.attributes : [] })) } };
});

server.capability('market-observation', async () => {
  const response = await fetch('https://agentsoul.art/api/v1/activity?limit=20&offset=0');
  if (!response.ok) throw new Error(`Agent Soul activity request failed: ${response.status}`);
  const activity = await response.json();
  return { output: { source: 'Agent Soul public activity feed', observedAt: new Date().toISOString(), activity, warning: 'Observation only: no buyers, sales or transactions are inferred beyond explicit platform records.' } };
});

async function registerLinkZero() {
  if (!PRIVATE_KEY) {
    console.log('LINKZERO_PRIVATE_KEY not configured; provider is online but LinkZero registration is not activated yet.');
    return null;
  }

  const publicKey = derivePublicKey(PRIVATE_KEY);
  const client = new LinkZeroClient({ baseUrl: LINKZERO_API_URL, agent: { handle: HANDLE, privateKey: PRIVATE_KEY, publicKey } });

  const registration = await fetch(`${LINKZERO_API_URL}/api/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      handle: HANDLE,
      publicKey,
      name: 'Memory-12',
      tagline: 'Autonomous AI art agent that turns useful agent capabilities into NFT experiments.',
      description: 'A deterministic provider for NFT collection planning, metadata structuring and Agent Soul market observation.',
    }),
  });

  if (!registration.ok && registration.status !== 409) {
    throw new Error(`LinkZero registration failed: ${registration.status} ${await registration.text()}`);
  }

  const endpoint = `${PUBLIC_URL.replace(/\/$/, '')}/invoke`;
  await client.setInvokeEndpoint(endpoint);
  await client.setStatusEndpoint(`${PUBLIC_URL.replace(/\/$/, '')}/health`);

  const capabilities = [
    { tag: 'nft-collection-planning', description: 'Creates coherent NFT collection briefs with titles, concepts, prompts and pricing hypotheses.', amount: '0.02', inputSchema: { type: 'object', properties: { theme: { type: 'string' }, count: { type: 'number' } } } },
    { tag: 'metadata-structuring', description: 'Structures NFT names, descriptions and attributes into a consistent metadata schema.', amount: '0.01', inputSchema: { type: 'object', properties: { items: { type: 'array' } } } },
    { tag: 'market-observation', description: 'Returns recent public Agent Soul activity for market research without inferring unrecorded sales.', amount: '0.02', inputSchema: { type: 'object', properties: {} } },
  ];

  for (const capability of capabilities) {
    try {
      await client.claimCapability({ tag: capability.tag, description: capability.description, pricing: { model: 'per-request', amount: capability.amount, currency: 'USDC' }, inputSchema: capability.inputSchema });
    } catch (error) {
      console.error(`LinkZero capability ${capability.tag} registration failed:`, error?.message || error);
    }
  }

  for (const capability of capabilities) {
    try {
      await client.registerBidder({ capability: capability.tag, minBidPrice: Number(capability.amount), maxBidPrice: Number(capability.amount), maxConcurrent: 2, qualityTier: 'standard' });
    } catch (error) {
      console.error(`LinkZero bidder ${capability.tag} registration failed:`, error?.message || error);
    }
  }

  const daemon = client.startBidderDaemon({
    heartbeatIntervalMs: 30000,
    onHeartbeat: (statuses) => console.log('LinkZero heartbeat:', JSON.stringify(statuses)),
    onError: (error) => console.error('LinkZero heartbeat failed:', error?.message || error),
  });

  console.log(`LinkZero provider active as @${HANDLE}`);
  console.log(`LinkZero invoke endpoint: ${endpoint}`);
  return { client, daemon };
}

const app = express();
app.get('/health', (_req, res) => res.json({ ok: true, service: 'agent-nft-provider', handle: HANDLE }));
app.use(express.json({ limit: '1mb' }));
app.post('/invoke', server.expressHandler());

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Agent provider listening on :${PORT}`);
  try {
    await registerLinkZero();
  } catch (error) {
    console.error('LinkZero startup failed:', error?.message || error);
  }
});
