const express = require("express");
const multer = require("multer");
const path = require("path");
const route = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[0];
    // Using the correct path based on the project's root directory
    const imagePath = path.join(__dirname, "../../public/uploads/images");
    const otherPath = path.join(__dirname, "../../public/uploads/others");

    if (ext === "image") {
      console.log("Storing in images path");
      cb(null, imagePath);
    } else {
      console.log("Storing in others path");
      cb(null, otherPath);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myFile");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg, jpg, png, gif)");
  }
}

// File upload route
route.post("/", (req, res) => {
  console.log("upload call");
  upload(req, res, (err) => {
    if (err) {
      console.log("error ");
      console.error(err);
      return res.status(500).json({ error: err });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Please send file" });
    }
    const uploadedFile = req.file.filename;
    res.status(201).json({
      message: "Image uploaded",
      image: `http://localhost:3000/public/uploads/images/${uploadedFile}`,
    });
  });
});

module.exports = route;
