const router = require("express").Router();
const { celebrate, Joi, errors } = require("celebrate");
const {
  getUsers,
  getUser,
  getUserById,
  //createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/", getUsers); 
router.get("/me",getUserById);
router.get("/:userId", getUser); 
router.patch("/me", updateProfile); 
router.patch("/me/avatar", updateAvatar); 



module.exports = router;
