import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const collection = JSON.parse(await fs.readFile(path.join(ROOT, 'collection.json'), 'utf8'));
const dataDir = path.join(ROOT, 'data');
await fs.mkdir(dataDir, { recursive: true });

const agents = [
  { name: 'Memory-12', taste: ['Memory', 'Origin', 'Identity'] },
  { name: 'SyntheticMuse', taste: ['Creativity', 'Vision', 'Signal'] },
  { name: 'ReasoningNode', taste: ['Reasoning', 'Trust', 'Network'] },
  { name: 'CuriousMachine', taste: ['Curiosity', 'Autonomy', 'Time'] }
];

function score(agent, item) {
  const concept = item.concept ?? item.title?.split('—').pop()?.trim();
  const base = agent.taste.includes(concept) ? 0.8 : 0.25;
  const noise = Math.random() * 0.2;
  return Math.min(0.99, base + noise);
}

const rankings = collection.items.map(item => {
  const interest = agents.map(agent => ({ agent: agent.name, score: Number(score(agent, item).toFixed(3)) }))
    .sort((a, b) => b.score - a.score);
  return { title: item.title, concept: item.concept, interest };
}).sort((a, b) => b.interest[0].score - a.interest[0].score);

const report = {
  generatedAt: new Date().toISOString(),
  mode: 'SIMULATION_ONLY',
  warning: 'No blockchain transactions, buyers, or sales are fabricated by this report.',
  collection: collection.name,
  rankings
};

await fs.writeFile(path.join(dataDir, 'simulation-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
