const { getAll, getById } = require("../services/flashCard");

export const show = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const { ok, flashCard, message, code } = await getById(id);

    if (ok) {
      res.json({ ok, flashCard });
    } else if (!ok && code === "NOT_FOUND") {
      res.status(404).json({ ok: false, message: "Resource not found" });
    } else {
      res.json({ ok, message });
    }
  } catch (e) {
    console.log(e);
    res.json({ ok: false, message: "Internal server Failure" });
  }
};

export const list = async (req, res) => {
  try {
    const { ok, flashCards, message } = await getAll();
    if (ok) {
      res.json({ ok, flashCards });
    } else {
      res.json({ ok, message });
    }
  } catch (e) {
    console.log(e);
    res.json({ ok: false, message: "Internal server Failure" });
  }
};

export const create = async (req, res) => {
  try {
    // const {
    //   body: { front = "", back = "" },
    // } = req;
    // const accessTokenCookie =
    //   req && req.cookies && req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];

    // if (!accessTokenCookie) {
    //   return res.redirect("/login");
    // }

    // const maybeSignedToken = jwt.verify(
    //   accessTokenCookie,
    //   process.env.COOKIE_SECRET
    // );

    // const flashCard = new FlashCard({ front, back });
    // await flashCard.save();

    // const user = await User.findOne({ email: maybeSignedToken.email });
    // console.log({ user, flashCard });
    // user.flashCards.push(flashCard);
    // await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
