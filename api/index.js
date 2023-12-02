const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const app = express();

const passwordSalt = bcrypt.genSaltSync(10);
const tokenSalt = "bcrypt.genSaltSync(10)";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://phamtruc-work:phamtruc-work@cluster0.nhzjq83.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const UserDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, passwordSalt),
    });
    res.json({ UserDoc });
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json("Username or Password is null");
  }
  const UserDoc = await User.findOne({ username });

  const passwordCheck = bcrypt.compareSync(password, UserDoc.password);

  if (passwordCheck) {
    jwt.sign({ username, id: UserDoc._id }, tokenSalt, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
      res.status(200);
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.listen(4000);
