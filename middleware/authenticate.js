const { verificarToken } = require('../lib/jwt');

/**
 * Exige header Authorization: Bearer <token>.
 * Define req.user = { id, email } a partir do payload.
 */
function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token em falta ou inválido' });
    }
    const token = header.slice('Bearer '.length).trim();
    if (!token) {
      return res.status(401).json({ error: 'Token em falta ou inválido' });
    }
    const decoded = verificarToken(token);
    const id = decoded.sub ?? decoded.id;
    if (!id) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.user = {
      id: Number(id),
      email: decoded.email,
    };
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    if (e.message && e.message.includes('JWT_SECRET')) {
      return res.status(503).json({ error: 'Autenticação não configurada no servidor' });
    }
    return res.status(401).json({ error: 'Não autorizado' });
  }
}

module.exports = { authenticate };
