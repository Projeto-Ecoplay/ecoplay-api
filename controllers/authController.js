const { Usuario } = require('../models');
const { compararSenha } = require('../lib/password');
const { emitirToken } = require('../lib/jwt');

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: 'email e senha são obrigatórios' });
    }
    const user = await Usuario.scope('withSenha').findOne({
      where: { email: String(email).trim() },
    });
    if (!user || !user.senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const ok = await compararSenha(senha, user.senha);
    if (!ok) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const safe = await Usuario.findByPk(user.id);
    let token;
    try {
      token = emitirToken({
        sub: String(user.id),
        email: user.email,
      });
    } catch (err) {
      if (err.message && err.message.includes('JWT_SECRET')) {
        return res.status(503).json({ error: err.message });
      }
      throw err;
    }
    res.json({ token, usuario: safe });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function me(req, res) {
  try {
    const row = await Usuario.findByPk(req.user.id);
    if (!row) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { login, me };
