import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraQuitacao from "@/components/CalculadoraQuitacao";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Calculadora Bola de Neve vs Cascata: Qual Quita Antes?",
  description:
    "Simule as duas estratégias com suas dívidas reais. Compare prazo total, juros pagos e a diferença em reais entre os métodos.",
  alternates: { canonical: `${SITE_URL}/calculadora/bola-de-neve-ou-cascata` },
};

const FAQ = [
  {
    q: "O que é o método bola de neve?",
    a: "Você lista as dívidas do menor para o maior valor e ataca a menor primeiro, mantendo os mínimos nas demais. Cada dívida quitada libera verba para a próxima — a “bola de neve” de pagamentos. O ganho é motivacional.",
  },
  {
    q: "E a bola de cascata (avalanche)?",
    a: "Você ataca a dívida com a MAIOR taxa de juros primeiro. É a estratégia ótima em juros: minimiza o total pago. A simulação mostra a diferença exata em reais entre as duas.",
  },
  {
    q: "Qual das duas é melhor?",
    a: "Matematicamente, a cascata economiza mais juros. Na prática, a bola de neve pode vencer porque dívidas pequenas morrendo cedo mantêm a motivação — o melhor plano é o que você não abandona. Simule os dois e decida.",
  },
  {
    q: "O que acontece se o orçamento não cobre nem os juros?",
    a: "A dívida cresce mais rápido do que você paga e nunca quita. A calculadora avisa quando é o caso — antes disso acontecer, renegocie taxas ou busque parcelamento.",
  },
];

export default function PaginaBolaDeNeve() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Bola de Neve ou Cascata" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora Bola de Neve vs Cascata",
      url: `${SITE_URL}/calculadora/bola-de-neve-ou-cascata`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header>
        <p aria-hidden="true" className="text-3xl">❄️</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Bola de Neve ou Cascata: qual quita suas dívidas mais barato?
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Cadastre suas dívidas reais e compare os dois planos de quitação lado a lado: prazo
          total, juros totais e a diferença em reais.
        </p>
      </header>

      <CalculadoraQuitacao />

      <section className="space-y-4 text-slate-700">
        <h2 className="text-xl font-bold text-slate-900">Como a simulação funciona</h2>
        <p>
          Mês a mês, juros compostos incidem sobre cada saldo; o orçamento é constante (mínimos
          de todas as dívidas + extra). Quando uma dívida quita, o valor liberado rola para o
          próximo alvo da estratégia. A cascata ordena pela maior taxa; a bola de neve, pelo
          menor valor.
        </p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ⚠️ Conteúdo educacional. Os mínimos são informados por você — confira os valores na
          fatura/contrato. Não é orientação financeira.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Perguntas frequentes</h2>
        {FAQ.map((f) => (
          <details key={f.q} className="rounded-lg border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-slate-800">{f.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </section>

      <nav aria-label="Relacionados quitacao" className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-slate-900">Continue a conta:</h2>
        <ul className="mt-2 space-y-1">
          <li>
            <Link href="/calculadora/rotativo-do-cartao" className="text-emerald-700 underline">
              Quanto custa pagar o mínimo do cartão
            </Link>
          </li>
          <li>
            <Link href="/calculadora/custo-de-atrasar" className="text-emerald-700 underline">
              Quanto custa atrasar boleto e parcela
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
