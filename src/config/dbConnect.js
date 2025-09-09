const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB CONNECTION SUCCESSFUL!"))
//   .catch((err) => {
//     console.log(err);
//   });

const connectedDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB CONNECTION SUCCESSFUL!");
  } catch (error) {
    console.error("mongoDB connection Failed:", error);
    process.exit(1);
  }
};


module.exports = connectedDB;