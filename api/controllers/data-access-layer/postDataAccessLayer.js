const Post = require("../../models/Post");

exports.createPost = async (postData) => {
  const { title, summary, content, cover, author } = postData;
  return await Post.create({
    title,
    summary,
    content,
    cover,
    author,
  });
};

exports.editPost = async (id, postData) => {
  const { title, summary, content, cover } = postData;
  return await Post.findById(id).updateOne({
    title,
    summary,
    content,
    cover,
  });
};

exports.getPostID = async (postID) => {
  return await Post.findById(postID);
};

exports.getPostPage = async (postID) => {
  return await Post.findById(postID).populate("author", ["username"]);
};

exports.getPost = async () => {
  return await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
};

exports.deletePost = async (postID) => {
  return await Post.deleteOne({ _id: postID });
};
