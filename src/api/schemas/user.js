const mongoose = require("mongoose");

const { Schema } = mongoose;

const User = new Schema({
  _id: String,
  email: String,
  name: String,
  flashCards: [
    {
      type: Schema.Types.String,
      ref: "flashCard",
    },
  ],
});

module.exports = User;
