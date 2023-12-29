const express = require("express");
const cors = require("cors");
const router = express.Router();
const userBusinessLogicLayer = require("../controllers/business-logic-layer/userBusinessLogicLayer");

router.post("/login", userBusinessLogicLayer.login);
router.post("/register", userBusinessLogicLayer.register);
router.post("/logout", userBusinessLogicLayer.logout);
router.get("/profile", userBusinessLogicLayer.profile);

module.exports = router;
