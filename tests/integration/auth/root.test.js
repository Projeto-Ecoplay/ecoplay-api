const request = require('supertest');
const app = require('../../../app');

describe('API - raiz e health', () => {
  it('retorna ok na raiz', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('retorna health', async () => {
    const res = await request(app).get('/health');

    expect([200, 503]).toContain(res.status);
    expect(res.body.ok).toBeDefined();
  });
});
