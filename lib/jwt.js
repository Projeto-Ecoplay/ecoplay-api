const jwt = require('jsonwebtoken');

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s || String(s).trim() === '') {
    throw new Error('JWT_SECRET não está definido no .env');
  }
  return s;
}

function expiresIn() {
  return process.env.JWT_EXPIRES_IN || '7d';
}

function emitirToken(payload) {
  return jwt.sign(payload, secret(), {
    expiresIn: expiresIn(),
    issuer: 'ecoplay-api',
  });
}

function verificarToken(token) {
  return jwt.verify(token, secret(), { issuer: 'ecoplay-api' });
}

module.exports = { emitirToken, verificarToken, secret, expiresIn };
