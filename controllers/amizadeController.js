const { Op } = require('sequelize');
const { Amizade } = require('../models');

async function list(req, res) {
  try {
    const { usuario_id } = req.query;
    if (!usuario_id) {
      return res
        .status(400)
        .json({ error: 'Query usuario_id é obrigatória para listar amizades' });
    }
    const uid = Number(usuario_id);
    const rows = await Amizade.findAll({
      where: {
        [Op.or]: [{ usuario_id: uid }, { amigo_id: uid }],
      },
      include: [
        { association: 'usuario', attributes: { exclude: ['senha'] } },
        { association: 'amigo', attributes: { exclude: ['senha'] } },
      ],
      order: [['id', 'ASC']],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await Amizade.findByPk(Number(req.params.id), {
      include: [
        { association: 'usuario', attributes: { exclude: ['senha'] } },
        { association: 'amigo', attributes: { exclude: ['senha'] } },
      ],
    });
    if (!row) {
      return res.status(404).json({ error: 'Amizade não encontrada' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { usuario_id, amigo_id } = req.body;
    if (!usuario_id || !amigo_id) {
      return res
        .status(400)
        .json({ error: 'usuario_id e amigo_id são obrigatórios' });
    }
    if (Number(usuario_id) === Number(amigo_id)) {
      return res.status(400).json({ error: 'Não pode ser amigo de si mesmo' });
    }
    const row = await Amizade.create({ usuario_id, amigo_id });
    const full = await Amizade.findByPk(row.id, {
      include: [
        { association: 'usuario', attributes: { exclude: ['senha'] } },
        { association: 'amigo', attributes: { exclude: ['senha'] } },
      ],
    });
    res.status(201).json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await Amizade.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Amizade não encontrada' });
    }
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, remove };
