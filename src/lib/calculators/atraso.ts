/**
 * Calculadora "Quanto Custa Atrasar" — boleto, parcela e cheque especial.
 *
 * Metodologia:
 * - Boleto/parcela atrasados: multa contratual de até 2% sobre o valor
 *   (teto do CDC, Lei 8.078/1990, art. 52, §1º) + juros de mora compostos
 *   sobre o prazo (padrão comum contratual: 1% a.m. — sempre editável).
 * - Cheque especial: juros compostos à taxa mensal do banco, sem multa.
 *
 * Nota: IOF e tarifas NÃO estão incluídos (simulação conservadora).
 */

export interface AtrasoResultado {
  /** Valor total a pagar no fim do atraso. */
  total: number;
  /** Custo do atraso (total - valor original). */
  custoTotal: number;
  /** Custo médio por dia de atraso. */
  custoPorDia: number;
}

export interface AtrasoInput {
  /** Valor original em R$. */
  valor: number;
  /** Dias de atraso. */
  dias: number;
  /** Multa sobre o valor em decimal (0.02 = 2%). */
  multaPct: number;
  /** Juros de mora mensais em decimal (0.01 = 1% a.m.). */
  jurosMensalPct: number;
}

/** Custo de atrasar boleto ou parcela: valor × (1 + multa) × (1 + juros)^(dias/30). */
export function custoAtraso({ valor, dias, multaPct, jurosMensalPct }: AtrasoInput): AtrasoResultado {
  if (dias <= 0 || valor <= 0) {
    return { total: valor, custoTotal: 0, custoPorDia: 0 };
  }
  const total = valor * (1 + multaPct) * Math.pow(1 + jurosMensalPct, dias / 30);
  const custoTotal = total - valor;
  return { total, custoTotal, custoPorDia: custoTotal / dias };
}

/** Custo do cheque especial: valor × (1 + taxa)^(dias/30), sem multa. */
export function custoChequeEspecial({
  valor,
  dias,
  taxaMensalPct,
}: {
  valor: number;
  dias: number;
  taxaMensalPct: number;
}): AtrasoResultado {
  if (dias <= 0 || valor <= 0) {
    return { total: valor, custoTotal: 0, custoPorDia: 0 };
  }
  const total = valor * Math.pow(1 + taxaMensalPct, dias / 30);
  const custoTotal = total - valor;
  return { total, custoTotal, custoPorDia: custoTotal / dias };
}
