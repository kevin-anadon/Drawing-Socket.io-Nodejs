const sockets = (io) => {
  // TODO: Better storage
  let lineHistory = [];
  let leaveCounter = 0;
  let usersConnected = 0;

  io.on("connection", (socket) => {
    console.log("User connected");
    usersConnected += 1;

    const updateUsersInfo = () => {
      emitConnectedUsers();
      emitDisconnectedUsers();
    };

    const emitConnectedUsers = () => {
      io.emit("connected", { users: usersConnected });
    };
    const emitDisconnectedUsers = () => {
      io.emit("leaved", { leave: leaveCounter });
    };

    lineHistory.forEach((currLine) => {
      socket.emit("draw_line", { line: currLine });
    });

    socket.on("draw_line", (data) => {
      lineHistory.push(data.line);
      io.emit("draw_line", data);
    });

    socket.on("disconnect", () => {
      console.log("User leaved");
      leaveCounter += 1;
      usersConnected -= 1;
      updateUsersInfo();
    });

    updateUsersInfo();
  });
};

module.exports = sockets;
