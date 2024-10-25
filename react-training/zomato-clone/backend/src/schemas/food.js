import mongoose from "mongoose";
let ObjectId = mongoose.Schema.Types.ObjectId;

const foodSchema = new mongoose.Schema({
  description: String,
  foodCategory: String,
  image: String,
  id: String,
  isActive: { type: Boolean, default: false },
  price: Number,
  title: String,
  restaurantId: { type: ObjectId, ref: "restaurant" },
});

const food = mongoose.model("food", foodSchema);
export default food;
