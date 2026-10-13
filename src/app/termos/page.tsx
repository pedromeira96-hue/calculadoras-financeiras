import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso das calculadoras e conteúdos do ContaDívida.",
  alternates: { canonical: `${SITE_URL}/termos` },
};

export default function PaginaTermos() {
  return (
    <article className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Termos de Uso</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Natureza do conteúdo</h2>
        <p className="text-slate-700">
          O ContaDívida é um site educacional. As calculadoras são simulações matemáticas com
          parâmetros definidos por você. <strong>Nada aqui é recomendação de investimento,
          orientação financeira, jurídica ou consultoria.</strong> As regras do seu contrato e a
          regulamentação vigente prevalecem sobre qualquer simulação.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Limitação de responsabilidade</h2>
        <p className="text-slate-700">
          Apesar do compromisso com fórmulas e fontes corretas, os resultados são estimativas:
          não consideram IOF, tarifas, correções monetárias ou condições específicas do seu
          contrato. Decisões financeiras não devem se basear exclusivamente neste site.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Uso permitido</h2>
        <p className="text-slate-700">
          É permitido usar as calculadoras para fins pessoais, citar resultados em estudos e
          conteúdos próprios (com link para a fonte). Não é permitido copiar o conteúdo do site
          em massa, republicá-lo como seu ou usar as ferramentas de forma automatizada que
          sobrecarregue o serviço.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Publicidade e afiliados</h2>
        <p className="text-slate-700">
          O site pode exibir anúncios e links de afiliados, identificados como tal. A presença
          de anúncio não caracteriza recomendação editorial do produto anunciado.
        </p>
      </section>
    </article>
  );
}
