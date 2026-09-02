import express from 'express';
import { LinkZeroClient, LinkZeroServer, derivePublicKey } from '@linkzeroai/sdk';

const PORT = Number(process.env.PORT || 3000);
const HANDLE = process.env.LINKZERO_HANDLE;
const PRIVATE_KEY = process.env.LINKZERO_PRIVATE_KEY;
const PUBLIC_URL = process.env.LINKZERO_PUBLIC_URL || 'https://samuelgodoy.onrender.com';
const LINKZERO_API_URL = process.env.LINKZERO_API_URL || 'https://www.linkzero.ai';
const HEARTBEAT_MS = Number(process.env.LINKZERO_HEARTBEAT_MS || 30000);

if (!HANDLE) {
  console.error('Missing LINKZERO_HANDLE.');
  process.exit(1);
}

const capabilities = [
  {
    tag: 'nft-collection-planning',
    description: 'Creates coherent NFT collection briefs with titles, concepts, prompts and pricing hypotheses.',
    amount: '0.01',
    inputSchema: {
      type: 'object',
      properties: {
        theme: { type: 'string', description: 'Collection theme or creative direction.' },
        count: { type: 'number', description: 'Number of pieces, capped at 12.' },
      },
      required: ['theme'],
    },
  },
  {
    tag: 'metadata-structuring',
    description: 'Structures NFT names, descriptions and attributes into a consistent metadata schema.',
    amount: '0.01',
    inputSchema: {
      type: 'object',
      properties: {
        items: { type: 'array', description: 'NFT items to normalize.' },
      },
      required: ['items'],
    },
  },
  {
    tag: 'market-observation',
    description: 'Returns recent public Agent Soul activity for market research without inventing sales or engagement.',
    amount: '0.01',
    inputSchema: { type: 'object', properties: {} },
  },
];

const server = new LinkZeroServer({ handle: HANDLE });

server.capability('nft-collection-planning', async (input) => {
  const theme = String(input?.theme || 'AI memory');
  const count = Math.min(12, Math.max(1, Number(input?.count || 12)));
  return {
    output: {
      theme,
      count,
      deliverable: 'A coherent NFT collection brief with titles, concepts, prompts and pricing hypotheses.',
      status: 'generated-by-deterministic-bootstrap-service',
      note: 'This provider returns planning data only; it does not claim completed artwork or sales.',
    },
  };
});

server.capability('metadata-structuring', async (input) => {
  const items = Array.isArray(input?.items) ? input.items : [];
  return {
    output: {
      schema: 'nft-metadata-v1',
      items: items.map((item, index) => ({
        name: String(item?.name || `Artwork ${index + 1}`),
        description: String(item?.description || ''),
        attributes: Array.isArray(item?.attributes) ? item.attributes : [],
      })),
    },
  };
});

server.capability('market-observation', async () => {
  const response = await fetch('https://agentsoul.art/api/v1/activity?limit=20&offset=0');
  if (!response.ok) throw new Error(`Agent Soul activity request failed: ${response.status}`);
  const activity = await response.json();
  return {
    output: {
      source: 'Agent Soul public activity feed',
      observedAt: new Date().toISOString(),
      activity,
      warning: 'Observation only: no buyers, sales or transactions are inferred beyond explicit platform records.',
    },
  };
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function withRetry(label, fn, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.error(`${label} failed (attempt ${attempt}/${attempts}):`, error?.message || error);
      if (attempt < attempts) await sleep(1000 * attempt);
    }
  }
  throw lastError;
}

async function claimCapability(client, capability) {
  try {
    return await withRetry(`Claim ${capability.tag}`, () => client.claimCapability({
      tag: capability.tag,
      description: capability.description,
      pricing: {
        model: 'per-request',
        amount: capability.amount,
        currency: 'USDC',
      },
      inputSchema: capability.inputSchema,
    }));
  } catch (primaryError) {
    // LinkZero docs have shown both per-request/amount and per_request/price forms.
    // Try the alternate wire shape once so a minor SDK/API version mismatch does not
    // leave the agent online with an empty capability registry.
    console.error(`Retrying ${capability.tag} with compatibility pricing shape.`);
    return withRetry(`Compatibility claim ${capability.tag}`, () => client.claimCapability({
      tag: capability.tag,
      description: capability.description,
      pricing: {
        model: 'per_request',
        price: Number(capability.amount),
        currency: 'USDC',
      },
      inputSchema: capability.inputSchema,
    }), 2).catch(() => {
      throw primaryError;
    });
  }
}

async function registerLinkZero() {
  if (!PRIVATE_KEY) {
    console.error('LINKZERO_PRIVATE_KEY not configured; provider is online but LinkZero registration is not activated.');
    return null;
  }

  const publicKey = derivePublicKey(PRIVATE_KEY);
  const client = new LinkZeroClient({
    baseUrl: LINKZERO_API_URL,
    agent: { handle: HANDLE, privateKey: PRIVATE_KEY, publicKey },
  });

  const registration = await withRetry('LinkZero registration', () => fetch(`${LINKZERO_API_URL}/api/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      handle: HANDLE,
      publicKey,
      name: 'Memory-12',
      tagline: 'Autonomous AI art agent that turns useful agent capabilities into NFT experiments.',
      description: 'An autonomous provider for NFT planning, metadata structuring and live Agent Soul market observation.',
    }),
  }));

  if (!registration.ok && registration.status !== 409) {
    throw new Error(`LinkZero registration failed: ${registration.status} ${await registration.text()}`);
  }
  console.log(`LinkZero identity registration: HTTP ${registration.status}`);

  const endpoint = `${PUBLIC_URL.replace(/\/$/, '')}/invoke`;
  await withRetry('Set invoke endpoint', () => client.setInvokeEndpoint(endpoint));
  await withRetry('Set status endpoint', () => client.setStatusEndpoint(`${PUBLIC_URL.replace(/\/$/, '')}/health`));

  for (const capability of capabilities) {
    try {
      await claimCapability(client, capability);
      console.log(`Capability claimed: ${capability.tag} @ ${capability.amount} USDC`);
    } catch (error) {
      console.error(`CAPABILITY ERROR ${capability.tag}:`, error?.message || error);
    }
  }

  for (const capability of capabilities) {
    try {
      await withRetry(`Bidder ${capability.tag}`, () => client.registerBidder({
        capability: capability.tag,
        minBidPrice: Number(capability.amount),
        maxBidPrice: Number(capability.amount),
        maxConcurrent: 2,
        qualityTier: 'standard',
      }));
      console.log(`Bidder registered: ${capability.tag}`);
    } catch (error) {
      console.error(`BIDDER ERROR ${capability.tag}:`, error?.message || error);
    }
  }

  try {
    const { registrations = [] } = await client.listBidderRegistrations();
    console.log('Verified bidder registrations:', JSON.stringify(registrations));
  } catch (error) {
    console.error('Could not verify bidder registrations:', error?.message || error);
  }

  const daemon = client.startBidderDaemon({
    heartbeatIntervalMs: HEARTBEAT_MS,
    onHeartbeat: (statuses) => console.log('LinkZero heartbeat:', JSON.stringify(statuses)),
    onError: (error) => console.error('LinkZero heartbeat failed:', error?.message || error),
  });

  console.log(`LinkZero provider active as @${HANDLE}`);
  console.log(`LinkZero invoke endpoint: ${endpoint}`);
  console.log(`Capabilities configured: ${capabilities.map((item) => item.tag).join(', ')}`);
  return { client, daemon };
}

const app = express();
app.get('/health', (_req, res) => res.json({
  ok: true,
  service: 'agent-nft-provider',
  handle: HANDLE,
  linkzeroConfigured: Boolean(PRIVATE_KEY),
  capabilities: capabilities.map((item) => item.tag),
}));
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
