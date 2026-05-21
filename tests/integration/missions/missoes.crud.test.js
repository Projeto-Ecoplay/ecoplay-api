const request = require('supertest');
const app = require('../../../app');
const { setupDatabase } = require('../../setup/setupDatabase');
const { createMissao } = require('../../helpers/factories');

setupDatabase();

describe('Missoes - CRUD', () => {
  it('cria missao', async () => {
    const res = await request(app)
      .post('/api/missoes')
      .send({ titulo: 'Missao', descricao: 'Desc', nivel: 1 });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
  });

  it('lista missoes', async () => {
    await createMissao();
    const res = await request(app).get('/api/missoes');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('atualiza missao', async () => {
    const missao = await createMissao();
    const res = await request(app)
      .patch(`/api/missoes/${missao.id}`)
      .send({ titulo: 'Missao Atualizada' });

    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe('Missao Atualizada');
  });

  it('remove missao', async () => {
    const missao = await createMissao();
    const res = await request(app).delete(`/api/missoes/${missao.id}`);

    expect(res.status).toBe(204);
  });
});
