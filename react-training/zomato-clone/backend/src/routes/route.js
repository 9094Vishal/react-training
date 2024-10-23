import express from "express";
import authRoute from "./auth.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
import twilioRouter from "./twilioSMS.js";
import users from "./user.js";
const router = express.Router();

router.use("/user", users);
router.use("/twilio", twilioRouter);
router.use("/auth", authRoute);

export default router;
