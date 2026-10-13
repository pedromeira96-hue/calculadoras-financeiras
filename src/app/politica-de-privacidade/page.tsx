import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o ContaDívida trata dados pessoais, cookies e publicidade (LGPD).",
  alternates: { canonical: `${SITE_URL}/politica-de-privacidade` },
};

export default function PaginaPrivacidade() {
  return (
    <article className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Política de Privacidade</h1>
      <p className="text-sm text-slate-500">Última atualização: outubro de 2026</p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Dados que não coletamos</h2>
        <p className="text-slate-700">
          As calculadoras funcionam inteiramente no seu navegador. Os valores que você digita
          (saldo, taxas, prazos) não são enviados para nenhum servidor — a conta é feita no seu
          aparelho e desaparece quando você fecha a página. Não exigimos cadastro, login ou
          e-mail para usar as ferramentas.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Cookies e publicidade</h2>
        <p className="text-slate-700">
          O site pode utilizar cookies de publicidade (como Google AdSense) e ferramentas de
          medição de audiência. Esses parceiros podem usar cookies para exibir anúncios
          personalizados conforme o uso do navegador. Você pode desativar a personalização nas
          configurações de anúncios do provedor e/ou limpar cookies a qualquer momento.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Seus direitos (LGPD)</h2>
        <p className="text-slate-700">
          Nos termos da Lei nº 13.709/2018 (LGPD), você pode solicitar informações sobre
          tratamento de dados, acessar, corrigir ou excluir dados pessoais. Como não mantemos
          base de dados de usuários, normalmente não há nada a acessar ou excluir.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Mudanças nesta política</h2>
        <p className="text-slate-700">
          Esta política pode ser atualizada para refletir novos recursos do site. A versão
          vigente estará sempre nesta página, com a data de atualização.
        </p>
      </section>
    </article>
  );
}
