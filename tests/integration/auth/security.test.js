const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const { setupDatabase } = require('../../setup/setupDatabase');
const { createUsuario } = require('../../helpers/factories');

setupDatabase();

describe('Auth - seguranca', () => {
  it('rejeita tentativa de SQL injection no login', async () => {
    const { usuario } = await createUsuario();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: `${usuario.email}' OR 1=1 --`, senha: 'Senha#123' });

    expect(res.status).toBe(401);
  });

  it('rejeita token expirado', async () => {
    const token = jwt.sign({ sub: '1', email: 'user@exemplo.com' }, process.env.JWT_SECRET, {
      issuer: 'ecoplay-api',
      expiresIn: '-10s',
    });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(401);
  });
});
