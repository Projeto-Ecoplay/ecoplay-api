const { Avatar, UsuarioAvatar } = require('../models');

async function list(req, res) {
  try {
    const rows = await Avatar.findAll({ order: [['id', 'ASC']] });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await Avatar.findByPk(Number(req.params.id), {
      include: [{ association: 'usuario_avatares', include: ['usuario'] }],
    });
    if (!row) {
      return res.status(404).json({ error: 'Avatar não encontrado' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { nome, url_imagem } = req.body;
    const row = await Avatar.create({ nome, url_imagem });
    res.status(201).json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const row = await Avatar.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Avatar não encontrado' });
    }
    const { nome, url_imagem } = req.body;
    await row.update({
      ...(nome !== undefined && { nome }),
      ...(url_imagem !== undefined && { url_imagem }),
    });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await Avatar.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Avatar não encontrado' });
    }
    await UsuarioAvatar.destroy({ where: { avatar_id: row.id } });
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, update, remove };
