import { signAndGenerateToken } from "../../utils";
import { getOneByEmail, createNew } from "./user";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config({ path: "../.env.development" });

export const setGoogleStrategy = () => {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.FULL_CLIENT_HOST_URI}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken,
      };
      console.log({ accessToken, refreshToken, profile });
      done(null, userData);
    }
  );
};

export const createNewOrLoginExistingUser = async (req, res) => {
  const { email, name } = req.user;

  try {
    const user = await getOneByEmail(email);

    if (!user) {
      createNew(name, email);
    }

    const signedToken = signAndGenerateToken(email, name);

    res.cookie(process.env.ACCESS_TOKEN_COOKIE_NAME, signedToken);
    return res.redirect(process.env.FULL_CLIENT_HOST_URI);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
