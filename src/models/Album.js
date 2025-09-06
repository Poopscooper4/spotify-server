const mongoose = require("mongoose");

//schema

const albumeSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "please provide a title"],
    trim: true,
    maxlength: [40, "title should not be more than 40 characters"],
    minlength: [3, "title should be at least 3 characters"],
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "please provide an artist"],
  },
  releaseDate: {
    type: Date,
    default: Date.now(),
  },
  coverImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2016/07/20/10/57/nebula-10-1530144_1280.png",
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  genre: {
    type : String,
    required: [true, "please provide a genre"],
    trim: true,
  },
  likes : {
    type : Number,
    default : 0,
  },
  description : {
    type : String,
    trim : true,
    maxlength : [200 , "description should not be more than 200 characters"],
    minlength : [10 , "description should be at least 10 characters"],
    default : "No description provided"
  },
  isExplict : {
    type : Boolean,
    default : false,
  }
});
