"use client";

import { useMemo, useState } from "react";
import { brl, num } from "@/lib/format";
import { simularRotativo, mesesParaDobrar } from "@/lib/calculators/rotativo";

function parseNumero(texto: string): number {
  const limpo = texto.trim().replace(/\./g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return Number.isFinite(n) ? n : 0;
}

function formatCurrency(input: string): string {
  const num = parseNumero(input);
  return brl(num);
}

export default function CalculadoraRotativo() {
  const [saldo, setSaldo] = useState("3000");
  const [taxa, setTaxa] = useState("15");
  const [pagamento, setPagamento] = useState("450");
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

  const handleSaldoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setSaldo(formatted.replace(/\D/g, ''));
  };

  const handlePagamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setPagamento(formatted.replace(/\D/g, ''));
  };

  const handleTaxaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaxa(e.target.value.replace(/[^\d,]/g, '').replace(',', '.'));
  };

  const handleMesesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeses(e.target.value.replace(/\D/g, ''));
  };

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <form
        className="card p-5 md:p-6 space-y-5 sm:grid sm:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Simulação do rotativo"
      >
        <div>
          <label htmlFor="saldo" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
            Saldo devedor
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" aria-hidden="true">R$</span>
            <input
              id="saldo"
              type="text"
              inputMode="decimal"
              value={brl(parseNumero(saldo))}
              onChange={handleSaldoChange}
              className="input pl-7 pr-4 text-right"
              placeholder="0,00"
              aria-label="Saldo devedor em reais"
            />
          </div>
        </div>
        <div>
          <label htmlFor="taxa" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
            Taxa do rotativo (% ao mês)
          </label>
          <div className="relative">
            <input
              id="taxa"
              type="text"
              inputMode="decimal"
              value={taxa}
              onChange={handleTaxaChange}
              className="input pr-8 text-right"
              placeholder="15"
              aria-label="Taxa de juros mensal em porcentagem"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" aria-hidden="true">% a.m.</span>
          </div>
          <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
            Padrão 15% a.m. — confira a taxa do seu cartão na fatura ou no BACEN.
          </p>
        </div>
        <div>
          <label htmlFor="pagamento" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
            Pagamento mensal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" aria-hidden="true">R$</span>
            <input
              id="pagamento"
              type="text"
              inputMode="decimal"
              value={brl(parseNumero(pagamento))}
              onChange={handlePagamentoChange}
              className="input pl-7 pr-4 text-right"
              placeholder="0,00"
              aria-label="Pagamento mensal em reais"
            />
          </div>
          <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
            O mínimo costuma ser ≥ 15% do saldo (Res. CMN 3.910/2018).
          </p>
        </div>
        <div>
          <label htmlFor="meses" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
            Horizonte (meses)
          </label>
          <input
            id="meses"
            type="number"
            inputMode="numeric"
            value={meses}
            onChange={handleMesesChange}
            className="input text-right"
            placeholder="24"
            min="1"
            max="120"
            aria-label="Horizonte da simulação em meses"
          />
        </div>
      </form>

      {/* Resultados */}
      {resultado === null ? (
        <div className="card p-6 text-center" role="alert">
          <svg className="w-12 h-12 mx-auto text-[var(--color-text-tertiary)] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Preencha os campos</h3>
          <p className="text-[var(--color-text-secondary)]">Informe um saldo e uma taxa maiores que zero para simular.</p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Alertas */}
          {resultado.nuncaQuita && (
            <div className="card border-[var(--color-error)]/30 bg-[var(--color-error-bg)] p-4" role="alert">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-error)]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.36 0L3.372 16.5c-.77 1.333.23 3 2.7 3h14.256z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-error)]">Atenção: pagamento insuficiente</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Esse pagamento mensal não cobre nem os juros do primeiro mês. Nesse ritmo a dívida nunca quita — ela cresce todos os meses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resumo Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card p-5 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">Total de juros</p>
              <p className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">{brl(resultado.totalJuros)}</p>
            </div>
            <div className="card p-5 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">Situação</p>
              <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                {resultado.quitaEm !== null
                  ? `Quita em ${resultado.quitaEm} ${resultado.quitaEm === 1 ? "mês" : "meses"}`
                  : "Não quita no período"}
              </p>
            </div>
            {dobraEm !== null && (
              <div className="card p-5 text-center border-[var(--color-error)]/30 bg-[var(--color-error-bg)]">
                <p className="text-sm text-[var(--color-error)]">Tempo p/ dívida dobrar</p>
                <p className="mt-2 text-3xl font-bold text-[var(--color-error)]">~{num(dobraEm, 1)} meses</p>
              </div>
            )}
          </div>

          {/* Gráfico */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-4">Evolução do saldo mês a mês</h3>
            <div className="h-48 md:h-56 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Gráfico de barras do saldo por mês">
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="100%" x2="0" y2="0%">
                    <stop offset="0%" stopColor="var(--brand-400)" />
                    <stop offset="100%" stopColor="var(--brand-600)" />
                  </linearGradient>
                  <linearGradient id="barGradientRed" x1="0" y1="100%" x2="0" y2="0%">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <rect x="5" y="5" width="90" height="90" fill="var(--color-bg-tertiary)" rx="2" />
                <g>
                  {resultado.linhas.map((l, i) => {
                    const altura = Math.max(2, (l.saldoFim / saldoMax) * 85);
                    const y = 90 - altura - 5;
                    const x = 8 + (i * (82 / Math.max(resultado.linhas.length - 1, 1)));
                    const largura = Math.max(3, 82 / resultado.linhas.length - 2);
                    const isDobrado = l.saldoFim >= parseNumero(saldo) * 2;
                    return (
                      <rect
                        key={l.mes}
                        x={x}
                        y={y}
                        width={largura}
                        height={altura}
                        fill={isDobrado ? "url(#barGradientRed)" : "url(#barGradient)"}
                        rx={1}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    );
                  })}
                </g>
                {/* Eixo Y */}
                <g className="text-[var(--color-text-tertiary)]" style={{ fontSize: '10px' }}>
                  <text x="2" y="12" textAnchor="end" dominantBaseline="middle">{brl(saldoMax)}</text>
                  <text x="2" y="50" textAnchor="end" dominantBaseline="middle">{brl(saldoMax / 2)}</text>
                  <text x="2" y="88" textAnchor="end" dominantBaseline="middle">R$ 0</text>
                </g>
                {/* Eixo X - meses */}
                <g className="text-[var(--color-text-tertiary)]" style={{ fontSize: '9px' }}>
                  {resultado.linhas.filter((_, i) => i % Math.ceil(resultado.linhas.length / 6) === 0).map((l, idx) => {
                    const actualIdx = resultado.linhas.findIndex(item => item.mes === l.mes);
                    const x = 8 + (actualIdx * (82 / Math.max(resultado.linhas.length - 1, 1))) + 2;
                    return (
                      <text key={l.mes} x={x} y="98" textAnchor="middle" dominantBaseline="hanging" transform={`rotate(-45 ${x} 98)`}>
                        M{l.mes}
                      </text>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>

          {/* Tabela */}
          <details className="card">
            <summary className="cursor-pointer p-4 md:p-5 font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
              <span>Ver a conta completa, mês a mês</span>
              <svg className="w-5 h-5 text-[var(--color-text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div className="px-4 md:px-5 pb-4 md:pb-5 overflow-x-auto">
              <table className="w-full text-left text-sm" role="table">
                <thead>
                  <tr className="border-b border-[var(--color-border-light)] text-xs uppercase text-[var(--color-text-tertiary)]">
                    <th className="py-2 pr-4 text-left">Mês</th>
                    <th className="py-2 pr-4 text-right">Saldo início</th>
                    <th className="py-2 pr-4 text-right">Juros</th>
                    <th className="py-2 pr-4 text-right">Pagamento</th>
                    <th className="py-2 text-right">Saldo fim</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.linhas.map((l) => (
                    <tr key={l.mes} className="border-b border-[var(--color-border-light)]/50 hover:bg-[var(--color-bg-hover)]">
                      <td className="py-2 pr-4 font-medium text-[var(--color-text-primary)]">{l.mes}</td>
                      <td className="py-2 pr-4 text-right text-[var(--color-text-secondary)]">{brl(l.saldoInicio)}</td>
                      <td className="py-2 pr-4 text-right text-[var(--color-error)] font-medium">{brl(l.juros)}</td>
                      <td className="py-2 pr-4 text-right text-[var(--color-success)] font-medium">{brl(l.pagamento)}</td>
                      <td className="py-2 text-right font-semibold text-[var(--color-text-primary)]">{brl(l.saldoFim)}</td>
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