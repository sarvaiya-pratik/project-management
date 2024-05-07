import { Project } from "../models/project.model.js";

export const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find();
    return res
      .status(200)
      .json({ succes: true, data: projects, message: "All Project fetched" });
  } catch (error) {
    console.log(error);
  }
};

export const addProject = (req, res) => {
  console.log("Run Add Project");

  res.send("OK");
};
