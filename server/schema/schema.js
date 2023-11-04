import mongoose from "mongoose";

const schema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Object,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const document = mongoose.model("task", schema);
export default document;
