
const Amizade = require('../../models/Amizade')
const Usuario = require('../../models/Usuario')
const AppError = require('../shared/error.service')

class AmizadeService {

  async solicitarAmizade(usuarioId, amigoId) {
    if (usuarioId === amigoId) {
      throw new AppError("Não pode adicionar a si mesmo", 400)
    }

    const usuario = await Usuario.findByPk(usuarioId)
    const amigo = await Usuario.findByPk(amigoId)

    if (!usuario || !amigo) {
      throw new AppError("Usuário não encontrado", 404)
    }

    const amizade = await Amizade.create({
      usuarioId,
      amigoId,
      status: 'pendente'
    })

    return amizade
  }

  async aceitarAmizade(amizadeId) {
    const amizade = await Amizade.findByPk(amizadeId)

    if (!amizade) throw new AppError("Solicitação não encontrada", 404)

    amizade.status = 'aceito'
    await amizade.save()

    return amizade
  }

}

module.exports = new AmizadeService()