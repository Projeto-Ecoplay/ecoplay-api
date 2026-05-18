

const Usuario = require('../../models/Usuario')
const AppError = require('../shared/error.service')

class NivelService {

  calcularNivel(pontos) {
    if (pontos < 0) return 0

    return Math.floor(pontos / 100)
  }

  async atualizarNivel(usuarioId) {
    const usuario = await Usuario.findByPk(usuarioId)

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404)
    }

    const novoNivel = this.calcularNivel(usuario.pontos)

    if (usuario.nivel !== novoNivel) {
      usuario.nivel = novoNivel
      await usuario.save()
    }

    return {
      nivel: usuario.nivel
    }
  }

}

module.exports = new NivelService()