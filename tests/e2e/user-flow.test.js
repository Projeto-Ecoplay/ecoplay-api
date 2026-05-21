const request = require('supertest');
const app = require('../../app');
const { setupDatabase } = require('../setup/setupDatabase');

setupDatabase();

describe('E2E - fluxo completo', () => {
  it('cadastro, login, autenticacao e CRUD basico', async () => {
    const email = 'e2e@exemplo.com';
    const senha = 'Senha#123';

    const signup = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'E2E', email, senha });

    expect(signup.status).toBe(201);

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email, senha });

    expect(login.status).toBe(200);
    const token = login.body.token;

    const me = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(me.status).toBe(200);

    const missao = await request(app)
      .post('/api/missoes')
      .send({ titulo: 'Missao', descricao: 'Desc', nivel: 1 });

    expect(missao.status).toBe(201);

    const item = await request(app)
      .post('/api/itens')
      .send({ nome: 'Item', descricao: 'Desc', custo_pontos: 10 });

    expect(item.status).toBe(201);

    const instituicao = await request(app)
      .post('/api/instituicoes')
      .send({ nome: 'Instituicao', tipo: 'ONG', endereco: 'Rua 1' });

    expect(instituicao.status).toBe(201);

    const doacao = await request(app)
      .post('/api/doacoes')
      .send({
        usuario_id: signup.body.id,
        instituicao_id: instituicao.body.id,
        descricao: 'Doacao',
      });

    expect(doacao.status).toBe(201);

    const amigo = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'Amigo', email: 'amigo@exemplo.com', senha: 'Senha#123' });

    const amizade = await request(app)
      .post('/api/amizades')
      .send({ usuario_id: signup.body.id, amigo_id: amigo.body.id });

    expect(amizade.status).toBe(201);

    const remove = await request(app)
      .delete(`/api/usuarios/${signup.body.id}`);

    expect(remove.status).toBe(204);
  });
});
