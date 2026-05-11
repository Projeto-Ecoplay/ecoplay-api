const { Op } = require('sequelize');
const { hashSenha } = require('../lib/password');
const {
  sequelize,
  Usuario,
  UsuarioMissao,
  Doacao,
  UsuarioItem,
  UsuarioAvatar,
  Amizade,
  UsuarioTitulo,
  UsuarioConquista,
} = require('../models');

async function list(req, res) {
  try {
    const rows = await Usuario.findAll({
      order: [['id', 'ASC']],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const id = Number(req.params.id);
    const row = await Usuario.findByPk(id, {
      include: [
        { association: 'usuario_missoes', include: ['missao'] },
        'doacoes',
        { association: 'usuario_itens', include: ['item'] },
        { association: 'usuario_avatares', include: ['avatar'] },
        { association: 'usuario_titulos', include: ['titulo'] },
        { association: 'usuario_conquistas', include: ['conquista'] },
      ],
    });
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { nome, email, senha, nivel, xp, pontos_total, pontos_semana, titulo_atual } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: 'email e senha são obrigatórios' });
    }
    const senhaHash = await hashSenha(senha);
    const row = await Usuario.scope('withSenha').create({
      nome,
      email,
      senha: senhaHash,
      nivel,
      xp,
      pontos_total,
      pontos_semana,
      titulo_atual,
    });
    const safe = await Usuario.findByPk(row.id);
    res.status(201).json(safe);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email já registado' });
    }
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const row = await Usuario.scope('withSenha').findByPk(id);
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const { nome, email, senha, nivel, xp, pontos_total, pontos_semana, titulo_atual } = req.body;
    const patch = {
      ...(nome !== undefined && { nome }),
      ...(email !== undefined && { email }),
      ...(nivel !== undefined && { nivel }),
      ...(xp !== undefined && { xp }),
      ...(pontos_total !== undefined && { pontos_total }),
      ...(pontos_semana !== undefined && { pontos_semana }),
      ...(titulo_atual !== undefined && { titulo_atual }),
    };
    if (senha !== undefined && senha !== null && String(senha).length > 0) {
      patch.senha = await hashSenha(senha);
    }
    await row.update(patch);
    const safe = await Usuario.findByPk(id);
    res.json(safe);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email já registado' });
    }
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  const t = await sequelize.transaction();
  try {
    const id = Number(req.params.id);
    const row = await Usuario.findByPk(id, { transaction: t });
    if (!row) {
      await t.rollback();
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await UsuarioMissao.destroy({ where: { usuario_id: id }, transaction: t });
    await Doacao.destroy({ where: { usuario_id: id }, transaction: t });
    await UsuarioItem.destroy({ where: { usuario_id: id }, transaction: t });
    await UsuarioAvatar.destroy({ where: { usuario_id: id }, transaction: t });
    await UsuarioTitulo.destroy({ where: { usuario_id: id }, transaction: t });
    await UsuarioConquista.destroy({ where: { usuario_id: id }, transaction: t });
    await Amizade.destroy({
      where: { [Op.or]: [{ usuario_id: id }, { amigo_id: id }] },
      transaction: t,
    });
    await row.destroy({ transaction: t });
    await t.commit();
    res.status(204).send();
  } catch (e) {
    await t.rollback();
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };
