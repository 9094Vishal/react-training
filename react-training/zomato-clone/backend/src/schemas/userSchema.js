import mongoose from "mongoose";
let ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
  phone: String,
  image: String,
  name: String,
  city: String,
  isReastaurant: { type: Boolean, default: false },
  address: [
    {
      addressType: String,
      address: String,
      city: String,
      default: { type: Boolean, default: false },
      name: String,
      phone: String,
      state: String,
      pin: String,
    },
  ],
  restaurantId: { type: ObjectId, ref: "restaurant" },
});
const Users = mongoose.model("Users", userSchema);

export default Users;
