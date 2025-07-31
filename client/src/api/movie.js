import { axiosInstance } from ".";

export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Add movie failed",
    };
  }
};

// Get all movies
export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Fetching movies failed",
    };
  }
};

// Update a movie
export const updateMovie = async (movieId, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/movies/update-movie/${movieId}`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Update movie failed",
    };
  }
};

// Delete a movie
export const deleteMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/movies/delete-movie/${movieId}`
    );
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Delete movie failed",
    };
  }
};
