const express = require('express');
const item = require('../controllers/itemController');
const router = express.Router();

router.get('/itens', item.list);
router.get('/itens/:id', item.getById);
router.post('/itens', item.create);
router.put('/itens/:id', item.update);
router.patch('/itens/:id', item.update);
router.delete('/itens/:id', item.remove);

module.exports = router;