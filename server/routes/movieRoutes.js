const express = require("express");
const {
  addMovie,
  updateMovie,
  getAllMovies,
  deleteMovie,
} = require("../controller/movie.controller");

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie/:movieId", updateMovie);
movieRouter.delete("/delete-movie/:movieId", deleteMovie);

module.exports = movieRouter;
