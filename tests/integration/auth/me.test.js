const request = require('supertest');
const app = require('../../../app');
const { setupDatabase } = require('../../setup/setupDatabase');
const { createUsuario } = require('../../helpers/factories');
const { gerarToken, authHeader } = require('../../helpers/auth');

setupDatabase();

describe('Auth - me', () => {
  it('retorna 401 sem token', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
  });

  it('retorna usuario autenticado com token valido', async () => {
    const { usuario } = await createUsuario();
    const token = gerarToken(usuario);

    const res = await request(app)
      .get('/api/auth/me')
      .set(authHeader(token));

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(usuario.id);
  });
});
