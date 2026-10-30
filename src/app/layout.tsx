import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import {
  AUTHOR_NAME,
  DISCLAIMER_GERAL,
  FOOTER_LINKS,
  NAV_LINKS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Calculadoras de Dívidas e Finanças Pessoais`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] antialiased">
        <a href="#main-content" className="skip-link">Pular para o conteúdo principal</a>

        <GoogleAnalytics />
        <CookieBanner />

        <header className="sticky top-0 z-[var(--z-sticky)] w-full border-b border-[var(--color-border-light)] bg-[var(--color-bg-primary)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg-primary)]/80">
          <div className="container flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-[var(--color-text-brand)]" aria-label="ContaDívida - Início">
              <svg className="w-8 h-8 text-[var(--color-text-brand)]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="currentColor"/>
                <path d="M8 12h16M8 16h12M8 20h8" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
              <span>Conta<span className="text-[var(--color-text-primary)]">Dívida</span></span>
            </Link>
            <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-lg transition-colors duration-150"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <button className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-lg" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </header>

        <main id="main-content" className="container px-4 py-8 md:py-12" role="main">
          {children}
        </main>

        <footer className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]">
          <div className="container px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-[var(--color-text-brand)]" aria-label="ContaDívida - Início">
                  <svg className="w-8 h-8 text-[var(--color-text-brand)]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <rect width="32" height="32" rx="8" fill="currentColor"/>
                    <path d="M8 12h16M8 16h12M8 20h8" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                  </svg>
                  <span>Conta<span className="text-[var(--color-text-primary)]">Dívida</span></span>
                </Link>
                <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-xs">
                  Calculadoras financeiras gratuitas e transparentes para você tomar decisões conscientes sobre seu dinheiro.
                </p>
              </div>

              <nav aria-label="Links das calculadoras">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Calculadoras</h3>
                <ul className="space-y-3">
                  <li><Link href="/calculadora/rotativo-do-cartao" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-brand)] transition-colors">🔄 Rotativo do Cartão</Link></li>
                  <li><Link href="/calculadora/custo-de-atrasar" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-brand)] transition-colors">⏰ Quanto Custa Atrasar</Link></li>
                  <li><Link href="/calculadora/parcelado-ou-a-vista" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-brand)] transition-colors">💳 Parcelado vs À Vista</Link></li>
                  <li><Link href="/calculadora/bola-de-neve-ou-cascata" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-brand)] transition-colors">❄️ Bola de Neve vs Cascata</Link></li>
                  <li><Link href="/calculadora/reserva-de-emergencia" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-brand)] transition-colors">🛡️ Reserva de Emergência</Link></li>
                </ul>
              </nav>

              <nav aria-label="Links institucionais">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Institucional</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-brand)] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-8 md:mt-0 pt-8 md:pt-0 border-t border-[var(--color-border-light)] grid grid-cols-1 md:grid-cols-4 gap-4">
              <p className="text-xs text-[var(--color-text-tertiary)] md:col-span-2">
                {DISCLAIMER_GERAL} Autor: {AUTHOR_NAME}. Consulte sempre as regras do seu contrato
                e, em caso de dúvida, o Banco Central do Brasil (bacen.gov.br).
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <Link href="/politica-de-privacidade" className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-brand)] transition-colors">Política de Privacidade</Link>
                <Link href="/termos" className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-brand)] transition-colors">Termos de Uso</Link>
                <Link href="/metodologia" className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-brand)] transition-colors">Metodologia</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}