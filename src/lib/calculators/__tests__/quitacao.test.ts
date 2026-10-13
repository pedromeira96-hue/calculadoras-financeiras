import { describe, expect, it } from "vitest";
import { simularQuitacao, type Divida } from "../quitacao";

describe("simularQuitacao — caso único", () => {
  it("dívida de R$1.000 a 1% a.m. com pagamento de R$100 quita em 11 meses", () => {
    const r = simularQuitacao(
      [{ nome: "Cartão", valor: 1000, taxaMensal: 0.01, pagamentoMinimo: 100 }],
      0,
      "snowball",
    )!;
    expect(r.meses).toBe(11);
    expect(r.nuncaQuita).toBe(false);
    // 10 pagamentos de 100 + um último de ~58,98
    expect(r.totalPago).toBeCloseTo(1058.98, 1);
    expect(r.totalJuros).toBeCloseTo(58.98, 1);
  });

  it("orçamento menor que os juros → nunca quita", () => {
    const r = simularQuitacao(
      [{ nome: "Rotativo", valor: 1000, taxaMensal: 0.15, pagamentoMinimo: 50 }],
      0,
      "snowball",
    )!;
    expect(r.nuncaQuita).toBe(true);
  });
});

describe("simularQuitacao — bola de neve vs cascata", () => {
  const dividas: Divida[] = [
    { nome: "Cartão", valor: 1000, taxaMensal: 0.1, pagamentoMinimo: 110 },
    { nome: "Empréstimo", valor: 500, taxaMensal: 0.01, pagamentoMinimo: 60 },
  ];

  it("ordens corretas: snowball pelo menor valor, cascata pela maior taxa", () => {
    const snow = simularQuitacao(dividas, 200, "snowball")!;
    const aval = simularQuitacao(dividas, 200, "avalanche")!;
    expect(snow.ordem).toEqual(["Empréstimo", "Cartão"]);
    expect(aval.ordem).toEqual(["Cartão", "Empréstimo"]);
  });

  it("cascata paga menos juros que a bola de neve (órgão matemático)", () => {
    const snow = simularQuitacao(dividas, 200, "snowball")!;
    const aval = simularQuitacao(dividas, 200, "avalanche")!;
    expect(snow.nuncaQuita).toBe(false);
    expect(aval.nuncaQuita).toBe(false);
    expect(aval.totalJuros).toBeLessThan(snow.totalJuros);
    expect(aval.meses).toBeLessThanOrEqual(snow.meses);
  });

  it("lista vazia → null", () => {
    expect(simularQuitacao([], 100, "snowball")).toBeNull();
  });
});
