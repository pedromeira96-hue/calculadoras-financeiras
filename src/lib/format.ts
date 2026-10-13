const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata número como moeda brasileira (R$ 1.234,56). */
export function brl(valor: number): string {
  return brlFormatter.format(valor);
}

/** Formata número com até 2 casas (sem símbolo). */
export function num(valor: number, casas = 2): string {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: casas,
    minimumFractionDigits: 0,
  }).format(valor);
}
