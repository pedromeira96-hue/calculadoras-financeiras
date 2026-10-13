import type { Metadata } from "next";
import EmConstrucao from "@/components/EmConstrucao";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Parcelado Sem Juros ou À Vista: Qual Compensa?",
  description:
    "Descubra a taxa escondida do parcelado “sem juros” e quanto você ganha pagando à vista com desconto. Simulação de juros implícitos.",
  alternates: { canonical: `${SITE_URL}/calculadora/parcelado-ou-a-vista` },
};

export default function PaginaParcelado() {
  return (
    <article className="space-y-8">
      <header>
        <p aria-hidden="true" className="text-3xl">💳</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Parcelado “Sem Juros” ou À Vista: a conta que ninguém faz
        </h1>
      </header>
      <EmConstrucao
        titulo="Calculadora de taxa implícita do parcelamento"
        pergunta="Compare o parcelado “sem juros” com o desconto à vista e descubra quanto o parcelamento custa de verdade."
        prazo="próxima onda de desenvolvimento (M1.2)"
      />
    </article>
  );
}
