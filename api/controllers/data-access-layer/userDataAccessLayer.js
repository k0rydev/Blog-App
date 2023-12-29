const User = require("../../models/User");

exports.setUser = async (userData) => {
  const { username, hashedPassword } = userData;
  return await User.create({
    username,
    password: hashedPassword,
  });
};

exports.getUser = async (username) => {
  return await User.findOne({ username });
};
