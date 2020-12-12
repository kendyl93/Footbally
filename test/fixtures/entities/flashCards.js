const faker = require("faker");

const flashCardFactory = (customId) => ({
  _id: customId,
  front: faker.random.word(),
  back: faker.random.word(),
});

const IDs = ["123456789_1", "123456789_2"];

module.exports = IDs.map((id) => flashCardFactory(id));
