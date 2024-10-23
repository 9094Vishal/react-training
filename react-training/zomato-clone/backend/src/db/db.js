import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const url = process.env.MONGODB_URL;

mongoose.connect(url, {});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo db connected!");
});

db.on("error", () => {
  console.log("Mongo db Error!");
});

db.on("disconnedted", () => {
  console.log("Mongo db disconneted!");
});

export { db };
