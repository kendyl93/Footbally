const mongoose = require("mongoose");
const FlashCardSchema = require("../schemas/flashCard");

const FlashCardModel = mongoose.model(
  "flashCard",
  FlashCardSchema,
  "flashCard"
);

export const getAll = async () => {
  try {
    return await FlashCardModel.find({});
  } catch (e) {
    console.log({ e });
  }
};

export const getById = async (id) => {
  try {
    return await FlashCardModel.findById(id);
  } catch (e) {
    console.log({ e });
  }
};
