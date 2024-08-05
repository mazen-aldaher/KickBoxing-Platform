// backend/routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);
});

export default router;
