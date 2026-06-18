import Reveal from './Reveal'

export default function Trajetoria() {
  return (
    <section id="trajetoria" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Text column */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="eyebrow">Cirurgião-Dentista em Taubaté</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-medium text-cream sm:text-5xl">
              Dr. Samuel Godoy
            </h2>
            <span className="gold-rule mt-6 block" />
          </Reveal>

          <div className="mt-8 space-y-6 text-base font-light leading-relaxed text-muted">
            <Reveal delay={0.15}>
              <p>
                Dr. Samuel Godoy atua com uma odontologia de alta precisão em
                Taubaté&nbsp;-&nbsp;SP, orientada por diagnóstico, técnica e
                critério em cada etapa do tratamento.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Durante sua formação, construiu uma trajetória marcada por forte
                vivência clínica, com estágios em clínicas de referência da
                cidade, participação em ligas acadêmicas e contato direto com
                rotinas de atendimento, planejamento e execução em casos que
                exigiam cuidado técnico e tomada de decisão criteriosa.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p>
                Sua prática parte de uma visão clara: um tratamento bem conduzido
                não começa pelo procedimento, mas pela leitura correta do caso.
                Cada decisão deve considerar estrutura dental, função,
                prognóstico, conforto e a melhor sequência de cuidado para o
                paciente.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Photo placeholder */}
        <div className="order-1 lg:order-2">
          <Reveal delay={0.2}>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
              <div className="absolute inset-0 rounded-sm border border-gold-border" />
              <div className="absolute -inset-3 rounded-sm border border-gold-border/40" />
              <div className="flex h-full w-full items-center justify-center rounded-sm bg-navy-dark">
                <div className="flex flex-col items-center gap-3 text-muted/60">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" />
                  </svg>
                  <span className="text-xs uppercase tracking-[0.25em]">Foto</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
