const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const rooms = require("./routes/rooms");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", rooms);

module.exports = app;
