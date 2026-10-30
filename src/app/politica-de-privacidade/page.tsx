import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade (LGPD)",
  description: "Como o ContaDívida coleta, usa e protege seus dados pessoais.",
  alternates: { canonical: SITE_URL + "/politica-de-privacidade" },
};

export default function PaginaPrivacidade() {
  return (
    <article className="max-w-4xl mx-auto space-y-10 px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-slate-500">Última atualização: <strong>2026-10-29</strong> | Versão 1.0</p>
        <p className="mt-2 text-slate-600">O ContaDívida respeita sua privacidade.</p>
      </header>
      <section id="controlador">
        <h2 className="text-2xl font-bold text-slate-900">1. Controlador e Encarregado (DPO)</h2>
        <dl className="mt-3 space-y-2 text-sm text-slate-700">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="font-semibold text-slate-900">Controlador:</dt><dd>Pedro Henrique</dd>
            <dt className="font-semibold text-slate-900">Nome do site:</dt><dd>ContaDívida</dd>
            <dt className="font-semibold text-slate-900">URL:</dt><dd>https://calculadoras-financeiras-sooty.vercel.app</dd>
            <dt className="font-semibold text-slate-900">Encarregado (DPO):</dt><dd>Pedro Henrique</dd>
            <dt className="font-semibold text-slate-900">E-mail do DPO:</dt><dd><a href="mailto:contato@contadivida.com.br" className="text-emerald-700 underline">contato@contadivida.com.br</a></dd>
          </div>
        </dl>
      </section>
      <section id="dados">
        <h2 className="text-2xl font-bold text-slate-900">2. Dados Coletados e Finalidades</h2>
        <p className="mt-2 text-slate-600">O site <strong>não exige cadastro</strong> para usar as calculadoras. Os dados são processados <strong>localmente no seu navegador</strong> e <strong>não são enviados a nenhum servidor</strong>.</p>
      </section>
      <section id="base-legal">
        <h2 className="text-2xl font-bold text-slate-900">3. Base Legal (LGPD Art. 7º)</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li><strong>Consentimento (Art. 7º, I):</strong> Cookies de publicidade, formulários de contato, e-mails.</li>
          <li><strong>Legítimo interesse (Art. 7º, IX):</strong> Analytics anonimizado (GA4), segurança, prevenção de fraude, melhoria contínua do site.</li>
          <li><strong>Não coletamos:</strong> Dados sensíveis (Art. 11), dados de crianças (Art. 14), dados biométricos.</li>
        </ul>
      </section>
      <section id="cookies">
        <h2 className="text-2xl font-bold text-slate-900">4. Cookies e Tecnologias Similares</h2>
        <p className="mt-2 text-slate-600">Usamos cookies para: (1) lembrar seu consentimento, (2) analytics anonimizado, (3) publicidade personalizada (após consentimento).</p>
      </section>
      <section id="compartilhamento">
        <h2 className="text-2xl font-bold text-slate-900">5. Compartilhamento com Terceiros</h2>
        <p className="mt-2 text-slate-600">Não vendemos seus dados. Compartilhamos apenas com Google (Analytics, AdSense) e Vercel (hospedagem).</p>
      </section>
      <section id="retencao">
        <h2 className="text-2xl font-bold text-slate-900">6. Retenção e Exclusão</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li><strong>Analytics (GA4):</strong> 14 meses (padrão GA4), depois anonimizado.</li>
          <li><strong>Cookies de publicidade:</strong> Conforme política do provedor (Google: até 13 meses).</li>
          <li><strong>Cookies de consentimento:</strong> 1 ano (renovado a cada visita).</li>
          <li><strong>E-mails de contato:</strong> 12 meses após última resposta, depois excluídos.</li>
          <li><strong>Dados das calculadoras:</strong> <strong>Zero retenção</strong> — processados no seu navegador.</li>
        </ul>
      </section>
      <section id="direitos">
        <h2 className="text-2xl font-bold text-slate-900">7. Seus Direitos (LGPD Art. 18)</h2>
        <p className="mt-2 text-slate-600">Você pode, a qualquer momento, gratuitamente:</p>
        <ol className="mt-3 space-y-2 text-sm text-slate-700 list-decimal pl-5">
          <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e quais.</li>
          <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados.</li>
          <li><strong>Anonimização, bloqueio ou eliminação:</strong> De dados desnecessários, excessivos ou tratados em desconformidade.</li>
          <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado.</li>
          <li><strong>Eliminação:</strong> Pedir exclusão de dados tratados com consentimento.</li>
          <li><strong>Informação sobre compartilhamento:</strong> Com quem seus dados foram compartilhados.</li>
          <li><strong>Revogação do consentimento:</strong> Retirar consentimento a qualquer momento.</li>
          <li><strong>Oposição:</strong> Opor-se a tratamento baseado em legítimo interesse.</li>
        </ol>
      </section>
      <section id="seguranca">
        <h2 className="text-2xl font-bold text-slate-900">8. Segurança da Informação</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li><strong>HTTPS/TLS 1.3:</strong> Todo tráfego criptografado (Vercel + Let's Encrypt).</li>
          <li><strong>Headers de segurança:</strong> CSP, HSTS, X-Frame-Options, Referrer-Policy configurados.</li>
          <li><strong>Dados sensíveis:</strong> Não coletamos senhas, CPF, conta bancária, biométricos.</li>
          <li><strong>Processamento local:</strong> Calculadoras rodam 100% no seu navegador.</li>
        </ul>
      </section>
      <section id="internacional">
        <h2 className="text-2xl font-bold text-slate-900">9. Transferência Internacional</h2>
        <p className="mt-2 text-slate-600">Google e Vercel podem processar dados nos EUA. Ambos oferecem garantias adequadas (SCC, ISO 27001, SOC 2).</p>
      </section>
      <section id="alteracoes">
        <h2 className="text-2xl font-bold text-slate-900">10. Alterações nesta Política</h2>
        <p className="mt-2 text-slate-600">Esta política pode ser atualizada. A versão vigente estará sempre nesta página com a data de atualização no topo.</p>
      </section>
      <section id="contato">
        <h2 className="text-2xl font-bold text-slate-900">11. Contato do Encarregado (DPO)</h2>
        <dl className="mt-3 space-y-2 text-sm text-slate-700">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="font-semibold text-slate-900">Encarregado (DPO):</dt><dd>Pedro Henrique</dd>
            <dt className="font-semibold text-slate-900">E-mail:</dt><dd><a href="mailto:contato@contadivida.com.br" className="text-emerald-700 underline">contato@contadivida.com.br</a></dd>
            <dt className="font-semibold text-slate-900">Assunto sugerido:</dt><dd>"LGPD - [Direitos / Dúvida / Incidente / Sugestão]"</dd>
            <dt className="font-semibold text-slate-900">Prazo de resposta:</dt><dd>Até 15 dias corridos (Art. 18, §1º LGPD)</dd>
          </div>
        </dl>
      </section>
      <nav aria-label="Navegação relacionada" className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-slate-900">Relacionado:</h2>
        <ul className="mt-2 space-y-1">
          <li><a href="/termos" className="text-emerald-700 underline">Termos de Uso</a></li>
          <li><a href="/metodologia" className="text-emerald-700 underline">Metodologia e Fontes</a></li>
          <li><a href="/autor" className="text-emerald-700 underline">Quem faz as contas</a></li>
        </ul>
      </nav>
    </article>
  );
}