const express = require("express");
const {
  getUser,
  getAllUsers,
  addNewUser,
  deleteUser,
  updateUserData,
} = require("../controllers/usersControllers");
const joiMiddleware = require("../middleware/schemaValidation");
const schema = require("../schemas/schemsa");
const userRouter = express.Router();
const verifyToken = require("../middleware/authMiddleware");

userRouter.get("/:id", getUser);
userRouter.get("/", getAllUsers);
userRouter.post(
  "/",
  verifyToken,
  joiMiddleware(schema.userSchema, "body"),
  addNewUser
);
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.put(
  "/:id",
  verifyToken,
  joiMiddleware(schema.userSchema, "body"),
  updateUserData
);

module.exports = userRouter;
