const mongoose = require("mongoose");
const Player = require("../models/players-model");
const Team = require("../models/teams-model");
const sendResponse = require("../utils/response");

// Update a Player's currentTeam and bidAmount, and a Team's bidPoint
const sellPlayer = async (req, res) => {
  try {
    return sendResponse(
      res,
      200,
      "Sold successfully",
      await updatePlayerAndTeam(
        req.body.playerId,
        req.body.bidPrice,
        req.body.currentTeam
      )
    );
  } catch (e) {
    console.log("Here:-", e);
    return sendResponse(res, 400, e.stack.split("\n")[0].toString());
  }
};
async function updatePlayerAndTeam(playerId, bidPrice, newTeamName) {
  let session = null;
  try {
    // Start a session for the transaction
    session = await mongoose.startSession();
    session.startTransaction();

    // Update the Player model
    const playerUpdate = await Player.findByIdAndUpdate(
      playerId,
      {
        currentTeam: newTeamName,
        bidPrice: bidPrice,
      },
      { new: true, session }
    );
    const team = await Team.findOne({
      name: newTeamName,
    });
    if (!team) {
      throw new Error("No team found");
    }
    if (team.bidPointBalance < bidPrice) {
      throw new Error("Insufficient funds");
    }
    // Update the Team model
    const teamUpdate = await Team.findOneAndUpdate(
      {
        name: newTeamName,
      },
      {
        bidPointBalance: Number(team.bidPointBalance) - Number(bidPrice),
      },
      { new: true, session }
    );
    // Commit the transaction
    await session.commitTransaction();
    console.log("Transaction completed....");
    console.log({ player: playerUpdate, team: teamUpdate });
    return { player: playerUpdate, team: teamUpdate };
  } catch (error) {
    // Handle errors and abort the transaction
    console.error("Transaction failed:", error);
    if (session) {
      await session.abortTransaction();
      await session.endSession();
    }
    throw error;
  }
}

// Example usage
// updatePlayerAndTeam("playerId123", "teamId456", 500000, 100)
//   .then((result) => {
//     console.log("Player and Team updated:", result);
//   })
//   .catch((error) => {
//     console.error("Update error:", error);
//   });

module.exports = { updatePlayerAndTeam, sellPlayer };
