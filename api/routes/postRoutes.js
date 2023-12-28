const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const postController = require("../controllers/postController");

router.post("/post", uploadMiddleware.single("file"), postController.postPost);
router.put("/post", uploadMiddleware.single("file"), postController.editPost);
router.delete("/post/:id", postController.deletePost);
router.get("/post", postController.getPost);
router.get("/post/:id", postController.getPostPage);

module.exports = router;
