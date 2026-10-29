# Roteiros TikTok — ContaDívida (10 vídeos)

> **Especificação técnica** (do PLAN.md):
> - Duração: 60-120s (≥1min p/ Creator Rewards)
> - Formato: vertical 1080x1920, legenda queimada, texto na tela indexável (TikTok SEO)
> - Estrutura: **Hook (0-3s) → Demo ferramenta (3-40s) → Número que choca (40-60s) → CTA "link na bio" (últimos 5s)**
> - Série semanal "Dívidas Reais" intercalada
> - Repurpose imediato: Shorts (40-75s) + Reels
> - CTA fixo: **"Calcula a SUA. Link na bio."**

> **Pipeline IA existente (VERIFIED):**
> - Ilustrações cartoon: `C:\Users\041566158\AI\openvino-art\scripts\gerar.py` (DreamShaper SD1.5, ~20s/256px)
> - Animação I2V: `animar_replicate.py` → Replicate `minimax/video-01` (~130-195s/clipe 6s 720p)
> - Screencast da ferramenta real: gravador de tela / Playwright
> - QA: juiz de cortes `cortes locais` (gancho, retenção, densidade, pausas)
> - Edição final: CapCut (legenda queimada + trilha em alta no nicho)

---

## Modelo de Storyboard (6 cenas reutilizáveis)

| Cena | Tempo | Conteúdo | Fonte Visual |
|---|---|---|---|
| **1. Hook** | 0-3s | Número-herói na tela (texto animado grande) | Kinetic type / After Effects / CapCut |
| **2. Setup** | 3-12s | Ilustração cartoon IA (personagem na situação) | DreamShaper → Replicate I2V (6s) |
| **3. Demo** | 12-35s | **Screencast real** da calculadora no site (digitando inputs) | Gravador de tela / Playwright |
| **4. Contador** | 35-50s | Gráfico/saldo subindo mês a mês (animação da página OU I2V do gráfico) | CSS animation capture / I2V |
| **5. Choque** | 50-55s | Freeze no valor final em tela cheia | Captura de tela |
| **6. CTA** | 55-60s | "Calcula a SUA. Link na bio." + legenda fixada | Texto + seta para bio |

> **Dica:** Cenas 2 e 4 usam seu pipeline IA. Cena 3 é **screencast real** (credibilidade + demo do produto). Cenas 1, 5, 6 são texto animado no CapCut.

---

## Roteiro 1 — Rotativo do Cartão
**Artigo/Calculadora:** `pagar-minimo-do-cartao-12-meses` / `rotativo-do-cartao`
**Número-herói:** "R$ 3.000 viram R$ 4.600 em 12 meses pagando o mínimo"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | Texto grande aparecendo: **"R$ 3.000 no rotativo pagando o mínimo → R$ 4.600 em 1 ano"** (contador animado 3000→4600) |
| **2. Setup** | Ilustração: pessoa olhando fatura, cartão brilhando, "mínimo" piscando. Anima: bola de neve crescendo sobre o cartão. |
| **3. Demo** | **Screencast**: abre `contadivida.com.br/calculadora/rotativo-do-cartao` → digita 3000 / 15% / 450 (15%) / 12 meses → mostra resultado |
| **4. Contador** | Gráfico de barras: mês 1 R$ 3.150 → mês 6 R$ 4.000 → mês 12 R$ 4.630. Texto: "A dívida **cresceu 54%** pagando o mínimo." |
| **5. Choque** | Tela cheia: **R$ 1.630 só de juros. Saldo final: R$ 4.630.** |
| **6. CTA** | "Calcula a SUA. Link na bio." 👇 Legenda fixada: "Simule seu rotativo → contadivida.com.br" |

**Hashtags:** #rotativodocartao #juroscompostos #divida #educacaofinanceira #contadivida

---

## Roteiro 2 — Parcelado "Sem Juros" vs À Vista
**Artigo/Calculadora:** `parcelamento-sem-juros-verdade` / `parcelado-ou-a-vista`
**Número-herói:** "Parcela 'sem juros' esconde **21,6% ao ano** embutido"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | Texto: **"Parcelado 'sem juros' de R$ 3.000 em 12× = 21,6% a.a. escondido"** (taxa aparece pulsando) |
| **2. Setup** | Ilustração: vendedor sorrindo "sem juros!", consumidor feliz. Bolha de pensamento: "Será mesmo?" |
| **3. Demo** | **Screencast**: `contadivida.com.br/calculadora/parcelado-ou-a-vista` → 3000 / 12 / 10% desconto / 14,5% CDI → mostra taxa implícita 1,64% a.m. |
| **4. Contador** | Comparação patrimônio: à vista + investir = R$ 343,50 a mais em 12 meses. Parcela "sem juros" perde. |
| **5. Choque** | **"Você paga R$ 3.240 a mais parcelando."** (R$ 13.440 vs R$ 10.200 à vista) |
| **6. CTA** | "Descobre a taxa do SEU parcelado. Link na bio." 👇 |

**Hashtags:** #parceladosemjuros #jurosescondidos #comprasparceladas #contadivida

---

## Roteiro 3 — Quanto Custa Atrasar Boleto
**Artigo/Calculadora:** `custo-atrasar-boleto` / `custo-de-atrasar`
**Número-herói:** "Boleto de R$ 500 atrasado 30 dias = **R$ 0,50 por dia** jogado fora"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | Contador: **"R$ 0,50 / dia"** → **"R$ 15,10 / mês"** → **"R$ 181,20 / ano"** (acelerando) |
| **2. Setup** | Ilustração: boleto vencido na mesa, relógio correndo, moedas escorrendo pelo ralo. |
| **3. Demo** | **Screencast**: `contadivida.com.br/calculadora/custo-de-atrasar` → seleciona "Boleto" → 500 / 30 / 2% / 1% → mostra R$ 0,50/dia |
| **4. Contador** | Comparação lado a lado: Boleto R$ 15,10/mês vs Cheque especial R$ 60,00/mês. |
| **5. Choque** | **"Cheque especial custa 4x mais que boleto atrasado."** Tela: R$ 60/dia no cheque especial. |
| **6. CTA** | "Quanto custa SEU atraso? Link na bio." 👇 |

**Hashtags:** #boletoatrasado #jurosdemora #chequeespecial #contadivida

---

## Roteiro 4 — Bola de Neve vs Cascata
**Artigo/Calculadora:** `bola-de-neve-vs-cascata` / `bola-de-neve-ou-cascata`
**Número-herói:** "Cascata economiza **R$ 2.340** em juros vs Bola de Neve"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | Split screen: ❄️ "Bola de Neve" vs 🏔️ "Cascata" → número: **"R$ 2.340 de diferença"** |
| **2. Setup** | Ilustração: duas pessoas com mesmas dívidas (cartão R$ 1k 10% + empréstimo R$ 500 1%). Uma ataca a menor, outra a maior taxa. |
| **3. Demo** | **Screencast**: `contadivida.com.br/calculadora/bola-de-neve-ou-cascata` → adiciona as 2 dívidas + extra R$ 200 → mostra lado a lado |
| **4. Contador** | Linha do tempo: Cascata quita em 7 meses, Bola de Neve em 8. Juros: Cascata R$ 890 vs Bola de Neve R$ 3.230. |
| **5. Choque** | **"A cascata economiza R$ 2.340. Mas a bola de neve dá vitórias rápidas."** |
| **6. CTA** | "Qual plano quita SUAS dívidas? Link na bio." 👇 |

**Hashtags:** #boladeneve #cascata #quitacaodedividas #metododividas #contadivida

---

## Roteiro 5 — Reserva de Emergência (CDI x Poupança)
**Artigo/Calculadora:** `reserva-de-emergencia-cdi-poupanca` / `reserva-de-emergencia`
**Número-herói:** "Reserva de R$ 18.000: CDB rende **R$ 1.200 a mais** que poupança em 2 anos"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | Duas barras crescendo: 💰 CDB vs 🏦 Poupança → gap final: **"R$ 1.200 de diferença em 24 meses"** |
| **2. Setup** | Ilustração: pessoa dormindo tranquila (reserva feita) vs pessoa preocupada (sem reserva). Inflação comendo dinheiro parado. |
| **3. Demo** | **Screencast**: `contadivida.com.br/calculadora/reserva-de-emergencia` → 3000 gasto / 6 meses / 500 aporte / 14,5% CDI / 17,5% IR / 14,5% Selic |
| **4. Contador** | Projeção 12/24/36 meses: CDB sempre à frente. Em 24m: CDB R$ 13.200 vs Poupança R$ 12.000. |
| **5. Choque** | **"Sua reserva rende mais no CDB — mesmo com IR."** Valor-alvo: R$ 18.000. |
| **6. CTA** | "Calcula SUA reserva ideal. Link na bio." 👇 |

**Hashtags:** #reservadeemergencia #cdbxpoupanca #investimentos #contadivida

---

## Roteiro 6 — Financiamento 48x (Série Dívidas Reais)
**Artigo/Calculadora:** `financiamento-48x-custo-real` / `parcelado-ou-a-vista`
**Caso:** "João financiou carro em 48× e pagou R$ 15.000 a mais que à vista"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | Foto de carro (genérica) → texto: **"João pagou R$ 15.000 a mais financiando em 48x"** |
| **2. Setup** | Ilustração: João assinando contrato, vendedor "parcelas que cabem no bolso". Bolha: "Mas qual o total?" |
| **3. Demo** | **Screencast**: calculadora parcelado → 30.000 / 48 / 15% desconto → taxa implícita 1,4% a.m. |
| **4. Contador** | Total parcelado: R$ 45.000. À vista: R$ 30.000. **Diferença: R$ 15.000 = 1 ano de parcela.** |
| **5. Choque** | **"48 parcelas = quase 2x o valor à vista em juros embutidos."** |
| **6. CTA** | "Simula SEU financiamento. Link na bio." 👇 Legenda: "Caso real anonimizado. Calcula o seu." |

**Hashtags:** #financiamento #carroparcelado #jurosembutidos #dividasreais #contadivida

---

## Roteiro 7 — 13º Salário: Dívida ou Investir?
**Artigo/Calculadora:** `decimo-terceiro-divida-ou-investir` / `bola-de-neve-ou-cascata`
**Caso:** "Maria usou o 13º pra quitar cartão 15% a.m. — melhor 'investimento' do ano"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | **"O melhor investimento de 2026 foi quitar dívida de 15% ao mês"** (texto sobre nota de R$ 100 queimando) |
| **2. Setup** | Ilustração: Maria com 13º na mão, dois caminhos: 📈 "Investir no CDI 14,5% a.a." vs 🔥 "Quitar cartão 180% a.a." |
| **3. Demo** | **Screencast**: simulador quitação → adiciona dívida cartão R$ 3.000 15% a.m. + extra = valor do 13º → mostra meses economizados |
| **4. Contador** | Comparação: investir 13º a 14,5% a.a. = ~R$ 435/ano. Quitar cartão 15% a.m. = **R$ 5.400 economizados em juros/ano**. |
| **5. Choque** | **"Diferença de 12x: quitar dívida cara rende 12x mais que CDI."** |
| **6. CTA** | "O que fazer com SEU 13º? Link na bio." 👇 |

**Hashtags:** #decimoterceiro #quitardivida #investimento #contadivida #dividasreais

---

## Roteiro 8 — Cheque Especial: O Juro Mais Caro
**Artigo/Calculadora:** `cheque-especial-o-juro-mais-caro` / `custo-de-atrasar`
**Número-herói:** "R$ 1.000 no cheque especial 30 dias = **R$ 120 de juros** (12% a.m.)"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | Termômetro subindo: **"Cheque especial = juro mais caro do varejo"** (12-15% a.m. = 280-430% a.a.) |
| **2. Setup** | Ilustração: conta bancária no vermelho, placa "Cheque Especial Disponível", moedas virando fumaça. |
| **3. Demo** | **Screencast**: `contadivida.com.br/calculadora/custo-de-atrasar` → seleciona "Cheque especial" → 1000 / 30 / 12% → R$ 120 |
| **4. Contador** | Comparação: Cheque especial R$ 120/mês vs Boleto atrasado R$ 15/mês vs Rotativo R$ 150/mês (em R$ 1k). |
| **5. Choque** | **"1 ano no cheque especial = R$ 1.440 só de juros. Negocie com o banco ANTES de usar."** |
| **6. CTA** | "Quanto custa SEU cheque especial? Link na bio." 👇 |

**Hashtags:** #chequeespecial #jurosaltos #banco #contadivida

---

## Roteiro 9 — R$ 100 de 2015 Hoje (Inflação)
**Artigo/Calculadora:** `quanto-vale-100-reais-de-2015-hoje` / `reserva-de-emergencia`
**Número-herói:** "R$ 100 em 2015 compram o que **R$ 180 compram hoje** (inflação ~80%)"

| Cena | Roteiro Detalhada |
|---|---|
| **1. Hook** | Nota de R$ 100 velha (2015) ao lado de nota nova → **"Mesma nota, poder de compra caiu 44%"** |
| **2. Setup** | Ilustração: carrinho de supermercado 2015 cheio / 2024 meio vazio pelo mesmo valor. Inflação comendo. |
| **3. Demo** | **Screencast**: calculadora reserva → mostra que reserva de R$ 6.000 em 2015 precisa ser R$ 10.800 hoje (gasto R$ 3.000 × 6 meses atualizado) |
| **4. Contador** | Linha do tempo: IPCA acumulado 2015-2024 ≈ 80%. "Sua reserva **precisa ser reajustada todo ano**." |
| **5. Choque** | **"Guardar R$ 6.000 em 2015 e não mexer = perdeu R$ 4.800 de poder de compra."** |
| **6. CTA** | "Atualizou SUA reserva este ano? Link na bio." 👇 |

**Hashtags:** #inflacao #poderdocompra #reservadeemergencia #contadivida

---

## Roteiro 10 — Poupança vs CDI (Decisão Prática)
**Artigo/Calculadora:** `parcelamento-sem-juros-verdade` / `reserva-de-emergencia`
**Número-herói:** "Com Selic a 14,5%, poupança rende **0,5% a.m.** — CDB 100% CDI rende **0,95% a.m. líquido**"

| Cena | Roteiro Detalhado |
|---|---|
| **1. Hook** | Duas contas lado a lado: 🏦 Poupança 0,5% vs 💰 CDB 0,95% → **"Quase o dobro de rendimento"** |
| **2. Setup** | Ilustração: pessoa dividindo dinheiro: metade poupança, metade CDB. Após 1 ano, CDB muito maior. |
| **3. Demo** | **Screencast**: calculadora reserva → mostra regra da poupança (Selic > 8,5% = 0,5% + TR) vs CDB líquido |
| **4. Contador** | Em 24 meses, R$ 10.000: Poupança ≈ R$ 11.270 / CDB líquido ≈ R$ 12.480. **Diferença: R$ 1.210.** |
| **5. Choque** | **"Mesmo com IR, CDB 100% CDI ganha da poupança quando Selic > 8,5%."** |
| **6. CTA** | "Onde rende MAIS seu dinheiro? Link na bio." 👇 |

**Hashtags:** #poupança #cdb #rendafixa #selic #contadivida

---

## Checklist de Produção (por vídeo)

- [ ] Gerar 2 ilustrações DreamShaper (setup + opcional gráfico) → `gerar.py`
- [ ] Animar 2 clipes Replicate (6s cada) → `animar_replicate.py`
- [ ] Gravar screencast da calculadora (30-40s) → OBS / Playwright
- [ ] Montar no CapCut: 6 cenas + legenda queimada + trilha em alta
- [ ] QA no juiz de cortes (`cortes locais`) → gancho ≤3s, retenção, densidade
- [ ] Publicar TikTok (legenda + hashtags + fixar comentário "Link na bio")
- [ ] Repurpose: Shorts (corte 40-75s) + Reels (mesmo arquivo)
- [ ] Atualizar `CURRENT_FEATURE` no `site.ts` p/ calculadora da semana
- [ ] Commit + deploy Azure

---

## Cronograma Sugerido (Primeiras 4 Semanas)

| Semana | Vídeos (3-4/sem) | Foco |
|---|---|---|
| 1 | Rotativo, Atraso, Parcelado | Hooks mais universais (cartão, boleto, compra) |
| 2 | Quitação (Bola/Cascata), Reserva | Planejamento financeiro |
| 3 | Financiamento 48x, 13º Salário | Série "Dívidas Reais" + sazonal |
| 4 | Cheque Especial, Inflação, Poupança vs CDI | Comparativos práticos |

> **Meta M2:** 10 vídeos publicados + conta TikTok Business (1k segs p/ link na bio) + bio configurada → link `https://contadivida.com.br?utm_source=tiktok&utm_medium=bio`

---

**Arquivo salvo em:** `C:\Users\041566158\OneDrive - Lactalis\Área de Trabalho\PROJETOS\calculadoras-financeiras\ROTEIROS_TIKTOK.md`

Próximo passo sugerido: **Deploy no Azure Static Web Apps** (sua skill `azure-deploy` já existe). Quer que eu guie o deploy ou prefere fazer manual e depois a gente parte pros vídeos?