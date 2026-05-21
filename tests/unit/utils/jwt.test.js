const jwtLib = require('jsonwebtoken');
const { emitirToken, verificarToken, secret, expiresIn } = require('../../../lib/jwt');

describe('lib/jwt', () => {
  it('gera e valida token com payload', () => {
    const token = emitirToken({ sub: '1', email: 'user@exemplo.com' });
    const decoded = verificarToken(token);

    expect(decoded.sub).toBe('1');
    expect(decoded.email).toBe('user@exemplo.com');
  });

  it('usa segredo configurado', () => {
    expect(secret()).toBe(process.env.JWT_SECRET);
  });

  it('usa expiracao configurada', () => {
    expect(expiresIn()).toBe(process.env.JWT_EXPIRES_IN || '7d');
  });

  it('rejeita token invalido', () => {
    const token = jwtLib.sign({ sub: '1' }, 'segredo-errado', { issuer: 'ecoplay-api' });
    expect(() => verificarToken(token)).toThrow('invalid signature');
  });
});
