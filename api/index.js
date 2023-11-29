const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://phamtruc-work:phamtruc-work@cluster0.nhzjq83.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const UserDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json({ UserDoc });
  } catch (e) {
    res.status(400).json(e);
  }
  // res.json("test ok");
});

app.listen(4000);
