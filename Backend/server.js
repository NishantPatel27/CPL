// server.js
const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "http://localhost:3000",
  },
};
const io = require("socket.io")(httpServer, options);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("The DB is Connected"))
  .catch((error) => console.log("Connection Failed", error.message));

const port = process.env.PORT || 4000;

let focused_player = {};
// let state = "none" selling_started, selling_successfull, selling_error
io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

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

  socket.on("get_focused_player", (msg) => {
    // console.log(msg);
    // console.log(focused_player);
    io.emit("get_focused_player", focused_player);
  });
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
