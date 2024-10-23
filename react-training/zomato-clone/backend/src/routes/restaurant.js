import express from "express";
import verifytoken from "../middelware/auth.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
import restaurant from "../schemas/RestaurantSchema.js";

const restaurantRoute = express.Router();

restaurantRoute.post(
  "/",
  verifytoken,
  validateData(schema.reastaurantSchema, "body"),
  async (req, res) => {
    try {
      const data = new restaurant(req.body);
      const response = await data.save();
      res.status(201).json({ data: response });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
);

export default restaurantRoute;
