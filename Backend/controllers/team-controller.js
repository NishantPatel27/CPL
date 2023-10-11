const TeamModel = require("./../models/teams-model");
const catchAsync = require("./../utils/catchAsync");
const sendResponse = require("./../utils/response");
const { teamSchemaValidation } = require("./../validator");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

// Create Team
exports.teamCreate = async (req, res) => {
  if (!req.file) {
    return sendResponse(res, 400, "No file uploaded");
  }

  const data = {
    name: req.body.name,
    logo: req.file?.filename ?? "none",
    bidPointBalance: req.body.bidPointBalance,
    mentor: req.body.mentor,
    captain: req.body.captain,
    totalPlayer: req.body.totalPlayer,
  };

  const { error, value } = teamSchemaValidation.validate(data);

  if (error) {
    return sendResponse(res, 400, "Validation error", error);
  }

  return sendResponse(res, 200, "Team created successfully", {
    team: await TeamModel.create(value),
  });
};

// Update Team
exports.updateTeam = catchAsync(async (req, res) => {
  const teamId = req.params.teamID;
  const data = {
    name: req.body.name,
    logo: req.file.filename,
    bidPointBalance: req.body.bidPointBalance,
    mentor: req.body.mentor,
    captain: req.body.captain,
    totalPlayer: req.body.totalPlayer,
  };
  const { error, value } = teamSchemaValidation.validate(data);
  if (error) {
    return sendResponse(res, 400, "Validation error", error.details);
  }
  const currentTeam = await TeamModel.findById(teamId);
  if (!currentTeam) {
    return sendResponse(res, 404, "Team not found");
  }
  const oldLogoFileName = currentTeam.logo;
  const updatedTeam = await TeamModel.findByIdAndUpdate(teamId, value, {
    new: true,
    runValidators: true,
  });
  if (!updatedTeam) {
    return sendResponse(res, 404, "Team not found");
  }
  if (req.file) {
    updatedTeam.logo = req.file.filename;
    await updatedTeam.save();
    if (oldLogoFileName) {
      const oldLogoPath = path.join(
        __dirname,
        "../public/images/teams",
        oldLogoFileName
      );
      try {
        await unlinkAsync(oldLogoPath);
        console.log("Old logo deleted successfully");
      } catch (err) {
        console.error("Error deleting old logo", err);
      }
    }
  }
  return sendResponse(res, 200, "Team updated successfully", updatedTeam);
});

// Delete Team
exports.deleteTeam = catchAsync(async (req, res) => {
  const teamId = req.params.teamID;
  const team = await TeamModel.findByIdAndDelete(teamId);

  if (!team) {
    return sendResponse(res, 404, "Team not found");
  }

  if (team.logo) {
    const logoPath = path.join(__dirname, "../public/images/teams", team.logo);
    try {
      await unlinkAsync(logoPath);
      console.log("Team logo deleted successfully");
    } catch (err) {
      console.error("Error deleting team logo", err);
    }
  }

  return sendResponse(res, 200, "Team deleted successfully", {});
});

// List All Teams
exports.listAllTeams = catchAsync(async (req, res) => {
  const teams = await TeamModel.find();
  return sendResponse(res, 200, "List of all teams", teams);
});

// Get Team by ID
exports.getTeamById = catchAsync(async (req, res) => {
  const teamId = req.params.teamID;
  console.log(teamId);
  const team = await TeamModel.findById(teamId);
  console.log(team);
  if (!team) {
    return sendResponse(res, 404, "Team not found");
  }

  return sendResponse(res, 200, "Team found", team);
});
exports.getTeamByName = catchAsync(async (req, res) => {
  const teamName = req.params.teamName;
  console.log(teamName);
  const team = await TeamModel.findOne({ name: teamName });
  console.log(team);
  if (!team) {
    return sendResponse(res, 404, "Team not found");
  }

  return sendResponse(res, 200, "Team found", team);
});
