const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

// middleware to protect routes - verify token and get user from token

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //check if authorization header exists

  if (!req.header.authorization) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Not authorized, no token");
  }

  //check for token in header

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token

      const decoded = jwt.verify(token, process.env.JWT);

      //SET REQ.USER TO THE NEW FOUND INTO TOKEN

      req.user = await User.findById(decoded.id).select("-password");
      next();


    } catch (error) {
      console.log(error);
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("Not authorized, token failed");
    }
  }
});


module.exports = { protect }