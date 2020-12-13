const mongoose = require("mongoose");
const UserCardSchema = require("../schemas/user");

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
