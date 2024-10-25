import mongoose from "mongoose";

const reastaurantSchema = new mongoose.Schema({
  restaurantAddressDetails: {
    area: String,
    city: String,
    address: String,
  },
  ownerId: String,
  restaurantName: String,

  ownerDetails: {
    email: String,
    fullName: String,
    phone: String,
  },

  panNo: String,
  image: String,
  GSTNo: String,
});

const restaurant = mongoose.model("restaurant", reastaurantSchema);

export default restaurant;
