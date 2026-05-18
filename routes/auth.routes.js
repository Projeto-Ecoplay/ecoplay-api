const express = require('express');
const auth = require('../controllers/authController');
const { authenticate } = require('../middleware/authenticate');
const router = express.Router();

/** rota pública */
router.post('/login', auth.login);

/** rotas privadas */
router.use(authenticate);

router.get('/me', auth.me);

module.exports = router;