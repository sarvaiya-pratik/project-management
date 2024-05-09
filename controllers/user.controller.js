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

    let token = generateToken(isExist._id);

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

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exist !" });
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.role = role;
    newUser.setPassword(password);
    await newUser.save();

    const token = generateToken(newUser._id);
    let user = await User.findById(newUser._id).select("-salt").select("-password")
    return res
      .cookie("token", token)
      .status(201)
      .json({ success: true, message: "User created", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }
};

export const getAllUser = async (req, res) => {

  try {
    const users = await User.find()
    return res.status(200).json({ succes: true, data: users, message: "All Users fetched" });

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
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, role }, { new: true });
    if (password) {
      updatedUser.setPassword(password)
    }
    await updatedUser.save();
    return res.status(200).json({ succes: true, message: "User updated succesfully !" })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ succes: false, message: "Something went worng !" })
  }

}

