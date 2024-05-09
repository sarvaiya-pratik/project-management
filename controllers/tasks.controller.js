import { Project } from "../models/project.model.js";
import { Task } from "../models/tasks.model.js";

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find()
        return res.status(200).json({ succes: true, data: tasks, message: "All Tasks fetched" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}

export const addTask = async (req, res) => {
    const { title, description, status, assignee, dueDate } = req.body;
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ succes: false, message: " Project not found!" })
        }

        if (!title || !description || !assignee || !dueDate) {
            return res.status(400).json({ succes: false, message: "All fields are requiered !" })
        }

        const isTaskNameExist = await Task.findOne({ title })

        if (isTaskNameExist) {
            return res.status(409).json({ succes: false, message: "This title already exist !" })
        }

        const tasks = new Task({ title, description, status, assignee, dueDate, project: projectId })
        await tasks.save()



        return res.status(200).json({ succes: true, message: "Task added Succesfully !", data: tasks })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, assignee, dueDate } = req.body;
    try {

        const isTask = await Task.findById(id);
        if (!isTask) {
            return res.status(404).json({ success: false, message: "Taks Not Found !" })
        }

        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, assignee, dueDate }, { new: true })
        await updatedTask.save();
        return res.status(200).json({ succes: true, message: "Task updated succesfully !", data: updatedTask })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}


export const deleteTask = async (req, res) => {

    const { id } = req.params;

    try {

        const isTask = await Task.findById(id);

        if (!isTask) {
            return res.status(404).json({ success: false, message: "Taks Not Found !" })
        }

        await Task.findByIdAndDelete(id);

        return res.status(200).json({ succes: true, message: "Task Deeleted !" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}

export const statusChange = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {

        const isTask = await Task.findById(id)
        if (!isTask) {
            return res.status(400).json({ succes: false, message: "Task not found" })
        }

        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { runValidators: true })
        await updatedTask.save();

        return res.status(200).json({ succes: true, message: "Status updated succesfully !" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}
