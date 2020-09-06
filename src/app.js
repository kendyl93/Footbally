const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const rooms = require("./routes/rooms");

const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", rooms);

module.exports = app;
