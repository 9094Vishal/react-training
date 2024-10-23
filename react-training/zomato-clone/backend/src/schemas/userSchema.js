import mongoose from "mongoose";

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
});
const Users = mongoose.model("Users", userSchema);

export default Users;
