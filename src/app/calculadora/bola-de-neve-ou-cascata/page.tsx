import type { Metadata } from "next";
import EmConstrucao from "@/components/EmConstrucao";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Calculadora Bola de Neve vs Cascata: Qual Quita Antes?",
  description:
    "Simule as duas estratégias com suas dívidas reais. Compare prazo total, juros pagos e a diferença em reais entre os métodos.",
  alternates: { canonical: `${SITE_URL}/calculadora/bola-de-neve-ou-cascata` },
};

export default function PaginaBolaDeNeve() {
  return (
    <article className="space-y-8">
      <header>
        <p aria-hidden="true" className="text-3xl">❄️</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Bola de Neve ou Cascata: qual quita suas dívidas mais barato?
        </h1>
      </header>
      <EmConstrucao
        titulo="Simulador de quitação com suas dívidas reais"
        pergunta="Cadastre suas dívidas e compare os dois planos lado a lado: prazo total, juros totais e a diferença em reais."
        prazo="próxima onda de desenvolvimento (M1.2)"
      />
    </article>
  );
}
