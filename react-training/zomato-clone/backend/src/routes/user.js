import express from "express";
import Users from "../schemas/userSchema.js";
import verifytoken from "../middelware/auth.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

// Set up __dirname manually for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[0];
    const imagePath = path.join(__dirname, "../../public/images");

    // Ensure the imagePath exists
    if (ext === "image") {
      cb(null, imagePath);
    } else {
      cb(new Error("Error: Images only! (jpeg, jpg, or png)"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Middleware for file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 }, // Limit file size (100KB)
}).single("profile");

// Route to upload profile images
router.put("/profile/:id", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Please send an image!" });
    }
    const uploadedFile = req.file.filename;
    res.status(201).json({
      message: "Image uploaded successfully!",
      image: `http://localhost:3000/public/images/${uploadedFile}`,
    });
  });
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server-side error" });
  }
});

// Get a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.status(200).json({ data: user });
    } else {
      res.status(404).json({ error: "User not found!" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server-side error" });
  }
});

// Update or add address
router.put(
  "/address/:id",
  verifytoken,
  validateData(schema.userAddressSchema, "body"),
  async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const user = await Users.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      // Update address logic
      const index = user.address.findIndex((i) => i._id == data.address.id);
      if (data.address.default) {
        user.address.forEach((i) => (i.default = false));
      }

      if (index > -1) {
        user.address[index] = data.address;
      } else {
        user.address.push(data.address);
      }

      const updatedUser = await Users.findByIdAndUpdate(id, user, {
        new: true,
      });
      res.status(200).json({ data: updatedUser });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update user data
router.put(
  "/:id",
  verifytoken,
  validateData(schema.userSchema, "body"),
  async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const updatedUser = await Users.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found!" });
      }
      res.status(200).json({ data: updatedUser });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete address
router.delete("/:id/:addressId", verifytoken, async (req, res) => {
  const id = req.params.id;
  const addressId = req.params.addressId;

  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    user.address = user.address.filter((item) => item._id != addressId);

    const updatedUser = await Users.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({ message: "Address deleted!", data: updatedUser });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
