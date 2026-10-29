import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Metodologia e Fontes",
  description:
    "Fórmulas, premissas, fontes oficiais, histórico de revisões e declaração de independência do ContaDívida.",
  alternates: { canonical: `${SITE_URL}/metodologia` },
};

const revisoes = [
  {
    calculadora: "Rotativo do Cartão",
    data: "2026-10-29",
    versao: "1.0",
    alteracao: "Lançamento inicial: juros compostos sobre saldo devedor, parcela mínima ≥ 15% (Res. CMN 3.910/2018), taxa padrão 15% a.m. editável, IOF não incluído.",
    revisor: "Pedro Henrique",
  },
  {
    calculadora: "Custo de Atrasar (Boleto/Parcela/Cheque Especial)",
    data: "2026-10-29",
    versao: "1.0",
    alteracao: "Lançamento inicial: multa 2% (CDC art. 52 §1º), juros mora 1% a.m. padrão contratual, cheque especial taxa do banco. IOF/tarifas não incluídos.",
    revisor: "Pedro Henrique",
  },
  {
    calculadora: "Parcelado vs À Vista",
    data: "2026-10-29",
    versao: "1.0",
    alteracao: "Lançamento inicial: TIR mensal implícita no parcelamento, comparação patrimonial à vista + investimento vs parcelado. Rentabilidade informada pelo usuário.",
    revisor: "Pedro Henrique",
  },
  {
    calculadora: "Bola de Neve vs Cascata",
    data: "2026-10-29",
    versao: "1.0",
    alteracao: "Lançamento inicial: simulação mês a mês com juros compostos, orçamento fixo (mínimos + extra), rollover do mínimo quitado. Snowball (menor valor) vs Avalanche (maior taxa).",
    revisor: "Pedro Henrique",
  },
  {
    calculadora: "Reserva de Emergência",
    data: "2026-10-29",
    versao: "1.0",
    alteracao: "Lançamento inicial: valor-alvo = gasto × meses; poupança regra Lei 12.703/2012 (Selic >8,5% → 0,5%+TR; ≤8,5% → 70% Selic+TR); CDB líquido CDI × %produto × (1-IR). Come-cotas não simulado.",
    revisor: "Pedro Henrique",
  },
];

const fontesOficiais = [
  {
    orgao: "Banco Central do Brasil",
    referencia: "SGS - Sistema de Expectativas de Mercado / Taxas de Juros",
    url: "https://www.bcb.gov.br/estabilidadefinanceira/taxasdejuros",
    usadoEm: ["Rotativo", "Cheque Especial", "Selic/CDI"],
  },
  {
    orgao: "Banco Central do Brasil",
    referencia: "Resolução CMN 3.910/2018 - Parcela mínima do rotativo ≥ 15%",
    url: "https://www.bcb.gov.br/pre/normativos/res/2018/pdf/res_3910_v1_O.pdf",
    usadoEm: ["Rotativo do Cartão"],
  },
  {
    orgao: "Presidência da República",
    referencia: "Lei 8.078/1990 - CDC, art. 52, §1º (multa máxima 2%)",
    url: "http://www.planalto.gov.br/ccivil_03/leis/l8078.htm",
    usadoEm: ["Custo de Atrasar"],
  },
  {
    orgao: "Presidência da República",
    referencia: "Código Civil - Lei 10.406/2002, art. 406 (juros de mora)",
    url: "http://www.planalto.gov.br/ccivil_03/leis/2002/l10406.htm",
    usadoEm: ["Custo de Atrasar"],
  },
  {
    orgao: "Presidência da República",
    referencia: "Lei 12.703/2012 - Remuneração da poupança",
    url: "http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12703.htm",
    usadoEm: ["Reserva de Emergência"],
  },
  {
    orgao: "Presidência da República",
    referencia: "Decreto 8.266/2014 - Regulamenta Lei 12.703/2012 (poupança)",
    url: "http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/decreto/d8266.htm",
    usadoEm: ["Reserva de Emergência"],
  },
  {
    orgao: "Receita Federal do Brasil",
    referencia: "Tabela regressiva IR renda fixa (22,5% ≤180d; 17,5% 181-360d; 15% >360d)",
    url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabela-de-incidencia-do-irpf",
    usadoEm: ["Reserva de Emergência", "CDB/Investimentos"],
  },
  {
    orgao: "B3",
    referencia: "Definição CDI (≈ Selic - 0,10 p.p.)",
    url: "https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/taxas/cdi/",
    usadoEm: ["Reserva de Emergência", "Parcelado vs À Vista"],
  },
];

export default function PaginaMetodologia() {
  return (
    <article className="max-w-4xl mx-auto space-y-10 px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">Metodologia, Fontes e Revisões</h1>
        <p className="mt-2 text-slate-600">
          Transparência total: cada calculadora mostra a fórmula, as premissas, as fontes oficiais e o histórico de revisões.
          Não há caixas-pretas — você pode auditar cada número.
        </p>
        <p className="mt-2 text-sm text-emerald-700 font-medium">
          Última atualização desta página: 2026-10-29
        </p>
      </header>

      {/* Declaração de Independência */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
          <span>⚖️</span> Declaração de Independência Editorial
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-amber-900">
          <li>✅ <strong>Sem patrocínio bancário:</strong> Não recebemos comissão, taxa ou incentivo de bancos, financeiras, corretoras ou administradoras de cartão.</li>
          <li>✅ <strong>Sem conflito de interesse:</strong> As taxas padrão são conservadoras e editáveis; você insere a taxa do seu contrato.</li>
          <li>✅ <strong>Não vendemos produtos financeiros:</strong> Não somos corretora, banco, seguradora ou correspondente bancário.</li>
          <li>✅ <strong>Monetização transparente:</strong> Anúncios (AdSense) e links de afiliados (quando houver) são claramente identificados e não influenciam o conteúdo.</li>
          <li>✅ <strong>Correção prioritária:</strong> Erro matemático em ferramenta financeira é inaceitável — avise e corrigimos com prioridade.</li>
        </ul>
      </section>

      {/* Fontes Oficiais */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900">Fontes Oficiais (clicáveis)</h2>
        <p className="mt-2 text-sm text-slate-600">
          Todas as fórmulas baseiam-se em legislação vigente e dados públicos. Links abrem em nova aba.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
                <th className="py-2 pr-4">Órgão</th>
                <th className="py-2 pr-4">Referência</th>
                <th className="py-2 pr-4">Link Oficial</th>
                <th className="py-2">Usado em</th>
              </tr>
            </thead>
            <tbody>
              {fontesOficiais.map((f, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 pr-4 font-medium text-slate-900">{f.orgao}</td>
                  <td className="py-2 pr-4 text-slate-700">{f.referencia}</td>
                  <td className="py-2 pr-4">
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">
                      Acessar →
                    </a>
                  </td>
                  <td className="py-2 text-slate-600">{f.usadoEm.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Regras por Calculadora */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900">Regras e Premissas por Calculadora</h2>
        <div className="mt-4 space-y-6">
          {[
            {
              titulo: "1. Rotativo do Cartão",
              formula: "Saldo_novo = Saldo × (1 + taxa_mensal) - Pagamento  |  Dobro: ln(2) / ln(1 + taxa)",
              premissas: [
                "Juros compostos sobre saldo devedor (regra do rotativo, BACEN).",
                "Parcela mínima ≥ 15% do saldo (Resolução CMN 3.910/2018).",
                "Taxa padrão 15% a.m. (editável — confira na sua fatura).",
                "Não inclui: IOF, tarifas de cartão, anuidade, correção monetária.",
              ],
              fontes: ["BACEN - Rotativo", "Res. CMN 3.910/2018"],
            },
            {
              titulo: "2. Custo de Atrasar (Boleto, Parcela, Cheque Especial)",
              formula: "Boleto/Parcela: Total = Valor × (1 + multa) × (1 + juros)^(dias/30)  |  Cheque Especial: Total = Valor × (1 + taxa)^(dias/30)",
              premissas: [
                "Multa: teto 2% (CDC, Lei 8.078/1990, art. 52, §1º).",
                "Juros de mora: padrão 1% a.m. (precisa estar no contrato; CC art. 406).",
                "Cheque especial: taxa do banco (medianas no BACEN).",
                "Não inclui: IOF, tarifas, correção monetária (ex.: IPCA).",
              ],
              fontes: ["CDC art. 52 §1º", "CC art. 406", "BACEN - Cheque Especial"],
            },
            {
              titulo: "3. Parcelado 'Sem Juros' vs À Vista",
              formula: "TIR mensal: Preço_à_vista = Parcela × (1 - (1+i)^-n)/i  |  Patrimônio: VF_à_vista vs VF_parcelado",
              premissas: [
                "Taxa implícita = TIR do fluxo de parcelas igualando ao preço à vista.",
                "Comparação de patrimônio em N meses: à vista investe a diferença vs parcelado saca parcelas.",
                "Rentabilidade alternativa informada pelo usuário (padrão CDI ~14,5% a.a.).",
                "Investimento não tem retorno garantido — simulação educacional.",
              ],
              fontes: ["Matemática financeira (TIR/VPL)", "B3 - CDI"],
            },
            {
              titulo: "4. Bola de Neve vs Cascata (Avalanche)",
              formula: "Mês a mês: juros compostos sobre cada saldo; orçamento fixo = mínimos + extra; rollover do mínimo quitado",
              premissas: [
                "Snowball: ataca menor valor primeiro (ganho motivacional).",
                "Avalanche: ataca maior taxa primeiro (ótima em juros).",
                "Orçamento fixo = soma dos mínimos de TODAS as dívidas + extra mensal.",
                "Quando uma dívida zera, seu mínimo rola para a próxima (efeito bola de neve).",
                "Não inclui: taxas de renegociação, custos cartorários, seguro prestamista.",
              ],
              fontes: ["Matemática financeira (simulação)", "Literatura comportamental (snowball vs avalanche)"],
            },
            {
              titulo: "5. Reserva de Emergência (CDB vs Poupança)",
              formula: "Valor-alvo = Gasto_mensal × Meses_cobertura  |  Poupança: Selic>8,5% → 0,5%+TR; ≤8,5% → 70%Selic+TR  |  CDB: CDI × %produto × (1-IR)",
              premissas: [
                "Poupança: Lei 12.703/2012 + Decreto 8.266/2014 (regra vigente).",
                "CDB: CDI ≈ Selic - 0,10 p.p.; % do CDI do produto (padrão 100%).",
                "IR regressivo RFB: 22,5% (≤180d), 17,5% (181-360d), 15% (>360d).",
                "Come-cotas semestral (15% no CDB) NÃO simulado — aproximação conservadora.",
                "TR considerada zerada. Não inclui: IOF (<30d), taxa de custódia.",
              ],
              fontes: ["Lei 12.703/2012", "Decreto 8.266/2014", "RFB - Tabela IR", "B3 - CDI"],
            },
          ].map((c) => (
            <details key={c.titulo} className="rounded-xl border border-slate-200 bg-white p-6">
              <summary className="cursor-pointer font-semibold text-lg text-slate-900 flex items-center gap-2">
                {c.titulo}
              </summary>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="font-medium text-slate-900">Fórmula principal:</p>
                  <p className="mt-1 font-mono text-sm bg-slate-100 rounded px-3 py-2 text-slate-800">{c.formula}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Premissas:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {c.premissas.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Fontes:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {c.fontes.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Histórico de Revisões */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900">Histórico de Revisões por Calculadora</h2>
        <p className="mt-2 text-sm text-slate-600">
          Cada alteração nas fórmulas, premissas ou taxas padrão é registrada aqui.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
                <th className="py-2 pr-4">Calculadora</th>
                <th className="py-2 pr-4">Data</th>
                <th className="py-2 pr-4">Versão</th>
                <th className="py-2 pr-4">Alteração</th>
                <th className="py-2">Revisor</th>
              </tr>
            </thead>
            <tbody>
              {revisoes.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 pr-4 font-medium text-slate-900">{r.calculadora}</td>
                  <td className="py-2 pr-4 text-slate-700">{r.data}</td>
                  <td className="py-2 pr-4 text-slate-700">{r.versao}</td>
                  <td className="py-2 pr-4 text-slate-700 max-w-md">{r.alteracao}</td>
                  <td className="py-2 text-slate-700">{r.revisor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Próximas revisões programadas: semestral (abril/outubro) ou quando houver mudança regulatória relevante (ex.: nova resolução CMN, alteração CDC, mudança IR).
        </p>
      </section>

      {/* Disclaimer Final */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-xl font-bold text-amber-900">⚠️ Limitações e Avisos Importantes</h2>
        <ul className="mt-3 space-y-2 text-sm text-amber-900">
          <li><strong>Simulação ≠ Realidade:</strong> Os resultados são estimativas matemáticas baseadas nas premissas informadas. Contratos reais podem ter cláusulas adicionais (seguros, taxas administrativas, indexadores, correção monetária) que não são simuladas.</li>
          <li><strong>Não é recomendação:</strong> Conteúdo estritamente educacional. Não constitui recomendação de investimento, orientação financeira, jurídica ou tributária.</li>
          <li><strong>Taxas variam:</strong> Taxas de juros, CDI, Selic, IPCA e IR mudam no tempo. As taxas padrão são conservadoras e editáveis — sempre confirme a taxa vigente no seu contrato ou no site do BACEN/RFB.</li>
          <li><strong>Erro humano:</strong> Apesar dos testes automatizados (32 testes unitários), erros podem ocorrer. Encontrou inconsistência? Reporte em <a href="mailto:contato@contadivida.com.br" className="underline">contato@contadivida.com.br</a>.</li>
          <li><strong>Atualização:</strong> Esta página reflete o estado em <strong>2026-10-29</strong>. Consulte sempre a versão mais recente online.</li>
        </ul>
      </section>

      <nav aria-label="Navegação relacionada" className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-slate-900">Continue:</h2>
        <ul className="mt-2 space-y-1">
          <li><a href="/autor" className="text-emerald-700 underline">Quem faz as contas (Pedro Henrique)</a></li>
          <li><a href="/politica-de-privacidade" className="text-emerald-700 underline">Política de Privacidade (LGPD)</a></li>
          <li><a href="/termos" className="text-emerald-700 underline">Termos de Uso</a></li>
        </ul>
      </nav>
    </article>
  );
}