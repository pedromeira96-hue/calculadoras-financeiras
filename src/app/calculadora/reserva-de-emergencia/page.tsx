import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraReserva from "@/components/CalculadoraReserva";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Calculadora Reserva de Emergência: CDI x Poupança",
  description:
    "Calcule o valor ideal da sua reserva e compare CDB no CDI x poupança com IR e regras reais. Metas por aporte mensal.",
  alternates: { canonical: `${SITE_URL}/calculadora/reserva-de-emergencia` },
};

const FAQ = [
  {
    q: "Quanto devo ter de reserva de emergência?",
    a: "A referência usual é de 6 a 12 meses dos seus gastos essenciais: 6 meses para renda estável (CLT com carteira) e até 12 para renda variável (autônomo, comissionado). A calculadora usa o número de meses que você escolher.",
  },
  {
    q: "Poupança ou CDB no CDI?",
    a: "Depende da Selic: quando ela está acima de 8,5% ao ano, a poupança rende 0,5% ao mês + TR; abaixo disso, 70% da Selic + TR. CDBs de liquidez diária a 100% do CDI costumam render mais, mesmo descontando o IR. A calculadora mostra a diferença em reais no seu caso.",
  },
  {
    q: "Qual imposto incide no CDB?",
    a: "O IR é regressivo (Receita Federal): 22,5% até 180 dias, 17,5% de 181 a 360 dias e 15% acima de 360 dias. A poupança é isenta de IR. A calculadora permite informar a faixa do seu prazo.",
  },
  {
    q: "O que é come-cotas?",
    a: "Em CDBs, a cada 6 meses a instituição antecipa o IR à alíquota de 15% sobre o rendimento do período. A simulação não inclui come-cotas — aproximação conservadora documentada na metodologia.",
  },
];

export default function PaginaReserva() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Reserva de Emergência" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Reserva de Emergência",
      url: `${SITE_URL}/calculadora/reserva-de-emergencia`,
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
        <p aria-hidden="true" className="text-3xl">🛡️</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Reserva de Emergência: quanto guardar e onde render mais
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Calcule o valor-alvo da sua reserva e compare o rendimento real de CDB no CDI x
          poupança — já descontando o IR e as regras vigentes.
        </p>
      </header>

      <CalculadoraReserva />

      <section className="space-y-4 text-slate-700">
        <h2 className="text-xl font-bold text-slate-900">Como a conta é feita</h2>
        <p>
          Valor-alvo = gasto essencial × meses de cobertura. A poupança segue a regra da{" "}
          <strong>Lei 12.703/2012</strong>: com Selic acima de 8,5% a.a., rende 0,5% a.m. + TR;
          abaixo, 70% da Selic + TR. O CDB usa CDI × % do produto × (1 − IR da tabela
          regressiva da Receita Federal). A projeção compõe os aportes mês a mês.
        </p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ⚠️ Conteúdo educacional. Não é recomendação de investimento. Tesouro Selic, LCI/LCA e
          fundos têm regras próprias — veja a metodologia antes de decidir.
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

      <nav aria-label="Relacionados reserva" className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-slate-900">Continue a conta:</h2>
        <ul className="mt-2 space-y-1">
          <li>
            <Link href="/calculadora/parcelado-ou-a-vista" className="text-emerald-700 underline">
              Parcelado “sem juros” ou à vista com desconto?
            </Link>
          </li>
          <li>
            <Link href="/calculadora/bola-de-neve-ou-cascata" className="text-emerald-700 underline">
              Monte um plano de quitação das dívidas
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
