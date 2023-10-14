const io = require("socket.io")(8989, {
  cors: {
    origin: "*",
  },
});

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
