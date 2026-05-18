const express = require('express');
const usuarioAvatar = require('../controllers/usuarioAvatarController');
const router = express.Router();

router.get('/usuario-avatares', usuarioAvatar.list);
router.get('/usuario-avatares/:id', usuarioAvatar.getById);
router.post('/usuario-avatares', usuarioAvatar.create);
router.put('/usuario-avatares/:id', usuarioAvatar.update);
router.patch('/usuario-avatares/:id/ativar', usuarioAvatar.setAtivo);
router.patch('/usuario-avatares/:id', usuarioAvatar.update);
router.delete('/usuario-avatares/:id', usuarioAvatar.remove);


module.exports = router;