import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraParcelado from "@/components/CalculadoraParcelado";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Parcelado Sem Juros ou À Vista: Qual Compensa?",
  description:
    "Descubra a taxa escondida do parcelado “sem juros” e quanto você ganha pagando à vista com desconto. Simulação de juros implícitos.",
  alternates: { canonical: `${SITE_URL}/calculadora/parcelado-ou-a-vista` },
};

const FAQ = [
  {
    q: "Parcelamento “sem juros” tem juro escondido?",
    a: "Tem um custo de oportunidade embutido: a loja dá desconto para quem paga à vista — esse desconto é o juro que quem parcela deixa de receber. A calculadora converte isso em taxa implícita (TIR).",
  },
  {
    q: "Como a taxa implícita é calculada?",
    a: "Resolvemos a taxa que iguala o preço à vista ao valor presente das parcelas: preço à vista = parcela × (1-(1+i)^-n)/i. É a mesma conta de financiamento (TIR).",
  },
  {
    q: "Então devo sempre pagar à vista?",
    a: "Se você tem o dinheiro investido a uma rentabilidade razoável e o desconto for bom, à vista tende a vencer. Se parcelar evita que você entre no rotativo ou no cheque especial, parcelar “sem juros” pode ser a escolha certa — cada caso é uma conta.",
  },
];

export default function PaginaParcelado() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Parcelado ou À Vista" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Parcelado Sem Juros ou À Vista",
      url: `${SITE_URL}/calculadora/parcelado-ou-a-vista`,
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
        <p aria-hidden="true" className="text-3xl">💳</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Parcelado “Sem Juros” ou À Vista com Desconto: a conta que ninguém faz
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          “Sem juros” não existe de graça: quem paga à vista geralmente paga menos. Descubra
          quanto o parcelamento custa de verdade — em taxa anual e em patrimônio.
        </p>
      </header>

      <CalculadoraParcelado />

      <section className="space-y-4 text-slate-700">
        <h2 className="text-xl font-bold text-slate-900">Como a conta é feita</h2>
        <p>
          A taxa implícita é a <strong>TIR</strong> do fluxo: a taxa mensal que faz o valor
          presente das parcelas igualar o preço à vista. Na comparação de patrimônio, quem paga à
          vista investe a diferença; quem parcela mantém o valor aplicado e saca uma parcela por
          mês. A rentabilidade é um parâmetro seu — investimento não tem retorno garantido.
        </p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ⚠️ Conteúdo educacional. Não é recomendação. “Sem juros” é decisão comercial da loja;
          a conta aqui mostra o custo de oportunidade em taxa e em R$.
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

      <nav aria-label="Relacionados parcelado" className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-slate-900">Continue a conta:</h2>
        <ul className="mt-2 space-y-1">
          <li>
            <Link href="/calculadora/rotativo-do-cartao" className="text-emerald-700 underline">
              Quanto custa pagar o mínimo do cartão (rotativo)
            </Link>
          </li>
          <li>
            <Link href="/calculadora/reserva-de-emergencia" className="text-emerald-700 underline">
              Monte sua reserva de emergência
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
