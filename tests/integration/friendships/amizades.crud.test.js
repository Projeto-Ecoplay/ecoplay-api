const request = require('supertest');
const app = require('../../../app');
const { setupDatabase } = require('../../setup/setupDatabase');
const { createUsuario } = require('../../helpers/factories');

setupDatabase();

describe('Amizades - CRUD', () => {
  it('cria amizade', async () => {
    const { usuario: u1 } = await createUsuario();
    const { usuario: u2 } = await createUsuario();

    const res = await request(app)
      .post('/api/amizades')
      .send({ usuario_id: u1.id, amigo_id: u2.id });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
  });

  it('lista amizades', async () => {
    const { usuario: u1 } = await createUsuario();
    const { usuario: u2 } = await createUsuario();

    await request(app)
      .post('/api/amizades')
      .send({ usuario_id: u1.id, amigo_id: u2.id });

    const res = await request(app).get(`/api/amizades?usuario_id=${u1.id}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('remove amizade', async () => {
    const { usuario: u1 } = await createUsuario();
    const { usuario: u2 } = await createUsuario();

    const created = await request(app)
      .post('/api/amizades')
      .send({ usuario_id: u1.id, amigo_id: u2.id });

    const res = await request(app).delete(`/api/amizades/${created.body.id}`);

    expect(res.status).toBe(204);
  });
});
