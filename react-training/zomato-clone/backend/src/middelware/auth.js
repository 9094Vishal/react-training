import jwt from "jsonwebtoken";

const verifytoken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res
      .status(401)
      .json({ error: "Access deniend", message: "You are not authontiated" });
  }
  try {
    const decode = jwt.verify(token, "zomato");
    req.id = decode._id;
    console.log(" req._id: ", req._id);
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Invalid token", message: "You are not authontiated" });
  }
};

export default verifytoken;
