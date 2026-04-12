const { sequelize, UsuarioAvatar } = require('../models');

async function list(req, res) {
  try {
    const { usuario_id } = req.query;
    const where = {};
    if (usuario_id) where.usuario_id = Number(usuario_id);
    const rows = await UsuarioAvatar.findAll({
      where,
      include: ['usuario', 'avatar'],
      order: [['id', 'ASC']],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await UsuarioAvatar.findByPk(Number(req.params.id), {
      include: ['usuario', 'avatar'],
    });
    if (!row) {
      return res.status(404).json({ error: 'Registo não encontrado' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { usuario_id, avatar_id, ativo } = req.body;
    if (!usuario_id || !avatar_id) {
      return res
        .status(400)
        .json({ error: 'usuario_id e avatar_id são obrigatórios' });
    }
    const row = await UsuarioAvatar.create({
      usuario_id,
      avatar_id,
      ativo: ativo ?? false,
    });
    const full = await UsuarioAvatar.findByPk(row.id, {
      include: ['usuario', 'avatar'],
    });
    res.status(201).json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/** Define este avatar como ativo e desativa os outros do mesmo utilizador. */
async function setAtivo(req, res) {
  const t = await sequelize.transaction();
  try {
    const row = await UsuarioAvatar.findByPk(Number(req.params.id), {
      transaction: t,
    });
    if (!row) {
      await t.rollback();
      return res.status(404).json({ error: 'Registo não encontrado' });
    }
    await UsuarioAvatar.update(
      { ativo: false },
      { where: { usuario_id: row.usuario_id }, transaction: t }
    );
    await row.update({ ativo: true }, { transaction: t });
    await t.commit();
    const full = await UsuarioAvatar.findByPk(row.id, {
      include: ['usuario', 'avatar'],
    });
    res.json(full);
  } catch (e) {
    await t.rollback();
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await UsuarioAvatar.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Registo não encontrado' });
    }
    if (req.body.ativo === true) {
      return setAtivo(req, res);
    }
    const { ativo } = req.body;
    if (ativo !== undefined) {
      await row.update({ ativo });
    }
    const full = await UsuarioAvatar.findByPk(row.id, {
      include: ['usuario', 'avatar'],
    });
    res.json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await UsuarioAvatar.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Registo não encontrado' });
    }
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, setAtivo, remove };
