import type { Metadata } from "next";
import Link from "next/link";
import { CURRENT_FEATURE } from "@/config/site";

export const metadata: Metadata = {
  title: undefined, // usa o default do layout
};

const CALCULADORAS = [
  {
    href: "/calculadora/rotativo-do-cartao",
    titulo: "Calculadora do Rotativo do Cartão",
    pergunta: "Quanto vira minha dívida pagando o mínimo?",
    emoji: "🔄",
    pronta: true,
  },
  {
    href: "/calculadora/custo-de-atrasar",
    titulo: "Quanto Custa Atrasar?",
    pergunta: "Boleto, parcela ou cheque especial: quanto custa por dia?",
    emoji: "⏰",
    pronta: true,
  },
  {
    href: "/calculadora/parcelado-ou-a-vista",
    titulo: "Parcelado Sem Juros ou À Vista?",
    pergunta: "Qual é a taxa escondida do parcelamento?",
    emoji: "💳",
    pronta: true,
  },
  {
    href: "/calculadora/bola-de-neve-ou-cascata",
    titulo: "Bola de Neve ou Cascata?",
    pergunta: "Qual estratégia quita suas dívidas mais barato?",
    emoji: "❄️",
    pronta: true,
  },
  {
    href: "/calculadora/reserva-de-emergencia",
    titulo: "Reserva de Emergência",
    pergunta: "Quanto guardar e onde rende mais (CDI x poupança)?",
    emoji: "🛡️",
    pronta: true,
  },
];

const DESTAQUE = CALCULADORAS.find((c) => c.href === CURRENT_FEATURE) ?? CALCULADORAS[0];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero "Viu no TikTok?" */}
      <section className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
          Viu no TikTok?
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
          Calcule agora: {DESTAQUE.pergunta}
        </h1>
        <p className="mt-3 max-w-2xl text-emerald-50">
          Ferramentas gratuitas com metodologia aberta. Você digita os seus números e vê o
          resultado na hora — sem cadastro, sem pegadinha.
        </p>
        <Link
          href={DESTAQUE.href}
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          Abrir a calculadora {DESTAQUE.emoji}
        </Link>
      </section>

      {/* Calculadoras */}
      <section id="calculadoras" aria-labelledby="calculadoras-titulo">
        <h2 id="calculadoras-titulo" className="text-2xl font-bold">
          Calculadoras
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULADORAS.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-500 hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden="true">
                  {c.emoji}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{c.titulo}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-600">{c.pergunta}</p>
                <span className="mt-3 text-sm font-medium text-emerald-700">
                  {c.pronta ? "Calcular agora →" : "Em construção →"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Confiança */}
      <section aria-labelledby="confianca-titulo" className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 id="confianca-titulo" className="text-xl font-bold">
          Por que confiar nestas contas?
        </h2>
        <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-slate-900">Metodologia aberta</h3>
            <p className="mt-1">
              Cada calculadora mostra a fórmula, as premissas e as fontes (BACEN, CDC, Receita
              Federal). Confira você mesmo na página de{" "}
              <Link href="/metodologia" className="text-emerald-700 underline">
                metodologia
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Você no controle</h3>
            <p className="mt-1">
              Nenhuma taxa é escondida: todos os juros e multas são campos editáveis com
              padrões conservadores documentados.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Sem recomendação</h3>
            <p className="mt-1">
              Conteúdo educacional. Não vendemos produtos financeiros e nada aqui é
              recomendação de investimento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
