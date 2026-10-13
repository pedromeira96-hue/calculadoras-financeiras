"use client";

import { useMemo, useState } from "react";
import { brl, num } from "@/lib/format";
import { mesesParaDobrar, simularRotativo } from "@/lib/calculators/rotativo";

function parseNumero(texto: string): number {
  const limpo = texto.trim().replace(/\./g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return Number.isFinite(n) ? n : 0;
}

export default function CalculadoraRotativo() {
  const [saldo, setSaldo] = useState("1000");
  const [taxa, setTaxa] = useState("15");
  const [pagamento, setPagamento] = useState("150");
  const [meses, setMeses] = useState("24");

  const resultado = useMemo(() => {
    const s = parseNumero(saldo);
    const t = parseNumero(taxa) / 100;
    const p = parseNumero(pagamento);
    const m = Math.max(1, Math.min(120, Math.round(parseNumero(meses))));
    if (s <= 0 || t <= 0) return null;
    return simularRotativo({ saldoInicial: s, taxaMensal: t, pagamentoMensal: p, meses: m });
  }, [saldo, taxa, pagamento, meses]);

  const dobraEm = resultado && resultado.saldoDobrouAte
    ? mesesParaDobrar(parseNumero(taxa) / 100)
    : null;

  const saldoMax = resultado
    ? Math.max(...resultado.linhas.map((l) => l.saldoFim), 1)
    : 1;

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <form
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Simulação do rotativo"
      >
        <div>
          <label htmlFor="saldo" className="block text-sm font-medium text-slate-700">
            Saldo devedor (R$)
          </label>
          <input
            id="saldo"
            type="text"
            inputMode="decimal"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="taxa" className="block text-sm font-medium text-slate-700">
            Taxa do rotativo (% ao mês)
          </label>
          <input
            id="taxa"
            type="text"
            inputMode="decimal"
            value={taxa}
            onChange={(e) => setTaxa(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-slate-400">
            Padrão 15% a.m. — confira a taxa do seu cartão na fatura ou no BACEN.
          </p>
        </div>
        <div>
          <label htmlFor="pagamento" className="block text-sm font-medium text-slate-700">
            Pagamento mensal (R$)
          </label>
          <input
            id="pagamento"
            type="text"
            inputMode="decimal"
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-slate-400">
            O mínimo costuma ser ≥ 15% do saldo (Res. CMN 3.910/2018).
          </p>
        </div>
        <div>
          <label htmlFor="meses" className="block text-sm font-medium text-slate-700">
            Horizonte (meses)
          </label>
          <input
            id="meses"
            type="text"
            inputMode="numeric"
            value={meses}
            onChange={(e) => setMeses(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </form>

      {/* Resultados */}
      {resultado === null ? (
        <p role="alert" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          Informe um saldo e uma taxa maiores que zero para simular.
        </p>
      ) : (
        <div className="space-y-6">
          {resultado.nuncaQuita && (
            <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-800">
              ⚠️ Atenção: esse pagamento mensal não cobre nem os juros do primeiro mês. Nesse
              ritmo a dívida nunca quita — ela cresce todos os meses.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total de juros pagos no período</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{brl(resultado.totalJuros)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Situação</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {resultado.quitaEm !== null
                  ? `Quita em ${resultado.quitaEm} ${resultado.quitaEm === 1 ? "mês" : "meses"}`
                  : "Não quita no período"}
              </p>
            </div>
            {dobraEm !== null && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm text-red-600">Nesse ritmo, a dívida dobra a cada</p>
                <p className="mt-1 text-2xl font-bold text-red-700">~{num(dobraEm, 1)} meses</p>
              </div>
            )}
          </div>

          {/* Gráfico de barras CSS */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-700">Saldo mês a mês (R$)</h3>
            <div className="mt-4 flex h-40 items-end gap-1" role="img" aria-label="Gráfico de barras do saldo por mês">
              {resultado.linhas.map((l) => {
                const altura = Math.max(2, (l.saldoFim / saldoMax) * 100);
                return (
                  <div
                    key={l.mes}
                    className="flex flex-1 flex-col items-center justify-end"
                    title={`Mês ${l.mes}: ${brl(l.saldoFim)}`}
                  >
                    <div
                      className={`w-full rounded-t ${l.saldoFim >= parseNumero(saldo) * 2 ? "bg-red-500" : "bg-emerald-500"}`}
                      style={{ height: `${altura}%` }}
                    />
                    {l.mes % 6 === 0 && (
                      <span className="mt-1 text-[10px] text-slate-400">{l.mes}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabela */}
          <details className="rounded-xl border border-slate-200 bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold text-slate-700">
              Ver a conta completa, mês a mês
            </summary>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
                    <th className="py-2 pr-4">Mês</th>
                    <th className="py-2 pr-4">Saldo início</th>
                    <th className="py-2 pr-4">Juros</th>
                    <th className="py-2 pr-4">Pagamento</th>
                    <th className="py-2">Saldo fim</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.linhas.map((l) => (
                    <tr key={l.mes} className="border-b border-slate-100">
                      <td className="py-2 pr-4">{l.mes}</td>
                      <td className="py-2 pr-4">{brl(l.saldoInicio)}</td>
                      <td className="py-2 pr-4 text-red-600">{brl(l.juros)}</td>
                      <td className="py-2 pr-4 text-emerald-700">{brl(l.pagamento)}</td>
                      <td className="py-2 font-medium">{brl(l.saldoFim)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
