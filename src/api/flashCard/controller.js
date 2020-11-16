import jwt from "jsonwebtoken";

const FlashCard = require("./Model");
const User = require("../user/Model");

export const show = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const flashCard = await FlashCard.findOne({ _id: id });

    return res.json(flashCard);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const list = async (req, res) => {
  FlashCard.find((err, flashCards) => {
    if (err) {
      console.log(err);
    } else {
      res.json(flashCards);
    }
  });
};

export const create = async (req, res) => {
  try {
    const {
      body: { front = "", back = "" },
    } = req;
    const accessTokenCookie =
      req && req.cookies && req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];

    if (!accessTokenCookie) {
      return res.redirect("/login");
    }

    const maybeSignedToken = jwt.verify(
      accessTokenCookie,
      process.env.COOKIE_SECRET
    );

    const flashCard = new FlashCard({ front, back });
    await flashCard.save();

    const user = await User.findOne({ email: maybeSignedToken.email });
    console.log({ user, flashCard });
    user.flashCards.push(flashCard);
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
