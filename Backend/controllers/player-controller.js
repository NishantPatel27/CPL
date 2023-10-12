const Player = require("./../models//players-model");
const { playerSchemaValidation } = require("./../validator");
const catchAsync = require("./../utils/catchAsync");
const sendResponse = require("./../utils/response");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

// Create Player
exports.createPlayer = async (req, res) => {
  // if (!req.file) {
  //     // If no file is uploaded, respond with a 400 Bad Request status
  //     return res.status(400).json({ success: false, message: 'No file uploaded' });
  // }
  console.log(req.body);
  const data = {
    image: req.file?.filename || "none",
    name: req.body.name,
    currentSemester: req.body.currentSemester,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    branch: req.body.branch,
    basePrice: req.body.basePrice,
    bidPrice: req.body.bidPrice,
    previousTeam: req.body.previousTeam,
    currentTeam: req.body.currentTeam,
    playerType: req.body.playerType,
    battingHand: req.body.battingHand,
    fours: req.body.fours,
    sixes: req.body.sixes,
    bowlingStyle: req.body.bowlingStyle,
    HighestWicket: req.body.HighestWicket,
    overs: req.body.overs,
    innings: req.body.innings,
    totalRuns: req.body.totalRuns,
    totalWickets: req.body.totalWickets,
    average: req.body.average,
    strikeRate: req.body.strikeRate,
    economyRate: req.body.economyRate,
  };
  console.log("hello-----------------------------------------", data);

  const { error, value } = playerSchemaValidation.validate(data);

  if (error) {
    return sendResponse(res, 400, "Validation error", error);
  }

  return sendResponse(res, 200, "Player created successfully", {
    team: await Player.create(value),
  });
};

// Update Player
exports.updatePlayer = catchAsync(async (req, res) => {
  console.log("Here");
  console.log(req.body);
  const playerId = req.params.playerID;
  const data = {
    name: req.body.name,
    image: Boolean(req.file?.filename) ? req.file?.filename : req.body.image,
    currentSemester: req.body.currentSemester,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    branch: req.body.branch,
    basePrice: req.body.basePrice,
    bidPrice: req.body.bidPrice,
    previousTeam: req.body.previousTeam,
    currentTeam: req.body.currentTeam,
    playerType: req.body.playerType,
    battingHand: req.body.battingHand,
    fours: req.body.fours,
    sixes: req.body.sixes,
    bowlingStyle: req.body.bowlingStyle,
    HighestWicket: req.body.HighestWicket,
    overs: req.body.overs,
    innings: req.body.innings,
    totalRuns: req.body.totalRuns,
    totalWickets: req.body.totalWickets,
    average: req.body.average,
    strikeRate: req.body.strikeRate,
    economyRate: req.body.economyRate,
  };
  const { error, value } = playerSchemaValidation.validate(data);
  if (error) {
    return sendResponse(res, 400, "Validation error", error.details);
  }
  const currentPlayer = await Player.findById(playerId);
  if (!currentPlayer) {
    return sendResponse(res, 404, "Player not found");
  }
  const oldImageFileName = currentPlayer.image;
  const updatedPlayer = await Player.findByIdAndUpdate(playerId, value, {
    new: true,
    runValidators: true,
  });
  if (!updatedPlayer) {
    return sendResponse(res, 404, "Player not found");
  }
  if (req.file) {
    updatedPlayer.image = req.file.filename;
    await updatedPlayer.save();
    if (oldImageFileName && oldImageFileName !== "none") {
      // const oldImagePath = path.join(
      //   __dirname,
      //   "../public/images/players",
      //   oldImageFileName
      // );
      const oldImagePath = path.join(
        __dirname,
        "..",
        "..",
        "Frontend",
        "public",
        "assets",
        "images",
        "players",
        oldImageFileName
      );
      try {
        await unlinkAsync(oldImagePath);
        console.log("Old player image deleted successfully");
      } catch (err) {
        console.error("Error deleting old player image", err);
      }
    }
  }
  return sendResponse(res, 200, "Player updated successfully", updatedPlayer);
});

// Delete Player
exports.deletePlayer = catchAsync(async (req, res) => {
  const playerId = req.params.playerID;
  const player = await Player.findByIdAndDelete(playerId);

  if (!player) {
    return sendResponse(res, 404, "Player not found");
  }
  if (player.image) {
    // const Path = path.join(
    //   __dirname,
    //   "../public/images/players/",
    //   player.image
    // );
    const Path = path.join(
      __dirname,
      "..",
      "..",
      "Frontend",
      "public",
      "assets",
      "images",
      "players",
      player.image
    );
    try {
      await unlinkAsync(Path);
      console.log("Player image deleted successfully");
    } catch (err) {
      console.error("Error deleting player image", err);
    }
  }

  // You may need to handle the deletion of the player's photo if it exists

  return sendResponse(res, 200, "Player deleted successfully", {});
});

// List All Players
exports.listAllPlayers = catchAsync(async (req, res) => {
  const players = await Player.find();
  return sendResponse(res, 200, "List of all players", players);
});

// Get Player by ID
exports.getPlayerById = catchAsync(async (req, res) => {
  const playerId = req.params.playerID;
  const player = await Player.findById(playerId);

  if (!player) {
    return sendResponse(res, 404, "Player not found");
  }

  return sendResponse(res, 200, "Player found", player);
});

// Get random player
exports.getRandomPlayer = catchAsync(async (req, res) => {
  const randomPlayer = await Player.aggregate([
    { $match: { currentTeam: "None" } },
    { $sample: { size: 1 } },
  ]);

  if (!randomPlayer) {
    return sendResponse(res, 204, "No players found");
  }
  return sendResponse(res, 200, "Random player found", randomPlayer);
});

// Get player by playerType

function paginate(query, page = 1, perPage = 1) {
  const skip = (page - 1) * perPage;
  return query.skip(skip).limit(perPage);
}

exports.getRandomPlayerByPlayerType = catchAsync(async (req, res) => {
  try {
    const type = req.params.playerType;
    let filter = { currentTeam: "None" };

    if (type !== "any") {
      filter.playerType = type;
    }

    const players = await Player.find(filter);

    if (!players || players.length === 0) {
      return sendResponse(res, 204, "No players found");
    }

    const randomPlayer = await Player.aggregate([
      { $match: filter },
      { $sample: { size: 1 } },
    ]);

    if (!randomPlayer || randomPlayer.length === 0) {
      return sendResponse(res, 204, "No players found");
    }

    return sendResponse(res, 200, "Random player found", randomPlayer[0]);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
});

exports.getPlayersByType = catchAsync(async (req, res) => {
  try {
    const type = req.params.playerType;
    // const type = 'Batsman'; // When we already know what type player we require
    const page = req.query.page || 1;

    const playersQuery = Player.find({ playerType: type }).sort("name");

    const players = await paginate(playersQuery, page);

    if (!players || players.length === 0) {
      return sendResponse(res, 404, `No ${type} players found`);
    }
    return sendResponse(res, 200, `${type} players found`, players);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
});

exports.getAllPlayerByTeamName = catchAsync(async (req, res) => {
  try {
    const teamName = req.team.name;
    console.log(req);
    const players = await Player.find({ currentTeam: teamName });
    console.log("players:-", players);
    return sendResponse(res, 200, players);
  } catch (e) {
    console.error(e);
    return sendResponse(res, 500, "Internal Server Error");
  }
});
