import express from "express";
import verifytoken from "../middelware/auth.js";
import cart from "../schemas/cart.js";
import mongoose from "mongoose";

const cartRoute = express.Router();
// add to cart or create a cart
cartRoute.post("/", verifytoken, async (req, res) => {
  try {
    const data = new cart(req.body);
    let response;
    const cartData = await cart.findOne({
      userId: data.userId,
      hotelId: data.hotelId,
    });
    console.log("cartData: ", cartData);
    if (cartData) {
      const index = cartData.menuItem.findIndex((i) =>
        i.foodItemId.equals(data.menuItem[0].foodItemId)
      );
      console.log("data.menuItem: ", data.menuItem);

      console.log("index: ", index);
      if (index > -1) {
        const updateData = cartData.menuItem[index];
        updateData.quantity = updateData.quantity + 1;
        console.log("updateData: ", updateData);

        cartData.menuItem[index] = updateData;
      } else {
        cartData.menuItem = [...cartData.menuItem, data.menuItem[0]];
      }
      console.log("cartData: ", cartData);
      response = await cart.findByIdAndUpdate(cartData._id, cartData, {
        new: true,
      });
    } else {
      response = await data.save();
    }
    if (response) {
      res
        .status(200)
        .json({ message: "cart added successfully", data: response });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

cartRoute.put("/:userId/cartId", async (req, res) => {
  try {
    const { userId, cartId } = req.params;
    const cartData = await cart.findOne({ userId });

    if (cartData) {
      const index = cartData.menuItem.findIndex((i) => i._id == cartId);
      if (index > -1) {
        cartData.menuItem[index] = {
          ...cartData.menuItem[index],
          quantity: Number(cartData.menuItem[index].quantity) - 1,
        };
      } else {
        cartData.menuItem = cart.menuItem.filter((i) => i._id != cartId);
      }
      const response = await cart.findByIdAndUpdate(cartData._id, cartData, {
        new: true,
      });
      if (response) res.status(200).json({ data: cartData });
    } else {
      res.status(404).json({ error: "Cart not found!" });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});

cartRoute.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("req.params: ", req.params);
  console.log("userId: ", userId);
  try {
    const cartItems = await cart.find({ userId });
    if (cartItems) {
      res.status(200).json({ data: cartItems });
    } else {
      res.status(404).json({ error: "Cart not found!" });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});

// Define your route to fetch cart items with hotel data
cartRoute.get("/hotelCart/:userId/:hotelId", async (req, res) => {
  try {
    const { userId, hotelId } = req.params;

    // Ensure hotelId is valid
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ error: "Invalid hotelId" });
    }

    // Perform the aggregation to lookup hotel data based on hotelId in cart collection
    const cartData = await cart.aggregate([
      {
        // Match cart items with the specified hotelId
        $match: {
          hotelId: new mongoose.Types.ObjectId(hotelId),
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        // Perform a lookup to join with the hotel collection
        $lookup: {
          from: "restaurants", // The name of the hotel collection
          localField: "hotelId", // Field in the cart collection
          foreignField: "_id", // Field in the hotel collection
          as: "hotelData", // The name of the output array field
        },
      },
      {
        // Unwind the hotelData array to simplify the result
        $unwind: "$hotelData",
      },
    ]);

    res.status(200).json({ cartData });
  } catch (error) {
    console.error("Error fetching cart data with hotel information:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching cart data" });
  }
});

export default cartRoute;
