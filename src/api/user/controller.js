const User = require("./Model");

export const show = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await User.findOne({ _id: id }).populate("flashCard");

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const list = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findOne({ _id: id }).populate("flashCard");
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const create = async (req, res) => {
  const { body } = req;

  const { user: { name = "", email = "" } = {} } = body;

  try {
    if (name) {
      const user = new User({ name, email });
      await user.save();
    } else {
      throw new Error("User must have at least a name!");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.sendStatus(200);
};
