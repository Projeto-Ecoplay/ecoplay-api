const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Doacao = sequelize.define(
    'Doacao',
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
      descricao: DataTypes.TEXT,
      data: DataTypes.DATE,
    },
    {
      tableName: 'doacoes',
      timestamps: false,
    }
  );

  return Doacao;
};
