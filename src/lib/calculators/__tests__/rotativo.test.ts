import { describe, expect, it } from "vitest";
import { mesesParaDobrar, simularRotativo } from "../rotativo";

describe("mesesParaDobrar", () => {
  it("a 15% a.m. a dívida dobra em ~4,96 meses", () => {
    expect(mesesParaDobrar(0.15)).toBeCloseTo(4.96, 1);
  });

  it("taxa zero ou negativa não dobra", () => {
    expect(mesesParaDobrar(0)).toBe(Infinity);
  });
});

describe("simularRotativo", () => {
  it("sem pagamento: dívida cresce e dobra até o 5º mês", () => {
    const r = simularRotativo({ saldoInicial: 1000, taxaMensal: 0.15, pagamentoMensal: 0, meses: 24 });
    expect(r.quitaEm).toBeNull();
    expect(r.nuncaQuita).toBe(true);
    expect(r.saldoDobrouAte).toBe(true);
    // mês 5: 1000 × 1.15^5 ≈ 2.011,36
    expect(r.linhas[4].saldoFim).toBeGreaterThan(2000);
    expect(r.linhas[4].saldoFim).toBeLessThan(2100);
    // mês 24: 1000 × 1.15^24 ≈ 28.625,20
    expect(r.linhas[23].saldoFim).toBeCloseTo(28625.2, -2);
  });

  it("pagamento menor que os juros do 1º mês nunca quita e a dívida cresce", () => {
    const r = simularRotativo({ saldoInicial: 1000, taxaMensal: 0.15, pagamentoMensal: 100, meses: 24 });
    expect(r.nuncaQuita).toBe(true);
    expect(r.saldoFinal).toBeGreaterThan(1000);
    expect(r.quitaEm).toBeNull();
  });

  it("pagamento exatamente igual aos juros congela a dívida (caso limite)", () => {
    const r = simularRotativo({ saldoInicial: 1000, taxaMensal: 0.15, pagamentoMensal: 150, meses: 12 });
    expect(r.nuncaQuita).toBe(true);
    expect(r.saldoFinal).toBeCloseTo(1000, 5);
  });

  it("pagamento de R$500 quita em 3 meses com juros totais ≈ R$284,63", () => {
    const r = simularRotativo({ saldoInicial: 1000, taxaMensal: 0.15, pagamentoMensal: 500, meses: 24 });
    expect(r.quitaEm).toBe(3);
    expect(r.totalJuros).toBeCloseTo(284.625, 2);
    expect(r.saldoFinal).toBe(0);
    // pagamento final é truncado ao saldo remanescente
    expect(r.linhas[r.linhas.length - 1].pagamento).toBeCloseTo(284.625, 2);
  });

  it("pagamento maior que o saldo quita no 1º mês sem juros extras", () => {
    const r = simularRotativo({ saldoInicial: 1000, taxaMensal: 0.15, pagamentoMensal: 2000, meses: 12 });
    expect(r.quitaEm).toBe(1);
    expect(r.linhas[0].pagamento).toBeCloseTo(1150, 2);
    expect(r.saldoFinal).toBe(0);
  });
});
