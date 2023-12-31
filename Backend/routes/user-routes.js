const express = require("express");
const authController = require("./../controllers/auth-controllers");

const router = express.Router();

router.post("/signup", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/users", authController.listAllUsers);

router.use(authController.restrictTo("admin"));

module.exports = router;
