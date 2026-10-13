import { describe, expect, it } from "vitest";
import { custoAtraso, custoChequeEspecial } from "../atraso";

describe("custoAtraso (boleto/parcela)", () => {
  it("R$500, 30 dias, multa 2% + juros 1% a.m. → total R$515,10", () => {
    const r = custoAtraso({ valor: 500, dias: 30, multaPct: 0.02, jurosMensalPct: 0.01 });
    expect(r.total).toBeCloseTo(515.1, 2);
    expect(r.custoTotal).toBeCloseTo(15.1, 2);
    expect(r.custoPorDia).toBeCloseTo(0.5033, 3);
  });

  it("60 dias: juros compostos pro-rata (exatamente 2 períodos)", () => {
    const r = custoAtraso({ valor: 500, dias: 60, multaPct: 0.02, jurosMensalPct: 0.01 });
    // 500 × 1.02 × 1.01² = 520.251
    expect(r.total).toBeCloseTo(520.251, 2);
  });

  it("0 dias de atraso → custo zero", () => {
    const r = custoAtraso({ valor: 500, dias: 0, multaPct: 0.02, jurosMensalPct: 0.01 });
    expect(r.custoTotal).toBe(0);
    expect(r.custoPorDia).toBe(0);
  });

  it("multa zero com juros aplica só juros", () => {
    const r = custoAtraso({ valor: 1000, dias: 30, multaPct: 0, jurosMensalPct: 0.01 });
    expect(r.total).toBeCloseTo(1010, 2);
  });
});

describe("custoChequeEspecial", () => {
  it("R$500, 30 dias, 12% a.m. → R$560,00 (custo de R$2/dia)", () => {
    const r = custoChequeEspecial({ valor: 500, dias: 30, taxaMensalPct: 0.12 });
    expect(r.total).toBeCloseTo(560, 2);
    expect(r.custoTotal).toBeCloseTo(60, 2);
    expect(r.custoPorDia).toBeCloseTo(2, 2);
  });

  it("15 dias aplica meio período de juros", () => {
    const r = custoChequeEspecial({ valor: 1000, dias: 15, taxaMensalPct: 0.12 });
    // 1000 × 1.12^0.5 ≈ 1058.30
    expect(r.total).toBeCloseTo(1058.3, 1);
  });

  it("0 dias → custo zero", () => {
    const r = custoChequeEspecial({ valor: 500, dias: 0, taxaMensalPct: 0.12 });
    expect(r.custoTotal).toBe(0);
  });
});
