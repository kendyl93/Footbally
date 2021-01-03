import { Schema } from "mongoose";

const FlashCard = new Schema({
  _id: String,
  front: String,
  back: String,
});

module.exports = FlashCard;
