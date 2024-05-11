import pool from "../db/connectDb.js";


// Get All Projects
export const getAllProject = async (req, res) => {
  try {
    const projects = await pool.query(
      "SELECT * FROM projects"
    )
    return res.status(200).json({ succes: true, data: projects.rows, message: "All Project fetched" });
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

    let isNameExist = await pool.query(
      "SELECT proj_name FROM projects WHERE proj_name=$1", [name]
    )

    if (isNameExist.rows[0]) {
      return res.status(409).json({ succes: false, message: "Name already exist !" })
    }

    const project = await pool.query(
      "INSERT INTO projects (proj_name,members,user_id) VALUES ($1,$2,$3) RETURNING *", [name, members, userId]
    )

    console.log(project.rows)
    return res.status(201).json({ succes: true, message: "Project created !", data: project.rows })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const isProject = await pool.query(
      "SELECT proj_id FROM projects WHERE proj_id=$1", [id]
    )

    if (!isProject.rows[0]) {
      return res.status(404).json({ success: false, message: "Project Not Found !" })
    }

    await pool.query(
      "DELETE FROM projects WHERE proj_id=$1", [id]
    )

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
    const isProject = await pool.query(
      "SELECT proj_id FROM projects WHERE proj_id=$1", [id]
    )

    if (!isProject.rows[0]) {
      return res.status(404).json({ success: false, message: "Project Not Found !" })
    }

    const updatedproject = await pool.query(
      "UPDATE projects SET proj_name=$1, members=$2 WHERE proj_id=$3 RETURNING *", [name, members, id]
    )

    return res.status(200).json({ succes: true, message: "Project updated succesfully !", data: updatedproject.rows[0] })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }
}
