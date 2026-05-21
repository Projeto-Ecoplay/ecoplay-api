const request = require('supertest');
const app = require('../../../app');
const { setupDatabase } = require('../../setup/setupDatabase');
const { createUsuario } = require('../../helpers/factories');

setupDatabase();

describe('Auth - login', () => {
  it('retorna 400 quando faltam campos', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: '' });

    expect(res.status).toBe(400);
  });

  it('retorna 401 quando senha invalida', async () => {
    const { usuario } = await createUsuario();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: usuario.email, senha: 'SenhaErrada' });

    expect(res.status).toBe(401);
  });

  it('retorna token quando credenciais sao validas', async () => {
    const { usuario, senhaPlain } = await createUsuario();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: usuario.email, senha: senhaPlain });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});
