const { setupDatabase } = require('../../setup/setupDatabase');
const { Amizade } = require('../../../models');

setupDatabase();

describe('models/Amizade', () => {
  it('cria amizade com campos obrigatorios', async () => {
    const row = await Amizade.create({ usuario_id: 1, amigo_id: 2 });

    expect(row.usuario_id).toBe(1);
    expect(row.amigo_id).toBe(2);
  });
});
