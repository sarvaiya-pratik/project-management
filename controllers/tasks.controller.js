import pool from "../db/connectDb.js";


export const getAllTask = async (req, res) => {
    try {
        const tasks = await pool.query(
            "SELECT * FROM tasks"
        )

        return res.status(200).json({ succes: true, data: tasks.rows, message: "All Tasks fetched" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}

export const addTask = async (req, res) => {
    const { title, description, status, assignee, dueDate } = req.body;
    const { projectId } = req.params;

    try {
        const project = await pool.query(
            "SELECT proj_name FROM projects WHERE proj_id=$1", [projectId]
        )
        if (!project.rows[0]) {
            return res.status(404).json({ succes: false, message: " Project not found!" })
        }

        if (!title || !description || !assignee || !dueDate) {
            return res.status(400).json({ succes: false, message: "All fields are requiered !" })
        }

        const isTaskNameExist = await pool.query(
            "SELECT title FROM  tasks WHERE title=$1", [title]
        )

        if (isTaskNameExist.rows[0]) {
            return res.status(409).json({ succes: false, message: "This title already exist !" })
        }

        const tasks = await pool.query(
            "INSERT INTO tasks (title,description,status,assignee,proj_id,duedate) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [title, description, status, assignee, projectId, dueDate]
        )

        return res.status(200).json({ succes: true, message: "Task added Succesfully !", data: tasks.rows[0] })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}



export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, assignee, dueDate } = req.body;
    try {

        const isTask = await pool.query(
            "SELECT task_id FROM tasks WHERE task_id=$1", [id]
        )
        if (!isTask.rows[0]) {
            return res.status(404).json({ success: false, message: "Taks Not Found !" })
        }

        const updatedtask = await pool.query(
            "UPDATE tasks SET title=$1, description=$2, status=$3, assignee=$4, dueDate=$5 WHERE task_id=$6 RETURNING *", [title, description, status, assignee, dueDate, id]
        )
        return res.status(200).json({ succes: true, message: "Task updated succesfully !", data: updatedtask.rows[0] })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const isTask = await pool.query(
            "SELECT task_id FROM tasks WHERE task_id=$1", [id]
        )

        if (!isTask.rows[0]) {
            return res.status(404).json({ success: false, message: "Taks Not Found !" })
        }

        await pool.query(
            "DELETE FROM tasks WHERE task_id=$1", [id]
        )

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
        const isTask = await pool.query(
            "SELECT task_id FROM tasks WHERE task_id=$1", [id]
        )

        if (!isTask.rows[0]) {
            return res.status(404).json({ success: false, message: "Taks Not Found !" })
        }

        const updatedtask = await pool.query(
            "UPDATE tasks SET status=$1 WHERE task_id=$2 RETURNING *", [status, id]
        )
        return res.status(200).json({ succes: true, message: "Status updated succesfully !", data: updatedtask.rows[0] })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ succes: false, message: "Something went worng !" })
    }
}
