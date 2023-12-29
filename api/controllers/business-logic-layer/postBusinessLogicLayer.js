const fs = require("fs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const tokenSecret = "SE104.O11.KHTN";

const Post = require("../../models/Post");

const {
  editPost,
  getPost,
  getPostID,
  getPostPage,
  deletePost,
  createPost,
} = require("../data-access-layer/postDataAccessLayer");

exports.createPost = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Cover can not be empty." });
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
          .json({ error: "Title, summary and content can not be empty." });
      }
      await createPost({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.status(200).json({ message: "Post created successfully" });
    });
  }
};

exports.editPost = async (req, res) => {
  newPath = null;
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

    const postDoc = await getPostID(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json({ error: "You are not the author" });
    }
    await editPost(id, {
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
    deletePost(req.params.id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: "Could not delete the post" });
      });
  } else {
    res.status(400).json({ error: "Could not find the post" });
  }
};

exports.getPost = async (req, res) => {
  const posts = await getPost();
  res.json(posts);
};

exports.getPostPage = async (req, res) => {
  const { id } = req.params;
  const postDoc = await getPostPage(id);
  res.json(postDoc);
};
