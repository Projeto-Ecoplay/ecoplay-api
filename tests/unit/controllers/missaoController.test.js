const { mockReq, mockRes } = require('../../mocks/reqRes');

jest.mock('../../../models', () => ({
  Missao: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  UsuarioMissao: { destroy: jest.fn() },
}));

const { Missao } = require('../../../models');
const missaoController = require('../../../controllers/missaoController');

describe('controllers/missaoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lista missoes', async () => {
    Missao.findAll.mockResolvedValue([{ id: 1 }]);
    const req = mockReq();
    const res = mockRes();

    await missaoController.list(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('getById retorna 404 quando nao existe', async () => {
    Missao.findByPk.mockResolvedValue(null);
    const req = mockReq({ params: { id: '1' } });
    const res = mockRes();

    await missaoController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('create retorna 201 quando ok', async () => {
    Missao.create.mockResolvedValue({ id: 1 });
    const req = mockReq({ body: { titulo: 'Missao', descricao: 'Desc' } });
    const res = mockRes();

    await missaoController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});
