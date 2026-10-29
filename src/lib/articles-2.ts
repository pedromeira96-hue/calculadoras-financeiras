import type { ConteudoArtigo, Artigo } from "./articles";

export const ARTIGOS_2: Artigo[] = [
  {
    slug: "financiamento-48x-custo-real",
    titulo: "Financiamento em 48x: O Número que Ninguém Te Mostra",
    descricao:
      "Simule o custo real de um financiamento longo e compare pagar à vista com desconto versus parcelado.",
    calculadora: {
      href: "/calculadora/parcelado-ou-a-vista",
      label: "Calcular financiamento",
      emoji: "💳",
    },
    conteudo: [
      {
        tipo: "h2",
        texto: "Financiamento longo esconde juros no preço",
      },
      {
        tipo: "p",
        texto:
          "Financiar um bem em 48 meses parece acessível porque a parcela cabe no bolso. Mas o preço à vista costuma ser bem menor que a soma das parcelas — a diferença é o custo do financiamento embutido.",
      },
      { tipo: "cta", texto: "Simular custo real", link: "/calculadora/parcelado-ou-a-vista", linkLabel: "Parcelado ou À Vista" },
      {
        tipo: "p",
        texto:
          "Exemplo: bem de R$ 12.000, à vista com 15% de desconto (R$ 10.200), parcelado em 48× de R$ 280 (R$ 13.440 no total). A taxa implícita do financiamento é cerca de 1,4% ao mês — ou 18,2% ao ano. Você paga R$ 3.240 a mais parcelando.",
      },
      {
        tipo: "h2",
        texto: "Como comparar",
      },
      {
        tipo: "p",
        texto:
          "Use nossa calculadora de taxa implícita: preço total, número de parcelas e desconto à vista. Ela mostra a taxa anual equivalente e compara o patrimônio de quem paga à vista e investe a diferença contra quem financia.",
      },
      {
        tipo: "alerta",
        texto: "Conteúdo educacional. Financiamentos podem incluir IOF, seguros e tarifas não simulados aqui.",
      },
    ],
    faq: [
      {
        q: "O que é taxa implícita?",
        a: "É a taxa de juros embutida na diferença entre o preço à vista e a soma das parcelas.",
      },
      {
        q: "48 parcelas sempre saem mais caro?",
        a: "Geralmente sim, porque você paga juros por um período longo. Mas pode valer a pena se evitar crédito mais caro (rotativo, cheque especial).",
      },
    ],
  },
  {
    slug: "decimo-terceiro-divida-ou-investir",
    titulo: "13º Salário: Pagar Dívida ou Investir?",
    descricao:
      "Compare quitar dívida cara versus investir o 13º salário e descubra qual caminho deixa mais dinheiro no bolso.",
    calculadora: {
      href: "/calculadora/bola-de-neve-ou-cascata",
      label: "Simular quitação",
      emoji: "❄️",
    },
    conteudo: [
      {
        tipo: "h2",
        texto: "O dilema do 13º salário",
      },
      {
        tipo: "p",
        texto:
          "Recebeu o 13º e não sabe se deve quitar a dívida ou investir? A regra geral é simples: se o juro da dívida for maior que a rentabilidade líquida do investimento, quitar a dívida rende mais.",
      },
      { tipo: "cta", texto: "Simular quitação", link: "/calculadora/bola-de-neve-ou-cascata", linkLabel: "Bola de Neve ou Cascata" },
      {
        tipo: "p",
        texto:
          "Exemplo: dívida de R$ 5.000 a 15% ao mês no cartão. Investir o 13º a 14,5% ao ano (CDI) rende muito menos do que você economiza ao quitar a dívida. Nessa situação, quitar é a melhor “aplicação” disponível.",
      },
      {
        tipo: "h2",
        texto: "Passo a passo",
      },
      {
        tipo: "p",
        texto:
          "1) Liste suas dívidas com valor e taxa. 2) Compare a taxa da dívida mais cara com a rentabilidade líquida do investimento. 3) Se a dívida for mais cara, quite-a primeiro. 4) Use o simulador de quitação para ver o impacto no prazo total.",
      },
    ],
    faq: [
      {
        q: "Sempre devo quitar dívida antes de investir?",
        a: "Se a dívida for mais cara que o investimento líquido, sim. Se for um financiamento imobiliário barato, pode valer investir.",
      },
      {
        q: "Onde encontro a taxa da minha dívida?",
        a: "Na fatura do cartão, no contrato do empréstimo ou no extrato da sua conta bancária.",
      },
    ],
  },
  {
    slug: "cheque-especial-o-juro-mais-caro",
    titulo: "Cheque Especial: Por Que É o Juro Mais Caro do Brasil?",
    descricao:
      "Compare o custo do cheque especial com atraso de boleto e descubra por que ele é considerado o crédito mais caro.",
    calculadora: {
      href: "/calculadora/custo-de-atrasar",
      label: "Calcular atraso",
      emoji: "⏰",
    },
    conteudo: [
      {
        tipo: "h2",
        texto: "O cheque especial cobra juros sobre tudo",
      },
      {
        tipo: "p",
        texto:
          "Diferente do boleto atrasado, que tem multa de até 2% e juros de mora, o cheque especial cobra juros compostos sobre todo o saldo utilizado, todos os dias, sem multa fixa. As taxas são bem mais altas que a média do mercado.",
      },
      { tipo: "cta", texto: "Calcular atraso", link: "/calculadora/custo-de-atrasar", linkLabel: "Quanto Custa Atrasar?" },
      {
        tipo: "p",
        texto:
          "Exemplo: R$ 1.000 no cheque especial por 30 dias a 12% ao mês. Total: R$ 1.120,00. O mesmo valor atrasado no boleto (2% multa + 1% a.m.) custaria cerca de R$ 515,10. O cheque especial é mais que o dobro do custo.",
      },
      {
        tipo: "h2",
        texto: "Como sair do cheque especial",
      },
      {
        tipo: "p",
        texto:
          "O Banco Central recomenda negociar o saldo do cheque especial com o banco para transformar em um empréstimo com taxa menor. Nunca deixe o saldo no cheque especial por meses seguidos — os juros compostos fazem a dívida crescer rápido.",
      },
      { tipo: "alerta", texto: "Conteúdo educacional. Confira a taxa do seu cheque especial no extrato ou app do banco." },
    ],
    faq: [
      {
        q: "Cheque especial tem multa?",
        a: "Não. Cobra apenas juros compostos sobre o saldo utilizado, a taxas geralmente altas.",
      },
      {
        q: "Qual é a taxa média?",
        a: "Varia por banco, mas costuma ficar bem acima de 10% ao mês. Consulte o site do Banco Central para taxas medianas.",
      },
    ],
  },
  {
    slug: "quanto-vale-100-reais-de-2015-hoje",
    titulo: "R$ 100 de 2015 Valem Quanto Hoje?",
    descricao:
      "Entenda o efeito da inflação no poder de compra e por que a reserva de emergência precisa ser reajustada com o tempo.",
    calculadora: {
      href: "/calculadora/reserva-de-emergencia",
      label: "Calcular reserva",
      emoji: "🛡️",
    },
    conteudo: [
      {
        tipo: "h2",
        texto: "A inflação come o dinheiro parado",
      },
      {
        tipo: "p",
        texto:
          "R$ 100 em 2015 não compram o mesmo que R$ 100 hoje. A inflação reduz o poder de compra ao longo do tempo, e por isso sua reserva de emergência precisa ser revisada periodicamente — não basta guardar um valor fixo e esquecer.",
      },
      { tipo: "cta", texto: "Calcular reserva", link: "/calculadora/reserva-de-emergencia", linkLabel: "Reserva de Emergência" },
      {
        tipo: "p",
        texto:
          "Exemplo: se sua reserva era de R$ 6.000 em 2015 e a inflação acumulada do período foi de cerca de 80%, você precisaria de aproximadamente R$ 10.800 hoje para ter o mesmo poder de compra. Nossa calculadora de reserva ajuda a definir o valor-alvo atualizado pelos seus gastos mensais atuais.",
      },
      {
        tipo: "h2",
        texto: "O que fazer?",
      },
      {
        tipo: "p",
        texto:
          "Revise sua reserva pelo menos uma vez por ano. Atualize o valor-alvo com base nos seus gastos essenciais atuais e mantenha a reserva em um investimento de liquidez diária (poupança, CDB ou Tesouro Selic).",
      },
    ],
    faq: [
      {
        q: "Com que frequência revisar a reserva?",
        a: "Pelo menos uma vez por ano, ou sempre que houver mudança nos seus gastos essenciais.",
      },
      {
        q: "Onde manter a reserva?",
        a: "Em investimento de liquidez diária e baixo risco, como poupança, CDB ou Tesouro Selic.",
      },
    ],
  },
];
