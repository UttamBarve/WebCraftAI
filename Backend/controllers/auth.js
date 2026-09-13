const User = require("../models/user");
const jwt = require("jsonwebtoken");

const logIn = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    let user = await User.findOne({ email });
    console.log("user check");

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `ERROR : Google auth error : ${err}` });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({"message":"User Logout Successfully"});
  } catch (err) {
    return res.status(500).json({ message: `ERROR : Logout error : ${err}` });
  }
};

module.exports = { logIn, logOut };
