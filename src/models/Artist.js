const mongoose = require("mongoose");

//Schema
const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [40, "name should not be more than 40 characters"],
      minlength: [3, "name should be at least 3 characters"],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/04/29/09/33/drums-745077_1280.jpg",
    },
    genres: [
      {
        type: String,
        ref: "Song",
      },
    ],
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
    isVerified: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Compile to for the model
const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
