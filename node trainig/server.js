const express = require("express");
const cros = require("cors");
const app = express();
require("dotenv").config();
const db = require("./src/db/db");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 3000;
const routes = require("./src/routes/route");

app.use(cros());
app.use(routes);
app.use(bodyparser.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
