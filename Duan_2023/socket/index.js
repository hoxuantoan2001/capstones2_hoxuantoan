const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log("sockecid,", socketId);
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  console.log("user", users);
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  // khi có kết nối user
  console.log("a user connection");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  // gửi tin nhắn
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("receiverId", receiverId);
    const user = getUser(receiverId);

    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
  // user ko kết nối
  socket.on("disconnect", (socket) => {
    removeUser(socket.id);
    console.log("a user disconnected");
    io.emit("getUsers", users);
  });
});
