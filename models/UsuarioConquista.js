const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UsuarioConquista = sequelize.define(
    'UsuarioConquista',
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
      conquista_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      desbloqueada_em: DataTypes.DATE,
    },
    {
      tableName: 'usuario_conquistas',
      timestamps: false,
    }
  );

  return UsuarioConquista;
};