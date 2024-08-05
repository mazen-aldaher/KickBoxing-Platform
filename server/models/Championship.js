// backend/models/Championship.js
import mongoose from "mongoose";

const championshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Championship = mongoose.model("Championship", championshipSchema);
export default Championship;
