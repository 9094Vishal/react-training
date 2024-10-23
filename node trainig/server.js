const express = require("express");
const PORT = process.env.PORT || 3000;
const cros = require("cors");
const app = express();

const routes = require("./src/routes/route");

app.use(cros());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
