const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const path = require('path');
const app = express();
const port = 4500;
const users = [{}];
app.use(cors());

//--------deploymet------------
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
//--------deploymet------------
app.get("/", (req, res) => {
  res.send("Server is Running");
});
const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", (socket) => {
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });

    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat,${users[socket.id]}`,
    });
  });

  socket.on("message", ({ message }) => {
    io.emit("sendMessage", { user: users[socket.id], message, id: socket.id });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin,",
      message: ` ${users[socket.id]} left `,
    });

    delete users[socket.id];
  });
});

server.listen(port, () => {
  console.log(`server is workin on http://localhost:${port}`);
});

