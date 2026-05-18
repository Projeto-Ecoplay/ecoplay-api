const { Conquista, UsuarioConquista } = require('../models');

async function list(req, res) {
  try {
    const rows = await Conquista.findAll({ order: [['id', 'ASC']] });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await Conquista.findByPk(Number(req.params.id), {
      include: ['usuario_conquistas'],
    });
    if (!row) {
      return res.status(404).json({ error: 'Conquista não encontrada' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { nome, descricao, url_icone, xp_recompensa } = req.body;
    if (!nome || xp_recompensa === undefined) {
      return res.status(400).json({ error: 'nome e xp_recompensa são obrigatórios' });
    }
    const row = await Conquista.create({ nome, descricao, url_icone, xp_recompensa });
    res.status(201).json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await Conquista.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Conquista não encontrada' });
    }
    const { nome, descricao, url_icone, xp_recompensa } = req.body;
    await row.update({
      ...(nome !== undefined && { nome }),
      ...(descricao !== undefined && { descricao }),
      ...(url_icone !== undefined && { url_icone }),
      ...(xp_recompensa !== undefined && { xp_recompensa }),
    });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await Conquista.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Conquista não encontrada' });
    }
    await UsuarioConquista.destroy({ where: { conquista_id: row.id } });
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };