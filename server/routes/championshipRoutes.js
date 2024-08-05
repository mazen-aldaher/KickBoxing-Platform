// backend/routes/championshipRoutes.js
import express from "express";
import Championship from "../models/Championship.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { name, date } = req.body;
  const championship = new Championship({ name, date });
  await championship.save();
  res.status(201).json({ message: "Championship created successfully" });
});

router.get("/", auth, async (req, res) => {
  const championships = await Championship.find();
  res.json(championships);
});

router.post("/:id/register", auth, async (req, res) => {
  const championship = await Championship.findById(req.params.id);
  if (!championship) {
    return res.status(404).json({ message: "Championship not found" });
  }
  championship.participants.push(req.user.userId);
  await championship.save();
  res.json({ message: "Registered for championship successfully" });
});

export default router;
