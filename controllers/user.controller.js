import pool from "../db/connectDb.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utilities/tokenProvider.js";

// Login User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required !" });
    }


    const isExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    if (!isExist.rows[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Please Register first" });
    }

    // if (!isExist.validPassword(password)) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Enter correct password" });
    // }

    let token = generateToken(isExist.rows[0].user_id);
    console.log("Token", token)

    return res
      .cookie("token", token)
      .status(200)
      .json({ success: true, message: "Login succesfully !" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }
};

// Register users
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required !" });
    }

    const alreadyUser = await pool.query(
      "select * from users where email = $1", [email]
    )

    if (alreadyUser.rows[0]) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exist !" });
    }

    const newUser = await pool.query(
      "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, password, role])

    const token = generateToken(newUser.rows[0].user_id);

    return res
      .cookie("token", token)
      .status(201)
      .json({ success: true, message: "User created", data: newUser.rows[0] });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }
};

export const getAllUser = async (req, res) => {

  try {
    // const users = await User.find()
    const users = await pool.query(
      "SELECT * FROM users"
    )

    return res.status(200).json({ succes: true, data: users.rows, message: "All Users fetched" });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }
}

// Update user
export const updateUser = async (req, res) => {

  const { name, email, password, role } = req.body;
  const { id } = req.params;

  try {
    const updateduser = await pool.query(
      "UPDATE users set name=$1, email=$2, password=$3, role=$4 WHERE user_id=$5 RETURNING *", [name, email, password, role,id]
    )

    // const updatedUser = await User.findByIdAndUpdate(id, { name, email, role }, { new: true });
    // if (password) {
    //   updatedUser.setPassword(password)
    // }
   

    return res.status(200).json({ succes: true, message: "User updated succesfully !",data:updateduser.rows[0] })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }

}

