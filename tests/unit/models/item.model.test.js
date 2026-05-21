const { setupDatabase } = require('../../setup/setupDatabase');
const { Item } = require('../../../models');

setupDatabase();

describe('models/Item', () => {
  it('aplica valor padrao de custo', async () => {
    const row = await Item.create({
      nome: 'Item Teste',
      descricao: 'Desc',
    });

    expect(row.custo_pontos).toBe(0);
  });
});
