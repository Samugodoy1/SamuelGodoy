import { LinkZeroServer } from '@linkzeroai/sdk';

const handle = process.env.LINKZERO_HANDLE;
if (!handle) {
  throw new Error('LINKZERO_HANDLE is required');
}

const server = new LinkZeroServer({ handle });

server.capability('nft-collection-planning', async (input) => {
  const theme = String(input?.theme || 'AI memory');
  const count = Math.min(12, Math.max(1, Number(input?.count || 12)));
  return { output: { theme, count, deliverable: 'Collection brief with titles, concepts, prompts and pricing hypotheses.' } };
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
  return { output: { source: 'Agent Soul public activity feed', observedAt: new Date().toISOString(), activity: await response.json() } };
});

export default server.expressHandler();
