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
    const { titulo, descricao, nivel, xp_recompensa, pontos_recompensa, progresso_total, url_imagem } = req.body;
    const row = await Missao.create({
      titulo,
      descricao,
      nivel,
      xp_recompensa,
      pontos_recompensa,
      progresso_total,
      url_imagem,
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
    const { titulo, descricao, nivel, xp_recompensa, pontos_recompensa, progresso_total, url_imagem } = req.body;
    await row.update({
      ...(titulo !== undefined && { titulo }),
      ...(descricao !== undefined && { descricao }),
      ...(nivel !== undefined && { nivel }),
      ...(xp_recompensa !== undefined && { xp_recompensa }),
      ...(pontos_recompensa !== undefined && { pontos_recompensa }),
      ...(progresso_total !== undefined && { progresso_total }),
      ...(url_imagem !== undefined && { url_imagem }),
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
