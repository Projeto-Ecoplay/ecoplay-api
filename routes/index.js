const express = require('express');

const auth = require('../controllers/authController');
const usuario = require('../controllers/usuarioController');
const missao = require('../controllers/missaoController');
const usuarioMissao = require('../controllers/usuarioMissaoController');
const doacao = require('../controllers/doacaoController');
const item = require('../controllers/itemController');
const usuarioItem = require('../controllers/usuarioItemController');
const avatar = require('../controllers/avatarController');
const usuarioAvatar = require('../controllers/usuarioAvatarController');
const amizade = require('../controllers/amizadeController');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

/** Rotas públicas */
router.post('/auth/login', auth.login);
router.post('/usuarios', usuario.create);

/** A partir daqui exige Authorization: Bearer <token> */
router.use(authenticate);

router.get('/auth/me', auth.me);

router.get('/usuarios', usuario.list);
router.get('/usuarios/:id', usuario.getById);
router.put('/usuarios/:id', usuario.update);
router.patch('/usuarios/:id', usuario.update);
router.delete('/usuarios/:id', usuario.remove);

router.get('/missoes', missao.list);
router.get('/missoes/:id', missao.getById);
router.post('/missoes', missao.create);
router.put('/missoes/:id', missao.update);
router.patch('/missoes/:id', missao.update);
router.delete('/missoes/:id', missao.remove);

router.get('/usuario-missoes', usuarioMissao.list);
router.get('/usuario-missoes/:id', usuarioMissao.getById);
router.post('/usuario-missoes', usuarioMissao.create);
router.put('/usuario-missoes/:id', usuarioMissao.update);
router.patch('/usuario-missoes/:id', usuarioMissao.update);
router.delete('/usuario-missoes/:id', usuarioMissao.remove);

router.get('/doacoes', doacao.list);
router.get('/doacoes/:id', doacao.getById);
router.post('/doacoes', doacao.create);
router.put('/doacoes/:id', doacao.update);
router.patch('/doacoes/:id', doacao.update);
router.delete('/doacoes/:id', doacao.remove);

router.get('/itens', item.list);
router.get('/itens/:id', item.getById);
router.post('/itens', item.create);
router.put('/itens/:id', item.update);
router.patch('/itens/:id', item.update);
router.delete('/itens/:id', item.remove);

router.get('/usuario-itens', usuarioItem.list);
router.get('/usuario-itens/:id', usuarioItem.getById);
router.post('/usuario-itens', usuarioItem.create);
router.delete('/usuario-itens/:id', usuarioItem.remove);

router.get('/avatares', avatar.list);
router.get('/avatares/:id', avatar.getById);
router.post('/avatares', avatar.create);
router.put('/avatares/:id', avatar.update);
router.patch('/avatares/:id', avatar.update);
router.delete('/avatares/:id', avatar.remove);

router.get('/usuario-avatares', usuarioAvatar.list);
router.get('/usuario-avatares/:id', usuarioAvatar.getById);
router.post('/usuario-avatares', usuarioAvatar.create);
router.put('/usuario-avatares/:id', usuarioAvatar.update);
router.patch('/usuario-avatares/:id/ativar', usuarioAvatar.setAtivo);
router.patch('/usuario-avatares/:id', usuarioAvatar.update);
router.delete('/usuario-avatares/:id', usuarioAvatar.remove);

router.get('/amizades', amizade.list);
router.get('/amizades/:id', amizade.getById);
router.post('/amizades', amizade.create);
router.delete('/amizades/:id', amizade.remove);

module.exports = router;
