const { Missao, UsuarioMissao } = require('../models');

async function list(req, res) {
  try {
    const rows = await Missao.findAll({ order: [['id', 'ASC']] });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await Missao.findByPk(Number(req.params.id), {
      include: [{ association: 'usuario_missoes', include: ['usuario'] }],
    });
    if (!row) {
      return res.status(404).json({ error: 'Missão não encontrada' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { titulo, descricao, pontos_recompensa, nivel_requerido } = req.body;
    const row = await Missao.create({
      titulo,
      descricao,
      pontos_recompensa,
      nivel_requerido,
    });
    res.status(201).json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await Missao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Missão não encontrada' });
    }
    const { titulo, descricao, pontos_recompensa, nivel_requerido } = req.body;
    await row.update({
      ...(titulo !== undefined && { titulo }),
      ...(descricao !== undefined && { descricao }),
      ...(pontos_recompensa !== undefined && { pontos_recompensa }),
      ...(nivel_requerido !== undefined && { nivel_requerido }),
    });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await Missao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Missão não encontrada' });
    }
    await UsuarioMissao.destroy({ where: { missao_id: row.id } });
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };
