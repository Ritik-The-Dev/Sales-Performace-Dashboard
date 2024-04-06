const mongoose = require("mongoose");

const authModal = new mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  userId:{ type: String, required: true },
  imgUrl:{ type: String, required: true }
});

const AuthModal = mongoose.model("AuthData", authModal);
module.exports = AuthModal