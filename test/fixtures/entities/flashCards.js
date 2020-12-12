const fakingoose = require("fakingoose");
const flashCardSchema = require("../../../src/api/schemas/flashCard");
const articleFactory = fakingoose(flashCardSchema, {
  _id: { tostring: true },
});

module.exports = [articleFactory.generate(), articleFactory.generate()];
