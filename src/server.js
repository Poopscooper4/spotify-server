const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const connectedDB = require("./config/dbConnect");

//load env variables

dotenv.config();

//initialize express app

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware to parse JSON requests
app.use(express.json());

//Routes  


// middleware for user routes
app.use("/api/users", userRouter);

const startServer = async () => {
  await connectedDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
