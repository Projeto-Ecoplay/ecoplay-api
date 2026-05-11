const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UsuarioTitulo = sequelize.define(
    'UsuarioTitulo',
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
      titulo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      desbloqueado_em: DataTypes.DATE,
    },
    {
      tableName: 'usuario_titulos',
      timestamps: false,
    }
  );

  return UsuarioTitulo;
};