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
const initInstituicao = require('./Instituicao');
const initTitulo = require('./Titulo');
const initUsuarioTitulo = require('./UsuarioTitulo');
const initConquista = require('./Conquista');
const initUsuarioConquista = require('./UsuarioConquista');

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
    Instituicao: null,
    Titulo: null,
    UsuarioTitulo: null,
    Conquista: null,
    UsuarioConquista: null,
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
  const Instituicao = initInstituicao(sequelize);
  const Titulo = initTitulo(sequelize);
  const UsuarioTitulo = initUsuarioTitulo(sequelize);
  const Conquista = initConquista(sequelize);
  const UsuarioConquista = initUsuarioConquista(sequelize);

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

  Usuario.hasMany(UsuarioTitulo, { foreignKey: 'usuario_id', as: 'usuario_titulos' });
  UsuarioTitulo.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  Titulo.hasMany(UsuarioTitulo, { foreignKey: 'titulo_id', as: 'usuario_titulos' });
  UsuarioTitulo.belongsTo(Titulo, { foreignKey: 'titulo_id', as: 'titulo' });

  Usuario.hasMany(UsuarioConquista, { foreignKey: 'usuario_id', as: 'usuario_conquistas' });
  UsuarioConquista.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  Conquista.hasMany(UsuarioConquista, { foreignKey: 'conquista_id', as: 'usuario_conquistas' });
  UsuarioConquista.belongsTo(Conquista, { foreignKey: 'conquista_id', as: 'conquista' });

  Instituicao.hasMany(Doacao, { foreignKey: 'instituicao_id', as: 'doacoes' });
  Doacao.belongsTo(Instituicao, { foreignKey: 'instituicao_id', as: 'instituicao' });

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
    Instituicao,
    Titulo,
    UsuarioTitulo,
    Conquista,
    UsuarioConquista,
  };
}
