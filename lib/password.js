const bcrypt = require('bcrypt');

function saltRounds() {
  const n = Number(process.env.BCRYPT_SALT_ROUNDS);
  if (Number.isFinite(n) && n >= 4 && n <= 31) {
    return n;
  }
  return 10;
}

function hashSenha(plain) {
  return bcrypt.hash(plain, saltRounds());
}

function compararSenha(plain, hash) {
  return bcrypt.compare(plain, hash);
}

module.exports = { hashSenha, compararSenha, saltRounds };
