const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Instituicao = sequelize.define(
    'Instituicao',
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
      tipo: DataTypes.STRING,
      endereco: DataTypes.TEXT,
      telefone: DataTypes.STRING,
    },
    {
      tableName: 'instituicoes',
      timestamps: false,
    }
  );

  return Instituicao;
};