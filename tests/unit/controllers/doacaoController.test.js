const { mockReq, mockRes } = require('../../mocks/reqRes');

jest.mock('../../../models', () => ({
  Doacao: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

const { Doacao } = require('../../../models');
const doacaoController = require('../../../controllers/doacaoController');

describe('controllers/doacaoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lista doacoes', async () => {
    Doacao.findAll.mockResolvedValue([{ id: 1 }]);
    const req = mockReq();
    const res = mockRes();

    await doacaoController.list(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('create retorna 400 quando falta usuario_id ou instituicao_id', async () => {
    const req = mockReq({ body: { usuario_id: 1 } });
    const res = mockRes();

    await doacaoController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('update retorna 404 quando nao existe', async () => {
    Doacao.findByPk.mockResolvedValue(null);
    const req = mockReq({ params: { id: '1' }, body: { descricao: 'Nova' } });
    const res = mockRes();

    await doacaoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
