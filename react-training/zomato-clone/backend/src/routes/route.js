import express from "express";
import authRoute from "./auth.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
import twilioRouter from "./twilioSMS.js";
import users from "./user.js";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath
import restaurantRoute from "./restaurant.js";

// Set up __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.use("/public", express.static(path.join(__dirname, "../../public")));

router.use("/restaurant", restaurantRoute);
router.use("/user", users);
router.use("/twilio", twilioRouter);
router.use("/auth", authRoute);

export default router;
