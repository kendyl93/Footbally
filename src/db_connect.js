const mongoose = require("mongoose");

const db_connect = async (dbUri) => {
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
  });

  const { connection } = mongoose;

  console.log({ connection });

  connection.once("open", () => {
    console.log(
      `MongoDB database connection established successfully on: ${dbUri}`
    );

    return;
  });

  return connection;
};

module.exports = db_connect;
