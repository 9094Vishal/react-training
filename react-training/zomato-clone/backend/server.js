import express from "express";
import { db } from "./src/db/db.js";
import dotEnv from "dotenv";
import router from "./src/routes/route.js";
import bodyParser from "body-parser";
import cros from "cors";
// import fileUpload from "express-fileupload";

dotEnv.config();
const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(cros());
// app.use(fileUpload());

app.use("/", router);
app.listen(port, () => {
  console.log("server is Listening on", port);
});
