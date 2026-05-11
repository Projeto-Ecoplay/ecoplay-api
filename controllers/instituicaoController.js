const { Instituicao } = require('../models');

async function list(req, res) {
  try {
    const rows = await Instituicao.findAll({ order: [['id', 'ASC']] });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await Instituicao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Instituição não encontrada' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { nome, tipo, endereco, telefone } = req.body;
    if (!nome || !tipo || !endereco || !telefone) {
      return res.status(400).json({ error: 'nome, tipo, endereco e telefone são obrigatórios' });
    }
    const row = await Instituicao.create({ nome, tipo, endereco, telefone });
    res.status(201).json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await Instituicao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Instituição não encontrada' });
    }
    const { nome, tipo, endereco, telefone } = req.body;
    await row.update({
      ...(nome !== undefined && { nome }),
      ...(tipo !== undefined && { tipo }),
      ...(endereco !== undefined && { endereco }),
      ...(telefone !== undefined && { telefone }),
    });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await Instituicao.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Instituição não encontrada' });
    }
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };