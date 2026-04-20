
const { sequelize } = require('../../models')

class TransactionService {

  async executar(callback) {
    const t = await sequelize.transaction()

    try {
      const result = await callback(t)
      await t.commit()
      return result
    } catch (err) {
      await t.rollback()
      throw err
    }
  }

}

module.exports = new TransactionService()