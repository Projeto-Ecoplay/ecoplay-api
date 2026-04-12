const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: DataTypes.STRING,
      nivel: { type: DataTypes.INTEGER, defaultValue: 1 },
      pontos: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: 'usuarios',
      timestamps: true,
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
      defaultScope: {
        attributes: { exclude: ['senha'] },
      },
      scopes: {
        withSenha: { attributes: { include: ['senha'] } },
      },
    }
  );

  return Usuario;
};
