import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraRotativo from "@/components/CalculadoraRotativo";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Calculadora do Rotativo: Quanto Custa Pagar o Mínimo",
  description:
    "Simule pagar o mínimo do cartão e veja em quantos meses sua dívida dobra. Juros compostos do rotativo mês a mês, com metodologia aberta.",
  alternates: { canonical: `${SITE_URL}/calculadora/rotativo-do-cartao` },
};

const FAQ = [
  {
    q: "O que é o rotativo do cartão de crédito?",
    a: "Rotativo é a linha de crédito acionada quando você não paga a fatura inteira. O valor não pago (e os novos gastos) passam a ser cobrados com juros compostos mês a mês, à taxa do seu cartão.",
  },
  {
    q: "Os juros do rotativo são compostos?",
    a: "Sim. Os juros incidem sobre o saldo devedor a cada mês — inclusive sobre os juros do mês anterior. É por isso que pagar o mínimo pode fazer a dívida dobrar em poucos meses.",
  },
  {
    q: "Qual é o pagamento mínimo da fatura?",
    a: "A regra do BACEN (Resolução CMN 3.910/2018) exige que a parcela mínima seja de pelo menos 15% do saldo. Pagar só o mínimo mantém você no rotativo.",
  },
  {
    q: "Como sair do rotativo?",
    a: "As saídas comuns são: pagar a fatura inteira, negociar parcelamento da dívida (geralmente com taxa menor que o rotativo) ou usar uma linha de crédito mais barata para quitar. Simule cada caminho antes de decidir.",
  },
];

export default function PaginaRotativo() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculadora do Rotativo do Cartão" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora do Rotativo do Cartão",
      url: `${SITE_URL}/calculadora/rotativo-do-cartao`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: "Simule quanto custa pagar o mínimo do cartão de crédito no rotativo.",
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
        <p aria-hidden="true" className="text-3xl">🔄</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Calculadora do Rotativo do Cartão: o preço de pagar o mínimo
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Pagar só o mínimo da fatura parece resolver o problema do mês — mas ativa o rotativo,
          a linha de crédito mais cara do cartão. Digite seus números abaixo e veja para onde a
          dívida caminha.
        </p>
      </header>

      <CalculadoraRotativo />

      <section aria-labelledby="como-funciona" className="prose-slate max-w-none space-y-4 text-slate-700">
        <h2 id="como-funciona" className="text-xl font-bold text-slate-900">
          Como a conta é feita
        </h2>
        <p>
          A cada mês, o saldo devedor é multiplicado por (1 + taxa mensal) e o seu pagamento é
          abatido depois. É juro composto: o juro de cada mês incide também sobre os juros
          anteriores. Sem pagamento que cubra os juros, o saldo cresce para sempre — e dobra em{" "}
          <strong>ln(2) / ln(1 + taxa)</strong> meses. A 15% ao mês, isso dá cerca de{" "}
          <strong>5 meses</strong>.
        </p>
        <p>
          <strong>Metodologia e fontes:</strong> juros compostos sobre saldo devedor (regra do
          rotativo, BACEN); parcela mínima ≥ 15% do saldo (Resolução CMN 3.910/2018). Taxas
          vigentes variam — a padrão de 15% a.m. é editável. Não incluímos IOF nem tarifas
          (simulação conservadora). Detalhes na{" "}
          <Link href="/metodologia" className="text-emerald-700 underline">página de metodologia</Link>.
        </p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ⚠️ Conteúdo educacional. Não é recomendação de investimento nem orientação financeira.
          Confira a taxa real na sua fatura.
        </p>
      </section>

      <section aria-labelledby="faq" className="space-y-3">
        <h2 id="faq" className="text-xl font-bold text-slate-900">Perguntas frequentes</h2>
        {FAQ.map((f) => (
          <details key={f.q} className="rounded-lg border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-slate-800">{f.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </section>

      <nav aria-label="Relacionados" className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-slate-900">Continue a conta:</h2>
        <ul className="mt-2 space-y-1">
          <li>
            <Link href="/calculadora/custo-de-atrasar" className="text-emerald-700 underline">
              Quanto custa atrasar boleto, parcela e cheque especial
            </Link>
          </li>
          <li>
            <Link href="/calculadora/bola-de-neve-ou-cascata" className="text-emerald-700 underline">
              Monte um plano de quitação (em construção)
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
