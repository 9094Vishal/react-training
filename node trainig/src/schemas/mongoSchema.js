const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  dob: Date,
  gender: String,
  address: {
    "address-line": String,
    city: String,
    state: String,
    pin: String,
  },
  hobbies: [String],
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
