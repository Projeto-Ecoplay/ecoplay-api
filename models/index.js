const { sequelize } = require('../config/database');
const initUsuario = require('./Usuario');
const initMissao = require('./Missao');
const initUsuarioMissao = require('./UsuarioMissao');
const initDoacao = require('./Doacao');
const initItem = require('./Item');
const initUsuarioItem = require('./UsuarioItem');
const initAvatar = require('./Avatar');
const initUsuarioAvatar = require('./UsuarioAvatar');
const initAmizade = require('./Amizade');

if (!sequelize) {
  module.exports = {
    sequelize: null,
    Usuario: null,
    Missao: null,
    UsuarioMissao: null,
    Doacao: null,
    Item: null,
    UsuarioItem: null,
    Avatar: null,
    UsuarioAvatar: null,
    Amizade: null,
  };
} else {
  const Usuario = initUsuario(sequelize);
  const Missao = initMissao(sequelize);
  const UsuarioMissao = initUsuarioMissao(sequelize);
  const Doacao = initDoacao(sequelize);
  const Item = initItem(sequelize);
  const UsuarioItem = initUsuarioItem(sequelize);
  const Avatar = initAvatar(sequelize);
  const UsuarioAvatar = initUsuarioAvatar(sequelize);
  const Amizade = initAmizade(sequelize);

  Usuario.hasMany(UsuarioMissao, { foreignKey: 'usuario_id', as: 'usuario_missoes' });
  UsuarioMissao.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  Missao.hasMany(UsuarioMissao, { foreignKey: 'missao_id', as: 'usuario_missoes' });
  UsuarioMissao.belongsTo(Missao, { foreignKey: 'missao_id', as: 'missao' });

  Usuario.hasMany(Doacao, { foreignKey: 'usuario_id', as: 'doacoes' });
  Doacao.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

  Usuario.hasMany(UsuarioItem, { foreignKey: 'usuario_id', as: 'usuario_itens' });
  UsuarioItem.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  Item.hasMany(UsuarioItem, { foreignKey: 'item_id', as: 'usuario_itens' });
  UsuarioItem.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

  Usuario.hasMany(UsuarioAvatar, { foreignKey: 'usuario_id', as: 'usuario_avatares' });
  UsuarioAvatar.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  Avatar.hasMany(UsuarioAvatar, { foreignKey: 'avatar_id', as: 'usuario_avatares' });
  UsuarioAvatar.belongsTo(Avatar, { foreignKey: 'avatar_id', as: 'avatar' });

  Usuario.hasMany(Amizade, { foreignKey: 'usuario_id', as: 'amizades_solicitadas' });
  Usuario.hasMany(Amizade, { foreignKey: 'amigo_id', as: 'amizades_recebidas' });
  Amizade.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  Amizade.belongsTo(Usuario, { foreignKey: 'amigo_id', as: 'amigo' });

  module.exports = {
    sequelize,
    Usuario,
    Missao,
    UsuarioMissao,
    Doacao,
    Item,
    UsuarioItem,
    Avatar,
    UsuarioAvatar,
    Amizade,
  };
}
