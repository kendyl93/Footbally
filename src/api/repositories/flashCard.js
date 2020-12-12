const mongoose = require("mongoose");
const FlashCardSchema = require("../schemas/flashCard");

const FlashCardModel = mongoose.model(
  "flashCards",
  FlashCardSchema,
  "flashCards"
);

export const getAllFlashCards = async () => {
  try {
    return await FlashCardModel.find({});
  } catch (error) {
    console.log({ error });
  }
};

export const getFlashCardById = async (id) => {
  try {
    return await FlashCardModel.findById(id);
  } catch (error) {
    console.log({ error });
  }
};
