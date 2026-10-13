"use client";

import { useMemo, useState } from "react";
import { brl } from "@/lib/format";
import { simularQuitacao, type Divida, type QuitacaoResultado } from "@/lib/calculators/quitacao";

function parseNumero(texto: string): number {
  const limpo = texto.trim().replace(/\./g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return Number.isFinite(n) ? n : 0;
}

interface LinhaDivida extends Divida {
  key: number;
}

let contador = 2;

export default function CalculadoraQuitacao() {
  const [dividas, setDividas] = useState<LinhaDivida[]>([
    { key: 0, nome: "Cartão", valor: 1000, taxaMensal: 0.1, pagamentoMinimo: 110 },
    { key: 1, nome: "Empréstimo", valor: 500, taxaMensal: 0.01, pagamentoMinimo: 60 },
  ]);
  const [extra, setExtra] = useState("200");

  const comparativo = useMemo(() => {
    const limpas: Divida[] = dividas
      .map((d) => ({ nome: d.nome, valor: d.valor, taxaMensal: d.taxaMensal, pagamentoMinimo: d.pagamentoMinimo }))
      .filter((d) => d.valor > 0 && d.nome.trim() !== "");
    if (limpas.length === 0) return null;
    const snow = simularQuitacao(limpas, parseNumero(extra), "snowball");
    const aval = simularQuitacao(limpas, parseNumero(extra), "avalanche");
    return { snow, aval };
  }, [dividas, extra]);

  function atualizar(key: number, campo: keyof Divida, valorTexto: string) {
    setDividas((ds) =>
      ds.map((d) => {
        if (d.key !== key) return d;
        if (campo === "nome") return { ...d, nome: valorTexto };
        const n = parseNumero(valorTexto);
        if (campo === "taxaMensal") return { ...d, taxaMensal: n / 100 };
        if (campo === "valor") return { ...d, valor: n };
        return { ...d, pagamentoMinimo: n };
      }),
    );
  }

  const fmtTaxa = (t: number) => `${(t * 100).toFixed(1).replace(".", ",")}`;

  return (
    <div className="space-y-8">
      {/* Lista de dívidas */}
      <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
        <legend className="px-2 text-sm font-semibold text-slate-700">Suas dívidas</legend>
        {dividas.map((d) => (
          <div key={d.key} className="grid items-end gap-2 sm:grid-cols-[1.2fr_1fr_0.8fr_1fr_auto]">
            <div>
              <label htmlFor={`nome-${d.key}`} className="block text-xs text-slate-500">Nome</label>
              <input
                id={`nome-${d.key}`}
                type="text"
                value={d.nome}
                onChange={(e) => atualizar(d.key, "nome", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor={`valor-${d.key}`} className="block text-xs text-slate-500">Valor (R$)</label>
              <input
                id={`valor-${d.key}`}
                type="text"
                inputMode="decimal"
                value={String(d.valor)}
                onChange={(e) => atualizar(d.key, "valor", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor={`taxa-${d.key}`} className="block text-xs text-slate-500">Taxa (% a.m.)</label>
              <input
                id={`taxa-${d.key}`}
                type="text"
                inputMode="decimal"
                value={fmtTaxa(d.taxaMensal)}
                onChange={(e) => atualizar(d.key, "taxaMensal", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor={`min-${d.key}`} className="block text-xs text-slate-500">Mínimo (R$)</label>
              <input
                id={`min-${d.key}`}
                type="text"
                inputMode="decimal"
                value={String(d.pagamentoMinimo)}
                onChange={(e) => atualizar(d.key, "pagamentoMinimo", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setDividas((ds) => ds.filter((x) => x.key !== d.key))}
              disabled={dividas.length <= 1}
              aria-label={`Remover dívida ${d.nome}`}
              className="mb-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-500 hover:border-red-300 hover:text-red-600 disabled:opacity-30"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setDividas((ds) => [
              ...ds,
              { key: ++contador, nome: "", valor: 0, taxaMensal: 0.02, pagamentoMinimo: 0 },
            ])
          }
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          + Adicionar dívida
        </button>

        <div className="pt-2">
          <label htmlFor="extra" className="block text-sm font-medium text-slate-700">
            Orçamento extra mensal (R$)
          </label>
          <input
            id="extra"
            type="text"
            inputMode="decimal"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            className="mt-1 w-40 rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </fieldset>

      {/* Comparativo */}
      {comparativo === null || comparativo.snow === null ? (
        <p role="alert" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          Adicione pelo menos uma dívida com valor e nome.
        </p>
      ) : (
        <div className="space-y-6">
          {(comparativo.snow.nuncaQuita || comparativo.aval!.nuncaQuita) && (
            <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-800">
              ⚠️ Com esse orçamento, o plano não quita as dívidas — o pagamento não cobre nem os
              juros. Aumente o extra ou renegocie taxas antes de simular de novo.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                { titulo: "❄️ Bola de neve (menor valor primeiro)", r: comparativo.snow },
                { titulo: "🏔️ Cascata (maior juro primeiro)", r: comparativo.aval! },
              ] as { titulo: string; r: QuitacaoResultado }[]
            ).map(({ titulo, r }) => (
              <div key={titulo} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">{titulo}</h3>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {r.meses} {r.meses === 1 ? "mês" : "meses"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Juros totais: <strong className="text-red-600">{brl(r.totalJuros)}</strong>
                </p>
                <p className="text-xs text-slate-400">Ordem: {r.ordem.join(" → ")}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-800">Veredito matemático</p>
            <p className="mt-1 text-emerald-700">
              A cascata economiza{" "}
              <strong>
                {brl(Math.max(0, comparativo.snow.totalJuros - comparativo.aval!.totalJuros))}
              </strong>{" "}
              em juros. A bola de neve pode valer pelo ganho motivacional de ver dívidas menores
              morrendo antes — escolha o plano que você consegue manter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
