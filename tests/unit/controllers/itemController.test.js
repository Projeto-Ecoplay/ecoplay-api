const { mockReq, mockRes } = require('../../mocks/reqRes');

jest.mock('../../../models', () => ({
  Item: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  UsuarioItem: { destroy: jest.fn() },
}));

const { Item } = require('../../../models');
const itemController = require('../../../controllers/itemController');

describe('controllers/itemController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lista itens', async () => {
    Item.findAll.mockResolvedValue([{ id: 1 }]);
    const req = mockReq();
    const res = mockRes();

    await itemController.list(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('getById retorna 404 quando nao existe', async () => {
    Item.findByPk.mockResolvedValue(null);
    const req = mockReq({ params: { id: '1' } });
    const res = mockRes();

    await itemController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('create retorna 201 quando ok', async () => {
    Item.create.mockResolvedValue({ id: 1 });
    const req = mockReq({ body: { nome: 'Item' } });
    const res = mockRes();

    await itemController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});
