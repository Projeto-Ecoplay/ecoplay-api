jest.mock('../../../models', () => ({
  sequelize: {
    transaction: jest.fn(),
  },
}));

const { sequelize } = require('../../../models');
const transactionService = require('../../../services/shared/transaction.service');

describe('services/shared/transaction.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('commita quando callback tem sucesso', async () => {
    const t = { commit: jest.fn(), rollback: jest.fn() };
    sequelize.transaction.mockResolvedValue(t);

    const result = await transactionService.executar(async () => 'ok');

    expect(result).toBe('ok');
    expect(t.commit).toHaveBeenCalled();
  });

  it('faz rollback quando callback falha', async () => {
    const t = { commit: jest.fn(), rollback: jest.fn() };
    sequelize.transaction.mockResolvedValue(t);

    await expect(transactionService.executar(async () => {
      throw new Error('falha');
    })).rejects.toThrow('falha');

    expect(t.rollback).toHaveBeenCalled();
  });
});
