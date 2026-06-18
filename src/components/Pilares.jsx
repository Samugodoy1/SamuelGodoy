import Reveal from './Reveal'

const PILLARS = [
  {
    numeral: 'I',
    title: 'Filosofia Clínica',
    quote: 'Antes do procedimento, a leitura do caso.',
    text: 'A indicação correta depende de diagnóstico, planejamento e critério. Cada etapa deve ter um motivo: entender, preservar quando possível, intervir quando necessário, conduzindo o tratamento com controle técnico.',
  },
  {
    numeral: 'II',
    title: 'Critério Técnico',
    quote: 'O detalhe sustenta o resultado.',
    text: 'A atenção aos detalhes está presente desde o diagnóstico até a finalização do tratamento. Controle do campo operatório, precisão na execução, respeito à anatomia natural e acabamento criterioso fazem parte de uma abordagem que busca resultados funcionais e previsíveis.',
  },
  {
    numeral: 'III',
    title: 'Responsabilidade',
    quote: 'Planejamento, indicação e responsabilidade clínica.',
    text: 'Mais do que realizar procedimentos isolados, a odontologia do Dr. Samuel Godoy é conduzida por planejamento, indicação precisa e responsabilidade — com foco em preservar, reconstruir e devolver equilíbrio com segurança em cada decisão clínica.',
  },
]

export default function Pilares() {
  return (
    <section id="criterio" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Reveal>
            <span className="eyebrow">Critério</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-medium text-cream sm:text-5xl">
              Três pilares de cada tratamento
            </h2>
            <span className="gold-rule mx-auto mt-6 block" />
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-gold-border bg-gold-border md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.numeral} delay={i * 0.12} className="h-full">
              <article className="flex h-full flex-col bg-navy p-8 lg:p-10">
                <span className="font-display text-5xl font-light text-gold/70">
                  {pillar.numeral}
                </span>
                <span className="gold-rule mt-6 mb-6 block" />
                <h3 className="font-display text-2xl font-medium text-cream">
                  {pillar.title}
                </h3>
                <p className="mt-4 font-display text-lg italic leading-snug text-gold/90">
                  “{pillar.quote}”
                </p>
                <p className="mt-5 text-sm font-light leading-relaxed text-muted">
                  {pillar.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
