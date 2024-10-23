const express = require("express");
const Users = require("../schemas/mongoSchema");
const verifyToken = require("../middleware/authMiddleware");
const joiMiddleware = require("../middleware/schemaValidation");
const schema = require("../schemas/schemsa");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const response = await Users.find();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.status(200).json({ data: user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.post("/", joiMiddleware(schema.userSchema, "body"), async (req, res) => {
  try {
    const data = req.body;
    const user = new Users(data);
    const savedUser = await user.save();
    res.status(201).json({ data: savedUser });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Users.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({ error: "User not found!" });
    }
    res.status(200).json({ data: response });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
route.put(
  "/:id",

  joiMiddleware(schema.userSchema, "body"),
  async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const response = await Users.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!response) {
        res.status(404).json({ error: "User not found!" });
      }
      res.status(200).json({ data: response });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = route;
