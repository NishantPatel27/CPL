const Player = require("./../models//players-model");
const {playerSchemaValidation} = require("./../validator");
const catchAsync = require("./../utils/catchAsync");
const sendResponse = require("./../utils/response");
const path = require("path");
const fs = require("fs");
const {promisify} = require("util");
const unlinkAsync = promisify(fs.unlink);
const xlsx = require("xlsx");

// Create Player
exports.createPlayer = async (req, res) => {
    const data = {
        image: req.body.image,
        name: req.body.name,
        bidPrice: req.body.bidPrice,
        basePrice: req.body.basePrice,
        course: req.body.course,
        currentSemester: req.body.currentSemester,
        phoneNumber: req.body.phoneNumber,
        currentTeam: req.body.currentTeam,
        playerType: req.body.playerType,
        battingHand: req.body.battingHand,
        bowlingStyle: req.body.bowlingStyle,
        status: req.body.status,
    };

    const {error, value} = playerSchemaValidation.validate(data);

    if (error) {
        return sendResponse(res, 400, "Validation error", error);
    }

    return sendResponse(res, 200, "Player created successfully", {
        team: await Player.create(Object.assign(value)),
    });
};

// Update Player
exports.updatePlayer = catchAsync(async (req, res) => {
    const playerId = req.params.playerID;
    const data = {
        image: req.body.image,
        name: req.body.name,
        bidPrice: req.body.bidPrice,
        basePrice: req.body.basePrice,
        course: req.body.course,
        currentSemester: req.body.currentSemester,
        phoneNumber: req.body.phoneNumber,
        currentTeam: req.body.currentTeam,
        playerType: req.body.playerType,
        battingHand: req.body.battingHand,
        bowlingStyle: req.body.bowlingStyle,
        status: req.body.status,
    };
    const {error, value} = playerSchemaValidation.validate(data);
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
    let player;

    const randomAvailablePlayer = await Player.aggregate([
        {$match: {currentTeam: "None", status: "available"}},
        {$sample: {size: 1}},
    ]);

    if (randomAvailablePlayer.length > 0) {
        player = randomAvailablePlayer[0];
    } else {
        const randomSkippedPlayer = await Player.aggregate([
            {$match: {currentTeam: "None", status: "skipped"}},
            {$sample: {size: 1}},
        ]);

        if (randomSkippedPlayer.length > 0) {
            player = randomSkippedPlayer[0];
        }
    }

    if (!player) {
        return sendResponse(res, 204, "Random player not found");
    }

    return sendResponse(res, 200, "Random player found", player);
});

//player LIVE STATS
exports.getPlayerDetails = catchAsync(async (req, res) => {
    try {
        const aggregateQueryForUnsold = Player.aggregate([
            {
                $match: {
                    currentTeam: "None",
                },
            },
            {
                $group: {
                    _id: null,
                    countUnsold: {
                        $count: {},
                    },
                    bowlerCountUnsold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "bowler"]}, 1, 0],
                        },
                    },
                    batsmanCountUnsold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "batsman"]}, 1, 0],
                        },
                    },
                    allRounderCountUnsold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "allrounder"]}, 1, 0],
                        },
                    },
                    wicketkeeperCountUnsold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "wicketKeeper"]}, 1, 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        const aggregateQueryForSold = Player.aggregate([
            {
                $match: {currentTeam: {$ne: "None"}},
            },
            {
                $group: {
                    _id: null,

                    countSold: {
                        $count: {},
                    },
                    bowlerCountSold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "bowler"]}, 1, 0],
                        },
                    },
                    batsmanCountSold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "batsman"]}, 1, 0],
                        },
                    },
                    allRounderCountSold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "allrounder"]}, 1, 0],
                        },
                    },
                    wicketkeeperCountSold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "wicketKeeper"]}, 1, 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        const result1 = await aggregateQueryForSold.exec();
        const result2 = await aggregateQueryForUnsold.exec();
        return sendResponse(res, 200, {
            ...result1[0],
            ...result2[0],
        });
    } catch (e) {
        console.error(e);
        return sendResponse(res, 500, "Internal Server Error");
    }
});

// Get player by playerType
function paginate(query, page = 1, perPage = 1) {
    const skip = (page - 1) * perPage;
    return query.skip(skip).limit(perPage);
}

exports.getRandomPlayerByPlayerType = catchAsync(async (req, res) => {
    try {
        // if (req.params.playerId !== "652b9ef11f1cc22b42569818") {
        //   const playerId = req.params.playerId;
        //   const player = await Player.findByIdAndUpdate(
        //     playerId,
        //     { status: "skip" },
        //     { new: true }
        //   );
        //   if (!player) {
        //     return sendResponse(res, 204, "player not found");
        //   }
        // }
        const type = req.params.playerType;
        let filter = {currentTeam: "None", status: null};

        if (type !== "any") {
            filter.playerType = type;
        }

        const players = await Player.find(filter);

        if (!players || players.length === 0) {
            return sendResponse(res, 204, "No players found");
        }

        const randomPlayer = await Player.aggregate([
            {$match: filter},
            {$sample: {size: 1}},
        ]);

        if (!randomPlayer || randomPlayer.length === 0) {
            return sendResponse(res, 204, "No players found,Move to next round");
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

        const playersQuery = Player.find({playerType: type}).sort("name");

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

exports.nextRound = catchAsync(async (req, res) => {
    await Player.updateMany({status: "skip"}, {status: null});
    return sendResponse(
        res,
        200,
        `Players updated successfully for the next round`
    );
});

exports.getAllPlayerByTeamName = catchAsync(async (req, res) => {
    try {
        const teamName = req.team.name;
        const players = await Player.find({currentTeam: teamName});
        return sendResponse(res, 200, players);
    } catch (e) {
        console.error(e);
        return sendResponse(res, 500, "Internal Server Error");
    }
});
exports.getPlayerDetails = catchAsync(async (req, res) => {
    try {
        const aggregateQueryForUnsold = Player.aggregate([
            {
                $match: {
                    currentTeam: "None",
                },
            },
            {
                $group: {
                    _id: null,
                    countUnsold: {
                        $count: {},
                    },
                    bowlerCountUnsold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "bowler"]}, 1, 0],
                        },
                    },
                    batsmanCountUnsold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "batsman"]}, 1, 0],
                        },
                    },
                    allRounderCountUnsold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "allrounder"]}, 1, 0],
                        },
                    },
                    wicketkeeperCountUnsold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "wicketKeeper"]}, 1, 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        const aggregateQueryForSold = Player.aggregate([
            {
                $match: {currentTeam: {$ne: "None"}},
            },
            {
                $group: {
                    _id: null,

                    countSold: {
                        $count: {},
                    },
                    bowlerCountSold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "bowler"]}, 1, 0],
                        },
                    },
                    batsmanCountSold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "batsman"]}, 1, 0],
                        },
                    },
                    allRounderCountSold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "allrounder"]}, 1, 0],
                        },
                    },
                    wicketkeeperCountSold: {
                        $sum: {
                            $cond: [{$eq: ["$playerType", "wicketKeeper"]}, 1, 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        const result1 = await aggregateQueryForSold.exec();
        const result2 = await aggregateQueryForUnsold.exec();
        return sendResponse(res, 200, {
            ...result1[0],
            ...result2[0],
        });
    } catch (e) {
        console.error(e);
        return sendResponse(res, 500, "Internal Server Error");
    }
});

    exports.uploadExcel = catchAsync(async (req, res) => {
        const filePath = path.join(__dirname, "../public/data.xlsx");
        if (!fs.existsSync(filePath)) return sendResponse(res, 404, "error", "Excel file not found at the specified location.");

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];

        const sheet = workbook.Sheets[sheetName];
        let data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        const gradeToBasePrice = {
            "A": 1000,
            "B": 500,
            "C": 300
        };
        const players = data.slice(2, 219).map((row,index) => {
            let grade = row[8]?.toString().trim();
            return {
                name: row[1] || "",
                course: row[2] || "",
                currentSemester: row[3] || "",
                playerType: row[4] || "",
                battingHand: row[5] || "",
                bowlingStyle: row[6] || "",
                playerNumber: row[7] || "",
                basePrice: gradeToBasePrice[grade] || 0,
                status: "available"
            };
        });
        await Player.insertMany(players);
        return sendResponse(res, 200, "success", "Excel file uploaded and data inserted successfully.");
    })