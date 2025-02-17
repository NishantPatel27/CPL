const express = require("express");
const playerController = require("../controllers/player-controller");
const authController = require("./../controllers/auth-controllers");
const { upload, resizeImagePlayer } = require("./../utils/image-upload");

const router = express.Router();

// move to next round
router.patch("/nextRound", playerController.nextRound);

// get random playe
router.get(
  "/randomPlayer",
  authController.isLoggedIn,
  playerController.getRandomPlayer
);

// get random player by type
router.get(
  "/random/:playerType/:playerId",
  authController.isLoggedIn,
  playerController.getRandomPlayerByPlayerType
);

// Get all players
router.get("/", authController.isLoggedIn, playerController.listAllPlayers);

// Get single player by id
router.get(
  "/:playerID",
  authController.isLoggedIn,
  playerController.getPlayerById
);

router.get("/stat/details", playerController.getPlayerDetails);

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

router.get("/stat/details", playerController.getPlayerDetails);

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

router.post(
    "/uploadExcel",
    playerController.uploadExcel
);
module.exports = router;
