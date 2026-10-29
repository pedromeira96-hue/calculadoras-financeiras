import type { Metadata } from "next";
import Link from "next/link";
import { ALL_ARTICLES } from "@/lib/articles-index";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre dívidas, juros e finanças pessoais — cada texto ligado a uma calculadora para você conferir a conta.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function PaginaBlog() {
  return (
    <article className="space-y-8 px-4 py-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="text-slate-600">
        Cada artigo termina na mesma pergunta:{" "}
        <em>“e no SEU caso, quanto é?”</em> — e aponta para a calculadora que responde.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_ARTICLES.map((a) => (
          <a
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-500 hover:shadow-sm transition"
          >
            <h3 className="text-lg font-bold text-slate-900">{a.titulo}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {a.descricao}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
              Ler artigo →
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}
