"use client";

import { useMemo, useState } from "react";
import { brl } from "@/lib/format";
import { custoAtraso, custoChequeEspecial } from "@/lib/calculators/atraso";

function parseNumero(texto: string): number {
  const limpo = texto.trim().replace(/\./g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return Number.isFinite(n) ? n : 0;
}

type Modo = "boleto" | "cheque";

export default function CalculadoraAtraso() {
  const [modo, setModo] = useState<Modo>("boleto");
  const [valor, setValor] = useState("500");
  const [dias, setDias] = useState("30");
  const [multa, setMulta] = useState("2");
  const [juros, setJuros] = useState("1");
  const [taxaCheque, setTaxaCheque] = useState("12");

  const resultado = useMemo(() => {
    const v = parseNumero(valor);
    const d = Math.max(0, Math.round(parseNumero(dias)));
    if (v <= 0 || d <= 0) return null;
    if (modo === "boleto") {
      return custoAtraso({
        valor: v,
        dias: d,
        multaPct: parseNumero(multa) / 100,
        jurosMensalPct: parseNumero(juros) / 100,
      });
    }
    return custoChequeEspecial({
      valor: v,
      dias: d,
      taxaMensalPct: parseNumero(taxaCheque) / 100,
    });
  }, [modo, valor, dias, multa, juros, taxaCheque]);

  // Comparação dos três tipos com os valores atuais
  const comparacao = useMemo(() => {
    const v = parseNumero(valor);
    const d = Math.max(0, Math.round(parseNumero(dias)));
    if (v <= 0 || d <= 0) return [];
    return [
      {
        nome: "Boleto/parcela",
        calc: custoAtraso({ valor: v, dias: d, multaPct: parseNumero(multa) / 100, jurosMensalPct: parseNumero(juros) / 100 }),
      },
      {
        nome: "Cheque especial",
        calc: custoChequeEspecial({ valor: v, dias: d, taxaMensalPct: parseNumero(taxaCheque) / 100 }),
      },
    ];
  }, [valor, dias, multa, juros, taxaCheque]);

  return (
    <div className="space-y-8">
      <form
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Simulação de atraso"
      >
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-slate-700">O que está atrasado?</legend>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="modo"
                value="boleto"
                checked={modo === "boleto"}
                onChange={() => setModo("boleto")}
                className="accent-emerald-600"
              />
              Boleto ou parcela
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="modo"
                value="cheque"
                checked={modo === "cheque"}
                onChange={() => setModo("cheque")}
                className="accent-emerald-600"
              />
              Cheque especial
            </label>
          </div>
        </fieldset>

        <div>
          <label htmlFor="valor" className="block text-sm font-medium text-slate-700">
            Valor (R$)
          </label>
          <input
            id="valor"
            type="text"
            inputMode="decimal"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="dias" className="block text-sm font-medium text-slate-700">
            Dias de atraso
          </label>
          <input
            id="dias"
            type="text"
            inputMode="numeric"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {modo === "boleto" ? (
          <>
            <div>
              <label htmlFor="multa" className="block text-sm font-medium text-slate-700">
                Multa (% sobre o valor)
              </label>
              <input
                id="multa"
                type="text"
                inputMode="decimal"
                value={multa}
                onChange={(e) => setMulta(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-400">Teto legal: 2% (CDC, art. 52, §1º).</p>
            </div>
            <div>
              <label htmlFor="juros" className="block text-sm font-medium text-slate-700">
                Juros de mora (% ao mês)
              </label>
              <input
                id="juros"
                type="text"
                inputMode="decimal"
                value={juros}
                onChange={(e) => setJuros(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-400">
                Padrão contratual comum: 1% a.m. — confira seu contrato.
              </p>
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="taxaCheque" className="block text-sm font-medium text-slate-700">
              Taxa do cheque especial (% ao mês)
            </label>
            <input
              id="taxaCheque"
              type="text"
              inputMode="decimal"
              value={taxaCheque}
              onChange={(e) => setTaxaCheque(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-slate-400">
              Confira a taxa no app do seu banco (medianas no site do BACEN).
            </p>
          </div>
        )}
      </form>

      {resultado === null ? (
        <p role="alert" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          Informe um valor e um prazo de atraso maiores que zero.
        </p>
      ) : (
        <div className="space-y-6">
          {/* Número-herói */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-600">Custo por dia de atraso</p>
            <p className="mt-1 text-4xl font-bold text-red-700">{brl(resultado.custoPorDia)}</p>
            <p className="mt-2 text-sm text-red-600">
              Em {Math.round(parseNumero(dias))} dias: {brl(resultado.custoTotal)} de juros e multa —
              total a pagar: <strong>{brl(resultado.total)}</strong>
            </p>
          </div>

          {/* Comparação */}
          {comparacao.length === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {comparacao.map((c) => (
                <div
                  key={c.nome}
                  className={`rounded-xl border p-5 ${c.nome === "Cheque especial" && modo === "cheque" ? "border-emerald-500 bg-emerald-50" : c.nome !== "Cheque especial" && modo === "boleto" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"}`}
                >
                  <p className="text-sm font-semibold text-slate-700">{c.nome}</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{brl(c.calc.custoTotal)}</p>
                  <p className="text-xs text-slate-500">
                    ({brl(c.calc.custoPorDia)}/dia · total {brl(c.calc.total)})
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="rounded-lg bg-slate-100 p-4 text-xs leading-relaxed text-slate-500">
            ℹ️ Simulação matemática. Não inclui IOF, tarifas ou correção monetária (ex.: IPCA)
            previstos em alguns contratos. As regras do seu contrato prevalecem sobre os padrões
            usados aqui.
          </p>
        </div>
      )}
    </div>
  );
}
