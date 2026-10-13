/**
 * Calculadora Parcelado "Sem Juros" x À Vista com Desconto.
 *
 * Metodologia:
 * - A taxa implícita do parcelamento é a TIR mensal que iguala o preço
 *   à vista ao valor presente das parcelas: PV = parcela × (1-(1+i)^-n)/i.
 *   Resolvida por bisseção (função pura, sem dependências).
 * - Comparação de patrimônio em N meses: quem paga à vista investe a
 *   diferença; quem parcela mantém o dinheiro investido e saca parcelas.
 *
 * Matemática financeira padrão (sem fonte regulatória — é conta pura).
 */

export interface ParceladoInput {
  /** Preço total anunciado (base das parcelas "sem juros"). */
  precoTotal: number;
  /** Número de parcelas. */
  parcelas: number;
  /** Desconto à vista em decimal (0.10 = 10%). */
  descontoAVistaPct: number;
  /** Rentabilidade anual alternativa em decimal (ex.: CDI 0.145). */
  rentabilidadeAnualPct: number;
}

export interface ParceladoResultado {
  precoAVista: number;
  valorParcela: number;
  /** TIR mensal implícita no parcelamento (decimal). */
  taxaImplicitaMensal: number;
  /** TIR anualizada: (1+i)^12 - 1. */
  taxaImplicitaAnual: number;
  /** Patrimônio em N meses pagando à vista e investindo a diferença. */
  vfAVista: number;
  /** Patrimônio em N meses parcelando e sacando as parcelas do investimento. */
  vfParcelado: number;
  /** vfAVista - vfParcelado (>0 → à vista vence). */
  vantagemAVista: number;
  /** Taxa mensal da rentabilidade alternativa. */
  taxaMensalInvestimento: number;
}

/** Valor presente de uma anuidade ordinária de n parcelas à taxa i. */
export function valorPresenteParcelas(parcela: number, n: number, i: number): number {
  if (i <= 0) return parcela * n;
  return (parcela * (1 - Math.pow(1 + i, -n))) / i;
}

/** Resolve a TIR mensal por bisseção (PV alvo = preço à vista). */
export function taxaImplicitaMensal(precoAVista: number, parcela: number, n: number): number {
  let lo = 0;
  let hi = 5; // 500% a.m. — limite superior generous para convergir
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    const pv = valorPresenteParcelas(parcela, n, mid);
    if (pv > precoAVista) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function simularParcelado(input: ParceladoInput): ParceladoResultado | null {
  const { precoTotal, parcelas, descontoAVistaPct, rentabilidadeAnualPct } = input;
  if (precoTotal <= 0 || parcelas <= 0) return null;

  const precoAVista = precoTotal * (1 - descontoAVistaPct);
  const valorParcela = precoTotal / parcelas;

  const iImpl = taxaImplicitaMensal(precoAVista, valorParcela, parcelas);
  const taxaImplicitaAnual = Math.pow(1 + iImpl, 12) - 1;

  const taxaMensalInvestimento = Math.pow(1 + rentabilidadeAnualPct, 1 / 12) - 1;
  const iInv = taxaMensalInvestimento;
  const n = parcelas;

  // Cenário à vista: diferença (precoTotal - precoAVista) investida por N meses.
  const vfAVista = (precoTotal - precoAVista) * Math.pow(1 + iInv, n);

  // Cenário parcelado: valor total investido, sacando uma parcela por mês
  // (anuidade ordinária: saque ao fim de cada mês).
  const vfBruto = precoTotal * Math.pow(1 + iInv, n);
  const vfSaques =
    iInv > 0 ? (valorParcela * (Math.pow(1 + iInv, n) - 1)) / iInv : valorParcela * n;
  const vfParcelado = vfBruto - vfSaques;

  return {
    precoAVista,
    valorParcela,
    taxaImplicitaMensal: iImpl,
    taxaImplicitaAnual,
    vfAVista,
    vfParcelado,
    vantagemAVista: vfAVista - vfParcelado,
    taxaMensalInvestimento,
  };
}
