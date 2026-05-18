const express = require('express');
const avatar = require('../controllers/avatarController');
const router = express.Router();

router.get('/avatares', avatar.list);
router.get('/avatares/:id', avatar.getById);
router.post('/avatares', avatar.create);
router.put('/avatares/:id', avatar.update);
router.patch('/avatares/:id', avatar.update);
router.delete('/avatares/:id', avatar.remove);

module.exports = router;