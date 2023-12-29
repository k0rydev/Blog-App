const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const passwordSalt = bcrypt.genSaltSync(10);
const tokenSecret = "SE104.O11.KHTN";

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const UserDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, passwordSalt),
    });
    res.json(UserDoc);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json("Username or Password is null");
  }
  const UserDoc = await User.findOne({ username });
  if (!UserDoc) {
    return res.status(400).json("Username not exists");
  }
  const passwordCheck = bcrypt.compareSync(password, UserDoc.password);

  if (passwordCheck) {
    jwt.sign({ username, id: UserDoc._id }, tokenSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({ id: UserDoc._id, username });
      res.status(200);
    });
  } else {
    res
      .status(400)
      .json("Wrong Credentials. Username not exists or wrong password.");
  }
};

exports.profile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, tokenSecret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "").json("ok");
};
