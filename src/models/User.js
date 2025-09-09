const mongoose = require("mongoose");

// Schema definition for User

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please provide a name"],
      trim: true,
      maxlength: [40, "name should not be more than 40 characters"],
      minlength: [3, "name should be at least 3 characters"],
    },
    email: {
      type: String,
      require: [true, "please provide an email"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "pls provide a password"],
      minlength: [6, "password should be at least 6 characters"],
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2018/11/21/08/37/brain-3829057_1280.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    likedAlbums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    followedArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    followedPlaylists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  { timestamps: true }
);

// compile model and export

const User = mongoose.model("User", userSchema);
module.exports = User;
