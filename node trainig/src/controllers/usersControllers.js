const {
  getAllusers,
  existsuserId,
  getuserId,
  deleteuser,
  updateuser,
  addNewuser,
} = require("../models/userModel");

const getAllUsers = (req, res) => {
  return res.status(200).json(getAllusers());
};

const getUser = (req, res) => {
  const userId = Number(req.params.id);
  if (!existsuserId(userId)) {
    return res.status(400).json({
      error: "User not found!",
    });
  }
  return res.status(200).json(getuserId(userId));
};

const addNewUser = (req, res) => {
  try {
    const user = req.body;
    const newUser = addNewuser(user);
    res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    console.log("error", error);
  }
};

function deleteUser(req, res) {
  const userId = Number(req.params.id);
  if (!existsuserId(userId)) {
    return res.status(404).json({
      error: "User not found!",
    });
  }

  const deletedUser = deleteuser(userId);
  return res.status(200).json(deletedUser);
}

function updateUserData(req, res) {
  const userId = Number(req.params.id);
  const updateData = req.body;

  if (!existsuserId(userId)) {
    return res.status(404).json({
      error: "User not found!",
    });
  }

  const updated = updateuser(userId, updateData);

  if (updated) {
    return res.status(200).json(updated);
  } else {
    return res.status(500).json({
      error: "Failed to update todo",
    });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  addNewUser,
  deleteUser,
  updateUserData,
};
