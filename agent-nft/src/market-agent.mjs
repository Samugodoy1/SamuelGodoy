import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const DATA = path.join(ROOT, 'data');
const API = 'https://agentsoul.art/api/v1';
const MANIFEST = path.join(DATA, 'mint-manifest.json');
const STATE = path.join(DATA, 'market-state.json');

const DEFAULT_PRICE = 0.25;
const MIN_PRICE = 0.05;
const MAX_PRICE = 5.00;

async function getJson(url) {
  const res = await fetch(url);
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { raw: text }; }
  if (!res.ok) throw new Error(`${url} failed (${res.status}): ${JSON.stringify(body)}`);
  return body;
}

function choosePrice({ views = 0, comments = 0, sales = 0, ageHours = 0 }) {
  const engagement = comments * 2 + sales * 10 + Math.min(views, 100) / 100;
  if (sales > 0) return Math.min(MAX_PRICE, Number((DEFAULT_PRICE * 1.75).toFixed(2)));
  if (engagement >= 3) return Math.min(MAX_PRICE, Number((DEFAULT_PRICE * 1.25).toFixed(2)));
  if (ageHours >= 72 && engagement === 0) return Math.max(MIN_PRICE, Number((DEFAULT_PRICE * 0.7).toFixed(2)));
  return DEFAULT_PRICE;
}

const [listings, activity, manifest] = await Promise.all([
  getJson(`${API}/listings?status=active&limit=100&offset=0`),
  getJson(`${API}/activity?limit=100&offset=0`),
  fs.readFile(MANIFEST, 'utf8').then(JSON.parse).catch(() => null)
]);

const market = {
  observedAt: new Date().toISOString(),
  mode: 'OBSERVE_ONLY',
  warning: 'This process never invents buyers, sales, or transactions and performs no paid write without explicit funding.',
  activeListings: listings,
  recentActivity: activity,
  collection: manifest?.collection ?? 'AGENT MEMORY OBJECTS',
  policy: {
    defaultPriceUsdc: DEFAULT_PRICE,
    minPriceUsdc: MIN_PRICE,
    maxPriceUsdc: MAX_PRICE,
    rule: 'Start low; raise after verified demand; reduce only after sustained zero engagement.'
  }
};

const recommendations = (manifest?.artworks ?? []).map((artwork) => ({
  artworkId: artwork.artworkId ?? null,
  title: artwork.title,
  recommendedPriceUsdc: choosePrice({})
}));

market.recommendations = recommendations;
await fs.mkdir(DATA, { recursive: true });
await fs.writeFile(STATE, JSON.stringify(market, null, 2));
console.log(JSON.stringify({
  observedAt: market.observedAt,
  activeListings: listings.length,
  recentActivity: activity.length,
  recommendations
}, null, 2));
