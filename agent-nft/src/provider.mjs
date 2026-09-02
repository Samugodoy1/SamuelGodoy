import express from 'express';
import { LinkZeroServer } from '@linkzeroai/sdk';

const PORT = Number(process.env.PORT || 3000);
const HANDLE = process.env.LINKZERO_HANDLE;

if (!HANDLE) {
  console.error('Missing LINKZERO_HANDLE. No private key is required by this process itself; keep LinkZero signing credentials outside the repository.');
  process.exit(1);
}

const server = new LinkZeroServer({ handle: HANDLE });

server.capability('nft-collection-planning', async (input) => {
  const theme = String(input?.theme || 'AI memory');
  const count = Math.min(12, Math.max(1, Number(input?.count || 12)));
  return {
    output: {
      theme,
      count,
      deliverable: 'A coherent collection brief with titles, concepts, prompts and pricing hypotheses.',
      status: 'generated-by-deterministic-bootstrap-service',
      note: 'This provider does not claim completed artwork or sales; it returns planning data only.'
    }
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
        attributes: Array.isArray(item?.attributes) ? item.attributes : []
      }))
    }
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
      warning: 'Observation only: no buyers, sales or transactions are inferred beyond explicit platform records.'
    }
  };
});

const app = express();
app.get('/health', (_req, res) => res.json({ ok: true, service: 'agent-nft-provider' }));
app.use(express.json({ limit: '1mb' }));
app.post('/invoke', server.expressHandler());
app.listen(PORT, () => console.log(`Agent provider listening on :${PORT}`));
