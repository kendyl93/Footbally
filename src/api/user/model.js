const mongoose = require("mongoose");

const { Schema } = mongoose;

const User = new Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  flashCards: [
    {
      type: Schema.Types.ObjectId,
      ref: "FlashCard",
    },
  ],
});

module.exports = mongoose.model("User", User);
