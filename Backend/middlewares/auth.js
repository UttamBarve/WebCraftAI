const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res) => {
  try {
    // Get Token:
    const header = req.headers.authorization;

    // Check Token
    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({
        message: "No Token Provided",
      });
    }

    //  Extract Token
    const token = header.split(" ")[1];

    // Verify Token:
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Fetching User:
    const user = await User.findOne(decoded._id);

    if (!user) {
      return res.json({
        message: "User Not Found!",
      });
    }

    // Setting User Details
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "ERROR : AUTH Middleware Error",
    });
  }
};

module.exports = auth;