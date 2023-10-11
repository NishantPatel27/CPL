const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  logo: String,
  bidPointBalance: Number,
  mentor: String,
  captain: String,
  voiceCaptain: String,
  totalPlayer: Number,
  password: String,
});

module.exports = mongoose.model("Team", teamSchema);
