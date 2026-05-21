jest.mock('../../../models/Usuario', () => ({
  findByPk: jest.fn(),
}));

const AppError = require('../../../services/shared/error.service');
const usuarioModel = require('../../../models/Usuario');
const pontuacaoService = require('../../../services/usuario/pontuacao.service');

describe('services/usuario/pontuacao.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adicionarPontos rejeita valor invalido', async () => {
    const usuario = { pontos: 10, save: jest.fn() };
    usuarioModel.findByPk.mockResolvedValue(usuario);

    await expect(pontuacaoService.adicionarPontos(1, 0)).rejects.toBeInstanceOf(AppError);
  });

  it('adicionarPontos soma e salva', async () => {
    const usuario = { pontos: 10, save: jest.fn() };
    usuarioModel.findByPk.mockResolvedValue(usuario);

    const result = await pontuacaoService.adicionarPontos(1, 5);

    expect(usuario.pontos).toBe(15);
    expect(result).toEqual({ pontos: 15 });
  });

  it('removerPontos nao deixa negativo', async () => {
    const usuario = { pontos: 3, save: jest.fn() };
    usuarioModel.findByPk.mockResolvedValue(usuario);

    const result = await pontuacaoService.removerPontos(1, 10);

    expect(result).toEqual({ pontos: 0 });
  });
});
