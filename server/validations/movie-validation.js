const yup = require("yup");

const movieSchema = yup.object().shape({
  title: yup.string().required(),
  poster: yup.string().required(),
  type: yup.string().oneOf(["Movie", "TV Show"]).required(),
  director: yup.string().required(),
  budget: yup.number().required(),
  location: yup.string().required(),
  duration: yup.string().required(),
  year: yup.number().required(),
});

module.exports = movieSchema;
