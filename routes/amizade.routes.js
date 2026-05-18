const express = require('express');
const amizade = require('../controllers/amizadeController');
const router = express.Router();

router.get('/amizades', amizade.list);
router.get('/amizades/:id', amizade.getById);
router.post('/amizades', amizade.create);
router.delete('/amizades/:id', amizade.remove);

module.exports = router;