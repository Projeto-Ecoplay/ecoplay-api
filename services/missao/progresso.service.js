
const Usuario = require('../../models/Usuario')
const AppError = require('../shared/error.service')

class ProgressoService {

  async getProgresso(usuarioId) {
    const usuario = await Usuario.findByPk(usuarioId)

    if (!usuario) throw new AppError("Usuário não encontrado", 404)

    return {
      pontos: usuario.pontos,
      nivel: usuario.nivel
    }
  }

}

module.exports = new ProgressoService()