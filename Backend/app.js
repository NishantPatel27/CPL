const express = require("express");
const cors = require("cors");
// const http = require("http");
// const socketIO = require("socket.io");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/user-routes");
const teamRouter = require("./routes/team-routes");
const playerRouter = require("./routes/player-routes");
const auctionRouter = require("./routes/auction-routes");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

// Socket
// const server = http.createServer(app);
// const io = socketIO(server);

// let focused_player = {};
// io.on("connection", (socket) => {
//   //when ceonnect
//   console.log("a user connected.");

//   socket.on("update_bid", (newBid) => {
//     focused_player["bidPrice"] = newBid;
//     io.emit("get_updated_bid", newBid);
//   });

//   socket.on("change_selling_status", (newStatus) => {
//     io.emit("new_selling_status", newStatus);
//   });

//   socket.on("change_wining_bid_team", (newTeam) => {
//     focused_player["currentTeam"] = newTeam;
//     io.emit("get_updated_wining_bid_team", newTeam);
//   });

//   socket.on("player_data", (playerData) => {
//     focused_player = playerData;
//     io.emit("get_player_data", playerData);
//   });

//   socket.on("sell_player", (data) => {
//     io.emit("get_sold_data", data);
//   });

//   socket.on("get_focused_player", (msg) => {
//     // console.log(msg);
//     // console.log(focused_player);
//     io.emit("get_focused_player", focused_player);
//   });
//   //when disconnect
//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//   });
// });

app.use(morgan("dev"));

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000 * 24,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

// routes
app.use(`${process.env.API_PREFIX}/cpl`, userRouter);
app.use(`${process.env.API_PREFIX}/team`, teamRouter);
app.use(`${process.env.API_PREFIX}/player`, playerRouter);
app.use(`${process.env.API_PREFIX}/auction`, auctionRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "Error",
    message: err.message || "Something went wrong!",
  });
});

app.all("*", (req, res) => {
  console.log(0);
  res.status(404).json({
    status: "Fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
