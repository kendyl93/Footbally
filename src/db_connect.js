const mongoose = require("mongoose");

const db_connect = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  });

  const { connection } = mongoose;

  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
    return;
  });
};

module.exports = db_connect;
