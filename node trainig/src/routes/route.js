const express = require("express");
const path = require("path");
const routes = express.Router();
const authRoutes = require("../routes/auth");
const upload = require("../routes/multer");
const userRouter = require("../routes/users");

routes.use("/public", express.static(path.join(__dirname, "../../public")));
routes.use(express.json());
routes.use("/upload", upload);
routes.use("/auth", authRoutes);
routes.use("/user", userRouter);

module.exports = routes;
