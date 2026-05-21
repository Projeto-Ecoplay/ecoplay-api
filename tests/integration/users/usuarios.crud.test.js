const request = require('supertest');
const app = require('../../../app');
const { setupDatabase } = require('../../setup/setupDatabase');
const { createUsuario } = require('../../helpers/factories');
const { gerarToken, authHeader } = require('../../helpers/auth');
const { Usuario } = require('../../../models');

setupDatabase();

describe('Usuarios - CRUD', () => {
  it('cria usuario', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'Teste', email: 'user@exemplo.com', senha: 'Senha#123' });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
  });

  it('lista usuarios', async () => {
    await createUsuario({ email: 'list@exemplo.com' });
    const res = await request(app).get('/api/usuarios');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('atualiza usuario', async () => {
    const { usuario } = await createUsuario();
    const token = gerarToken(usuario);

    const res = await request(app)
      .patch(`/api/usuarios/${usuario.id}`)
      .set(authHeader(token))
      .send({ nome: 'Novo Nome' });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Novo Nome');
  });

  it('remove usuario', async () => {
    const { usuario } = await createUsuario();
    const token = gerarToken(usuario);

    const res = await request(app)
      .delete(`/api/usuarios/${usuario.id}`)
      .set(authHeader(token));

    expect(res.status).toBe(204);
  });

  it('armazenha senha com hash', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'Hash', email: 'hash@exemplo.com', senha: 'Senha#123' });

    const row = await Usuario.scope('withSenha').findByPk(res.body.id);

    expect(row.senha).not.toBe('Senha#123');
  });
});
