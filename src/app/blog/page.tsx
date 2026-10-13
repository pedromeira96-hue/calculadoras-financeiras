import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre dívidas, juros e finanças pessoais — cada texto ligado a uma calculadora para você conferir a conta.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function PaginaBlog() {
  return (
    <article className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="text-slate-600">
        Cada artigo termina na mesma pergunta: <em>“e no SEU caso, quanto é?”</em> — e aponta
        para a calculadora que responde.
      </p>
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        <p className="font-medium text-slate-700">Primeiros artigos chegando.</p>
        <p className="mt-1 text-sm">
          Enquanto isso,{" "}
          <Link href="/#calculadoras" className="text-emerald-700 underline">
            use as calculadoras
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
