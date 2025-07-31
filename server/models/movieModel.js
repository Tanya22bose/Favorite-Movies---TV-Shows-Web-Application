const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["Movie", "TV Show"], required: true },
    director: { type: String, required: true },
    budget: { type: Number, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    year: {
      type: Number,
      required: true,
      minimum: 1970,
    },
    poster: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;
