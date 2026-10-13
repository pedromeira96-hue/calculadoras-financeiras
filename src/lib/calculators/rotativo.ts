/**
 * Calculadora do Rotativo do Cartão de Crédito.
 *
 * Metodologia: juros compostos sobre o saldo devedor mês a mês
 * (regra do crédito rotativo, BACEN). Pagamentos mensais abatem
 * o saldo após a incidência dos juros do mês.
 *
 * Referências: BACEN — Rotativo do cartão (Resolução CMN 3.910/2018:
 * parcela mínima ≥ 15% do saldo); taxas medianas de juros (BACEN/SGS).
 */

export interface RotativoInput {
  /** Saldo devedor inicial em R$. */
  saldoInicial: number;
  /** Taxa de juros mensal em decimal (0.15 = 15% a.m.). */
  taxaMensal: number;
  /** Pagamento mensal fixo em R$. */
  pagamentoMensal: number;
  /** Horizonte da simulação em meses. */
  meses: number;
}

export interface RotativoMes {
  mes: number;
  saldoInicio: number;
  juros: number;
  pagamento: number;
  saldoFim: number;
}

export interface RotativoResultado {
  linhas: RotativoMes[];
  totalJuros: number;
  totalPago: number;
  saldoFinal: number;
  /** true quando o pagamento mensal não cobre os juros do 1º mês (dívida nunca quita). */
  nuncaQuita: boolean;
  /** Mês em que a dívida foi quitada, ou null se não quitou no horizonte. */
  quitaEm: number | null;
  /** true se o saldo dobrou em algum momento da simulação. */
  saldoDobrouAte: boolean;
}

/** Meses para o saldo dobrar sem amortização: ln(2) / ln(1 + i). */
export function mesesParaDobrar(taxaMensal: number): number {
  if (taxaMensal <= 0) return Infinity;
  return Math.log(2) / Math.log(1 + taxaMensal);
}

export function simularRotativo(input: RotativoInput): RotativoResultado {
  const { saldoInicial, taxaMensal, pagamentoMensal, meses } = input;

  let saldo = saldoInicial;
  const linhas: RotativoMes[] = [];
  let totalJuros = 0;
  let totalPago = 0;
  let quitaEm: number | null = null;

  for (let mes = 1; mes <= meses && saldo > 0; mes++) {
    const saldoInicio = saldo;
    const juros = saldoInicio * taxaMensal;
    const saldoComJuros = saldoInicio + juros;

    let pagamento = Math.max(0, pagamentoMensal);
    if (pagamento >= saldoComJuros) {
      pagamento = saldoComJuros;
      totalJuros += juros;
      totalPago += pagamento;
      linhas.push({ mes, saldoInicio, juros, pagamento, saldoFim: 0 });
      quitaEm = mes;
      saldo = 0;
      break;
    }

    saldo = saldoComJuros - pagamento;
    totalJuros += juros;
    totalPago += pagamento;
    linhas.push({ mes, saldoInicio, juros, pagamento, saldoFim: saldo });
  }

  const jurosPrimeiroMes = saldoInicial * taxaMensal;
  const nuncaQuita = quitaEm === null && pagamentoMensal <= jurosPrimeiroMes;
  const saldoDobrouAte = linhas.some((l) => l.saldoFim >= saldoInicial * 2);

  return {
    linhas,
    totalJuros,
    totalPago,
    saldoFinal: saldo,
    nuncaQuita,
    quitaEm,
    saldoDobrouAte,
  };
}
