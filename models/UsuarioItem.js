const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UsuarioItem = sequelize.define(
    'UsuarioItem',
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
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adquirido_em: DataTypes.DATE,
    },
    {
      tableName: 'usuario_itens',
      timestamps: false,
    }
  );

  return UsuarioItem;
};
