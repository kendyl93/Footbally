const mongoose = require("mongoose");
const FlashCardSchema = require("../schemas/flashCard");

const FlashCardModel = mongoose.model(
  "flashCards",
  FlashCardSchema,
  "flashCards"
);
const {
  Types: { ObjectId },
} = mongoose;

export const getAllCards = async () => {
  console.log({ FlashCardModel });
  try {
    return await FlashCardModel.find({});
  } catch (error) {
    console.log({ error });
  }
};

export const getCardById = async (id) =>
  await FlashCardModel.findById(ObjectId(id));
