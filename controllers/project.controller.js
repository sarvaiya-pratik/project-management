import { Project } from "../models/project.model.js";

export const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({ succes: true, data: projects, message: "All Project fetched" });
  } catch (error) {
    console.log(error);
  }
};

export const addProject = (req, res) => {
  try {
    const { name, members } = req.body;
    const userId = req.user;

    const project = new Project({
      id: userId,
      name,
      members,
    });

    project.save();
    return res.status(201).json({ succes: true, message: "Project created !", data: project })
  } catch (error) {
    console.log(error)
  }


};


export const deleteProject = async (req, res) => {

  const { projectId } = req.body;
  try {
    const project = await Project.findOneAndDelete({ _id: projectId });

  }
  catch (err) {
    clg
  }
}