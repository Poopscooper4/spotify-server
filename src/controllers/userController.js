const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const userRouter = require("../routes/userRoutes");

// @desc - Register a new user
// @route - POST /api/users/register
//@access - Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if all user exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(StatusCodes.BAD_GATEWAY);
    throw new Error("User already exists");
  }

  // create user

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Invalid user data");
  }
});

// @desc - Login a user
// @route - POST /api/users/login
//@access - Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = res.body;

  // check for user email

  const User = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(StatusCodes.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
      token: "token HERE",
    });
  } else {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, loginUser };
