const express = require("express");
const auctionController = require("../controllers/auction-controller");
const authController = require("./../controllers/auth-controllers");

const router = express.Router();

// Create new player
router.post("/sell", authController.isLoggedIn, auctionController.sellPlayer);

module.exports = router;
