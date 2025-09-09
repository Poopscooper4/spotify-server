const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

const userRouter = express.Router();

// public routes

//Register

userRouter.post("/register", registerUser);

// Logic for login user will go here

userRouter.post("/login", loginUser);

//  private route.....

//  get user profile

userRouter.get("/profile", protect, getUserProfile);

module.exports = userRouter;
