import { useEffect, useState } from 'react'
import { NAV_LINKS, WHATSAPP_LINK } from '../constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-gold-border bg-navy/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Brand */}
        <a href="#top" onClick={closeMenu} className="group flex flex-col leading-none">
          <span className="font-display text-xl font-medium tracking-wide text-cream sm:text-2xl">
            Dr. Samuel Godoy
          </span>
          <span className="eyebrow mt-1 text-[0.6rem]">Odontologia de Precisão</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-light uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-gold px-5 py-2.5 text-xs font-light uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy"
          >
            Solicitar Avaliação
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-cream transition-all duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-6 bg-cream transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-px w-6 bg-cream transition-all duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-gold-border bg-navy/95 backdrop-blur-md transition-[max-height] duration-500 ease-in-out lg:hidden ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b border-gold-border/60 py-3 text-sm uppercase tracking-[0.18em] text-muted transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-4 rounded-sm bg-gold px-5 py-3 text-center text-xs font-light uppercase tracking-[0.18em] text-navy"
          >
            Solicitar Avaliação
          </a>
        </nav>
      </div>
    </header>
  )
}
