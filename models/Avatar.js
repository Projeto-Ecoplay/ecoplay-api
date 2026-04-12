const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Avatar = sequelize.define(
    'Avatar',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: DataTypes.STRING,
      url_imagem: DataTypes.TEXT,
    },
    {
      tableName: 'avatares',
      timestamps: false,
    }
  );

  return Avatar;
};
