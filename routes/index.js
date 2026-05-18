const express = require('express');

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