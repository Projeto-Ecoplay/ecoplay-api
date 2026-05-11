const { UsuarioConquista } = require('../models');

async function list(req, res) {
  try {
    const { usuario_id, conquista_id } = req.query;
    const where = {};
    if (usuario_id) where.usuario_id = Number(usuario_id);
    if (conquista_id) where.conquista_id = Number(conquista_id);
    const rows = await UsuarioConquista.findAll({
      where,
      include: ['usuario', 'conquista'],
      order: [['id', 'ASC']],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await UsuarioConquista.findByPk(Number(req.params.id), {
      include: ['usuario', 'conquista'],
    });
    if (!row) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { usuario_id, conquista_id, desbloqueada_em } = req.body;
    if (!usuario_id || !conquista_id) {
      return res.status(400).json({ error: 'usuario_id e conquista_id são obrigatórios' });
    }
    const row = await UsuarioConquista.create({
      usuario_id,
      conquista_id,
      desbloqueada_em: desbloqueada_em ?? new Date(),
    });
    const full = await UsuarioConquista.findByPk(row.id, {
      include: ['usuario', 'conquista'],
    });
    res.status(201).json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await UsuarioConquista.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, remove };