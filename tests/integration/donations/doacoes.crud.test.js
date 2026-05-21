const request = require('supertest');
const app = require('../../../app');
const { setupDatabase } = require('../../setup/setupDatabase');
const { createUsuario, createInstituicao } = require('../../helpers/factories');

setupDatabase();

describe('Doacoes - CRUD', () => {
  it('cria doacao', async () => {
    const { usuario } = await createUsuario();
    const instituicao = await createInstituicao();

    const res = await request(app)
      .post('/api/doacoes')
      .send({
        usuario_id: usuario.id,
        instituicao_id: instituicao.id,
        descricao: 'Doacao',
        quantidade: 2,
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
  });

  it('lista doacoes', async () => {
    const { usuario } = await createUsuario();
    const instituicao = await createInstituicao();

    await request(app)
      .post('/api/doacoes')
      .send({ usuario_id: usuario.id, instituicao_id: instituicao.id });

    const res = await request(app).get('/api/doacoes');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('remove doacao', async () => {
    const { usuario } = await createUsuario();
    const instituicao = await createInstituicao();

    const created = await request(app)
      .post('/api/doacoes')
      .send({ usuario_id: usuario.id, instituicao_id: instituicao.id });

    const res = await request(app).delete(`/api/doacoes/${created.body.id}`);

    expect(res.status).toBe(204);
  });
});
