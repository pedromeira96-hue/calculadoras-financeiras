import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
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
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold tracking-tight text-emerald-700">
              Conta<span className="text-slate-900">Dívida</span>
            </Link>
            <nav aria-label="Navegação principal" className="flex items-center gap-4 text-sm">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="text-slate-600 hover:text-emerald-700">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl space-y-3 px-4 py-8 text-sm text-slate-500">
            <nav aria-label="Links institucionais" className="flex flex-wrap gap-4">
              {FOOTER_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-emerald-700">
                  {l.label}
                </Link>
              ))}
            </nav>
            <p className="text-xs leading-relaxed text-slate-400">
              {DISCLAIMER_GERAL} Autor: {AUTHOR_NAME}. Consulte sempre as regras do seu contrato
              e, em caso de dúvida, o Banco Central do Brasil (bacen.gov.br).
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
