// backend/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
