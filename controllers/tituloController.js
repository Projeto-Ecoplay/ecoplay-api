const { Titulo, UsuarioTitulo } = require('../models');

async function list(req, res) {
  try {
    const rows = await Titulo.findAll({ order: [['id', 'ASC']] });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await Titulo.findByPk(Number(req.params.id), {
      include: ['usuario_titulos'],
    });
    if (!row) {
      return res.status(404).json({ error: 'Título não encontrado' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { nome, descricao, xp_necessario } = req.body;
    if (!nome || xp_necessario === undefined) {
      return res.status(400).json({ error: 'nome e xp_necessario são obrigatórios' });
    }
    const row = await Titulo.create({ nome, descricao, xp_necessario });
    res.status(201).json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await Titulo.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Título não encontrado' });
    }
    const { nome, descricao, xp_necessario } = req.body;
    await row.update({
      ...(nome !== undefined && { nome }),
      ...(descricao !== undefined && { descricao }),
      ...(xp_necessario !== undefined && { xp_necessario }),
    });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await Titulo.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Título não encontrado' });
    }
    await UsuarioTitulo.destroy({ where: { titulo_id: row.id } });
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };