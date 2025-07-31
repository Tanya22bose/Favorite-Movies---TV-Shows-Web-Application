const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ userId });
    req.body = {};
    req.body.userId = userId;
  } catch (err) {
    return res.status(401).send({ success: false, message: "Invalid token!" });
  }
  next();
};

module.exports = auth;
