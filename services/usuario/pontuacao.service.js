const Usuario = require('../../models/Usuario')
const AppError = require('../shared/error.service')

class PontuacaoService {

  async adicionarPontos(usuarioId, pontos) {
    const usuario = await Usuario.findByPk(usuarioId)

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404)
    }

    if (pontos <= 0) {
      throw new AppError("Pontuação inválida", 400)
    }

    usuario.pontos += pontos

    await usuario.save()

    return {
      pontos: usuario.pontos
    }
  }

  async removerPontos(usuarioId, pontos) {
    const usuario = await Usuario.findByPk(usuarioId)

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404)
    }

    usuario.pontos -= pontos

    if (usuario.pontos < 0) {
      usuario.pontos = 0
    }

    await usuario.save()

    return {
      pontos: usuario.pontos
    }
  }

}

module.exports = new PontuacaoService()