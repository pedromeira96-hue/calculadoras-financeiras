import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Metodologia",
  description:
    "Fórmulas, premissas, padrões e fontes oficiais usadas em cada calculadora do ContaDívida.",
  alternates: { canonical: `${SITE_URL}/metodologia` },
};

export default function PaginaMetodologia() {
  return (
    <article className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Metodologia</h1>
      <p className="text-slate-700">
        Toda calculadora do ContaDívida segue três regras: (1) a fórmula aparece junto do
        resultado; (2) nenhum parâmetro é escondido — taxas e percentuais são editáveis com
        padrões conservadores; (3) as fontes são públicas e citadas.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Rotativo do cartão</h2>
        <ul className="list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>
            <strong>Fórmula:</strong> juros compostos sobre o saldo devedor mês a mês; saldo
            novo = saldo × (1 + taxa) − pagamento. Dobro da dívida em ln(2)/ln(1 + taxa) meses.
          </li>
          <li>
            <strong>Padrões:</strong> taxa 15% a.m. (editável; confira a taxa da sua fatura);
            mínimo ≥ 15% do saldo.
          </li>
          <li>
            <strong>Fontes:</strong> BACEN — crédito rotativo; Resolução CMN 3.910/2018
            (parcela mínima); taxas medianas em vigor no site do BACEN.
          </li>
          <li>
            <strong>Não inclui:</strong> IOF, tarifas de cartão e anuidade.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Atraso (boleto, parcela e cheque especial)</h2>
        <ul className="list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>
            <strong>Fórmula (boleto/parcela):</strong> total = valor × (1 + multa) ×
            (1 + juros)^(dias/30). Padrão: multa 2% (teto do CDC) e juros 1% a.m. (padrão
            contratual comum).
          </li>
          <li>
            <strong>Fórmula (cheque especial):</strong> total = valor × (1 + taxa)^(dias/30),
            sem multa. Padrão: 12% a.m. (editável).
          </li>
          <li>
            <strong>Fontes:</strong> CDC — Lei 8.078/1990, art. 52, §1º; Código Civil, art. 406
            (juros de mora); taxas medianas BACEN.
          </li>
          <li>
            <strong>Não inclui:</strong> IOF, tarifas e correção monetária (ex.: IPCA).
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Regras transversais</h2>
        <ul className="list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>Taxas que variam no tempo nunca são travadas: sempre editáveis.</li>
          <li>Simulações são conservadoras: na dúvida, o encargo fica fora da conta (e isso é dito).</li>
          <li>Conteúdo educacional; nada aqui é recomendação de investimento.</li>
          <li>
            Última revisão dos padrões: <strong>outubro de 2026</strong> (próxima revisão
            semestral).
          </li>
        </ul>
      </section>
    </article>
  );
}
