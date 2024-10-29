import express from "express";
import authRoute from "./auth.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
import twilioRouter from "./twilioSMS.js";
import users from "./user.js";
import path from "path";
import restaurantRoute from "./restaurant.js";
import cartRoute from "./cart.js";
const router = express.Router();
const __dirname = import.meta.dirname;
router.use("/public", express.static(path.join(__dirname, "../../public")));

router.use("/cart", cartRoute);
router.use("/restaurant", restaurantRoute);
router.use("/user", users);
router.use("/twilio", twilioRouter);
router.use("/auth", authRoute);

export default router;
