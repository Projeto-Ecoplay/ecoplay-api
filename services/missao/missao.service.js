
const Missao = require('../../models/Missao')
const Usuario = require('../../models/Usuario')
const AppError = require('../shared/error.service')

const pontuacaoService = require('../usuario/pontuacao.service')
const nivelService = require('../usuario/nivel.service')

class MissaoService {

  async concluirMissao(usuarioId, missaoId) {
    const usuario = await Usuario.findByPk(usuarioId)
    const missao = await Missao.findByPk(missaoId)

    if (!usuario) throw new AppError("Usuário não encontrado", 404)
    if (!missao) throw new AppError("Missão não encontrada", 404)

    await pontuacaoService.adicionarPontos(usuarioId, missao.recompensa)


    const nivel = await nivelService.atualizarNivel(usuarioId)

    return {
      message: "Missão concluída com sucesso",
      recompensa: missao.recompensa,
      nivel
    }
  }

}

module.exports = new MissaoService()