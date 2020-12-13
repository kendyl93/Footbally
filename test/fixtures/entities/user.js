const faker = require("faker");
const flashCards = require("./flashCard");

const usersFactory = (customId) => ({
  _id: customId,
  email: faker.internet.email(),
  name: faker.name.firstName(),
  flashCards: flashCards.map(({ _id }) => _id),
});

const IDs = ["123456789_user_1", "123456789_user_2"];

module.exports = IDs.map((id) => usersFactory(id));
