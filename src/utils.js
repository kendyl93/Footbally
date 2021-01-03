import jwt from "jsonwebtoken";
import { currentUserQuery } from "./api/services/user";
require("dotenv").config({ path: "../.env.development" });

export const signAndGenerateToken = (email, name) =>
  `Bearer ${jwt.sign(
    JSON.stringify({ email, name }),
    process.env.COOKIE_SECRET
  )}`;

export const query = async (token) => {
  const { email } = token;

  const currentUser = await currentUserQuery(email);

  return { currentUser };
};
