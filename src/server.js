const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//load env variables

dotenv.config();

//initialize express app

const app = express();


//connevct to database

mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB CONNECTION SUCCESSFUL!"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT:${PORT}`);
} )

