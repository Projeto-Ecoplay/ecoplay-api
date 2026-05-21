const { mockReq, mockRes } = require('../../mocks/reqRes');

jest.mock('../../../models', () => ({
  Amizade: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

const { Amizade } = require('../../../models');
const amizadeController = require('../../../controllers/amizadeController');

describe('controllers/amizadeController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('list retorna 400 quando falta usuario_id', async () => {
    const req = mockReq({ query: {} });
    const res = mockRes();

    await amizadeController.list(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('create retorna 400 quando usuario_id e amigo_id sao iguais', async () => {
    const req = mockReq({ body: { usuario_id: 1, amigo_id: 1 } });
    const res = mockRes();

    await amizadeController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('getById retorna 404 quando nao existe', async () => {
    Amizade.findByPk.mockResolvedValue(null);
    const req = mockReq({ params: { id: '1' } });
    const res = mockRes();

    await amizadeController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
