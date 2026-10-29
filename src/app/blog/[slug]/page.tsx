import type { Metadata } from "next";
import { getArtigo, getArtigoSlugs, type Artigo } from "@/lib/articles-index";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const artigo = getArtigo(resolvedParams.slug);
  if (!artigo) {
    return { title: "Artigo não encontrado" };
  }
  return {
    title: artigo.titulo,
    description: artigo.descricao,
    alternates: {
      canonical: `https://contadivida.com.br/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: artigo.titulo,
      description: artigo.descricao,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const slugs = getArtigoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PaginaArtigo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const artigo = getArtigo(resolvedParams.slug);

  if (!artigo) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8 px-4 py-8">
      <nav className="text-sm text-slate-500">
        <a
          href="/blog"
          className="text-emerald-700 hover:underline"
        >
          ← Voltar ao blog
        </a>
      </nav>

      <header className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
          ContaDívida
        </span>
        <h1 className="text-3xl font-bold text-slate-900">{artigo.titulo}</h1>
        <p className="text-lg text-slate-600">{artigo.descricao}</p>
      </header>

      <div className="prose prose-lg text-slate-700 space-y-6">
        {artigo.conteudo.map((c, i) => {
          if (c.tipo === "h2") {
            return (
              <h2 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3">
                {c.texto}
              </h2>
            );
          }
          if (c.tipo === "cta" && c.link && c.linkLabel) {
            return (
              <div key={i} className="my-6">
                <a
                  href={c.link}
                  className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition"
                >
                  {c.linkLabel} {artigo.calculadora.emoji}
                </a>
              </div>
            );
          }
          if (c.tipo === "alerta") {
            return (
              <div key={i} className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                ⚠️ {c.texto}
              </div>
            );
          }
          return (
            <p key={i} className="leading-relaxed text-slate-700">
              {c.texto}
            </p>
          );
        })}
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Perguntas frequentes</h2>
        {artigo.faq.map((f) => (
          <details key={f.q} className="rounded-lg border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-slate-800">
              {f.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {f.a}
            </p>
          </details>
        ))}
      </section>

      <nav aria-label="Relacionados" className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-slate-900">Continue a conta:</h2>
        <ul className="mt-2 space-y-1">
          <li>
            <a
              href={artigo.calculadora.href}
              className="text-emerald-700 underline"
            >
              {artigo.calculadora.emoji} {artigo.calculadora.label}
            </a>
          </li>
        </ul>
      </nav>
    </article>
  );
}