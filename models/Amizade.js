const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Amizade = sequelize.define(
    'Amizade',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amigo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'amizades',
      timestamps: false,
    }
  );

  return Amizade;
};
