# ContaDívida — Calculadoras de Finanças Pessoais

> Site estático (Next.js 15 SSG) com 5 calculadoras de dívidas/finanças + blog educacional, otimizado para tráfego orgânico TikTok → site → monetização (AdSense + afiliados + Creator Rewards).

**Deploy:** https://calculadoras-financeiras-sooty.vercel.app

---

## 🎯 Objetivo

Criar um hub de calculadoras financeiras (rotativo, parcelado, atraso, quitação, reserva) que alimenta um funil orgânico:
- **TikTok** → vídeo demonstrando calculadora → **link na bio** → **site** → calculadora real
- **Monetização:** AdSense (RPM finanças R$22-45/1k) + Afiliados Hotmart/Kiwify (30-50%) + TikTok Creator Rewards

---

## 🧮 Calculadoras (5)

| Rota | Calculadora | Hook Principal |
|---|---|---|
| `/calculadora/rotativo-do-cartao` | Rotativo do Cartão | "R$ 3.000 no rotativo pagando o mínimo → R$ 4.600 em 1 ano" |
| `/calculadora/custo-de-atrasar` | Quanto Custa Atrasar | "Boleto R$ 500 atrasado 30 dias = R$ 0,50/dia jogado fora" |
| `/calculadora/parcelado-ou-a-vista` | Parcelado vs À Vista | "Parcelado 'sem juros' esconde 21,6% a.a. embutido" |
| `/calculadora/bola-de-neve-ou-cascata` | Bola de Neve vs Cascata | "Cascata economiza R$ 2.340 em juros vs Bola de Neve" |
| `/calculadora/reserva-de-emergencia` | Reserva de Emergência | "Reserva R$ 18.000: CDB rende R$ 1.200 a mais que poupança em 2 anos" |

---

## 📝 Blog (10 Artigos)

Cada artigo termina com CTA para sua calculadora correspondente:

1. `pagar-minimo-do-cartao-12-meses` → Rotativo
2. `parcelamento-sem-juros-verdade` → Parcelado
3. `custo-atrasar-boleto` → Atraso
4. `bola-de-neve-vs-cascata` → Quitação
5. `reserva-de-emergencia-cdi-poupanca` → Reserva
6. `financiamento-48x-custo-real` → Parcelado
7. `decimo-terceiro-divida-ou-investir` → Quitação
8. `cheque-especial-o-juro-mais-caro` → Atraso
9. `quanto-vale-100-reais-de-2015-hoje` → Reserva

---

## 🛡️ Conformidade YMYL / LGPD

- **Metodologia transparente:** Fontes oficiais clicáveis (BACEN, CDC, RFB, CC), histórico de revisões, declaração de independência editorial
- **Política de Privacidade completa:** 11 seções (LGPD Art. 7º, 18), DPO identificado, base legal por categoria
- **Cookie Banner (Consent Mode v2):** Necessários / Analytics / Publicidade — integra GA4 + AdSense
- **GA4 + Consent Mode v2:** `analytics_storage` / `ad_storage` controlados pelo banner
- **Security Headers:** CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy via `vercel.json`

---

## 🧪 Testes

```bash
npm run test      # 32 testes unitários (Vitest) — todas as 5 fórmulas validadas
npm run build     # Next.js static export → 27 páginas HTML
```

**Cobertura de fórmulas testadas:**
- Rotativo: dobro da dívida, nunca-quita, juros mês a mês
- Atraso: multa 2% + juros 1% a.m., cheque especial, custo por dia
- Parcelado: TIR implícita, comparação patrimonial
- Quitação: Snowball vs Avalanche, rollover do mínimo
- Reserva: poupança (Lei 12.703/2012), CDB líquido com IR regressivo, come-cotas não simulado

---

## 🚀 Deploy

### Vercel (automático via GitHub)

1. Push no `main` → GitHub Actions builda + deploya
2. Variáveis de ambiente no Vercel:
   - `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX` (GA4)
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = `ca-pub-XXXXXXXXXXXXXXXX` (AdSense)

### Comandos locais

```bash
npm install
npm run test       # roda 32 testes
npm run build      # gera pasta out/ (static export)
npm run dev        # servidor local http://localhost:3000
```

---

## 📱 TikTok Orgânico (Roteiros em `ROTEIROS_TIKTOK.md`)

**Formato:** 60-120s (≥1min p/ Creator Rewards), vertical 1080x1920, legenda queimada
**Estrutura 6 cenas:** Hook (0-3s) → Setup IA (3-12s) → Demo real (12-35s) → Contador (35-50s) → Choque (50-55s) → CTA bio (55-60s)
**Pipeline IA:** `openvino-art` (DreamShaper) → `animar_replicate.py` (Replicate minimax/video-01) → Screencast real → CapCut
**CTA fixo:** "Calcula a SUA. Link na bio." + comentário fixado com link

---

## 📊 Métricas Alvo (Primeiros 90 dias)

| Métrica | Alvo |
|---|---|
| Vídeos publicados | 30 (3-4/semana) |
| Seguidores TikTok | 1.000+ (link na bio liberado) |
| Sessões/mês (GA4) | 5.000+ |
| RPM AdSense | R$ 22-45/1k (finanças) |
| Conversão afiliado | 1-2% |

---

## 📁 Estrutura

```
calculadoras-financeiras/
├── src/
│   ├── app/
│   │   ├── calculadora/[5 rotas]/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── metodologia/page.tsx
│   │   ├── politica-de-privacidade/page.tsx
│   │   ├── layout.tsx          # GA4 + CookieBanner + Security Headers
│   │   └── page.tsx            # Home hero TikTok
│   ├── components/
│   │   ├── Calculadora*.tsx    # 5 UIs client-side
│   │   ├── CookieBanner.tsx    # Consent Mode v2
│   │   └── GoogleAnalytics.tsx # GA4 + Consent Mode v2
│   ├── lib/calculators/
│   │   ├── rotativo.ts, atraso.ts, parcelado.ts, quitacao.ts, reserva.ts
│   │   └── __tests__/          # 32 testes Vitest
│   └── config/site.ts
├── vercel.json                 # Security Headers + CSP
├── .env.example                # GA_ID, ADSENSE_ID
├── ROTEIROS_TIKTOK.md          # 10 roteiros prontos
└── PLAN.md                     # Arquitetura completa
```

---

## ✅ Checklist Pós-Deploy

- [ ] GA4 property criada → `NEXT_PUBLIC_GA_ID` no Vercel
- [ ] AdSense aprovado → `NEXT_PUBLIC_ADSENSE_CLIENT_ID` no Vercel
- [ ] Search Console → submit `sitemap.xml`
- [ ] Conta TikTok Business criada (finanças)
- [ ] Bio TikTok com link Vercel + UTMs
- [ ] 1º vídeo (Rotativo) publicado + comentário fixado

---

## 📄 Licença

MIT — use, adapte, evolua. Créditos ao projeto original são bem-vindos.