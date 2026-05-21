const { hashSenha, compararSenha, saltRounds } = require('../../../lib/password');

describe('lib/password', () => {
  it('gera hash e compara corretamente', async () => {
    const plain = 'Senha#123';
    const hash = await hashSenha(plain);

    expect(hash).not.toBe(plain);
    await expect(compararSenha(plain, hash)).resolves.toBe(true);
    await expect(compararSenha('errada', hash)).resolves.toBe(false);
  });

  it('usa salt rounds configurado', () => {
    process.env.BCRYPT_SALT_ROUNDS = '4';
    expect(saltRounds()).toBe(4);
  });
});
