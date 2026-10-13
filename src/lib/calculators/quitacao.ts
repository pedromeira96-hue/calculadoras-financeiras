/**
 * Simulador de quitação: Bola de Neve x Bola de Cascata.
 *
 * - Snowball (bola de neve): atacar a dívida de MENOR valor primeiro
 *   (ganho motivacional).
 * - Avalanche (cascata): atacar a dívida de MAIOR taxa primeiro
 *   (ótima em juros).
 *
 * Simulação mês a mês: juros compostos sobre cada saldo; o orçamento
 * mensal é CONSTANTE (mínimos de todas as dívidas + extra). Quando uma
 * dívida quita, o valor liberado rola para a próxima alvo — o efeito
 * "bola de neve" financeira.
 */

export interface Divida {
  nome: string;
  valor: number;
  /** Taxa mensal em decimal (0.15 = 15% a.m.). */
  taxaMensal: number;
  pagamentoMinimo: number;
}

export type Estrategia = "snowball" | "avalanche";

export interface QuitacaoResultado {
  /** Nomes das dívidas na ordem de ataque. */
  ordem: string[];
  meses: number;
  totalJuros: number;
  totalPago: number;
  /** true se não quitou dentro do limite de 360 meses. */
  nuncaQuita: boolean;
}

const LIMITE_MESES = 360;
const EPS = 0.005; // tolerância de meio centavo

function ordenar(dividas: Divida[], estrategia: Estrategia): Divida[] {
  const copia = [...dividas];
  if (estrategia === "snowball") {
    copia.sort((a, b) => a.valor - b.valor);
  } else {
    copia.sort((a, b) => b.taxaMensal - a.taxaMensal);
  }
  return copia;
}

export function simularQuitacao(
  dividasIniciais: Divida[],
  extraMensal: number,
  estrategia: Estrategia,
): QuitacaoResultado | null {
  if (dividasIniciais.length === 0) return null;

  const dividasOriginais = dividasIniciais.length;

  // Orçamento constante: mínimo de TODAS as dívidas + extra.
  // Dívida que quita libera o mínimo, que rola para o próximo alvo.
  const orcamentoFixo =
    extraMensal + dividasIniciais.reduce((s, d) => s + d.pagamentoMinimo, 0);

  const ordem = ordenar(dividasIniciais, estrategia).map((d) => d.nome);

  let ativas: Divida[] = dividasIniciais.map((d) => ({ ...d }));
  let totalJuros = 0;
  let totalPago = 0;
  let mes = 0;
  let nuncaQuita = true;

  while (ativas.length > 0 && mes < LIMITE_MESES) {
    mes++;

    // 1. Juros do mês sobre cada saldo ativo (compostos).
    for (const d of ativas) {
      const juros = d.valor * d.taxaMensal;
      d.valor += juros;
      totalJuros += juros;
    }

    let orcamento = orcamentoFixo;

    // 2. Paga os mínimos das dívidas ativas (limitado ao saldo).
    for (const d of ativas) {
      const pgto = Math.min(d.pagamentoMinimo, d.valor, orcamento);
      d.valor -= pgto;
      orcamento -= pgto;
      totalPago += pgto;
    }

    // 3. Aplica o restante na ordem da estratégia (efeito bola de neve).
    const ordenadas = ordenar(ativas, estrategia);
    for (const d of ordenadas) {
      if (orcamento <= EPS) break;
      const pgto = Math.min(orcamento, d.valor);
      d.valor -= pgto;
      orcamento -= pgto;
      totalPago += pgto;
    }

    // 4. Verificação de viabilidade: se o orçamento total não cobre nem
    //    os juros do mês e nenhuma dívida saiu, o plano não quita nunca.
    const jurosProximoMes = ativas.reduce((s, d) => s + d.valor * d.taxaMensal, 0);
    const ativasAgora = ativas.filter((d) => d.valor > EPS).length;
    if (ativasAgora === ativas.length && ativas.length === dividasOriginais) {
      if (orcamentoFixo <= jurosProximoMes) break;
    }
    ativas = ativas.filter((d) => d.valor > EPS);

    if (ativas.length === 0) {
      nuncaQuita = false;
      break;
    }
  }

  if (ativas.length === 0) nuncaQuita = false;

  return { ordem, meses: mes, totalJuros, totalPago, nuncaQuita };
}
