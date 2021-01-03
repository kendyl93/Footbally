import mongoose from "mongoose";
import UserCardSchema from "../schemas/user";
import { v4 as uuidv4 } from "uuid";

const UserSchema = mongoose.model("user", UserCardSchema, "user");

export const getAll = async () => {
  try {
    return await UserSchema.find({}).populate("flashCard");
  } catch (e) {
    console.log({ e });
  }
};

export const getById = async (id) => {
  try {
    return await UserSchema.findById(id).populate("flashCard");
  } catch (e) {
    console.log({ e });
  }
};

export const currentUserQuery = async (email) => {
  const currentUser = await UserSchema.findOne({ email });

  if (!currentUser) {
    throw new Error("User is not signed in!");
  }

  return currentUser;
};

export const getOneByEmail = async (email) =>
  await UserSchema.findOne({ email });

export const createNew = async (name, email) => {
  try {
    const user = new UserSchema({ _id: uuidv4(), name, email });
    await user.save();
  } catch (error) {
    console.error(error);
  }
};
