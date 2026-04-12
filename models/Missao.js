const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Missao = sequelize.define(
    'Missao',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      pontos_recompensa: { type: DataTypes.INTEGER, defaultValue: 0 },
      nivel_requerido: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    {
      tableName: 'missoes',
      timestamps: true,
      createdAt: 'criado_em',
      updatedAt: false,
    }
  );

  return Missao;
};
