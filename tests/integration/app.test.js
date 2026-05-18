const request = require('supertest');

const app = require('../../app');

describe('API', () => {

  it('deve responder na rota raiz', async () => {

    const response = await request(app)
      .get('/');

    expect(response.status).toBe(200);

    expect(response.body.ok).toBe(true);

  });

});