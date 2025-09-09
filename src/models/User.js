const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// method to compare password to hashed password
//              COSTUMER FUNCTION
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//2 main type of middleware
//post midddleware runs after an event
//pre middleware runs before an event

//hash password before saving user to db

userSchema.pre("save", async function (next) {
  console.log("pre middleeware  -  before saving user to db", this);

  //only hash the password if it has been moddified or is new
  if (!this.isModified("password")) {
    return next();
  }

  //hash password

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compile model and export

const User = mongoose.model("User", userSchema);
module.exports = User;
