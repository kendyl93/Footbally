const express = require("express");
const router = express.Router();
const users = require("./staticUsers");

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:userId", (req, res) => {
  const {
    params: { _id },
  } = req;

  res.json(users[_id]);
});

module.exports = router;
