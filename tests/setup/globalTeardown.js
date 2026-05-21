const { sequelize } = require('../../models');

module.exports = async () => {
  if (sequelize) {
    await sequelize.close();
  }
};
