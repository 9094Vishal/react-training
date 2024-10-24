import express from "express";
import verifytoken from "../middelware/auth.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
import restaurant from "../schemas/RestaurantSchema.js";
import multer from "multer";
import fs from "fs";
import { checkFileType, storage } from "../helper/helper.js";
import path from "path";
const __dirname = import.meta.dirname;
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

const upload = multer({
  storage: storage,
  limits: 100000,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("food");

restaurantRoute.put("/:ownerId", verifytoken, async (req, res) => {
  console.log("req: ", await req.body);
  const id = req.params.ownerId;
  try {
    let restaurantData = await restaurant.findOne({ ownerId: id });
    if (!restaurantData) {
      const data = new restaurant({ ownerId: id });
      const response = await data.save();
      restaurantData = response;
    }

    upload(req, res, async (err) => {
      if (err) {
        console.log("err: ", err);
        return res.status(500).json({ error: err });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Please send image!" });
      }
      const { data } = req.body;
      const uploadedFile = req.file.filename;
      const uploadData = JSON.parse(data);
      delete uploadData.image;
      uploadData.image = `http://localhost:3000/public/images/${uploadedFile}`;
      console.log("uploadData: ", uploadData);
      console.log("restaurantData: ", restaurantData);
      restaurantData.menuItem = [...restaurantData.menuItem, uploadData];
      const response = await restaurant.findByIdAndUpdate(
        restaurantData._id,
        restaurantData,
        { new: true }
      );
      res.status(201).json({
        data: response,
      });
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "server error" });
  }
});

// delete food item
restaurantRoute.delete("/:id/:menuId", async (req, res) => {
  const { id, menuId } = req.params;

  try {
    const data = await restaurant.findOne({ ownerId: id });
    const index = data.menuItem.findIndex((i) => i.id == menuId);
    let imageName = "";
    console.log("index: ", index);
    if (index > -1) {
      imageName = data.menuItem[index].image.split("/")[5];
    } else {
      res.status(400).json({
        error: "Menu item not found!",
      });
    }
    if (imageName) {
      fs.unlinkSync(path.join(__dirname, `../../public/images/${imageName}`));
    } else {
      res.status(400).json({ error: "Image not found" });
    }

    data.menuItem = data.menuItem.filter((item) => item.id != menuId);
    const response = await restaurant.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    res.status(200).json({ response });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});

export default restaurantRoute;
