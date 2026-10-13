import { describe, expect, it } from "vitest";
import { simularReserva, taxaPoupancaMensal } from "../reserva";

describe("taxaPoupancaMensal (Lei 12.703/2012)", () => {
  it("Selic acima de 8,5% a.a. → 0,5% a.m. + TR", () => {
    expect(taxaPoupancaMensal(0.145, 0)).toBeCloseTo(0.005, 6);
  });

  it("Selic até 8,5% a.a. → 70% da Selic mensalizada + TR", () => {
    // 0,7 × 8% = 5,6% a.a. → (1,056)^(1/12) - 1 ≈ 0,4551% a.m.
    expect(taxaPoupancaMensal(0.08, 0)).toBeCloseTo(0.00455, 4);
  });
});

describe("simularReserva", () => {
  const base = {
    gastoMensal: 3000,
    mesesCobertura: 6,
    aporteInicial: 0,
    aporteMensal: 500,
    cdiAnualPct: 0.145,
    pctDoCdi: 1,
    irPct: 0.175,
    selicAnualPct: 0.145,
    trMensalPct: 0,
  };

  it("valor-alvo = gasto × cobertura = R$18.000", () => {
    const r = simularReserva(base)!;
    expect(r.valorAlvo).toBe(18000);
  });

  it("CDB líquido atinge o alvo antes da poupança", () => {
    const r = simularReserva(base)!;
    expect(r.mesesCdb).not.toBeNull();
    expect(r.mesesPoupanca).not.toBeNull();
    expect(r.mesesCdb!).toBeLessThan(r.mesesPoupanca!);
  });

  it("projeção 12/24/36 meses: CDB sempre à frente da poupança", () => {
    const r = simularReserva(base)!;
    expect(r.projecao).toHaveLength(3);
    for (const p of r.projecao) {
      expect(p.cdb).toBeGreaterThan(p.poupanca);
    }
    expect(r.diferenca24).toBeGreaterThan(0);
  });

  it("taxa do CDB líquido mensal ≈ 0,946% (CDI 14,5% com IR 17,5%)", () => {
    const r = simularReserva(base)!;
    expect(r.taxaCdbMensal).toBeCloseTo(0.00946, 3);
  });

  it("gasto mensal zero → null", () => {
    expect(simularReserva({ ...base, gastoMensal: 0 })).toBeNull();
  });
});
