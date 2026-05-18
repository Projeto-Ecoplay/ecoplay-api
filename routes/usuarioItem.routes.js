const express = require('express');
const usuarioItem = require('../controllers/usuarioItemController');
const router = express.Router();

router.get('/usuario-itens', usuarioItem.list);
router.get('/usuario-itens/:id', usuarioItem.getById);
router.post('/usuario-itens', usuarioItem.create);
router.delete('/usuario-itens/:id', usuarioItem.remove);

module.exports = router;