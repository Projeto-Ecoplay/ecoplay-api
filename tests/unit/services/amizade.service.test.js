jest.mock('../../../models/Usuario', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../../../models/Amizade', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
}));

const AppError = require('../../../services/shared/error.service');
const usuarioModel = require('../../../models/Usuario');
const amizadeModel = require('../../../models/Amizade');
const amizadeService = require('../../../services/social/amizade.service');

describe('services/social/amizade.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejeita quando usuario_id e amigo_id sao iguais', async () => {
    await expect(amizadeService.solicitarAmizade(1, 1)).rejects.toBeInstanceOf(AppError);
  });

  it('cria amizade quando usuarios existem', async () => {
    usuarioModel.findByPk.mockResolvedValue({ id: 1 });
    amizadeModel.create.mockResolvedValue({ id: 1, status: 'pendente' });

    const result = await amizadeService.solicitarAmizade(1, 2);

    expect(result).toEqual({ id: 1, status: 'pendente' });
  });

  it('aceita amizade quando existe', async () => {
    const amizade = { id: 1, save: jest.fn(), status: 'pendente' };
    amizadeModel.findByPk.mockResolvedValue(amizade);

    const result = await amizadeService.aceitarAmizade(1);

    expect(result.status).toBe('aceito');
    expect(amizade.save).toHaveBeenCalled();
  });
});
