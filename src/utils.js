import jwt from "jsonwebtoken";
require("dotenv").config({ path: "../.env.development" });

const signAndGenerateToken = (email, name) =>
  jwt.sign(JSON.stringify({ email, name }), process.env.COOKIE_SECRET);

module.exports = signAndGenerateToken;
