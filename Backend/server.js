// server.js

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // Load environment variables first

const express = require("express");
const app = require("./app");
const mongoose = require("mongoose");
const httpServer = require("http").createServer(app);

// Set up Socket.IO with CORS options using process.env.APP_URL
const options = {
  cors: {
    origin: process.env.APP_URL, // e.g., https://gupl.gucpc.in
  },
};
const io = require("socket.io")(httpServer, options);

// Global error handler for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Connect to the database
const DB = process.env.DATABASE;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("The DB is Connected"))
  .catch((error) => console.log("Connection Failed", error.message));

const port = process.env.PORT || 4000;

let focused_player = {};

// Socket.IO connection and events
io.on("connection", (socket) => {
  console.log("A user connected.");

  socket.on("update_bid", (newBid) => {
    focused_player["bidPrice"] = newBid;
    io.emit("get_updated_bid", newBid);
  });

  socket.on("change_selling_status", (newStatus) => {
    io.emit("new_selling_status", newStatus);
  });

  socket.on("change_wining_bid_team", (newTeam) => {
    focused_player["currentTeam"] = newTeam;
    io.emit("get_updated_wining_bid_team", newTeam);
  });

  socket.on("player_data", (playerData) => {
    focused_player = playerData;
    io.emit("get_player_data", playerData);
  });

  socket.on("sell_player", (data) => {
    io.emit("get_sold_data", data);
  });

  socket.on("get_focused_player", () => {
    io.emit("get_focused_player", focused_player);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected!");
  });
});

// Start the server
httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Global error handler for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  httpServer.close(() => {
    process.exit(1);
  });
});
