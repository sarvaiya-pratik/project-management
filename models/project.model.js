import mongoose, { Schema } from "mongoose";

const ProjectSchema = mongoose.Schema(
  {
    name: { type: String },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    tasks: {
      type: Schema.Types.ObjectId,
      ref: "task",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model("project", ProjectSchema);
