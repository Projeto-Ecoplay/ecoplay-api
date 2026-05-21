const { mockReq, mockRes } = require('../../mocks/reqRes');

jest.mock('../../../models', () => ({
  sequelize: {
    transaction: jest.fn(),
  },
  Usuario: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    scope: jest.fn(),
  },
  UsuarioMissao: { destroy: jest.fn() },
  Doacao: { destroy: jest.fn() },
  UsuarioItem: { destroy: jest.fn() },
  UsuarioAvatar: { destroy: jest.fn() },
  Amizade: { destroy: jest.fn() },
  UsuarioTitulo: { destroy: jest.fn() },
  UsuarioConquista: { destroy: jest.fn() },
}));

jest.mock('../../../lib/password', () => ({
  hashSenha: jest.fn().mockResolvedValue('hash'),
}));

const { sequelize, Usuario } = require('../../../models');
const usuarioController = require('../../../controllers/usuarioController');

describe('controllers/usuarioController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lista usuarios', async () => {
    Usuario.findAll.mockResolvedValue([{ id: 1 }]);
    const req = mockReq();
    const res = mockRes();

    await usuarioController.list(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('getById retorna 404 quando nao existe', async () => {
    Usuario.findByPk.mockResolvedValue(null);
    const req = mockReq({ params: { id: '1' } });
    const res = mockRes();

    await usuarioController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('create retorna 400 quando falta email ou senha', async () => {
    const req = mockReq({ body: { email: '' } });
    const res = mockRes();

    await usuarioController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('create retorna 201 quando ok', async () => {
    const created = { id: 1 };
    Usuario.scope.mockReturnValue({ create: jest.fn().mockResolvedValue(created) });
    Usuario.findByPk.mockResolvedValue({ id: 1, email: 'user@exemplo.com' });

    const req = mockReq({ body: { email: 'user@exemplo.com', senha: 'Senha#123' } });
    const res = mockRes();

    await usuarioController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('update retorna 404 quando nao existe', async () => {
    Usuario.scope.mockReturnValue({ findByPk: jest.fn().mockResolvedValue(null) });

    const req = mockReq({ params: { id: '1' }, body: { nome: 'Novo' } });
    const res = mockRes();

    await usuarioController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('remove retorna 404 quando nao existe', async () => {
    const transaction = { commit: jest.fn(), rollback: jest.fn() };
    sequelize.transaction.mockResolvedValue(transaction);
    Usuario.findByPk.mockResolvedValue(null);

    const req = mockReq({ params: { id: '1' } });
    const res = mockRes();

    await usuarioController.remove(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(transaction.rollback).toHaveBeenCalled();
  });
});
