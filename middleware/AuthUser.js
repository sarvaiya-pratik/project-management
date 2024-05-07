import { User } from "../models/user.model.js";
import { getUserByToken } from "../utilities/tokenProvider.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({ success: false, message: "Token not found" });
  }
  const userId = getUserByToken(token);

  if (!userId) {
    return res.status(404).json({ success: false, message: "user not found" });
  }
  const user = await User.findById(userId);
  console.log("user", user);
};
