const faker = require("faker");

const flashCardFactory = (customId) => ({
  _id: customId,
  front: faker.random.word(),
  back: faker.random.word(),
});

const IDs = ["123456789_card_1", "123456789_card_2"];

module.exports = IDs.map((id) => flashCardFactory(id));
