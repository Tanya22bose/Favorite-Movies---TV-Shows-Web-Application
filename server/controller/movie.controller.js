const Movie = require("./../models/movieModel");
const movieSchema = require("./../validations/movie-validation");

const addMovie = async (req, res) => {
  try {
    await movieSchema.validate(req.body);
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(200).json({
      success: true,
      message: "New Movie has been added successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const Movies = await Movie.find({});
    res.status(200).json({ success: true, data: Movies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    await movieSchema.validate(req.body);
    await Movie.findByIdAndUpdate(req.params.movieId, req.body);
    res
      .status(200)
      .json({ success: true, message: "Movie updated successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.movieId);
    res
      .status(200)
      .json({ success: true, message: "Movie deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie };
