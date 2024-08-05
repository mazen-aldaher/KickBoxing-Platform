// backend/models/Committee.js
import mongoose from "mongoose";

const committeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Committee = mongoose.model("Committee", committeeSchema);
export default Committee;
