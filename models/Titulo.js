const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Titulo = sequelize.define(
    'Titulo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: DataTypes.TEXT,
      xp_necessario: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: 'titulos',
      timestamps: false,
    }
  );

  return Titulo;
};