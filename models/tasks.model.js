import mongoose, { Schema } from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      require: true,
      enum: ["To-Do", "In-Progress", "Validation", "Done"],
    },
    assignee: {
      type: String,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
    dueDate: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("task", TaskSchema);
