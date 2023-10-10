const io = require("socket.io")(8989, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  socket.on("update_bid", (newBid) => {
    io.emit("get_updated_bid", newBid);
  });

  socket.on("change_wining_bid_team", (newTeam) => {
    io.emit("get_updated_wining_bid_team", newTeam);
  });

  socket.on("player_data", (playerData) => {
    io.emit("get_player_data", playerData);
  });
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});
