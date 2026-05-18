const express = require('express');
const missao = require('../controllers/missaoController');
const router = express.Router();

router.get('/missoes', missao.list);
router.get('/missoes/:id', missao.getById);
router.post('/missoes', missao.create);
router.put('/missoes/:id', missao.update);
router.patch('/missoes/:id', missao.update);
router.delete('/missoes/:id', missao.remove);

module.exports = router;