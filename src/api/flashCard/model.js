const mongoose = require("mongoose");

const { Schema } = mongoose;

const FlashCard = new Schema({
  front: {
    type: String,
  },
  back: {
    type: String,
  },
});

module.exports = mongoose.model("FlashCard", FlashCard);
