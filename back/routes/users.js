const usersRouter = require("express").Router();
const {
  getUsers,
  getUser,
  getUserById,
  //createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

usersRouter.get("/", getUsers); // GET /users — returns all users
usersRouter.get("/:userId", getUser); // GET /users/:userId - returns a user by _id
//usersRouter.post("/", createUser); // POST /users — creates a new user
usersRouter.get("/me",getUserById); // GET to receive information about the current user
usersRouter.patch("/me", updateProfile); // PATCH /users/me — update profile
usersRouter.patch("/me/avatar", updateAvatar); // PATCH /users/me/avatar — update avatar

module.exports = usersRouter;
