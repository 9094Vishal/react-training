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
import mongoose from "mongoose";
const __dirname = import.meta.dirname;
const restaurantRoute = express.Router();
const categories = [
  {
    category: "Gujarati",
    id: "1",
  },
  {
    category: "Panjabi",
    id: "2",
  },
  {
    category: "Chinise",
    id: "3",
  },
];
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
        const user = await Users.findByIdAndUpdate(
          uploadData.ownerId,
          {
            isReastaurant: true,
            restaurantId: response._id,
          },
          { new: true }
        );
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
// get all the restaurant
restaurantRoute.get("/", async (req, res) => {
  try {
    const response = await restaurant.find();
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
// Function to fetch foods by restaurant IDs
const fetchFoodsByIds = async (ids) => {
  console.log("ids: ", ids);
  try {
    const foods = await food
      .find({
        restaurantId: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) }, // Corrected line
      })
      .populate("restaurantId"); // Populate if you want to get restaurant details
    return foods;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

// Get foods list by restaurant IDs
restaurantRoute.get("/food", async (req, res) => {
  const ids = req.query.ids ? req.query.ids.split(",") : []; // Safely handle query parameters
  if (ids.length === 0) {
    return res.status(400).json({ error: "No restaurant IDs provided!" }); // Handle case with no IDs
  }

  try {
    const foods = await fetchFoodsByIds(ids);
    console.log("foods: ", foods);
    res.status(200).json(foods); // Send the foods back as a JSON response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error!" }); // Improved error response
  }
});

// Route to get restaurants by location and food type
restaurantRoute.get("/hotels", async (req, res) => {
  try {
    const { area, city, address, foodType } = req.query;

    // Step 1: Find food items matching the requested food type
    const foodItems = await food.find({ title: foodType });
    // console.log("foodItems: ", foodItems);
    const restaurantIds = foodItems.map((item) => item.restaurantId);
    console.log("restaurantIds: ", restaurantIds);

    // Step 2: Find restaurants matching location and IDs from food items
    const restaurants = await restaurant.find({
      _id: { $in: restaurantIds },
      "restaurantAddressDetails.address": address,
      // "restaurantAddressDetails.area": area,
      // "restaurantAddressDetails.city": city,
    });

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
    res.status(500).json({ error: "Internal server error! get data" });
  }
});

const foodWithCategory = (foods) => {
  const main = [];
  categories.forEach((item) => {
    const list = [];
    foods.forEach((food) => {
      if (food.foodCategory == item.id) {
        list.push(food);
      }
    });
    if (list.length != 0) {
      main.push({ menu: [...list], category: item.category });
    }
  });
  console.log("main: ", main);
  return main;
};

// get Food items par hotel
restaurantRoute.get("/foods/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foods = await food.find({ restaurantId: id });
    console.log("foods: ", foods);
    if (foods) {
      const menu = foodWithCategory(foods);
      res.status(200).json({ data: menu });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});
// Endpoint to fetch restaurants by list of IDs
restaurantRoute.post("/byIds", async (req, res) => {
  try {
    const { restaurantIds } = req.body;

    // Check if restaurantIds array exists and is an array
    if (!restaurantIds || !Array.isArray(restaurantIds)) {
      return res.status(400).json({ error: "restaurantIds array is required" });
    }

    // Convert string IDs to Mongoose ObjectId instances
    const objectIds = restaurantIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Query the Restaurant model for matching IDs
    const restaurants = await restaurant.find({ _id: { $in: objectIds } });

    // Return the found restaurants in the response
    res.status(200).json({ restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching restaurants" });
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

restaurantRoute.get("/registration/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await restaurant.findOne({ ownerId: id });
    if (response) {
      res.status(200).json({
        data: response,
      });
    } else {
      res.status(404).json({
        error: "Data not found!",
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});

restaurantRoute.put("/", verifytoken, async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log("err: ", err);
        return res.status(500).json({ error: err });
      }

      const data = req.body;
      const uploadedFile = req.file.filename;
      const uploadData = data;
      uploadData.ownerDetails = JSON.parse(uploadData.ownerDetails);
      uploadData.restaurantAddressDetails = JSON.parse(
        uploadData.restaurantAddressDetails
      );
      if (req.file) {
        uploadData.image = `http://localhost:3000/public/images/${uploadedFile}`;
      }

      const response = await restaurant.findOneAndUpdate(
        {
          ownerId: uploadData.ownerId,
        },
        uploadData,
        { new: true }
      );
      if (response) {
        res.status(201).json({
          data: response,
        });
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
export default restaurantRoute;
