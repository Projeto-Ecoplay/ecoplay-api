const { Item, UsuarioItem } = require('../models');

async function list(req, res) {
  try {
    const rows = await Item.findAll({ order: [['id', 'ASC']] });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await Item.findByPk(Number(req.params.id), {
      include: [{ association: 'usuario_itens', include: ['usuario'] }],
    });
    if (!row) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { nome, descricao, custo_pontos } = req.body;
    const row = await Item.create({ nome, descricao, custo_pontos });
    res.status(201).json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await Item.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    const { nome, descricao, custo_pontos } = req.body;
    await row.update({
      ...(nome !== undefined && { nome }),
      ...(descricao !== undefined && { descricao }),
      ...(custo_pontos !== undefined && { custo_pontos }),
    });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await Item.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    await UsuarioItem.destroy({ where: { item_id: row.id } });
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };
