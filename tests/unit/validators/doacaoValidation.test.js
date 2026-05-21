const { mockReq, mockRes } = require('../../mocks/reqRes');

jest.mock('../../../models', () => ({
  Doacao: {
    create: jest.fn(),
  },
}));

const doacaoController = require('../../../controllers/doacaoController');

describe('validators/doacao', () => {
  it('rejeita doacao sem usuario_id', async () => {
    const req = mockReq({ body: { instituicao_id: 1 } });
    const res = mockRes();

    await doacaoController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
