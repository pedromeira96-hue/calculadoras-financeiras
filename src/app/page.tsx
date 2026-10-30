import type { Metadata } from "next";
import Link from "next/link";
import { CURRENT_FEATURE } from "@/config/site";

export const metadata: Metadata = {
  title: undefined,
};

const CALCULADORAS = [
  {
    href: "/calculadora/rotativo-do-cartao",
    titulo: "Calculadora do Rotativo do Cartão",
    pergunta: "Quanto vira minha dívida pagando o mínimo?",
    emoji: "🔄",
    descricao: "Veja o custo real de pagar só o mínimo da fatura. Juros compostos mês a mês.",
    pronta: true,
    destaque: true,
  },
  {
    href: "/calculadora/custo-de-atrasar",
    titulo: "Quanto Custa Atrasar?",
    pergunta: "Boleto, parcela ou cheque especial: quanto custa por dia?",
    emoji: "⏰",
    descricao: "Calcule multa de 2% e juros de mora. Compare boleto, parcela e cheque especial.",
    pronta: true,
  },
  {
    href: "/calculadora/parcelado-ou-a-vista",
    titulo: "Parcelado Sem Juros ou À Vista?",
    pergunta: "Qual é a taxa escondida do parcelamento?",
    emoji: "💳",
    descricao: "Descubra a taxa implícita do parcelado 'sem juros' e compare com o desconto à vista.",
    pronta: true,
  },
  {
    href: "/calculadora/bola-de-neve-ou-cascata",
    titulo: "Bola de Neve ou Cascata?",
    pergunta: "Qual estratégia quita suas dívidas mais barato?",
    emoji: "❄️",
    descricao: "Compare as duas estratégias com suas dívidas reais. Veja a diferença em reais.",
    pronta: true,
  },
  {
    href: "/calculadora/reserva-de-emergencia",
    titulo: "Reserva de Emergência",
    pergunta: "Quanto guardar e onde rende mais (CDI x poupança)?",
    emoji: "🛡️",
    descricao: "Calcule o valor ideal da sua reserva e compare CDB no CDI vs poupança com IR.",
    pronta: true,
  },
];

const DESTAQUE = CALCULADORAS.find((c) => c.href === CURRENT_FEATURE) ?? CALCULADORAS[0];

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-600)] via-[var(--brand-500)] to-[var(--brand-700)] px-6 py-10 md:px-12 md:py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand-400)_0%,_transparent_70%)] opacity-20" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-sm font-medium uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Novo: Série "Dívidas Reais" no TikTok
          </span>

          <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {DESTAQUE.pergunta}
          </h1>

          <p className="mt-4 md:mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {DESTAQUE.descricao}
          </p>

          <Link
            href={DESTAQUE.href}
            className="mt-8 md:mt-10 inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-[var(--brand-700)] bg-white rounded-xl shadow-xl hover:shadow-[var(--shadow-brand-lg)] hover:-translate-y-1 transition-all duration-200"
          >
            Abrir a calculadora {DESTAQUE.emoji}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>

          <p className="mt-6 text-sm text-white/70">
            Viu no TikTok? <span className="font-medium">Calcule a sua agora →</span>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-900)] to-transparent opacity-10 pointer-events-none" aria-hidden="true" />
      </section>

      {/* Trust Indicators */}
      <section aria-labelledby="confianca-titulo" className="py-4">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: "🔓", titulo: "Metodologia Aberta", descricao: "Todas as fórmulas, premissas e fontes oficiais são públicas e verificáveis." },
            { icon: "🎯", titulo: "Você no Controle", descricao: "Todas as taxas são editáveis com padrões conservadores documentados." },
            { icon: "🛡️", titulo: "Sem Conflito", descricao: "Não vendemos produtos financeiros. Monetização transparente via anúncios e afiliados." },
          ].map((item, i) => (
            <div key={i} className="card p-4 md:p-6 text-center animate-slide-up stagger-1" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{item.titulo}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{item.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculadoras Grid */}
      <section id="calculadoras" aria-labelledby="calculadoras-titulo" className="py-4 md:py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 id="calculadoras-titulo" className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
            Calculadoras Financeiras
          </h2>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-[var(--color-text-brand)] hover:underline"
          >
            Ver artigos do blog
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="list">
          {CALCULADORAS.map((c, i) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className={`card card-interactive h-full flex flex-col p-5 md:p-6 animate-slide-up ${c.destaque ? 'ring-2 ring-[var(--color-border-focus)]' : ''}`}
                style={{ animationDelay: `${100 + i * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-3xl md:text-4xl flex-shrink-0" aria-hidden="true">{c.emoji}</span>
                  {c.destaque && (
                    <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold text-[var(--brand-700)] bg-[var(--brand-100)] rounded-full self-start">
                      DESTAQUE
                    </span>
                  )}
                </div>

                <h3 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)] mb-2">{c.titulo}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm md:text-base mb-4 flex-1">{c.pergunta}</p>

                <div className="pt-4 border-t border-[var(--color-border-light)]">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-text-brand)]">
                    {c.pronta ? (
                      <>
                        Calcular agora
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </>
                    ) : (
                      'Em construção'
                    )}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border-light)]">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
            Quer ver como funciona?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
            Siga o ContaDívida no TikTok para dicas diárias, casos reais e demonstrações das calculadoras em ação.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://tiktok.com/@contadivida"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm5.521 17.34c-.635.226-1.295.354-2.043.354-2.34 0-4.045-1.955-3.962-4.174.027-.716.317-1.283.798-1.616-.264-.065-1.58-.867-2.174-1.948.212-3.07 2.826-5.057 5.827-4.88.148 0 .297.014.445.021.526-1.064 1.675-1.813 3.341-1.813 1.835 0 3.39 1.224 3.39 2.952 0 1.684-.977 2.498-2.08 3.236.602.36 1.123.808 1.497 1.339.614-.186 1.44-.503 2.08-1.052-.454 1.32-1.708 2.387-3.37 2.387-1.133 0-2.154-.414-2.764-1.138zm1.24-6.316c0 2.306-1.887 4.183-4.212 4.183-2.326 0-4.21-1.888-4.21-4.183 0-2.327 1.884-4.212 4.21-4.212 2.325 0 4.21 1.885 4.21 4.212z"/>
              </svg>
              Seguir no TikTok
            </a>
            <Link
              href="/calculadora/rotativo-do-cartao"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-600)] text-white font-semibold rounded-xl hover:bg-[var(--brand-700)] transition-colors"
            >
              Testar Calculadora
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}