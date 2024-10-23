const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongo db is connected...");
});

db.on("disconnected", () => {
  console.log("Mongo db is disconnected...");
});
db.on("error", () => {
  console.log("Mongo db error...");
});

module.exports = db;
