const express = require('express');
const usuario = require('../controllers/usuarioController');
const router = express.Router();

router.get('/usuarios', usuario.list);
router.get('/usuarios/:id', usuario.getById);
router.put('/usuarios/:id', usuario.update);
router.patch('/usuarios/:id', usuario.update);
router.delete('/usuarios/:id', usuario.remove);
router.post('/usuarios', usuario.create);

module.exports = router;
