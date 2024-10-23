import express from "express";
import Users from "../schemas/userSchema.js";
import verifytoken from "../middelware/auth.js";
import validateData from "../middelware/validate.js";
import schema from "../schemas/validationSchema.js";
import path from "path";
import multer from "multer";
const router = express.Router();
const __dirname = import.meta.dirname;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[0];
    const imagePath = path.join(__dirname, "../../public/images");
    if (ext === "image") {
      cb(null, imagePath);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: 100000,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("profile");

// check file type
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg, jpg, or png)");
  }
};

router.put("/profile/:id", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Please send image!" });
    }
    const uploadedFile = req.file.filename;
    res.status(201).json({
      message: "Image uploaded",
      image: `http://localhost:3000/public/images/${uploadedFile}`,
    });
  });
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ data: users });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "server Side error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.status(200).json({ data: user });
    } else {
      res.status(404).json({ error: "User not found!" });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "server Side error" });
  }
});

// add address also update it if it is available..
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
        res.status(404).json({ error: "User not found!" });
      } else {
        const index = user.address.findIndex((i) => i._id == data.address.id);
        if (data.address.default) {
          user.address = user.address.map((i) => {
            i.default = false;
            return i;
          });
        }

        if (index > -1) {
          user.address[index] = data.address;
        } else {
          user.address = [...user.address, data.address];
        }

        const response = await Users.findByIdAndUpdate(id, user, {
          new: true,
        });
        res.status(200).json({ data: response });
      }
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// add user data
router.put(
  "/:id",
  verifytoken,
  validateData(schema.userSchema, "body"),
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

// delete address
router.delete("/:id/:addressId", verifytoken, async (req, res) => {
  const id = req.params.id;
  const addressId = req.params.addressId;
  console.log("addressId: ", addressId);

  try {
    const response = await Users.findById(id);
    if (response.address) {
      response.address = response.address.filter(
        (item) => item.id != addressId
      );
    }
    if (!response) {
      res.status(404).json({ error: "User not found!" });
    }

    const user = await Users.findByIdAndUpdate(id, response, {
      new: true,
    });
    res.status(200).json({ message: "Address deleted!", data: user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
