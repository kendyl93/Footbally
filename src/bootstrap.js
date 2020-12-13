import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import cors from "cors";
import db_connect from "./db_connect";
import apiRouter from "./api/router";
// import passport from "passport";
// import jwt from "jsonwebtoken";
// import currentUserQuery from "./queries";
// import signAndGenerateToken from "./utils";

// require("dotenv").config({ path: "../.env.development" });
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const checkTokenAuthorization = (req, res, next) => {
//   const tokenWithBearer =
//     req?.headers["x-access-token"] || req?.headers["authorization"];

//   if (!tokenWithBearer) {
//     console.error("No token found!");
//     return res.sendStatus(401);
//   }

//   if (!tokenWithBearer.startsWith("Bearer ")) {
//     console.error("Invalid token!");
//     return res.sendStatus(500);
//   }

//   const token = tokenWithBearer.slice(7, tokenWithBearer.length);

//   if (!token) {
//     console.error("Invalid token's signature!");
//     return res.sendStatus(500);
//   }

//   jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500);
//     } else {
//       req.decoded = decoded;
//       next();
//     }
//   });
// };

const app = express();
// const corsOptions = {
//   origin: "http://localhost:4000",
// };
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(passport.initialize());

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.FULL_CLIENT_HOST_URI}/auth/google/callback`,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const userData = {
//         email: profile.emails[0].value,
//         name: profile.displayName,
//         token: accessToken,
//       };
//       console.log({ accessToken, refreshToken, profile });
//       done(null, userData);
//     }
//   )
// );

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false,
//   }),

//   async (req, res) => {
//     const { email, name } = req.user;

//     try {
//       const user = await User.findOne({ email });

//       if (!user) {
//         const user = new User({ name, email });

//         user
//           .save()
//           .then(() => {
//             res.status(200).json({ USER: "User added successfully" });
//           })
//           .catch(() => {
//             res.status(400).send("adding new user failed");
//           });
//       }

//       const signedToken = signAndGenerateToken(email, name);

//       res.cookie(process.env.ACCESS_TOKEN_COOKIE_NAME, signedToken);
//       return res.redirect(process.env.FULL_CLIENT_HOST_URI);
//     } catch (error) {
//       console.error(error);
//       return res.sendStatus(500);
//     }
//   }
// );

// app.get("/auth/logout", (req, res) => {
//   try {
//     res.clearCookie(process.env.ACCESS_TOKEN_COOKIE_NAME);
//   } catch (error) {
//     return console.error(error);
//   }

//   res.redirect("/");
//   return res.end();
// });

// app.all("/api/*", checkTokenAuthorization);

app.use("/api", apiRouter);

// const query = async (token) => {
//   const { email } = token;

//   const currentUser = await currentUserQuery(email);

//   return { currentUser };
// };

// app.use("/api", async (req, res) => {
// const accessTokenCookie =
//   req && req.cookies && req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];

// if (!accessTokenCookie) {
//   return res.redirect("/login");
// }
// const maybeSignedToken = jwt.verify(
//   accessTokenCookie,
//   process.env.COOKIE_SECRET
// );

// console.log({ maybeSignedToken });

// if (!maybeSignedToken) {
//   return res.redirect("/login");
// }

// try {
// const { currentUser } = await query(maybeSignedToken);

//     res.status(200).send({
//       dupa: "dupa",
//     });
//     return res.end();
//   } catch (error) {
//     console.error(error);
//     return res.redirect("/login");
//   }
// });

exports.start = async (config) => {
  await db_connect(config.DB_URL);
  return app;
};
