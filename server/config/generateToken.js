const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_TOKEN || 'Test';
const expiresIn = "30d";

exports.generateToken = (user) => {
  try {
    if (!secret) throw new Error("JWT secret not found");

    const data = {
      _id: user._id,
      userName: user.name,
      email: user.email,
      imgUrl: user.imgUrl,
      userId: user.userId,
    };

    // generate token
    const token = jwt.sign(data, secret, {
      expiresIn,
    });

    return token;
  } catch (error) {
    console.log("generate token failed:", error);
    throw new Error(error.message);
  }
};
