const flashCardRepo = require("../repositories/flashCard");

export const getAll = async () => {
  try {
    return await flashCardRepo.getAllFlashCards();
  } catch (e) {
    console.log({ e });
  }
};

export const getById = async (id) => {
  try {
    return await flashCardRepo.getFlashCardById(id);
  } catch (e) {
    console.log({ e });
  }
};
