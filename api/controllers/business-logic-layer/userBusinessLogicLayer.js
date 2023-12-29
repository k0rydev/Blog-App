const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordSalt = bcrypt.genSaltSync(10);
const tokenSecret = "SE104.O11.KHTN";

const {
  getUser,
  setUser,
} = require("../data-access-layer/userDataAccessLayer");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username.trim() || !password.trim()) {
    res.status(400).json({ error: "Username or Password can not be null" });
    return;
  }
  const UserDoc = await getUser(username.trim());
  if (UserDoc) {
    res.status(400).json({ error: "Username already existed" });
    return;
  } else {
    hashedPassword = bcrypt.hashSync(password, passwordSalt);
    await setUser({ username, hashedPassword });
    res.status(200).json({ message: "User is created" });
    return;
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username.trim() || !password.trim()) {
    res.status(400).json({ error: "Username or Password can not be null" });
    return;
  }
  const UserDoc = await getUser(username);

  if (!UserDoc) {
    res.status(400).json({ error: "User does not exist" });
    return;
  }
  const passwordCheck = bcrypt.compareSync(password, UserDoc.password);
  if (passwordCheck) {
    jwt.sign({ username, id: UserDoc._id }, tokenSecret, {}, (err, token) => {
      if (err) throw err;
      res
        .status(200)
        .cookie("token", token)
        .json({ id: UserDoc._id, username, message: "User is logged in" });
      return;
    });
  } else {
    res.status(400).json({ message: "Incorrect username or password" });
    return;
  }
};

exports.profile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, tokenSecret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
      return;
    });
  }
};

exports.logout = (req, res) => {
  res.status(200).cookie("token", "").json({ message: "User logged out" });
  return;
};
