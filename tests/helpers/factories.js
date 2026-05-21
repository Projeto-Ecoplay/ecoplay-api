const { faker } = require('@faker-js/faker');
const {
  Usuario,
  Missao,
  Item,
  Instituicao,
  Doacao,
  Amizade,
} = require('../../models');
const { hashSenha } = require('../../lib/password');

function buildUsuarioData(overrides = {}) {
  return {
    nome: overrides.nome || faker.person.fullName(),
    email: overrides.email || faker.internet.email().toLowerCase(),
    senha: overrides.senha,
    nivel: overrides.nivel ?? 1,
    xp: overrides.xp ?? 0,
    pontos_total: overrides.pontos_total ?? 0,
    pontos_semana: overrides.pontos_semana ?? 0,
    titulo_atual: overrides.titulo_atual ?? null,
  };
}

async function createUsuario(overrides = {}) {
  const senhaPlain = overrides.senhaPlain || 'Senha#123';
  const senhaHash = overrides.senhaHash || (await hashSenha(senhaPlain));
  const payload = buildUsuarioData({ ...overrides, senha: senhaHash });
  const row = await Usuario.scope('withSenha').create(payload);
  const safe = await Usuario.findByPk(row.id);
  return { usuario: safe, senhaPlain };
}

async function createMissao(overrides = {}) {
  return await Missao.create({
    titulo: overrides.titulo || faker.lorem.words(3),
    descricao: overrides.descricao || faker.lorem.sentence(),
    nivel: overrides.nivel ?? 1,
    xp_recompensa: overrides.xp_recompensa ?? 10,
    pontos_recompensa: overrides.pontos_recompensa ?? 5,
    progresso_total: overrides.progresso_total ?? 10,
    url_imagem: overrides.url_imagem || faker.image.url(),
  });
}

async function createItem(overrides = {}) {
  return await Item.create({
    nome: overrides.nome || faker.commerce.productName(),
    descricao: overrides.descricao || faker.commerce.productDescription(),
    custo_pontos: overrides.custo_pontos ?? 10,
    url_imagem: overrides.url_imagem || faker.image.url(),
  });
}

async function createInstituicao(overrides = {}) {
  return await Instituicao.create({
    nome: overrides.nome || faker.company.name(),
    tipo: overrides.tipo || 'ONG',
    endereco: overrides.endereco || faker.location.streetAddress(),
    telefone: overrides.telefone || faker.phone.number(),
  });
}

async function createDoacao(overrides = {}) {
  const usuarioId = overrides.usuario_id || overrides.usuarioId;
  const instituicaoId = overrides.instituicao_id || overrides.instituicaoId;
  let usuarioRef = usuarioId;
  let instituicaoRef = instituicaoId;

  if (!usuarioRef) {
    const { usuario } = await createUsuario();
    usuarioRef = usuario.id;
  }

  if (!instituicaoRef) {
    const instituicao = await createInstituicao();
    instituicaoRef = instituicao.id;
  }

  return await Doacao.create({
    usuario_id: usuarioRef,
    instituicao_id: instituicaoRef,
    descricao: overrides.descricao || faker.lorem.sentence(),
    quantidade: overrides.quantidade ?? 1,
    data: overrides.data || new Date(),
  });
}

async function createAmizade(overrides = {}) {
  let usuarioId = overrides.usuario_id || overrides.usuarioId;
  let amigoId = overrides.amigo_id || overrides.amigoId;

  if (!usuarioId) {
    const { usuario } = await createUsuario();
    usuarioId = usuario.id;
  }

  if (!amigoId) {
    const { usuario } = await createUsuario();
    amigoId = usuario.id;
  }

  return await Amizade.create({
    usuario_id: usuarioId,
    amigo_id: amigoId,
  });
}

module.exports = {
  buildUsuarioData,
  createUsuario,
  createMissao,
  createItem,
  createInstituicao,
  createDoacao,
  createAmizade,
};
