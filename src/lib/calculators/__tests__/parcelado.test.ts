import { describe, expect, it } from "vitest";
import { simularParcelado, taxaImplicitaMensal, valorPresenteParcelas } from "../parcelado";

describe("valorPresenteParcelas", () => {
  it("taxa zero: PV = parcela × n", () => {
    expect(valorPresenteParcelas(250, 12, 0)).toBe(3000);
  });
});

describe("taxaImplicitaMensal", () => {
  it("R$3.000 em 12× de R$250 com 10% de desconto → ~1,65% a.m.", () => {
    const i = taxaImplicitaMensal(2700, 250, 12);
    expect(i).toBeCloseTo(0.0164, 3);
  });

  it("sem desconto → taxa implícita ~0", () => {
    const i = taxaImplicitaMensal(3000, 250, 12);
    expect(i).toBeCloseTo(0, 4);
  });
});

describe("simularParcelado", () => {
  const base = { precoTotal: 3000, parcelas: 12, descontoAVistaPct: 0.10, rentabilidadeAnualPct: 0.145 };

  it("produz taxa implícita anualizada entre 20% e 23%", () => {
    const r = simularParcelado(base)!;
    expect(r.taxaImplicitaAnual).toBeGreaterThan(0.2);
    expect(r.taxaImplicitaAnual).toBeLessThan(0.23);
    expect(r.precoAVista).toBe(2700);
    expect(r.valorParcela).toBeCloseTo(250, 6);
  });

  it("quem paga à vista e investe a diferença termina na frente (CDI 14,5%)", () => {
    const r = simularParcelado(base)!;
    // 300 investidos a 14,5% a.a. por 12 meses = 300 × 1,145 = 343,50
    expect(r.vfAVista).toBeCloseTo(343.5, 1);
    expect(r.vantagemAVista).toBeGreaterThan(0);
  });

  it("inputs inválidos → null", () => {
    expect(simularParcelado({ ...base, precoTotal: 0 })).toBeNull();
    expect(simularParcelado({ ...base, parcelas: 0 })).toBeNull();
  });
});
