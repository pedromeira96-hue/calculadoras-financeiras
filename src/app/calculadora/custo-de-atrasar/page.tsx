import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraAtraso from "@/components/CalculadoraAtraso";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Quanto Custa Atrasar Boleto? Multa e Juros por Dia",
  description:
    "Calcule multa de 2% e juros de mora de boleto, parcela e cheque especial atrasados. Veja o custo por dia em segundos.",
  alternates: { canonical: `${SITE_URL}/calculadora/custo-de-atrasar` },
};

const FAQ = [
  {
    q: "Qual é a multa máxima por boleto atrasado?",
    a: "Para relações de consumo, o CDC (Lei 8.078/1990, art. 52, §1º) limita a multa por atraso a 2% do valor. O padrão da nossa calculadora usa esse teto, que é o mais comum.",
  },
  {
    q: "Quanto de juros pode ser cobrado por mês?",
    a: "O Código Civil exige que os juros de mora sejam previstos em contrato. O padrão mais comum é 1% ao mês (12% ao ano). Sem previsão contratual, aplica-se a regra legal — confira sempre seu contrato.",
  },
  {
    q: "Cheque especial tem multa?",
    a: "Não. O cheque especial funciona como crédito pré-aprovado: cobra só juros sobre o saldo usado, mas a taxas mensais altas (a mediana de mercado fica bem acima de 10% a.m.).",
  },
  {
    q: "IOF está incluído na simulação?",
    a: "Não. A simulação é conservadora e não inclui IOF, tarifas ou correção monetária. Alguns contratos preveem esses encargos adicionais.",
  },
];

export default function PaginaAtraso() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Quanto Custa Atrasar" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Quanto Custa Atrasar — Boleto, Parcela e Cheque Especial",
      url: `${SITE_URL}/calculadora/custo-de-atrasar`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: "Calcule multa e juros de atrasos de boleto, parcela e cheque especial.",
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
        <p aria-hidden="true" className="text-3xl">⏰</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Quanto Custa Atrasar: boleto, cheque especial e parcela
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Um dia atrasado já cobra caro. Veja quanto cada dia de atraso custa no seu bolso —
          e por que boleto pendurado é dívida que cresce sozinha.
        </p>
      </header>

      <CalculadoraAtraso />

      <section aria-labelledby="como-funciona-atraso" className="space-y-4 text-slate-700">
        <h2 id="como-funciona-atraso" className="text-xl font-bold text-slate-900">
          Como a conta é feita
        </h2>
        <p>
          Para <strong>boleto e parcela</strong>, a simulação aplica a multa contratual (padrão:
          teto de 2% do valor, CDC art. 52, §1º) e depois juros compostos pro-rata die sobre o
          prazo: <code className="rounded bg-slate-100 px-1">valor × (1 + multa) × (1 + juros)^(dias/30)</code>.
          Para <strong>cheque especial</strong>, só juros compostos:{" "}
          <code className="rounded bg-slate-100 px-1">valor × (1 + taxa)^(dias/30)</code>.
        </p>
        <p>
          <strong>Metodologia e fontes:</strong> CDC (Lei 8.078/1990), Código Civil (art. 406,
          juros de mora) e taxas medianas do BACEN. Todos os percentuais são editáveis — as
          regras do seu contrato prevalecem. Detalhes na{" "}
          <Link href="/metodologia" className="text-emerald-700 underline">página de metodologia</Link>.
        </p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ⚠️ Conteúdo educacional. Não inclui IOF, tarifas ou correção monetária. Não é
          recomendação financeira.
        </p>
      </section>

      <section aria-labelledby="faq-atraso" className="space-y-3">
        <h2 id="faq-atraso" className="text-xl font-bold text-slate-900">Perguntas frequentes</h2>
        {FAQ.map((f) => (
          <details key={f.q} className="rounded-lg border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-slate-800">{f.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </section>

      <nav aria-label="Relacionados atraso" className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-slate-900">Continue a conta:</h2>
        <ul className="mt-2 space-y-1">
          <li>
            <Link href="/calculadora/rotativo-do-cartao" className="text-emerald-700 underline">
              Quanto custa pagar o mínimo do cartão (rotativo)
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
