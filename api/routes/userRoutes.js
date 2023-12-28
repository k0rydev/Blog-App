const express = require("express");
const cors = require("cors");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
router.get("/profile", userController.profile);

module.exports = router;
