INSERT INTO missoes
(
    titulo,
    descricao,
    nivel,
    xp_recompensa,
    pontos_recompensa,
    progresso_total,
    url_imagem
)
VALUES

-- LEVEL 1 - INTRODUÇÃO À HORTA

(
    'Escolha sua Semente',
    'Sua jornada começa aqui! Escolha o alimento que quer ver crescer e crie a sua primeira horta. O que você vai plantar?',
    1, 20, 10, 1, NULL
),

(
    'Organize as Sementes',
    'Antes de plantar, é preciso se preparar! Separe e identifique cada semente para saber exatamente o que vai nascer em cada canteiro.',
    1, 25, 15, 1, NULL
),

(
    'Prepare a Terra',
    'Uma boa planta precisa de um bom lar! Solte e limpe o solo, removendo pedras e torrões duros para que as raízes possam crescer com liberdade.',
    1, 35, 20, 3, NULL
),

(
    'Primeira Rega',
    'A semente já está na terra - agora ela precisa de água! Faça a primeira rega e observe a magia do crescimento começar.',
    1, 40, 20, 1, NULL
),

(
    'Luz do Sol',
    'Plantas adoram luz! Verifique se o seu canteiro está recebendo sol suficiente. Se precisar, mude a planta para um lugar mais iluminado.',
    1, 45, 25, 2, NULL
),

(
    'Continue os Cuidados',
    'Cuidar de uma planta é uma rotina! Regue a sua horta por alguns dias seguidos e veja como ela responde quando recebe atenção todos os dias.',
    1, 50, 30, 3, NULL
),

(
    'Primeira Colheita',
    'Chegou o grande momento! O alimento que você plantou, regou e cuidou está pronto. Faça a sua primeira colheita e comemore essa conquista!',
    1, 80, 50, 1, NULL
),

-- LEVEL 2 - CUIDADOS COM O CULTIVO

(
    'Nova Plantação',
    'Você já sabe como começar - agora é hora de expandir! Escolha uma espécie diferente da primeira e plante um novo canteiro na sua horta.',
    2, 60, 35, 1, NULL
),

(
    'Limpeza da Horta',
    'Com mais plantas crescendo, a horta precisa de atenção! Retire folhas secas e resíduos que possam atrapalhar o desenvolvimento das plantas.',
    2, 65, 35, 3, NULL
),

(
    'Uso Consciente da Água',
    'Água é vida - mas não pode desperdiçar! Regue apenas o quanto a planta precisa, nem mais, nem menos. Aprenda a quantidade certa para cada espécie.',
    2, 70, 40, 5, NULL
),

(
    'Cuidado Diário',
    'Uma horta saudável é uma horta visitada todo dia! Observe suas plantas, verifique o solo e registre como elas estão crescendo ao longo dos dias.',
    2, 80, 45, 3, NULL
),

(
    'Faça Compostagem',
    'Cascas de frutas e restos de verdura viram adubo! Junte esses materiais e crie o seu composto natural para deixar a terra da horta ainda mais rica.',
    2, 90, 50, 2, NULL
),

(
    'Proteja a Plantação',
    'Nem tudo que aparece na horta é bem-vindo! Inspecione suas plantas e retire pragas, ervas daninhas ou qualquer coisa que esteja atrapalhando o crescimento.',
    2, 90, 50, 2, NULL
),

(
    'Organize os Materiais',
    'Uma horta organizada é mais fácil de cuidar! Guarde ferramentas e materiais em seus lugares, deixando tudo pronto para o próximo dia de cultivo.',
    2, 100, 60, 3, NULL
),

-- LEVEL 3 - SUSTENTABILIDADE

(
    'Cultive Tomates',
    'O tomate é um clássico da horta! Plante-o no espaço que você já preparou, aplique o composto que fez antes e acompanhe o seu crescimento dia a dia.',
    3, 100, 60, 2, NULL
),

(
    'Cultive Alface',
    'A alface cresce rápido e precisa de solo úmido. Plante ao lado dos tomates e descubra como espécies diferentes convivem no mesmo espaço de cultivo.',
    3, 100, 60, 2, NULL
),

(
    'Reutilize Materiais',
    'Garrafa velha, pote sem tampa, caixa descartada - tudo pode virar vaso! Use materiais que seriam jogados fora para criar novos espaços de cultivo na sua horta.',
    3, 110, 70, 3, NULL
),

(
    'Separe os Recicláveis',
    'Antes de descartar qualquer material da horta, separe o que pode ser reciclado. Plástico, papel e vidro têm destinos diferentes - e você já sabe disso!',
    3, 120, 70, 4, NULL
),

(
    'Monte uma Mini Horta',
    'Pouco espaço não é desculpa! Use vasos ou recipientes reutilizados para montar uma mini horta em uma janela, varanda ou cantinho do quintal.',
    3, 130, 75, 2, NULL
),

(
    'Evite Desperdício',
    'Você já aprendeu a regar com consciência. Agora aplique isso a tudo: use só o adubo necessário, reaproveite sobras e cuide para não desperdiçar nada.',
    3, 140, 80, 3, NULL
),

(
    'Pesquise Sobre Compostagem',
    'Você já fez compostagem - mas sabe por que ela funciona? Pesquise como os microrganismos transformam restos orgânicos em adubo e anote o que aprendeu.',
    3, 150, 90, 1, NULL
),

-- LEVEL 4 - CONSCIÊNCIA AMBIENTAL

(
    'Proteja as Abelhas',
    'Sem abelhas, não há colheita! Pesquise como esses insetos polinizam as plantas e descubra o que você pode fazer na sua horta para atrair e protegê-los.',
    4, 160, 90, 1, NULL
),

(
    'Limpeza Sustentável',
    'Hora de uma faxina verde! Limpe o espaço da horta sem usar produtos químicos - use apenas água, panos reutilizáveis e materiais naturais.',
    4, 170, 100, 4, NULL
),

(
    'Horta Colorida',
    'Uma horta diversa é mais saudável e mais bonita! Plante verduras e legumes de diferentes cores e tamanhos para criar um espaço cheio de vida.',
    4, 180, 110, 4, NULL
),

(
    'Observe a Natureza',
    'A horta está cheia de vida além das plantas! Observe insetos, pássaros e outros elementos naturais ao redor e anote o que encontrar. A natureza tem muita coisa para contar.',
    4, 190, 120, 2, NULL
),

(
    'Reutilize Água da Chuva',
    'A chuva é um presente da natureza! Coloque baldes ou recipientes para coletar água da chuva e use-a para regar a horta nos dias seguintes.',
    4, 220, 140, 2, NULL
),

(
    'Ajude sua Escola',
    'Você já tem experiência! Leve sementes, materiais ou seu conhecimento para ajudar a criar ou cuidar de uma horta na sua escola ou comunidade.',
    4, 240, 150, 1, NULL
),

(
    'Pesquise Plantas da Região',
    'Cada lugar tem plantas que crescem melhor ali! Descubra quais espécies são nativas da sua região e pense em como incluir alguma delas na sua horta.',
    4, 250, 160, 1, NULL
),

-- LEVEL 5 - COMUNIDADE E COLABORAÇÃO

(
    'Compartilhe sua Colheita',
    'Você cultivou com tanto cuidado - agora é hora de dividir! Doe ou ofereça parte da sua colheita para alguém da família, vizinhos ou da comunidade.',
    5, 260, 170, 1, NULL
),

(
    'Cultive em Equipe',
    'Juntos é mais divertido! Convide alguém para cuidar da horta com você, dividam as tarefas e descubram o que cada um aprende ao trabalhar em grupo.',
    5, 270, 180, 3, NULL
),

(
    'Ajude uma Instituição',
    'Coloque em prática tudo que aprendeu! Contribua com uma escola, uma ONG ou horta comunitária - seja com sementes, materiais ou ajuda nos cuidados.',
    5, 280, 190, 1, NULL
),

(
    'Compartilhe uma Dica Verde',
    'Você aprendeu muito nessa jornada! Escolha uma prática sustentável que te marcou e ensine para outra pessoa como ela pode fazer o mesmo em casa.',
    5, 300, 200, 1, NULL
),

(
    'Doe Materiais Recicláveis',
    'Você já sabe separar recicláveis - agora dê o próximo passo! Junte uma quantidade maior e leve até um ponto de coleta ou entregue a um projeto sustentável da sua cidade.',
    5, 320, 220, 3, NULL
),

(
    'Ajude na Limpeza do Espaço',
    'Uma área verde cuidada pertence a todos! Organize um mutirão ou participe de uma ação de limpeza em um espaço de cultivo ou área verde da sua comunidade.',
    5, 350, 240, 3, NULL
),

(
    'Mestre da Horta',
    'Sua horta nunca esteve tão bem! Mantenha todas as plantas saudáveis, o solo adubado e os cuidados em dia - mostre que você domina o cultivo de verdade.',
    5, 360, 250, 5, NULL
),

-- LEVEL 6 - MESTRE DO ECOPLAY

(
    'Cultivo Sustentável',
    'Você já sabe cultivar - agora faça isso do jeito mais consciente possível. Use apenas água da chuva coletada, adubo do seu composto e materiais reutilizados.',
    6, 380, 260, 5, NULL
),

(
    'Horta Completa',
    'Uma horta de verdade tem variedade! Certifique-se de que você está cultivando ao mesmo tempo pelo menos seis espécies diferentes - verduras, legumes e temperos.',
    6, 400, 280, 6, NULL
),

(
    'Incentive Novos Cultivos',
    'Passe a semente adiante - literalmente! Dê sementes ou mudas para alguém que ainda não tem uma horta e ajude essa pessoa a dar os primeiros passos no cultivo.',
    6, 420, 300, 2, NULL
),

(
    'Cuide do Meio Ambiente',
    'Vá além da horta! Realize três ações sustentáveis fora do cultivo - pode ser plantar uma muda nativa, limpar um espaço público ou reduzir o lixo da sua casa por uma semana.',
    6, 450, 320, 5, NULL
),

(
    'Lenda do EcoPlay',
    'Este é o desafio final - e só os verdadeiros Mestres chegam até aqui. Faça uma última colheita completa, doe parte dela para alguém, replante o canteiro e deixe sua horta pronta para o próximo ciclo.',
    6, 500, 400, 1, NULL
);
