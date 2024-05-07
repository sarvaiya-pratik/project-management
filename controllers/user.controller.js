import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required !" });
    }

    const isExist = await User.findOne({ email });

    if (!isExist) {
      return res
        .status(404)
        .json({ success: false, message: "Please Register first" });
    }

    if (!isExist.validPassword(password)) {
      return res
        .status(401)
        .json({ success: false, message: "Enter correct password" });
    }

    let token = jwt.sign({ _id: isExist._id }, process.env.SECRET_KEY);
    console.log(token);
    return res
      .status(200)
      .cookie("token", token, { secure: true })
      .json({ success: false, message: "Login succesfully !" });
  } catch (error) {
    console.log(error);
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

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exist !" });
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.setPassword(password);
    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "User created", user: newUser });
  } catch (error) {
    console.log(error);
  }
};
