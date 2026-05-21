const { setupDatabase } = require('../../setup/setupDatabase');
const { Instituicao } = require('../../../models');

setupDatabase();

describe('models/Instituicao', () => {
  it('exige nome', async () => {
    await expect(Instituicao.create({})).rejects.toThrow();
  });
});
