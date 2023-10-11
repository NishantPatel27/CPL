const express = require("express");
const playerController = require("../controllers/player-controller");
const authController = require("./../controllers/auth-controllers");
const { upload, resizeImagePlayer } = require("./../utils/image-upload");

const router = express.Router();

// get random player
router.get(
  "/random",
  authController.isLoggedIn,
  playerController.getRandomPlayer
);

// Get all players
router.get("/", authController.isLoggedIn, playerController.listAllPlayers);

// Get single player by id
router.get(
  "/:playerID",
  authController.isLoggedIn,
  playerController.getPlayerById
);

// Create new player
router.post(
  "/add",
  authController.isLoggedIn,
  upload.single("file"),
  resizeImagePlayer,
  playerController.createPlayer
);

// Update a single player by id
router.put(
  "/update/:playerID",
  authController.isLoggedIn,
  upload.single("file"),
  resizeImagePlayer,
  playerController.updatePlayer
);

// Delete a single player by id
router.delete(
  "/delete/:playerID",
  authController.isLoggedIn,
  playerController.deletePlayer
);

// get player by its type
router.get(
  "/:playerType",
  authController.isLoggedIn,
  playerController.getPlayersByType
);

router.get(
  "/team/:teamName",
  authController.isLoggedIn,
  playerController.getAllPlayerByTeamName
);

module.exports = router;
