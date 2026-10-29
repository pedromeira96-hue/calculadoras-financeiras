export type ConteudoArtigo = {
  tipo: "p" | "h2" | "cta" | "alerta";
  texto: string;
  link?: string;
  linkLabel?: string;
};

export type Artigo = {
  slug: string;
  titulo: string;
  descricao: string;
  calculadora: {
    href: string;
    label: string;
    emoji: string;
  };
  conteudo: ConteudoArtigo[];
  faq: Array<{ q: string; a: string }>;
};

export const ARTIGOS: Artigo[] = [
  {
    slug: "pagar-minimo-do-cartao-12-meses",
    titulo: "Pagar o Mínimo do Cartão por 12 Meses: Quanto a Dívida Vira?",
    descricao:
      "Simule o rotativo do cartão pagando o mínimo da fatura durante um ano e descubra o preço real de adiar a conta.",
    calculadora: {
      href: "/calculadora/rotativo-do-cartao",
      label: "Calcular rotativo",
      emoji: "🔄",
    },
    conteudo: [
      { tipo: "h2", texto: "Pagar o mínimo parece resolver o mês, mas ativa o rotativo" },
      {
        tipo: "p",
        texto:
          "Quando você não paga a fatura inteira do cartão de crédito, o valor não pago entra automaticamente no crédito rotativo. É uma linha de crédito cara, cobrada com juros compostos mês a mês sobre o saldo devedor. A conta abaixo mostra quanto essa decisão custa após 12 meses.",
      },
      { tipo: "cta", texto: "Calcule o seu caso", link: "/calculadora/rotativo-do-cartao", linkLabel: "Calculadora do Rotativo" },
      {
        tipo: "p",
        texto:
          "Exemplo com saldo de R$ 3.000, taxa de 15% ao mês e pagamento do mínimo (15% do saldo): após 12 meses, o saldo é maior que R$ 4.600. Você pagou aproximadamente R$ 1.800 de juros e ainda deve mais do que devia no começo.",
      },
      {
        tipo: "h2",
        texto: "Por que o rotativo cresce tão rápido?",
      },
      {
        tipo: "p",
        texto:
          "O juro composto incide sobre o saldo atual, incluindo os juros do mês anterior. Se o seu pagamento mensal for menor ou igual aos juros cobrados naquele mês, o saldo nunca diminui — e dobra em cerca de 5 meses a 15% ao mês (fórmula: ln(2) / ln(1 + taxa)).",
      },
      {
        tipo: "h2",
        texto: "Regras e fontes",
      },
      {
        tipo: "p",
        texto:
          "O Banco Central determina que a parcela mínima do rotativo seja de pelo menos 15% do saldo (Resolução CMN 3.910/2018). Isso significa que, se você pagar só o mínimo, está exatamente no limite de manter a dívida viva. Não incluímos IOF nem tarifas nesta simulação — consulte o contrato do seu cartão.",
      },
      { tipo: "alerta", texto: "Conteúdo educacional. Não é recomendação financeira. Verifique a taxa real na sua fatura." },
      {
        tipo: "h2",
        texto: "Perguntas frequentes",
      },
      {
        tipo: "p",
        texto:
          "Pagar o mínimo atrasa o problema, mas não resolve. O ideal é quitar o valor integral da fatura ou negociar o saldo com o banco por uma linha de crédito mais barata.",
      },
    ],
    faq: [
      {
        q: "O que é o rotativo do cartão?",
        a: "É a linha de crédito automática acionada quando você não paga a fatura inteira. Cobra juros compostos sobre o saldo devedor mês a mês.",
      },
      {
        q: "O mínimo da fatura é obrigatório?",
        a: "É o valor mínimo para não entrar no rotativo, mas pagar só ele mantém você nessa linha de crédito cara. O BACEN exige que seja pelo menos 15% do saldo.",
      },
      {
        q: "Como sair do rotativo?",
        a: "Pagando a fatura inteira, negociando o saldo com o banco ou usando uma linha de crédito mais barata para quitar o cartão.",
      },
    ],
  },
  {
    slug: "parcelamento-sem-juros-verdade",
    titulo: "Parcelado “Sem Juros” Vale a Pena? Descubra a Taxa Escondida",
    descricao:
      "O desconto à vista revela o juro embutido no parcelamento. Simule e compare pagar à vista ou parcelado com desconto.",
    calculadora: {
      href: "/calculadora/parcelado-ou-a-vista",
      label: "Calcular parcelado",
      emoji: "💳",
    },
    conteudo: [
      {
        tipo: "h2",
        texto: "“Sem juros” não é de graça",
      },
      {
        tipo: "p",
        texto:
          "Quando uma loja oferece parcelamento “sem juros”, ela está embutindo um custo no preço. Quem paga à vista geralmente consegue um desconto — esse desconto é o custo de oportunidade de quem escolhe parcelar. Nossa calculadora converte isso em uma taxa anual equivalente.",
      },
      { tipo: "cta", texto: "Simular parcelado", link: "/calculadora/parcelado-ou-a-vista", linkLabel: "Parcelado ou À Vista" },
      {
        tipo: "p",
        texto:
          "Exemplo: produto de R$ 3.000, parcelado em 12× de R$ 250, com 10% de desconto à vista (preço à vista = R$ 2.700). A taxa implícita do parcelamento é cerca de 1,64% ao mês — ou 21,6% ao ano embutidos no preço. Você “paga” isso deixando de ter o desconto à vista.",
      },
      {
        tipo: "h2",
        texto: "Como a conta é feita",
      },
      {
        tipo: "p",
        texto:
          "Usamos a TIR (Taxa Interna de Retorno): resolvemos a taxa mensal que iguala o preço à vista ao valor presente das parcelas. Depois comparamos o patrimônio em 12 meses de quem paga à vista e investe a diferença contra quem parcela e investe o valor total, sacando as parcelas todo mês.",
      },
      {
        tipo: "h2",
        texto: "Quando parcelar faz sentido?",
      },
      {
        tipo: "p",
        texto:
          "Se o desconto à vista for pequeno e você não tem dinheiro para quitar agora, parcelar “sem juros” pode ser melhor que entrar no rotativo ou no cheque especial. Mas se você tem o dinheiro investido, à vista tende a sair mais barato.",
      },
      {
        tipo: "alerta",
        texto: "Conteúdo educacional. Investimento não tem retorno garantido. Não é recomendação de investimento.",
      },
    ],
    faq: [
      {
        q: "O parcelamento “sem juros” tem juro escondido?",
        a: "Sim, na forma de custo de oportunidade: o desconto à vista que você abre mão. A calculadora mostra esse custo como taxa anual equivalente.",
      },
      {
        q: "Como calcular a taxa implícita?",
        a: "É a TIR mensal que iguala o preço à vista ao valor presente das parcelas. A fórmula é preço à vista = parcela × (1 - (1+i)^-n) / i.",
      },
      {
        q: "Sempre devo pagar à vista?",
        a: "Não necessariamente. Depende da sua rentabilidade alternativa e se parcelar evita linhas de crédito mais caras, como rotativo e cheque especial.",
      },
    ],
  },
  {
    slug: "custo-atrasar-boleto",
    titulo: "Quanto Custa Atrasar um Boleto por 30 Dias?",
    descricao:
      "Calcule multa de 2% e juros de mora de boleto atrasado. Veja o custo por dia e compare com cheque especial.",
    calculadora: {
      href: "/calculadora/custo-de-atrasar",
      label: "Calcular atraso",
      emoji: "⏰",
    },
    conteudo: [
      {
        tipo: "h2",
        texto: "Um dia atrasado já cobra caro",
      },
      {
        tipo: "p",
        texto:
          "Atrasar um boleto ou parcela aciona multa contratual (teto de 2% sobre o valor, pelo CDC) e juros de mora compostos sobre o prazo. Para cada dia de atraso, a conta sobe. Abaixo, veja o custo real em reais.",
      },
      { tipo: "cta", texto: "Calcular atraso", link: "/calculadora/custo-de-atrasar", linkLabel: "Quanto Custa Atrasar?" },
      {
        tipo: "p",
        texto:
          "Exemplo: boleto de R$ 500 atrasado 30 dias, multa de 2% e juros de 1% ao mês. Total a pagar: cerca de R$ 515,10. O custo é de aproximadamente R$ 0,50 por dia de atraso. Se fosse cheque especial a 12% ao mês, o total chegaria a R$ 560,00 — quase R$ 2 por dia.",
      },
      {
        tipo: "h2",
        texto: "Regras legais",
      },
      {
        tipo: "p",
        texto:
          "O Código de Defesa do Consumidor (Lei 8.078/1990, art. 52, §1º) limita a multa por atraso a 2% do valor em relações de consumo. Os juros de mora precisam estar previstos em contrato (Código Civil, art. 406); o padrão comum é 1% ao mês. Não incluímos IOF nem tarifas bancárias nesta simulação.",
      },
      {
        tipo: "h2",
        texto: "Comparação rápida",
      },
      {
        tipo: "p",
        texto:
          "Boleto atrasado (2% + 1% a.m.) costuma ser mais barato que cheque especial para atrasos curtos, mas mais caro que quitar no vencimento. Renegocie antes de deixar acumular.",
      },
      { tipo: "alerta", texto: "Conteúdo educacional. As regras do seu contrato prevalecem sobre os padrões usados aqui." },
    ],
    faq: [
      {
        q: "Qual é a multa máxima por atraso?",
        a: "Em relações de consumo, o CDC limita a multa a 2% do valor (art. 52, §1º).",
      },
      {
        q: "E os juros de mora?",
        a: "Precisam estar no contrato. O padrão comum é 1% ao mês (12% ao ano).",
      },
      {
        q: "IOF está incluído?",
        a: "Não. A simulação é conservadora e não inclui IOF, tarifas ou correção monetária.",
      },
    ],
  },
  {
    slug: "bola-de-neve-vs-cascata",
    titulo: "Bola de Neve ou Cascata: Qual Estratégia Quita Dívidas Mais Barato?",
    descricao:
      "Simule bola de neve e cascata com suas dívidas reais. Compare prazo total, juros pagos e a diferença em reais.",
    calculadora: {
      href: "/calculadora/bola-de-neve-ou-cascata",
      label: "Simular quitação",
      emoji: "❄️",
    },
    conteudo: [
      {
        tipo: "h2",
        texto: "Dois planos, um objetivo: zerar as dívidas",
      },
      {
        tipo: "p",
        texto:
          "Quando você tem várias dívidas, existe um dilema: atacar a menor primeira (para sentir vitória rápida) ou atacar a mais cara primeira (para pagar menos juros). Nossa calculadora simula os dois cenários mês a mês e mostra a diferença exata em reais.",
      },
      { tipo: "cta", texto: "Simular quitação", link: "/calculadora/bola-de-neve-ou-cascata", linkLabel: "Bola de Neve ou Cascata" },
      {
        tipo: "p",
        texto:
          "Exemplo: Cartão de R$ 1.000 a 10% ao mês (mínimo R$ 110) e Empréstimo de R$ 500 a 1% ao mês (mínimo R$ 60), com orçamento extra de R$ 200 por mês. A cascata (maior taxa primeiro) quita primeiro o cartão e economiza juros. A bola de neve (menor valor primeiro) quita primeiro o empréstimo, dá motivação, mas custa mais em juros.",
      },
      {
        tipo: "h2",
        texto: "Como funciona a simulação",
      },
      {
        tipo: "p",
        texto:
          "Cada mês, juros compostos incidem sobre cada saldo ativo. O orçamento (mínimo de todas as dívidas + extra) paga primeiro os mínimos, e o restante vai para a dívida alvo da estratégia escolhida. Quando uma dívida zera, o valor liberado rola para a próxima — o efeito “bola de neve”.",
      },
      { tipo: "alerta", texto: "Os mínimos são informados por você. Confira os valores na fatura ou contrato antes de simular." },
    ],
    faq: [
      {
        q: "O que é bola de neve?",
        a: "Atacar a dívida de menor valor primeiro, liberando verba para a próxima quando cada uma quita. O ganho é motivacional.",
      },
      {
        q: "O que é cascata (avalanche)?",
        a: "Atacar a dívida de maior taxa de juros primeiro. É a estratégia ótima em termos de juros pagos.",
      },
      {
        q: "Qual é melhor?",
        a: "Matematicamente, a cascata paga menos juros. Na prática, a bola de neve pode ajudar na adesão. O melhor plano é o que você mantém.",
      },
    ],
  },
  {
    slug: "reserva-de-emergencia-cdi-poupanca",
    titulo: "Reserva de Emergência: Quanto Guardar e Onde Render Mais?",
    descricao:
      "Calcule o valor-alvo da sua reserva e compare CDB no CDI versus poupança, já descontando o IR e as regras vigentes.",
    calculadora: {
      href: "/calculadora/reserva-de-emergencia",
      label: "Calcular reserva",
      emoji: "🛡️",
    },
    conteudo: [
      {
        tipo: "h2",
        texto: "Reserva de emergência é o seu colchão de segurança",
      },
      {
        tipo: "p",
        texto:
          "Antes de investir em qualquer coisa, você precisa de uma reserva que cubra seus gastos essenciais por alguns meses sem renda. A referência comum é 6 meses para renda estável e até 12 para renda variável. Nossa calculadora mostra o valor-alvo e quanto cada opção rende ao longo do tempo.",
      },
      { tipo: "cta", texto: "Calcular reserva", link: "/calculadora/reserva-de-emergencia", linkLabel: "Reserva de Emergência" },
      {
        tipo: "p",
        texto:
          "Exemplo: gasto mensal de R$ 3.000, cobertura de 6 meses, aporte de R$ 500 por mês. Valor-alvo: R$ 18.000. Comparando CDB líquido a 100% do CDI (com IR regressivo de 17,5%) contra poupança (regra da Lei 12.703/2012), após 24 meses o CDB costuma deixar alguns milhares de reais a mais — dependendo da Selic.",
      },
      {
        tipo: "h2",
        texto: "Regras da poupança e do CDB",
      },
      {
        tipo: "p",
        texto:
          "Poupança: com Selic acima de 8,5% ao ano, rende 0,5% ao mês + TR; abaixo disso, 70% da Selic + TR (Lei 12.703/2012 e Decreto 8.266/2014). CDB: incide IR regressivo (Receita Federal) — 22,5% até 180 dias, 17,5% de 181 a 360 dias, 15% acima de 360. Come-cotas semestral não está incluído nesta simulação.",
      },
      { tipo: "alerta", texto: "Conteúdo educacional. Não é recomendação de investimento. Tesouro Selic, LCI/LCA e fundos têm regras próprias." },
    ],
    faq: [
      {
        q: "Quanto devo ter de reserva?",
        a: "Referência usual: 6 meses de gastos essenciais para renda estável, até 12 para renda variável.",
      },
      {
        q: "Poupança ou CDB?",
        a: "Depende da Selic. Quando ela está alta, a poupança rende bem; quando baixa, o CDB a 100% do CDI costuma render mais mesmo com IR.",
      },
      {
        q: "O que é come-cotas?",
        a: "É a antecipação do IR semestral em CDBs (alíquota de 15% sobre o rendimento do período). Não simulamos esse efeito aqui.",
      },
    ],
  },
];
