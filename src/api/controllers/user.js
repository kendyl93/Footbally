import { getAll, getById, createNew } from "../services/user";

export const show = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json({ user });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const list = async (req, res) => {
  try {
    const users = await getAll();
    if (!users) {
      return res.sendStatus(404);
    }

    res.json({ users });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const create = async (req, res) => {
  const { body } = req;

  const { name = "", email = "" } = body;

  try {
    if (name) {
      await createNew(name, email);
    } else {
      console.log("User must have at least a name!");
      res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.sendStatus(200);
};
