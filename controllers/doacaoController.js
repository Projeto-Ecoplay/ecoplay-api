const { Doacao } = require('../models');

async function list(req, res) {
  try {
    const { usuario_id } = req.query;
    const where = {};
    if (usuario_id) where.usuario_id = Number(usuario_id);
    const rows = await Doacao.findAll({
      where,
      include: ['usuario'],
      order: [['id', 'DESC']],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await Doacao.findByPk(Number(req.params.id), {
      include: ['usuario'],
    });
    if (!row) {
      return res.status(404).json({ error: 'Doação não encontrada' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { usuario_id, descricao, data } = req.body;
    if (!usuario_id) {
      return res.status(400).json({ error: 'usuario_id é obrigatório' });
    }
    const row = await Doacao.create({
      usuario_id,
      descricao,
      data: data ?? new Date(),
    });
    const full = await Doacao.findByPk(row.id, { include: ['usuario'] });
    res.status(201).json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await Doacao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Doação não encontrada' });
    }
    const { descricao, data } = req.body;
    await row.update({
      ...(descricao !== undefined && { descricao }),
      ...(data !== undefined && { data }),
    });
    const full = await Doacao.findByPk(row.id, { include: ['usuario'] });
    res.json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await Doacao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Doação não encontrada' });
    }
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };
