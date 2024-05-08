import { User } from "../models/user.model.js";
import { getUserByToken } from "../utilities/tokenProvider.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ success: false, message: "Unauthorized" });
    }
    const userId = await getUserByToken(token);

    if (!userId) {
      return res.status(404).json({ success: false, message: "user not found" });
    }
    const user = await User.findById(userId._id);
    req.user = user._id;
    next();
  } catch (error) {
    console.log(error)
  }
};
