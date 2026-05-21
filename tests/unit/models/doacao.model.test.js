const { setupDatabase } = require('../../setup/setupDatabase');
const { Doacao } = require('../../../models');

setupDatabase();

describe('models/Doacao', () => {
  it('aplica valor padrao de quantidade', async () => {
    const row = await Doacao.create({
      usuario_id: 1,
      instituicao_id: 1,
      descricao: 'Doacao',
    });

    expect(row.quantidade).toBe(1);
  });
});
