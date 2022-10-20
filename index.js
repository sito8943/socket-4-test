const cors = require("cors");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "*",
  },
});
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("connected", { message: "a new client connected" });

  socket.on("chat", (message) => {
    console.log("From client: ", message);
    io.emit("chat", message);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
