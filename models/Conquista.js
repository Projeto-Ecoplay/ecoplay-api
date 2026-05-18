const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Conquista = sequelize.define(
    'Conquista',
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
      url_icone: DataTypes.TEXT,
      xp_recompensa: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: 'conquistas',
      timestamps: false,
    }
  );

  return Conquista;
};