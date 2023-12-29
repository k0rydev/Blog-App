const fs = require("fs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const tokenSecret = "SE104.O11.KHTN";

const Post = require("../models/Post");

exports.postPost = async (req, res) => {
  if (!req.file) {
    return res.status(401).json("You need to choose a cover");
  }
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
      if (!title || !summary || !content) {
        return res
          .status(400)
          .json("You need to write a title/summary/content");
      }
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.status(200).json(postDoc);
    });
  }
};

exports.editPost = async (req, res) => {
  const newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;

  jwt.verify(token, tokenSecret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;

    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      res.status(400).json("You are not the author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.status(200).json(postDoc);
  });
};

exports.deletePost = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Post.deleteOne({ _id: Object(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the document" });
      });
  } else {
    res.status(500).json({ error: "Could not find the document" });
  }
};

exports.getPost = async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};

exports.getPostPage = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};
