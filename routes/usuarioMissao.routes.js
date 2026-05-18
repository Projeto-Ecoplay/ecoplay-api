const express = require('express');
const usuarioMissao = require('../controllers/usuarioMissaoController');
const router = express.Router();

router.get('/usuario-missoes', usuarioMissao.list);
router.get('/usuario-missoes/:id', usuarioMissao.getById);
router.post('/usuario-missoes', usuarioMissao.create);
router.put('/usuario-missoes/:id', usuarioMissao.update);
router.patch('/usuario-missoes/:id', usuarioMissao.update);
router.delete('/usuario-missoes/:id', usuarioMissao.remove);

module.exports = router;