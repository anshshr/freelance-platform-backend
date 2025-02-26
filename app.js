require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");

const cors = require("cors");
const db = require("./config/db");
const { Server } = require("socket.io");
const freelancerRouter = require("./routes/freelance");
const clinetRouter = require("./routes/client");
const resumeRouter = require("./routes/resume");
const projectRouter = require("./routes/project");
const server = http.createServer(app);
const clerk = require("@clerk/express");
const { send } = require("process");
const proposalRouter = require("./routes/proposal");
const clerkClient = clerk.createClerkClient({
  secretKey: "sk_test_jRilrIuhFQQ4e00OVapbNOerfYdcb8QJLNf45UR9FJ",
});
let users = {};
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/freelancer", freelancerRouter);
app.use("/clients", clinetRouter);
app.use("/extractResumeDetails", resumeRouter);
app.use("/projects", projectRouter);
app.use("/proposals",proposalRouter)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Freelance API" });
});
app.post("/create", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const user = await clerkClient.users.createUser({
      firstName: "Test",
      lastName: "User",
      emailAddress: ["testclerk123@gmail.com"],
      password: "password",
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Save user
  socket.on("register", (userId) => {
    users[userId] = socket.id; // Map userId to socketId
    console.log("Users:", users);
  });

  // Send private message
  socket.on("privateMessage", ({ recipientId, message }) => {
    const recipientSocketId = users[recipientId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("privateMessage", {
        message,
        senderId: socket.id,
      });
      console.log(`Message sent to ${recipientId}: ${message}`);
    } else {
      console.log(`User ${recipientId} is not online`);
    }
  });

  // Remove user on disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // const userId = Object.keys(users).find((key) => users[key] === socket.id);
    for (const key in users) {
      if (users[key] === socket.id) {
        delete users[key];
      }
    }
    // if (userId) delete users[userId]; // Remove user from list
    console.log("Users:", users);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("server is running on the port", PORT);
});
