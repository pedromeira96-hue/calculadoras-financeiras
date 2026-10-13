# Hub de Calculadoras Financeiras — Plano de Arquitetura

> **Status:** DESIGN APROVADO PARA BUILD (pendente decisões do item 8)
> **Data:** 2026-10-13
> **Base:** Research Brief DEEP (modelos site+TikTok BR) + COMPARATIVE (subnicho finanças)
> **Operador:** solo, BR, 100% orgânico, sem verba de anúncios
> **Decisão de nicho:** finanças pessoais — RPM AdSense R$22-45/1k (2-3x os rivais), long-tail acessível comprovado, ecossistema de afiliados Hotmart/Kiwify 30-50%

---

## 1. Stack Decision

**Escolha: Next.js SSG (static export) + Tailwind CSS — deploy no Azure Static Web Apps.**

| Critério | HTML puro | Vite + React | **Next.js SSG** ✅ |
|---|---|---|---|
| SEO das ~20 páginas | Manual, erro-prone | Precisa plugin de prerender (vite-ssg/react-snap) | Nativo: HTML estático por página, metadata API, sitemap |
| Artigos (10) | HTML cru = dor | MDX + setup manual | MDX nativo via @next/mdx |
| Core Web Vitals (afeta AdSense/ranking) | Melhor possível | Ótimo | Ótimo, com margem (pouco JS client) |
| Match com skills do operador | Parcial | Sim (efootball-kits usa React/Vite/Tailwind) | Sim (efootbase tem next-app Next.js) |
| Deploy Azure SWA | Direto | Direto | Suporte first-class (skill azure-deploy existe) |
| Manutenibilidade solo (16-20 páginas) | Ruim | Boa | Boa (componentes reutilizáveis: card de ferramenta, bloco de metodologia, disclaimer) |

Justificativa: o site é 100% estático (matemática client-side, sem backend), mas SEO é o coração do projeto — cada página precisa de HTML prerenderizado, meta, schema.org e FAQ indexável. Next.js static export entrega isso sem plugins frágeis, com artigos em MDX e componentes que reduzem retrabalho. HTML puro perde em manutenibilidade de 10 artigos; Vite+React exige prerender manual. Next.js não é o mais leve em build, mas é o mais seguro para o objetivo nº 1 (rankear).

---

## 2. Arquitetura do Site (Page Tree)

```
/                                   Home — hub com cards das ferramentas + hero "Viu no TikTok?"
/calculadora/rotativo-do-cartao     Calc 1
/calculadora/parcelado-ou-a-vista   Calc 2
/calculadora/custo-de-atrasar       Calc 3
/calculadora/bola-de-neve-ou-cascata Calc 4
/calculadora/reserva-de-emergencia  Calc 5
/sobre                              Missão do site
/autor                             E-E-A-T: perfil real do operador (DECISÃO PENDENTE: nome)
/metodologia                       Fontes, fórmulas, data da última atualização das taxas default
/politica-de-privacidade           Requisito AdSense/GDPR-BR (LGPD)
/termos                            Requisito AdSense
/blog/[slug]                        10 artigos de apoio (lista no item 2.1)
/404
```

**Link-in-bio:** bio do TikTok aponta para **/** (home) com UTM (`?utm_source=tiktok&utm_medium=bio`). A home tem componente hero configurável ("Viu no TikTok? Calcule agora") que destaca **a ferramenta do vídeo da semana** — 1 campo de config (`currentFeature`) por build. Nada de landing separada no MVP.

**Internal linking:** cada artigo aponta para sua calculadora correspondente (CTA no meio + fim) e cada calculadora aponta para 2 artigos relacionados. Home linka tudo. Footer linka páginas de confiança.

### 2.1 Os 10 artigos (pautas validadas pela pesquisa)

| # | Slug proposto | Calculadora vinculada |
|---|---|---|
| 1 | `pagar-minimo-do-cartao-12-meses` | Calc 1 |
| 2 | `parcelamento-sem-juros-verdade` | Calc 2 |
| 3 | `poupanca-vs-cdi` | Calc 5 |
| 4 | `financiamento-48x-custo-real` | Calc 2 (juros implícitos) |
| 5 | `custo-atrasar-boleto` | Calc 3 |
| 6 | `tamanho-reserva-emergencia` | Calc 5 |
| 7 | `decimo-terceiro-divida-ou-investir` | Calc 4 |
| 8 | `cheque-especial-o-juro-mais-caro-do-brasil` | Calc 3 |
| 9 | `quanto-vale-100-reais-de-2015-hoje` | Calc 5 (contexto inflação) |
| 10 | `bola-de-neve-vs-cascata` | Calc 4 |

Artigos: 800-1.200 palavras, H2/H3, FAQ no fim (schema FAQPage), CTA duplo para a calculadora, fonte em cada afirmação numérica.

---

## 3. Especificação das Calculadoras

Regras globais: toda taxa que varia no tempo = **input editável com default documentado na página de metodologia** (nada hardcoded). Moeda BRL, locale pt-BR. Outputs com destaque visual no "número que choca" (o mesmo que aparece no vídeo).

### Calc 1 — Rotativo do Cartão
**URL:** `/calculadora/rotativo-do-cartao`
**Pergunta que responde:** "quanto vira minha dívida pagando o mínimo do cartão?"

**Inputs:**
- Saldo devedor (R$) — default 1.000
- Taxa do rotativo (% a.m.) — default 15% (editar; fonte: medianas BACEN; registrar valor/data na metodologia)
- Pagamento mensal (R$) — default = 15% do saldo (mínimo típico; regra BACEN: parcela mínima ≥ 15% do saldo — Resolução 3.910/2018)
- Horizonte (meses) — default 24

**Cálculo (pseudocódigo):**
```
saldo = saldoInicial
para mes em 1..N:
    jurosMes = saldo * i
    saldo = saldo + jurosMes - pagamento
    se pagamento <= jurosMes: alerta "dívida nunca quita (pagamento ≤ juros do mês)"
mesesParaDobrar = ln(2) / ln(1 + i)   # sem amortização
```

**Outputs:** tabela/gráfico mês a mês do saldo; total de juros pagos; juros vs principal; mês em que a dívida dobra (ex.: a 15% a.m. → ~5 meses); alerta de nunca-quita.

**Fontes metodologia:** BACEN — Rotativo (Res. CMN 3.910/2018: mínimo ≥ 15%); taxas medianas de cartão (BACEN/SGS). Juros compostos sobre saldo devedor.
**IOF:** rotativo tem IOF; tratamento exato **a confirmar** — MVP calcula sem IOF e exibe nota "não inclui IOF/tarifas" (conservador).
**Disclaimer:** "Simulação matemática com taxa informada por você. Não considera tarifas, IOF nem mudanças contratuais. Não é recomendação."

### Calc 2 — Parcelado "Sem Juros" vs À Vista com Desconto
**URL:** `/calculadora/parcelado-ou-a-vista`
**Pergunta:** "vale mais pagar à vista com desconto ou parcelado sem juros?"

**Inputs:**
- Preço total (R$) — default 3.000
- Nº de parcelas — default 12
- Desconto à vista (%) — default 10
- Rentabilidade alternativa (% a.a.) — default CDI (input; ex. 14,5%) — cenário "investir a diferença"

**Cálculo:**
```
precoAVista = total * (1 - desconto)
parcela = total / n  # "sem juros"
# taxa implícita mensal i: resolve preçoAVista = Σ(t=1..n) parcela / (1+i)^t  (IRR)
# comparação: valor futuro do que sobra pagando à vista + investindo vs parcelado
```

**Outputs:** taxa implícita mensal e anualizada do parcelamento (o "juro escondido"); quanto rende pagar à vista e investir a diferença (VF no horizonte); veredicto numérico ("à vista rende R$ X mais").

**Fonte:** matemática financeira (TIR/IRR). Sem fonte regulatória — é conta pura.
**Disclaimer:** "Taxa implícita é a TIR do fluxo. Investimento a taxa informada não tem garantia de retorno."

### Calc 3 — Quanto Custa Atrasar
**URL:** `/calculadora/custo-de-atrasar`
**Pergunta:** "quanto de juros/multa eu pago por boleto atrasado (por dia)?"

**Inputs:**
- Tipo: boleto / parcela / cheque especial (default: boleto)
- Valor (R$) — default 500
- Dias de atraso — default 30
- Multa (% sobre valor) — default 2% (teto CDC art. 52 §1º)
- Juros de mora (% a.m.) — default 1% a.m. comum contratual; **a confirmar** caso a caso sem previsão em contrato (nuance CC art. 406) — campo editável
- Cheque especial: taxa do banco (% a.m., default 12%, editável — medianas BACEN) substitui multa+mora

**Cálculo:**
```
boleto/parcela: total = valor * (1 + multa) * (1 + jurosMensal)^(dias/30)
chequeEspecial: total = valor * (1 + taxaMensal)^(dias/30)   # + nota IOF não incluído
custoPorDia = total - valor, dividido pelos dias
```

**Outputs:** custo total no período; **custo por dia (R$)** (o número-herói do vídeo); linha do tempo crescente; comparação dos 3 tipos lado a lado.
**Fontes:** CDC (Lei 8.078/1990, art. 52 §1º — multa máx 2%); CC art. 406 (juros de mora); BACEN taxas medianas cheque especial.
**Disclaimer:** "Regras de contrato prevalecem. Padrão 2% + 1% a.m. é o teto/typical — confira seu contrato."

### Calc 4 — Bola de Neve vs Cascata
**URL:** `/calculadora/bola-de-neve-ou-cascata`
**Pergunta:** "bola de neve ou cascata: qual quita minhas dívidas mais barato?"

**Inputs:** lista dinâmica de dívidas (2 a 8): valor, taxa (% a.m.), pagamento mínimo; orçamento extra mensal (R$, default 300).

**Cálculo (pseudocódigo):**
```
para estratégia em [snowball(ordena por valor asc), avalanche(ordena por taxa desc)]:
    mes=0; enquanto dívidas ativas:
        mes++; pagar mínimos em todas; aplicar extra na alvo
        quando alvo zera: rolar pagamento dela p/ próxima alvo
    registrar: totalMeses, totalJuros
diffJuros = juros(avalanche é mínimo matemático) vs snowball
```

**Outputs:** prazo total e juros totais de cada estratégia; **diferença em R$ e em meses** (cascata economiza X, snowball motiva antes); ordem de quitação em cada.
**Fonte:** matemática (simulação); nota: "cascata é ótima em juros; snowball pode vencer na prática por aderência motivacional" (referência comportamental — marcar como consenso, não fato).
**Disclaimer:** "Simulação com seus números; mínimos informados por você."

### Calc 5 — Reserva de Emergência
**URL:** `/calculadora/reserva-de-emergencia`
**Pergunta:** "quanto eu preciso guardar de reserva e onde rende mais?"

**Inputs:**
- Gasto mensal essencial (R$) — default 3.000
- Meses de cobertura — default 6 (guia: CLT estável 6; renda variável 12 — texto de apoio)
- Aporte inicial (R$) — default 0; aporte mensal (R$) — default 500
- CDI bruto (% a.a.) — default editável (≈ Selic − 0,10 p.p.; registrar data)
- % do CDI do produto — default 100 (CDB 100% CDI)
- IR (%) — default 17,5% (tabela regressiva: 22,5% ≤180d; 17,5% 181-360d; 15% >360d — RFB)
- Selic (% a.a.) — default editável (define regra da poupança)

**Cálculo (poupança — Lei 12.703/2012 / Decreto 8.266/2014):**
```
se Selic > 8,5% a.a.: rendPoupanca = 0,5% a.m. + TR(default 0)
senão:                 rendPoupanca = 70% * Selic/12 mensalizado + TR
CDB líquido: ((1+CDI_liquido)^meses) com CDI_liquido = CDI_bruto * (1 - IR)
come-cotas (IR semestral 15% em CDB): aproximação documentada na metodologia — a confirmar refinamento
```

**Outputs:** valor-alvo da reserva; tempo para atingir com os aportes; comparativo CDB líquido vs poupança em 12/24/36 meses (**diferença em R$** — número-herói); efeito de atrasar 12 meses para começar.
**Fontes:** regra da poupança (Lei 12.703/2012; Decreto 8.266/2014); IR regressivo (RFB); CDI (B3).
**Disclaimer:** "Não é recomendação de investimento. Tesouro Selic/LCIs têm tratamentos diferentes — veja metodologia."

---

## 4. SEO por Ferramenta

| URL | Title (≤60) | Meta Description (≤155) | H1 |
|---|---|---|---|
| rotativo-do-cartao | Calculadora do Rotativo: Quanto Custa Pagar o Mínimo | Simule pagar o mínimo do cartão e veja em quantos meses sua dívida dobra. Juros compostos do rotativo mês a mês, com metodologia aberta. | Calculadora do Rotativo do Cartão: o preço de pagar o mínimo |
| parcelado-ou-a-vista | Parcelado Sem Juros ou À Vista: Qual Compensa? | Descubra a taxa escondida do parcelado "sem juros" e quanto você ganha pagando à vista com desconto. Simulação de juros implícitos. | Parcelado "Sem Juros" ou À Vista: a conta que ninguém faz |
| custo-de-atrasar | Quanto Custa Atrasar Boleto? Multa e Juros por Dia | Calcule multa de 2% e juros de mora de boleto, parcela e cheque especial atrasados. Veja o custo por dia em segundos. | Quanto Custa Atrasar: boleto, cheque especial e parcela |
| bola-de-neve-ou-cascata | Calculadora Bola de Neve vs Cascata: Qual Quita Antes? | Simule as duas estratégias com suas dívidas reais. Compare prazo total, juros pagos e a diferença em reais entre os métodos. | Bola de Neve ou Cascata: qual quita suas dívidas mais barato? |
| reserva-de-emergencia | Calculadora Reserva de Emergência: CDI x Poupança | Calcule o valor ideal da sua reserva e compare CDB no CDI x poupança com IR e regras reais. Metas por aporte mensal. | Reserva de Emergência: quanto guardar e onde render mais |

**Keywords long-tail por página** (evitar head terms):
- Calc 1: `calculadora rotativo cartão`, `pagar o mínimo do cartão quanto vira`, `juros do rotativo em 12 meses`, `quando a dívida do cartão dobra`
- Calc 2: `parcelado sem juros vale a pena`, `taxa implícita do parcelamento`, `à vista com desconto ou parcelado`, `juros embutido no parcelamento`
- Calc 3: `quanto custa atrasar boleto`, `calculadora multa 2% juros mora`, `juros de boleto atrasado`, `custo do cheque especial por dia`
- Calc 4: `calculadora bola de neve dívidas`, `bola de neve vs cascata qual é melhor`, `simulador quitação de dívidas`
- Calc 5: `calculadora reserva de emergência`, `quanto guardar de reserva`, `cdb x poupança calculadora`

**Schema.org por página de ferramenta:** `WebApplication` (name, applicationCategory FinanceUtility, offers price 0) + `FAQPage` (3-4 Q&A reais por página) + `BreadcrumbList`. Artigos: `Article` + `FAQPage`.

---

## 5. Pipeline de Vídeo TikTok

**Spec:** 60-120s (≥1min p/ Creator Rewards), 1080x1920, legenda queimada (85% assiste sem áudio), texto-na-tela indexável (TikTok SEO), trarefa sonora em alta no nicho.

**Storyboard template (6 cenas):**
1. **Hook 0-3s** — número-herói na tela: "R$1.000 no rotativo pagando o mínimo vira R$____ em 2 anos" (texto animado grande; gerado com contador/kinetic type)
2. **Setup 3-12s** — ilustração cartoon IA (DreamShaper): personagem pagando o mínimo, bola de neve crescendo — animada via Replicate minimax/video-01 (6s/clipe)
3. **Demo 12-35s** — screencast real da calculadora publicada (Playwright/gravador de tela): digitando os inputs
4. **Contador 35-50s** — gráfico/saldo subindo mês a mês (animação da própria página gravada OU I2V do gráfico)
5. **Choque 50-55s** — freeze no valor final em tela cheia
6. **CTA 55-60s** — "Calcula a SUA. Link na bio." + legenda fixada

**Integração com ativos existentes (VERIFIED):**
- `C:\Users\041566158\AI\openvino-art\scripts\gerar.py|gerar_lote.py` → ilustrações de hook/setup (estilo cartoon financeiro)
- `animar_replicate.py` (minimax/video-01, ~130-195s/clipe) → animar as ilustrações
- Screencast da ferramenta real → credibilidade + demo do produto
- Juiz de cortes (`cortes locais`) → QA pré-postagem: gancho nos 3s, densidade de fala, pausas, repetição
- Edição final: CapCut (legenda queimada + trilha)

**Frequência:** 3-4 posts/semana nos primeiros 90 dias; **série "Dívidas Reais"** semanal (caso anônimo → ferramenta → número → CTA). Repurpose: mesmo vídeo → Shorts (40-75s cut) + Reels.

**CTA padrão:** sempre "link na bio" (bio = única porta clicável; regra 1k seguidores ou conta business).

---

## 6. Monetização — Setup Order

| Fase | Quando | Ações | KPIs |
|---|---|---|---|
| **0 — Pré-lançamento** | Dia 1 (M1) | Search Console + sitemap.xml + GA4. **Zero anúncios.** | Páginas indexadas; impressões orgânicas |
| **1 — AdSense** | Após 5 ferramentas + 10 artigos indexados | Aplicar AdSense (site com páginas legais LGPD). Aprovação: dias a semanas (**estimativa**) | RPM real vs faixa R$22-45; pageviews |
| **2 — Afiliados** | Logo após AdSense | Hotmart/Kiwify: critérios = comissão ≥30%, produtor com reputação alta, ticket R$47-297, tema renegociação/quitação/organização financeira. Lead magnet desde M2: planilha de quitação → e-mail | CTR banner; conversão afiliado; e-mails capturados |
| **3 — Escala** | Conta TikTok elegível | Creator Rewards (10k segs, 100k views/30d, vídeos ≥1min, min US$50). Produto próprio: planilha premium R$27-47 via Kiwify | Views qualificadas 30d; vendas próprias |

**Regra de ouro:** nenhuma fase bloqueia a anterior — afiliado pode entrar antes da aprovação AdSense.

---

## 7. Roadmap

| Milestone | Entregas | Esforço (sessões) | Definition of Done |
|---|---|---|---|
| **M0** | Repo + skeleton Next.js SSG + deploy vazio Azure SWA + domínio apontado | 1-2 | Deploy acessível por HTTPS; 404 custom |
| **M1** | MVP: 5 calculadoras + 10 artigos + 5 páginas de confiança + SEO completo | 6-10 | Lighthouse mobile ≥90; **testes unitários das 5 fórmulas passando**; meta/schema em 100% páginas; sitemap no GSC; disclaimers visíveis; metodologia com data |
| **M2** | 10 primeiros vídeos + conta TikTok Business + bio com link UTM + lead magnet | 3-5 (vídeo) | 10 vídeos QA-passados pelo juiz de cortes; bio com link |
| **M3** | Aplicação AdSense + afiliação Hotmart | 1-2 | AdSense ativo (ou pendência registrada); primeiro banner de afiliado |
| **M4** | Iteração por dados (contínuo) | contínuo | Decisões mensais por KPI: qual calculadora ganha mais vídeo/desenvolvimento |

Ordem de build M1: Calc 1 (maior hook) → Calc 3 (mais simples) → Calc 2 → Calc 4 → Calc 5. Artigos intercalados.

---

## 8. Decisões RESOLVIDAS (2026-10-13)

1. **Domínio:** `contadivida.com.br` ✅ ESCOLHIDO — verificado DISPONÍVEL via RDAP registro.br (HTTP 404). Motivo: `quanto-custa.com.br` foi descartado porque `quantocusta.com.br` (sem hífen) já pertence a terceiro (Jean B. Bernardo, exp. 22/09/2026, status inactive) — contamina o CTA verbal; `quanto-custa.com` está registrado (RDAP Verisign 200). `calculadorafinanceira.app` não verificável (proxy bloqueia RDAP .app). **Ação do operador:** registrar `contadivida.com.br` em registro.br (~R$40/ano).
2. **Conta TikTok:** conta NOVA separada ✅ (risco multiconta validado na pesquisa). Criação manual pelo operador.
3. **Autor:** placeholder central em `src/config/site.ts` (`AUTHOR_NAME = "Seu Nome"` + TODO) — operador preenche antes do lançamento. Página /autor estruturada, sem inventar credenciais.
4. **Deploy:** Azure Static Web Apps ✅ (skill azure-deploy existente).

---

## 9. Riscos e Mitigações

| Risco | Severidade | Mitigação |
|---|---|---|
| YMYL penaliza site novo | Alto | Metodologia em cada ferramenta + fontes (BACEN/RFB/CC/CDC) + autor real + disclaimer "não é recomendação" |
| Fórmula errada → dano reputacional | Alto | **Testes unitários das 5 fórmulas no M1 (obrigatório)**; defaults conservadores; IOF marcado "não incluído" até confirmação |
| Taxas default defasadas | Médio | Inputs editáveis + página/metodologia com "última atualização" |
| AdSense recusado | Médio | Lançar com conteúdo completo (M1 completo antes de aplicar); páginas LGPD prontas |
| Ban multiconta TikTok | Médio | Conta nova separada; não reaproveitar celular/IP do projeto eFootball sem higiene |
| Dependência de TikTok | Médio | Repurpose Shorts/Reels desde o M2; SEO Google como 2º motor |
| Carga de trabalho solo | Médio | MVP travado em 5 calculadoras; artigo = template MDX repetível |
| "a confirmar" abertos | — | IOF do rotativo; refinamento come-cotas; disponibilidade dos domínios; dominância exata SERP concursos (irrelevante p/ build) |

---

## Apêndice — Fontes da Metodologia Financeira

- BACEN Resolução CMN 3.910/2018 (parcela mínima rotativo ≥ 15%)
- CDC — Lei 8.078/1990, art. 52 §1º (multa atraso máx 2%)
- Código Civil — art. 406 (juros de mora; nuance sem previsão contratual)
- Lei 12.703/2012 + Decreto 8.266/2014 (regra remuneração poupança: 0,5%+TR ou 70% Selic+TR)
- RFB — tabela regressiva IR renda fixa (22,5/17,5/15%)
- B3 — definição CDI (≈ Selic − 0,10 p.p.)
- Taxas medianas (rotativo/cheque especial): BACEN SGS — valor vigente registrado em /metodologia na data de lançamento
