import Reveal from './Reveal'

export default function Filosofia() {
  return (
    <section id="filosofia" className="bg-navy-dark px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="eyebrow">Filosofia Clínica</span>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="gold-rule mx-auto mt-8 mb-10 block" />
          <p className="font-display text-4xl font-medium leading-tight text-cream sm:text-5xl lg:text-6xl">
            Antes do procedimento, a leitura do caso.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-relaxed text-muted sm:text-lg">
            A indicação correta depende de diagnóstico, planejamento e critério.
            Cada etapa deve ter um motivo: entender, preservar quando possível,
            intervir quando necessário e conduzindo o tratamento com controle
            técnico.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
