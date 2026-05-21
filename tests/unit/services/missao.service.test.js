jest.mock('../../../models/Usuario', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../../../models/Missao', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../../../services/usuario/pontuacao.service', () => ({
  adicionarPontos: jest.fn(),
}));

jest.mock('../../../services/usuario/nivel.service', () => ({
  atualizarNivel: jest.fn(),
}));

const AppError = require('../../../services/shared/error.service');
const usuarioModel = require('../../../models/Usuario');
const missaoModel = require('../../../models/Missao');
const pontuacaoService = require('../../../services/usuario/pontuacao.service');
const nivelService = require('../../../services/usuario/nivel.service');
const missaoService = require('../../../services/missao/missao.service');

describe('services/missao/missao.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejeita quando usuario nao existe', async () => {
    usuarioModel.findByPk.mockResolvedValue(null);
    missaoModel.findByPk.mockResolvedValue({ id: 1, recompensa: 10 });

    await expect(missaoService.concluirMissao(1, 1)).rejects.toBeInstanceOf(AppError);
  });

  it('conclui missao e retorna recompensa', async () => {
    usuarioModel.findByPk.mockResolvedValue({ id: 1 });
    missaoModel.findByPk.mockResolvedValue({ id: 2, recompensa: 10 });
    pontuacaoService.adicionarPontos.mockResolvedValue({ pontos: 10 });
    nivelService.atualizarNivel.mockResolvedValue({ nivel: 2 });

    const result = await missaoService.concluirMissao(1, 2);

    expect(result.recompensa).toBe(10);
    expect(result.nivel).toEqual({ nivel: 2 });
    expect(result.message).toContain('Miss');
  });
});
