---
name: frontend-design
description: Orientações para um design visual distinto e intencional ao construir uma nova interface ou reformular uma existente. Ajuda na direção estética, tipografia e em fazer escolhas que não pareçam modelos genéricos.
license: Termos completos em LICENSE.txt
---

# Design Frontend

Aborde isso como o líder de design em um estúdio pequeno, conhecido por dar a cada cliente uma identidade visual que não poderia ser confundida com a de mais ninguém. Este cliente já rejeitou propostas que pareciam genéricas/padronizadas e está pagando por um ponto de vista distinto: faça escolhas deliberadas e opinativas sobre paleta, tipografia e layout que sejam específicas para este briefing, e corra um risco estético real que você possa justificar.

## Ancore no tema

Se o briefing não definir claramente qual é o produto ou tema, defina você mesmo antes de projetar: nomeie um tema concreto, seu público-alvo e a função única da página, e declare sua escolha. Se houver qualquer informação em sua memória sobre as preferências do usuário, contexto sobre o que ele está construindo ou designs que você fez antes – use isso como dica. O próprio mundo do tema — seus materiais, instrumentos, artefatos e vocabulário — é de onde vêm as escolhas distintas. Construa com o conteúdo e o tema reais do briefing do início ao fim.

## Princípios de design

Para designs web, a *hero section* (seção principal) é uma tese. Abra com o elemento mais característico do mundo do tema, no formato que fizer sentido para ele: um título, uma imagem, uma animação, uma demonstração ao vivo, um momento interativo. Seja deliberado na sua escolha: um número grande com um rótulo pequeno, estatísticas de apoio e um acento em gradiente é a resposta padronizada/clichê; só use se for verdadeiramente a melhor opção.

A tipografia carrega a personalidade da página. Combine as fontes de exibição (*display*) e de corpo deliberadamente, não as mesmas famílias que você usaria em qualquer outro projeto, e defina uma escala tipográfica clara com pesos, larguras e espaçamentos intencionais. Faça do próprio tratamento tipográfico uma parte memorável do design, não apenas um veículo neutro para entregar o conteúdo.

Estrutura é informação. Recursos estruturais, numerações, marcadores superiores (*eyebrows*), divisores e rótulos devem codificar algo verdadeiro sobre o conteúdo, não decorá-lo. Muitos designs genéricos usam marcadores numerados (01 / 02 / 03), mas isso só é apropriado se o conteúdo for realmente uma sequência — como um processo real ou uma linha do tempo onde a ordem traz informações necessárias para o leitor. Questione se escolhas como marcadores numerados realmente fazem sentido antes de incorporá-los.

Aproveite o movimento de forma deliberada. Pense onde e se a animação pode servir ao tema: uma sequência de carregamento de página, uma revelação ativada pela rolagem (*scroll*), microinterações ao passar o mouse (*hover*), uma atmosfera ambiente. Um momento orquestrado geralmente causa mais impacto do que efeitos espalhados; escolha o que a direção do projeto pede. No entanto, às vezes menos é mais, e animações excessivas contribuem para a sensação de que o design foi gerado por IA.

Combine a complexidade com a visão. Direções maximalistas precisam de uma execução elaborada; direções minimalistas precisam de precisão no espaçamento, na tipografia e nos detalhes. Elegância é executar bem a visão escolhida.

Considere o conteúdo escrito com cuidado. Frequentemente, um briefing de design pode não conter texto real, e cabe a você criar a redação (*copy*). O texto pode fazer um design parecer tão genérico quanto o próprio layout. Veja a seção abaixo sobre redação para mais orientações.

## Processo: brainstorm, explorar, planejar, criticar, construir, criticar novamente

Para calibração: o design gerado por IA atualmente tende a se agrupar em três visuais: (1) um fundo creme quente (próximo ao #F4F1EA) com uma fonte serifada de exibição de alto contraste e um detalhe em terracota; (2) um fundo quase preto com um único detalhe brilhante em verde-ácido ou vermelhão; (3) um layout no estilo jornal (*broadsheet*) com linhas finas, sem raio de borda (*border-radius: 0*) e colunas densas. Todos os três são legítimos para alguns briefings, mas são padrões (*defaults*) em vez de escolhas conscientes, e aparecem independentemente do tema. Onde o briefing definir uma direção visual, siga-a exatamente — as próprias palavras do briefing sempre vencem, inclusive quando ele pedir um desses visuais. Onde ele deixar um eixo livre, não gaste essa liberdade em um desses padrões. Assim como um designer humano contratado, muitas vezes há um equilíbrio cuidadoso entre fazer o que você é bom e encarar cada projeto como uma oportunidade para experimentar e aprender.

Trabalhe em duas etapas. Primeiro, faça um *brainstorm* de um plano de design curto com base no briefing do usuário: crie um sistema compacto de *tokens* com cor, tipografia, layout e assinatura (*signature*). Cor: descreva a paleta como 4 a 6 valores hexadecimais nomeados. Tipografia: as fontes para mais de 2 papéis (uma fonte de exibição com personalidade usada com moderação, uma fonte de corpo complementar e uma fonte utilitária para legendas ou dados, se necessário). Layout: um conceito de layout, usando descrições em prosa de uma frase e *wireframes* em ASCII para idear e comparar. Assinatura: o elemento único e marcante pelo qual esta página será lembrada e que incorpora o briefing de forma apropriada.

Em seguida, revise esse plano em relação ao briefing antes de construir: se qualquer parte dele parecer um padrão genérico que você produziria para qualquer página semelhante (pense em um *prompt* parecido para ver se chegaria a um resultado similar) em vez de uma escolha feita para este briefing específico — revise essa parte, diga o que mudou e o porquê. Somente após confirmar a relativa originalidade do seu plano de design você deve começar a escrever o código, seguindo o plano revisado exatamente e derivando cada decisão de cor e tipografia dele.

Ao escrever o código, tome cuidado com a estrutura da especificidade dos seus seletores CSS. É fácil gerar classes CSS que se anulam mutuamente (especialmente com um seletor baseado em tipo como `.section` e um seletor baseado em elemento como `.cta`). Isso pode acontecer com frequência com *paddings/margins* entre seções.

Tente fazer a maior parte desse planejamento e iteração em seu pensamento (*thinking process*), e só mostre ideias ao usuário quando tiver alta confiança de que vai encantá-lo.

## Contenção e autocrítica

Gaste sua ousadia em um único lugar. Deixe o elemento de assinatura ser a única coisa memorável, mantenha tudo ao redor discreto e disciplinado, e corte qualquer decoração que não sirva ao briefing. Não correr um risco pode ser um risco em si! Construa com um padrão mínimo de qualidade indiscutível sem precisar anunciá-lo: responsivo até telas de celular, foco de teclado visível e respeito a preferências de movimento reduzido. Critique seu próprio trabalho enquanto constrói, tirando capturas de tela se seu ambiente suportar isso — uma imagem vale mais que 1000 *tokens*. Considere o conselho de Coco Chanel: antes de sair de casa, olhe-se no espelho e tire um acessório. Criadores humanos têm memória e sempre tentam fazer algo novo, então, se você tiver um espaço para anotar rapidamente o que já tentou, isso pode ajudar em etapas futuras.

## Mais sobre redação no design

As palavras aparecem em um design por um único motivo: torná-lo mais fácil de entender e, portanto, mais fácil de usar. Elas são material de design, não decoração. Traga para o texto a mesma intencionalidade que traria para o espaçamento e para a cor. Antes de escrever qualquer coisa, pergunte o que o design precisa dizer e como isso pode ser dito da melhor forma para ajudar a pessoa a navegar pela experiência.

Escreva a partir do ponto de vista do usuário final. Nomeie as coisas pelo que as pessoas controlam e reconhecem, nunca por como o sistema é construído. Uma pessoa gerencia "notificações", não "configuração de webhook". Descreva o que algo faz em termos simples, em vez de tentar vendê-lo. Ser específico é sempre melhor do que tentar ser esperto.

Use a voz ativa como padrão. Um controle deve dizer exatamente o que acontece quando é usado: "Salvar alterações", e não "Enviar". Uma ação mantém o mesmo nome ao longo de todo o fluxo, de modo que o botão que diz "Publicar" gera um aviso (*toast*) que diz "Publicado". O vocabulário de uma interface é a sinalização para quem está navegando pelo produto. Coesão e consistência são a forma como as pessoas aprendem a se orientar.

Trate erros e telas vazias como momentos de orientação, não de drama ou humor. Explique o que deu errado e como corrigir, na voz da interface e não como uma pessoa real. Mensagens de erro não pedem desculpas e nunca são vagas sobre o que aconteceu. Uma tela vazia é um convite para agir.

Mantenha o tom de conversa ajustado: verbos simples, maiúscula apenas no início da frase (*sentence case*), sem encheção de linguiça, com o tom alinhado à marca e ao público. Deixe que cada elemento faça exatamente uma função. Um rótulo rotula, um exemplo demonstra, e nada assume duas funções silenciosamente.