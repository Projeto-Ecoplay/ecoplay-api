const { setupDatabase } = require('../../setup/setupDatabase');
const { Missao } = require('../../../models');

setupDatabase();

describe('models/Missao', () => {
  it('aplica valores padrao', async () => {
    const row = await Missao.create({
      titulo: 'Missao Teste',
      descricao: 'Desc',
    });

    expect(row.nivel).toBe(1);
    expect(row.xp_recompensa).toBe(0);
    expect(row.pontos_recompensa).toBe(0);
    expect(row.progresso_total).toBe(0);
  });
});
