const { mockReq, mockRes } = require('../../mocks/reqRes');

jest.mock('../../../models', () => ({
  Usuario: {
    scope: jest.fn(),
  },
}));

const usuarioController = require('../../../controllers/usuarioController');

describe('validators/usuario', () => {
  it('rejeita cadastro sem email', async () => {
    const req = mockReq({ body: { senha: 'Senha#123' } });
    const res = mockRes();

    await usuarioController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
