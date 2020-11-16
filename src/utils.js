import jwt from "jsonwebtoken";
require("dotenv").config({ path: "../.env.development" });

const signAndGenerateToken = (email, name) =>
  `Bearer ${jwt.sign(
    JSON.stringify({ email, name }),
    process.env.COOKIE_SECRET
  )}`;

module.exports = signAndGenerateToken;
