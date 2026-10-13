"use client";

import { useMemo, useState } from "react";
import { brl, num } from "@/lib/format";
import { simularReserva } from "@/lib/calculators/reserva";

function parseNumero(texto: string): number {
  const limpo = texto.trim().replace(/\./g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return Number.isFinite(n) ? n : 0;
}

export default function CalculadoraReserva() {
  const [gasto, setGasto] = useState("3000");
  const [cobertura, setCobertura] = useState("6");
  const [inicial, setInicial] = useState("0");
  const [aporte, setAporte] = useState("500");
  const [cdi, setCdi] = useState("14,5");
  const [ir, setIr] = useState("17,5");
  const [selic, setSelic] = useState("14,5");

  const r = useMemo(() => {
    return simularReserva({
      gastoMensal: parseNumero(gasto),
      mesesCobertura: Math.max(1, Math.round(parseNumero(cobertura))),
      aporteInicial: parseNumero(inicial),
      aporteMensal: parseNumero(aporte),
      cdiAnualPct: parseNumero(cdi) / 100,
      pctDoCdi: 1,
      irPct: parseNumero(ir) / 100,
      selicAnualPct: parseNumero(selic) / 100,
      trMensalPct: 0,
    });
  }, [gasto, cobertura, inicial, aporte, cdi, ir, selic]);

  const mesesTexto = (m: number | null) => (m === null ? "nunca (aporte insuficiente)" : `${m} meses`);

  return (
    <div className="space-y-8">
      <form
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-3"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Simulação de reserva de emergência"
      >
        <div>
          <label htmlFor="gasto" className="block text-sm font-medium text-slate-700">
            Gasto mensal essencial (R$)
          </label>
          <input id="gasto" type="text" inputMode="decimal" value={gasto}
            onChange={(e) => setGasto(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="cobertura" className="block text-sm font-medium text-slate-700">
            Meses de cobertura
          </label>
          <input id="cobertura" type="text" inputMode="numeric" value={cobertura}
            onChange={(e) => setCobertura(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
          <p className="mt-1 text-xs text-slate-400">Guia: 6 com renda estável; 12 com renda variável.</p>
        </div>
        <div>
          <label htmlFor="aporte" className="block text-sm font-medium text-slate-700">
            Aporte mensal (R$)
          </label>
          <input id="aporte" type="text" inputMode="decimal" value={aporte}
            onChange={(e) => setAporte(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="inicial" className="block text-sm font-medium text-slate-700">
            Já guardado (R$)
          </label>
          <input id="inicial" type="text" inputMode="decimal" value={inicial}
            onChange={(e) => setInicial(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="cdi" className="block text-sm font-medium text-slate-700">
            CDI bruto (% a.a.)
          </label>
          <input id="cdi" type="text" inputMode="decimal" value={cdi}
            onChange={(e) => setCdi(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="ir" className="block text-sm font-medium text-slate-700">
            IR no prazo (%)
          </label>
          <input id="ir" type="text" inputMode="decimal" value={ir}
            onChange={(e) => setIr(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
          <p className="mt-1 text-xs text-slate-400">Regressivo RFB: 22,5% até 180d; 17,5% até 360d; 15% acima.</p>
        </div>
        <div>
          <label htmlFor="selic" className="block text-sm font-medium text-slate-700">
            Selic (% a.a.) — define a regra da poupança
          </label>
          <input id="selic" type="text" inputMode="decimal" value={selic}
            onChange={(e) => setSelic(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
      </form>

      {r === null ? (
        <p role="alert" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          Informe um gasto mensal maior que zero.
        </p>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <p className="text-sm font-medium text-emerald-600">Sua reserva de emergência precisa de</p>
            <p className="mt-1 text-4xl font-bold text-emerald-700">{brl(r.valorAlvo)}</p>
            <p className="mt-2 text-sm text-emerald-700">
              Chegando lá em <strong>{mesesTexto(r.mesesCdb)}</strong> (CDB) ·{" "}
              {mesesTexto(r.mesesPoupanca)} (poupança)
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {r.projecao.map((p) => (
              <div key={p.mes} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Patrimônio em {p.mes} meses</p>
                <p className="mt-1 font-bold text-slate-900">CDB líquido: {brl(p.cdb)}</p>
                <p className="text-sm text-slate-500">Poupança: {brl(p.poupanca)}</p>
                <p className="mt-1 text-xs font-medium text-emerald-700">
                  Diferença: {brl(p.cdb - p.poupanca)}
                </p>
              </div>
            ))}
          </div>

          <p className="rounded-lg bg-slate-100 p-4 text-xs leading-relaxed text-slate-500">
            ℹ️ CDB 100% do CDI com IR informado (come-cotas semestral não simulado —
            aproximação documentada na metodologia). Poupança segue a regra vigente: Selic acima
            de 8,5% a.a. → 0,5% a.m. + TR; abaixo → 70% da Selic + TR. TR considerada zerada.
            Não é recomendação de investimento.
          </p>
        </div>
      )}
    </div>
  );
}
