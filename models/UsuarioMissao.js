const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UsuarioMissao = sequelize.define(
    'UsuarioMissao',
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
      missao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: { type: DataTypes.STRING, defaultValue: 'pending' },
      data_conclusao: DataTypes.DATE,
    },
    {
      tableName: 'usuario_missoes',
      timestamps: false,
    }
  );

  return UsuarioMissao;
};
