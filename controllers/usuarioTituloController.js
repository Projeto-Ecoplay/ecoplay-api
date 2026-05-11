const { UsuarioTitulo } = require('../models');

async function list(req, res) {
  try {
    const { usuario_id, titulo_id } = req.query;
    const where = {};
    if (usuario_id) where.usuario_id = Number(usuario_id);
    if (titulo_id) where.titulo_id = Number(titulo_id);
    const rows = await UsuarioTitulo.findAll({
      where,
      include: ['usuario', 'titulo'],
      order: [['id', 'ASC']],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const row = await UsuarioTitulo.findByPk(Number(req.params.id), {
      include: ['usuario', 'titulo'],
    });
    if (!row) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { usuario_id, titulo_id, desbloqueado_em } = req.body;
    if (!usuario_id || !titulo_id) {
      return res.status(400).json({ error: 'usuario_id e titulo_id são obrigatórios' });
    }
    const row = await UsuarioTitulo.create({
      usuario_id,
      titulo_id,
      desbloqueado_em: desbloqueado_em ?? new Date(),
    });
    const full = await UsuarioTitulo.findByPk(row.id, {
      include: ['usuario', 'titulo'],
    });
    res.status(201).json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const row = await UsuarioTitulo.findByPk(Number(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    await row.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { list, getById, create, remove };