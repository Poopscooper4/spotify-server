const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

// public routes

//Register

userRouter.post("/register", registerUser);


// Logic for login user will go here

userRouter.post("/login", loginUser)

module.exports = userRouter;
