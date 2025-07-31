const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controller/user.controller");
const auth = require("../middlewares/authMiddleware");

const userRouter = express.Router();

// Register a user
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-current-user", auth, getCurrentUser);

module.exports = userRouter;
