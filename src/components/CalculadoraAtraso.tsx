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

const checkIcon = (
  <svg className="absolute bottom-2 right-2 w-5 h-5 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

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

  const comparacao = useMemo(() => {
    const v = parseNumero(valor);
    const d = Math.max(0, Math.round(parseNumero(dias)));
    if (v <= 0 || d <= 0) return [];
    return [
      {
        nome: "Boleto / Parcela",
        icone: "📄",
        calc: custoAtraso({ valor: v, dias: d, multaPct: parseNumero(multa) / 100, jurosMensalPct: parseNumero(juros) / 100 }),
        ativo: modo === "boleto",
      },
      {
        nome: "Cheque Especial",
        icone: "🏦",
        calc: custoChequeEspecial({ valor: v, dias: d, taxaMensalPct: parseNumero(taxaCheque) / 100 }),
        ativo: modo === "cheque",
      },
    ];
  }, [valor, dias, multa, juros, taxaCheque, modo]);

  return (
    <div className="space-y-8">
      <form className="card p-5 md:p-6 space-y-5 sm:grid sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} aria-label="Simulação de atraso">
        <fieldset className="sm:col-span-2">
          <legend className="block text-sm font-medium text-[var(--color-text-secondary)] mb-3">O que está atrasado?</legend>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo de atraso">
            {[
              { valor: "boleto", label: "Boleto ou parcela", icone: "📄", desc: "Multa + juros de mora" },
              { valor: "cheque", label: "Cheque especial", icone: "🏦", desc: "Apenas juros compostos" },
            ].map((opcao) => (
              <label
                key={opcao.valor}
                className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                  modo === opcao.valor
                    ? "border-[var(--color-border-focus)] bg-[var(--color-success-bg)]"
                    : "border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] hover:bg-[var(--color-bg-hover)]"
                }`}
              >
                <input
                  type="radio"
                  name="modo"
                  value={opcao.valor}
                  checked={modo === opcao.valor}
                  onChange={() => setModo(opcao.valor as Modo)}
                  className="sr-only"
                  aria-label={opcao.label}
                />
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{opcao.icone}</span>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">{opcao.label}</p>
                    <p className="text-xs text-[var(--color-text-tertiary)]">{opcao.desc}</p>
                  </div>
                </div>
                {modo === opcao.valor && checkIcon}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="valor" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Valor (R$)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" aria-hidden="true">R$</span>
            <input id="valor" type="text" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} className="input pl-7 pr-4 text-right" placeholder="500,00" aria-label="Valor original em reais" />
          </div>
        </div>
        <div>
          <label htmlFor="dias" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Dias de atraso</label>
          <input id="dias" type="number" inputMode="numeric" value={dias} onChange={(e) => setDias(e.target.value)} className="input text-right" placeholder="30" min="0" max="365" aria-label="Dias de atraso" />
        </div>

        {modo === "boleto" ? (
          <>
            <div>
              <label htmlFor="multa" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Multa (% sobre o valor)</label>
              <div className="relative">
                <input id="multa" type="text" inputMode="decimal" value={multa} onChange={(e) => setMulta(e.target.value)} className="input pr-8 text-right" placeholder="2" aria-label="Multa em porcentagem" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" aria-hidden="true">%</span>
              </div>
              <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">Teto legal: 2% (CDC, art. 52, §1º).</p>
            </div>
            <div>
              <label htmlFor="juros" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Juros de mora (% ao mês)</label>
              <div className="relative">
                <input id="juros" type="text" inputMode="decimal" value={juros} onChange={(e) => setJuros(e.target.value)} className="input pr-8 text-right" placeholder="1" aria-label="Juros de mora mensal em porcentagem" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" aria-hidden="true">% a.m.</span>
              </div>
              <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">Padrão contratual comum: 1% a.m. — confira seu contrato.</p>
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="taxaCheque" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Taxa do cheque especial (% ao mês)</label>
            <div className="relative">
              <input id="taxaCheque" type="text" inputMode="decimal" value={taxaCheque} onChange={(e) => setTaxaCheque(e.target.value)} className="input pr-8 text-right" placeholder="12" aria-label="Taxa do cheque especial em porcentagem ao mês" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" aria-hidden="true">% a.m.</span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">Confira a taxa no app do seu banco (medianas no site do BACEN).</p>
          </div>
        )}
      </form>

      {resultado === null ? (
        <div className="card p-6 text-center" role="alert">
          <svg className="w-12 h-12 mx-auto text-[var(--color-text-tertiary)] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Informe os dados</h3>
          <p className="text-[var(--color-text-secondary)]">Informe um valor e um prazo de atraso maiores que zero.</p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="card p-6 md:p-8 text-center border-[var(--color-error)]/30 bg-[var(--color-error-bg)]">
            <p className="text-sm font-medium text-[var(--color-error)] uppercase tracking-wider">Custo por dia de atraso</p>
            <p className="mt-2 text-4xl md:text-5xl font-bold text-[var(--color-error)]">{brl(resultado.custoPorDia)}</p>
            <p className="mt-3 text-sm md:text-base text-[var(--color-text-secondary)]">Em {dias} dias: <strong>{brl(resultado.custoTotal)}</strong> de juros e multa — total a pagar: <strong className="text-[var(--color-text-primary)]">{brl(resultado.total)}</strong></p>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Comparação: o que sai mais caro?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comparacao.map((c) => (
                <div key={c.nome} className={`p-4 rounded-xl transition-all duration-200 ${c.ativo ? "border-2 border-[var(--color-border-focus)] bg-[var(--color-success-bg)]" : "border border-[var(--color-border-light)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-medium)]"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" aria-hidden="true">{c.icone}</span>
                    <p className="font-semibold text-[var(--color-text-primary)]">{c.nome}</p>
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">{brl(c.calc.custoTotal)}</p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">({brl(c.calc.custoPorDia)}/dia · total {brl(c.calc.total)})</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 bg-[var(--color-bg-tertiary)] border-[var(--color-border-light)]">
            <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">ℹ️ Simulação matemática. Não inclui IOF, tarifas ou correção monetária (ex.: IPCA) previstos em alguns contratos. As regras do seu contrato prevalecem sobre os padrões usados aqui.</p>
          </div>
        </div>
      )}
    </div>
  );
}