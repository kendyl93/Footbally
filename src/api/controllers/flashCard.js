const { getAll, getById, createNew } = require("../services/flashCard");
const { getOneByEmail } = require("../services/user");
import { decodeToken } from "../../utils";

export const show = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const flashCard = await getById(id);

    if (!flashCard) {
      return res.sendStatus(404);
    }

    res.json({ flashCard });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const list = async (req, res) => {
  try {
    const flashCards = await getAll();
    if (!flashCards) {
      return res.sendStatus(404);
    }

    res.json({ flashCards });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const create = async (req, res) => {
  try {
    const {
      body: { front = "", back = "" },
    } = req;

    if (!front || !back) {
      console.log("FlashCard must have both front and back side");
      res.sendStatus(400);
    }

    const accessTokenCookie =
      req && req.cookies && req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];

    const decodedToken = decodeToken(accessTokenCookie);

    const flashCard = await createNew(front, back);

    const user = await getOneByEmail(decodedToken.email);

    user.flashCards.push(flashCard);
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
