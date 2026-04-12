const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define(
    'Item',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      custo_pontos: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: 'itens',
      timestamps: false,
    }
  );

  return Item;
};
