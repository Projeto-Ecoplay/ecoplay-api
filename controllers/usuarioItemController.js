const { UsuarioItem } = require('../models');

async function list(req, res) {
  try {
    const { usuario_id } = req.query;
    const where = {};
    if (usuario_id) where.usuario_id = Number(usuario_id);
    const rows = await UsuarioItem.findAll({
      where,
      include: ['usuario', 'item'],
      order: [['id', 'ASC']],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await UsuarioItem.findByPk(Number(req.params.id), {
      include: ['usuario', 'item'],
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
    const { usuario_id, item_id, data_aquisicao } = req.body;
    if (!usuario_id || !item_id) {
      return res
        .status(400)
        .json({ error: 'usuario_id e item_id são obrigatórios' });
    }
    const row = await UsuarioItem.create({
      usuario_id,
      item_id,
      data_aquisicao: data_aquisicao ?? new Date(),
    });
    const full = await UsuarioItem.findByPk(row.id, {
      include: ['usuario', 'item'],
    });
    res.status(201).json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await UsuarioItem.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Registo não encontrado' });
    }
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, remove };
