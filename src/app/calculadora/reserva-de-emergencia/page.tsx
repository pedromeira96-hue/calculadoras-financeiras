import type { Metadata } from "next";
import EmConstrucao from "@/components/EmConstrucao";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Calculadora Reserva de Emergência: CDI x Poupança",
  description:
    "Calcule o valor ideal da sua reserva e compare CDB no CDI x poupança com IR e regras reais. Metas por aporte mensal.",
  alternates: { canonical: `${SITE_URL}/calculadora/reserva-de-emergencia` },
};

export default function PaginaReserva() {
  return (
    <article className="space-y-8">
      <header>
        <p aria-hidden="true" className="text-3xl">🛡️</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Reserva de Emergência: quanto guardar e onde render mais
        </h1>
      </header>
      <EmConstrucao
        titulo="Calculadora de reserva de emergência"
        pergunta="Descubra o valor-alvo da sua reserva e compare o rendimento real de CDB no CDI x poupança, já descontando o IR."
        prazo="próxima onda de desenvolvimento (M1.2)"
      />
    </article>
  );
}
