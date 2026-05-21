jest.mock('../../../models/Usuario', () => ({
  findAll: jest.fn(),
}));

const usuarioModel = require('../../../models/Usuario');
const rankingService = require('../../../services/social/ranking.service');

describe('services/social/ranking.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna ranking global', async () => {
    usuarioModel.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await rankingService.getRankingGlobal(5);

    expect(result).toEqual([{ id: 1 }]);
  });
});
