const sockets = (io) => {
  // TODO: Better storage
  let line_history = [];
  let leave_counter = 0;
  io.on("connection", (socket) => {
    console.log("User connected");

    line_history.forEach((currLine) => {
      socket.emit("draw_line", { line: currLine });
    });

    socket.on("draw_line", (data) => {
      line_history.push(data.line);
      io.emit("draw_line", data);
    });

    socket.on("disconnect", () => {
      console.log("Leaves");
      leave_counter += 1;
      socket.emit("leaves", { leave: leave_counter });
    });
  });
};

module.exports = sockets;
