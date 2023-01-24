require("dotenv").config();
require("console-success");

const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

// initializing
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// socket config
require("./sockets")(io);

// settings
const PORT = process.env.PORT || 3001;

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting server
server.listen(PORT, () => {
  console.success(`Server started on port: ${PORT}`);
});
