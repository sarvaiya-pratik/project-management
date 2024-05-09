import { Project } from "../models/project.model.js";

// Get All Projects
export const getAllProject = async (req, res) => {
  try {

    const projects = await Project.find().populate('tasks');
    return res.status(200).json({ succes: true, data: projects, message: "All Project fetched" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }
};

// Add Project
export const addProject = async (req, res) => {
  try {
    const { name, members } = req.body;
    const userId = req.user;

    if (!name || !members) {
      return res.status(400).json({ succes: false, message: "All fields are required !" })
    }
    const isNameExist = await Project.findOne({ name })

    if (isNameExist) {
      return res.status(409).json({ succes: false, message: "Name already exist !" })
    }

    const project = new Project({
      user: userId,
      name,
      members,
    });

    await project.save();

    return res.status(201).json({ succes: true, message: "Project created !", data: project })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const isProject = await Project.findById(id);

    if (!isProject) {
      return res.status(404).json({ success: false, message: "Project Not Found !" })
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({ succes: true, message: "Project Deeleted !" })

  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }

}

// Update Project

export const updateProject = async (req, res) => {
  const { name, members } = req.body;
  const { id } = req.params;

  try {
    const isProject = await Project.findById(id)
    if (!isProject) {
      return res.status(404).json({ succes: false, message: "Project Not Found !" })
    }

    const updatedProject = await Project.findByIdAndUpdate(id, { name, members }, { new: true })
    await updatedProject.save();
    return res.status(200).json({ succes: true, message: "Project updated succesfully !", data: updatedProject })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }

}