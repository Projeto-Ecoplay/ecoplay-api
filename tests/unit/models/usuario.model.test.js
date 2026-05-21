const { setupDatabase } = require('../../setup/setupDatabase');
const { Usuario } = require('../../../models');
const { hashSenha } = require('../../../lib/password');

setupDatabase();

describe('models/Usuario', () => {
  it('aplica valores padrao', async () => {
    const senha = await hashSenha('Senha#123');
    const row = await Usuario.scope('withSenha').create({
      nome: 'Usuario Teste',
      email: 'user@exemplo.com',
      senha,
    });

    expect(row.nivel).toBe(1);
    expect(row.xp).toBe(0);
    expect(row.pontos_total).toBe(0);
    expect(row.pontos_semana).toBe(0);
  });
});
