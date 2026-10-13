import Link from "next/link";

/** Página "em construção" para calculadoras ainda não implementadas. */
export default function EmConstrucao({
  titulo,
  pergunta,
  prazo,
}: {
  titulo: string;
  pergunta: string;
  prazo: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
        Em construção
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">{titulo}</h2>
      <p className="mt-2 max-w-xl text-slate-600">{pergunta}</p>
      <p className="mt-1 text-sm text-slate-400">Previsão: {prazo}</p>
      <p className="mt-4 text-sm text-slate-600">
        Enquanto isso,{" "}
        <Link href="/calculadora/rotativo-do-cartao" className="text-emerald-700 underline">
          calcule quanto custa o rotativo do cartão
        </Link>{" "}
        ou{" "}
        <Link href="/calculadora/custo-de-atrasar" className="text-emerald-700 underline">
          o preço de atrasar um boleto
        </Link>
        .
      </p>
    </div>
  );
}
