const { mockReq, mockRes } = require('../../mocks/reqRes');

jest.mock('../../../models', () => ({
  Usuario: {
    scope: jest.fn(),
    findByPk: jest.fn(),
  },
}));

jest.mock('../../../lib/password', () => ({
  compararSenha: jest.fn(),
}));

jest.mock('../../../lib/jwt', () => ({
  emitirToken: jest.fn(),
}));

const { Usuario } = require('../../../models');
const { compararSenha } = require('../../../lib/password');
const { emitirToken } = require('../../../lib/jwt');
const authController = require('../../../controllers/authController');

describe('controllers/authController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna 400 quando falta email ou senha', async () => {
    const req = mockReq({ body: { email: '' } });
    const res = mockRes();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('retorna 401 para credenciais invalidas', async () => {
    Usuario.scope.mockReturnValue({ findOne: jest.fn().mockResolvedValue(null) });
    const req = mockReq({ body: { email: 'user@exemplo.com', senha: 'Senha#123' } });
    const res = mockRes();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('retorna token quando credenciais sao validas', async () => {
    const user = { id: 1, email: 'user@exemplo.com', senha: 'hash' };
    const safe = { id: 1, email: 'user@exemplo.com' };

    Usuario.scope.mockReturnValue({ findOne: jest.fn().mockResolvedValue(user) });
    Usuario.findByPk.mockResolvedValue(safe);
    compararSenha.mockResolvedValue(true);
    emitirToken.mockReturnValue('token');

    const req = mockReq({ body: { email: user.email, senha: 'Senha#123' } });
    const res = mockRes();

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledWith({ token: 'token', usuario: safe });
  });

  it('retorna 503 quando JWT nao configurado', async () => {
    const user = { id: 1, email: 'user@exemplo.com', senha: 'hash' };

    Usuario.scope.mockReturnValue({ findOne: jest.fn().mockResolvedValue(user) });
    Usuario.findByPk.mockResolvedValue({ id: 1, email: user.email });
    compararSenha.mockResolvedValue(true);
    emitirToken.mockImplementation(() => {
      throw new Error('JWT_SECRET nao esta definido');
    });

    const req = mockReq({ body: { email: user.email, senha: 'Senha#123' } });
    const res = mockRes();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(503);
  });

  it('me retorna 404 quando usuario nao existe', async () => {
    Usuario.findByPk.mockResolvedValue(null);
    const req = mockReq({ user: { id: 1 } });
    const res = mockRes();

    await authController.me(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('me retorna 200 com usuario', async () => {
    const usuario = { id: 1, email: 'user@exemplo.com' };
    Usuario.findByPk.mockResolvedValue(usuario);

    const req = mockReq({ user: { id: 1 } });
    const res = mockRes();

    await authController.me(req, res);

    expect(res.json).toHaveBeenCalledWith(usuario);
  });
});
