const flashCardRepo = require("../repositories/flashCard");

export const getAll = async () => {
  try {
    const flashCards = await flashCardRepo.getAllCards();
    return { ok: true, flashCards, message: "Success", code: "OK" };
  } catch (e) {
    return { ok: false, message: e.message, code: "ERROR" };
  }
};
export const getById = async (id) => {
  try {
    const flashCard = await flashCardRepo.getCardById(id);
    if (flashCard) {
      return { ok: true, flashCard, code: "OK" };
    }
    return { ok: false, code: "NOT_FOUND" };
  } catch (e) {
    return { ok: false, message: e.message, code: "ERROR" };
  }
};
