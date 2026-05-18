const express = require('express');
const doacao = require('../controllers/doacaoController');
const router = express.Router();

router.get('/doacoes', doacao.list);
router.get('/doacoes/:id', doacao.getById);
router.post('/doacoes', doacao.create);
router.put('/doacoes/:id', doacao.update);
router.patch('/doacoes/:id', doacao.update);
router.delete('/doacoes/:id', doacao.remove);

module.exports = router;