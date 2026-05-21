jest.mock('../../../models/Usuario', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../../../models/Doacao', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
}));

const AppError = require('../../../services/shared/error.service');
const usuarioModel = require('../../../models/Usuario');
const doacaoModel = require('../../../models/Doacao');
const doacaoService = require('../../../services/doacao/doacao.service');

describe('services/doacao/doacao.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejeita quantidade invalida', async () => {
    usuarioModel.findByPk.mockResolvedValue({ id: 1 });

    await expect(doacaoService.criarDoacao(1, 0)).rejects.toBeInstanceOf(AppError);
  });

  it('cria doacao quando ok', async () => {
    usuarioModel.findByPk.mockResolvedValue({ id: 1 });
    doacaoModel.create.mockResolvedValue({ id: 1, quantidade: 1 });

    const result = await doacaoService.criarDoacao(1, 1);

    expect(result).toEqual({ id: 1, quantidade: 1 });
  });
});
