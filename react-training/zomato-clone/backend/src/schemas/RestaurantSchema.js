import mongoose from "mongoose";

const reastaurantSchema = new mongoose.Schema({
  restaurantAddressDetails: {
    area: String,
    city: String,
    landmark: String,
    shop: String,
  },
  ownerId: String,
  restaurantName: String,
  timing: [
    {
      startTime: String,
      endTime: String,
    },
  ],
  ownerDetails: {
    email: String,
    fullName: String,
    phone: String,
  },
  menuItem: [
    {
      description: String,
      foodCategory: String,
      image: String,
      id: String,
      isActive: { type: Boolean, default: false },
      price: Number,
      title: String,
    },
  ],
  documents: {
    panNo: String,
    restaurantImage: String,
    GSTNo: String,
  },
});

const restaurant = mongoose.model("restaurant", reastaurantSchema);

export default restaurant;
