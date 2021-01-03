import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import db_connect from "./db_connect";
import apiRouter from "./api/router";
import passport from "passport";
import {
  setGoogleStrategy,
  createNewOrLoginExistingUser,
} from "./api/services/login";
import { query, decodeToken } from "./utils";

require("dotenv").config({ path: "../.env.development" });

const checkTokenAuthorization = (req, res, next) => {
  if (req.url === "/api/user" && req.method === "POST") {
    return next();
  }

  const tokenWithBearer =
    req?.headers["x-access-token"] ||
    req?.headers["authorization"] ||
    req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];

  if (!tokenWithBearer.startsWith("Bearer ")) {
    console.error("Invalid token!");
    return res.sendStatus(500);
  }

  try {
    const decodedToken = decodeToken(tokenWithBearer);
    if (!decodedToken) {
      console.error("No token found!");
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

const app = express();
const corsOptions = {
  origin: "http://localhost:4000",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

if (process.env.NODE_ENV !== "test") {
  passport.use(setGoogleStrategy());

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    async (req, res) => await createNewOrLoginExistingUser(req, res)
  );

  app.get("/auth/logout", (req, res) => {
    try {
      res.clearCookie(process.env.ACCESS_TOKEN_COOKIE_NAME);
    } catch (error) {
      return console.error(error);
    }

    res.redirect("/");
    return res.end();
  });
}

app.all("/api/*", checkTokenAuthorization);

app.use("/api", apiRouter);

app.use("/api", async (req, res) => {
  try {
    const accessTokenCookie =
      req && req.cookies && req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];

    const decodedToken = decodeToken(accessTokenCookie);

    const { currentUser } = await query(decodedToken);

    res.status(200).send({ currentUser });
    return res.end();
  } catch (error) {
    console.error(error);
    return res.redirect("/login");
  }
});

exports.start = async (config) => {
  await db_connect(config.DB_URL);
  return app;
};
