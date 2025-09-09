const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const connectedDB = require("./config/dbConnect");
const { StatusCodes } = require("http-status-codes");

//load env variables

dotenv.config();

//initialize express app

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware to parse JSON requests
app.use(express.json());

//Routes

app.use("/api/users", userRouter);

//  ERROR HANDLING

app.use((req, res, next) => {
  const error = new Error("not foundd - " + req.originalUrl);

  res.status = StatusCodes.NOT_FOUND;
  next(error);
});

// global error handler

app.use((err, req, res, next) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || "internal server error",
    status: "error",
  });
});

const startServer = async () => {
  await connectedDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
