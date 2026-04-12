const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UsuarioAvatar = sequelize.define(
    'UsuarioAvatar',
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
      avatar_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ativo: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: 'usuario_avatares',
      timestamps: false,
    }
  );

  return UsuarioAvatar;
};
