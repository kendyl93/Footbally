const express = require("express");
const router = express.Router();
const rooms = require("./staticRooms");

router.get("/", (req, res) => {
  res.json(rooms);
});

router.get("/:roomId", (req, res) => {
  const {
    params: { roomId },
  } = req;

  res.json(rooms[roomId]);
});

module.exports = router;
