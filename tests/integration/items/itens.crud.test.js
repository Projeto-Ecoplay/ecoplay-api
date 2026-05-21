const request = require('supertest');
const app = require('../../../app');
const { setupDatabase } = require('../../setup/setupDatabase');
const { createItem } = require('../../helpers/factories');

setupDatabase();

describe('Itens - CRUD', () => {
  it('cria item', async () => {
    const res = await request(app)
      .post('/api/itens')
      .send({ nome: 'Item', descricao: 'Desc', custo_pontos: 10 });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
  });

  it('lista itens', async () => {
    await createItem();
    const res = await request(app).get('/api/itens');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('remove item', async () => {
    const item = await createItem();
    const res = await request(app).delete(`/api/itens/${item.id}`);

    expect(res.status).toBe(204);
  });
});
