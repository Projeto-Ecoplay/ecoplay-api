const request = require('supertest');
const app = require('../../app');
const { emitirToken } = require('../../lib/jwt');
const { createUsuario } = require('./factories');

async function loginUsuario(overrides = {}) {
  const { usuario, senhaPlain } = await createUsuario(overrides);
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: usuario.email, senha: senhaPlain });
  return { usuario, response, token: response.body.token };
}

function gerarToken(usuario) {
  return emitirToken({ sub: String(usuario.id), email: usuario.email });
}

function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

module.exports = { loginUsuario, gerarToken, authHeader };
