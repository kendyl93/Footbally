const { Schema } = require("mongoose");

const FlashCard = new Schema({
  front: String,
  back: String,
});

module.exports = FlashCard;
