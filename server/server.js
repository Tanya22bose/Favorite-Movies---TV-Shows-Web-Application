const express = require("express");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const movieRouter = require("./routes/movieRoutes");
const app = express();

require("dotenv").config();

//connect with mongo db
require("./config/db");

//parse request body using express.json
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies/auth headers
  })
);

// routes for movies and auth
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use((_, res) => {
  res.status(404).send("Page not found!");
});

app.listen(8082, () => {
  console.log("Server is running!");
});
