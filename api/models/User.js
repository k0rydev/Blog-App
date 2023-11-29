const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 5, unique: true },
  password: { type: String, required: true, minLength: 8 },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
