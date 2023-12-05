const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

const cookieParser = require("cookie-parser");
const User = require("./models/User");
const Post = require("./models/Post");
const app = express();
const uploadMiddleware = multer({ dest: "uploads/" });

const passwordSalt = bcrypt.genSaltSync(10);
const tokenSecret = "bcrypt.genSaltSync(10)";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
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
    res.json(UserDoc);
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
    jwt.sign({ username, id: UserDoc._id }, tokenSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({ id: UserDoc._id, username });
      res.status(200);
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, tokenSecret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, tokenSecret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  }
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.listen(4000);
