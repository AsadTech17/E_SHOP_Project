const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from socket server!!!");
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) =>
  users.find((user) => user.userId === receiverId);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = { senderId, receiverId, text, images, seen: false };
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
