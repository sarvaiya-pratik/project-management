import mongoose, { Schema } from "mongoose";

const ProjectSchema = mongoose.Schema(
  {
    projectName: { type: String },
    members: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    tasks: {
      type: Schema.Types.ObjectId,
      ref: "task",
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("project", ProjectSchema);
