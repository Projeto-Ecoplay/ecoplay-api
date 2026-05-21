jest.mock('../../../models/Usuario', () => ({
  findByPk: jest.fn(),
}));

const AppError = require('../../../services/shared/error.service');
const usuarioModel = require('../../../models/Usuario');
const progressoService = require('../../../services/missao/progresso.service');

describe('services/missao/progresso.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejeita quando usuario nao existe', async () => {
    usuarioModel.findByPk.mockResolvedValue(null);

    await expect(progressoService.getProgresso(1)).rejects.toBeInstanceOf(AppError);
  });

  it('retorna pontos e nivel', async () => {
    usuarioModel.findByPk.mockResolvedValue({ pontos: 20, nivel: 2 });

    const result = await progressoService.getProgresso(1);

    expect(result).toEqual({ pontos: 20, nivel: 2 });
  });
});
