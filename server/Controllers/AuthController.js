const { generateToken } = require("../config/generateToken");
const AuthModal = require("../Schema/authData");

exports.Auth = async (req, res) => {
  try {
    const { email, userName, userId, imgUrl } = req.body;
    if (!email || !userName || !userId || !imgUrl) {
      return res.status(400).json({ error: "All fields are necessary" });
    }

    let user = await AuthModal.findOne({ email: email });
    if (!user) {
      user = await AuthModal.create({ email, userName, userId, imgUrl });
    }

    const token = generateToken(user);
    return res
      .status(200)
      .json({success:true, message: "User authenticated successfully", token });
  } catch (err) {
    console.error("Error in authentication:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
