const express = require("express");
const router = express.Router();
const User = require("../models/useModel");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    // await user.save();
    res.status(201).json({ message: "user Added!" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const user = await User.findOne({ username });
    // if (!user) {
    //   return res.status(401).json({ error: "User not found!!" });
    // }
    const token = jwt.sign({ userId: 123 }, "key9094", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "serverSide error" });
  }
});

module.exports = router;
