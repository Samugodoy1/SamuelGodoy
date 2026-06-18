import Reveal from './Reveal'
import { WHATSAPP_LINK } from '../constants'

export default function CTA() {
  return (
    <section className="bg-navy-dark px-6 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="gold-rule mx-auto mb-10 block" />
          <p className="font-display text-4xl font-medium leading-tight text-cream sm:text-5xl lg:text-6xl">
            Cada caso começa por uma avaliação criteriosa.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-block rounded-sm bg-gold px-10 py-4 text-xs font-medium uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-cream"
          >
            Solicitar Avaliação
          </a>
        </Reveal>
      </div>
    </section>
  )
}
