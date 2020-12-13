import { v4 as uuidv4 } from "uuid";
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

export const createNew = async (front, back) => {
  try {
    const flashCard = new FlashCardModel({ _id: uuidv4(), front, back });
    await flashCard.save();
  } catch (error) {
    console.log({ error });
  }
};
