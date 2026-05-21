const { sequelize } = require('../../models');

function setupDatabase() {
  if (!sequelize) {
    throw new Error('Sequelize nao inicializado. Verifique a configuracao de testes.');
  }

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
}

module.exports = { setupDatabase };
