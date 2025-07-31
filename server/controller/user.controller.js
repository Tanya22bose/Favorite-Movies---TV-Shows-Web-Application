const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Register a user
const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists",
      });
    }

    // hash the password before saving in the db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "Registration successful, Please login.",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Something went wrong on server side.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist. Please register.",
      });
    }

    //validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(req.body.password, validPassword, user.password);

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "You've successfully logged in!",
      data: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    console.log(user)
    res.send({
      success: true,
      data: user,
      message: "user details fetched successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getCurrentUser,
};
