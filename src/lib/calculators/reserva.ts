/**
 * Calculadora de Reserva de Emergência: valor-alvo + CDI x Poupança.
 *
 * Metodologia:
 * - Valor-alvo: gasto mensal essencial × meses de cobertura.
 * - Poupança (Lei 12.703/2012 / Decreto 8.266/2014): quando a Selic anual
 *   for maior que 8,5% a.a., a remuneração é 0,5% a.m. + TR; quando for
 *   menor ou igual, 70% da Selic + TR. Aqui usamos o equivalente mensal
 *   de 70% da taxa Selic anualizada.
 * - CDB no CDI líquido: CDI anual × % do produto × (1 - IR da tabela
 *   regressiva — padrão 17,5% para prazos entre 181 e 360 dias, RFB).
 *   Come-cotas semestral do CDB não é simulado (aproximação conservadora
 *   documentada na metodologia).
 */

export interface ReservaInput {
  gastoMensal: number;
  mesesCobertura: number;
  aporteInicial: number;
  aporteMensal: number;
  /** CDI bruto anual em decimal (0.145 = 14,5% a.a.). */
  cdiAnualPct: number;
  /** % do CDI pago pelo produto (1.0 = CDB 100% CDI). */
  pctDoCdi: number;
  /** IR aplicado ao rendimento em decimal (0.175). */
  irPct: number;
  /** Selic anual em decimal (define a regra da poupança). */
  selicAnualPct: number;
  /** TR mensal em decimal (padrão 0). */
  trMensalPct: number;
}

export interface PontoProjecao {
  mes: number;
  cdb: number;
  poupanca: number;
}

export interface ReservaResultado {
  valorAlvo: number;
  taxaCdbMensal: number;
  taxaPoupancaMensal: number;
  mesesCdb: number | null;
  mesesPoupanca: number | null;
  projecao: PontoProjecao[];
  /** Diferença de patrimônio CDB x poupança em 24 meses. */
  diferenca24: number;
}

const LIMITE_MESES = 600;

/** Taxa mensal da poupança conforme a regra da Lei 12.703/2012. */
export function taxaPoupancaMensal(selicAnualPct: number, trMensalPct: number): number {
  if (selicAnualPct > 0.085) {
    return 0.005 + trMensalPct;
  }
  // 70% da Selic anualizada, convertida para mensal composta.
  const equivalenteAnual = 0.7 * selicAnualPct;
  return Math.pow(1 + equivalenteAnual, 1 / 12) - 1 + trMensalPct;
}

/** Evolução do saldo com aporte inicial + aportes mensais à taxa i. */
export function projetarSaldo(
  inicial: number,
  aporte: number,
  taxaMensal: number,
  meses: number,
): number {
  let saldo = inicial;
  for (let m = 0; m < meses; m++) {
    saldo = saldo * (1 + taxaMensal) + aporte;
  }
  return saldo;
}

/** Meses necessários para atingir o alvo (null se nunca atingir). */
export function mesesParaAlvo(
  inicial: number,
  aporte: number,
  taxaMensal: number,
  alvo: number,
): number | null {
  if (inicial >= alvo) return 0;
  let saldo = inicial;
  for (let m = 1; m <= LIMITE_MESES; m++) {
    saldo = saldo * (1 + taxaMensal) + aporte;
    if (saldo >= alvo) return m;
  }
  return null;
}

export function simularReserva(input: ReservaInput): ReservaResultado | null {
  const {
    gastoMensal,
    mesesCobertura,
    aporteInicial,
    aporteMensal,
    cdiAnualPct,
    pctDoCdi,
    irPct,
    selicAnualPct,
    trMensalPct,
  } = input;

  if (gastoMensal <= 0 || mesesCobertura <= 0) return null;

  const valorAlvo = gastoMensal * mesesCobertura;

  const cdbLiquidoAnual = cdiAnualPct * pctDoCdi * (1 - irPct);
  const taxaCdbMensal = Math.pow(1 + cdbLiquidoAnual, 1 / 12) - 1;
  const taxaPoupanca = taxaPoupancaMensal(selicAnualPct, trMensalPct);

  const mesesCdb = mesesParaAlvo(aporteInicial, aporteMensal, taxaCdbMensal, valorAlvo);
  const mesesPoupanca = mesesParaAlvo(aporteInicial, aporteMensal, taxaPoupanca, valorAlvo);

  const projecao = [12, 24, 36].map((mes) => ({
    mes,
    cdb: projetarSaldo(aporteInicial, aporteMensal, taxaCdbMensal, mes),
    poupanca: projetarSaldo(aporteInicial, aporteMensal, taxaPoupanca, mes),
  }));

  const p24 = projecao.find((p) => p.mes === 24)!;

  return {
    valorAlvo,
    taxaCdbMensal,
    taxaPoupancaMensal: taxaPoupanca,
    mesesCdb,
    mesesPoupanca,
    projecao,
    diferenca24: p24.cdb - p24.poupanca,
  };
}
