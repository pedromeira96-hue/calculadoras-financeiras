import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Sobre o ContaDívida",
  description:
    "Por que este site existe: mostrar com números, fonte e metodologia aberta quanto as dívidas realmente custam.",
  alternates: { canonical: `${SITE_URL}/sobre` },
};

export default function PaginaSobre() {
  return (
    <article className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Sobre o ContaDívida</h1>
      <p className="text-slate-700">
        O ContaDívida existe para uma coisa: mostrar com números o que as dívidas realmente
        custam. Não vendemos produto financeiro, não temos parceria com banco nenhum e não
        fazemos recomendação de investimento.
      </p>
      <p className="text-slate-700">
        Cada calculadora é uma conta aberta: a fórmula está na página, as premissas estão
        documentadas e as fontes são públicas (Banco Central do Brasil, Código de Defesa do
        Consumidor, Código Civil, Receita Federal). Se você discordar de um número, pode
        recalcular — todos os parâmetros são editáveis.
      </p>
      <p className="text-slate-700">
        O site é gratuito e se mantém com publicidade e links de afiliados claramente
        identificados, quando houver. Nada de cadastro, nada de e-mail obrigatório.
      </p>
    </article>
  );
}
