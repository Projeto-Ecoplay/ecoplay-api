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
      nivel: { type: DataTypes.INTEGER, defaultValue: 1 },
      xp_recompensa: { type: DataTypes.INTEGER, defaultValue: 0 },
      pontos_recompensa: { type: DataTypes.INTEGER, defaultValue: 0 },
      progresso_total: { type: DataTypes.INTEGER, defaultValue: 0 },
      url_imagem: DataTypes.TEXT,
    },
    {
      tableName: 'missoes',
      timestamps: true,
      createdAt: 'criada_em',
      updatedAt: false,
    }
  );

  return Missao;
};
