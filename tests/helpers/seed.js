const { createMissao, createItem, createInstituicao } = require('./factories');

async function seedBaseData() {
  const missao = await createMissao();
  const item = await createItem();
  const instituicao = await createInstituicao();

  return { missao, item, instituicao };
}

module.exports = { seedBaseData };
