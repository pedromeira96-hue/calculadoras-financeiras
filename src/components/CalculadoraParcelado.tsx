"use client";

import { useMemo, useState } from "react";
import { brl, num } from "@/lib/format";
import { simularParcelado } from "@/lib/calculators/parcelado";

function parseNumero(texto: string): number {
  const limpo = texto.trim().replace(/\./g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return Number.isFinite(n) ? n : 0;
}

export default function CalculadoraParcelado() {
  const [preco, setPreco] = useState("3000");
  const [parcelas, setParcelas] = useState("12");
  const [desconto, setDesconto] = useState("10");
  const [rentab, setRentab] = useState("14,5");

  const r = useMemo(() => {
    return simularParcelado({
      precoTotal: parseNumero(preco),
      parcelas: Math.max(1, Math.round(parseNumero(parcelas))),
      descontoAVistaPct: parseNumero(desconto) / 100,
      rentabilidadeAnualPct: parseNumero(rentab.replace(".", "").replace(",", ".")) / 100,
    });
  }, [preco, parcelas, desconto, rentab]);

  return (
    <div className="space-y-8">
      <form
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Simulação parcelado x à vista"
      >
        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-slate-700">
            Preço total (R$)
          </label>
          <input
            id="preco"
            type="text"
            inputMode="decimal"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="parcelas" className="block text-sm font-medium text-slate-700">
            Nº de parcelas
          </label>
          <input
            id="parcelas"
            type="text"
            inputMode="numeric"
            value={parcelas}
            onChange={(e) => setParcelas(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="desconto" className="block text-sm font-medium text-slate-700">
            Desconto à vista (%)
          </label>
          <input
            id="desconto"
            type="text"
            inputMode="decimal"
            value={desconto}
            onChange={(e) => setDesconto(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="rentab" className="block text-sm font-medium text-slate-700">
            Rentabilidade alternativa (% a.a.)
          </label>
          <input
            id="rentab"
            type="text"
            inputMode="decimal"
            value={rentab}
            onChange={(e) => setRentab(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-slate-400">Padrão ~14,5% a.a. (faixa do CDI). Editável.</p>
        </div>
      </form>

      {r === null ? (
        <p role="alert" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          Informe um preço e um número de parcelas maiores que zero.
        </p>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-600">
              A taxa escondida do parcelado “sem juros”
            </p>
            <p className="mt-1 text-4xl font-bold text-red-700">
              {num(r.taxaImplicitaMensal * 100, 2)}% <span className="text-lg">a.m.</span>
            </p>
            <p className="mt-1 text-sm text-red-600">
              = {num(r.taxaImplicitaAnual * 100, 1)}% ao ano embutido no preço
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Preço à vista com desconto</p>
              <p className="mt-1 text-2xl font-bold text-emerald-700">{brl(r.precoAVista)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Valor da parcela</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{brl(r.valorParcela)}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm text-emerald-600">Pagando à vista você termina com</p>
              <p className="mt-1 text-2xl font-bold text-emerald-700">
                {brl(r.vantagemAVista)} a mais
              </p>
              <p className="text-xs text-emerald-600">após {Math.round(parseNumero(parcelas))} meses</p>
            </div>
          </div>

          <p className="rounded-lg bg-slate-100 p-4 text-xs leading-relaxed text-slate-500">
            ℹ️ Comparação de patrimônio: quem paga à vista investe a diferença; quem parcela
            mantém o dinheiro investido e saca cada parcela. Rentabilidade informada por você —
            investimento não tem retorno garantido.
          </p>
        </div>
      )}
    </div>
  );
}
