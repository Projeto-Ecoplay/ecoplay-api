
const Usuario = require('../../models/Usuario')

class RankingService {

  async getRankingGlobal(limit = 10) {
    const ranking = await Usuario.findAll({
      order: [['pontos', 'DESC']],
      limit
    })

    return ranking
  }

  async getRankingPorNivel(limit = 10) {
    const ranking = await Usuario.findAll({
      order: [['nivel', 'DESC']],
      limit
    })

    return ranking
  }

}

module.exports = new RankingService()