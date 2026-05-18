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
const instituicao = require('../controllers/instituicaoController');
const titulo = require('../controllers/tituloController');
const usuarioTitulo = require('../controllers/usuarioTituloController');
const conquista = require('../controllers/conquistaController');
const usuarioConquista = require('../controllers/usuarioConquistaController');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.use('/auth', require('./auth.routes'));

router.use('/usuarios', require('./usuario.routes'));

router.use('/missoes', require('./missao.routes'));

router.use('/doacoes', require('./doacao.routes'));

router.use('/itens', require('./item.routes'));

router.use('/amizades', require('./amizade.routes'));

router.use('/avatares', require('./avatar.routes'));

router.use('/usuario-missoes', require('./usuarioMissao.routes'));

router.use('/usuario-itens', require('./usuarioItem.routes'));

router.use('/usuario-avatares', require('./usuarioAvatar.routes'));

module.exports = router;
router.get('/instituicoes', instituicao.list);
router.get('/instituicoes/:id', instituicao.getById);
router.post('/instituicoes', instituicao.create);
router.put('/instituicoes/:id', instituicao.update);
router.patch('/instituicoes/:id', instituicao.update);
router.delete('/instituicoes/:id', instituicao.remove);

router.get('/titulos', titulo.list);
router.get('/titulos/:id', titulo.getById);
router.post('/titulos', titulo.create);
router.put('/titulos/:id', titulo.update);
router.patch('/titulos/:id', titulo.update);
router.delete('/titulos/:id', titulo.remove);

router.get('/usuario-titulos', usuarioTitulo.list);
router.get('/usuario-titulos/:id', usuarioTitulo.getById);
router.post('/usuario-titulos', usuarioTitulo.create);
router.delete('/usuario-titulos/:id', usuarioTitulo.remove);

router.get('/conquistas', conquista.list);
router.get('/conquistas/:id', conquista.getById);
router.post('/conquistas', conquista.create);
router.put('/conquistas/:id', conquista.update);
router.patch('/conquistas/:id', conquista.update);
router.delete('/conquistas/:id', conquista.remove);

router.get('/usuario-conquistas', usuarioConquista.list);
router.get('/usuario-conquistas/:id', usuarioConquista.getById);
router.post('/usuario-conquistas', usuarioConquista.create);
router.delete('/usuario-conquistas/:id', usuarioConquista.remove);

module.exports = router;
