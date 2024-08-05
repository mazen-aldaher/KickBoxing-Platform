// backend/server.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import championshipRoutes from "./routes/championshipRoutes.js";
import http from "http";
import { Server as SocketIOServer } from "socket.io"; // Correct import
import User from "./models/User.js";

// Initialize the Express application
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server); // Correct usage of SocketIOServer

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(
    "mongodb+srv://Admin:P@$$w0rd@kickboxing.jdvlrfn.mongodb.net/kickboxing?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/championships", championshipRoutes);

// Register route example (can be moved to userRoutes)
app.post("/api/users/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    io.emit("newUser", { message: "New user registered" });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Server setup
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
