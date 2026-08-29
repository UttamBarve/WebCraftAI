const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    // Get token from HTTP-only cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No Token Provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRETKEY
    );

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: `ERROR : AUTH Middleware Error ${error.message}`,
    });
  }
};

module.exports = auth;