import express from "express";
import verifytoken from "../middelware/auth.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
import restaurant from "../schemas/RestaurantSchema.js";
import multer from "multer";
import fs from "fs";
import { checkFileType, storage } from "../helper/helper.js";
import path from "path";
import Users from "../schemas/userSchema.js";
import food from "../schemas/food.js";
const __dirname = import.meta.dirname;
const restaurantRoute = express.Router();

const upload = multer({
  storage: storage,
  limits: 100000,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("food");
restaurantRoute.post("/", verifytoken, async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log("err: ", err);
        return res.status(500).json({ error: err });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Please send image!" });
      }
      const data = req.body;
      console.log("data: ", req.body);
      const uploadedFile = req.file.filename;
      const uploadData = data;
      uploadData.ownerDetails = JSON.parse(uploadData.ownerDetails);
      uploadData.restaurantAddressDetails = JSON.parse(
        uploadData.restaurantAddressDetails
      );

      uploadData.image = `http://localhost:3000/public/images/${uploadedFile}`;

      const dataUpload = new restaurant(uploadData);
      const response = await dataUpload.save();
      if (response) {
        console.log("response: ", response);
        console.log("response: ", response.id);

        const user = await Users.findByIdAndUpdate(
          uploadData.ownerId,
          {
            isReastaurant: true,
            restaurantId: response._id,
          },
          { new: true }
        );
        console.log("user: ", user);
        if (user) {
          res.status(201).json({
            data: response,
            user,
          });
        } else {
          res.status(403).json({
            error: "User not found!",
          });
        }
      } else
        res.status(500).json({
          error: "Somthing went wrong!",
        });
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

restaurantRoute.post("/food/:restaurantId", verifytoken, async (req, res) => {
  const id = req.params.restaurantId;

  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log("err: ", err);
        return res.status(500).json({ error: err });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Please send image!" });
      }

      const data = req.body;
      const uploadedFile = req.file.filename;
      const uploadData = data;
      delete uploadData.image;
      uploadData.image = `http://localhost:3000/public/images/${uploadedFile}`;
      uploadData.restaurantId = id;

      const dataToUpload = new food(uploadData);
      // const response = await food.findByIdAndUpdate(
      //   restaurantData._id,
      //   restaurantData,
      //   { new: true }
      // );
      const response = await dataToUpload.save();
      res.status(201).json({
        data: response,
      });
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "server error" });
  }
});

// get restaurant by id
restaurantRoute.get("/:id", async (req, res) => {
  try {
    const response = await restaurant.findById(req.params.id);
    if (response) {
      res.status(200).json({ data: response });
    } else {
      res.status(404).json({ data: "Restaurant not found!" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

// get Food items par hotel
restaurantRoute.get("/foods/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foods = await food.find({ restaurantId: id });
    if (foods) {
      res.status(200).json({ data: foods });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});

// delete food item
restaurantRoute.delete("/food/:id/:imageName", async (req, res) => {
  const { id, imageName } = req.params;

  try {
    if (imageName) {
      fs.unlinkSync(path.join(__dirname, `../../public/images/${imageName}`));
    } else {
      res.status(400).json({ error: "Image not found" });
    }
    const response = await food.findByIdAndDelete(id);
    if (response) {
      res.status(200).json({ response });
    } else {
      res.status(400).json({
        error: "Menu item not found!",
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});

export default restaurantRoute;
