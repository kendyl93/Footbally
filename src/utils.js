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

export const decodeToken = (token) => {
  if (!token) {
    throw new Error("No token fround!");
  }

  if (!token.startsWith("Bearer ")) {
    throw new Error("Invalid token!");
  }

  const tokenWithoutBearer = token.slice(7, token.length);

  if (!token) {
    throw new Error("Invalid token's signature!");
  }

  return jwt.verify(tokenWithoutBearer, process.env.COOKIE_SECRET);
};
