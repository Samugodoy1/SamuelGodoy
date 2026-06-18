import Reveal from './Reveal'
import { WHATSAPP_LINK } from '../constants'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20 lg:px-8"
    >
      {/* Soft radial glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(197,165,114,0.18) 0%, rgba(27,42,58,0) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">Institucional</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-6xl font-medium leading-[0.95] text-cream sm:text-7xl lg:text-8xl">
              Dr. Samuel Godoy
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 font-display text-2xl italic text-gold sm:text-3xl">
              Cirurgião-Dentista em Taubaté
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted sm:text-lg">
              Odontologia de alta precisão. Diagnóstico, técnica e critério em
              cada etapa do tratamento.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-gold px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-cream"
              >
                Solicitar Avaliação
              </a>
              <a
                href="#filosofia"
                className="rounded-sm border border-gold px-8 py-4 text-center text-xs font-light uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy"
              >
                Conhecer Abordagem
              </a>
            </div>
          </Reveal>
        </div>

        {/* Decorative phrase */}
        <Reveal delay={0.6}>
          <p className="mt-20 max-w-sm font-display text-lg italic leading-snug text-gold/80 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:text-right">
            <span className="gold-rule mb-4 block lg:ml-auto" />
            Intervir quando necessário, preservar sempre que possível.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
