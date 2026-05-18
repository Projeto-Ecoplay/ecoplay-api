
const Doacao = require('../../models/Doacao')
const Usuario = require('../../models/Usuario')
const AppError = require('../shared/error.service')

class DoacaoService {

  async criarDoacao(usuarioId, quantidade) {
    const usuario = await Usuario.findByPk(usuarioId)

    if (!usuario) throw new AppError("Usuário não encontrado", 404)

    if (quantidade <= 0) {
      throw new AppError("Quantidade inválida", 400)
    }

    // regra futura: verificar se usuário tem produção suficiente

    const doacao = await Doacao.create({
      usuarioId,
      quantidade
    })

    return doacao
  }

  async listarDoacoes(usuarioId) {
    return await Doacao.findAll({
      where: { usuarioId }
    })
  }

}

module.exports = new DoacaoService()