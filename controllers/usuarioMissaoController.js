const { UsuarioMissao } = require('../models');

async function list(req, res) {
  try {
    const { usuario_id, missao_id } = req.query;
    const where = {};
    if (usuario_id) where.usuario_id = Number(usuario_id);
    if (missao_id) where.missao_id = Number(missao_id);
    const rows = await UsuarioMissao.findAll({
      where,
      include: ['usuario', 'missao'],
      order: [['id', 'ASC']],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await UsuarioMissao.findByPk(Number(req.params.id), {
      include: ['usuario', 'missao'],
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
    const { usuario_id, missao_id, progresso_atual, status, concluida_em } = req.body;
    if (!usuario_id || !missao_id) {
      return res
        .status(400)
        .json({ error: 'usuario_id e missao_id são obrigatórios' });
    }
    const row = await UsuarioMissao.create({
      usuario_id,
      missao_id,
      progresso_atual: progresso_atual ?? 0,
      status,
      concluida_em,
    });
    const full = await UsuarioMissao.findByPk(row.id, {
      include: ['usuario', 'missao'],
    });
    res.status(201).json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await UsuarioMissao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Registo não encontrado' });
    }
    const { progresso_atual, status, concluida_em } = req.body;
    await row.update({
      ...(progresso_atual !== undefined && { progresso_atual }),
      ...(status !== undefined && { status }),
      ...(concluida_em !== undefined && { concluida_em }),
    });
    const full = await UsuarioMissao.findByPk(row.id, {
      include: ['usuario', 'missao'],
    });
    res.json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await UsuarioMissao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Registo não encontrado' });
    }
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };
