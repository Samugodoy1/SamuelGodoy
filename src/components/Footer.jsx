import { WHATSAPP_LINK, INSTAGRAM_LINK, INSTAGRAM_HANDLE } from '../constants'

export default function Footer() {
  return (
    <footer className="border-t border-gold-border px-6 py-16 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <p className="font-display text-xl font-medium text-cream">
            Dr. Samuel Godoy
          </p>
          <p className="eyebrow mt-1">Odontologia de Precisão</p>
          <p className="mt-4 text-sm font-light text-muted">Taubaté&nbsp;-&nbsp;SP</p>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold"
          >
            WhatsApp
          </a>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold"
          >
            Instagram {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-gold-border/50 pt-8">
        <p className="text-center text-xs font-light tracking-wide text-muted/70">
          © 2026 Dr. Samuel Godoy. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
