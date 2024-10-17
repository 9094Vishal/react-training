const users = new Map();

let id = 1;

const user = {
  id: 1,
  name: "vishal",
  phone: 9016451303,
  dob: "29-03-2001",
  gender: "male",
  address: {
    "address-line": "4, suvidhi nath society kalika road,",
    city: "Patan",
    state: "Gujarat",
    pin: "384265",
  },
  hobbies: ["Cricket", "Swimming"],
};

// intialize this above data
users.set(user.id, user);
// user ::
function existsuserId(id) {
  return users.has(id);
}

// user :: get all users

function getAllusers() {
  return Array.from(users.values());
}

// user :: get one user [id]
function getuserId(id) {
  return users.get(id);
}
// user :: Create user

function addNewuser(newUser) {
  id++;
  const userToAdd = {
    id,
    ...newUser,
  };
  users.set(id, userToAdd);
  return userToAdd;
}

// user :: update | edit user [id]

// user :: update | edit user [id]
function updateuser(id, updateUser) {
  const targetUser = users.get(id);
  if (targetUser) {
    Object.assign(targetUser, updateUser);
    return targetUser;
  }
  return null;
}

// user :: delete  user [id]

function deleteuser(id) {
  const success = users.delete(id);
  id--;
  return success;
}

module.exports = {
  existsuserId,
  getuserId,
  getAllusers,
  addNewuser,
  deleteuser,
  updateuser,
};
