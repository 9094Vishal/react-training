import express from "express";
import jwt from "jsonwebtoken";
import Users from "./../schemas/userSchema.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
const authRoute = express.Router();
const validateByBody = "body";
const validateByPerams = "perams";

authRoute.post(
  "/signin",
  validateData(schema.signInSchema, validateByBody),
  async (req, res) => {
    let token;
    try {
      const { phone } = req.body;
      const isUser = await Users.findOne({ phone });

      if (!isUser) {
        const user = new Users({ phone });
        const response = await user.save();
        token = jwt.sign({ _id: response._id }, "zomato");
        res.status(200).json({ token, data: response });
      } else {
        token = jwt.sign({ _id: isUser._id }, "zomato");
        res.status(200).json({ token, data: isUser });
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ error: "server Side error" });
    }
  }
);

export default authRoute;
