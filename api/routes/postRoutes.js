const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const postBusinessLogicLayer = require("../controllers/business-logic-layer/postBusinessLogicLayer");

router.post(
  "/post",
  uploadMiddleware.single("file"),
  postBusinessLogicLayer.createPost
);
router.put(
  "/post",
  uploadMiddleware.single("file"),
  postBusinessLogicLayer.editPost
);
router.delete("/post/:id", postBusinessLogicLayer.deletePost);
router.get("/post", postBusinessLogicLayer.getPost);
router.get("/post/:id", postBusinessLogicLayer.getPostPage);

module.exports = router;
