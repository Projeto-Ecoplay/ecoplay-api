CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,

    nivel INT DEFAULT 1,
    xp INT DEFAULT 0,

    pontos_total INT DEFAULT 0,
    pontos_semana INT DEFAULT 0,

    titulo_atual VARCHAR(100),

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE titulos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    xp_necessario INT
);

CREATE TABLE usuario_titulos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo_id INT REFERENCES titulos(id) ON DELETE CASCADE,
    desbloqueado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE missoes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,

    nivel INT,
    xp_recompensa INT,
    pontos_recompensa INT,

    progresso_total INT,

    url_imagem TEXT,

    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuario_missoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    missao_id INT REFERENCES missoes(id) ON DELETE CASCADE,

    progresso_atual INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pendente',

    concluida_em TIMESTAMP
);

CREATE TABLE conquistas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    url_icone TEXT,
    xp_recompensa INT
);

CREATE TABLE usuario_conquistas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    conquista_id INT REFERENCES conquistas(id) ON DELETE CASCADE,
    desbloqueada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE avatares (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    url_imagem TEXT
);

CREATE TABLE usuario_avatares (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    avatar_id INT REFERENCES avatares(id) ON DELETE CASCADE,
    ativo BOOLEAN DEFAULT FALSE
);

CREATE TABLE itens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    custo_pontos INT,
    url_imagem TEXT
);

CREATE TABLE usuario_itens (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    item_id INT REFERENCES itens(id) ON DELETE CASCADE,
    adquirido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE amizades (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    amigo_id INT REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE instituicoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    tipo VARCHAR(50),
    endereco TEXT,
    telefone VARCHAR(20)
);

CREATE TABLE doacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    instituicao_id INT REFERENCES instituicoes(id),

    descricao TEXT,
    quantidade INT,

    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
