import type { Metadata } from "next";
import { AUTHOR_NAME, SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Autor",
  description: "Quem faz as contas do ContaDívida e por que elas são verificáveis.",
  alternates: { canonical: `${SITE_URL}/autor` },
};

export default function PaginaAutor() {
  return (
    <article className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Autor</h1>
      <p className="text-slate-700">
        As contas do ContaDívida são feitas por <strong>{AUTHOR_NAME}</strong>.
      </p>
      <p className="text-slate-700">
        Este projeto nasceu da prática de calcular dívidas reais — a mesma matemática que
        qualquer pessoa pode conferir. Não somos consultores financeiros credenciados e não
        emitimos recomendação de investimento: o compromisso aqui é outro, e ele é verificável —
        toda fórmula, premissa e fonte está publicada junto de cada calculadora, na{" "}
        <a href="/metodologia" className="text-emerald-700 underline">página de metodologia</a>.
      </p>
      <p className="text-slate-700">
        Encontrou um erro de conta? Erro de matemática em ferramenta de finanças é inaceitável —
        avise e será corrigido com prioridade.
      </p>
    </article>
  );
}
