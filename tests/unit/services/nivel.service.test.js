jest.mock('../../../models/Usuario', () => ({
  findByPk: jest.fn(),
}));

const AppError = require('../../../services/shared/error.service');
const usuarioModel = require('../../../models/Usuario');
const nivelService = require('../../../services/usuario/nivel.service');

describe('services/usuario/nivel.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calcula nivel por pontos', () => {
    expect(nivelService.calcularNivel(-1)).toBe(0);
    expect(nivelService.calcularNivel(0)).toBe(0);
    expect(nivelService.calcularNivel(250)).toBe(2);
  });

  it('lanca erro quando usuario nao existe', async () => {
    usuarioModel.findByPk.mockResolvedValue(null);

    await expect(nivelService.atualizarNivel(1)).rejects.toBeInstanceOf(AppError);
  });

  it('atualiza nivel quando muda', async () => {
    const usuario = { pontos: 250, nivel: 1, save: jest.fn() };
    usuarioModel.findByPk.mockResolvedValue(usuario);

    const result = await nivelService.atualizarNivel(1);

    expect(usuario.save).toHaveBeenCalled();
    expect(result).toEqual({ nivel: 2 });
  });
});
